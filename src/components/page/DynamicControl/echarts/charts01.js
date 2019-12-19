const axios = require('axios');
const echarts = require('echarts');
//综合面板——联网率
export default function getChartOnlineData(type,self) {
    var params = new URLSearchParams();
    params.append('areaCode', self.areaCode);
    axios.get(
        '/aircontrol/airdiagnosis/api/areaMonitorData/todayTrend',
        params
    ).then(function (res) {
        var reachList = [];
        var targetList = [];
        var timeDate = [];
        //目标
        if(res.target!=null){
          for(var i = 0;i<res.target.length;i++){
              timeDate.push(res.target[i].hours);
              if(type=='aqi'){
                  targetList.push(res.target[i].aqi);
              }else if(type=='no2'){
                  targetList.push(res.target[i].no2);
              }else if(type=='pm25'){
                  targetList.push(res.target[i].pm25);
              }else if(type=='o3'){
                  targetList.push(res.target[i].o3);
              }else if(type=='so2'){
                  targetList.push(res.target[i].so2);
              }else if(type=='pm10'){
                  targetList.push(res.target[i].pm10);
              }else if(type=='co'){
                  targetList.push(res.target[i].co);
              }

          }
        }
        //达到
        if(res.reach!=null){
            for(var i = 0;i<res.reach.length;i++){
                if(type=='aqi'){
                    reachList.push(res.reach[i].aqi);
                }else if(type=='no2'){
                    reachList.push(res.reach[i].no2);
                }else if(type=='pm25'){
                    reachList.push(res.reach[i].pm25);
                }else if(type=='o3'){
                    reachList.push(res.reach[i].o3);
                }else if(type=='so2'){
                    reachList.push(res.reach[i].so2);
                }else if(type=='pm10'){
                    reachList.push(res.reach[i].pm10);
                }else if(type=='co'){
                    reachList.push(res.reach[i].co);
                }

            }
        }
        chart001(timeDate,reachList,targetList);
    }).catch(function (err) {
        console.log(err);
    })
}


const chart001 = function (timeDate,reachList,targetList) {
    console.log(echarts)
    // 折线图
    var chart01 = echarts.init(document.getElementById('chart01'),'skinUpp');
    console.log(chart01)
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
            data:timeDate,
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
    chart01.setOption(option);
}
