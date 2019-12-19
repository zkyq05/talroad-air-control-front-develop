const echarts = require('echarts');
const axios = require('axios');
export default function waterChartQsjk(self) {
                var pollutantDate =[];
                var params = new URLSearchParams();
                params.append('beginTime',self.daytime[0]);
                params.append('endTime',self.daytime[1]);
                params.append('type',self.type);
                params.append('region',self.region);
                axios.post('/aircontrol/airassess/codReport/getCityHistory',
                    params
                ).then(function (res) {
                        if (res.code == 0){
                            var chartDate = res.data;
                            if (chartDate){
                                initChartQsjk(chartDate,pollutantDate,self);
                            }
                        }
                }).catch(function (err) {
                    console.log(err);
                });
}

 const initChartQsjk = function(chartDate,pollutantDate,self) {
     var pollutantDta=new Array();
     var legendData = ['AQI','SO2','NO2','CO',"PM10","PM2.5","O3"];
     let chartDateElement = chartDate["str"];
     // var legendData = {name:["ss"]};
     for (let i = 0; i < legendData.length; i++) {
         let obj ={};
         // legendData.push(pollutantDta[i].pollutantName);
         if(chartDate[legendData[i]].length>0){
             obj.type='line';
             obj.data=chartDate[legendData[i]];
             obj.name=legendData[i];
             obj.smooth = true;
             obj.symbol = 'circle';
             obj.symbolSize = 8;
             pollutantDta.push(obj);
         }
     }
     var obj = new Object();
     for (let i = 0; i < legendData.length; i++) {
         if( legendData[i]==self.pollutantType){
             obj[self.pollutantType] = true;
         }else {
             let key = legendData[i];
             obj[key] = false;
         }
     }

     var dateArr = [];
     function getDiffDate (start, end) {
         if(start==end){
             const aa = new Date(end);
             const bb = new Date(start);
             aa.setTime(aa.getTime() - 3600 * 1000 * 24 * 1);
             let hours=22;
             let hoursNew=1;
            for(let i=0;i<3;i++){
                let start2 = new Date(new Date(aa.getTime()).setHours(hours)).format("yyyy-MM-dd hh");
                dateArr.push(start2);
                hours++;
            }
             for(let i=0;i<10;i++){
                 let endTime2 = new Date(new Date(bb.getTime()).setHours(hoursNew)).format("yyyy-MM-dd hh");
                 dateArr.push(endTime2);
                 hoursNew++;
             }

             return dateArr;
         }else{
             let days=0;
             let startTime = new Date(start);
             let endTime = new Date(end);
             while ((endTime.getTime() - startTime.getTime()) >= 0) {
                 days++;
                 dateArr.push(startTime.format("yyyy-MM-dd"));
                let sta= addDay(start,days);
                 startTime = new Date(sta);
             }
             return dateArr;
         }
     }
     var obj = new Object();
     for (let i = 0; i < legendData.length; i++) {
         if( legendData[i]==self.pollutantType){
             obj[self.pollutantType] = true;
         }else {
             let key = legendData[i];
             obj[key] = false;
         }
     }
     getDiffDate(self.daytime[0],self.daytime[1]);
     function addDay(datetime, days) {
         let old_time = new Date(datetime.replace(/-/g, "/")); //替换字符，js不认2013-01-31,只认2013/01/31
         let fd = new Date(old_time.valueOf() + days * 24 * 60 * 60 * 1000); //日期加上指定的天数
         let new_time = fd.getFullYear() + "-";
         let month = fd.getMonth() + 1;
         if (month >= 10) {
             new_time += month + "-";
         } else {
             //在小于10的月份上补0
             new_time += "0" + month + "-";
         }
         if (fd.getDate() >= 10) {
             new_time += fd.getDate();
         } else {
             //在小于10的日期上补0
             new_time += "0" + fd.getDate();
         }
         return new_time; //输出格式：2013-01-02
     }
    // 实时监测-趋势监测
    var chartQsjc = echarts.init(document.getElementById('charts-history'),'skinUpp');
    var option = {
        color: ['#73D13D','#FF733F','#EC4863','#69C0FF',
            '#ffb0a4','#c2d0ff'],
        //图例
        legend: {
            data:legendData,
            orient:'vertical',
            //left:'95%',
            //icon:'circle',
            selected: obj,
        },
        //提示框
        tooltip : {
            trigger: 'axis',
        },
        grid:{
            top: 40,
            left: 10,
            bottom: 75,
        },
        title:{
            left:"center",
            text:self.year+chartDateElement,
        },
        // x轴
        xAxis: {
            // name:chartDateElement,
            // nameLocation:'center',
            // nameGap:'-620',
            type: 'category',
            data: dateArr,
            boundaryGap: false,
        },
        // y轴
        yAxis: {
            name:'浓度',
            nameGap:'20',
            type: 'value',
            splitLine:{
                lineStyle:{
                    type:"dashed"
                }
            }
        },

        // 数据
        series : pollutantDta,
    };
    chartQsjc.setOption(option);
}
