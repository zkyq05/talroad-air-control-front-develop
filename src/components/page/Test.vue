<template>
    <div>
        <mfg :initGroupId="initGroupId" :query-group-id="queryGroupId" :open-customer="openCustomer" @mfgChange="mfgChange"></mfg>
        <river @CheckedChange="CheckedChange"></river>
    </div>
</template>

<script>
    import mfg from '../common/unit/MonitoringFactorGroup'
    import river from '../common/unit/RiverStationCheckBox'

    export default {
        name: "Test",
        components:{
            mfg,river
        },
        data(){
            return{
                initGroupId:1,
                queryGroupId: [1,2],
                openCustomer: true,
            }
        },
        methods:{
            CheckedChange(item){
                console.log("回调行政区域站点");
                console.log(item);
            },
            mfgChange(item){
                console.log("回调");
                console.log(item);
            }
        }
    }
</script>

<style scoped>

</style>
