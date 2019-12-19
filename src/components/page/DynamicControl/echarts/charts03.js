const axios = require('axios');
const echarts = require('echarts');
//综合面板——联网率
export default function getChartOnlineData03(type,self) {
    var params = new URLSearchParams();
    params.append('areaCode', self.areaCode);
    axios.get(
        '/aircontrol/airdiagnosis/api/areaMonitorData/controlTrend?areaCode='+'141182',
        params
    ).then(function (res) {
        var reachList = [];
        var targetList = [];
        var timeDate = res.hours;
        //目标
        if(res.hourdata!=null){
          for(var i = 0;i<res.hourdata.length;i++){
              if(type=='aqi'){
                  var str = [res.hourdata[i].hour,res.hourdata[i].aqi];
                  targetList.push(str);
              }else if(type=='no2'){
                  var strno2 = [res.hourdata[i].hour,res.hourdata[i].no2];
                  targetList.push(strno2);
              }else if(type=='pm25'){
                  var strpm25 = [res.hourdata[i].hour,res.hourdata[i].pm25];
                  targetList.push(strpm25);
              }else if(type=='o3'){
                  var stro3 = [res.hourdata[i].hour,res.hourdata[i].o3];
                  targetList.push(stro3);
              }else if(type=='so2'){
                  var strso2 = [res.hourdata[i].hour,res.hourdata[i].so2];
                  targetList.push(strso2);
              }else if(type=='pm10'){
                  var strpm10 = [res.hourdata[i].hour,res.hourdata[i].pm10];
                  targetList.push(strpm10);
              }else if(type=='co'){
                  var strco = [res.hourdata[i].hour,res.hourdata[i].co];
                  targetList.push(strco);
              }

          }
        }
        //达到
        if(res.forecast!=null){
            for(var i = 0;i<res.forecast.length;i++){
                if(type=='aqi'){
                    var straqi = [res.forecast[i].hour,res.forecast[i].aqi];
                    reachList.push(straqi);
                }else if(type=='no2'){
                    var strno2 = [res.forecast[i].hour,res.forecast[i].no2];
                    reachList.push(strno2);
                }else if(type=='pm25'){
                    var strpm25 = [res.forecast[i].hour,res.forecast[i].pm25];
                    reachList.push(strpm25);
                }else if(type=='o3'){
                    var stro3 = [res.forecast[i].hour,res.forecast[i].o3];
                    reachList.push(stro3);
                }else if(type=='so2'){
                    var strso2 = [res.forecast[i].hour,res.forecast[i].so2];
                    reachList.push(strso2);
                }else if(type=='pm10'){
                    var strpm10 = [res.forecast[i].hour,res.forecast[i].pm10];
                    reachList.push(strpm10);
                }else if(type=='co'){
                    var strco = [res.forecast[i].hour,res.forecast[i].co];
                    reachList.push(strco);
                }

            }
        }
        chart003(timeDate,reachList,targetList);
    }).catch(function (err) {
        console.log(err);
    })
}


const chart003 = function (timeDate,reachList,targetList) {
    var chart03 = echarts.init(document.getElementById('chart03'),'skinUpp');
    var option = {
        // 标题
        title: {
            text: '今日趋势',
            show:false
        },
        //图例
        legend: {
            data: ['目标', '实际达成'],
        },
        //提示框
        tooltip : {
            trigger: 'axis',
        },
        // x轴
        xAxis: {
            type: 'category',
            data: timeDate,
            boundaryGap:false,
        },
        // y轴
        yAxis: {
            type: 'value'
        },
        // 数据
        series : [
            {
                name: '目标',
                type: 'line',
                data: targetList,
                smooth: false,
                symbolSize:0,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(64,65,233,1)'
                        }, {
                            offset: 1,
                            color: 'rgba(94,188,214,0.1)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
            },
            {
                name: '实际达成',
                type: 'line',
                data: reachList,
                smooth: false,
                symbolSize:0,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(46,249,255,1)'
                        }, {
                            offset: 1,
                            color: 'rgba(94,188,214,0.1)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
            }
        ],
    };
    chart03.setOption(option);
}
