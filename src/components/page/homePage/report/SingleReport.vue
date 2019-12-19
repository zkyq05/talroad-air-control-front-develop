<template>
    <div class="content">
        <!-- 面包屑导航 -->
        <div class="breadcrumb">
            当前位置：<a href="#/HistoryData">历史数据</a><span class="sep">></span><span
            class="current">{{activeTabName}}</span><span class="sep">></span> <span class="current">{{nodeName}}</span>
        </div>
        <!-- 站点信息 -->
        <div class="layout">
            <div class="layout-side" style="height: 800px;">
                <RegionStation ref="regionStationObj" :selectStation="false"
                               @RegionChange="RegionChange"></RegionStation>
            </div>
            <div class="layout-main">
                <!-- tab切换 -->
                <div class="tab">
                    <el-tabs v-model="activeTabName" type="border-card" @tab-click="tabClick">
                        <el-tab-pane name="周" label="周">
                            <div class="tab-bd">
                                <div class="tab-item">
                                    <div class="form-list-inline">
                                        <el-form :inline="true" class="demo-form-inline">
                                            <el-form-item label="监测因子组">
                                                <MonitoringFactorGroup :initGroupId="1" :openCustomer="true"
                                                                       @mfgChange="mfgChangeWeek"></MonitoringFactorGroup>
                                            </el-form-item>

                                            <el-form-item label="时间">
                                                <el-date-picker
                                                    format="yyyyWW"
                                                    id="week"
                                                    v-model="value_time1"
                                                    type="week"
                                                    placeholder="选择周">
                                                </el-date-picker>


                                            </el-form-item>
                                            <el-form-item>
                                                <el-button type="primary" @click="checkWeek">查询</el-button>
                                                <el-button type="success" @click="exportDataWeek">导出</el-button>
                                            </el-form-item>
                                        </el-form>

                                        <div class="table-box">
                                            <el-table :data="tableWeek">
                                                <el-table-column prop="stationName" label="站点"></el-table-column>
                                                <el-table-column prop="regionName" label="区域"></el-table-column>
                                                <el-table-column prop="riverName" label="流域"></el-table-column>
                                                <template v-for="obj in pollutantsWeek">
                                                    <el-table-column :label="obj.pollutantName" align="center">
                                                        <el-table-column
                                                            :prop="obj.pollutantCode"
                                                            label="检测值">
                                                        </el-table-column>
                                                        <el-table-column
                                                            :prop="obj.pollutantCode+'fk_level'"
                                                            label="单项水质">
                                                        </el-table-column>
                                                    </el-table-column>
                                                </template>
                                                <el-table-column prop="fk_waterLevelId" label="当前水质"
                                                                 :formatter="waterLevel"></el-table-column>
                                                <el-table-column prop="fk_waterLevelNow" label="水质目标"
                                                                 :formatter="waterLevel"></el-table-column>
                                                <el-table-column prop="" label="超标因子（倍数）" :show-overflow-tooltip="true"
                                                                 :formatter="formatFactor"></el-table-column>
                                            </el-table>
                                        </div>
                                        <div class="pagination mt">
                                            <pagination ref="paginationObjWeek"
                                                        @handleCurrentChange="handleCurrentChange"
                                                        @paginationFunction="paginationFunction"></pagination>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane name="月" label="月">
                            <div class="tab-bd">
                                <div class="tab-item">
                                    <div class="form-list-inline">
                                        <el-form :inline="true" class="demo-form-inline">

                                            <el-form-item label="监测因子组">
                                                <MonitoringFactorGroup :initGroupId="1" :openCustomer="true"
                                                                       @mfgChange="mfgChangeMonth"></MonitoringFactorGroup>
                                            </el-form-item>

                                            <el-form-item label="时间">
                                                <el-date-picker
                                                    v-model="value_time2"
                                                    type="month"
                                                    value-format="yyyyMM"
                                                    @change="checkMonth"
                                                    placeholder="选择月">
                                                </el-date-picker>
                                            </el-form-item>
                                            <el-form-item>
                                                <el-button type="primary" @click="checkMonth">查询</el-button>
                                                <el-button type="success" @click="exportDataMonth">导出</el-button>
                                            </el-form-item>
                                        </el-form>
                                        <div class="table-box">
                                            <el-table :data="tableMonth">
                                                <el-table-column prop="stationName" label="站点"></el-table-column>
                                                <el-table-column prop="regionName" label="区域"></el-table-column>
                                                <el-table-column prop="riverName" label="流域"></el-table-column>
                                                <template v-for="obj in pollutantsMonth">
                                                    <el-table-column :label="obj.pollutantName" align="center">
                                                        <el-table-column
                                                            :prop="obj.pollutantCode"
                                                            label="检测值">
                                                        </el-table-column>
                                                        <el-table-column
                                                            :prop="obj.pollutantCode+'fk_level'"
                                                            label="单项水质">
                                                        </el-table-column>
                                                    </el-table-column>
                                                </template>
                                                <el-table-column prop="fk_waterLevelId" label="当前水质"
                                                                 :formatter="waterLevel"></el-table-column>
                                                <el-table-column prop="fk_waterLevelNow" label="水质目标"
                                                                 :formatter="waterLevel"></el-table-column>
                                                <el-table-column prop="" label="超标因子（倍数）" :show-overflow-tooltip="true"
                                                                 :formatter="formatFactor"></el-table-column>
                                            </el-table>
                                        </div>
                                        <div class="pagination mt">
                                            <pagination ref="paginationObjMonth"
                                                        @handleCurrentChange="handleCurrentChange"
                                                        @paginationFunction="paginationFunction"></pagination>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane name="年" label="年">
                            <div class="tab-bd">
                                <div class="tab-item">
                                    <div class="form-list-inline">
                                        <el-form :inline="true" class="demo-form-inline">

                                            <el-form-item label="监测因子组">
                                                <MonitoringFactorGroup :initGroupId="1" :openCustomer="true"
                                                                       @mfgChange="mfgChangeYear"></MonitoringFactorGroup>
                                            </el-form-item>

                                            <el-form-item label="时间">
                                                <el-date-picker
                                                    v-model="value_time3"
                                                    type="year"
                                                    value-format="yyyy"
                                                    @change="checkYear"
                                                    placeholder="选择年">
                                                </el-date-picker>
                                            </el-form-item>
                                            <el-form-item>
                                                <el-button type="primary" @click="checkYear">查询</el-button>
                                                <el-button type="success" @click="exportDataYear">导出</el-button>
                                            </el-form-item>
                                        </el-form>
                                        <div class="table-box">
                                            <el-table :data="tableYear">
                                                <el-table-column type="index" width="40"></el-table-column>
                                                <el-table-column prop="stationName" label="站点"></el-table-column>
                                                <el-table-column prop="regionName" label="区域"></el-table-column>
                                                <el-table-column prop="riverName" label="流域"></el-table-column>
                                                <template v-for="obj in pollutantsYear">
                                                    <el-table-column :label="obj.pollutantName" align="center">
                                                        <el-table-column
                                                            :prop="obj.pollutantCode"
                                                            label="检测值">
                                                        </el-table-column>
                                                        <el-table-column
                                                            :prop="obj.pollutantCode+'fk_level'"
                                                            label="单项水质">
                                                        </el-table-column>
                                                    </el-table-column>
                                                </template>
                                                <el-table-column prop="fk_waterLevelId" label="当前水质"
                                                                 :formatter="waterLevel"></el-table-column>
                                                <el-table-column prop="fk_waterLevelNow" label="水质目标"
                                                                 :formatter="waterLevel"></el-table-column>
                                                <el-table-column prop="" label="超标因子（倍数）" :show-overflow-tooltip="true"
                                                                 :formatter="formatFactor"></el-table-column>
                                            </el-table>
                                        </div>
                                        <div class="pagination mt">
                                            <pagination ref="paginationObjYear"
                                                        @handleCurrentChange="handleCurrentChange"
                                                        @paginationFunction="paginationFunction"></pagination>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import pagination from '../../../common/unit/Pagination'
    import RegionStation from '../../../common/unit/RegionStation'
    import downloadFile from '../../../common-tools/DownloadFile'
    import MonitoringFactorGroup from '../../../common/unit/MonitoringFactorGroup'

    export default {
        name: "SingleReport",
        components: {
            pagination,
            RegionStation,
            MonitoringFactorGroup
        },
        data() {
            return {
                selectStation: "",
                nodeName: "",
                activeTabName: "周",
                stationId: '',
                waterLevels: [],
                pollutantsWeek: [],
                pollutantsMonth: [],
                pollutantsYear: [],
                tableWeek: [],
                tableMonth: [],
                tableYear: [],
                value_time1: '',
                value_time2: '',
                value_time3: '',
                pollutants: [],
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                }
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                this.initPage();
            },
            formatFactor(row, column) {
                var str = "";
                if (row.fk_pollutantId1 != '' && row.fk_pollutantId1 != null) {
                    str = str + this.getPollutants(row.fk_pollutantId1) + "(" + row.pollutant1Over + ")" + ","
                }
                if (row.fk_pollutantId2 != '' && row.fk_pollutantId2 != null) {
                    str = str + this.getPollutants(row.fk_pollutantId2) + "(" + row.pollutant2Over + ")" + ","
                }
                if (row.fk_pollutantId3 != '' && row.fk_pollutantId3 != null) {
                    str = str + this.getPollutants(row.fk_pollutantId3) + "(" + row.pollutant3Over + ")"
                }
                return str;
            },
            initPage() {
                this.initPollutant();
                this.initWeek();
                this.initWaterLevels();
                this.initPollutants();
            },
            paginationFunction() {
                this.initPage();
            },
            handleCurrentChange() {
                this.initPage();
            },
            initPollutants() {
                var _this = this;
                var url = "/api/dic/getPollutants";
                var param = new URLSearchParams();
                _this.$axios.post(url, param).then(function (response) {
                    _this.pollutants = response.data;
                })
            }, getPollutants(val) {
                for (var i = 0; i < this.pollutants.length; i++) {
                    if (this.pollutants[i].pkId == val) {
                        return this.pollutants[i].pollutantName;
                    }
                }
                return "";
            }, initWeek() {
                var _this = this;
                var url = "/api/report/getSingleReportWeekData";
                var param = new URLSearchParams();
                param.append("pageNum", _this.$refs.paginationObjWeek.cur_page);
                param.append("pageSize", _this.$refs.paginationObjWeek.cur_pageSize);
                param.append("weakTime", document.querySelector("#week").value);
                param.append("stationId", _this.stationId);

                _this.$axios.post(url, param).then(function (response) {
                    _this.tableWeek = response.data.list;
                    _this.$refs.paginationObjWeek.count = response.data.totalCount;
                })
            }
            ,
            initMonth() {
                var _this = this;
                var url = "/api/report/getSingleReportMonthData";
                var param = new URLSearchParams();
                param.append("pageNum", _this.$refs.paginationObjMonth.cur_page);
                param.append("pageSize", _this.$refs.paginationObjMonth.cur_pageSize);
                param.append("monthTime", _this.value_time2 == null ? '' : _this.value_time2);
                param.append("stationId", _this.stationId);
                _this.$axios.post(url, param).then(function (response) {
                    _this.tableMonth = response.data.list;
                    _this.$refs.paginationObjMonth.count = response.data.totalCount;
                })
            }
            ,
            initYear() {
                var _this = this;
                var url = "/api/report/getSingleReportYearData";
                var param = new URLSearchParams();
                param.append("pageNum", _this.$refs.paginationObjWeek.cur_page);
                param.append("pageSize", _this.$refs.paginationObjWeek.cur_pageSize);
                param.append("yearTime", _this.value_time3 == null ? '' : _this.value_time3);
                param.append("stationId", _this.stationId);
                _this.$axios.post(url, param).then(function (response) {
                    _this.tableYear = response.data.list;
                    _this.$refs.paginationObjYear.count = response.data.totalCount;
                })
            }
            ,
            initPollutant() {
                var _this = this;
                var url = "/api/report/getPollutantData";
                var param = new URLSearchParams();
                _this.$axios.post(url, param).then(function (response) {
                    _this.pollutantsWeek = response.data.list;
                    _this.pollutantsMonth = response.data.list;
                    _this.pollutantsYear = response.data.list;
                })
            }
            ,
            initWaterLevels() {
                var _this = this;
                var url = "/api/dic/getWaterLevels";
                var param = new URLSearchParams();
                _this.$axios.post(url, param).then(function (response) {
                    _this.waterLevels = response.data;
                })
            }
            ,
            checkWeek() {
                this.initWeek();
            }
            ,
            checkMonth() {
                this.initMonth();
            }
            ,
            checkYear() {
                this.initYear();
            }
            ,
            RegionChange(data) {
                if (data.isStation) {
                    this.stationId = data.value;
                }
                if (this.activeTabName == "周") {
                    this.checkWeek();
                }
                if (this.activeTabName == "月") {
                    this.checkMonth();
                }
                if (this.activeTabName == "年") {
                    this.checkYear();
                }
            }
            ,
            tabClick(tab, event) {
                if (tab.name == "周") {
                    this.checkWeek();
                }
                if (tab.name == "月") {
                    this.checkMonth();
                }
                if (tab.name == "年") {
                    this.checkYear();
                }
            }
            ,
            mfgChangeWeek(pollutants) {
                this.pollutantsWeek = pollutants.pollutantArr;
            }
            ,
            mfgChangeMonth(pollutants) {
                this.pollutantsMonth = pollutants.pollutantArr;
            }
            ,
            mfgChangeYear(pollutants) {
                this.pollutantsYear = pollutants.pollutantArr;
            }
            ,
            exportDataWeek() {
                var _this = this;
                var arr = [];
                for (var i = 0; i < _this.pollutantsWeek.length; i++) {
                    arr.push(_this.pollutantsWeek[i].pollutantCode);
                }
                var arrPollutantName = [];
                for (var i = 0; i < _this.pollutantsWeek.length; i++) {
                    arrPollutantName.push(_this.pollutantsWeek[i].pollutantName);
                }
                var url = "/api/report/exportSingleReportWeekData";
                var param = new URLSearchParams();
                param.append("pageNum", _this.$refs.paginationObjWeek.cur_page);
                param.append("pageSize", _this.$refs.paginationObjWeek.cur_pageSize);
                param.append("weakTime", document.querySelector("#week").value);
                param.append("stationId", _this.stationId);
                param.append("pollutants", arr);
                param.append("pollutantNames", arrPollutantName);
                this.$axios.post(url, param, {
                    responseType: 'arraybuffer'
                }).then(function (response) {
                    downloadFile(response);
                    return response.data;
                }).catch(function (err) {
                    console.log(err);
                })
            }
            ,
            exportDataMonth() {
                var _this = this;
                var arr = [];
                for (var i = 0; i < _this.pollutantsMonth.length; i++) {
                    arr.push(_this.pollutantsMonth[i].pollutantCode);
                }
                var arrPollutantName = [];
                for (var i = 0; i < _this.pollutantsMonth.length; i++) {
                    arrPollutantName.push(_this.pollutantsMonth[i].pollutantName);
                }
                var url = "/api/report/exportSingleReportMonthData";
                var param = new URLSearchParams();
                param.append("pageNum", _this.$refs.paginationObjWeek.cur_page);
                param.append("pageSize", _this.$refs.paginationObjWeek.cur_pageSize);
                param.append("weakTime", document.querySelector("#week").value);
                param.append("stationId", _this.stationId);
                param.append("pollutants", arr);
                param.append("pollutantNames", arrPollutantName);
                this.$axios.post(url, param, {
                    responseType: 'arraybuffer'
                }).then(function (response) {
                    downloadFile(response);
                    return response.data;
                }).catch(function (err) {
                    console.log(err);
                })
            }
            ,
            exportDataYear() {
                var _this = this;
                var arr = [];
                for (var i = 0; i < _this.pollutantsYear.length; i++) {
                    arr.push(_this.pollutantsYear[i].pollutantCode);
                }
                var arrPollutantName = [];
                for (var i = 0; i < _this.pollutantsYear.length; i++) {
                    arrPollutantName.push(_this.pollutantsYear[i].pollutantName);
                }
                var url = "/api/report/exportSingleReportYearData";
                var param = new URLSearchParams();
                param.append("pageNum", _this.$refs.paginationObjWeek.cur_page);
                param.append("pageSize", _this.$refs.paginationObjWeek.cur_pageSize);
                param.append("weakTime", document.querySelector("#week").value);
                param.append("stationId", _this.stationId);
                param.append("pollutants", arr);
                param.append("pollutantNames", arrPollutantName);
                this.$axios.post(url, param, {
                    responseType: 'arraybuffer'
                }).then(function (response) {
                    downloadFile(response);
                    return response.data;
                }).catch(function (err) {
                    console.log(err);
                })
            }
            ,
            waterLevel(row, column, cellValue, index) {
                for (var i = 0; i < this.waterLevels.length; i++) {
                    if (this.waterLevels[i].level == cellValue) {
                        return this.waterLevels[i].type;
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
