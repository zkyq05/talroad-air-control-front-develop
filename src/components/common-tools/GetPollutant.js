const axios = require('axios');

export default function getPollutant(self) {
    axios.get(
        // '/api/water-online-monitor/realTimeView/pollutant',
        '/api/realTimeView/pollutant',
    ).then(function (res) {
        if (res.code == 0) {
            self.pollutant = res.data;
        }
    }).catch(function (err) {
        console.log(err);
        // self.message = "连接服务器失败！"
    })
}
