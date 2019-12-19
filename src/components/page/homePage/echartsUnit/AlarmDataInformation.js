const echarts = require('echarts');
const axios = require('axios');
export default function alarmDataInformation(self) {
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
    axios.post('/aircontrol/airassess/codReport/getAlarmDataInformation',
        params
    ).then(function (res) {
        if (res.code == 0){
            let chartDate = res.data;
                initChartQsjk(chartDate,pollutantDate,self);
        }
    }).catch(function (err) {
        console.log(err);
    });
}

const initChartQsjk = function(chartDate,pollutantDate,self) {
    var pollutantDta=new Array();
    var legendData=[];
    chartDate.map(function (item) {
        legendData.push(item[0]);
        pollutantDta.push(item[0]);
    });
    var obj = new Object();
    for (let i = 0; i < legendData.length; i++) {
            var key = legendData[i];
            obj[key] = true;
    }




    // 实时监测-趋势监测
    var chartQsjc = echarts.init(document.getElementById('alarm-information'),'skinUpp');
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
        // title:{
        //     top:"5%",
        //     left: '8%',
        //     text: "各源类型报警次数统计("+self.year+"全年)",
        //
        // },
        //提示框
        tooltip : {
            trigger: 'axis',
        },
        // grid:{
        //     top: 40,
        //     left: 80,
        //     bottom: 75,
        // },
        // x轴
        xAxis: {
            type: 'category',
            data:pollutantDta,
                axisLabel:{
                showMaxLabel:true,
                interval: 0,
                // rotate: -20
            },
        },
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
            barWidth: '20%',
            data: chartDate.map(function (item) {
                return item[1];
            }),
        },
    };
    chartQsjc.setOption(option);
}

