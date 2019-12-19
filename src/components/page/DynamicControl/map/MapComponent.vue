<template>
  <div>
    <div id="viewDiv"></div>
  </div>
</template>
<script>
import { loadModules } from "esri-loader";
import {
  dataRequestUrl,
  baseMapUrl,
  mapExtent,
  mapCenter,
  fyXzqhUrl
} from "./mapjs/AppConfig";
import AirInfoImpl from "./mapjs/AirInfoImpl";

export default {
  name: "MapComponent",
  data() {
    return {};
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
      "esri/layers/FeatureLayer"
    ]).then(
      ([
        Map,
        MapView,
        Basemap,
        TileLayer,
        Extent,
        WebTileLayer,
        TileInfo,
        SpatialReference,
        BaseDynamicLayer,
        FeatureLayer
      ]) => {
        let cVue = this;
        //初始化底图baseMapUrl
        let myBaseTileLayer = new TileLayer({
          url: baseMapUrl
        });

        let baseMap = new Basemap({
          baseLayers: [myBaseTileLayer], //默认蓝黑底图
          title: "自定义底图",
          id: "myBasemap"
        });
        let map;
        map = new Map({
          basemap: baseMap
        });
        cVue.$store.state.map = map;
        let mapView = new MapView({
          container: "viewDiv",
          map: map,
          //zoom: 9,
          //center: mapCenter,
          constraints: {
            minZoom: 5,
            maxZoom: 18,
            rotationEnabled: false
          },
          highlightOptions: {
            color: [128, 255, 255, 1],
            haloOpacity: 0.9,
            fillOpacity: 0.2
          },
          extent: mapExtent //初始范围可以用center和zoom组合，也可以通过extent设置
        });
        cVue.$store.state.mapview = mapView;
        //汾阳行政区划

        /*
        //高亮行政区划
        let highlightXzqh;
        mapView.whenLayerView(fyxzqh).then(layerView => {
          var queryStr = fyxzqh.createQuery();
          queryStr.where ="1=1";
          fyxzqh.queryFeatures(queryStr).then(function(result) {
            let feature = result.features[0];
            if (highlightXzqh) {
              highlightXzqh.remove();
            }
            highlightXzqh = layerView.highlight(feature);
          })
        })
        .catch(error => {
          alert("error");
        });
        */
        //不显示默认的zoom
        mapView.ui.remove("zoom");
        mapView.ui._removeComponents(["attribution"]);
        mapView.when(() => {
          /*
          mapView.popup.autoOpenEnabled = true; //只有设置成true，才能watch到selectedFeature
          */
          /*
         if (!cVue.$store.state.mapview.popup) {
            cVue.$store.state.mapview.popup.visible = false;
            cVue.$store.state.mapview.popup.clear();
          }
          */
          cVue.$store.state.mapLoaded = true;
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
  methods: {}
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
</style>
