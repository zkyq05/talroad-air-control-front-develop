<template>
    <div>
            <div  class="main-con"  >
                <div style="margin-left: -22px;height: 60px;">
                    <div style="font-size: 20px;line-height: 60px;color: aliceblue;background: #202A42;padding-left: 36px">
                        <h1>网格管控 - 污染排查</h1>
                    </div>
                </div>
                        <div class="block" style="margin-top: 20px">
                            <span style="margin-left: 30px;color: aliceblue">区域</span>
                            <el-select v-model="region" placeholder="请选择" @change="init()" style="width:225px;">
                                <el-option
                                        v-for="item in regionArray"
                                        :key="item.regionId"
                                        :label="item.regionName"
                                        :value="item.regionId"
                                >
                                </el-option>
                            </el-select>
                            <span class="demonstration" style="margin-left: 25px;color: aliceblue">时间范围</span>
                            <el-date-picker style="margin-left: 5px"    v-model="daytime"
                                            type="daterange"
                                            range-separator="～"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期" @change="chage" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
                            </el-date-picker>
                            <span style="margin-left: 30px;color: aliceblue">处理状态</span>
                            <span><el-button type="button" style="min-width: 60px;" @click="statusChange(0)">待处理</el-button></span>
                            <span><el-button type="button"  style="min-width: 60px;" @click="statusChange(1)">排查中</el-button></span>
                            <span><el-button type="button" style="min-width: 60px;"  @click="statusChange(2)">排查完成</el-button></span>
                            <el-input placeholder="请输入任务名称" v-model="taskName" style="width: 200px;margin-left: 30px" clearable></el-input>
                            <el-button type="button" style="min-width: 80px;" class="el-button el-button--primary" icon="search" @click="init()">查询</el-button>
                        </div>
                        <div class="block" style="margin-top: 20px">



                        <el-table  :data="tableData" stripe>
                            <el-table-column prop="id" width="100px" label="编号"  align="center"></el-table-column>
                            <!--                            <el-table-column prop="taskSource" label="任务来源" width="150" align="center"></el-table-column>-->
                            <el-table-column prop="taskName" label="任务名称" width="auto" align="center"></el-table-column>
                            <el-table-column show-overflow-tooltip prop="addressName" label="任务对象" width="auto" align="center" ></el-table-column>
                            <el-table-column prop="createTime" label="任务开始时间" :formatter="formatterDate" width="auto" align="center" ></el-table-column>
                            <el-table-column prop="completeDate" label="任务截至时间" :formatter="formatterDate" width="auto" align="center"></el-table-column>
                            <el-table-column prop="gridName" label="责任网格" width="auto" align="center"></el-table-column>
                            <el-table-column prop="username" label="排查人员" width="auto" align="center"></el-table-column>
                            <el-table-column prop="signStatus" label="处理状态" width="auto" align="center" :formatter="formattersignStatus"></el-table-column>
                            <el-table-column show-overflow-tooltip prop="taskExplain" label="排查结果" width="auto" align="center"></el-table-column>
                            <el-table-column label="操作" width="auto" align="center">
                                <template slot-scope="scope" >

                                        <a href="#"  @click="showDialog(scope.row.id)" style="color: #1a33bf">管控</a>
                                        <a href="#"  @click="showView(scope.row)" style="color: #1a33bf;margin-left: 16px">查看</a>
<!--                                        <el-button v-if="scope.row.taskType!=3"  @click="showDialog(scope.row.id)" type="text" size="small">管控</el-button>-->
<!--                                        <el-button  @click="showView(scope.row)" type="text" size="small">查看</el-button>-->
                                </template>
                            </el-table-column>
                        </el-table>

                    <pagination ref="paginationObj" @handleCurrentChange="handleCurrentChange" @paginationFunction="paginationFunction"></pagination>
                        </div>
                <div>
                    <el-dialog title="管控" :visible.sync="dia" @close="controlsCance()"
                               width="0px"
                               :modal-append-to-body="false"
                               :close-on-click-modal="false"
                    >
                        <div class="modal" style="display: block;margin-top: 255px;width:500px;height: 650px;padding-left: 25px">
                            <div class="modal-hd">
                                <div class="modal-tit">管控</div>
                        <div class="form-box" element-loading-text="拼命加载中" >
                            <el-form ref="form" :model="addControlsTaskJson" label-width="100px" :rules="rules">
                                <el-form-item label="任务名称" style="width:323px">
                                   <el-input v-model="addControlsTaskJson.taskName"></el-input>
                                </el-form-item>
                                <el-form-item label="整改对象" prop="addressIds">
                                    <el-select v-model="addControlsTaskJson.addressIds"  style="width:225px;" multiple clearable placeholder="请选择" >
                                        <el-option
                                                v-for="item in addressIds"
                                                :key="item.informationId"
                                                :label="item.sourceName"
                                                :value="item.informationId"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="整改措施" prop="measure">
                                    <el-select v-model="addControlsTaskJson.measure" clearable placeholder="请选择" style="width:225px;">
                                        <el-option
                                                v-for = "item in measureStoreList"
                                                :key = "item.id"
                                                :label = "item.measureName"
                                                :value ="item.id"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="整改要求" prop="taskExplain" >
<!--                                      <textarea  v-model="addControlsTaskJson.taskExplain" autocomplete="off" rows="6" placeholder="请输入内容" class="el-textarea__inner" style="min-height: 100px;width: 300px;"></textarea>&lt;!&ndash;&ndash;&gt;-->
                                    <el-input type="textarea" style="width: 300px;" autocomplete="off"  v-model="addControlsTaskJson.taskExplain" clear    able :autosize="{ minRows: 6, maxRows: 10}"></el-input>
                                </el-form-item>
                                <el-form-item label="责任部门" prop="unitList">
                                    <el-select v-model="addControlsTaskJson.unitList[0]" clearable placeholder="请选择"  style="width:225px;">
                                        <el-option
                                                v-for = "item in unitList"
                                                :key = "item.unit_id"
                                                :label = "item.unit_name"
                                                :value ="item.unit_id"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="截止时间" prop="completeDate">
                                    <el-date-picker
                                            v-model="addControlsTaskJson.completeDate"
                                            type="datetime"
                                            placeholder="选择日期时间">
                                    </el-date-picker>
                                </el-form-item>
                            </el-form>
                            <div style="text-align: center;margin-top: 40px">
                                <span class="dialog-footer" >
                                        <el-button class="el-button el-button--default" type="button" @click="controlsCance()">取消</el-button>
                                        <el-button class="el-button el-button--primary" type="submit" @click="controlsSublime('form')">发送</el-button>
                                </span>
                            </div>
                                </div>
                            </div>
                        </div>
                    </el-dialog>
                </div>

            </div>
    </div>
</template>

<script>
    import Pagination from '../../common/unit/Pagination'

    export default {
        name: "PollutionScreening",
        components:{
            Pagination
        },
        data:function(){
            return{
                tableData:[],
                region:null,
                status:null,
                daytime:['',''],
                taskName:'',
                visible2:false,
                addControlsTaskJson:{
                    taskExplain:null,
                    measure:null,
                    unitList:[],
                    completeDate:null,
                    createUserId:sessionStorage.getItem("userId"),
                    addressId:null,
                    alarmId:null,
                    taskSource:2,
                    addressIds:[],
                    taskId:null,
                    taskName:"",
                },
                restaurants:[],
                dia:false,
                unitList:[],
                measureStoreList:[],
                addressIds:[],
                rules:{
                    addressIds:[{required:true,message:'请选择整改对象',trigger:"change"}],
                    measure:[{required:true,message:'请选择整改措施',trigger:"change"}],
                    taskExplain:[{required:true,message:'请输入整改要求',trigger:"blur"}],
                    unitList:[{required:true,message:'请选择责任部门',trigger:"change"}],
                    completeDate:[{required:true,message:'请选择截止时间',trigger:"blur"}],
                },
                regionArray:[],
            }
        },
        mounted:function () {
            this.init();
            this.getUnit();
            this.getRegionS();
        },
        methods:{
            //展示弹框
            showDialog:function(id){
                this.addControlsTaskJson.taskId=id;
                this.dia=true;
            },
            getUnit:function(){
                let _this=this;
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
            statusChange:function(statu){
                let _this=this;
                _this.status=statu;
                this.init();
            },
            chage:function () {
                let daytime = this.daytime;
                this.init();
            },
            formatterDate(row,column,value){
                let val= new Date(value).format("yyyy-MM-dd hh:mm:ss");
                return val;
            },
            formattersignStatus(row,column,value){
                if(value==0){
                    return '待处理';
                }else if (value==1){
                    return '排查中';
                }else if (value==2){
                    return '已排查';
                }else{
                    return '';
                }
            },

            init:function () {
                var _this = this;
                var params = new URLSearchParams();
                params.append("selectTaskJson",JSON.stringify({
                    page: _this.$refs.paginationObj.cur_page,
                    limit: _this.$refs.paginationObj.cur_pageSize,
                    regionId: _this.region,
                    status: _this.status,
                    startTime: _this.daytime[0],
                    endTime: _this.daytime[1],
                    taskName: _this.taskName,
                    taskClass:2,
                    taskSource:2
                }));
                _this.$axios.post('/third/task/external/task/selectPollutionScreen',params).then(function (res) {
                    if( res.code == 0){
                        _this.tableData = res.data.records;
                        _this.$refs.paginationObj.count = res.data.total;
                    }
                })
            },
            showDetail:function (id) {
                var _this = this;
                _this.dialogFormVisible = true;
                if(id != null && id != -1){
                    var params = new URLSearchParams();
                    params.append("id",id);
                    _this.$axios.post('/aircontrol/airmeasures/measureStore/getListByParams', params).then(function (res) {
                        if( res.code == 0){
                            _this.basMeasures = res.data.list[0];
                        }
                    })
                }
            },
            getRegionS(){
                let _this=this;
                _this.$axios.get('/bas/base/external/regionLever').then(function (res) {
                    if( res.code == 0){
                        _this.regionArray=res.data;
                        _this.regionArray.splice(0,0,{'regionId':null,"regionName":"全部"})
                    }
                })
            },
            controlsCance:function () {
                this.dia = false;
                this.$refs.form.resetFields();
                this.addControlsTaskJson.taskExplain=null;
                this.addControlsTaskJson.measure=null;
                this.addControlsTaskJson.unitList=[];
                this.addControlsTaskJson.completeDate=null;
                this.addControlsTaskJson.createUserId=null;
                this.addControlsTaskJson.addressId=null;
                this.addControlsTaskJson.alarmId=null;
                this.addControlsTaskJson.addressIds=[];
                this.addControlsTaskJson.alarmId=null;
                this.addControlsTaskJson.taskName="";
                this.addControlsTaskJson.taskId=null;
                this.pk_id = null;
            },
            controlsSublime:function (form) {
                var _this = this;
                // _this.addControlsTaskJson.alarmId = _this.pk_id;
                var params = new URLSearchParams();
                params.append("addControlsTaskJson",JSON.stringify(_this.addControlsTaskJson));
                _this.$refs[form].validate(function (validate) {
                    if(validate){
                        _this.$axios.post('/third/task/external/task/addControlsTask',params).then(function (res) {
                            if(res.code == 0){
                                if(res.data.status==true){
                                    _this.$message.success("保存成功");
                                    _this.dia = false;
                                    _this.getStatus();
                                }else {
                                    _this.dia = false;
                                    _this.$message.warning(res.data.message);
                                }}
                        })
                    }
                });

            },
            //获取所有区域
            getRegion:function(){
                var _this=this;
                var url = '/aircontrol/codReport/getRegionName';
                _this.$axios.post(url).then(function (res) {
                    _this.restaurants=res.data;
                })
            },

            querySearch:function(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                }
            },
            //分页回调
            handleCurrentChange:function(){
                this.init();
            },
            paginationFunction:function() {
                this.init();
            },
            //跳到查看详情页
            showView:function(row){
                    this.$parent.$router.push({ path: '/pollutionDetail', query: { "row":row }});
            },
            cellRow:function ({row, column, rowIndex, columnIndex}) {
                return "color:aliceblue:border:0px;border-bottom:0px;border-right:0px";
            },
            rowCellStyle:function ({row, column, rowIndex, columnIndex}) {

                return "background-color:#ffffff;border:0px;border-bottom:1px solid rgb(30, 121, 220);border-right:1px solid rgb(30, 121, 220);color:black";
            },
        }
    }

</script>

<style scoped>

</style>
<style>
    .el-dialog__header {
        padding: 20px;
        padding-bottom: 10px;
    }
    .el-picker-panel__footer{
        background-color:#0f141f;
        border-top: 1px solid #0F5460 ;
    }
    .el-date-picker__time-header{
        border-bottom: 1px solid #0F5460;
    }
</style>