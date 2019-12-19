<template>
    <div>
        <el-scrollbar style="height: 100%">
            <!--<Tree ref="amfRegionobj" v-on:RegionChangeClick="RegionChangeClick"></Tree>-->
            <el-tabs tab-position="left" class="areaSelect" @tab-click="tabClick"  type="card" v-model="activeName"  >
                <template v-if="treeType == 'tree'">
                    <el-tab-pane label="区域" name="1">
                        <RegionTree @RegionChangeClick="RegionChangeClick"></RegionTree>
                    </el-tab-pane>
                    <el-tab-pane label="流域" name="2">
                        <RiverTree @RiverChangeClick="RiverChangeClick"></RiverTree>
                    </el-tab-pane>
                </template>

                <template v-if="treeType == 'treeCheckBox'">
                    <el-tab-pane label="区域" name="1">
                        <RegionTreeCheckBox @RegionChangeClick="RegionChangeClick"></RegionTreeCheckBox>
                    </el-tab-pane>
                    <el-tab-pane label="流域" name="2">
                        <RiverTreeCheckBox @RiverChangeClick="RiverChangeClick"></RiverTreeCheckBox>
                    </el-tab-pane>
                </template>


                <template v-if="treeType == 'station'">
                    <el-tab-pane label="区域" name="1">
                        <RegionStation @RegionChange="RegionChangeClick"></RegionStation>
                    </el-tab-pane>
                    <el-tab-pane label="流域" name="2">
                        <RiverStation @RiverChange="RiverChangeClick"></RiverStation>
                    </el-tab-pane>
                </template>

            </el-tabs>
        </el-scrollbar>
    </div>
</template>

<script>
    import RegionTree  from './RegionTree'
    import RiverTree from './RiverTree'

    import RegionTreeCheckBox  from './RegionTreeCheckBox'
    import RiverTreeCheckBox from './RiverTreeCheckBox'

    import RegionStation from './RegionStation'
    import RiverStation from './RiverStation'

    export default {
        name: "RegionAndRiver",
        props:[
            "showPanel",//是否显示 内容区  true  / false
            "treeType",//树类型  station/stationCheckBox/tree/treeCheckBox
            "selectStation",//初始化 是否显示站点 true /false
            "riverClick",//流域是否可点击 true/false
        ],
        components:{
            RegionTree,
            RiverTree,
            RegionTreeCheckBox,
            RiverTreeCheckBox,
            RegionStation,
            RiverStation,
        },
        data(){
            return{
                activeName:'1',
            }
        },
        mounted(){
            this.init();
        },
        methods:{
            init(){
                this.tabClick({name:1});
            },
            RegionChangeClick(treeNode){
                this.$emit("RegionChange", treeNode);
            },
            RiverChangeClick(treeNode){
                this.$emit("RiverChange", treeNode);
            },
            tabClick(tab){
                this.$emit("TabClick",tab.name);
            }

        }

    }
</script>

<style>
    .areaSelect .el-tabs__nav .el-tabs__item {
        padding: 0 8px !important;
    }
</style>
