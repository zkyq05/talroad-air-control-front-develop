<template>

    <div>
    <el-table :data="tableData" style="width: 100%" >
        <el-table-column
                type="index"
                width="50" label="排名" :index="getIndex" align="center">
        </el-table-column>
        <el-table-column prop="RegionName" show-overflow-tooltip label="区县" width="180" align="center"></el-table-column>
        <el-table-column prop="pmi" sortable label="综合指数" width="180" align="center" ></el-table-column>
        <el-table-column prop="PM25" sortable label="PM2.5" align="center"></el-table-column>
        <el-table-column prop="PM10" sortable label="PM10" align="center"></el-table-column>
        <el-table-column prop="SO2" sortable label="SO2" align="center" ></el-table-column>
        <el-table-column prop="NO2" sortable label="NO2" align="center"></el-table-column>
        <el-table-column prop="CO" sortable label="CO" align="center" ></el-table-column>
        <el-table-column prop="O3" sortable label="O3" align="center"></el-table-column>
        <!--                    <el-table-column prop="address" sortable="true" label="得分"></el-table-column>-->
    </el-table>
    <pagination ref="paginationObj"
                @handleCurrentChange="initPage"
                @paginationFunction="initPage"></pagination>
</div>
</template>

<script>
    import pagination from '../../../common/unit/Pagination';
    export default {
        name: "RegionRanking",
        props:["regionTest"],
        components:{pagination},
        data:function(){
            return{
                editableTabsValue: '1',
                // regionTest:'',
                daytime:[],
                tabIndex: 2,
                tableData:[],
            }

        },
        mounted:function () {
            console.info(this.regionTest);
            // this.initPage();
        },
        methods:{
            getIndex:function(index) {
                var _this=this;
                let curPage = _this.$refs.paginationObj.cur_page;
                let limitPage = _this.$refs.paginationObj.cur_pageSize;
                return (index+1) + (curPage - 1) * limitPage;
            },
            //保留3位小数
            getRound:function (row,column, cellValue) {
                if(cellValue!=null && cellValue!=''){
                    let newpar = Math.round(cellValue);
                    return newpar;
                }else{
                    return '';
                }


            // let reg = /^[0-9]+.?[0-9]*$/;
            // if(reg.test(newpar)){
            //     let newNum = newpar.toFixed(3);
            //     return newNum;
            // }else{
            //     return '';
            // }
    },
            //初始化查询列表 默认第一页
            initPage: function () {
                var _this = this;
                var self = this;
                var params = new URLSearchParams();
                params.append("pageNum", _this.$refs.paginationObj.cur_page);
                params.append("pageSize", _this.$refs.paginationObj.cur_pageSize);
                params.append("beginTime", _this.daytime[0]);
                params.append("endTime", _this.daytime[1]);
                this.$axios.post(
                    '/aircontrol/airassess/tCodHourdata/getHourdataByDaytime', params
                ).then(function (res) {
                    self.tableData = res.data.records;
                    _this.$refs.paginationObj.count = res.data.total;
                })
            },
            /*//分页回调
            handleCurrentChange:function(){
                this.initPage();
            },
            paginationFunction:function() {
                this.initPage();
            },*/
            creates:function(val) {
                this.daytime=val;
                this.initPage();
            }
        },

    }
</script>

<style scoped>

</style>
