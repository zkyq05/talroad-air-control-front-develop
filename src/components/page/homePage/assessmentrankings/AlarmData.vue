<template>
    <div class="main-con">
        <div class="panel-default">
            <div class="panel-bd pd-lg">
                <ul class="filter-box">
                    <li class="filter-item">
                        <div class="filter-label">时间范围</div>
                        <div class="filter-con">
                            <el-date-picker style="margin-left: 5px"
                                            v-model="dateTime"
                                            type="daterange"
                                            range-separator="～"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期" @change="chage()" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </div>
                    </li>
                    <li class="filter-item ml-lger">
                        <div class="filter-label">数据维度</div>
                        <div class="filter-con">
                            <el-select clearable v-model="station" placeholder="请选择" @change="chage()" style="width:225px;">
                                <el-option
                                        :key="item.stationId"
                                        :label="item.stationName"
                                        :value="item.stationId"
                                        v-for="item in options">
                                </el-option>
                            </el-select>
                           <!-- <div class="el-button-group">
                                <span v-for="item in options">
                                    <button type="button" class="el-button el-button&#45;&#45;primary">{{item.stationName}}</button>
                                </span>
                            </div>-->
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <br>
        <div class="panel-default">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{year}}年共产生警报 <span class="text-number">{{total}}</span> 次，其中报警最多的指标 <span class="text-number text-value">{{pdName}}</span>
        </div>
        <!-- 超标 -->
        <div class="el-row mt-lg" style="margin-left: -15px; margin-right: -15px;">
            <div class="el-col el-col-16" style="padding-left: 15px; padding-right: 15px;">
                <div class="panel-default">
                    <div class="panel-hd">
                        <h2 class="panel-tit"><i class="icon icon-zhexiantu"></i>超标报警趋势</h2>
                    </div>
                    <div class="panel-bd">
                        <div class="chart-item" id="alarm-data" style="height: 420px"></div>
                    </div>
                </div>
            </div>
            <div class="el-col el-col-8" style="padding-left: 15px; padding-right: 15px;">
                <div class="panel-default">
                    <div class="panel-hd">
                        <h2 class="panel-tit"><i class="icon icon-biaoge"></i>超标次数最多站点(TOP10)</h2>
                    </div>
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column
                                type="index" label="序号">
                        </el-table-column>
                        <el-table-column prop="stationName" label="站点名称" width="auto" align="center"></el-table-column>
                        <el-table-column prop="count"  label="报警次数" width="auto" align="center" class="Oswald"></el-table-column>
                        <el-table-column prop="percent" label="占比" width="auto" align="center" class="Oswald"></el-table-column>
                    </el-table>
                    <!--<table class="table-default01">-->
                    <!--<thead>-->
                    <!--<tr>-->
                    <!--<th>序号</th>-->
                    <!--<th>站点名称</th>-->
                    <!--<th>报警次数</th>-->
                    <!--<th>占比</th>-->
                    <!--</tr>-->
                    <!--</thead>-->
                    <!--<tbody>-->
                    <!--<tr>-->
                    <!--<td>1</td>-->
                    <!--<td>第三中学监控站</td>-->
                    <!--<td class="Oswald">123</td>-->
                    <!--<td class="Oswald">12<span class="text-value">%</span></td>-->
                    <!--</tr>-->
                    <!--</tbody>-->
                    <!--</table>-->
                </div>
            </div>
        </div>
        <!-- 报警 -->
        <div class="el-row mt-lg" style="margin-left: -15px; margin-right: -15px;">
            <div class="el-col el-col-8" style="padding-left: 15px; padding-right: 15px;">
                <div class="panel-default">
                    <div class="panel-hd">
                        <h2 class="panel-tit"><i class="icon icon-baobiao"></i>各指标报警次数统计</h2>
                    </div>
                    <div class="panel-bd">
                        <div class="chart-item" id="alarm-databar" style="height: 420px"></div>
                    </div>
                </div>
            </div>
            <div class="el-col el-col-8" style="padding-left: 15px; padding-right: 15px;">
                <div class="panel-default">
                    <div class="panel-hd">
                        <h2 class="panel-tit"><i class="icon icon-baobiao"></i>各源类型报警次数统计（{{year}}全年）</h2>
                    </div>
                    <div class="panel-bd">
                        <div class="chart-item" id="alarm-information" style="height: 420px"></div>
                    </div>
                </div>
            </div>
            <div class="el-col el-col-8" style="padding-left: 15px; padding-right: 15px;">
                <div class="panel-default">
                    <div class="panel-hd">
                        <h2 class="panel-tit"><i class="icon icon-bingtu"></i>各报警类型统计</h2>
                    </div>
                    <div class="panel-bd">
                        <div class="chart-item" id="alarm-dataPin" style="height: 420px"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import alarmData from '../echartsUnit/AlarmData'
    import alarmDataBar from '../echartsUnit/AlarmDataBar'
    import alarmDataInformation from '../echartsUnit/AlarmDataInformation'
    import alarmDataPin from '../echartsUnit/AlarmDataPin'

    export default {
        name: "AlarmData",
        components:{
            alarmData,alarmDataBar,alarmDataInformation,alarmDataPin
        },
        data:function(){
            return{
                dateTime:[new Date().format("yyyy")+"-01-01",new Date().format("yyyy-MM-dd")],
                tableData:[],
                pdName:'',
                total:'',
                options:[{stationId:'',stationName: '全部'}],
                station:'',
                year:null,
                yearUp:null,
            }
        },
        mounted:function(){
            let myDate = new Date();
            let tYear = myDate.getFullYear();
            this.year=tYear;
            this.yearUp=tYear-1;
            this.initPage();
            this.getTotal();
            this.getStation();
            alarmData(this);
            alarmDataBar(this);
            alarmDataInformation(this);
            alarmDataPin(this);
        },
        methods:{
            chage:function () {
                this.initPage();
                alarmData(this);
                alarmDataBar(this);
                alarmDataInformation(this);
                alarmDataPin(this);
            },
            dateClose:function () {
                let _this =this;
                this.initPage();
                alarmData(this);
                alarmDataBar(this);
            },
            //初始化查询列表 默认第一页
            initPage: function () {
                let self = this;
                let params = new URLSearchParams();
                params.append("pageNum", "1");
                params.append("pageSize", "10");
                if(self.dateTime==null){
                    params.append("beginTime","");
                    params.append("endTime", "");
                }else{
                    params.append("beginTime",self.dateTime[0]);
                    params.append("endTime", self.dateTime[1]);
                }
                params.append("region", self.station);
                this.$axios.post(
                    '/aircontrol/airassess/codReport/getAlarmDataTop', params
                ).then(function (res) {
                    self.tableData = res.data.records;
                })
            },
            getTotal: function () {
                var _this = this;
                var params = new URLSearchParams();
                params.append("beginTime","");
                params.append("endTime", "");
                this.$axios.post(
                    '/aircontrol/airassess/codReport/getAlarmDataTitle', params
                ).then(function (res) {
                    _this.pdName=res.data.poName;
                    _this.total=res.data.total;
                })
            },
            getStation: function () {
                var _this = this;
                _this.$axios.post(
                    '/aircontrol/airassess/codReport/getStation'
                ).then(function (res) {
                    for(let i=0;i<res.data.length;i++){
                            let obj ={};
                            obj.stationId= res.data[i].stationId;
                            obj.stationName= res.data[i].stationName;
                        _this.options.push(obj);
                    }
                })
            },

        }
    }
</script>

<style scoped>

</style>
