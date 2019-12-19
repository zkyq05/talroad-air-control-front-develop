<template>
    <div class="main-con">
                <div style="margin-left: -22px;height: 60px;">
                    <div style="font-size: 20px;line-height: 60px;color: aliceblue;background: #202A42;padding-left: 36px">
                        <h1>网格管控 - 巡查计划制定</h1>
                    </div>
                </div>
                <div class="form-list-inline">
                    <div class="table-box" style="height: 750px">
                        <div class="block" style="margin-top: 20px">
                            <span style="margin-left: 30px;color: aliceblue">执行范围:
                            </span>
                            <el-select v-model="regionId" clearable placeholder="请选择"  style="width:225px;"> <!--@change="init"-->
                                <el-option
                                        v-for = "item in areaList"
                                        :key = "item.regionId"
                                        :label = "item.regionName"
                                        :value ="item.regionId"
                                ></el-option>
                            </el-select>

                            <span style="margin-left: 50px;color: aliceblue">巡查对象类型:</span>
                            <el-select v-model="pollutantType" clearable placeholder="请选择"  style="width:225px;"><!--@change="init"-->
                                <el-option
                                        v-for = "item in enterpriseTypeList"
                                        :key = "item.id"
                                        :label = "item.name"
                                        :value ="item.id"
                                ></el-option>
                            </el-select>
                            <button type="button" style="float: right;margin-right: 20px" class="el-button el-button--primary" id="buts"  @click="init"><!----><!----><span>查询</span></button>
                            <button type="button" style="float: right;margin-right: 20px" class="el-button el-button--primary" id="buts"  @click="showDetail(null)"><!----><!----><span>新增</span></button>
                        </div>
                        <el-table :data="tableData"  style="margin-top: 20px;width: 100%;border: 0px" :cell-style="cellRow" stripe="true">
                            <el-table-column type="index" width="100px" label="编号" :index="getIndex" align="center" ></el-table-column>
                            <el-table-column prop="regionName" label="区域名称" width="auto" align="center"></el-table-column>
                            <el-table-column prop="dictDetailsName" label="污染源类型" width="150px" align="center"></el-table-column>
                            <el-table-column prop="userType" label="用户类型" width="auto" align="center" >
                                <template slot-scope="scope" >
                                    <span v-if="scope.row.userType == 0" >网格员</span>
                                    <span v-if="scope.row.userType == 1" >监管员</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="times" label="巡查次数" width="auto" align="center" ></el-table-column>
                            <el-table-column prop="frequency" label="巡查频率" width="auto" align="center">
                                <template slot-scope="scope" >
                                    <span v-if="scope.row.frequency == 1" >日</span>
                                    <span v-if="scope.row.frequency == 2" >周</span>
                                    <span v-if="scope.row.frequency == 3" >月</span>
                                    <span v-if="scope.row.frequency == 4" >季</span>
                                    <span v-if="scope.row.frequency == 5" >年</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="createDate" label="创建时间" width="200px" align="center" ></el-table-column>
                            <el-table-column prop="createName" label="创建人" width="auto" align="center"></el-table-column>
                            <el-table-column prop="updateDate" label="修改时间" width="auto" align="center"></el-table-column>
                            <el-table-column prop="updateName" label="修改人" width="auto" align="center"></el-table-column>
                            <el-table-column label="操作" width="150px" align="center">
                                <template slot-scope="scope">
                                    <a @click="showDetail(scope.row.cycleId)" class="color-other" href="javascript:;" style="font-size:14px">编辑</a>
                                    <a @click="del(scope.row.cycleId)" class="color-other" href="javascript:;" style="font-size:14px">删除</a>
<!--                                            <el-button @click="showDetail(scope.row.cycleId)" type="text" size="small" style="min-width: 50px">编辑</el-button>-->
<!--                                            <el-button style="margin-left: 0px;margin-top: 3px;min-width: 50px" type="text"   size="mini"  @click="del(scope.row.cycleId)" >删除</el-button>-->
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="pagination mt">
                            <Pagination ref="paginationObj" @handleCurrentChange="init"
                                        @paginationFunction="init"></Pagination>
                        </div>

                    </div>
                </div>


        <el-dialog :visible.sync="dialogFormVisible" @close="cance()"
                   :modal-append-to-body="false"
                   :close-on-click-modal="false" width="0px" :showClose="false"
        >
            <div class="modal" style="display: block;margin-top: 255px;width:450px;height: 400px">
                <div  class="modal-close" title="关闭" @click="dia=false"><i class="icon icon-close"></i></div>
                <div class="modal-hd">
                    <div class="modal-tit" style="margin-bottom: 5px">{{dialogTitle}}</div>
            <div class="form-box" element-loading-text="拼命加载中" >
                <el-form ref="sysCycle" :model="sysCycle" label-width="100px"  inline :rules="rules">
                    <el-form-item label="巡查频次:" style="margin-left: 40px" prop="frequency">
                        <el-select v-model="sysCycle.frequency" clearable placeholder="请选择" style="width: 100px">
                            <el-option :value="1" label="日"></el-option>
                            <el-option :value="2" label="周"></el-option>
                            <el-option :value="3" label="月"></el-option>
                            <el-option :value="4" label="季"></el-option>
                            <el-option :value="5" label="年"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="times">
                        <el-input type="number" v-model="sysCycle.times" placeholder="请选择" style="width: 100px"></el-input>&nbsp;次
                    </el-form-item>
                    <el-form-item label="区域:" style="margin-left: 40px" prop="areaCode">
                        <el-select v-model="sysCycle.areaCode" clearable placeholder="请选择" style="width:225px;">
                            <el-option
                                    v-for = "item in areaList"
                                    :key = "item.regionId"
                                    :label = "item.regionName"
                                    :value ="item.regionId"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="污染源类型:" style="margin-left: 40px" prop="dictDetailsId">
                        <el-select v-model="sysCycle.dictDetailsId" clearable placeholder="请选择" style="width:225px;">
                            <el-option
                                    v-for = "item in enterpriseTypeList"
                                    :key = "item.id"
                                    :label = "item.name"
                                    :value ="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="用户类型:" style="margin-left: 40px" prop="userType">
                        <el-select v-model="sysCycle.userType" clearable placeholder="请选择">
                            <el-option :value="0" label="网格员"></el-option>
                            <el-option :value="1" label="监管员"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div style="text-align: center">
                        <span class="dialog-footer" >
                                <el-button class="el-button el-button--default" type="button" @click="cance()">取消</el-button>
                                <el-button class="el-button el-button--primary" type="button" @click="sublime('sysCycle')">提交</el-button>
                        </span>
                </div>
                     </div>
                </div>
            </div>
        </el-dialog>

    </div>

</template>

<script>
    import Pagination from '../../common/unit/Pagination'

    export default {
        name: "PatrolPlanMake",
        components:{
            Pagination
        },
        data:function(){
            return{
                dialogTitle: '巡查计划制定',
                tableData:[],
                sysCycle:{
                    cycleId : null,
                    areaCode : null,
                    dictDetailsId : '',
                    userType : null,
                    frequency : null,
                    times : null,
                    deleteFlag : 0,
                    sysType : 1
                },
                sysCycle2:{
                    cycleId : null,
                    areaCode : null,
                    dictDetailsId : '',
                    userType : null,
                    frequency : null,
                    times : null,
                    deleteFlag : 0,
                    sysType : 1
                },
                dialogFormVisible : false,
                areaList : [],
                enterpriseTypeList : [],
                pollutantType : '',
                regionId : '',
                rules:{
                    frequency: [
                        { required: true, message: '请选择巡查频次', trigger: 'blur' }
                    ],
                    times: [
                        { required: true, message: '请输入次数', trigger: 'blur' }
                    ],
                    areaCode: [
                        { required: true, message: '请选择区域', trigger: 'blur' }
                    ],
                    dictDetailsId: [
                        { required: true, message: '请选择污染源类型', trigger: 'blur' }
                    ],
                    userType: [
                        { required: true, message: '请选择用户类型', trigger: 'blur' }
                    ],
                }
            }
        },
        mounted:function () {
            this.init();
            $(".modal").hide();
        },
        methods:{
            formatterDate(row){
                row.createDate = new Date(row.createDate).format("yyyy-MM-dd HH:mm:ss");
                return row.createDate;
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
                params.append("jsonStr",JSON.stringify({
                        page: _this.$refs.paginationObj.cur_page,
                        limit: _this.$refs.paginationObj.cur_pageSize,
                        pollutantType: _this.pollutantType,
                        regionId: _this.regionId,
                        sysType:'1'
                    }));
                _this.$axios.post('/third/grid/external/sysCycle/page',params).then(function (res) {
                    if( res.code == 0){
                        _this.tableData = res.data.records;
                        _this.$refs.paginationObj.count = res.data.total;
                    }
                });

                _this.$axios.get('/bas/base/external/regionLever').then(function (res) {
                    if(res.code == 0){
                        _this.areaList = res.data;
                        _this.areaList.splice(0,0,{'regionId':null,"regionName":"全部"})
                    }
                });

                _this.$axios.get('/third/grid/external/pollutionSource/getEnterpriseType').then(function (res) {
                    if(res.code == 0){
                        _this.enterpriseTypeList = res.data;
                        _this.enterpriseTypeList.splice(0,0,{'id':null,"name":"全部"})
                    }
                });
            },
            showDetail:function (cycleId) {
                var _this = this;
                // $(".modal").fadeIn();
                _this.dialogFormVisible = true;
                if(cycleId != null ){
                    _this.$axios.get('/third/grid/external/sysCycle/'+cycleId).then(function (res) {
                        if( res.code == 0){
                            _this.sysCycle = res.data;
                        }
                    })
                }
            },
            cance:function(){
                this.$refs.sysCycle.resetFields();
                this.dialogFormVisible = false;
                this.sysCycle = this.sysCycle2;
                // $(".modal").hide();
            },
            sublime:function(sysCycle) {
                if(this.sysCycle.cycleId == null ){
                    this.insert(sysCycle);
                }else{
                    this.updateById();
                }
            },
            insert:function(sysCycle) {
                var _this = this;
                var params = new URLSearchParams();
                params.append("jsonStr", JSON.stringify(_this.sysCycle));
                _this.$refs[sysCycle].validate(function(valid) {
                    if (valid) {
                        _this.$axios.post('/third/grid/external/sysCycle/add', params).then(function (res) {
                            if (res.code == 0) {
                                _this.$message.success("保存成功");
                                _this.init();
                                $(".modal").hide();
                                _this.cance();
                                this.sysCycle = this.sysCycle2;
                            } else {
                                _this.$message.error("保存失败。");
                            }
                        })
                    }
                })
            },
            updateById:function(){
                var _this = this;
                var params = new URLSearchParams();
                params.append("jsonStr", JSON.stringify(_this.sysCycle));
                _this.$axios.put('/third/grid/external/sysCycle', params).then(function (res) {
                    if(res.code == 0){
                        _this.$message.success("修改成功");
                        _this.init();
                        $(".modal").hide();
                        this.cance();
                        this.sysCycle = this.sysCycle2;
                    }else{
                        _this.$message.error("修改失败。");
                    }
                })
            },
            del:function (id) {
                var _this = this;
                _this.$confirm('此操作将删除该站点信息, 是否继续?', '提示', {
                    customClass:'message-logout',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(function()  {
                    _this.$axios.delete('/third/grid/external/sysCycle/'+id).then(function (res) {
                        if(res.code == 0){
                            _this.$message.success("删除成功");
                            _this.init();
                        }else{
                            _this.$message.error("删除失败。");
                        }
                    })
                })
            },
                cellRow:function ({row, column, rowIndex, columnIndex}) {

                    return "font-size:14px";
                },
                rowCellStyle:function ({row, column, rowIndex, columnIndex}) {

                    return "background-color:#ffffff;border:0px;border-bottom:1px solid rgb(30, 121, 220);border-right:1px solid rgb(30, 121, 220);color:black";
                },

        }
    }

</script>

<style>
.message-logout{
    background: #0e1f32;
    border: 1px solid #4BABF5;
}
</style>