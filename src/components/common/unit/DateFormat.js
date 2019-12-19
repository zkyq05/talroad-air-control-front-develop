//时间格式化
var dataformat = {
    init:function(){
        Date.prototype.format = function(format) {
            var o = {
                "M+": this.getMonth() + 1, //month
                "d+": this.getDate(), //day
                "h+": this.getHours(), //hour
                "m+": this.getMinutes(), //minute
                "s+": this.getSeconds(), //second
                "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
                S: this.getMilliseconds() //millisecond
            };

            if (/(y+)/.test(format)) {
                format = format.replace(
                    RegExp.$1,
                    (this.getFullYear() + "").substr(4 - RegExp.$1.length)
                );
            }

            for (var k in o) {
                if (new RegExp("(" + k + ")").test(format)) {
                    format = format.replace(
                        RegExp.$1,
                        RegExp.$1.length == 1
                            ? o[k]
                            : ("00" + o[k]).substr(("" + o[k]).length)
                    );
                }
            }
            return format;
        };
    },
    newDate:function(str) { //解决new Date()IE10不支持参数
        //首先将日期分隔 ，获取到日期部分 和 时间部分
        var day = str.split(' ');
        //获取日期部分的年月日
        var days = day[0].split('-');
        //获取时间部分的 时分秒
        var mi = day[day.length - 1].split(':');
        //获取当前date类型日期
        var date = new Date();
        //给date赋值  年月日
        date.setUTCFullYear(days[0], days[1] - 1, days[2]);
        //给date赋值 时分秒  首先转换utc时区 ：+8
        date.setUTCHours(mi[0] - 8, mi[1], mi[2]);
        return date;
    },
    /*获取上个月*/
    getPreMonth:function(date) {
        var arr = date.split('-');
        var year = arr[0]; //获取当前日期的年份
        var month = arr[1]; //获取当前日期的月份
        var day = arr[2]; //获取当前日期的日
        var days = new Date(year, month, 0);
        days = days.getDate(); //获取当前日期中月的天数
        var year2 = year;
        var month2 = parseInt(month) - 1;
        if (month2 == 0) {
            year2 = parseInt(year2) - 1;
            month2 = 12;
        }
        var day2 = day;
        var days2 = new Date(year2, month2, 0);
        days2 = days2.getDate();
        if (day2 > days2) {
            day2 = days2;
        }
        if (month2 < 10) {
            month2 = '0' + month2;
        }
        var t2 = year2 + '-' + month2 + '-' + day2;
        return t2;
    },
    /*获取下个月*/
    getNextMonth:function (date) {
        var arr = date.split('-');
        var year = arr[0]; //获取当前日期的年份
        var month = arr[1]; //获取当前日期的月份
        var day = arr[2]; //获取当前日期的日
        var days = new Date(year, month, 0);
        days = days.getDate(); //获取当前日期中的月的天数
        var year2 = year;
        var month2 = parseInt(month) + 1;
        if (month2 == 13) {
            year2 = parseInt(year2) + 1;
            month2 = 1;
        }
        var day2 = day;
        var days2 = new Date(year2, month2, 0);
        days2 = days2.getDate();
        if (day2 > days2) {
            day2 = days2;
        }
        if (month2 < 10) {
            month2 = '0' + month2;
        }
        var t2 = year2 + '-' + month2 + '-' + day2;
        return t2;

    },
    dateFtt:function(date,type){ //格式化时间
        if(type == 1){
            return date.split(" ")[0];
        }else{
            return date.split(":")[0];
        }

    },
    getYearWeek:function(date){
        var year = date.getFullYear();
        var date2=new Date(date.getFullYear(), 0, 1);
        var day1=date.getDay();
        if(day1==0) day1=7;
        var day2=date2.getDay();
        if(day2==0) day2=7;
        var d = Math.round((date.getTime() - date2.getTime()+(day2-day1)*(24*60*60*1000)) / 86400000);
        var week = d%7==0?d/7:d/7+1;
        return year + '-' +week.toFixed(0);
    },
    dateChanges:function (dt,ope) {
        var arr = dt.split('-');
        var num = Number(ope);
        var y = Number(arr[0]); //获取当前日期的年份
        var m = Number(arr[1]); //获取当前日期的月份
        var lastDay = this.getLastDay(y,m);
        var d = Number(arr[2]); //获取当前日期的日
        d += num;
        if(d<1) {
            m--;
            if(m<0) {
                y--;
                m = 11;
            }
            d =  this.getLastDay(y,m)+d;
        }else if(d>lastDay) {
            m++;
            if(m>11) {
                y++;
                m = 1;
            }
            d = d-this.getLastDay(y,m);
        }
        var reDT = new Date();
        reDT.setYear(y);
        reDT.setMonth(m-1);
        reDT.setDate(d);
        return reDT;
    },
    getLastDay:function(y,m){
        var lastDay = 28;
        m++;
        if(m==1 || m==3 || m==5 || m==7 || m==8 || m==10 || m==12) {
            lastDay = 31;
        }
        else if(m==4 || m==6 || m==9 || m==11) {
            lastDay = 30;
        }
        else if(this.isLeapYear(y)==true) {
            lastDay = 29;
        }
        return lastDay;
    },
    isLeapYear:function(y){
        var isLeap = false;
        if(y%4==0 && y%100!=0 || y%400==0) {
            isLeap = true;
        }
        return isLeap;
    }
}
export default dataformat
