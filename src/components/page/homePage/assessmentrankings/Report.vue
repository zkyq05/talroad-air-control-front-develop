<template>
    <div>
        <div class="sidebar">
            <div class="sidebar-head">分析报告</div>
            <ul class="sidebar-menu">
                <li :class="checkedOrNot<=5?'menu-item is-open':'menu-item open'">
                    <a href="#">
                        <i class="icon icon-tongjifenxi menu-icon"></i><span class="menu-txt">统计分析</span>
                    </a>
                    <ul class="menu-child">
                        <li :class="{'active':checkedOrNot==1}" @click="jumpSiteDetail(1)"><a><span class="menu-txt">城市排名</span><i class="icon icon-toggle menu-toggle"></i></a>
                        </li>
                        <li :class="{'active':checkedOrNot==2}" @click="jumpSiteDetail(2)"> <a><span class="menu-txt">空气质量污染日历</span><i class="icon icon-toggle menu-toggle"></i></a>
                        </li>
                        <li :class="{'active':checkedOrNot==3}" @click="jumpSiteDetail(3)"><a><span class="menu-txt">城市历史变化分析</span><i class="icon icon-toggle menu-toggle"></i></a>
                        </li>
                        <li :class="{'active':checkedOrNot==4}" @click="jumpSiteDetail(4)"><a><span class="menu-txt">报警分析</span><i class="icon icon-toggle menu-toggle"></i></a>
                        </li>
                        <li :class="{'active':checkedOrNot==5}" @click="jumpSiteDetail(5)"><a><span class="menu-txt">综合指数贡献分析</span><i class="icon icon-toggle menu-toggle"></i></a>
                        </li>
                    </ul>
                </li>
                <li :class="checkedOrNot>=6?'menu-item is-open':'menu-item open'">
                    <a href="#">
                        <i class="icon icon-fenxibaogao menu-icon"></i><span class="menu-txt">分析报告</span>
                    </a>
                    <ul class="menu-child">
                        <li :class="{'active':checkedOrNot==6}" @click="jumpSiteDetail(6)"><a><span class="menu-txt">日报</span><i class="icon icon-toggle menu-toggle"></i></a>
                        <li :class="{'active':checkedOrNot==7}" @click="jumpSiteDetail(7)"><a><span class="menu-txt">月报</span><i class="icon icon-toggle menu-toggle"></i></a>
                        <li :class="{'active':checkedOrNot==8}" @click="jumpSiteDetail(8)"><a><span class="menu-txt">年报</span><i class="icon icon-toggle menu-toggle"></i></a>
                        </li>
                    </ul>
                </li>
            </ul>
            <div class="sidebar-fold"><i class="icon icon-caidan"></i></div>

        </div>
        <div><router-view></router-view></div>
    </div>
</template>

<script>
    export default {
        name: "report",

        data:function () {
            return{
                checkedOrNot: 1,
                liOPen:1,
            }
        },
        methods:{
            jumpSiteDetail:function(index){

                if (index == 1){
                    this.checkedOrNot = index;
                    this.$router.push({path: '/regionBy'});
                } else if(index == 2){
                    this.checkedOrNot = index;
                    this.$router.push({path: '/airQuality'});
                } else if(index == 3){
                    this.checkedOrNot = index;
                    this.$router.push({path: '/cityHistoryAnalyze'});
                } else if(index == 4){
                    this.checkedOrNot = index;
                    this.$router.push({path: '/alarmData'});
                } else if(index == 5){
                    this.checkedOrNot = index;
                    this.$router.push({path: '/cityPmiData'});
                } else if(index == 6){
                    this.checkedOrNot = index;
                    this.$router.push({path: '/analysis'});
                } else if(index == 7){
                    this.checkedOrNot = index;
                    this.$router.push({path: '/analysisMonth'});
                } else if(index == 8){
                    this.checkedOrNot = index;
                    this.$router.push({path: '/analisisYear'});
                }
            },
        },
        created:function() {
            let self =this;
            // self.loding = false;
            self.jumpSiteDetail(1)

        }
    }
</script>

<style scoped>

</style>