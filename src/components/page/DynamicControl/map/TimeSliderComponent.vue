<template>
   <div class="datetime-line">
     <el-select class="item-choose" v-model="value" size="small" @change="selectSliderPlayType">
      <el-option
          v-for="(item,index) in options"
          :key="index"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>
    <div id="timeSlider" class="timeSliderClass">

    </div>
  </div>
</template>

<script>

import { loadModules } from "esri-loader";
import $ from "jquery";
import echarts from "echarts";
import { dataRequestUrl } from "./mapjs/AppConfig";
import AirInfoImpl from "./mapjs/AirInfoImpl";
import {formatDate,formatString} from './mapjs/CommonUtil';

import {createAirGraphics,createWryGraphics,createYcGraphics,createWrytLayers,createRadarLayers} from "./mapjs/MapImpl";
import { createWindLayer,myWindy} from "./mapjs/WindImpl";
export default {
  name: "TimeSliderComponent",
  data() {
    return{
      options: [{
          value: '1',
          label: '单位/小时'
      }, {
          value: '2',
          label: '单位/天'
      }],
      value: '1',
      allAirHisHourDataList:[],  //从接口一次性取回24小时的空气站点历史数据  2019-12-08 16  2019-12-09 16
      allAirHisDayDataList:[],   //从接口一次性取回30天的空气站点历史数据    2019-11-09 2019-12-09

      allCountryHisHourDataList:[],
      allCountryHisDayDataList:[],
      allProvinceHisHourDataList:[],
      allProvinceHisDayDataList:[],
      allCityHisHourDataList:[],
      allCityHisDayDataList:[],
      allCountyHisHourDataList:[],
      allCountyHisDayDataList:[],

      allWryHisHourDataList:[],  //从接口一次性取回24小时的污染源历史数据
      allWryHisDayDataList:[],   //从接口一次性取回30天的污染源历史数据
      allYcHisHourDataList:[],  //从接口一次性取回24小时的扬尘历史数据
      allYcHisDayDataList:[],   //从接口一次性取回30天的扬尘历史数据
      allWindHisDataList:{},    //历史风场数据
      hourInterval:4,   //4小时取一次数据
      hourList:[],
      dayList:[],
      dayInterval:4, //4天取一次数据
      startTime:null,
      endTime:null,
      dataArr:[],
      myChart:null
    }
  },
  mounted: function() {
      loadModules([
        "esri/config"
      ]).then(([esriConfig]) => {
        let cVue = this;
        //初始就读取历史数据接口
        cVue.calTime();
        
        //首先获取时间再初始化时间轴
        let inWidth = document.documentElement.clientWidth || document.body.clientWidth;
        //console.log("inWidth"+inWidth);
        $("#timeSlider").css('width', inWidth);
        //document.getElementById('main').style.height = height+'px';
        cVue.myChart= echarts.init(document.getElementById('timeSlider'));
        cVue.myChart.resize();//直接加这句即可
        let option = {
            baseOption: {
                color:['#818C9B'],
                timeline: {
                    //symbol:'pin',
                    // symbol:'path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z',
                    symbol:'circle',
                    axisType: 'category',   //category time value
                    playInterval: 3000,
                    loop: false,
                    bottom: "2.5%",
                    symbolSize: 10,
                    padding:[0,0,0,0],
                    data: cVue.dataArr,
                    // data: ['1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016'],
                    currentIndex:0,
                    lineStyle: {
                        color:'#505B69',
                        show:false
                    },
                    itemStyle: {
                        color:'#505B69'
                    },
                    label:{
                        color:'#5B6673',
                        position:'bottom',
                        fontFamily:'Oswald',
                        fontSize:10,
                        lineHeight:14,
                        interval: 2,
                        height:14,
                        formatter: (params)=>{
                            //按小时，显示历史24小时数据
                            if(params.length== 19){
                              if(cVue.value == '1'){
                                return params.substr(11,5);  
                              }
                              else if(cVue.value == '2'){
                                return params.substr(5,5);  
                              }
                            }else{
                              return '';
                            } 
                        }
                    },
                    checkpointStyle: {
                       color:'#0FB6F5',
                        borderWidth:0
                    },
                    controlStyle:{
                        color:'#818C9B',
                        borderColor:'#818C9B',
                        itemSize:16
                    }
                }
            }
        };
        cVue.myChart.setOption(option);  
        cVue.myChart.on('timelinechanged', function (params) {
          //currentIndex从1开始
          let curDate=cVue.dataArr[params.currentIndex];
          cVue.slideChangeEvent(curDate);
        })
      })
    },
    methods: {
      slideChangeEvent:function(curDate){
        let cVue = this;
        //当前时间格式  2018-08-08 01:00:00  截取后面小时和分钟
        let curTime ="";
        let curTimeAirFeatures =[];
        let curTimeCountryFeatures =[];
        let curTimeProvinceFeatures = [];
        let curTimeCityFeatures = [];
        let curTimeCountyFeatures = [];

        let curTimeWryFeatures =[];
        let curTimeYcFeatures =[];

        if(cVue.value == '1'){
          //小时的数据格式  由01:00变成01
          curTime =[curDate.substr(11,2)]; 
          let airNum = cVue.allAirHisHourDataList.length;      
          if (airNum > 0) {
            //curTimeAirFeatures = cVue.allAirHisHourDataList.filter(item => { return curTime.includes(item.hour); });
            curTimeCountryFeatures = cVue.allAirHisHourDataList.filter(item => { return curTime.includes(item.hour) && item.stationTypeId ==cVue.$store.state.stationtype.guokong ; });
            curTimeProvinceFeatures = cVue.allAirHisHourDataList.filter(item => { return curTime.includes(item.hour) && item.stationTypeId ==cVue.$store.state.stationtype.shengkong ; });
            curTimeCityFeatures = cVue.allAirHisHourDataList.filter(item => { return curTime.includes(item.hour) && item.stationTypeId ==cVue.$store.state.stationtype.shikong ; });
            curTimeCountyFeatures = cVue.allAirHisHourDataList.filter(item => { return curTime.includes(item.hour) && item.stationTypeId ==cVue.$store.state.stationtype.weixing ; });
          }
          let wryNum =  cVue.allWryHisHourDataList.length; 
          if (wryNum > 0) {
            curTimeWryFeatures = cVue.allWryHisHourDataList.filter(item => { return curTime.includes(item.hour); });
          }
          let ycNum =  cVue.allYcHisHourDataList.length; 
          if (ycNum > 0) {
            curTimeYcFeatures = cVue.allYcHisHourDataList.filter(item => { return curTime.includes(item.hour); });
          }   
        }
        else if(cVue.value == '2'){
          //天的数据格式  由08-27变成27
          curTime =[curDate.substr(8,2)]; 
          let airNum = cVue.allAirHisDayDataList.length;      
          if (airNum > 0) {
            //curTimeAirFeatures = cVue.allAirHisDayDataList.filter(item => { return curTime.includes(item.day); });
            curTimeCountryFeatures = cVue.allAirHisDayDataList.filter(item => { return curTime.includes(item.hour) && item.stationTypeId ==cVue.$store.state.stationtype.guokong ; });
            curTimeProvinceFeatures = cVue.allAirHisDayDataList.filter(item => { return curTime.includes(item.hour) && item.stationTypeId ==cVue.$store.state.stationtype.shengkong ; });
            curTimeCityFeatures = cVue.allAirHisDayDataList.filter(item => { return curTime.includes(item.hour) && item.stationTypeId ==cVue.$store.state.stationtype.shikong ; });
            curTimeCountyFeatures = cVue.allAirHisDayDataList.filter(item => { return curTime.includes(item.hour) && item.stationTypeId ==cVue.$store.state.stationtype.weixing ; });
          }
          let wryNum =  cVue.allWryHisDayDataList.length; 
            if (wryNum > 0) {
              curTimeWryFeatures = cVue.allWryHisDayDataList.filter(item => { return curTime.includes(item.day); });
          }
          let ycNum =  cVue.allYcHisDayDataList.length; 
          if (ycNum > 0) {
            curTimeYcFeatures = cVue.allYcHisDayDataList.filter(item => { return curTime.includes(item.day); });
          }  
        }
        
        let stationtypeobj=this.$store.state.stationtype;
        if(cVue.$store.state.allCheckLayerList.indexOf('country')!=-1){
          createAirGraphics(
            curTimeCountryFeatures,
            cVue.showAirGraphics,
            cVue.$store.state.mapview,
            cVue.$store.state.curRenderType,
            cVue.$store.state.selectFactor,
            cVue.$store.state.stationtype.guokong,
            "countryPointLayer"
          ); 
        }
        if(cVue.$store.state.allCheckLayerList.indexOf('province')!=-1){
          createAirGraphics(
            curTimeProvinceFeatures,
            cVue.showAirGraphics,
            cVue.$store.state.mapview,
            cVue.$store.state.curRenderType,
            cVue.$store.state.selectFactor,
            cVue.$store.state.stationtype.shengkong,
            "provincePointLayer"
          ); 
        }
        if(cVue.$store.state.allCheckLayerList.indexOf('city')!=-1){
          createAirGraphics(
            curTimeCityFeatures,
            cVue.showAirGraphics,
            cVue.$store.state.mapview,
            cVue.$store.state.curRenderType,
            cVue.$store.state.selectFactor,
            cVue.$store.state.stationtype.shikong,
            "cityPointLayer"
          ); 
        }
        if(cVue.$store.state.allCheckLayerList.indexOf('county')!=-1){
          createAirGraphics(
            curTimeCountyFeatures,
            cVue.showAirGraphics,
            cVue.$store.state.mapview,
            cVue.$store.state.curRenderType,
            cVue.$store.state.selectFactor,
            cVue.$store.state.stationtype.weixing,
            "countyPointLayer"
          ); 
        }
        
        if(cVue.$store.state.allCheckLayerList.indexOf('wry')!=-1 && curTimeWryFeatures && curTimeWryFeatures.length>0 ){
          createWryGraphics(
            curTimeWryFeatures,
            cVue.showWryGraphics,
            cVue.$store.state.mapview,
            cVue.$store.state.curRenderType,
            cVue.$store.state.selectFactor,
            stationtypeobj.wanranyuan
          ); 
        }
        if(cVue.$store.state.allCheckLayerList.indexOf('yc')!=-1 && curTimeYcFeatures && curTimeYcFeatures.length>0 && (cVue.$store.state.selectFactor =='pm25' || cVue.$store.state.selectFactor =='pm10') ){
          createWryGraphics(
            curTimeYcFeatures,
            cVue.showYcGraphics,
            cVue.$store.state.mapview,
            cVue.$store.state.curRenderType,
            cVue.$store.state.selectFactor,
            stationtypeobj.yangchen
          ); 
        }
        
        let reg = new RegExp("-",'g');
        let reg2 = new RegExp(" ",'g');
        let curDay = curDate.substr(0,10).replace(reg,"");
        let curHour = curDate.substr(0,13).replace(reg,"").replace(reg2,"");
        if(cVue.$store.state.allCheckLayerList.indexOf('wryt')!=-1 && cVue.value == '1'){
          //污染云图目前到小时
          //获取当前天和小时 2018-08-08 01:00:00
          //得到当前日期的索引
          let curDateIndex = cVue.dataArr.indexOf(curDate);
          cVue.initWrytLayers(curDay,curHour,curDateIndex);
        }
        if(cVue.$store.state.allCheckLayerList.indexOf('ladar')!=-1 && cVue.value == '1'){
          //雷达目前到小时
          //获取当前天和小时 2018-08-08 01:00:00
          let curDateIndex = cVue.dataArr.indexOf(curDate);
          cVue.initLadarLayers(curDay,curHour,curDateIndex);
        }
        if(cVue.$store.state.allCheckLayerList.indexOf('wind')!=-1 && cVue.value == '1'){
          //风场数据目前到小时
          //获取当前天和小时 2018-08-08 01:00:00
          cVue.initWindLayers(curDay,curHour);
          //同时请求下一个时刻的数据
          //得到当前日期的索引
          let curDateIndex = cVue.dataArr.indexOf(curDate);
          if(curDateIndex<cVue.dataArr.length-1){
            let nextHour = cVue.dataArr[curDateIndex+1].replace(reg,"").replace(reg2,"").substr(0,10);
            cVue.requestNextWindData(curDay,nextHour);
          }
          
        }  
      },
      //时间轴
      selectSliderPlayType:function(event,item){
        let cVue = this;
        //需要重新初始化slider
        cVue.calTime();
        let option = cVue.myChart.getOption();
        option.timeline[0].data = cVue.dataArr;   
        cVue.myChart.setOption(option);   
      },
      calTime:function(){
          let cVue = this;
          //按小时播放，是最近历史24小时的数据
          //按天播放，是历史30天的数据
          let nowDate = new Date();    //省控、微站、风场、云图
          //let nowDate = new Date(2019,12,9,16,0,0);      //12月有站点天的测试数据   小时2019-12-08 16  2019-12-09 16  天2019-11-09 2019-12-09
          //nowDate = new Date(2019,12,9,0,0,0);
          //nowDate = new Date(2019,11,30,0,0,0);        //11月有污染源天的测试数据
          //nowDate = new Date(2019,9,30,0,0,0);        //9月有扬尘天的测试数据   
          //nowDate = new Date(2019,12,4,18,0,0);       //12月4日有污染云图小时的数据   
          //nowDate = new Date(2019,11,3,23,0,0);         //12月2日20点，23点有雷达小时数据
          //nowDate = new Date(2019,11,11,23,0,0);         //12月4日，23点有风场小时数据
          cVue.endTime= new Date(nowDate.getFullYear(),nowDate.getMonth(),nowDate.getDate(),nowDate.getHours()-1,0,0);
          cVue.dataArr=[];
          cVue.dayList =[];
          cVue.hourList =[];
          cVue.allWindHisDataList ={};
          if(cVue.value == '1'){
            //获取每个时间的字符
            let timeIntervalHours = 24;
            let tempTime = cVue.endTime;
            for(var i=0;i<timeIntervalHours;i++){
              //时间序列需要正序 tempTime.format('yyyy-MM-dd hh:mm:ss');
              cVue.dataArr[timeIntervalHours-i-1]= formatDate(tempTime,"yyyy-MM-dd hh:mm:ss");  
              tempTime.setHours(tempTime.getHours()-1);	
              if((i+1)%cVue.hourInterval==0)
              {
                cVue.hourList.push(cVue.dataArr[timeIntervalHours-i-1]);
              }
            }
            cVue.startTime = tempTime;
            //在开头插入起始时间
            cVue.hourList.unshift(cVue.dataArr[timeIntervalHours-1]);
            cVue.hourList.reverse();
            //风场的时间
            let reg = new RegExp("-",'g');
            let reg2 = new RegExp(" ",'g');
            for(let j=0;j<cVue.hourList.length;j++){
              let windDateItem = cVue.hourList[j];
              let windDate = windDateItem.replace(reg,"").replace(reg2,"").substr(0,10);
              cVue.allWindHisDataList[windDate] =null;
            }
            if(cVue.allAirHisHourDataList.length==0){
              cVue.getAirHisHourData();
            };
            if(cVue.allWryHisHourDataList.length==0){
              cVue.getWryHisHourData();
            };
            if(cVue.allYcHisHourDataList.length==0){
              cVue.getYcHisHourData();
            };
          }
          else if(cVue.value == '2'){
              cVue.endTime= new Date(nowDate.getFullYear(),nowDate.getMonth(),nowDate.getDate()-1,0,0,0);
              //获取每个时间的字符  tempDay.format('yyyy-MM-dd hh:mm:ss')
              let timeIntervalDays = 30;
              let tempDay = cVue.endTime;
              for(var i=0;i<timeIntervalDays;i++){
                cVue.dataArr[timeIntervalDays-i-1]= formatDate(tempDay,"yyyy-MM-dd hh:mm:ss"); 
                tempDay.setDate(tempDay.getDate()-1);	
                if((i+1)%cVue.dayInterval==0)
                {
                  cVue.dayList.push(cVue.dataArr[timeIntervalDays-i-1]);
                }
              }
              cVue.startTime = tempDay;
              //在开头插入起始时间
              cVue.dayList.unshift(cVue.dataArr[timeIntervalDays-1]);
              cVue.dayList.reverse();

              if(cVue.allAirHisDayDataList.length==0){
                cVue.getAirHisDayData();
              };
              if(cVue.allWryHisDayDataList.length==0){
                cVue.getWryHisDayData();
              };
              if(cVue.allYcHisDayDataList.length==0){
                cVue.getYcHisDayData();
              };
          }
      },
      /***********beg空气站点历史数据***********/
      /**
       * 获取站点历史小时数据
      */
      getAirHisHourData:function(){
        let cVue = this;
        //初始化国控/省控/市控/微型图层  历史24小时的数据    2019-12-08 16  2019-12-09 16 分次 每次取历史4个小时的数据
        let url = dataRequestUrl.options.stationListInfo.history24HoursDataList;
        let reqTimes = cVue.hourList.length;
        for(let i=0;i<reqTimes-1;i++){
          let data = {
              beginTime: cVue.hourList[i],
              endTime:cVue.hourList[i+1]
          };
          AirInfoImpl.getStationListImpl(url, data, cVue.queryAirHourInfoCallback);
        }
      },
      /**
       * 获取站点历史天数据
      */
      getAirHisDayData:function(){
        let cVue = this;
        //初始化国控/省控/市控/微型图层  历史30天的数据   2019-11-09 2019-12-09   分次  每次取历史4天的数据
        let url = dataRequestUrl.options.stationListInfo.history30DaysDataList;
        let reqTimes = cVue.dayList.length;
        for(let i=0;i<reqTimes-1;i++){
          let data = {
              beginDate:  cVue.dayList[i],
              endDate:cVue.dayList[i+1]
          };
          AirInfoImpl.getStationListImpl(url, data, cVue.queryAirDayInfoCallback);
        }
      },
      queryAirHourInfoCallback: function(result) {
        let cVue = this;
        if (result != null&&result.length>0) {
          //绘制返回的查询站点列表
          let resultFeatures = result;
          //cVue.allAirHisHourDataList = resultFeatures;
          for(let i=0;i<resultFeatures.length;i++){
            cVue.allAirHisHourDataList.push(resultFeatures[i]);
          }  
        } else {
          console.log("查询站点失败");
        }
      },
      queryAirDayInfoCallback: function(result) {
        let cVue = this;
        if (result != null&&result.length>0) {
          //绘制返回的查询站点列表
          let resultFeatures = result;
          //cVue.allAirHisDayDataList = resultFeatures;
          for(let i=0;i<resultFeatures.length;i++){
            cVue.allAirHisDayDataList.push(resultFeatures[i]);
          }
        } else {
          console.log("查询站点失败");
        }
      },
      showAirGraphics: function(airPointFeaLayer, geometryExtent) {
        /*
        let cVue = this;
        if (cVue.$store.state.map != null) {
          let layer = cVue.$store.state.map.findLayerById("airPointFeaLayer");
          if ( layer != null) {
            cVue.$store.state.map.remove(layer);
          }
          if(airPointFeaLayer){
            //根据勾选设置站点的可见性
            let stationWhereExp = ""; 
              for(var i=0;i<cVue.$store.state.checkStationLayerList.length;i++){
                if(stationWhereExp.length>0){
                  stationWhereExp += " or ";
                }
                stationWhereExp += "stationTypeId = "+cVue.$store.state.checkStationLayerList[i];
            }
            airPointFeaLayer.definitionExpression = stationWhereExp;
            cVue.$store.state.map.add(airPointFeaLayer);
            if(geometryExtent){
              //cVue.$store.state.mapview.extent = geometryExtent;  
            } 
          }         
        }
        */
        let cVue = this;
        if (cVue.$store.state.map != null) {
          if(airPointFeaLayer){
            let layerId = airPointFeaLayer.id;
            let airLayer = cVue.$store.state.map.findLayerById(layerId);
            if (!airLayer) {
              cVue.$store.state.map.add(airPointFeaLayer);
            }
          }
        }
      },
      /***********end空气站点历史数据***********/

       /***********beg污染源历史数据***********/
      /**
       * 获取站点历史小时数据
      */
      getWryHisHourData:function(){
        let cVue = this;
        //初始化国控/省控/市控/微型图层  历史24小时的数据   
        let url = dataRequestUrl.options.entStationListInfo.history24HoursDataList;
        let data = {
            //areaCode: "130703"
            //stationTypeId:3
        };
        AirInfoImpl.getStationListImpl(url, data, cVue.queryWryHourInfoCallback);
      },
      /**
       * 获取站点历史天数据
      */
      getWryHisDayData:function(){
        let cVue = this;
        //初始化国控/省控/市控/微型图层  历史30天的数据   
        let url = dataRequestUrl.options.entStationListInfo.history30DaysDataList;
        let data = {
            //areaCode: "130703"
            //stationTypeId:3
        };
        AirInfoImpl.getStationListImpl(url, data, cVue.queryWryDayInfoCallback);
      },
      queryWryHourInfoCallback: function(result) {
        let cVue = this;
        if (result != null) {
          //绘制返回的查询站点列表
          let resultFeatures = result;
          cVue.allWryHisHourDataList = resultFeatures;
        } else {
          console.log("查询站点失败");
        }
      },
      queryWryDayInfoCallback: function(result) {
        let cVue = this;
        if (result != null) {
          //绘制返回的查询站点列表
          let resultFeatures = result;
          cVue.allWryHisDayDataList = resultFeatures;
        } else {
          console.log("查询站点失败");
        }
      },
      showWryGraphics: function(wryPointFeaLayer, geometryExtent) {
        let cVue = this;
        if (cVue.$store.state.map != null) {
          let layer = cVue.$store.state.map.findLayerById("wryPointFeaLayer");
          if ( layer != null) {
            cVue.$store.state.map.remove(layer);
          }
          if(wryPointFeaLayer){
            cVue.$store.state.map.add(wryPointFeaLayer);
            if (geometryExtent) {
              //cVue.$store.state.mapview.extent = geometryExtent;
            }
          }           
        }
      },
      /***********end污染源历史数据***********/

      /***********beg污染源历史数据***********/
      /**
       * 获取站点历史小时数据
      */
      getYcHisHourData:function(){
        let cVue = this;
        //初始化国控/省控/市控/微型图层  历史24小时的数据   
        let url = dataRequestUrl.options.dustStationListInfo.history24HoursDataList;
        let data = {
            //areaCode: "130703"
            //stationTypeId:3
        };
        AirInfoImpl.getStationListImpl(url, data, cVue.queryYcHourInfoCallback);
      },
      /**
       * 获取站点历史天数据
      */
      getYcHisDayData:function(){
        let cVue = this;
        //初始化国控/省控/市控/微型图层  历史30天的数据   
        let url = dataRequestUrl.options.dustStationListInfo.history30DaysDataList;
        let data = {
            //areaCode: "130703"
            //stationTypeId:3
        };
        AirInfoImpl.getStationListImpl(url, data, cVue.queryYcDayInfoCallback);
      },
      queryYcHourInfoCallback: function(result) {
        let cVue = this;
        if (result != null) {
          //绘制返回的查询站点列表
          let resultFeatures = result;
          cVue.allYcHisHourDataList = resultFeatures;
        } else {
          console.log("查询站点失败");
        }
      },
      queryYcDayInfoCallback: function(result) {
        let cVue = this;
        if (result != null) {
          //绘制返回的查询站点列表
          let resultFeatures = result;
          cVue.allYcHisDayDataList = resultFeatures;
        } else {
          console.log("查询站点失败");
        }
      },
      showYcGraphics: function(ycPointFeaLayer, geometryExtent) {
        let cVue = this;
        if (cVue.$store.state.map != null) {
          let layer = cVue.$store.state.map.findLayerById("ycPointFeaLayer");
          if ( layer != null) {
            cVue.$store.state.map.remove(layer);
          }
          if(ycPointFeaLayer){
            cVue.$store.state.map.add(ycPointFeaLayer);          
            if(geometryExtent){
              //cVue.$store.state.mapview.extent = geometryExtent;  
            }
          }
        }
      },
      /***********end污染源历史数据***********/

      /**
     * 初始化污染云图数据
     */
      initWrytLayers: function(curDay,curHour,curDateIndex) {
        let cVue = this;  
        let renderField = cVue.$store.state.selectFactor;  
        //历史的地址  20191204/aqi2019120400.png  目前到16点有数据
        //let curDay = "20191204";
        //let curHour = "2019120400";
        let picName = (renderField) + curHour +".png";
        let curPicUrl = dataRequestUrl.options.pollutionhis_cloudImageUrl+ curDay +"/"+ picName;
        let geoExtent=dataRequestUrl.options.pollution_cloudExtentUrl;

        let htmlobj=$.ajax({
          url:curPicUrl,
          async:false,
          success:function(){
            let geoExtent=dataRequestUrl.options.pollution_cloudExtentUrl;
            createWrytLayers(
              curPicUrl,
              cVue.addWrytImg,
              cVue.$store.state.mapview,
              geoExtent,
              "wrytImageLayer"+curDateIndex
            );
          },
          error: function() {
              //alert("请求失败");
          }
        });
        
      },
      addWrytImg: function(wrytImageLayer) {
        let cVue = this;
        if (cVue.$store.state.map != null) {
          let curLayerId = wrytImageLayer.id;
          //得到当前加载图层的时刻
          let curDateIndex = curLayerId.replace("wrytImageLayer","");
          //debugger;
          if(curDateIndex==1){
            let layerIndex = cVue.$store.state.map.layers.findIndex(function(item){
              return item.id === "wrytImageLayer";
            });
            if(layerIndex){
              cVue.$store.state.map.add(wrytImageLayer,layerIndex+1);
            }
            else{
              cVue.$store.state.map.add(wrytImageLayer,1);
            }
          }
          else if(curDateIndex>1){
            let preLayerIndex =  cVue.$store.state.map.layers.findIndex(function(item){
              return (item.id=="wrytImageLayer"+(curDateIndex-1));
            });
            if(preLayerIndex>=0)
            {
              cVue.$store.state.map.add(wrytImageLayer,preLayerIndex+1);
            }
            else{
              cVue.$store.state.map.add(wrytImageLayer,1);
            }
            //清除除当前图层和前一个时刻地图之外的图层
            for(let i=0;i<cVue.$store.state.map.layers.length;i++){
              let layerItem = cVue.$store.state.map.layers.items[i];
              if(layerItem.id.indexOf("wrytImageLayer")!=-1 && layerItem.id!= curLayerId && layerItem.id!= "wrytImageLayer"+(curDateIndex-1)){
                cVue.$store.state.map.remove(layerItem);
              }
            }
          }
          //cVue.$store.state.viewStationaryEvent.remove();
          //地图移动刷新,防止地图初始化时候，图片叠加图层加载刷新不过来
          setTimeout(function() {
            var center = cVue.$store.state.mapview.center.clone();
            center.x -= 1; //底图是经纬度
            cVue.$store.state.mapview.center = center;
            cVue.$store.state.mapview.goTo(cVue.$store.state.mapview.center, {
              speedFactor: 1,
              easing: "linear" //linear, in-cubic, out-cubic, in-out-cubic, in-expo, out-expo, in-out-expo
            });
          }, 500);     
        } 
      },
       /**
     * 初始化雷达图片数据
     */
      initLadarLayers: function(curDay,curHour,curDateIndex) {
        let cVue = this;
        // 实例化一个叠加图片图层类  
        let curDataUrl = dataRequestUrl.options.radarHisImageUrl;
        let radarTypeList = dataRequestUrl.options.radarTypeList;
        if(radarTypeList.length>0){
          //历史的地址  20191202/PMT027/PMT027_2019120220.png  20191202/PMT027/PMT027_2019120220.txt
          let radarType = radarTypeList[0];
          let picName = radarType + "_"+ curHour +".png";
          let txtName = radarType + "_"+ curHour +".txt";
          let curPicUrl = curDataUrl+ curDay +"/"+radarType +"/"+ picName;
          let curTxtUrl = curDataUrl+ curDay +"/"+radarType +"/"+ txtName;
          let picobj=$.ajax({
            url:curPicUrl,
            async:false,
            success:function(){
              let txtobj=$.ajax({url:curTxtUrl,async:false});
              let geoExtent=$.parseJSON( txtobj.responseText);
              createRadarLayers(curPicUrl, cVue.addLadarImg, cVue.$store.state.mapview,geoExtent,"ladarImageLayer"+curDateIndex);
            },
            error: function() {
                //alert("请求失败");
               
            }
          });
        }  
      },
      addLadarImg: function(ladarImageLayer,geometryExtent) {
        let cVue = this;
        if (cVue.$store.state.map != null) {
          let curLayerId = ladarImageLayer.id;
          //得到当前加载图层的时刻
          let curDateIndex = curLayerId.replace("ladarImageLayer","");
          //debugger;
          if(curDateIndex==1){
            let layerIndex = cVue.$store.state.map.layers.findIndex(function(item){
              return item.id === "ladarImageLayer";
            });
            if(layerIndex){
              cVue.$store.state.map.add(ladarImageLayer,layerIndex+1);
            }
            else{
              cVue.$store.state.map.add(ladarImageLayer,1);
            }
          }
          else if(curDateIndex>1){
            let preLayerIndex =  cVue.$store.state.map.layers.findIndex(function(item){
              return (item.id=="ladarImageLayer"+(curDateIndex-1));
            });
            if(preLayerIndex>=0)
            {
              cVue.$store.state.map.add(ladarImageLayer,preLayerIndex+1);
            }
            else{
              cVue.$store.state.map.add(ladarImageLayer,1);
            }
            //清除除当前图层和前一个时刻地图之外的图层
            for(let i=0;i<cVue.$store.state.map.layers.length;i++){
              let layerItem = cVue.$store.state.map.layers.items[i];
              if(layerItem.id.indexOf("ladarImageLayer")!=-1 && layerItem.id!= curLayerId && layerItem.id!= "ladarImageLayer"+(curDateIndex-1)){
                cVue.$store.state.map.remove(layerItem);
              }
            }
          }


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
        }  
      },
      /**
       * 每次播放同时请求下一个时刻的数据
       */
      requestNextWindData:function(curDay,nextHour){
        let cVue = this;
        let jsonName = nextHour +".json";
        //风场的地址  20191204/2019120400.png
        let curJsonUrl = dataRequestUrl.options.windImageUrl+ curDay +"/"+ jsonName;
        if(!cVue.allWindHisDataList[nextHour])
        {
          let htmlobj=$.ajax({
            url:curJsonUrl,
            async:false,
            success:function(response){
              cVue.allWindHisDataList[nextHour] = response;
            },
            error: function() {
                //alert("请求失败");
            }
          });
        }    
      },
       /**
       * 初始化风场数据
       */
      initWindLayers: function(curDay,curHour) {
        let cVue = this;
        let jsonName = curHour +".json";
        //风场的地址  20191204/2019120400.png
        let curJsonUrl = dataRequestUrl.options.windImageUrl+ curDay +"/"+ jsonName;
        if(!cVue.allWindHisDataList[curHour])
        {
          let htmlobj=$.ajax({
            url:curJsonUrl,
            async:false,
            success:function(response){
              cVue.allWindHisDataList[curHour] = response;
              createWindLayer(cVue.$store.state.mapview,response);
            },
            error: function() {
                //alert("请求失败");
                if(cVue.$store.state.windObject){
                  cVue.$store.state.windObject.stop();
                }
            }
          }); 
        }
        else{
          createWindLayer(cVue.$store.state.mapview,cVue.allWindHisDataList[curHour]);
        }       
      }

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