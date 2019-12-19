<template>
    <div class="main-con">
        <div class="panel-default">
            <div class="panel-bd pd-lg">
                <div class="filter-box">
                    <el-form :inline="true" class="demo-form-inline">
                        <div class="block" style="float: left;margin-left: 30px">
                            <span class="demonstration">年</span>
                            <template>
                                <el-select v-model="year" placeholder="请选择" style="width: 100px" @change="change">
                                    <el-option
                                            v-for="item in years"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </div>

                        <div class="block" style="float: left;margin-left: 30px">
                            <span class="demonstration">污染物</span>
                            <template>
                                <el-select v-model="pollutant" placeholder="请选择" style="width: 100px" @change="change">
                                    <el-option
                                            v-for="item in pollutantList"
                                            :key="item.pollutantCode"
                                            :label="item.pollutantName"
                                            :value="item.pollutantCode">
                                    </el-option>
                                </el-select>
                            </template>
                        </div>


                        <el-form-item label="污染源名称" style="margin-left: 20px">
                            <el-input v-model="eName" placeholder="请输入内容"></el-input>
                        </el-form-item>
                        <div class="block" style="float: left;margin-left: 30px">
                            <span class="demonstration">区域</span>
                            <template>
                                <el-select v-model="regis" placeholder="请选择" style="width: 100px" @change="change">
                                    <el-option
                                            v-for="item in regisList"
                                            :key="item.regionCode"
                                            :label="item.regionName"
                                            :value="item.regionCode">
                                    </el-option>
                                </el-select>
                            </template>
                        </div>


                        <el-form-item style="margin-bottom: 0px">
                            <el-button type="primary" icon="search" style="width: 140px" @click="initQuery">查询</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>


        <el-table :data="tableData" class="table-default01 table-lg" ref="multipleTable" height="650px"
                style="background-color: #202a42" stripe="true">
            <el-table-column type="index" label="序号" align="center" width="70px">
            </el-table-column>
            <el-table-column prop="eName" label="企业名称" align="center">
            </el-table-column>
            <el-table-column prop="catName" label="行业类别" align="center">
            </el-table-column>
            <el-table-column prop="regionName" label="区域" align="center">
            </el-table-column>
            <el-table-column prop="creditCode" label="社会统一信息代码" align="center">
            </el-table-column>
            <el-table-column prop="scale" label="企业规模" align="center" :formatter="statusFormat">
            </el-table-column>
            <el-table-column prop="pollOutOne" label="排放量（万吨）" align="center">
            </el-table-column>
            <el-table-column prop="formatNum" label="占比" align="center">
            </el-table-column>
        </el-table>

        <table style="background-color:#1b2336;color: #ffffff;width: 100%">
            <tr style="text-align: center;width: 100%;line-height: 80px">
                <td style="width: 335px">合计</td>
                <td style="width: 700px"></td>
                <td style="width: 200px">{{tableData2.sumOne}}</td>
                <td style="width: 200px">{{tableData2.sumAll}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: "EntOutStatistical",
        data: function () {
            var _this = this;
            return {
                year: "",
                pollutant: "a21026",
                pollutantName: "",
                eName: "",
                regis: "",
                years: [],
                year: "",
                pollu: "",
                pollutantList: [],
                regisList:[],
                tableData: [],
                tableData2: [],
                scaleList: [
                    {
                        label: "特大型企业",
                        value: "1",
                    },
                    {
                        label: "大型一档",
                        value: "2",
                    },
                    {
                        label: "大型二档",
                        value: "3",
                    },
                    {
                        label: "中型一档",
                        value: "4",
                    },
                    {
                        label: "中型二档",
                        value: "5",
                    },
                    {
                        label: "小型",
                        value: "6",
                    },
                    {
                        label: "其他",
                        value: "7",
                    },
                ]
            }
        },
        mounted: function () {
            this.initQuery();
            this.getYearList();
            this.initPolluTant();
            this.regisLis();
        },
        methods: {
            //初始化查询
            change() {
                this.initQuery();
            },
            initQuery() {
                let that = this;
                var url = '/aircontrol/airassess/tCodInformation/entOutCount';
                that.$axios.get(url, {
                    params: {
                        "year": that.year,
                        "pollutant": that.pollutant,
                        "eName": that.eName,
                        "regis": that.regis,
                    }
                }).then(
                    function (res) {
                        if (res.code == 0) {
                            that.tableData = res.data.data;
                            that.tableData2 = res.data;
                        } else {
                            that.tableData = [];
                            that.tableData2 = [];
                        }
                    }
                )
            },
            initPolluTant() {
                let that = this;
                var url = '/aircontrol/airassess/tCodInformation/getAllPollutant';
                that.$axios.get(url, {
                    params: {}
                }).then(
                    function (res) {
                        if (res.code == 0) {
                            that.pollutantList = res.data;
                        } else {
                            that.pollutantList = [];
                        }
                    }
                )
            },


            regisLis(){
                let that = this;
                var url = 'bas/base/external/regionLever';
                that.$axios.get(url, {
                    params: {}
                }).then(
                    function (res) {
                        if (res.code == 0) {
                            that.regisList = res.data;
                        } else {
                            that.regisList = [];
                        }
                    }
                )
            },


            statusFormat: function (row, column, value) {
                for (let i = 0; i < this.scaleList.length; i++) {
                    if (value == this.scaleList[i].value) {
                        return this.scaleList[i].label
                    }
                }
            },

            getYearList() {
                var that = this;
                var myDate = new Date();
                that.year = myDate.getFullYear();
                var startYear = myDate.getFullYear() - 10;
                var endYear = myDate.getFullYear()
                for (var i = startYear; i <= endYear; i++) {
                    var option = new Option();
                    that.$set(option, 'label', i)
                    that.$set(option, 'value', i)
                    that.years.push(option);
                }
            },

            //隔行换色
            tableRowClassName({row, rowIndex}) {
                if(rowIndex%2==1){
                    return 'warning-row';
                }else{
                    return 'success-row';
                }
            },
            // 修改table header的背景色
            tableHeaderColor({ row, column, rowIndex, columnIndex }) {
                if (rowIndex === 0) {
                    return 'background-color: #ebf1fb;color: #496fec;font-weight:600;font-size:16px;text-align:center'
                }else if(rowIndex === 1){
                    return 'background-color: #f7faff;font-size:14px;text-align:center'
                }else if(rowIndex === 2){
                    return 'background-color: #f7faff;font-size:14px;text-align:center'
                }
            },

        }
    }
</script>

<style scoped>

    .el-table .warning-row {
        background: #f7faff;
    }
    .el-table .success-row {
        background: #ebf1fb;
    }
</style>





