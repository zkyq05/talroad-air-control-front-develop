<template>
    <!-- 主体内容 -->
    <div class="content">
        <!-- 左侧 -->
        <div class="main-left" style="left: 0px; top: 0px;">
            <HeaderToolButton></HeaderToolButton>
        </div>
                <div style="position: absolute;bottom: 10px;left: 15px;z-index: 10;">
                    <maplegend></maplegend>
                </div>
        <!-- 地图 -->
        <div class="main">
            <div  class="max-area">
                <MapComponent></MapComponent>
            </div>
            <!-- 底部 -->
            <div id="popUpDiv">
                <MapPopUp></MapPopUp>
            </div>
        </div>
        <!-- 右侧 -->
        <div class="main-right">
            <!-- 参数 -->
            <div class="params-box">
                <div class="params-item">
                    <div class="params-hd">
                        <LayerComponent></LayerComponent>
                    </div>
                </div>
            </div>
            <!-- 管控 -->
            <div class="tab-box" :style="kuandu">
                <div class="fold-toggle" @click="tongjitu"><i class="icon icon-shang" style="height: 28px;font-size: 12px;cursor: pointer;text-align: center;"></i></div>
                <div :style="tongjitusuzhi">
                    <div class="tab-hd" >
                        <ul class="tab-head">
                            <li :class="controlclass01" @click="control01()">实时管控</li>
                            <li :class="controlclass02" @click="control02()">重污染应急管控</li>
                        </ul>
                    </div>
                    <div class="tab-bd mt-sm" >
                        <!-- 实时管控 -->
                        <div class="tab-realtime" :style="shishi">
                            <div class="tab-box-01">
                                <div class="tab-hd-01">
                                    <ul class="tab-head">
                                        <li :class="biaozun"  @click="targetSelection">达标模式</li>
                                        <li :class="dabiao"  @click="rankingChoice">排名模式</li>
                                        <!--<li >实时监测</li>-->
                                    </ul>
                                </div>
                                <div class="tab-bd" style="padding-left: 0px;padding-right: 0px;">
                                    <!-- 达标模式 -->
                                    <div class="standard-area" :style="display01" style="padding-left: 0px;padding-right: 0px;">
                                        <div class="standard-box">
                                            <div class="standard-item" style="padding-left: 10px;padding-right: 10px;">
                                                <div class="standard-title">168城市</div>
                                                <div class="standard-con">
                                                    <div class="num-txt">20</div>
                                                    <div class="standard-text">
                                                        <div class="index-txt is-down1"><i class="icon icon-up"></i>2</div>
                                                        <div class="compare-txt">比昨日</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="standard-item" style="padding-left: 10px;padding-right: 10px;">
                                                <div class="standard-title">省内城市</div>
                                                <div class="standard-con">
                                                    <div class="num-txt">8</div>
                                                    <div class="standard-text">
                                                        <div class="index-txt is-down"><i class="icon icon-up"></i>2</div>
                                                        <div class="compare-txt">比昨日</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 空气质量程度 -->
                                        <div class="air-quality mt-sm" style="padding-left: 0px;padding-right: 0px;">
             <!--                               <div class="pointer-box">
                                            <div class="pointer-line" :style="dashboard"></div>
                                            <div class="pointer-num"><span>{{this.cumulative.aqi}}</span></div>
                                        </div>
                                            <div class="air-today">今日目标<span class="today-num">{{this.surplus.aqi}}</span></div>-->
                                            <div class="pointer-box">
                                                <div class="pointer-line" style="transform: rotate(66deg)"></div>
                                                <div class="pointer-num"><span>110</span></div>
                                            </div>
                                            <div class="air-today">今日目标<span class="today-num">90</span></div>
                                            <ul class="air-number" style="margin-left: 3px;">
                                                <li>
                                                    <div class="air-type">PM<span class="text-sm">2.5</span></div>
                                                    <div class="air-cont">
                                                        <div class="air-txt">累积</div>
                                                        <div class="air-txt">剩余</div>
                 <!--                                       <div class="air-num">{{ this.cumulative.pm25}}</div>
                                                        <div class="air-num">{{ this.surplus.pm25}}</div>-->
                                                        <div class="air-num">84</div>
                                                        <div class="air-num">80</div>
                                                    </div>
                                                    <div class="air-color color-02"></div>
                                                </li>
                                                <li>
                                                    <div class="air-type">PM<span class="text-sm">10</span></div>
                                                    <div class="air-cont">
                                                        <div class="air-txt">累积</div>
                                                        <div class="air-txt">剩余</div>
 <!--                                                       <div class="air-num">{{this.cumulative.pm10}}</div>
                                                        <div class="air-num">{{this.surplus.pm10}}</div>-->
                                                        <div class="air-num">110</div>
                                                        <div class="air-num">50</div>
                                                    </div>
                                                    <div class="air-color color-03"></div>
                                                </li>
                                                <li>
                                                    <div class="air-type">NO<span class="text-sm">2</span></div>
                                                    <div class="air-cont">
                                                        <div class="air-txt">累积</div>
                                                        <div class="air-txt">剩余</div>
                                                        <!--<div class="air-num">{{this.cumulative.no2}}</div>
                                                        <div class="air-num">{{this.surplus.no2}}</div>-->
                                                        <div class="air-num">21</div>
                                                        <div class="air-num">25</div>
                                                    </div>
                                                    <div class="air-color"></div>
                                                </li>
                                                <li>
                                                    <div class="air-type">SO<span class="text-sm">2</span></div>
                                                    <div class="air-cont">
                                                        <div class="air-txt">累积</div>
                                                        <div class="air-txt">剩余</div>
     <!--                                                   <div class="air-num">{{this.cumulative.so2}}</div>
                                                        <div class="air-num">{{this.surplus.so2}}</div>-->
                                                        <div class="air-num">21</div>
                                                        <div class="air-num">25</div>
                                                    </div>
                                                    <div class="air-color"></div>
                                                </li>
                                                <li>
                                                    <div class="air-type">CO</div>
                                                    <div class="air-cont">
                                                        <div class="air-txt">累积</div>
                                                        <div class="air-txt">剩余</div>
                                                        <!--<div class="air-num">{{ this.cumulative.co }}</div>
                                                        <div class="air-num">{{ this.surplus.co }}</div>-->
                                                        <div class="air-num">70</div>
                                                        <div class="air-num">60</div>
                                                    </div>
                                                    <div class="air-color color-02"></div>
                                                </li>
                                                <li>
                                                    <div class="air-type">O<span class="text-sm">3</span></div>
                                                    <div class="air-cont">
                                                        <div class="air-txt">累积</div>
                                                        <div class="air-txt">剩余</div>
                                                  <!--      <div class="air-num">{{this.cumulative.o3}}</div>
                                                        <div class="air-num">{{this.surplus.o3}}</div>-->
                                                        <div class="air-num">21</div>
                                                        <div class="air-num">25</div>
                                                    </div>
                                                    <div class="air-color"></div>
                                                </li>
                                            </ul>
                                        </div>
                                        <!-- 今日趋势 -->
                                        <div class="panel mt-sm">
                                            <div class="panel-hd">
                                                <h2 class="panel-tit">今日趋势</h2>
                                            </div>
                                            <div class="panel-bd">
                                                <div class="chart-box">
                                                    <div class="chart-item" id="chart01" style="width:254px;height:120px;padding: 0px;"></div>
                                                </div>
                                                <ul class="trend-names">
                                                    <li :class="targetTodayAQI" @click="targetToday('aqi')">AQI</li>
                                                    <li :class="targetTodayPM25" @click="targetToday('pm25')">PM<span class="text-sm">2.5</span></li>
                                                    <li :class="targetTodayPM10" @click="targetToday('pm10')">PM<span class="text-sm">10</span></li>
                                                    <li :class="targetTodayNO" @click="targetToday('no2')">NO<span class="text-sm">2</span></li>
                                                    <li :class="targetTodayCO" @click="targetToday('co')">CO</li>
                                                    <li :class="targetTodaySO2" @click="targetToday('so2')">SO<span class="text-sm">2</span></li>
                                                    <li :class="targetTodayO3" @click="targetToday('o3')">O<span class="text-sm">3</span></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <!-- 今日警报 -->
                                        <div class="panel mt-sm">
                                            <div class="panel-hd">
                                                <h2 class="panel-tit">今日警报<span class="label-warn">{{this.tatolCount}}</span></h2>
                                            </div>
                                            <div class="panel-bd">
                                                <ul class="alarm-box">
                                                    <li>
                                                        <div class="alarm-num">{{this.stateControl}}</div>
                                                        <div class="alarm-text">国控</div>
                                                    </li>
                                                    <li>
                                                        <div class="alarm-num">{{this.stateControl}}</div>
                                                        <div class="alarm-text">省控</div>
                                                    </li>
                                                    <li>
                                                        <div class="alarm-num">{{this.cityCount}}</div>
                                                        <div class="alarm-text">市控</div>
                                                    </li>
                                                    <li>
                                                        <div class="alarm-num circles">{{this.miniature}}</div>
                                                        <div class="alarm-text">微站</div>
                                                    </li>
                                                    <li>
                                                        <div class="alarm-num circles">{{this.sourceCount}}</div>
                                                        <div class="alarm-text">污染源</div>
                                                    </li>
                                                    <li>
                                                        <div class="alarm-num">{{this.eventCount}}</div>
                                                        <div class="alarm-text">事件</div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 排名模式 -->
                                    <div class="standard-area" :style="display02">
                                        <div><span style="font-size: 15px;font-weight: 800;margin-left: 10px">今日目标</span></div>
                                        <div class="standard-box">
                                            <div class="standard-item">
                                                <div class="standard-con">
                                                    <div style="  height: 50px; width: 50px;border-radius: 50px;position: absolute;
        box-shadow: 0px 0px 0px 3px #00FF00;left: 139px;top: 100px;text-align: center;"><div style="height: 15px"></div><span style="font-size: 20px;font-weight: 600;text-align: center;display: inline-block;">倒5</span></div>
                                                    <div style="height: 5px"></div>
                                                    <div class="standard-text">
                                                        <div style="font-size: 12px;width: 100px;text-align: center;height: 30px;font-size: 14px;font-weight: 400">当前排名</div>
                                                        <div style="font-size: 12px;width: 100px;text-align: center;height: 30px;font-size: 16px;font-weight: 400;color: #fff;">倒3</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="standard-item">
                                                <div class="standard-con">
                                                    <div style="width: 30px"></div>
                                                    <div style="  height: 50px; width: 50px;border-radius: 50px;position: absolute;
        box-shadow: 0px 0px 0px 3px #00FF00;left: 14px;top: 5px;text-align: center;"><div style="height: 15px"></div><span style="font-size: 20px;font-weight: 600;text-align: center;display: inline-block;">4.24</span></div>
                                                    <div style="height: 5px;"></div>
                                                    <div class="standard-text">
                                                        <div style="font-size: 12px;width: 87px;text-align: right;height: 30px;font-size: 14px;font-weight: 400">综合指数</div>
                                                        <div style="font-size: 12px;width: 120px;text-align: center;height: 30px;font-size: 16px;font-weight: 400;color: #fff;">5.17</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- 空气质量程度 -->
                                        <div class="air-quality mt-sm" style="padding-left: 0px;padding-right: 0px;">
                                            <!--                              <div class="pointer-box">
                                                                              <div class="pointer-line" :style="airDashboard"></div>
                                                                              <div class="pointer-num"><span>100</span></div>
                                                                          </div>-->
                                            <div style="width: 100px;text-align: left;font-size: 15px;font-weight: 800;margin-left: 10px">目标分解</div>
                                            <ul class="air-number"  style="margin-left: 3px;">
                                                <li>
                                                    <div class="air-type">PM<span class="text-sm">2.5</span></div>
                                                    <div class="air-cont">
                                                        <div class="air-txt">累积</div>
                                                        <div class="air-txt">剩余</div>
                                                        <div class="air-num">025</div>
                                                        <div class="air-num">033</div>
                                                    </div>
                                                    <div class="air-color"></div>
                                                </li>
                                                <li>
                                                    <div class="air-type">PM<span class="text-sm">10</span></div>
                                                    <div class="air-cont">
                                                        <div class="air-txt">累积</div>
                                                        <div class="air-txt">剩余</div>
                                                        <div class="air-num">075</div>
                                                        <div class="air-num">033</div>
                                                    </div>
                                                    <div class="air-color color-01"></div>
                                                </li>
                                                <li>
                                                    <div class="air-type">NO<span class="text-sm">2</span></div>
                                                    <div class="air-cont">
                                                        <div class="air-txt">累积</div>
                                                        <div class="air-txt">剩余</div>
                                                        <div class="air-num">125</div>
                                                        <div class="air-num">033</div>
                                                    </div>
                                                    <div class="air-color color-02"></div>
                                                </li>
                                                <li>
                                                    <div class="air-type">SO<span class="text-sm">2</span></div>
                                                    <div class="air-cont">
                                                        <div class="air-txt">累积</div>
                                                        <div class="air-txt">剩余</div>
                                                        <div class="air-num">175</div>
                                                        <div class="air-num">033</div>
                                                    </div>
                                                    <div class="air-color color-02"></div>
                                                </li>
                                                <li>
                                                    <div class="air-type">CO</div>
                                                    <div class="air-cont">
                                                        <div class="air-txt">累积</div>
                                                        <div class="air-txt">剩余</div>
                                                        <div class="air-num">250</div>
                                                        <div class="air-num">033</div>
                                                    </div>
                                                    <div class="air-color color-03"></div>
                                                </li>
                                                <li>
                                                    <div class="air-type">O<span class="text-sm">3</span></div>
                                                    <div class="air-cont">
                                                        <div class="air-txt">累积</div>
                                                        <div class="air-txt">剩余</div>
                                                        <div class="air-num">350</div>
                                                        <div class="air-num">033</div>
                                                    </div>
                                                    <div class="air-color color-03"></div>
                                                </li>
                                            </ul>
                                        </div>
                                        <!-- 今日排名 -->
                                        <div class="panel mt-sm">
                                            <div class="panel-hd">
                                                <h2 class="panel-tit">今日排名</h2>
                                            </div>
                                            <table class="table-default text-sm">
                                                <colgroup>
                                                    <col style="width: 50px;">
                                                    <col style="width: 100px;">
                                                    <col style="width: 100px;">
                                                    <col style="width: 60px;">
                                                </colgroup>
                                                <thead>
                                                <tr>
                                                    <th style="font-size: 15px;font-weight: 400;color: #1DCEBC;text-align: center">倒数</th>
                                                    <th style="font-size: 15px;font-weight: 400;color: #1DCEBC;text-align: center">城市</th>
                                                    <th style="font-size: 15px;font-weight: 400;color: #1DCEBC;text-align: center">综合指数</th>
                                                    <th style="font-size: 15px;font-weight: 400;color: #1DCEBC;text-align: center">AQI</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td style="font-size: 15px;font-weight: 400;color: #1DCEBC;text-align: center">1</td>
                                                    <td style="font-size: 15px;font-weight: 400;color: #1DCEBC;text-align: center">咸阳</td>
                                                    <td style="font-size: 15px;font-weight: 400;color: #1DCEBC;text-align: center">5.423</td>
                                                    <td style="font-size: 15px;font-weight: 400;color: #1DCEBC;text-align: center">93</td>
                                                </tr>
                                                <tr>
                                                    <td style="font-size: 15px;font-weight: 400;color: #1DCEBC;text-align: center">2</td>
                                                    <td style="font-size: 15px;font-weight: 400;color: #1DCEBC;text-align: center">西安</td>
                                                    <td style="font-size: 15px;font-weight: 400;color: #1DCEBC;text-align: center">5.175</td>
                                                    <td style="font-size: 15px;font-weight: 400;color: #1DCEBC;text-align: center">80</td>
                                                </tr>
                                                <tr>
                                                    <td style="font-size: 15px;font-weight: 400;color: #1DCEBC;text-align: center">3</td>
                                                    <td style="font-size: 15px;font-weight: 400;color: #1DCEBC;text-align: center">汉中</td>
                                                    <td style="font-size: 15px;font-weight: 400;color: #1DCEBC;text-align: center">4.423</td>
                                                    <td style="font-size: 15px;font-weight: 400;color: #1DCEBC;text-align: center">73</td>
                                                </tr>
                                                <tr>
                                                    <td style="font-size: 15px;font-weight: 400;color: #1DCEBC;text-align: center">4</td>
                                                    <td style="font-size: 15px;font-weight: 400;color: #1DCEBC;text-align: center">安康</td>
                                                    <td style="font-size: 15px;font-weight: 400;color: #1DCEBC;text-align: center">5.523</td>
                                                    <td style="font-size: 15px;font-weight: 400;color: #1DCEBC;text-align: center">71</td>
                                                </tr>
                                                <tr>
                                                    <td style="font-size: 15px;font-weight: 400;color: #1DCEBC;text-align: center">5</td>
                                                    <td style="font-size: 15px;font-weight: 400;color: #1DCEBC;text-align: center">铜川</td>
                                                    <td style="font-size: 15px;font-weight: 400;color: #1DCEBC;text-align: center">4.423</td>
                                                    <td style="font-size: 15px;font-weight: 400;color: #1DCEBC;text-align: center">65</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <!-- 今日趋势 -->
                                        <div class="panel mt-sm">
                                            <div class="panel-hd">
                                                <h2 class="panel-tit">今日趋势</h2>
                                            </div>
                                            <div class="panel-bd">
                                                <div class="chart-box">
                                                    <div class="chart-item" id="chart02" style="width:254px;height: 120px;padding: 0px;"></div>
                                                </div>
                                                <ul class="trend-names">
                                                    <li :class="targetTodayAQI02" @click="targetToday02('aqi')">AQI</li>
                                                    <li :class="targetTodayPM2502" @click="targetToday02('pm25')">PM<span class="text-sm">2.5</span></li>
                                                    <li :class="targetTodayPM1002" @click="targetToday02('pm10')">PM<span class="text-sm">10</span></li>
                                                    <li :class="targetTodayNO02" @click="targetToday02('no2')">NO<span class="text-sm">2</span></li>
                                                    <li :class="targetTodayCO02" @click="targetToday02('co')">CO</li>
                                                    <li :class="targetTodaySO202" @click="targetToday02('so2')">SO<span class="text-sm">2</span></li>
                                                    <li :class="targetTodayO302" @click="targetToday02('o3')">O<span class="text-sm">3</span></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <!-- 今日警报 -->
                                        <!-- <div class="panel mt-sm">
                                             <div class="panel-hd">
                                                 <h2 class="panel-tit">今日警报<span class="label-warn">12</span></h2>
                                             </div>
                                             <div class="panel-bd">
                                                 <ul class="alarm-box">
                                                     <li>
                                                         <div class="alarm-num">1</div>
                                                         <div class="alarm-text">国控</div>
                                                     </li>
                                                     <li>
                                                         <div class="alarm-num">5</div>
                                                         <div class="alarm-text">重点区域</div>
                                                     </li>
                                                     <li>
                                                         <div class="alarm-num">18</div>
                                                         <div class="alarm-text">微站</div>
                                                     </li>
                                                     <li>
                                                         <div class="alarm-num circles">7</div>
                                                         <div class="alarm-text">重点区域</div>
                                                     </li>
                                                     <li>
                                                         <div class="alarm-num circles">7</div>
                                                         <div class="alarm-text">污染源</div>
                                                     </li>
                                                     <li>
                                                         <div class="alarm-num">8</div>
                                                         <div class="alarm-text">事件</div>
                                                     </li>
                                                 </ul>
                                             </div>
                                         </div>-->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 重污染管控 -->
                        <div class="tab-emergency" :style="zhongwuran">
                            <!-- 分析核查 -->
                            <div class="tab-box-01">
                                <div class="tab-hd-01">
                                    <ul class="tab-head">
                                        <li class="is-active">管控实况</li>
                                        <!--<li>执行动态</li>-->
                                    </ul>
                                </div>
                                <div class="tab-bd">
                                    <!-- 管控实况 -->
                                    <div class="tab-item" style="display: block;">
                                        <div class="panel">
                                            <div class="panel-hd">
                                                <h2 class="panel-tit">管控趋势</h2>
                                            </div>
                                            <div class="panel-bd pd-b">
                                                <div class="chart-box">
                                                    <div class="chart-item" id="chart03" style="width:244px;height: 120px"></div>
                                                </div>
                                                <ul class="trend-names">
                                                    <li :class="targetTodayAQI03" @click="targetToday03('aqi')">AQI</li>
                                                    <li :class="targetTodayPM2503" @click="targetToday03('pm25')">PM<span class="text-sm">2.5</span></li>
                                                    <li :class="targetTodayPM1003" @click="targetToday03('pm10')">PM<span class="text-sm">10</span></li>
                                                    <li :class="targetTodayNO03" @click="targetToday03('no2')">NO<span class="text-sm">2</span></li>
                                                    <li :class="targetTodayCO03" @click="targetToday03('co')">CO</li>
                                                    <li :class="targetTodaySO203" @click="targetToday03('so2')">SO<span class="text-sm">2</span></li>
                                                    <li :class="targetTodayO303" @click="targetToday03('o3')">O<span class="text-sm">3</span></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="panel mt-sm">
                                            <div class="panel-hd">
                                                <h2 class="panel-tit">异常企业</h2>
                                                <div class="panel-right">
                                                    <a href="javascript:;" class="more" @click="abnormalEnterprise">更多</a>
                                                </div>
                                            </div>
                                            <table class="table-default text-sm">
                                                <colgroup>
                                                    <col style="width: 130px;">
                                                    <col style="width: 100px;">
                                                    <col style="width: 120px;">
                                                </colgroup>
                                                <thead>
                                                <tr>
                                                    <th>企业名称</th>
                                                    <th>异常类型</th>
                                                    <th>时间</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr v-for="item in enterprises">
                                                    <td class="text-default"><div class="ellipsis w110">{{item.enterpriseName}}</div></td>
                                                    <td class="color-level4">{{item.alarmType}}</td>
                                                    <td class="text-default">{{item.alarmTime}}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="panel mt-sm">
                                            <div class="panel-hd">
                                                <h2 class="panel-tit" >报警站点</h2>
                                                <div class="panel-right">
                                                    <a href="javascript:;" class="more" @click="alarmStations">更多</a>
                                                </div>
                                            </div>
                                            <table class="table-default text-sm nowrap">
                                                <thead>
                                                <tr>
                                                    <th>&nbsp;报警时间</th>
                                                    <th>报警站点</th>
                                                    <th>报警参数</th>
                                                    <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;状态</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr v-for="item in alarmStation">
                                                    <td class="Oswald text-default">{{item.alarmTime}}</td>
                                                    <td class="text-default"><div class="ellipsis w60">{{item.stationName}}</div></td>
                                                    <td class="Oswald">{{item.pollutant}}</td>
                                                    <td><div class="level1">{{item.alarmType}}</div></td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="panel mt-sm">
                                            <div class="panel-hd">
                                                <h2 class="panel-tit">超高站点</h2>
                                                <div class="panel-right">
                                                    <a href="javascript:;" class="more" @click="superHighStation">更多</a>
                                                </div>
                                            </div>
                                            <table class="table-default text-sm">
                                                <!--<colgroup>
                                                    <col style="width: 130px;">
                                                    <col style="width: 130px;">
                                                    <col style="width: 120px;">
                                                </colgroup>-->
                                                <thead>
                                                <tr>
                                                    <th>站点</th>
                                                    <th>污染物</th>
                                                    <th>监测值</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr v-for="item in highStation">
                                                    <td class="text-default"><div class="ellipsis w100">{{item.stationName}}</div></td>
                                                    <td class="Oswald">{{item.pollutant}}</td>
                                                    <td class="text-default">{{item.monitorValue}}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <!-- 执行动态 -->
                                    <div class="tab-item">
                                        <div class="panel">
                                            <div class="panel-hd">
                                                <h2 class="panel-tit">下发任务</h2>
                                                <div class="panel-right">
                                                    <a href="javascript:;" class="more">更多</a>
                                                </div>
                                            </div>
                                            <table class="table-default text-sm nowrap">
                                                <thead>
                                                <tr>
                                                    <th>派发时间</th>
                                                    <th>任务名称</th>
                                                    <th>责任部门</th>
                                                    <th>状态</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td class="Oswald text-default">04/30 12:00</td>
                                                    <td>
                                                        <div class="ellipsis w80">三山镇站点</div>
                                                    </td>
                                                    <td><div class="ellipsis w60">环保部</div></td>
                                                    <td><div class="level1">已处理</div></td>
                                                </tr>
                                                <tr>
                                                    <td class="Oswald text-default">04/30 12:00</td>
                                                    <td>
                                                        <div class="ellipsis w80">三山镇站点</div>
                                                    </td>
                                                    <td><div class="ellipsis w60">环保部</div></td>
                                                    <td><div class="level3">待处理</div></td>
                                                </tr>
                                                <tr>
                                                    <td class="Oswald text-default">04/30 12:00</td>
                                                    <td>
                                                        <div class="ellipsis w80">三山镇站点</div>
                                                    </td>
                                                    <td><div class="ellipsis w60">环保部</div></td>
                                                    <td><div class="level3">待处理</div></td>
                                                </tr>
                                                <tr>
                                                    <td class="Oswald text-default">04/30 12:00</td>
                                                    <td>
                                                        <div class="ellipsis w80">三山镇站点</div>
                                                    </td>
                                                    <td><div class="ellipsis w60">环保部</div></td>
                                                    <td><div class="level3">待处理</div></td>
                                                </tr>
                                                <tr>
                                                    <td class="Oswald text-default">04/30 12:00</td>
                                                    <td>
                                                        <div class="ellipsis w80">三山镇站点</div>
                                                    </td>
                                                    <td><div class="ellipsis w60">环保部</div></td>
                                                    <td><div class="level3">待处理</div></td>
                                                </tr>
                                                <tr>
                                                    <td class="Oswald text-default">04/30 12:00</td>
                                                    <td>
                                                        <div class="ellipsis w80">三山镇站点</div>
                                                    </td>
                                                    <td><div class="ellipsis w60">环保部</div></td>
                                                    <td><div class="level3">待处理</div></td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="panel mt-sm">
                                            <div class="panel-hd">
                                                <h2 class="panel-tit">报警处理</h2>
                                                <div class="panel-right">
                                                    <a href="javascript:;" class="more">更多</a>
                                                </div>
                                            </div>
                                            <table class="table-default text-sm nowrap">
                                                <thead>
                                                <tr>
                                                    <th>报警时间</th>
                                                    <th>报警站点</th>
                                                    <th>参数</th>
                                                    <th>状态</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td class="Oswald text-default">04/30 12:00</td>
                                                    <td>
                                                        <div class="ellipsis w80">三山镇站点三山镇站点三山镇站点</div>
                                                    </td>
                                                    <td><div class="ellipsis w60">SO<span class="text-value">2</span></div></td>
                                                    <td><div class="level1">已处理</div></td>
                                                </tr>
                                                <tr>
                                                    <td class="Oswald text-default">04/30 12:00</td>
                                                    <td>
                                                        <div class="ellipsis w80">三山镇站点</div>
                                                    </td>
                                                    <td><div class="ellipsis w60">SO<span class="text-value">2</span></div></td>
                                                    <td><div class="level3">待处理</div></td>
                                                </tr>
                                                <tr>
                                                    <td class="Oswald text-default">04/30 12:00</td>
                                                    <td>
                                                        <div class="ellipsis w80">三山镇站点</div>
                                                    </td>
                                                    <td><div class="ellipsis w60">SO<span class="text-value">2</span></div></td>
                                                    <td><div class="level3">待处理</div></td>
                                                </tr>
                                                <tr>
                                                    <td class="Oswald text-default">04/30 12:00</td>
                                                    <td>
                                                        <div class="ellipsis w80">三山镇站点</div>
                                                    </td>
                                                    <td><div class="ellipsis w60">SO<span class="text-value">2</span></div></td>
                                                    <td><div class="level3">待处理</div></td>
                                                </tr>
                                                <tr>
                                                    <td class="Oswald text-default">04/30 12:00</td>
                                                    <td>
                                                        <div class="ellipsis w80">三山镇站点</div>
                                                    </td>
                                                    <td><div class="ellipsis w60">SO<span class="text-value">2</span></div></td>
                                                    <td><div class="level3">待处理</div></td>
                                                </tr>
                                                <tr>
                                                    <td class="Oswald text-default">04/30 12:00</td>
                                                    <td>
                                                        <div class="ellipsis w80">三山镇站点</div>
                                                    </td>
                                                    <td><div class="ellipsis w60">SO<span class="text-value">2</span></div></td>
                                                    <td><div class="level3">待处理</div></td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="panel mt-sm">
                                            <div class="panel-hd">
                                                <h2 class="panel-tit">事件处理</h2>
                                                <div class="panel-right">
                                                    <a href="javascript:;" class="more">更多</a>
                                                </div>
                                            </div>
                                            <table class="table-default text-sm nowrap">
                                                <thead>
                                                <tr>
                                                    <th>上报时间</th>
                                                    <th>事件名称</th>
                                                    <th>上报人</th>
                                                    <th>状态</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td class="Oswald text-default">04/30 12:00</td>
                                                    <td>
                                                        <div class="ellipsis w80">三山镇站点</div>
                                                    </td>
                                                    <td><div class="ellipsis w60">周杰伦</div></td>
                                                    <td><div class="level1">已处理</div></td>
                                                </tr>
                                                <tr>
                                                    <td class="Oswald text-default">04/30 12:00</td>
                                                    <td>
                                                        <div class="ellipsis w80">三山镇站点</div>
                                                    </td>
                                                    <td><div class="ellipsis w60">周杰伦</div></td>
                                                    <td><div class="level3">待处理</div></td>
                                                </tr>
                                                <tr>
                                                    <td class="Oswald text-default">04/30 12:00</td>
                                                    <td>
                                                        <div class="ellipsis w80">三山镇站点</div>
                                                    </td>
                                                    <td><div class="ellipsis w60">周杰伦</div></td>
                                                    <td><div class="level3">待处理</div></td>
                                                </tr>
                                                <tr>
                                                    <td class="Oswald text-default">04/30 12:00</td>
                                                    <td>
                                                        <div class="ellipsis w80">三山镇站点</div>
                                                    </td>
                                                    <td><div class="ellipsis w60">周杰伦</div></td>
                                                    <td><div class="level3">待处理</div></td>
                                                </tr>
                                                <tr>
                                                    <td class="Oswald text-default">04/30 12:00</td>
                                                    <td>
                                                        <div class="ellipsis w80">三山镇站点</div>
                                                    </td>
                                                    <td><div class="ellipsis w60">周杰伦</div></td>
                                                    <td><div class="level3">待处理</div></td>
                                                </tr>
                                                <tr>
                                                    <td class="Oswald text-default">04/30 12:00</td>
                                                    <td>
                                                        <div class="ellipsis w80">三山镇站点</div>
                                                    </td>
                                                    <td><div class="ellipsis w60">周杰伦</div></td>
                                                    <td><div class="level3">待处理</div></td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
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
    import getChartOnlineData from './echarts/charts01'
    import getChartOnlineData02 from './echarts/charts02'
    import getChartOnlineData03 from './echarts/charts03'
    import MapComponent from "./map/MapComponent.vue";
    import MapPopUp from "./map/MapPopUp.vue";
    import LayerComponent from "./map/LayerComponent.vue";
    import HeaderToolButton from "./map/headerTool.vue";
    import maplegend from "./map/map_legend.vue";

    export default {
        name: "dynamicControlHTML",
        components: {
            MapComponent: MapComponent,MapPopUp,LayerComponent,HeaderToolButton,maplegend
        },
        data(){
            return{
                cumulative : {
                    aqi: 0,
                    co: 0,
                    no2: 0,
                    o3: 0,
                    pm10: 0,
                    pm25: 0,
                    so2: 0
                },
                surplus: {
                    aqi: 0,
                    co: 0,
                    no2: 0,
                    o3: 0,
                    pm10: 0,
                    pm25: 0,
                    so2: 0
                },
                dashboard:'transform: rotate(0deg)',
                airDashboard:'transform: rotate(0deg)',
                areaCode: this.AppConfig.appInfo.regionCode,
                regionId:this.AppConfig.appInfo.regionId,
                targetTodayAQI:'',
                targetTodayPM25:'',
                targetTodayPM10:'',
                targetTodayNO:'',
                targetTodayCO:'',
                targetTodaySO2:'',
                targetTodayO3:'',
                targetTodayAQI02:'',
                targetTodayPM2502:'',
                targetTodayPM1002:'',
                targetTodayNO02:'',
                targetTodayCO02:'',
                targetTodaySO202:'',
                targetTodayO302:'',
                targetTodayAQI03:'',
                targetTodayPM2503:'',
                targetTodayPM1003:'',
                targetTodayNO03:'',
                targetTodayCO03:'',
                targetTodaySO203:'',
                targetTodayO303:'',
                controlclass01:'is-active',
                controlclass02:'',
                display01:"display: block;",
                display02:'',
                enterprises:[],
                alarmStation:[],
                highStation:[],
                eventCount:0,
                stateControl:0,
            provincialControl:0,
                miniature:0,
                cityCount:0,
                tatolCount:0,
                sourceCount:0,
                shishi:'display: block;',
                zhongwuran:'',
                biaozun:'is-active',
                dabiao:'',
                tongjitusuzhi:'display: block;',
                kuandu:'width: 280px;'
            }
        },
        mounted() {
            this.showEnterprises();
            this.showHighStation();
            this.showHighAlarmStation();
            this.targetToday('aqi');
            this.showEventCount();
        },
        methods: {
            tongjitu(){
                if(this.tongjitusuzhi=='display: block;'){
                    this.tongjitusuzhi = 'display: none;';
                    this.kuandu = 'width: 34px;';
                }else{
                    this.tongjitusuzhi='display: block;';
                    this.kuandu = 'width: 280px;';
                }
            },
            reachTarget(){
                var _this = this;
                var url = '/aircontrol/airdiagnosis/api/areaMonitorData/reachTarget?areaCode='+_this.areaCode;
                _this.$axios.get(url,).then(
                    function (res) {
                        if(res.cumulative!=null){
                            _this.cumulative = res.cumulative;
                        }
                        if(res.surplus!=null){
                            _this.surplus = res.surplus;
                        }
                        _this.dashboard = 'transform: rotate('+ _this.cumulative.aqi*0.6 +'deg)';
                    }
                )
            },
            showEnterprises(){
                var _this = this;
                var url = '/aircontrol/airdiagnosis/api/station/exceptionEnt?areaCode='+_this.areaCode+'&limit=4';
                _this.$axios.get(url,).then(
                    function (res) {
                        _this.enterprises = [];
                        if(res!=null) {
                            for(var i =0;i<res.length;i++){
                                var obj = {
                                    enterpriseName: res[i].enterpriseName,
                                    alarmType: res[i].alarmType,
                                    alarmTime:  _this.resolvingDate(res[i].alarmTime)
                                }
                                _this.enterprises.push(obj);
                            }
                        }
                    }
                )
            },
            showHighAlarmStation(){
                var _this = this;
                var url = '/aircontrol/airdiagnosis/api/station/alarmStation?areaCode='+_this.areaCode+'&limit=4';
                _this.$axios.get(url,).then(
                    function (res) {
                        if(res!=null) {
                            _this.alarmStation = [];
                            for(var i =0;i<res.length;i++){
                                var obj = {
                                    stationName: res[i].stationName,
                                    alarmType: res[i].alarmType,
                                    alarmTime:  _this.resolvingDate(res[i].alarmTime),
                                    pollutant: res[i].pollutant
                                }
                                _this.alarmStation.push(obj);
                            }
                        }
                    }
                )
            },
            showHighStation(){
                var _this = this;
                var url = '/aircontrol/airdiagnosis/api/station/highStation?areaCode='+_this.areaCode+'&limit=4';
                _this.$axios.get(url,).then(
                    function (res) {
                        if(res!=null) {
                            _this.highStation = [];
                            for(var i =0;i<res.length;i++){
                                var obj = {
                                    stationName: res[i].stationName,
                                    monitorValue: res[i].monitorValue,
                                    pollutant: res[i].pollutant
                                }
                                _this.highStation.push(obj);
                            }
                        }
                        console.log(_this.highStation)
                    }
                )
            },
            showEventCount(){
                var _this = this;
                var url = '/aircontrol/event/external/event/selectIncompleteEventCount';
                var params = new URLSearchParams();
                params.append('selectEventJson','{\"eventSource\":2,\"regionId\":'+_this.regionId+'}');
                _this.$axios.post(url,params).then(
                    function (res) {
                        if(res.code == 0) {
                            _this.todaycount();
                            _this.sourceCountShow();
                            _this.eventCount = res.data;
                            _this.tatolCount= _this.eventCount+_this.stateControl+_this.provincialControl+_this.miniature+_this.cityCount+_this.sourceCount;

                        }
                    }
                )
            },
            todaycount(){
                var _this = this;
                var url = '/aircontrol/airdiagnosis/api/alarmData/todaycount?areaCode='+_this.areaCode;
                _this.$axios.get(url,).then(
                    function (res) {
                        if(res!=null) {
                            //debugger;
                            for(var i = 0;i<res.length;i++){
                                if(res[i].type ==='国控站'){
                                    _this.stateControl = res[i].count;
                                }else if(res[i].type ==='省控站'){
                                    _this.provincialControl = res[i].count;
                                }else if(res[i].type ==='微型站'){
                                    _this.miniature = res[i].count;
                                }else if(res[i].type ==='市控站'|| res[i].type ==='标准站点'){
                                    _this.cityCount = res[i].count;
                                }
                            }
                            _this.tatolCount= _this.eventCount+_this.stateControl+_this.provincialControl+_this.miniature+_this.cityCount+_this.sourceCount;
                        }
                    }
                )
            },
            sourceCountShow(){
                var _this = this;
                var url = '/aircontrol/airdiagnosis/api/alarmData/pollution?areaCode='+_this.areaCode;
                _this.$axios.get(url,).then(
                    function (res) {
                        if(res!=null) {
                            _this.sourceCount = res;
                            _this.tatolCount= _this.eventCount+_this.stateControl+_this.provincialControl+_this.miniature+_this.cityCount+_this.sourceCount;
                        }
                    }
                )
            },
            targetToday(type){
                this.targetTodayAQI='';
                this.targetTodayPM25='';
                this.targetTodayPM10='';
                this.targetTodayNO='';
                this.targetTodayCO='';
                this.targetTodaySO2='';
                this.targetTodayO3='';
                if(type=='aqi'){
                    this.targetTodayAQI='is-active';
                }else if(type=='no2'){
                    this.targetTodayNO='is-active';
                }else if(type=='pm25'){
                    this.targetTodayPM25='is-active';
                }else if(type=='o3'){
                    this.targetTodayO3='is-active';
                }else if(type=='so2'){
                    this.targetTodaySO2='is-active';
                }else if(type=='pm10'){
                    this.targetTodayPM10='is-active';
                }else if(type=='co'){
                    this.targetTodayCO='is-active';
                }
                getChartOnlineData(type,this);
            },
            targetToday02(type){
                this.targetTodayAQI02='';
                this.targetTodayPM2502='';
                this.targetTodayPM1002='';
                this.targetTodayNO02='';
                this.targetTodayCO02='';
                this.targetTodaySO202='';
                this.targetTodayO302='';
                if(type=='aqi'){
                    this.targetTodayAQI02='is-active';
                }else if(type=='no2'){
                    this.targetTodayNO02='is-active';
                }else if(type=='pm25'){
                    this.targetTodayPM2502='is-active';
                }else if(type=='o3'){
                    this.targetTodayO302='is-active';
                }else if(type=='so2'){
                    this.targetTodaySO202='is-active';
                }else if(type=='pm10'){
                    this.targetTodayPM1002='is-active';
                }else if(type=='co'){
                    this.targetTodayCO02='is-active';
                }
                getChartOnlineData02(type,this);
            },
            targetToday03(type){
                this.targetTodayAQI03='';
                this.targetTodayPM2503='';
                this.targetTodayPM1003='';
                this.targetTodayNO03='';
                this.targetTodayCO03='';
                this.targetTodaySO203='';
                this.targetTodayO303='';
                if(type=='aqi'){
                    this.targetTodayAQI03='is-active';
                }else if(type=='no2'){
                    this.targetTodayNO03='is-active';
                }else if(type=='pm25'){
                    this.targetTodayPM2503='is-active';
                }else if(type=='o3'){
                    this.targetTodayO303='is-active';
                }else if(type=='so2'){
                    this.targetTodaySO203='is-active';
                }else if(type=='pm10'){
                    this.targetTodayPM1003='is-active';
                }else if(type=='co'){
                    this.targetTodayCO03='is-active';
                }
                getChartOnlineData03(type,this);
            },
            control01(){
                this.controlclass02= '';
                this.zhongwuran= '';
                this.controlclass01='is-active';
                this.shishi="display: block;";
            },
            control02(){
                this.controlclass01 = '';
                this.shishi= '';
                this.controlclass02='is-active';
                this.zhongwuran="display: block;";
                this.showEnterprises();
                this.showHighStation();
                this.showHighAlarmStation();
                this.targetToday03('aqi');
            },
            targetSelection(){
                this.reachTarget();
                this.targetToday('aqi');
                this.control01();
                this.showEventCount();
                this.dashboard = 'transform: rotate('+ this.cumulative.aqi*0.6 +'deg)';
                this.display01 = "display: block;";
                this.display02 = "";
                this.biaozun = 'is-active';
                this.dabiao = '';
            },
            rankingChoice(){
                this.display01 = "";
                this.display02 = "display: block;";
                this.targetToday02('aqi');
                this.airDashboard = 'transform: rotate(60deg)';
                this.biaozun = '';
                this.dabiao = 'is-active';
            },
            resolvingDate(date){
                //date是传入的时间
                let d = new Date(date);
                let month = (d.getMonth() + 1) < 10 ? '0'+(d.getMonth() + 1) : (d.getMonth() + 1);
                let day = d.getDate()<10 ? '0'+d.getDate() : d.getDate();
                let hours = d.getHours()<10 ? '0'+d.getHours() : d.getHours();
                let min = d.getMinutes()<10 ? '0'+d.getMinutes() : d.getMinutes();
                let sec = d.getSeconds()<10 ? '0'+d.getSeconds() : d.getSeconds();
                let times=month + '/' + day + ' ' + hours + ':' + min;
                return times
            },
            abnormalEnterprise(){
                this.AppConfig.appInfo.checkedOrNot =6;
                this.$router.push({path: '/EnterpriseArchives', query: {queryData: "3"}});
            },
            alarmStations(){
                this.$router.push({path: '/MonitorAlarm', query: {}});
            },
            superHighStation(){
                this.$router.push({path: '/MonitorAlarm', query: {}});
            },

        }
    }


</script>

<style scoped  lang="less">
    //@import url("https://js.arcgis.com/4.13/esri/themes/light/main.css");
    @import url("http://10.0.200.201:8081/arcgis_js_api/library/4.11/esri/themes/light/main.css");
    #popUpDiv{
        width:420px;
        height:300px;
        position: absolute;
        right: 800px;
        bottom:150px;
        z-index: 1999;
        display: none;
    }
</style>