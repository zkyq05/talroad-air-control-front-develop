<template>
  <div class="main-left" style="left:15px;">
    <div class="operate-box">
      <ul class="operate-list">
        <li class="operate-item jianhao" @click="zoomoutBtn">
        </li>
        <li class="operate-item jiahao" @click="zoominBtn">
        </li>
        <li class="operate-item quanhao" @click="fullscreenBtn">
        </li>
      </ul>
      <ul class="map-operate">
        <li class="operate-item operate01" @click="fullmapBtn()">
        </li>
        <li class="operate-item operate02">
          <ul class="map-sub-nav">
            <li @click="measurement_line($event)">测距</li>
            <li @click="addRoadData($event)">路况</li>
          </ul>
        </li>
        <li class="operate-item operate03">
          <ul class="map-sub-nav">
            <li class="is-active" @click="changeBaseMap('01',$event)">普通</li>
            <li @click="changeBaseMap('02',$event)">卫星</li>
            <li @click="changeBaseMap('03',$event)">地形</li>
          </ul>
        </li>
        <li class="operate-text" @click="setRenderType('numrender',$event)">
          数值
        </li>
        <li class="operate-text" @click="setRenderType('namerender',$event)">
          名称
        </li>
      </ul>
    </div>
    <!-- <div class="search-box">
      <div class="search-input">
        <input type="text" placeholder="">
        <div class="search-icon">
          <i class="fa fa-search " style="color:#fff"></i>
        </div>
      </div>
    </div> -->
  </div>  
</template>

<script>
import screenfull from "screenfull";
import { loadModules } from "esri-loader";
import { baseMapUrl,mapCenter,mapExtent } from "./mapjs/AppConfig";
export default {
  name: "HeaderToolButton",
  data() {
    return {
      fullscreen: false,
      Map_annotation_show: false,
      Graphics_add_even:true,
      Sketchpad_toggle: "add_label",
      annotation_color:[0, 148, 252]
    };
  },
  methods: {
    //全屏
    fullscreenBtn:function(){
      /*
      // 如果不允许进入全屏，发出不允许提示
      if (!screenfull.enabled) {
        this.$message("您的浏览器不能全屏");
        return false;
      }
      screenfull.toggle();
      */
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
        document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
        element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
        // IE11
        element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
     //放大
    zoominBtn: function(event) {
      let curMapView = this.$store.state.mapview;
      if (curMapView.zoom + 1 <= curMapView.constraints.maxZoom) {
        curMapView.zoom = curMapView.zoom + 1;
      }
    },
    //缩小
    zoomoutBtn: function(event) {
      let curMapView = this.$store.state.mapview;
      if (curMapView.zoom - 1 >= curMapView.constraints.minZoom) {
        curMapView.zoom = curMapView.zoom - 1;
      }
    },
    //全局地图
    fullmapBtn: function(event) {
      let curMapView = this.$store.state.mapview;
      //curMapView.center = mapCenter;
      //curMapView.zoom = 7;
      curMapView.extent = mapExtent;
      curMapView.goTo({
        zoom: 11,
        center: mapCenter
      });
    },
    changeBaseMap: function(kind,e) {
      //增加选中class样式
      let mydom = $(e.srcElement);
      let color=mydom.css("color");

      if(color=="rgb(0, 255, 193)"){
        $(".operate03 .map-sub-nav li").removeClass("is-active");
        mydom.addClass("is-active");

      }



      let cVue =this;
      if (!cVue.$store.state.map) {
        cVue.$message("地图正在加载，请稍后点击");
      } else {
        loadModules(["esri/Basemap", "esri/layers/WebTileLayer","esri/layers/TileLayer"]).then(
          ([Basemap, WebTileLayer, TileLayer]) => {
            let myTk = "39ddede710ca9363bd1fb0e5abe5b0ef";
            //天地图矢量底图   经纬度
            let baseTileLayer = new WebTileLayer({
              id:"vectorBase",
              urlTemplate:
                "http://{subDomain}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&FORMAT=tiles&tk=" +
                myTk,
              subDomains: ["t0"]
            });
            //天地图矢量底图注记层   经纬度
            let baseAnoTileLayer = new WebTileLayer({
              id:"vectorAnoBase",
              urlTemplate:
                "http://{subDomain}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&FORMAT=tiles&tk=" +
                myTk,
              subDomains: ["t0"]
            });
            //天地图影像底图  经纬度
            let baseImageTileLayer = new WebTileLayer({
              id:"imgBase",
              urlTemplate:
                "http://{subDomain}.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&FORMAT=tiles&tk=" +
                myTk,
              subDomains: ["t0"]
            });
            //天地图影像底图注记层  经纬度
            let baseAnoImageTileLayer = new WebTileLayer({
              id:"imgAnoBase",
              urlTemplate:
                "http://{subDomain}.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&FORMAT=tiles&tk=" +
                myTk,
              subDomains: ["t0"]
            });
            //天地图地形图     墨卡托
            let baseTopographyLayer = new WebTileLayer({
              id:"topoBase",
              urlTemplate:
                "http://{subDomain}.tianditu.gov.cn/ter_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&FORMAT=tiles&tk=" +
                myTk,
              subDomains: ["t0"]
            });
            //地形注记
            let baseAnoTopographyLayer = new WebTileLayer({
              id:"topoAnoBase",
              urlTemplate:
                "http://{subDomain}.tianditu.gov.cn/cta_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cta&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&FORMAT=tiles&tk=" +
                myTk,
              subDomains: ["t0"]
            });
            let myBaseTileLayer = new TileLayer({
                url: baseMapUrl
            });
            if (kind == "01") {
              let baseMap = new Basemap({
                baseLayers: [myBaseTileLayer], //蓝黑底图
                title: "蓝黑底图",
                id: "myBlackBlueBasemap"
              });
              cVue.$store.state.map.basemap = baseMap;
              cVue.$store.state.curBaseMapId = baseMap.id;
            }
            else if (kind == "02") {
              let baseMap = new Basemap({
                baseLayers: [baseImageTileLayer, baseAnoImageTileLayer], //影像底图和注记层
                title: "卫星",
                id: "myImageBasemap"
              });
              cVue.$store.state.map.basemap = baseMap;
              cVue.$store.state.curBaseMapId = baseMap.id;
            } else if (kind == "03") {
              let baseMap = new Basemap({
                //baseLayers: [baseTileLayer, baseAnoTileLayer], //切换baseLayer   注记层在上面  矢量底图和注记层
                baseLayers: [baseTopographyLayer, baseAnoTopographyLayer], //切换baseLayer   注记层在上面  矢量底图和注记层
                title: "地形",
                id: "myVectorBasemap"
              });
              cVue.$store.state.map.basemap = baseMap;
              cVue.$store.state.curBaseMapId = baseMap.id;
            }
          }
        );
      }
    },
    //测距功能
    measurement_line: function(e) {
      let mydom = $(e.srcElement);
      let color=mydom.css("color");

      if(color=="rgb(0, 255, 193)"){
        mydom.html("移除");
        mydom.addClass("is-active");
        let Map = this.$store.state.map;
        let curMapView = this.$store.state.mapview;
        curMapView.container.style.cursor = "crosshair";
        let mylayer = Map.findLayerById("Map_measurement_layer");
        loadModules([
          "esri/views/draw/Draw",
          "esri/Graphic",
          "esri/geometry/geometryEngine",
          "esri/geometry/Polyline",
          "esri/layers/GraphicsLayer"
        ]).then(([Draw, Graphic, geometryEngine, Polyline,GraphicsLayer]) => {
          if (!mylayer) {
            var layer = new GraphicsLayer({
              id: "Map_measurement_layer"
            });
            Map.add(layer);
        }
          mylayer = Map.findLayerById("Map_measurement_layer");
          var draw = new Draw({
            view: curMapView
          });
          var action = draw.create("polyline", { mode: "click" });
          action.on("vertex-add", function(evt) {
            measureline(evt.vertices);
          });

          action.on("draw-complete", function(evt) {
            measureline(evt.vertices);
            curMapView.container.style.cursor = "default";
          });
          function measureline(vertices) {
            // debugger;
            if(mylayer){
              mylayer.removeAll();
            }
            let polyline = new Polyline({
              paths: vertices,
              spatialReference: curMapView.spatialReference
            });
            let distance = geometryEngine.geodesicLength(polyline, "kilometers");
            if (distance < 0) {
              let simplifiedPloygon = geometryEngine.simplify(polygon);
              if (simplifiedPloygon) {
                distance = geometryEngine.geodesicLength(
                  simplifiedPloygon,
                  "kilometers"
                );
              }
            }
            let graphic = new Graphic({
              geometry: polyline,
              symbol: {
                type: "simple-line", // autocasts as SimpleLineSymbol
                color: [234, 53, 34],
                width: 3,
                cap: "round",
                join: "round"
              }
            });
            mylayer.graphics.add(graphic);
            labelDistance(polyline, distance);
          }
          function labelDistance(geom, distance) {
            let graphic = new Graphic({
              geometry: geom.getPoint(0, geom.paths[0].length - 1),
              symbol: {
                type: "text",
                color: "white",
                text: distance.toFixed(2) + "km",
                xoffset: 3,
                yoffset: 3,
                font: {
                  size: 15,
                  family: "sans-serif"
                }
              }
            });
            mylayer.graphics.add(graphic);
          }
        });
      }else{
        mydom.removeClass("is-active");
        mydom.html("测距");
        let Map = this.$store.state.map;
        let curMapView = this.$store.state.mapview;
        let mylayer = Map.findLayerById("Map_measurement_layer");
        // debugger;
        if(mylayer){
          mylayer.removeAll();
        }
      }
    },
    //路况
    addRoadData:function(e){
      //增加选中class样式
      let mydom = $(e.srcElement);
      let color=mydom.css("color");

      if(color=="rgb(0, 255, 193)"){
        mydom.addClass("is-active");
      }else{
        mydom.removeClass("is-active");
      }

      loadModules([
        "esri/layers/BaseTileLayer","esri/config"
      ]).then(([BaseTileLayer,esriConfig]) => {
           //4.x下需要跨域配置，才能加载路况数据
          esriConfig.request.proxyUrl = "http://10.0.201.241/proxy/proxy.ashx";
          var GDRoadLayer = BaseTileLayer.createSubclass({
            properties: {
              urlTemplate: null
            },
            // generate the tile url for a given level, row and column
            getTileUrl: function(level, row, col) {
              //获取当前时间
              var nowDate = new Date();
              var year = nowDate.getFullYear();
              var month = nowDate.getMonth() + 1;
              var today = nowDate.getDate();
              var hours = nowDate.getHours();
              var minutes = nowDate.getMinutes();
              var seconds = nowDate.getSeconds();
          
              if (month >= 1 && month<= 9) {
                month = "0" + month;
              }
              if (today >= 1 && today <= 9) {
                today = "0" + today;
              }
              var currentdate = year + "-" + month + "-" + today + " " + hours + ":" + minutes + ":" + seconds;
              var longTime = new Date(currentdate.replace(new RegExp("-", "gm"), "/")).getTime();
              var url = "http://tm.amap.com/trafficengine/mapabc/traffictile?v=1.0&t=1&x="+col+"&y="+row+"&z="+level+"&t="+longTime+"";
              return url;
          }
        });
        let layer = this.$store.state.map.findLayerById("gdRoadLayer");
        if(layer!=null){
            //cVue.$store.state.map.remove(layer);
            let preVisible = layer.visible;
            layer.visible = !preVisible;
        }
        else{
          var gdroad = new GDRoadLayer({
            urlTemplate:"",
            id:"gdRoadLayer"
          });
          this.$store.state.map.add(gdroad);
        }
        
      })
    },

    //数值、名称渲染
    setRenderType:function(selectedType,e){
      //增加选中class样式
      let mydom = $(e.srcElement);
      let color=mydom.css("color");
      if(color=="rgb(0, 255, 193)"){
        mydom.addClass("is-active");
        this.$store.state.curRenderType.push(selectedType);
      }else{
        mydom.removeClass("is-active");
        var index = this.$store.state.curRenderType.indexOf(selectedType);
        this.$store.state.curRenderType.splice(index, 1);
      }
      
    }
  }
};
</script>

<style lang="less" scoped>
.main-left {
  z-index: 10;
}
.jianhao{
  background-image: url("./images/-.svg");
  background-image: -webkit-image-set(url("./images/-.svg") );
  background-image: image-set(url("./images/-.svg"));
}
.jiahao{
  background-image: url("./images/+.svg");
  background-image: -webkit-image-set(url("./images/+.svg") );
  background-image: image-set(url("./images/+.svg"));
}
.quanhao{
  background-image: url("./images/全屏.svg");
  background-image: -webkit-image-set(url("./images/全屏.svg") );
  background-image: image-set(url("./images/全屏.svg"));
}

.operate-box {
  float: left;
  width: 38px;
}
.operate-box .map-operate {
  margin-top: 10px;
}

.operate-list .operate-item {
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 0px;
  line-height: 30px;
  text-align: center;
  transition: .3s border-color;
  margin: 4px 0 0 3px;
}
.operate-list .operate-item .icon {
  color: #8493A8;
  transition: .3s color;
  font-size: 12px;
}
.operate-list .operate-item:hover {
  border-color: rgba(255, 255, 255, 0.8);
}
.operate-list .operate-item:hover .icon {
  color: rgba(255, 255, 255, 0.8);
}

.map-operate > li {
  background-color: #324258;
  text-align: center;
  margin-top: 5px;
  cursor: pointer;
}
.map-operate > li:hover .map-sub-nav {
  display: block;
}
.map-operate .operate-text {
  font-size: 12px;
  width: 38px;
  height: 28px;
  line-height: 28px;
  border-radius: 2px 2px 0 0;
}
.map-operate .operate-text + .operate-text {
  margin-top: 1px;
  border-radius: 0 0 2px 2px;
}
.map-operate .operate-text{
  color: #fff;
  cursor: pointer;
}
.is-active{
  background-color: #1E2438 !important;
  color: #19FFC7 !important;
}
 .map-operate .operate-text:hover {
  background-color: #1E2438;
  color: #00ffc1;
}
.map-operate .operate-item {
  width: 38px;
  height: 40px;
  line-height: 38px;
  transition: .3s border-color;
  border-radius: 2px;
  background-repeat: no-repeat;
  background-position: center center;
  transition: .3s background;
  position: relative;
}
.map-operate .operate-item.operate01 {
  background-image: url('./images/ico01.png');
  background-image: -webkit-image-set(url('./images/ico01.png') 1x, url("./images/ico01@2x.png") 2x);
  background-image: image-set(url('./images/ico01.png') 1x, url("./images/ico01@2x.png") 2x);
}
.map-operate .operate-item.operate02 {
  background-image: url("./images/ico02.png");
  background-image: -webkit-image-set(url("./images/ico02.png") 1x, url("./images/ico02@2x.png") 2x);
  background-image: image-set(url("./images/ico02.png") 1x, url("./images/ico02@2x.png") 2x);
}
.map-operate .operate-item.operate03 {
  background-image: url("./images/ico03.png");
  background-image: -webkit-image-set(url("./images/ico03.png") 1x, url("./images/ico03@2x.png") 2x);
  background-image: image-set(url("./images/ico03.png") 1x, url("./images/ico03@2x.png") 2x);
}
.map-operate .operate-item .icon {
  color: #93AECE;
  font-size: 18px;
}
.map-operate .operate-item:hover {
  background-color: rgba(50, 66, 88, 0.75);
}

.map-sub-nav {
  padding-left: 2px;
  height: 38px;
  position: absolute;
  left: 38px;
  top: 0;
  min-width: 300px;
  display: none;
}
.map-sub-nav li {
  float: left;
  border-right: 1px solid #475365;
  width: auto;
  line-height: 36px;
  overflow: hidden;
  background-color: #324258;
  color:#fff;
  text-align: center;
  cursor: pointer;
  padding: 0 7px;
  font-size: 12px;
  min-width: 40px;
}
.map-sub-nav li:first-child {
  border-radius: 2px 0 0 2px;
}
.map-sub-nav li:last-child {
  border-radius: 0 2px 2px 0;
}
.map-sub-nav li{
  color: #fff;
} 
.map-sub-nav li:hover {
  border-color: transparent;
  background-color: #283446;
  text-align: center;
  color: #00ffc1;
}
.map-sub-nav li + li:hover, .map-sub-nav li:hover + li:hover {
  border-left-color: transparent;
}
ol, ul, li {
  list-style: none;
}
/*搜索*/
.search-box {
  float: right;
  margin-left: 45px;
  margin-top:15px;
}
.search-icon{
  width: 18px;
  height:18px;
  position: absolute;
  right: 10px;
  top:23px;
  font-size: 20px;
  cursor: pointer;
}
.search-box input{
  padding-right: 32px;
  line-height: 38px;
  height: 38px;
  width: 200px;
  background-color: #000;
  border:1px solid #4671a2;
  color:#fff;
}
.icon-jian:before {
  content: "\e61a";
}
.icon-jia:before {
  content: "\e9a9";
}
.icon-quanping:before {
  content: "\e9ab";
}
.map_legend{
  width: 120px;
  height: 20px;
  position: absolute;
  bottom:-500px;
  left: 30px;

}
.legend_title{
    width: 100px;
    height: 32px;
    text-align: center;
    color: #FFFFFF;
    border-radius: 4px;
    font-size: 16px;
    line-height: 32px;
    display:none;
    z-index: 99999;
}
.legend_angel{
  width:12px;
  height:6px;
  margin-top:-7px;
  display:none;
  z-index: 99999;
}
.legend_title_div{
  position: absolute;
  top:-30px;
  left: -30px;
}
</style>