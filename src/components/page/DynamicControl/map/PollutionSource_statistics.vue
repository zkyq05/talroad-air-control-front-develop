<template>
  <div>
    <div class="PollutionSource_statistics_div">
      <div class="statue_div1">
        <div style="float:left;width:87px;">企业总数</div>
        <div class="statue_value">{{PollutionSource_data.all_num}}</div>
      </div>
      <div class="statue_div2">
        <div style="float:left;width:88px;">
          <div class="statue_square" style="background-color: #46C96F;"></div>
          达标企业
        </div>
        <div class="statue_value2">{{PollutionSource_data.compliance_num}}</div>
      </div>
      <div class="statue_div1">
        <div style="float:left;width:87px;">达标率</div>
        <div class="statue_value">{{PollutionSource_data.compliance_rate}}</div>
      </div>
      <div class="statue_div2">
        <div style="float:left;width:88px;">
          <div class="statue_square" style="background-color: #EA3522;"></div>
          超标企业
        </div>
        <div class="statue_value2">{{PollutionSource_data.excess_num}}</div>
      </div>
      <div class="statue_div1">
        <div style="float:left;width:87px;">离线率</div>
        <div class="statue_value">{{PollutionSource_data.offline_rate}}</div>
      </div>
      <div class="statue_div2">
        <div style="float:left;width:88px;">
          <div class="statue_square" style="background-color: #89989E;"></div>
          离线企业
        </div>
        <div class="statue_value2">{{PollutionSource_data.offline_num}}</div>
      </div>
    </div>
  </div>
  
</template>

<script>
import { getMapInitExtent } from "./mapjs/MapImpl";
import AirInfoImpl from "./mapjs/AirInfoImpl";
import { dataRequestUrl, mapExtent } from "./mapjs/AppConfig";

export default {
  name: "PollutionSourcestatistics",
  data() {
    return {
      PollutionSource_data:{
        all_num:"-",
        compliance_num:"-",
        excess_num:"-",
        offline_num:"-",
        compliance_rate:"-",
        offline_rate:"-",
      }
    };
  },
  mounted: function() {
    this.getPollutionSource_statistics(); //获取污染源统计情况
  },
  methods: {
    //获取污染源统计情况
    getPollutionSource_statistics: function() {
      let url = dataRequestUrl.options.wrsjListInfo.getPollutionSource_statistics;
      let parameter = {  };
      let cVue = this;
      let mydata = AirInfoImpl.getpopularData(
        url,
        parameter,
        cVue.dealPollutionSource_statistics
      );
    },
    //处理获取的污染源统计数据
    dealPollutionSource_statistics: function(data) {
      if(data!=null && data!=""){
        this.PollutionSource_data.all_num=data.total;
        this.PollutionSource_data.compliance_num=data.notover;
        this.PollutionSource_data.excess_num=data.over;
        this.PollutionSource_data.offline_num=data.outline;
        let compliance_rate=(parseInt(data.notover)/parseInt(data.total)).toFixed(2)*100;
        let offline_rate=(parseInt(data.outline)/parseInt(data.total)).toFixed(2)*100;
        this.PollutionSource_data.compliance_rate=compliance_rate+"%";
        this.PollutionSource_data.offline_rate=offline_rate+"%";
      }else{
        this.PollutionSource_data=
          {
            "all_num":"-",
            "compliance_num":"-",
            "excess_num":"-",
            "offline_num":"-",
            "compliance_rate":"-",
            "offline_rate":"-",
          }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.PollutionSource_statistics_div {
  transform: translateY(-99px) translateX(28px);
  width: 360px;
  height: 148px;
  border-radius: 3px;
  background-color: #202A42;
  padding:20px;    
  font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  .statue_div1{
    float:left;
    width: 159px;
    height: 36px;
    line-height: 36px;
    color: #93AECE; 
    font-size: 14px;
    border-right: 1px solid #363F55;
  }
  .statue_div2{
    float:left;
    width: 140px;
    height: 36px;
    line-height: 36px;
    color: #93AECE; 
    font-size: 14px;
    padding-left: 20px;
  }
  .statue_square{
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-top:13px;
    margin-right: 7px;
    border-radius: 3px;
  }
  .statue_value{
    float:left;
    width: 70px;
    font-family: 'Oswald';
    font-size: 14px;
    height: 36px;
    line-height: 36px;
    color: #fff;
    font-weight: 600;
  }
  .statue_value2{
    float:left;
    width: 30px;
    font-family: 'Oswald';
    font-size: 14px;
    height: 36px;
    line-height: 36px;
    color: #fff;
    font-weight: 600;
  }
}
</style>
