
<template>
    <div class="main-con">

        <!--<div class="panel-default">-->
            <!--<div class="panel-hd text-blger">-->
            <!--<div class="panel-tit">一源一档</div>-->
            <!--</div>-->
        <!--</div>-->

        <div class="panel-default">
            <div class="panel-bd pd-lg">
                <div class="filter-box">
                    <el-form :inline="true"  class="demo-form-inline">
                        <el-form-item class="filter-label" label="管理级别">
                            <el-select v-model="level" placeholder="请选择">
                                <el-option
                                        v-for="item in levelList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="企业污染源类型" style="margin-bottom: 0px">
                            <el-select v-model="code" placeholder="请选择">
                                <el-option
                                        v-for="item in codeList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="污染源名称" style="margin-bottom: 0px">
                            <el-input v-model="eName" placeholder="请输入内容"></el-input>
                        </el-form-item>
                        <el-form-item label="是否在线监听" style="margin-bottom: 0px">
                            <el-select v-model="status" placeholder="请选择">
                                <el-option
                                        v-for="item in statusList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item style="margin-bottom: 0px;width: 140px">
                            <el-button type="primary" icon="search" style="width: 140px"  @click="initQuery">查询</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>


            <el-table :data="tableData" class="table-default01 table-lg" ref="multipleTable"  height="730px" stripe="true">
                <el-table-column type="index"  label="序号" align="center" width="70px" >
                </el-table-column>
                <el-table-column  label="企业污染源名称" align="center">
                <template slot-scope="scope">
                    <el-link type="primary" @click="click(scope.$index, scope.row)">{{scope.row.eName}}</el-link>
                </template>
                </el-table-column>
                <el-table-column prop="typeName" label="污染源类型" align="center">
                </el-table-column>
                <el-table-column prop="legalPerson" label="法人代表" align="center">
                </el-table-column>
                <el-table-column prop="businessAddress" label="地址" align="center">
                </el-table-column>
                <el-table-column prop="catName" label="所属行业" align="center">
                </el-table-column>
                <el-table-column prop="creditCode" label="社会信用代码" align="center">
                </el-table-column>
                <el-table-column prop="contacts" label="联系人" align="center">
                </el-table-column>
                <el-table-column prop="iphone" label="联系电话" align="center">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import pagination from '../../common/unit/Pagination';
    export default {
        components: {
            pagination
        },
        name: "EnterpriseArchives",
        data:function(){
            var _this=this;


            return{
                level:'',
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
                        label:"国控",
                        value:"1"
                    },
                    {
                        label:"省控",
                        value:"2"
                    },
                    {
                        label:"市控",
                        value:"3"
                    },
                    {
                        label:"区县控",
                        value:"4"
                    },
                    {
                        label:"非控",
                        value:"5"
                    },
                    {
                        label:"其他",
                        value:"6"
                    },
                ],
                codeList:[],
                statusList:[
                    {
                      label:"全部",
                      value:"",
                    },
                    {
                        label:"离线",
                        value:"0",
                    },
                    {
                        label:"在线",
                        value:"1",
                    },
                ],

            }
        },
        mounted:function(){
            this.initQuery();
            this.codeLists()
        },
        methods: {

            click(index, row){
                this.$router.push({path: '/entArchivesDetil', query: {id: row.id}});
            },
            //初始化查询
            initQuery() {
                let that = this;
                var url = '/aircontrol/airassess/tCodInformation/archivesForOneEntList';
                that.$axios.get(url,{params:{
                        "level":that.level,
                        "code":that.code,
                        "eName":that.eName,
                        "status":that.status,
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
                var url = '/aircontrol/airassess/tCodInformation/entSelectOfType';
                that.$axios.get(url,{params:{ }}).then(
                    function (res) {
                        if(res.code == 0){
                            that.codeList = res.data;
                        }else {
                            that.codeList = [] ;
                        }
                    }
                )
            },
        }
    }
</script>

<style scoped>

</style>


