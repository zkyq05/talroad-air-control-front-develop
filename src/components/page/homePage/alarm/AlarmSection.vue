<template>
    <div class="content">
        <!-- 面包屑导航 -->
        <div class="breadcrumb">
            当前位置：<span class="current">断面未达标预警</span>
        </div>
        <div class="layout">
            <div class="layout-side">
                <RegionStation ref="regionStationObj" :selectStation="false"
                               @RegionChange="RegionChange"></RegionStation>
            </div>
            <div class="layout-main">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="时间">
                        <el-date-picker
                            :clearable="false"
                            v-model="value_time"
                            type="datetimerange"
                            :picker-options="pickerOptions"
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            format="yyyy-MM-dd "
                            @change="initPage"
                            value-format="yyyy-MM-dd"
                            align="right">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="checkout">
                            查询
                        </el-button>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="success" @click="exportData">导出</el-button>
                    </el-form-item>
                </el-form>
                <el-table :data="realTimeDatas" border ref="multipleTable">
                    <el-table-column type="index" width="40"></el-table-column>
                    <el-table-column prop="stationName" label="站点名称" align="center"/>
                    <el-table-column prop="monitorTime" :formatter="formatDate" label="时间"
                                     align="center"
                                     :show-overflow-tooltip="true"/>
                    <el-table-column prop="regionName" label="行政区" align="center"/>
                    <el-table-column prop="riverName" label="流域" align="center"/>
                    <el-table-column prop="address" label="地址" align="center"/>
                    <el-table-column prop="fk_waterLevelId" label="水质目标" :formatter="waterLevel"
                                     align="center"/>
                    <el-table-column prop="fk_waterLevelNow" label="当前水质" :formatter="waterLevel"
                                     align="center"/>
                    <el-table-column prop="regionCodeDuty" label="责任单位" align="center"/>

                    <el-table-column prop="state" label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" @click="dialog(scope.$index,realTimeDatas)">超标信息</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <el-dialog title="详情" :visible.sync="dialogTableVisible" :modal-append-to-body="false">
                    <el-table :data="gridData">
                        <el-table-column property="name" label="名称"></el-table-column>
                        <el-table-column property="level" label="当前水质"
                                         :formatter="waterLevel"></el-table-column>
                        <el-table-column property="stand" label="目标" :formatter="waterLevel"></el-table-column>
                        <el-table-column property="count" label="超标倍数"></el-table-column>
                    </el-table>
                </el-dialog>


                <div class="pagination mt">
                    <pagination ref="paginationObj" @handleCurrentChange="handleCurrentChange"
                                @paginationFunction="paginationFunction"></pagination>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import pagination from '../../../common/unit/Pagination'
    import RegionStation from '../../../common/unit/RegionStation'
    import downloadFile from '../../../common-tools/DownloadFile'

    export default {
        name: "AlaramData",
        components: {
            pagination,
            RegionStation
        },
        data() {
            return {
                realTimeDatas: [],//数据集合
                dialogTableVisible: false,
                gridData: [],
                fkAlarmType: '',
                waterLevels: [],
                state: '',
                stationId: '',
                value_time: ['', ''],
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
            this.defalutDate();
            this.init();
        },
        methods: {
            init() {
                this.initPage();
                this.initWaterLevels();
            },
            initWaterLevels() {
                var _this = this;
                var url = "/api/dic/getWaterLevels";
                var param = new URLSearchParams();
                _this.$axios.post(url, param).then(function (response) {
                    _this.waterLevels = response.data;
                })
            },
            initPage() {
                var _this = this;
                if (_this.value_time == null) {
                    return;
                }
                var beginTime = _this.value_time[0];
                var endTime = _this.value_time[1];
                var url = "/api/alarm/getAlarmSectionData";
                var param = new URLSearchParams();
                param.append("beginTime", beginTime);
                param.append("endTime", endTime);
                param.append("pageNum", _this.$refs.paginationObj.cur_page);
                param.append("pageSize", _this.$refs.paginationObj.cur_pageSize);
                param.append("stationId", _this.stationId);

                _this.$axios.post(url, param).then(function (response) {
                    _this.$refs.paginationObj.count = response.data.totalCount;
                    _this.realTimeDatas = response.data.list;
                })
            },
            paginationFunction() {
                this.initPage();
            },
            handleCurrentChange() {
                this.initPage();
            },
            dialog(index, rows) {
                var _this = this;
                if (_this.value_time == null) {
                    return;
                }
                var url = "/api/alarm/getAlarmSectionInfo";
                var param = new URLSearchParams();
                param.append("pageNum", "1");
                param.append("pageSize", "1000");
                param.append("stationId", rows[index].daydatapkId);
                _this.$axios.post(url, param).then(function (response) {
                    _this.gridData = response.data.list;
                    _this.dialogTableVisible = true;
                })
            },
            checkout() {
                this.initPage();
            },
            waterLevel(row, column, cellValue, index) {
                for (var i = 0; i < this.waterLevels.length; i++) {
                    if (this.waterLevels[i].level == cellValue) {
                        return this.waterLevels[i].type;
                    }
                }
            },
            formatDate(row, column) {
                return new Date(row.monitorTime).format("yyyy-MM-dd hh:mm:ss");
            },
            formatfk_alarmType(row, column) {
                if (row.fk_alarmType == 1) {
                    return "数据报警";
                }
                if (row.fk_alarmType == 2) {
                    return "设备报警";
                }
                if (row.fk_alarmType == 1) {
                    return "断线报警";
                }
                return row.fk_alarmType;
            },
            defalutDate() {
                var _this = this;
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                _this.value_time = [start.format('yyyy-MM-dd'), end.format('yyyy-MM-dd')];
            },
            formatstate(row, column) {
                if (row.state == 1) {
                    return "已通知";
                }
                if (row.state == 0) {
                    return "未通知";
                }
                return row.state;
            }, RegionChange(data) {
                if (data.isStation) {
                    this.stationId = data.value;
                }
                this.initPage();
            },
            exportData() {
                var _this = this;
                if (_this.value_time == null) {
                    return;
                }
                var beginTime = _this.value_time[0];
                var endTime = _this.value_time[1];
                var url = "/api/alarm/exportAlarmSectionData";
                var param = new URLSearchParams();
                param.append("beginTime", beginTime);
                param.append("endTime", endTime);
                param.append("pageNum", _this.$refs.paginationObj.cur_page);
                param.append("pageSize", _this.$refs.paginationObj.cur_pageSize);
                param.append("stationId", _this.stationId);
                this.$axios.post(url, param, {
                    responseType: 'arraybuffer'
                }).then(function (response) {
                    downloadFile(response);
                    return response.data;
                }).catch(function (err) {
                    console.log(err);
                })
            }
        }
    }
</script>

<style scoped>

</style>
