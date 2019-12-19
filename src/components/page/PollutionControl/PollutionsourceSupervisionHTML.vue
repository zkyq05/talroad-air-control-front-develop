<template>
    <!-- 主体内容 -->
    <div class="content">
        <!--左侧菜单栏-->
        <div class="leftmenu"></div>
        <!-- 地图左侧工具栏 -->
        <div class="main-left" style="left: 285px;top:96px;">
            <HeaderToolButtonpollution></HeaderToolButtonpollution>
        </div>
        <div class="statu_menu">
            <PollutionSourcestatistics></PollutionSourcestatistics>
        </div>
        <!-- 地图 -->
        <div class="main">
            <div class="layerdiv">
                <LayerComponentPollutionSource></LayerComponentPollutionSource>
            </div>
            <div  class="max-area">
                <MapComponentPollutionSource></MapComponentPollutionSource>
            </div>
            <!-- 底部 -->
            <div id="popUpDiv">
                <MapPopUpPollutionSource></MapPopUpPollutionSource>
            </div>
<!--            &lt;!&ndash; 底部 &ndash;&gt;
            <div class="main-bottom" >
                <TimeSliderComponentPollutionSource></TimeSliderComponentPollutionSource>
            </div>-->
        </div>
    </div>
</template>

<script>
    import MapComponentPollutionSource from "../DynamicControl/map/MapComponent_PollutionSource.vue";
    import MapPopUpPollutionSource from "../DynamicControl/map/MapPopUp_PollutionSource.vue";
    import LayerComponentPollutionSource from "../DynamicControl/map/LayerComponent_PollutionSource.vue";
    import HeaderToolButtonpollution from "../DynamicControl/map/headerTool_PollutionSource.vue";
    import PollutionSourcestatistics from "../DynamicControl/map/PollutionSource_statistics.vue";
    import TimeSliderComponentPollutionSource from "../DynamicControl/map/TimeSliderComponent_PollutionSource.vue";
    
    export default {
        name: "dynamicControlHTML",
        components: {
            MapComponentPollutionSource: MapComponentPollutionSource,MapPopUpPollutionSource,LayerComponentPollutionSource,HeaderToolButtonpollution,PollutionSourcestatistics,TimeSliderComponentPollutionSource
        },
        data(){
            return{
            }
        },
        mounted(){

        },
        methods: {
            

        }
    }


</script>

<style scoped  lang="less">
    .leftmenu{
        width: 290px;
        height: calc(100% - 60px);
        background-color: #192132;
        position: absolute;
        top: 60px;
        left: 0px;
        z-index: 9999;
    }
    .statu_menu{
        position: absolute;
        top: 170px;
        right: 33px;
        z-index: 9999;
        width:360px;
        height:150px;
    }
    .layerdiv{
        position: absolute;
        top: 315px;
        right: 14px;
        z-index: 9999;
    }
    #popUpDiv{
        width:420px;
        height:300px;
        position: absolute;
        right: 800px;
        bottom:150px;
        z-index: 1999;
        display: none;
    }
</style>