<template>
    <div style="height: 800px;overflow-y: auto;">
        <div class="panel-tree-hd">
            <div class="el-input"><input type="text" v-model="stationName" autocomplete="off" placeholder="请输入内容" class="el-input__inner"></div>
        </div>
       <!-- <input type="text" v-model="stationName" class="empty" />-->
        <ul id="treeDemoRiver" ref="regionTree" class="ztree"></ul>
    </div>
</template>

<script>

    export default {
        name: "RiverTree",
        data() {
            return {
                riverCode: this.AppConfig.appInfo.riverCode,
                setting: {
                    callback: {
                        onClick: this.zTreeOnClick,
                    },
                    view: {
                        fontCss: this.getFontCss
                    }
                },
                zNodes: [],

                stationName:"", //搜索输入值
                lastValue:"",
                zTreeObj:null, //树初始化后对象
                nodeList: [],

            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                var _this = this;

                var params = new URLSearchParams();
                params.append('riverCode', this.riverCode);

                this.$axios.post(
                    '/api/river/getRiverTree',
                    params
                ).then(function (res) {
                    if (res.code == 0) {
                        _this.zNodes = res.data;
                        _this.zTreeObj =  $.fn.zTree.init($("#treeDemoRiver"), _this.setting, _this.zNodes);
                        _this.zTreeObj.expandAll(true);
                    }
                }).catch(function (err) {
                    console.log(err);
                })
            },
            zTreeOnClick(event, treeId, treeNode) {
                // console.log("xingzhengquyushu========"+treeNode.name+';'+treeNode.label+";"+treeNode.value);
                this.$emit("RiverChangeClick", treeNode);
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
                for (var i = 0, l = this.nodeList.length; i < l; i++) {
                    this.nodeList[i].highlight = highlight;
                    zTree.updateNode(this.nodeList[i]);
                }
            },
            getFontCss(treeId, treeNode) {
                return (!!treeNode.highlight) ? {color: "#0091da", "font-weight": "bold"} : { "font-weight": "normal" };
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
