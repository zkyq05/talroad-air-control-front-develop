<template>
    <div class="map_legend">
      <div style="float:left;width:20px;height:30px;z-index: 9999999;"  @mouseover="legend_open('1') " @mouseout="legend_close()">
        <div style="width:20px;height:6px;float:left;margin-top:17px;background-color:rgb(70, 201, 111);"></div>
      </div>
      <div style="float:left;width:20px;height:30px;z-index: 9999999;" @mouseover="legend_open('2') " @mouseout="legend_close()">
        <div style="width:20px;height:6px;float:left;margin-top:17px;background-color:#F8C900;"></div>
      </div>
      <div style="float:left;width:20px;height:30px;z-index: 9999999;" @mouseover="legend_open('3') " @mouseout="legend_close()">
        <div style="width:20px;height:6px;float:left;margin-top:17px;background-color:#F19D38;"></div>
      </div>
      <div style="float:left;width:20px;height:30px;z-index: 9999999;" @mouseover="legend_open('4') " @mouseout="legend_close()">
        <div style="width:20px;height:6px;float:left;margin-top:17px;background-color:#EA3522;"></div>
      </div>
      <div style="float:left;width:20px;height:30px;z-index: 9999999;" @mouseover="legend_open('5') " @mouseout="legend_close()">
        <div style="width:20px;height:6px;float:left;margin-top:17px;background-color:#8B2293;"></div>
      </div>
      <div style="float:left;width:20px;height:30px;z-index: 9999999;" @mouseover="legend_open('6') " @mouseout="legend_close()">
        <div style="width:20px;height:6px;float:left;margin-top:17px;background-color:#8E1C10;"></div>
      </div>
      <div class="legend_title_div">
        <div class="legend_title"></div>
        <div class="legend_angel">
          <i class="fa fa-caret-down"></i>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "maplegend",
  data() {
    return {

    };
  },
  methods: {
    legend_open:function(a){
      switch(a) {
          case "1":
              $(".legend_title").html("优");
              $(".legend_title").css("background-color","rgb(70, 201, 111)");
              $(".legend_angel").css("color","rgb(70, 201, 111)");
              $(".legend_title").css("margin-left","-7px");
              $(".legend_angel").css("margin-left","37px");
              break;
          case "2":
              $(".legend_title").html("良");
              $(".legend_title").css("background-color","#F8C900");
              $(".legend_title").css("margin-left","13px");
              $(".legend_angel").css("color","#F8C900");
              $(".legend_angel").css("margin-left","57px");
              break;
          case "3":
              $(".legend_title").html("轻度污染");
              $(".legend_title").css("background-color","#F19D38");
              $(".legend_title").css("margin-left","33px");
              $(".legend_angel").css("color","#F19D38");
              $(".legend_angel").css("margin-left","77px");
              break;
          case "4":
              $(".legend_title").html("中度污染");
              $(".legend_title").css("background-color","#EA3522");
              $(".legend_title").css("margin-left","53px");
              $(".legend_angel").css("color","#EA3522");
              $(".legend_angel").css("margin-left","97px");
              break;
          case "5":
              $(".legend_title").html("重度污染");
              $(".legend_title").css("background-color","#8B2293");
              $(".legend_title").css("margin-left","70px");
              $(".legend_angel").css("color","#8B2293");
              $(".legend_angel").css("margin-left","117px");
              break;
          case "6":
              $(".legend_title").html("严重污染");
              $(".legend_title").css("background-color","#8E1C10");
              $(".legend_title").css("margin-left","92px");
              $(".legend_angel").css("color","#8E1C10");
              $(".legend_angel").css("margin-left","137px");
              break;
      } 
      $(".legend_title").toggle(true);
      $(".legend_angel").toggle(true);
    },
    legend_close:function(){
      $(".legend_title").toggle(false);
      $(".legend_angel").toggle(false);
    }
    
  }
};
</script>

<style lang="less" scoped>
.map_legend{
  width: 120px;
  height: 30px;
}
.legend_title{
    width: 100px;
    height: 32px;
    text-align: center;
    color: #FFFFFF;
    border-radius: 4px;
    font-size: 16px;
    line-height: 32px;
    display:none;
    z-index: 99999;
}
.legend_angel{
  width:12px;
  height:6px;
  margin-top:-7px;
  display:none;
  z-index: 99999;
}
.legend_title_div{
  position: absolute;
  top:-30px;
  left: -30px;
}
</style>