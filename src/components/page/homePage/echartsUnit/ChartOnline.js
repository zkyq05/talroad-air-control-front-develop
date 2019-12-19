const axios = require('axios');
const echarts = require('echarts');
//综合面板——联网率
export default function getChartOnlineData(areaId,self) {

  var params = new URLSearchParams();
  params.append('areaId', areaId);

  axios.post(
    '/api/air-online-monitor/tCodRealtimedata/getStationsStatus',
    params
  ).then(function (res) {
      if (res.code == 0){
          self.onlineNum = res.data.onlineNum;
          self.offlineNum = res.data.offlineNum;

          initChartOnline(self.onlineNum, self.offlineNum);
      }
  }).catch(function (err) {
    console.log(err);
    // self.message = "连接服务器失败！"
  })
}
// 百分比
const initChartOnline = function (onlineNum,offlineNum) {

  // initChartOnlineDiv(){
    // 百分比
    var chart = echarts.init(document.getElementById('echarts-online'),'skinUpp');
    chart.setOption({
      //提示框
      tooltip: {
        show: false,
      },
      // 数据
      series: [{
        type:'pie',
        center: ['50%', '50%'],
        radius: ['55%', '65%'],
        hoverOffset: 0,//划入不放大
        label: {
          show: false,
          position: 'center',//标签的位置。默认outside，可选inside，center
          formatter: '{d}%', //{a}：系列名。{b}：数据名。{c}：数据值。{d}：百分比。
          fontSize: 18,
        },
        avoidLabelOverlap: false,//允许标签重叠
        data:[
          {
            value:onlineNum,
            name:'在线',
            label : {
              show : true,
              fontSize: 28,
              position : 'center',
              color:'#43535D',
            },
            itemStyle : {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#24ACCF' // 0% 处的颜色
                }, {
                  offset: 1, color: '#00E380' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            },
          },
          {
            value:offlineNum,
            name:'离线',
            itemStyle : {
              color: '#F3F3F3',
            },
            emphasis:{
              itemStyle: {
                color: '#F3F3F3',
              }
            }
          },
        ],
      }]
    });
    // chartOnline.setOption(option);
  // }
}

// export {initChartOnline}
