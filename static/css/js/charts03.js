// 折线图
var chart01 = echarts.init(document.getElementById('chart01'),'skinUpp');
var option = {
  //color:["#4FCCFF","#FE6B6A"],
  //图例
  legend: {
    data: ['PM10', 'PM2.5','CO','O3','SO2','NO2'],
    top: 0,
    bottom: '0',
    itemGap: 20, 
    itemWidth: 10,
    itemHeight: 10,
    padding: [0, 0, 0, 10],
    //icon:'rect',
    textStyle:{
      fontSize:12,
    }
  },
  // grid: {
  //   "left": 0,
  //   "right": 0,
  //   "bottom": 20,
  //   "top": 10,
  //   "containLabel": true,
  // },
  //提示框
  tooltip : {
    trigger: 'axis',
    confine:true,
    borderColor:'#3779B2',
    backgroundColor:'#030E1E',
  },
  // x轴
  xAxis: {
    type: 'category',
    data: ['2019/01', '2019/02', '2019/03', '2019/04', '2019/05', '2019/06', '2019/07', '2019/08', '2019/09', '2019/10', '2019/11', '2019/12'],
    splitLine:{
      show:false
    },
    axisLabel: {  
      interval: 0,  
      textStyle:{
        fontSize:14
      }
    }  
  },
  // y轴
  yAxis: {
    type: 'value',
    axisLabel: {  
      interval: 0,  
      textStyle:{
        fontSize:14
      }
    } 
  },
  // 数据
  series : [
    {
      name: 'PM10',
      type: 'bar',
      stack: '总量',
      data: [ 301, 334,320, 302, 301, 334, 390, 330, 320, 301, 334, 390],
      label:{
        show: false, 
        position: "insideTop",
        formatter: '{c}',
      },
      barMaxWidth: 45,
    },
    {
      name: 'PM2.5',
      type: 'bar',
      stack: '总量',
      data: [288, 212, 390, 454, 290, 330, 110, 301, 334, 390, 330, 320],
      label:{
        show: false, 
        position: "insideTop",
        formatter: '{c}',
      },
      barMaxWidth: 45,
    },
    {
      name: 'CO',
      type: 'bar',
      stack: '总量',
      data: [350, 212, 390, 454, 490, 301, 334, 390, 330, 320,530, 210],
      label:{
        show: false, 
        position: "insideTop",
        formatter: '{c}',
      },
      barMaxWidth: 45,
    },
    {
      name: 'O3',
      type: 'bar',
      stack: '总量',
      data: [301, 334, 390, 330, 320,350, 212, 291, 454, 290, 330, 410],
      label:{
        show: false, 
        position: "insideTop",
        formatter: '{c}',
      },
      barMaxWidth: 45,
    },
    {
      name: 'SO2',
      type: 'bar',
      stack: '总量',
      data: [301, 334, 390, 330, 320,350, 212, 291, 454, 290, 330, 210],
      label:{
        show: false, 
        position: "insideTop",
        formatter: '{c}',
      },
      barMaxWidth: 45,
    },
    {
      name: 'NO2',
      type: 'bar',
      stack: '总量',
      data: [288,301, 334, 390, 330, 320, 212, 291, 154, 290, 130, 310],
      label:{
        show: false, 
        position: "insideTop",
        formatter: '{c}',
      },
      barMaxWidth: 45,
    },
  ],
};
chart01.setOption(option);

var chart02 = echarts.init(document.getElementById('chart02'),'skinUpp');
var option = {
  //color:["#4FCCFF","#FE6B6A"],
  //图例
  legend: {
    data: ['PM10', 'PM2.5','CO','O3','SO2','NO2'],
    top: 0,
    bottom: '0',
    itemGap: 20, 
    itemWidth: 10,
    itemHeight: 10,
    padding: [0, 0, 0, 10],
    //icon:'rect',
    textStyle:{
      fontSize:12,
    }
  },
  // grid: {
  //   "left": 0,
  //   "right": 0,
  //   "bottom": 20,
  //   "top": 10,
  //   "containLabel": true,
  // },
  //提示框
  tooltip : {
    trigger: 'axis',
    confine:true,
    borderColor:'#3779B2',
    backgroundColor:'#030E1E',
  },
  // x轴
  xAxis: {
    type: 'category',
    data: ['2019/01', '2019/02', '2019/03', '2019/04', '2019/05', '2019/06', '2019/07', '2019/08', '2019/09', '2019/10', '2019/11', '2019/12'],
    splitLine:{
      show:false
    },
    axisLabel: {  
      interval: 0,  
      textStyle:{
        fontSize:14
      }
    }  
  },
  // y轴
  yAxis: {
    type: 'value',
    axisLabel: {  
      interval: 0,  
      textStyle:{
        fontSize:14
      }
    } 
  },
  // 数据
  series : [
    {
      name: 'PM10',
      type: 'bar',
      stack: '总量',
      data: [ 301, 334,320, 302, 301, 334, 390, 330, 320, 301, 334, 390],
      label:{
        show: false, 
        position: "insideTop",
        formatter: '{c}',
      },
      barMaxWidth: 45,
    },
    {
      name: 'PM2.5',
      type: 'bar',
      stack: '总量',
      data: [288, 212, 390, 454, 290, 330, 110, 301, 334, 390, 330, 320],
      label:{
        show: false, 
        position: "insideTop",
        formatter: '{c}',
      },
      barMaxWidth: 45,
    },
    {
      name: 'CO',
      type: 'bar',
      stack: '总量',
      data: [350, 212, 390, 454, 490, 301, 334, 390, 330, 320,530, 210],
      label:{
        show: false, 
        position: "insideTop",
        formatter: '{c}',
      },
      barMaxWidth: 45,
    },
    {
      name: 'O3',
      type: 'bar',
      stack: '总量',
      data: [301, 334, 390, 330, 320,350, 212, 291, 454, 290, 330, 410],
      label:{
        show: false, 
        position: "insideTop",
        formatter: '{c}',
      },
      barMaxWidth: 45,
    },
    {
      name: 'SO2',
      type: 'bar',
      stack: '总量',
      data: [301, 334, 390, 330, 320,350, 212, 291, 454, 290, 330, 210],
      label:{
        show: false, 
        position: "insideTop",
        formatter: '{c}',
      },
      barMaxWidth: 45,
    },
    {
      name: 'NO2',
      type: 'bar',
      stack: '总量',
      data: [288,301, 334, 390, 330, 320, 212, 291, 154, 290, 130, 310],
      label:{
        show: false, 
        position: "insideTop",
        formatter: '{c}',
      },
      barMaxWidth: 45,
    },
  ],
};
chart02.setOption(option);

$(window).on('resize',function(){
  chart01.resize();
  chart02.resize();
})