<template>
    <div style="height: 800px;overflow-y: auto;">
        <div class="panel-tree-hd">
            <div class="el-input"><input type="text"  v-model="stationName" autocomplete="off" placeholder="请输入内容" class="el-input__inner"></div>
        </div>
        <ul id="treeDemo" ref="regionTree" class="ztree"></ul>
        <!--<el-tree @node-click="regionClick" class="filter-tree"  :data="regionDatas" :props="defaultRegion" :expand-on-click-node="false"  :default-expand-all="true"
                 node-this.key="regionCode"     :filter-node-method="filterNode"  ref="regionTree">
        </el-tree>-->
    </div>
</template>

<script>

    export default {
        name: "RegionStationCheckBox",
        data(){
            return{
                stationIds: [],
                setting:{
                    callback: {
                        onCheck: this.zTreeOnClick,
                    },
                    check: {
                        // autoCheckTrigger: false,
                        chkboxType: { "Y" : "ps", "N" : "ps" },
                        chkStyle:"checkbox",
                        enable: true,
                        // nocheckInherit: false,
                        // chkDisabledInherit: false,
                        // radioType: "level"
                    },
                    treeNode: {
                        nocheck: false
                    },
                    view: {
                        fontCss: this.getFontCss
                    }
                },
                zNodes:[],

                stationName:"", //搜索输入值
                lastValue:"",
                zTreeObj:null, //树初始化后对象
                nodeList: [],

            }
        },
        mounted(){
            this.init();
        },
        methods:{
            init(){
                //初始化行政区，默认选中 最高节点
                var _this = this;

                // var url = "/api/air-online-monitor/manualAudit/getRegions";
                var url = "/api/river/getRiverTree";
                let param=new URLSearchParams();
                param.append("riverCode", this.AppConfig.appInfo.riverCode);
                param.append("includeStation", true);

                var parentRegion = {};
                parentRegion.regionCode =  this.AppConfig.appInfo.riverCode;
                parentRegion.open = true;
                _this.$axios.post(url,param).then(function (response) {
                    // var reagions = response.data.regions;
                    // for(let region of reagions){
                    //     region.name = region.regionName;
                    //     if(region.regionCode == parentRegion.regionCode){
                    //         parentRegion = region;
                    //         parentRegion.name = region.regionName;
                    //     }
                    // }
                    // var result = _this.initRegionData(response.data.regions,parentRegion,response.data.stations);
                    // _this.zNodes = [result];
                    _this.zNodes = response.data;
                    _this.zTreeObj = $.fn.zTree.init($("#treeDemo"), _this.setting, _this.zNodes);

                    _this.zTreeObj.expandAll(true);
                })

            },
            initRegionData(regions,parentRegion,stations){
                var children = [];
                for (let region of regions){
                    if(region.paraentCode!=null && region.paraentCode == parentRegion.regionCode){
                        var regionchild = this.initRegionData(regions,region,stations);
                        //绑定站点
                        if(!regionchild.children) {
                            var childred = [];
                            for (let staion of stations) {
                                if(staion.fkRegionid == regionchild.regionCode ){
                                    var icon = this.getIcon(staion);
                                    childred.push({"regionCode":staion.pkId,"name":staion.stationname,"station":staion,"IsStation":true,"icon":icon});
                                }
                            }
                            if(childred.length>0){
                                regionchild.open=true;
                                regionchild.children = childred;
                            }
                        }
                        //设置节点 是否是站点
                        regionchild.IsStation = false;
                        //debugger;
                        //过滤掉没有站点的行政区
                        if(regionchild.children) {
                            children.push(regionchild);
                        }
                    }
                }
                if(children.length>0) {
                    parentRegion.children = children;
                }
                return parentRegion;
            },
            deleteStationIds(stationId){
                this.stationIds.forEach(function(item, index, arr) {
                    if(item == stationId) {
                        arr.splice(index, 1);
                    }
                });
            },
            updateStationIds(treeNode,children){
                if (treeNode.checked){
                    for(let i=0;i<children.length;i++){
                        this.stationIds.push(children[i].value);
                    }
                }else {
                    for(let i=0;i<children.length;i++){
                        this.deleteStationIds(children[i].value);
                    }
                }
            },
            zTreeOnClick(event, treeId, treeNode) {
               // console.log('选中行政区域'+treeNode);
                if(treeNode.station){
                    if (treeNode.checked) {
                        this.stationIds.push(treeNode.value);
                    }else {
                        this.deleteStationIds(treeNode.value);
                    }
                }else {
                    let children = treeNode.children;
                    if(children){
                        let childrenItem = children[0];
                        if(childrenItem.children && childrenItem.children.length > 0){
                            for (let i=0;i<children.length;i++){
                                this.updateStationIds(treeNode,children[i].children);
                            }
                        }else {
                            this.updateStationIds(treeNode,children);
                        }
                    }
                }
                this.$emit("CheckedChange", this.stationIds);
            },
            searchNode(e) {
                var zTree = this.zTreeObj;

                var value = this.stationName;
                var keyType = "name";
                if (this.lastValue === value) return;
                this.lastValue = value;
                if (value === "") return;
                this.updateNodes(false);

                var node = zTree.getNodeByParam(keyType, value);
                if (node === null) {
                    this.nodeList = [];
                } else {
                    this.nodeList = [node];
                }
                this.nodeList = zTree.getNodesByParamFuzzy(keyType, value);
                this.updateNodes(true);
            },
            updateNodes(highlight) {
                var zTree = this.zTreeObj;
                for( var i=0, l=this.nodeList.length; i<l; i++) {
                    this.nodeList[i].highlight = highlight;
                    zTree.updateNode(this.nodeList[i]);
                }
            },
            getFontCss(treeId, treeNode) {
                return (!!treeNode.highlight) ? {color:"#0091da", "font-weight":"bold"} : { "font-weight":"normal"};
            },
            getIcon(station){
                switch (station.status) {
                    case 0:
                        return "static/css/js/zTree_v3/css/zTreeStyle/img/tree02.png";
                    case 1:
                        return "static/css/js/zTree_v3/css/zTreeStyle/img/tree01.png";
                    case 2:
                        return "static/css/js/zTree_v3/css/zTreeStyle/img/tree04.png";
                    case 3:
                        return "static/css/js/zTree_v3/css/zTreeStyle/img/tree03.png";
                }
            },
        },
        watch: {
            stationName(val) {
                this.searchNode(val);
            },
        },
    }
</script>

<style scoped>

</style>
