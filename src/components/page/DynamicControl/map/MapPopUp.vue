<template>
  <div class="mymapdata" id="customPopUpDiv">
    <div class="label1">
      <div class="title_div">
        <div class="title_text">{{stationname}}</div>
        <div class="title_btn title_btn_active title_btn1" @click="title_toggle(0,$event)">实时数据</div>
        <div class="title_btn" @click="title_toggle(1,$event)">历史报警</div>
        <div class="title_btn" @click="title_toggle(2,$event)" id="cheng1">站点信息</div>
        <div class="close_btn" @click="closePopup">X</div>
      </div>
      <div class="context_div" v-show="realtime_show">
        <div>
          <tr>
            <td style='font-size: 14px;font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC","Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei",
            sans-serif;color: #b8bec4;'>数据时间&nbsp;</td>
            <td><span style="font-weight: 700;color:#ffffff;">{{kind_value_data.monitorTime}}</span></td>
          </tr>
        </div>
        <div style="width:100%;height:20px;" v-show="Whether_alarm">
          <div class="warm_par" style="width:130px;">
            报警参数&nbsp;
            <span style="font-weight: 700;color:#ffffff;">{{warm_realtime.alarmParam}}</span>
          </div>
          <div class="warm_kind_title">报警类别</div>
          <div class="warm_kind">{{warm_realtime.alarmType}}</div>
        </div>
        <div class="kind_value_div">
          <div class="kind_value_sondiv class1">
            <div class="kind_value_title">AQI</div>
            <div class="kind_value_data">
              <span
                :style="{'color': kind_value_data.AQI_color,'font-family': 'Oswald','font-weight': 'bolder'}"
              >{{kind_value_data.AQI_value}}</span>
            </div>
          </div>
          <div class="kind_value_sondiv class2">
            <div class="kind_value_title">PM2.5</div>
            <div class="kind_value_data">
              <span
                :style="{'color': kind_value_data.PM25_color,'font-family': 'Oswald','font-weight': 'bolder'}"
              >{{kind_value_data.PM25_value}}</span>&nbsp;ug/m³
            </div>
          </div>
          <div class="kind_value_sondiv class6">
            <div class="kind_value_title">CO</div>
            <div class="kind_value_data">
              <span
                :style="{'color': kind_value_data.CO_color,'font-family': 'Oswald','font-weight': 'bolder'}"
              >{{kind_value_data.CO_value}}</span>&nbsp;ug/m³
            </div>
          </div>
          <div class="kind_value_sondiv class3">
            <div class="kind_value_title">PM10</div>
            <div class="kind_value_data">
              <span
                :style="{'color': kind_value_data.PM10_color,'font-family': 'Oswald','font-weight': 'bolder'}"
              >{{kind_value_data.PM10_value}}</span>&nbsp;ug/m³
            </div>
          </div>
          <div class="kind_value_sondiv class4">
            <div class="kind_value_title">SO2</div>
            <div class="kind_value_data">
              <span
                :style="{'color': kind_value_data.SO2_color,'font-family': 'Oswald','font-weight': 'bolder'}"
              >{{kind_value_data.SO2_value}}</span>&nbsp;ug/m³
            </div>
          </div>
          <div class="kind_value_sondiv class5">
            <div class="kind_value_title">NO2</div>
            <div class="kind_value_data">
              <span
                :style="{'color': kind_value_data.NO2_color,'font-family': 'Oswald','font-weight': 'bolder'}"
              >{{kind_value_data.NO2_value}}</span>&nbsp;ug/m³
            </div>
          </div>
          <div class="kind_value_sondiv class7">
            <div class="kind_value_title">O3</div>
            <div class="kind_value_data">
              <span
                :style="{'color': kind_value_data.O3_color,'font-family': 'Oswald','font-weight': 'bolder'}"
              >{{kind_value_data.O3_value}}</span>&nbsp;ug/m³
            </div>
          </div>
          <div class="kind_value_sondiv class8" style="display:none;">
            <div class="kind_value_title">TSP</div>
            <div class="kind_value_data">
              <span
                :style="{'color': kind_value_data.TSP_color,'font-family': 'Oswald','font-weight': 'bolder'}"
              >{{kind_value_data.TSP_value}}</span>&nbsp;ug/m³
            </div>
          </div>
        </div>
        <div class="pollution_select_div">
          <div style="float:right;">
            <el-select v-model="exhaust_select" placeholder="请选择" @change="Pollution_trend_select">
              <el-option
                v-for="item in exhaust"
                :key="item.pkId"
                :label="item.name"
                :value="item.pollutantcode"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div id="popu_line_chart" v-show="chart1_show"></div>
        <div id="popu_line_chart2" v-show="chart2_show"></div>
        <div class="popu_chart_btn_div">
          <div
            class="popu_chart_btn  class1"
            @click="popu_linechart('aqi',$event)"
          >AQI</div>
          <div class="popu_chart_btn class2" @click="popu_linechart('pm25',$event)">PM2.5</div>
          <div class="popu_chart_btn class3" @click="popu_linechart('pm10',$event)">PM10</div>
          <div class="popu_chart_btn class4" @click="popu_linechart('so2',$event)">SO2</div>
          <div class="popu_chart_btn class5" @click="popu_linechart('no2',$event)">NO2</div>
          <div class="popu_chart_btn class6" @click="popu_linechart('co',$event)">CO</div>
          <div class="popu_chart_btn class7" @click="popu_linechart('o3',$event)">O3</div>
          <div class="popu_chart_btn class8" @click="popu_linechart('TSP',$event)">TSP</div>
        </div>
      </div>
      <div class="context_div warm_his_table" style="overflow:auto;" v-show="warm_his_show">
        <div style="width:100%;height:30px;">
          <div class="table_title" style="width:105px;padding-left: 20px;">时间</div>
          <div class="table_title" style="width:70px;">参数</div>
          <div class="table_title" style="width:115px;">类型</div>
          <div class="table_title" style="width:85px;">浓度值</div>
        </div>
        <div style="width:100%;height:45px;" v-for="(item,i) in warm_his">
          <div v-if="i%2 ==0">
            <div v-if="item.time=='-'">
              <div class="table_time2" style="background-color:#182739;">{{item.time}}</div>
            </div>
            <div v-else>
              <div class="table_time" style="background-color:#182739;">{{item.time}}</div>
            </div>
            <div class="table_param" style="background-color:#182739;">{{item.param}}</div>
            <div class="table_type" style="background-color:#182739;">
              <div v-if="item.type=='-'">
                <div class="table_time2">{{item.type}}</div>
              </div>
              <div v-else>
                <div class="table_type_in" :title="item.type_title">{{item.type}}</div>
              </div>
            </div>
            <div class="table_value" style="background-color:#182739;">{{item.value}}</div>
          </div>
          <div v-else>
            <div class="table_time">{{item.time}}</div>
            <div class="table_param">{{item.param}}</div>
            <div class="table_type">
              <div class="table_type_in">{{item.type}}</div>
            </div>
            <div class="table_value">{{item.value}}</div>
          </div>
        </div>
      </div>
      <div class="context_div" v-show="station_info_show">
        <div style="width:100%;height:20px;">
          <div class="stinfo_title" style="width:100px;">
            类型&nbsp;&nbsp;
            <span style="color:#fff;">{{stationTypeName}}</span>
          </div>
          <div class="stinfo_title">
            所属网络&nbsp;&nbsp;
            <span style="color:#fff;">{{station_info.gridName}}</span>
          </div>
        </div>
        <div class="station_table_div">
          <div style="width:100%;margin-bottom:4px;" v-for="item in station_info.devices">
            <div style="width:100%;height:30px;background-color:#182739;">
              <div class="stinfo_name">设备名称</div>
              <div class="stinfo_value">{{item.deviceName}}</div>
            </div>
            <div style="width:100%;height:30px;">
              <div class="stinfo_name">设备型号</div>
              <div class="stinfo_value">{{item.deviceType}}</div>
            </div>
            <div style="width:100%;height:30px;background-color:#182739;">
              <div class="stinfo_name">厂家</div>
              <div class="stinfo_value">{{item.manufacturer}}</div>
            </div>
            <div style="width:100%;height:30px;">
              <div class="stinfo_name">使用年份</div>
              <div class="stinfo_value">{{item.useYear}}</div>
            </div>
            <div style="width:100%;height:30px;background-color:#182739;">
              <div class="stinfo_name">测量方法</div>
              <div class="stinfo_value">{{item.principle}}</div>
            </div>
          </div>
        </div>
      </div>
      <div style="height: 20px"></div>
      <div style="width:330px;height:30px;margin:10px auto;">
        <tr>
          <td><div class="bottom_btn" @click="from_show('0',$event)">发起排查</div></td>
          <td><div class="bottom_btn" @click="from_show('1',$event)">发起管控</div></td>
          <td><div class="bottom_btn" @click="close_warm()">关闭警报</div></td>
        </tr>
      </div>
    </div>
    <div class="wuran_event">
      <div class="popup_from_close" @click="closePopup">X</div>
      <div class="from_div">
        <div class="from_kuang">
          <div class="hang_div">
            <div class="title">上报时间：</div>
            <div class="content_pop4">{{Pollution_incident.createTime}}</div>
          </div>
          <div class="hang_div">
            <div class="title">事件类型：</div>
            <div class="content_pop4">{{Pollution_incident.problemTypeName}}</div>
          </div>
          <div class="hang_div">
            <div class="title">事件描述：</div>
            <div class="content_pop4">{{Pollution_incident.eventDescName}}</div>
          </div>
          <div class="hang_div">
            <div class="title">处理建议：</div>
            <div class="content_pop4">{{Pollution_incident.remark}}</div>
          </div>
          <div class="hang_div">
            <div class="title">上报人员：</div>
            <div class="content_pop4">{{Pollution_incident.username}}</div>
          </div>
          <div class="hang_div">
            <div class="title">责任网络：</div>
            <div class="content_pop4">{{Pollution_incident.gridName}}</div>
          </div>
          <div class="hang_div">
            <div class="title">处理状态：</div>
            <div class="content_pop4">{{Pollution_incident.status}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="popup_from_div" v-show="paicha_show" id="paicha_div">
      <div style="float:left;width:100%;height:40px;">
        <div class="popup_from_title">发起排查</div>
        <div class="popup_from_close" @click="close_paicha">X</div>
      </div>
      <div class="popup_from_kuang">
        <!-- <div style="wdith:100%;height:33.6px;">
          <div
            class="paicha_title"
            style="float: left;width: 60px;padding: 8px 3px;height:33.6px;line-height:18px;"
          >任务类型</div>
          <div
            class="piancha_context"
            style="float: left;width: 60px;padding: 8px 3px;height:33.6px;color: #F8C900;"
          >排查</div>
        </div>-->
        <el-form ref="form" :model="paicha_data" label-width="60px">
          <el-form-item label="排查对象" v-show="event_duixiang_show">
            <el-select v-model="paicha_data.addressIds" multiple placeholder="请选择排查对象">
              <el-option
                v-for="item in ContaminantList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="任务名称">
            <el-input v-model="paicha_data.taskName"></el-input>
          </el-form-item>
          <el-form-item label="任务说明" class="renwushuoming"></el-form-item>
          <el-input
            type="textarea"
            v-model="paicha_data.taskExplain"
            maxlength="80"
            show-word-limit
          ></el-input>
          <el-form-item label="截止时间">
            <el-date-picker
              type="datetime"
              placeholder="选择日期"
              v-model="paicha_data.completeDate"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
          <div class="paicha_btn">
            <el-button type="primary" @click="paicha_Submit">发送</el-button>
          </div>
        </el-form>
      </div>
    </div>
    <div class="popup_from_div" style="height:420px;" v-show="guankong_show" id="guankong_div">
      <div style="float:left;width:100%;height:40px;">
        <div class="popup_from_title">发起管控</div>
        <div class="popup_from_close" @click="close_guankong">X</div>
      </div>
      <div class="popup_from_kuang">
        <!-- <div style="wdith:100%;height:33.6px;">
          <div
            class="paicha_title"
            style="float: left;width: 60px;padding: 8px 3px;height:33.6px;line-height:18px;"
          >任务类型</div>
          <div
            class="piancha_context"
            style="float: left;width: 60px;padding: 8px 3px;height:33.6px;color: #F8C900;"
          >管控</div>
        </div>-->
        <el-form ref="form" :model="guankong_data" label-width="60px">
          <el-form-item label="整改措施">
            <el-select v-model="guankong_data.measure" placeholder="请选择措施">
              <el-option
                v-for="item in MeasureList"
                :key="item.measureName"
                :label="item.measureName"
                :value="item.measureName"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="整改对象" v-show="event_duixiang_show">
            <el-select v-model="guankong_data.addressIds" multiple placeholder="请选择整改对象">
              <el-option
                v-for="item in ContaminantList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="整改要求" class="renwushuoming"></el-form-item>
          <el-input
            type="textarea"
            v-model="guankong_data.taskExplain"
            maxlength="80"
            show-word-limit
          ></el-input>
          <el-form-item label="责任部门">
            <el-select v-model="guankong_data.unitList" multiple placeholder="请选择部门">
              <el-option
                v-for="item in DepartmentList"
                :key="item.deptId"
                :label="item.deptName"
                :value="item.deptId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="截止时间">
            <el-date-picker
              type="datetime"
              placeholder="选择日期"
              v-model="guankong_data.completeDate"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
          <div class="paicha_btn">
            <el-button type="primary" @click="guankong_Submit">发送</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { loadModules } from "esri-loader";
import AirInfoImpl from "./mapjs/AirInfoImpl";
import { dataRequestUrl, mapExtent } from "./mapjs/AppConfig";
import echarts from "echarts";
import $ from "jquery";
import axios from "axios";
export default {
  name: "MapPopUp",
  data() {
    return {
      stationId: 0, //站点号
      stationType: 0, //站点类型编号

      realtime_show: true, //实时数据显示
      warm_his_show: false, //报警历史显示
      station_info_show: false, //站点信息显示
      paicha_show: false, //排查面板显示
      guankong_show: false, //管控面板显示
      Whether_alarm: false, //判定是否显示报警部分内容
      event_duixiang_show: true, //排查和管控对象选择
      chart1_show: true,
      chart2_show: false,

      stationname: "未知", //站点名
      stationTypeName: "未知", //站点类型名称
      station_info: {}, //站点信息
      warm_realtime: {
        //实时报警信息
        stationId: "",
        alarmId: "",
        alarmParam: "无",
        alarmType: "无"
      },
      warm_his: [
        //历史报警数据
      ],
      today_trend_orig: [], //今日趋势原始数据
      today_trend_data: {
        //今日趋势处理后数据
        kind: "",
        time: ["00:00", "00:00"],
        data: [0, 0]
      }, //今日趋势编辑后数据
      today_trend_data_manay: {
        time: ["00:00", "00:00"],
        data: [
          {
            name: "未知",
            type: "line",
            data: [0]
          }
        ]
      },
      ContaminantList: [], //污染物列表
      DepartmentList: [], //部门列表
      MeasureList: [], //整改措施列表
      paicha_data: {
        //排查表单数据
        taskExplain: "", //任务说明
        unitList: [], //
        completeDate: "", //完成时间
        createUserId: null, //创建人
        addressId: null, //
        alarmId: null, //警报ID
        taskSource: 2, //任务来源
        addressIds: [], //污染源ID列表
        taskId: "", //
        taskName: "" //任务名称
      },
      kind_value_data: {
        AQI_value: "-",
        AQI_color: "#fff",
        PM25_value: "-",
        PM25_color: "#fff",
        CO_value: "-",
        CO_color: "#fff",
        PM10_value: "-",
        PM10_color: "#fff",
        SO2_value: "-",
        SO2_color: "#fff",
        NO2_value: "-",
        NO2_color: "#fff",
        O3_value: "-",
        O3_color: "#fff",
        TSP_value: "-",
        TSP_color: "#fff",
        monitorTime:''
      },
      guankong_data: {
        //管控表单数据
        taskExplain: "", //任务说明
        measure: "", //整改措施说明
        unitList: [], //下派部门id集合
        completeDate: "", //完成时间
        createUserId: null, //创建人
        addressId: null, //污染源id
        alarmId: null, //警报ID
        taskSource: 2, //任务来源
        addressIds: [], //污染源ID列表
        taskId: null, //排查任务id
        taskName: null //任务名称
      },

      Pollution_incident: {
        createTime: "",
        eventDescName: "",
        gridName: "",
        problemTypeName: "",
        remark: "",
        status: "",
        username: ""
      },
      exhaust_select: "",
      exhaust: [
        {
          pkId: "",
          fkPollutanttypeid: "",
          pollutantcode: "",
          pollutantname: "",
          ispollutant: "",
          unit: "",
          overtype: null,
          overupperstand: null,
          overlowerstand: null,
          serial: null,
          decimalpoint: "",
          isused: ""
        }
      ] //污染物种类
    };
  },
  created: function() {},
  mounted: function() {
    let cVue = this;
    this.line_chart_init();
  },
  computed: {
    myPointLayer() {
      return this.$store.state.map;
    }
  },
  watch: {
    myPointLayer: function() {
      let cVue = this;
      cVue.popup_init();
    }
  },
  methods: {
    //切换模块后重新连接弹出窗口事件
    popup_init: function() {
      let stationtypeobj = this.$store.state.stationtype;
      let cVue = this;
      if (cVue.$store.state.mapview != null) {
        cVue.$store.state.mapview.on("click", function(event) {
          cVue.$store.state.mapview.hitTest(event).then(function(response) {
            if (response.results.length) {
              var graphic = response.results[0].graphic;
              let curGraphicAttribute = graphic.attributes;
              //点击空白区，只有OBJECTID属性
              //debugger;
              if(curGraphicAttribute && curGraphicAttribute.stationTypeId){

                  if (cVue.ContaminantList.length == 0) {
                    cVue.getContaminantList(); //获取污染物列表
                  }
                  if (cVue.DepartmentList.length == 0) {
                    cVue.getDepartmentList(); //获取部门列表
                  }
                  if (cVue.MeasureList.length == 0) {
                    cVue.getMeasureList(); //获取整改措施列表
                  }

                  cVue.stationId = graphic.attributes.stationId;
                  cVue.stationTypeId = graphic.attributes.stationTypeId;
                  cVue.stationType = graphic.attributes.stationTypeId;

                  // let text ="站点编号：" +graphic.attributes.stationId +"，站点类型：" +cVue.stationTypeId;
                  if (
                    cVue.stationTypeId == stationtypeobj.guokong ||
                    cVue.stationTypeId == stationtypeobj.shengkong ||
                    cVue.stationTypeId == stationtypeobj.shikong ||
                    cVue.stationTypeId == stationtypeobj.weixing
                  ) {
                    $(".label1").css("display", "block");
                    $(".wuran_event").css("display", "none");

                    $("#cheng1").html("站点信息");

                    $(".kind_value_div").css("display", "block");
                    $(".pollution_select_div").css("display", "none");
                    $(".popu_chart_btn_div").css("display", "block");

                    $(".popu_chart_btn").css("display", "block");
                    $(".kind_value_sondiv").css("display", "block");
                    $(".class8").css("display", "none");
                    $(".popu_chart_btn").removeClass("popu_chart_btn_active");
                    $(".class1").addClass("popu_chart_btn_active");

                    $("#paicha_div").css("height", "380px");
                    $("#guankong_div").css("height", "420px");
                  } else if (cVue.stationTypeId == stationtypeobj.wanranyuan) {
                    $(".label1").css("display", "block");
                    $(".wuran_event").css("display", "none");

                    $("#cheng1").html("污染源信息");

                    $(".kind_value_div").css("display", "none");
                    $(".pollution_select_div").css("display", "block");
                    $(".popu_chart_btn_div").css("display", "none");

                    $("#paicha_div").css("height", "325px");
                    $("#guankong_div").css("height", "380px");
                  } else if (cVue.stationTypeId == stationtypeobj.yangchen) {
                    $(".label1").css("display", "block");
                    $(".wuran_event").css("display", "none");

                    $("#cheng1").html("扬尘信息");

                    $(".kind_value_div").css("display", "block");
                    $(".pollution_select_div").css("display", "none");
                    $(".popu_chart_btn_div").css("display", "block");

                    $(".popu_chart_btn").css("display", "none");
                    $(".kind_value_sondiv").css("display", "none");
                    $(".class2").css("display", "block");
                    $(".class3").css("display", "block");
                    $(".class8").css("display", "block");
                    $(".popu_chart_btn").removeClass("popu_chart_btn_active");
                    $(".class2").addClass("popu_chart_btn_active");

                    $("#paicha_div").css("height", "380px");
                    $("#guankong_div").css("height", "420px");
                  } else if (
                    cVue.stationTypeId == cVue.$store.state.wrsjTempTypeId
                  ) {
                    $(".wuran_event").css("display", "block");
                    $(".label1").css("display", "none");
                    cVue.Pollution_incident = graphic.attributes;
                  }
                  //监听地图点击的点
                  cVue.$store.state.mapview.popup.clear();
                  cVue.$store.state.mapview.popup.visible = false;
                  cVue.selectedGraphic = graphic;
                  let geo = graphic.geometry;
                  cVue.longitude = geo.longitude;
                  cVue.latitude = geo.latitude;
                  cVue.$store.state.popupPoint =
                    cVue.stationId + "," + cVue.longitude + "," + cVue.latitude;
                  // if (cVue.stationTypeId != null && cVue.stationTypeId != "") {
                  cVue.map_click(cVue.stationId, cVue.stationTypeId);
                  // }
                  //监听地图缩放
                  cVue.$store.state.mapview.watch("extent", newValue => {
                    if (cVue.$store.state.popupPoint) {
                      cVue.resetPopUpPositon();
                    }
                  });
                
              }
            }
          });
        });
      }
    },
    closePopup: function() {
      this.Whether_alarm = false;
      this.paicha_show = false;
      this.guankong_show = false;
      let mymapdataDiv = document.getElementById("popUpDiv");
      mymapdataDiv.style.display = "none";
      // mymapdataDiv.classList.add("hide");
    },
    //弹窗加载获取数据总函数
    loadPopupData: function(stationid, stationtype) {
      this.realtime_show = true;
      this.warm_his_show = false;
      this.station_info_show = false;
      $(".title_btn").removeClass("title_btn_active");
      $(".title_btn1").addClass("title_btn_active");

      let cVue = this;
      cVue.line_chart_init();
      let stationtypeobj = this.$store.state.stationtype;

      if (stationtype == stationtypeobj.wanranyuan) {
        this.getstation_info(stationid, stationtype); //获取站点信息
        this.getexhaust(); //获取污染排气口相关数据
        this.getstation_warm_realtime(stationid); //获取站点实时报警信息
        this.getstation_warm_history(stationid); //获取站点历史报警数据
      } else {
        this.getstation_info(stationid, stationtype); //获取站点信息
        this.gettoday_trend(stationid, stationtype); //获取站点今日趋势数据
        this.getstation_warm_realtime(stationid); //获取站点实时报警信息
        this.getstation_warm_history(stationid); //获取站点历史报警数据
      }
    },
    //排查表单关闭函数
    close_paicha: function() {
      this.paicha_show = false;
      $(".bottom_btn").removeClass("bottom_btn_active");
      this.paicha_data.addressIds = [];
      this.paicha_data.taskName = "";
      this.paicha_data.taskExplain = "";
      this.paicha_data.completeDate = "";
    },
    //管控表单关闭函数
    close_guankong: function() {
      this.guankong_show = false;
      $(".bottom_btn").removeClass("bottom_btn_active");
      this.guankong_data.addressIds = [];
      this.guankong_data.unitList = [];
      this.guankong_data.taskExplain = "";
      this.guankong_data.completeDate = "";
      this.guankong_data.measure = "";
    },
    //关闭警报
    close_warm: function() {
      if (this.warm_realtime.alarmId != "") {
        let url = dataRequestUrl.options.stationListInfo.close_warm;
        let mydata = { id: this.warm_realtime.alarmId };
        AirInfoImpl.close_warm(url, mydata);
      } else {
        this.$message({
          message: "该站点没有报警！",
          type: "warning"
        });
      }
    },
    //排查信息提交
    paicha_Submit: function() {
      // let mydata=this.paicha_data;
      // console.log(JSON.stringify(mydata));
      let url = dataRequestUrl.options.stationListInfo.sendstation_paicha;
      let cVue = this;
      AirInfoImpl.sendstationinfo(
        url,
        this.paicha_data,
        cVue.deal_paicha_Submit,
        "paicha"
      );
    },
    //排查信息提交后数据处理
    deal_paicha_Submit: function(data) {
      if (data.code == 0) {
        this.$message({
          message: "排查信息提交成功！",
          type: "success"
        });
        this.paicha_data.addressIds = [];
        this.paicha_data.taskName = "";
        this.paicha_data.taskExplain = "";
        this.paicha_data.completeDate = "";
      } else {
        this.$message({
          dangerouslyUseHTMLString: true,
          message: "排查信息提交失败！<br/>原因：" + data.mydata,
          type: "warning"
        });
      }
    },
    //管控信息提交
    guankong_Submit: function() {
      let url = dataRequestUrl.options.stationListInfo.sendstation_guankong;
      let cVue = this;
      AirInfoImpl.sendstationinfo(
        url,
        this.guankong_data,
        cVue.deal_guankong_Submit,
        "guankong"
      );
    },
    //处理管控信息
    deal_guankong_Submit: function(data) {
      if (data.code == 0) {
        this.$message({
          message: "管控信息提交成功！",
          type: "success"
        });
        this.guankong_data.addressIds = [];
        this.guankong_data.unitList = [];
        this.guankong_data.taskExplain = "";
        this.guankong_data.completeDate = "";
        this.guankong_data.measure = "";
      } else {
        this.$message({
          dangerouslyUseHTMLString: true,
          message: "管控信息提交失败！<br/>原因：" + data.mydata,
          type: "warning"
        });
      }
    },
    //弹出框主菜单切换
    title_toggle: function(num, e) {
      switch (num) {
        case 0:
          this.realtime_show = true;
          this.warm_his_show = false;
          this.station_info_show = false;
          break;
        case 1:
          this.realtime_show = false;
          this.warm_his_show = true;
          this.station_info_show = false;
          break;
        case 2:
          this.realtime_show = false;
          this.warm_his_show = false;
          this.station_info_show = true;
          break;
      }
      $(".title_btn").removeClass("title_btn_active");
      var mydom = $(e.srcElement);
      mydom.addClass("title_btn_active");
    },
    //发起的事件切换
    from_show: function(text, e) {
      if (text == "0") {
        this.paicha_show = true; //排查面板显示
        this.guankong_show = false; //管控面板显示
        if (this.stationType == this.$store.state.stationtype.wanranyuan) {
          this.event_duixiang_show = false;
          this.paicha_data.addressIds = [this.stationId];
        } else {
          this.event_duixiang_show = true;
          this.paicha_data.addressIds = [];
        }

        $(".bottom_btn").removeClass("bottom_btn_active");
        var mydom = $(e.srcElement);
        mydom.addClass("bottom_btn_active");
      } else {
        this.paicha_show = false;
        this.guankong_show = true;
        if (this.stationType == this.$store.state.stationtype.wanranyuan) {
          this.event_duixiang_show = false;
          this.guankong_data.addressIds = [this.stationId];
        } else {
          this.event_duixiang_show = true;
          this.guankong_data.addressIds = [];
        }

        $(".bottom_btn").removeClass("bottom_btn_active");
        var mydom = $(e.srcElement);
        mydom.addClass("bottom_btn_active");
      }
    },
    //获取污染物列表
    getContaminantList: function() {
      let url = dataRequestUrl.options.stationListInfo.getContaminantList;
      let parameter = { areaCode: "" };
      let cVue = this;
      let mydata = AirInfoImpl.getpopularData(
        url,
        parameter,
        cVue.dealContaminantList
      );
    },
    //污染物列表数据处理
    dealContaminantList: function(data) {
      this.ContaminantList = [];
      for (let i = 0; i < data.length; i++) {
        this.ContaminantList[i] = new Object();
        this.ContaminantList[i].name = data[i].stationName;
        this.ContaminantList[i].id = data[i].stationId;
      }
    },
    //获取排气口种类
    getexhaust: function(id) {
      let url = dataRequestUrl.options.stationListInfo.getexhaust;
      let parameter = { stationId: id };
      let cVue = this;
      let mydata = AirInfoImpl.getpopularData_nostatue(
        url,
        parameter,
        cVue.dealexhaust
      );
    },
    //处理污染源数据种类
    dealexhaust: function(data) {
      this.exhaust = data;
      let cVue = this;
      if (data.length > 0) {
        this.exhaust_select = data[0].id;
        this.gettoday_trend(cVue.stationId, cVue.stationType);
      }
    },
    //获取部门列表
    getDepartmentList: function() {
      let url = dataRequestUrl.options.stationListInfo.getDepartmentList;
      let cVue = this;
      AirInfoImpl.getpopularData8098(url, null, cVue.dealDepartmentList);
    },
    //处理部门列表数据
    dealDepartmentList: function(data) {
      this.DepartmentList = data;
    },
    //获取整改措施列表
    getMeasureList: function() {
      let url = dataRequestUrl.options.stationListInfo.getMeasureList;
      let parameter = {};
      let cVue = this;
      let mydata = AirInfoImpl.getpopularData(
        url,
        parameter,
        cVue.dealMeasureList
      );
    },
    //处理整改措施列表
    dealMeasureList: function(data) {
      this.MeasureList = data;
    },
    //获取站点详情数据
    getstation_info: function(stationid, stationtype) {
      let stationtypeobj = this.$store.state.stationtype;
      let url = "";
      let mytype = stationtype.toString();
      switch (mytype) {
        case stationtypeobj.guokong:
          url = dataRequestUrl.options.stationListInfo.getStation_info_guokong;
          break;
        case stationtypeobj.shengkong:
          url = dataRequestUrl.options.stationListInfo.getStation_info_guokong;
          break;
        case stationtypeobj.shikong:
          url = dataRequestUrl.options.stationListInfo.getStation_info_guokong;
          break;
        case stationtypeobj.weixing:
          url = dataRequestUrl.options.stationListInfo.getStation_info_guokong;
          break;
        case stationtypeobj.wanranyuan:
          url =
            dataRequestUrl.options.stationListInfo.getStation_info_wuranyuan;
          break;
        case stationtypeobj.yangchen:
          url = dataRequestUrl.options.stationListInfo.getStation_info_yangchen;
          break;
      }
      let parameter = { id: stationid };
      let cVue = this;
      let mydata = AirInfoImpl.getpopularData_realtime(
        url,
        parameter,
        cVue.dealstation_info
      );
    },
    //站点详情数据处理
    dealstation_info: function(data, realdata) {
      if (data.stationName.length <= 6) {
        this.stationname = data.stationName;
      } else {
        this.stationname = data.stationName.substring(0, 6) + "...";
      }
      this.kind_value_data = {
        AQI_value: "-",
        AQI_color: "#fff",
        PM25_value: "-",
        PM25_color: "#fff",
        CO_value: "-",
        CO_color: "#fff",
        PM10_value: "-",
        PM10_color: "#fff",
        SO2_value: "-",
        SO2_color: "#fff",
        NO2_value: "-",
        NO2_color: "#fff",
        O3_value: "-",
        O3_color: "#fff",
        TSP_value: "-",
        TSP_color: "#fff",
        monitorTime:''
      };
      this.stationTypeName = data.stationType;
      if (data.devices == null || data.devices == [] || data.devices == "") {
        this.station_info = {
          stationId: "-",
          stationName: "-",
          stationType: "-",
          gridName: "-",
          devices: [
            {
              deviceName: "-",
              deviceType: "-",
              manufacturer: "-",
              useYear: "-",
              principle: "-"
            }
          ]
        };
      } else {
        this.station_info = data;
      }
      //实时要素数据获取
      //测试数据
      // realdata={"aqi": "39","pm25": "18.320","pm10": "39.700","no2": "10.900","co": "0.070","so2": "61.480","o3": "45.230", "tsp": "12"};
      let range = dataRequestUrl.options.airLevelInfo;
      let color = [
        "#46C96F",
        "#F8C900",
        "#F19D38",
        "#EA3522",
        "#8B2293",
        "#8E1C10"
      ];
      if(realdata!=null){
        if (realdata.aqi != null) {
          let mydata = parseFloat(realdata.aqi).toFixed(0);
          this.kind_value_data.AQI_value = mydata;
          let kind_range = range.aqi;
          for (let i = 0; i < kind_range.length; i++) {
            if (mydata >= kind_range[i][0] && mydata < kind_range[i][1]) {
              this.kind_value_data.AQI_color = color[i];
              break;
            }
          }
        } else {
          this.kind_value_data.AQI_value = "-";
          this.kind_value_data.AQI_color = "#fff";
        }

        if (realdata.pm25 != null) {
          let mydata = parseFloat(realdata.pm25).toFixed(0);
          this.kind_value_data.PM25_value = mydata;
          let kind_range = range.pm25;
          for (let i = 0; i < kind_range.length; i++) {
            if (mydata >= kind_range[i][0] && mydata < kind_range[i][1]) {
              this.kind_value_data.PM25_color = color[i];
              break;
            }
          }
        } else {
          this.kind_value_data.PM25_value = "-";
          this.kind_value_data.PM25_color = "#fff";
        }

        if (realdata.pm10 != null) {
          let mydata = parseFloat(realdata.pm10).toFixed(0);
          this.kind_value_data.PM10_value = mydata;
          let kind_range = range.pm10;
          for (let i = 0; i < kind_range.length; i++) {
            if (mydata >= kind_range[i][0] && mydata < kind_range[i][1]) {
              this.kind_value_data.PM10_color = color[i];
              break;
            }
          }
        } else {
          this.kind_value_data.PM10_value = "-";
          this.kind_value_data.PM10_color = "#fff";
        }

        if (realdata.no2 != null) {
          let mydata = parseFloat(realdata.no2).toFixed(0);
          this.kind_value_data.NO2_value = mydata;
          let kind_range = range.no2;
          for (let i = 0; i < kind_range.length; i++) {
            if (mydata >= kind_range[i][0] && mydata < kind_range[i][1]) {
              this.kind_value_data.NO2_color = color[i];
              break;
            }
          }
        } else {
          this.kind_value_data.NO2_value = "-";
          this.kind_value_data.NO2_color = "#fff";
        }

        if (realdata.co != null) {
          let mydata = parseFloat(realdata.co).toFixed(0);
          this.kind_value_data.CO_value = mydata;
          let kind_range = range.co;
          for (let i = 0; i < kind_range.length; i++) {
            if (mydata >= kind_range[i][0] && mydata < kind_range[i][1]) {
              this.kind_value_data.CO_color = color[i];
              break;
            }
          }
        } else {
          this.kind_value_data.CO_value = "-";
          this.kind_value_data.CO_color = "#fff";
        }

        if (realdata.so2 != null) {
          let mydata = parseFloat(realdata.so2).toFixed(0);
          this.kind_value_data.SO2_value = mydata;
          let kind_range = range.so2;
          for (let i = 0; i < kind_range.length; i++) {
            if (mydata >= kind_range[i][0] && mydata < kind_range[i][1]) {
              this.kind_value_data.SO2_color = color[i];
              break;
            }
          }
        } else {
          this.kind_value_data.SO2_value = "-";
          this.kind_value_data.SO2_color = "#fff";
        }

        if (realdata.o3 != null) {
          let mydata = parseFloat(realdata.o3).toFixed(0);
          this.kind_value_data.O3_value = mydata;
          let kind_range = range.o3;
          for (let i = 0; i < kind_range.length; i++) {
            if (mydata >= kind_range[i][0] && mydata < kind_range[i][1]) {
              this.kind_value_data.O3_color = color[i];
              break;
            }
          }
        } else {
          this.kind_value_data.O3_value = "-";
          this.kind_value_data.O3_color = "#fff";
        }

        if (realdata.tsp != null) {
          let mydata = parseFloat(realdata.tsp).toFixed(0);
          this.kind_value_data.TSP_value = mydata;
          let kind_range = range.tsp;
          for (let i = 0; i < kind_range.length; i++) {
            if (mydata >= kind_range[i][0] && mydata < kind_range[i][1]) {
              this.kind_value_data.TSP_color = color[i];
              break;
            }
          }
        } else {
          this.kind_value_data.TSP_value = "-";
          this.kind_value_data.TSP_color = "#fff";
        }
        if(realdata.monitorTime!=null){
          this.kind_value_data.monitorTime= realdata.monitorTime;
        }
      }
      
      // console.log(this.kind_value_data);
    },
    //获取站点实时报警信息
    getstation_warm_realtime: function(stationid) {
      let url = dataRequestUrl.options.stationListInfo.getStation_warm_realtime;
      let parameter = { stationId: stationid };
      let cVue = this;
      let mydata = AirInfoImpl.getpopularData(
        url,
        parameter,
        cVue.dealstation_warm_realtime
      );
    },
    //站点实时报警信息处理
    dealstation_warm_realtime: function(data) {
      if (data != null && data != "" && data != []) {
        this.warm_realtime = data;
        this.paicha_data.alarmId = data.alarmId;
        this.guankong_data.alarmId = data.alarmId;
      } else {
        this.warm_realtime = {
          stationId: "",
          alarmId: "",
          alarmParam: "无",
          alarmType: "无"
        };
      }
    },
    //获取站点历史报警信息
    getstation_warm_history: function(stationid) {
      let url = dataRequestUrl.options.stationListInfo.getStation_warm_history;
      let parameter = { stationId: stationid };
      let cVue = this;
      let mydata = AirInfoImpl.getpopularData(
        url,
        parameter,
        cVue.dealstation_warm_history
      );
    },
    //站点历史报警信息处理
    dealstation_warm_history: function(data) {
      this.warm_his = [];
      if (data != "" && data != null && data != []) {
        this.warm_his = [];
        for (let i = 0; i < data.length; i++) {
          this.warm_his[i] = new Object();
          if (data[i].time == null) {
            this.warm_his[i].time = "-";
          } else {
            this.warm_his[i].time =
              data[i].time.substring(0, 10) +
              " " +
              data[i].time.substring(11, 19);
          }
          if (data[i].param == null) {
            this.warm_his[i].param = "  -";
          } else {
            this.warm_his[i].param = data[i].param;
          }
          if (data[i].type == null) {
            this.warm_his[i].type = "  -";
            this.warm_his[i].type_title = "";
          } else {
            if (data[i].type.length >= 4) {
              this.warm_his[i].type = data[i].type.substring(0, 4) + "...";
              this.warm_his[i].type_title = data[i].type;
            } else {
              this.warm_his[i].type = data[i].type;
              this.warm_his[i].type_title = data[i].type;
            }
          }
          if (data[i].value == null) {
            this.warm_his[i].value = "  -";
          } else {
            this.warm_his[i].value = data[i].value;
          }
        }
      } else {
        this.warm_his = [
          {
            param: "-",
            time: "-",
            type: "-",
            value: "-"
          }
        ];
      }
    },
    //今日趋势原始数据获取
    gettoday_trend: function(stationid, stationtype) {
      let cVue = this;
      let stationtypeobj = cVue.$store.state.stationtype;
      let url = "";
      let parameter = new Object();
      if (
        stationtype == stationtypeobj.guokong ||
        stationtype == stationtypeobj.shengkong ||
        stationtype == stationtypeobj.shikong ||
        stationtype == stationtypeobj.weixing
      ) {
        url = dataRequestUrl.options.stationListInfo.gettoday_trend_gssw;
        parameter = { stationId: stationid };
        let mydata = AirInfoImpl.getpopularData(
          url,
          parameter,
          cVue.dealtoday_trend
        );
      } else if (stationtype == stationtypeobj.wanranyuan) {
        url = dataRequestUrl.options.stationListInfo.gettoday_trend_w;
        parameter = { stationId: stationid, pollutantCode: cVue.exhaust[0].id };
        let mydata = AirInfoImpl.getpopularData_nostatue(
          url,
          parameter,
          cVue.dealtoday_trend
        );
      } else if (stationtype == stationtypeobj.yangchen) {
        url = dataRequestUrl.options.stationListInfo.gettoday_trend_y;
        parameter = { stationId: stationid };
        let mydata = AirInfoImpl.getpopularData(
          url,
          parameter,
          cVue.dealtoday_trend
        );
      }
    },
    //今日趋势原始数据处理
    dealtoday_trend: function(data) {
      let cVue = this;
      let stationtypeobj = cVue.$store.state.stationtype;
      if (data == "" || data == null) {
        this.$message({
          message: "该站点还没有今日趋势数据！",
          type: "warning"
        });
        this.today_trend_orig=[];
        this.today_trend_data = {
          kind: "",
          time: ["00:00", "00:00"],
          data: [0, 0]
        };
        cVue.line_chart_set();
      } else {
        this.today_trend_orig = data;
        let stationtype = this.stationType;
        let text = "";
        let mytime = [];
        let mydata = [];
        if (
          stationtype == stationtypeobj.guokong ||
          stationtype == stationtypeobj.shengkong ||
          stationtype == stationtypeobj.shikong ||
          stationtype == stationtypeobj.weixing
        ) {
          this.today_trend_data.kind = "aqi";
          $(".popu_chart_btn").removeClass("popu_chart_btn_active");
          $(".class1").addClass("popu_chart_btn_active");
          for (let i = 0; i < data.length; i++) {
            mytime[i] = data[i].hours;
            if(data[i][this.today_trend_data.kind]){
              mydata[i] = data[i][this.today_trend_data.kind];
            }else{
              mydata[i] =0;
            }
          }
          this.today_trend_data.time = mytime;
          this.today_trend_data.data = mydata;
          let cVue = this;
          cVue.line_chart_set();
        } else if (stationtype == stationtypeobj.wanranyuan) {
          let cVue = this;
          let url = dataRequestUrl.options.stationListInfo.getpollutant;
          axios
            .get(url, {
              params: null
            })
            .then(function(response) {
              let key_code = [];
              let temp = data[0];
              let numcode = 0;
              for (var key in temp) {
                if (key != "hours") {
                  key_code[numcode] = new Object();
                  key_code[numcode].code = key;
                  numcode++;
                }
              }
              for (let i = 0; i < key_code.length; i++) {
                for (let j = 0; j < response.length; j++) {
                  if (key_code[i].code == response[j].pollutantcode) {
                    key_code[i].name = response[j].pollutantname;
                    break;
                  }
                }
              }
              for (let l = 0; l < key_code.length; l++) {
                mydata[l] = new Object();
                if (key_code[l].name == null || key_code[l].name == "") {
                  mydata[l] = {
                    name: key_code[l].code,
                    code: key_code[l].code,
                    type: "line",
                    data: []
                  };
                } else {
                  mydata[l] = {
                    name: key_code[l].name,
                    code: key_code[l].code,
                    type: "line",
                    data: []
                  };
                }
              }
              for (let m = 0; m < data.length; m++) {
                mytime.push(data[m].hours);
                for (let n = 0; n < key_code.length - 1; n++) {
                  mydata[n].data.push(data[m][key_code[n].code]);
                }
              }
              cVue.line_chart_set_many(mytime, mydata);
            })
            .catch(function(error) {
              console.log("污染源种类获取失败");
            });
        } else if (stationtype == stationtypeobj.yangchen) {
          this.today_trend_data.kind = "pm25";
          $(".popu_chart_btn").removeClass("popu_chart_btn_active");
          $(".class2").addClass("popu_chart_btn_active");

          for (let i = 0; i < data.length; i++) {
            mytime[i] = data[i].hours;
            if(data[i][this.today_trend_data.kind]){
              mydata[i] = data[i][this.today_trend_data.kind];
            }else{
              mydata[i] =0;
            }
          }
          this.today_trend_data.time = mytime;
          this.today_trend_data.data = mydata;
          let cVue = this;
          cVue.line_chart_set();
        }
      }
    },
    //污染源下拉菜单切换今日趋势
    Pollution_trend_select(item) {
      let cVue = this;
      let url = dataRequestUrl.options.stationListInfo.gettoday_trend_w;
      let parameter = { stationId: cVue.stationId, pollutantCode: item };
      let mydata = AirInfoImpl.getpopularData_nostatue(
        url,
        parameter,
        cVue.dealtoday_trend
      );
    },
    //今日趋势按钮点击切换
    popu_linechart: function(text, e) {
      $(".popu_chart_btn").removeClass("popu_chart_btn_active");
      var mydom = $(e.srcElement);
      mydom.addClass("popu_chart_btn_active");
      if (this.today_trend_orig.length > 0) {
        let mytime = [];
        let mydata = [];
        for (let i = 0; i < this.today_trend_orig.length; i++) {
          mytime[i] = this.today_trend_orig[i].hours;
          mydata[i] = this.today_trend_orig[i][text];
        }

        this.today_trend_data.kind = text;
        this.today_trend_data.time = mytime;
        this.today_trend_data.data = mydata;
        let cVue = this;
        cVue.line_chart_set();
      }
    },
    //弹出框折线图绘制——空值初始化
    line_chart_init: function() {
      let option = {
        tooltip: {
          trigger: "axis"
        },
        color: ["#4b67ff"],
        grid: {
          left: "4%",
          right: "4%",
          bottom: "3%",
          top: "6%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLabel: {
              textStyle: {
                color: "#93AECE"
              }
            },
            splitLine: {
              show: true,
              interval: 1,
              lineStyle: {
                color: ["#324258"],
                width: 1,
                type: "solid"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#324258"
              }
            },
            data: ["00:00", "00:00"]
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              textStyle: {
                color: "#93AECE"
              }
            },
            splitLine: {
              show: true,
              interval: 1,
              lineStyle: {
                color: ["#324258"],
                width: 1,
                type: "solid"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#324258"
              }
            }
          }
        ],
        series: {
          name: this.today_trend_data.kind,
          type: "line",
          smooth: false,
          symbolSize: 0,
          // itemStyle: {
          //   color: "#5ce3e7"
          // },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(64,65,233,1)"
                  },
                  {
                    offset: 1,
                    color: "rgba(94,188,214,0.1)"
                  }
                ],
                false
              ),
              shadowColor: "rgba(0, 0, 0, 0.1)",
              shadowBlur: 10
            }
          },
          data: [0, 0]
        }
      };

      let myChart = echarts.init(document.getElementById("popu_line_chart"));
      myChart.setOption(option);
    },
    //弹出框折线图绘制——单线
    line_chart_set: function() {
      let mydata = [
        {
          name: this.today_trend_data.kind,
          type: "line",
          smooth: false,
          symbolSize: 0,
          // itemStyle: {
          //   color: "#5ce3e7"
          // },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(64,65,233,1)"
                  },
                  {
                    offset: 1,
                    color: "rgba(94,188,214,0.1)"
                  }
                ],
                false
              ),
              shadowColor: "rgba(0, 0, 0, 0.1)",
              shadowBlur: 10
            }
          },
          data: this.today_trend_data.data
        }
      ];
      let option = {
        tooltip: {
          trigger: "axis"
        },
        color: ["#4b67ff"],
        grid: {
          left: "4%",
          right: "4%",
          bottom: "3%",
          top: "6%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLabel: {
              textStyle: {
                color: "#93AECE"
              }
            },
            splitLine: {
              show: true,
              interval: 1,
              lineStyle: {
                color: ["#324258"],
                width: 1,
                type: "solid"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#324258"
              }
            },
            data: this.today_trend_data.time
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              textStyle: {
                color: "#93AECE"
              }
            },
            splitLine: {
              show: true,
              interval: 1,
              lineStyle: {
                color: ["#324258"],
                width: 1,
                type: "solid"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#324258"
              }
            }
          }
        ],
        series: mydata
      };

      let myChart = echarts.init(document.getElementById("popu_line_chart"));
      myChart.setOption(option);
    },
    //弹出框折线图绘制——多线
    line_chart_set_many: function(time, data) {
      let option = {
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: "4%",
          right: "4%",
          bottom: "3%",
          top: "6%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLabel: {
              textStyle: {
                color: "#93AECE"
              }
            },
            splitLine: {
              show: true,
              interval: 1,
              lineStyle: {
                color: ["#324258"],
                width: 1,
                type: "solid"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#324258"
              }
            },
            data: time
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              textStyle: {
                color: "#93AECE"
              }
            },
            splitLine: {
              show: true,
              interval: 1,
              lineStyle: {
                color: ["#324258"],
                width: 1,
                type: "solid"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#324258"
              }
            }
          }
        ],
        series: data
      };

      let myChart = echarts.init(document.getElementById("popu_line_chart2"));
      myChart.setOption(option);
    },
    //地图点击后触发的函数
    map_click(stationid, stationtype) {
      let cVue = this;
      let stationtypeobj = this.$store.state.stationtype;
      // stationid="1";
      if (stationtype != null && stationtype != "") {
        this.loadPopupData(stationid, stationtype);
      }
      //地图以弹出点居中高亮显示
      this.$store.state.mapview.center = [this.longitude, this.latitude];
      let curGraphic = this.selectedGraphic;
      let layer;
      if (
        stationtype == stationtypeobj.guokong ||
        stationtype == stationtypeobj.shengkong ||
        stationtype == stationtypeobj.shikong ||
        stationtype == stationtypeobj.weixing
      ) {
        layer = cVue.$store.state.map.findLayerById("airPointFeaLayer");
      } else if (stationtype == stationtypeobj.wanranyuan) {
        layer = cVue.$store.state.map.findLayerById("wryPointFeaLayer");
      } else if (stationtype == stationtypeobj.yangchen) {
        layer = cVue.$store.state.map.findLayerById("ycPointFeaLayer");
      }
      if (layer != null) {
        this.$store.state.mapview
          .whenLayerView(layer)
          .then(layerView => {
            if (this.$store.state.highlight) {
              this.$store.state.highlight.remove();
            }
            this.$store.state.highlight = layerView.highlight(curGraphic);
          })
          .catch(error => {
            alert("error");
          });
      }

      //显示弹窗
      let mymapdataDiv = document.getElementById("popUpDiv");
      mymapdataDiv.style.display = "block";
      this.resetPopUpPositon();

      let url = dataRequestUrl.options.stationListInfo.getStation_warm_realtime;
      let parameter = { stationId: stationid };
      axios
        .get(url, {
          params: parameter
        })
        .then(function(response) {
          if (response.status == 200) {
            if (response.data == null || response.data == "") {
              if (stationtype == stationtypeobj.wanranyuan) {
                $("#popu_line_chart2").css("height", "150px");
                cVue.chart1_show = false;
                cVue.chart2_show = true;
              } else {
                cVue.chart2_show = false;
                cVue.chart1_show = true;
                $("#popu_line_chart").css("height", "120px");
              }
              cVue.Whether_alarm = false;
              let mapChart = echarts.init(
                document.getElementById("popu_line_chart")
              );
              mapChart.resize();
            } else {
              cVue.Whether_alarm = true;
              if (stationtype == stationtypeobj.wanranyuan) {
                $("#popu_line_chart2").css("height", "120px");
                cVue.chart1_show = false;
                cVue.chart2_show = true;
              } else {
                $("#popu_line_chart").css("height", "90px");
                cVue.chart2_show = false;
                cVue.chart1_show = true;
              }
              let mapChart = echarts.init(
                document.getElementById("popu_line_chart")
              );
              mapChart.resize();
            }
          }
        })
        .catch(function(error) {
          console.log("站点是否报警信息获取失败！");
          cVue.Whether_alarm = false;
          $("#popu_line_chart").css("height", "140px");
          let mapChart = echarts.init(
            document.getElementById("popu_line_chart")
          );
          mapChart.resize();
        });
    },
    //重新计算弹窗的位置
    resetPopUpPositon: function() {
      let curPopupPoint = this.$store.state.popupPoint;
      let lng = curPopupPoint.split(",")[1];
      let lat = curPopupPoint.split(",")[2];
      //经纬度换算成屏幕坐标
      let mapPoint = {
        x: lng,
        y: lat,
        spatialReference: { wkid: 4326 }
      };
      let screenPoint = this.$store.state.mapview.toScreen(mapPoint);
      let parentPopUpDiv = document.getElementById("popUpDiv");
      let width = 420; //450
      let height = 300; //300
      width = parentPopUpDiv.clientWidth;
      height = parentPopUpDiv.clientHeight;
      //parentPopUpDiv.style.width = width + "px";
      //parentPopUpDiv.style.height = height + "px";
      if (this.stationType == "" || this.stationType == null) {
        parentPopUpDiv.style.left = screenPoint.x - width - 10 + "px";
        parentPopUpDiv.style.top = screenPoint.y - height * 0.5 + "px";
      } else {
        parentPopUpDiv.style.left = screenPoint.x - width + 213 + "px";
        parentPopUpDiv.style.top = screenPoint.y - height * 0.5 - 179 + "px";
      }
    }
  }
};
</script>
<style scoped lang="less">
/*盒模型*/
*,
*:before,
*:after {
  -wekbit-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.mymapdata {
  font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC",
    "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei",
    sans-serif;
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 100%;
}
.label1 {
  width: 100%;
  height: 340px;
  background-color: #0e1f32;
  border: 1px solid #1c4a6f;
  border-radius: 1px;
  box-shadow: 0 0 15px 1px rgba(70, 116, 188, 0.6);
  .title_div {
    width: 390px;
    height: 26px;
    margin: 16px auto 10px auto;
  }
  .title_text {
    float: left;
    width: 136px;
    height: 26px;
    line-height: 26px;
    font-size: 18px;
    font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC",
      "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei",
      sans-serif;
    text-align: left;
    color: #93aece;
  }
  .title_btn {
    float: left;
    width: 68px;
    height: 24px;
    line-height: 24px;
    font-size: 12px;
    font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC",
      "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei",
      sans-serif;
    text-align: center;
    background-color: #131f35;
    border: 1px solid #424956;
    margin-top: 1px;
    margin-left: 6px;
    border: 1px solid transparent;
    color: #b8bec4;
    cursor: pointer;
    box-shadow: 0 0 1px 0 #fff inset;
  }
  .title_btn:hover {
    color: #19ffc7 !important;
  }
  .title_btn_active {
    color: #fff !important;
    border-color: #19ffc7 !important;
    box-shadow: 0 0 1px 0 #19ffc7 !important;
  }
  .close_btn {
    float: left;
    width: 26px;
    line-height: 26px;
    font-size: 20px;
    font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC",
      "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei",
      sans-serif;
    text-align: right;
    margin-left: 5px;
    color: #93aece;
    cursor: pointer;
    transform: scale(1, 0.8);
  }
  .context_div {
    width: 390px;
    height: 178px;
    margin: 0px auto 20px auto;
    .warm_par {
      float: left;
      width: 130px;
      line-height: 19px;
      height: 19px;
      font-size: 14px;
      font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC",
        "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei",
        sans-serif;
      text-align: left;
      color: #b8bec4;
    }
    .warm_kind_title {
      float: left;
      width: 70px;
      line-height: 19px;
      height: 19px;
      font-size: 14px;
      font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC",
        "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei",
        sans-serif;
      text-align: left;
      color: #b8bec4;
    }
    .warm_kind {
      float: left;
      padding: 0px 5px;
      line-height: 18px;
      font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC",
        "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei",
        sans-serif;
      text-align: left;
      color: #ccced2;
      border-radius: 2px;
      color: #fff;
      font-weight: 600;
      text-align: center;
      font-size: 12px;
      margin-left: 5px;
      background-image: linear-gradient(117deg, #d74747 6%, #cd1e1e 100%);
    }
    .kind_value_div {
      width: 390px;
      margin: 0px auto;
      height: 43px;
      margin-top: 4px;
      border-top: 1px solid #2e3d52;
      font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC",
        "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei",
        sans-serif;
      .kind_value_sondiv {
        float: left;
        width: 50px;
        height: 41px;
        margin-left: 5px;
        margin-top: 8px;
        .kind_value_title {
          color: #fff;
          line-height: 18px;
          text-align: center;
          font-size: 12px;
          float: left;
          width: 100%;
          height: 18px;
        }
        .kind_value_data {
          color: #fff;
          line-height: 20px;
          text-align: center;
          font-size: 12px;
          float: left;
          width: 100%;
          height: 20px;
          color: rgba(255, 255, 255, 0.4);
        }
      }
    }
    .pollution_select_div {
      width: 390px;
      margin: 0px auto;
      height: 20px;
      margin-bottom: 15px;
      /deep/.el-select,
      /deep/.el-input,
      /deep/.el-input__inner {
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC",
          "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei",
          "WenQuanYi Micro Hei", sans-serif;
      }
      /deep/.el-input__icon {
        line-height: 20px;
      }
    }
    #popu_line_chart {
      width: 390px;
      margin: 0px auto;
      height: 130px;
      margin-bottom: 6px;
    }
    #popu_line_chart2 {
      width: 390px;
      margin: 0px auto;
      height: 130px;
      margin-bottom: 6px;
    }
    .popu_chart_btn_div {
      width: 100%;
      height: 18px;
      margin-top: 3px;
      .popu_chart_btn {
        float: left;
        padding-left: 5px;
        padding-right: 5px;
        width: 51.5px;
        margin-right: 4px;
        color: #ccced2;
        line-height: 18px;
        font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC",
          "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei",
          "WenQuanYi Micro Hei", sans-serif;
        background-color: #000917;
        cursor: pointer;
        text-align: center;
        height: 18px;
        font-size: 12px;
        background-color: rgba(0, 0, 0, 0.2);
      }
      .popu_chart_btn_active {
        color: #fff !important;
        background-image: linear-gradient(
          94deg,
          rgba(25, 255, 199, 0.56) 0%,
          rgba(25, 255, 199, 0.33) 100%
        ) !important;
      }
    }
  }
  .context_div::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  .context_div::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 6px;
    //  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: #fff;
  }
  .context_div::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 6px;
    background: #111c2e;
  }
  .bottom_btn {
    float: left;
    width: 100px;
    line-height: 30px;
    font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC",
      "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei",
      sans-serif;
    text-align: center;
    margin-left: 10px;
    color: #5ad4f4;
    cursor: pointer;
    font-size: 14px;
    border-radius: 1px;
    background: transparent;
    border: 1px solid #5ad4f4;
    border-color: #5ad4f4;
    font-weight: 500;
  }
  .bottom_btn:hover {
    background-image: linear-gradient(to right, #2bd2e5, #45a896) !important;
    color: #fff !important;
  }
  .bottom_btn_active {
    background-image: linear-gradient(to right, #2bd2e5, #45a896) !important;
    color: #fff !important;
  }
  .warm_his_table {
    .table_title {
      height: 30px;
      line-height: 30px;
      font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC",
        "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei",
        sans-serif;
      text-align: left;
      float: left;
      font-size: 12px;
      color: #93aece;
      text-align: left;
      padding-left: 7px;
    }
    .table_time {
      float: left;
      height: 45px;
      line-height: 16px;
      width: 105px;
      text-align: left;
      color: #848d96;
      font-size: 12px;
      padding-left: 20px;
      padding-top: 5px;
    }
    .table_time2 {
      float: left;
      height: 45px;
      width: 90px;
      color: #848d96;
      padding-left: 20px;
      line-height: 45px;
      color: #fff;
      font-size: 16px;
      font-family: "Oswald";
    }
    .table_param {
      float: left;
      height: 45px;
      line-height: 45px;
      width: 70px;
      text-align: left;
      color: #fff;
      font-size: 16px;
      font-family: "Oswald";
      padding-left: 7px;
    }
    .table_type {
      float: left;
      height: 45px;
      line-height: 45px;
      text-align: left;
      width: 115px;
      color: #fff;
      padding-left: 7px;
      .table_type_in {
        display: inline-block;
        height: 18px;
        line-height: 18px;
        margin-top: 8px auto;
        padding: 0px 5px;
        border-radius: 2px;
        font-size: 12px;
        margin-left: 5px;
        background-image: linear-gradient(117deg, #d74747 6%, #cd1e1e 100%);
      }
    }
    .table_value {
      float: left;
      height: 45px;
      line-height: 45px;
      width: 85px;
      text-align: left;
      color: #fff;
      font-size: 16px;
      font-family: "Oswald";
      padding-left: 7px;
    }
  }
  .stinfo_title {
    height: 20px;
    line-height: 20px;
    color: #93aece;
    font-family: "Microsoft YaHei";
    font-size: 14px;
    float: left;
  }
  .station_table_div {
    width: 100%;
    margin-top: 10px;
    height: 158px;
    overflow: auto;
  }
  .stinfo_name {
    width: 20%;
    height: 30px;
    line-height: 30px;
    color: #b8bec4;
    font-family: "Microsoft YaHei";
    font-size: 12px;
    text-align: left;
    float: left;
    margin-left: 12px;
    padding-left: 20px;
  }

  .stinfo_value {
    width: 70%;
    height: 30px;
    line-height: 30px;
    color: #fff;
    font-family: "Microsoft YaHei";
    font-size: 12px;
    text-align: right;
    float: left;
    margin-right: 12px;
    padding-right: 7px;
  }
  .station_table_div::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
}
.station_table_div::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 6px;
  //  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: #fff;
}
.station_table_div::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  border-radius: 6px;
  background: #111c2e;
}
.popup_from_div {
  padding-top: 10px;
  position: absolute;
  top: 0px;
  right: -355px;
  width: 338px;
  height: 380px;
  background: #0e1f32;
  border-radius: 1px;
  border: 1px solid #4babf5;
  .popup_from_title {
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    color: #93aece;
    font-size: 18px;
    float: left;
  }
  .popup_from_close {
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    margin-top: 0px;
    margin-right: 10px;
    float: right;
    cursor: pointer;
    transform: scale(1.5, 1);
    -ms-transform: scale(1.5, 1);
    -webkit-transform: scale(1.5, 1);
    -moz-transform: scale(1.5, 1);
    -o-transform: scale(1.5, 1);
  }
  .popup_from_kuang {
    float: left;
    width: 296px;
    height: 345px;
    margin: 10px 20px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.8);
    /deep/.el-form-item {
      height: 52px;
      margin: 0px;
    }
    /deep/.el-form-item__label {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.8);
      line-height: 36px;
      padding: 8px 3px;
      margin: 0px;
      text-align: left;
      height: 52px;
    }
    .renwushuoming {
      height: 33.6px;
      /deep/.el-form-item__label {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.8);
        line-height: 17.6px;
        padding: 8px 3px;
        margin: 0px;
        text-align: left;
        height: 33.6px;
      }
    }
    /deep/.el-input {
      display: inline-block;
      display: block;
      width: 100%;
      height: 52px;
    }
    /deep/.el-input__inner {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.8);
      width: 226.4px;
      height: 36px;
      line-height: 36px;
      background-color: transparent;
      border-radius: 4px;
      border: 1px solid #484f5d;
      box-sizing: border-box;
      color: #fff;
      display: inline-block;
      transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      margin-left: 3px;
      margin-top: 8px;
    }
    /deep/.el-input__inner:hover {
      border: 2px solid rgb(161, 162, 163);
    }
    /deep/.el-select__tags {
      height: 28px;
      overflow: hidden;
    }
    /deep/.el-textarea {
      height: 69.6;
      padding: 8px 3px;
      resize: none;
    }
    /deep/.el-textarea__inner {
      display: block;
      resize: vertical;
      padding: 5px 15px;
      line-height: 1.5;
      box-sizing: border-box;
      width: 290px;
      font-size: 14px;
      color: #fff;
      background-color: transparent;
      background-image: none;
      border: 1px solid #484f5d;
      border-radius: 4px;
      transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      resize: none;
      margin-top:-10px;
    }
    /deep/.el-input__count {
      background-color: transparent;
      color: #b8bec4;
      font-size: 12px;
      bottom: 9px;
      right: 16px;
    }
    .paicha_btn {
      width: 100%;
      height: 52px;
    }
    /deep/.el-button,
    /deep/.el-button--primary:hover {
      background-image: linear-gradient(90deg, #008A96 0%, #004E5D 100%);
      color: #FFFFFF;
      background-color: #119B8D;
      font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
      border-radius: 0px;
      margin: 0;
      font-weight: 500;
      width: 100px;
      height: 30px;
      line-height: 13px;
      padding: 10px 20px;
      font-size: 14px;
      display: block;
      margin: 8px auto;
    }
    /deep/.el-button--primary:hover {
      background-image: linear-gradient(90deg, #119b8d 100%, #119b8d 100%);
    }
  }
}
.wuran_event {
  font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC",
    "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei",
    sans-serif;
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 100%;
  display: none;
  margin-left: 80px;
}
.from_div {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 5px;
  width: 338px;
  height: 417px;
  background: #0e1f32;
  border-radius: 1px;
  border: 1px solid #4babf5;
}
.from_kuang {
  overflow: auto;
  width: 100%;
  height: 100%;
}
.from_kuang::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.from_kuang::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 6px;
  //  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background: #fff;
}
.from_kuang::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  // -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  border-radius: 6px;
  background: #111c2e;
}
.hang_div {
  width: 100%;
  min-height: 52px;
  float: left;
}
.title {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 36px;
  padding: 8px 3px;
  margin: 0px;
  text-align: left;
  height: 52px;
  float: left;
  width: 95px;
}
.content_pop4 {
  font-size: 14px;
  color: #fff;
  line-height: 36px;
  padding: 8px 3px;
  margin: 0px;
  text-align: left;
  // height: 52px;
  float: left;
  width: 190px;
}
.popup_from_close {
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  float: right;
  cursor: pointer;
  transform: scale(1.5, 1);
  -ms-transform: scale(1.5, 1);
  -webkit-transform: scale(1.5, 1);
  -moz-transform: scale(1.5, 1);
  -o-transform: scale(1.5, 1);
  position: absolute;
  right: 15px;
  top: 0px;
}
</style>
