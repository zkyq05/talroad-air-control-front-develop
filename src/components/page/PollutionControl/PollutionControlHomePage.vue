<template>
    <div class="main-con">
        <div class="panel-default">
            <div class="panel-hd text-blger">
                <div class="panel-tit">污染源监控</div>
                <div class="panel-right">
                    <ul class="filter-box">
                        <li class="filter-item">
                            <div class="filter-label">选择月份</div>
                            <div class="filter-con">
                                <div class="el-select"><!---->
                                    <div class="el-input el-input--suffix"><!---->
                                        <!--<input type="text" readonly="readonly" autocomplete="off" value="2019/07"
                                                placeholder="请选择" class="el-input__inner">-->
                                        <el-date-picker
                                                @change="change"
                                                v-model="date"
                                                type="month"
                                                placeholder="选择月">
                                        </el-date-picker>

                                        <!----><span class="el-input__suffix"><span
                                                class="el-input__suffix-inner"><i
                                                class="el-select__caret el-input__icon el-icon-arrow-up"></i><!---->
                                            <!----><!----><!----><!----></span><!----></span><!----><!----></div>
                                    <div class="el-select-dropdown el-popper"
                                         style="display: none; min-width: 193px;">
                                        <div class="el-scrollbar" style="">
                                            <div class="el-select-dropdown__wrap el-scrollbar__wrap"
                                                 style="margin-bottom: -15px; margin-right: -15px;">
                                                <ul class="el-scrollbar__view el-select-dropdown__list"><!---->
                                                    <li class="el-select-dropdown__item"><span>Option1</span></li>
                                                    <li class="el-select-dropdown__item"><span>Option2</span></li>
                                                    <li class="el-select-dropdown__item"><span>Option3</span></li>
                                                    <li class="el-select-dropdown__item"><span>Option4</span></li>
                                                    <li class="el-select-dropdown__item"><span>Option5</span></li>
                                                </ul>
                                            </div>
                                            <div class="el-scrollbar__bar is-horizontal">
                                                <div class="el-scrollbar__thumb"
                                                     style="transform: translateX(0%);"></div>
                                            </div>
                                            <div class="el-scrollbar__bar is-vertical">
                                                <div class="el-scrollbar__thumb"
                                                     style="transform: translateY(0%);"></div>
                                            </div>
                                        </div><!----></div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 统计数目 -->
        <div class="panel-default mt-lg">
            <div class="panel-bd pd-lg">
                <ul class="analysis-list">
                    <li>
                        <div class="analysis-text">
                            <span class="analysis-tit">超标次数</span>
                            <div class="circles bg-level4"></div>
                        </div>
                        <div class="analysis-num color-level1">{{alarmDataMonthPoliceList.overCount}}</div>
                    </li>
                    <li>
                        <div class="analysis-text">
                            <span class="analysis-tit">超标率</span>
                            <div class="circles bg-level2"></div>
                        </div>
                        <div class="analysis-num color-level2">{{alarmDataMonthPoliceList.cbLv}}<span class="text-value">%</span></div>
                    </li>
                    <li>
                        <div class="analysis-text">
                            <span class="analysis-tit">排放总量</span>
                            <div class="circles bg-level4"></div>
                        </div>
                        <div class="analysis-num color-level4">{{alarmDataMonthPoliceList.outAmount}}</div>
                    </li>
                    <li>
                        <div class="analysis-text">
                            <span class="analysis-tit">主要超标污染物</span>
                            <div class="circles" style="display: none;"></div>
                        </div>
                        <div class="analysis-num text-default">{{alarmDataMonthPoliceList.mainPol}}<span class="text-value"></span></div>
                    </li>
                    <li>
                        <div class="analysis-text">
                            <span class="analysis-tit">主要超标区域</span>
                            <div class="circles" style="display: none;"></div>
                        </div>
                        <div class="analysis-num text-brighter">{{alarmDataMonthPoliceList.mainReg}}</div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 统计内容 -->
        <div class="el-row mt-lg" style="margin-left: -15px; margin-right: -15px;">
            <div class="el-col el-col-12" style="padding-left: 15px; padding-right: 15px;">
                <div class="panel-default">
                    <div class="panel-hd">
                        <h2 class="panel-tit"><i class="icon icon-zhexiantu"></i>{{year}}年{{month}}月警报超标趋势</h2>
                    </div>
                    <div class="panel-bd" >
                        <div class="chart-item" id="myChart" style="height: 210px;width: 100%"></div>
                    </div>
                </div>
                <div class="panel-default mt-lg">
                    <div class="panel-hd">
                        <h2 class="panel-tit"><i class="icon icon-biaoge"></i>{{year}}年{{month}}月污染物排放总量</h2>
                    </div>
                    <el-table :data="tableData1" class="table-default01 table-lg " stripe="true" height="200px">
                        <el-table-column type="index" label="序号"  align="center" width="70px"></el-table-column>
                        <el-table-column prop="pollutantName" sortable label="主要排放物" align="center"></el-table-column>
                        <el-table-column prop="uu" sortable label="单位"  align="center" ></el-table-column>
                        <el-table-column prop="sumAmount" sortable label="排放总量" align="center"></el-table-column>

                    </el-table>
                </div>
            </div>
            <div class="el-col el-col-12" style="padding-left: 15px; padding-right: 15px;">
                <div class="panel-default" >
                    <div class="panel-hd">
                        <h2 class="panel-tit"><i class="icon icon-biaoge"></i>{{year}}年{{month}}月企业超标率</h2>
                    </div>
                    <el-table :data="tableData2" class="table-default01 table-lg" height="510" style="text-align: left;" stripe="true">
                        <el-table-column type="index" label="序号" align="center"  width="90px"></el-table-column>
                        <el-table-column prop="eName" label="企业名称" width="240px"  align="left"></el-table-column>
                        <el-table-column prop="coun"  label="传输条数"  align="left"  ></el-table-column>
                        <el-table-column prop="overcount"  label="超标条数" align="left" ></el-table-column>
                        <el-table-column prop="per" sortable label="超标率（%）" width="140px" align="left" ></el-table-column>
                        <el-table-column prop="pollutantName"  label="主要超标项" align="left"></el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PollutionControlHomePage",

        data() {
            return {
                month:new Date().getMonth() + 1,
                year:'',
                date:"2019-09",
                tableData1:[],
                tableData2:[],
                echartsOverList:[],
                echartsDateList:[],
                echartsChangList:[],
                echartschangeList:[],
                alarmDataMonthPoliceList:{
                    outAmount:"160541.826",
                    "overCount": 65,
                    "mainReg": "昌平区",
                    "allCount": 2531,
                    "mainPol": "COD",
                    cbLv:'0',
                },
                years: [],
                months: [{
                    value: '01',
                    label: '1月'
                }, {
                    value: '02',
                    label: '2月'
                }, {
                    value: '03',
                    label: '3月'
                }, {
                    value: '04',
                    label: '4月'
                }, {
                    value: '05',
                    label: '5月'
                }, {
                    value: '06',
                    label: '6月'
                }, {
                    value: '07',
                    label: '7月'
                }, {
                    value: '08',
                    label: '8月'
                }, {
                    value: '09',
                    label: '9月'
                }, {
                    value: '10',
                    label: '10月'
                }, {
                    value: '11',
                    label: '11月'
                }, {
                    value: '12',
                    label: '12月'
                }],

            };
        },

    mounted(){

        this.getYearList();
        this.querySearch();
        this.queryEcharts();
        this.queryOutAmount();
        this.alarmDataoEnt();
        this.initNoll();

    },
    methods:{

         change(){
             this.queryEcharts();
             this.querySearch();
             this.queryOutAmount();
             this.alarmDataoEnt();
         }   ,

        initNoll(){
        },
        //     动态 年years列标
        getYearList(){
        var that = this;
        var myDate=new Date();
        that.year = myDate.getFullYear() ;
        that.month = myDate.getMonth()+1;
        that.date = myDate.getFullYear() +'-'+ (myDate.getMonth()+1)
        var startYear=myDate.getFullYear()-10;
        var endYear=myDate.getFullYear()+10
        for(var i=startYear;i<=endYear;i++){
            var option = new Option();
            that.$set( option, 'label', i )
            that.$set( option, 'value', i)
            that.years.push(option);
        }
    },

        //    摘要数据
        querySearch() {
            let that = this;
            var date = new Date(that.date)
            var year = date.getFullYear();
            var month =date.getMonth()+ 1;
            that.year = year;
            that.month = month;
            if(month<10){
                month = '0'+month
            }
            var url = '/aircontrol/airassess/codAlarmData/polMainAbstract';
            that.$axios.get(url,{params:{
                    "year":year,
                    "month":month
                }}).then(
                function (res) {
                    if(res.code == 0){
                            that.alarmDataMonthPoliceList.outAmount=res.data[0].outAmount;
                            that.alarmDataMonthPoliceList.overCount= res.data[0].overCount;
                            that.alarmDataMonthPoliceList.mainReg= res.data[0].mainReg;
                            that.alarmDataMonthPoliceList.allCount= res.data[0].allCount;
                            that.alarmDataMonthPoliceList.mainPol= res.data[0].mainPol;
                            that.alarmDataMonthPoliceList.cbLv= res.data[0].cbLv;
                    }
                }
            )
        },
        //  echarts数据

        queryEcharts() {
            let that = this;
            var date = new Date(that.date)
            var year = date.getFullYear();
            var month =date.getMonth()+ 1;
            if(month<10){
                month = '0'+month
            }
            var url = '/aircontrol/airassess/codAlarmData/alarmDataMonthPolice';
            that.$axios.get(url,{params:{
                    "year":year,
                    "month":month
                }}).then(
                function (res) {
                    if(res.code == 0){
                        that.echartsOverList = res.data.overNumList;
                        that.echartsDateList = res.data.dateList;
                        that.echartschangeList = res.data.changeList;
                        that.drawLine();
                    }
                }
            )
        },
        //数据3
        queryOutAmount() {
            let that = this;
            var date = new Date(that.date)
            var year = date.getFullYear();
            var month =date.getMonth()+ 1;
            if(month<10){
                month = '0'+month
            }
            var url = '/aircontrol/airassess/entStaGasDaydata/pollutantOutAmountCount';
            that.$axios.get(url,{params:{
                    "year":year,
                    "month":month
                }}).then(
                function (res) {
                    if(res.code == 0){
                        for(var i = 0 ;i < res.data.length; i++){
                            that.$set(res.data[i],'uu',"吨")
                        }
                        that.tableData1 = res.data
                    }
                }
            )
        },


        //数据4

        alarmDataoEnt() {
            let that = this;
            var date = new Date(that.date)
            var year = date.getFullYear();
            var month =date.getMonth()+ 1;
            if(month<10){
                month = '0'+month
            }
            var url = '/aircontrol/airassess/codAlarmData/alarmDataoEntAndOver';
            that.$axios.get(url,{params:{
                    "year":year,
                    "month":month
                }}).then(
                function (res) {
                    if(res.code == 0){
                        that.tableData2 = res.data
                    }
                }
            )
        },

    //echarts
        drawLine() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('myChart'), 'skinUpp')
            // 绘制图表
            var echartsDateList = this.echartsDateList;
            var echartsOverList = this.echartsOverList;
            var echartschangeList = this.echartschangeList;

            myChart.setOption(
                {
                    //图例
                    legend: {
                        data: ['超标报警', '突变预警'],
                    },
                    //提示框
                    tooltip : {
                        trigger: 'axis',
                    },
                    grid : {

                    },
                    // x轴
                    xAxis: {
                        type: 'category',
                        data: echartsDateList,
                        splitLine:{
                            show:false
                        },
                        boundaryGap:false,
                    },
                    // y轴
                    yAxis: {
                        type: 'value',
                        axisLabel: {

                        },

                    },
                    // 数据
                    series : [
                        {
                            name: '超标报警',
                            type: 'line',
                            data:  echartsOverList,
                            smooth: false,
                            symbolSize:0,
                            areaStyle: {
                                normal: {
                                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(58,187,252,.5)'
                                    },  {
                                        offset: 0.6,
                                        color: 'rgba(255,255,255,0.00)'
                                    },{
                                        offset: 1,
                                        color: 'rgba(255,255,255,0.00)'
                                    }], false),
                                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                                    shadowBlur: 10
                                }
                            },
                        },
                        {
                            name: '突变预警',
                            type: 'line',
                            data: echartschangeList,
                            smooth: false,
                            symbolSize:0,
                            areaStyle: {
                                normal: {
                                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(25,255,199,.5)'
                                    }, {
                                        offset: 0.6,
                                        color: 'rgba(255,255,255,0.00)'
                                    }, {
                                        offset: 1,
                                        color: 'rgba(255,255,255,0.00)'
                                    }], false),
                                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                                    shadowBlur: 10
                                }
                            },
                        }
                    ],
                }
               );
            $(window).on('resize',function(){
                myChart.resize();
            })
        },

    },

    }

</script>

<style scoped>
.td{
    width: 200px;
}

</style>