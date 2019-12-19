<template>
    <div>
        <div style="margin-top: 20px;">
            <div style="margin-left:15px">
                <el-button style="border: none;font-size: 18px;" @click="retu" ><</el-button><span style="font-size: 15px"><span style="margin-left: 20px" class="current">事件上报</span></span>
                <br>
                <h1 style="font-size: 30px;">事件上报详情页</h1>
            </div>
        </div>

        <div style="margin-top: 20px;">
            <div style="margin-left: 15px">
                <table>
                    <tr>
                        <td>
                            <span style="font-size: 17px">事件编号：{{row.taskCode}} </span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span style="font-size: 17px">事件名称: {{row.eventDescName}}</span>
                        </td>
                        <td>
                            <span style="font-size: 17px">事件描述: {{row.eventDescName}}</span>
                        </td>
                        <td>
                            <span style="font-size: 17px">处理状态: </span>
                            <span v-if="row.status==0" style="font-size: 17px">处理中</span>
                            <span v-if="row.status==1" style="font-size: 17px">已完成</span>
                            <span v-if="row.status==2" style="font-size: 17px">已办结</span>
                        </td>
                    </tr>
                </table>
            </div>
            <div style="margin-top: 20px; margin-bottom: 20px;margin-left:15px">
                <el-steps :space="250" :active="status.length"  finish-status="success">
                    <el-step title="事件上报" :description="'上报时间:'+row.createTime"></el-step>
                    <template  v-for="(item) in status">
                        <el-step v-if="item.type=='process'" :title="item.eventClassName" :description="'发起时间:'+item.createTime"></el-step>
                        <el-step v-if="item.type=='review'" title="复查"  :description="'发起时间:'+item.createTime"></el-step>
                        <el-step v-if="item.type=='review'" title="完成" :description="'发起时间:'+item.createTime"></el-step>
                    </template>

                        <el-step v-if="status.length==1" title="复查"></el-step>
                        <el-step v-if="status.length==1" title="完成"></el-step>
                </el-steps>

<!--                <el-button style="margin-left: 600px" type="success" plain  size="mini" >催办</el-button>-->
            </div>
<!--            <div style="margin-left: 15px">-->
<!--                <table>-->
<!--                    <tr>-->
<!--                        <td>-->
<!--                            <span style="font-size: 17px"> </span><br/><span>{{}}</span>-->
<!--                        </td>-->
<!--                        <template v-for="(item,index) in status">-->
<!--                            <td>-->
<!--                                <span v-if="item.type!='info'" style="font-size: 17px;margin-left: -500px">发起时间:</span><br/><span v-if="item.type!='info'" >{{item.createTime}}</span>-->
<!--                            </td>-->
<!--                        </template>-->
<!--                    </tr>-->
<!--                </table>-->
<!--            </div>-->
        </div>



        <div style="margin-left:15px">
            <div>
                <el-tabs style="width: 97%" v-model="activeName" @tab-click="tabClick">
                    <el-tab-pane label="上报信息" name="first">
                        <table>
                            <tr>
                                <td>
                                    <span style="font-size: 17px"> 事件描述:{{secondData.eventDescName}}</span>
                                </td>
                                <td>
                                    <span style="font-size: 17px"> 责任网格:{{secondData.gridName}}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span style="font-size: 17px"> 事件类型:{{secondData.problemTypeName}}</span>
                                </td>
                                <td>
                                    <span style="font-size: 17px"> 上报人员:{{secondData.username}}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span style="font-size: 17px"> 处理建议:{{secondData.remark}}</span>
                                </td>
                                <td>
                                    <span style="font-size: 17px"> 上报时间:{{secondData.createTime}}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>

                                    <div>
                                 <div style="float: left;font-size: 17px">现场照片:</div>
                                <template v-for="(item,index) in secondData.fileList">

                                <el-image :src="src+item['thumbUrl']" style="margin-left:3px;margin-right: 3px;float: left" :preview-src-list="ImageDialogUrl" @click="showImg(item,index,secondData.fileList['thumbUrl'])"></el-image>

                                 </template>
                                  </div>
                                </td>
                            </tr>
                        </table>
<!--                        <el-table border :data="secondData">-->
<!--&lt;!&ndash;                        <el-table-column prop="" label="事件名称" width="auto" align="center"></el-table-column>&ndash;&gt;-->
<!--                        <el-table-column prop="gridName" label="责任网格" width="auto" align="center"></el-table-column>-->
<!--                        <el-table-column prop="problemType" label="事件类型" width="auto" align="center"></el-table-column>-->
<!--                        <el-table-column prop="username" label="上报人员" width="auto" align="center"></el-table-column>-->
<!--                        <el-table-column prop="eventDescName" label="事件描述" width="auto" align="center"></el-table-column>-->
<!--                        <el-table-column prop="remark" label="处理建议" width="auto" align="center"></el-table-column>-->
<!--                        <el-table-column prop="createTime" label="上报时间" width="auto" align="center"></el-table-column>-->
<!--&lt;!&ndash;                        <el-table-column prop="fileList" label="现场照片" width="auto" align="center"></el-table-column>&ndash;&gt;-->
<!--                        </el-table>-->
                    </el-tab-pane>

                    <template v-for="(item,index) in status">
                        <el-tab-pane v-if="item.type=='process'" :label="item.eventClassName" :name="'thired'+index">
                            <table>
                                <tr>
                                    <td>
                                        <span style="font-size: 17px"> 操作名称:{{thirdData.operationName}}</span>
                                    </td>
                                    <td>
                                        <span style="font-size: 17px"> 转办时间:{{thirdData.dealTime}}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span style="font-size: 17px"> 处理部门:{{thirdData.unitName}}</span>
                                    </td>
                                    <td>
                                        <span style="font-size: 17px"> 处理人:{{thirdData.username}}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span style="font-size: 17px"> 截止时间:{{thirdData.nextCompleteDate}}</span>
                                    </td>
                                    <td>
                                        <span style="font-size: 17px"> 完成时间:{{thirdData.completeDate}}</span>
                                    </td>
                                </tr>

                                <tr>
                                    <td>

                                        <div>
                                            <div style="float: left;font-size: 17px">现场照片:</div>
                                            <template v-for="(item,index) in thirdData.fileList">

                                                <el-image :src="src+item['thumbUrl']" style="margin-left:3px;margin-right: 3px;float: left" :preview-src-list="ImageDialogUrl" @click="showImg(item,index,thirdData.fileList['thumbUrl'])"></el-image>

                                            </template>
                                        </div>
                                    </td>
                                </tr>
                            </table>
<!--                            <el-table border :data="item">-->
<!--                                <el-table-column prop="operationName" label="操作名称" width="auto" align="center"></el-table-column>-->
<!--                                <el-table-column prop="dealTime" label="转办时间" width="auto" align="center"></el-table-column>-->
<!--                                <el-table-column prop="unitName" label="处理部门" width="auto" align="center"></el-table-column>-->
<!--                                <el-table-column prop="username" label="处理人" width="auto" align="center"></el-table-column>-->
<!--                                <el-table-column prop="nextCompleteDate" label="截止时间" width="auto" align="center"></el-table-column>-->
<!--                                <el-table-column prop="completeDate" label="完成时间" width="auto" align="center"></el-table-column>-->
<!--                                <el-table-column prop="dealOpoinion" label="处理结果" width="auto" align="center"></el-table-column>-->
<!--                                <el-table-column prop="fileList" label="现场照片" width="auto" align="center"></el-table-column>-->
<!--                            </el-table>-->
                        </el-tab-pane>
                    </template>
                    <el-tab-pane label="复查情况" name="fourth">
                            <table>
                  <tr>
                      <td>
                          <span style="font-size: 17px"> 整改任务名称:{{fourthData.eventDescName}}</span>
                      </td>
                      <td>
                          <span style="font-size: 17px"> 整改内容:{{fourthData.eventDescName}}</span>
                      </td>
                  </tr>
                  <tr>
                      <td>
                          <span style="font-size: 17px"> 所属网格:{{fourthData.gridName}}</span>
                      </td>
                      <td>
                          <span style="font-size: 17px"> 整改部门:{{fourthData.unitName}}</span>
                      </td>
                  </tr>
                  <tr>
                      <td>
                          <span style="font-size: 17px"> 开始时间:{{fourthData.nextCompleteDate}}</span>
                      </td>
                      <td>
                          <span style="font-size: 17px"> 结束时间:{{fourthData.completeDate}}</span>
                      </td>
                  </tr>
                <tr>
                    <td>
                        <span style="font-size: 17px"> 整改状态:{{fourthData.createTime}}</span>
                    </td>
                </tr>
                                <tr>
                                    <td>

                                        <div>
                                            <div style="float: left;font-size: 17px">现场照片:</div>
                                            <template v-for="(item,index) in fourthData.fileList">

                                                <el-image :src="src+item['thumbUrl']" style="margin-left:3px;margin-right: 3px;float: left" :preview-src-list="ImageDialogUrl" @click="showImg(item,index,fourthData.fileList['thumbUrl'])"></el-image>

                                            </template>
                                        </div>
                                    </td>
                                </tr>
                   </table>
<!--                            <el-table-column prop="" label="整改任务名称" width="180" align="center"></el-table-column>-->
<!--                            <el-table-column prop="" label="整改内容" width="180" align="center"></el-table-column>-->
<!--                            <el-table-column prop="" label="所属网格" width="180" align="center"></el-table-column>-->
<!--                            <el-table-column prop="" label="整改部门" width="180" align="center"></el-table-column>-->
<!--                            <el-table-column prop="" label="开始时间" width="180" align="center"></el-table-column>-->
<!--                            <el-table-column prop="" label="结束时间" width="180" align="center"></el-table-column>-->
<!--                            <el-table-column prop="" label="整改状态" width="180" align="center"></el-table-column>-->
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
                result:{},
                dialogFormVisible: false,
                row: this.$route.query.row,
                activeName:'first',
                step:2,
                status:[],
                secondData:[],
                thirdData:{},
                fourthData:{},
                src:this.IMG_URL,
                ImageDialogUrl:[],
            }

        },
        mounted:function () {
            this.initPage();
        },
        methods:{
            initPage: function () {
                let _this = this;
                this.$axios.post(
                    '/third/event/external/event/selectEventTimeLineByEventId?id='+_this.row.id
                ).then(function (res) {
                    _this.result = res.data;
                    _this.status= res.data;
                    if(res.data != null && res.data.length > 0){
                        for(var i = 0; i<res.data.length;i++){
                            if(res.data[i].type == "info"){
                                _this.$axios.post(
                                    '/third/event/external/event/selectEventInfoById?id='+res.data[i].id
                                ).then(function (res) {
                                    if(res.code == 0){
                                        _this.secondData = res.data;
                                    }
                                });
                            }
                            if(res.data[i].type == "process"){
                                _this.$axios.post(
                                    '/third/event/external/event/selectEventProcessById?id='+res.data[i].id
                                ).then(function (res) {
                                    if(res.code == 0){
                                        _this.thirdData = res.data;
                                    }
                                });
                            }
                            if(res.data[i].type =="review"){
                                _this.$axios.post(
                                    '/third/event/external/event/selectEventProcessById?id='+res.data[i].id
                                ).then(function (res) {
                                    if(res.code == 0){
                                        _this.fourthData = res.data;
                                    }
                                });
                            }
                        }
                    }
                })
            },
            retu:function(){
                this.$router.push({ path: '/EventReport'});

            },
            //图片展示
            showImg(item,index,total) {
                this.ImageDialogUrl = [];
                this.ImageDialogUrl.push(this.src+ item["fileUrl"]);
                for (var i = 0; i < total.length; i++) {
                    if (index != i) {
                        this.ImageDialogUrl.push(this.src + total[i]["fileUrl"])
                    }
                }
            },
            tabClick:function (tab) {
                let _this=this;
                        for(let i=0;i<this.status.length;i++){
                            if(tab.name=='thired'+i){
                                _this.thirdData={};
                                _this.$axios.post(
                                    '/third/event/external/event/selectEventProcessById?id='+this.status[i].id
                                ).then(function (res) {
                                    if(res.code == 0){
                                        _this.thirdData = res.data;
                                    }
                                });
                                break;
                                }
                    }
            },
            formatterDate(value){
                let val= new Date(value).format("yyyy-MM-dd hh:mm:ss");
                return val;
            },

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