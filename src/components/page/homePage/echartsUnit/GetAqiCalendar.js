const axios = require('axios');
//综合面板——AQI月历
export default function getAqiCalendar(areaId,month,self) {
//2019-07
    var params = new URLSearchParams();
    params.append('areaId', areaId);
    params.append('month', month);

    axios.post(
        '/api/air-online-monitor/homePageController/getAqiCalendar',
        params
    ).then(function (res) {
        if (res.code == 0){
            self.aqis = res.data;

            initData(month,self)
        }
    }).catch(function (err) {
        console.log(err);
        // self.message = "连接服务器失败！"
    })
}

const initData = function(cur,self) {
    // var leftcount=0; //存放剩余数量
    var date;

    if (cur) {
        date = new Date(cur);
    } else {
        var now=new Date();
        var d = new Date(formatDate(now.getFullYear() , now.getMonth() , 1));
        d.setDate(35);
        date = new Date(formatDate(d.getFullYear(),d.getMonth() + 1,1));
    }
    self.currentDay = date.getDate();
    self.currentYear = date.getFullYear();
    self.currentMonth = date.getMonth() + 1;

    self.currentWeek = date.getDay(); //获取当月1号是星期几 1...6,0
    // if (currentWeek == 0) {
    //   currentWeek = 7;
    // }
    var str = formatDate(self.currentYear , self.currentMonth, self.currentDay);
    self.days.length = 0;
    // 今天是周日，放在第一行第7个位置，前面6个
    //初始化第一周
    for (var i = self.currentWeek; i >= 0; i--) {
        var d = new Date(str);
        d.setDate(d.getDate() - i);
        var dayobject={}; //用一个对象包装Date对象  以便为以后预定功能添加属性
        dayobject.day=d;

        // if (d.getMonth()+1 == self.currentMonth){
        //     dayobject.itemDayClass='item-day'
        // } else{
        //     dayobject.itemDayClass='item-day is-other-month'
        // }
        self.days.push(dayobject);//将日期放入data 中的days数组 供页面渲染使用
    }

    var endDate = new Date(date.getFullYear(),date.getMonth()+1,0);
    var lastDay = endDate.getDate();

    var judgingDays = lastDay + self.currentWeek;
    var totalDays = 35;

    if (judgingDays > 35){
        self.fiveOrSix = 6;
        self.tableAqi = 'table-aqi table-aqi-rows';
        totalDays = 42;
    }else {
        self.fiveOrSix = 5;
        self.tableAqi = 'table-aqi';
    }

    //其他周
    for (var i = 1; i <= totalDays - self.currentWeek -1; i++) {
        var d = new Date(str);
        d.setDate(d.getDate() + i);
        var dayobject={};
        dayobject.day=d;
        // if (d.getMonth()+1 == self.currentMonth){
        //     dayobject.itemDayClass='item-day'
        // } else{
        //     dayobject.itemDayClass='item-day is-other-month'
        // }
        self.days.push(dayobject);
    }

    let aqiArray = self.aqis;

    for (var i = 0; i < self.days.length; i++) {

        // console.log("days循环"+i);

        var d = self.days[i].day.getDate();

        if (self.days[i].day.getMonth()+1 == self.currentMonth){

            self.days[i].itemDayClass='item-day';

            if (aqiArray && aqiArray.length > 0){
                for (var b = 0;b < aqiArray.length; b++){

                    var item = aqiArray[b];
                    if (item.dayNum == d){
                        // console.log("日期相等"+d);
                        self.days[i].aqi = item.aqi;
                        if (item.aqiLevel == 1){
                            self.days[i].itemDayClass='item-day is-level-1';
                        } else if (item.aqiLevel == 2){
                            self.days[i].itemDayClass='item-day is-level-2';
                        } else if (item.aqiLevel == 3){
                            self.days[i].itemDayClass='item-day is-level-3';
                        } else if (item.aqiLevel == 4){
                            self.days[i].itemDayClass='item-day is-level-4';
                        } else if (item.aqiLevel == 5){
                            self.days[i].itemDayClass='item-day is-level-5';
                        } else if (item.aqiLevel == 6){
                            self.days[i].itemDayClass='item-day is-level-6';
                        }

                        break;
                    }
                }
            }
        } else{
            self.days[i].itemDayClass='item-day is-other-month'
        }

    }
}

// 返回 类似 2016-01-02 格式的字符串
const formatDate = function(year,month,day){
    var y = year;
    var m = month;
    if(m<10) m = "0" + m;
    var d = day;
    if(d<10) d = "0" + d;
    return y+"-"+m+"-"+d
}


