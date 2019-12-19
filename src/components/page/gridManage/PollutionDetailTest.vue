<template>
    <div>
        <div class="main-con">
            <div class="panel-default">
                <div class="panel-hd">
                    <div class="panel-tit text-blger">排查任务详情</div>
                    <div style="float: right;"><el-button style="min-width: 65px;" @click="retu"> 返回</el-button></div>
                </div>
                <div class="panel-bd">
                    <div class="panel-sub-tit">排查任务编号：{{row.taskCode}}</div>
                    <table class="table-box mt-lg" >
                        <colgroup>
                            <col >
                            <col style="width: 150px;">
                            <col>
                            <col  style="width: 150px;">
                            <col>
                            <col  style="width: 150px;">
                        </colgroup>
                        <tr>
                            <th>排查任务名称</th>
                            <td style="width: 0%">{{result.taskName}}</td>
                            <th>排查要求</th>
                            <td style="width: 0%">
                                {{result.taskExplain}}
                            </td>
                            <th>
                                状态
                            </th>
                            <td>
                                <span v-if="row.signStatus==0" style="font-size: 17px">待处理</span>
                                <span v-if="row.signStatus==1" style="font-size: 17px">处理中</span>
                                <span v-if="row.signStatus==2" style="font-size: 17px">已完成</span>
                            </td>
                        </tr>
                    </table>
                    <div class="step mt">
                        <div class="step-bar"><div class="step-bar-active" :style="{'width':bar }"></div></div>
                        <ol class="step-list">
                            <li class="active"   v-if="row.alarmId!=null" :style="{'width':barLi }">
                                <span class="step-num"></span>
                                <p class="step-txt"><span class="step-name">报警</span></p>
                                <p class="step-txt1">报警时间</p>
                                <p class="step-txt1">{{row.createTime}}</p>
                            </li>

                            <li    :style="{'width':barLi }" :class="{'active':step>=1}">
                                <span class="step-num"></span>
                                <p class="step-txt"><span class="step-name">排查</span></p>
                                <p class="step-txt1">发起时间</p>
                                <p class="step-txt1">尚未发起</p>
                            </li>
                            <li    :style="{'width':barLi }" :class="{'active':step>=2}">
                                <span class="step-num"></span>
                                <p class="step-txt"><span class="step-name">管控</span></p>
                                <p class="step-txt1">发起时间</p>
                                <p class="step-txt1">尚未发起</p>
                            </li>
                            <li    :style="{'width':barLi }" :class="{'active':step>=3}">
                                <span class="step-num"></span>
                                <p class="step-txt"><span class="step-name">复查</span></p>
                                <p class="step-txt1">发起时间</p>
                                <p class="step-txt1">尚未发起</p>
                            </li>
                            <li   :style="{'width':barLi }" :class="{'active':step>=4}">
                                <span class="step-num"></span>
                                <p class="step-txt"><span class="step-name">完成</span></p>
                                <p class="step-txt1">发起时间</p>
                                <p class="step-txt1">尚未发起</p>
                            </li>
                        </ol>
                    </div>
                </div>
                <div class="panel-default mt-lg">
                    <div style="margin-left: 20px;padding-top: 20px;padding-right: 20px">
                    <el-tabs style="width: 97%" v-model="activeName" ref="tabs">
                        <el-tab-pane label="报警信息" name="first">
                            <table class="table-box">
                                <tr>
                                    <th>
                                        报警时间
                                    </th>
                                    <td>
                                        {{result.alarm_time}}
                                    </td>
                                    <th>
                                        浓度值
                                    </th>
                                    <td>
                                        {{result.Potency}}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        报警站点
                                    </th>
                                    <td>
                                        {{result.StationName}}
                                    </td>
                                    <th>
                                        报警参数
                                    </th>
                                    <td>
                                        {{result.PotenPollutantNamecy}}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        站点地址
                                    </th>
                                    <td>
                                        {{result.Address}}
                                    </td>
                                    <th>
                                        报警类型
                                    </th>
                                    <td>
                                        {{foType(result.fk_alarm_type)}}
                                    </td>
                                </tr>
                            </table>
                        </el-tab-pane>

                        <el-tab-pane label="排查任务" name="second" ref="second0">
                            <table class="table-box">
                                <tr>
                                    <th>
                                        排查任务名称
                                    </th>
                                    <td>
                                        {{secondData.taskName}}
                                    </td>
                                    <th>
                                        排查对象
                                    </th>
                                    <td>
                                        {{secondData.addressName}}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        开始时间
                                    </th>
                                    <td>
                                        {{secondData.cteateTime}}
                                    </td>
                                    <th>
                                        完成时间
                                    </th>
                                    <td>
                                        {{secondData.dealTime}}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        排查人员
                                    </th>
                                    <td>
                                        {{secondData.username}}
                                    </td>
                                    <th>
                                        排查要求
                                    </th>
                                    <td>
                                        {{secondData.taskExplain}}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        排查结果
                                    </th>
                                    <td>
                                        {{secondData.dealOpinion}}
                                    </td>
                                    <th>
                                        现场照片
                                    </th>
                                    <td>
                                        <template slot-scope="scope">
                                            <el-image :key="index"  v-for="(item,index) in scope.row.fileList" :src="IMG_URL+item['thumbUrl']"  style="margin-left:3px;margin-right: 3px;width: 50px;height: 50px" :preview-src-list="ImageDialogUrl" @click="showImg(item,index,scope.row.fileList)"></el-image>
                                        </template>
                                    </td>
                                </tr>
                            </table>
                        </el-tab-pane>

                        <el-tab-pane label="整改措施" name="third">
                            <table class="table-box">
                                <tr>
                                    <th>
                                        整改任务名称
                                    </th>
                                    <td>
                                        {{thirdData.taskName}}
                                    </td>
                                    <th>
                                        排查要求
                                    </th>
                                    <td>
                                        {{thirdData.taskExplain}}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        整改部门
                                    </th>
                                    <td>
                                        {{thirdData.unitName}}
                                    </td>
                                    <th>
                                        开始时间
                                    </th>
                                    <td>
                                        {{formatterDate(thirdData.createTime)}}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        结束时间
                                    </th>
                                    <td>
                                        {{formatterDate(thirdData.completeDate)}}
                                    </td>
                                    <th>
                                        处理状态
                                    </th>
                                    <td>
                                        <span style="color: #f93eec" v-if="thirdData.signStatus == 0">进行中</span>
                                        <span style="color: #46ff4a" v-if="thirdData.signStatus == 1">已完成</span>
                                        <span style="color: #261aff" v-if="thirdData.signStatus == 2">已办结</span>
                                        <span style="color: #f41b30" v-if="thirdData.signStatus == 3">已撤回</span>
                                    </td>
                                </tr>
                            </table>
                        </el-tab-pane>

                        <el-tab-pane label="复查情况" name="fourth">
                            <table class="table-box">
                                <tr>
                                    <th>
                                        复查任务名称
                                    </th>
                                    <td>
                                        {{fourthData.taskName}}
                                    </td>
                                    <th>
                                        复查对象名称
                                    </th>
                                    <td>
                                        {{fourthData.addressName}}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        复查人
                                    </th>
                                    <td>
                                        {{fourthData.username}}
                                    </td>
                                    <th>
                                        复查时间
                                    </th>
                                    <td>
                                        {{formatterDate(fourthData.cteateTime)}}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        是否整改完成
                                    </th>
                                    <td>
                                        {{fourthData.dealOpinion}}
                                    </td>
                                </tr>
                            </table>
                        </el-tab-pane>
                    </el-tabs>
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
                dialogFormVisible: false,
                row:this.$route.query.row,
                activeName:'second',
                step:0,
                status:[],
                secondData:{},
                thirdData:{},
                fourthData:{},
                IMG_URL:this.AppConfig.appInfo.IMG_URL,
                ImageDialogUrl:[],
                bar:'',
                barLi:'',
            }

        },
        mounted:function () {
            this.getStatus();
        },
        methods:{
            getStatus: function () {
                let _this = this;
                _this.step=0;
                let  url   ="/third/task/external/task/selectTaskTimeLineByTaskId?id="+_this.row.id;
                _this.$axios.get(url).then(function (res) {
                    _this.status = res.data;
                    let bol=true;
                    if(res.code == 0){
                        if(res.data != null && res.data.length > 0){
                            for(var i = 0; i<res.data.length;i++){
                                if(res.data[i].taskClassName ==null){
                                    _this.step=0;
                                }
                                if(res.data[i].taskClassName == "排查"){
                                    _this.step++;
                                    _this.$axios.get(
                                        '/third/task/external/task/selectTaskByTaskId?id='+res.data[i].id
                                    ).then(function (res) {
                                        if(res.code == 0){
                                            _this.secondData = res.data[0];
                                        }
                                    });
                                }
                                if(res.data[i].taskClassName == "整改"){
                                    _this.step++;
                                    _this.$axios.get(
                                        '/third/task/external/task/selectTaskByTaskId?id='+res.data[i].id
                                    ).then(function (res) {
                                        if(res.code == 0){
                                            _this.thirdData = res.data[0];
                                        }
                                    });
                                }
                                if(res.data[i].taskClassName == "管控"){
                                    if(bol){
                                        _this.step++;
                                        bol=false;
                                    }
                                }
                                if(res.data[i].taskClassName =="复查"){
                                    _this.step++;
                                    _this.$axios.get(
                                        '/third/task/external/task/selectTaskByTaskId?id='+res.data[i].id
                                    ).then(function (res) {
                                        if(res.code == 0){
                                            _this.fourthData = res.data[0];
                                        }
                                    });
                                }
                            }
                        }
                        if(_this.row.alarmId!=null){
                            _this.step++;
                            _this.barLi= 100/5+'%';
                            _this.bar=(_this.step*20)+'%';
                        }else {
                            _this.barLi= 100/4+'%';
                            _this.bar=(100/4)+'%';
                        }
                    }
                })

            },
            initPage: function () {
                let _this = this;
               if(_this.status.length>=1){
                   _this.$axios.get('/third/task/external/task/selectTaskByTaskId?id='+_this.status[0].id).then(function (res) {
                       _this.secondData = res.data[0];
                   })
               }
               if(_this.status.length>=2){
                   _this.$axios.get('/third/task/external/task/selectTaskByTaskId?id='+_this.status[1].id).then(function (res) {
                       _this.thirdData = res.data[0];
                   })
               }
               if(_this.status.length>=3){
                   _this.$axios.get('/third/task/external/task/selectTaskByTaskId?id='+_this.status[2].id).then(function (res) {
                       _this.fourthData = res.data[0];
                   })
               }
               //_this.result.alarm_time = new Date( _this.result.alarm_time).format("yyyy-MM-dd hh:mm:ss")
            },
            retu:function(){
                this.$router.push({ path: '/PollutionScreening'});
            },
            //图片展示
            showImg(item,index,total) {
                this.ImageDialogUrl = [];
                this.ImageDialogUrl.push(this.IMG_URL + item["fileUrl"]);
                for (var i = 0; i < total.length; i++) {
                    if (index != i) {
                        this.ImageDialogUrl.push(this.IMG_URL + total[i]["fileUrl"])
                    }
                }
            },
            //步骤条显示
            activeTest:function (num) {

                return ++num;
            },
            formatterDate(value){
                if(value==undefined){
                    return '';
                }
                let val= new Date(value).format("yyyy-MM-dd hh:mm:ss");
                return val;
            },
            foType:function(row,column,value){
                if(value==1){
                    return '离线报警';
                }
                if(value==2){
                    return '污染报警';
                }
                if(value==3){
                    return '超过目标值';
                }
                if(value==4){
                    return '将要超过目标值';
                }
                if(value==5){
                    return '超过国控站';
                }
                if(value==6){
                    return '超过全市平均值';
                }
                if(value==7){
                    return '突然升高';
                }
            },
            tabClick:function (tab) {
                if(tab.name=="first"){
                    let _this=this;
                    if(_this.row.alarmId!=null){
                        var params = new URLSearchParams();
                        params.append("pk_id",_this.row.alarmId);
                        params.append("task_class", 2);
                        params.append("task_source", 2);
                        _this.$axios.post(
                                '/api/monitorAlarm/getListByParams',params
                        ).then(function (res) {
                            let arr =new Array();
                            _this.result = res.data.list[0];

                            // _this.result.alarm_time = new Date( _this.result.alarm_time).format("yyyy-MM-dd hh:mm:ss")
                        });
                    }
                }
            }
        },

    }
</script>

<style>
     .el-tabs__item {
        font-size: 22px;
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