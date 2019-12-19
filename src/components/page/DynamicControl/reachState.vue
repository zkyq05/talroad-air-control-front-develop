<template>
    <!-- 主体 -->
    <div class="main-con">
        <div class="panel-default">
            <div class="panel-hd">
                <ul class="filter-box">
                    <li class="filter-item">
                        <div class="filter-con">
                            <el-select  v-model="myPlan" @change="chagePlan" clearable placeholder="请选择方案" style="width:225px;">
                                <el-option
                                        v-for = "item in planData"
                                        :key = "item.id+','+item.composite+','+item.pm25+','+item.pm10+','+item.o3+','+item.no2+','+item.co+','+item.so2+','+item.goodDays+','+item.heavyDays"
                                        :label = "item.tartetName"
                                        :value ="item.id+','+item.composite+','+item.pm25+','+item.pm10+','+item.o3+','+item.no2+','+item.co+','+item.so2+','+item.goodDays+','+item.heavyDays"
                                ></el-option>
                            </el-select>
                        </div>
                    </li>
                    <li class="filter-item">
                        <button style="width: 140px;" type="button" @click="executeScheme()" class="el-button el-button--primary"><!----><!----><span>执行该方案</span></button>
                    </li>
                </ul>
            </div>
            <div class="panel-bd">
                <div class="el-row air-stat" style="margin-left: -10px; margin-right: -10px;">
                    <div class="el-col el-col-8" style="padding-left: 10px; padding-right: 10px;">
                        <div class="stat-item stat01">
                            <div class="air-cont">
                                <div class="cont-item">
                                    <div class="air-type">综合指数</div>
                                    <div class="air-txt">实际</div>
                                    <div class="air-num">{{actual.pmi}}</div>
                                </div>
                                <div class="cont-item">
                                    <div class="air-target">目标：{{plan.composite}}</div>
                                    <div class="air-txt">实际剩余</div>
                                    <div class="air-num">{{actualSurplus.pmi}}</div>
                                </div>
                            </div>
                            <div class="air-color"></div>
                            <div class="air-term">
                                <span>同期 {{sametime.pmi}}</span><span class="ml">同期剩余 {{sametimeSurplus.pmi}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="el-col el-col-8" style="padding-left: 10px; padding-right: 10px;">
                        <div class="stat-item stat01">
                            <div class="air-cont">
                                <div class="cont-item">
                                    <div class="air-type">PM2.5</div>
                                    <div class="air-txt">实际</div>
                                    <div class="air-num">{{actual.pm25}}</div>
                                </div>
                                <div class="cont-item">
                                    <div class="air-target">目标：{{plan.pm25}}</div>
                                    <div class="air-txt">实际剩余</div>
                                    <div class="air-num">{{actualSurplus.pm25}}</div>
                                </div>
                            </div>
                            <div class="air-color"></div>
                            <div class="air-term">
                                <span>同期 {{sametime.pm25}}</span><span class="ml">同期剩余 {{sametimeSurplus.pm25}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="el-col el-col-8" style="padding-left: 10px; padding-right: 10px;">
                        <div class="stat-item stat01">
                            <div class="air-cont">
                                <div class="cont-item">
                                    <div class="air-type">PM<span class="text-value">10</span></div>
                                    <div class="air-txt">实际</div>
                                    <div class="air-num">{{actual.pm10}}</div>
                                </div>
                                <div class="cont-item">
                                    <div class="air-target">目标：{{plan.pm10}}</div>
                                    <div class="air-txt">实际剩余</div>
                                    <div class="air-num">{{actualSurplus.pm10}}</div>
                                </div>
                            </div>
                            <div class="air-color"></div>
                            <div class="air-term">
                                <span>同期 {{sametime.pm10}}</span><span class="ml">同期剩余 {{sametimeSurplus.pm10}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="el-col el-col-8" style="padding-left: 10px; padding-right: 10px;">
                        <div class="stat-item stat01">
                            <div class="air-cont">
                                <div class="cont-item">
                                    <div class="air-type">O<span class="text-value">3</span></div>
                                    <div class="air-txt">实际</div>
                                    <div class="air-num">{{actual.o3}}</div>
                                </div>
                                <div class="cont-item">
                                    <div class="air-target">目标：{{plan.o3}}</div>
                                    <div class="air-txt">实际剩余</div>
                                    <div class="air-num">{{actualSurplus.o3}}</div>
                                </div>
                            </div>
                            <div class="air-color"></div>
                            <div class="air-term">
                                <span>同期 {{sametime.o3}}</span><span class="ml">同期剩余 {{sametimeSurplus.o3}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="el-col el-col-8" style="padding-left: 10px; padding-right: 10px;">
                        <div class="stat-item stat01">
                            <div class="air-cont">
                                <div class="cont-item">
                                    <div class="air-type">NO<span class="text-value">2</span></div>
                                    <div class="air-txt">实际</div>
                                    <div class="air-num">{{actual.no2}}</div>
                                </div>
                                <div class="cont-item">
                                    <div class="air-target">目标：{{plan.no2}}</div>
                                    <div class="air-txt">实际剩余</div>
                                    <div class="air-num">{{actualSurplus.no2}}</div>
                                </div>
                            </div>
                            <div class="air-color"></div>
                            <div class="air-term">
                                <span>同期 {{sametime.no2}}</span><span class="ml">同期剩余 {{sametimeSurplus.no2}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="el-col el-col-8" style="padding-left: 10px; padding-right: 10px;">
                        <div class="stat-item stat01">
                            <div class="air-cont">
                                <div class="cont-item">
                                    <div class="air-type">CO</div>
                                    <div class="air-txt">实际</div>
                                    <div class="air-num">{{actual.co}}</div>
                                </div>
                                <div class="cont-item">
                                    <div class="air-target">目标：{{plan.co}}</div>
                                    <div class="air-txt">实际剩余</div>
                                    <div class="air-num">{{actualSurplus.co}}</div>
                                </div>
                            </div>
                            <div class="air-color"></div>
                            <div class="air-term">
                                <span>同期 {{sametime.co}}</span><span class="ml">同期剩余 {{sametimeSurplus.co}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="el-col el-col-8" style="padding-left: 10px; padding-right: 10px;">
                        <div class="stat-item stat01">
                            <div class="air-cont">
                                <div class="cont-item">
                                    <div class="air-type">SO<span class="text-value">2</span></div>
                                    <div class="air-txt">实际</div>
                                    <div class="air-num">{{actual.so2}}</div>
                                </div>
                                <div class="cont-item">
                                    <div class="air-target">目标：{{plan.so2}}</div>
                                    <div class="air-txt">实际剩余</div>
                                    <div class="air-num">{{actualSurplus.so2}}</div>
                                </div>
                            </div>
                            <div class="air-color"></div>
                            <div class="air-term">
                                <span>同期 {{sametime.so2}}</span><span class="ml">同期剩余 {{sametimeSurplus.so2}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="el-col el-col-8" style="padding-left: 10px; padding-right: 10px;">
                        <div class="stat-item stat01">
                            <div class="air-cont">
                                <div class="cont-item">
                                    <div class="air-type">优良天</div>
                                    <div class="air-txt">实际</div>
                                    <div class="air-num">{{actual.gooddays}}</div>
                                </div>
                                <div class="cont-item">
                                    <div class="air-target">目标：{{plan.goodDays}}</div>
                                    <div class="air-txt">实际剩余</div>
                                    <div class="air-num">{{actualSurplus.gooddays}}</div>
                                </div>
                            </div>
                            <div class="air-color"></div>
                            <div class="air-term">
                                <span>同期 {{sametime.gooddays}}</span><span class="ml">同期剩余 {{sametimeSurplus.gooddays}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="el-col el-col-8" style="padding-left: 10px; padding-right: 10px;">
                        <div class="stat-item stat01">
                            <div class="air-cont">
                                <div class="cont-item">
                                    <div class="air-type">重污染天</div>
                                    <div class="air-txt">实际</div>
                                    <div class="air-num">{{actual.heavydays}}</div>
                                </div>
                                <div class="cont-item">
                                    <div class="air-target">目标：{{plan.heavyDays}}</div>
                                    <div class="air-txt">实际剩余</div>
                                    <div class="air-num">{{actualSurplus.heavydays}}</div>
                                </div>
                            </div>
                            <div class="air-color"></div>
                            <div class="air-term">
                                <span>同期 {{sametime.heavydays}}</span><span class="ml">同期剩余 {{sametimeSurplus.heavydays}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="panel-default mt-lg">
            <div class="panel-hd">
                <div class="panel-tit">目标分解</div>
                <!--<ul class="filter-box pull-right">
                    <li class="filter-item">
                        <div class="filter-con">
                            <div class="el-select" style="width: 140px;">&lt;!&ndash;&ndash;&gt;<div class="el-input el-input&#45;&#45;suffix">&lt;!&ndash;&ndash;&gt;<input type="text" readonly="readonly" autocomplete="off" value="单位/天" placeholder="单位/天" class="el-input__inner">&lt;!&ndash;&ndash;&gt;<span class="el-input__suffix"><span class="el-input__suffix-inner"><i class="el-select__caret el-input__icon el-icon-arrow-up"></i>&lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;</span>&lt;!&ndash;&ndash;&gt;</span>&lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;</div><div class="el-select-dropdown el-popper" style="display: none; min-width: 193px;"><div class="el-scrollbar" style=""><div class="el-select-dropdown__wrap el-scrollbar__wrap" style="margin-bottom: -15px; margin-right: -15px;"><ul class="el-scrollbar__view el-select-dropdown__list">&lt;!&ndash;&ndash;&gt;<li class="el-select-dropdown__item"><span>Option1</span></li><li class="el-select-dropdown__item"><span>Option2</span></li><li class="el-select-dropdown__item"><span>Option3</span></li><li class="el-select-dropdown__item"><span>Option4</span></li><li class="el-select-dropdown__item"><span>Option5</span></li></ul></div><div class="el-scrollbar__bar is-horizontal"><div class="el-scrollbar__thumb" style="transform: translateX(0%);"></div></div><div class="el-scrollbar__bar is-vertical"><div class="el-scrollbar__thumb" style="transform: translateY(0%);"></div></div></div>&lt;!&ndash;&ndash;&gt;</div></div>
                        </div>
                    </li>
                </ul>-->
            </div>
            <div class="panel-bd">
                <div class="chart-item" id="chart01" style="height: 420px"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import goal from './echartsJs/goal'
    export default {
        name: "reachState",
        components:{
            goal
        },
        data:function () {
            return{
                myPlan:'',
                plan:{
                    composite:0,
                    pm25:0,
                    pm10:0,
                    o3:0,
                    no2:0,
                    co:0,
                    so2:0,
                    goodDays:0,
                    heavyDays:0
                },
                scheme:'条件',
                actual:{
                        pmi: 0,
                        pm25: 0,
                        pm10: 0,
                        so2: 0,
                        no2: 0,
                        co: 0,
                        o3: 0,
                        gooddays: 0,
                        heavydays: 0
                },
                actualSurplus:{
                    pmi: 0,
                    pm25: 0,
                    pm10: 0,
                    so2: 0,
                    no2: 0,
                    co: 0,
                    o3: 0,
                    gooddays: 0,
                    heavydays: 0
                },
                sametime:{
                    pmi: 0,
                    pm25: 0,
                    pm10: 0,
                    so2: 0,
                    no2: 0,
                    co: 0,
                    o3: 0,
                    gooddays: 0,
                    heavydays: 0
                },
                sametimeSurplus:{
                    pmi: 0,
                    pm25: 0,
                    pm10: 0,
                    so2: 0,
                    no2: 0,
                    co: 0,
                    o3: 0,
                    gooddays: 0,
                    heavydays: 0
                },
                planData:[]
            }
        },
        mounted:function(){
            this.initPage();
            this.$nextTick(() => {
                goal(this);
            })
        },
        create(){

        },
        methods:{
            convertToDate(date) {
                var date = new Date(date);
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getDate();
                m = m < 10 ? "0" + m : m;//月份如果小于10，则在前面加一个0
                d = d < 10 ? "0" + d : d;//day如果小于10，则在前面加一个0
                return y + "-" + m + "-" + d;
            },
            initPage: function () {
                var _this = this;
                var self = this;
                this.$axios.get(
                    '/aircontrol/airdiagnosis/api/basTarget/yearlist'
                ).then(function (res) {
                    self.planData = res;
                })
            },
            chagePlan(item){
                var _this = this;
                var split = item.split(",");
                _this.plan.composite=split[1];
                _this.plan.pm25=split[2];
                _this.plan.pm10=split[3];
                _this.plan.o3=split[4];
                _this.plan.no2=split[5];
                _this.plan.co=split[6];
                _this.plan.so2=split[7];
                _this.plan.goodDays=split[8];
                _this.plan.heavyDays=split[9];
                _this.actual.pmi=0;
                _this.actual.pm25=0;
                _this.actual.pm10=0;
                _this.actual.so2=0;
                _this.actual.no2=0;
                _this.actual.co=0;
                _this.actual.o3=0;
                _this.actual.gooddays=0;
                _this.actual.heavydays=0;
                //_this.actualSurplus = res.actualSurplus;
                _this.actualSurplus.pmi=0;
                _this.actualSurplus.pm25=0;
                _this.actualSurplus.pm10=0;
                _this.actualSurplus.so2=0;
                _this.actualSurplus.no2=0;
                _this.actualSurplus.co=0;
                _this.actualSurplus.o3=0;
                _this.actualSurplus.gooddays=0;
                _this.actualSurplus.heavydays=0;
                //_this.sametime = res.sametime;
                _this.sametime.pmi=0;
                _this.sametime.pm25=0;
                _this.sametime.pm10=0;
                _this.sametime.so2=0;
                _this.sametime.no2=0;
                _this.sametime.co=0;
                _this.sametime.o3=0;
                _this.sametime.gooddays=0;
                _this.sametime.heavydays=0;
                //_this.sametimeSurplus = res.sametimeSurplus;
                _this.sametimeSurplus.pmi=0;
                _this.sametimeSurplus.pm25=0;
                _this.sametimeSurplus.pm10=0;
                _this.sametimeSurplus.so2=0;
                _this.sametimeSurplus.no2=0;
                _this.sametimeSurplus.co=0;
                _this.sametimeSurplus.o3=0;
                _this.sametimeSurplus.gooddays=0;
                _this.sametimeSurplus.heavydays=0;
            },
            executeScheme(){
                var _this = this;
                var split = _this.myPlan.split(",");
                /*console.log(split[0]+"<<<<<<<<执行该方案")*/
                _this.$axios.get(
                    '/aircontrol/airdiagnosis/api/basTarget/reachTarget',{params:{
                        "targetId":split[0]
                        }}
                ).then(function (res) {
                    //_this.actual = res.actual;
                    _this.actual.pmi=res.actual.pmi;
                    _this.actual.pm25=res.actual.pm25;
                    _this.actual.pm10=res.actual.pm10;
                    _this.actual.so2=res.actual.so2;
                    _this.actual.no2=res.actual.no2;
                    _this.actual.co=res.actual.co;
                    _this.actual.o3=res.actual.o3;
                    _this.actual.gooddays=res.actual.gooddays;
                    _this.actual.heavydays=res.actual.heavydays;
                    //_this.actualSurplus = res.actualSurplus;
                    _this.actualSurplus.pmi=res.actualSurplus.pmi;
                    _this.actualSurplus.pm25=res.actualSurplus.pm25;
                    _this.actualSurplus.pm10=res.actualSurplus.pm10;
                    _this.actualSurplus.so2=res.actualSurplus.so2;
                    _this.actualSurplus.no2=res.actualSurplus.no2;
                    _this.actualSurplus.co=res.actualSurplus.co;
                    _this.actualSurplus.o3=res.actualSurplus.o3;
                    _this.actualSurplus.gooddays=res.actualSurplus.gooddays;
                    _this.actualSurplus.heavydays=res.actualSurplus.heavydays;
                    //_this.sametime = res.sametime;
                    _this.sametime.pmi=res.sametime.pmi;
                    _this.sametime.pm25=res.sametime.pm25;
                    _this.sametime.pm10=res.sametime.pm10;
                    _this.sametime.so2=res.sametime.so2;
                    _this.sametime.no2=res.sametime.no2;
                    _this.sametime.co=res.sametime.co;
                    _this.sametime.o3=res.sametime.o3;
                    _this.sametime.gooddays=res.sametime.gooddays;
                    _this.sametime.heavydays=res.sametime.heavydays;
                    //_this.sametimeSurplus = res.sametimeSurplus;
                    _this.sametimeSurplus.pmi=res.sametimeSurplus.pmi;
                    _this.sametimeSurplus.pm25=res.sametimeSurplus.pm25;
                    _this.sametimeSurplus.pm10=res.sametimeSurplus.pm10;
                    _this.sametimeSurplus.so2=res.sametimeSurplus.so2;
                    _this.sametimeSurplus.no2=res.sametimeSurplus.no2;
                    _this.sametimeSurplus.co=res.sametimeSurplus.co;
                    _this.sametimeSurplus.o3=res.sametimeSurplus.o3;
                    _this.sametimeSurplus.gooddays=res.sametimeSurplus.gooddays;
                    _this.sametimeSurplus.heavydays=res.sametimeSurplus.heavydays;

                })
            }
        }
    }
</script>

<style scoped>

</style>
