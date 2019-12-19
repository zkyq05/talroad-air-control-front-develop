<template>
  <div class="datetime-line" style="width: 85%;float: right;">
    <el-select class="item-choose" v-model="value" size="small" @change="selectSliderPlayType">
      <el-option
        v-for="(item,index) in options"
        :key="index"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    <div id="timeSlider" class="timeSliderClass"></div>
  </div>
</template>

<script>
import { loadModules } from "esri-loader";
import $ from "jquery";
import echarts from "echarts";
import { dataRequestUrl } from "./mapjs/AppConfig";
import AirInfoImpl from "./mapjs/AirInfoImpl";
import { formatDate, formatString } from "./mapjs/CommonUtil";
import {
  createPollutionGraphics_his,
  createPollutionGraphics
} from "./mapjs/MapImpl_pollution";
export default {
  name: "TimeSliderComponent",
  data() {
    return {
      options: [
        {
          value: "1",
          label: "单位/小时"
        },
        {
          value: "2",
          label: "单位/天"
        }
      ],
      value: "1",
      allWryHisHourDataList: [], //从接口一次性取回24小时的污染源历史数据
      allWryHisDayDataList: [], //从接口一次性取回30天的污染源历史数据
      startTime: null,
      endTime: null,
      dataArr: [],
      myChart: null,
      linshi2: [
        {
          stationId: "1",
          stationName: "汾阳市实验印刷厂测试1",
          longitude: 119.49,
          latitude: 31.21,
          stationTypeId: 1005,
          entType: "11",
          isover: 0,
          alarmStatus: 2
        },
        {
          stationId: "2",
          stationName: "汾阳市东晟机械制造有限公司测试2",
          longitude: 110.59,
          latitude: 35.02,
          stationTypeId: 1005,
          entType: "12",
          isover: 0,
          alarmStatus: 1
        },
        {
          stationId: "3",
          stationName: "汾阳市华茂传动轴有限公司测试3",
          longitude: 99.1,
          latitude: 25.08,
          stationTypeId: 1005,
          entType: "13",
          isover: 0,
          alarmStatus: 1
        },
        {
          stationId: "4",
          stationName: "汾阳市日升活性炭有限公司测试4",
          longitude: 101.72,
          latitude: 31.93,
          stationTypeId: 1005,
          entType: "14",
          isover: 1,
          alarmStatus: 2
        },
        {
          stationId: "5",
          stationName: "汾阳市石富高钙灰有限公司测试5",
          longitude: 112.27,
          latitude: 23.03,
          stationTypeId: 1005,
          entType: "15",
          isover: 1,
          alarmStatus: 1
        }
      ]
    };
  },
  created:function(){
    this.WryHisHourinit();
    this.WryHisDayinit();
  },
  mounted: function() {
    loadModules(["esri/layers/BaseTileLayer", "esri/config"]).then(
      ([BaseTileLayer, esriConfig]) => {
        let cVue = this;
        //初始就读取历史数据接口
        cVue.calTime();
        //首先获取时间再初始化时间轴
        var inWidth =
          document.documentElement.clientWidth || document.body.clientWidth;
        console.log("inWidth" + inWidth);
        $("#timeSlider").css("width", "2100px");
        //document.getElementById('main').style.height = height+'px';
        cVue.myChart = echarts.init(document.getElementById("timeSlider"));
        cVue.myChart.resize(); //直接加这句即可
        let option = {
          baseOption: {
            color: ["#818C9B"],
            timeline: {
              //symbol:'pin',
              // symbol:'path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z',
              symbol: "circle",
              axisType: "category", //category time value
              playInterval: 5000,
              loop: false,
              bottom: "2.5%",
              symbolSize: 10,
              padding: [0, 0, 0, 0],
              data: cVue.dataArr,
              // data: ['1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016'],
              currentIndex: 0,
              lineStyle: {
                color: "#505B69",
                show: false
              },
              itemStyle: {
                color: "#505B69"
              },
              label: {
                color: "#5B6673",
                position: "bottom",
                fontFamily: "Oswald",
                fontSize: 10,
                lineHeight: 14,
                interval: 2,
                height: 14,
                formatter: params => {
                  //按小时，显示历史24小时数据
                  if (params.length == 19) {
                    if (cVue.value == "1") {
                      return params.substr(11, 5);
                    } else if (cVue.value == "2") {
                      return params.substr(5, 5);
                    }
                  } else {
                    return "";
                  }
                }
              },
              checkpointStyle: {
                color: "#0FB6F5",
                borderWidth: 0
              },
              controlStyle: {
                color: "#818C9B",
                borderColor: "#818C9B",
                itemSize: 16
              }
            }
          }
        };
        cVue.myChart.setOption(option);
        cVue.myChart.on("timelinechanged", function(params) {
          // currentIndex从1开始
          let curDate = cVue.dataArr[params.currentIndex];
          cVue.slideChangeEvent(curDate);
        });
        cVue.myChart.on("timelineplaychanged", function(params) {
          if (params.playState) {
            let layer = cVue.$store.state.PollutionSource.map.findLayerById(
              "pollutionPointFeaLayer"
            );
            layer.visible = false;
            let layer_his = cVue.$store.state.PollutionSource.map.findLayerById(
              "pollutionPointFeaLayer_his"
            );
            if (layer_his) {
              layer_his.visible = true;
            }
          } else {
            let layer = cVue.$store.state.PollutionSource.map.findLayerById(
              "pollutionPointFeaLayer"
            );
            layer.visible = true;
            let layer_his = cVue.$store.state.PollutionSource.map.findLayerById(
              "pollutionPointFeaLayer_his"
            );
            if (layer_his) {
              layer_his.visible = false;
            }
          }
        });
      }
    );
  },
  methods: {
    slideChangeEvent: function(curDate) {
      let cVue = this;
      //当前时间格式  2018-08-08 01:00:00  截取后面小时和分钟
      if (cVue.$store.state.PollutionSource.map != null) {
        let wrylayer = cVue.$store.state.PollutionSource.map.findLayerById(
          "pollutionPointFeaLayer_his"
        );
        if (wrylayer != null) {
          cVue.$store.state.PollutionSource.map.remove(wrylayer);
        }
      }
      let curTime = "";
      let curTimeWryFeatures = [];

      if (cVue.value == "1") {
        //小时的数据格式  01:00
        // curTime = [curDate.substr(11, 5)];
        // let wryNum = cVue.allWryHisHourDataList.length;
        // if (wryNum > 0) {
        //   curTimeWryFeatures = cVue.allWryHisHourDataList.filter(item => {
        //     return curTime.includes(item.hour);
        //   });
        // }
        curTime = curDate.substr(11, 5);
        let wryNum = cVue.allWryHisHourDataList.length;
        let crutime_arrary = curTime.split(":");
        if (wryNum > 0) {
          for (let i = 0; i < wryNum; i++) {
            if (
              cVue.allWryHisHourDataList[i].hour == crutime_arrary[0] 
            ) {
              let mydata = {
                stationId: cVue.allWryHisHourDataList[i].stationId,
                stationName: cVue.allWryHisHourDataList[i].stationName,
                longitude: cVue.allWryHisHourDataList[i].longitude,
                latitude: cVue.allWryHisHourDataList[i].latitude,
                stationTypeId: parseInt(
                  cVue.allWryHisHourDataList[i].stationTypeId
                ),
                entType: cVue.allWryHisHourDataList[i].entType,
                isover: cVue.allWryHisHourDataList[i].isover,
                alarmStatus: cVue.allWryHisHourDataList[i].alarmStatus
              };
              curTimeWryFeatures.push(mydata);
            }
          }
        }
      } else if (cVue.value == "2") {
        //天的数据格式  08-27
        // curTime =[curDate.substr(5,5)];
        // let wryNum =  cVue.allWryHisDayDataList.length;
        //   if (wryNum > 0) {
        //     curTimeWryFeatures = cVue.allWryHisDayDataList.filter(item => { return curTime.includes(item.day); });
        // }
        curTime = curDate.substr(5, 5);
        let wryNum = cVue.allWryHisDayDataList.length;
        let crutime_arrary = curTime.split("-");
        if (wryNum > 0) {
          for (let i = 0; i < wryNum; i++) {
            if (
              cVue.allWryHisDayDataList[i].month == crutime_arrary[0] &&
              cVue.allWryHisDayDataList[i].day == crutime_arrary[1]
            ) {
              let mydata = {
                stationId: cVue.allWryHisDayDataList[i].stationId,
                stationName: cVue.allWryHisDayDataList[i].stationName,
                longitude: cVue.allWryHisDayDataList[i].longitude,
                latitude: cVue.allWryHisDayDataList[i].latitude,
                stationTypeId: parseInt(
                  cVue.allWryHisDayDataList[i].stationTypeId
                ),
                entType: cVue.allWryHisDayDataList[i].entType,
                isover: cVue.allWryHisDayDataList[i].isover,
                alarmStatus: cVue.allWryHisDayDataList[i].alarmStatus
              };
              curTimeWryFeatures.push(mydata);
            }
          }
        }
      }

      
      if(curTimeWryFeatures.length>0){
        for(let i=0;i<curTimeWryFeatures.length;i++){
            curTimeWryFeatures[i].isover=Number(curTimeWryFeatures[i].isover);
          }
        createPollutionGraphics_his(
          curTimeWryFeatures,
          // cVue.linshi2,
          cVue.showWryGraphics,
          cVue.$store.state.PollutionSource.pollutiontype,
          cVue.$store.state.PollutionSource.pullution_selectstatue,
          cVue.$store.state.PollutionSource.curRenderType
        );
      }
    },
    //时间轴
    selectSliderPlayType: function(event, item) {
      let cVue = this;
      //需要重新初始化slider
      cVue.calTime();
      let option = cVue.myChart.getOption();
      option.timeline[0].data = cVue.dataArr;
      cVue.myChart.setOption(option);
    },
    calTime: function() {
      let cVue = this;
      //按小时播放，是最近历史24小时的数据
      //按天播放，是历史30天的数据
      let nowDate = new Date();
      // let nowDate = new Date(2019, 12, 30, 0, 0, 0); //12月有站点天的测试数据
      //nowDate = new Date(2019,11,30,0,0,0);        //11月有污染源天的测试数据
      //nowDate = new Date(2019,9,30,0,0,0);        //9月有扬尘天的测试数据
      //nowDate = new Date(2019,12,4,18,0,0);       //12月4日有污染云图小时的数据
      //nowDate = new Date(2019,12,2,23,0,0);         //12月2日20点，23点有雷达小时数据
      // nowDate = new Date(2019, 12, 4, 23, 0, 0); //12月4日，23点有风场小时数据
      cVue.dataArr = [];
      if (cVue.value == "1") {
          cVue.endTime = new Date(
            nowDate.getFullYear(),
            nowDate.getMonth(),
            nowDate.getDate(),
            nowDate.getHours() - 1,
            0,
            0
          );
        //获取每个时间的字符
        let timeIntervalHours = 24;
        let tempTime = cVue.endTime;
        for (var i = 0; i < timeIntervalHours; i++) {
          //时间序列需要正序 tempTime.format('yyyy-MM-dd hh:mm:ss');
          cVue.dataArr[timeIntervalHours - i - 1] = formatDate(
            tempTime,
            "yyyy-MM-dd hh:mm:ss"
          );
          tempTime.setHours(tempTime.getHours() - 1);
        }
        cVue.startTime = tempTime;
      } else if (cVue.value == "2") {
        cVue.endTime = new Date(
          nowDate.getFullYear(),
          nowDate.getMonth() ,
          nowDate.getDate() - 1,
          0,
          0,
          0
        );
        //获取每个时间的字符  tempDay.format('yyyy-MM-dd hh:mm:ss')
        let timeIntervalDays = 30;
        let tempDay = cVue.endTime;
        for (var i = 0; i < timeIntervalDays; i++) {
          cVue.dataArr[timeIntervalDays - i - 1] = formatDate(
            tempDay,
            "yyyy-MM-dd hh:mm:ss"
          );
          tempDay.setDate(tempDay.getDate() - 1);
        }
        cVue.startTime = tempDay;
      }
    },
    /***********beg污染源历史数据***********/
    //获取请求小时分段
    WryHisHourinit:function(){
      let cVue = this;
      let curDate = new Date(); //当前时间
      curDate.setDate(curDate.getDate()-65);
      let time_array_start=[];
      let time_array_stop=[];
      let departhour=4;                               //间隔小时数，最好能被24整除，不能整除会多增加数据
      let departnum=Math.ceil(24/departhour);
      let num=0;
      for(let i=0;i<departnum-1;i++){
        time_array_start[i] = cVue.dateFtt("yyyy-MM-dd hh",new Date(curDate.getTime() - (departhour*(departnum-i)+1-i)*60*60*1000));
        time_array_stop[i] = cVue.dateFtt("yyyy-MM-dd hh",new Date(curDate.getTime() - (departhour*(departnum-i)+1-i-departhour)*60*60*1000));
      }
      for(let j=0;j<time_array_start.length;j++){
        let mydata={
          "beginTime":time_array_start[j],
          "endTime":time_array_stop[j]
        }
        cVue.getWryHisHourData(mydata);
      }
    },
    //获取请求天数
    WryHisDayinit:function(){
      let cVue = this;
      let curDate = new Date(); //当前时间
      // curDate.setDate(curDate.getDate()-65);
      let time_array_start=[];
      let time_array_stop=[];
      let departhour=5;                               //间隔小时数，最好能被24整除，不能整除会多增加数据
      let departnum=Math.ceil(30/departhour);
      let num=0;
      for(let i=0;i<departnum-1;i++){
        time_array_start[i] = cVue.dateFtt("yyyy-MM-dd",new Date(curDate.getTime() - (departhour*(departnum-i)+1-i)*60*60*1000*24));
        time_array_stop[i] = cVue.dateFtt("yyyy-MM-dd",new Date(curDate.getTime() - (departhour*(departnum-i)+1-i-departhour)*60*60*1000*24));
      }
      for(let j=0;j<time_array_start.length;j++){
        let mydata={
          "beginDate":time_array_start[j],
          "endDate":time_array_stop[j]
        }
        cVue.getWryHisDayData(mydata);
      }
    },
    //规整时间并转为字符串
    dateFtt:function(fmt,date) 
      { //author: meizz 
      var o = { 
      "M+" : date.getMonth()+1,     //月份 
      "d+" : date.getDate(),     //日 
      "h+" : date.getHours(),     //小时 
      "m+" : date.getMinutes(),     //分 
      "s+" : date.getSeconds(),     //秒 
      "q+" : Math.floor((date.getMonth()+3)/3), //季度 
      "S" : date.getMilliseconds()    //毫秒 
      }; 
      if(/(y+)/.test(fmt)) 
      fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length)); 
      for(var k in o) 
      if(new RegExp("("+ k +")").test(fmt)) 
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
      return fmt; 
      },
    //获取站点历史小时数据
    getWryHisHourData: function(data) {
      let cVue = this;
      //初始化国控/省控/市控/微型图层  历史24小时的数据
      let url =
        dataRequestUrl.options.entStationListInfo.history24HoursDataList;
      AirInfoImpl.getStationListImpl(url, data, cVue.queryWryHourInfoCallback);
    },
    //获取站点历史天数据
    getWryHisDayData: function(data) {
      let cVue = this;
      let url = dataRequestUrl.options.entStationListInfo.history30DaysDataList;
      //初始化国控/省控/市控/微型图层  历史30天的数据
      AirInfoImpl.getStationListImpl(url, data, cVue.queryWryDayInfoCallback);
    },
    queryWryHourInfoCallback: function(result) {
      let cVue = this;
      if (result != null) {
        //绘制返回的查询站点列表
        let resultFeatures = result;
        for(let i=0;i<resultFeatures.length;i++){
          cVue.allWryHisHourDataList.push(resultFeatures[i]);
        }
      } else {
        console.log("查询站点失败");
      }
    },
    queryWryDayInfoCallback: function(result) {
      let cVue = this;
      if (result != null) {
        //绘制返回的查询站点列表
        let resultFeatures = result;
        for(let i=0;i<resultFeatures.length;i++){
          cVue.allWryHisDayDataList.push(resultFeatures[i]);
        }
      } else {
        console.log("查询站点失败");
      }
    },
    showWryGraphics: function(pollutionPointFeaLayer, geometryExtent) {
      let cVue = this;
      if (cVue.$store.state.PollutionSource.map != null) {
        let layer = cVue.$store.state.PollutionSource.map.findLayerById(
          "pollutionPointFeaLayer_his"
        );
        if (layer != null) {
          cVue.$store.state.PollutionSource.map.remove(layer);
        }
        if (pollutionPointFeaLayer) {
          let stationWhereExp = "(";
          for (
            let i = 0;
            i < cVue.$store.state.PollutionSource.pollution_selecttype.length;
            i++
          ) {
            if (stationWhereExp.length > 1) {
              stationWhereExp += " or ";
            }
            stationWhereExp +=
              "entType = '" +
              cVue.$store.state.PollutionSource.pollution_selecttype[i] +
              "'";
          }
          stationWhereExp += ")";
          let statue = cVue.$store.state.PollutionSource.pullution_selectstatue;
          switch (statue) {
            case "all":
              break;
            case "qualification":
              stationWhereExp += "and (alarmStatus <> 2 and isover = 0)";
              break;
            case "Offline":
              stationWhereExp += "and (alarmStatus = 2 or isover is null)";
              break;
            case "Excess":
              stationWhereExp += "and (alarmStatus <> 2 and isover =1)";
              break;
          }

          pollutionPointFeaLayer.definitionExpression = stationWhereExp;
          cVue.$store.state.PollutionSource.map.add(pollutionPointFeaLayer);
        }
      }
    }
    /***********end污染源历史数据***********/
  }
};
</script>

<style lang="less" scoped>
.timeSliderClass {
  height: 50px;
  z-index: 9999999999999999;
}
.datetime-line {
  height: 50px;
  background: #152437;
  display: flex;
  align-items: center;
}
.datetime-line .el-select {
  width: 150px;
}
.el-select {
  display: inline-block;
  position: relative;
}
</style>