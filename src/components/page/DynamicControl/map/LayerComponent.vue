<template>
  <div class="params-box" style="width:115px;">
    <div class="params-item" style="margin-top:0px;">
      <div class="params-hd" style="padding-left:26px;">
        参数
        <a class="icon icon-shang" @click="parameter_toggle($event)"></a>
      </div>
      <ul class="params-bd" id="parameter_line">
        <li class="is-active select_opt" @click="SelectFactor('aqi',$event)">AQI</li>
        <li class="select_opt" @click="SelectFactor('pm25',$event)">
          PM
          <span class="text-sm">2.5</span>
        </li>
        <li class="select_opt" @click="SelectFactor('pm10',$event)">
          PM
          <span class="text-sm">10</span>
        </li>
        <li class="select_opt" @click="SelectFactor('no2',$event)">
          NO
          <span class="text-sm">2</span>
        </li>
        <li class="select_opt" @click="SelectFactor('co',$event)">CO</li>
        <li class="select_opt" @click="SelectFactor('so2',$event)">
          SO
          <span class="text-sm">2</span>
        </li>
        <li class="select_opt" @click="SelectFactor('o3',$event)">
          O
          <span class="text-sm">3</span>
        </li>
      </ul>
    </div>
    <div class="params-box">
      <div class="params-item">
        <div class="params-hd">
          <label class="el-checkbox">
            <span class="el-checkbox__input">
              <span class="el-checkbox__inner"></span>
              <input type="checkbox" aria-hidden="false" class="el-checkbox__original" value />
            </span>
          </label>
          <span class="params-text" >站点</span>
          <a class="icon icon-shang" @click="monitoring_toggle($event)"></a>
        </div>
        <div class="params-bd">
          <ul class="params-list" id="monitoring_line">
            <li v-for="(item,index) in items">
              <label class="el-checkbox" v-bind:class="{'is-checked':item.checked}">
                <span class="el-checkbox__input" v-bind:class="{'is-checked':item.checked}">
                  <span class="el-checkbox__inner"></span>
                  <input
                    type="checkbox"
                    aria-hidden="false"
                    class="el-checkbox__original"
                    :value="item.value"
                    @change="CheckItem(item)"
                    v-model="allChecked"
                  />
                </span>
                <span class="el-checkbox__label">
                  <i
                    v-bind:class="item.iconclass"
                    style="float: left;width: 16px;height:16px;margin-left: 0px;margin-right: 3px;font-size: 16px;margin-top: -3px;"
                  ></i>
                  {{item.text}}
                </span>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { loadModules } from "esri-loader";
import {
  dataRequestUrl,
  baseMapUrl,
  mapExtent,
  mapCenter
} from "./mapjs/AppConfig";
import AirInfoImpl from "./mapjs/AirInfoImpl";
import {formatDate,formatString} from './mapjs/CommonUtil';
import {
  createAirGraphics,
  createRadarLayers,
  createWryGraphics,
  createYcGraphics,
  createWrsjGraphics,
  createWrytLayers
} from "./mapjs/MapImpl";
import { createWindLayer,addWindHandle,removeWindHandle} from "./mapjs/WindImpl";

export default {
  name: "LayerComponent",
  data() {
    return {
      pm25Factor: "pm25",
      items: [
        {
          text: "国控",
          value: "country",
          iconclass: "icon guokong",
          checked: true
        },
        {
          text: "省控",
          value: "province",
          iconclass: "icon shengkong",
          checked: true
        },
        {
          text: "市控",
          value: "city",
          iconclass: "icon shikong",
          checked: true
        },
        {
          text: "微站",
          value: "county",
          iconclass: "icon weizhan",
          checked: false
        },
        {
          text: "污染源",
          value: "wry",
          iconclass: "icon wuran",
          checked: false
        },
        {
          text: "扬尘",
          value: "yc",
          iconclass: "icon yangchen",
          checked: false
        },
        { text: "雷达", value: "ladar", iconclass: "icon leida", checked: false },
        { text: "遥感", value: "wxyg", iconclass: "icon icon-weixing1", checked: false },
        {
          text: "事件",
          value: "wrsj",
          iconclass: "icon shijian",
          checked: false
        },
        { text: "风场", value: "wind", iconclass: "icon fengchang", checked: false },
        { text: "云图", value: "wryt", iconclass: "icon yuntu", checked: false }
      ],
      allChecked: ['country','province','city']
    };
  },
  mounted: function() {
    //3分钟定时器
    let cVue = this;
    if(cVue.$store.state.realFreshTimer){
      clearInterval(cVue.$store.state.realFreshTimer)
    }
    //debugger;
    cVue.$store.state.realFreshTimer = window.setInterval(() => {
      setTimeout(cVue.getAllRealData(), 0)
    },3*60*1000);
    cVue.getStationType();
  },
  created:function(){
    
  },
  computed: {
    myRenderType() {
      return this.$store.state.curRenderType;
    },
    mainMapLoad(){
      let cVue =this;
      return cVue.$store.state.mapLoaded && cVue.$store.state.stationtype.guokong && cVue.$store.state.stationtype.shengkong && cVue.$store.state.stationtype.shikong;
    },
    myMapRouteName(){
      return this.$store.state.mapRouteName; 
    },
    myCurBaseMap(){
      return this.$store.state.curBaseMapId;
    }
  },
  watch: {
    myRenderType: function() {
      let cVue = this;
      cVue.renderTypeChangeCurMap();
    },
    mainMapLoad:function(){
      let cVue = this;
      //debugger
      cVue.getMapData();
    },
    myMapRouteName:function(){
      let cVue = this;
      cVue.clearAllLayers();
    },
    myCurBaseMap:function(){
      let cVue = this;
      cVue.renderTypeChangeCurMap();
    }
  },
  methods: {
    getAllRealData:function(){
      let cVue =this;
      // debugger;
      if(cVue.$store.state.countryRealTimeDataList && cVue.$store.state.countryRealTimeDataList.length>0){
        cVue.getAirRealData(cVue.$store.state.stationtype.guokong);
      }
      if(cVue.$store.state.provinceRealTimeDataList && cVue.$store.state.provinceRealTimeDataList.length>0){
        cVue.getAirRealData(cVue.$store.state.stationtype.shengkong);
      }
      if(cVue.$store.state.cityRealTimeDataList && cVue.$store.state.cityRealTimeDataList.length>0){
        cVue.getAirRealData(cVue.$store.state.stationtype.shikong);
      }
      if(cVue.$store.state.countyRealTimeDataList && cVue.$store.state.countyRealTimeDataList.length>0){
        cVue.getAirRealData(cVue.$store.state.stationtype.weixing);
      }
      if(cVue.$store.state.wryRealTimeDataList && cVue.$store.state.wryRealTimeDataList.length>0){
        cVue.getWryRealData();
      }
      if(cVue.$store.state.ycRealTimeDataList && cVue.$store.state.ycRealTimeDataList.length>0){
        cVue.getYcRealData();
      }
      if(cVue.$store.state.wrsjRealTimeDataList && cVue.$store.state.wrsjRealTimeDataList.length>0){
        cVue.getWrsjRealData();
      }
    },
     //获取所有站点类型及编号
    getStationType: function() {
      let url = dataRequestUrl.options.stationListInfo.getStation_type;
      let parameter = {};
      let cVue = this;
      let mydata = AirInfoImpl.getStationTypeList(
        url,
        parameter,
        cVue.dealstation_type
      );
    },
    //处理获取的所有站点类型和编号
    dealstation_type: function(data) {
      let cVue = this;
      if(data && data.length>0){
        for(let i=0;i<data.length;i++){
          let name=data[i].stationtypename;
          switch (name){
            case "国控站":
            cVue.$store.state.stationtype.guokong=data[i].stationtypecode;
            cVue.$store.state.checkStationLayerList.push(data[i].stationtypecode);
            break;
            case "省控站":
            cVue.$store.state.stationtype.shengkong=data[i].stationtypecode;
            cVue.$store.state.checkStationLayerList.push(data[i].stationtypecode);
            break;
            case "市控站":
            cVue.$store.state.stationtype.shikong=data[i].stationtypecode;
            cVue.$store.state.checkStationLayerList.push(data[i].stationtypecode);
            break;
            case "微型站":
            cVue.$store.state.stationtype.weixing=data[i].stationtypecode;
            break;
            case "污染源":
            cVue.$store.state.stationtype.wanranyuan=data[i].stationtypecode;
            break;
            case "扬尘源":
            cVue.$store.state.stationtype.yangchen=data[i].stationtypecode;
            break;
          }
          //接口中未有数据，暂用固定值  2019.11.29
          cVue.$store.state.stationtype.wanranyuan="1005";
          cVue.$store.state.stationtype.yangchen="1006";
        }
      }
    },
    //初始化时清理已有的数据
    clearAllLayers:function(){
      let cVue = this;
      //默认勾选国控、省控、市控
      cVue.$store.state.allCheckLayerList = ['country','province','city'];
      cVue.$store.state.checkStationLayerList = [cVue.$store.state.stationtype.guokong,cVue.$store.state.stationtype.shengkong,cVue.$store.state.stationtype.shikong]; 
      cVue.$store.state.selectFactor ='aqi';
      cVue.$store.state.curRenderType =[];
      cVue.clearAllShrinkLayers();
      if (cVue.$store.state.map != null) {
        if(cVue.$store.state.allCheckLayerList.indexOf("country") !=-1){
          cVue.initAirLayers(cVue.$store.state.stationtype.guokong);
        }
        if(cVue.$store.state.allCheckLayerList.indexOf("province") !=-1){
          cVue.initAirLayers(cVue.$store.state.stationtype.shengkong);
        }
        if(cVue.$store.state.allCheckLayerList.indexOf("city") !=-1){
          cVue.initAirLayers(cVue.$store.state.stationtype.shikong);
        }
        if(cVue.$store.state.allCheckLayerList.indexOf("county") !=-1){
          let countylayer = cVue.$store.state.map.findLayerById("countyPointLayer");
          if ( countylayer != null) {
            countylayer.visible = false;
          }
        }
        if(cVue.$store.state.allCheckLayerList.indexOf('wry')==-1){
          let wrylayer = cVue.$store.state.map.findLayerById("wryPointFeaLayer");
          if ( wrylayer != null) {
            wrylayer.visible = false;
          }
        }
        if(cVue.$store.state.allCheckLayerList.indexOf('yc')==-1){
          let yclayer = cVue.$store.state.map.findLayerById("ycPointFeaLayer");
          if ( yclayer != null) {
            yclayer.visible = false;
          }
        }
        if(cVue.$store.state.allCheckLayerList.indexOf('wrsj')==-1){
          let wrsjlayer = cVue.$store.state.map.findLayerById("wrsjPointFeaLayer");
          if ( wrsjlayer != null) {
            wrsjlayer.visible = false;
          }
        }
        //清理污染云图和雷达
        if (cVue.$store.state.allCheckLayerList.indexOf("ladar") == -1) {
          let ladarLayer = cVue.$store.state.map.findLayerById("ladarImageLayer");
          if (ladarLayer != null) {
            ladarLayer.visible = false;
          } 
        }
        if (cVue.$store.state.allCheckLayerList.indexOf("wryt") == -1) {
          let wrytLayer = cVue.$store.state.map.findLayerById("wrytImageLayer");
          if (wrytLayer != null) {
            wrytLayer.visible = false;
          } 
        }
      }  
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //清理报警图层
    clearAllShrinkLayers:function(){
      //清空报警的数据
      let cVue =this;
      cVue.clearShinkLayer("countryShrinkLayer");   
      cVue.clearShinkLayer("provinceShrinkLayer");
      cVue.clearShinkLayer("cityShrinkLayer");
      cVue.clearShinkLayer("countyShrinkLayer");
      cVue.clearShinkLayer("wryShrinkLayer");
      cVue.clearShinkLayer("ycShrinkLayer");   
    },
    clearShinkLayer:function(layerId){
      let cVue =this;      
      let shrinkLayer = cVue.$store.state.map.findLayerById(layerId);
      if(shrinkLayer !=null){
        shrinkLayer.removeAll();
      }
    },
    //参数栏缩放
    parameter_toggle: function(e) {
      var mydom = $(e.srcElement);
      if (mydom.hasClass("icon-shang")) {
        mydom.removeClass("icon-shang");
        mydom.addClass("icon-xia");
        $("#parameter_line").toggle(false);
      } else {
        mydom.addClass("icon-shang");
        mydom.removeClass("icon-xia");
        $("#parameter_line").toggle(true);
      }
    },
    //监测数据
    monitoring_toggle: function(e) {
      var mydom = $(e.srcElement);
      if (mydom.hasClass("icon-shang")) {
        mydom.removeClass("icon-shang");
        mydom.addClass("icon-xia");
        $("#monitoring_line").toggle(false);
      } else {
        mydom.addClass("icon-shang");
        mydom.removeClass("icon-xia");
        $("#monitoring_line").toggle(true);
      }
    },
    /*
    选择指标时重绘
    */
    SelectFactor: function(item, e) {
      $(".select_opt").removeClass("is-active");
      var mydom = $(e.srcElement);
      mydom.addClass("is-active");
      let cVue = this;
      let factorType = item;
      cVue.$store.state.selectFactor = factorType;
      cVue.factorChangeCurMap();
    },
    CheckItem: function(item) {
      let cVue = this;
      let stationtypeobj=this.$store.state.stationtype;
      item.checked = !item.checked;
      var curSelected = item.value;
      cVue.$store.state.allCheckLayerList = [];
      cVue.$store.state.checkStationLayerList = [];
      if (cVue.allChecked && cVue.allChecked.length > 0) {
        if (cVue.allChecked.indexOf("country") >= 0) {
          cVue.$store.state.allCheckLayerList.push("country");
          cVue.$store.state.checkStationLayerList.push(stationtypeobj.guokong);
        }
        if (cVue.allChecked.indexOf("province") >= 0) {
          cVue.$store.state.allCheckLayerList.push("province");
          cVue.$store.state.checkStationLayerList.push(stationtypeobj.shengkong);
        }
        if (cVue.allChecked.indexOf("city") >= 0) {
          cVue.$store.state.allCheckLayerList.push("city");
          cVue.$store.state.checkStationLayerList.push(stationtypeobj.shikong);
        }
        if (cVue.allChecked.indexOf("county") >= 0) {
          cVue.$store.state.allCheckLayerList.push("county");
          cVue.$store.state.checkStationLayerList.push(stationtypeobj.weixing);
        }
        if (cVue.allChecked.indexOf("wry") >= 0) {
          cVue.$store.state.allCheckLayerList.push("wry");
        }
        if (cVue.allChecked.indexOf("yc") >= 0) {
          cVue.$store.state.allCheckLayerList.push("yc");
        }
        if (cVue.allChecked.indexOf("ladar") >= 0) {
          cVue.$store.state.allCheckLayerList.push("ladar");
        }
        if (cVue.allChecked.indexOf("wrsj") >= 0) {
          cVue.$store.state.allCheckLayerList.push("wrsj");
        }
        if (cVue.allChecked.indexOf("wind") >= 0) {
          cVue.$store.state.allCheckLayerList.push("wind");
        }
        if (cVue.allChecked.indexOf("wryt") >= 0) {
          cVue.$store.state.allCheckLayerList.push("wryt");
        }
      }
      cVue.checkRefreshMap(curSelected);
    },
    //初始化获取所有的接口数据
    getMapData: function() {
      let cVue = this;
      //初始化站点图层的数据 
      if(cVue.$store.state.map && cVue.$store.state.map.findLayerById("countryPointLayer")==null){
        cVue.initAirLayers(cVue.$store.state.stationtype.guokong);
      }
      if(cVue.$store.state.map && cVue.$store.state.map.findLayerById("provincePointLayer")==null){
        cVue.initAirLayers(cVue.$store.state.stationtype.shengkong);
      }
      if(cVue.$store.state.map && cVue.$store.state.map.findLayerById("cityPointLayer")==null){
        cVue.initAirLayers(cVue.$store.state.stationtype.shikong);
      }
    },
    /**
     * check更新事件
     */
    checkRefreshMap:function(curSelected){
      let cVue = this;
      //如果是勾选
      // debugger;
      if(curSelected&&cVue.allChecked.indexOf(curSelected)!=-1){
         //风场数据
        if (curSelected=="wind") {
          //开始监听事件
          addWindHandle();
          cVue.initWindLayers();
        } 
        //雷达数据
        else if (curSelected=="ladar") {
          if (cVue.$store.state.map != null) {
            let ladarLayer = cVue.$store.state.map.findLayerById(
              "ladarImageLayer"
            );
            if (ladarLayer != null) {
              ladarLayer.visible = true;
            } else {
              cVue.initLadarLayers();
            }
          }
        } 
        //污染云图
        else if (curSelected=="wryt") {
          if (cVue.$store.state.map != null) {
            let wrytLayer = cVue.$store.state.map.findLayerById(
              "wrytImageLayer"
            );
            if (wrytLayer != null) {
              wrytLayer.visible = true;
            } else {
              cVue.initWrytLayers();
            }
          }
        } 
        else if (curSelected == "yc" && (cVue.$store.state.selectFactor == "pm25" || cVue.$store.state.selectFactor == "pm10") ){
          if(!cVue.$store.state.ycRealTimeDataList||cVue.$store.state.ycRealTimeDataList.length==0){
            cVue.initYcLayers();
          }
          else{
            cVue.refreshYcLayer();
          }          
        }
        //污染源图层
        else if (curSelected == "wry") {
          if(!cVue.$store.state.wryRealTimeDataList||cVue.$store.state.wryRealTimeDataList.length==0){
            cVue.initWryLayers();
          }
          else{
            cVue.refreshWrySiteLayer();
          }
        } 
        //污染事件
        else if (curSelected == "wrsj") {
          if(!cVue.$store.state.wrsjRealTimeDataList||cVue.$store.state.wrsjRealTimeDataList.length==0){
            cVue.initWrsjLayers();
          }
          else{
            cVue.refreshWrsjLayer();
          }
        }
        else if (curSelected == "country"){
          if(!cVue.$store.state.countryRealTimeDataList||cVue.$store.state.countryRealTimeDataList.length==0){
            cVue.initAirLayers(cVue.$store.state.stationtype.guokong);
          }
          else{
            cVue.refreshAirSiteLayer("countryPointLayer",cVue.$store.state.countryRealTimeDataList,cVue.$store.state.stationtype.guokong);
          }
        }
        else if (curSelected == "province"){
          if(!cVue.$store.state.provinceRealTimeDataList||cVue.$store.state.provinceRealTimeDataList.length==0){
            cVue.initAirLayers(cVue.$store.state.stationtype.shengkong);
          }
          else{
            cVue.refreshAirSiteLayer("provincePointLayer",cVue.$store.state.provinceRealTimeDataList,cVue.$store.state.stationtype.shengkong);
          }
        }
        else if (curSelected == "city"){
          if(!cVue.$store.state.cityRealTimeDataList||cVue.$store.state.cityRealTimeDataList.length==0){
            cVue.initAirLayers(cVue.$store.state.stationtype.shikong);
          }
          else{
            cVue.refreshAirSiteLayer("cityPointLayer",cVue.$store.state.cityRealTimeDataList,cVue.$store.state.stationtype.shikong);
          }
        }
        else if (curSelected == "county"){
          if(!cVue.$store.state.countyRealTimeDataList||cVue.$store.state.countyRealTimeDataList.length==0){
            cVue.initAirLayers(cVue.$store.state.stationtype.weixing);
          }
          else{
            cVue.refreshAirSiteLayer("countyPointLayer",cVue.$store.state.countyRealTimeDataList,cVue.$store.state.stationtype.weixing);
          }
        }
      }
      else{
        //取消选择
        if(curSelected=="wind"){
          let myWindCanvas = document.getElementById("wind-canvas");
          let overlayContainer = cVue.$store.state.mapview.container.getElementsByClassName("esri-overlay-surface")[0];
          //开始监听事件
          removeWindHandle();
          //此处必须清除canvas图层
          if (overlayContainer && myWindCanvas) {
            overlayContainer.removeChild(myWindCanvas);
          }
        }
        else if(curSelected=="ladar"){
            if (cVue.$store.state.map != null) {
            let ladarLayer = cVue.$store.state.map.findLayerById(
              "ladarImageLayer"
            );
            if (ladarLayer != null) {
              ladarLayer.visible = false;
            }
          }
        }
        else if(curSelected =="wryt"){
          if (cVue.$store.state.map != null) {
            //let wrytLayer = cVue.$store.state.map.findLayerById("wrytImageLayer");
            for(let i=0;i<cVue.$store.state.map.layers.length;i++){
              let wrytLayer = cVue.$store.state.map.layers.items[i];
              if(wrytLayer.id.indexOf("wrytImageLayer")!=-1){
                wrytLayer.visible = false;
              }
            }
          }
        }
        else if (curSelected=="yc") {
          let yclayer = cVue.$store.state.map.findLayerById("ycPointFeaLayer");
          if (yclayer != null) {
            yclayer.visible = false;
            cVue.clearShinkLayer("ycShrinkLayer");   
          }
        }
        else if (curSelected=="wry") {
          let wrylayer = cVue.$store.state.map.findLayerById(
            "wryPointFeaLayer"
          );
          if (wrylayer != null) {
            wrylayer.visible = false;
            cVue.clearShinkLayer("wryShrinkLayer");  
          }
        }
        else if (curSelected =="wrsj") {
          let wrsjLayer = cVue.$store.state.map.findLayerById(
            "wrsjPointFeaLayer"
          );
          if (wrsjLayer != null) {
            wrsjLayer.visible = false;
          }
        }
        else if (curSelected =="country") {
          let countryLayer = cVue.$store.state.map.findLayerById(
            "countryPointLayer"
          );
          if (countryLayer != null) {
            countryLayer.visible = false;
            cVue.clearShinkLayer("countryShrinkLayer");  
          }
        }
        else if (curSelected =="province") {
          let provinceLayer = cVue.$store.state.map.findLayerById(
            "provincePointLayer"
          );
          if (provinceLayer != null) {
            provinceLayer.visible = false;
            cVue.clearShinkLayer("provinceShrinkLayer");
          }
        }
        else if (curSelected =="city") {
          let cityLayer = cVue.$store.state.map.findLayerById(
            "cityPointLayer"
          );
          if (cityLayer != null) {
            cityLayer.visible = false;
            cVue.clearShinkLayer("cityShrinkLayer");
          }
        }
        else if (curSelected =="county") {
          let countyLayer = cVue.$store.state.map.findLayerById(
            "countyPointLayer"
          );
          if (countyLayer != null) {
            countyLayer.visible = false;
            cVue.clearShinkLayer("countyShrinkLayer");
          }
        }  
      }
    },
    /**
     * 指标切换时更新地图
     */
    factorChangeCurMap:function(){
      let cVue =this;
      //扬尘图层
      if (
        cVue.$store.state.allCheckLayerList.indexOf("yc") >= 0 &&
        (cVue.$store.state.selectFactor == "pm25" ||
          cVue.$store.state.selectFactor == "pm10")
      ) {
        if(cVue.$store.state.ycRealTimeDataList&&cVue.$store.state.ycRealTimeDataList.length>0){
          cVue.refreshYcLayer();
        }
        else{
          cVue.initYcLayers();
        }
      } 
      //国控、省控、市控、微站
      if (cVue.$store.state.allCheckLayerList.indexOf("country") != -1) {
        //获取勾选国控、省控、市控、微型站
        if(!cVue.$store.state.countryRealTimeDataList||cVue.$store.state.countryRealTimeDataList.length==0){
            cVue.initAirLayers(cVue.$store.state.stationtype.guokong);
        }
        else{
          cVue.refreshAirSiteLayer("countryPointLayer",cVue.$store.state.countryRealTimeDataList,cVue.$store.state.stationtype.guokong);
        }
      }
      if(cVue.$store.state.allCheckLayerList.indexOf("province") != -1){
        if(!cVue.$store.state.provinceRealTimeDataList||cVue.$store.state.provinceRealTimeDataList.length==0){
          cVue.initAirLayers(cVue.$store.state.stationtype.shengkong);
        }
        else{
          cVue.refreshAirSiteLayer("provincePointLayer",cVue.$store.state.provinceRealTimeDataList,cVue.$store.state.stationtype.shengkong);
        }
      }
      if(cVue.$store.state.allCheckLayerList.indexOf("city") != -1){
         if(!cVue.$store.state.cityRealTimeDataList||cVue.$store.state.cityRealTimeDataList.length==0){
            cVue.initAirLayers(cVue.$store.state.stationtype.shikong);
          }
          else{
            cVue.refreshAirSiteLayer("cityPointLayer",cVue.$store.state.cityRealTimeDataList,cVue.$store.state.stationtype.shikong);
          }
      }
      if(cVue.$store.state.allCheckLayerList.indexOf("county") != -1){
        if(!cVue.$store.state.countyRealTimeDataList||cVue.$store.state.countyRealTimeDataList.length==0){
            cVue.initAirLayers(cVue.$store.state.stationtype.weixing);
          }
          else{
            cVue.refreshAirSiteLayer("countyPointLayer",cVue.$store.state.countyRealTimeDataList,cVue.$store.state.stationtype.weixing);
          }
      }
      //污染云图
      if (cVue.$store.state.allCheckLayerList.indexOf("wryt") != -1) {
        cVue.initWrytLayers();
      }
    },
    /**
     * 渲染模式切换时刷新地图
     */
    renderTypeChangeCurMap: function() {
      let cVue =this;
      //扬尘图层
      if (
        cVue.$store.state.allCheckLayerList.indexOf("yc") >= 0 &&
        (cVue.$store.state.selectFactor == "pm25" ||
          cVue.$store.state.selectFactor == "pm10")
      ) {
        if(cVue.$store.state.ycRealTimeDataList&&cVue.$store.state.ycRealTimeDataList.length>0){
          cVue.refreshYcLayer();
        }
        else{
          cVue.initYcLayers();
        }
      } 
      //国控、省控、市控、微站
      if (cVue.$store.state.allCheckLayerList.indexOf("country") != -1) {
        //获取勾选国控、省控、市控、微型站
        if(!cVue.$store.state.countryRealTimeDataList||cVue.$store.state.countryRealTimeDataList.length==0){
            cVue.initAirLayers(cVue.$store.state.stationtype.guokong);
        }
        else{
          cVue.refreshAirSiteLayer("countryPointLayer",cVue.$store.state.countryRealTimeDataList,cVue.$store.state.stationtype.guokong);
        }
      }
      if(cVue.$store.state.allCheckLayerList.indexOf("province") != -1){
        if(!cVue.$store.state.provinceRealTimeDataList||cVue.$store.state.provinceRealTimeDataList.length==0){
          cVue.initAirLayers(cVue.$store.state.stationtype.shengkong);
        }
        else{
          cVue.refreshAirSiteLayer("provincePointLayer",cVue.$store.state.provinceRealTimeDataList,cVue.$store.state.stationtype.shengkong);
        }
      }
      if(cVue.$store.state.allCheckLayerList.indexOf("city") != -1){
        if(!cVue.$store.state.cityRealTimeDataList||cVue.$store.state.cityRealTimeDataList.length==0){
          cVue.initAirLayers(cVue.$store.state.stationtype.shikong);
        }
        else{
          cVue.refreshAirSiteLayer("cityPointLayer",cVue.$store.state.cityRealTimeDataList,cVue.$store.state.stationtype.shikong);
        }
      }
      if(cVue.$store.state.allCheckLayerList.indexOf("county") != -1){
        if(!cVue.$store.state.countyRealTimeDataList||cVue.$store.state.countyRealTimeDataList.length==0){
          cVue.initAirLayers(cVue.$store.state.stationtype.weixing);
        }
        else{
          cVue.refreshAirSiteLayer("countyPointLayer",cVue.$store.state.countyRealTimeDataList,cVue.$store.state.stationtype.weixing);
        }
      } 
      //污染源图层
      if (cVue.$store.state.allCheckLayerList.indexOf("wry") >= 0) {
        if(cVue.$store.state.wryRealTimeDataList&&cVue.$store.state.wryRealTimeDataList.length>0){
          cVue.refreshWrySiteLayer();
        }
        else{
          cVue.initWryLayers();
        }
      } 
      //污染事件
      if (cVue.$store.state.allCheckLayerList.indexOf("wrsj") != -1) {
        if(cVue.$store.state.wrsjRealTimeDataList&&cVue.$store.state.wrsjRealTimeDataList.length>0){
          cVue.refreshWrsjLayer();
        }
        else{
          cVue.initWrsjLayers();
        }
      } 
    },
    /***
     * 获取扬尘实时数据
     */
    getYcRealData: function() {
      let url = dataRequestUrl.options.dustStationListInfo.getDustStationList;
      let data = {
        //areaCode: "110100"
      };
      let cVue = this;
      AirInfoImpl.getStationListImpl(url, data, cVue.queryYcRealTimeInfoCallback);
    },
    queryYcRealTimeInfoCallback: function(result) {
      let cVue = this;
      let stationtypeobj=this.$store.state.stationtype;
      if (result != null) {
        //绘制返回的查询站点列表   接口的格式不统一
        let resultFeatures = result;
        let num = resultFeatures.length;
        if (num > 0) {
          cVue.$store.state.ycRealTimeDataList = resultFeatures;
          cVue.refreshYcLayer();
        }
      } else {
        console.log("查询扬尘站点失败");
      }
    },
    /**
     * 获取污染事件最新实时数据
     */
    getWrsjRealData:function(){
      let url = dataRequestUrl.options.wrsjListInfo.getWrsjList;
      let data = { eventSource: 2 };
      let cVue = this;
      AirInfoImpl.getWrEventList(url, data, cVue.queryWrsjRealTimeInfoCallback);
    },
    queryWrsjRealTimeInfoCallback: function(result) {
      let cVue = this;
      if (result != null) {
        let resultFeatures = result;
        let num = resultFeatures.length;
        if (num > 0) {
          cVue.$store.state.wrsjRealTimeDataList = resultFeatures;
          cVue.refreshWrsjLayer();
        }
      } else {
        console.log("获取污染事件失败");
      }
    },

    /**
     * 获取污染源最新实时数据
     */
    getWryRealData:function(){
      let url = dataRequestUrl.options.entStationListInfo.getEntStationList;
      let data = {
        //areaCode: "110101"
      };
      let cVue = this;
      AirInfoImpl.getStationListImpl(url, data, cVue.queryWryRealTimeInfoCallback);
    },
    queryWryRealTimeInfoCallback: function(result) {
      let cVue = this;
      let stationtypeobj=this.$store.state.stationtype;
      if (result != null) {
        //绘制返回的查询站点列表   接口的格式不统一
        let resultFeatures = result;
        let num = resultFeatures.length;
        if (num > 0) {
          cVue.$store.state.wryRealTimeDataList = resultFeatures;
          cVue.refreshWrySiteLayer();
        }
      } else {
        console.log("查询污染源失败");
      }
    },
    /**
     * 获取站点最新实时数据
     */
    getAirRealData:function(stationTypeId){
      let cVue = this;
      //初始化国控/省控/市控/微型图层
      //http://218.241.184.18:8900/api/station/list?areaCode=130703&stationTypeId=3
      if(stationTypeId){
        let url = dataRequestUrl.options.stationListInfo.getStationList;
        let data = {
          //areaCode: "130703"
          stationTypeId:stationTypeId
        };
        AirInfoImpl.getStationListImpl(url, data, cVue.queryAirRealTimeInfoCallback);
      }
    },
    queryAirRealTimeInfoCallback:function(result){
      let cVue = this;
      if (result != null) {
        //绘制返回的查询站点列表
        let resultFeatures = result;
        let num = resultFeatures.length;
        if (num > 0) {
          if(resultFeatures[0].stationTypeId == cVue.$store.state.stationtype.guokong ){
            cVue.$store.state.countryRealTimeDataList = resultFeatures;
            cVue.refreshAirSiteLayer("countryPointLayer",cVue.$store.state.countryRealTimeDataList,cVue.$store.state.stationtype.guokong);
          }
          else if(resultFeatures[0].stationTypeId == cVue.$store.state.stationtype.shengkong ){
            cVue.$store.state.provinceRealTimeDataList = resultFeatures;
            cVue.refreshAirSiteLayer("provincePointLayer",cVue.$store.state.provinceRealTimeDataList,cVue.$store.state.stationtype.shengkong);
          }
          else if(resultFeatures[0].stationTypeId == cVue.$store.state.stationtype.shikong ){
            cVue.$store.state.cityRealTimeDataList = resultFeatures;
            cVue.refreshAirSiteLayer("cityPointLayer",cVue.$store.state.cityRealTimeDataList,cVue.$store.state.stationtype.shikong);
          }
          else if(resultFeatures[0].stationTypeId == cVue.$store.state.stationtype.weixing ){
            cVue.$store.state.countyRealTimeDataList = resultFeatures;
            cVue.refreshAirSiteLayer("countyPointLayer",cVue.$store.state.countyRealTimeDataList,cVue.$store.state.stationtype.weixing);
          }
          
        }
      }
    },
    /**
     * 初始化空气站点数据
     */
    initAirLayers: function(stationTypeId) {
      let cVue = this;
      //初始化国控/省控/市控/微型图层
      //http://218.241.184.18:8900/api/station/list?areaCode=130703&stationTypeId=3
      if(stationTypeId){
        let url = dataRequestUrl.options.stationListInfo.getStationList;
        let data = {
          //areaCode: "130703"
          stationTypeId:stationTypeId
        };
        AirInfoImpl.getStationListImpl(url, data, cVue.queryAirSiteInfoCallback);
      }
    },
    queryAirSiteInfoCallback: function(result) {
      let cVue = this;
      if (result != null) {
        //绘制返回的查询站点列表
        let resultFeatures = result;
        let num = resultFeatures.length;
        if (num > 0) {
          if(resultFeatures[0].stationTypeId == cVue.$store.state.stationtype.guokong ){
            cVue.$store.state.countryRealTimeDataList = resultFeatures;
            createAirGraphics(
              resultFeatures,
              cVue.showAirGraphics,
              cVue.$store.state.mapview,
              cVue.$store.state.curRenderType,
              cVue.$store.state.selectFactor,
              cVue.$store.state.stationtype.guokong,
              "countryPointLayer"
            );
          }
          else if(resultFeatures[0].stationTypeId == cVue.$store.state.stationtype.shengkong ){
            cVue.$store.state.provinceRealTimeDataList = resultFeatures;
            createAirGraphics(
              resultFeatures,
              cVue.showAirGraphics,
              cVue.$store.state.mapview,
              cVue.$store.state.curRenderType,
              cVue.$store.state.selectFactor,
              cVue.$store.state.stationtype.shengkong,
              "provincePointLayer"
            );
          }  
          else if(resultFeatures[0].stationTypeId == cVue.$store.state.stationtype.shikong ){
            cVue.$store.state.cityRealTimeDataList = resultFeatures;
            createAirGraphics(
              resultFeatures,
              cVue.showAirGraphics,
              cVue.$store.state.mapview,
              cVue.$store.state.curRenderType,
              cVue.$store.state.selectFactor,
              cVue.$store.state.stationtype.shikong,
              "cityPointLayer"
            );
          }
          else if(resultFeatures[0].stationTypeId == cVue.$store.state.stationtype.weixing ){
            cVue.$store.state.countyRealTimeDataList = resultFeatures;
            createAirGraphics(
              resultFeatures,
              cVue.showAirGraphics,
              cVue.$store.state.mapview,
              cVue.$store.state.curRenderType,
              cVue.$store.state.selectFactor,
              cVue.$store.state.stationtype.weixing,
              "countyPointLayer"
            );
          }
        }
      } else {
        console.log("查询站点失败");
      }
    },
    //更新空气图层渲染方式
    refreshAirSiteLayer:function(layerId,hisDataList,stationTypeId){
      let cVue = this;
      if(hisDataList&&hisDataList.length>0){
        createAirGraphics(
          hisDataList,
          cVue.showAirGraphics,
          cVue.$store.state.mapview,
          cVue.$store.state.curRenderType,
          cVue.$store.state.selectFactor,
          stationTypeId,
          layerId
        );
      }
    },
    showAirGraphics: function(airPointFeaLayer, geometryExtent) {
      let cVue = this;
      if (cVue.$store.state.map != null) {
        if(airPointFeaLayer){
          airPointFeaLayer.visible = true;
          let layerId = airPointFeaLayer.id;
          let airLayer = cVue.$store.state.map.findLayerById(layerId);
          if (airLayer != null) {
            cVue.$store.state.map.remove(airLayer);
          }
          cVue.$store.state.map.add(airPointFeaLayer);
        }
      }
    },
    /**
     * 初始化雷达图片数据
     */
    initLadarLayers: function() {
      let cVue = this;
      // 实例化一个叠加图片图层类
      // let curPicUrl = 'http://10.0.201.241/zjnladar.png';
      // let geoExtent = {"xmin": 13118830.670424256, "ymin": 4408157.611561965, "xmax": 13134830.670424256, "ymax": 4424157.611561965,spatialReference:{wkid:3857}}  
      let curPicUrl = dataRequestUrl.options.radarImageUrl;
      let privateKeyFile = dataRequestUrl.options.radarExtentUrl;
      let htmlobj=$.ajax({url:privateKeyFile,async:false});
      let geoExtent=$.parseJSON( htmlobj.responseText);
      createRadarLayers(curPicUrl, cVue.addLadarImg, cVue.$store.state.mapview,geoExtent,"ladarImageLayer");
    },
    addLadarImg: function(ladarImageLayer,geometryExtent) {
      let cVue = this;
      if (cVue.$store.state.map != null) {
        let layer = cVue.$store.state.map.findLayerById("ladarImageLayer");
        if (layer != null) {
          cVue.$store.state.map.remove(layer);
        }
        //没有加载在数据第一层
        ladarImageLayer.visible =false;
        cVue.$store.state.map.add(ladarImageLayer,1); 
        ladarImageLayer.when(function(){
          ladarImageLayer.visible = true;
        });
        //地图移动刷新,防止地图初始化时候，图片叠加图层加载刷新不过来
        setTimeout(function() {
          var center = cVue.$store.state.mapview.center.clone();
          center.x -= 1; //底图是经纬度
          cVue.$store.state.mapview.center = center;
          cVue.$store.state.mapview.goTo(cVue.$store.state.mapview.center, {
            speedFactor: 1,
            easing: "linear" //linear, in-cubic, out-cubic, in-out-cubic, in-expo, out-expo, in-out-expo
          });
        }, 100);
        //雷达不改变比例尺，只中心定位
        if (geometryExtent) {
          cVue.$store.state.mapview.center = geometryExtent.center;
        }
      }
    },

    /**
     * 初始化污染云图数据
     */
    initWrytLayers: function() {
      let cVue = this;
      //let geoExtent = {xmin: 111.433762, ymin: 37.149617, xmax: 112.008355, ymax: 37.486424 ,spatialReference: { wkid: 4326 }}; 
      //let curPicUrl = 'http://localhost/aqi.png'  
      // debugger  
      let renderField = cVue.$store.state.selectFactor;  
      let curPicUrl = dataRequestUrl.options.pollution_cloudImageUrl+ (renderField) +".png";
      let geoExtent=dataRequestUrl.options.pollution_cloudExtentUrl;
      createWrytLayers(
        curPicUrl,
        cVue.addWrytImg,
        cVue.$store.state.mapview,
        geoExtent,
        "wrytImageLayer"
      );
    },
    addWrytImg: function(wrytImageLayer) {
      let cVue = this;
      if (cVue.$store.state.map != null) {
        let layer = cVue.$store.state.map.findLayerById("wrytImageLayer");
        if (layer != null) {
          cVue.$store.state.map.remove(layer);
        }
        //云图放在倒数第二层
        wrytImageLayer.visible =false;
        cVue.$store.state.map.add(wrytImageLayer,1); 
        wrytImageLayer.when(function(){
          wrytImageLayer.visible = true;
        });
        //地图移动刷新,防止地图初始化时候，图片叠加图层加载刷新不过来
        setTimeout(function() {
          var center = cVue.$store.state.mapview.center.clone();
          center.x -= 1; //底图是经纬度
          cVue.$store.state.mapview.center = center;
          let animation = cVue.$store.state.mapview.goTo(cVue.$store.state.mapview.center, {
            speedFactor: 1,
            easing: "linear" //linear, in-cubic, out-cubic, in-out-cubic, in-expo, out-expo, in-out-expo
          });
        }, 500);       
      } 
    },
    /**
     * 初始化风场数据
     */
    initWindLayers: function(){ 
      let cVue = this;
      let nowDate = new Date();
      let nowDateStr = formatDate(nowDate,"yyyyMMddhhmmss");
      let curHour = nowDateStr.substr(0,10);
      let curDay = nowDateStr.substr(0,8);
      let jsonName = curHour +".json";
      //风场的地址  20191204/2019120400.png  + curDay +"/"+ jsonName;
      let curJsonUrl = formatString("{0}{1}/{2}",dataRequestUrl.options.windImageUrl,curDay,jsonName)
      let htmlobj=$.ajax({
        url:curJsonUrl,
        async:false,
        success:function(response){
          createWindLayer(cVue.$store.state.mapview,response);
        },
        error: function() {
            //alert("请求失败");
        }
      }); 
    },

    /**
     * 初始化污染源数据
     */
    initWryLayers: function() {
      let url = dataRequestUrl.options.entStationListInfo.getEntStationList;
      let data = {
        //areaCode: "110101"
      };
      let cVue = this;
      AirInfoImpl.getStationListImpl(url, data, cVue.queryWrySiteInfoCallback);
    },
    queryWrySiteInfoCallback: function(result) {
      let cVue = this;
      let stationtypeobj=this.$store.state.stationtype;
      if (result != null) {
        //绘制返回的查询站点列表   接口的格式不统一
        let resultFeatures = result;
        let num = resultFeatures.length;
        if (num > 0) {
          cVue.$store.state.wryRealTimeDataList = resultFeatures;
          createWryGraphics(
            resultFeatures,
            cVue.showWryGraphics,
            cVue.$store.state.mapview,
            cVue.$store.state.curRenderType,
            cVue.$store.state.selectFactor,
            stationtypeobj.wanranyuan
          );
        }
      } else {
        console.log("查询污染源失败");
      }
    },
    //更新污染源图层渲染方式
    refreshWrySiteLayer:function(){
      let cVue = this;
      let stationtypeobj=this.$store.state.stationtype;
      let wryshrinklayer = cVue.$store.state.map.findLayerById("wryShrinkLayer");
      if(wryshrinklayer !=null){
        wryshrinklayer.removeAll();
      }
      if(cVue.$store.state.wryRealTimeDataList&&cVue.$store.state.wryRealTimeDataList.length>0){
        createWryGraphics(
          cVue.$store.state.wryRealTimeDataList,
          cVue.showWryGraphics,
          cVue.$store.state.mapview,
          cVue.$store.state.curRenderType,
          cVue.$store.state.selectFactor,
          stationtypeobj.wanranyuan
        );
      }
    },
    showWryGraphics: function(wryPointFeaLayer, geometryExtent) {
      let cVue = this;
      if (cVue.$store.state.map != null) {
        // debugger
        if (cVue.$store.state.allCheckLayerList.indexOf("wry") >= 0) {
          let layer = cVue.$store.state.map.findLayerById("wryPointFeaLayer");
          if (layer != null) {
            cVue.$store.state.map.remove(layer);
          }
          wryPointFeaLayer.visible = true;
          if(wryPointFeaLayer){
            cVue.$store.state.map.add(wryPointFeaLayer);
          }
        }
      }
    },
    /**
     * 初始化扬尘数据
     */
    initYcLayers: function() {
      let url = dataRequestUrl.options.dustStationListInfo.getDustStationList;
      let data = {
        //areaCode: "110100"
      };
      let cVue = this;
      AirInfoImpl.getStationListImpl(url, data, cVue.queryYcSiteInfoCallback);
    },
    queryYcSiteInfoCallback: function(result) {
      let cVue = this;
      let stationtypeobj=this.$store.state.stationtype;
      // debugger;
      if (result != null) {
        //绘制返回的查询站点列表   接口的格式不统一
        let resultFeatures = result;
        let num = resultFeatures.length;
        if (num > 0) {
          cVue.$store.state.ycRealTimeDataList = resultFeatures;
          createYcGraphics(
            resultFeatures,
            cVue.showYcGraphics,
            cVue.$store.state.mapview,
            cVue.$store.state.curRenderType,
            cVue.$store.state.selectFactor,
            stationtypeobj.yangchen
          );
        }
      } else {
        console.log("查询扬尘站点失败");
      }
    },
    //更新扬尘图层渲染方式
    refreshYcLayer:function(){
      let cVue = this;
      let stationtypeobj=this.$store.state.stationtype;
      let ycshrinklayer = cVue.$store.state.map.findLayerById("ycShrinkLayer");
      if(ycshrinklayer !=null){
        ycshrinklayer.removeAll();
      }
      if(cVue.$store.state.ycRealTimeDataList&&cVue.$store.state.ycRealTimeDataList.length>0){
        createYcGraphics(
          cVue.$store.state.ycRealTimeDataList,
          cVue.showYcGraphics,
          cVue.$store.state.mapview,
          cVue.$store.state.curRenderType,
          cVue.$store.state.selectFactor,
          stationtypeobj.yangchen
        );
      }
    },
    showYcGraphics: function(ycPointFeaLayer, geometryExtent) {
      let cVue = this;
      if (cVue.$store.state.map != null) {
        // debugger;
        if(
          cVue.$store.state.allCheckLayerList.indexOf("yc") >= 0 &&
          (cVue.$store.state.selectFactor == "pm25" ||
            cVue.$store.state.selectFactor == "pm10")
        ){
          let layer = cVue.$store.state.map.findLayerById("ycPointFeaLayer");
          if (layer != null) {
            cVue.$store.state.map.remove(layer);
          }
          if(ycPointFeaLayer){
            cVue.$store.state.map.add(ycPointFeaLayer);
          }
        }
      }
    },
    /**
     * 初始化污染事件
     */
    initWrsjLayers: function() {
      let url = dataRequestUrl.options.wrsjListInfo.getWrsjList;
      let data = { eventSource: 2 };
      let cVue = this;
      AirInfoImpl.getWrEventList(url, data, cVue.queryWrsjInfoCallback);
    },
    queryWrsjInfoCallback: function(result) {
      let cVue = this;
      if (result != null) {
        let resultFeatures = result;
        let num = resultFeatures.length;
        if (num > 0) {
          cVue.$store.state.wrsjRealTimeDataList = resultFeatures;
          //初始化不用绘制污染事件
          createWrsjGraphics(
            resultFeatures,
            cVue.showWrsjGraphics,
            cVue.$store.state.mapview,
            cVue.$store.state.wrsjTempTypeId
          );
        }
      } else {
        console.log("获取污染事件失败");
      }
    },
    //更新污染事件图层渲染方式
    refreshWrsjLayer:function(){
      let cVue = this;
      if(cVue.$store.state.wrsjRealTimeDataList&&cVue.$store.state.wrsjRealTimeDataList.length>0){
        createWrsjGraphics(
          cVue.$store.state.wrsjRealTimeDataList,
          cVue.showWrsjGraphics,
          cVue.$store.state.mapview,
          cVue.$store.state.wrsjTempTypeId
        );
      }
      else{
        cVue.initWrsjLayers();
      }
    },
    showWrsjGraphics: function(wrsjPointFeaLayer, geometryExtent) {
      let cVue = this;
      if (cVue.$store.state.map != null) {
        if (cVue.$store.state.allCheckLayerList.indexOf("wrsj") >= 0) {
          let layer = cVue.$store.state.map.findLayerById("wrsjPointFeaLayer");
          if (layer != null) {
            cVue.$store.state.map.remove(layer);
          }
          if(wrsjPointFeaLayer){
            wrsjPointFeaLayer.visible = true;
            cVue.$store.state.map.add(wrsjPointFeaLayer);
          }
        }
      }
    }
  }
};
</script>
<style scoped lang="less">
@import url("./style/checkbox.css");
@import url("./fonts/iconfont.css");
.zbliActive {
  border-color: #19ffc7;
  border: 1px solid;
  color: #19ffc7;
  background-image: linear-gradient(
    90deg,
    rgba(64, 233, 189, 0.28) 0%,
    rgba(95, 255, 217, 0.08) 100%
  );
}
.params-box {
  width: 115px;
  float: left;
  margin-right: 20px;
  color: #fff;
}
.params-box .params-item {
  margin-top: 10px;
}
.params-box .params-item.is-toggle .params-hd .icon:before {
  content: "\e9ae";
}
.params-box .params-item.is-toggle .params-bd {
  display: none;
}
.params-box .params-text {
  margin-left: 3px;
}
.params-box .params-hd {
  line-height: 36px;
  background-color: #1a3451;
  padding-left: 10px;
}
.params-box .params-hd .icon {
  float: right;
  width: 30px;
  font-size: 12px;
  cursor: pointer;
  text-align: center;
}
.params-box .params-bd > li {
  color: #b8bec4;
  //line-height: 34px;
  line-height: 30px;
  border: 1px solid transparent;
  background: rgba(29, 44, 67, 0.6);
  border-radius: 2px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
}
.params-box .params-bd {
  margin: 0px;
  padding: 0px;
  font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC",
    "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei",
    sans-serif;
}
.params-box .params-list {
  margin: 0px;
  padding: 0px;
  font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC",
    "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei",
    sans-serif;
}
.params-box .params-bd > li {
  font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC",
    "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei",
    sans-serif;
  border-top-color: #000;
  color: #b8bec4;
  //line-height: 34px;
  line-height: 30px;
  //border: 1px solid transparent;
  background: rgba(29, 44, 67, 0.9);
  border-radius: 2px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
}

.params-box .params-bd > li.is-active {
  border-color: #19ffc7;
  color: #19ffc7;
  background-image: linear-gradient(
    90deg,
    rgba(64, 233, 189, 0.28) 0%,
    rgba(95, 255, 217, 0.08) 100%
  );
}
.params-box .params-bd > li:hover {
  color: #19ffc7;
}
.params-box .params-bd > li a {
  display: block;
}
.params-box .params-list li {
  color: #b8bec4;
  font-size: 16px;
  //line-height: 36px;
  //height: 36px;
  line-height: 30px;
  height: 30px;
  background: rgba(29, 44, 67, 0.9);
  border-radius: 2px;
  text-align: left;
  cursor: pointer;
  padding-left: 10px;
}
.params-box .params-list li .icon {
  margin-right: 7px;
}
.params-box .params-list li:hover,
.params-box .params-list li.is-active {
  color: #19ffc7;
}

.params-box .params-list li .params-text {
  font-size: 14px;
  margin-left: 3px;
}
.params-box .params-list li a {
  display: block;
}
.icon {
  font-family: "icon" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.wuran{
  background-image: url("../map/images/污染源.svg");
  background-size: 16px;
}
.guokong{
  background-image: url("../map/images/国.svg");
  background-size: 16px;
}
.shengkong{
  background-image: url("../map/images/省.svg");
  background-size: 16px;
}
.shikong{
  background-image: url("../map/images/市.svg");
  background-size: 12px;
}
.weizhan{
  background-image: url("../map/images/微.svg");
  background-size: 16px;
}
.yangchen{
  background-image: url("../map/images/扬尘源.svg");
  background-size: 16px;
}
.leida{
  background-image: url("../map/images/雷达.svg");
  background-size: 16px;
}
.shijian{
  background-image: url("../map/images/事件.svg");
  background-size: 16px;
}
.fengchang{
  background-image: url("../map/images/风场.svg");
  background-size: 16px;
}
.yuntu{
  background-image: url("../map/images/云图.svg");
  background-size: 16px;
}
ol,
ul,
li {
  list-style: none;
}
</style>
