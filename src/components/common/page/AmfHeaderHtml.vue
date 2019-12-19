<template>
  <!-- 头部 -->
  <div class="header">

  </div>
</template>

<script>
    export default {
        name: "AmfHeaderHtml",
        methods: {
            logout(){
                // const self = this;
                // self.$axios.post("/operation/user/sys/logout").then(function (response) {
                // }).catch(function (err) {
                //     console.log(err);
                //     self.message = "连接服务器失败！"
                // });
                sessionStorage.removeItem("token")
                this.$router.push('/');
            },
            jumpAirMonitorFront(){
                window.open(this.AppConfig.appInfo.airMonitorFront+sessionStorage.getItem('token'), '_self');
            }
        }
    }
</script>

<style scoped>

</style>
