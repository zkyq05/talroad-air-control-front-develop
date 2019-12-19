const axios = require('axios')
//综合面板——AQI实时指数
export default function getRealTimeAqi(areaId,self) {
  var params = new URLSearchParams();
  params.append('areaId', areaId);

  axios.post(
    '/api/air-online-monitor/homePageController/getRealTimeAQI',
    params
  ).then(function (res) {
      if (res.code == 0){
          if (res.data){
              self.aqiNum = res.data.aqi;
              self.aqiType = res.data.aqiType;
              self.pollutant = res.data.pollutant;
          } else {
              self.aqiNum = 0;
              self.aqiType = '(无)';
              self.pollutant = '(无)';
          }
      }
  }).catch(function (err) {
    console.log(err);
    // self.message = "连接服务器失败！"
  })
}
