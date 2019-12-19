const echarts = require('echarts');
const axios = require('axios');
export default function alarmData(self) {
    var pollutantDate =[];
    var params = new URLSearchParams();
    if(self.dateTime==null){
        params.append("beginTime","");
        params.append("endTime", "");
    }else{
        params.append("beginTime",self.dateTime[0]);
        params.append("endTime", self.dateTime[1]);
    }
    params.append("region", self.station);
    axios.post('/aircontrol/airassess/codReport/getAlarmDataBar',
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
    let a=new Array();
    let b=new Array();
    var legendData = ['SO2','NO2','CO','O3','PM10','PM25'];
    let chartDateElement = chartDate["str"];
    for (let i = 0; i < legendData.length; i++) {
       //  let obj ={};
       // let  objs =[];
        if(chartDate[legendData[i]].length>0){
            b.push(chartDate[legendData[i]][0][1]);
        }else {
            b.push(legendData[i],0);
        }

        a.push(legendData[i]);
        // legendData.push(pollutantDta[i].pollutantName);
        // obj.type='bar';
        // obj.data=objs;
        // obj.name=legendData[i];
        // obj.stack=legendData[i];
        // // obj.barCategoryGap="-5%";
        // pollutantDta.push(obj);
    }
    // var obj = new Object();
    // for (let i = 0; i < legendData.length; i++) {
    //         var key = legendData[i];
    //         obj[key] = true;
    // }
    var myColor = ['#73D13D','#FF733F','#EC4863','#69C0FF'
        ,'#ffb0a4','#c2d0ff'];
    // 实时监测-趋势监测
    var chartQsjc = echarts.init(document.getElementById('alarm-databar'),'skinUpp');
    var option = {
        color: ['#73D13D','#FF733F','#EC4863','#69C0FF'
            ,'#ffb0a4','#c2d0ff'],
        //图例
        // legend: {
        //     data:legendData,
        //     orient:'vertical',
        //     left:'90%',
        //     icon:'circle',
        //     selected: obj,
        // },
        //提示框
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid:{
            right:"20%"
        },
        // x轴
        xAxis: {
            type: 'category',
            data: a,
            // axisLabel:{
            //     showMaxLabel:true,
            //     interval: 0,
            //     rotate: -20
            // },
            // axisTick: {
            //     alignWithLabel: true
            // }

        },
        // title:{
        //     top:"5%",
        //     left: '8%',
        //     text: "各指标次数统计("+self.year+"全年)",
        //
        // },
        // y轴
        yAxis: {
            type: 'value',
            splitLine:{
                lineStyle:{
                    type:"dashed"
                }
            }
        },

        // 数据
        series :{
            type:'bar',
            data:b,
            barWidth:'20%',
            itemStyle: {
                normal: {
                    color: function(params) {
                        return myColor[params.dataIndex]
                    },
                }
            },
        },
    };
    chartQsjc.setOption(option);
}

