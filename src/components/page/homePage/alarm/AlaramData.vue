<template>
    <div class="content">
        <!-- 面包屑导航 -->
        <div class="breadcrumb">
            当前位置：<span class="current">警报管理</span>
        </div>
        <div class="layout">
            <div class="layout-side" style="height: 800px;">
                <RegionStation ref="regionStationObj" :selectStation="false"
                               @RegionChange="RegionChange"></RegionStation>
            </div>
            <div class="layout-main" style="height:800px;">
                <div class="form-list-inline">
                    <el-form :inline="true" class="demo-form-inline">
                        <el-form-item label="报警类型：">
                            <el-select v-model="fkAlarmType" placeholder="请选择"
                                       @change="initPage" clearable style="width: 110px">
                                <el-option value="" label="全部"></el-option>
                                <el-option v-for="item in alarmTypes" :key="item.code" :label="item.name"
                                           :value="item.code"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="通知状态：">
                            <el-select v-model="state" placeholder="请选择"
                                       style="width: 90px" clearable @change="initPage">
                                <el-option value="" label="全部"></el-option>
                                <el-option value="0" label="未通知"></el-option>
                                <el-option value="1" label="已通知"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="时间：">
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
                    <el-table :data="realTimeDatas">
                        <el-table-column type="index" width="40"></el-table-column>
                        <el-table-column prop="stationName" label="站点" align="center"/>
                        <el-table-column prop="pollutantName" label="检测项目设备" align="center"
                                         :show-overflow-tooltip="true"/>
                        <el-table-column prop="monitorTime" :formatter="formatDate" label="数据时间"
                                         align="center"
                                         :show-overflow-tooltip="true"/>
                        <el-table-column prop="monitorValue" label="监测值" align="center"/>
                        <el-table-column prop="alarmCount" label="超标倍数" align="center"/>
                        <el-table-column prop="alatmStand" label="超标标准" align="center"/>
                        <el-table-column prop="alarmTime" label="报警时间" align="center"
                                         :show-overflow-tooltip="true"/>
                        <el-table-column prop="fk_alarmType" label="报警类型" align="center"
                                         :formatter="formatfk_alarmType"/>
                        <el-table-column prop="remarks" label="报警描述" align="center" :show-overflow-tooltip="true"/>
                        <el-table-column prop="state" label="状态" align="center" :formatter="formatstate"/>
                        <el-table-column prop="state" label="操作" align="center">
                            <template slot-scope="scope">
                                <el-button @click="operationClick(scope.$index,realTimeDatas)" type="text"
                                           v-if="scope.row.state === 1" disabled="true">已通知
                                </el-button>
                                <el-button @click="operationClick(scope.$index,realTimeDatas)" type="text"
                                           v-if="scope.row.state === 0">通知
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <div class="pagination mt">
                        <pagination ref="paginationObj" @handleCurrentChange="handleCurrentChange"
                                    @paginationFunction="paginationFunction"></pagination>
                    </div>
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
                fkAlarmType: '',
                alarmTypes: [],
                stationId: '',
                state: '',
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
            this.initAlarmType();
        },
        methods: {
            init() {
                this.initPage();
            },
            initAlarmType() {
                var _this = this;
                var url = "/api/dic/getAlarmType";
                var param = new URLSearchParams();
                _this.$axios.post(url, param).then(function (response) {
                    _this.alarmTypes = response.data;
                })
            },
            initPage() {
                var _this = this;
                if (_this.value_time == null) {
                    return;
                }
                var beginTime = _this.value_time[0];
                var endTime = _this.value_time[1];
                var url = "/api/alarm/getAlarmDataByParams";
                var param = new URLSearchParams();
                param.append("beginTime", beginTime);
                param.append("endTime", endTime);
                param.append("pageNum", _this.$refs.paginationObj.cur_page);
                param.append("pageSize", _this.$refs.paginationObj.cur_pageSize);
                param.append("fkAlarmType", _this.fkAlarmType);
                param.append("state", _this.state);
                param.append("fkStationId", _this.stationId);
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
            checkout() {
                this.initPage();
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
            formatstate(row, column) {
                if (row.state == 1) {
                    return "已通知";
                }
                if (row.state == 0) {
                    return "未通知";
                }
                return row.state;
            },
            defalutDate() {
                var _this = this;
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                _this.value_time = [start.format('yyyy-MM-dd'), end.format('yyyy-MM-dd')];
            },
            operationClick(index, rows) {
                this.$router.push({
                    name: 'AlarmNotification',
                    query: {
                        "result1": rows[index],
                    }
                });
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
                var url = "/api/alarm/exportAlarmDataByParams";
                var param = new URLSearchParams();
                param.append("beginTime", beginTime);
                param.append("endTime", endTime);
                param.append("pageNum", _this.$refs.paginationObj.cur_page);
                param.append("pageSize", _this.$refs.paginationObj.cur_pageSize);
                param.append("fkAlarmType", _this.fkAlarmType);
                param.append("state", _this.state);
                param.append("fkStationId", _this.stationId);
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
