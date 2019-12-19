<template>
    <div class="main-con">

        <div class="panel-default">
            <div class="panel-bd pd-lg">
                <div class="filter-box">

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
                          <!--  <el-button type="primary" icon="search" size="small" @click="init(1)">查询</el-button>
                            <el-button type="primary" size="small" @click="openView('')" icon="el-icon-plus">新增 </el-button>-->

                            <button @click="init(1)" class="el-button el-button--primary" style="width: 120px;" type="button"><span>查询</span></button>
                            <button @click="openView('')" class="el-button el-button--primary" style="width: 120px;" type="button"><span>新增</span></button>

                            <!-- <el-button type="danger"  size="small" @click="deleteS()" icon="el-icon-delete">批量删除</el-button>-->
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        </div>

        <el-table :data="tableData"   style="background-color: #202a42 " ref="multipleTable"
                  @selection-change="selectionChange" stripe="true" class="table-default01 table-lg" >

           <!-- <el-table-column v-model="deleteList"
                             type="selection"
                             width="55">
            </el-table-column>-->
            <el-table-column type="index"  label="序号" align="center" width="70px" :index="getIndex">
            </el-table-column>
            <el-table-column prop="enterpriseName" label="企业名称" align="center">
            </el-table-column>
            <el-table-column prop="area" label="所属区域" align="center">
            </el-table-column>

            <el-table-column prop="levelRed" label="红色预警-限停产措施" align="center">
            </el-table-column>
            <el-table-column prop="lossRed" label="经济损失预估" align="center">
            </el-table-column>
            <el-table-column prop="fileNameRed" label="附件" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.fileNameRed!=null" @click="down(scope.row.fileNameRed)"> <a id="hre">附件下载</a></span>
                </template>
            </el-table-column>

            <el-table-column prop="levelOrg" label="橙色预警-限停产措施" align="center">
            </el-table-column>
            <el-table-column prop="lossOrg" label="经济损失预估" align="center">
            </el-table-column>
            <el-table-column prop="fileNameOrg" label="附件" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.fileNameOrg!=null" @click="down(scope.row.fileNameOrg)"> <a id="hre">附件下载</a></span>
                </template>
            </el-table-column>

            <el-table-column prop="levelYellow" label="黄色预警-限停产措施" align="center">
            </el-table-column>
            <el-table-column prop="lossYellow" label="经济损失预估" align="center">
            </el-table-column>
            <el-table-column prop="fileNameYellow" label="附件" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.fileNameYellow!=null" @click="down(scope.row.fileNameYellow)"> <a id="hre">附件下载</a></span>
                </template>
            </el-table-column>
            <el-table-column prop="pm10AvgValue" label="操作" align="center">
                <template slot-scope="scope">

                    <a  class="color-other" href="javascript:;"   @click="updateView(scope.row.id,true) "  >编辑</a>
                    <a  class="color-other" href="javascript:;"   @click="deleteData(scope.row.id,true)" >删除</a>
                </template>
            </el-table-column>
        </el-table>
        <pagination ref="paginationObj" @handleCurrentChange="handleCurrentChange" @paginationFunction="paginationFunction"></pagination>

        <!--      弹窗          弹窗           弹窗           弹窗       弹窗          -->
        <el-dialog  :visible.sync="dialogFormVisible" @close="closeDia" width="950px"
                    :modal-append-to-body="false"
                    :close-on-click-modal="false">
            <div class="modal" style="display: block;margin-top: 255px;width:1070px;height: 690px;padding-left: 25px">
                <div  class="modal-close" title="关闭" @click="dialogFormVisible=false"><i class="icon icon-close"></i></div>
                <div class="modal-hd">
                    <div class="modal-tit"></div>
            <div class="form-box" element-loading-text="拼命加载中" :rules="rules">
                <el-form ref="editForm" :model="editForm" label-width="150px" :rules="rules">
                    <tr>
                        <td style="width: 400px">
                            <el-form-item label="选择年份：" prop="year" class="is-required">
                                <el-select v-model="editForm.year" placeholder="请选择年" style="width: 130px" @change="change">
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
                            <el-form-item label="企业名称：" prop="enterpriseName" >
                                <el-input v-model="editForm.enterpriseName" style="width: 200px"></el-input>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label="减排清单编码：" prop="emissionCode" >
                                <el-input v-model="editForm.emissionCode" style="width: 200px"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-form-item label="所属区域：" prop="area" >
                                <el-select v-model="editForm.area" style="width: 200px">
                                    <el-option
                                            v-for="item in regionArray"
                                            :key="item.regionCode"
                                            :label="item.regionName"
                                            :value="item.regionCode">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td><!--UnitList-->
                            <el-form-item label="编制部门：" prop="department" >

                                <el-select v-model="editForm.department" style="width: 200px">
                                    <el-option
                                            v-for="item in UnitList"
                                            :key="item.unitId"
                                            :label="item.unitName"
                                            :value="item.unitId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-form-item label="减排内容：" prop="detail" >
                                <el-input v-model="editForm.detail" style="width: 200px"></el-input>
                            </el-form-item>
                        </td>
                        <td>
                        <el-form-item label="处理状态：" prop="state" >
                                <el-input v-model="editForm.state" style="width: 200px"></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-form-item label="限停产措施（红）：" prop="levelRed" >
                                <el-input v-model="editForm.levelRed" style="width: 200px"></el-input>
                            </el-form-item>

                        </td>
                        <td>
                            <el-form-item label="经济损失预估（红）：" prop="lossRed" >
                                <el-input v-model="editForm.lossRed" style="width: 200px"></el-input>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item  label="上传附件"  prop="fileNameRed">
                                <el-upload
                                        class="upload-demo"
                                        action="/bas/base/imageController/uploadFile"
                                        :on-success="onSuccessRed">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                </el-upload>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-form-item label="限停产措施（橙）：" prop="levelOrg" >
                                <el-input v-model="editForm.levelOrg" style="width: 200px"></el-input>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label="经济损失预估（橙）：" prop="lossOrg" >
                                <el-input v-model="editForm.lossOrg" style="width: 200px"></el-input>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item  label="上传附件"  prop="fileNameOrg">
                                <el-upload
                                        class="upload-demo"
                                        action="/bas/base/imageController/uploadFile"
                                        :on-success="onSuccessOrg">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                </el-upload>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-form-item label="限停产措施（黄）：" prop="levelYellow" >
                                <el-input v-model="editForm.levelYellow" style="width: 200px"></el-input>
                            </el-form-item>

                        </td>
                        <td>
                            <el-form-item label="经济损失预估（黄）：" prop="lossYellow" >
                                <el-input v-model="editForm.lossYellow" style="width: 200px"></el-input>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item  label="上传附件"  prop="fileNameYellow">
                                <el-upload
                                        class="upload-demo"
                                        action="/bas/base/imageController/uploadFile"
                                        :on-success="onSuccessYellow">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                </el-upload>
                            </el-form-item>
                        </td>
                    </tr>
                    <div style="text-align: center">
                            <span class="dialog-footer" >
                                    <el-button class="el-button el-button--default" size="small" @click="dialogFormVisible=false">取消</el-button>
                                    <el-button class="el-button el-button--primary" size="small" @click="submitForm('editForm')">提交</el-button>
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
        name: "emissionsList",
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
                editForm:{
                    id:"",
                    levelYellow:"",
                    lossYellow:"",
                    lossOrg:"",
                    levelOrg:"",
                    lossRed:"",
                    levelRed:"",
                    area:"",
                    emissionCode:"",
                    enterpriseName:"",
                    department:"",
                    year:"",
                    detail:"",
                    state:"",
                    fileNameRed:"",
                    fileNameOrg:"",
                    fileNameYellow:"",
                },
                functionalList:[
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
                    enterpriseName: [
                        { required: true, message: '请指定企业', trigger: 'blur' }
                    ],
                    emissionCode: [
                        { required: true, message: '请输入减排清单名称', trigger: 'blur' }
                    ],
                    enterpriseName: [
                        { required: true, message: '请输入减排清单编码', trigger: 'blur' }
                    ],
                    department: [
                        { required: true, message: '请指定编制部门', trigger: 'blur' }
                    ],
                    year: [
                        { required: true, message: '请指定时间', trigger: 'blur' }
                    ],
                    area: [
                        { required: true, message: '请指定区域', trigger: 'blur' }
                    ],
                },
                regionArray:[],
                UnitList:[],
            }
        },
        mounted(){
            this.getYearList();
            this.getRegionS();
            this.getRegionX()
            this.init(1)
        },
        methods:{

            init(val) {
                var that =this;
                var that = this;
                if (val == 1) {
                    that.$refs.paginationObj.cur_page = 1;
                } else {
                    that.$refs.paginationObj.cur_page = val
                }
                var url = '/aircontrol/airassess/codHeavyEmission/getEmissionList';
                that.$axios.get(url,{params:{
                        "pageNum": that.$refs.paginationObj.cur_page,
                        "pageSize": that.$refs.paginationObj.cur_pageSize,
                        "year":that.year,
                        "str":that.str
                    }}).then(
                    function (res) {
                        that.$refs.paginationObj.count = res.data.total;
                        if(res.code == 0){
                            that.tableData = res.data.records;
                        }
                    }
                )
            },
            onSuccessRed(response,file,fileList){
                if(response.code == 0){
                    this.editForm.fileNameRed = response.data.fileUrl;
                    this.$message({ message:"上传成功", type:'success' });
                    return true;
                }else{
                    this.$message({ message:res.msg, type:'error' });
                    return false;
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

            getRegionX(){
                let _this=this;
                _this.$axios.get('/bas/base/external/regionUnitList').then(function (res) {
                    if( res.code == 0){
                        _this.UnitList=res.data;
                        _this.UnitList.splice(0,0,{'unitId':null,"unitName":"全部"})
                    }
                })
            },


            onSuccessOrg(response,file,fileList){
                if(response.code == 0){
                    this.editForm.fileNameOrg = response.data.fileUrl;
                    this.$message({ message:"上传成功", type:'success' });
                    return true;
                }else{
                    this.$message({ message:res.msg, type:'error' });
                    return false;
                }
            },

            onSuccessYellow(response,file,fileList){
                if(response.code == 0){
                    this.editForm.fileNameYellow = response.data.fileUrl;
                    this.$message({ message:"上传成功", type:'success' });
                    return true;
                }else{
                    this.$message({ message:res.msg, type:'error' });
                    return false;
                }
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

            submitForm:function(editForm) {
                //debugger
                console.log("按钮进入选择提交与修改"+this.editForm);
                let  _this = this;
                console.info(_this.editForm.id);
                if (_this.editForm.id=="") {
                    console.log("即将进行新增");
                    this.insertService(editForm)
                } else {
                    console.log("编辑");
                    this.updateService(editForm)
                }
            },

            //数据新增操作，并更新页面
            insertService:function(editForm) {
                var  _this = this;
                _this.$refs[editForm].validate(function(valid) {
                    if (valid) {
                        console.info("进行了新增的请求");
                        var url = '/aircontrol/airassess/codHeavyEmission/addEmissionById';
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
            //数据更新操作，并更新页面
            updateService:function(editForm) {
                var _this = this;
                _this.$refs[editForm].validate(function(valid) {
                    //debugger
                    if (valid) {
                        var url = '/aircontrol/airassess/codHeavyEmission/updateOneEmissionById';
                        _this.$axios.post(
                            url, _this.editForm
                        ).then(function (res) {
                            if (res.code == 0) {
                                _this.$message.success('修改成功！');
                                _this.dialogFormVisible = false;
                                _this.cur_page = 1;
                                _this.init(1);
                                // console.log(self.tableData);
                            }else {
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
            updateView:function(id){
                var that =this;
                var url = '/aircontrol/airassess/codHeavyEmission/getOneEmissionById';
                that.$axios.get(url,{params:{
                        "id":id,
                    }}).then(
                    function (res) {
                        if (res.code == 0) {
                            that.dialogFormVisible = true;
                            that.editForm.id=res.data.id;
                            that.editForm.levelYellow=res.data.levelYellow;
                            that.editForm.lossYellow=res.data.lossYellow;
                            that.editForm.lossOrg=res.data.lossOrg;
                            that.editForm.levelOrg=res.data.levelOrg;
                            that.editForm.lossRed=res.data.lossRed;
                            that.editForm.levelRed=res.data.levelRed;
                            that.editForm.area=res.data.area;
                            that.editForm.emissionCode=res.data.emissionCode;
                            that.editForm.enterpriseName=res.data.enterpriseName;
                            that.editForm.department=res.data.department;
                            that.editForm.year=res.data.year;
                            that.editForm.detail=res.data.detail;
                            that.editForm.state=res.data.state;
                            that.editForm.fileNameRed=res.data.fileNameRed;
                            that.editForm.fileNameOrg=res.data.fileNameOrg;
                            that.editForm.fileNameYellow=res.data.fileNameYellow;


                        }else{
                            that.$message.error(res.msg);
                        }
                    }).catch(function (err) {
                    console.log(err);
                })
            },

            deleteData:function(id) {
                let _this=this;
                _this.$confirm('此操作将删除该因子信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function()  {
                    var params = new URLSearchParams();
                    params.append('id', id);
                    var url = '/aircontrol/airassess/codHeavyEmission/deleteOne';
                    _this.$axios.post(url, params).then(function(res){
                        console.log(res);
                        if (res.code == 0) {
                            _this.$message.success('删除成功！');
                            _this.$refs.paginationObj.cur_page= 1;
                            _this.init();
                        } else {
                            _this.$message.error(res.msg);
                        }
                    });
                }).catch(function()  {
                    _this.$message({
                        showClose: true,
                        message: '已取消删除',
                    });
                });
            },

            //     提交按钮  区分新增 修改

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
                this.dialogFormVisible=false;
                this.editForm.id='';
                this.editForm.levelYellow='';
                this.editForm.lossYellow='';
                this.editForm.lossOrg='';
                this.editForm.levelOrg='';
                this.editForm.lossRed='';
                this.editForm.levelRed='';
                this.editForm.area='';
                this.editForm.emissionCode='';
                this.editForm.enterpriseName='';
                this.editForm.department='';
                this.editForm.year='';
                this.editForm.detail='';
                this.editForm.state='';
                this.editForm.fileNameRed='';
                this.editForm.fileNameOrg='';
                this.editForm.fileNameYellow='';
                this.init(1);
            }
        }
    }
</script>

<style scoped>

</style>
