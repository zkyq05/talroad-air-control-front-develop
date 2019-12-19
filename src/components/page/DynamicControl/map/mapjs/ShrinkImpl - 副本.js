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
  loadModules(['esri/Graphic','esri/layers/GraphicsLayer'], {css: true}).then(([Graphic,GraphicsLayer]) => {
    let curMap = params.map;
    let innerminRadius = 15;
    let innermaxRadius = 35;
    let innerstep = 0.2;
    let outerminRadius = 30;
    let outermaxRadius = 45;
    let outerstep = 0.3;
    let layerId = params.id;
    let pointLayerId = params.pointLayerId;
    let allGraphics = params.graphics;
    let outerGraphicsArray = [];
    let innerGraphicsArray = [];
    let glayer = curMap.findLayerById(layerId);
    let pointLayerIndex = curMap.layers.findIndex(function(item){
      return item.id === pointLayerId;
    });
    if(glayer !=null){
      curMap.remove(glayer);
    }
    glayer = new GraphicsLayer({
      "id":layerId
    });
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
  })  
}