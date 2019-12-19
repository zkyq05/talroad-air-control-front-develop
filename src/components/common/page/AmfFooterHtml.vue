<template>
  <!-- 底部 -->
  <div class="footer">
    <span>中节能天融科技有限公司</span>
    <span>版权所有</span>
    <span>Copyright © {{startYear}}-{{endYear}} </span>
    <span>All Right Reserved </span>
    <span>京ICP备10207363-1号</span>
  </div>
</template>

<script>
    export default {
        name: "AmfFooterHtml",
        data(){
            return{
                startYear: 2019,
                endYear: 2019
            }
        },
        methods: {
            initCopyRightTime(){
                var date = new Date();
                this.startYear = date.getFullYear();
                this.endYear = this.startYear + 100;
            }
        },
        created() {
            this.initCopyRightTime();
        }
    }
</script>

<style scoped>

</style>
