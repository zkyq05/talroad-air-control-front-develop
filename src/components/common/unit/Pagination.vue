<template>
    <el-pagination background
                   :current-page="cur_page"
                   :page-sizes="pageSizes"
                   :page-size="cur_pageSize"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   layout="total, prev, pager, next, sizes"
                   :total=count
                   :hide-on-single-page="false">
    </el-pagination>
</template>

<script>
    export default {
        name: "Pagination",
        props: ["pageNum","totalNum"],
        data(){
            return {
                cur_page: this.pageNum ? this.pageNum : 1,//当前页
                cur_pageSize: this.AppConfig.appInfo.pageSize,//当前分页单位
                count: this.totalNum ? this.totalNum : 0,
                pageSizes: this.AppConfig.appInfo.pageSizes,
            }
        },
        methods: {
            handleCurrentChange(val){
                this.cur_page = val;
                this.$emit("paginationFunction");
            },
            handleSizeChange(val){
                this.cur_pageSize = val;
                this.$emit("paginationFunction");
            }
        }
    }
</script>

<style scoped>

</style>
