<template>
            <div class="main-con" >
                <div style="margin-left: -22px;height: 60px;">
                    <div style="font-size: 20px;line-height: 60px;color: aliceblue;background: #202A42;padding-left: 36px">
                        <h1>网格管控 - 巡查日志</h1>
                    </div>
                </div>
                    <div class="table-box" style="height: 750px">

                        <div class="block" style="margin-top: 20px">
                            <span style="margin-left: 20px;color: aliceblue">区域</span>
                            <el-select v-model="selectDailyPatrolJson.regionId" @change="init" clearable placeholder="请选择" style="width:225px;">
                                <el-option
                                        v-for = "item in areaList"
                                        :key = "item.regionId"
                                        :label = "item.regionName"
                                        :value ="item.regionId"
                                ></el-option>
                            </el-select>

                            <span style="margin-left: 20px;;color: aliceblue">网格</span>
                            <el-select v-model="selectDailyPatrolJson.gridId" clearable placeholder="请选择" @change="init" style="width:225px;">
                                <el-option
                                        v-for = "item in grid"
                                        :key = "item.id"
                                        :label = "item.gridName"
                                        :value ="item.id"
                                ></el-option>
                            </el-select>
                            <span class="demonstration" style="margin-left: 25px;color: aliceblue">时间范围</span>
                            <el-date-picker style="margin-left: 5px"
                                            v-model="dateTime"
                                            type="daterange"
                                            range-separator="～"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期"  @change="init" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
                            </el-date-picker>
                            <el-input placeholder="请输入内容" style="width: 200px;margin-left: 20px;" clearable></el-input>
                            <button type="button" class="el-button el-button--primary" style="margin-left: 10px"  @click="init">查询</button>
                        </div>
                        <div class="block" style="margin-top: 20px">

                        </div>
                        <el-table :data="tableData"  style="width: 100%;margin-top: 20px;border: 0px;border-right: 0px" class="table3"  stripe="true">
                            <el-table-column type="index" width="100px" label="编号" :index="getIndex" align="center"></el-table-column>
                            <el-table-column prop="taskName" label="任务名称" width="auto" align="center"></el-table-column>
                            <el-table-column prop="addressName" label="巡查对象" width="auto" align="center"></el-table-column>
                            <el-table-column prop="gridName" label="责任网格" width="auto" align="center" ></el-table-column>
                            <el-table-column prop="createTime" label="起始时间" width="auto" align="center" :formatter="formatterDate"></el-table-column>
                            <el-table-column prop="username" label="巡查人员" width="auto" align="center"></el-table-column>
                            <el-table-column prop="patrolResult" label="巡查结果" width="auto" align="center"></el-table-column>
                            <el-table-column label="操作" width="70px" align="center">
                                <template slot-scope="scope">
                                    <el-button type="success" plain  size="mini"  @click="showDetail(scope.row.id)" >查看详情</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="pagination mt">
                            <Pagination @handleCurrentChange="init" @paginationFunction="init"
                                        ref="paginationObj"></Pagination>
                        </div>
                </div>
            </div>
</template>

<script>
    import Pagination from '../../common/unit/Pagination'

    export default {
        name: "PatrolLog",
        components:{
            Pagination
        },
        data:function(){
            return{
                tableData:[],
                selectDailyPatrolJson:{
                    regionId : null,
                    taskSource : 2,
                    startTime : null,
                    endTime : null,
                    taskName : null,
                    taskClass : null,
                    gridId : null,
                    page : '',
                    limit : '',
                },
                selectDailyPatrolJson2:{
                    regionId : null,
                    taskSource : 2,
                    startTime : null,
                    endTime : null,
                    taskName : null,
                    taskClass : null,
                    gridId : null,
                    page : '',
                    limit : '',
                },
                dialogFormVisible : false,
                areaList:[],
                dateTime:['',''],
                grid:[]
            }
        },
        mounted:function () {
            this.init();
        },
        methods:{
            formatterDate(row){
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
                if(_this.selectDailyPatrolJson.regionId == ''){
                    _this.selectDailyPatrolJson.regionId = null;
                }
                if(_this.selectDailyPatrolJson.gridId == ''){
                    _this.selectDailyPatrolJson.gridId = null;
                }
                if(_this.dateTime != null && _this.dateTime[0] != ''){
                    _this.selectDailyPatrolJson.startTime = _this.dateTime[0];
                    _this.selectDailyPatrolJson.endTime = _this.dateTime[1];
                }else{
                    _this.selectDailyPatrolJson.startTime = null;
                    _this.selectDailyPatrolJson.endTime = null;
                }
                _this.selectDailyPatrolJson.page = _this.$refs.paginationObj.cur_page;
                _this.selectDailyPatrolJson.limit = _this.$refs.paginationObj.cur_pageSize;
                params.append("selectDailyPatrolJson",JSON.stringify(
                    _this.selectDailyPatrolJson
                ));
                _this.$axios.post('/third/task/external/task/selectDailyPatrol',params).then(function (res) {
                    if( res.code == 0){
                        _this.tableData = res.data.records;
                        _this.$refs.paginationObj.count = res.data.total;
                    }
                });

                _this.$axios.get('/bas/base/external/regionLever').then(function (res) {
                    if(res.code == 0){
                        _this.areaList = res.data;
                    }
                });

                _this.$axios.get('/third/grid/external/grid/PSpage').then(function (res) {
                    if(res.code == 0){
                        _this.grid = res.data.records;
                    }
                });
            },
            showDetail:function (id) {
                this.$router.push({path:'/PatrolLogDetail',query:{'id':id}});
            },
            cance:function(){
                this.dialogFormVisible = false;
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
                        _this.dialogFormVisible = false;
                        this.basMeasures = this.basMeasures2;
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
                        _this.dialogFormVisible = false;
                        this.basMeasures = this.basMeasures2;
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
            cellRow:function ({row, column, rowIndex, columnIndex}) {

                return "color:#ffffff:border:0px;border-bottom:0px;border-right:0px";
            },
            rowCellStyle:function ({row, column, rowIndex, columnIndex}) {

                return "background-color:#ffffff;border:0px;border-bottom:1px solid #354c65;border-right:1px solid #354c65;color:black";
            },
        }
    }

</script>

<style scoped>
.table3{
    line-height: 21px;
}
</style>