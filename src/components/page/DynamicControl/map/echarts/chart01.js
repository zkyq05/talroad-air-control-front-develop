const axios = require('axios');
const echarts = require('echarts');
//综合面板——联网率
export default function getChartOnlineData(self) {
    var params = new URLSearchParams();
    params.append('areaCode', self.areaCode);
    axios.get(
        '/aircontrol/airdiagnosis/api/basTarget/targetTask',
        params
    ).then(function (res) {
        var reachList = [];
        var targetList = [];
        var timeDate = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
        //目标
        if(res.target!=null){
            for(var i = 0;i<res.target.length;i++){
                var straqi = [res.target[i].month+'月',res.target[i].value];
                targetList.push(straqi);
            }
        }
        //达到
        if(res.realdata!=null){
            for(var i = 0;i<res.realdata.length;i++){
                var straqi = [res.realdata[i].month+'月',res.realdata[i].value];
                reachList.push(straqi);
            }
        }
        chart001(timeDate,reachList,targetList);
    }).catch(function (err) {
        console.log(err);
    })
}
const chart001 = function (timeDate,reachList,targetList) {
    // 折线图
    var chart01 = echarts.init(document.getElementById('chart01'),'skinUpp');
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
    chart01.setOption(option);
}
