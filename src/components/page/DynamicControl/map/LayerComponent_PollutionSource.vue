<template>
  <div class="params-box" style="width:118px;">
    <div class="params-box">
      <div class="params-item" style="transform: translateY(-100px) translateX(28px)">
        <div class="params-hd">
          <label class="el-checkbox">
            <span class="el-checkbox__input">
              <span class="el-checkbox__inner"></span>
              <input type="checkbox" aria-hidden="false" class="el-checkbox__original enttypecheckbox_all" value @click="CheckItem_all(item)" v-model="alltype" />
            </span>
          </label>
          <span class="params-text" style="display:inline-block;margin-left:12px;">类&nbsp;型</span>
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
                    class="el-checkbox__original enttypecheckbox"
                    :value="item.value"
                    @click="CheckItem(item)"
                    v-model="allChecked"
                  />
                </span>
                <span class="el-checkbox__label">
                  <i
                    v-bind:class="item.iconclass"
                    style="float: left;width: 24px;margin-left: 0px;margin-right: 3px;font-size: 16px;margin-top: -3px;"
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
import {
  createPollutionGraphics
} from "./mapjs/MapImpl_pollution";
import $ from "jquery";

export default {
  name: "LayerComponentPollutionSource",
  data() {
    return {
      pm25Factor: "pm25",
      items:[],
      allChecked: [],
      alltype:false,
      getdata:null
    };
  },
  created:function(){
    this.getstation_type();
    this.getPollutionSourceType();
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
      "esri/layers/BaseDynamicLayer"
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
        BaseDynamicLayer
      ]) => {}
    );
    
  },
  computed: {
    myRenderType() {
      return this.$store.state.PollutionSource.curRenderType;
    },
    mainMapLoad(){
      return this.$store.state.PollutionSource.mapLoaded;
    },
    stationtype(){
      return this.$store.state.PollutionSource.pollution_selecttype
    },
    stationstatue(){
      return this.$store.state.PollutionSource.pullution_selectstatue
    }
  },
  watch: {
    myRenderType: function() {
      let cVue = this;
      cVue.WryGraphicsrefresh();
      // cVue.WryGraphicschange();
    },
    mainMapLoad:function(){
      let cVue = this;
      cVue.initPollutionLayers();
    },
    stationtype:function(){
      let cVue = this;
      // cVue.initPollutionLayers();
      cVue.WryGraphicschange();

      // let select_num=cVue.$store.state.PollutionSource.pollution_selecttype.length;
      // let kind_num=cVue.$store.state.PollutionSource.pollutiontype.length;
      // if(kind_num == select_num){
      //   cVue.alltype=true;
      // }else{
      //   cVue.alltype=false;
      // }
    },
    stationstatue:function(){
      let cVue = this;
      // cVue.initPollutionLayers();
      cVue.WryGraphicschange();
    }
  },
  methods: {
     //获取所有站点类型及编号
    getstation_type: function() {
      let url = dataRequestUrl.options.stationListInfo.getStation_type;
      let parameter = {};
      let cVue = this;
      let mydata = AirInfoImpl.getpopularData(
        url,
        parameter,
        cVue.dealstation_type
      );
    },
    //处理获取的所有站点类型和编号
    dealstation_type: function(data) {
      let cVue = this;
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
      cVue.getMapData();
    },
    //初始化污染源站点数据
    initPollutionLayers: function() {
      let cVue = this;
      let url = dataRequestUrl.options.stationListInfo.getContaminantList;
      let data = {
        //areaCode: "130703"
        //entType:""
      };
      AirInfoImpl.getStationListImpl(url, data, cVue.pollutionCallback);
    },
    //污染源站点获取后处理
    pollutionCallback: function(result) {
      let cVue = this;
      if (result != null) {
        //绘制返回的查询站点列表
        cVue.getdata=result;
        let resultFeatures = result;
        let num = resultFeatures.length;
        if (num > 0) {
          for(let i=0;i<num;i++){
            resultFeatures[i].isover=Number(resultFeatures[i].isover);
          }
          createPollutionGraphics(
            resultFeatures,
            cVue.showWryGraphics,
            cVue.$store.state.PollutionSource.pollutiontype,
            cVue.$store.state.PollutionSource.pullution_selectstatue,
            cVue.$store.state.PollutionSource.curRenderType
          );
        }
      } else {
        console.log("污染源站点信息获取失败");
      }
    },
    //显示图层
    showWryGraphics: function(pollutionPointFeaLayer, geometryExtent) {
      let cVue = this;
      if (cVue.$store.state.PollutionSource.map != null) {
        let layer = cVue.$store.state.PollutionSource.map.findLayerById("pollutionPointFeaLayer");
        if (layer != null) {
          cVue.$store.state.PollutionSource.map.remove(layer);
        }
        if(pollutionPointFeaLayer){
          let stationWhereExp = "(";
          for (let i = 0;i < cVue.$store.state.PollutionSource.pollution_selecttype.length;i++ ) {
            if (stationWhereExp.length > 1) {
              stationWhereExp += " or ";
            }
            stationWhereExp +=
              "entType = '" + cVue.$store.state.PollutionSource.pollution_selecttype[i]+"'";
          }
          stationWhereExp +=")"
          let statue=cVue.$store.state.PollutionSource.pullution_selectstatue;
          switch (statue){      
            case "all":

              break;
            case "qualification":
              stationWhereExp +="and (alarmStatus <> 2 and isover = 0)";
              break;
            case "Offline":
              stationWhereExp +="and (alarmStatus = 2 or isover is null)";
              break;
            case "Excess":
              stationWhereExp +="and (alarmStatus <> 2 and isover =1)";
              break;
          }
          if(cVue.$store.state.PollutionSource.curRenderType==0){
              pollutionPointFeaLayer.labelsVisible =false;
          }else{
              pollutionPointFeaLayer.labelsVisible =true;
          }
          pollutionPointFeaLayer.definitionExpression = stationWhereExp;
          cVue.$store.state.PollutionSource.map.add(pollutionPointFeaLayer);
        }        
      }
    },
    //不重新读取数据情况下切换显示
    WryGraphicschange: function(pollutionPointFeaLayer, geometryExtent) {
      let cVue = this;
      if (cVue.$store.state.PollutionSource.map != null) {
        let pollutionPointFeaLayer = cVue.$store.state.PollutionSource.map.findLayerById("pollutionPointFeaLayer");
        if(pollutionPointFeaLayer){
          let stationWhereExp = "(";
          for (let i = 0;i < cVue.$store.state.PollutionSource.pollution_selecttype.length;i++ ) {
            if (stationWhereExp.length > 1) {
              stationWhereExp += " or ";
            }
            stationWhereExp +=
              "entType = '" + cVue.$store.state.PollutionSource.pollution_selecttype[i]+"'";
          }
          stationWhereExp +=")"
          let statue=cVue.$store.state.PollutionSource.pullution_selectstatue;
          switch (statue){      
            case "all":

              break;
            case "qualification":
              stationWhereExp +="and (alarmStatus <> 2 and isover = 0)";
              break;
            case "Offline":
              stationWhereExp +="and (alarmStatus = 2 or isover is null)";
              break;
            case "Excess":
              stationWhereExp +="and (alarmStatus <> 2 and isover =1)";
              break;
          }
          if(cVue.$store.state.PollutionSource.curRenderType==0){
              pollutionPointFeaLayer.labelsVisible =false;
          }else{
              pollutionPointFeaLayer.labelsVisible =true;
          }
          pollutionPointFeaLayer.definitionExpression = stationWhereExp;
          // pollutionPointFeaLayer.refresh();
        }        
      }
    },
    //根据获取的数据重新渲染
    WryGraphicsrefresh: function() {
      let cVue = this;
      if (cVue.getdata != null) {
        let resultFeatures = cVue.getdata;
        let num = resultFeatures.length;
        if (num > 0) {
          createPollutionGraphics(
            resultFeatures,
            cVue.showWryGraphics,
            cVue.$store.state.PollutionSource.pollutiontype,
            cVue.$store.state.PollutionSource.pullution_selectstatue,
            cVue.$store.state.PollutionSource.curRenderType
          );
        }
      } else {
        console.log("污染源站点还没有获取信息");
      }
    },
    //站点类型多选
    CheckItem: function(item) {
      let cVue = this;
      item.checked = !item.checked;
      setTimeout(function() {
        let curSelected = item.value;
        let select_array=cVue.$store.state.PollutionSource.pollution_selecttype;
        let num=select_array.indexOf(curSelected);
        if(num != -1){
          select_array.splice(num,1);
          cVue.$store.state.PollutionSource.pollution_selecttype=select_array;
        }else{
          select_array.push(curSelected);
          cVue.$store.state.PollutionSource.pollution_selecttype=select_array;
      };
      }, 0.5);
    },
    //站点类型全选
    CheckItem_all: function(item) {
      let cVue = this;
      
      setTimeout(function() {
        let select_array=cVue.$store.state.PollutionSource.pollution_selecttype;
        let kind_num=cVue.$store.state.PollutionSource.pollutiontype.length;
        let num=select_array.length;
        
        if(num == kind_num){
          cVue.$store.state.PollutionSource.pollution_selecttype=[];
          $('.enttypecheckbox').attr('checked', false);
          $('.enttypecheckbox_all').attr('checked', false);
        }else{
          $('.enttypecheckbox').attr('checked', true);
          $('.enttypecheckbox_all').attr('checked', true);
          select_array=[];
          for(let i=0;i<kind_num;i++){
            select_array.push(cVue.$store.state.PollutionSource.pollutiontype[i].value);
          }
          cVue.$store.state.PollutionSource.pollution_selecttype=select_array;
        };
      }, 0.5);
    },
    //污染源类型选择
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
    //获取所有污染源类型
    getPollutionSourceType: function() {
      let url = dataRequestUrl.options.entStationListInfo.getSourceKind;
      let parameter = {};
      let cVue = this;
      let mydata = AirInfoImpl.getpopularData_nostatue(
        url,
        parameter,
        cVue.dealSourceKind
      );
    },
    //处理污染源种类
    dealSourceKind: function(data) {
      let cVue = this;
      let orgdata=data;
      cVue.items=[];
      if(orgdata.length>0){
        let num=0
        for(let i=0;i<orgdata.length;i++){
          if(orgdata[i].isUsed==1){
            switch(orgdata[i].name){
              case "钢铁":
                cVue.items[num]=new Object;
                cVue.items[num]={
                  text: orgdata[i].name,
                  value: orgdata[i].code,
                  iconclass: "icon icon-gangtie",
                  checked: true
                }
                num ++;
              break;
              case "煤炭":
                cVue.items[num]=new Object;
                cVue.items[num]={
                  text: orgdata[i].name,
                  value: orgdata[i].code,
                  iconclass: "icon icon-meitan",
                  checked: false
                }
                num ++;
              break;
              case "工地":
                cVue.items[num]=new Object;
                cVue.items[num]={
                  text: orgdata[i].name,
                  value: orgdata[i].code,
                  iconclass: "icon icon-gongdi",
                  checked: false
                }
                num ++;
              break;
              case "餐饮":
                cVue.items[num]=new Object;
                cVue.items[num]={
                  text: orgdata[i].name,
                  value: orgdata[i].code,
                  iconclass: "icon icon-canyin",
                  checked: false
                }
                num ++;
              break;
              case "铸造":
                cVue.items[num]=new Object;
                cVue.items[num]={
                  text: orgdata[i].name,
                  value: orgdata[i].code,
                  iconclass: "icon icon-zhuzao",
                  checked: false
                }
                num ++;
              break;
            }
          }
        }
        cVue.$store.state.PollutionSource.pollutiontype=cVue.items;
        cVue.$store.state.PollutionSource.pollution_selecttype.push(cVue.items[0].value);
        cVue.allChecked.push(cVue.items[0].value);
      }else{
        console.log("抱歉，未获取到污染源种类");
      }
    },
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
  width: 118px;
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
  background: rgba(29, 44, 67, 0.6);
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
  background: rgba(29, 44, 67, 0.6);
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
ol,
ul,
li {
  list-style: none;
}
.icon-gangtie:before {
    content: "\e9e2";
}
</style>
