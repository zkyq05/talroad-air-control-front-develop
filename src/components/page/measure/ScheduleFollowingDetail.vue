<template>
    <div>
        <div class="sidebar">
            <div class="sidebar-head">措施执行</div>
            <ul class="sidebar-menu">
                <li class="menu-item is-open">
                    <a href="#">
                        <i class="icon icon-tongjifenxi menu-icon"></i><span @click="toScheduleFollowing" class="menu-txt">执行进度跟踪</span>
                    </a>
                </li>
                <li class="menu-item">
                    <a href="#">
                        <i class="icon icon-fenxibaogao menu-icon"></i><span @click="toMeasureStore" class="menu-txt">措施库</span>
                    </a>
                </li>
            </ul>
        </div>
        <!-- 主体 -->
        <div class="main-con">
            <div class="panel-default">
                <div class="panel-hd">
                    <div class="panel-tit text-blger">执行进度跟踪</div>
                </div>
                <div class="panel-bd">
                    <div class="panel-sub-tit">整改措施编号：{{result.taskCode}}</div>
                    <table class="table-box mt-lg">
                        <colgroup>
                            <col style="width: 150px;">
                            <col>
                            <col style="width: 150px;">
                            <col>
                        </colgroup>
                        <tr>
                            <th>任务名称</th>
                            <td>{{result.taskName}}</td>
                            <th>整改措施名称</th>
                            <td>{{result.measure}}</td>
                        </tr>
                        <tr>
                            <th>下发时间</th>
                            <td>{{result.createTime}}</td>
                            <th>实际结束时间</th>
                            <td>{{result.completeDate}}</td>
                        </tr>
                    </table>
                    <div class="step mt">
                        <div class="step-bar"><div class="step-bar-active" style="width:0%"></div></div>
                        <ol class="step-list">
                            <li class="active" id="alarm">
                                <span class="step-num"></span>
                                <p class="step-txt"><span class="step-name">报警事件</span></p>
                                <p class="step-txt1">报警时间</p>
                                <p class="step-txt1">
                                    {{result2.alarmTime != null ? new Date(result2.alarmTime).format("yyyy-MM-dd hh:mm:ss"):'' }}
                                </p>
                            </li>
                            <li id="screen">
                                <span class="step-num"></span>
                                <p class="step-txt"><span class="step-name">排查</span></p>
                                <span v-if="secondData.cteateTime != null">
                                    <p class="step-txt1">发起时间</p>
                                    <p class="step-txt1">{{new Date(secondData.cteateTime).format("yyyy-MM-dd hh:mm:ss")}}</p>
                                </span>
                                <span v-if="secondData.cteateTime == null">
                                    <p class="step-txt1">尚未发起</p>
                                </span>
                            </li>
                            <li id="control">
                                <span class="step-num"></span>
                                <p class="step-txt"><span class="step-name">管控</span><button class="el-button el-button--primary el-button--mini" style="width: 50px;" type="button"><!----><!----><span>催办</span></button></p>
                                <span v-if="thirdData.cteateTime != null">
                                    <p class="step-txt1">发起时间</p>
                                    <p class="step-txt1">{{new Date(thirdData.cteateTime).format("yyyy-MM-dd hh:mm:ss")}}</p>
                                </span>
                                <span v-if="thirdData.cteateTime == null">
                                    <p class="step-txt1">尚未发起</p>
                                </span>
                            </li>
                            <li id="recheck">
                                <span class="step-num"></span>
                                <p class="step-txt"><span class="step-name">复查</span></p>
                                <span v-if="fourthData.cteateTime != null">
                                    <p class="step-txt1">发起时间</p>
                                    <p class="step-txt1">{{new Date(fourthData.cteateTime).format("yyyy-MM-dd hh:mm:ss")}}</p>
                                </span>
                                <span v-if="fourthData.cteateTime == null">
                                    <p class="step-txt1">尚未发起</p>
                                </span>
                            </li>
                            <li id="ok">
                                <span class="step-num"></span>
                                <p class="step-txt"><span class="step-name">完成</span></p>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
            <div class="panel-default mt-lg">
                <div class="tab-box-03">
                    <div class="tab-hd">
                        <ul class="tab-head">
                            <li class="is-active">报警信息</li>
                            <li>排查任务</li>
                            <li>整改措施</li>
                            <li>复查情况</li>
                        </ul>
                    </div>
                    <div class="tab-bd pd-lg">
                        <div class="tab-item" style="display: block;">
                            <table class="table-box">
                                <colgroup>
                                    <col style="width: 10%;">
                                    <col style="width: 35%;">
                                    <col style="width: 10%;">
                                    <col style="width: 35%;">
                                </colgroup>
                                <tr>
                                    <th>报警编号：</th>
                                    <td>{{result2.pkId}}</td>
                                    <th>报警参数：</th>
                                    <td>{{result2.pollutantName}}</td>
                                </tr>
                                <tr>
                                    <th>报警时间：</th>
                                    <td>{{result2.alarmTime != null ? new Date(result2.alarmTime).format("yyyy-MM-dd hh:mm:ss"):''}}</td>
                                    <th>站点名称：</th>
                                    <td>{{result2.stationName}}</td>
                                </tr>
                                <tr>
                                    <th>浓度值：</th>
                                    <td>{{result2.monitorValue}}</td>
                                    <th>状态：</th>
                                    <td class="color-level4">
                                        <span class="level01" v-if="result.status == 0"> 进行中</span>
                                        <span class="level02" v-if="result.status == 1"> 已完成</span>
                                        <span class="level03" v-if="result.status == 2"> 已办结</span>
                                        <span class="level04" v-if="result.status == 3"> 失效  </span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>报警描述</th>
                                    <td>{{result2.remarks}}</td>
                                </tr>
                            </table>
                        </div>
                        <div class="tab-item">
                            <table class="table-box">
                                <colgroup>
                                    <col style="width: 15%;">
                                    <col style="width: 35%;">
                                    <col style="width: 15%;">
                                    <col style="width: 35%;">
                                </colgroup>
                                <tr>
                                    <th>排查任务名称</th>
                                    <td>{{secondData.taskName}}</td>
                                    <th>排查人员</th>
                                    <td>{{secondData.username}}</td>
                                </tr>
                                <tr>
                                    <th>开始时间</th>
                                    <td>{{secondData.cteateTime != null ? new Date(secondData.cteateTime).format("yyyy-MM-dd hh:mm:ss"):''}}</td>
                                    <th>完成时间</th>
                                    <td>{{secondData.dealTime != null ? new Date(secondData.dealTime).format("yyyy-MM-dd hh:mm:ss"):''}}</td>
                                </tr>
                                <tr>
                                    <th>任务状态</th>
                                    <td>
                                        <span class="level01" v-if="secondData.signStatus == 0">未签收</span>
                                        <span class="level02" v-if="secondData.signStatus == 1">已签收</span>
                                        <span class="level03" v-if="secondData.signStatus == 2">已处理</span>
                                        <span class="level04" v-if="secondData.signStatus == 3">已完成</span>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="tab-item">
                            <table class="table-box">
                                <colgroup>
                                    <col style="width: 15%;">
                                    <col style="width: 35%;">
                                    <col style="width: 15%;">
                                    <col style="width: 35%;">
                                </colgroup>
                                <tr>
                                    <th>整改任务名称</th>
                                    <td>{{thirdData.taskName}}</td>
                                    <th>整改内容</th>
                                    <td>{{thirdData.taskExplain}}</td>
                                </tr>
                                <tr>
                                    <th>整改部门</th>
                                    <td>{{thirdData.unitName}}</td>
                                    <th>开始时间</th>
                                    <td>{{thirdData.cteateTime != null ? new Date(thirdData.cteateTime).format("yyyy-MM-dd hh:mm:ss"):''}}</td>
                                </tr>
                                <tr>
                                    <th >结束时间</th>
                                    <td> {{thirdData.dealTime != null ? new Date(thirdData.dealTime).format("yyyy-MM-dd hh:mm:ss"):''}}</td>
                                    <th >处理状态</th>
                                    <td>
                                        <span class="level01" v-if="thirdData.signStatus == 0">未签收</span>
                                        <span class="level02" v-if="thirdData.signStatus == 1">已签收</span>
                                        <span class="level03" v-if="thirdData.signStatus == 2">已处理</span>
                                        <span class="level04" v-if="thirdData.signStatus == 3">已完成</span>
                                    </td>
                                </tr>

                            </table>
                        </div>
                        <div class="tab-item">
                            <table class="table-box">
                                <colgroup>
                                    <col style="width: 15%;">
                                    <col style="width: 35%;">
                                    <col style="width: 15%;">
                                    <col style="width: 35%;">
                                </colgroup>
                                <tr>
                                    <th>复查任务名称</th>
                                    <td>{{fourthData.taskName}}</td>
                                    <th>复查对象名称</th>
                                    <td>{{fourthData.addressName}}</td>
                                </tr>
                                <tr>
                                    <th>复查人</th>
                                    <td>{{fourthData.username}}</td>
                                    <th>复查时间</th>
                                    <td>{{fourthData.cteateTime != null ? new Date(fourthData.cteateTime).format("yyyy-MM-dd hh:mm:ss"):''}}</td>
                                </tr>
                                <tr>
                                    <th>是否整改完成</th>
                                    <td>
                                        <span class="level01" v-if="fourthData.signStatus == 0">未签收</span>
                                        <span class="level02" v-if="fourthData.signStatus == 1">已签收</span>
                                        <span class="level03" v-if="fourthData.signStatus == 2">已处理</span>
                                        <span class="level04" v-if="fourthData.signStatus == 3">已完成</span>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MonitorDetail",
        components:{

        },
        data:function(){
            return{
                tabIndex: 2,
                tableData:[],
                result:{},
                result2:{},
                condition: this.$route.query.condition,
                firstData:null,
                secondData:{},
                thirdData:{},
                fourthData:{},
            }

        },
        mounted:function () {
            this.initPage();

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
            toMeasureStore:function(){
                this.$router.push({path: '/MeasureStore'})
            },
            toScheduleFollowing:function(){
                this.$router.push({path: '/ScheduleFollowing'})
            },
            initPage: function () {
                let _this = this;

                var params2 = new URLSearchParams();
                params2.append("selectCorrectiveActionsJson",JSON.stringify({taskId:_this.$route.query.id}));
                _this.$axios.post('/third/task/external/task/selectCorrectiveActions',params2).then(function (res) {
                    if(res.code == 0) {
                        _this.result = res.data.records[0];
                        _this.result.createTime = new Date(_this.result.createTime).format("yyyy-MM-dd hh:mm:ss");
                        _this.result.completeDate = new Date(_this.result.completeDate).format("yyyy-MM-dd hh:mm:ss");
                        if (_this.result.alarmId == null) {
                            _this.result.alarmId = '';
                        }
                        var params = new URLSearchParams();
                        params.append("pk_id", _this.result.alarmId);
                        params.append("task_class", 2);
                        params.append("task_source", 2);
                        _this.$axios.post(
                            '/aircontrol/airmeasures/monitorAlarm/getListByParams', params
                        ).then(function (res) {
                            _this.result2 = res.data.list[0];
                        });

                        if (_this.result.alarmId != null && _this.result.alarmId != '') {
                            _this.$axios.get(
                                '/third/task/external/task/selectTaskByAlarmId?id=' + _this.result.alarmId
                            ).then(function (res) {
                                if (res.code == 0) {
                                    if (res.data != null && res.data.length > 0) {
                                        for (var i = 0; i < res.data.length; i++) {
                                            if(res.data[i].taskClassName == "排查"){
                                                $("#screen").addClass("active");
                                                $(".step-bar-active").width("40%");
                                                _this.$axios.get(
                                                    '/third/task/external/task/selectTaskByTaskId?id='+res.data[i].id
                                                ).then(function (res) {
                                                    if(res.code == 0){
                                                        if(res.data[0] != null){
                                                            _this.secondData = res.data[0];
                                                        }
                                                    }
                                                });
                                            }
                                            if(res.data[i].taskClassName == "管控"){
                                                $("#control").addClass("active");
                                                $(".step-bar-active").width("40%");
                                                _this.$axios.get(
                                                    '/third/task/external/task/selectTaskByTaskId?id='+res.data[i].id
                                                ).then(function (res) {
                                                    if(res.code == 0){
                                                        if(res.data[0] != null){
                                                            _this.thirdData = res.data[0];
                                                        }
                                                        if(_this.thirdData[0].signStatus == 3){
                                                            $(".step-bar-active").width("80%");
                                                        }
                                                    }
                                                });
                                            }
                                            if(res.data[i].taskClassName =="复查"){
                                                $("#reCheck").addClass("active");
                                                $(".step-bar-active").width("60%");
                                                _this.$axios.get(
                                                    '/third/task/external/task/selectTaskByTaskId?id='+res.data[i].id
                                                ).then(function (res) {
                                                    if(res.code == 0){
                                                        if(res.data[0] != null){
                                                            _this.fourthData = res.data[0];
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    }
                                }
                            });
                        }
                    }
                })
            },
            retu:function(){
                this.$router.push({ path: '/ScheduleFollowing'});
            }
        },


    }
</script>

<style scoped>


</style>