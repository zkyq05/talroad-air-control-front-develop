// 折线图
var chart01 = echarts.init(document.getElementById('chart01'),'skinUpp');
var option = {
  //图例
  legend: {
    data: ['目标', '实际达成'],
    show:false
  }, 
  //提示框
  tooltip : {
    trigger: 'axis',
  },
  // x轴
  xAxis: {
    type: 'category',
    data: ['1', '2', '3', '4', '5', '6', '7'],
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

var chart02 = echarts.init(document.getElementById('chart02'),'skinUpp');
var option = {
  color:[
    "#87C2FA",
  ],
  //提示框
  tooltip : {
    trigger: 'axis',
  },
  // grid: {
  //   "left": 20,
  //   "right": 20,
  //   "bottom": 0,
  //   "top": 10,
  //   "containLabel": true,
  // },
  xAxis: {
    type: 'category',
    data: ['PM2.5', 'PM10', 'SO2', 'NO2', 'CO', 'O3', 'NO2', 'CO', 'CO'],
    splitLine:{
      show:false
    }
  },
  yAxis: {
    type: 'value',
    axisTick: false,
  },
  series: [{
    data: [120, 200, 150, 80 ,200 , 200, 150, 80 ,150],
    type: 'bar',
    barMaxWidth: 15,
    itemStyle: {
      normal: {
        // 定制显示（按顺序）
        color: function(params) { 
            //var colorList = ['#40E9BD','#FE3131','#FFD600','#4FCCFF','#FFC760','#B5E344','#FFC760','#FFC760','#B5E344','#4FCCFF']; 
            var colorList=[{
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
            offset: 0, color: '#40E9BD' // 0% 处的颜色
        },{
            offset: 1, color: '#5FFFD9' // 100% 处的颜色
        }],
        globalCoord: false // 缺省为 false
      },{
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
            offset: 0, color: '#FE3131' // 0% 处的颜色
        },{
            offset: 1, color: '#FE5F31' // 100% 处的颜色
        }],
        globalCoord: false // 缺省为 false
      },{
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
            offset: 0, color: '#FFD600' // 0% 处的颜色
        },{
            offset: 1, color: '#FFAC00' // 100% 处的颜色
        }],
        globalCoord: false // 缺省为 false
      },{
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
            offset: 0, color: '#40E9BD' // 0% 处的颜色
        },{
            offset: 1, color: '#5FFFD9' // 100% 处的颜色
        }],
        globalCoord: false // 缺省为 false
      },{
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
            offset: 0, color: '#FE3131' // 0% 处的颜色
        },{
            offset: 1, color: '#FE5F31' // 100% 处的颜色
        }],
        globalCoord: false // 缺省为 false
      },{
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
            offset: 0, color: '#FFD600' // 0% 处的颜色
        },{
            offset: 1, color: '#FFAC00' // 100% 处的颜色
        }],
        globalCoord: false // 缺省为 false
      },{
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
            offset: 0, color: '#40E9BD' // 0% 处的颜色
        },{
            offset: 1, color: '#5FFFD9' // 100% 处的颜色
        }],
        globalCoord: false // 缺省为 false
      },{
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
            offset: 0, color: '#FE3131' // 0% 处的颜色
        },{
            offset: 1, color: '#FE5F31' // 100% 处的颜色
        }],
        globalCoord: false // 缺省为 false
      },{
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
            offset: 0, color: '#FFD600' // 0% 处的颜色
        },{
            offset: 1, color: '#FFAC00' // 100% 处的颜色
        }],
        globalCoord: false // 缺省为 false
      },]
        return colorList[params.dataIndex] 
        }
      },
    },
  }]
};
chart02.setOption(option);

var chart03 = echarts.init(document.getElementById('chart03'),'skinUpp');
var option = {
  color:[
    "#87C2FA",
  ],
  //提示框
  tooltip : {
    trigger: 'axis',
  },
  // grid: {
  //   "left": 20,
  //   "right": 20,
  //   "bottom": 0,
  //   "top": 10,
  //   "containLabel": true,
  // },
  xAxis: {
    type: 'category',
    axisLabel: {  
      interval:0,  
      rotate:40
    },
    data: ['PM2.5', 'PM10', 'SO2', 'NO2', 'CO', 'O3', 'NO2', 'CO', 'CO'],
    splitLine:{
      show:false
    }
  },
  yAxis: {
    type: 'value',
    axisTick: false,
  },
  series: [{
    data: [120, 200, 150, 80 ,200 , 200, 150, 80 ,150],
    type: 'bar',
    barMaxWidth: 15,
    itemStyle:{
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
            offset: 0, color: '#63B3FD' // 0% 处的颜色
        },{
            offset: 1, color: '#4044BF' // 100% 处的颜色
        }],
        globalCoord: false // 缺省为 false
      },
    }

  }]
};
chart03.setOption(option);

var chart04 = echarts.init(document.getElementById('chart04'),'skinUpp');
var option = {
  color:[
    "#19FFC7",
    "#2153FC",
    "#975FE3",
    "#1FB3FF",
    "#FE3131",
    "#FAD337",
  ],
  //浮层
  tooltip: {
    trigger: 'item',
    confine:true,
    //formatter: "{a} <br/>{b}: {c} ({d}%)" //{a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
  },
  //图例
  legend: {
    data:[
      {
        name: '突然高',
      },
      {
        name: '超过国控站点',
      },
      {
        name: '超过国控站点2',
      },
      {
        name: '超过国控站点3',
      },
      {
        name: '超过国控站点4',
      },
      {
        name: '超过国控站点5',
      }
    ],
    formatter: function(name) {
        var data = option.series[0].data;
        var total = 0;
        var tarValue;
        for (var i = 0, l = data.length; i < l; i++) {
            total += data[i].value;
            if (data[i].name == name) {
                tarValue = data[i].value;
            }
        }
        var p = (tarValue / total * 100).toFixed(2);
        //return '' + p + '%' + '\n' + name;        
        return '{a|' + name + ' }' + '{b|' + p + '%}';
    },
    textStyle: {
      color:'#93AECE',
      fontSize:14,
      rich: {
        a:{
            lineHeight: 20,
            fontSize: 14,
            verticalAlign:'top'
        },
        b:{
            lineHeight: 20,
            fontSize: 14,
            verticalAlign:'top'
        },
      }
    },
    orient: 'vertical',
    top: 'center',
    right: '5px',
    left:"auto",
    itemGap: 15, 
    itemWidth: 10,
    itemHeight: 10,
  },
  series : [
    {
      name: '各报警类型统计',
      type: 'pie',
      radius: ['20%', '50%'],
      center: ['30%', '50%'],
      //roseType : 'radius',
      //文字标签
      label: {
        show: false,
        position: 'inside',//标签的位置。默认outside，可选inside，center
        formatter:'{c}', //{a}：系列名。{b}：数据名。{c}：数据值。{d}：百分比。
        color:'#fff', //颜色
      },
      data:[
        {
          value:375, 
          name:'突然高'
        },
        {
          value:310, 
          name:'超过国控站点'
        },
        {
          value:368, 
          name:'超过国控站点2'
        },
        {
          value:310, 
          name:'超过国控站点3'
        },
        {
          value:110, 
          name:'超过国控站点4'
        },
        {
          value:220, 
          name:'超过国控站点5'
        }
      ],
      startAngle: 0,//起始角度
    }
  ]
};
chart04.setOption(option);

$(window).on('resize',function(){
  chart01.resize();
  chart02.resize();
  chart03.resize();
  chart04.resize();
})

