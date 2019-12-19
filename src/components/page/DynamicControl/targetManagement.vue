<template>
    <div>
        <div class="sidebar">
            <div class="sidebar-head">目标管理</div>
            <ul class="sidebar-menu">
                <li :class="{'menu-item is-open':checkedOrNot==1}">
                    <a href="#" @click="jumpSiteDetail(1)">
                        <i class="icon icon-mubiao menu-icon"></i><span class="menu-txt">今日目标</span>
                    </a>
                </li>
                <li :class="{'menu-item is-open':checkedOrNot==2}">
                    <a href="#" @click="jumpSiteDetail(2)">
                        <i class="icon icon-sheding menu-icon"></i><span class="menu-txt">年度目标设定</span>
                    </a>
                </li>
                <li :class="{'menu-item is-open':checkedOrNot==3}">
                    <a href="#" @click="jumpSiteDetail(3)">
                        <i class="icon icon-dabiao menu-icon"></i><span class="menu-txt">达标现状</span>
                    </a>
                </li>
                <li :class="{'menu-item is-open':checkedOrNot==4}">
                    <a href="#" @click="jumpSiteDetail(4)">
                        <i class="icon icon-rili menu-icon"></i><span class="menu-txt">达标日历</span>
                    </a>
                </li>
            </ul>
        </div>
        <div><router-view></router-view></div>
    </div>
</template>

<script>
    export default {
        name: "targetManagement",
        data:function () {
            return{
                checkedOrNot: 1,
            }
        },
        methods:{
            jumpSiteDetail:function(index){

                if (index == 1){
                    this.checkedOrNot = index;
                    this.$router.push({path: '/todaysGoal'});
                } else if(index == 2){
                    this.checkedOrNot = index;
                    this.$router.push({path: '/annualGoalSetting'});
                } else if(index == 3){
                    this.checkedOrNot = index;
                    this.$router.push({path: '/reachState'});
                } else if(index == 4){
                    this.checkedOrNot = index;
                    this.$router.push({path: '/reachCalendar'});
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
