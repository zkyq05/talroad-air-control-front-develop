const axios = require('axios');
//综合面板——空气质量年统计
export default function getYearlyAqi(areaId,self) {

    var date = new Date();

  var params = new URLSearchParams();
  params.append('areaId', areaId);
  params.append('year', date.getFullYear());

  axios.post(
    '/api/air-online-monitor/homePageController/getYearlyAqi',
    params
  ).then(function (res) {
      if (res.code == 0){
          if (res.data){
              self.aDays = res.data.aDays;
              self.bDays = res.data.bDays;
              self.cDays = res.data.cDays;
              self.dDays = res.data.dDays;
              self.eDays = res.data.eDays;
              self.fDays = res.data.fDays;

              self.aRate = "width: "+res.data.aRate;
              self.bRate = "width: "+res.data.bRate;
              self.cRate = "width: "+res.data.cRate;
              self.dRate = "width: "+res.data.dRate;
              self.eRate = "width: "+res.data.eRate;
              self.fRate = "width: "+res.data.fRate;
          } else {
              self.aDays = 0;
              self.bDays = 0;
              self.cDays = 0;
              self.dDays = 0;
              self.eDays = 0;
              self.fDays = 0;

              self.aRate = "width: 0%";
              self.bRate = "width: 0%";
              self.cRate = "width: 0%";
              self.dRate = "width: 0%";
              self.eRate = "width: 0%";
              self.fRate = "width: 0%";
          }

      }
  }).catch(function (err) {
    console.log(err);
    // self.message = "连接服务器失败！"
  })
}
