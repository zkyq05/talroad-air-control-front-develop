<template>
    <div>
        <div class="main-con">
            <div class="panel-default">
                <div class="panel-hd">
                    <div class="panel-tit text-blger">事件详情</div>
                    <div style="float: right;"><el-button style="min-width: 65px;" @click="retu"> 返回</el-button></div>
                </div>
                <div class="panel-bd">
                    <div class="panel-sub-tit">事件编号：{{row.taskCode}}</div>
                    <table class="table-box mt-lg" >
                        <colgroup>
                            <col >
                            <col style="width: 150px;">
                            <col>
                            <col  style="width: 150px;">
                        </colgroup>
                        <tr>
                            <th>事件描述</th>
                            <td style="width: 35%">{{row.eventDescName}}</td>
                            <th>处理状态</th>
                            <td style="width: 35%">
                                <span v-if="row.status==0" style="font-size: 17px">处理中</span>
                                <span v-if="row.status==1" style="font-size: 17px">已完成</span>
                                <span v-if="row.status==2" style="font-size: 17px">已办结</span>
                            </td>
                        </tr>
                    </table>
                    <div class="step mt">
                        <div class="step-bar"><div class="step-bar-active" :style="{'width':bar }"></div></div>
                        <ol class="step-list">
                            <li class="active" :style="{'width':barLi }">
                                <span class="step-num"></span>
                                <p class="step-txt"><span class="step-name">事件上报</span></p>
                                <p class="step-txt1">报警时间</p>
                                <p class="step-txt1">{{row.createTime}}</p>
                            </li>
                            <template v-for="(item) in status">
                                <li class="active" v-if="item.type=='process'" :style="{'width':barLi }">
                                    <span class="step-num"></span>
                                    <p class="step-txt"><span class="step-name">{{item.eventClassName}}</span></p>
                                    <p class="step-txt1">发起时间</p>
                                    <p class="step-txt1">{{item.createTime}}</p>
                                </li>
                                <li class="active" v-if="item.type=='review'" :style="{'width':barLi }">
                                    <span class="step-num"></span>
                                    <p class="step-txt"><span class="step-name">复查</span></p>
                                    <p class="step-txt1">发起时间</p>
                                    <p class="step-txt1">{{item.createTime}}</p>
                                </li>
                                <li class="active"  v-if="item.type=='review'" :style="{'width':barLi }">
                                    <span class="step-num"></span>
                                    <p class="step-txt"><span class="step-name">完成</span></p>
                                    <p class="step-txt1">发起时间</p>
                                    <p class="step-txt1">{{item.createTime}}</p>
                                </li>
                            </template>
                            <li class="active"  v-if="timeType==0" :style="{'width':barLi }">
                                <span class="step-num"></span>
                                <p class="step-txt"><span class="step-name">复查</span></p>
                                <p class="step-txt1">发起时间</p>
                                <p class="step-txt1">尚未发起</p>
                            </li>
                            <li  v-if="timeType==0" :style="{'width':barLi }">
                                <span class="step-num"></span>
                                <p class="step-txt"><span class="step-name">完成</span></p>
                                <p class="step-txt1">发起时间</p>
                                <p class="step-txt1">尚未发起</p>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
            <div class="panel-default mt-lg">
                <div style="margin-left: 20px;padding-top: 20px;padding-right: 20px">
                    <el-tabs style="width: 100%" v-model="activeName" @tab-click="tabClick" >
                        <el-tab-pane label="上报信息" name="first" >
                            <table class="table-box">
                                <colgroup>
                                    <col style="width: 150px;">
                                    <col>
                                    <col style="width: 150px;">
                                    <col>
                                </colgroup>
                                <tr>
                                    <th>事件描述</th>
                                    <td>{{secondData.eventDescName}}</td>
                                    <th>责任网格</th>
                                    <td>{{secondData.gridName}}</td>
                                </tr>
                                <tr>
                                    <th>事件类型</th>
                                    <td>{{secondData.problemTypeName}}</td>
                                    <th>上报人员</th>
                                    <td>{{secondData.username}}</td>
                                </tr>
                                <tr>
                                    <th>处理建议</th>
                                    <td>{{secondData.createTime}}</td>
                                    <th>上报时间</th>
                                    <td>
                                        {{secondData.createTime}}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        现场照片
                                    </th>
                                    <td>
                                        <div>
                                            <template v-for="(item,index) in thirdData.fileList">
                                                <el-image :key="index" :src="src+item['thumbUrl']" style="margin-left:3px;margin-right: 3px;float: left" :preview-src-list="ImageDialogUrl" @click="showImg(item,index,thirdData.fileList['thumbUrl'])"></el-image>
                                            </template>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </el-tab-pane>

                        <template v-for="(item,index) in status">
                            <el-tab-pane v-if="item.type=='process'" :label="item.eventClassName" :name="'thired'+index">
                                <table class="table-box">
                                    <tr>
                                        <th>操作名称</th>
                                        <td>
                                            {{thirdData.operationName}}
                                        </td>
                                        <th>
                                            转办时间
                                        </th>
                                        <td>
                                           {{thirdData.dealTime}}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            处理部门
                                        </th>
                                        <td>
                                            {{thirdData.unitName}}
                                        </td>
                                        <th>
                                            处理人
                                        </th>
                                        <td>
                                            {{thirdData.username}}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            截止时间
                                        </th>
                                        <td>
                                            {{thirdData.nextCompleteDate}}
                                        </td>
                                        <th>
                                            完成时间
                                        </th>
                                        <td>
                                            {{thirdData.completeDate}}
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>
                                            现场照片
                                        </th>
                                        <td>
                                            <div>
                                                <template v-for="(item,index) in thirdData.fileList">

                                                    <el-image :src="src+item['thumbUrl']" style="margin-left:3px;margin-right: 3px;float: left" :preview-src-list="ImageDialogUrl" @click="showImg(item,index,thirdData.fileList['thumbUrl'])"></el-image>

                                                </template>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </el-tab-pane>
                        </template>
                        <el-tab-pane  label="复查情况" name="fourth">
                            <table class="table-box">
                                <tr>
                                    <th>
                                        整改任务名称
                                    </th>
                                    <td>
                                       {{fourthData.eventDescName}}
                                    </td>
                                    <th>
                                        整改内容
                                    </th>
                                    <td>
                                    {{fourthData.eventDescName}}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        所属网格
                                    </th>
                                    <td>
                                        {{fourthData.gridName}}
                                    </td>
                                    <th>
                                        整改部门
                                    </th>
                                    <td>
                                        {{fourthData.unitName}}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        开始时间
                                    </th>
                                    <td>
                                       {{fourthData.nextCompleteDate}}
                                    </td>
                                    <th>
                                        结束时间
                                    </th>
                                    <td>
                                        {{fourthData.completeDate}}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        整改状态
                                    </th>
                                    <td>
                                       {{fourthData.createTime}}
                                    </td>
                                    <th>
                                        现场照片
                                    </th>
                                    <td>
                                        <div>
                                            <template v-for="(item,index) in fourthData.fileList">

                                                <el-image :key="index" :src="src+item['thumbUrl']" style="margin-left:3px;margin-right: 3px;float: left" :preview-src-list="ImageDialogUrl" @click="showImg(item,index,fourthData.fileList['thumbUrl'])"></el-image>

                                            </template>
                                        </div>
                                    </td>
                                </tr>

                            </table>
                        </el-tab-pane>
                    </el-tabs>
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
                row: this.$route.query.row,
                activeName:'first',
                step:2,
                status:[],
                secondData:[],
                thirdData:{},
                fourthData:{},
                src:this.IMG_URL,
                ImageDialogUrl:[],
                bar:'',
                barLi:'',
                timeType:0,
                limit:this.$route.query.limit,
            }

        },
        mounted:function () {
            this.initPage();
        },
        methods:{
            ovd:function(){
                //debugger
            },
            initPage: function () {
                let _this = this;
                console.info(_this.row.id)
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
                                _this.timeType=1;
                                _this.$axios.post(
                                    '/third/event/external/event/selectEventProcessById?id='+res.data[i].id
                                ).then(function (res) {
                                    if(res.code == 0){
                                        _this.fourthData = res.data;
                                    }
                                });
                            }
                        }
                        if(_this.timeType==0){
                            let nji= 100/(res.data.length+2);
                            _this.barLi= 100/(res.data.length+2)+'%';
                            _this.bar=(nji*res.data.length)+'%';
                        }else{
                            let nji= 100/(res.data.length);
                            _this.barLi= 100/(res.data.length)+'%';
                            _this.bar=(nji*res.data.length)+'%';
                        }
                    }
                })
            },
            retu:function(){
                this.$router.push({ path: '/EventReport',query:{'limit':this.limit}});

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
            cloOver:function () {
                //debugger
                $("cloOver").css("color","yellow");
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