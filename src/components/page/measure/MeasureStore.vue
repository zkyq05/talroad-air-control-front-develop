<template>
    <div>
        <div class="layout">
            <div class="sidebar">
                <div class="sidebar-head">措施执行</div>
                <ul class="sidebar-menu">
                    <li class="menu-item">
                        <a href="#">
                            <i class="icon icon-tongjifenxi menu-icon"></i><span @click="forward" class="menu-txt">执行进度跟踪</span>
                        </a>
                    </li>
                    <li class="menu-item is-open">
                        <a href="#">
                            <i class="icon icon-fenxibaogao menu-icon"></i><span class="menu-txt" >措施库</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="main-con hei-full">
                <div class="panel-default">
                    <div class="panel-hd">
                        <div class="panel-tit text-blger">措施执行-措施库</div>
                    </div>
                    <div class="panel-bd" style="margin-bottom: 40px">
                        <button @click="showDetail(null)" class="el-button el-button--primary filter-item pull-right" style="width: 140px;" type="button"><span>新建措施</span></button>
                    </div>
                    <el-table :data="tableData" class="table-default01 table-lger" stripe="true">
                       <!-- <el-table-column :formatter="formatterDate" align="center" label="时间" prop="time" ></el-table-column>-->
                        <el-table-column align="center" label="措施名称" prop="measureName"></el-table-column>
                        <el-table-column align="center" label="主体类型" prop="mainCondition" ></el-table-column>
                        <el-table-column align="center" label="对应问题" prop="measureCondition" ></el-table-column>
                        <el-table-column align="center" label="操作" >
                            <template slot-scope="scope">
                                <a @click="showDetail(scope.row.id)" class="color-other" href="javascript:;" style="font-size:14px">查看</a>
                                <a @click="del(scope.row.id)" class="color-other" href="javascript:;" style="font-size:14px">删除</a>
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
        <el-dialog :close-on-click-modal="false"
                   :modal-append-to-body="false"
                   :showClose="false" :visible.sync="conDialogFormVisible" width="0px"
        >
            <div class="modal" style="display: block;margin-top: 255px;width:550px;">
                <a @click="cance" class="modal-close" href="javascript:;" title="关闭"><i class="icon icon-close"></i></a>
                <div class="modal-hd">
                    <div class="modal-tit">新建措施</div>
                </div>
                <div class="modal-bd">
                    <table class="table-form">
                        <colgroup>
                            <col style="width: 70px">
                            <col>
                        </colgroup>
                       <!-- <tr>
                            <th>时间</th>
                            <td>
                                <el-date-picker
                                        placeholder="选择日期时间"
                                        style="width: 100%"
                                        type="datetime"
                                        v-model="basMeasures.time">
                                </el-date-picker>
                            </td>
                        </tr>-->
                        <tr>
                            <th>措施名称</th>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div class="textarea-box"  style="width: 100%">
                                    <textarea :row="2" autocomplete="off" class="el-textarea__inner" clearable placeholder="请输入内容" style="min-height: 33px;" type="textarea" v-model="basMeasures.measureName" ></textarea>
                                    <div class="text-num">0/600</div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>污染源类型</th>
                            <td>
                                <el-select clearable placeholder="请选择" style="width: 100%" v-model="basMeasures.mainCondition" >
                                    <el-option
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.name"
                                            v-for="item in enterpriseTypeList"
                                    >
                                    </el-option>
                                </el-select>
                            </td>
                        </tr>
                        <tr>
                            <th>措施描述</th>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div class="textarea-box" style="width: 100%">
                                    <textarea :row="2" autocomplete="off" class="el-textarea__inner" clearable placeholder="请输入内容" style="min-height: 33px;" type="textarea" v-model="basMeasures.measureDetail" ></textarea>
                                    <div class="text-num">0/600</div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>问题类型</th>
                            <td>
                                <el-select clearable placeholder="请选择" style="width: 100%" v-model="basMeasures.measureCondition" >
                                    <el-option
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.name"
                                            v-for="item in problemList"
                                    >
                                    </el-option>
                                </el-select>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center" colspan="3">
                                <button @click="sublime()" class="el-button el-button--primary" type="button"><span>保存</span></button>
                                <button @click="cance" class="el-button" type="button"><span>取消</span></button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

        </el-dialog>
    </div>
</template>

<script>
    import Pagination from '../../common/unit/Pagination'
    export default {
        name: "MeasureStore",
        components:{
            Pagination
        },
        data:function(){
            return{
                tableData:[],
                enterpriseTypeList:[],
                basMeasures:{
                    id : null,
                    time : '',
                    measureDetail : '',
                    measureName : '',
                    mainCondition : '',
                    measureCondition : '',
                    enable : 1
                },
                basMeasures2:{
                    id : null,
                    time : '',
                    measureDetail : '',
                    measureName : '',
                    mainCondition : '',
                    measureCondition : '',
                    enable : 1
                },
                problemList:[],
                conDialogFormVisible:false,

            }
        },
        mounted:function () {
            $(".modal").hide();
            this.init();
        },
        methods:{
            forward:function(){
                this.$router.push({path: '/ScheduleFollowing'})
            },
            formatterDate(row){
                row.time = new Date(row.time).format("yyyy-MM-dd hh:mm:ss");
                return row.time;
            },
            getIndex:function(index) {
                var _this = this;
                let curPage = _this.$refs.paginationObj.cur_page;
                let limitPage = _this.$refs.paginationObj.cur_pageSize;
                return (index+1) + (curPage - 1) * limitPage;
            },
            init:function () {
                var _this = this;
                _this.$axios.post('/aircontrol/airmeasures/measureStore/getListByParams').then(function (res) {
                    if( res.code == 0){
                        _this.tableData = res.data.list;
                        _this.$refs.paginationObj.count = res.data.totalCount;
                    }
                });

                _this.$axios.get('/third/grid/external/pollutionSource/getEnterpriseType').then(function (res) {
                    if(res.code == 0){
                        _this.enterpriseTypeList = res.data;
                    }
                });

                _this.$axios.get('/bas/base/external/sysDictDetails/info').then(function (res) {
                    if(res.code == 0){
                        _this.problemList = res.data;
                    }
                });
            },
            showDetail:function (id) {
                var _this = this;
                _this.conDialogFormVisible = true;
                var params = new URLSearchParams();
                params.append("id",id);
                _this.$axios.post('/aircontrol/airmeasures/measureStore/getListByParams', params).then(function (res) {
                    if( res.code == 0){
                        _this.basMeasures = res.data.list[0];
                    }
                })
            },
            cance:function(){
                this.conDialogFormVisible = false;
                this.basMeasures = this.basMeasures2;
            },
            sublime:function() {
                if(this.basMeasures.id == null || this.basMeasures.id == -1){
                    this.insert();
                }else{
                    this.updateById();
                }
            },
            insert:function() {
               var _this = this;
                _this.$axios.post('/aircontrol/airmeasures/measureStore/insert', _this.basMeasures).then(function (res) {
                    if(res.code == 0){
                        _this.$message.success("保存成功");
                        _this.init();
                        _this.cance();
                    }else{
                        _this.$message.error("保存失败。");
                    }
                })
            },
            updateById:function(){
                var _this = this;
                _this.$axios.post('/aircontrol/airmeasures/measureStore/updateById', _this.basMeasures).then(function (res) {
                    if(res.code == 0){
                        _this.$message.success("修改成功");
                        _this.init();
                        _this.cance();
                    }else{
                        _this.$message.error("修改失败。");
                    }
                })
            },
            del:function (id) {
                var _this = this;
                _this.$confirm('此操作将删除该站点信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function()  {
                    var params = new URLSearchParams();
                    params.append("id",id);
                    _this.$axios.post('/aircontrol/airmeasures/measureStore/del', params).then(function (res) {
                        if(res.code == 0){
                            _this.$message.success("删除成功");
                            _this.init();
                        }else{
                            _this.$message.error("删除失败。");
                        }
                    })
                })
            },

        }
    }
</script>

<style scoped>

</style>