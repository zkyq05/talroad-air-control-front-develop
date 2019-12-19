var app_config = {
    appInfo:{
        title:"地表水质量在线监测系统",//系统名称
        riverCode: '07CB000000',
        regionCode:"",
        regionId:"1",
        regionName:"北京市",
        pageSizes: [5,10,15,20],
        pageSize: 10,
        checked:'1',
        IMG_URL: 'http://10.0.200.26/',
        airMonitorFront: 'http://218.241.184.18:8411/#/loginByToken?token=',
        // 地图定位点
        mapCenter:[111.84, 37.30],
        /*地图显示位置配置*/
        mapExtent:{xmin: 111.643762,
            ymin: 37.149617,
            xmax: 112.008355,
            ymax: 37.486424,
            spatialReference: {
                wkid: 4326
            }},
        //污染云图位置设置
        pollution_cloudExtentUrl:{xmin: 111.433762, ymin: 37.149617, xmax: 112.008355, ymax: 37.486424,spatialReference:{wkid:4326}},
        //地图比例尺
        mapScale: 11,
        dateTime1:function () {
            var dateTime = new Date().format("yyyy,MM,dd,hh");
            var dates = dateTime.split(",");
            var mon = '';
            if(dates[1]<9){
                mon = 0+''+(parseInt(dates[1])+1);
            }else{
                mon = (parseInt(dates[1])+1);
            }
            return  dates[0]+''+mon+''+dates[2];
        }
    },
    //数据报表
    dataExport:{
        monitorData:{
            labels:"站点名称,监测时间,",
            values:"stationName,monitorTime,",
        },
    },
    authInfo: {
        username: 'talroad',
        password: 'talroad',
    },
    datas:{
        menus:[],
    }
}

module.exports=app_config;
