const axios = require('axios');

export default function initElCascader(regionId,self) {
    // var self = this;
    var params = new URLSearchParams();
    params.append('regionId', regionId);

    axios.post(
        '/api/air-online-monitor/regionController/getRegionList',
        params
    ).then(function (res) {
        if (res.code == 0){
            self.cascader_options = res.data;
        }
    }).catch(function (err) {
        console.log(err);
    })
}
