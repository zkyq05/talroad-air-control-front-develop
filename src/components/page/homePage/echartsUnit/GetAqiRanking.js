const axios = require('axios');
//综合面板——空气质量排名(前15名)
export default function getAqiRanking(areaId,dateTime,self) {
//2019-07-17
  var params = new URLSearchParams();
  params.append('pageNum', 1);
  params.append('pageSize', 15);
  params.append('dataType', 1);
  params.append('dateTime', dateTime);
  params.append('areaId', areaId);

  axios.post(
    '/api/air-online-monitor/rankingController/getAqiRanking',
    params
  ).then(function (res) {
      if (res.code == 0){
          self.aqiRankingList = res.data.list;
      }
  }).catch(function (err) {
    console.log(err);
    // self.message = "连接服务器失败！"
  })
}
