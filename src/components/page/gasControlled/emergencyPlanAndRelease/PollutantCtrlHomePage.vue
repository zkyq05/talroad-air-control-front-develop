<template>
    <div >
        <div class="sidebar">
            <div class="sidebar-head">重污染天气管控</div>
            <ul class="sidebar-menu">
                <li class="menu-item" :class="{'active':checkedOrNot==1}" @click="jumpSiteDetail(1)">
                    <a href="#">
                        <i class="icon icon-shouye menu-icon"></i><span class="menu-txt">预警</span>
                    </a>
                </li>
                <li class="menu-item" :class="{'active':checkedOrNot==2}" @click="jumpSiteDetail(2)">
                    <a href="#">
                        <i class="icon icon-fenbu menu-icon"></i><span class="menu-txt">发布</span>
                    </a>
                </li>
                <li class="menu-item" :class="{'active':checkedOrNot==3}" @click="jumpSiteDetail(3)">
                    <a href="#">
                        <i class="icon icon-yuandang menu-icon"></i><span class="menu-txt">分析</span>
                    </a>
                </li>
                <li class="menu-item" :class="{'active':checkedOrNot==4}" @click="jumpSiteDetail(4)">
                    <a href="#">
                        <i class="icon icon-bingtu menu-icon"></i><span class="menu-txt">应急预案</span>
                    </a>
                </li>
                <li class="menu-item" :class="{'active':checkedOrNot==5}" @click="jumpSiteDetail(5)">
                    <a href="#">
                        <i class="icon icon-bingtu menu-icon"></i><span class="menu-txt">减排清单</span>
                    </a>
                </li>
            </ul>
            <div class="sidebar-fold"><i class="icon icon-caidan"></i></div>
        </div>
        <div><router-view></router-view></div>
    </div>
</template>

<script>
    export default {
        name: "PollutantCtrlHomePage",

        data:function () {
            return{
                checkedOrNot:1,
            }
        },
        methods:{
            jumpSiteDetail:function(index){

                if (index == 1){
                    this.checkedOrNot = index;
                    this.$router.push({path: '/gasPredictEchar'});
                } else if(index == 2){
                    this.checkedOrNot = index;
                    this.$router.push({path: '/warningRelease'});
                } else if(index == 3){
                    this.checkedOrNot = index;
                    this.$router.push({path: '/gasAnalysis'});
                } else if(index == 4){
                    this.checkedOrNot = index;
                    this.$router.push({path: '/emergencyPlan'});
                }  else if(index == 5){
                    this.checkedOrNot = index;
                    this.$router.push({path: '/emissionsList'});
                }
            },
        },
        created:function() {
            let self =this;
            self.jumpSiteDetail(1)

        }
    }
</script>

<style scoped>
    .td{
        width: 200px;
    }
</style>
