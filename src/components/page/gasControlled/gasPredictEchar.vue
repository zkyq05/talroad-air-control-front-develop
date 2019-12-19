<template>
    <div class = "main-con">
            <!-- 预测 空气质量 -->
            <div class="el-row" style="margin-left: -15px; margin-right: -15px;">
                <div class="el-col el-col-16" style="padding-left: 15px; padding-right: 15px;">
                    <div class="panel-default">
                        <div class="panel-hd">
                            <h2 class="panel-tit"><i class="icon icon-baobiao"></i>未来7日AQI预测</h2>
                            <div class="air-type-box pull-right">
                                <div class="type-item type01"><span class="rect"></span>优</div>
                                <div class="type-item type02"><span class="rect"></span>良</div>
                                <div class="type-item type03"><span class="rect"></span>轻度污染</div>
                                <div class="type-item type04"><span class="rect"></span>中度污染</div>
                                <div class="type-item type05"><span class="rect"></span>重度污染</div>
                                <div class="type-item type06"><span class="rect"></span>严重污染</div>
                            </div>
                        </div>
                        <div class="panel-bd">
                            <div class="chart-item" id="myChart2" style="height: 254px;width: 100%"></div>
                        </div>
                    </div>
                </div>
                <div class="el-col el-col-8" style="padding-left: 15px; padding-right: 15px;">
                    <div class="panel-default">
                        <div class="pd-lg">
                            <div class="air-tips">
                                <div class="air-icon">
                                    <img src="images/weather/weather02@2x.png" alt="">
                                </div>
                                <div class="air-con">
                                    <div class="tips-tit">空气质量提示</div>
                                    <div class="tips-text">未来7天空气质量以良为主，总体空气质量良好</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 日期 天气 -->
            <div class="el-row mt-lg" style="margin-left: -15px; margin-right: -15px;">
                <div class="el-col el-col-12" style="padding-left: 15px; padding-right: 15px;">
                    <div class="panel-default">
                        <div class="panel-hd">
                            <div class="date-change pull-right">
                                <i class="icon icon-left"></i>
                                <span class="change-txt">{{this.year}}年{{this.momth+1}}月</span>
                                <i class="icon icon-right"></i>
                            </div>
                        </div>
                        <table class="table-aqi aqi-sm">
                            <thead>
                            <tr>
                                <th>日</th>
                                <th>一</th>
                                <th>二</th>
                                <th>三</th>
                                <th>四</th>
                                <th>五</th>
                                <th>六</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(dayobject,index) in days" v-if="index < fiveOrSix" >
                                <td>
                                    <div :class="days[(index*7)].itemDayClass" @click="gqueryOneDay(days[(index*7)].day.getDate())">
                                        <div   class="day-num" >{{days[(index*7)].day.getDate() }}</div>
                                        <div  class="day-info">
                                            <div class="info-name">{{days[(index*7 )].nam}}</div>
                                            <div class="info-num">{{days[(index*7 )].val}}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div :class="days[(index*7 + 1)].itemDayClass" @click="gqueryOneDay(days[(index*7+1)].day.getDate())">
                                        <div  class="day-num">{{days[(index*7 +1)].day.getDate() }}</div>
                                        <div  class="day-info">
                                            <div class="info-name">{{days[(index*7 +1)].nam}}</div>
                                            <div class="info-num">{{days[(index*7 +1)].val}}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div :class="days[(index*7 + 2)].itemDayClass" @click="gqueryOneDay(days[(index*7+2)].day.getDate())">
                                        <div   class="day-num">{{days[(index*7 + 2)].day.getDate() }}</div>
                                        <div  class="day-info">
                                            <div class="info-name">{{days[(index*7 +2)].nam}}</div>
                                            <div class="info-num">{{days[(index*7 +2)].val}}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div :class="days[(index*7 + 3)].itemDayClass" @click="gqueryOneDay(days[(index*7+3)].day.getDate())">
                                        <div   class="day-num">{{days[(index*7 + 3)].day.getDate() }}</div>
                                        <div  class="day-info">
                                            <div class="info-name">{{days[(index*7 +3)].nam}}</div>
                                            <div class="info-num">{{days[(index*7 +3)].val}}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>

                                   <!-- <div class="item-day is-level-6">
                                        <div class="day-num">1</div>
                                        <div class="day-info">
                                            <div class="info-name">AQI</div>
                                            <div class="info-num">76</div>
                                        </div>
                                    </div>-->

                                    <div :class="days[(index*7 + 4)].itemDayClass" @click="gqueryOneDay(days[(index*7+4)].day.getDate())">
                                        <div   class="day-num">{{days[(index*7 +4)].day.getDate() }}</div>
                                        <div class="day-info">
                                            <div class="info-name">{{days[(index*7 +4)].nam}}</div>
                                            <div class="info-num">{{days[(index*7 +4)].val}}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div :class="days[(index*7 + 5)].itemDayClass" @click="gqueryOneDay(days[(index*7+5)].day.getDate())">
                                        <div  class="day-num">{{days[(index*7 +5)].day.getDate() }}</div>
                                        <div class="day-info">
                                            <div class="info-name">{{days[(index*7 +5)].nam}}</div>
                                            <div class="info-num">{{days[(index*7 +5)].val}}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div :class="days[(index*7 +6)].itemDayClass" @click="gqueryOneDay(days[(index*7+6)].day.getDate())">
                                        <div   class="day-num">{{days[(index*7 +6)].day.getDate() }}</div>
                                        <div class="day-info">
                                            <div class="info-name">{{days[(index*7 +6)].nam}}</div>
                                            <div class="info-num">{{days[(index*7 +6)].val}}</div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="el-col el-col-12" style="padding-left: 15px; padding-right: 15px;">
                    <div class="panel-default" style="height: 468px;">
                        <div class="pd-lg">
                            <div class="air-area">
                                <div class="area-item">
                                    <div class="area-date">{{dayData.Time}}</div>
                                    <div class="area-deg" v-if = "dayData.temperature == null ">0℃</div>
                                    <div class="area-deg" v-else >{{dayData.temperature}}℃</div>
                                    <div class="area-text">晴</div>
                                    <div class="area-text-01"  v-if = "dayData.temperature == null "><i class="icon icon-shidu"></i>0%</div>
                                    <div class="area-text-01"  v-else><i class="icon icon-shidu"></i>{{dayData.humidity}}%</div>
                                    <div class="area-text-02">风速 10-15 km/h</div>
                                    <div class="area-icon">
                                        <img src="../../../../static/css/images/weather/weather01@2x.png">
                                    </div>
                                </div>
                                <div class="area-item">
                                    <div class="chart-item" id="chart02" style="height: 254px;width: 100%;padding-left: 60px"></div>
                                </div>
                            </div>
                            <ul class="air-box">
                                <li class="air-item air-01">
                                    <div class="air-color"></div>
                                    <div class="air-name">PM<span class="text-value">2.5</span></div>
                                    <div class="air-num" v-if = "dayData.PM25 == null " >0<span class="text-value">μg/m³</span></div>
                                    <div class="air-num" v-else >{{dayData.PM25}}<span class="text-value">μg/m³</span></div>
                                </li>
                                <li class="air-item air-02">
                                    <div class="air-color"></div>
                                    <div class="air-name">PM<span class="text-value">10</span></div>

                                    <div class="air-num" v-if = "dayData.PM10 == null " >0<span class="text-value">μg/m³</span></div>
                                    <div class="air-num" v-else >{{dayData.PM10}}<span class="text-value">μg/m³</span></div>
                                </li>
                                <li class="air-item air-03">
                                    <div class="air-color"></div>
                                    <div class="air-name">NO<span class="text-value">2</span></div>

                                    <div class="air-num" v-if = "dayData.NO2 == null " >0<span class="text-value">μg/m³</span></div>
                                    <div class="air-num" v-else >{{dayData.NO2}}<span class="text-value">μg/m³</span></div>
                                </li>
                                <li class="air-item air-04">
                                    <div class="air-color"></div>
                                    <div class="air-name">SO<span class="text-value">2</span></div>

                                    <div class="air-num" v-if = "dayData.SO2 == null " >0<span class="text-value">μg/m³</span></div>
                                    <div class="air-num" v-else >{{dayData.SO2}}<span class="text-value">μg/m³</span></div>
                                </li>
                                <li class="air-item air-05">
                                    <div class="air-color"></div>
                                    <div class="air-name">CO</div>

                                    <div class="air-num" v-if = "dayData.CO == null " >0<span class="text-value">μg/m³</span></div>
                                    <div class="air-num" v-else >{{dayData.CO}}<span class="text-value">μg/m³</span></div>
                                </li>
                                <li class="air-item air-06">
                                    <div class="air-color"></div>
                                    <div class="air-name">O<span class="text-value">3</span></div>

                                    <div class="air-num" v-if = "dayData.O3 == null " >0<span class="text-value">μg/m³</span></div>
                                    <div class="air-num" v-else >{{dayData.O3}}<span class="text-value">μg/m³</span></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
    import dataManagerCalendar from "../homePage/assessmentrankings/DataManagerCalendar";
    export default {
        name: "gasPredictEchar",
        data(){
            return{
                dayList:[],
                aqiList:[],
                dataList:[],
                dayData:{},
                levelLise:[],
                colorList:[],
                /*-----------*/
                nowTimeDay: 1,
                nowTimeMonth: 1,
                nowTimeYear: 1990,
                currentDay: 1,
                currentMonth: 1,
                currentYear: 1970,
                currentWeek: 1,
                days: [],
                monthlyDataStatus: [],
                fiveOrSix: 5,
                monthTime: '',
                youDay:10,
                oneSelevl:'',
                twoSelevl:'',
                treeSelevl:"",
                fourSelevl:"",
                fiveSelevl:"",
                sixSelevl:"",
                noData:"",
                totalDay:"",
                pollutant:"AQI"
            }
        },
        mounted() {
            var date = new Date();
            this.nowTimeDay = date.getDate();
            this.nowTimeMonth = date.getMonth() + 1;
            this.nowTimeYear = date.getFullYear();
            this.monthTime = date.format('yyyy-MM');
            this.getYearAndMonth();
            this.chart1();

        },
        methods: {
            getYearAndMonth() {
                var that = this;
                var myDate = new Date();
                that.year = myDate.getFullYear();

                that.momth = myDate.getMonth()
                this.chart2(myDate.getFullYear(),myDate.getMonth()+1);

            },
            //柱状图数据
            chart1() {
                let that = this;
                var url = '/aircontrol/airassess/codForecastDay/forecast7Day';
                that.$axios.get(url,{params:{
                    }}).then(
                    function (res) {
                        if(res.code == 0){
                            that.dayList = res.data.dayList;
                            that.aqiList = res.data.aqiList;
                            that.colorList = res.data.colorList == undefined ? [] : res.data.colorList;
                            that.drowZhu();
                        }
                    }
                )
            },

            chart2(year,month) {
                let that = this;
                var url = '/aircontrol/airassess/codForecastDay/forecast30Day';
                //var url = '/aircontrol/codForecastDay/forecast30Day';
                that.$axios.get(url,{params:{
                    }}).then(
                    function (res) {
                        if(res.code == 0){
                            that.initData(that.nowTimeYear+'-'+that.nowTimeMonth,that,res.data)
                            that.gqueryOneDay(that.nowTimeDay)
                        }
                    }
                )
            },
            //日历点击查询
            gqueryOneDay(day){
                let that = this;
                var da ;
                if(day >= 10){
                    da = day
                }else{
                    da = '0' + day
                }
                var dayStr = that.currentYear+'-'+that.currentMonth+'-'+da
                var url = '/aircontrol/airassess/codForecastDay/queryByDate';
                that.$axios.get(url,{params:{
                        "dayStr":dayStr
                    }}).then(
                    function (res) {
                        if(res.code == 0){
                            that.dayData = res.data;
                           // alert(JSON.stringify(that.dayData))
                            that.drowBing()
                        }else{
                            that.$message.error(res.msg);
                        }
                    }
                )
            },

            //月历计算部分  当前年  当前月
            getVirtulData(year,month) {
                year = year || '2017';
                var dataList = this.dataList
                var date = +this.$echarts.number.parseDate(year + '-'+month+'-01');
                var end = +this.$echarts.number.parseDate((+year + 1)+ '-'+month+'-01');
                var dayTime = 3600 * 24 * 1000;
                var data = [];
                var i = 0 ;
                for (var time = date; time < end; time += dayTime) {
                    for(var j = 0 ;j <= dataList.length ; j++){
                        if(i == j){
                            data.push([
                                this.$echarts.format.formatTime('yyyy-MM-dd', time),
                                dataList[j]
                                //Math.floor(Math.random() * 1000)
                            ]);
                        }
                    }
                    i++;
                }
                console.log(data[data.length - 1]);
                return data;
            },



            //柱状图
            drowZhu() {
                var that =this;
                let myChart2 = this.$echarts.init(document.getElementById('myChart2'),'skinUpp')
                myChart2.setOption({
                        color: ['#3398DB'],
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis : [
                            {
                                type : 'category',
                                data :that.dayList,
                                "splitLine": {
                                    "show": false
                                }
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value',
                            },

                        ],
                        series : [
                            {
                                name:'AQI',
                                type:'bar',
                                barWidth: '60%',
                                data:that.aqiList,
                                /*data:[3,6,9,21,16,21,17,1],*/
                                itemStyle: {
                                    normal: {
                                        color: function(params) {
                                            // build a color map as your need.
                                            var colorList = that.colorList;
                                            return colorList[params.dataIndex]
                                        },
                                       /* label: {
                                            show: true,
                                            position: 'top',
//                             formatter: '{c}'
                                            formatter: '{b}\n{c}'
                                        }*/
                                    }
                                },
                            }
                        ]
                    })
            },

            //日历图点击后的 饼图
            drowBing() {
                var that =this;
                let chart02 = this.$echarts.init(document.getElementById('chart02'),'skinUpp')
                chart02.setOption({
                    // 标题
                    title: {
                        "x": '35%',
                        "y": '45%',
                        textAlign: "center",
                        top: 200,//字体的位置
                        'text': 'AQI',
                        'subtext': that.dayData.col,
                        "textStyle": {
                            "fontWeight": 'normal',
                            "color": '#93AECE',
                            "fontSize": 16
                        },
                        "subtextStyle": {//副标题的文字的样式
                            //"fontWeight": 'bold',
                            "fontSize": 14,
                            "color": '#F19D38'
                        },
                    },
                    //图例
                    legend: {
                        data: [that.dayData.col, ''],
                        orient: 'vertical',
                        top: 'center',
                        right: '5%',
                        show:false
                    },
                    //提示框
                    tooltip: {
                        trigger: 'item',
                    },
                    // 数据
                    series: [{
                        type:'pie',
                        radius: ['60%', '70%'],
                        center: ['35%', '60%'],
                        hoverOffset: 0,//划入不放大
                        startAngle: 235,
                        avoidLabelOverlap: true,//允许标签重叠
                        data:[
                            {
                                value:that.dayData.aqi,
                                /*value:100,col */
                                name:that.dayData.col,
                                label : {
                                    position : 'center',
                                    fontSize: 42,
                                    formatter: '{c}', //{a}：系列名。{b}：数据名。{ c}：数据值。{d}：百分比。
                                    color: '#fff',
                                },
                                itemStyle : {
                                    borderWidth: 25,
                                    normal: {
                                        barBorderRadius: 10
                                    },
                                    emphasis: {
                                        barBorderRadius: 10
                                    }
                                },
                            },
                            {
                                value:110,
                                name:'',
                                label : {
                                    position : 'center',
                                    fontSize: 14,
                                    //formatter: '\n已完成', //{a}：系列名。{b}：数据名。{c}：数据值。{d}：百分比。
                                    color: '#040404',
                                    show:false
                                },
                                itemStyle : {
                                    color: '#f5f5f5',
                                    borderWidth: 25
                                },
                                emphasis:{
                                    itemStyle: {
                                        color: '#f5f5f5',
                                    },
                                },
                                //提示框
                                tooltip: {
                                    show: false,
                                },
                            },
                            {
                                name: 'gap',
                                value: 85,//总的-当前值(环图 留白)
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: false
                                        },
                                        labelLine: {
                                            show: false
                                        },
                                        color: 'rgba(0, 0, 0, 0)',
                                        borderColor: 'rgba(0, 0, 0, 0)',
                                        borderWidth: 0,
                                    }
                                },
                            },
                            // {
                            //   value:445,
                            //   name:'',
                            //   itemStyle : {
                            //     color: 'rgba(0,0,0,0)',
                            //   },
                            //   emphasis:{
                            //     itemStyle: {
                            //       color: 'rgba(0,0,0,0)',
                            //     }
                            //   },
                            //   //提示框
                            //   tooltip: {
                            //     show: false,
                            //   },
                            // },
                        ],
                    }]
                })
            },


            //日历图
            initData(cur,self,resData) {
                // var leftcount=0; //存放剩余数量
                var date;
                if (cur) {
                    date = new Date((cur+'-01'));
                } else {
                    var now=new Date();
                    var d = new Date(self.formatDate(now.getFullYear() , now.getMonth() , 1));
                    d.setDate(35);
                    date = new Date(self.formatDate(d.getFullYear(),d.getMonth() + 1,1));
                }
                self.currentDay = date.getDate();
                self.currentYear = date.getFullYear();
                self.currentMonth = date.getMonth() + 1;

                self.currentWeek = date.getDay(); //获取当月1号是星期几 1...6,0

                var str = self.formatDate(self.currentYear , self.currentMonth, "01");
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

                        self.days[i].itemDayClass='item-day is-level-7';
                        self.days[i].itemClassShow=true
                        for(var j = 0 ; j < resData.trReal.length ; j ++){

                            if(parseInt(resData.trReal[j].day) == d){

                                if (resData.trReal[j].col == '一级' && resData.trReal[j].aqi != 0){
                                    self.days[i].itemDayClass='item-day is-level-1';
                                } else if (resData.trReal[j].col == '二级'){
                                    self.days[i].itemDayClass='item-day is-level-2';
                                } else if (resData.trReal[j].col== '三级'){
                                    self.days[i].itemDayClass='item-day is-level-3';
                                } else if (resData.trReal[j].col == '四级'){
                                    self.days[i].itemDayClass='item-day is-level-4';
                                } else if (resData.trReal[j].col == '五级') {
                                    self.days[i].itemDayClass='item-day is-level-5';
                                } else if (resData.trReal[j].col == '六级'){
                                    self.days[i].itemDayClass='item-day is-level-6';
                                }else{
                                     self.days[i].itemDayClass='item-day is-level-7';
                                 }

                                if(resData.trReal[j].aqi == 0 ){
                                    self.days[i].val = '无'
                                }else{
                                    self.days[i].val = resData.trReal[j].aqi
                                }
                                self.days[i].nam = 'AQI:'
                            }
                        }


                    } else{
                        self.days[i].itemDayClass='item-day is-other-month';
                        self.days[i].itemClassShow=false
                    }
                }


            },
            formatDate (year,month,day){
                var y = year;
                var m = month;
                if(m<10) m = "0" + m;
                var d = day;
                if(d<10) d = "0" + d;
                return y+"-"+m+"-"+d
            }

        },
    }


</script>

<style scoped>

</style>