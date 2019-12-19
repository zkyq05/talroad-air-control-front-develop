<template>
    <!-- 导航 -->
    <div class="header" style="background-color: #1a2234">
        <!-- logo -->
        <h1 class="logo">
            <a href="javascript:;" class="logo-pic"></a>
        </h1>
        <ul class="nav-box">
            <li :class="[checkedOrNot==1?'nav-item is-active':'nav-item']" @click="changeActive(1)">
                <router-link to="/dynamicControlHTML">
                    <h2>动态管控</h2>
                </router-link>
                <ul class="nav-sub">
                    <li class="nav-item">
                        <router-link to="/targetManagement">
                            <h2>目标管理</h2>
                        </router-link>
                    </li>
                </ul>
            </li>
            <li :class="[checkedOrNot==2?'nav-item is-active':'nav-item']" @click="changeActive(2)">
                <router-link to="/MonitorAlarm">
                    <h2>监测报警<b class="circle-box"></b></h2>
                </router-link>
            </li>
            <li :class="[checkedOrNot==3?'nav-item is-active':'nav-item']" @click="changeActive(3)">
                <router-link to="/airwrzd">
                    <h2>污染诊断</h2>
                </router-link>
            </li>
            <li :class="[checkedOrNot==4?'nav-item is-active':'nav-item']" @click="changeActive(4)">
                <router-link to="ScheduleFollowing">
                    <h2>措施执行</h2>
                </router-link>
            </li>
            <li :class="[checkedOrNot==5?'nav-item is-active':'nav-item']" @click="changeActive(5)">
                <router-link to="PatrolPlanMake">
                    <h2>网格管控</h2>
                </router-link>
            </li>
            <li :class="[checkedOrNot==6?'nav-item is-active':'nav-item']" @click="changeActive(6)">
               <router-link to="/pollutionHomePage">
                    <h2>污染源监管</h2>
               </router-link>
            </li>
            <li :class="[checkedOrNot==7?'nav-item is-active':'nav-item']" @click="changeActive(7)">
                <router-link to="/PollutantCtrlHomePage">
                    <h2>重污染天气管控</h2>
                </router-link>
            </li>
            <li :class="[checkedOrNot==8?'nav-item is-active':'nav-item']" @click="changeActive(8)">
                <router-link to="/tEnvHourdataArea">
                    <h2>考核排名</h2>
                </router-link>
            </li>
            <li :class="[checkedOrNot==9?'nav-item is-active':'nav-item']" @click="changeActive(9)">
                <router-link to="/report">
                    <h2>分析报告</h2>
                </router-link>
            </li>
        </ul>

        <ul class="header-menu">
            <div class="menu-item">
                <div class="input-wrap input-wrap-suffix">
                    <input type="text" class="u-input" placeholder="请输入">
                    <i class="icon icon-search"></i>
                </div>
            </div>
            <div class="menu-item">
                <a href="javascript:;" class="icon icon-qipao"></a>
            </div>
            <div class="menu-item menu-user">
                <div class="menu-user-hd" data-toggle="dropdown" aria-expanded="false">
                    <div class="user-avatar"><img src="../../../../static/css/images/pic/head.png" alt=""></div>
                    <div class="user-name">JayLiu&nbsp;&nbsp;&nbsp;</div>
                    <div class="user-name" style="font-size: 14px;font-weight: 400;opacity: .8;" @click="logout">注销</div>
                </div>
            </div>
        </ul>
    </div>

</template>

<script>
    export default {
        name: "AmfNavHtml",
        data() {
            return {
                menuData: [],
                checkedOrNot: 1
            }
        },
         ////////////勿删 增加路由监听
/*        watch:{
            '$route'(to,from){
            let cVue = this;
            //debugger
            if(to.name =="dynamicControlHTML"||to.name =="airwrzd"){
                cVue.$store.state.mapRouteName = to.name;
            }
            }
        },*/
        mounted() {
            this.init();
        },
        methods: {
            init() {
                this.menuData = JSON.parse(sessionStorage.getItem("menus"))
            },
            changeActive:function(index){
                this.checkedOrNot = index;
                this.$store.state.mapRouteName = index;
            },
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
        },
        
    }
</script>

<style scoped>

</style>
