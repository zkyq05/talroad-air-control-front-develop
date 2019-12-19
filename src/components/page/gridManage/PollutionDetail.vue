<template>
    <div>
        <div style="margin-top: 20px;">
            <div style="margin-left: 15px">
                <el-button style="border: none;font-size: 18px;" @click="retu" ><</el-button><span style="font-size: 15px"><span style="margin-left: 20px" class="current">污染排查</span></span>
                <br>
                <h1 style="font-size: 30px; ">排查任务详情页</h1>
            </div>
        </div>

        <div style="margin-top: 20px;">
            <div style="margin-left: 15px">
                <table>
                    <tr>
                        <td>
                            <span style="font-size: 17px">排查任务编号：{{row.taskCode}} </span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span style="font-size: 17px">排查任务名称: {{result.taskName}}</span>
                        </td>
                        <td>
                            <span style="font-size: 17px">排查要求:{{result.taskExplain}}</span>
                        </td>
                        <td>
                            <span style="font-size: 17px">状态: </span>
                            <span v-if="row.signStatus==0" style="font-size: 17px">待处理</span>
                            <span v-if="row.signStatus==1" style="font-size: 17px">处理中</span>
                            <span v-if="row.signStatus==2" style="font-size: 17px">已完成</span>
                        </td>
                    </tr>
                </table>
            </div>
            <div style="margin-top: 20px; margin-bottom: 20px;">
                    <el-steps :space="250" :active="step" align-center finish-status="success" >
                            <el-step v-if="row.alarmId!=null" title="报警"></el-step>
                            <el-step  title="排查"></el-step>
                            <el-step title="管控"></el-step>
                            <el-step title="复查"></el-step>
                            <el-step title="完成"></el-step>
                    </el-steps>
<!--                <el-button id="elbu" style="margin-left: 50px;margin-top: 50px" type="success" plain  size="mini" >催办</el-button>-->
            </div>
            <div style="margin-left: 15px">
                <table>
                    <tr>
<!--                        <td>-->
<!--                            <span style="font-size: 17px"> 报警时间{{result.cteateTime}}</span>-->
<!--                        </td>-->
                        <template v-for="(item,index) in status">
                            <td>
                                <span style="font-size: 17px;margin-left:93px">发起时间{{item.createTime}}</span>
                            </td>
                        </template>
                    </tr>
                </table>
            </div>
        </div>



        <div style="margin-left: 15px">
            <div>
                <el-tabs style="width: 97%" v-model="activeName" ref="tabs" @tab-click="tabClick">
                    <el-tab-pane label="报警信息" name="first">
                        <el-table border :data="result">
                            <el-table-column prop="alarm_time" label="报警时间" width="auto" align="center"></el-table-column>
<!--                            <el-table-column prop="" label="所属网格" width="180" align="center"></el-table-column>-->
                            <el-table-column prop="Potency" label="浓度值" width="auto" align="center"></el-table-column>
                            <el-table-column prop="StationName" label="报警站点" width="auto" align="center"></el-table-column>
                            <el-table-column prop="PollutantName" label="报警参数" width="auto" align="center"></el-table-column>
                            <el-table-column prop="" label="报警级别" width="auto" align="center"></el-table-column>
                            <el-table-column prop="Address" label="站点地址" width="auto" align="center"></el-table-column>
                            <el-table-column prop="fk_alarm_type" label="报警类型" width="auto" align="center" :formatter="foType"></el-table-column>
                        </el-table>

                    </el-tab-pane>

                    <el-tab-pane label="排查任务" name="second" ref="second0">
                        <el-table border :data="secondData">
                            <el-table-column prop="taskName" label="排查任务名称" width="auto" align="center"></el-table-column>
                            <el-table-column prop="addressName" label="排查对象" width="auto" align="center"></el-table-column>
                            <el-table-column prop="cteateTime" label="开始时间" width="auto" align="center"></el-table-column>
                            <el-table-column prop="dealTime" label="完成时间" width="auto" align="center"></el-table-column>
<!--                            <el-table-column prop="unitName" label="所属网格" width="auto" align="center"></el-table-column>-->
                            <el-table-column prop="username" label="排查人员" width="auto" align="center"></el-table-column>
                            <el-table-column prop="taskExplain" label="排查要求" width="auto" align="center"></el-table-column>
                            <el-table-column prop="dealOpinion" label="排查结果" width="auto" align="center"></el-table-column>
                            <el-table-column prop="" label="发现问题" width="auto" align="center"></el-table-column>
                            <el-table-column label="现场照片" width="auto" align="center">
                                <template slot-scope="scope">
                                        <el-image  v-for="(item,index) in scope.row.fileList" :src="IMG_URL+item['thumbUrl']"  style="margin-left:3px;margin-right: 3px;width: 50px;height: 50px" :preview-src-list="ImageDialogUrl" @click="showImg(item,index,scope.row.fileList)"></el-image>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>

                    <el-tab-pane label="整改措施" name="third">
                        <el-table border :data="thirdData">
                            <el-table-column align="center" label="整改任务名称" prop="taskName" width="auto"></el-table-column>
                            <el-table-column align="center" label="整改内容" prop="taskExplain" width="auto"></el-table-column>
                            <el-table-column align="center" label="整改部门" prop="unitName" width="auto"></el-table-column>
                            <el-table-column :formatter="formatterDate" align="center" label="开始时间" prop="createTime" width="auto"></el-table-column>
                            <el-table-column :formatter="formatterDate" align="center" label="结束时间" prop="completeDate" width="auto"></el-table-column>
                            <el-table-column align="center" label="处理状态" prop="signStatus" width="auto" >
                                <template slot-scope="scope" >
                                    <span style="color: #f93eec" v-if="scope.row.signStatus == 0">进行中</span>
                                    <span style="color: #46ff4a" v-if="scope.row.signStatus == 1">已完成</span>
                                    <span style="color: #261aff" v-if="scope.row.signStatus == 2">已办结</span>
                                    <span style="color: #f41b30" v-if="scope.row.signStatus == 3">已撤回</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>

                    <el-tab-pane label="复查情况" name="fourth">
                        <el-table border :data="fourthData">
                            <el-table-column align="center" label="复查任务名称" prop="taskName" width="auto"></el-table-column>
                            <el-table-column align="center" label="复查对象名称" prop="addressName" width="auto"></el-table-column>
                            <el-table-column align="center" label="复查人" prop="username" width="auto"></el-table-column>
                            <el-table-column :formatter="formatterDate" align="center" label="复查时间" prop="cteateTime" width="auto"></el-table-column>
                            <el-table-column align="center" label="是否整改完成" prop="dealOpinion" width="auto"></el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
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
                result:[],
                dialogFormVisible: false,
                row:this.$route.query.row,
                activeName:'second',
                step:1,
                status:[],
                secondData:[],
                thirdData:[],
                fourthData:[],
                IMG_URL:this.AppConfig.appInfo.IMG_URL,
                ImageDialogUrl:[],
            }

        },
        mounted:function () {
            this.getStatus();
        },
        methods:{
            getStatus: function () {
                let _this = this;
                let  url   ="/third/task/external/task/selectTaskTimeLineByTaskId?id="+_this.row.id;
                _this.$axios.get(url).then(function (res) {
                    _this.status = res.data;
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
                                            _this.secondData = res.data;
                                        }
                                    });
                                }
                                if(res.data[i].taskClassName == "整改"){
                                    _this.step++;
                                    _this.$axios.get(
                                        '/third/task/external/task/selectTaskByTaskId?id='+res.data[i].id
                                    ).then(function (res) {
                                        if(res.code == 0){
                                            _this.thirdData = res.data;
                                        }
                                    });
                                }
                                if(res.data[i].taskClassName =="复查"){
                                    _this.step++;
                                    _this.$axios.get(
                                        '/third/task/external/task/selectTaskByTaskId?id='+res.data[i].id
                                    ).then(function (res) {
                                        if(res.code == 0){
                                            _this.fourthData = res.data;
                                        }
                                    });
                                }
                            }
                        }
                    }
                })

                    // _this.result.alarm_time = new Date( _this.result.alarm_time).format("yyyy-MM-dd hh:mm:ss")
            },
            initPage: function () {
                let _this = this;
               if(_this.status.length>=1){
                   _this.$axios.get('/third/task/external/task/selectTaskByTaskId?id='+_this.status[0].id).then(function (res) {
                       _this.secondData = res.data;
                   })
               }
               if(_this.status.length>=2){
                   _this.$axios.get('/third/task/external/task/selectTaskByTaskId?id='+_this.status[1].id).then(function (res) {
                       _this.thirdData = res.data;
                   })
               }
               if(_this.status.length>=3){
                   _this.$axios.get('/third/task/external/task/selectTaskByTaskId?id='+_this.status[2].id).then(function (res) {
                       _this.fourthData = res.data;
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
            formatterDate(row,column,value){
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
                            arr.push(res.data.list[0]);
                            _this.result = arr;

                            // _this.result.alarm_time = new Date( _this.result.alarm_time).format("yyyy-MM-dd hh:mm:ss")
                        });
                    }
                }
            }
        },

    }
</script>

<style scoped>
    td{
        width:20%;
        height:5%;
        line-height: 2.5;
    }

</style>