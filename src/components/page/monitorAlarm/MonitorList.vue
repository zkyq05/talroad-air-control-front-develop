<template>
    <div>
    <el-table :data="tableData" class="table-default01 table-lger" stripe="true">
        <el-table-column :index="getIndex" align="center" label="编号" type="index" width="90"></el-table-column>
        <el-table-column align="center" label="站点"  prop="stationName"></el-table-column>
        <el-table-column align="center" label="报警参数"  prop="pollutantName" ></el-table-column>
        <el-table-column align="center" label="浓度值" prop="monitorValue"></el-table-column>
        <el-table-column :formatter="formatterDate" align="center"  label="报警时间" prop="alarmTime"></el-table-column>
        <el-table-column align="center" label="报警类型" prop="alarmTypeName" ></el-table-column>
        <el-table-column align="center" label="报警描述" >
            <template slot-scope="scope">
                <span>{{scope.row.remarks | ellipsis}}</span>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
            <template slot-scope="scope">
                <a @click="screeningTask(scope.row.pkId)" class="color-other" href="javascript:;" style="font-size:14px" v-if="scope.row.isScreening">排查</a>
                <a @click="controlsTask(scope.row.pkId)" class="color-other" href="javascript:;" style="font-size:14px" v-if="scope.row.isControls">管控</a>
                <a @click="showView(scope.row.pkId)" class="color-other" href="javascript:;" style="font-size:14px" >查看详情</a>
            </template>
        </el-table-column>
    </el-table>
    <pagination ref="paginationObj" @handleCurrentChange="initPage()" @paginationFunction="initPage()"></pagination>
    <el-dialog :close-on-click-modal="false" :modal-append-to-body="false"
                   :showClose="false"
                   :visible.sync="scrDialogFormVisible" @close="screeningCance()" width="0px"
        >
            <div class="modal" style="display: block;margin-top: 255px;width:550px;">
                <a @click="screeningCance" class="modal-close" href="javascript:;" title="关闭"><i class="icon icon-close"></i></a>
                <div class="modal-hd">
                    <div class="modal-tit">排查对象</div>
                </div>
                <div class="modal-bd">
                    <table class="table-form">
                        <colgroup>
                            <col style="width: 60px">
                            <col>
                        </colgroup>
                        <tr>
                            <th>任务类型</th>
                            <td class="text-bright">排查</td>
                        </tr>
                        <tr>
                            <th>整改对象</th>
                            <td>
                                <el-select clearable multiple placeholder="请选择" style="width: 100%;" v-model="addScreeningTaskJosn.addressIds" >
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
                            <th>任务名称</th>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div class="textarea-box" style="width: 100%">
                                    <textarea :row="2" autocomplete="off" class="el-textarea__inner" clearable placeholder="请输入内容" style="min-height: 33px;" type="textarea" v-model="addScreeningTaskJosn.taskName" ></textarea>
                                    <div class="text-num">0/600</div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>任务说明</th>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div class="textarea-box" style="width: 100%">
                                    <textarea :row="2" autocomplete="off" class="el-textarea__inner" clearable placeholder="请输入内容" style="min-height: 33px;" type="textarea" v-model="addScreeningTaskJosn.taskExplain" ></textarea>
                                    <div class="text-num">0/600</div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>截止时间</th>
                            <td>
                                <el-date-picker
                                        placeholder="选择日期时间"
                                        style="width: 100%"
                                        type="datetime"
                                        v-model="addScreeningTaskJosn.completeDate">
                                </el-date-picker>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center" colspan="2">
                                <button @click="screeningSublime()" class="el-button el-button--primary" type="button"><span>发送</span></button>
                                <button @click="screeningCance()" class="el-button" type="button"><span>取消</span></button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

        </el-dialog>
    <el-dialog :close-on-click-modal="false" :modal-append-to-body="false"
               :showClose="false"
               :visible.sync="conDialogFormVisible" @close="controlsCance()" width="0px"
    >
        <div class="modal" style="display: block;margin-top: 255px;width:550px;">
            <a @click="controlsCance" class="modal-close" href="javascript:;" title="关闭"><i class="icon icon-close"></i></a>
            <div class="modal-hd">
                <div class="modal-tit">管控对象</div>
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
                        <th>任务名称</th>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div class="textarea-box" style="width: 100%">
                                <textarea :row="2" autocomplete="off" class="el-textarea__inner" clearable placeholder="请输入内容" style="min-height: 33px;" type="textarea" v-model="addControlsTaskJson.taskName" ></textarea>
                                <div class="text-num">0/600</div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>整改对象</th>
                        <td>
                            <el-select clearable multiple placeholder="请选择" style="width: 100%" v-model="addControlsTaskJson.addressIds" >
                                <el-option
                                        v-for="item in addressIds"
                                        :key="item.informationId"
                                        :label="item.sourceName"
                                        :value="item.informationId"
                                >
                                </el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <th>整改措施</th>
                        <td>
                            <el-select clearable placeholder="请选择" style="width: 100%" v-model="addControlsTaskJson.measure" >
                                <el-option
                                        v-for = "item in measureStoreList"
                                        :key = "item.measureName"
                                        :label = "item.measureName"
                                        :value ="item.measureName"
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
                            <el-select clearable placeholder="请选择" style="width: 100%" v-model="addControlsTaskJson.unitList[0]" >
                                <el-option
                                        v-for = "item in unitList"
                                        :key = "item.unit_id"
                                        :label = "item.unit_name"
                                        :value ="item.unit_id"
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
                            <button @click="controlsSublime()" class="el-button el-button--primary" type="button"><span>发送</span></button>
                            <button @click="controlsCance()" class="el-button" type="button"><span>取消</span></button>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </el-dialog>


    </div>
</template>

<script>
    import pagination from '../../common/unit/Pagination';
    export default {
        name: "MonitorList",
        components:{
            pagination
        },
        data:function(){
            return{
                tabIndex: 2,
                tableData:[],
                condition2:{},
                addScreeningTaskJosn:{
                    taskName:null,
                    taskExplain:null,
                    completeDate:null,
                    createUserId:null,
                    addressIds:[],
                    alarmId:null,
                    taskSource:2,
                },
                addScreeningTaskJosn2:{
                    taskName:null,
                    taskExplain:null,
                    completeDate:null,
                    createUserId:null,
                    addressIds:[],
                    alarmId:null,
                    taskSource:2,
                },
                addressIds:[],
                pk_id:null,
                addControlsTaskJson:{
                    taskName:null,
                    taskExplain:null,
                    measure:null,
                    unitList:[],
                    addressIds:[],
                    completeDate:null,
                    createUserId:null,
                    addressId:null,
                    alarmId:null,
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
                    alarmId:null,
                    taskSource:2,
                },
                measureStoreList:[],
                unitList:[],
                scrDialogFormVisible:false,
                conDialogFormVisible:false,

            }

        },
        filters: {
            ellipsis(value) {
                if (!value) return "";
                if (value.length > 30) {
                    return value.slice(0, 30) + "...";
                }
                return value;
            }
        },
        mounted:function () {

        },
        methods:{
            showView:function(pk_id,id){
                if(id != undefined){
                    this.$parent.$router.push({ path: '/MonitorDetail', query: { "pk_id": pk_id, "id": id,"condition":this.condition2 }});
                }else{
                    this.$parent.$router.push({ path: '/MonitorDetail', query: { "pk_id": pk_id, "id": null }});
                }
            },
            formatterDate(row){
                row.alarmTime = new Date(row.alarmTime).format("yyyy-MM-dd hh:mm:ss");
                return row.alarmTime;
            },
            getIndex:function(index) {
                var _this=this;
                let curPage = _this.$refs.paginationObj.cur_page;
                let limitPage = _this.$refs.paginationObj.cur_pageSize;
                return (index+1) + (curPage - 1) * limitPage;
            },
            //保留3位小数
            getRound:function (row,column, cellValue) {
                if(cellValue!=null && cellValue!=''){
                    let newpar = Math.round(cellValue);
                    return newpar;
                }else{
                    return '';
                }
    },
            //初始化查询列表 默认第一页
            initPage: function () {
                var _this = this;
                _this.condition2.cur_page = _this.$refs.paginationObj.cur_page;
                _this.condition2.cur_pageSize = _this.$refs.paginationObj.cur_pageSize;

                var params = new URLSearchParams();
                params.append("pageNum", _this.$refs.paginationObj.cur_page);
                params.append("pageSize", _this.$refs.paginationObj.cur_pageSize);
                params.append("stationName", _this.condition2.stationName);
                if(_this.condition2.status != null){
                    params.append("status", _this.condition2.status);
                }
                if(_this.condition2.alarmType != null){
                    params.append("alarmType", _this.condition2.alarmType);
                }
                if(_this.condition2.FK_ID != null){
                    params.append("FK_ID", _this.condition2.FK_ID);
                }
                if(_this.condition2.daytime != null && _this.condition2.daytime.length > 0){
                    if(_this.condition2.daytime.length === 1){
                        params.append("nowTime", _this.condition2.daytime[0]);
                    }else{
                        params.append("preTime", _this.condition2.daytime[0]);
                        params.append("nowTime", _this.condition2.daytime[1]);
                    }
                }

                params.append("task_source", 2);
                _this.$axios.post(
                    '/aircontrol/airmeasures/monitorAlarm/getListByParams',params
                ).then(function (res) {
                    _this.tableData = res.data.list;
                    _this.$refs.paginationObj.count = res.data.totalCount;
                    if(_this.tableData != null && _this.tableData.length > 0){
                        for(var i=0;i< _this.tableData.length;i++){
                            var item = _this.tableData[i];
                            item.isScreening = true;
                            item.isControls = true;
                           if(item.taskList != null && item.taskList.length > 0){
                               for(var j=0;j< item.taskList.length;j++){
                                   var item2 = item.taskList[j];
                                   if(item2.task_class == 2){
                                       item.isScreening = false;
                                   }
                                   if(item2.task_class == 2 && item2.status != 1){
                                       item.isControls = false;
                                   }
                                   if(item2.task_class == 3){
                                       item.isControls = false;
                                   }
                               }
                           }
                        }
                    }
             });

            },
            //分页回调
            handleCurrentChange:function(){
                this.init();
            },
            paginationFunction:function() {
                this.init();
            },
            selectCondition:function(condition){
                this.condition2 = condition;
                this.initPage();
            },
            screeningTask:function (pk_id) {
                var _this = this;
                _this.scrDialogFormVisible = true;
                _this.pk_id = pk_id;
                var params2 = new URLSearchParams();
                params2.append("jsonStr", JSON.stringify(""));
                _this.$axios.get('/third/grid/external/pollutionSource/PSpage',params2).then(function (res) {
                    _this.addressIds = res.data.records;
                });
            },
            controlsTask:function(pk_id){
                var _this = this;
                _this.conDialogFormVisible = true;
                _this.pk_id = pk_id;
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
            screeningCance:function () {
                this.scrDialogFormVisible = false;
                this.pk_id = null;
                this.addControlsTaskJson = this.addControlsTaskJson2;
            },
            screeningSublime:function () {
                var _this = this;
                _this.addScreeningTaskJosn.alarmId = _this.pk_id;
                var params = new URLSearchParams();
                params.append("addScreeningTaskJosn",JSON.stringify(_this.addScreeningTaskJosn));
                _this.$axios.post('/third/task/external/task/addScreeningTask',params).then(function (res) {
                    if(res.code == 0){
                        _this.$message.success("保存成功");
                        _this.screeningCance();
                        _this.initPage();
                    }
                })
            },
            controlsCance:function () {
                this.conDialogFormVisible = false;
                this.pk_id = null;
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
                        _this.initPage();
                    }
                })
            },
        },

    }
</script>

<style scoped>


</style>