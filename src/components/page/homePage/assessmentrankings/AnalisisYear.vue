<template>
    <div class="main-con">
        <!--<div style="margin-top: 20px">-->
            <!--<span style="font-size: 20px">分析报告-年报</span>-->
        <!--</div>-->
        <div class="panel-default" style="padding-top: 10px;padding-bottom: 10px">
            <span style="margin-left: 10px">日期</span>
            <el-date-picker
                    v-model="dateTime"
                    type="year"
                    placeholder="选择日期" @change="chage" value-format="yyyy">
            </el-date-picker>
            <span style="padding-top: 3px;float: right;font-size: 20px;margin-right: 60px"><label @click="openLog">新添 +</label></span>
        </div>
        <div style="margin-top: 30px">
            <el-table :data="tableData" class="table-default01 table-lg" stripe>
                <el-table-column
                        type="index"
                        width="70px" label="序号" :index="getIndex" align="center">
                </el-table-column>
                <el-table-column prop="reportName" show-overflow-tooltip label="报告名称" width="180" align="center"></el-table-column>
                <el-table-column prop="area" show-overflow-tooltip  label="区域" width="180" align="center" ></el-table-column>
                <el-table-column prop="reporter"  show-overflow-tooltip label="上传人" align="center"></el-table-column>
                <el-table-column prop="time" show-overflow-tooltip label="上传时间" align="center" :formatter="formatterDate"></el-table-column>
                <el-table-column prop="state"  label="报告状态" align="center" :formatter="statusFormatter"></el-table-column>
                <el-table-column  label="操作"    align="center">
                    <template slot-scope="scope">

                        <span v-if="scope.row.fileName!=null" @click="down(scope.row.fileName)"> <a id="hre">附件下载</a></span>
                    </template>
                </el-table-column>
            </el-table>
            <pagination ref="paginationObj" @handleCurrentChange="handleCurrentChange" @paginationFunction="paginationFunction"></pagination>
        </div>
        <div>
            <el-dialog :visible.sync="dialogFormVisible"  width="0px" @close="closeDialog"
                       :modal-append-to-body="false" :show-close="false"
                       :close-on-click-modal="false">
                <div class="modal" style="display: block;margin-top: 255px;width:377px;height: 435px;padding-left: 25px">
                    <div class="modal-hd">
                        <div class="modal-tit">新增年报</div>
                            <div class="form-box" element-loading-text="拼命加载中" >
                    <el-form ref="form" :model="form" label-width="100px" :rules="rules">

                        <el-form-item label="日期：" prop="time" >
                            <el-date-picker
                                    style="width: 200px"
                                    v-model="form.time"
                                    type="year"
                                    placeholder="选择日期" >
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="报告名称：" prop="reportName" >
                            <el-input v-model="form.reportName" style="width: 200px"></el-input>
                        </el-form-item>
                        <el-form-item label="区域：" prop="area" >
                            <el-autocomplete
                                    style="width: 200px"
                                    class="inline-input"
                                    v-model="form.area"
                                    :fetch-suggestions="querySearch"

                                    :trigger-on-focus="false"
                                    size="small"
                            ></el-autocomplete>
                        </el-form-item>
                        <el-form-item label="上传人：" prop="reporter" >
                            <el-input v-model="form.reporter" style="width: 200px"></el-input>
                        </el-form-item>
                        <el-form-item  label="上传附件"  prop="fname">
                            <el-upload
                                    ref="upload"
                                    class="upload-demo"
                                    action="/bas/base/imageController/uploadFile"
                                    :on-success="onSuccess">
                                <el-button size="small" type="primary">点击上传</el-button>

                            </el-upload>
                        </el-form-item>
                        <div style="text-align: center">
                            <span class="dialog-footer" >
                                    <el-button class="el-button el-button--default" size="small" @click="closeDialog">取消</el-button>
                                    <el-button class="el-button el-button--primary" size="small" @click="submitData('form')">提交</el-button>
                            </span>
                        </div>
                    </el-form>
                </div>
                    </div>
                </div>
            </el-dialog>
        </div>

    </div>
</template>

<script>
    import pagination from '../../../common/unit/Pagination';
    import downloadFile from '../../../common/unit/DownloadFile'
    export default {
        name: "Analysis",
        components:{
            pagination,
            downloadFile
        },
        data:function(){
            return{
                dateTime:"",
                tableData:[],
                options4: [],
                dialogFormVisible: false,
                form: {
                    time:'',
                    reportName:'',
                    area:'',
                    reporter:'',
                    fileName:'',
                    type:'年报',
                },
                formLabelWidth: '120px',
                restaurants:[],
                rules:{
                    time: [
                        { required: true, message: '请选择日期', trigger: 'blur' }
                    ],
                    reportName: [
                        { required: true, message: '请输入报告名称', trigger: 'blur' }
                    ],
                    area: [
                        { required: true, message: '请输入区域', trigger: 'blur' }
                    ],
                    reporter: [
                        { required: true, message: '请输入上传人', trigger: 'blur' }
                    ],
                }
            }
        },
        mounted:function(){
            let dat =new Date();
            this.dateTime=dat.format("yyyy");
            this.initPage();
            this.getRegion();
            //$(".modal").hide();//加载隐藏
        },
        methods:{
            /*cl(){
                $(".modal").fadeOut();// 弹窗淡入
            },*/
            formatterDate:function(row, cloumn, value) {
                if(value!=null)
                    return new Date(value).format("yyyy")
            },
            onSuccess(response,file,fileList){
                if(response.code == 0){
                    this.form.fileName = response.data.fileUrl;
                    this.$message({ message:"上传成功", type:'success' });
                    return true;
                }else{
                    this.$message({ message:res.msg, type:'error' });
                    return false;
                }
            },
            openLog:function(){
                //$(".modal").fadeIn();// 弹窗淡出
                this.dialogFormVisible = true;
            },
            down:function(str){
                let  _this = this;
                let params = new URLSearchParams();
                params.append("pathUrl",str)
                _this.$axios.post("/bas/base/imageController/downLoad",params
                ).then(function (response) {
                    let split = str.split(".");
                    let aTag = document.createElement('a');
                    let blob = new Blob([response]);　　// 这个content是下载的文件内容，自己修改
                    aTag.download =new Date().format('yyyyMMddhhmmss')+str;　　　　　　// 下载的文件名
                    aTag.href = URL.createObjectURL(blob);
                    aTag.click();
                    URL.revokeObjectURL(blob);
                }).catch(function (err) {
                    console.log(err);
                    // self.message = "连接服务器失败！"
                })
            },
            statusFormatter:function(row,column, cellValue){
                if(cellValue){
                    return "使用";
                }else {
                    return "停用";
                }

            },
            submitData:function(form){
                //数据新增操作，并更新页面
                var  _this = this;
                _this.$refs[form].validate(function(valid){
                    if (valid) {
                        var url = '/aircontrol/airassess/codReport/addReport';
                        _this.$axios.post(url, _this.form
                        ).then(function (res) {
                            if (res.code == 0) {
                                _this.$message.success('提交成功！');
                                _this.closeDialog();
                                _this.initPage();
                            }else {
                                //debugger
                                _this.$message.error(res.msg);
                            }
                        }).catch(function (err) {
                            //debugger
                            console.log(err);
                            // self.message = "连接服务器失败！"
                            _this.$message.info("提交失败！");
                        });
                    }
                });

            },
            //初始化查询列表 默认第一页
            initPage: function () {
                var _this = this;
                var self = this;
                var params = new URLSearchParams();
                _this.$refs.paginationObj.cur_page = 1;
                params.append("pageNum", _this.$refs.paginationObj.cur_page);
                params.append("pageSize", _this.$refs.paginationObj.cur_pageSize);
                params.append("date", _this.dateTime);
                params.append("type", "年报");
                this.$axios.post(
                    '/aircontrol/airassess/codReport/getReportByDate', params
                ).then(function (res) {
                    self.tableData = res.data.records;
                    _this.$refs.paginationObj.count = res.data.total;
                })
            },
            getIndex:function(index) {
                var _this=this;
                let curPage = _this.$refs.paginationObj.cur_page;
                let limitPage = _this.$refs.paginationObj.cur_pageSize;
                return (index+1) + (curPage - 1) * limitPage;
            },
            chage:function () {
                this.initPage();
            },
            dateClose:function () {
                let _this =this;
                this.initPage();
            },
            //分页回调
            handleCurrentChange:function(){
                this.initPage();
            },
            paginationFunction:function() {
                this.initPage();
            },
            //获取所有区域
            getRegion:function(){
                var _this=this;
                var url = '/aircontrol/airassess/codReport/getRegionName';
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
            closeDialog:function () {
                this.$refs.form.resetFields();
                this.$refs.upload.clearFiles();
                this.form.time='';
                this.form.reportName='';
                this.form.area='';
                this.form.reporter='';
                this.form.fileName='';
                this.dialogFormVisible = false;
               // $(".modal").fadeOut();// 弹窗淡入
            },
        },


    }
</script>

<style>
    .el-scrollbar{
        background: #202a42;
    }
    .el-autocomplete-suggestion li:hover{
        background-color: #40527d;
    }
</style>
