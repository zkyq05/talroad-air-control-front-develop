<template>
    <div>
        <el-transfer style="padding-bottom: 10px"
            v-model="columnValue"
            :titles="['选择列表', '结果列表']"
            :props="{key: 'columnCode',label:'columnLable'}"
            :data="dialogListNew">
        </el-transfer>
        <el-button align="right"  @click="addcolumnList" >确认</el-button>
    </div>
</template>

<script>
    export default {
        name: "FactorChoose",
        props: [
            "initColumnValue"//初始化时的默认选中项
        ],
        data(){
            return{
                dialogList:[],
                columnValue: this.initColumnValue ? this.initColumnValue : [],
                newcolumnList:[],
                dialogListNew:[],
                pollutantNameArr:[],
                pollutantCodeArr:[]
            }
        },
        mounted(){
            this.showDialogList();
        },
        methods:{
            showDialogList(){
                let that = this;
                that.$axios.post('/api/common/pollutantList').then(function (res) {
                    if (res.code == 0){
                        let pollutantList = res.data;
                        for(let i =0;i<pollutantList.length;i++){
                            let item = pollutantList[i];
                            that.dialogListNew.push({columnCode:item.pollutantCode,columnLable:item.pollutantName+'('+item.unit+')'});
                        }
                    }
                    that.newcolumnList = that.dialogListNew;
                }).catch(function (err) {
                    console.log(err);
                });
            },
            addcolumnList(){
                // let self = this;
                this.dialogTableVisible = false;
                let columnList = [];
                // self.pollutantNameArr=['监测时间','站点名称'];
                // self.pollutantCodeArr=['monitorDate','fkStationid'];
                if(this.columnValue!=null && this.columnValue.length>0){
                    for(let j =0;j<this.columnValue.length;j++){
                        for(let i =0;i<this.newcolumnList.length;i++){
                            if(this.columnValue[j]==this.newcolumnList[i].columnCode){
                                let sheet = this.newcolumnList[i].columnLable;
                                let value = this.newcolumnList[i].columnCode;

                                let sheetArr = sheet.split("(");
                                let pUnit = sheetArr[1];

                                this.pollutantNameArr.push(sheet);
                                this.pollutantCodeArr.push(value);
                                columnList.push({pollutantCode:value,pollutantName:sheetArr[0],pollutantUnit:pUnit.substring(0,pUnit.length-1)});
                            }
                        }
                    }
                }
                let data2 = {"pollutantNameArr":this.pollutantNameArr,"pollutantCodeArr":this.pollutantCodeArr,"pollutantArr":columnList}
                let data = {"columnValue":this.columnValue,"factorArr":data2};
                this.$emit("FactorChange",data);
            },
        }
    }
</script>

<style scoped>

</style>
