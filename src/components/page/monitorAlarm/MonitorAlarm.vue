<template>
    <div class="main-con hei-full" style="left: 0;padding:0">
        <div class="panel-default">
            <div class="pdl-lgest">
                <ul class="filter-box">
                    <li class="filter-item">
                        <div class="filter-label">时间范围</div>
                        <div class="filter-con">
                            <div class="el-button-group">
                                <button @click="change(null,$event)" class="el-button " type="button"><span>全部</span></button>
                                <button @click="change(-1,$event)" class="el-button el-button--primary" type="button"><span>今日</span></button>
                                <button @click="change(7,$event)" class="el-button " type="button"><span>最近7日</span></button>
                                <button @click="change(30,$event)" class="el-button " type="button"><span>最近30日</span></button>
                                <el-date-picker @change="change(-2,$event)"
                                                end-placeholder="结束日期"
                                                format="yyyy-MM-dd"
                                                range-separator="～"
                                                start-placeholder="开始日期"
                                                style="margin-left: 10px"
                                                type="daterange"
                                                v-model="condition.daytime"
                                                value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </div>
                        </div>
                    </li>
                    <li class="filter-item">
                        <div class="filter-label">任务状态</div>
                        <div class="filter-con">
                            <el-select @change="change(2,$event)" clearable placeholder="请选择" style="width:160px;" v-model="condition.status">
                                <el-option label="全部" value="-1"></el-option>
                                <el-option label="进行中" value="0"></el-option>
                                <el-option label="已完成" value="1"></el-option>
                                <el-option label="已办结" value="2"></el-option>
                                <el-option label="失效" value="3"></el-option>
                            </el-select>
                        </div>
                    </li>
                    <li class="filter-item">
                        <div class="filter-label">报警类型</div>
                        <div class="filter-con">
                            <el-select @change="change(2,$event)" clearable placeholder="请选择" style="width:160px;" v-model="condition.alarmType">
                                <el-option label="全部" value="-1"></el-option>
                                <el-option
                                        :key="item.pk_id"
                                        :label="item.name"
                                        :value="item.pk_id"
                                        v-for="item in alarmTypeList">
                                </el-option>
                            </el-select>
                        </div>
                    </li>
                </ul>
                <ul class="filter-box">
                    <li class="filter-item">
                        <div class="filter-label">报警参数</div>
                        <div class="filter-con">
                            <div class="el-button-group">
                                <button @click="fk(null,$event)" class="el-button el-button--primary" type="button"><span>全部</span></button>
                                <button @click="fk(9,$event)" class="el-button" type="button"><span>PM<i class="text-value">10</i></span></button>
                                <button @click="fk(10,$event)" class="el-button" type="button"><span>PM<i class="text-value">2.5</i></span></button>
                                <button @click="fk(6,$event)" class="el-button" type="button"><span>SO<i class="text-value">2</i></span></button>
                                <button @click="fk(7,$event)" class="el-button" type="button"><span>NO<i class="text-value">2</i></span></button>
                                <button @click="fk(8,$event)" class="el-button" type="button"><span>CO</span></button>
                                <button @click="fk(11,$event)" class="el-button" type="button"><span>O<i class="text-value">3</i></span></button>
                            </div>
                        </div>
                    </li>
                    <li class="filter-item pull-right">
                        <button @click="initPage" class="el-button el-button--primary" style="width: 140px;margin-right: 30px" type="button"><span>查询</span></button>
                    </li>
                </ul>
                <MonitorList ref="MonitorList"></MonitorList>
            </div>
        </div>
    </div>
</template>

<script>
import  MonitorList from './MonitorList'
    export default {
        name: "MonitorAlarm",
        components:{
            MonitorList
        },
        data:function(){
            return{
                alarmTypeList:[],
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
                condition:{
                    daytime:[],
                    status: null,
                    alarmType: null,
                    FK_ID: null,
                    stationName:'',
                },
            }
        },
        mounted:function () {
            if(this.$route.query.condition != undefined ){
                this.condition = this.$route.query.condition;
                this.$refs.MonitorList.selectCondition(this.condition);
            }

            this.change(-1,null);
            this.initPage();

            this.init();

            $('.tab-head>li').on("click",function(){
                var $index=$(this).index();
                // var $parent=$(this).parent().parent().parent();
                $(this).parent().children().removeClass("is-active");
                $(this).addClass("is-active");

                var $siblings=$(this).parent().parent().siblings(".tab-bd");
                $siblings.show();
                $siblings.children().hide();
                $siblings.children().eq($index).show();
            });
        },
        methods:{
            fk(FK_ID,e){
                this.condition.co2 = 1;
                this.condition.FK_ID = FK_ID;
                this.change(-2,e);
            },
            change(num,event){
                if(num != -2){
                    if(num != null && num !=""){
                        if(num == -1){
                            this.condition.daytime = [new Date().format('yyyy-MM-dd')];
                        }else{
                            const pre = new Date();
                            const now = new Date();
                            pre.setTime(now.getTime() - 3600 * 1000 * 24 * (num-1));
                            this.condition.daytime=[pre.format('yyyy-MM-dd'),now.format('yyyy-MM-dd')];
                        }
                    }else{
                        this.condition.daytime = null;
                    }
                }

                if(event != null){
                    $(event.currentTarget).addClass("el-button--primary");
                    var buttons = $(event.currentTarget).siblings(".el-button");
                    for(var i= 0;i<buttons.length;i++){
                        $(buttons[i]).removeClass("el-button--primary");
                    }
                }

            },
            init:function () {
                var _this = this;
                _this.$axios.post("aircontrol/airmeasures/monitorAlarm/getAlarmTypeByParams").then(function (res) {
                    if(res.code == 0){
                        _this.alarmTypeList = res.data;
                    }
                })
            },
            initPage:function () {
                this.$refs.MonitorList.selectCondition(this.condition);
            },

        }
    }
</script>

<style scoped>

</style>