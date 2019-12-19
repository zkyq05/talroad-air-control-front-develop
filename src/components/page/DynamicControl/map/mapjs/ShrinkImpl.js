import { loadModules } from 'esri-loader'

export const shrinkPoint = function(params){
  /*
点要素闪烁
params:
{
  map:地图对象
  graphics:坐标点串
  outerSize:外圆的初始大小
  innerSize:内圆的初始大小
  outerFillColor:外圆的填充颜色
  outerOutlineColor:外圆的轮廓线颜色
  innerFillColor: 内圆的填充颜色
  innerOutlineColor: 内圆的轮廓线颜色
}
*/
  loadModules(['esri/Graphic','esri/layers/GraphicsLayer', "esri/core/watchUtils",
  "esri/core/promiseUtils",
  "esri/geometry/support/webMercatorUtils",
  "esri/views/2d/layers/BaseLayerViewGL2D"], {css: true}).then(([Graphic,GraphicsLayer,watchUtils,
    promiseUtils,
    webMercatorUtils,
    BaseLayerViewGL2D]) => {
    let curMap = params.map;
    let innerGraphicsArray = [];
    let innerminRadius = 15;
    let innermaxRadius = 35;
    let innerstep = 0.2;
    let outerminRadius = 30;
    let outermaxRadius = 45;
    let outerstep = 0.3;
    let layerId = params.id;
    let pointLayerId = params.pointLayerId;
    let allGraphics = params.graphics;

    var CustomLayerView2D = BaseLayerViewGL2D.createSubclass({
      // Locations of the two vertex attributes that we use. They
      // will be bound to the shader program before linking.
      aPosition: 0,
      aOffset: 1,

      constructor: function() {
        // Geometrical transformations that must be recomputed
        // from scratch at every frame.
        this.transform = mat3.create();
        this.translationToCenter = vec2.create();
        this.screenTranslation = vec2.create();

        // Geometrical transformations whose only a few elements
        // must be updated per frame. Those elements are marked
        // with NaN.
        this.display = mat3.fromValues(NaN, 0, 0, 0, NaN, 0, -1, 1, 1);
        this.screenScaling = vec3.fromValues(NaN, NaN, 1);

        // Whether the vertex and index buffers need to be updated
        // due to a change in the layer data.
        this.needsUpdate = false;

        // We listen for changes to the graphics collection of the layer
        // and trigger the generation of new frames. A frame rendered while
        // `needsUpdate` is true may cause an update of the vertex and
        // index buffers.
        var requestUpdate = function() {
          this.needsUpdate = true;
          this.requestRender();
        }.bind(this);

        this.watcher = watchUtils.on(
          this,
          "layer.graphics",
          "change",
          requestUpdate,
          requestUpdate,
          requestUpdate
        );
      },

      // Called once a custom layer is added to the map.layers collection and this layer view is instantiated.
      attach: function() {
        var gl = this.context;

        // Define and compile shaders.
        //SIZE默认70
        var vertexSource =
          "precision highp float;" +
          "uniform mat3 u_transform;" +
          "uniform mat3 u_display;" +
          "attribute vec2 a_position;" +
          "attribute vec2 a_offset;" +
          "varying vec2 v_offset;" +
          "const float SIZE = 45.0;" +
          "void main() {" +
          "    gl_Position.xy = (u_display * (u_transform * vec3(a_position, 1.0) + vec3(a_offset * SIZE, 0.0))).xy;" +
          "    gl_Position.zw = vec2(0.0, 1.0);" +
          "    v_offset = a_offset;" +
          "}";
        //FREQ 调整速度，默认为1 数值越大越快
        var fragmentSource =
          "precision highp float;" +
          "uniform float u_current_time;" +
          "varying vec2 v_offset;" +
          "const float PI = 3.14159;" +
          "const float N_RINGS = 3.0;" +
          "const vec3 COLOR = vec3(1, 0, 0);" +
          "const float FREQ = 0.8;" +
          "void main() {" +
          "    float l = length(v_offset);" +
          "    float intensity = clamp(cos(l * PI), 0.0, 1.0) * clamp(cos(2.0 * PI * (l * 2.0 * N_RINGS - FREQ * u_current_time)), 0.0, 1.0);" +
          "    gl_FragColor = vec4(COLOR * intensity, intensity);" +
          "}";

        var vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, vertexSource);
        gl.compileShader(vertexShader);
        var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, fragmentSource);
        gl.compileShader(fragmentShader);

        // Create the shader program.
        this.program = gl.createProgram();
        gl.attachShader(this.program, vertexShader);
        gl.attachShader(this.program, fragmentShader);

        // Bind attributes.
        gl.bindAttribLocation(this.program, this.aPosition, "a_position");
        gl.bindAttribLocation(this.program, this.aOffset, "a_offset");

        // Link.
        gl.linkProgram(this.program);

        // Shader objects are not needed anymore.
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);

        // Retrieve uniform locations once and for all.
        this.uTransform = gl.getUniformLocation(
          this.program,
          "u_transform"
        );
        this.uDisplay = gl.getUniformLocation(this.program, "u_display");
        this.uCurrentTime = gl.getUniformLocation(
          this.program,
          "u_current_time"
        );

        // Create the vertex and index buffer. They are initially empty. We need to track the
        // size of the index buffer because we use indexed drawing.
        this.vertexBuffer = gl.createBuffer();
        this.indexBuffer = gl.createBuffer();

        // Number of indices in the index buffer.
        this.indexBufferSize = 0;

        // When certain conditions occur, we update the buffers and re-compute and re-encode
        // all the attributes. When buffer update occurs, we also take note of the current center
        // of the view state, and we reset a vector called `translationToCenter` to [0, 0], meaning that the
        // current center is the same as it was when the attributes were recomputed.
        this.centerAtLastUpdate = vec2.fromValues(
          this.view.state.center[0],
          this.view.state.center[1]
        );
      },

      // Called once a custom layer is removed from the map.layers collection and this layer view is destroyed.
      detach: function() {
        // Stop watching the `layer.graphics` collection.
        this.watcher.remove();

        var gl = this.context;

        // Delete buffers and programs.
        gl.deleteBuffer(this.vertexBuffer);
        gl.deleteBuffer(this.indexBuffer);
        gl.deleteProgram(this.program);
      },

      // Called every time a frame is rendered.
      render: function(renderParameters) {
        var gl = renderParameters.context;
        var state = renderParameters.state;

        // Update vertex positions. This may trigger an update of
        // the vertex coordinates contained in the vertex buffer.
        // There are three kinds of updates:
        //  - Modification of the layer.graphics collection ==> Buffer update
        //  - The view state becomes non-stationary ==> Only view update, no buffer update
        //  - The view state becomes stationary ==> Buffer update
        this.updatePositions(renderParameters);

        // If there is nothing to render we return.
        if (this.indexBufferSize === 0) {
          return;
        }

        // Update view `transform` matrix; it converts from map units to pixels.
        mat3.identity(this.transform);
        this.screenTranslation[0] = (state.pixelRatio * state.size[0]) / 2;
        this.screenTranslation[1] = (state.pixelRatio * state.size[1]) / 2;
        mat3.translate(
          this.transform,
          this.transform,
          this.screenTranslation
        );
        mat3.rotate(
          this.transform,
          this.transform,
          (Math.PI * state.rotation) / 180
        );
        this.screenScaling[0] = state.pixelRatio / state.resolution;
        this.screenScaling[1] = -state.pixelRatio / state.resolution;
        mat3.scale(this.transform, this.transform, this.screenScaling);
        mat3.translate(
          this.transform,
          this.transform,
          this.translationToCenter
        );

        // Update view `display` matrix; it converts from pixels to normalized device coordinates.
        this.display[0] = 2 / (state.pixelRatio * state.size[0]);
        this.display[4] = -2 / (state.pixelRatio * state.size[1]);

        // Draw.
        gl.useProgram(this.program);
        gl.uniformMatrix3fv(this.uTransform, false, this.transform);
        gl.uniformMatrix3fv(this.uDisplay, false, this.display);
        gl.uniform1f(this.uCurrentTime, performance.now() / 1000.0);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.enableVertexAttribArray(this.aPosition);
        gl.enableVertexAttribArray(this.aOffset);
        gl.vertexAttribPointer(this.aPosition, 2, gl.FLOAT, false, 16, 0);
        gl.vertexAttribPointer(this.aOffset, 2, gl.FLOAT, false, 16, 8);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.drawElements(
          gl.TRIANGLES,
          this.indexBufferSize,
          gl.UNSIGNED_SHORT,
          0
        );

        // Request new render because markers are animated.
        this.requestRender();
      },
     
      // Called internally from render().
      updatePositions: function(renderParameters) {
        var gl = renderParameters.context;
        var stationary = renderParameters.stationary;
        var state = renderParameters.state;

        // If we are not stationary we simply update the `translationToCenter` vector.
        if (!stationary) {
          vec2.sub(
            this.translationToCenter,
            this.centerAtLastUpdate,
            state.center
          );
          this.requestRender();
          return;
        }

        // If we are stationary, the `layer.graphics` collection has not changed, and
        // we are centered on the `centerAtLastUpdate`, we do nothing.
        if (
          !this.needsUpdate &&
          this.translationToCenter[0] === 0 &&
          this.translationToCenter[1] === 0
        ) {
          return;
        }

        // Otherwise, we record the new encoded center, which imply a reset of the `translationToCenter` vector,
        // we record the update time, and we proceed to update the buffers.
        this.centerAtLastUpdate.set(state.center);
        this.translationToCenter[0] = 0;
        this.translationToCenter[1] = 0;
        this.needsUpdate = false;

        var graphics = this.layer.graphics;

        // Generate vertex data.
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        var vertexData = new Float32Array(16 * graphics.length);

        var i = 0;
        graphics.forEach(
          function(graphic) {
            var point = graphic.geometry;

            // The (x, y) position is relative to the encoded center.
            var x = point.x - this.centerAtLastUpdate[0];
            var y = point.y - this.centerAtLastUpdate[1];

            vertexData[i * 16 + 0] = x;
            vertexData[i * 16 + 1] = y;
            vertexData[i * 16 + 2] = -0.5;
            vertexData[i * 16 + 3] = -0.5;
            vertexData[i * 16 + 4] = x;
            vertexData[i * 16 + 5] = y;
            vertexData[i * 16 + 6] = 0.5;
            vertexData[i * 16 + 7] = -0.5;
            vertexData[i * 16 + 8] = x;
            vertexData[i * 16 + 9] = y;
            vertexData[i * 16 + 10] = -0.5;
            vertexData[i * 16 + 11] = 0.5;
            vertexData[i * 16 + 12] = x;
            vertexData[i * 16 + 13] = y;
            vertexData[i * 16 + 14] = 0.5;
            vertexData[i * 16 + 15] = 0.5;

            ++i;
          }.bind(this)
        );

        gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);

        // Generates index data.
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

        var indexData = new Uint16Array(6 * graphics.length);
        for (var i = 0; i < graphics.length; ++i) {
          indexData[i * 6 + 0] = i * 4 + 0;
          indexData[i * 6 + 1] = i * 4 + 1;
          indexData[i * 6 + 2] = i * 4 + 2;
          indexData[i * 6 + 3] = i * 4 + 1;
          indexData[i * 6 + 4] = i * 4 + 3;
          indexData[i * 6 + 5] = i * 4 + 2;
        }

        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexData, gl.STATIC_DRAW);

        // Record number of indices.
        this.indexBufferSize = indexData.length;
      }
    });

    // Subclass the custom layer view from GraphicsLayer.
    var CustomLayer = GraphicsLayer.createSubclass({
      createLayerView: function(view) {
        // We only support MapView, so we only need to return a
        // custom layer view for the `2d` case.
        if (view.type === "2d") {
          return new CustomLayerView2D({
            view: view,
            layer: this
          });
        }
      }
    });

    for(let i=0;i<allGraphics.length;i++){
      let pointX =  allGraphics[i][0];
      let pointY = allGraphics[i][1];
      let graphic1 = new Graphic({
        geometry: webMercatorUtils.geographicToWebMercator({
            x: pointX,
            y: pointY,
            type: 'point',
            spatialReference: {
              wkid: 4326
            }
        })
      });
      innerGraphicsArray.push(graphic1);
    }
    let glayer = curMap.findLayerById(layerId);
    let pointLayerIndex = curMap.layers.findIndex(function(item){
      return item.id === pointLayerId;
    });
    if(glayer !=null){
      curMap.remove(glayer);
    }
    glayer = new CustomLayer({
      graphics: innerGraphicsArray,
      "id":layerId
    });
    if(pointLayerIndex){
      curMap.add(glayer,pointLayerIndex-1);
    }
    else{
      curMap.add(glayer);
    }
/*
    let outerGraphicsArray = [];
    let innerGraphicsArray = [];
    let glayer = curMap.findLayerById(layerId);
    let pointLayerIndex = curMap.layers.findIndex(function(item){
      return item.id === pointLayerId;
    });
    if(glayer !=null){
      curMap.remove(glayer);
    }else{
      glayer = new GraphicsLayer({
        "id":layerId
      });
    }
    let symbol1 = {
      type: "simple-marker", 
      color: params.innerFillColor,
      size: innerminRadius,
      outline: { 
          width: 0.5,
          color: params.innerOutlineColor
      }
    };
    let symbol2 = {
        type: "simple-marker", 
        color: params.outerFillColor,
        size: outerminRadius,
        outline: { 
            width: 0.5,
            color: params.outerOutlineColor
        }
    };
    for(let i=0;i<allGraphics.length;i++){
      let pointX =  allGraphics[i][0];
      let pointY = allGraphics[i][1];
      let graphic1 = new Graphic({
        geometry: {
            x: pointX,
            y: pointY,
            type: 'point'
        },
        symbol: symbol1
      });
      innerGraphicsArray.push(graphic1);
      let graphic2 = new Graphic({
          geometry: {
              x: pointX,
              y: pointY,
              type: 'point'
          },
          symbol: symbol2
      });
      outerGraphicsArray.push(graphic2);
    }
    glayer.addMany(innerGraphicsArray);
    glayer.addMany(outerGraphicsArray);
    if(pointLayerIndex){
      curMap.add(glayer,pointLayerIndex-1);
    }
    else{
      curMap.add(glayer);
    }
    function shinkInnerGraphic(){
      if (innerGraphicsArray.length <1) return;
      let radius = innerGraphicsArray[0].symbol.size;
      for (let index = 0; index < innerGraphicsArray.length; index++) {
          const element = innerGraphicsArray[index];
          if(radius > innermaxRadius) {
              radius = innerminRadius;
          }
          let symbol = {
              type: "simple-marker",
              color: params.innerFillColor,
              size: radius+innerstep,
              outline: { 
              width: 0.5,
              color: params.innerOutlineColor
              }
          }
          element.symbol = symbol;
          
      }
      requestAnimationFrame(shinkInnerGraphic);
    }
    shinkInnerGraphic();
    function shinkOuterGraphic(){
      if (outerGraphicsArray.length <1) return;
      let radius=outerGraphicsArray[0].symbol.size;
      for (let index=0; index < outerGraphicsArray.length; index++) {
        const element=outerGraphicsArray[index];
        if(radius> outermaxRadius)
        {
          radius = outerminRadius;
        }
        let symbol = {
          type: "simple-marker",
          color: params.outerFillColor,
          size: radius+outerstep,
          outline: {
          width: 0.5,
          color: params.outerOutlineColor
          }
        }
        element.symbol = symbol;
        }
        requestAnimationFrame(shinkOuterGraphic);
      }
      shinkOuterGraphic();
*/
  })  
}