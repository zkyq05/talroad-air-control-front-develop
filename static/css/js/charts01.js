// 折线图
var chart01 = echarts.init(document.getElementById('chart01'),'skinUpp');
var option = {
  // 标题
  title: { 
    text: '今日趋势',
    show:false
  },
  //图例
  legend: {
    data: ['目标', '实际达成'],
  },
  //提示框
  tooltip : {
    trigger: 'axis',
  },
  // x轴
  xAxis: {
    type: 'category',
    data: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
    boundaryGap:false,
  },
  // y轴
  yAxis: {
    type: 'value'
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
                color: 'rgba(64,65,233,1)'
            }, {
                offset: 1,
                color: 'rgba(94,188,214,0.1)'
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
                color: 'rgba(46,249,255,1)'
            }, {
                offset: 1,
                color: 'rgba(94,188,214,0.1)'
            }], false),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10
          }
      },
    }
  ],
};
chart01.setOption(option);

var chart02 = echarts.init(document.getElementById('chart02'),'skinUpp');
var option = {
  // 标题
  title: { 
    text: '今日趋势',
    show:false
  },
  //图例
  legend: {
    data: ['目标', '实际达成'],
  },
  //提示框
  tooltip : {
    trigger: 'axis',
  },
  // x轴
  xAxis: {
    type: 'category',
    data: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
    boundaryGap:false,
  },
  // y轴
  yAxis: {
    type: 'value'
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
                color: 'rgba(64,65,233,1)'
            }, {
                offset: 1,
                color: 'rgba(94,188,214,0.1)'
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
                color: 'rgba(46,249,255,1)'
            }, {
                offset: 1,
                color: 'rgba(94,188,214,0.1)'
            }], false),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10
          }
      },
    }
  ],
};
chart02.setOption(option);

var chart03 = echarts.init(document.getElementById('chart03'),'skinUpp');
var option = {
  // 标题
  title: { 
    text: '今日趋势',
    show:false
  },
  //图例
  legend: {
    data: ['目标', '实际达成'],
  },
  //提示框
  tooltip : {
    trigger: 'axis',
  },
  // x轴
  xAxis: {
    type: 'category',
    data: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
    boundaryGap:false,
  },
  // y轴
  yAxis: {
    type: 'value'
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
                color: 'rgba(64,65,233,1)'
            }, {
                offset: 1,
                color: 'rgba(94,188,214,0.1)'
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
                color: 'rgba(46,249,255,1)'
            }, {
                offset: 1,
                color: 'rgba(94,188,214,0.1)'
            }], false),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10
          }
      },
    }
  ],
};
chart03.setOption(option);

$(window).on('resize',function(){
  chart01.resize();
  chart02.resize();
  chart03.resize();
})
