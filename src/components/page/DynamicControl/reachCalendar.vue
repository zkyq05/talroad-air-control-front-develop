<template>
    <div class="main-con">
        <div class="panel-default" style="padding-top: 0px">
            <div class="panel-bd pd-lg">
                <ul class="filter-box">
                    <li class="filter-item">
                        <div class="filter-label">时间范围</div>
                        <div class="filter-con">
                            <el-date-picker
                                    type="year"
                                    format="yyyy" value-format="yyyy"
                                    v-model="myYear"
                                    @change="chage"
                                    placeholder="选择年">
                            </el-date-picker>
                        </div>
                    </li>
                    <li class="filter-item ml-lger">
                        <div class="filter-label">空气指标</div>
                        <div class="filter-con">
                            <div class="el-button-group">
                                <button type="button" id="aqi" @click="getPollutant('AQI')" :class="targetTodayAQI"><!----><!----><span>AQI</span></button>
                                <button type="button" @click="getPollutant('PM10')" class="el-button"><!----><!----><span>PM<i class="text-value">10</i></span></button>
                                <button type="button" @click="getPollutant('PM2.5')" class="el-button"><!----><!----><span>PM<i class="text-value">2.5</i></span></button>
                                <button type="button" @click="getPollutant('SO2')" class="el-button"><!----><!----><span>SO<i class="text-value">2</i></span></button>
                                <button type="button" @click="getPollutant('NO2')" class="el-button"><!----><!----><span>NO<i class="text-value">2</i></span></button>
                                <button type="button" @click="getPollutant('CO')" class="el-button"><!----><!----><span>CO</span></button>
                                <button type="button" @click="getPollutant('O3')" class="el-button"><!----><!----><span>O<i class="text-value">3</i></span></button></div>
                        </div>
                    </li>
                </ul>
            </div>
            <!--<span style="margin-left: 10px;margin-right: 10px">时间范围</span>
            <el-date-picker
                    type="year"
                    format="yyyy" value-format="yyyy"
                    v-model="myYear"
                    @change="chage"
                    placeholder="选择年">
            </el-date-picker>-->
        </div>
        <!--<div class="panel-default" style="padding-bottom: 5px">
            <span style="margin-left: 10px;margin-right: 10px">空气指标</span>
            &lt;!&ndash;<span ><el-button id="aqi" type="text" @click="getPollutant('AQI')">AQI</el-button></span>
            <span ><el-button type="text" @click="getPollutant('PM10')">PM10</el-button></span >
            <span ><el-button type="text" @click="getPollutant('PM2.5')">PM2.5</el-button></span>
            <span ><el-button type="text" @click="getPollutant('SO2')">SO2</el-button></span>
            <span ><el-button type="text" @click="getPollutant('NO2')">NO2</el-button></span>
            <span ><el-button type="text" @click="getPollutant('CO')">CO</el-button></span>
            <span ><el-button type="text" @click="getPollutant('O3')">O3</el-button></span>&ndash;&gt;
            <div class="filter-con">
                <div class="el-button-group"><button type="button" class="el-button el-button&#45;&#45;primary">&lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;<span>AQI</span></button><button type="button" class="el-button">&lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;<span>PM<i class="text-value">10</i></span></button><button type="button" class="el-button">&lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;<span>PM<i class="text-value">2.5</i></span></button><button type="button" class="el-button">&lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;<span>SO<i class="text-value">2</i></span></button><button type="button" class="el-button">&lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;<span>NO<i class="text-value">2</i></span></button><button type="button" class="el-button">&lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;<span>CO</span></button><button type="button" class="el-button">&lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;<span>O<i class="text-value">3</i></span></button></div>
            </div>
        </div>-->
        <div class="panel-default mt-lg">
            <div class="panel-hd">
                <h2 class="panel-tit">{{myYear}}年全年统计</h2>
            </div>
            <div class="panel-bd">
                <ul class="quality-number">
                    <li>
                        <div class="quality-num color-level1">{{gooddays}}</div>
                        <div class="quality-text">达标</div>
                    </li>
                    <li>
                        <div class="quality-num color-level2">{{baddays}}</div>
                        <div class="quality-text">未达标</div>
                    </li>
                    <li>
                        <div class="quality-num color-level3">{{total}}</div>
                        <div class="quality-text">共计</div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 年 -->
        <div class="el-row mt-lg" style="margin-left: -15px; margin-right: -15px;">
            <div class="el-col el-col-12" style="padding-left: 15px; padding-right: 15px;">
                <div class="panel-default">
                    <div class="panel-hd">
                        <h2 class="panel-tit">一月</h2>
                    </div>
                    <table class="table-aqi">
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
                                <div :class="days[(index*7)].itemDayClass">
                                    <div class="day-num">{{days[(index*7)].day.getDate() }}</div>

                                    <div class="day-info" v-if="days[(index*7)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days[(index*7+1)].itemDayClass">
                                    <div class="day-num">{{days[(index*7+1)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days[(index*7+1)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days[(index*7+2)].itemDayClass">
                                    <div class="day-num">{{days[(index*7+2)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days[(index*7+2)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days[(index*7+3)].itemDayClass">
                                    <div class="day-num">{{days[(index*7+3)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days[(index*7+3)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days[(index*7+4)].itemDayClass">
                                    <div class="day-num">{{days[(index*7+4)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days[(index*7+4)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days[(index*7+5)].itemDayClass">
                                    <div class="day-num">{{days[(index*7+5)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days[(index*7+5)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days[(index*7+6)].itemDayClass">
                                    <div class="day-num">{{days[(index*7+6)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days[(index*7+6)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <div class="panel-hd">
                        <span style="padding-left: 10%"><span class="circle-01 bg-level1"></span>达标:{{notoverdays1}}天</span>
                        <span style="padding-left: 42%"><span class="circle-01 bg-level4"></span>未达标:{{overdays1}}天</span>
                    </div>
                </div>
            </div>
            <div class="el-col el-col-12" style="padding-left: 15px; padding-right: 15px;">
                <div class="panel-default">
                    <div class="panel-hd">
                        <h2 class="panel-tit">二月</h2>
                    </div>
                    <table class="table-aqi">
                        <tr>
                            <th>周日</th>
                            <th>周一</th>
                            <th>周二</th>
                            <th>周三</th>
                            <th>周四</th>
                            <th>周五</th>
                            <th>周六</th>
                        </tr>
                        <tr v-for="(dayobject,index) in days2" v-if="index < fiveOrSix2">
                            <td>
                                <div :class="days2[(index*7)].itemDayClass">
                                    <div class="day-num">{{days2[(index*7)].day.getDate() }}</div>

                                    <div class="day-info" v-if="days2[(index*7)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days2[(index*7+1)].itemDayClass">
                                    <div class="day-num">{{days2[(index*7+1)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days2[(index*7+1)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days2[(index*7+2)].itemDayClass">
                                    <div class="day-num">{{days2[(index*7+2)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days2[(index*7+2)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days2[(index*7+3)].itemDayClass">
                                    <div class="day-num">{{days2[(index*7+3)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days2[(index*7+3)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days2[(index*7+4)].itemDayClass">
                                    <div class="day-num">{{days2[(index*7+4)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days2[(index*7+4)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days2[(index*7+5)].itemDayClass">
                                    <div class="day-num">{{days2[(index*7+5)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days2[(index*7+5)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days2[(index*7+6)].itemDayClass">
                                    <div class="day-num">{{days2[(index*7+6)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days2[(index*7+6)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <div class="panel-hd">
                        <span style="padding-left: 10%"><span class="circle-01 bg-level1"></span>达标:{{notoverdays2}}天</span>
                        <span style="padding-left: 42%"><span class="circle-01 bg-level4"></span>未达标:{{overdays2}}天</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="el-row mt-lg" style="margin-left: -15px; margin-right: -15px;">
            <div class="el-col el-col-12" style="padding-left: 15px; padding-right: 15px;">
                <div class="panel-default">
                    <div class="panel-hd">
                        <h2 class="panel-tit">三月</h2>
                    </div>
                    <table class="table-aqi">
                        <tr>
                            <th>周日</th>
                            <th>周一</th>
                            <th>周二</th>
                            <th>周三</th>
                            <th>周四</th>
                            <th>周五</th>
                            <th>周六</th>
                        </tr>
                        <tr v-for="(dayobject,index) in days3" v-if="index < fiveOrSix3">
                            <td>
                                <div :class="days3[(index*7)].itemDayClass">
                                    <div class="day-num">{{days3[(index*7)].day.getDate() }}</div>

                                    <div class="day-info" v-if="days3[(index*7)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days3[(index*7+1)].itemDayClass">
                                    <div class="day-num">{{days3[(index*7+1)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days3[(index*7+1)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days3[(index*7+2)].itemDayClass">
                                    <div class="day-num">{{days3[(index*7+2)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days3[(index*7+2)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days3[(index*7+3)].itemDayClass">
                                    <div class="day-num">{{days3[(index*7+3)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days3[(index*7+3)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days3[(index*7+4)].itemDayClass">
                                    <div class="day-num">{{days3[(index*7+4)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days3[(index*7+4)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days3[(index*7+5)].itemDayClass">
                                    <div class="day-num">{{days3[(index*7+5)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days3[(index*7+5)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days3[(index*7+6)].itemDayClass">
                                    <div class="day-num">{{days3[(index*7+6)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days3[(index*7+6)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <div class="panel-hd">
                        <span style="padding-left: 10%"><span class="circle-01 bg-level1"></span>达标:{{notoverdays3}}天</span>
                        <span style="padding-left: 42%"><span class="circle-01 bg-level4"></span>未达标:{{overdays3}}天</span>
                    </div>
                </div>
            </div>
            <div class="el-col el-col-12" style="padding-left: 15px; padding-right: 15px;">
                <div class="panel-default">
                    <div class="panel-hd">
                        <h2 class="panel-tit">四月</h2>
                    </div>
                    <table class="table-aqi">
                        <tr>
                            <th>周日</th>
                            <th>周一</th>
                            <th>周二</th>
                            <th>周三</th>
                            <th>周四</th>
                            <th>周五</th>
                            <th>周六</th>
                        </tr>
                        <tr v-for="(dayobject,index) in days4" v-if="index < fiveOrSix4">
                            <td>
                                <div :class="days4[(index*7)].itemDayClass">
                                    <div class="day-num">{{days4[(index*7)].day.getDate() }}</div>

                                    <div class="day-info" v-if="days4[(index*7)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days4[(index*7+1)].itemDayClass">
                                    <div class="day-num">{{days4[(index*7+1)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days4[(index*7+1)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days4[(index*7+2)].itemDayClass">
                                    <div class="day-num">{{days4[(index*7+2)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days4[(index*7+2)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days4[(index*7+3)].itemDayClass">
                                    <div class="day-num">{{days4[(index*7+3)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days4[(index*7+3)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days4[(index*7+4)].itemDayClass">
                                    <div class="day-num">{{days4[(index*7+4)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days4[(index*7+4)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days4[(index*7+5)].itemDayClass">
                                    <div class="day-num">{{days4[(index*7+5)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days4[(index*7+5)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days4[(index*7+6)].itemDayClass">
                                    <div class="day-num">{{days4[(index*7+6)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days4[(index*7+6)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <div class="panel-hd">
                        <span style="padding-left: 10%"><span class="circle-01 bg-level1"></span>达标:{{notoverdays4}}天</span>
                        <span style="padding-left: 42%"><span class="circle-01 bg-level4"></span>未达标:{{overdays4}}天</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="el-row mt-lg" style="margin-left: -15px; margin-right: -15px;">
            <div class="el-col el-col-12" style="padding-left: 15px; padding-right: 15px;">
                <div class="panel-default">
                    <div class="panel-hd">
                        <h2 class="panel-tit">五月</h2>
                    </div>
                    <table class="table-aqi">
                        <tr>
                            <th>周日</th>
                            <th>周一</th>
                            <th>周二</th>
                            <th>周三</th>
                            <th>周四</th>
                            <th>周五</th>
                            <th>周六</th>
                        </tr>
                        <tr v-for="(dayobject,index) in days5" v-if="index < fiveOrSix5">
                            <td>
                                <div :class="days5[(index*7)].itemDayClass">
                                    <div class="day-num">{{days5[(index*7)].day.getDate() }}</div>

                                    <div class="day-info" v-if="days5[(index*7)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days5[(index*7+1)].itemDayClass">
                                    <div class="day-num">{{days5[(index*7+1)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days5[(index*7+1)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days5[(index*7+2)].itemDayClass">
                                    <div class="day-num">{{days5[(index*7+2)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days5[(index*7+2)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days5[(index*7+3)].itemDayClass">
                                    <div class="day-num">{{days5[(index*7+3)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days5[(index*7+3)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days5[(index*7+4)].itemDayClass">
                                    <div class="day-num">{{days5[(index*7+4)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days5[(index*7+4)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days5[(index*7+5)].itemDayClass">
                                    <div class="day-num">{{days5[(index*7+5)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days5[(index*7+5)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days5[(index*7+6)].itemDayClass">
                                    <div class="day-num">{{days5[(index*7+6)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days5[(index*7+6)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <div class="panel-hd">
                        <span style="padding-left: 10%"><span class="circle-01 bg-level1"></span>达标:{{notoverdays5}}天</span>
                        <span style="padding-left: 42%"><span class="circle-01 bg-level4"></span>未达标:{{overdays5}}天</span>
                    </div>
                </div>
            </div>
            <div class="el-col el-col-12" style="padding-left: 15px; padding-right: 15px;">
                <div class="panel-default">
                    <div class="panel-hd">
                        <h2 class="panel-tit">六月</h2>
                    </div>
                    <table class="table-aqi">
                        <tr>
                            <th>周日</th>
                            <th>周一</th>
                            <th>周二</th>
                            <th>周三</th>
                            <th>周四</th>
                            <th>周五</th>
                            <th>周六</th>
                        </tr>
                        <tr v-for="(dayobject,index) in days6" v-if="index < fiveOrSix6">
                            <td>
                                <div :class="days6[(index*7)].itemDayClass">
                                    <div class="day-num">{{days6[(index*7)].day.getDate() }}</div>

                                    <div class="day-info" v-if="days6[(index*7)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days6[(index*7+1)].itemDayClass">
                                    <div class="day-num">{{days6[(index*7+1)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days6[(index*7+1)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days6[(index*7+2)].itemDayClass">
                                    <div class="day-num">{{days6[(index*7+2)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days6[(index*7+2)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days6[(index*7+3)].itemDayClass">
                                    <div class="day-num">{{days6[(index*7+3)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days6[(index*7+3)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days6[(index*7+4)].itemDayClass">
                                    <div class="day-num">{{days6[(index*7+4)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days6[(index*7+4)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days6[(index*7+5)].itemDayClass">
                                    <div class="day-num">{{days6[(index*7+5)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days6[(index*7+5)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days6[(index*7+6)].itemDayClass">
                                    <div class="day-num">{{days6[(index*7+6)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days6[(index*7+6)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <div class="panel-hd">
                        <span style="padding-left: 10%"><span class="circle-01 bg-level1"></span>达标:{{notoverdays6}}天</span>
                        <span style="padding-left: 42%"><span class="circle-01 bg-level4"></span>未达标:{{overdays6}}天</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="el-row mt-lg" style="margin-left: -15px; margin-right: -15px;">
            <div class="el-col el-col-12" style="padding-left: 15px; padding-right: 15px;">
                <div class="panel-default">
                    <div class="panel-hd">
                        <h2 class="panel-tit">七月</h2>
                    </div>
                    <table class="table-aqi">
                        <tr>
                            <th>周日</th>
                            <th>周一</th>
                            <th>周二</th>
                            <th>周三</th>
                            <th>周四</th>
                            <th>周五</th>
                            <th>周六</th>
                        </tr>
                        <tr v-for="(dayobject,index) in days7" v-if="index < fiveOrSix7">
                            <td>
                                <div :class="days7[(index*7)].itemDayClass">
                                    <div class="day-num">{{days7[(index*7)].day.getDate() }}</div>

                                    <div class="day-info" v-if="days7[(index*7)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days7[(index*7+1)].itemDayClass">
                                    <div class="day-num">{{days7[(index*7+1)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days7[(index*7+1)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days7[(index*7+2)].itemDayClass">
                                    <div class="day-num">{{days7[(index*7+2)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days7[(index*7+2)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days7[(index*7+3)].itemDayClass">
                                    <div class="day-num">{{days7[(index*7+3)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days7[(index*7+3)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days7[(index*7+4)].itemDayClass">
                                    <div class="day-num">{{days7[(index*7+4)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days7[(index*7+4)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days7[(index*7+5)].itemDayClass">
                                    <div class="day-num">{{days7[(index*7+5)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days7[(index*7+5)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days7[(index*7+6)].itemDayClass">
                                    <div class="day-num">{{days7[(index*7+6)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days7[(index*7+6)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <div class="panel-hd">
                        <span style="padding-left: 10%"><span class="circle-01 bg-level1"></span>达标:{{notoverdays7}}天</span>
                        <span style="padding-left: 42%"><span class="circle-01 bg-level4"></span>未达标:{{overdays7}}天</span>
                    </div>
                </div>
            </div>
            <div class="el-col el-col-12" style="padding-left: 15px; padding-right: 15px;">
                <div class="panel-default">
                    <div class="panel-hd">
                        <h2 class="panel-tit">八月</h2>
                    </div>
                    <table class="table-aqi">
                        <tr>
                            <th>周日</th>
                            <th>周一</th>
                            <th>周二</th>
                            <th>周三</th>
                            <th>周四</th>
                            <th>周五</th>
                            <th>周六</th>
                        </tr>
                        <tr v-for="(dayobject,index) in days8" v-if="index < fiveOrSix8">
                            <td>
                                <div :class="days8[(index*7)].itemDayClass">
                                    <div class="day-num">{{days8[(index*7)].day.getDate() }}</div>

                                    <div class="day-info" v-if="days8[(index*7)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days8[(index*7+1)].itemDayClass">
                                    <div class="day-num">{{days8[(index*7+1)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days8[(index*7+1)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days8[(index*7+2)].itemDayClass">
                                    <div class="day-num">{{days8[(index*7+2)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days8[(index*7+2)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days8[(index*7+3)].itemDayClass">
                                    <div class="day-num">{{days8[(index*7+3)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days8[(index*7+3)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days8[(index*7+4)].itemDayClass">
                                    <div class="day-num">{{days8[(index*7+4)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days8[(index*7+4)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days8[(index*7+5)].itemDayClass">
                                    <div class="day-num">{{days8[(index*7+5)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days8[(index*7+5)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days8[(index*7+6)].itemDayClass">
                                    <div class="day-num">{{days8[(index*7+6)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days8[(index*7+6)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <div class="panel-hd">
                        <span style="padding-left: 10%"><span class="circle-01 bg-level1"></span>达标:{{notoverdays8}}天</span>
                        <span style="padding-left: 42%"><span class="circle-01 bg-level4"></span>未达标:{{overdays8}}天</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="el-row mt-lg" style="margin-left: -15px; margin-right: -15px;">
            <div class="el-col el-col-12" style="padding-left: 15px; padding-right: 15px;">
                <div class="panel-default">
                    <div class="panel-hd">
                        <h2 class="panel-tit">九月</h2>
                    </div>
                    <table class="table-aqi">
                        <tr>
                            <th>周日</th>
                            <th>周一</th>
                            <th>周二</th>
                            <th>周三</th>
                            <th>周四</th>
                            <th>周五</th>
                            <th>周六</th>
                        </tr>
                        <tr v-for="(dayobject,index) in days9" v-if="index < fiveOrSix9">
                            <td>
                                <div :class="days9[(index*7)].itemDayClass">
                                    <div class="day-num">{{days9[(index*7)].day.getDate() }}</div>

                                    <div class="day-info" v-if="days9[(index*7)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days9[(index*7+1)].itemDayClass">
                                    <div class="day-num">{{days9[(index*7+1)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days9[(index*7+1)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days9[(index*7+2)].itemDayClass">
                                    <div class="day-num">{{days9[(index*7+2)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days9[(index*7+2)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days9[(index*7+3)].itemDayClass">
                                    <div class="day-num">{{days9[(index*7+3)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days9[(index*7+3)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days9[(index*7+4)].itemDayClass">
                                    <div class="day-num">{{days9[(index*7+4)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days9[(index*7+4)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days9[(index*7+5)].itemDayClass">
                                    <div class="day-num">{{days9[(index*7+5)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days9[(index*7+5)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days9[(index*7+6)].itemDayClass">
                                    <div class="day-num">{{days9[(index*7+6)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days9[(index*7+6)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <div class="panel-hd">
                        <span style="padding-left: 10%"><span class="circle-01 bg-level1"></span>达标:{{notoverdays9}}天</span>
                        <span style="padding-left: 42%"><span class="circle-01 bg-level4"></span>未达标:{{overdays9}}天</span>
                    </div>
                </div>
            </div>
            <div class="el-col el-col-12" style="padding-left: 15px; padding-right: 15px;">
                <div class="panel-default">
                    <div class="panel-hd">
                        <h2 class="panel-tit">十月</h2>
                    </div>
                    <table class="table-aqi">
                        <tr>
                            <th>周日</th>
                            <th>周一</th>
                            <th>周二</th>
                            <th>周三</th>
                            <th>周四</th>
                            <th>周五</th>
                            <th>周六</th>
                        </tr>
                        <tr v-for="(dayobject,index) in days10" v-if="index < fiveOrSix10">
                            <td>
                                <div :class="days10[(index*7)].itemDayClass">
                                    <div class="day-num">{{days10[(index*7)].day.getDate() }}</div>

                                    <div class="day-info" v-if="days10[(index*7)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days10[(index*7+1)].itemDayClass">
                                    <div class="day-num">{{days10[(index*7+1)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days10[(index*7+1)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days10[(index*7+2)].itemDayClass">
                                    <div class="day-num">{{days10[(index*7+2)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days10[(index*7+2)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days10[(index*7+3)].itemDayClass">
                                    <div class="day-num">{{days10[(index*7+3)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days10[(index*7+3)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days10[(index*7+4)].itemDayClass">
                                    <div class="day-num">{{days10[(index*7+4)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days10[(index*7+4)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days10[(index*7+5)].itemDayClass">
                                    <div class="day-num">{{days10[(index*7+5)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days10[(index*7+5)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days10[(index*7+6)].itemDayClass">
                                    <div class="day-num">{{days10[(index*7+6)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days10[(index*7+6)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <div class="panel-hd">
                        <span style="padding-left: 10%"><span class="circle-01 bg-level1"></span>达标:{{notoverdays10}}天</span>
                        <span style="padding-left: 42%"><span class="circle-01 bg-level4"></span>未达标:{{overdays10}}天</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="el-row mt-lg" style="margin-left: -15px; margin-right: -15px;">
            <div class="el-col el-col-12" style="padding-left: 15px; padding-right: 15px;">
                <div class="panel-default">
                    <div class="panel-hd">
                        <h2 class="panel-tit">十一月</h2>
                    </div>
                    <table class="table-aqi">
                        <tr>
                            <th>周日</th>
                            <th>周一</th>
                            <th>周二</th>
                            <th>周三</th>
                            <th>周四</th>
                            <th>周五</th>
                            <th>周六</th>
                        </tr>
                        <tr v-for="(dayobject,index) in days11" v-if="index < fiveOrSix11">
                            <td>
                                <div :class="days11[(index*7)].itemDayClass">
                                    <div class="day-num">{{days11[(index*7)].day.getDate() }}</div>

                                    <div class="day-info" v-if="days11[(index*7)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days11[(index*7+1)].itemDayClass">
                                    <div class="day-num">{{days11[(index*7+1)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days11[(index*7+1)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days11[(index*7+2)].itemDayClass">
                                    <div class="day-num">{{days11[(index*7+2)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days11[(index*7+2)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days11[(index*7+3)].itemDayClass">
                                    <div class="day-num">{{days11[(index*7+3)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days11[(index*7+3)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days11[(index*7+4)].itemDayClass">
                                    <div class="day-num">{{days11[(index*7+4)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days11[(index*7+4)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days11[(index*7+5)].itemDayClass">
                                    <div class="day-num">{{days11[(index*7+5)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days11[(index*7+5)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days11[(index*7+6)].itemDayClass">
                                    <div class="day-num">{{days11[(index*7+6)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days11[(index*7+6)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <div class="panel-hd">
                        <span style="padding-left: 10%"><span class="circle-01 bg-level1"></span>达标:{{notoverdays11}}天</span>
                        <span style="padding-left: 42%"><span class="circle-01 bg-level4"></span>未达标:{{overdays11}}天</span>
                    </div>
                </div>
            </div>
            <div class="el-col el-col-12" style="padding-left: 15px; padding-right: 15px;">
                <div class="panel-default">
                    <div class="panel-hd">
                        <h2 class="panel-tit">十二月</h2>
                    </div>
                    <table class="table-aqi">
                        <tr>
                            <th>周日</th>
                            <th>周一</th>
                            <th>周二</th>
                            <th>周三</th>
                            <th>周四</th>
                            <th>周五</th>
                            <th>周六</th>
                        </tr>
                        <tr v-for="(dayobject,index) in days12" v-if="index < fiveOrSix12">
                            <td>
                                <div :class="days12[(index*7)].itemDayClass">
                                    <div class="day-num">{{days12[(index*7)].day.getDate() }}</div>

                                    <div class="day-info" v-if="days12[(index*7)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days12[(index*7+1)].itemDayClass">
                                    <div class="day-num">{{days12[(index*7+1)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days12[(index*7+1)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days12[(index*7+2)].itemDayClass">
                                    <div class="day-num">{{days12[(index*7+2)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days12[(index*7+2)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days12[(index*7+3)].itemDayClass">
                                    <div class="day-num">{{days12[(index*7+3)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days12[(index*7+3)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days12[(index*7+4)].itemDayClass">
                                    <div class="day-num">{{days12[(index*7+4)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days12[(index*7+4)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days12[(index*7+5)].itemDayClass">
                                    <div class="day-num">{{days12[(index*7+5)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days12[(index*7+5)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div :class="days12[(index*7+6)].itemDayClass">
                                    <div class="day-num">{{days12[(index*7+6)].day.getDate() }}</div>
                                    <div class="day-info" v-if="days12[(index*7+6)].itemClassShow">
                                        <div class="info-name">{{pollutant}}</div>
                                        <div class="info-num"></div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <div class="panel-hd">
                        <span style="padding-left: 10%"><span class="circle-01 bg-level1"></span>达标:{{notoverdays12}}天</span>
                        <span style="padding-left: 42%"><span class="circle-01 bg-level4"></span>未达标:{{overdays12}}天</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import reachManagerCalendar from './echartsJs/reachManagerCalendar'
    export default {
        name: "AirQualityYear",
        data:function () {
            return{
                options: [{
                    value: '1',
                    label: '2018'
                }, {
                    value: '2',
                    label: '2019'
                }],
                value:'',
                areaId: this.AppConfig.appInfo.regionCode,
                targetTodayAQI:'el-button el-button--primary',
                nowTimeDay: 1,
                nowTimeMonth: 1,
                myYear: new Date().format("yyyy"),
                currentDay: 1,
                currentMonth: 1,
                currentYear: 1970,
                currentWeek: 1,
                days: [],
                days8: [],
                days2: [],
                days3: [],
                days4: [],
                days5: [],
                days6: [],
                days7: [],
                days9: [],
                days10: [],
                days11: [],
                days12: [],
                monthlyDataStatus: [],
                monthlyDataStatus2:[],
                monthlyDataStatus3:[],
                monthlyDataStatus4:[],
                monthlyDataStatus5:[],
                monthlyDataStatus6:[],
                monthlyDataStatus7:[],
                monthlyDataStatus8:[],
                monthlyDataStatus9:[],
                monthlyDataStatus10:[],
                monthlyDataStatus11:[],
                monthlyDataStatus12:[],
                fiveOrSix: 5,
                fiveOrSix2: 5,
                fiveOrSix3: 5,
                fiveOrSix4: 5,
                fiveOrSix5: 5,
                fiveOrSix6: 5,
                fiveOrSix7: 5,
                fiveOrSix8: 5,
                fiveOrSix9: 5,
                fiveOrSix10: 5,
                fiveOrSix11: 5,
                fiveOrSix12: 5,
                monthTime: '',
                youDay:10,
                oneSelevl:'',
                twoSelevl:'',
                treeSelevl:'',
                fourSelevl:'',
                fiveSelevl:'',
                sixSelevl:'',
                noData:'',
                totalDay:'',
                pollutant:'',
                total:0,
                gooddays:0,
                baddays:0,
                overdays1:0,
                notoverdays1:0,
                overdays2:0,
                notoverdays2:0,
                overdays3:0,
                notoverdays3:0,
                overdays4:0,
                notoverdays4:0,
                overdays5:0,
                notoverdays5:0,
                overdays6:0,
                notoverdays6:0,
                overdays7:0,
                notoverdays7:0,
                overdays8:0,
                notoverdays8:0,
                overdays9:0,
                notoverdays9:0,
                overdays10:0,
                notoverdays10:0,
                overdays11:0,
                notoverdays11:0,
                overdays12:0,
                notoverdays12:0
            }
        },
        mounted:function(){
            document.getElementById("aqi").click();
        },
        methods:{
            getTargetCalendar(){
                let that = this;
                var url = '/aircontrol/airdiagnosis/api/basTarget/targetCalendar';
                that.$axios.get(url,{params:{
                        "year":that.myYear,
                        "pollutant":thar.pollutant
                    }}).then(
                    function (res) {

                    }
                )
            },
            /*targetCalendar(){
                var _this = this;
                var self = this;
                this.$axios.get(
                    '/aircontrol/airdiagnosis/api/basTarget/targetCalendar',
                    {params:{
                            "year":2019
                        }}
                ).then(function (res) {
                    self.tableData = res;
                })
            },*/
            chage:function () {
                this.total = 0;
                this.gooddays = 0;
                this.baddays = 0;
                reachManagerCalendar(this);
            },
            getPollutant:function (str) {
                if(str!="AQI"){
                    this.targetTodayAQI = 'el-button';
                }
                this.pollutant=str;
                this.total=0;
                this.gooddays=0;
                this.baddays=0;
                this.overdays1=0;
                this.notoverdays1=0;
                this.overdays2=0;
                this.notoverdays2=0;
                this.overdays3=0;
                this.notoverdays3=0;
                this.overdays4=0;
                this.notoverdays4=0;
                this.overdays5=0;
                this.notoverdays5=0;
                this.overdays6=0;
                this.notoverdays6=0;
                this.overdays7=0;
                this.notoverdays7=0;
                this.overdays8=0;
                this.notoverdays8=0;
                this.overdays9=0;
                this.notoverdays9=0;
                this.overdays10=0;
                this.notoverdays10=0;
                this.overdays11=0;
                this.notoverdays11=0;
                this.overdays12=0;
                this.notoverdays12=0;
                reachManagerCalendar(this);
            }
        }
    }
</script>

<style scoped>

</style>
