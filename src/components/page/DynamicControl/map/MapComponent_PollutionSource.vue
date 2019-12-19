<template>
  <div>
    <div id="viewDiv"></div>
    <div class="top_div">
      <div class="top_context">
        <div style="font-size: 16px;margin-right: 10px;float: left;">状态</div>
        <div class="top_btn_all top_btn top_btn_active" @click="change_statue('all',$event)">全部</div>
        <div class="top_btn_qualification top_btn" @click="change_statue('qualification',$event)">达标</div>
        <div class="top_btn_Excess top_btn" @click="change_statue('Excess',$event)">超标</div>
        <div class="top_btn_Offline top_btn" @click="change_statue('Offline',$event)">离线</div>
      </div>
    </div>
  </div>
</template>
<script>
import { loadModules } from "esri-loader";
import {   dataRequestUrl,
  baseMapUrl,
  mapExtent,
  mapCenter,
  fyXzqhUrl} from "./mapjs/AppConfig";
export default {
  name: "MapComponentPollutionSource",
  data() {
    return {
      items: []
    };
  },
  created:function(){
  },
  mounted: function() {
    loadModules([
      "esri/Map",
      "esri/views/MapView",
      "esri/Basemap",
      "esri/layers/TileLayer",
      "esri/geometry/Extent",
      "esri/layers/WebTileLayer",
      "esri/layers/support/TileInfo",
      "esri/geometry/SpatialReference",
      "esri/layers/BaseDynamicLayer",
      "esri/layers/MapImageLayer",
      "esri/layers/FeatureLayer"
    ]).then(
      ([Map, MapView, Basemap, TileLayer, Extent, WebTileLayer, TileInfo,SpatialReference,BaseDynamicLayer,MapImageLayer,FeatureLayer]) => {
        let cVue = this;
        //初始化底图baseMapUrl
        let myBaseTileLayer = new TileLayer({
            url: baseMapUrl
        });
            
        let baseMap = new Basemap({
          baseLayers: [myBaseTileLayer],                       //默认蓝黑底图
          title: "自定义底图",
          id: "myBasemap"
        });
        let map;
        if (!cVue.$store.state.PollutionSource.map) {
          map = new Map({
            basemap: baseMap
          });
          cVue.$store.state.PollutionSource.map = map;
        } else {
          map = cVue.$store.state.PollutionSource.map;
        }
        let mapView = new MapView({
          container: "viewDiv",
          map: map,
          constraints: {
            minZoom: 4,
            maxZoom: 18,
	    rotationEnabled: false
          },
          highlightOptions: {
            color: [128, 255, 255, 1],
            haloOpacity: 0.9,
            fillOpacity: 0.2
          },
          extent:mapExtent   //初始范围可以用center和zoom组合，也可以通过extent设置
        });

        cVue.$store.state.PollutionSource.mapview = mapView;
        /*
        //汾阳行政区划
        let fyxzqh = new MapImageLayer({
          url: "http://huanbao106.arcgisonline.cn:6080/arcgis/rest/services/fy/MapServer"
        });
        map.add(fyxzqh)
        */
        //不显示默认的zoom
        mapView.ui.remove("zoom");
        mapView.ui._removeComponents(["attribution"]);
        mapView.when(() => {
          mapView.popup.autoOpenEnabled = true; //只有设置成true，才能watch到selectedFeature
          if (!cVue.$store.state.PollutionSource.mapview.popup) {
            cVue.$store.state.PollutionSource.mapview.popup.visible = false;
            cVue.$store.state.PollutionSource.mapview.popup.clear();
          }
          cVue.$store.state.PollutionSource.mapLoaded = true;
          let feaXzqhRenderer = {
            type: "simple", // autocasts as new UniqueValueRenderer()
            symbol: {
              type: "simple-fill",
              color: [62, 65, 172, 0.2],
              outline: {
                // autocasts as new SimpleLineSymbol()
                //color: [255, 0, 51, 0.8],   //原始红色的边框颜色
                color: [62, 65, 172, 1],
                width: 1.5
              }
            }
          };
          let fyxzqh = new FeatureLayer({
            url: fyXzqhUrl,
            renderer: feaXzqhRenderer
          });
          map.add(fyxzqh);
        });
      }
    );
  },
  methods: {
    //改变地图显示的站点状态
    change_statue: function(text, e) {
      let cVue = this;
      $(".top_btn").removeClass("top_btn_active");
      var mydom = $(e.srcElement);
      mydom.addClass("top_btn_active");
      cVue.$store.state.PollutionSource.pullution_selectstatue=text;
    }
  }
};
</script>
<style scoped lang="less">
#viewDiv {
  width: 100%;
  height: calc(100vh - 16px);
  //   height: calc(100vh);
  //   width: calc(100vw);
}
.map-select-div {
  position: absolute;
  width: 54px;
  height: 118px;
  left: 20px;
  top: 150px;
  opacity: 1;
  .map-opt-div {
    width: 54px;
    height: 54px;
    border: 1px solid #0091da;
    border-radius: 2px;
    margin-bottom: 10px;
    cursor: pointer;
  }
  span {
    position: absolute;
    bottom: 3px;
    right: 3px;
    height: 16px;
    line-height: 16px;
    padding: 0 3px;
    color: #fff;
    background: #0091da;
    border-radius: 2px;
    font-size: 12px;
  }
}
.top_div {
  width: calc(176vh);
  height: 86px;
  position: absolute;
  top: 75px;
  left: 320px;
  border-radius: 2px;
  color: #93aece;
  padding: 20px 20px;
  border-radius: 2px;
  .top_context {
    width: 100%;
    height: 46px;
    padding: 5px 0px;
    line-height: 36px;
    font-size: 16px;
    .top_btn_all {
      color: rgba(255, 255, 255, 0.7);
      background-color: #1d263a;
      border-color: #484f5d;
      border: 1px solid;
      width: 100px;
      height: 36px;
      text-align: center;
      float: left;
      font-size: 16px;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      cursor: pointer;
    }
    .top_btn_qualification {
      color: rgba(255, 255, 255, 0.7);
      background-color: #1d263a;
      border-color: #484f5d;
      border: 1px solid;
      border-left: 0px;
      width: 100px;
      height: 36px;
      text-align: center;
      float: left;
      font-size: 16px;
      cursor: pointer;
    }
    .top_btn_Excess {
      color: rgba(255, 255, 255, 0.7);
      background-color: #1d263a;
      border-color: #484f5d;
      border: 1px solid;
      border-left: 0px;
      width: 100px;
      height: 36px;
      text-align: center;
      float: left;
      font-size: 16px;
      cursor: pointer;
    }
    .top_btn_Offline {
      color: rgba(255, 255, 255, 0.7);
      background-color: #1d263a;
      border-color: #484f5d;
      border: 1px solid;
      border-left: 0px;
      width: 100px;
      height: 36px;
      text-align: center;
      float: left;
      font-size: 16px;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      cursor: pointer;
    }
    .top_btn:hover {
      border-color: #119b8d;
      color: #fff;
      background-image: linear-gradient(90deg, #008a96 0%, #004e5d 100%);
    }
    .top_btn_active {
      border-color: #119b8d !important;
      color: #fff !important;
      background-image: linear-gradient(
        90deg,
        #008a96 0%,
        #004e5d 100%
      ) !important;
    }
  }
}
</style>
