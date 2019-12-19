// 折线图
var chart01 = echarts.init(document.getElementById('chart01'),'skinUpp');
var option = {
  //图例
  legend: {
    data: ['目标', '实际达成'],
  }, 
  //提示框
  tooltip : {
    trigger: 'axis',
  },
  grid : {
    right:18
  },
  // x轴
  xAxis: {
    type: 'category',
    data: ['07/01', '07/02', '07/03', '07/04', '07/05', '07/06', '07/07'],
    axisLabel: {  
      interval: 0
    },
    splitLine:{
      show:false
    },
    boundaryGap:false,
  },
  // y轴
  yAxis: {
    type: 'value',
    axisLabel: {  
      interval: 0
    } 
  },
  // 数据
  series : [
    {
      name: '目标',
      type: 'line',
      data: [20, 112, 30, 33, 139, 83, 62,139],
      smooth: false,
      symbolSize:0,
      areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(58,187,252,.5)'
            },  {
                offset: 0.6,
                color: 'rgba(255,255,255,0.00)'
            },{
                offset: 1,
                color: 'rgba(255,255,255,0.00)'
            }], false),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10
          }
      },
    },
    {
      name: '实际达成',
      type: 'line',
      data: [35, 121, 89, 45, 99, 153, 41,109],
      smooth: false,
      symbolSize:0,
      areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(25,255,199,.5)'
            }, {
                offset: 0.6,
                color: 'rgba(255,255,255,0.00)'
            }, {
                offset: 1,
                color: 'rgba(255,255,255,0.00)'
            }], false),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10
          }
      },
    }
  ],
};
chart01.setOption(option);

$(window).on('resize',function(){
  chart01.resize();
})

