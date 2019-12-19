<template>
    <dev class = 'main-con'>
        <div style ="width: 100% ;height: 160px;margin-top: 40px">
            <tr style="height: 60px">
                <td class="td">行业类别：{{dataMap.name}}</td>
                <td class="td">社会统一信用代码：{{dataMap.creditCode}}</td>
                <td class="td">污染源类型：{{dataMap.level}}</td>
                <td class="td">地址：{{dataMap.businessAddress}}</td>
            </tr>
            <tr>
                <td class="td">组织机构代码：</td>
                <td class="td">法人：{{dataMap.legalPerson}}</td>
                <td class="td">污染源类型：{{dataMap.name}}</td>
                <td class="td">联系方式：{{dataMap.iphone}}</td>
            </tr>
        </div>
        <table style="">
            <tr>
                <td class="td2">排污许可证：</td>
                <td class="td2">发证日期：</td>
            </tr>
            <tr>
                <td class="td2">许可证编号：</td>
                <td class="td2">有效期：</td>
            </tr>
            <tr>
                <td class="td2">发证机关：</td>
            </tr>
        </table>
        <table style="border: #b9bec5 solid 1px;margin-top: 20px">
            <tr>
                <td class="td3">主要污染物类别：</td>
                <td class="td4">废气,废水</td>
            </tr>
            <tr>
                <td class="td3">大气主要污染物种类：</td>
                <td class="td4">氨（氨气）,硫化氢,臭气浓度,二氧化硫,氮氧化物,颗粒物</td>
            </tr>
            <tr>
                <td class="td3">大气污染物排放规律：：</td>
                <td class="td4">无组织</td>
            </tr>
            <tr>
                <td class="td3">大气污染物排放执行标准：</td>
                <td class="td4"> /,大气污染物综合排放标准GB16297-1996,恶臭污染物排放标准DB 12/-059-95</td>
            </tr>
            <tr>
                <td class="td3">废水主要污染物种类：</td>
                <td class="td4">化学需氧量,氨氮（NH3-N）,pH值,五日生化需氧量,悬浮物,动植物油,总磷（以P计）,总氮（以N

                    计）,大肠菌群数,流量,粪大肠菌群数/（MPN/L）</td>
            </tr>
            <tr style="width: 100%">
                <td class="td3">废水污染物排放规律：</td>
                <td class="td4">间断排放，排放期间流量不稳定，但有规律，且不属于非周期性规律</td>
            </tr>
            <tr>
                <td class="td3">废水污染物排放执行标准：</td>
                <td class="td4">污水综合排放标准DB12 356-2018,肉类加工工业水污染物排放标准　GB 13457-92,/</td>
            </tr>
            <tr>
                <td class="td3">排污权使用和交易信息：</td>
                <td class="td4">/</td>
            </tr>
        </table>
        <el-table :data="tableData"  style="width: 90%;margin-top: 20px" ref="multipleTable" height="230"
                  class="table-default01 table-lg"  stripe="true">
            <el-table-column type="index"  label="序号" align="center" width="70px" >
            </el-table-column>
            <el-table-column prop="outCode" label="排放口编号" align="center">
            </el-table-column>
            <el-table-column prop="outCode" label="排放口名称" align="center">
            </el-table-column>
            <el-table-column prop="pollutantName" label="污染物种类" align="center">
            </el-table-column>
            <el-table-column prop="val" label="最近检测值" align="center">
            </el-table-column>
            <el-table-column prop="monitorTime" label="检测时间" align="center" :formatter="statusFormat">
            </el-table-column>
            <el-table-column prop="dayVal" label="日均浓度" align="center">
            </el-table-column>
        </el-table>
    </dev>
</template>

<script>
    export default {
        name: "entArchivesDetil",
        data:function(){
            var _this=this;
            return{

                tableData:[],
                dataMap:{},
                id: this.$route.query.id,
            }
        },
        mounted(){
            this.initQuery();
        },
        methods:{
            initQuery() {
                let that = this;
                var url = '/aircontrol/airassess/tCodInformation/entListDetil';
                that.$axios.get(url,{params:{
                        id:that.id
                    }}).then(
                    function (res) {
                        if(res.code == 0){
                            that.tableData = res.data.outDataList;
                            that.dataMap = res.data.entData[0];
                        }else {
                            that.tableData = [] ;
                        }
                    }
                )
            },
        }
    }
</script>

<style scoped>
    .td{
        width: 330px;
        font-size: 14px;
        line-height: 23px;
        padding-left: 30px;
        padding-right: 30px;
    }

    .td2{
        width: 330px;
        font-size: 14px;
        line-height: 23px;
        padding-left: 30px;
        padding-right: 30px;
    }

    .td3{
        line-height: 35px;
        text-align: left;
        width: 25%;
        padding-right: 20px;
        border:1px solid #b9bec5;
        padding-left: 25px;
    }
    .td4{
        width: 85%;
        border:1px solid #b9bec5;
        padding-left: 10px;
    }
</style>