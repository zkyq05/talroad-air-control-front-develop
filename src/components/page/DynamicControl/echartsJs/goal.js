const axios = require('axios');
const echarts = require('echarts');
export default function goal(self) {
    var xData = [];
    var mbData = [];
    axios.get('/aircontrol/airdiagnosis/api/basTarget/targetDecompose').then(
        function (res) {
            var sjYData = [];
            var dayDataAreas=res.dayDataAreas;//实际
            var targetDays=res.targetDays;//目标
            for (let i = 0; i <dayDataAreas.length; i++) {
                var pm25 = dayDataAreas[i].pm25;
                sjYData.push(pm25);
                var monitortime = dayDataAreas[i].monitortime;
                var convertToDate1 = self.convertToDate(monitortime);
                xData.push(convertToDate1);
            }
            for (let i = 0; i < targetDays.length; i++) {
                var item = [targetDays[i].date,targetDays[i].pm25];
                mbData.push(item)
            }
            /*var item = ["2019-10-18",15];
            mbData.push(item);
            var item = ["2019-10-19",20];
            mbData.push(item);*/
            if(xData){
                /*console.log(mbData[0]+"<<<<mbData");
                console.log(xData+"<<<<xData");*/
                initChartQsjk(xData,sjYData,mbData)
            }
        }
    ).catch(function (error) {
        console.log(error)
    })
}

const initChartQsjk = function(xData,sjYData,mbData) {
    var autoInterval = 8;
    if(xData.length>autoInterval){
        autoInterval = Math.ceil(xData.length/autoInterval);
    }
    if(xData.length<=autoInterval){
        autoInterval = 0;
    }
// 折线图
    var chart01 = echarts.init(document.getElementById('chart01'), 'skinUpp');
    var option = {
        title: {
            text: 'PM2.5浓度'
        },
        //图例
        legend: {
            data: ['实际', '目标'],
            textStyle: {
                fontSize: 16,
            },
        },
        grid: {
            top: 40,
            left: 20,
            right: 40
        },
        //提示框
        tooltip: {
            trigger: 'axis',
        },
        // x轴
        xAxis: {
            type: 'category',
            data: xData,
            axisLabel: {
                interval: autoInterval,
                textStyle:{
                    fontSize:14
                }
            },
            splitLine: {
                show: false
            },
            boundaryGap: false,

        },
        // y轴
        yAxis: {
            type: 'value',
            axisLabel: {
                interval: 0
            }
        },
        // 数据
        series: [
            {
                name: '实际',
                type: 'line',
                data: sjYData,
                smooth: false,
                symbolSize: 0,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(58,187,252,.5)'
                        }, {
                            offset: 0.6,
                            color: 'rgba(255,255,255,0.00)'
                        }, {
                            offset: 1,
                            color: 'rgba(255,255,255,0.00)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
            },
              {
                  name: '目标',
                  type: 'line',
                  data: mbData,
                  smooth: false,
                  symbolSize: 0,
                  areaStyle: {
                      normal: {
                          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                              offset: 0,
                              color: 'rgba(25,255,199,.5)'
                          }, {
                              offset: 0.6,
                              color: 'rgba(255,255,255,0.00)'
                          }, {
                              offset: 1,
                              color: 'rgba(255,255,255,0.00)'
                          }], false),
                          shadowColor: 'rgba(0, 0, 0, 0.1)',
                          shadowBlur: 10
                      }
                  },
              }
        ],
    };
    chart01.setOption(option);

    $(window).on('resize', function () {
        chart01.resize();
    })
}
