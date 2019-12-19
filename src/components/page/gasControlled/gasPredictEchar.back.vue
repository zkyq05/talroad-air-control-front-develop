<template>
    <div class="main-con">
        <div style="width: 100% ; text-align:center;height: 280px">
            <div id="myChart2" :style="{width: '800px', height: '270px'}"></div>
        </div>

        <div>
            <div style=" text-align:center;height: 100%;float: left">
                <div id="myChart" :style="{width: '800px', height: '400px'}"  ></div>
            </div>
            <div style="width: 33%;float: left;padding-top: 50px">
                <h3 style="text-align: center;margin-bottom: 40px" >{{dayData.Time}}</h3>
                <div style="float: left;width: 350px">
                    <div > AQI</div>
                    <div>{{dayData.aqi}}</div>
                    <span>首要污染物</span><span>  {{dayData.mainPollName}}</span>
                </div>

                <!--  温度  湿度  暂时删掉  历史数据暂无字段-->
          <!-- <div style="float: left;width: 100px">
                    <div > 温度</div>
                    <div>{{dayData.humidity}}℃</div>
                    <span>湿度</span><span> {{dayData.temperature}}</span>
                </div>
                -->
                <div style="margin-top: 150px">
                    <div style="float: left;width: 80px">
                        <div > PM2.5</div>
                        <div>{{dayData.PM25}}</div>
                    </div>
                    <div style="float: left;width: 80px">
                        <div >PM10</div>
                        <div>{{dayData.PM10}}</div>
                    </div>
                    <div style="float: left;width: 80px">
                        <div > NO2</div>
                        <div>{{dayData.NO2}}</div>
                    </div>
                    <div style="float: left;width: 80px">
                        <div > SO2</div>
                        <div>{{dayData.SO2}}</div>
                    </div>
                    <div style="float: left;width: 80px">
                        <div > CO</div>
                        <div>{{dayData.CO}}</div>
                    </div>
                    <div style="float: left;width:80px">
                        <div > O3</div>
                        <div>{{dayData.O3}}</div>
                    </div>

                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "gasPredictEchar",
        data(){
            return{
                dayList:[],
                aqiList:[],
                dataList:[],
                dayData:{},
                levelLise:[],
            }
        },
        mounted() {
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
                var url = '/api/codForecastDay/forecast7Day';
                that.$axios.get(url,{params:{
                    }}).then(
                    function (res) {
                        if(res.code == 0){
                            that.dayList = res.data.dayList;
                            that.aqiList = res.data.aqiList;
                            that.drowZhu();
                        }
                    }
                )
            },

            chart2(year,month) {
                let that = this;
                var url = '/api/codForecastDay/forecast30Day';
                that.$axios.get(url,{params:{
                    }}).then(
                    function (res) {
                        if(res.code == 0){
                            that.dataList = res.data.dataList;
                            that.levelLise = res.data.levelLise;
                            that.drawLine(year,month);
                        }
                    }
                )
            },
            //日历点击查询
            gqueryOneDay(dayStr){
                let that = this;
                var url = '/api/codForecastDay/queryByDate';
                that.$axios.get(url,{params:{
                        "dayStr":dayStr
                    }}).then(
                    function (res) {
                        if(res.code == 0){
                            that.dayData = res.data;
                           // alert(JSON.stringify(that.dayData))
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
                let myChart2 = this.$echarts.init(document.getElementById('myChart2'))
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
                                axisTick: {
                                    alignWithLabel: true
                                }
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value'
                            }
                        ],
                        series : [
                            {
                                name:'AQI',
                                type:'bar',
                                barWidth: '60%',
                                data:that.aqiList
                            }
                        ]
                    })
            },

            //日历图
            drawLine(year,month) {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart'))
                // 绘制图表
                var cellSize = [40, 40];
                var pieRadius = 30;
                var that =this
                var range = year+'-'+month
                myChart.setOption({

                    tooltip: {
                        position: 'top',
                        formatter: function(params) {

                            var value = '<span>'+params.data[0]+'</span><br /><span  style="color:DeepSkyBlue;">:</span><span  style="color:'+params.color+';">'+ params.data[1];
                            return value;
                        }
                    },
                    /*visualMap: [{
                        min: 0,
                        max: 300,
                        calculable: true,
                        seriesIndex: [1],
                        orient: 'horizontal',
                        left: '10%',
                        bottom: 20,
                        opacity: 0.3
                    }],*/
                    visualMap: [{
                        calculable: true,
                        orient: "horizontal",
                        pieces:that.levelLise,
                        right: 20,
                        top: "top",
                        type: "piecewise",
                   }],

                    calendar: [
                        {
                            orient: 'vertical',
                            yearLabel: {
                                margin: 40
                            },
                            monthLabel: {
                                nameMap: 'cn',
                                margin: 20
                            },
                            dayLabel: {
                                firstDay: 1,
                                nameMap: 'cn'
                            },
                            cellSize: 50,
                            range: range,
                        },
                    ],

                    series: [{
                        type: 'heatmap',
                        coordinateSystem: 'calendar',
                        data: this.getVirtulData(year,month),
                        label: {
                            normal: {
                                show: true,
                                formatter: function (params) {
                                    return  that.$echarts.format.formatTime('dd', params.value[0]);
                                },
                                symbolSize: 1,
                                offset: [-cellSize[0] / 2 +10, -cellSize[1] / 2  +10],
                                textStyle: {
                                    color: '#000',
                                    fontSize: 14
                                }
                            }
                        },
                    }, {
                        type: 'heatmap',
                        coordinateSystem: 'calendar',
                        calendarIndex: 0,
                        data: this.getVirtulData(year,month)
                    }]
                });
                that.gqueryOneDay();
                myChart.on('click', function (params) {
                    //alert(JSON.stringify(params.data[0]))
                    that.gqueryOneDay(params.data[0])
                });
            },


        }
    }


</script>

<style scoped>

</style>