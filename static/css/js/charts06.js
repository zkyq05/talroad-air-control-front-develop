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
    },
    show:false
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
    data: ['2019/01', '2019/02', '2019/03', '2019/04', '2019/05', '2019/06', '2019/07'],
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
      data: [ 301, 334,320, 302, 301, 334, 390],
      label:{
        show: false, 
        position: "insideTop",
        formatter: '{c}',
      },
      barMaxWidth: 45,
      itemStyle: {
        normal: {
          // 定制显示（按顺序）
          color: function(params) { 
              var colorList = ['#46C96F','#F8C900','#F19D38','#EA3522','#8B2293','#8E1C10','#46C96F','#F8C900','#F19D38','#EA3522','#8B2293','#8E1C10']; 
              return colorList[params.dataIndex] 
          }
        },
      },
    }
  ],
};
chart01.setOption(option);

var chart02 = echarts.init(document.getElementById('chart02'),'skinUpp');
var option = {
  // 标题
  title: {
        "x": '35%',
        "y": '45%',
        textAlign: "center",
        top: 200,//字体的位置
        'text': 'AQI',
        'subtext': '轻度污染',
        "textStyle": {
          "fontWeight": 'normal',
          "color": '#93AECE',
          "fontSize": 16
        },
        "subtextStyle": {//副标题的文字的样式
          //"fontWeight": 'bold',
          "fontSize": 14,
          "color": '#F19D38'
        },
    },
  //图例
  legend: {
    data: ['轻度污染', ''],
    orient: 'vertical',
    top: 'center',
    right: '5%',
    show:false
  },
  //提示框
  tooltip: {
    trigger: 'item',
  },
  // 数据
  series: [{
    type:'pie',
    radius: ['60%', '70%'],
    center: ['35%', '60%'],
    hoverOffset: 0,//划入不放大
    startAngle: 235,
    avoidLabelOverlap: true,//允许标签重叠
    data:[
      {
        value:335, 
        name:'轻度污染',
        label : {
          position : 'center',
          fontSize: 42,
          formatter: '{c}', //{a}：系列名。{b}：数据名。{ c}：数据值。{d}：百分比。
          color: '#fff',
        },
        itemStyle : {
          borderWidth: 25,
            normal: {
                barBorderRadius: 10
            },
            emphasis: {
                barBorderRadius: 10
            }
        },
      },
      {
        value:110, 
        name:'',
        label : {
          position : 'center',
          fontSize: 14,
          //formatter: '\n已完成', //{a}：系列名。{b}：数据名。{c}：数据值。{d}：百分比。
          color: '#040404',
          show:false
        },
        itemStyle : {
          color: '#f5f5f5',
          borderWidth: 25
        },
        emphasis:{
          itemStyle: {
            color: '#f5f5f5',
          },
        },
        //提示框
        tooltip: {
          show: false,
        },
      },
      {
        name: 'gap',
        value: 110,//总的-当前值
        itemStyle: {
          normal: {
            label: {
                show: false
            },
            labelLine: {
                show: false
            },
            color: 'rgba(0, 0, 0, 0)',
            borderColor: 'rgba(0, 0, 0, 0)',
            borderWidth: 0,
          }
        },
      },
      // {
      //   value:445, 
      //   name:'',
      //   itemStyle : {
      //     color: 'rgba(0,0,0,0)',
      //   },
      //   emphasis:{
      //     itemStyle: {
      //       color: 'rgba(0,0,0,0)',
      //     }
      //   },
      //   //提示框
      //   tooltip: {
      //     show: false,
      //   },
      // },
    ],
  }]
};
chart02.setOption(option);
$(window).on('resize',function(){
  chart01.resize();
})