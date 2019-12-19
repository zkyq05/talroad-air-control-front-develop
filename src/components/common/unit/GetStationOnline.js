const axios = require('axios');

export default function getStationOnline(self) {
    var params = new URLSearchParams();
    params.append('areaId', self.areaId);

    axios.post(
        '/api/air-online-monitor/tCodRealtimedata/getStationsStatus',
        params
    ).then(function (res) {
        if (res.code == 0){
            self.stationsOnlineInfo = res.data;
            // self.onlineNum = res.data.onlineNum;
            // self.offlineNum = res.data.offlineNum;
        }
    }).catch(function (err) {
        console.log(err);
        // self.message = "连接服务器失败！"
    })
}
