const axios = require('axios');
const echarts = require('echarts');
//综合面板——联网率
export default function getChartOnlineData2(self) {
    var params = new URLSearchParams();
    params.append('areaCode', self.areaCode);
    axios.get(
        '/aircontrol/airdiagnosis/api/areaMonitorData/primaryPollutant',
        params
    ).then(function (res) {
        var reachList = [];
        var targetList = [];
        var timeDate = [];
        console.log(res)
        for(var i = 0;i<res.length;i++){
            var straqi = [res[i].month,res[i].value,res[i].pollutant];
            timeDate.push(res[i].month)
            targetList.push(straqi);
            reachList.push(res[i].pollutant)
        }
        chart001(timeDate,reachList,targetList);
    }).catch(function (err) {
        console.log(err);
    })
}
const chart001 = function (timeDate,reachList,targetList) {
    var chart03 = echarts.init(document.getElementById('chart03'),'skinUpp');
    var option = {
        //提示框
        tooltip : {
            trigger: 'axis',
        },
        xAxis: {
            type: 'category',
            axisLabel: {
                interval:0,
                rotate:40,
                textStyle:{
                    color:'#617D9E',
                }
            },
            splitLine:{
                show:false
            },
            data:  timeDate
        },
        yAxis: {
            type: 'value',
            axisTick: false,
            axisLabel: {
                textStyle:{
                    color:'#617D9E'
                }
            },
        },
        series: [{
            data: targetList,
            type: 'bar',
            barMaxWidth: 15,
            label: {
                normal: {
                    show: true,
                    formatter: "{@[2]}",
                    position: 'top',
                    textStyle: {
                        color: 'white'
                    },
                }
            },
            itemStyle:{
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: '#63B3FD' // 0% 处的颜色
                    },{
                        offset: 1, color: '#4044BF' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                },
            }
        }]
    };
    chart03.setOption(option);
}
