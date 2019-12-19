import { loadModules } from 'esri-loader'
import store from '../../../../../store'

let myWindy =null;
let windMouseUpHandle;
let windMouseDownHandle;
let windMouseWheelHandle;
let windMapZoomHandle;
let windResizeHandle;
let windExtentHandle;
let windStationaryHandle;
let windBaseMapHandle;
export const Windy = function (params) {
  var mapView = params.mapView
  var VELOCITY_SCALE = 0.09 // scale for wind velocity (completely arbitrary--this value looks nice)
  var INTENSITY_SCALE_STEP = 10 // 10       // step size of particle intensity color scale
  var MAX_WIND_INTENSITY = 8 // 40      // wind velocity at which particle intensity is maximum (m/s)
  var MAX_PARTICLE_AGE = 100 // 100       // max number of frames a particle is drawn before regeneration
  var PARTICLE_LINE_WIDTH = 2 // line width of a drawn particle
  var PARTICLE_MULTIPLIER = 1 / 30 // particle count scalar (completely arbitrary--this values looks nice)
  var PARTICLE_REDUCTION = 0.05 // 0.75     // reduce particle count to this much of normal for mobile devices
  var FRAME_RATE = 20 // desired milliseconds per frame
  var BOUNDARY = 0.45

  var NULL_WIND_VECTOR = [NaN, NaN, null] // singleton for no wind in the form: [u, v, magnitude]
  //var TRANSPARENT_BLACK = [255, 0, 0, 0]
  //var τ = 2 * Math.PI
  //var H = Math.pow(10, -5.2)

  // interpolation for vectors like wind (u,v,m)
  var bilinearInterpolateVector = function (x, y, g00, g10, g01, g11) { // 获取目标点的风场值
    var rx = (1 - x)
    var ry = (1 - y)
    var a = rx * ry, b = x * ry, c = rx * y, d = x * y
    var u = g00[0] * a + g10[0] * b + g01[0] * c + g11[0] * d
    var v = g00[1] * a + g10[1] * b + g01[1] * c + g11[1] * d
    return [u, v, Math.sqrt(u * u + v * v)]
  }

  var createWindBuilder = function (uComp, vComp) {
    var uData = uComp.data, vData = vComp.data
    return {
      header: uComp.header,
      // recipe: recipeFor("wind-" + uComp.header.surface1Value),
      data: function (i) {
        return [uData[i], vData[i]]
      },
      interpolate: bilinearInterpolateVector
    }
  }

  var createBuilder = function (data) {
    var uComp = null, vComp = null, scalar = null
    data.forEach(function (record) {
      switch (record.header.parameterCategory + ',' + record.header.parameterNumber) {
        case '2,2': uComp = record; break
        case '2,3': vComp = record; break
        default:
          scalar = record
      }
    })
    return createWindBuilder(uComp, vComp)
  }

  var buildGrid = function (data, callback) { // 构建地理坐标的风场格网
    var builder = createBuilder(data) // {header:,data:[[u,v]],interpolate}
	  // lo1:0  la1:90 lo2:359 la2:-90 dx:1 dy:1 nx:360 ny:181
	  // lo1:70 la1:55 lo2:140 la2:0 
    var header = builder.header
    var λ0 = header.lo1, φ0 = header.la1 // 格网原点 (e.g., 0.0E, 90.0N)
    var Δλ = header.dx, Δφ = header.dy // 格网点之间的距离 (e.g., 2.5 deg lon, 2.5 deg lat)
    var ni = header.nx, nj = header.ny // 格网行列数 W-E and N-S (e.g., 144 x 73)  nx列数  ny行数
	  // "refTime": "2014-11-30T06:00:00.000Z",
    var date = new Date(header.refTime)
	  // "forecastTime": 6,
    date.setHours(date.getHours() + header.forecastTime)

    // Scan mode 0 assumed. Longitude increases from λ0, and latitude decreases from φ0.
    // http://www.nco.ncep.noaa.gov/pmb/docs/grib2/grib2_table3-4.shtml
    var grid = [], p = 0
    var isContinuous = Math.floor(ni * Δλ) >= 360
    //for (var j = 0; j < nj; j++) {   
    for (var j = nj-1; j >=0; j--) {
      var row = []
      for (var i = 0; i < ni; i++, p++) {
        row[i] = builder.data(p)
      }
      if (isContinuous) {
        // For wrapped grids, duplicate first column as last column to simplify interpolation logic
        row.push(row[0])
      }
		  // 获取每行的风场数据组
      grid[j] = row
    }

	  // λ, φ为经纬度坐标
    function interpolate (λ, φ) {
      var i = floorMod(λ - λ0, 360) / Δλ // calculate longitude index in wrapped range [0, 360)  计算x对应的格网索引
      var j = (φ0 - φ) / Δφ // calculate latitude index in direction +90 to -90   计算y对应的格网索引  
      var fi = Math.floor(i), ci = fi + 1 // 向下取整得到x索引
      var fj = Math.floor(j), cj = fj + 1 // 向下取整得到y索引

      var row
      if ((row = grid[fj])) {
        var g00 = row[fi] // 得到格网的u和v值
        var g10 = row[ci]
        if (isValue(g00) && isValue(g10) && (row = grid[cj])) {
          var g01 = row[fi]
          var g11 = row[ci]
          if (isValue(g01) && isValue(g11)) {
            // All four points found, so interpolate the value.
            return builder.interpolate(i - fi, j - fj, g00, g10, g01, g11)
          }
        }
      }
      return null
    }
    callback({
      date: date,
      interpolate: interpolate
    })
  }

  /**
   * @returns {Boolean} true if the specified value is not null and not undefined.
   */
  var isValue = function (x) {
    return x !== null && x !== undefined
  }

  /**
   * @returns {Number} returns remainder of floored division, i.e., floor(a / n). Useful for consistent modulo
   *          of negative numbers. See http://en.wikipedia.org/wiki/Modulo_operation.
   */

  var floorMod = function (a, n) {
    return a - n * Math.floor(a / n)
  }

  /**
   * @returns {Number} the value x clamped to the range [low, high].
   */
  var clamp = function (x, range) {
    return Math.max(range[0], Math.min(x, range[1]))
  }

  /**
   * @returns {Boolean} true if agent is probably a mobile device. Don't really care if this is accurate.
   */
  var isMobile = function () {
    return (/android|blackberry|iemobile|ipad|iphone|ipod|opera mini|webos/i).test(navigator.userAgent)
  }

  /**
   * Calculate distortion of the wind vector caused by the shape of the projection at point (x, y). The wind
   * vector is modified in place and returned by this function.
   */
  // 计算因为投影造成的风场向量数据的变形
  // distort(projection, λ, φ, x, y, velocityScale, wind, extent);  λ, φ为经纬度坐标  x, y为屏幕坐标
  var distort = function (projection, λ, φ, x, y, scale, wind, windy) {
    var u = wind[0] * scale
    var v = wind[1] * scale
    var d = distortion(projection, λ, φ, x, y, windy)

    // Scale distortion vectors by u and v, then add.
    // 通过风场u和v向量设置比例，能够控制线段绘制长度
    if(mapView.scale>9244648.868618){
      wind[0] = d[0] * u + d[2] * v;
      wind[1] = d[1] * u + d[3] * v;
    }else{
      wind[0] = (d[0] * u + d[2] * v) * mapView.scale*0.00000003;//liping
      if(wind[0]<1) wind[0] *= 2;
      wind[1] = (d[1] * u + d[3] * v) * mapView.scale*0.00000003;//liping
      if(wind[1]<1) wind[1] *= 2;
    }
	  //wind[0] = (d[0] * u + d[2] * v) * mapView.scale * 0.000000003
    //wind[1] = (d[1] * u + d[3] * v) * mapView.scale * 0.000000003
    return wind
  }

  var distortion = function (projection, λ, φ, x, y, windy) {
    var τ = 2 * Math.PI
	  // 投影坐标系用下面的
    var H = Math.pow(10, -5.2)
	  // 地理坐标系用下面的
	  //var H = 3;
    var hλ = λ < 0 ? H : -H
    var hφ = φ < 0 ? H : -H

    var pλ = project(φ, λ + hλ, windy)
    var pφ = project(φ + hφ, λ, windy)

    // Meridian scale factor (see Snyder, equation 4-3), where R = 1. This handles issue where length of 1º λ
    // changes depending on φ. Without this, there is a pinching effect at the poles.
    var k = Math.cos(φ / 360 * τ)
    return [
      (pλ[0] - x) / hλ / k,
      (pλ[1] - y) / hλ / k,
      (pφ[0] - x) / hφ,
      (pφ[1] - y) / hφ
    ]
  }

  var createField = function (columns, bounds, callback) {
    /**
       * @returns {Array} wind vector [u, v, magnitude] at the point (x, y), or [NaN, NaN, null] if wind
       *          is undefined at that point.
       */
    function field (x, y) {
      var column = columns[Math.round(x)]
      return (column && column[Math.round(y)]) || NULL_WIND_VECTOR
    }

    // Frees the massive "columns" array for GC. Without this, the array is leaked (in Chrome) each time a new
    // field is interpolated because the field closure's context is leaked, for reasons that defy explanation.
    field.release = function () {
      columns = []
    }

    field.randomize = function (o) { // UNDONE: this method is terrible
      var x, y
      var safetyNet = 0
      do {
        x = Math.round(Math.floor(Math.random() * bounds.width) + bounds.x)
        y = Math.round(Math.floor(Math.random() * bounds.height) + bounds.y)
      } while (field(x, y)[2] === null && safetyNet++ < 30)
      o.x = x
      o.y = y
      return o
    }

    // field.overlay = mask.imageData;
    // return field;
    callback(bounds, field)
  }

  //
  // bounds [[0,0],[map.width, map.height]]
  // width map.width  单位px
  // height  map.height 单位px
  var buildBounds = function (bounds, width, height) {
    var upperLeft = bounds[0]
    var lowerRight = bounds[1]
    var x = Math.round(upperLeft[0]) // Math.max(Math.floor(upperLeft[0], 0), 0);
    // var y = Math.max(Math.floor(upperLeft[1], 0), 0);
	  var y = Math.max(Math.floor(upperLeft[1]), 0)
          //var xMax = Math.min(Math.ceil(lowerRight[0], width), width - 1);
          //var yMax = Math.min(Math.ceil(lowerRight[1], height), height - 1);
	  //var xMax = Math.min(Math.ceil(lowerRight[0]), width - 1)
    var yMax = Math.min(Math.ceil(lowerRight[1]), height - 1)
    return {x: x, y: y, xMax: width, yMax: yMax, width: width, height: height}
  }

  var deg2rad = function (deg) {
    return (deg / 180) * Math.PI
  }
  // 弧度转换成角度
  var rad2deg = function (ang) {
    return ang / (Math.PI / 180.0)
  }

  // 将屏幕坐标转换成经纬度坐标
  // windy 以弧度为单位的map范围 x和y单位为px
  var invert = function (x, y, windy) {
    var mapLonDelta = windy.east - windy.west
    // 计算px为单位的地球半径
    var worldMapRadius = windy.width / rad2deg(mapLonDelta) * 360 / (2 * Math.PI) // windy.width单位为px
    var mapOffsetY = (worldMapRadius / 2 * Math.log((1 + Math.sin(windy.south)) / (1 - Math.sin(windy.south))))
    var equatorY = windy.height + mapOffsetY
    var a = (equatorY - y) / worldMapRadius

    var lat = 180 / Math.PI * (2 * Math.atan(Math.exp(a)) - Math.PI / 2)
    // 计算任意一点屏幕x换算成经纬度坐标
    var lon = rad2deg(windy.west) + x / windy.width * rad2deg(mapLonDelta)
    return [lon, lat]
  }

  var mercY = function (lat) {
    return Math.log(Math.tan(lat / 2 + Math.PI / 4))
  }

  // 经纬度转屏幕坐标
  var project = function (lat, lon, windy) { // both in radians, use deg2rad if neccessary
    var ymin = mercY(windy.south)
    var ymax = mercY(windy.north)
    var xFactor = windy.width / (windy.east - windy.west)
    var yFactor = windy.height / (ymax - ymin)
    var y = mercY(deg2rad(lat))
    var x = (deg2rad(lon) - windy.west) * xFactor
    y = (ymax - y) * yFactor // y points south
    return [x, y]
  }

  // bounds  {x: x, y: y, xMax: width, yMax: yMax, width: width, height: height}
  // extent 以弧度为单位的map范围
  var interpolateField = function (grid, bounds, extent, callback) {
    var projection = {}
    //debugger;
    //{ "level": 4, "resolution": 9783.93962049996, "scale": 36978595.474472 },
    //{ "level": 5, "resolution": 4891.96981024998, "scale": 18489297.737236 },
    //级别小于6的时候切换风速
    var velocityScale = VELOCITY_SCALE
    if(store.state.mapview.scale > 9244648.868618)
    {
      velocityScale = VELOCITY_SCALE *0.4;
      console.log("velocityScale:"+velocityScale);
    }

    var columns = []
    var x = bounds.x // bounds里的单位为px

    function interpolateColumn (x) {
      var column = []
      // y的间隔为2个屏幕像素
      for (var y = bounds.y; y <= bounds.yMax; y += 2) {
			    // 将屏幕坐标换算成经纬度坐标
        var coord = invert(x, y, extent)
        if (coord) {
          var λ = coord[0], φ = coord[1]
          // isFinite判断是否是有界，而不是无穷大
          if (isFinite(λ)) {
            // 根据周围四个格网进行内插
            var wind = grid.interpolate(λ, φ) // wind值为[u, v, Math.sqrt(u * u + v * v)]
            if (wind) {
              wind = distort(projection, λ, φ, x, y, velocityScale, wind, extent)
              column[y + 1] = column[y] = wind
            }
          }
        }
      }
      columns[x + 1] = columns[x] = column
    }

    (function batchInterpolate () {
      var start = Date.now()
      while (x < bounds.width) {
        interpolateColumn(x)
        x += 2
        if ((Date.now() - start) > 1000) { // MAX_TASK_TIME) {
          setTimeout(batchInterpolate, 25)
          return
        }
      }
      createField(columns, bounds, callback)
    })()
  }

  var animate = function (bounds, field) {
    function asColorStyle (r, g, b, a) {
      return 'rgba(' + 243 + ', ' + 243 + ', ' + 238 + ', ' + a + ')'
    }

    function hexToR (h) { return parseInt((cutHex(h)).substring(0, 2), 16) }
    function hexToG (h) { return parseInt((cutHex(h)).substring(2, 4), 16) }
    function hexToB (h) { return parseInt((cutHex(h)).substring(4, 6), 16) }
    function cutHex (h) { return (h.charAt(0) == '#') ? h.substring(1, 7) : h }

    function windIntensityColorScale (step, maxWind) { // 将风场分为不同类别颜色  maxWind=40

      var result = [
        // blue to red
		   /*
          "rgba(" + hexToR('#178be7') + ", " + hexToG('#178be7') + ", " + hexToB('#178be7') + ", " + 0.5 + ")",
          "rgba(" + hexToR('#8888bd') + ", " + hexToG('#8888bd') + ", " + hexToB('#8888bd') + ", " + 0.5 + ")",
          "rgba(" + hexToR('#b28499') + ", " + hexToG('#b28499') + ", " + hexToB('#b28499') + ", " + 0.5 + ")",
          "rgba(" + hexToR('#cc7e78') + ", " + hexToG('#cc7e78') + ", " + hexToB('#cc7e78') + ", " + 0.5 + ")",
          "rgba(" + hexToR('#de765b') + ", " + hexToG('#de765b') + ", " + hexToB('#de765b') + ", " + 0.5 + ")",
          "rgba(" + hexToR('#ec6c42') + ", " + hexToG('#ec6c42') + ", " + hexToB('#ec6c42') + ", " + 0.5 + ")",
          "rgba(" + hexToR('#f55f2c') + ", " + hexToG('#f55f2c') + ", " + hexToB('#f55f2c') + ", " + 0.5 + ")",
          "rgba(" + hexToR('#fb4f17') + ", " + hexToG('#fb4f17') + ", " + hexToB('#fb4f17') + ", " + 0.5 + ")",
          "rgba(" + hexToR('#fe3705') + ", " + hexToG('#fe3705') + ", " + hexToB('#fe3705') + ", " + 0.5 + ")",
          "rgba(" + hexToR('#ff0000') + ", " + hexToG('#ff0000') + ", " + hexToB('#ff0000') + ", " + 0.5 + ")"
          */
        'rgba(' + hexToR('#00ffff') + ', ' + hexToG('#00ffff') + ', ' + hexToB('#00ffff') + ', ' + 0.5 + ')',
        'rgba(' + hexToR('#64f0ff') + ', ' + hexToG('#64f0ff') + ', ' + hexToB('#64f0ff') + ', ' + 0.5 + ')',
        'rgba(' + hexToR('#87e1ff') + ', ' + hexToG('#87e1ff') + ', ' + hexToB('#87e1ff') + ', ' + 0.5 + ')',
        'rgba(' + hexToR('#a0d0ff') + ', ' + hexToG('#a0d0ff') + ', ' + hexToB('#a0d0ff') + ', ' + 0.5 + ')',
        'rgba(' + hexToR('#b5c0ff') + ', ' + hexToG('#b5c0ff') + ', ' + hexToB('#b5c0ff') + ', ' + 0.5 + ')',
        'rgba(' + hexToR('#c6adff') + ', ' + hexToG('#c6adff') + ', ' + hexToB('#c6adff') + ', ' + 0.5 + ')',
        'rgba(' + hexToR('#d49bff') + ', ' + hexToG('#d49bff') + ', ' + hexToB('#d49bff') + ', ' + 0.5 + ')',
        'rgba(' + hexToR('#e185ff') + ', ' + hexToG('#e185ff') + ', ' + hexToB('#e185ff') + ', ' + 0.5 + ')',
        'rgba(' + hexToR('#ec6dff') + ', ' + hexToG('#ec6dff') + ', ' + hexToB('#ec6dff') + ', ' + 0.5 + ')',
        'rgba(' + hexToR('#ff1edb') + ', ' + hexToG('#ff1edb') + ', ' + hexToB('#ff1edb') + ', ' + 0.5 + ')'
       
      ]
      //地形图模式切换风的颜色
      if(store.state.mapview.map.basemap.id=="myVectorBasemap"){
        result = ['rgba(' + hexToR('#5b83ed') + ', ' + hexToG('#5b83ed') + ', ' + hexToB('#5b83ed') + ', ' + 0.5 + ')']
      }
      if(store.state.mapview.map.basemap.id=="myImageBasemap"){
        result = ['rgba(' + hexToR('#FFFFFF') + ', ' + hexToG('#FFFFFF') + ', ' + hexToB('#FFFFFF') + ', ' + 0.8 + ')']
      }
      /*
        var result = [];
        for (var j = 225; j >= 100; j = j - step) {
          result.push(asColorStyle(j, j, j, 1));
        }
       */
      
      result.indexFor = function (m) { // map wind speed to a style
        return Math.floor(Math.min(m, maxWind) / maxWind * (result.length - 1))
      }
      
      return result
    }

    var colorStyles = windIntensityColorScale(INTENSITY_SCALE_STEP, MAX_WIND_INTENSITY)
    var buckets = colorStyles.map(function () { return [] })

    //PARTICLE_MULTIPLIER=100/mapView.scale;//控制不同比例尺显示网格数量
    //var particleCount = Math.round(bounds.width * bounds.height * PARTICLE_MULTIPLIER)
    //particleCount = 1050
    var particleCount = 500
    if (isMobile()) {
      particleCount *= PARTICLE_REDUCTION
    }
    // 控制fadeFillStyle中透明度，能控制尾巴显示的长度
    //var fadeFillStyle = 'rgba(0, 0, 0, 0.9)'
    var fadeFillStyle = 'rgba(0, 0, 0, 0.9)'
    var particles = []
    for (var i = 0; i < particleCount; i++) {
      particles.push(field.randomize({age: Math.floor(Math.random() * MAX_PARTICLE_AGE) + 0}))
    }

    function evolve () { // 该方法将平面点根据风场值移动到下一点
      buckets.forEach(function (bucket) { bucket.length = 0 })
      particles.forEach(function (particle) {
        if (particle.age > MAX_PARTICLE_AGE) {
          field.randomize(particle).age = 0
        }

        var x = particle.x
        var y = particle.y
        var v = field(x, y) // vector at current position
        var m = v[2]
        if (m === null) {
          particle.age = MAX_PARTICLE_AGE // particle has escaped the grid, never to return...
        } else {
          var xt = x + v[0]
          var yt = y + v[1]
          if (field(xt, yt)[2] !== null) {
            // Path from (x,y) to (xt,yt) is visible, so add this particle to the appropriate draw bucket.
            particle.xt = xt
            particle.yt = yt
            buckets[colorStyles.indexFor(m)].push(particle)
          } else {
            // Particle isn't visible, but it still moves through the field.
            particle.x = xt
            particle.y = yt
          }
        }
        particle.age += 1
      })
    }

    var g = params.canvas.getContext('2d')
    g.lineWidth = PARTICLE_LINE_WIDTH
    g.fillStyle = fadeFillStyle

    function draw () { // 在地图上画风场
      // Fade existing particle trails.
      // globalCompositeOperation 如何将一个源（新的）图像绘制到目标（已有）的图像上
      // destination-in  在后绘制的图形中显示先绘制的图形。只绘制相交部分,由先绘制图形的填充覆盖,其余部分透明

      var prev = g.globalCompositeOperation
      g.globalCompositeOperation = 'destination-in'
      g.fillRect(bounds.x, bounds.y, bounds.width, bounds.height)
      g.globalCompositeOperation = prev

      // Draw new particle trails.
      buckets.forEach(function (bucket, i) {
        if (bucket.length > 0) {
          g.beginPath()
          g.strokeStyle = colorStyles[i]
          bucket.forEach(function (particle) {
            // 先保存一个坐标
            g.moveTo(particle.x, particle.y)
            // 从moveto提供的坐标绘制到lineto的坐标
            g.lineTo(particle.xt, particle.yt)
            particle.x = particle.xt
            particle.y = particle.yt
          })
          g.stroke()
        }
      })
    }

    (function frame () {
      try {
        // 1000 / FRAME_RATE
        windy.timer = setTimeout(function () {
          requestAnimationFrame(frame)
          evolve()
          draw()
        }, 1000 / FRAME_RATE)
      } catch (e) {
        console.error(e)
      }
    })()
  }
  var start = function (bounds, width, height, extent) {
    // bounds [[0,0],[map.width, map.height]]
    // width map.width  单位px
    // height  map.height 单位px
    // extent [[map.geographicExtent.xmin, map.geographicExtent.ymin],[map.geographicExtent.xmax,
    
    var mapBounds = {
      south: deg2rad(extent[0][1]),
      north: deg2rad(extent[1][1]),
      east: deg2rad(extent[1][0]),
      west: deg2rad(extent[0][0]),
      width: width,
      height: height
    }
    stop()
    // build grid
    // 数据格式为u和v两个元素
    buildGrid(params.data, function (grid) {
      // interpolateField
      interpolateField(grid, buildBounds(bounds, width, height), mapBounds, function (bounds, field) {
        // animate the canvas with random points
        windy.field = field
        animate(bounds, field)
      })
    })
    
  }

  var stop = function () {
    //移除监听事件
    if (windy.field) windy.field.release()
    if (windy.timer) clearTimeout(windy.timer)
  }

  var windy = {
    params: params,
    start: start,
    stop: stop
  }
  return windy
}

export const createWindLayer = function (curMapView,windData) {
  loadModules(['esri/geometry/support/webMercatorUtils'])
    .then(([webMercatorUtils]) => {
  let overlayContainer = curMapView.container.getElementsByClassName('esri-overlay-surface')[0]
  let windCanvas = document.getElementById('wind-canvas')
  if(!windCanvas){
    windCanvas = document.createElement('canvas')
    windCanvas.width = curMapView.width
    windCanvas.height = curMapView.height
    windCanvas.setAttribute('id', 'wind-canvas')
    windCanvas.style = "position: absolute; border: none; padding: 0;  margin: 0; left: 0;  top: 0;  overflow: hidden;z-index: 0;pointer-events: none;"
    overlayContainer.appendChild(windCanvas)
    myWindy = store.state.windObject = Windy({ canvas: windCanvas, data: windData, mapView: curMapView })
  }
  else{
    //var context = windCanvas.getContext('2d');
    //context.clearRect(0,0,curMapView.width,curMapView.height);
    //myWindy.stop()
    if(myWindy){
      myWindy.params = { canvas: windCanvas, data: windData, mapView: curMapView }
    }
  }
  /*
  if (overlayContainer && windCanvas) {
    overlayContainer.removeChild(windCanvas);
  }
  */
  //windJsonUrl = 'http://localhost/2019113008.json';
    // 此处不再请求json文件
  
  // 需要采用地理坐标
  //let extent = store.state.mapview.extent
  //let curGeoExtent = webMercatorUtils.webMercatorToGeographic(extent)
  //redraw() 
})
}
export const clearWindCanvas = function(){
  let windCanvas = document.getElementById('wind-canvas')
    
    if (windCanvas){
      var context = windCanvas.getContext('2d');
      context.clearRect(0,0,store.state.mapview.width,store.state.mapview.height);
    }
    /*
    if(myWindy){
      myWindy.stop();
    }
    */
}
export const redraw = function () {
  loadModules(['esri/geometry/support/webMercatorUtils'])
     .then(([webMercatorUtils]) => {
      let windCanvas = document.getElementById('wind-canvas')
      if (myWindy && windCanvas) {
        let curMapView = store.state.mapview;
        windCanvas.width = curMapView.width
        windCanvas.height = curMapView.height
        // 需要采用地理坐标
        let extent = curMapView.extent
        let curGeoExtent = webMercatorUtils.webMercatorToGeographic(extent)
        setTimeout(function () {
          myWindy.start(
            [[0, 0], [curMapView.width, curMapView.height]],
            curMapView.width,
            curMapView.height,
            [[curGeoExtent.xmin, curGeoExtent.ymin], [curGeoExtent.xmax, curGeoExtent.ymax]]
          )
        }, 100)
        
      }
  })
}
export const addWindHandle = function(){
  windBaseMapHandle = store.state.map.watch("basemap",function(response){
    redraw();
  });
  //监听地图是否静止
  windStationaryHandle = store.state.mapview.watch("stationary", newValue => {
    let windCanvas = document.getElementById('wind-canvas')
    if(windCanvas && myWindy){
      //extent = store.state.mapview.extent
      //curGeoExtent = webMercatorUtils.webMercatorToGeographic(extent)
      //var context = windCanvas.getContext('2d');
      //context.clearRect(0,0,store.state.mapview.width,store.state.mapview.height);
      redraw(); 
    }  
  });
  windMapZoomHandle = store.state.mapview.watch("zoom", newValue => {
    clearWindCanvas();
  });
  /*
  windMouseWheelHandle = store.state.mapview.on("mouse-wheel", function(evt){
    clearWindCanvas();
  });
  */
  windExtentHandle = store.state.mapview.watch("animation", function(response){
    //滚轮和goto会触发animation
    if(response && response.state === "running"){     
      if(windStationaryHandle){
        windStationaryHandle.remove();
      }
    }
    else{
      windStationaryHandle = store.state.mapview.watch("stationary", newValue => {
        let windCanvas = document.getElementById('wind-canvas')
        if(windCanvas && myWindy){
          //extent = store.state.mapview.extent
          //curGeoExtent = webMercatorUtils.webMercatorToGeographic(extent)
          //var context = windCanvas.getContext('2d');
          //context.clearRect(0,0,store.state.mapview.width,store.state.mapview.height);
          redraw(); 
        }  
      });
    }
  });
  windMouseDownHandle = store.state.mapview.on("pointer-down", function(evt){
    /*
    if(windStationaryHandle){
      windStationaryHandle.remove();
    }
    */
    clearWindCanvas();
  });
  windResizeHandle = store.state.mapview.on("resize",function(evt){
    clearWindCanvas();
  });
  windMouseUpHandle = store.state.mapview.on("pointer-up", function(evt){
    redraw();
  })
}
export const removeWindHandle = function(){
  if(windBaseMapHandle){
    windBaseMapHandle.remove();
  }
  if(windMapZoomHandle){
    windMapZoomHandle.remove(); 
  }
  if(windMouseWheelHandle){
    windMouseWheelHandle.remove();
  }
  if(windMouseDownHandle){
    windMouseDownHandle.remove();
  }
  if(windResizeHandle){
    windResizeHandle.remove();
  }
  if(windMouseUpHandle){
    windMouseUpHandle.remove();
  }
  if(windExtentHandle){
    windExtentHandle.remove();
  }
  if(windStationaryHandle){
    windStationaryHandle.remove();
  }
}

window.requestAnimationFrame = (function() {
  return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback) {
          window.setTimeout(callback, 1000 / 20);
      }
  );
})();

