<template>
    <div class="main-con">
        <h1 style="color: #FFF;font-size: 20px;margin-left: 30px">{{tesx1}}</h1>
        <div style="width: 100% ; text-align:center;margin-top: 25px;height: 350px">
            <div id="myChart1" :style="{width: '90%', height: '300px',marginLeft:'5%'}"></div>
        </div>

        <h1 style="color: #FFF;font-size: 20px;margin-left: 30px;margin-top: 5px">该市重污染天气数统计（本年度与上年度同期对比）</h1>
        <div style="width: 100% ; text-align:center;margin-top: 25px;height: 350px">
            <div id="myChart2" :style="{width: '90%', height: '300px',marginLeft:'5%'}"></div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "gasAnalysis",
        data() {
            return {

                dateSet: [],
                furValueList: [],
                hisValueList: [],
                tesx1:"",
                tesx2:"",

                thisYearDataList: [],
                lastYearDataList: [],
                monthList: [],
                year: "",
                month: "",
            }
        },
        mounted() {
            this.getYearAndMonth();
            this.chart2();
        },
        methods: {

            getYearAndMonth() {
                var that = this;
                var myDate = new Date();
                that.year = myDate.getFullYear();

                this.chart1(myDate.getMonth() + 1);
                that.tesx1 = myDate.getMonth()+1 + '月重污染天气管控评估'
            },
            //获取数据  chart1  月历史数据  历史预测数据
            chart1(month) {
                let that = this;
                var url = '/aircontrol/airassess/codForecastDay/monthHisAndFurAnalysisEcharts';
                that.$axios.get(url, {
                    params: {}
                }).then(
                    function (res) {
                        if (res.code == 0) {
                            that.dateSet = res.data.dateSet
                            that.furValueList = res.data.furValueList
                            that.hisValueList = res.data.hisValueList
                            that.drowChart1(month)
                        }
                    }
                )
            },

            //获取数据  chart1  年历史数据  同比年历史数据
            chart2() {
                let that = this;
                var url = '/aircontrol/airassess/codForecastDay/yearsHisSequential';
                that.$axios.get(url, {
                    params: {}
                }).then(
                    function (res) {
                        if (res.code == 0) {

                            that.thisYearDataList = res.data.thisYearDataList
                            that.lastYearDataList = res.data.lastYearDataList
                            that.monthList = res.data.monthList
                            that.drowChart2()
                        }
                    }
                )
            },

            //获取数据  chart2

            drowChart1(month) {
                var that = this;
                var dateSet = that.dateSet
                var furValueList = that.furValueList
                var hisValueList = that.hisValueList
                var tesx = month + '月重污染天气管控评估'
                let myChart1 = this.$echarts.init(document.getElementById('myChart1'), 'skinUpp')
                myChart1.setOption({
                    title: {
                        text: "",
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        x: 'right',
                        data: ['预测AQI', '实际AQI']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        /*feature: {
                            saveAsImage: {}
                        }*/
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: dateSet,
                        "splitLine": {
                            "show": false
                        }
                    },
                    yAxis: {
                        type: 'value',

                    },
                    series: [
                        {
                            name: '预测AQI',
                            type: 'line',
                            data: furValueList,
                            areaStyle: {
                                normal: {
                                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(58,187,252,.5)'
                                    },  {
                                        offset: 0.95,
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
                            name: '实际AQI',
                            type: 'line',
                            data: hisValueList,
                            areaStyle: {
                                normal: {
                                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(25,255,199,.5)'
                                    }, {
                                        offset: 0.95,
                                        color: 'rgba(255,255,255,0.00)'
                                    }, {
                                        offset: 1,
                                        color: 'rgba(255,255,255,0.00)'
                                    }], false),
                                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                                    shadowBlur: 10
                                }
                            },
                        },
                    ]
                })
            },
            drowChart2() {
                var that = this;
                var thisYearDataList = that.thisYearDataList
                var lastYearDataList = that.lastYearDataList
                var monthList = that.monthList
                let myChart2 = this.$echarts.init(document.getElementById('myChart2'), 'skinUpp')
                myChart2.setOption({
                    title: {

                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        x: 'right',
                        data: ['今年', '去年同期']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        /*feature: {
                            saveAsImage: {}
                        }*/
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: monthList,
                        "splitLine": {
                            "show": false
                        }
                    },
                    yAxis: {
                        type: 'value',
                        minInterval: 1,
                    },
                    series: [
                        {
                            name: '今年',
                            type: 'line',
                            data: thisYearDataList,
                            areaStyle: {
                                normal: {
                                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(58,187,252,.5)'
                                    },  {
                                        offset: 0.8,
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
                            name: '去年同期',
                            type: 'line',
                            data: lastYearDataList,
                            areaStyle: {
                                normal: {
                                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(25,255,199,.5)'
                                    }, {
                                        offset: 0.8,
                                        color: 'rgba(255,255,255,0.00)'
                                    }, {
                                        offset: 1,
                                        color: 'rgba(255,255,255,0.00)'
                                    }], false),
                                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                                    shadowBlur: 10
                                }
                            },
                        },
                    ]
                })
            },
        }
    }
</script>

<style scoped>

</style>