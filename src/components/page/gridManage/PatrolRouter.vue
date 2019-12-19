<template>
    <div>

        <div class="sidebar">
            <div class="sidebar-head">网格管控</div>
            <ul class="sidebar-menu">
                <li :class="{'menu-item is-open':checkedOrNot==1}">
                    <a href="#" @click="jumpSiteDetail(1)">
                        <i class="icon icon-tongjifenxi menu-icon"></i><span class="menu-txt">巡查计划制定</span>
                    </a>
                </li>
                <li :class="{'menu-item is-open':checkedOrNot==2}">
                    <a href="#"  @click="jumpSiteDetail(2)">
                        <i class="icon icon-fenxibaogao menu-icon"></i><span class="menu-txt">巡查日志</span>
                    </a>
                </li>
                <li :class="{'menu-item is-open':checkedOrNot==3}">
                    <a href="#"  @click="jumpSiteDetail(3)">
                        <i class="icon icon-fenxibaogao menu-icon"></i><span class="menu-txt">污染排查</span>
                    </a>
                </li>
                <li :class="{'menu-item is-open':checkedOrNot==4}">
                    <a href="#"  @click="jumpSiteDetail(4)">
                        <i class="icon icon-fenxibaogao menu-icon"></i><span class="menu-txt">事件上报</span>
                    </a>
                </li>
            </ul>
            <div class="sidebar-fold"><i class="icon icon-caidan"></i></div>

        </div>
           <div>
                <router-view>
                </router-view>
            </div>

    </div>
</template>

<script>
    export default {
        name: "PatrolRouter",
        data:function(){
            return{
                isOpenClass1:'menu-item open',
                isOpenClass2:'menu-item open',
                isOpenClass3:'menu-item open',
                isOpenClass4:'menu-item open',
                checkedOrNot:1,
            }
        },
        created:function() {
            let self =this;
            self.jumpSiteDetail(1)
        },
        methods:{
            jumpSiteDetail:function(index){
                this.checkedOrNot=index;
                if (index == 1){
                    this.$router.push({path: '/PatrolPlanMake'});
                } else if(index == 2){
                    this.$router.push({path: '/PatrolLog'});
                } else if(index == 3){
                    this.$router.push({path: '/PollutionScreening'});
                } else if(index == 4){
                    this.$router.push({path: '/EventReport'});
                }
            },
        }
    }
</script>

<style scoped>

</style>