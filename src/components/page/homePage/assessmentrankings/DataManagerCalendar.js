const axios = require('axios');
//综合面板——AQI月历
export default function dataManagerCalendar(self) {
//2019-07
    var params = new URLSearchParams();
    params.append('month', self.nowTimeYear);
    params.append('pollutant', self.pollutant);
    //'/aircontrol/airassess/water-online-monitor/manualAudit/getAuditStateByStationIDAndMonth',
    axios.post(
        '/aircontrol/airassess/tCodHourdata/getHourdataByDay',
        params
    ).then(function (res) {
        self.monthlyDataStatus = res.data[0][1];
        self.monthlyDataStatus2 = res.data[0][2];
        self.monthlyDataStatus3 = res.data[0][3];
        self.monthlyDataStatus4= res.data[0][4];
        self.monthlyDataStatus5 = res.data[0][5];
        self.monthlyDataStatus6 = res.data[0][6];
        self.monthlyDataStatus7 = res.data[0][7];
        self.monthlyDataStatus8 = res.data[0][8];
        self.monthlyDataStatus9 = res.data[0][9];
        self.monthlyDataStatus10 = res.data[0][10];
        self.monthlyDataStatus11 = res.data[0][11];
        self.monthlyDataStatus12 = res.data[0][12];
        initData(self.nowTimeYear+'-01',self);
        initDataEr(self.nowTimeYear+'-02',self);
        initDataSan(self.nowTimeYear+'-03',self);
        initDataSi(self.nowTimeYear+'-04',self);
        initDataWu(self.nowTimeYear+'-05',self);
        initDataliu(self.nowTimeYear+'-06',self);
        initDataQi(self.nowTimeYear+'-07',self);
        initDataBa(self.nowTimeYear+'-08',self);
        initDataJiu(self.nowTimeYear+'-09',self);
        initDataShi(self.nowTimeYear+'-10',self);
        initDataShiYi(self.nowTimeYear+'-11',self);
        initDataShiEr(self.nowTimeYear+'-12',self);
    }).catch(function (err) {
        console.log(err);
        // self.message = "连接服务器失败！"
    })
}
//一月
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

    var str = formatDate(self.currentYear , self.currentMonth, self.currentDay);
    self.days.length = 0;
    //初始化第一周
    for (var i = self.currentWeek; i >= 0; i--) {
        var d = new Date(str);
        d.setDate(d.getDate() - i);
        var dayobject={}; //用一个对象包装Date对象  以便为以后预定功能添加属性
        dayobject.day=d;
        self.days.push(dayobject);//将日期放入data 中的days数组 供页面渲染使用
    }

    var endDate = new Date(date.getFullYear(),date.getMonth()+1,0);
    var lastDay = endDate.getDate();

    var judgingDays = lastDay + self.currentWeek;
    var totalDays = 35;
    if (judgingDays > 35){
        self.fiveOrSix = 6;
        // self.tableAqi = 'table-aqi table-aqi-rows';
        totalDays = 42;
    }else {
        self.fiveOrSix = 5;
        // self.tableAqi = 'table-aqi';
    }

    //其他周
    for (var i = 1; i <= totalDays - self.currentWeek -1; i++) {
        var d = new Date(str);
        d.setDate(d.getDate() + i);
        var dayobject={};
        dayobject.day=d;
        self.days.push(dayobject);
    }

    for (var i = 0; i < self.days.length; i++) {

        var d = self.days[i].day.getDate();

        if (self.days[i].day.getMonth()+1 == self.currentMonth){

            // if (d == self.nowTimeDay && self.currentMonth == self.nowTimeMonth && self.currentYear == self.nowTimeYear){//当天
            //     self.days[i].itemDayClass='calendar-day is-today';
            // } else {
            //     self.days[i].itemDayClass='calendar-day';
            // }

            for (var b = 0;b < self.monthlyDataStatus.length-1; b++){

                var item = self.monthlyDataStatus[b];
                if (item.dayTime === d){
                    var auditName = item.auditName;
                    var auditLevel = item.auditLevel;
                    // self.days[i].auditName = auditName;
                    // self.days[i].auditState = item.auditState;
                    self.days[i].nums=item.num;
                    self.days[i].itemClassShow=true;
                    if (auditLevel === '无数据'){
                        self.days[i].itemDayClass='item-day is-level-7';
                    } else if (auditLevel === '一级'){
                        self.days[i].itemDayClass='item-day is-level-1';
                    } else if (auditLevel === '二级'){
                        self.days[i].itemDayClass='item-day is-level-2';
                    } else if (auditLevel === '三级'){
                        self.days[i].itemDayClass='item-day is-level-3';
                    } else if (auditLevel === '四级'){
                        self.days[i].itemDayClass='item-day is-level-4';
                    } else if (auditLevel === '五级') {
                        self.days[i].itemDayClass='item-day is-level-5';
                    } else if (auditLevel === '六级'){
                        self.days[i].itemDayClass='item-day is-level-6';
                    }
                    break;
                }
            }

        } else{
            self.days[i].itemDayClass='item-day is-other-month';
            self.days[i].itemClassShow=false;
            self.days[i].nums='';
        }

    }

};
//二月
const initDataEr = function(cur,self) {
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

    var str = formatDate(self.currentYear , self.currentMonth, self.currentDay);
    self.days2.length = 0;
    //初始化第一周
    for (var i = self.currentWeek; i >= 0; i--) {
        var d = new Date(str);
        d.setDate(d.getDate() - i);
        var dayobject={}; //用一个对象包装Date对象  以便为以后预定功能添加属性
        dayobject.day=d;
        self.days2.push(dayobject);//将日期放入data 中的days数组 供页面渲染使用
    }

    var endDate = new Date(date.getFullYear(),date.getMonth()+1,0);
    var lastDay = endDate.getDate();

    var judgingDays = lastDay + self.currentWeek;
    var totalDays = 35;
    if (judgingDays > 35){
        self.fiveOrSix2 = 6;
        // self.tableAqi = 'table-aqi table-aqi-rows';
        totalDays = 42;
    }else {
        self.fiveOrSix2 = 5;
        // self.tableAqi = 'table-aqi';
    }

    //其他周
    for (var i = 1; i <= totalDays - self.currentWeek -1; i++) {
        var d = new Date(str);
        d.setDate(d.getDate() + i);
        var dayobject={};
        dayobject.day=d;
        self.days2.push(dayobject);
    }

    for (var i = 0; i < self.days2.length; i++) {

        var d = self.days2[i].day.getDate();

        if (self.days2[i].day.getMonth()+1 == self.currentMonth){

            // if (d == self.nowTimeDay && self.currentMonth == self.nowTimeMonth && self.currentYear == self.nowTimeYear){//当天
            //     self.days2[i].itemDayClass='calendar-day is-today';
            // } else {
            //     self.days2[i].itemDayClass='calendar-day';
            // }

            for (var b = 0;b < self.monthlyDataStatus2.length-1; b++){

                var item = self.monthlyDataStatus2[b];
                if (item.dayTime === d){
                    var auditName = item.auditName;
                    var auditLevel = item.auditLevel;
                    // self.days2[i].auditName = auditName;
                    // self.days2[i].auditState = item.auditState;
                    self.days2[i].nums=item.num;
                    self.days2[i].itemClassShow=true;
                    if (auditLevel === '无数据'){
                        self.days2[i].itemDayClass='item-day is-level-7';
                    } else if (auditLevel === '一级'){
                        self.days2[i].itemDayClass='item-day is-level-1';
                    } else if (auditLevel === '二级'){
                        self.days2[i].itemDayClass='item-day is-level-2';
                    } else if (auditLevel === '三级'){
                        self.days2[i].itemDayClass='item-day is-level-3';
                    } else if (auditLevel === '四级'){
                        self.days2[i].itemDayClass='item-day is-level-4';
                    } else if (auditLevel === '五级') {
                        self.days2[i].itemDayClass='item-day is-level-5';
                    } else if (auditLevel === '六级'){
                        self.days2[i].itemDayClass='item-day is-level-6';
                    }
                    break;
                }
            }

        } else{
            self.days2[i].itemDayClass='item-day is-other-month';
            self.days2[i].itemClassShow=false
        }

    }

};
//三月
const initDataSan = function(cur,self) {
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

    var str = formatDate(self.currentYear , self.currentMonth, self.currentDay);
    self.days3.length = 0;
    //初始化第一周
    for (var i = self.currentWeek; i >= 0; i--) {
        var d = new Date(str);
        d.setDate(d.getDate() - i);
        var dayobject={}; //用一个对象包装Date对象  以便为以后预定功能添加属性
        dayobject.day=d;
        self.days3.push(dayobject);//将日期放入data 中的days数组 供页面渲染使用
    }

    var endDate = new Date(date.getFullYear(),date.getMonth()+1,0);
    var lastDay = endDate.getDate();

    var judgingDays = lastDay + self.currentWeek;
    var totalDays = 35;
    if (judgingDays > 35){
        self.fiveOrSix3 = 6;
        // self.tableAqi = 'table-aqi table-aqi-rows';
        totalDays = 42;
    }else {
        self.fiveOrSix3 = 5;
        // self.tableAqi = 'table-aqi';
    }

    //其他周
    for (var i = 1; i <= totalDays - self.currentWeek -1; i++) {
        var d = new Date(str);
        d.setDate(d.getDate() + i);
        var dayobject={};
        dayobject.day=d;
        self.days3.push(dayobject);
    }

    for (var i = 0; i < self.days3.length; i++) {

        var d = self.days3[i].day.getDate();

        if (self.days3[i].day.getMonth()+1 == self.currentMonth){

            // if (d == self.nowTimeDay && self.currentMonth == self.nowTimeMonth && self.currentYear == self.nowTimeYear){//当天
            //     self.days3[i].itemDayClass='calendar-day is-today';
            // } else {
            //     self.days3[i].itemDayClass='calendar-day';
            // }

            for (var b = 0;b < self.monthlyDataStatus3.length-1; b++){

                var item = self.monthlyDataStatus3[b];
                if (item.dayTime === d){
                    var auditName = item.auditName;
                    var auditLevel = item.auditLevel;
                    // self.days3[i].auditName = auditName;
                    // self.days3[i].auditState = item.auditState;
                    self.days3[i].nums=item.num;
                    self.days3[i].itemClassShow=true;
                    if (auditLevel === '无数据'){
                        self.days3[i].itemDayClass='item-day is-level-7';
                    } else if (auditLevel === '一级'){
                        self.days3[i].itemDayClass='item-day is-level-1';
                    } else if (auditLevel === '二级'){
                        self.days3[i].itemDayClass='item-day is-level-2';
                    } else if (auditLevel === '三级'){
                        self.days3[i].itemDayClass='item-day is-level-3';
                    } else if (auditLevel === '四级'){
                        self.days3[i].itemDayClass='item-day is-level-4';
                    } else if (auditLevel === '五级') {
                        self.days3[i].itemDayClass='item-day is-level-5';
                    } else if (auditLevel === '六级'){
                        self.days3[i].itemDayClass='item-day is-level-6';
                    }
                    break;
                }
            }

        } else{
            self.days3[i].itemDayClass='item-day is-other-month';
            self.days3[i].itemClassShow=false
        }

    }

};
//四月
const initDataSi = function(cur,self) {
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

    var str = formatDate(self.currentYear , self.currentMonth, self.currentDay);
    self.days4.length = 0;
    //初始化第一周
    for (var i = self.currentWeek; i >= 0; i--) {
        var d = new Date(str);
        d.setDate(d.getDate() - i);
        var dayobject={}; //用一个对象包装Date对象  以便为以后预定功能添加属性
        dayobject.day=d;
        self.days4.push(dayobject);//将日期放入data 中的days数组 供页面渲染使用
    }

    var endDate = new Date(date.getFullYear(),date.getMonth()+1,0);
    var lastDay = endDate.getDate();

    var judgingDays = lastDay + self.currentWeek;
    var totalDays = 35;
    if (judgingDays > 35){
        self.fiveOrSix4 = 6;
        // self.tableAqi = 'table-aqi table-aqi-rows';
        totalDays = 42;
    }else {
        self.fiveOrSix4 = 5;
        // self.tableAqi = 'table-aqi';
    }

    //其他周
    for (var i = 1; i <= totalDays - self.currentWeek -1; i++) {
        var d = new Date(str);
        d.setDate(d.getDate() + i);
        var dayobject={};
        dayobject.day=d;
        self.days4.push(dayobject);
    }

    for (var i = 0; i < self.days4.length; i++) {

        var d = self.days4[i].day.getDate();

        if (self.days4[i].day.getMonth()+1 == self.currentMonth){

            // if (d == self.nowTimeDay && self.currentMonth == self.nowTimeMonth && self.currentYear == self.nowTimeYear){//当天
            //     self.days4[i].itemDayClass='calendar-day is-today';
            // } else {
            //     self.days4[i].itemDayClass='calendar-day';
            // }

            for (var b = 0;b < self.monthlyDataStatus4.length-1; b++){

                var item = self.monthlyDataStatus4[b];
                if (item.dayTime === d){
                    var auditName = item.auditName;
                    var auditLevel = item.auditLevel;
                    // self.days4[i].auditName = auditName;
                    // self.days4[i].auditState = item.auditState;
                    self.days4[i].nums=item.num;
                    self.days4[i].itemClassShow=true;
                    if (auditLevel === '无数据'){
                        self.days4[i].itemDayClass='item-day is-level-7';
                    } else if (auditLevel === '一级'){
                        self.days4[i].itemDayClass='item-day is-level-1';
                    } else if (auditLevel === '二级'){
                        self.days4[i].itemDayClass='item-day is-level-2';
                    } else if (auditLevel === '三级'){
                        self.days4[i].itemDayClass='item-day is-level-3';
                    } else if (auditLevel === '四级'){
                        self.days4[i].itemDayClass='item-day is-level-4';
                    } else if (auditLevel === '五级') {
                        self.days4[i].itemDayClass='item-day is-level-5';
                    } else if (auditLevel === '六级'){
                        self.days4[i].itemDayClass='item-day is-level-6';
                    }
                    break;
                }
            }

        } else{
            self.days4[i].itemDayClass='item-day is-other-month';
            self.days4[i].itemClassShow=false
        }

    }

};
//五月
const initDataWu = function(cur,self) {
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

    var str = formatDate(self.currentYear , self.currentMonth, self.currentDay);
    self.days5.length = 0;
    //初始化第一周
    for (var i = self.currentWeek; i >= 0; i--) {
        var d = new Date(str);
        d.setDate(d.getDate() - i);
        var dayobject={}; //用一个对象包装Date对象  以便为以后预定功能添加属性
        dayobject.day=d;
        self.days5.push(dayobject);//将日期放入data 中的days数组 供页面渲染使用
    }

    var endDate = new Date(date.getFullYear(),date.getMonth()+1,0);
    var lastDay = endDate.getDate();

    var judgingDays = lastDay + self.currentWeek;
    var totalDays = 35;
    if (judgingDays > 35){
        self.fiveOrSix5 = 6;
        // self.tableAqi = 'table-aqi table-aqi-rows';
        totalDays = 42;
    }else {
        self.fiveOrSix5 = 5;
        // self.tableAqi = 'table-aqi';
    }

    //其他周
    for (var i = 1; i <= totalDays - self.currentWeek -1; i++) {
        var d = new Date(str);
        d.setDate(d.getDate() + i);
        var dayobject={};
        dayobject.day=d;
        self.days5.push(dayobject);
    }

    for (var i = 0; i < self.days5.length; i++) {

        var d = self.days5[i].day.getDate();

        if (self.days5[i].day.getMonth()+1 == self.currentMonth){

            // if (d == self.nowTimeDay && self.currentMonth == self.nowTimeMonth && self.currentYear == self.nowTimeYear){//当天
            //     self.days5[i].itemDayClass='calendar-day is-today';
            // } else {
            //     self.days5[i].itemDayClass='calendar-day';
            // }

            for (var b = 0;b < self.monthlyDataStatus5.length-1; b++){

                var item = self.monthlyDataStatus5[b];
                if (item.dayTime === d){
                    var auditName = item.auditName;
                    var auditLevel = item.auditLevel;
                    // self.days5[i].auditName = auditName;
                    // self.days5[i].auditState = item.auditState;
                    self.days5[i].nums=item.num;
                    self.days5[i].itemClassShow=true;
                    if (auditLevel === '无数据'){
                        self.days5[i].itemDayClass='item-day is-level-7';
                    } else if (auditLevel === '一级'){
                        self.days5[i].itemDayClass='item-day is-level-1';
                    } else if (auditLevel === '二级'){
                        self.days5[i].itemDayClass='item-day is-level-2';
                    } else if (auditLevel === '三级'){
                        self.days5[i].itemDayClass='item-day is-level-3';
                    } else if (auditLevel === '四级'){
                        self.days5[i].itemDayClass='item-day is-level-4';
                    } else if (auditLevel === '五级') {
                        self.days5[i].itemDayClass='item-day is-level-5';
                    } else if (auditLevel === '六级'){
                        self.days5[i].itemDayClass='item-day is-level-6';
                    }
                    break;
                }
            }

        } else{
            self.days5[i].itemDayClass='item-day is-other-month';
            self.days5[i].itemClassShow=false
        }

    }

};
//六月
const initDataliu = function(cur,self) {
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

    var str = formatDate(self.currentYear , self.currentMonth, self.currentDay);
    self.days6.length = 0;
    //初始化第一周
    for (var i = self.currentWeek; i >= 0; i--) {
        var d = new Date(str);
        d.setDate(d.getDate() - i);
        var dayobject={}; //用一个对象包装Date对象  以便为以后预定功能添加属性
        dayobject.day=d;
        self.days6.push(dayobject);//将日期放入data 中的days数组 供页面渲染使用
    }

    var endDate = new Date(date.getFullYear(),date.getMonth()+1,0);
    var lastDay = endDate.getDate();

    var judgingDays = lastDay + self.currentWeek;
    var totalDays = 35;
    if (judgingDays > 35){
        self.fiveOrSix6 = 6;
        // self.tableAqi = 'table-aqi table-aqi-rows';
        totalDays = 42;
    }else {
        self.fiveOrSix6 = 5;
        // self.tableAqi = 'table-aqi';
    }

    //其他周
    for (var i = 1; i <= totalDays - self.currentWeek -1; i++) {
        var d = new Date(str);
        d.setDate(d.getDate() + i);
        var dayobject={};
        dayobject.day=d;
        self.days6.push(dayobject);
    }

    for (var i = 0; i < self.days6.length; i++) {

        var d = self.days6[i].day.getDate();

        if (self.days6[i].day.getMonth()+1 == self.currentMonth){

            // if (d == self.nowTimeDay && self.currentMonth == self.nowTimeMonth && self.currentYear == self.nowTimeYear){//当天
            //     self.days6[i].itemDayClass='calendar-day is-today';
            // } else {
            //     self.days6[i].itemDayClass='calendar-day';
            // }

            for (var b = 0;b < self.monthlyDataStatus6.length-1; b++){

                var item = self.monthlyDataStatus6[b];
                if (item.dayTime === d){
                    var auditName = item.auditName;
                    var auditLevel = item.auditLevel;
                    // self.days6[i].auditName = auditName;
                    // self.days6[i].auditState = item.auditState;
                    self.days6[i].nums=item.num;
                    self.days6[i].itemClassShow=true;
                    if (auditLevel === '无数据'){
                        self.days6[i].itemDayClass='item-day is-level-7';
                    } else if (auditLevel === '一级'){
                        self.days6[i].itemDayClass='item-day is-level-1';
                    } else if (auditLevel === '二级'){
                        self.days6[i].itemDayClass='item-day is-level-2';
                    } else if (auditLevel === '三级'){
                        self.days6[i].itemDayClass='item-day is-level-3';
                    } else if (auditLevel === '四级'){
                        self.days6[i].itemDayClass='item-day is-level-4';
                    } else if (auditLevel === '五级') {
                        self.days6[i].itemDayClass='item-day is-level-5';
                    } else if (auditLevel === '六级'){
                        self.days6[i].itemDayClass='item-day is-level-6';
                    }
                    break;
                }
            }

        } else{
            self.days6[i].itemDayClass='item-day is-other-month';
            self.days6[i].itemClassShow=false
        }

    }

};
//七月
const initDataQi = function(cur,self) {
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

    var str = formatDate(self.currentYear , self.currentMonth, self.currentDay);
    self.days7.length = 0;
    //初始化第一周
    for (var i = self.currentWeek; i >= 0; i--) {
        var d = new Date(str);
        d.setDate(d.getDate() - i);
        var dayobject={}; //用一个对象包装Date对象  以便为以后预定功能添加属性
        dayobject.day=d;
        self.days7.push(dayobject);//将日期放入data 中的days数组 供页面渲染使用
    }

    var endDate = new Date(date.getFullYear(),date.getMonth()+1,0);
    var lastDay = endDate.getDate();

    var judgingDays = lastDay + self.currentWeek;
    var totalDays = 35;
    if (judgingDays > 35){
        self.fiveOrSix7 = 6;
        // self.tableAqi = 'table-aqi table-aqi-rows';
        totalDays = 42;
    }else {
        self.fiveOrSix7 = 5;
        // self.tableAqi = 'table-aqi';
    }

    //其他周
    for (var i = 1; i <= totalDays - self.currentWeek -1; i++) {
        var d = new Date(str);
        d.setDate(d.getDate() + i);
        var dayobject={};
        dayobject.day=d;
        self.days7.push(dayobject);
    }

    for (var i = 0; i < self.days7.length; i++) {

        var d = self.days7[i].day.getDate();

        if (self.days7[i].day.getMonth()+1 == self.currentMonth){

            // if (d == self.nowTimeDay && self.currentMonth == self.nowTimeMonth && self.currentYear == self.nowTimeYear){//当天
            //     self.days7[i].itemDayClass='calendar-day is-today';
            // } else {
            //     self.days7[i].itemDayClass='calendar-day';
            // }

            for (var b = 0;b < self.monthlyDataStatus7.length-1; b++){

                var item = self.monthlyDataStatus7[b];
                if (item.dayTime === d){
                    var auditName = item.auditName;
                    var auditLevel = item.auditLevel;
                    // self.days7[i].auditName = auditName;
                    // self.days7[i].auditState = item.auditState;
                    self.days7[i].nums=item.num;
                    self.days7[i].itemClassShow=true;
                    if (auditLevel === '无数据'){
                        self.days7[i].itemDayClass='item-day is-level-7';
                    } else if (auditLevel === '一级'){
                        self.days7[i].itemDayClass='item-day is-level-1';
                    } else if (auditLevel === '二级'){
                        self.days7[i].itemDayClass='item-day is-level-2';
                    } else if (auditLevel === '三级'){
                        self.days7[i].itemDayClass='item-day is-level-3';
                    } else if (auditLevel === '四级'){
                        self.days7[i].itemDayClass='item-day is-level-4';
                    } else if (auditLevel === '五级') {
                        self.days7[i].itemDayClass='item-day is-level-5';
                    } else if (auditLevel === '六级'){
                        self.days7[i].itemDayClass='item-day is-level-6';
                    }
                    break;
                }
            }

        } else{
            self.days7[i].itemDayClass='item-day is-other-month';
            self.days7[i].itemClassShow=false
        }

    }

};
//八月
const initDataBa = function(cur,self) {
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

    var str = formatDate(self.currentYear , self.currentMonth, self.currentDay);
    self.days8.length = 0;
    //初始化第一周
    for (var i = self.currentWeek; i >= 0; i--) {
        var d = new Date(str);
        d.setDate(d.getDate() - i);
        var dayobject={}; //用一个对象包装Date对象  以便为以后预定功能添加属性
        dayobject.day=d;
        self.days8.push(dayobject);//将日期放入data 中的days数组 供页面渲染使用
    }

    var endDate = new Date(date.getFullYear(),date.getMonth()+1,0);
    var lastDay = endDate.getDate();

    var judgingDays = lastDay + self.currentWeek;
    var totalDays = 35;
    if (judgingDays > 35){
        self.fiveOrSix8 = 6;
        // self.tableAqi = 'table-aqi table-aqi-rows';
        totalDays = 42;
    }else {
        self.fiveOrSix8 = 5;
        // self.tableAqi = 'table-aqi';
    }

    //其他周
    for (var i = 1; i <= totalDays - self.currentWeek -1; i++) {
        var d = new Date(str);
        d.setDate(d.getDate() + i);
        var dayobject={};
        dayobject.day=d;
        self.days8.push(dayobject);
    }

    for (var i = 0; i < self.days8.length; i++) {

        var d = self.days8[i].day.getDate();

        if (self.days8[i].day.getMonth()+1 == self.currentMonth){

            // if (d == self.nowTimeDay && self.currentMonth == self.nowTimeMonth && self.currentYear == self.nowTimeYear){//当天
            //     self.days8[i].itemDayClass='calendar-day is-today';
            // } else {
            //     self.days8[i].itemDayClass='calendar-day';
            // }

            for (var b = 0;b < self.monthlyDataStatus8.length-1; b++){

                var item = self.monthlyDataStatus8[b];
                if (item.dayTime === d){
                    var auditName = item.auditName;
                    var auditLevel = item.auditLevel;
                    // self.days8[i].auditName = auditName;
                    // self.days8[i].auditState = item.auditState;
                    self.days8[i].nums=item.num;
                    self.days8[i].itemClassShow=true;
                    if (auditLevel === '无数据'){
                        self.days8[i].itemDayClass='item-day is-level-7';
                    } else if (auditLevel === '一级'){
                        self.days8[i].itemDayClass='item-day is-level-1';
                    } else if (auditLevel === '二级'){
                        self.days8[i].itemDayClass='item-day is-level-2';
                    } else if (auditLevel === '三级'){
                        self.days8[i].itemDayClass='item-day is-level-3';
                    } else if (auditLevel === '四级'){
                        self.days8[i].itemDayClass='item-day is-level-4';
                    } else if (auditLevel === '五级') {
                        self.days8[i].itemDayClass='item-day is-level-5';
                    } else if (auditLevel === '六级'){
                        self.days8[i].itemDayClass='item-day is-level-6';
                    }
                    break;
                }
            }

        } else{
            self.days8[i].itemDayClass='item-day is-other-month';
            self.days8[i].itemClassShow=false
        }

    }

};
//九月
const initDataJiu = function(cur,self) {
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

    var str = formatDate(self.currentYear , self.currentMonth, self.currentDay);
    self.days9.length = 0;
    //初始化第一周
    for (var i = self.currentWeek; i >= 0; i--) {
        var d = new Date(str);
        d.setDate(d.getDate() - i);
        var dayobject={}; //用一个对象包装Date对象  以便为以后预定功能添加属性
        dayobject.day=d;
        self.days9.push(dayobject);//将日期放入data 中的days数组 供页面渲染使用
    }

    var endDate = new Date(date.getFullYear(),date.getMonth()+1,0);
    var lastDay = endDate.getDate();

    var judgingDays = lastDay + self.currentWeek;
    var totalDays = 35;
    if (judgingDays > 35){
        self.fiveOrSix9 = 6;
        // self.tableAqi = 'table-aqi table-aqi-rows';
        totalDays = 42;
    }else {
        self.fiveOrSix9 = 5;
        // self.tableAqi = 'table-aqi';
    }

    //其他周
    for (var i = 1; i <= totalDays - self.currentWeek -1; i++) {
        var d = new Date(str);
        d.setDate(d.getDate() + i);
        var dayobject={};
        dayobject.day=d;
        self.days9.push(dayobject);
    }

    for (var i = 0; i < self.days9.length; i++) {

        var d = self.days9[i].day.getDate();

        if (self.days9[i].day.getMonth()+1 == self.currentMonth){

            // if (d == self.nowTimeDay && self.currentMonth == self.nowTimeMonth && self.currentYear == self.nowTimeYear){//当天
            //     self.days9[i].itemDayClass='calendar-day is-today';
            // } else {
            //     self.days9[i].itemDayClass='calendar-day';
            // }

            for (var b = 0;b < self.monthlyDataStatus9.length-1; b++){

                var item = self.monthlyDataStatus9[b];
                if (item.dayTime === d){
                    var auditName = item.auditName;
                    var auditLevel = item.auditLevel;
                    // self.days9[i].auditName = auditName;
                    // self.days9[i].auditState = item.auditState;
                    self.days9[i].nums=item.num;
                    self.days9[i].itemClassShow=true;
                    if (auditLevel === '无数据'){
                        self.days9[i].itemDayClass='item-day is-level-7';
                    } else if (auditLevel === '一级'){
                        self.days9[i].itemDayClass='item-day is-level-1';
                    } else if (auditLevel === '二级'){
                        self.days9[i].itemDayClass='item-day is-level-2';
                    } else if (auditLevel === '三级'){
                        self.days9[i].itemDayClass='item-day is-level-3';
                    } else if (auditLevel === '四级'){
                        self.days9[i].itemDayClass='item-day is-level-4';
                    } else if (auditLevel === '五级') {
                        self.days9[i].itemDayClass='item-day is-level-5';
                    } else if (auditLevel === '六级'){
                        self.days9[i].itemDayClass='item-day is-level-6';
                    }
                    break;
                }
            }

        } else{
            self.days9[i].itemDayClass='item-day is-other-month';
            self.days9[i].itemClassShow=false
        }

    }

};
//十月
const initDataShi = function(cur,self) {
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

    var str = formatDate(self.currentYear , self.currentMonth, self.currentDay);
    self.days10.length = 0;
    //初始化第一周
    for (var i = self.currentWeek; i >= 0; i--) {
        var d = new Date(str);
        d.setDate(d.getDate() - i);
        var dayobject={}; //用一个对象包装Date对象  以便为以后预定功能添加属性
        dayobject.day=d;
        self.days10.push(dayobject);//将日期放入data 中的days数组 供页面渲染使用
    }

    var endDate = new Date(date.getFullYear(),date.getMonth()+1,0);
    var lastDay = endDate.getDate();

    var judgingDays = lastDay + self.currentWeek;
    var totalDays = 35;
    if (judgingDays > 35){
        self.fiveOrSix10 = 6;
        // self.tableAqi = 'table-aqi table-aqi-rows';
        totalDays = 42;
    }else {
        self.fiveOrSix10 = 5;
        // self.tableAqi = 'table-aqi';
    }

    //其他周
    for (var i = 1; i <= totalDays - self.currentWeek -1; i++) {
        var d = new Date(str);
        d.setDate(d.getDate() + i);
        var dayobject={};
        dayobject.day=d;
        self.days10.push(dayobject);
    }

    for (var i = 0; i < self.days10.length; i++) {

        var d = self.days10[i].day.getDate();

        if (self.days10[i].day.getMonth()+1 == self.currentMonth){

            // if (d == self.nowTimeDay && self.currentMonth == self.nowTimeMonth && self.currentYear == self.nowTimeYear){//当天
            //     self.days10[i].itemDayClass='calendar-day is-today';
            // } else {
            //     self.days10[i].itemDayClass='calendar-day';
            // }

            for (var b = 0;b < self.monthlyDataStatus10.length-1; b++){

                var item = self.monthlyDataStatus10[b];
                if (item.dayTime === d){
                    var auditName = item.auditName;
                    var auditLevel = item.auditLevel;
                    // self.days10[i].auditName = auditName;
                    // self.days10[i].auditState = item.auditState;
                    self.days10[i].nums=item.num;
                    self.days10[i].itemClassShow=true;
                    if (auditLevel === '无数据'){
                        self.days10[i].itemDayClass='item-day is-level-7';
                    } else if (auditLevel === '一级'){
                        self.days10[i].itemDayClass='item-day is-level-1';
                    } else if (auditLevel === '二级'){
                        self.days10[i].itemDayClass='item-day is-level-2';
                    } else if (auditLevel === '三级'){
                        self.days10[i].itemDayClass='item-day is-level-3';
                    } else if (auditLevel === '四级'){
                        self.days10[i].itemDayClass='item-day is-level-4';
                    } else if (auditLevel === '五级') {
                        self.days10[i].itemDayClass='item-day is-level-5';
                    } else if (auditLevel === '六级'){
                        self.days10[i].itemDayClass='item-day is-level-6';
                    }
                    break;
                }
            }

        } else{
            self.days10[i].itemDayClass='item-day is-other-month';
            self.days10[i].itemClassShow=false
        }

    }

};
//十一月
const initDataShiYi = function(cur,self) {
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

    var str = formatDate(self.currentYear , self.currentMonth, self.currentDay);
    self.days11.length = 0;

    //初始化第一周
    for (var i = self.currentWeek; i >= 0; i--) {
        var d = new Date(str);
        d.setDate(d.getDate() - i);
        var dayobject={}; //用一个对象包装Date对象  以便为以后预定功能添加属性
        dayobject.day=d;
        self.days11.push(dayobject);//将日期放入data 中的days数组 供页面渲染使用
    }

    var endDate = new Date(date.getFullYear(),date.getMonth()+1,0);
    var lastDay = endDate.getDate();

    var judgingDays = lastDay + self.currentWeek;
    var totalDays = 35;
    if (judgingDays > 35){
        self.fiveOrSix11 = 6;
        // self.tableAqi = 'table-aqi table-aqi-rows';
        totalDays = 42;
    }else {
        self.fiveOrSix11 = 5;
        // self.tableAqi = 'table-aqi';
    }

    //其他周
    for (var i = 1; i <= totalDays - self.currentWeek -1; i++) {
        var d = new Date(str);
        d.setDate(d.getDate() + i);
        var dayobject={};
        dayobject.day=d;
        self.days11.push(dayobject);
    }

    for (var i = 0; i < self.days11.length; i++) {

        var d = self.days11[i].day.getDate();

        if (self.days11[i].day.getMonth()+1 == self.currentMonth){

            // if (d == self.nowTimeDay && self.currentMonth == self.nowTimeMonth && self.currentYear == self.nowTimeYear){//当天
            //     self.days11[i].itemDayClass='calendar-day is-today';
            // } else {
            //     self.days11[i].itemDayClass='calendar-day';
            // }

            for (var b = 0;b < self.monthlyDataStatus11.length-1; b++){

                var item = self.monthlyDataStatus11[b];
                if (item.dayTime === d){
                    var auditName = item.auditName;
                    var auditLevel = item.auditLevel;
                    // self.days11[i].auditName = auditName;
                    // self.days11[i].auditState = item.auditState;
                    self.days11[i].nums=item.num;
                    self.days11[i].itemClassShow=true;
                    if (auditLevel === '无数据'){
                        self.days11[i].itemDayClass='item-day is-level-7';
                    } else if (auditLevel === '一级'){
                        self.days11[i].itemDayClass='item-day is-level-1';
                    } else if (auditLevel === '二级'){
                        self.days11[i].itemDayClass='item-day is-level-2';
                    } else if (auditLevel === '三级'){
                        self.days11[i].itemDayClass='item-day is-level-3';
                    } else if (auditLevel === '四级'){
                        self.days11[i].itemDayClass='item-day is-level-4';
                    } else if (auditLevel === '五级') {
                        self.days11[i].itemDayClass='item-day is-level-5';
                    } else if (auditLevel === '六级'){
                        self.days11[i].itemDayClass='item-day is-level-6';
                    }
                    break;
                }
            }

        } else{
            self.days11[i].itemDayClass='item-day is-other-month';
            self.days11[i].itemClassShow=false
        }

    }

};
//十二月
const initDataShiEr = function(cur,self) {
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

    var str = formatDate(self.currentYear , self.currentMonth, self.currentDay);
    self.days12.length = 0;

    //初始化第一周
    for (var i = self.currentWeek; i >= 0; i--) {
        var d = new Date(str);
        d.setDate(d.getDate() - i);
        var dayobject={}; //用一个对象包装Date对象  以便为以后预定功能添加属性
        dayobject.day=d;
        self.days12.push(dayobject);//将日期放入data 中的days数组 供页面渲染使用
    }

    var endDate = new Date(date.getFullYear(),date.getMonth()+1,0);
    var lastDay = endDate.getDate();

    var judgingDays = lastDay + self.currentWeek;
    var totalDays = 35;
    if (judgingDays > 35){
        self.fiveOrSix12 = 6;
        // self.tableAqi = 'table-aqi table-aqi-rows';
        totalDays = 42;
    }else {
        self.fiveOrSix12 = 5;
        // self.tableAqi = 'table-aqi';
    }

    //其他周
    for (var i = 1; i <= totalDays - self.currentWeek -1; i++) {
        var d = new Date(str);
        d.setDate(d.getDate() + i);
        var dayobject={};
        dayobject.day=d;
        self.days12.push(dayobject);
    }

    for (var i = 0; i < self.days12.length; i++) {

        var d = self.days12[i].day.getDate();

        if (self.days12[i].day.getMonth()+1 == self.currentMonth){

            // if (d == self.nowTimeDay && self.currentMonth == self.nowTimeMonth && self.currentYear == self.nowTimeYear){//当天
            //     self.days12[i].itemDayClass='calendar-day is-today';
            // } else {
            //     self.days12[i].itemDayClass='calendar-day';
            // }

            for (var b = 0;b < self.monthlyDataStatus12.length-1; b++){

                var item = self.monthlyDataStatus12[b];
                if (item.dayTime === d){
                    var auditName = item.auditName;
                    var auditLevel = item.auditLevel;
                    // self.days12[i].auditName = auditName;
                    // self.days12[i].auditState = item.auditState;
                    self.days12[i].nums=item.num;
                    self.days12[i].itemClassShow=true;
                    if (auditLevel === '无数据'){
                        self.days12[i].itemDayClass='item-day is-level-7';
                    } else if (auditLevel === '一级'){
                        self.days12[i].itemDayClass='item-day is-level-1';
                    } else if (auditLevel === '二级'){
                        self.days12[i].itemDayClass='item-day is-level-2';
                    } else if (auditLevel === '三级'){
                        self.days12[i].itemDayClass='item-day is-level-3';
                    } else if (auditLevel === '四级'){
                        self.days12[i].itemDayClass='item-day is-level-4';
                    } else if (auditLevel === '五级') {
                        self.days12[i].itemDayClass='item-day is-level-5';
                    } else if (auditLevel === '六级'){
                        self.days12[i].itemDayClass='item-day is-level-6';
                    }
                    break;
                }
            }

        } else{
            self.days12[i].itemDayClass='item-day is-other-month';
            self.days12[i].itemClassShow=false
        }

    }

};
// 返回 类似 2016-01-02 格式的字符串
const formatDate = function(year,month,day){
    var y = year;
    var m = month;
    if(m<10) m = "0" + m;
    var d = day;
    if(d<10) d = "0" + d;
    return y+"-"+m+"-"+d
};


