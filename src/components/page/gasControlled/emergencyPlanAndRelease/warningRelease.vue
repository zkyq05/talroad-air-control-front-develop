<template>
    <div class="main-con">

        <div class="panel-default">
            <div class="panel-bd pd-lg">
                <div class="filter-box">

       <!-- <div class="breadcrumb">
            <span class="current">重污染天气管控 - 应急预案</span>
        </div>-->

                <el-form :inline="true"  class="demo-form-inline">
                    <el-form-item label="年" style="margin-left: 30px">
                        <el-select v-model="year" placeholder="请选择年" style="width: 100px" @change="change">
                            <el-option
                                    v-for="item in years"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="状态：" prop="warningLevel" >
                        <el-select v-model="status" style="width: 100px">
                            <el-option
                                    v-for="item in statusList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="名称">
                        <el-autocomplete
                                class="inline-input"
                                v-model="str"

                                placeholder="名称"
                                :trigger-on-focus="false"
                        ></el-autocomplete>
                    </el-form-item>


                    <el-form-item style="float: right;margin-bottom: 0px">
                        <div style="float:right ">
                            <button @click="init(1)" class="el-button el-button--primary" style="width: 120px;" type="button"><span>查询</span></button>
                            <button @click="openView('')" class="el-button el-button--primary" style="width: 120px;" type="button"><span>新增</span></button>

                        </div>
                    </el-form-item>
                </el-form>
                </div>
            </div>
        </div>
        <el-table :data="tableData"   ref="multipleTable"
                  @selection-change="selectionChange"  class="table-default01 table-lg"
                    style =" background-color: #202a42" stripe="true">
            <el-table-column type="index"  label="序号" align="center" width="70px" :index="getIndex">
            </el-table-column>
            <el-table-column prop="warningName" label="应急事件" align="center">
            </el-table-column>
            <el-table-column prop="warningLevel" label="预警级别" align="center">
            </el-table-column>
            <el-table-column prop="planCode" label="关联预案" align="center">
            </el-table-column>
            <el-table-column prop="staTm" label="启动时间" align="center" width="165px">
            </el-table-column>
            <el-table-column prop="endTm" label="解除时间" align="center" width="165px">
            </el-table-column>
            <el-table-column prop="hour" label="持续时长（小时）" align="center">
            </el-table-column>
            <el-table-column prop="publishStatus" label="当前状态" align="center">
            </el-table-column>
            <el-table-column prop="pubTm" label="创建时间" align="center" width="165px">
            </el-table-column>
            <el-table-column prop="" label="操作" align="center">
                <!--
                审核状态：1未审核，2已通过，3未通过
                处理状态：1未发布，2已发布，3已解除

                -->
                <template slot-scope="scope">
                    <a class="color-other" href="javascript:;"  @click="click(scope.$index, scope.row)" v-show=" scope.row.publishStatus == '1'" >{{scope.row.publish}}</a>
                    <a class="color-other" href="javascript:;"  @click="click(scope.$index, scope.row)" v-show="scope.row.auditStatus == '1'&& scope.row.publishStatus == '2'" >{{scope.row.audit}}</a>
                    <a class="color-other" href="javascript:;"  @click="click(scope.$index, scope.row)" v-show="scope.row.auditStatus == '2'&& scope.row.publishStatus == '2'" >{{scope.row.publish}}</a>
                    <a class="color-other" href="javascript:;"  @click="click(scope.$index, scope.row)" v-show="scope.row.publishStatus == '3'" >{{scope.row.publish}}</a>
                    <a class="color-other" href="javascript:;"  @click="click(scope.$index, scope.row)" v-show="scope.row.auditStatus == '3'" >{{scope.row.audit}}</a>
                </template>
            </el-table-column>
        </el-table>
        <pagination ref="paginationObj" @handleCurrentChange="handleCurrentChange" @paginationFunction="paginationFunction"></pagination>

        <!--      弹窗          弹窗           弹窗           弹窗       弹窗          -->
        <el-dialog  :visible.sync="dialogFormVisible" @close="closeDia" width="450px"
                    :modal-append-to-body="false"
                    :close-on-click-modal="false">
                <!-- -->
            <div class="modal" style="display: block;margin-top: 255px;width:450px;height: 620px">
                <div  class="modal-close" title="关闭" @click="dialogFormVisible=false"><i class="icon icon-close"></i></div>
                <div class="modal-hd">
                    <div class="modal-tit">新增</div>
                    <div  element-loading-text="拼命加载中" :rules="rules">
                        <el-form ref="editForm" :model="editForm" label-width="200px" :rules="rules">


                            <el-form-item label="预案名称：" prop="warningName"  >
                                <el-input v-model="editForm.warningName" style="width: 200px" autocomplete="off"></el-input>
                            </el-form-item>


                            <el-form-item label="预案编码：" prop="warningCode" >
                                <el-input v-model="editForm.warningCode" style="width: 200px"></el-input>
                            </el-form-item>


                            <el-form-item label="预案级别：" prop="warningLevel" >
                                <el-select v-model="editForm.warningLevel" style="width: 200px">
                                    <el-option
                                            v-for="item in statusList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>


                            <el-form-item label="预警内容：" prop="warningContent" >
                                <el-input v-model="editForm.warningContent" style="width: 200px"></el-input>
                            </el-form-item>


                            <el-form-item label="应急预案编码：" prop="planCode" >
                                <el-input v-model="editForm.planCode" style="width: 200px"></el-input>
                            </el-form-item>


                            <el-form-item label="重污染天气预警启动时间：" prop="startTime" autocomplete="off" >
                                <div class="block">
                                    <el-date-picker
                                            style="width: 200px"
                                            v-model="editForm.startTime"
                                            type="datetime"
                                            placeholder="选择日期时间">
                                    </el-date-picker>
                                </div>
                            </el-form-item>


                            <el-form-item label="重污染天气预警解除时间：" prop="endTime"  autocomplete="off" >
                                <div class="block">
                                    <el-date-picker
                                            style="width: 200px"
                                            v-model="editForm.endTime"
                                            type="datetime"
                                            placeholder="选择日期时间">
                                    </el-date-picker>
                                </div>
                            </el-form-item>


                            <el-form-item label="发布人：" prop="publishUserId" >
                                <el-input v-model="editForm.publishUserId" style="width: 200px"></el-input>
                            </el-form-item>


                            <div style="text-align: center">
                            <span class="dialog-footer" >
                                    <el-button class="el-button el-button&#45;&#45;default" size="small" @click="dialogFormVisible=false">取消</el-button>
                                    <el-button class="el-button el-button&#45;&#45;primary" size="small" @click="submitForm('editForm')">提交</el-button>
                            </span>
                            </div>


                        </el-form>
                    </div>
                </div>
                <div class="modal-bd">

                </div>
            </div>
        </el-dialog>

    </div>

</template>

<script>
    import pagination from '../../../common/unit/Pagination';
    export default {
        name: "warningRelease",
        components:{
            pagination
        },
        data(){
            return{
                tableData: [],
                deleteList:[],
                years: [],
                year:"",
                str:"",
                dialogFormVisible: false,//用来控制是否显示弹出
                canRead: false,//用来控制能否进行写入，false为可以写入，这里一般不会进行变更，没有查看详情操作
                status:"",
                updateUserId:"1189",  //获取当前用户
                editForm:{
                    id:"",
                    warningContent:"",
                    planCode:"",
                    startTime:"",
                    endTime:"",
                    auditStatus:"",
                    publishStatus:"",
                    publishUserId:"",
                    warningName:"",
                    warningCode:"",
                    warningLevel:"",
                },
                changeForm:{
                    against:"",
                    auditStatus:"",
                    publishStatus:"",
                    warningCode:"",
                    id:"",
                    updateUserId:"",
                },
                statusList:[
                    {
                        value: "红色预警",
                        label: "红色预警",
                    },
                    {
                        value: "橙色预警",
                        label: "橙色预警",
                    },
                    {
                        value: "黄色预警",
                        label: "黄色预警",
                    },
                ],
                rules:{
                    warningName: [
                        { required: true, message: '请输入预警名称', trigger: 'blur' }
                    ],
                    warningCode: [
                        { required: true, message: '请输入预警编码', trigger: 'blur' }
                    ],
                    startTime: [
                        { required: true, message: '请指定开始时间', trigger: 'blur' }
                    ],
                    endTime: [
                        { required: true, message: '请指定结束时间', trigger: 'blur' }
                    ],
                },
            }
        },
        mounted(){
            this.getYearList();
            this.init(1)
        },
        methods:{
            click(index, row){

                this.changeForm.updateUserId = this.updateUserId;
                this.changeForm.auditStatus = row.auditStatus;
                this.changeForm.publishStatus = row.publishStatus;
                this.changeForm.id = row.id;
                this.changeForm.warningCode = row.warningCode;
               if(row.auditStatus == '1'&& row.publishStatus == '2'){
                    this.open()
               }else{
                   this.clickReal()
               }
            },
            open() {
                this.$confirm('此操作将进行审核操作, 是否继续?', {
                    confirmButtonText: '通过审核',
                    cancelButtonText: '不通过审核',
                    type: 'warning'
                }).then(() => {
                    this.clickReal();
                    this.$message({
                        type: 'success',
                        message: '审核已通过!'
                    });
                }).catch(() => {
                    this.changeForm.against = 'against';
                    this.clickReal()
                    this.$message({
                        type: 'info',
                        message: '未通过审核'
                    });
                });
            },

            clickReal(){
                let that = this;
                if(that.changeForm.auditStatus == 3 || that.changeForm.publishStatus == 3){
                    return
                }
                var url = '/aircontrol/airassess/codHeavyDay/changeProcess';
                that.$axios.get(url,{params:{
                        'against':that.changeForm.against ,
                        'auditStatus': that.changeForm.auditStatus ,
                        'publishStatus':that.changeForm.publishStatus,
                        'id':that.changeForm.id,
                        'warningCode':that.changeForm.warningCode,
                        'updateUserId':that.changeForm.updateUserId,
                    }}).then(
                    function (res) {
                        if(res.code == 0){
                           that.init(1);
                        }else{

                            that.$message.error(res.msg);
                        }
                    }
                )
            },

            init(val) {
                var that =this;
                if (val == 1) {
                    that.$refs.paginationObj.cur_page = 1;
                } else {
                    that.$refs.paginationObj.cur_page = val
                }
                var url = '/aircontrol/airassess/codHeavyDay/getReleseListByParam';
                that.$axios.get(url,{params:{
                        "pageNum": that.$refs.paginationObj.cur_page,
                        "pageSize": that.$refs.paginationObj.cur_pageSize,
                        "year":that.year,
                        "str":that.str,
                        "status":that.status,
                    }}).then(
                    function (res) {
                        that.$refs.paginationObj.count = res.data.total;
                        if(res.code == 0){
                            that.tableData = res.data.records;
                        }
                    }
                )
            },
            onSuccess(response,file,fileList){
                //debugger
                if(response.code == 0){
                    this.editForm.fileName = response.data.fileUrl;
                    this.$message({ message:"上传成功", type:'success' });
                    return true;
                }else{
                    this.$message({ message:res.msg, type:'error' });
                    return false;
                }
            },

            submitForm:function(editForm) {
                //debugger
                console.log("按钮进入选择提交与修改"+this.editForm);
                let  _this = this;
                console.info(_this.editForm.id);
                if (_this.editForm.id=="") {


                    console.log("即将进行新增");
                    this.insertService(editForm)
                } else {
                }
            },

            //数据新增操作，并更新页面
            insertService:function(editForm) {
                var  _this = this;
                _this.editForm.auditStatus = 1 ;
                _this.editForm.publishStatus = 1 ;
                _this.editForm.updateUserId = this.updateUserId;
                _this.$refs[editForm].validate(function(valid) {
                    if (valid) {
                        console.info("进行了新增的请求");
                        var url = '/aircontrol/airassess/codHeavyDay/addNewHeavyDay';
                        _this.$axios.post(url, _this.editForm
                        ).then(function (res) {
                            if (res.code == 0) {
                                _this.$message.success('提交成功！');
                                _this.dialogFormVisible = false;
                                _this.cur_page = 1;
                                _this.init(1);
                                // console.log(self.tableData);
                            }else {
                                _this.$message.error(res.msg);
                            }
                        }).catch(function (err) {
                            console.log(err);
                            // self.message = "连接服务器失败！"
                            _this.$message.info("提交失败！");
                        });
                    }
                });
            },
            //     动态 年years列标  今年前后十年
            change(){
                this.init(1);
            },
            getYearList(){
                var that = this;
                var myDate=new Date();
                that.year = myDate.getFullYear() ;
                var startYear=myDate.getFullYear()-10;
                var endYear=myDate.getFullYear()
                for(var i=startYear;i<=endYear;i++){
                    var option = new Option();
                    that.$set( option, 'label', i )
                    that.$set( option, 'value', i)
                    that.years.push(option);
                }
            },
            //获得选中状态
            selectionChange:function(val){
                this.deleteList = val;
            },
            selectionChange:function(val){
                this.deleteList = val;
            },
            handleCurrentChange: function () {
                this.init(this.$refs.paginationObj.cur_page);
            },
            paginationFunction: function () {
                this.init(this.$refs.paginationObj.cur_page);
            },
            getIndex:function(index,value){
                var _this = this;
                let curPage = _this.$refs.paginationObj.cur_page;
                let limitPage = _this.$refs.paginationObj.cur_pageSize;
                return (index+1) + (curPage - 1) * limitPage;
            },
            //打开新增页面
            openView:function(){
                var _this=this;
                _this.dialogFormVisible=true;
            },

            /*关闭新增页、编辑页*/
            closeDia:function(){
                this.$refs.editForm.resetFields();
                this.editForm.id='';
                this.dialogFormVisible=false;
                this.editForm.pollutantName='';
                this.editForm.pollutantCode='';
                this.editForm.unit='';
                this.editForm.decimalPoint='';
                this.editForm.pkId='';
                this.init(1);
            }
        }
    }
</script>

<style scoped>

</style>


