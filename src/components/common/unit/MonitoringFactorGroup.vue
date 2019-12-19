<template>
    <div>
        <el-select v-model="groupId" placeholder="请选择" style="width: 160px" @change="changeFunction">
            <el-option
                v-for="item in monitoringFactorGroupType"
                :key="item.groupId"
                :label="item.groupName"
                :value="item.groupId">
            </el-option>
        </el-select>

        <el-dialog title="自定义监测项目组"  width="540px" height="800px" :visible.sync="dialogTableVisible" :destroy-on-close="true" :modal-append-to-body="false"  @close="closeColumn">
            <template>
                <div>
                    <FactorChoose :initColumnValue="columnValue" @FactorChange = "FactorChange"></FactorChoose>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script>
    import FactorChoose from './FactorChoose'

    export default {
        name: "MonitoringFactorGroup",
        props: [
            "initGroupId",//下拉菜单初始化时默认选中项id
            "queryGroupId",//下拉菜单初始化指定下拉内容(指定的监测因子组id数组)，无特殊要求不传
            "openCustomer"//下拉菜单是否包含“自定义监测因子”下拉,true-包含；false-不包含
        ],
        components: {
            FactorChoose
        },
        data(){
            return{
                groupId: this.initGroupId ? this.initGroupId : 0,
                monitoringFactorGroupType: [],
                pollutantInfo:[],
                dialogTableVisible:false,
                columnValue:[]
            }
        },
        methods:{
            closeColumn(){
                this.dialogTableVisible = false;
            },
            FactorChange(factorData){
                this.dialogTableVisible = false;
                this.pollutantInfo = factorData.factorArr;
                this.columnValue = factorData.columnValue;
                this.$emit("mfgChange",this.pollutantInfo);
            },
            getpollutantInfo(){
                for (let i=0;i<this.monitoringFactorGroupType.length;i++){
                    let item = this.monitoringFactorGroupType[i];
                    if (this.groupId == item.groupId){
                        this.pollutantInfo = item.pollutantInfo;
                        break;
                    }
                }
            },
            changeFunction(){
                if (this.groupId != 0){
                    this.getpollutantInfo();
                    this.$emit("mfgChange",this.pollutantInfo);
                } else {
                    console.log("弹出自定义监测因子弹窗");
                    this.dialogTableVisible = true;
                }
            },
            initPage(){
                let self = this;
                let param = new URLSearchParams();
                if (this.queryGroupId){
                    param.append("groupId",this.queryGroupId);
                }
                if (this.openCustomer){
                    param.append("openCustomer",this.openCustomer);
                }

                this.$axios.post("api/common/getMonitorFactorGroup",param).then(function (res) {
                    if (res.code == 0){
                        self.monitoringFactorGroupType = res.data;
                        self.getpollutantInfo();
                        self.$emit("mfgChange",self.pollutantInfo);
                    } else {
                        self.$message.error(res.msg);
                    }
                })
            }
        },
        created() {
            this.initPage();
        }
    }
</script>

<style scoped>

</style>
