<template>
    <div>
        <div class="layout">
            <div class="sidebar">
                <div class="sidebar-head">措施执行</div>
                <ul class="sidebar-menu">
                    <li class="menu-item is-open">
                        <a href="#">
                            <i class="icon icon-tongjifenxi menu-icon"></i><span class="menu-txt">执行进度跟踪</span>
                        </a>
                    </li>
                    <li class="menu-item">
                        <a href="#">
                            <i class="icon icon-fenxibaogao menu-icon"></i><span @click="forward" class="menu-txt">措施库</span>
                        </a>
                    </li>
                </ul>
            </div>

            <div class="main-con hei-full">
                <div class="panel-default">
                    <div class="panel-hd">
                        <div class="panel-tit text-blger">措施执行-执行进度跟踪</div>
                    </div>
                    <div class="panel-bd">
                        <ul class="filter-box">
                            <li class="filter-item" >
                                <div class="filter-label">时间范围</div>
                                <div class="filter-con" >
                                    <el-date-picker
                                            style="width: 300px"
                                            clearable
                                            end-placeholder="结束日期"
                                            format="yyyy-MM-dd"
                                            range-separator="～"
                                            start-placeholder="开始日期" type="daterange" v-model="dateTime" value-format="yyyy-MM-dd">
                                    </el-date-picker>
                                </div>
                            </li>
                            <li class="filter-item">
                                <div class="filter-label">区域</div>
                                <div class="filter-con">
                                    <el-select clearable placeholder="请选择" v-model="regionId" style="width: 160px">
                                        <el-option
                                                :key = "item.regionId"
                                                :label = "item.regionName"
                                                :value ="item.regionId"
                                                v-for = "item in areaList"
                                        ></el-option>
                                    </el-select>
                                </div>
                            </li>
                            <li class="filter-item">
                                <div class="filter-label">处理状态</div>
                                <div class="filter-con">
                                    <div class="el-button-group">
                                        <button @click="change(null,$event)" class="el-button el-button--primary" type="button"><span>全部</span></button>
                                        <button @click="change(0,$event)" class="el-button" type="button"><span>进行中</span></button>
                                        <button @click="change(1,$event)" class="el-button" type="button"><span>已完成</span></button>
                                        <button @click="change(2,$event)" class="el-button" type="button"><span>已办结</span></button>
                                        <button @click="change(3,$event)" class="el-button" type="button"><span>已撤回</span></button>
                                    </div>
                                </div>
                            </li>

                            <li class="filter-item pull-right">
                                <button @click="init" class="el-button el-button--primary" style="width: 120px;" type="button"><span>查询</span></button>
                                <button @click="controlsTask" class="el-button el-button--primary" style="width: 120px;" type="button"><span>任务下发</span></button>
                            </li>
                        </ul>
                    </div>
                   <!-- <div class="panel-bd">
                        <ul class="filter-box">

                        </ul>
                    </div>-->
                    <el-table :data="tableData" class="table-default01 table-lger" stripe="true">
                        <el-table-column prop="measure" label="整改措施" align="center"></el-table-column>
                        <el-table-column prop="taskExplain" label="整改要求" align="center" ></el-table-column>
                        <el-table-column prop="addressName" label="整改对象" align="center" ></el-table-column>
                        <el-table-column prop="unitName" label="责任部门" align="center" ></el-table-column>
                        <el-table-column prop="completeDate" label="截至时间" :formatter="formatterDate" align="center"></el-table-column>
                        <el-table-column :formatter="formatterDate2" align="center" label="派发时间" prop="createTime"></el-table-column>
                        <el-table-column align="center" label="处理状态" >
                            <template slot-scope="scope" >
                                <span class="level01" v-if="scope.row.signStatus == 0">进行中</span>
                                <span class="level02" v-if="scope.row.signStatus == 1">已完成</span>
                                <span class="level03" v-if="scope.row.signStatus == 2">已办结</span>
                                <span class="level04" v-if="scope.row.signStatus == 3">已撤回</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="操作">
                            <template slot-scope="scope">
                                <a @click="showDetail(scope.row.id)" class="color-other" href="javascript:;" style="font-size:14px" >查看</a>
                                <a @click="showDetail(scope.row.id)" class="color-other" href="javascript:;" style="font-size:14px" >催办</a>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination mt">
                        <Pagination @handleCurrentChange="init" @paginationFunction="init"
                                    ref="paginationObj"></Pagination>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog :close-on-click-modal="false" :modal-append-to-body="false"
                   :showClose="false"
                   :visible.sync="conDialogFormVisible" @close="controlsCance()" width="0px"
        >
            <div class="modal" style="display: block;margin-top: 255px;width:550px;">
                <a @click="controlsCance" class="modal-close" href="javascript:;" title="关闭"><i class="icon icon-close"></i></a>
                <div class="modal-hd">
                    <div class="modal-tit">任务下发</div>
                </div>
                <div class="modal-bd">
                    <table class="table-form">
                        <colgroup>
                            <col style="width: 60px">
                            <col>
                        </colgroup>
                        <tr>
                            <th>任务类型</th>
                            <td class="text-bright">管控</td>
                        </tr>
                        <tr>
                            <th>整改对象</th>
                            <td>
                                <el-select clearable multiple placeholder="请选择" style="width: 100%" v-model="addControlsTaskJson.addressIds" >
                                    <el-option
                                            :key="item.informationId"
                                            :label="item.sourceName"
                                            :value="item.informationId"
                                            v-for="item in addressIds"
                                    >
                                    </el-option>
                                </el-select>
                            </td>
                        </tr>
                        <tr>
                            <th>整改措施</th>
                            <td>
                                <el-select clearable placeholder="请选择" style="width: 100%" v-model="addControlsTaskJson.measure">
                                    <el-option
                                            :key = "item.id"
                                            :label = "item.measureName"
                                            :value ="item.measureName"
                                            v-for = "item in measureStoreList"
                                    ></el-option>
                                </el-select>
                            </td>
                        </tr>
                        <tr>
                            <th>整改要求</th>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div class="textarea-box" style="width: 100%">
                                    <textarea :row="2" autocomplete="off" class="el-textarea__inner" clearable placeholder="请输入内容" style="min-height: 33px;" type="textarea" v-model="addControlsTaskJson.taskExplain" ></textarea>
                                    <div class="text-num">0/600</div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>责任部门</th>
                            <td>
                                <el-select clearable placeholder="请选择" style="width: 100%" v-model="addControlsTaskJson.unitList[0]">
                                    <el-option
                                            :key = "item.unit_id"
                                            :label = "item.unit_name"
                                            :value ="item.unit_id"
                                            v-for = "item in unitList"
                                    ></el-option>
                                </el-select>
                            </td>
                        </tr>
                        <tr>
                            <th>截止时间</th>
                            <td>
                                <el-date-picker
                                        style="width: 100%"
                                        placeholder="选择日期时间"
                                        type="datetime"
                                        v-model="addControlsTaskJson.completeDate">
                                </el-date-picker>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center" colspan="2">
                                <button @click="controlsSublime" class="el-button el-button--primary" type="button"><span>任务下发</span></button>
                                <button @click="controlsCance" class="el-button" type="button"><span>取消</span></button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

        </el-dialog>
    </div>
</template>

<script>
    import Pagination from '../../common/unit/Pagination.vue'
    export default {
        name: "ScheduleFollowing",
        components:{
            Pagination
        },
        data:function(){
            return{
                dialogTitle: null,
                tableData:[],
                controlsVisible : false,
                dateTime:['',''],
                regionId: null,
                status:null,
                areaList : [],
                measureStoreList:[],
                unitList:[],
                addressIds:[],
                addControlsTaskJson:{
                    taskName:null,
                    taskExplain:null,
                    measure:null,
                    unitList:[],
                    addressIds:[],
                    completeDate:null,
                    createUserId:null,
                    addressId:null,
                    alarmId:'',
                    taskSource:2,
                },
                addControlsTaskJson2:{
                    taskName:null,
                    taskExplain:null,
                    measure:null,
                    unitList:[],
                    addressIds:[],
                    completeDate:null,
                    createUserId:null,
                    addressId:null,
                    alarmId:'',
                    taskSource:2,
                },
                conDialogFormVisible:false,
            }
        },
        mounted:function () {
            this.init();
        },
        methods:{
            forward:function(){
                this.$router.push({path: '/MeasureStore'})
            },
            formatterDate(row){
                row.completeDate = new Date(row.completeDate).format("yyyy-MM-dd hh:mm:ss");
                return row.completeDate;
            },
            formatterDate2(row){
                row.createTime = new Date(row.createTime).format("yyyy-MM-dd hh:mm:ss");
                return row.createTime;
            },
            getIndex:function(index) {
                var _this = this;
                let curPage = _this.$refs.paginationObj.cur_page;
                let limitPage = _this.$refs.paginationObj.cur_pageSize;
                return (index+1) + (curPage - 1) * limitPage;
            },
            init:function () {
                var _this = this;
                var params = new URLSearchParams();
                if(_this.regionId == ''){
                    _this.regionId = null;
                }

                var startTime = null;
                var endTime = null;
                if(_this.dateTime != null && _this.dateTime[0] != ''){
                    startTime = _this.dateTime[0];
                    endTime = _this.dateTime[1];
                }else{
                    startTime = null;
                    endTime = null;
                }

                params.append("selectCorrectiveActionsJson",JSON.stringify({
                    page:_this.$refs.paginationObj.cur_page,
                    limit:_this.$refs.paginationObj.cur_pageSize,
                    regionId:_this.regionId,
                    startTime:startTime,
                    endTime:endTime,
                    status:_this.status,
                    taskSource:2,
                    taskClass:3
                }));

                _this.$axios.post('/third/task/external/task/selectCorrectiveActions',params).then(function (res) {
                    if(res.code == 0){
                        _this.tableData = res.data.records;
                        _this.$refs.paginationObj.count = res.data.total;
                    }
                })

                _this.$axios.get('/bas/base/external/regionLever').then(function (res) {
                    if(res.code == 0){
                        _this.areaList = res.data;
                    }
                });
            },

            change(type,event){
                 this.status = type;
                var buttons = $(event.currentTarget).siblings(".el-button");

                if(event != null){
                    $(event.currentTarget).addClass("el-button--primary");
                    var buttons = $(event.currentTarget).siblings(".el-button");
                    for(var i= 0;i<buttons.length;i++){
                        $(buttons[i]).removeClass("el-button--primary");
                    }
                }

            },
            change1:function (status,event) {
                var _this = this;
                _this.status = status;
                _this.init();

                var buttons = $(event.currentTarget).siblings(".el-button");
                for(var i= 0;i<buttons.length;i++){
                    $(buttons[i]).removeClass("el-button--primary");
                };
            },
            showDetail:function (id) {
                this.$router.push({ path: '/ScheduleFollowingDetail', query: {"id": id}});
            },
            controlsTask:function(){
                var _this = this;
                _this.conDialogFormVisible = true;
                _this.$axios.post('/aircontrol/airmeasures/measureStore/getListByParams').then(function (res) {
                    if( res.code == 0){
                        _this.measureStoreList = res.data.list;
                    }
                });
                _this.$axios.get('/bas/base/sysUnit/allUnitList').then(function (res) {
                    if( res.code == 0){
                        _this.unitList = res.data;
                    }
                });
                var params2 = new URLSearchParams();
                params2.append("jsonStr", JSON.stringify(""));
                _this.$axios.get('/third/grid/external/pollutionSource/PSpage',params2).then(function (res) {
                    _this.addressIds = res.data.records;
                })
            },
            controlsCance:function () {
                this.conDialogFormVisible = false;
                this.addControlsTaskJson = this.addControlsTaskJson2;
            },
            controlsSublime:function () {
                var _this = this;
                _this.addControlsTaskJson.alarmId = _this.pk_id;
                var params = new URLSearchParams();
                params.append("addControlsTaskJson",JSON.stringify(_this.addControlsTaskJson));
                _this.$axios.post('/third/task/external/task/addControlsTask',params).then(function (res) {
                    if(res.code == 0){
                        _this.$message.success("保存成功");
                        _this.controlsCance();
                        _this.init();
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>