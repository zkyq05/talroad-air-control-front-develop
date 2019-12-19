<template>
    <div>
        <div style="margin-top: 20px;">
            <div style="margin-left: 15px">
                <el-button style="border: none;font-size: 18px;" @click="retu" ><</el-button><span style="font-size: 15px"><span style="margin-left: 20px" class="current">巡查日志</span></span>
                <br>
                <h1 style="font-size: 30px; ">巡查日志详情页</h1>
            </div>
        </div>

        <div style="margin-top: 20px;">
            <div style="margin-left: 15px">
                <table>
                    <tr>
                        <td colspan="4">
                            <h1 style="font-size: 23px">巡查时间：{{result.patrolTime}}</h1>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">

                        </td>
                        <td colspan="4">
                            <span style="font-size: 17px"> <span>任务名称：</span> <span>{{result.taskName}}</span>  </span>
                        </td>
                        <td colspan="4">
                            <span style="font-size: 17px"> <span>巡查人员：</span> <span></span>{{result.username}}</span>
                        </td>
                        <td colspan="4">
                            <span style="font-size: 17px"> <span>责任网格：</span> <span>{{result.gridName}}</span>  </span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">

                        </td>
                        <td colspan="4">
                            <span style="font-size: 17px"> <span>巡查对象：</span> <span>{{result.addressName}}</span>  </span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <span style="font-size: 23px"> <span>巡查结果：</span>
                                <span>
                                    <span style="font-size: 17px" v-if="result.patrolReslt == 0"> <span>未发现问题</span>  </span>
                                    <span style="font-size: 17px" v-if="result.patrolReslt == 1"> <span>上报问题</span>  </span>
                                </span>
                            </span>
                        </td>
                        <td colspan="4">
                            <span style="font-size: 17px"> <span>文字描述：</span> <span>{{result.patrolExplain}}</span>  </span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <span style="font-size: 17px"> <span>巡查轨迹：</span> <img src="" alt="">  </span>
                        </td>
                        <td colspan="4">
                            <span style="font-size: 17px"> <span>现场图片：</span> <img src="" alt="">  </span>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div>
            <div>
                <el-tabs style="width: 97%">
                    <template v-for="(item,index) in event">
                        <el-tab-pane :key="item.id" :label="'事件'+(++index)" >
                            <table>
                                <tr>
                                    <td colspan="4">
                                        <span style="font-size: 17px"> <span>责任网格：</span> <span></span>{{item.gridName}}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="4">
                                        <span style="font-size: 17px"> <span>事件类型：</span> <span>{{item.problemType}}</span>  </span>
                                    </td>
                                    <td colspan="4">
                                        <span style="font-size: 17px"> <span>上报人员：</span> <span>{{item.username}}</span>  </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="4">
                                        <span style="font-size: 17px"> <span>事件描述：</span> <span>{{item.eventDescName}}</span>  </span>
                                    </td>
                                    <td colspan="4">
                                        <span style="font-size: 17px"> <span>处理建议：</span> <span>{{item.remark}}</span>  </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="4">
                                        <span style="font-size: 17px"> <span>上报时间：</span> <span>{{item.createTime}}</span>  </span>
                                    </td>
                                    <td colspan="4">
                                        现场照片
                                         <div class="el-form-item__content_bcsm">
                                         <el-image
                                             :preview-src-list="ImageDialogUrl"
                                            :src="IMG_URL+item2['thumbUrl']"@click="showImg(item2,index,item.fileList)"
                                             style="margin-left:3px;margin-right:3px;width:50px;height:50px"
                                             v-for="(item2,index) in item.fileList"
                                               :key="index"
                                               
                                         ></el-image>
                                         </div>
                                    </td>
                                </tr>
                            </table>
                        </el-tab-pane>
                    </template>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PatrolLogDetail",
        components:{

        },
        data:function(){
            return{
                tabIndex: 2,
                tableData:[],
                result:{},
                event:[],
                dialogFormVisible: false,
                condition: this.$route.query.condition,
                ImageDialogUrl:[],
            }

        },
        mounted:function () {
            this.initPage();
        },
        methods:{
            initPage: function () {
                var _this = this;
                var id = parseInt(_this.$route.query.id);
                _this.$axios.get(
                    '/third/task/external/task/selectDailyPatrolDetails?id='+id
                ).then(function (res) {
                    if(res.code == 0) {
                        _this.result = res.data;
                        _this.result.patrolTime = new Date(_this.result.patrolTime).format("yyyy-MM-dd hh:mm:ss");
                    }
                });

                _this.$axios.get(
                    '/third/task/external/task/selectEventByDailyPatrolId?id='+id
                ).then(function (res) {
                    if(res.code == 0){
                        _this.event = res.data;
                        if(_this.event.length > 0){
                            for(var i=0;i<_this.event.length;i++){
                                var fileList = _this.event[i].fileList;
                                if(null != fileList && fileList.length > 0){
                                    for(var j=0;j<_this.fileList.length;j++){
                                        fileList[i].imgList.push(fileList[i].fileUrl);
                                    }
                                }
                            }
                        }
                    }
                });
            },
            retu:function(){
                this.$router.push({path: '/PatrolLog'});
            },
            showImg(item,index,total) {
                this.ImageDialogUrl = [];
                for (var i = 0; i < total.length; i++) {
                    this.ImageDialogUrl.push(this.IMG_URL + total[i]["fileUrl"])
                }
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