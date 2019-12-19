<template>
    <div class="content">
        <!-- 面包屑导航 -->
        <div class="breadcrumb">
            当前位置：<span class="current">警报统计</span>
        </div>
        <div class="layout">
            <div class="layout-main" style="height:800px;">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item>
                        <el-radio-group v-model="radio" @change="init">
                            <el-radio :label="1">城市</el-radio>
                            <el-radio :label="2">流域</el-radio>
                            <el-radio :label="3">站点</el-radio>
                        </el-radio-group>
                    </el-form-item>
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
                            @change="init"
                            value-format="yyyy-MM-dd"
                            align="right">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="checkout" >查询
                        </el-button>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="success" @click="exportData">导出</el-button>
                    </el-form-item>
                </el-form>
                <el-table :data="realTimeDatas">
                    <el-table-column type="index" width="40"></el-table-column>
                    <el-table-column prop="stationName" label="区域" align="center"/>

                    <el-table-column prop="AlarmCountData" label="数据警报次数" align="center"/>

                    <el-table-column prop="AlarmCountDevice" label="设备警报次数" align="center"/>

                    <el-table-column prop="AlarmCountBreak" label="断线警报次数" align="center"/>
                    <el-table-column prop="AlarmCountSum" label="总数警报" align="center"/>

                    <el-table-column prop="AlarmCountTrue" label="已通知数" align="center"/>

                    <el-table-column prop="AlarmCountFalse" label="未通知数" align="center"/>

                </el-table>

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
    import downloadFile from '../../../common-tools/DownloadFile'

    export default {

        name: "AlarmStatistics",
        components: {
            pagination
        },
        data() {
            return {
                alarmStatistics: false,
                realTimeDatas: [],//数据集合
                radio: 1,
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
                },
                value1_time: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
                value_time: ['', '']
            }
        },
        methods: {
            checkout() {
                this.init();
            },
            getIndex(index) {
                let curPage = this.cur_page;
                let limitPage = this.cur_pageSize;
                return (index + 1) + (curPage - 1) * limitPage;
            },
            paginationFunction() {
                this.init();
            },
            handleCurrentChange() {
                this.init();
            },
            defalutDate() {
                var _this = this;
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                _this.value_time = [start.format('yyyy-MM-dd'), end.format('yyyy-MM-dd')];
            },
            init() {
                var _this = this;
                if (_this.value_time == null) {
                    return;
                }
                var beginTime = _this.value_time[0];
                var endTime = _this.value_time[1];
                var url = "/api/alarm/getAlarmStatisticsDataByParams";
                var param = new URLSearchParams();
                param.append("beginTime", beginTime);
                param.append("endTime", endTime);
                param.append("pageNum", _this.$refs.paginationObj.cur_page);
                param.append("pageSize", _this.$refs.paginationObj.cur_pageSize);
                param.append("type", _this.radio);
                _this.$axios.post(url, param).then(function (response) {
                    _this.$refs.paginationObj.count = response.data.totalCount;
                    _this.realTimeDatas = response.data.list;
                })
            },
            exportData() {
                var _this = this;
                if (_this.value_time == null) {
                    return;
                }
                var beginTime = _this.value_time[0];
                var endTime = _this.value_time[1];
                var url = "/api/alarm/exportAlarmStatisticsDataByParams";
                var param = new URLSearchParams();
                param.append("beginTime", beginTime);
                param.append("endTime", endTime);
                param.append("pageNum", _this.$refs.paginationObj.cur_page);
                param.append("pageSize", _this.$refs.paginationObj.cur_pageSize);
                param.append("type", _this.radio);
                this.$axios.post(url, param, {
                    responseType: 'arraybuffer'
                }).then(function (response) {
                    downloadFile(response);
                    return response.data;
                }).catch(function (err) {
                    console.log(err);
                })
            }
        },
        mounted() {
            this.defalutDate();
            this.init();
        }
    }
</script>

<style scoped>

</style>
