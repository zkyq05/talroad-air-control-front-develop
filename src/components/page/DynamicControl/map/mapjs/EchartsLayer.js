import { loadModules } from 'esri-loader'
import echarts from 'echarts'
export const EchartsLayer = function (view, option, domDiv) {
  var myEchartLayer = {
    view: null,
    box: null,
    chart: null,
    chartOption: null,
    visible: true,
    domDiv: null,
    init (view, option, domDiv) {
      this.domDiv = domDiv
      echarts.registerCoordinateSystem('arcgis', this.getE3CoordinateSystem(view))
      this.setBaseMap(view)
      this.createLayer()
      this.setChartOption(option)
    },
    setBaseMap: function (view) {
      this.view = view
    },
    setChartOption: function (option) {
      this.chartOption = option
      this.setCharts()
    },
    setVisible: function (bool) {
      if (!this.box || this.visible === bool) return
      this.box.hidden = !bool
      this.visible = bool
      bool === true && setCharts()
    },
    refreshBegin: function () {
      this.box.hidden = true
    },
    refreshing: function () {
      setCharts()
    },
    refreshEnd: function () {
      this.box.hidden = false
    },
    on: function (eventName, handler, context) {
      this.chart.on(eventName, handler, context)
    },
    off: function (eventName, handler, context) {
      this.chart.off(eventName, handler, context)
    },
    map_DragStart_Listener: null,
    map_DragEnd_Listener: null,
    map_ZoomStart_Listener: null,
    map_ZoomEnd_Listener: null,
    map_ExtentChange_Listener: null,
    map_click_Listener: null,
    setCharts: function () {
      if (!this.visible) return
      if (this.chartOption == null || this.chartOption == 'undefined') return
      let baseExtent = this.view.extent
      // 判断是否使用了mark类型标签，每次重绘要重新转换地理坐标到屏幕坐标
      // 根据地图extent,重绘echarts
      this.chartOption.xAxis = {show: false, min: baseExtent.xmin, max: baseExtent.xmax}
      this.chartOption.yAxis = {show: false, min: baseExtent.ymin, max: baseExtent.ymax}
      this.chart.setOption(this.chartOption)
      this.chartOption.animation = false
    },
    /* 创建layer的容器，添加到map的layers下面 */
    createLayer: function () {
      //let parent = document.getElementsByClassName('esri-view-surface')[0]
      let parent = view.container.getElementsByClassName('esri-overlay-surface')[0]
      let ecanvas = document.getElementById(this.domDiv)
      if (ecanvas) {
        parent.removeChild(ecanvas)
      }
      //let box = this.box = document.createElement('div')
      let box = this.box = document.createElement('canvas')
      box.setAttribute('id', this.domDiv)
      box.setAttribute('name', this.domDiv)
      box.style.width = this.view.width + 'px'
      box.style.height = this.view.height + 'px'
      box.style.position = 'absolute'
      box.style.top = 0
      box.style.left = 0
      parent.appendChild(box)
      this.chart = echarts.init(box)
      // this.setCharts();
      this.startMapEventListeners()
    },
    /* 销毁实例 */
    removeLayer: function () {
      this.box.outerHTML = ''
      this.view = null
      this.box = null
      this.originLyr = null
      this.features = null
      this.screenData = []
      this.chart = null
      this.chartOption = null
      if (this.map_DragStart_Listener) {
        this.map_DragStart_Listener.remove()
      }
      if (this.map_DragEnd_Listener) {
        this.map_DragEnd_Listener.remove()
      }
      if (this.map_ZoomStart_Listener) {
        this.map_ZoomStart_Listener.remove()
      }
      if (this.map_ZoomEnd_Listener) {
        this.map_ZoomEnd_Listener.remove()
      }
      if (this.map_ExtentChange_Listener) {
        this.map_ExtentChange_Listener.remove()
      }
    },
    /* 监听地图事件，根据图层是否显示，判断是否重绘echarts */
    startMapEventListeners: function () {
      let view = this.view
      view.watch('extent', (newValue) => {
        if (!this.visible) return
        this.setCharts()
        this.chart.resize()
        this.box.hidden = false
      })
      /*
      view.watch('rotation', (newValue) => {
        if (!this.visible) return
        this.setCharts()
        this.chart.resize()
        this.box.hidden = false
      })
      */
    },
    getE3CoordinateSystem: function (map) {
      var CoordSystem = function CoordSystem (map) {
        this.map = map
        this._mapOffset = [0, 0]
      }
      CoordSystem.create = function (ecModel) {
					  ecModel.eachSeries(function (seriesModel) {
						  if (seriesModel.get('coordinateSystem') === 'arcgis') {
            seriesModel.coordinateSystem = new CoordSystem(map)
          }
        })
      }
      CoordSystem.getDimensionsInfo = function () {
        return ['x', 'y']
      }
      CoordSystem.dimensions = ['x', 'y']
      CoordSystem.prototype.dimensions = ['x', 'y']
      CoordSystem.prototype.setMapOffset = function setMapOffset (mapOffset) {
        this._mapOffset = mapOffset
      }
      CoordSystem.prototype.dataToPoint = function dataToPoint (data) {
					   var point = {
          type: 'point',
          x: data[0],
          y: data[1],
          spatialReference: { wkid: 4326 }
        }
					   var px = map.toScreen(point)
					   var mapOffset = this._mapOffset
					   return [px.x - mapOffset[0], px.y - mapOffset[1]]
					   }
      CoordSystem.prototype.pointToData = function pointToData (pt) {
        var mapOffset = this._mapOffset
        var screentPoint = { x: pt[0] + mapOffset[0],
												  y: pt[1] + mapOffset[1]
        }
        var data = map.toMap(screentPoint)
        return [data.x, data.y]
      }
      return CoordSystem
    }
  }
  return myEchartLayer
}
