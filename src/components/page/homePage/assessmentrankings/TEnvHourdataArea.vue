<template>

    <div class="main-con hei-full" style="left: 0;padding:0">
        <div class="panel-default" >
            <div class="panel-bd pd-lg">
                <ul class="filter-box" style="padding-left: 30px">
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
                                <button type="button" @click="getWeeK" :class="butClass==1?'el-button el-button--primary':'el-button'"><!----><!----><span>周</span></button>
                                <button type="button" @click="yueDtae" :class="butClass==2?'el-button el-button--primary':'el-button'"><!----><!----><span>月</span></button>
                                <button type="button" @click="getYear" :class="butClass==3?'el-button el-button--primary':'el-button'"><!----><!----><span>年</span></button>
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
            </div>
            <!--<div class="pdl-lgest" style="padding-top: 20px">
                <span style="margin-left: 0px">时间范围</span>
                <span style="margin-left: 0px"><el-button :class="butClass==1?'el-button el-button&#45;&#45;primary':'el-button el-button&#45;&#45;info'" type="button" @click="getWeeK()">周</el-button></span>
                <span style="margin-left: 0px"><el-button :class="butClass==2?'el-button el-button&#45;&#45;primary':'el-button el-button&#45;&#45;info'" type="button" @click="yueDtae">月</el-button></span>
                <span style="margin-left: 0px"><el-button :class="butClass==3?'el-button el-button&#45;&#45;primary':'el-button el-button&#45;&#45;info'" type="button" @click="getYear">年</el-button></span>
                <span class="demonstration" style="margin-left: 25px">自定义</span>
                <el-date-picker style="margin-left: 5px"
                                v-model="daytime"
                                type="daterange"
                                range-separator="～"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期" @change="chage()" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
                </el-date-picker>
            </div>-->

            <div class="pdl-lgest" style="padding-top: 10px">
                <el-tabs v-model="editableTabsValue" style="margin-top: 10px;padding-right: 40px" >
                    <el-tab-pane

                            key="1"
                            label="区县排名"
                            name="1">
                        <RegionRanking ref="RegionRanking"></RegionRanking>
                    </el-tab-pane>
                    <el-tab-pane

                            key="2"
                            label="末端网格考核"
                            name="2">
                        <GridRanking ref="GridRanking"></GridRanking>
                    </el-tab-pane>
                    <el-tab-pane

                            key="3"
                            label="部门协调考核"
                            name="3">
                        <UnitRanking ref="UnitRanking"></UnitRanking>
                    </el-tab-pane>
                </el-tabs>
            </div>

        </div>


    </div>
</template>

<script>
import  RegionRanking from './RegionRanking'
import  GridRanking from './GridRanking'
import  UnitRanking from './UnitRanking'
    export default {
        name: "TEnvHourdataArea",
        components:{RegionRanking,GridRanking,UnitRanking},
        data:function(){
            return{
                daytime:'',
                editableTabsValue: '1',
                editableTabs: [{
                    title: '区县排名',
                    name: '1',
                    // content: this.tableData,
                }, {
                    title: '末端网格考核',
                    name: '2',
                    // content: this.tableData
                },
                    {
                        title: '部门协调考核',
                        name: '3',
                        // content: this.tableData
                    }],
                tabIndex: 2,
                tableData:[],
                butClass:1
            }

        },
        mounted:function () {
            this.getWeeK();
            // this.$emit("initPage")
        },
        methods:{
            chage:function () {
                let daytime = this.daytime;
                this.$refs.RegionRanking.creates(daytime);
                this.$refs.GridRanking.creates(daytime);
                this.$refs.UnitRanking.creates(daytime);

            },
            //月日期格式化
            yueDtae(){
                this.butClass=2;
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
                this.$refs.RegionRanking.creates(daytime);
                this.$refs.GridRanking.creates(daytime);
                this.$refs.UnitRanking.creates(daytime);
            },

            //7天和30天日期格式化
            selectTime(num){
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * num);
                this.daytime=[start.format('yyyy-MM-dd'),end.format('yyyy-MM-dd')];
                let daytime = this.daytime;
                this.$refs.RegionRanking.creates(daytime);
                this.$refs.GridRanking.creates(daytime);
                this.$refs.UnitRanking.creates(daytime);
            },
            //获取当前周时间
        getWeeK:function () {
                        this.butClass=1;
                        let new_Date = new Date();
                        let timesStamp = new_Date.getTime();
                        let currenDay = new_Date.getDay();
                        let dates = [];
                        for (let i = 0; i < 7; i++) {
            dates.push(new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7)).format("yyyy-MM-dd").replace(/[年月]/g).replace(/[日上下午]/g));
                        }
             this.daytime=[dates[0],dates[6]];
            let daytime = this.daytime;
            this.$refs.RegionRanking.creates(daytime);
            this.$refs.GridRanking.creates(daytime);
            this.$refs.UnitRanking.creates(daytime);
                    },

            //查询年条件
        getYear:function () {
            this.butClass=3;
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
            let daytime = this.daytime;
            this.$refs.RegionRanking.creates(daytime);
            this.$refs.GridRanking.creates(daytime);
            this.$refs.UnitRanking.creates(daytime);
            }
        }
    }
</script>

<style >
    .el-tabs__item {
        font-size: 21px;
        color: #119B8D;

    }
    .el-tabs__item {
        font-size: 30px;
        color: #93AECE;
    }
    .el-tabs__item:hover{
        color: #19FFC7;
    }
    .el-tabs__item.is-active{
        color: #19FFC7;
    }
    .el-tabs__active-bar{
        border-bottom: 2px solid #19FFC7;
    }

</style>
