const axios = require('axios');
const echarts = require('echarts');
//综合面板——首要污染物年统计
export default function getChartWrwData(areaId) {

  var params = new URLSearchParams();
  params.append('areaId', areaId);

  axios.post(
    '/api/air-online-monitor/homePageController/getYearlySixFactorDays',
    params
  ).then(function (res) {
      if (res.code == 0){
          // self.onlineNum = res.data.onlineNum;
          // self.offlineNum = res.data.offlineNum;
          var result = res.data;

          // var wrwDays = [];
          // wrwDays.push(result.coDays);
          // wrwDays.push(result.no2Days);
          // wrwDays.push(result.so2Days);
          // wrwDays.push(result.pm10Days);
          // wrwDays.push(result.o3Days);
          // wrwDays.push(result.pm25Days);

          var wrwDays = [result.coDays,result.no2Days,result.so2Days,result.pm10Days,result.o3Days,result.pm25Days];

          initCahrtWrw(wrwDays);
      }
  }).catch(function (err) {
    console.log(err);
    // self.message = "连接服务器失败！"
  })
}

const initCahrtWrw = function (wrwDays) {
  // 首要污染物
  var chartWrw = echarts.init(document.getElementById('echarts-wrw'),'skinUpp');
  chartWrw.setOption({
    //提示框
    tooltip : {
      trigger: 'item',
    },
    //雷达
    radar: {
      //雷达图的指示器，用来指定雷达图中的多个变量（维度）
      indicator: [
        { text: 'CO', max: 365 },
        { text: 'NO2', max: 365 },
        { text: 'SO2', max: 365 },
        { text: 'PM10', max: 365 },
        { text: 'O3', max: 365 },
        { text: 'PM2.5', max: 365 }
      ],
      center: ['50%', '50%'],//中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标
      radius: '70%',//半径
      splitNumber: 1,
      axisLine:{
        lineStyle:{
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#0091DA' // 0% 处的颜色
            }, {
              offset: 1, color: '#fff' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          },
        }
      },
      splitLine:{
        lineStyle:{
          color: '#0091DA'
        }
      }
    },
    // 数据
    series: [{
      name: '首要污染物年统计',
      type: 'radar',
      data : [
        {
          value : wrwDays,
          name : '统计',
          symbolSize: 0,
          lineStyle:{
            color: 'rgba(23,209,247,.5)',
          },
          areaStyle:{
            color: 'rgba(50,227,255,.21)',
            opacity: 1,
          }
        }
      ]
    }]
  })
  // chartWrw.setOption(option);
}

// export {initCahrtWrw}
