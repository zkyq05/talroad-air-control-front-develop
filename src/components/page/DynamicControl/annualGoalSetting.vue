<template>
    <!-- 主体 -->
    <div class="main-con">
        <div class="panel-default">
            <div class="panel-hd text-blger">
                <div class="panel-tit">新建控制方案</div>
            </div>
            <div class="panel-bd">
                <el-form ref="form" :model="form">
                <ul class="filter-box">
                    <li>
                        <div class="filter-con">
                            <div class="el-input el-input--medium el-input--bg el-input-group el-input-group--prepend" style="width: 500px;">
                                <div class="el-input-group__prepend">控制方案名称</div>
                                <input type="text" autocomplete="off" v-model="form.tartetName" placeholder="请输入控制方案名称" class="el-input__inner">
                                <!----><!----><!----><!----></div>
                        </div>
                        <div class="filter-con Oswald">
                            <div class="el-input el-input--medium el-input--bg el-input-group el-input-group--prepend" style="width: 500px;">
                                <div class="el-input-group__prepend">设定时间</div>
                                <el-date-picker
                                        style="width:360px"
                                        v-model="daytime"
                                        type="year"
                                        format="yyyy" value-format="yyyy"
                                        placeholder="选择年">
                                </el-date-picker>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="filter-con Oswald">
                            <div class="el-input el-input--medium el-input--bg el-input-group el-input-group--prepend" style="width: 500px;">
                                <div class="el-input-group__prepend">重污染天数</div>
                                <input  autocomplete="off" v-model="form.heavyDays" placeholder="请输入重污染天数" class="el-input__inner" >
                                <!----><!----><!----><!----></div>
                        </div>
                        <div class="filter-con Oswald">
                            <div class="el-input el-input--medium el-input--bg el-input-group el-input-group--prepend" style="width: 500px;">
                                <div class="el-input-group__prepend">优良天数</div>
                                <input  autocomplete="off" v-model="form.goodDays" placeholder="请输入优良天数" class="el-input__inner" >
                                <!----><!----><!----><!----></div>
                        </div>
                    </li>
                </ul>
                <ul class="filter-type mt-lg">
                    <li>
                        <div class="filter-name">综合指数</div>
                        <div class="filter-form">
                            <div class="el-input el-input--medium el-input--bg" style="width: 96px;">
                                <!----><input  autocomplete="off" placeholder="请输入" v-model="form.composite" class="el-input__inner">
                                <!----><!----><!----><!----></div>
                        </div>
                    </li>
                    <li>
                        <div class="filter-name">PM<span class="text-value">2.5</span></div>
                        <div class="filter-form">
                            <div class="el-input el-input--medium el-input--bg" style="width: 96px;"><!---->
                                <input  autocomplete="off" placeholder="请输入" v-model="form.pm25" class="el-input__inner">
                                <!----><!----><!----><!----></div>
                        </div>
                    </li>
                    <li>
                        <div class="filter-name">PM<span class="text-value">10</span></div>
                        <div class="filter-form">
                            <div class="el-input el-input--medium el-input--bg" style="width: 96px;">
                                <!----><input  autocomplete="off" v-model="form.pm10" placeholder="请输入" class="el-input__inner">
                                <!----><!----><!----><!----></div>
                        </div>
                    </li>
                    <li>
                        <div class="filter-name">NO<span class="text-value">2</span></div>
                        <div class="filter-form">
                            <div class="el-input el-input--medium el-input--bg" style="width: 96px;">
                                <!----><input  autocomplete="off" v-model="form.no2" placeholder="请输入" class="el-input__inner">
                                <!----><!----><!----><!----></div>
                        </div>
                    </li>
                    <li>
                        <div class="filter-name">SO<span class="text-value">2</span></div>
                        <div class="filter-form">
                            <div class="el-input el-input--medium el-input--bg" style="width: 96px;">
                                <!----><input  autocomplete="off" v-model="form.so2" placeholder="请输入" class="el-input__inner">
                                <!----><!----><!----><!----></div>
                        </div>
                    </li>
                    <li>
                        <div class="filter-name">CO</div>
                        <div class="filter-form">
                            <div class="el-input el-input--medium el-input--bg" style="width: 96px;">
                                <!----><input  autocomplete="off" v-model="form.co" placeholder="请输入" class="el-input__inner">
                                <!----><!----><!----><!----></div>
                        </div>
                    </li>
                    <li>
                        <div class="filter-name">O<span class="text-value">3</span></div>
                        <div class="filter-form">
                            <div class="el-input el-input--medium el-input--bg" style="width: 96px;">
                                <!----><input  autocomplete="off" v-model="form.o3" placeholder="请输入" class="el-input__inner">
                                <!----><!----><!----><!----></div>
                        </div>
                    </li>
                </ul>
                <div class="mt-lger">
                    <button type="button" class="el-button el-button--default" @click="addControlPlan()" style="width: 136px;">
                        <!----><!----><span>保存</span></button>
                    <button type="button" class="el-button el-button--default" @click="emptyPlan()" style="width: 136px;">
                        <!----><!----><span>清空</span></button>
                </div>
                </el-form>
            </div>
        </div>
        <div class="panel-default mt-lg">
            <div class="panel-hd text-blger">
                <h2 class="panel-tit">现有控制方案</h2>
            </div>
            <!--<table class="table-default01 table-lg">
                <thead>
                <tr>
                    <th>序号</th>
                    <th>控制方案名称</th>
                    <th>所属区域</th>
                    <th>综合指数</th>
                    <th>PM<span class="text-value">2.5</span></th>
                    <th>PM<span class="text-value">10</span></th>
                    <th>NO<span class="text-value">2</span></th>
                    <th>SO<span class="text-value">2</span></th>
                    <th>CO</th>
                    <th>O<span class="text-value">3</span></th>
                    <th>优良天数</th>
                    <th>重污染天数</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>111</td>
                    <td>控制方案方案一</td>
                    <td>唐山市唐山区唐山镇</td>
                    <td class="Oswald color-other">50</td>
                    <td class="Oswald">50</td>
                    <td class="Oswald">50</td>
                    <td class="Oswald">29</td>
                    <td class="Oswald">120</td>
                    <td class="Oswald">40</td>
                    <td class="Oswald">50</td>
                    <td class="Oswald color-level1">50</td>
                    <td class="Oswald color-level2">50</td>
                    <td>
                        <a href="javascript:;" class="icon icon-shanchu"></a>
                        <a href="javascript:;" class="icon icon-bianji ml"></a>
                    </td>
                </tr>
                </tbody>
            </table>-->
        </div>
        <div style="margin-top: 30px">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column
                        type="index"
                        width="70px" label="序号" :index="getIndex" align="center">
                </el-table-column>
                <el-table-column prop="tartetName" show-overflow-tooltip label="控制方案名称" width="110" align="center"></el-table-column>
                <el-table-column prop="areaName" show-overflow-tooltip label="所属区域" width="100" align="center" ></el-table-column>
                <el-table-column prop="composite"  label="综合指数" align="center"></el-table-column>
                <el-table-column prop="pm25"  label="PM2.5" width="70" align="center"></el-table-column>
                <el-table-column prop="pm10"  label="PM10" width="70" align="center"></el-table-column>
                <el-table-column prop="no2"  label="NO2" width="70" align="center"></el-table-column>
                <el-table-column prop="so2"  label="SO2" width="70" align="center"></el-table-column>
                <el-table-column prop="co"  label="CO" width="70" align="center"></el-table-column>
                <el-table-column prop="o3"  label="O3" width="70" align="center"></el-table-column>
                <el-table-column prop="goodDays"  label="优良天数" align="center"></el-table-column>
                <el-table-column prop="heavyDays"  label="重污染天数" align="center"></el-table-column>
                <el-table-column  label="操作"  align="center">
                    <template slot-scope="scope">
                        <span @click="delPlan(scope.row)"> <a id="hre">删除</a></span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import pagination from '../../common/unit/Pagination'
    export default {
        name: "annualGoalSetting",
        components:{
            pagination
        },
        data:function () {
            return{
                daytime:new Date().format("yyyy"),
                tableData:[

                ],
                form:{
                    tartetName:'',
                    areaCode:this.AppConfig.appInfo.regionCode,
                    areaName:this.AppConfig.appInfo.regionName,
                    composite:0,//综合指数
                    pm25:0,
                    pm10:0,
                    enable:2,
                    no2:0,
                    so2:0,
                    co:0,
                    o3:0,
                    goodDays:0,
                    heavyDays:0
                }
            }
        },
        mounted:function(){
            // 初始化
            this.initPage();
        },
        methods:{
            addControlPlan(){
                var _this = this;
                var param=new URLSearchParams();
                param.append("areaCode", parseInt(_this.form.areaCode));
                param.append("co", parseInt(_this.form.co));
                param.append("composite", parseInt(_this.form.composite));
                param.append("enable", parseInt(_this.form.enable));
                param.append("goodDays", parseInt(_this.form.goodDays));
                param.append("heavyDays", parseInt(_this.form.heavyDays));
                param.append("no2", parseInt(_this.form.no2));
                param.append("o3", parseInt(_this.form.o3));
                param.append("pm10", parseInt(_this.form.pm10));
                param.append("pm25", parseInt(_this.form.pm25));
                param.append("so2", parseInt(_this.form.so2));
                param.append("tartetName", _this.form.tartetName);
                param.append("startTime", new Date(_this.daytime+"-01-01 00:00:00"));
                param.append("endTime", new Date(_this.daytime+"-12-31 23:59:59"));
                var url = '/aircontrol/airdiagnosis/api/basTarget/add';
                _this.$axios.post(url, param
                ).then(function (res) {
                    _this.$message.success('提交成功！');
                    _this.emptyPlan();
                    _this.initPage();
                }).catch(function (err) {
                    console.log(err);
                    // self.message = "连接服务器失败！"
                    _this.$message.error("提交失败！");
                });
            },
            emptyPlan(){
                var _this = this;
                _this.daytime=new Date().format("yyyy");
                _this.form.tartetName='';
                _this.form.areaName='';
                _this.form.composite=0;//综合指数
                _this.form.pm25=0;
                _this.form.pm10=0;
                _this.form.no2=0;
                _this.form.so2=0;
                _this.form.co=0;
                _this.form.o3=0;
                _this.form.goodDays=0;
                _this.form.heavyDays=0;
            },
            delPlan(row){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    customClass:'message-logout',
                    type: 'warning'
                }).then(() => {
                    var _this = this;
                    var url = '/aircontrol/airdiagnosis/api/basTarget/deleteyear';
                    _this.$axios.get(url,{params:{
                                "id":row.id
                    }}
                    ).then(function (res) {
                        _this.$message.success('删除成功');
                       // _this.$refs.paginationObj.cur_page = 1;
                        _this.initPage();
                    }).catch(function (err) {
                        console.log(err);
                        // self.message = "连接服务器失败！"
                        _this.$message.error("删除失败！");
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            getIndex:function(index) {
                var _this=this;
                let curPage = 1;
                let limitPage = 100000;
                return (index+1) + (curPage - 1) * limitPage;
            },
            initPage: function () {
                var _this = this;
                var self = this;
                this.$axios.get(
                    '/aircontrol/airdiagnosis/api/basTarget/yearlist'
                ).then(function (res) {
                    self.tableData = res;
                })
            }
        }
    }
</script>

<style >
    .message-logout{
        background: #0e1f32;
        border: 1px solid #4BABF5;
    }
</style>
