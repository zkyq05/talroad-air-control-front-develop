<template>
    <div>
            <div class="main-con" >
                <div style="margin-left: -22px;height: 60px;">
                    <div style="font-size: 20px;line-height: 60px;color: aliceblue;background: #202A42;padding-left: 36px">
                        <h1>网格管控 - 事件上报</h1>
                    </div>
                </div>
                <div class="form-list-inline">
                    <div class="tab-box-03">
                        <div class="tab-hd pdl-lgest">
                            <ul class="tab-head">
                                <li class="is-active">事件列表<span>({{totalTask+"件"}})</span></li>
                                <li>热力图</li>
                            </ul>
                        </div>
                        <div class="tab-bd">
                            <div class="tab-item pdl-lgest" style="display: block;" >
                                <el-table style="width: 100%;margin-top: 20px;" :data="tableData" max-height="600px"  stripe="true">
                               <el-table-column type="index" width="100px" label="编号" :index="getIndex" align="center"></el-table-column>
                               <el-table-column prop="problemTypeName" label="事件类型" width="auto" align="center" ></el-table-column>
                               <el-table-column  show-overflow-tooltip prop="eventDescName" label="事件描述" width="auto" align="center" ></el-table-column>
                               <el-table-column  show-overflow-tooltip prop="remark" label="处理建议" width="auto" align="center" ></el-table-column>
                               <el-table-column prop="status" label="事件状态"  width="auto" align="center" :formatter="formattersignStatus"></el-table-column>
                               <el-table-column prop="createTime" label="上报时间" :formatter="formatterDate" width="auto" align="center"></el-table-column>
                               <el-table-column prop="username" label="最近处理人" width="250px" align="center"></el-table-column>
                               <el-table-column prop="dealTime" label="最近更新时间" :formatter="formatterDate" width="auto" align="center"></el-table-column>
                               <el-table-column label="操作" width="auto" align="center">
                               <template slot-scope="scope">
                                   <a @click="showView(scope.row)" class="color-other" href="javascript:;" style="font-size:14px">查看</a>
<!--                                   <el-button @click="showView(scope.row)" type="text" size="small">查看</el-button>-->
                               </template>
                           </el-table-column>
                              </el-table>
                              <div class="pagination mt">
                                  <pagination ref="paginationObj" @handleCurrentChange="handleCurrentChange" @paginationFunction="paginationFunction"></pagination>
                              </div>
                            </div>

                            <div class="tab-item">
                                <!-- 地图 -->

                                <!---->
                                <span></span>
                            </div>
                        </div>
                    </div>
<!--                    <div class="table-box" style="height: 750px">-->
<!--                        <el-tabs v-model="editableTabsValue" type="card" style="margin-top: 10px">-->
<!--                            <el-tab-pane-->
<!--                                    key="1"-->
<!--                                    label="事件列表"-->
<!--                                    name="1">-->
<!--                                <el-table style="width: 100%;margin-top: 20px;":data="tableData" max-height="600px" :header-cell-style="cellRow" :cell-style="rowCellStyle">-->
<!--                                    <el-table-column type="index" width="67" label="编号" :index="getIndex" align="center"></el-table-column>-->
<!--&lt;!&ndash;                                    <el-table-column prop="StationName" label="事件名称" width="auto" align="center"></el-table-column>&ndash;&gt;-->
<!--                                    <el-table-column prop="problemTypeName" label="事件类型" width="auto" align="center"></el-table-column>-->
<!--                                    <el-table-column prop="eventDescName" label="事件描述" width="auto" align="center" ></el-table-column>-->
<!--                                    <el-table-column prop="remark" label="处理建议" width="auto" align="center" ></el-table-column>-->
<!--                                    <el-table-column prop="status" label="事件状态"  width="auto" align="center" :formatter="formattersignStatus"></el-table-column>-->
<!--                                    <el-table-column prop="createTime" label="上报时间" :formatter="formatterDate" width="auto" align="center"></el-table-column>-->
<!--                                    <el-table-column prop="username" label="最近处理人" width="auto" align="center"></el-table-column>-->
<!--                                    <el-table-column prop="dealTime" label="最近更新时间":formatter="formatterDate" width="auto" align="center"></el-table-column>-->
<!--                                    <el-table-column label="操作" width="auto" align="center">-->
<!--                                        <template slot-scope="scope">-->
<!--                                            <el-button type="success" plain  size="mini"  @click="showView(scope.row)" >查看</el-button>-->
<!--                                        </template>-->
<!--                                    </el-table-column>-->
<!--                                </el-table>-->
<!--                                <div class="pagination mt">-->
<!--                                    <pagination ref="paginationObj" @handleCurrentChange="handleCurrentChange" @paginationFunction="paginationFunction"></pagination>-->
<!--                                </div>-->
<!--                            </el-tab-pane>-->
<!--                            <el-tab-pane-->
<!--                                    key="2"-->
<!--                                    label="报警热力图"-->
<!--                                    name="2">-->
<!--                            </el-tab-pane>-->
<!--                        </el-tabs>-->
<!--                    </div>-->
                </div>
            </div>
        </div>
</template>

<script>
    import Pagination from '../../common/unit/Pagination'
    export default {
        name: "EventReport",
        components:{
            Pagination,
        },
        data:function(){
            return{
                editableTabsValue: '1',
                tableData:[],
                dialogFormVisible : false,
                eventSource :2,
                region:null,
                status:null,
                daytime:['',''],
                totalTask:0,
                maxLength:'10',
                limit:this.$route.query.limit==undefined?1:this.$route.query.limit,
            }
        },
        mounted:function () {
            $('.tab-head>li').on("click",function(){
                var $index=$(this).index();
                $(this).parent().children().removeClass("is-active");
                $(this).addClass("is-active");

                var $siblings=$(this).parent().parent().siblings(".tab-bd");
                $siblings.show();
                $siblings.children().hide();
                $siblings.children().eq($index).fadeIn();
            });
            $('.fold-toggle').on("click",function(){
                $(this).parent().toggleClass("is-toggle");
            });
            this.init();
        },
        methods:{

            formatterDate(row,column,value){
                let val= new Date(value).format("yyyy-MM-dd hh:mm:ss");
                return val;
            },
            formattersignStatus(row,column,value){
                if(value==0){
                    return '处理中';
                }else if (value==1){
                    return '已完成';
                }else if (value==2){
                    return '已办结';
                }else{
                    return '';
                }
            },
            getIndex:function(index) {
                var _this = this;
                let curPage = _this.$refs.paginationObj.cur_page;
                let limitPage = _this.$refs.paginationObj.cur_pageSize;
                return (index+1) + (curPage - 1) * limitPage;
            },
            init:function () {
                var _this = this;
                var params = new URLSearchParams();
                params.append("selectEventJson",JSON.stringify({
                    page: _this.$refs.paginationObj.cur_page,
                    limit: _this.$refs.paginationObj.cur_pageSize,
                    eventSource: _this.eventSource,
                    regionId: _this.region,
                    startTime: _this.daytime[0],
                    endTime: _this.daytime[1],
                }));
                _this.$axios.post('/third/event/external/event/selectEventInfo',params).then(function (res) {
                    if( res.code == 0){
                        _this.tableData = res.data.records;
                        _this.$refs.paginationObj.count = res.data.total;
                        _this.totalTask=res.data.total;
                    }
                })
            },
            showDetail:function (id) {
                var _this = this;
                _this.dialogFormVisible = true;
                if(id != null && id != -1){
                    var params = new URLSearchParams();
                    params.append("id",id);
                    _this.$axios.post('/api/measureStore/getListByParams', params).then(function (res) {
                        if( res.code == 0){
                            _this.basMeasures = res.data.list[0];
                        }
                    })
                }
            },
            cance:function(){
                this.dialogFormVisible = false;
            },
            formaText:function(row,colum,value){
             return  value.length > this.maxLength ?value.slice(0,this.maxLength)+'...':value;
            },
            //跳到查看详情页
            showView:function(row){

                this.$parent.$router.push({ path: '/eventReportDetail', query: { "row":row ,'limit':this.$refs.paginationObj.cur_page}});

            },

            //分页回调
            handleCurrentChange:function(){
                this.init();
            },
            paginationFunction:function() {
                this.init();
            },
            cellRow:function ({row, column, rowIndex, columnIndex}) {

                return "color:aliceblue:border:0px;border-bottom:0px;border-right:0px";
            },
            rowCellStyle:function ({row, column, rowIndex, columnIndex}) {

                return "background-color:#ffffff;border:0px;border-bottom:1px solid rgb(30, 121, 220);border-right:1px solid rgb(30, 121, 220);color:black";
            },
        }
    }

</script>

<style scoped>

</style>