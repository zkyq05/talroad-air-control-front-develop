<template>
    <div id="content">
        <!-- 左侧 -->
        <div class="main-left"  style="left: 0px; top: 0px;">
            <HeaderToolButton></HeaderToolButton>
            <!-- 操作栏 -->
        </div>
        <div style="position: absolute;bottom: 60px;left: 20px;z-index: 10;top: 860px">
            <maplegend></maplegend>
        </div>
        <!-- 地图 -->
        <div class="main">
            <!-- 地图 -->
            <div  class="max-area">
                <MapComponent></MapComponent>
            </div>
            <div id="popUpDiv">
                <MapPopUp></MapPopUp>
            </div>
            <!-- 底部 -->
            <div class="main-bottom">
                <TimeSliderComponent></TimeSliderComponent>
            </div>
        </div>
        <!-- 右侧 -->
        <div class="main-right">
            <div class="params-box">
                <div class="params-item">
                    <div class="params-hd">
                        <LayerComponent></LayerComponent>
                    </div>
                </div>
            </div>
            <!-- 面板 -->
            <div class="tab-box" :style="kuandu">
                <div class="fold-toggle"  @click="tongjitu"><i class="icon icon-shang" style="height: 28px;font-size: 12px;cursor: pointer;text-align: center;"></i></div>
                <div class="tab-hd" :style="tongjitusuzhi">
                    <ul class="tab-head2">
                        <li :class="fenxiClick" ><a href="javascript:;" @click="analysis">分析</a></li>
                        <li :class="paicha"><a href="javascript:;" @click="paichaRecord">排查记录</a></li>
                    </ul>
                </div>
                <div class="tab-bd mt-sm" :style="tongjitusuzhi">
                    <!-- 分析 -->
                    <div class="tab-item" :style="fenxi">
                        <div class="panel">
                            <div class="target-box">
                                <div class="target-title">年度目标完成</div>
                                <table class="table-default">
                                    <thead>
                                    <tr>
                                        <th style="text-align: center"></th>
                                        <th style="text-align: center">目标</th>
                                        <th style="text-align: center">累计</th>
                                        <th style="text-align: center">剩余</th>
                                        <!--<th>完成情况</th>-->
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td  style="text-align: center">综合指数</td>
                                        <td class="Oswald" style="text-align: center">{{this.thisyear.composite}}</td>
                                        <td class="text-danger Oswald" style="text-align: center">{{this.cumulative.composite}}</td>
                                        <td class="Oswald" style="text-align: center">{{this.surplus.composite}}</td>
                                        <!--<td class="text-success">已完成</td>-->
                                    </tr>
                                    <tr>
                                        <td style="text-align: center">PM2.5</td>
                                        <td class="Oswald" style="text-align: center">{{this.thisyear.pm25}}</td>
                                        <td class="Oswald" style="text-align: center">{{this.cumulative.pm25}}</td>
                                        <td class="Oswald" style="text-align: center">{{this.surplus.pm25}}</td>
                                       <!-- <td class="text-success">已完成</td>-->
                                    </tr>
                                    <tr>
                                        <td style="text-align: center">PM10</td>
                                        <td class="Oswald" style="text-align: center">{{this.thisyear.pm10}}</td>
                                        <td class="text-warn Oswald" style="text-align: center">{{this.cumulative.pm10}}</td>
                                        <td class="Oswald" style="text-align: center">{{this.surplus.pm10}}</td>
                                       <!-- <td class="text-success">已完成</td>-->
                                    </tr>
                                    <tr>
                                        <td style="text-align: center">优良天</td>
                                        <td class="Oswald" style="text-align: center">{{this.thisyear.goodDays}}</td>
                                        <td class="text-danger Oswald" style="text-align: center">{{this.cumulative.goodDays}}</td>
                                        <td class="Oswald" style="text-align: center">{{this.surplus.goodDays}}</td>
                                        <!--<td class="text-will">未完成</td>-->
                                    </tr>
                                    <tr>
                                        <td style="text-align: center">重污染天</td>
                                        <td class="Oswald" style="text-align: center">{{this.thisyear.heavyDays}}</td>
                                        <td class="Oswald" style="text-align: center">{{this.cumulative.heavyDays}}</td>
                                        <td class="Oswald" style="text-align: center">{{this.surplus.heavyDays}}</td>
                                        <!--<td class="text-will">未完成</td>-->
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="panel mt-sm">
                            <div class="panel-hd">
                                <h2 class="panel-tit">目标任务分解</h2>
                            </div>
                            <div class="panel-bd">
                                <div class="chart-box" style="width:100%;">
                                    <div class="chart-item" id="chart01" style="height: 120px"></div>
                                </div>
                            </div>
                        </div>
                        <div class="panel mt-sm">
                            <div class="panel-hd">
                                <h2 class="panel-tit">首要污染物分析</h2>
                            </div>
                            <div class="panel-bd">
                                <div class="chart-box" style="width:100%;">
                                    <div class="chart-item" id="chart03" style="height: 140px"></div>
                                </div>
                            </div>
                        </div>
                        <!-- 重点污染区域 -->
                        <div class="panel mt-sm">
                            <div class="panel-hd">
                                <h2 class="panel-tit">重点污染区域</h2>
                            </div>
                            <div class="panel-bd">
                                <ul class="trend-names mt">
                                    <li :class="this.targetTodayAQI" @click="primaryArea('aqi')">AQI</li>
                                    <li :class="this.targetTodayPM25" @click="primaryArea('pm25')">PM<span class="text-sm">2.5</span></li>
                                    <li :class="this.targetTodayPM10" @click="primaryArea('pm10')">PM<span class="text-sm">10</span></li>
                                    <li :class="this.targetTodayNO" @click="primaryArea('no2')">NO<span class="text-sm">2</span></li>
                                    <li :class="this.targetTodayCO" @click="primaryArea('co')">CO</li>
                                    <li :class="this.targetTodaySO2" @click="primaryArea('so2')">SO<span class="text-sm">2</span></li>
                                    <li :class="this.targetTodayO3" @click="primaryArea('o3')">O<span class="text-sm">3</span></li>
                                </ul>
                                <div class="progress-list mt" id ="progress-item">



                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 排查记录 -->
                    <div class="tab-item" :style="paichajilu">
                        <div class="panel">
                            <table class="table-default table-lg">
                                <thead>
                                <tr>
                                    <th>时间</th>
                                    <th>排查对象/任务名称</th>
                                    <th>状态</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr  v-for="item in paichas">
                                    <td class="Oswald text-default">{{item.time}}</td>
                                    <td>
                                        <div class="text-bold"><div class="ellipsis w120">{{item.addressName}}</div></div>
                                        <div class="mt-sm"><div class="ellipsis w120">{{item.taskName}}</div></div>
                                    </td>
                                    <td><div class="level1">{{item.status}}</div></td>
                                </tr>
                                </tbody>
                            </table>
                            <div class="more-box"><a @click="abnormalEnterprise">查看更多</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    import MapComponent from "./MapComponent.vue";
    import MapPopUp from "./MapPopUp.vue";
    import LayerComponent from "./LayerComponent.vue";
    import HeaderToolButton from "./headerTool.vue";
    import TimeSliderComponent from "./TimeSliderComponent.vue";
    import maplegend from "./map_legend.vue";
    import getChartOnlineData from './echarts/chart01.js'
    import getChartOnlineData2 from './echarts/chart02.js'
    export default {
        name: "dynamicControlHTML",
        components: {
            MapComponent: MapComponent,
            MapPopUp:MapPopUp,
            HeaderToolButton: HeaderToolButton,
            LayerComponent:LayerComponent,
            TimeSliderComponent:TimeSliderComponent,
            maplegend:maplegend
        },
        data(){
            return{
                paichas:[],
                thisyear:{},
                surplus:{},
                cumulative:{},
                targetTodayAQI: 'is-active',
                targetTodayPM25:'',
                targetTodayPM10:'',
                targetTodayNO:'',
                targetTodayCO:'',
                targetTodaySO2:'',
                targetTodayO3:'',
                primaryAreas:[],
                fenxi:'display: block;',
                paichajilu:'',
                tongjitusuzhi:'display: block;',
                fenxiClick:'is-active',
                paicha:'',
                kuandu:'width: 280px;'
            }
        },
        mounted() {
            this.analysis()
        },
        methods: {
            abnormalEnterprise(){
                //this.$router.push({path: '/PollutionScreening', query: {queryData: "3"}});
            },
            tongjitu(){
                if(this.tongjitusuzhi=='display: block;'){
                    this.tongjitusuzhi = 'display: none;';
                    this.kuandu = 'width: 34px;';
                }else{
                    this.tongjitusuzhi='display: block;';
                    this.kuandu = 'width: 280px;';
                }
            },
            paichaRecord(){
                this.selectCorrectiveActions();
                this.fenxi = '';
                this.paichajilu = 'display: block;';
                this.fenxiClick = '';
                this.paicha = 'is-active';
            },
            analysis(){
                this.selectthisyears();
                getChartOnlineData(this);
                getChartOnlineData2(this);
                this.primaryArea('aqi');
                this.AppConfig.appInfo.checked = 3;
                this.fenxi = 'display: block;';
                this.paichajilu = '';
                this.fenxiClick = 'is-active';
                this.paicha = '';
            },
            selectCorrectiveActions(){
                var _this = this;
                var url = '/aircontrol/task/external/task/selectPollutionScreen';
                var params = new URLSearchParams();
                params.append('selectTaskJson','{"page":1,"limit":12,"regionId":null,"status":null,"startTime":"","endTime":"","taskName":"","taskClass":2,"taskSource":2}');
                _this.$axios.post(url,params).then(
                    function (res) {
                        if(res.code == 0) {
                              console.log('---------------------------------------');
                            _this.paichas = [];
                            for(var i = 0;i<res.data.records.length;i++){
                                var obj = {
                                    'time': _this.resolvingDate(res.data.records[i].createTime),
                                    'taskName': res.data.records[i].taskName,
                                    'addressName': res.data.records[i].addressName,
                                    'status': res.data.records[i].statusName
                                }
                                _this.paichas.push(obj)
                            }
                            console.log(_this.paichas);
                        }
                    }
                )
            },
            selectthisyears(){
                var _this = this;
                var url1 = '/aircontrol/airdiagnosis/api/basTarget/thisyear';
                _this.thisyear = {};
                _this.surplus = {};
                _this.cumulative = {};
                _this.$axios.get(url1,).then(function (res) {
                    _this.thisyear = res;
                });
                var url1 = '/aircontrol/airdiagnosis/api/areaMonitorData/annualTarget';
                _this.$axios.get(url1,).then(function (res) {
                    _this.surplus = res.surplus;
                    _this.cumulative = res.cumulative;
                });
            },
            resolvingDate(date){
                //date是传入的时间
                let d = new Date(date);
                let month = (d.getMonth() + 1) < 10 ? '0'+(d.getMonth() + 1) : (d.getMonth() + 1);
                let day = d.getDate()<10 ? '0'+d.getDate() : d.getDate();
                let hours = d.getHours()<10 ? '0'+d.getHours() : d.getHours();
                let min = d.getMinutes()<10 ? '0'+d.getMinutes() : d.getMinutes();
                let sec = d.getSeconds()<10 ? '0'+d.getSeconds() : d.getSeconds();
                let times=month + '/' + day + ' ' + hours + ':' + min;
                return times
            },
            primaryArea(type){
                var _this = this;
                _this.targetTodayAQI='';
                _this.targetTodayPM25='';
                _this.targetTodayPM10='';
                _this.targetTodayNO='';
                _this.targetTodayCO='';
                _this.targetTodaySO2='';
                _this.targetTodayO3='';
                if(type=='aqi'){
                    _this.targetTodayAQI='is-active';
                }else if(type=='no2'){
                    _this.targetTodayNO='is-active';
                }else if(type=='pm25'){
                    _this.targetTodayPM25='is-active';
                }else if(type=='o3'){
                    _this.targetTodayO3='is-active';
                }else if(type=='so2'){
                    _this.targetTodaySO2='is-active';
                }else if(type=='pm10'){
                    _this.targetTodayPM10='is-active';
                }else if(type=='co'){
                    _this.targetTodayCO='is-active';
                }
                var url = '/aircontrol/airdiagnosis/api/monitorData/primaryArea?pollutant='+type+'&areaCode=';
                _this.$axios.get(url,).then(function (res) {
                    var num = [];
                    for(var i =0;i<res.length;i++){
                        num.push(res[i].value);
                    }
                    var max = Math.max.apply(null, num);
                    var str = '';
                    $('#progress-item').empty();
                    for(var i =0;i<res.length;i++){
                        var classStr = '';
                        if(res[i].iaqi<=50&&res[i].iaqi>=0 ){
                            classStr = 'progress-bar-inner bar01';
                        }else if(res[i].iaqi<=100&&res[i].iaqi>50){
                            classStr = 'progress-bar-inner bar02';
                        }else if(res[i].iaqi<=150&&res[i].iaqi>100){
                            classStr = 'progress-bar-inner bar03';
                        }else if(res[i].iaqi<=200&&res[i].iaqi>150){
                            classStr = 'progress-bar-inner bar04';
                        }else if(res[i].iaqi<=300&&res[i].iaqi>200){
                            classStr = 'progress-bar-inner bar05';
                        }else if(res[i].iaqi<=400&&res[i].iaqi>300){
                            classStr = 'progress-bar-inner bar01';
                        }else if(res[i].iaqi<=500&&res[i].iaqi>400){
                            classStr = 'progress-bar-inner bar01';
                        }
                        str = str + '<div class="progress-item"><div class="progress-name ellipsis w120">'+res[i].stationName+'</div><div class="progress"><div class="progress-bar"><div style="'+ 'width:'+res[i].value/max*100+'%;" class="'+classStr+'"></div></div></div></div>';
                    }
                    $('#progress-item').html(str);
                });
            }
        }
    }


</script>

<style scoped  lang="less">
    //@import url("https://js.arcgis.com/4.13/esri/themes/light/main.css");
   @import url("http://10.0.200.201:8081/arcgis_js_api/library/4.11/esri/themes/light/main.css");
    #popUpDiv{
        width:420px;
        height:300px;
        position: absolute;
        right: 800px;
        bottom:150px;
        z-index: 1999;
        display: none;
    }
</style>