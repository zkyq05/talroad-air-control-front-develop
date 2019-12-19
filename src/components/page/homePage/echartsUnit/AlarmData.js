const echarts = require('echarts');
const axios = require('axios');
export default function alarmData(self) {
    var pollutantDate =[];
    var params = new URLSearchParams();
    if(
        self.dateTime==null){
        params.append("beginTime","");
        params.append("endTime", "");
    }else{
        params.append("beginTime",self.dateTime[0]);
        params.append("endTime", self.dateTime[1]);
    }
    params.append("region", self.station);
    axios.post('/aircontrol/airassess/codReport/getAlarmData',
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
    var legendData = ['离线报警','污染报警','超过目标值','超过国控站','超过全市平均值','突然升高'];
    // let chartDateElement = chartDate["str"];
    // var legendData = {name:["ss"]};
    for (let i = 0; i < legendData.length; i++) {
        let obj ={};
        // legendData.push(pollutantDta[i].pollutantName);
        obj.type='line';
        obj.data=chartDate[legendData[i]];
        obj.name=legendData[i];
        obj.smooth = true;
        obj.symbol = 'circle';
        obj.symbolSize = 8;
        pollutantDta.push(obj);
    }
    var obj = new Object();
    for (let i = 0; i < legendData.length; i++) {
            var key = legendData[i];
            obj[key] = true;
    }

    var dateArr = chartDate["时间"];
    //
    // function getDiffDate () {
    //  let  startTime = new Date().format("yyyy-MM");
    //  let  year = new Date().format("yyyy");
    //  let  month = new Date().getMonth()+2;
    //  let  months = new Date().getMonth()+1;
    //     while (months>0) {
    //         months--;
    //         month--;
    //      let aa=  new Date(year+'-'+month);
    //      let  sata =aa.format("yyyy-MM");
    //         dateArr.splice(0,0,sata);
    //     }
    //     return dateArr;
    // }
    // getDiffDate();

    // 实时监测-趋势监测
    var chartQsjc = echarts.init(document.getElementById('alarm-data'),'skinUpp');
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
        },
        // title:{
        //     top:"5%",
        //     left: '10%',
        //     text: "超标报警趋势("+self.year+"全年)",
        //
        // },
        // grid:{
        //     top: 40,
        //     left: 80,
        //     bottom: 75,
        // },
        // x轴
        xAxis: {
            // type: 'category',
            data: dateArr,

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
        series : pollutantDta,
    };
    chartQsjc.setOption(option);
}

