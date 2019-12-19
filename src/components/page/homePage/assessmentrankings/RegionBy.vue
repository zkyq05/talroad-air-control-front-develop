<template>
    <div class="main-con">
        <div class="panel-default" style="padding-top: 0px">
            <div class="panel-bd pd-lg">
                <ul class="filter-box">
                    <li class="filter-item">
                        <div class="filter-label">时间范围</div>
                        <div class="filter-row">
                            <div class="el-button-group">
<!--                                <button type="button" @click="selectTime(0)" :class="butClass!=1?'el-button':'el-button el-button&#45;&#45;primary'">&lt;!&ndash;&ndash;&gt;&lt;!&ndash;&ndash;&gt;<span>今日累计</span></button>-->
                                <button type="button" @click="selectTime(1)" :class="butClass!=2?'el-button':'el-button el-button--primary'"><!----><!----><span>小时</span></button>
                                <button type="button" @click="yueDtae" :class="butClass!=3?'el-button':'el-button el-button--primary'"><!----><!----><span>月</span></button>
                                <button type="button" @click="getYear" :class="butClass!=4?'el-button':'el-button el-button--primary'"><!----><!----><span>年</span></button>
                            </div>
                            </div>
                    </li>
                    <li class="filter-item ml-lger">
                        <div class="filter-label">关注城市</div>
                        <div class="filter-con">
                            <div class="el-button-group">
                                <button type="button" id="aqi" @click="getcityNumS(1)" :class="butClass1!=1?'el-button':'el-button el-button--primary'"><!----><!----><span>2+26城市</span></button>
                                <button type="button" @click="getcityNumS(2)" :class="butClass1!=2?'el-button':'el-button el-button--primary'"><!----><!----><span>74城市</span></button>
                                <button type="button" @click="getcityNumS(3)" :class="butClass1!=3?'el-button':'el-button el-button--primary'"><!----><!----><span>168城市</span></button>
                                <button type="button" @click="getcityNum(5)" :class="butClass1!=5?'el-button':'el-button el-button--primary'"><!----><!----><span>省内城市</span></button>
                                <button type="button" @click="getcityNum(4)" :class="butClass1!=4?'el-button':'el-button el-button--primary'"><!----><!----><span>市区排名</span></button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        <!--<div>
            <span style="margin-left: 10px">时间范围</span>
            <span style="margin-left: 0px"><el-button type="button" :class="butClass==1?'el-button el-button&#45;&#45;primary':'el-button el-button&#45;&#45;info'" @click="selectTime(0)">今日累计</el-button></span>
            <span style="margin-left: 0px"><el-button type="button"  :class="butClass==2?'el-button el-button&#45;&#45;primary':'el-button el-button&#45;&#45;info'" @click="initPageHours">小时</el-button></span>
            <span style="margin-left: 0px"><el-button type="button" :class="butClass==3?'el-button el-button&#45;&#45;primary':'el-button el-button&#45;&#45;info'" @click="yueDtae">月</el-button></span>
            <span style="margin-left: 0px"><el-button type="button" :class="butClass==4?'el-button el-button&#45;&#45;primary':'el-button el-button&#45;&#45;info'" @click="getYear">年</el-button></span>
&lt;!&ndash;            <span class="demonstration" style="margin-left: 25px">自定义</span>&ndash;&gt;
&lt;!&ndash;            <el-date-picker style="margin-left: 5px"&ndash;&gt;
&lt;!&ndash;                            v-model="daytime"&ndash;&gt;
&lt;!&ndash;                            type="daterange"&ndash;&gt;
&lt;!&ndash;                            range-separator="～"&ndash;&gt;
&lt;!&ndash;                            start-placeholder="开始日期"&ndash;&gt;
&lt;!&ndash;                            end-placeholder="结束日期" @change="chage()" format="yyyy-MM-dd" value-format="yyyy-MM-dd">&ndash;&gt;
&lt;!&ndash;            </el-date-picker>&ndash;&gt;
        </div>
            <div style="margin-top: 10px">
                <span style="margin-left: 10px">关注城市</span>
                <span style="margin-left: 0px"><el-button type="button" :class="butClass1==1?'el-button el-button&#45;&#45;primary':'el-button el-button&#45;&#45;info'"  @click="getcityNum(1)">2+26城市</el-button></span>
                <span style="margin-left: 0px"><el-button type="button" :class="butClass1==2?'el-button el-button&#45;&#45;primary':'el-button el-button&#45;&#45;info'"  @click="getcityNum(2)">74城市</el-button></span>
                <span style="margin-left: 0px"><el-button type="button" :class="butClass1==3?'el-button el-button&#45;&#45;primary':'el-button el-button&#45;&#45;info'"  @click="getcityNum(3)">168城市</el-button></span>
            </div>-->
        </div>
        <template v-if="cityType">
            <el-table :data="tableData" key="dshu" stripe >
                <el-table-column
                        type ="index"
                        width="150px" label="排名" :index="getIndex" align="center" >
                </el-table-column>
                <el-table-column prop="RegionName" label="城市名称" width="180" align="center">
                </el-table-column>
                <el-table-column prop="AQI" label="AQI" width="auto" align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.AQI>=0&&scope.row.AQI<=50" style="background: #71E495;">
                            {{scope.row.AQI}}
                        </div>
                        <div v-if="scope.row.AQI>=51&&scope.row.AQI<=100" style="background: #F9D849;">
                            {{scope.row.AQI}}
                        </div>
                        <div v-if="scope.row.AQI>=101&&scope.row.AQI<=150" style="background: #F19D38;">
                            {{scope.row.AQI}}
                        </div>
                        <div v-if="scope.row.AQI>=151&&scope.row.AQI<=200" style="background:#ea5924;">
                            {{scope.row.AQI}}
                        </div>
                        <div v-if="scope.row.AQI>=201&&scope.row.AQI<=300" style="background: #937520;">
                            {{scope.row.AQI}}
                        </div>
                        <div v-if="scope.row.AQI>=301" style="background: #8E1C10;">
                            {{scope.row.AQI}}
                        </div>
                    </template>
                </el-table-column>
<!--                <el-table-column prop="PMI" sortable label="综合指数" width="auto" align="center">-->
<!--                    <template slot-scope="scope">-->
<!--                        <div v-if="scope.row.PMI>=0&&scope.row.PMI<=50" style="background: #71E495">-->
<!--                            {{scope.row.PMI}}-->
<!--                        </div>-->
<!--                        <div v-if="scope.row.PMI>=51&&scope.row.PMI<=100" style="background: #F9D849;">-->
<!--                            {{scope.row.PMI}}-->
<!--                        </div>-->
<!--                        <div v-if="scope.row.PMI>=101&&scope.row.PMI<=150" style="background: #F19D38;">-->
<!--                            {{scope.row.PMI}}-->
<!--                        </div>-->
<!--                        <div v-if="scope.row.PMI>=151&&scope.row.PMI<=200" style="background:#ea5924;">-->
<!--                            {{scope.row.PMI}}-->
<!--                        </div>-->
<!--                        <div v-if="scope.row.PMI>=201&&scope.row.PMI<=300" style="background: #937520;">-->
<!--                            {{scope.row.PMI}}-->
<!--                        </div>-->
<!--                        <div v-if="scope.row.PMI>=301" style="background: #8E1C10;">-->
<!--                            {{scope.row.PMI}}-->
<!--                        </div>-->
<!--                    </template>-->
<!--                </el-table-column>-->
                <el-table-column prop="PM25" sortable label="PM2.5" align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.PM25>=0&&scope.row.PM25<=50" style="background: #71E495">
                            {{scope.row.PM25}}
                        </div>
                        <div v-if="scope.row.PM25>=51&&scope.row.PM25<=100" style="background: #F9D849;">
                            {{scope.row.PM25}}
                        </div>
                        <div v-if="scope.row.PM25>=101&&scope.row.PM25<=150" style="background: #F19D38;">
                            {{scope.row.PM25}}
                        </div>
                        <div v-if="scope.row.PM25>=151&&scope.row.PM25<=200" style="background:#ea5924;">
                            {{scope.row.PM25}}
                        </div>
                        <div v-if="scope.row.PM25>=201&&scope.row.PM25<=300" style="background: #937520;">
                            {{scope.row.PM25}}
                        </div>
                        <div v-if="scope.row.PM25>=301" style="background: #8E1C10;">
                            {{scope.row.PM25}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="PM10" sortable label="PM10" align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.PM10>=0&&scope.row.PM10<=50" style="background: #71E495">
                            {{scope.row.PM10}}
                        </div>
                        <div v-if="scope.row.PM10>=51&&scope.row.PM10<=100" style="background: #F9D849;">
                            {{scope.row.PM10}}
                        </div>
                        <div v-if="scope.row.PM10>=101&&scope.row.PM10<=150" style="background: #F19D38;">
                            {{scope.row.PM10}}
                        </div>
                        <div v-if="scope.row.PM10>=151&&scope.row.PM10<=200" style="background:#ea5924;">
                            {{scope.row.PM10}}
                        </div>
                        <div v-if="scope.row.PM10>=201&&scope.row.PM10<=300" style="background: #937520;">
                            {{scope.row.PM10}}
                        </div>
                        <div v-if="scope.row.PM10>=301" style="background: #8E1C10;">
                            {{scope.row.PM10}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="SO2" sortable label="SO2" align="center" >
                    <template slot-scope="scope">
                        <div v-if="scope.row.SO2>=0&&scope.row.SO2<=50" style="background: #71E495">
                            {{scope.row.SO2}}
                        </div>
                        <div v-if="scope.row.SO2>=51&&scope.row.SO2<=100" style="background: #F9D849;">
                            {{scope.row.SO2}}
                        </div>
                        <div v-if="scope.row.SO2>=101&&scope.row.SO2<=150" style="background: #F19D38;">
                            {{scope.row.SO2}}
                        </div>
                        <div v-if="scope.row.SO2>=151&&scope.row.SO2<=200" style="background:#ea5924;">
                            {{scope.row.SO2}}
                        </div>
                        <div v-if="scope.row.SO2>=201&&scope.row.SO2<=300" style="background: #937520;">
                            {{scope.row.SO2}}
                        </div>
                        <div v-if="scope.row.SO2>=301" style="background: #8E1C10;">
                            {{scope.row.SO2}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="NO2" sortable label="NO2" align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.NO2>=0&&scope.row.NO2<=50" style="background: #71E495">
                            {{scope.row.NO2}}
                        </div>
                        <div v-if="scope.row.NO2>=51&&scope.row.NO2<=100" style="background: #F9D849;">
                            {{scope.row.NO2}}
                        </div>
                        <div v-if="scope.row.NO2>=101&&scope.row.NO2<=150" style="background: #F19D38;">
                            {{scope.row.NO2}}
                        </div>
                        <div v-if="scope.row.NO2>=151&&scope.row.NO2<=200" style="background:#ea5924;">
                            {{scope.row.NO2}}
                        </div>
                        <div v-if="scope.row.NO2>=201&&scope.row.NO2<=300" style="background: #937520;">
                            {{scope.row.NO2}}
                        </div>
                        <div v-if="scope.row.NO2>=301" style="background: #8E1C10;">
                            {{scope.row.NO2}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="CO" sortable label="CO" align="center" >
                    <template slot-scope="scope">
                        <div v-if="scope.row.CO>=0&&scope.row.CO<=50" style="background: #71E495">
                            {{scope.row.CO}}
                        </div>
                        <div v-if="scope.row.CO>=51&&scope.row.CO<=100" style="background: #F9D849;">
                            {{scope.row.CO}}
                        </div>
                        <div v-if="scope.row.CO>=101&&scope.row.CO<=150" style="background: #F19D38;">
                            {{scope.row.CO}}
                        </div>
                        <div v-if="scope.row.CO>=151&&scope.row.CO<=200" style="background:#ea5924;">
                            {{scope.row.CO}}
                        </div>
                        <div v-if="scope.row.CO>=201&&scope.row.CO<=300" style="background: #937520;">
                            {{scope.row.CO}}
                        </div>
                        <div v-if="scope.row.CO>=301" style="background: #8E1C10;">
                            {{scope.row.CO}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="O3" sortable label="O3" align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.O3>=0&&scope.row.O3<=50" style="background: #71E495">
                            {{scope.row.O3}}
                        </div>
                        <div v-if="scope.row.O3>=51&&scope.row.O3<=100" style="background: #F9D849;">
                            {{scope.row.O3}}
                        </div>
                        <div v-if="scope.row.O3>=101&&scope.row.O3<=150" style="background: #F19D38;">
                            {{scope.row.O3}}
                        </div>
                        <div v-if="scope.row.O3>=151&&scope.row.O3<=200" style="background:#ea5924;">
                            {{scope.row.O3}}
                        </div>
                        <div v-if="scope.row.O3>=201&&scope.row.O3<=300" style="background: #937520;">
                            {{scope.row.O3}}
                        </div>
                        <div v-if="scope.row.O3>=301" style="background: #8E1C10;">
                            {{scope.row.O3}}
                        </div>
                    </template>
                </el-table-column>
                <!--            <el-table-column prop="O38H" sortable label="O3_8H" align="center"></el-table-column>-->
                <el-table-column prop="PollutantName" sortable label="首要污染物" align="center"></el-table-column>
            </el-table>
            <pagination ref="paginationObj" @handleCurrentChange="handleCurrentChange" @paginationFunction="paginationFunction"></pagination>
        </template>
        <template v-if="cityTypeS">
            <el-table :data="tableDataS"  style="width: 100%" key="test1" stripe>
                <el-table-column property="Sort" label="排名" width="150px" align="center"></el-table-column>
                <el-table-column prop="RegionName" label="城市名称" width="180" align="center"></el-table-column>
                <el-table-column prop="AQI" label="AQI" width="auto" align="center" >
                    <template slot-scope="scope">
                        <div v-if="scope.row.AQI>=0&&scope.row.AQI<=50" style="background: #71E495;">
                            {{scope.row.AQI}}
                        </div>
                        <div v-if="scope.row.AQI>=51&&scope.row.AQI<=100" style="background: #F9D849;">
                            {{scope.row.AQI}}
                        </div>
                        <div v-if="scope.row.AQI>=101&&scope.row.AQI<=150" style="background: #F19D38;">
                            {{scope.row.AQI}}
                        </div>
                        <div v-if="scope.row.AQI>=151&&scope.row.AQI<=200" style="background:#ea5924;">
                            {{scope.row.AQI}}
                        </div>
                        <div v-if="scope.row.AQI>=201&&scope.row.AQI<=300" style="background: #937520;">
                            {{scope.row.AQI}}
                        </div>
                        <div v-if="scope.row.AQI>=301" style="background: #8E1C10;">
                            {{scope.row.AQI}}
                        </div>
                    </template>
                </el-table-column>
<!--                <el-table-column prop="PMI" sortable label="综合指数" width="auto" align="center">-->
<!--                    <template slot-scope="scope">-->
<!--                        <div v-if="scope.row.PMI>=0&&scope.row.PMI<=50" style="background: #71E495">-->
<!--                            {{scope.row.PMI}}-->
<!--                        </div>-->
<!--                        <div v-if="scope.row.PMI>=51&&scope.row.PMI<=100" style="background: #F9D849;">-->
<!--                            {{scope.row.PMI}}-->
<!--                        </div>-->
<!--                        <div v-if="scope.row.PMI>=101&&scope.row.PMI<=150" style="background: #F19D38;">-->
<!--                            {{scope.row.PMI}}-->
<!--                        </div>-->
<!--                        <div v-if="scope.row.PMI>=151&&scope.row.PMI<=200" style="background:#ea5924;">-->
<!--                            {{scope.row.PMI}}-->
<!--                        </div>-->
<!--                        <div v-if="scope.row.PMI>=201&&scope.row.PMI<=300" style="background: #937520;">-->
<!--                            {{scope.row.PMI}}-->
<!--                        </div>-->
<!--                        <div v-if="scope.row.PMI>=301" style="background: #8E1C10;">-->
<!--                            {{scope.row.PMI}}-->
<!--                        </div>-->
<!--                    </template>-->
<!--                </el-table-column>-->
                <el-table-column prop="PM25" sortable label="PM2.5" align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.PM25>=0&&scope.row.PM25<=50" style="background: #71E495">
                            {{scope.row.PM25}}
                        </div>
                        <div v-if="scope.row.PM25>=51&&scope.row.PM25<=100" style="background: #F9D849;">
                            {{scope.row.PM25}}
                        </div>
                        <div v-if="scope.row.PM25>=101&&scope.row.PM25<=150" style="background: #F19D38;">
                            {{scope.row.PM25}}
                        </div>
                        <div v-if="scope.row.PM25>=151&&scope.row.PM25<=200" style="background:#ea5924;">
                            {{scope.row.PM25}}
                        </div>
                        <div v-if="scope.row.PM25>=201&&scope.row.PM25<=300" style="background: #937520;">
                            {{scope.row.PM25}}
                        </div>
                        <div v-if="scope.row.PM25>=301" style="background: #8E1C10;">
                            {{scope.row.PM25}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="PM10" sortable label="PM10" align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.PM10>=0&&scope.row.PM10<=50" style="background: #71E495">
                            {{scope.row.PM10}}
                        </div>
                        <div v-if="scope.row.PM10>=51&&scope.row.PM10<=100" style="background: #F9D849;">
                            {{scope.row.PM10}}
                        </div>
                        <div v-if="scope.row.PM10>=101&&scope.row.PM10<=150" style="background: #F19D38;">
                            {{scope.row.PM10}}
                        </div>
                        <div v-if="scope.row.PM10>=151&&scope.row.PM10<=200" style="background:#ea5924;">
                            {{scope.row.PM10}}
                        </div>
                        <div v-if="scope.row.PM10>=201&&scope.row.PM10<=300" style="background: #937520;">
                            {{scope.row.PM10}}
                        </div>
                        <div v-if="scope.row.PM10>=301" style="background: #8E1C10;">
                            {{scope.row.PM10}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="SO2" sortable label="SO2" align="center" >
                    <template slot-scope="scope">
                        <div v-if="scope.row.SO2>=0&&scope.row.SO2<=50" style="background: #71E495">
                            {{scope.row.SO2}}
                        </div>
                        <div v-if="scope.row.SO2>=51&&scope.row.SO2<=100" style="background: #F9D849;">
                            {{scope.row.SO2}}
                        </div>
                        <div v-if="scope.row.SO2>=101&&scope.row.SO2<=150" style="background: #F19D38;">
                            {{scope.row.SO2}}
                        </div>
                        <div v-if="scope.row.SO2>=151&&scope.row.SO2<=200" style="background:#ea5924;">
                            {{scope.row.SO2}}
                        </div>
                        <div v-if="scope.row.SO2>=201&&scope.row.SO2<=300" style="background: #937520;">
                            {{scope.row.SO2}}
                        </div>
                        <div v-if="scope.row.SO2>=301" style="background: #8E1C10;">
                            {{scope.row.SO2}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="NO2" sortable label="NO2" align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.NO2>=0&&scope.row.NO2<=50" style="background: #71E495">
                            {{scope.row.NO2}}
                        </div>
                        <div v-if="scope.row.NO2>=51&&scope.row.NO2<=100" style="background: #F9D849;">
                            {{scope.row.NO2}}
                        </div>
                        <div v-if="scope.row.NO2>=101&&scope.row.NO2<=150" style="background: #F19D38;">
                            {{scope.row.NO2}}
                        </div>
                        <div v-if="scope.row.NO2>=151&&scope.row.NO2<=200" style="background:#ea5924;">
                            {{scope.row.NO2}}
                        </div>
                        <div v-if="scope.row.NO2>=201&&scope.row.NO2<=300" style="background: #937520;">
                            {{scope.row.NO2}}
                        </div>
                        <div v-if="scope.row.NO2>=301" style="background: #8E1C10;">
                            {{scope.row.NO2}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="CO" sortable label="CO" align="center" >
                    <template slot-scope="scope">
                        <div v-if="scope.row.CO>=0&&scope.row.CO<=50" style="background: #71E495">
                            {{scope.row.CO}}
                        </div>
                        <div v-if="scope.row.CO>=51&&scope.row.CO<=100" style="background: #F9D849;">
                            {{scope.row.CO}}
                        </div>
                        <div v-if="scope.row.CO>=101&&scope.row.CO<=150" style="background: #F19D38;">
                            {{scope.row.CO}}
                        </div>
                        <div v-if="scope.row.CO>=151&&scope.row.CO<=200" style="background:#ea5924;">
                            {{scope.row.CO}}
                        </div>
                        <div v-if="scope.row.CO>=201&&scope.row.CO<=300" style="background: #937520;">
                            {{scope.row.CO}}
                        </div>
                        <div v-if="scope.row.CO>=301" style="background: #8E1C10;">
                            {{scope.row.CO}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="O3" sortable label="O3" align="center">
                    <template slot-scope="scope">
                        <div v-if="scope.row.O3>=0&&scope.row.O3<=50" style="background: #71E495">
                            {{scope.row.O3}}
                        </div>
                        <div v-if="scope.row.O3>=51&&scope.row.O3<=100" style="background: #F9D849;">
                            {{scope.row.O3}}
                        </div>
                        <div v-if="scope.row.O3>=101&&scope.row.O3<=150" style="background: #F19D38;">
                            {{scope.row.O3}}
                        </div>
                        <div v-if="scope.row.O3>=151&&scope.row.O3<=200" style="background:#ea5924;">
                            {{scope.row.O3}}
                        </div>
                        <div v-if="scope.row.O3>=201&&scope.row.O3<=300" style="background: #937520;">
                            {{scope.row.O3}}
                        </div>
                        <div v-if="scope.row.O3>=301" style="background: #8E1C10;">
                            {{scope.row.O3}}
                        </div>
                    </template>
                </el-table-column>
                <!--            <el-table-column prop="O38H" sortable label="O3_8H" align="center"></el-table-column>-->
                <el-table-column prop="PollutantName" sortable label="首要污染物" align="center"></el-table-column>
            </el-table>
            <pagination ref="paginationObj" @handleCurrentChange="handleCurrentChange" @paginationFunction="paginationFunction"></pagination>
        </template>
    </div>
</template>

<script>
    import pagination from '../../../common/unit/Pagination';
    export default {
        name: "RegionBy",
        components:{pagination},
        data:function(){
          return{
              daytime:['',''],
              tableData:[],
              tableDataS:[],
              claType:"5",
              cityType:false,
              cityTypeS:true,
              num:1,
              butClass:1,
              butClass1:5,
              region:'141182',
              capitalRegionCode:'140000',
              hourday:'',
            }
        },
        mounted:function(){
          this.selectTime(1);
        },
        methods:{

            //初始化查询小时表数据列表 默认第一页
            initPageHours: function () {
                var _this = this;
                _this.claType="2";
                _this.cityType=false;
                _this.cityTypeS=true;
                let params = new URLSearchParams();
                params.append("pageNum", _this.$refs.paginationObj.cur_page);
                params.append("pageSize", _this.$refs.paginationObj.cur_pageSize);
                params.append("beginTime", _this.daytime[0]);
                params.append("endTime", _this.daytime[1]);
                params.append("type",_this.num);
                this.$axios.post(
                    '/aircontrol/airassess/codReport/getRgionByTowSixByTime', params
                ).then(function (res) {
                    _this.tableDataS = res.data.records;
                    _this.$refs.paginationObj.count = res.data.total;
                })
            },
            cityBy1: function () {
                var _this = this;
                _this.claType="4";
                _this.cityType=true;
                _this.cityTypeS=false;
                let params = new URLSearchParams();
                params.append("pageNum", _this.$refs.paginationObj.cur_page);
                params.append("pageSize", _this.$refs.paginationObj.cur_pageSize);
                params.append("beginTime", _this.daytime[0]);
                params.append("endTime", _this.daytime[1]);
                params.append("region",_this.region);
                params.append("hourday",_this.hourday);
                this.$axios.post(
                    '/aircontrol/airassess/codReport/getRgionAreaDayByDayTwon', params
                ).then(function (res) {
                    _this.tableData = res.data.records;
                    _this.$refs.paginationObj.count = res.data.total;
                })
            },
                hourseCityBy: function () {
                var _this = this;
                _this.claType="4";
                _this.cityType=true;
                _this.cityTypeS=false;
                let params = new URLSearchParams();
                params.append("pageNum", _this.$refs.paginationObj.cur_page);
                params.append("pageSize", _this.$refs.paginationObj.cur_pageSize);
                params.append("beginTime", _this.daytime[0]);
                params.append("endTime", _this.daytime[1]);
                params.append("region",_this.region);
                params.append("hourday",_this.hourday);
                this.$axios.post(
                    '/aircontrol/airassess/codReport/gethourseCityBy', params
                ).then(function (res) {
                    _this.tableData = res.data.records;
                    _this.$refs.paginationObj.count = res.data.total;
                })
            },
                hourseCityBy2: function () {
                var _this = this;
                _this.claType="5";
                _this.cityType=true;
                _this.cityTypeS=false;
                let params = new URLSearchParams();
                params.append("pageNum", _this.$refs.paginationObj.cur_page);
                params.append("pageSize", _this.$refs.paginationObj.cur_pageSize);
                params.append("beginTime", _this.daytime[0]);
                params.append("endTime", _this.daytime[1]);
                params.append("region",_this.region);
                params.append("hourday",_this.hourday);
                this.$axios.post(
                    '/aircontrol/airassess/codReport/getProvinceCityHourseBy', params
                ).then(function (res) {
                    _this.tableData = res.data.records;
                    _this.$refs.paginationObj.count = res.data.total;
                })
            },
            cityBy2: function () {
                var _this = this;
                _this.claType="5";
                _this.cityType=true;
                _this.cityTypeS=false;
                let params = new URLSearchParams();
                params.append("pageNum", _this.$refs.paginationObj.cur_page);
                params.append("pageSize", _this.$refs.paginationObj.cur_pageSize);
                params.append("beginTime", _this.daytime[0]);
                params.append("endTime", _this.daytime[1]);
                params.append("region",_this.capitalRegionCode);
                params.append("hourday",_this.hourday);
                this.$axios.post(
                    '/aircontrol/airassess/codReport/getProvinceCityBy', params
                ).then(function (res) {
                    _this.tableData = res.data.records;
                    _this.$refs.paginationObj.count = res.data.total;
                })
            },
            chage:function () {
                let daytime = this.daytime;
                let _this=this;
                if(_this.claType=="2"){
                    this.initPageHours();
                }else if(_this.claType=="3"){
                    this.initCity();
                }else if(_this.claType=="4"){
                    this.cityBy1();
                }else if(_this.claType=="5"){
                    this.cityBy2();
                }
            },
            getIndex:function(index) {
                var _this=this;
                let curPage = _this.$refs.paginationObj.cur_page;
                let limitPage = _this.$refs.paginationObj.cur_pageSize;
                return (index+1) + (curPage - 1) * limitPage;
            },
            //月日期格式化
            yueDtae(){
                this.butClass=3;
                this.$refs.paginationObj.cur_page=1;
                var now = new Date(); //当前日期
                var nowMonth = now.getMonth(); //当前月
                var nowYear = now.getFullYear(); //当前年
                //本月的开始时间
                var monthStartDate = new Date(nowYear, nowMonth, 1);
                //本月的结束时间
                var monthEndDate = new Date(nowYear, nowMonth+1, 0);
                /* var timeStar=Date.parse(monthStartDate)/1000;//s
                 var timeEnd=Date.parse(monthEndDate)/1000;//s*/
                this.daytime=[monthStartDate.format("yyyy-MM-dd"),monthEndDate.format('yyyy-MM-dd')];
                let daytime = this.daytime;

             if(this.claType=="4"){
                    this.cityBy1();
                }else if(this.claType=="5"){
                 this.cityBy2();
             } else {
                 this.initCity()
                     }
            },

            //7天和30天日期格式化
            selectTime(num){
                if(this.claType=='4'){
                    if(num==0){
                        this.butClass=1;
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * num);
                        this.daytime=[start.format('yyyy-MM-dd')+' 00',end.format('yyyy-MM-dd')+' 24'];
                        let daytime = this.daytime;
                        this.hourseCityBy();
                    }
                    if(num==1){
                        this.butClass=2;
                        this.daytime=[new Date(new Date().setHours(new Date().getHours()-1)).format('yyyy-MM-dd hh'),new Date(new Date().setHours(new Date().getHours()-1)).format('yyyy-MM-dd hh')];
                        this.hourseCityBy();
                    }
                }else if(this.claType=='5'){
                    if(num==0){
                        this.butClass=1;
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * num);
                        this.daytime=[start.format('yyyy-MM-dd')+' 00',end.format('yyyy-MM-dd')+' 24'];
                        let daytime = this.daytime;
                        this.hourseCityBy2();
                    }
                    if(num==1){
                        this.butClass=2;
                        this.daytime=[new Date(new Date().setHours(new Date().getHours()-1)).format('yyyy-MM-dd hh'),new Date(new Date().setHours(new Date().getHours()-1)).format('yyyy-MM-dd hh')];
                        this.hourseCityBy2();
                    }
                }else {
                    if(num==0){
                        this.butClass=1;
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * num);
                        this.daytime=[start.format('yyyy-MM-dd'),end.format('yyyy-MM-dd')];
                        let daytime = this.daytime;
                        this.initPageHours();
                    }
                    if(num==1){
                        this.butClass=2;
                        this.daytime=[new Date(new Date().setHours(new Date().getHours()-1)).format('yyyy-MM-dd hh'),new Date(new Date().setHours(new Date().getHours()-1)).format('yyyy-MM-dd hh')];
                        this.initPageHours();
                    }
                }


            },
            //今日累计
            selectToday(num){
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * num);
                this.daytime=[start.format('yyyy-MM-dd'),end.format('yyyy-MM-dd')];
                let daytime = this.daytime;
                this.initPageHours();
            },
            cellStyle:function(row){
                    return "height:500px";

            },
            //分页回调
            handleCurrentChange:function(){
                let _this = this;
               if(_this.claType=="2"){
                    this.initPageHours();
                }else if(_this.claType=="3"){
                    this.initCity();
                }else if(_this.claType=="4"){
                   this.cityBy1();
               }else if(_this.claType=="5"){
                   this.cityBy2();
               }
            },
            paginationFunction:function() {
                let _this = this;
                if(_this.claType=="2"){
                    this.initPageHours();
                }else if(_this.claType=="3"){
                    this.initCity();
                }else if(_this.claType=="4"){
                    this.cityBy1();
                }else if(_this.claType=="5"){
                        this.cityBy2();
                    }
            },
            //2+26 74 168 城市数据
            getcityNum:function(num){
                let _this=this;
                _this.butClass1=num;
                _this.tableData=[];
                _this.num=num;
                if(_this.butClass==1||_this.butClass==2){
                    if(num==4){
                        _this.hourseCityBy();
                    }else if(num==5){
                        _this.hourseCityBy2();
                    }
                }
                if(_this.butClass==3||_this.butClass==4){
                    if(num==4){
                        _this.cityBy1();
                    }else if(num==5){
                        _this.cityBy2();
                    }
                }

            },
            getcityNumS:function(num){
                let _this=this;
                _this.butClass1=num;
                _this.tableData=[];
                _this.num=num;
                if(_this.butClass==1||_this.butClass==2){
                        _this.initPageHours();
                }
                if(_this.butClass==3||_this.butClass==4){
                        _this.initCity();
                }
            },
            initCity:function () {
                let _this = this;
                _this.cityType=false;
                _this.cityTypeS=true;
                _this.claType="3";
                let params = new URLSearchParams();
                params.append("pageNum", _this.$refs.paginationObj.cur_page);
                params.append("pageSize", _this.$refs.paginationObj.cur_pageSize);
                params.append("beginTime", _this.daytime[0]);
                params.append("endTime", _this.daytime[1]);
                params.append("type",_this.num);
                this.$axios.post(
                    '/aircontrol/airassess/codReport/getRgionByTowSix', params
                ).then(function (res) {
                    _this.tableDataS = res.data.records;
                    _this.$refs.paginationObj.count = res.data.total;
                })
            },
            //查询年条件
            getYear:function () {
                this.butClass=4;
                this.$refs.paginationObj.cur_page=1;
                let firstDay = new Date();
                firstDay.setDate(1);
                firstDay.setMonth(0);
                let lastDay = new Date();
                lastDay.setFullYear(lastDay.getFullYear()+1);
                lastDay.setDate(0);
                lastDay.setMonth(-1);
                firstDay = firstDay.format("yyyy-MM-dd");
                lastDay = lastDay.format("yyyy-MM-dd");
                this.daytime=[firstDay,lastDay];
                let daytime = this.daytime;
                if(this.claType=='4'){
                    this.cityBy1();
                }else if(this.claType=="5"){
                    this.cityBy2();
                }else{
                    this.initCity();
                }
            },

        }

    }
</script>

<style scoped>

</style>
