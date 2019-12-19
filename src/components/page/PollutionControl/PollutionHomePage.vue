<template>
    <div>
        <div class="sidebar">
            <div class="sidebar-head">污染源监管</div>
            <ul class="sidebar-menu">
                <li class="menu-item" :class="{'active':checkedOrNot==1}" @click="jumpSiteDetail(1)">
                    <a href="#">
                        <i class="icon icon-shouye menu-icon"></i><span class="menu-txt">首页</span>
                    </a>
                </li>
                <li class="menu-item" :class="{'active':checkedOrNot==2}" @click="jumpSiteDetail(2)">
                    <a href="#">
                        <i class="icon icon-fenbu menu-icon"></i><span class="menu-txt">污染源分布</span>
                    </a>
                </li>
                <li class="menu-item" :class="{'active':checkedOrNot==3}" @click="jumpSiteDetail(3)">
                    <a href="#">
                        <i class="icon icon-yuandang menu-icon"></i><span class="menu-txt">一源一档</span>
                    </a>
                </li>
                <li class="menu-item" :class="{'active':checkedOrNot==5}" @click="jumpSiteDetail(5)">
                    <a href="#">
                        <i class="icon icon-bingtu menu-icon"></i><span class="menu-txt">污染源特征管理</span>
                    </a>
                </li>
                <li class="menu-item" :class="{'active':checkedOrNot==4}" @click="jumpSiteDetail(4)">
                    <a href="#">
                        <i class="icon icon-bingtu menu-icon"></i><span class="menu-txt">企业排放统计</span>
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
        name: "pollutionHomePage",

        data:function () {
            return{
                checkedOrNot: 1,
            }
        },
        methods:{
            jumpSiteDetail:function(index){

                if (index == 1){
                    this.checkedOrNot = index;
                    this.$router.push({path: '/PollutionControlHomePage'});
                } else if(index == 2){
                    this.checkedOrNot = index;
                    this.$router.push({path: '/PollutionsourceSupervisionHTML'});
                } else if(index == 3){
                    this.checkedOrNot = index;
                    this.$router.push({path: '/EnterpriseArchives'});
                } else if(index == 4){
                    this.checkedOrNot = index;
                    this.$router.push({path: '/EntOutStatistical'});
                }else if(index == 5){
                    this.checkedOrNot = index;
                    this.$router.push({path: '/traitManagement'});
                }
            },
        },
        created:function() {
            let self =this;
            var id = 1;
            if(self.$route.query.queryData!=null){
                id = self.$route.query.queryData;
            }
            self.jumpSiteDetail(id)
        }
    }
</script>

<style scoped>
.td{
    width: 200px;
}
</style>