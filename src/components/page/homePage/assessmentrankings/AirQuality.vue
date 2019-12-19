<template>
    <div>
        <div style="margin-top: 30px">
            <span >时间范围</span>
            <template>
                <el-select v-model="value" placeholder="请选择" style="margin-left: 10px">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <div class="table-data-right" style="margin-left: 1100px">
                    <ul class="online-states">
                        <li><i class="online-state is-you"></i><span>优</span><span style="margin-left: 30px">{{oneSelevl}}天</span><span class="text-primary"></span></li>
                        <li><i class="online-state is-qing"></i><span>轻微</span><span style="margin-left: 30px">{{treeSelevl}}天</span><span class="text-primary"></span></li>
                        <li><i class="online-state is-chong"></i><span>重度</span><span style="margin-left: 30px">{{fiveSelevl}}天</span><span class="text-primary"></span></li>
                        <li><i class="online-state is-wu"></i><span>无数据:</span><span style="margin-left: 30px">{{noData}}天</span><span class="text-primary"></span></li>
                    </ul>
                </div>
                <div style="margin-top: -5px">
                    <span style="margin-left: 900px">2019年全年统计</span>
                </div>

                <div class="table-data-right" style="margin-left: 1100px;margin-top: -20px">
                    <ul class="online-states">
                        <li><i class="online-state is-liang"></i><span>良</span><span style="margin-left: 30px">{{twoSelevl}}天</span><span class="text-primary"></span></li>
                        <li><i class="online-state is-zhong" style="margin-left: 7.5px"></i><span>中度</span><span style="margin-left: 30px">{{fourSelevl}}天</span><span class="text-primary"></span></li>
                        <li><i class="online-state is-yang"></i><span>严重</span><span style="margin-left: 30px">{{sixSelevl}}天</span><span class="text-primary"></span></li>
                        <li><span>共计:</span><span style="margin-left: 30px">{{totalDay}}天</span><span class="text-primary"></span></li>

                    </ul>
                </div>
                <div style="margin-top: -22px">
                    <span >空气指标</span> <span style="margin-left: 10px">AQI</span><span style="margin-left: 20px">PM10</span><span style="margin-left: 20px">PM2.5</span>
                    <span style="margin-left: 20px">NO2</span><span style="margin-left: 20px">CO</span>
                </div>
            </template>
        </div>
<!------------------------------------------------------------------->
        <div class="calendar-box">
            <div class="calendar-head">
                <div class="calendar-tit">一月</div>
            </div>
            <div class="calendar-body">
                <table class="calendar-table">
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
                    <tr v-for="(dayobject,index) in days" v-if="index < fiveOrSix">
                        <td>
                            <div :class="days[(index*7)].itemDayClass">
                                <div   class="calendar-day-num">{{days[(index*7)].day.getDate() }}</div>
                                <div :class="days[(index*7)].dataStatusClass">
                                    {{days[(index*7)].auditName}}
                                </div>
                            </div>
                        </td>
                        <td>
                            <div :class="days[(index*7 + 1)].itemDayClass">
                                <div  class="calendar-day-num">{{days[(index*7 +1)].day.getDate() }}</div>
                                <div  :class="days[(index*7 +1)].dataStatusClass">
                                    {{days[(index*7 +1)].auditName}}
                                </div>
                            </div>
                        </td>
                        <td>
                            <div :class="days[(index*7 + 2)].itemDayClass">
                                <div   class="calendar-day-num">{{days[(index*7 + 2)].day.getDate() }}</div>
                                <div :class="days[(index*7 +2)].dataStatusClass">
                                    {{days[(index*7 +2)].auditName}}
                                </div>
                            </div>
                        </td>
                        <td>
                            <div :class="days[(index*7 + 3)].itemDayClass">
                                <div   class="calendar-day-num">{{days[(index*7 + 3)].day.getDate() }}</div>
                                <div :class="days[(index*7 +3)].dataStatusClass">
                                    {{days[(index*7 +3)].auditName}}
                                </div>
                            </div>
                        </td>
                        <td>
                            <div :class="days[(index*7 + 4)].itemDayClass">
                                <div   class="calendar-day-num">{{days[(index*7 +4)].day.getDate() }}</div>
                                <div :class="days[(index*7 +4)].dataStatusClass">
                                    {{days[(index*7 +4)].auditName}}
                                </div>
                            </div>
                        </td>
                        <td>
                            <div :class="days[(index*7 + 5)].itemDayClass">
                                <div  class="calendar-day-num">{{days[(index*7 +5)].day.getDate() }}</div>
                                <div :class="days[(index*7 +5)].dataStatusClass">
                                    {{days[(index*7 +5)].auditName}}
                                </div>
                            </div>
                        </td>
                        <td>
                                <div :class="days[(index*7 +6)].itemDayClass">
                                <div   class="calendar-day-num">{{days[(index*7 +6)].day.getDate() }}</div>
                                <div :class="days[(index*7 +6)].dataStatusClass">
                                    {{days[(index*7 +6)].auditName}}
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div style="margin-left: 8px;margin-top: 5px;">
                <ul>
                <li>
                    <i class="online-state is-you"></i><span style="margin-left: 5px">优:</span><span style="margin-left: 7px">{{youDay}}天</span><span class="text-primary"></span>
                    <i class="online-state is-liang" style="margin-left: 28px"></i><span style="margin-left: 5px">良:</span><span style="margin-left: 7px">70天</span><span class="text-primary"></span>
                    <i class="online-state is-qing" style="margin-left: 28px"></i><span style="margin-left: 5px">轻微:</span><span style="margin-left: 7px">10天</span><span class="text-primary"></span>
                    </li>
                <li>
                    <i class="online-state is-zhong"></i><span style="margin-left: 5px">中度:</span><span style="margin-left: 7px">{{youDay}}天</span><span class="text-primary"></span>
                    <i class="online-state is-chong" style="margin-left: 14px"></i><span style="margin-left: 5px">重度:</span><span style="margin-left: 7px">70天</span><span class="text-primary"></span>
                    <i class="online-state is-yang" style="margin-left: 14px"></i><span style="margin-left: 5px">严重:</span><span style="margin-left: 7px">10天</span><span class="text-primary"></span>
                    </li>
                </ul>
            </div>
<!---------------------------------------------------------->


        </div>
    </div>
</template>

<script>
    import dataManagerCalendar from './DataManagerCalendar'
    export default {
        name: "AirQuality",
        data:function () {
            return{
                options: [{
                    value: '1',
                    label: '2018'
                }, {
                    value: '2',
                    label: '2019'
                }],
                value:'',
                /*-----*/
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
        mounted:function(){
            var date = new Date();
            this.nowTimeDay = date.getDate()-1;
            this.nowTimeMonth = date.getMonth() + 1;
            this.nowTimeYear = date.getFullYear();
            this.monthTime = date.format('yyyy-MM');
            // $('.calendar-box').slideDown();
            this.getDataDay();
            dataManagerCalendar(this);
        },
        methods: {
            //查询全年质量统计
            getDataDay: function () {
                let _this = this;
                let params = new URLSearchParams();
                params.append('year', "");
                params.append('month', "2019");
                params.append('pollutant', _this.pollutant);
                _this.$axios.post(
                    '/aircontrol/airassess/tCodHourdata/getHourdataByYear',params
                ).then(function (res) {
                    _this.oneSelevl=res.data["一级"];
                    _this.twoSelevl=res.data["二级"];
                    _this.treeSelevl=res.data["三级"];
                    _this.fourSelevl=res.data["四级"];
                    _this.fiveSelevl=res.data["五级"];
                    _this.sixSelevl=res.data["六级"];
                    _this.noData=res.data["无数据"];
                    _this.totalDay=res.data["总天数"];
                })
            },
            // 返回 类似 2016-01-02 格式的字符串
            formatDate: function (year, month, day) {
                var y = year;
                var m = month;
                if (m < 10) m = "0" + m;
                var d = day;
                if (d < 10) d = "0" + d;
                return y + "-" + m + "-" + d
            },
            pickPre: function (year, month) {
                var d = new Date(this.formatDate(year, month, 1));
                d.setDate(0);
                this.monthTime = d.format('yyyy-MM');
                dataManagerCalendar(this);
            },
            pickNext: function (year, month) {
                var d = new Date(this.formatDate(year, month, 1));
                d.setDate(35);
                this.monthTime = d.format('yyyy-MM');
                dataManagerCalendar(this);
            },

            loadDate(date,state){
                if(date.getTime()<new Date(new Date().format("yyyy-MM-dd")).getTime()) {
                    this.$emit("loadDate", date, state);
                }
            }
        },
        // created() {
        //     var date = new Date();
        //     this.nowTimeDay = date.getDate()-1;
        //     this.nowTimeMonth = date.getMonth() + 1;
        //     this.nowTimeYear = date.getFullYear();
        //
        //     this.monthTime = date.format('yyyy-MM');
        //     // $('.calendar-box').slideDown();
        //     this.getDataDay();
        //     dataManagerCalendar(this);
        // },
    }
</script>

<style scoped>

</style>