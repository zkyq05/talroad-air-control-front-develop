<template>
    <div class="main-con">
        <div class="panel-default" style="padding-top: 0px">
            <div class="panel-bd pd-lg">
                <ul class="filter-box">
                    <li class="filter-item">
                        <div class="filter-label">时间范围</div>
                        <!--<div class="filter-con">
                            <el-date-picker
                                    type="year"
                                    format="yyyy" value-format="yyyy"
                                    v-model="nowTimeYear"
                                    @change="chage"
                                    placeholder="选择年">
                            </el-date-picker>
                        </div>-->
                        <div class="filter-row">
                            <div class="el-button-group">
                                <button type="button" @click="selectTime(0)" :class="butClass!=0?'el-button':'el-button el-button--primary'"><!----><!----><span>今日</span></button>
                                <button type="button" @click="selectTime(7)" :class="butClass!=7?'el-button':'el-button el-button--primary'"><!----><!----><span>最近7日</span></button>
                                <button type="button" @click="selectTime(30)" :class="butClass!=30?'el-button':'el-button el-button--primary'"><!----><!----><span>最近30日</span></button>
                            </div>
                            <span class="demonstration" style="margin-left: 25px">自定义</span>
                            <el-date-picker style="margin-left: 5px"
                                            v-model="daytime"
                                            type="daterange"
                                            range-separator="～"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期" @change="chage()" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
                            </el-date-picker>

                        </div>
                    </li>
                </ul>
                <ul class="filter-box">
                    <li class="filter-item">
                        <div class="filter-label">空气指标</div>
                        <div class="filter-con">
                            <div class="el-button-group">
                                <button type="button" id="aqi" @click="pollutantChange('AQI')" :class="butClass1!='AQI'?'el-button':'el-button el-button--primary'"><!----><!----><span>AQI</span></button>
                                <button type="button" @click="pollutantChange('PM10')" :class="butClass1!='PM10'?'el-button':'el-button el-button--primary'"><!----><!----><span>PM<i class="text-value">10</i></span></button>
                                <button type="button" @click="pollutantChange('PM2.5')" :class="butClass1!='PM2.5'?'el-button':'el-button el-button--primary'"><!----><!----><span>PM<i class="text-value">2.5</i></span></button>
                                <button type="button" @click="pollutantChange('SO2')" :class="butClass1!='SO2'?'el-button':'el-button el-button--primary'"><!----><!----><span>SO<i class="text-value">2</i></span></button>
                                <button type="button" @click="pollutantChange('NO2')" :class="butClass1!='NO2'?'el-button':'el-button el-button--primary'"><!----><!----><span>NO<i class="text-value">2</i></span></button>
                                <button type="button" @click="pollutantChange('CO')" :class="butClass1!='CO'?'el-button':'el-button el-button--primary'"><!----><!----><span>CO</span></button>
                                <button type="button" @click="pollutantChange('O3')" :class="butClass1!='O3'?'el-button':'el-button el-button--primary'"><!----><!----><span>O<i class="text-value">3</i></span></button></div>
                        </div>
                    </li>
                </ul>
            </div>
            <!--<span style="margin-left: 10px">时间范围</span>
            <span style="margin-left: 0px"><el-button type="text" @click="selectTime(0)">今日</el-button></span>
            <span style="margin-left: 0px"><el-button type="text" @click="selectTime(7)">最近7日</el-button></span>
            <span style="margin-left: 0px"><el-button type="text" @click="selectTime(30)">最近30日</el-button></span>
            <span class="demonstration" style="margin-left: 25px">自定义</span>
            <el-date-picker style="margin-left: 5px"
                            v-model="daytime"
                            type="daterange"
                            range-separator="～"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期" @change="chage()" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
            </el-date-picker>-->
        </div>
        <!--<div class="panel-default" style="padding-bottom: 5px">
            <span style="margin-left: 10px">空气指标</span>
            <span ><el-button type="text" @click="pollutantChange('AQI')">AQI</el-button></span>
            <span ><el-button type="text" @click="pollutantChange('PM10')">PM10</el-button></span >
            <span ><el-button type="text" @click="pollutantChange('PM2.5')">PM2.5</el-button></span>
            <span ><el-button type="text" @click="pollutantChange('SO2')">SO2</el-button></span>
            <span ><el-button type="text" @click="pollutantChange('NO2')">NO2</el-button></span>
            <span ><el-button type="text" @click="pollutantChange('CO')">CO</el-button></span>
            <span ><el-button type="text" @click="pollutantChange('O3')">O3</el-button></span>
        </div>-->
        <div style="margin-top: 30px;height: 700px;"   id="charts-history">

        </div>
    </div>
</template>

<script>
    import waterChartQsjk from '../echartsUnit/WaterChartQsjk';
    export default {
        name: "CityHistoryAnalyze",
        components:{waterChartQsjk},
        data:function(){
            return{
                num:1,
                butClass:1,
                butClass1:'AQI',
                daytime:['',''],
                tableData:[],
                region:this.AppConfig.appInfo.regionCode,
                type:"",
                pollutantType:"AQI",
                year:new Date().getFullYear()+"年",
            }
        },
        mounted:function(){
            let _this =this;
            _this.type="日";
            this.getYear();
        },
        methods:{

            //初始化查询列表 默认第一页
            initPage: function () {
                var _this = this;
                var self = this;
                var params = new URLSearchParams();
                _this.$refs.paginationObj.cur_page = 1;
                params.append("pageNum", _this.$refs.paginationObj.cur_page);
                params.append("pageSize", _this.$refs.paginationObj.cur_pageSize);
                params.append("beginTime", _this.daytime[0]);
                params.append("endTime", _this.daytime[1]);
                this.$axios.post(
                    '/aircontrol/airassess/codReport/getRgionAreaByDayTime', params
                ).then(function (res) {
                    self.tableData = res.data.records;
                    _this.$refs.paginationObj.count = res.data.total;
                })
            },
            chage:function () {
                let _this =this;
                _this.year=this.daytime[0]+'～'+this.daytime[1]+"日";
                let daytime = this.daytime;
                if(daytime[0]==daytime[1]){
                    _this.type="小时";
                }else{
                    _this.type="日";
                }
                waterChartQsjk(this);
            },

            //月日期格式化
            yueDtae(){
                var now = new Date(); //当前日期
                var nowMonth = now.getMonth(); //当前月
                var nowYear = now.getFullYear(); //当前年
                //本月的开始时间
                var monthStartDate = new Date(nowYear, nowMonth, 1);
                //本月的结束时间
                var monthEndDate = new Date(nowYear, nowMonth+1, 0);
                /* var timeStar=Date.parse(monthStartDate)/1000;//s
                 var timeEnd=Date.parse(monthEndDate)/1000;//s*/
                this.daytime=[monthStartDate.format("yyyy-MM-dd"),monthEndDate.format('yyyy-MM-dd')];
                let daytime = this.daytime;
                this.initPage();
            },

            //7天和30天日期格式化
            selectTime(num){

                let _this=this;
                _this.butClass=num;
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * num);
                this.daytime=[start.format('yyyy-MM-dd'),end.format('yyyy-MM-dd')];
                if(num==0){
                    _this.type="小时";
                    _this.year=this.daytime[0]+"日";
                }else{
                    _this.type="日";
                    _this.year=this.daytime[0]+'～'+this.daytime[1]+"日";
                }
                waterChartQsjk(this);
            },
//查询年条件
            getYear:function () {
                let firstDay = new Date();
                firstDay.setDate(1);
                firstDay.setMonth(0);
                let lastDay = new Date();
                lastDay.setFullYear(lastDay.getFullYear()+1);
                lastDay.setDate(0);
                lastDay.setMonth(-1);
                firstDay = firstDay.format("yyyy-MM-dd");
                lastDay = lastDay.format("yyyy-MM-dd");
                this.daytime=[firstDay,lastDay];
                waterChartQsjk(this);
            },
            pollutantChange:function (str) {
                let _this=this;
                _this.butClass1 = str;
                _this.pollutantType=str;
                waterChartQsjk(this);
            }

        }

    }
</script>

<style scoped>
.sp.is-th{margin-left: 25px}
</style>
