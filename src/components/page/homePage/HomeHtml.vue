<template>
  <!-- 内容区 -->
  <div class="content">
    <div class="aqi-top">
      <div class="place">
        <div class="place-hd">
          <i class="icon icon-weizhi place-icon"></i>
            <el-cascader filterable placeholder="行政区域" v-model="cascader_value" :options="cascader_options"
                         :props="{ expandTrigger: 'hover', checkStrictly: true }" :show-all-levels="false"
                         @change="handleChange"></el-cascader>
          <!--<span class="place-name">中心城区</span>-->
          <!--<i class="icon icon-caret-down place-arrow"></i>-->
        </div>
      </div>
      <ul class="legend-list">
        <li><i class="legend-icon is-level-1"></i><span>优</span></li>
        <li><i class="legend-icon is-level-2"></i><span>良</span></li>
        <li><i class="legend-icon is-level-3"></i><span>轻度污染</span></li>
        <li><i class="legend-icon is-level-4"></i><span>中度污染</span></li>
        <li><i class="legend-icon is-level-5"></i><span>重度污染</span></li>
        <li><i class="legend-icon is-level-6"></i><span>严重污染</span></li>
      </ul>
    </div>
    <div class="row">
      <div class="col-18">
        <div class="row">
          <div class="col-8">
            <div class="panel">
              <div class="panel-hd">
                <div class="panel-tit"><i class="icon icon-lianwang"></i><span>联网率</span></div>
              </div>
              <div class="panel-bd" style="height: 200px;">
                <div class="box-online">
                  <div class="online-chart" id="chart-online"></div>
                  <div class="online-info">
                    <div class="online-info-item is-online">
                      <div class="info-num">{{onlineNum}}</div>
                      <div class="info-name">站点在线</div>
                    </div>
                    <div class="online-info-item">
                      <div class="info-num">{{offlineNum}}</div>
                      <div class="info-name">站点离线</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-8">
            <div class="panel">
              <div class="panel-hd">
                <div class="panel-tit"><i class="icon icon-aqi"></i><span>AQI实时指数</span></div>
              </div>
              <div class="panel-bd" style="height: 200px;">
                <div class="aqi-index is-level-2">
                  <div class="aqi-num">{{aqiNum}}</div>
                  <div class="aqi-info">
                    <div class="info-show is-level-2">{{aqiType}}<i class="icon icon-kongqizhiliang"></i></div>
                    <div class="info-text">首要污染物：{{pollutant}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-8">
            <div class="panel">
              <div class="panel-hd">
                <div class="panel-tit"><i class="icon icon-wuranwu"></i><span>首要污染物年统计(单位：天)</span></div>
              </div>
              <div class="panel-bd" style="height: 200px;">
                <div style="height: 180px;" id="chart-wrw"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="panel mt">
          <div class="panel-hd">
            <div class="panel-tit"><i class="icon icon-aqi"></i><span>AQI月历</span></div>
            <div class="panel-date" style="width: 110px">
              <!--<div class="input-wrap input-wrap-sm input-wrap-suffix">-->
                <!--<input type="text" class="input" value="2019-06">-->
                <!--<i class="icon icon-down"></i>-->
                  <el-date-picker v-model="aqiCalendarDateTime" type="month" placeholder="选择月"
                                  value-format="yyyy-MM" @change="getAqiCalendarDateTime" style="width: 100%;height: 80%">
                  </el-date-picker>
              <!--</div>-->
            </div>
          </div>
          <div class="panel-bd padding-none">
            <div class="table-aqi-box">
              <table v-bind:class="tableAqi">
                  <!--<table class="table-aqi">-->
                <tr>
                  <th>周日</th>
                  <th>周一</th>
                  <th>周二</th>
                  <th>周三</th>
                  <th>周四</th>
                  <th>周五</th>
                  <th>周六</th>
                </tr>


                <tr v-for="(dayobject,index) in days" v-if="index < fiveOrSix">
                  <td>
                    <div v-bind:class="days[(index*7)].itemDayClass">
                        <!--<div class="item-day is-level-1">-->
                      <div class="day-num">{{days[(index*7)].day.getDate() }}</div>
                      <div class="day-info" v-if="days[(index*7)].aqi">
                        <div class="info-name">AQI</div>
                        <div class="info-num">{{days[(index*7)].aqi}}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div v-bind:class="days[(index*7 + 1)].itemDayClass">
                    <!--<div class="item-day is-level-2">-->
                      <div class="day-num">{{days[(index*7 + 1)].day.getDate() }}</div>
                      <div class="day-info" v-if="days[(index*7 + 1)].aqi">
                        <div class="info-name">AQI</div>
                        <div class="info-num">{{days[(index*7 + 1)].aqi}}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div v-bind:class="days[(index*7 + 2)].itemDayClass">
                    <!--<div class="item-day is-level-3">-->
                      <div class="day-num">{{days[(index*7 + 2)].day.getDate() }}</div>
                      <div class="day-info"  v-if="days[(index*7 + 2)].aqi">
                        <div class="info-name">AQI</div>
                        <div class="info-num">{{days[(index*7 + 2)].aqi}}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div v-bind:class="days[(index*7 + 3)].itemDayClass">
                    <!--<div class="item-day is-level-4">-->
                      <div class="day-num">{{days[(index*7 + 3)].day.getDate() }}</div>
                      <div class="day-info"  v-if="days[(index*7 + 3)].aqi">
                        <div class="info-name">AQI</div>
                        <div class="info-num">{{days[(index*7 + 3)].aqi}}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div v-bind:class="days[(index*7 + 4)].itemDayClass">
                    <!--<div class="item-day is-level-5">-->
                      <div class="day-num">{{days[(index*7 + 4)].day.getDate() }}</div>
                      <div class="day-info" v-if="days[(index*7 + 4)].aqi">
                        <div class="info-name">AQI</div>
                        <div class="info-num">{{days[(index*7 + 4)].aqi}}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div v-bind:class="days[(index*7 + 5)].itemDayClass">
                    <!--<div class="item-day is-level-6">-->
                      <div class="day-num">{{days[(index*7 + 5)].day.getDate() }}</div>
                      <div class="day-info" v-if="days[(index*7 + 5)].aqi">
                        <div class="info-name">AQI</div>
                        <div class="info-num">{{days[(index*7 + 5)].aqi}}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div v-bind:class="days[(index*7 +6)].itemDayClass">
                    <!--<div class="item-day">-->
                      <div class="day-num">{{days[(index*7 + 6)].day.getDate() }}</div>
                        <div class="day-info" v-if="days[(index*7 + 6)].aqi">
                            <div class="info-name">AQI</div>
                            <div class="info-num">{{days[(index*7 + 6)].aqi}}</div>
                        </div>
                    </div>
                  </td>
                </tr>


              </table>
            </div>
          </div>
        </div>
        <div class="panel mt">
          <div class="panel-hd">
            <div class="panel-tit"><i class="icon icon-kongqi"></i><span>空气质量年统计(单位：天)</span></div>
          </div>
          <div class="panel-bd" style="height: 164px;">
            <div class="air-count">
              <div class="air-count-item">
                <div class="progress is-level-1">
                  <div class="progress-top">
                    <div class="pull-left">优</div>
                    <div class="pull-right">{{aDays}}</div>
                  </div>
                  <div class="progress-bar">
                    <!--<div class="progress-bar-inner" style="width: 30%"></div>-->
                    <div class="progress-bar-inner" :style="aRate"></div>
                  </div>
                </div>
              </div>
              <div class="air-count-item">
                <div class="progress is-level-2">
                  <div class="progress-top">
                    <div class="pull-left">良</div>
                    <div class="pull-right">{{bDays}}</div>
                  </div>
                  <div class="progress-bar">
                    <!--<div class="progress-bar-inner" style="width: 30%"></div>-->
                    <div class="progress-bar-inner" v-bind:style="bRate"></div>
                  </div>
                </div>
              </div>
              <div class="air-count-item">
                <div class="progress is-level-3">
                  <div class="progress-top">
                    <div class="pull-left">轻度污染</div>
                    <div class="pull-right">{{cDays}}</div>
                  </div>
                  <div class="progress-bar">
                    <!--<div class="progress-bar-inner" style="width: 30%"></div>-->
                    <div class="progress-bar-inner" v-bind:style="cRate"></div>
                  </div>
                </div>
              </div>
              <div class="air-count-item">
                <div class="progress is-level-4">
                  <div class="progress-top">
                    <div class="pull-left">中度污染</div>
                    <div class="pull-right">{{dDays}}</div>
                  </div>
                  <div class="progress-bar">
                    <!--<div class="progress-bar-inner" style="width: 30%"></div>-->
                    <div class="progress-bar-inner" v-bind:style="dRate"></div>
                  </div>
                </div>
              </div>
              <div class="air-count-item">
                <div class="progress is-level-5">
                  <div class="progress-top">
                    <div class="pull-left">重度污染</div>
                    <div class="pull-right">{{eDays}}</div>
                  </div>
                  <div class="progress-bar">
                    <!--<div class="progress-bar-inner" style="width: 30%"></div>-->
                    <div class="progress-bar-inner" v-bind:style="eRate"></div>
                  </div>
                </div>
              </div>
              <div class="air-count-item">
                <div class="progress is-level-6">
                  <div class="progress-top">
                    <div class="pull-left">严重污染</div>
                    <div class="pull-right">{{fDays}}</div>
                  </div>
                  <div class="progress-bar">
                    <!--<div class="progress-bar-inner" style="width: 30%"></div>-->
                    <div class="progress-bar-inner" v-bind:style="fRate"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="panel">
          <div class="panel-hd">
            <div class="panel-tit"><i class="icon icon-kongqi"></i><span>空气质量排名</span></div>
            <div class="panel-date" style="width: 126px">
              <!--<div class="">-->
                <!--<input type="text" class="input" value="2019-06">-->
                <!--<i class="icon icon-down"></i>-->
                  <el-date-picker v-model="aqiRankingDateTime" type="date" placeholder="选择日期"
                                  style="width: 100%;height: 80%" @change="refresAqiRanking" value-format="yyyy-MM-dd">
                  </el-date-picker>
              <!--</div>-->
            </div>
          </div>
          <div class="panel-bd" style="height: 796px;">
            <div class="air-rank">
              <div class="rank-tit">
                <div class="pull-left">站点（AQI）</div>
                <div class="pull-right">首要污染物</div>
              </div>

              <div class="rank-item" v-for="item in aqiRankingList ">
                <div v-bind:class="item.aqiRankingClass">
                <!--<div class="progress is-level-6">-->
                  <div class="progress-top">
                    <div class="pull-left">
                      <span>{{item.regionNameOrSiteName}}</span>
                      <span>{{item.aqi}}</span>
                    </div>
                    <div class="pull-right">{{item.pollutant}}</div>
                  </div>
                  <div class="progress-bar">
                    <div class="progress-bar-inner" v-bind:style="item.aqiRate"></div>
                    <!--<div class="progress-bar-inner" styleyle="width: 40%"></div>-->
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import Echarts from 'echarts'
  // import {initChartOnline} from '../homePage/echartsUnit/ChartOnline'
  import getChartOnlineData from '../homePage/echartsUnit/ChartOnline'
  import getChartWrwData from '../homePage/echartsUnit/ChartWrw'
  import getRealTimeAqi from '../homePage/echartsUnit/GetRealTimeAQI'
  import getYearlyAqi from '../homePage/echartsUnit/GetYearlyAqi'
  import getAqiRanking from '../homePage/echartsUnit/GetAqiRanking'
  import getAqiCalendar from '../homePage/echartsUnit/GetAqiCalendar'
  import initElCascader from '../../common/unit/RegionElCascader'

    export default {
      name: "HomeHtml",
      data(){
        return{
          onlineNum: 0,
          offlineNum: 0,
          wrwDays:[80, 50, 90, 47, 98, 25,],
          aqiNum: 0,
          aqiType:null,
          pollutant:null,
          aDays: 0,
          bDays: 0,
          cDays: 0,
          dDays: 0,
          eDays: 0,
          fDays: 0,
          aRate: '0%',
          bRate: '0%',
          cRate: '0%',
          dRate: '0%',
          eRate: '0%',
          fRate: '0%',
          aqiRankingList:null,
            currentDay: 1,
            currentMonth: 1,
            currentYear: 1970,
            currentWeek: 1,
            days: [],
            aqis: [],
            fiveOrSix: 5,
            tableAqi: 'table-aqi',
            cascader_value: [],
            cascader_options: [],
            areaId: this.AppConfig.appInfo.regionId,
            aqiRankingDateTime: '',
            aqiCalendarDateTime: ''
        }
      },
      methods:{
          getAqiCalendarDateTime(){
              getAqiCalendar(this.areaId,this.aqiCalendarDateTime,this);
          },
        formatDate(year,month,day){
            var y = year;
            var m = month;
            if(m<10) m = "0" + m;
            var d = day;
            if(d<10) d = "0" + d;
            return y+"-"+m+"-"+d
        },
        formatAqiCalendarMonth(year,month) {
            var y = year;
            var m = month;
            if(m<10) m = "0" + m;
            return y+"-"+m
        },
          refresAqiRanking(){
              getAqiRanking(this.areaId,this.aqiRankingDateTime,this);
          },
          handleChange(value) {
              this.areaId = value[value.length-1];
              this.initPage();
          },
          initPage(){
              getChartOnlineData(this.areaId,this);
              getRealTimeAqi(this.areaId,this);
              // initChartOnline(Echarts,this.onlineNum, this.offlineNum);
              getChartWrwData(this.areaId,);
              getYearlyAqi(this.areaId,this);
              getAqiRanking(this.areaId,this.aqiRankingDateTime,this);
              // getAqiCalendar(this.areaId,'2019-07',this);
              getAqiCalendar(this.areaId,this.aqiCalendarDateTime,this);
          }
      },
      mounted() {
        this.$nextTick(function () {

            var date = new Date();
            this.aqiRankingDateTime = this.formatDate(date.getFullYear(),date.getMonth()+1,date.getDate()-1);
            this.aqiCalendarDateTime = this.formatAqiCalendarMonth(date.getFullYear(),date.getMonth()+1);

            initElCascader(this.areaId,this);
            getChartOnlineData(this.areaId,this);
            getRealTimeAqi(this.areaId,this);
            // initChartOnline(Echarts,this.onlineNum, this.offlineNum);
            getChartWrwData(this.areaId,);
            getYearlyAqi(this.areaId,this);
            getAqiRanking(this.areaId,this.aqiRankingDateTime,this);
            getAqiCalendar(this.areaId,this.aqiCalendarDateTime,this);
        })
      }
    }
</script>

<style scoped>

</style>
