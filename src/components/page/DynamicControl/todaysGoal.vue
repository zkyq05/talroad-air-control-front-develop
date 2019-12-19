<template>
    <div class="main-con">
        <!-- 全年统计 -->
        <div class="panel-default">
            <ul class="stat-box">
                <li class="is-warn">
                    <div class="stat-tit stat-num">{{form.month_day}}</div>
                    <div class="stat-text">{{form.cityName}}</div>
                    <!--<div class="stat-sub-text"><span class="circle-01 bg-level1"></span>超标警报</div>-->
                </li>
                <li>
                    <div class="stat-tit">截止时间</div>
                    <div class="stat-text Oswald" >{{form.hour_day}}</div>
                    <!--<div class="stat-sub-text">每隔24h更新</div>-->
                </li>
                <li>
                    <div class="stat-tit">今日累计AQI</div>
                    <div class="stat-text Oswald">{{todayData.currentAqi}}</div>
                    <!--<div class="stat-sub-text"><span class="circle-01 bg-level3"></span>今日目标 124</div>-->
                </li>
                <li>
                    <div class="stat-tit">首要污染物</div>
                    <div class="stat-text Oswald" v-if="todayData.primaryPollutant=='PM25'">PM2.5</div>
                    <div class="stat-text Oswald" v-else>{{todayData.primaryPollutant}}</div>
                    <!--<div class="stat-sub-text"><span class="circle-01 bg-level4"></span>当前浓度 129</div>-->
                </li>
            </ul>
        </div>
        <div class="panel-default mt-lg">
           <!-- <div class="panel-hd">
                <ul class="filter-box">
                    <li class="filter-item">
                        <div class="filter-label text-default text-blger">今日AQI若想达到</div>
                        <div class="filter-con">
                            <div class="el-input el-input&#45;&#45;bg" style="width: 100px;">&lt;!&ndash;&ndash;&gt;<input type="text" v-model="form.computeGoalValue" autocomplete="off" placeholder="" class="el-input__inner text-blg Oswald">&lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;</div>
                        </div>
                    </li>
                    <li class="filter-item">
                        <button type="button" @click="computeGoal()" class="el-button el-button&#45;&#45;primary">&lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;<span>计算</span></button>
                    </li>
                </ul>
            </div>-->
            <div class="panel-bd">
                <div class="text-light pd-bt">剩余<span class="color-level2">{{syHour}}小时</span> {{isoverCount}}项指标需控制</div>
                <div class="el-row air-stat" style="margin-left: -10px; margin-right: -10px;">
                    <div class="el-col el-col-8" style="padding-left: 10px; padding-right: 10px;">
                        <div v-if="todayData.pm25isover==0" class="stat-item stat01">
                            <div class="air-cont">
                                <div class="cont-item">
                                    <div class="air-type">PM<span class="text-value">2.5</span>
                                        <div class="air-txt-01">分指数 <span class="text-mlg">{{todayData.iaqiPm25}}</span></div>
                                    </div>
                                    <div class="air-txt">当前累积</div>
                                    <div class="air-num">{{todayData.currentPm25}}</div>
                                </div>
                                <div class="cont-item">
                                    <div class="air-target target01">达标</div>
                                    <div class="air-txt">剩余控制</div>
                                    <div class="air-num">{{todayData.surplusPm25}}</div>
                                </div>
                            </div>
                            <div class="air-color"></div>
                        </div>
                        <div v-if="todayData.pm25isover==1" class="stat-item stat04">
                            <div class="air-cont">
                                <div class="cont-item">
                                    <div class="air-type">PM<span class="text-value">2.5</span>
                                        <div class="air-txt-01">分指数 <span class="text-mlg">{{todayData.iaqiPm25}}</span></div>
                                    </div>
                                    <div class="air-txt">当前累积</div>
                                    <div class="air-num">{{todayData.currentPm25}}</div>
                                </div>
                                <div class="cont-item">
                                    <div class="air-target target01">超标</div>
                                    <div class="air-txt">剩余控制</div>
                                    <div class="air-num">{{todayData.surplusPm25}}</div>
                                </div>
                            </div>
                            <div class="air-color"></div>
                        </div>
                    </div>
                    <div class="el-col el-col-8" style="padding-left: 10px; padding-right: 10px;">
                        <div v-if="todayData.pm10isover==0" class="stat-item stat01">
                            <div class="air-cont">
                                <div class="cont-item">
                                    <div class="air-type">PM<span class="text-value">10</span>
                                        <div class="air-txt-01">分指数 <span class="text-mlg">{{todayData.iaqiPm10}}</span></div>
                                    </div>
                                    <div class="air-txt">当前累积</div>
                                    <div class="air-num">{{todayData.currentPm10}}</div>
                                </div>
                                <div class="cont-item">
                                    <div class="air-target target01">达标</div>
                                    <div class="air-txt">剩余控制</div>
                                    <div class="air-num">{{todayData.surplusPm10}}</div>
                                </div>
                            </div>
                            <div class="air-color"></div>
                        </div>
                        <div v-if="todayData.pm10isover==1" class="stat-item stat04">
                            <div class="air-cont">
                                <div class="cont-item">
                                    <div class="air-type">PM<span class="text-value">10</span>
                                        <div class="air-txt-01">分指数 <span class="text-mlg">{{todayData.iaqiPm10}}</span></div>
                                    </div>
                                    <div class="air-txt">当前累积</div>
                                    <div class="air-num">{{todayData.currentPm10}}</div>
                                </div>
                                <div class="cont-item">
                                    <div class="air-target target01">超标</div>
                                    <div class="air-txt">剩余控制</div>
                                    <div class="air-num">{{todayData.surplusPm10}}</div>
                                </div>
                            </div>
                            <div class="air-color"></div>
                        </div>
                    </div>
                    <div class="el-col el-col-8" style="padding-left: 10px; padding-right: 10px;">
                        <div v-if="todayData.so2isover==0" class="stat-item stat01">
                            <div class="air-cont">
                                <div class="cont-item">
                                    <div class="air-type">SO<span class="text-value">2</span>
                                        <div class="air-txt-01">分指数 <span class="text-mlg">{{todayData.iaqiSo2}}</span></div>
                                    </div>
                                    <div class="air-txt">当前累积</div>
                                    <div class="air-num">{{todayData.currentSo2}}</div>
                                </div>
                                <div class="cont-item">
                                    <div class="air-target target01">达标</div>
                                    <div class="air-txt">剩余控制</div>
                                    <div class="air-num">{{todayData.surplusSo2}}</div>
                                </div>
                            </div>
                            <div class="air-color"></div>
                        </div>
                        <div v-if="todayData.so2isover==1" class="stat-item stat04">
                            <div class="air-cont">
                                <div class="cont-item">
                                    <div class="air-type">SO<span class="text-value">2</span>
                                        <div class="air-txt-01">分指数 <span class="text-mlg">{{todayData.iaqiSo2}}</span></div>
                                    </div>
                                    <div class="air-txt">当前累积</div>
                                    <div class="air-num">{{todayData.currentSo2}}</div>
                                </div>
                                <div class="cont-item">
                                    <div class="air-target target01">超标</div>
                                    <div class="air-txt">剩余控制</div>
                                    <div class="air-num">{{todayData.surplusSo2}}</div>
                                </div>
                            </div>
                            <div class="air-color"></div>
                        </div>
                    </div>
                    <div class="el-col el-col-8" style="padding-left: 10px; padding-right: 10px;">
                        <div v-if="todayData.so2isover==0" class="stat-item stat01">
                            <div class="air-cont">
                                <div class="cont-item">
                                    <div class="air-type">NO<span class="text-value">2</span>
                                        <div class="air-txt-01">分指数 <span class="text-mlg">{{todayData.iaqiNo2}}</span></div>
                                    </div>
                                    <div class="air-txt">当前累积</div>
                                    <div class="air-num">{{todayData.currentNo2}}</div>
                                </div>
                                <div class="cont-item">
                                    <div class="air-target target01">达标</div>
                                    <div class="air-txt">剩余控制</div>
                                    <div class="air-num">{{todayData.surplusNo2}}</div>
                                </div>
                            </div>
                            <div class="air-color"></div>
                        </div>
                        <div v-if="todayData.so2isover==1" class="stat-item stat04">
                            <div class="air-cont">
                                <div class="cont-item">
                                    <div class="air-type">NO<span class="text-value">2</span>
                                        <div class="air-txt-01">分指数 <span class="text-mlg">{{todayData.iaqiNo2}}</span></div>
                                    </div>
                                    <div class="air-txt">当前累积</div>
                                    <div class="air-num">{{todayData.currentNo2}}</div>
                                </div>
                                <div class="cont-item">
                                    <div class="air-target target01">超标</div>
                                    <div class="air-txt">剩余控制</div>
                                    <div class="air-num">{{todayData.surplusNo2}}</div>
                                </div>
                            </div>
                            <div class="air-color"></div>
                        </div>
                    </div>
                    <div class="el-col el-col-8" style="padding-left: 10px; padding-right: 10px;">
                        <div v-if="todayData.coisover==0" class="stat-item stat01">
                            <div class="air-cont">
                                <div class="cont-item">
                                    <div class="air-type">CO
                                        <div class="air-txt-01">分指数 <span class="text-mlg">{{todayData.iaqiCo}}</span></div>
                                    </div>
                                    <div class="air-txt">当前累积</div>
                                    <div class="air-num">{{todayData.currentCo}}</div>
                                </div>
                                <div class="cont-item">
                                    <div class="air-target target01">达标</div>
                                    <div class="air-txt">剩余控制</div>
                                    <div class="air-num">{{todayData.surplusCo}}</div>
                                </div>
                            </div>
                            <div class="air-color"></div>
                        </div>
                        <div v-if="todayData.coisover==1" class="stat-item stat04">
                            <div class="air-cont">
                                <div class="cont-item">
                                    <div class="air-type">CO
                                        <div class="air-txt-01">分指数 <span class="text-mlg">{{todayData.iaqiCo}}</span></div>
                                    </div>
                                    <div class="air-txt">当前累积</div>
                                    <div class="air-num">{{todayData.currentCo}}</div>
                                </div>
                                <div class="cont-item">
                                    <div class="air-target target01">超标</div>
                                    <div class="air-txt">剩余控制</div>
                                    <div class="air-num">{{todayData.surplusCo}}</div>
                                </div>
                            </div>
                            <div class="air-color"></div>
                        </div>
                    </div>
                    <div class="el-col el-col-8" style="padding-left: 10px; padding-right: 10px;">
                        <div v-if="todayData.coisover==0" class="stat-item stat01">
                            <div class="air-cont">
                                <div class="cont-item">
                                    <div class="air-type">O3<span class="text-value">_5H</span>
                                        <div class="air-txt-01">分指数 <span class="text-mlg">{{todayData.iaqiO3}}</span></div>
                                    </div>
                                    <div class="air-txt">当前累积</div>
                                    <div class="air-num">{{todayData.currentO3}}</div>
                                </div>
                                <div class="cont-item">
                                    <div class="air-target target01">达标</div>
                                    <div class="air-txt">剩余控制</div>
                                    <div class="air-num">{{todayData.surplusO3}}</div>
                                </div>
                            </div>
                            <div class="air-color"></div>
                        </div>
                        <div v-if="todayData.coisover==1" class="stat-item stat04">
                            <div class="air-cont">
                                <div class="cont-item">
                                    <div class="air-type">O3<span class="text-value">_5H</span>
                                        <div class="air-txt-01">分指数 <span class="text-mlg">{{todayData.iaqiO3}}</span></div>
                                    </div>
                                    <div class="air-txt">当前累积</div>
                                    <div class="air-num">{{todayData.currentO3}}</div>
                                </div>
                                <div class="cont-item">
                                    <div class="air-target target01">超标</div>
                                    <div class="air-txt">剩余控制</div>
                                    <div class="air-num">{{todayData.surplusO3}}</div>
                                </div>
                            </div>
                            <div class="air-color"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "todaysGoal",
        data:function () {
            return{
                form:{
                    cityName:this.AppConfig.appInfo.regionName,
                    month_day:'',
                    hour_day:''
                },
                isoverCount:0,
                todayData:{
                    endTime: "",
                primaryPollutant: "",
                currentAqi: 0,
                surplusAqi: null,
                currentPm25: 0,
                surplusPm25: 0,
                iaqiPm25: 0,
                pm25isover: 0,
                currentPm10: 0,
                surplusPm10: 0,
                iaqiPm10: 0,
                pm10isover: 0,
                currentSo2: 0,
                surplusSo2: 0,
                iaqiSo2: 0,
                so2isover: 0,
                currentNo2: 0,
                surplusNo2: 0,
                iaqiNo2: 0,
                no2isover: 0,
                currentCo: 0,
                surplusCo: 0,
                iaqiCo: 0,
                coisover: 0,
                currentO3: 0,
                surplusO3: 0,
                iaqiO3: 0,
                o3isover: 0}
                ,
                syHour:24-(new Date().getHours())
            }
        },
        mounted:function(){
            this.todayData.endTime='';
            this.todayData.primaryPollutant='';
            this.todayData.currentAqi=0;
            this.todayData.surplusAqi=0;
            this.todayData.currentPm25=0;
            this.todayData.surplusPm25=0;
            this.todayData.iaqiPm25=0;
            this.todayData.pm25isover=0;
            this.todayData.currentPm10=0;
            this.todayData.surplusPm10=0;
            this.todayData.iaqiPm10=0;
            this.todayData.pm10isover=0;
            this.todayData.currentSo2=0;
            this.todayData.surplusSo2=0;
            this.todayData.iaqiSo2=0;
            this.todayData.so2isover=0;
            this.todayData.currentNo2=0;
            this.todayData.surplusNo2=0;
            this.todayData.iaqiNo2=0;
            this.todayData.no2isover=0;
            this.todayData.currentCo=0;
            this.todayData.surplusCo=0;
            this.todayData.iaqiCo=0;
            this.todayData.coisover=0;
            this.todayData.currentO3=0;
            this.todayData.surplusO3=0;
            this.todayData.iaqiO3=0;
            this.todayData.o3isover=0;
            this.getDataDay();
        },
        methods:{
            computeGoal(){
                var _this = this;
                alert(_this.form.computeGoalValue+"<<<<<计算");
            },
            //查询全年质量统计
            getDataDay: function () {
                var _this = this;
                _this.$axios.get(
                    '/aircontrol/airdiagnosis/api/basTarget/manage/todayTarget',{
                        params:{
                            "areaCode":''
                        }}
                ).then(function (res) {
                    _this.todayData.endTime=res.endTime;
                    _this.todayData.primaryPollutant=res.primaryPollutant;
                    _this.todayData.currentAqi=res.currentAqi;
                    _this.todayData.surplusAqi=res.surplusAqi;
                    _this.todayData.currentPm25=res.currentPm25;
                    _this.todayData.surplusPm25=res.surplusPm25;
                    _this.todayData.iaqiPm25=res.iaqiPm25;
                    _this.todayData.pm25isover=res.pm25isover;
                    _this.todayData.currentPm10=res.currentPm10;
                    _this.todayData.surplusPm10=res.surplusPm10;
                    _this.todayData.iaqiPm10=res.iaqiPm10;
                    _this.todayData.pm10isover=res.pm10isover;
                    _this.todayData.currentSo2=res.currentSo2;
                    _this.todayData.surplusSo2=res.surplusSo2;
                    _this.todayData.iaqiSo2=res.iaqiSo2;
                    _this.todayData.so2isover=res.so2isover;
                    _this.todayData.currentNo2=res.currentNo2;
                    _this.todayData.surplusNo2=res.surplusNo2;
                    _this.todayData.iaqiNo2=res.iaqiNo2;
                    _this.todayData.no2isover=res.no2isover;
                    _this.todayData.currentCo=res.currentCo;
                    _this.todayData.surplusCo=res.surplusCo;
                    _this.todayData.iaqiCo=res.iaqiCo;
                    _this.todayData.coisover=res.coisover;
                    _this.todayData.currentO3=res.currentO3;
                    _this.todayData.surplusO3=res.surplusO3;
                    _this.todayData.iaqiO3=res.iaqiO3;
                    _this.todayData.o3isover=res.o3isover;
                    if(res.coisover==1){
                        _this.isoverCount+=1;
                    }
                    if(res.no2isover==1){
                        _this.isoverCount+=1;
                    }
                    if(res.o3isover==1){
                        _this.isoverCount+=1;
                    }
                    if(res.pm10isover==1){
                        _this.isoverCount+=1;
                    }
                    if(res.pm25isover==1){
                        _this.isoverCount+=1;
                    }
                    if(res.so2isover==1){
                        _this.isoverCount+=1;
                    }
                    _this.form.month_day = _this.resolvingDate(res.endTime);
                    _this.form.hour_day = _this.resolvingDate1(res.endTime);
                })
            },
            resolvingDate(date){
                //date是传入的时间
                let d = new Date(date);
                let month = (d.getMonth() + 1) < 10 ? '0'+(d.getMonth() + 1) : (d.getMonth() + 1);
                let day = d.getDate()<10 ? '0'+d.getDate() : d.getDate();
                let hours = d.getHours()<10 ? '0'+d.getHours() : d.getHours();
                let min = d.getMinutes()<10 ? '0'+d.getMinutes() : d.getMinutes();
                let sec = d.getSeconds()<10 ? '0'+d.getSeconds() : d.getSeconds();
                let times=month + '-' + day;
                return times
            },
            resolvingDate1(date){
                //date是传入的时间
                let d = new Date(date);
                let month = (d.getMonth() + 1) < 10 ? '0'+(d.getMonth() + 1) : (d.getMonth() + 1);
                let day = d.getDate()<10 ? '0'+d.getDate() : d.getDate();
                let hours = d.getHours()<10 ? '0'+d.getHours() : d.getHours();
                let min = d.getMinutes()<10 ? '0'+d.getMinutes() : d.getMinutes();
                let sec = d.getSeconds()<10 ? '0'+d.getSeconds() : d.getSeconds();
                let times=hours + ':' + min;
                return times
            }
        }
    }
</script>

<style scoped>

</style>
