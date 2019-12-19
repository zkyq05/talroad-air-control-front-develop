<template>
    <div>

        <div class="layout">
            <div class="layout-side" style="padding: 0px;">
                <div style="border-bottom:black dashed 1px;width: 100%">
                    <div style="width: 100%;border: none;font-size: 20px;text-align: center" size="medium ">
                        <i class="el-icon-edit-outline"></i>&nbsp;&nbsp;措施执行
                    </div>
                </div>
                <div style="border-bottom:black dashed 1px;width: 100%">
                    <el-button style="width: 100%;border: none;font-size: 20px;" size="medium ">
                        任务下发
                    </el-button>
                </div>
                <div style="border-bottom:black dashed 1px;width: 100%">
                    <el-button style="width: 100%;border: none;font-size: 20px;" size="medium ">
                        <router-link to="ScheduleFollowing">执行进度跟踪</router-link>
                    </el-button>
                </div>
                <div style="border-bottom:black dashed 1px;width: 100%">
                    <el-button style="width: 100%;border: none;font-size: 20px;" size="medium ">
                        <router-link to="MeasureStore">措施库</router-link>
                    </el-button>
                </div>
            </div>
            <div class="layout-main" >
                <div style="margin-left: 31px;text-align: center;height: 60px;">
                    <h1 style="font-size: 20px;line-height: 60px">措施执行-任务下发</h1>
                </div>
                <div class="form-list-inline">
                    <div class="table-box" style="height: 750px">
                        <div class="block" style="margin-top: 20px">
                            <span style="margin-left: 30px">时间范围</span>
                            <el-date-picker
                                            type="daterange"
                                            range-separator="～"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期" @change="change(null)" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
                            </el-date-picker>
                            <el-button style="margin-left: 300px;" type="primary" @click="add(0)" icon="el-icon-plus" size="small" >新增</el-button>
                            <el-button type="success" @click="exportData" icon="el-icon-share" size="small">导出</el-button>

                        </div>
                        <div class="block" style="margin-top: 20px">
                            <span style="margin-left: 30px">整改措施类型</span>
                            <el-select clearable placeholder="请选择" @change="change(null)" style="width:225px;">
                                <el-option value="0" label="进行中"></el-option>
                                <el-option value="1" label="已完成"></el-option>
                                <el-option value="2" label="已办结"></el-option>
                                <el-option value="3" label="失效"></el-option>
                            </el-select>

                            <span style="margin-left: 50px;">责任区域</span>
                            <el-select clearable placeholder="请选择" @change="change(null)" style="width:225px;">
                                <el-option value="1" label="设备报警"></el-option>
                                <el-option value="2" label="数据报警"></el-option>
                                <el-option value="3" label="断线报警"></el-option>
                            </el-select>
                        </div>
                        <el-table border style="width: 100%;margin-top: 20px;">
                            <el-table-column type="index" width="67" label="编号" :index="getIndex" align="center"></el-table-column>
                            <el-table-column prop="StationName" label="整改措施类型" width="150" align="center"></el-table-column>
                            <el-table-column prop="PollutantName" sortable label="整改要求" width="150" align="center" ></el-table-column>
                            <el-table-column prop="Potency" sortable label="下发时间" width="150" :formatter="formatterDate" align="center"></el-table-column>
                            <el-table-column prop="AlarmTime" sortable label="整改截至时间" width="150" :formatter="formatterDate" align="center"></el-table-column>
                            <el-table-column prop="Remarks" sortable label="整改主体名称" width="150" align="center" ></el-table-column>
                            <el-table-column prop="Remarks" sortable label="责任区域" width="100" align="center" ></el-table-column>
                            <el-table-column label="操作" width="100" align="center">
                                <template slot-scope="scope">
                                    <el-button v-if="scope.row.task_code != null" type="success" plain  size="mini"  @click="checkTask(scope.row.PK_ID)" >查看任务</el-button>
                                    <el-button v-if="scope.row.task_code == null" type="success" plain  size="mini"  @click="sellTask(scope.row.PK_ID)" >派发任务</el-button>
                                    <el-button style="margin-left: 0px;margin-top: 3px" type="danger" plain  size="mini"  @click="showView(scope.row.PK_ID,scope.row.id)" >查看详情</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="pagination mt">
                            <Pagination ref="paginationObj" @handleCurrentChange="getIndex"
                                        @paginationFunction="getIndex"></Pagination>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import Pagination from '../../common/unit/Pagination'
    export default {
        name: "TaskSell",
        components:{
            Pagination
        },
        data:function(){
            return{

            }
        },
        mounted:function () {

        },
        methods:{
            formatterDate(row){
                row.AlarmTime = new Date(row.AlarmTime).format("yyyy-MM-dd hh:mm:ss");
                return row.AlarmTime;
            },
            getIndex:function(index) {
                var _this = this;
                let curPage = _this.$refs.paginationObj.cur_page;
                let limitPage = _this.$refs.paginationObj.cur_pageSize;
                return (index+1) + (curPage - 1) * limitPage;
            },

        }
    }
</script>

<style scoped>

</style>