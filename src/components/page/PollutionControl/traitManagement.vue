<template>
    <div class="main-con">
        <div class="panel-default">
            <div class="panel-bd pd-lg">
                <div class="filter-box">
                    <el-form :inline="true"  class="demo-form-inline">
                        <el-form-item class="filter-label" label="主要污染指标">
                            <el-select v-model="pollutantCode" placeholder="请选择">
                                <el-option
                                        v-for="item in pollutantList"
                                        :key="item.val"
                                        :label="item.label"
                                        :value="item.val">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="所属行业" style="margin-bottom: 0px">
                            <el-select v-model="code" placeholder="请选择">
                                <el-option
                                        v-for="item in codeList"
                                        :key="item.code"
                                        :label="item.name"
                                        :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="是否重点污染源" style="margin-bottom: 0px">
                            <el-select v-model="mage" placeholder="请选择">
                                <el-option
                                        v-for="item in statusList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item style="margin-bottom: 0px;">
                            <el-button type="primary" icon="search" style="width: 140px"  @click="initQuery">查询</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>


            <el-table :data="tableData" class="table-default01 table-lg" ref="multipleTable"  height="730px" stripe="true">
                <el-table-column type="index"  label="序号" align="center" width="70px" >
                </el-table-column>
                <!--<el-table-column  label="污染源名称" align="center">
                    <template slot-scope="scope">
                        <el-link type="primary" @click="click(scope.$index, scope.row)">{{scope.row.eName}}</el-link>
                    </template>
                </el-table-column>-->
                <el-table-column prop="eName" label="污染源名称" align="center" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="pollutantName" label="主要影响指标" align="center" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="cateName" label="所属行业" align="center" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="mage" label="是否重点污染源" align="center" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="address" label="地址" align="center" :show-overflow-tooltip="true">
                </el-table-column>

                <el-table-column align="center" label="操作" >
                    <template slot-scope="scope">
                        <a @click="showDetail(scope.row)" class="color-other" href="javascript:;" style="font-size:14px">设置</a>
                    </template>
                </el-table-column>

            </el-table>

            <el-dialog :visible.sync="dialogFormVisible" @close="closeDia" width="0px" style="margin-top: 305px"
                       :modal-append-to-body="false"
                       :close-on-click-modal="false">
                <div class="modal" style="display: block;width:400px;height: 365px ">
                    <div  class="modal-close" title="关闭" @click="dialogFormVisible=false"><i class="icon icon-close"></i></div>
                    <div class="modal-hd" >
                        <div class="modal-tit">特征管理设置</div>
                        <div class="form-box" element-loading-text="拼命加载中" :rules="rules">
                            <el-form ref="editForm" :model="editForm" label-width="160px" :rules="rules" >
                                <tr >
                                    <td>
                                        <el-form-item label="污染源名称：" prop="year" >
                                            {{editForm.eName}}
                                        </el-form-item>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <el-form-item label="主要影响指标：" prop="year" >
                                            <el-select v-model="editForm.pollutantCode" placeholder="请选择" multiple collapse-tags style="width: 180px"
                                                       @change="change">
                                                <el-option
                                                        v-for="item in pollutantList2"
                                                        :key="item.val"
                                                        :label="item.label"
                                                        :value="item.val">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <el-form-item label="所属行业：" prop="year" >
                                            <el-select v-model="editForm.code" placeholder="请选择" style="width: 180px"
                                                       @change="change">
                                                <el-option
                                                        v-for="item in codeList2"
                                                        :key="item.code"
                                                        :label="item.name"
                                                        :value="item.code">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <el-form-item label="是否重点污染源：" prop="year" >
                                            <el-select v-model="editForm.mage" placeholder="请选择" style="width: 180px"
                                                       @change="change">
                                                <el-option
                                                        v-for="item in statusList2"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </td>
                                </tr>


                                <div style="text-align: center">
                                    <span class="dialog-footer">
                                        <el-button class="el-button el-button--default" size="small" @click="dialogFormVisible=false">取消</el-button>
                                        <el-button class="el-button el-button--default" size="small" @click="submit">保存</el-button>
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
    export default {
        name: "traitManagement",
        data:function(){
            var _this=this;


            return{
                editForm:{
                    id:'',
                    pollutantCode:'',
                    mage:'',
                    code:'',
                    eName:'',
                },
                dialogFormVisible:false,
                code:'',
                eName:'',
                status:'',
                tableData:[],
                levelList:[
                    /* 1:国控  2:省控  3:市控  4:区县控  5:非控  6:其他*/
                    {
                        label:"全部",
                        value:""
                    },
                    {
                        label:"SO₂",
                        value:"1"
                    },
                    {
                        label:"NO₂",
                        value:"2"
                    },
                    {
                        label:"CO",
                        value:"3"
                    },
                    {
                        label:"PM2.5",
                        value:"4"
                    },
                    {
                        label:"PM10",
                        value:"5"
                    },
                    {
                        label:"其他",
                        value:"6"
                    },
                ],
                codeList:[],
                codeList2:[],
                pollutantList:[],
                pollutantList2:[],
                statusList:[
                    {
                        label:"全部",
                        value:"",
                    },
                    {
                        label:"非重点",
                        value:"0",
                    },
                    {
                        label:"重点",
                        value:"1",
                    },
                ],
                statusList2:[
                    {
                        label:"非重点",
                        value:"0",
                    },
                    {
                        label:"重点",
                        value:"1",
                    },
                ],
                pollutantCode:"",
                mage:"",
                cateCode:"",

            }
        },
        mounted:function(){
            this.initQuery();
            this.codeLists();
            this.codeLists2();
            this.pollutantLists();
            this.pollutantLists2();
        },
        methods: {
            change(){

            },
            showDetail(row){
                this.editForm.eName = row.eName
                this.editForm.id = row.id;
                this.editForm.mage = row.mageCode;
                this.editForm.code = row.code;
                this.editForm.pollutantCode = row.pollutantCode != null && row.pollutantCode !='' ? row.pollutantCode.split(','): ''
                this.dialogFormVisible = true ;
            },
            closeDia(){
                this.dialogFormVisible = false ;
            },

            //初始化查询
            initQuery() {
                let that = this;
                var url = '/aircontrol/airassess/tCodInformation/traitManagementQuer';
                that.$axios.get(url,{params:{

                        "pollutantCode":that.pollutantCode,
                        "mage":that.mage,
                        "cateCode":that.code
                    }}).then(
                    function (res) {
                        if(res.code == 0){
                            that.tableData = res.data;
                        }else {
                            that.tableData = [] ;
                        }
                    }
                )
            },

            codeLists() {
                let that = this;
                var url = '/aircontrol/airassess/tCodInformation/cateList';
                that.$axios.get(url,{params:{ }}).then(
                    function (res) {
                        if(res.code == 0){
                            that.codeList = res.data;
                            that.codeList.splice(0,0,{'code':null,"name":"全部"})
                            that.codeList2 = res.data;
                        }else {
                            that.codeList = [] ;
                        }
                    }
                )
            },
            codeLists2() {
                let that = this;
                var url = '/aircontrol/airassess/tCodInformation/cateList';
                that.$axios.get(url,{params:{ }}).then(
                    function (res) {
                        if(res.code == 0){
                            that.codeList2 = res.data;
                        }else {
                            that.codeList = [] ;
                        }
                    }
                )
            },

            pollutantLists() {
                let that = this;
                var url = '/aircontrol/airassess/tCodInformation/pollutantList';
                that.$axios.get(url,{params:{ }}).then(
                    function (res) {
                        if(res.code == 0){
                            that.pollutantList = res.data;
                            that.pollutantList.splice(0,0,{'val':null,"label":"全部"})
                            that.pollutantList2 = res.data;
                        }else {
                            that.pollutantList = [] ;
                        }
                    }
                )
            },
            pollutantLists2() {
                let that = this;
                var url = '/aircontrol/airassess/tCodInformation/pollutantList';
                that.$axios.get(url,{params:{ }}).then(
                    function (res) {
                        if(res.code == 0){
                            that.pollutantList2 = res.data;
                        }else {
                            that.pollutantList = [] ;
                        }
                    }
                )
            },

            submit(){
                let that = this;
                var url = '/aircontrol/airassess/tCodInformation/updateMag';
                that.$axios.get(url,{params:{
                        "id":that.editForm.id,
                        "mage":that.editForm.mage,
                        "code":that.editForm.code,
                        "pollutantCode":that.editForm.pollutantCode+'',
                    }}).then(
                    function (res) {
                        if(res.code == 0){
                            that.$message({
                                message: '设置成功',
                                type: 'success'
                            });
                            that.dialogFormVisible=false
                            that.initQuery();
                        }else {
                            that.$message('设置失败');
                            that.dialogFormVisible=false
                            that.initQuery();
                        }
                    }
                )
            },
        }
    }
</script>

<style scoped>

</style>