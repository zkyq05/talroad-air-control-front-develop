const echarts = require('echarts');
const axios = require('axios');
export default function waterChartQsjk(self) {
                var params = new URLSearchParams();
                params.append('beginTime',self.dateTime-1);
                params.append('endTime',self.dateTime);
                params.append('region',self.fkRegioncode);
                    axios.post('/aircontrol/airmeasures/codReport/getPmiData',
                    params
                ).then(function (res) {
                        if (res.code == 0){
                            //debugger
                            let chartDate = res.data['upYear'];
                            if (chartDate){
                                initChartQsjk(chartDate,self);
                            }
                        }
                }).catch(function (err) {
                    console.log(err);
                });
}

 const initChartQsjk = function(chartDate,self) {
     let strName =self.dateTime+"年综合指数";
     var pollutantDta=new Array();
     var legendData = ['SO2','NO2','CO','O3','PM10','PM2.5'];
     let sh=1;
     for (let i = 0; i < legendData.length; i++) {
         let obj ={};
         obj.type='bar';
         obj.data=chartDate[legendData[i]];
         obj.name=legendData[i];
         obj.smooth = true;
         obj.symbol = 'circle';
         obj.symbolSize = 8;
         obj.stack='year';
         // for(let j=0;j<chartDate[legendData[i]].length;j++){
         //     var arr = new Array();
         //     arr = chartDate[legendData[i]][j][0].split(" ");
         //     if (arr.length>1){
         //         obj.stack='2018';
         //         break;
         //     }else{
         //
         //     }
         // }
         obj.barWidth=20;
         pollutantDta.push(obj);
     }
     var obj = new Object();
     for (let i = 0; i < legendData.length; i++) {
             var key = legendData[i];
             obj[key] = true;
     }
     var dateArr = [];
     // let coElement = chartDate.CO;
     // let coElementS = pollutantDate.CO;
     // for(let i=0;i<coElement.length;i++){
     //     let dat=new Array();
     //     let str =coElement[i][0];
     //     let split = str.split('-');
     //     let aa =0;
     //     for(let j=0;j<coElementS.length;j++){
     //         if(split[1]==coElementS[j][0].split('-')[1]){
     //             let dats=new Array();
     //             dats.push(coElement[i][0]+'  '+coElementS[j][0]);
     //             dateArr.push(dats);
     //             aa++;
     //             break;
     //         }
     //     }
     //     if(aa==0){
     //         dat.push(coElement[i][0]);
     //         dateArr.push(dat);
     //     }else{
     //         aa=0;
     //     }
     //
     // }

    // 实时监测-趋势监测
    var chartQsjc = echarts.init(document.getElementById('city-pmi'),'skinUpp');
    var option = {
        color: ['#73D13D','#FF733F','#EC4863','#69C0FF',
            '#ffb0a4','#c2d0ff'],
        //图例
        legend: {
            data:legendData,
            orient:'vertical',
            left:'95%',
            icon:'circle',
            selected: obj,
        },
        title: {
            left: 'center',
            text: strName,
        },
        //提示框
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid:{
            top: 40,
            left: 80,
            bottom: 75,
            containLabel: true
        },
        // x轴
        xAxis:
            {
            type: 'category',
            // data: dateArr,
            axisLabel: {
                interval: 0,
                show: true,
                splitNumber: 60,
                // textStyle: {
                //     fontSize: 10,
                //     color: '#000'
                // },

            },
        },
        // y轴
        yAxis: {
            type: 'value'
        },

        // 数据
        series : pollutantDta,
    };
    chartQsjc.setOption(option);
}
