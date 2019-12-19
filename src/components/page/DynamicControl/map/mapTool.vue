<template>
  <div class="MapTool-div">
    <div class="MapTool-btn" @click="zoomoutBtn" title="缩小">
      <i class="fa fa-search-plus"></i>
    </div>
    <div class="MapTool-btn" @click="zoominBtn" title="放大">
      <i class="fa fa-search-plus"></i>
    </div>
    <div class="MapTool-btn" @click="fullmapBtn" title="全屏显示">
      <i class="fa fa-bars"></i>
    </div>
  </div>
</template>

<script>
import { getMapInitExtent } from "./mapjs/MapImpl";

export default {
  name: "MapToolButton",
  data() {
    return {

    };
  },
  methods: {
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
      curMapView.goTo({
        zoom: 3,
        center: [120.12, 34.56]
      });
    }
  }
};
</script>

<style lang="less" scoped>
.MapTool-div {
  width: 100%;
  height: 100%;
  .MapTool-btn {
    width: 26px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    background: #fff;
    border: 1px solid #c6dce3;
    border-radius: 2px;
    margin-bottom: 10px;
    color: #0066b5;
    cursor: pointer;
  }
  .MapTool-legend {
    width: 108px;
    height: 140px;
    position: absolute;
    background: #fff;
    border: 1px solid #c6dce3;
    z-index: 100;
    bottom: -2px;
    right: 40px;
    .legend-title {
      float: left;
      margin-left: 10px;
      font-size: 12px;
      width: 50px;
      height: 30px;
      line-height: 36px;
    }
    .legend-close {
      float: right;
      margin-right: 10px;
      font-size: 12px;
      width: 20px;
      height: 30px;
      line-height: 36px;
      text-align: right;
    }
    hr {
      width: 100%;
      margin-top: 6px;
      height: 6px;
      border: none;
      border-bottom: 1px solid #dedede;
    }
    .abnormal {
      float: left;
      margin: 5px 10px;
      width: 32px;
      height: 18px;
      text-align: center;
      background: #636e8b;
      font-size: 12px;
      color: #fff;
    }
    .offline {
      float: left;
      margin-top: 5px;
      width: 32px;
      height: 18px;
      text-align: center;
      background: #c1c1c1;
      font-size: 12px;
      color: #fff;
    }
    i {
      color: red;
      font-size: 14px;
      margin-right: 5px;
    }
    .guokong {
      float: left;
      width: 88px;
      margin-left: 10px;
      margin-top: 10px;
      height: 25px;
      font-size: 12px;
    }
    .shengkong {
      float: left;
      width: 88px;
      margin-left: 10px;
      height: 25px;
      font-size: 12px;
    }
  }
}
</style>
