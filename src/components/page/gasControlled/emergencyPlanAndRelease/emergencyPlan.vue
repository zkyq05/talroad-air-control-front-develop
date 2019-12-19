<template>
    <div class = "main-con">

        <div class="panel-default">
            <div class="panel-bd pd-lg">
                <div class="filter-box">
                <el-form :inline="true" class="demo-form-inline">
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

                    <el-form-item label="名称">
                        <el-autocomplete
                                class="inline-input"
                                v-model="str"
                                :fetch-suggestions="str"
                                placeholder="名称"
                                :trigger-on-focus="false"
                        ></el-autocomplete>
                    </el-form-item>

                    <el-form-item style="float: right;margin-bottom: 0px">
                        <div style="float:right ">
                            <el-button type="primary" icon="search" style="width: 120px" @click="init(1)">查询</el-button>
                            <el-button type="primary" style="width: 120px" @click="openView('')" >新增
                            </el-button>
                            <!-- <el-button type="danger"  size="small" @click="deleteS()" icon="el-icon-delete">批量删除</el-button>-->
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        </div>
        <el-table :data="tableData"  style="background-color: #202a42 " ref="multipleTable"
                  @selection-change="selectionChange" stripe="true" class="table-default01 table-lg">
           <!-- <el-table-column v-model="deleteList"
                             type="selection"
                             width="55">
            </el-table-column>-->
            <el-table-column type="index" label="序号" align="center" width="70px" :index="getIndex">
            </el-table-column>
            <el-table-column prop="warningLevel" label="预警级别" align="center">
            </el-table-column>
            <el-table-column prop="planName" label="名称" align="center">
            </el-table-column>
            <el-table-column prop="department" label="编制部门" align="center">
            </el-table-column>
            <el-table-column prop="fileName" label="附件" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.fileName!=null" @click="down(scope.row.fileName)"> <a id="hre">附件下载</a></span>
                </template>
            </el-table-column>
            <el-table-column prop="date" label="时间" align="center">
            </el-table-column>
            <el-table-column prop="pm10AvgValue" label="操作" align="center">
                <template slot-scope="scope">
                    <a class="color-other" href="javascript:;" @click="updateView(scope.row.id,true) ">编辑</a>
                    <a class="color-other" href="javascript:;" @click="deleteData(scope.row.id,true)" >删除</a>
                </template>
            </el-table-column>
        </el-table>
        <pagination ref="paginationObj" @handleCurrentChange="handleCurrentChange"
                    @paginationFunction="paginationFunction"></pagination>

        <!--      弹窗          弹窗           弹窗           弹窗       弹窗          -->
        <el-dialog :visible.sync="dialogFormVisible" @close="closeDia" width="450px"
                   :modal-append-to-body="false"
                   :close-on-click-modal="false">
            <div class="modal" style="display: block;margin-top: 255px;width:450px;height: 750px">
                <div  class="modal-close" title="关闭" @click="dialogFormVisible=false"><i class="icon icon-close"></i></div>
                <div class="modal-hd">
                    <div class="modal-tit"></div>
            <div class="form-box" element-loading-text="拼命加载中" :rules="rules">
                <el-form ref="editForm" :model="editForm" label-width="160px" :rules="rules">
                    <tr>
                        <td>
                            <el-form-item label="选择年份：" prop="year" class="is-required">
                                <el-select v-model="editForm.year" placeholder="请选择年" style="width: 100px"
                                           @change="change">
                                    <el-option
                                            v-for="item in years"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <el-form-item label="预案名称：" prop="planName">
                                <el-input v-model="editForm.planName" style="width: 200px"></el-input>
                            </el-form-item>
                            <el-form-item label="预案编码：" prop="planCode">
                                <el-input v-model="editForm.planCode" style="width: 200px"></el-input>
                            </el-form-item>
                            <el-form-item label="预案级别：" prop="warningLevel">
                                <el-select v-model="editForm.warningLevel" style="width: 200px">
                                    <el-option
                                            v-for="item in functionalList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="编制部门：" prop="department">
                                <el-input v-model="editForm.department" style="width: 200px"></el-input>
                            </el-form-item>
                            <el-form-item label="预案摘要：" prop="planDigest">
                                <el-input v-model="editForm.planDigest" style="width: 200px"></el-input>
                                    <!--<textarea :row="2" autocomplete="off" class="el-textarea__inner" clearable placeholder="请输入内容" style="min-height: 53px;" type="textarea" v-model="editForm.planDigest" ></textarea>
                                    <div class="text-num">0/600</div>-->
                            </el-form-item>
                            <el-form-item label="处理状态：" prop="status">
                                <el-input v-model="editForm.status" style="width: 200px"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-form-item label="月：" prop="planDigest" style="float: left">
                                <el-input v-model="editForm.month" style="width:75px"></el-input>
                            </el-form-item>
                            <el-form-item label="日：" prop="planDigest" style="float: left">
                                <el-input v-model="editForm.day" style="width:75px"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-form-item label="上传附件" prop="fileName">
                                <el-upload
                                        class="upload-demo"
                                        action="/bas/base/imageController/uploadFile"
                                        :file-list="editForm.files"
                                        :on-success="onSuccess" on-preview>

                                    <el-button size="small" type="primary">点击上传</el-button>
                                </el-upload>
                            </el-form-item>
                        </td>
                    </tr>


                    <div style="text-align: center">
                            <span class="dialog-footer">
                                    <el-button class="el-button el-button--default" size="small"
                                               @click="dialogFormVisible=false">取消</el-button>
                                    <el-button class="el-button el-button--primary" size="small"
                                               @click="submitForm('editForm')">提交</el-button>
                            </span>
                    </div>
                </el-form>
            </div>
                </div>
            </div>
        </el-dialog>

    </div>

</template>

<script>
    import pagination from '../../../common/unit/Pagination';

    export default {
        name: "emergencyPlan",
        components: {
            pagination
        },
        data() {
            return {

                tableData: [],
                deleteList: [],
                years: [],
                year: "",
                str: "",
                dialogFormVisible: false,//用来控制是否显示弹出
                canRead: false,//用来控制能否进行写入，false为可以写入，这里一般不会进行变更，没有查看详情操作
                editForm: {
                    id: "",
                    planCode: "",
                    planName: "",
                    department: "",
                    fileName: "",
                    year: "",
                    month: "",
                    day: "",
                    warningLevel: "",
                    status: "",
                    planDigest: "",
                    files:[],
                },
                functionalList: [
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
                    planCode: [
                        { required: true, message: '请输入预案编码', trigger: 'blur' }
                    ],
                    planName: [
                        { required: true, message: '请输入预警名称', trigger: 'blur' }
                    ],
                    year: [
                        { required: true, message: '请选择年份', trigger: 'blur' }
                    ],
                    department: [
                        { required: true, message: '请选择编制部门', trigger: 'blur' }
                    ],
                    warningLevel: [
                        { required: true, message: '请选择预案级别', trigger: 'blur' }
                    ],
                    planDigest: [
                        { required: true, message: '请输入预案摘要', trigger: 'blur' }
                    ],
                    status: [
                        { required: true, message: '请选择预案状态', trigger: 'blur' }
                    ],
                    warningLevel: [
                        { required: true, message: '请选择预案级别', trigger: 'blur' }
                    ],
                    files: [
                        { required: true, message: '请选择预案级别', trigger: 'blur' }
                    ],
                }
            }
        },
        mounted() {
            this.getYearList();
            this.init(1);
        },
        methods: {

            init(val) {
                var that = this;
                if (val == 1) {
                    that.$refs.paginationObj.cur_page = 1;
                } else {
                    that.$refs.paginationObj.cur_page = val
                }
                var url = '/aircontrol/airassess/codHeavyPlan/initPlansByParam';
                that.$axios.get(url, {
                    params: {
                        "pageNum": that.$refs.paginationObj.cur_page,
                        "pageSize": that.$refs.paginationObj.cur_pageSize,
                        "year": that.year,
                        "str": that.str
                    }
                }).then(
                    function (res) {
                        that.$refs.paginationObj.count = res.data.total;
                        if (res.code == 0) {
                            that.tableData = res.data.records;
                        }
                    }
                )
            },
            onSuccess(response, file, fileList) {
                if (response.code == 0) {
                    this.editForm.fileName = response.data.fileUrl;
                    this.$message({message: "上传成功", type: 'success'});
                    return true;
                } else {
                    this.$message({message: res.msg, type: 'error'});
                    return false;
                }
            },
            down: function (str) {
                let _this = this;
                let params = new URLSearchParams();
                params.append("pathUrl", str)
                _this.$axios.post("/bas/base/imageController/downLoad", params
                ).then(function (response) {
                    let split = str.split(".");
                    let aTag = document.createElement('a');
                    let blob = new Blob([response]);　　// 这个content是下载的文件内容，自己修改
                    aTag.download = new Date().format('yyyyMMddhhmmss') + str;　　　　　　// 下载的文件名
                    aTag.href = URL.createObjectURL(blob);
                    aTag.click();
                    URL.revokeObjectURL(blob);
                }).catch(function (err) {
                    console.log(err);
                    // self.message = "连接服务器失败！"
                })
            },

            submitForm: function (editForm) {
                console.log("按钮进入选择提交与修改" + this.editForm);
                let _this = this;
                console.info(_this.editForm.id);
                if (_this.editForm.id == "") {
                    console.log("即将进行新增");
                    this.insertService(editForm)
                } else {
                    console.log("编辑");
                    this.updateService(editForm)
                }
            },

            //数据新增操作，并更新页面
            insertService: function (editForm) {
                var _this = this;
                _this.$refs[editForm].validate(function (valid) {
                    if (valid) {
                        console.info("进行了新增的请求");
                        var url = '/aircontrol/airassess/codHeavyPlan/addNewPlan';
                        _this.$axios.post(url, _this.editForm
                        ).then(function (res) {
                            if (res.code == 0) {
                                _this.$message.success('提交成功！');
                                _this.dialogFormVisible = false;
                                _this.cur_page = 1;
                                _this.init(1);
                                // console.log(self.tableData);
                            } else {
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
            //数据更新操作，并更新页面
            updateService: function (editForm) {
                var _this = this;
                _this.$refs[editForm].validate(function (valid) {
                    if (valid) {
                        var url = '/aircontrol/airassess/codHeavyPlan/updatePlanById';
                        _this.$axios.post(
                            url, _this.editForm
                        ).then(function (res) {
                            if (res.code == 0) {
                                _this.$message.success('修改成功！');
                                _this.dialogFormVisible = false;
                                _this.cur_page = 1;
                                _this.init(1);
                                // console.log(self.tableData);
                            } else {
                                _this.$message.error(res.msg);
                            }
                        }).catch(function (err) {
                            console.log(err);
                            _this.$message.info("修改失败！")
                        });
                    } else {
                        _this.$message.error('修改失败！');
                    }
                });
            },


            //点击编辑打开弹框后  传一行的id进行查询后  初始化页面
            updateView: function (id) {
                var that = this;
                var url = '/aircontrol/airassess/codHeavyPlan/getOnePlanByid';
                that.$axios.get(url, {
                    params: {
                        "id": id,
                    }
                }).then(
                    function (res) {
                        if (res.code == 0) {
                            that.dialogFormVisible = true;
                            that.editForm.id = res.data[0].id;
                            that.editForm.planCode = res.data[0].planCode;
                            that.editForm.planName = res.data[0].planName;
                            that.editForm.department = res.data[0].department;
                            that.editForm.fileName = res.data[0].fileName;
                            that.editForm.status = res.data[0].status;
                            that.editForm.planDigest = res.data[0].planDigest;
                            that.editForm.year = res.data[0].year;
                            that.editForm.month = res.data[0].month;
                            that.editForm.day = res.data[0].day;
                            that.editForm.warningLevel = res.data[0].warningLevel;
                        } else {
                            that.$message.error(res.msg);
                        }
                    }).catch(function (err) {
                    console.log(err);
                })
            },
            deleteData: function (id) {
                let _this = this;
                _this.$confirm('此操作将删除该因子信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function () {
                    var params = new URLSearchParams();
                    params.append('id', id);
                    var url = '/aircontrol/airassess/codHeavyPlan/deletePlanByid';
                    _this.$axios.post(url, params).then(function (res) {
                        console.log(res);
                        if (res.code == 0) {
                            _this.$message.success('删除成功！');
                            _this.$refs.paginationObj.cur_page = 1;
                            _this.init(1);
                        } else {
                            _this.$message.error(res.msg);
                        }
                    });
                }).catch(function () {
                    _this.$message({
                        showClose: true,
                        message: '已取消删除',
                    });
                });
            },

            //     提交按钮  区分新增 修改

            //     动态 年years列标  今年前后十年
            change() {
                this.init(1);
            },
            getYearList() {
                var that = this;
                var myDate = new Date();
                that.year = myDate.getFullYear();
                var startYear = myDate.getFullYear() - 10;
                var endYear = myDate.getFullYear() +1;
                for (var i = startYear; i <= endYear; i++) {
                    var option = new Option();
                    that.$set(option, 'label', i)
                    that.$set(option, 'value', i)
                    that.years.push(option);
                }
            },
            //获得选中状态
            selectionChange: function (val) {
                this.deleteList = val;
            },
            //分页回调
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
            openView: function () {
                var _this = this;
                _this.dialogFormVisible = true;
            },

            /*关闭新增页、编辑页*/
            closeDia: function () {
                this.$refs.editForm.resetFields();
                this.dialogFormVisible = false;

                this.editForm.id = '';
                this.editForm.planCode = '';
                this.editForm.planName = '';
                this.editForm.department = '';
                this.editForm.fileName = '';
                this.editForm.status = '';
                this.editForm.planDigest = '';
                this.editForm.year = '';
                this.editForm.month = '';
                this.editForm.day = '';
                this.editForm.warningLevel = '';
                this.editForm.files = '' ;
                this.init(1);
            }
        }
    }
</script>

<style scoped>

</style>