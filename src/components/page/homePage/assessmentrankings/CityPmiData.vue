<template>
    <div class="main-con">
        <div class="panel-default">
            <div class="panel-bd pd-lg">
                <ul class="filter-box">
                    <li class="filter-item">
                        <div class="filter-label">时间范围</div>
                        <div class="filter-con">
                            <el-date-picker
                                    ref="upload"
                                    v-model="date_Time"
                                    type="year"
                                    @change="chage()"
                                    format="yyyy" value-format="yyyy"
                                    placeholder="选择日期" >
                            </el-date-picker>
                        </div>
                    </li>
                    <li class="filter-item ml-lger">
                        <div class="filter-label">数据维度</div>
                        <div class="filter-con">
                            <el-cascader
                                    v-model="regionName "
                                    :options="regionOptions"
                                    filterable
                                    :props="{ checkStrictly: true }"
                                    clearable
                                    change-on-select
                                    @change="changeRegionName"
                            >

                            </el-cascader>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 综合指数 -->
        <div class="panel-default mt-lg">
            <div class="panel-hd">
                <h2 class="panel-tit"><i class="icon icon-baobiao"></i>{{year}}综合指数</h2>
                <div class="panel-right">
                    <label class="el-checkbox is-checked"><span class="el-checkbox__input is-checked"><span class="el-checkbox__inner"></span><input type="checkbox" aria-hidden="false" class="el-checkbox__original" value=""></span><span class="el-checkbox__label">与上年对比<!----></span></label>
                </div>
            </div>
            <div class="panel-bd">
                <div class="chart-item" id="city-pmi" style="height: 350px"></div>
            </div>
        </div>
        <!-- 综合指数 -->
        <div class="panel-default mt-lg">
            <div class="panel-hd">
                <h2 class="panel-tit"><i class="icon icon-baobiao"></i>{{yearUp}}综合指数</h2>
            </div>
            <div class="panel-bd">
                <div class="chart-item" id="chart02-pmi" style="height: 350px"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import  cityPmiData from  '../echartsUnit/CityPmiData'
    export default {
        name: "CityPmiData",
        components:{cityPmiData},
        data:function(){
            return{
                options: [],
                date_Time:new Date().format("yyyy"),
                fkRegioncode:this.AppConfig.appInfo.regionCode,
                regionName: this.AppConfig.appInfo.regionCode,
                regionOptions:[],
                year:'',
                yearUp:'',
            }
        },
        mounted:function(){
            /*let myDate = new Date();*/
            var tYear = this.date_Time;
            this.options.push({value:tYear,label:tYear},{value:tYear-1,label:tYear-1});
            this.year=tYear;
            this.yearUp=tYear-1;
            /*this.date_Time=tYear;*/
            var regionCode = this.AppConfig.appInfo.regionCode;
            this.getRegion(regionCode);
            cityPmiData(this);
        },
        methods:{
            changeRegionName(item){
                this.fkRegioncode =item[item.length-1];
                cityPmiData(this);
            },
            chage:function () {
                var tYear = this.date_Time;
                this.year=tYear;
                this.yearUp=tYear-1;
                cityPmiData(this);
            },
            dateFormatter:function(){
                cityPmiData(this);
            },
            getRegion:function(regionCode){
                let self =this;
                let params = new URLSearchParams();
                params.append("regionCode",regionCode);
                self.$axios.post(
                    '/aircontrol/airassess/codReport/getRegionTree', params).then(function (res) {
                    if (res.code == 0) {
                        self.regionOptions = res.data;
                    }
                }).catch(function (err) {
                    console.log(err);
                    // self.message = "连接服务器失败！"
                });
            },
            regionChange:function () {
                //级联关闭
                this.$refs.refHandle.dropDownVisible = false;
                let _this =this;
                if(_this.fkRegioncode.constructor==Array){
                    _this.fkRegioncode=_this.fkRegioncode[_this.fkRegioncode.length-1];
                }
                cityPmiData(this);
            }
        },


    }
</script>

<style scoped>

</style>
