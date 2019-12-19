const echarts = require('echarts');
const axios = require('axios');
export default function alarmDataPin(self) {
    var pollutantDate =[];
    var params = new URLSearchParams();
    if(self.dateTime==null){
        params.append("beginTime","");
        params.append("endTime", "");
    }else{
        params.append("beginTime",self.dateTime[0]);
        params.append("endTime", self.dateTime[1]);
    }
    params.append("region", self.station);
    axios.post('/aircontrol/airassess/codReport/getAlarmDataPin',
        params
    ).then(function (res) {
        if (res.code == 0){
            var chartDate = res.data;
            if (chartDate){
                initChartQsjk(chartDate,pollutantDate,self);
            }
        }
    }).catch(function (err) {
        console.log(err);
    });
}

const initChartQsjk = function(chartDate,pollutantDate,self) {
         let pieSource =chartDate,
        legendColor = ['#73D13D','#FF733F','#EC4863','#69C0FF'
            ,'#ffb0a4','#c2d0ff'],
        richStyle = {};
    function initData(source) {
        legendColor.map((item, index) => {
            richStyle['style' + index] = {};
            richStyle['style' + index]['color'] = item;
            richStyle['style' + index]['align'] = 'right';
        });
        if (Object.prototype.toString.call(source) === '[object Object]') {
            const arr = [];
            const legendData = [];
            Object.entries(source).forEach((value) => {
                legendData.push(value[0]);
                let obj = {};
                obj.name = value[0];
                obj.value = value[1];
                arr.push(obj);
            });
            source = arr;
            return {
                source,
                legendData
            };
        } else if (source && Object.prototype.toString.call(source) === '[object Array]') {
            let legendData = [];
            source.forEach((item, index) => {
                legendData.push(item.name);
            });
            return {
                source,
                legendData
            };
        }
    }
    let source = initData(pieSource);
    // 实时监测-趋势监测
    var chartQsjc = echarts.init(document.getElementById('alarm-dataPin'),'skinUpp');
    var option = {
        // backgroundColor: '#131535',
        // title:{
        //     top:"5%",
        //     left: '8%',
        //     text: "各报警类型统计("+self.year+"全年)",
        //
        // },
        tooltip: {
            trigger: 'item',
            textStyle: {
                color: '#fff',
                // fontSize:28
            },
            formatter: "{b} : {c} ({d}%)"
        },
        color: legendColor,
        legend: [{
            orient: 'vertical',
            left: 300,
            y: 'center',
            icon: 'rect',
            textStyle: {
                color: '#4c5efd',
                fontSize: 14,
                rich: richStyle,
                width: 150,
                height: 20,

            },
            padding: [30, 0, 30, 0],
            itemWidth: 10,
            itemHeight: 5,
            itemGap: 20,
            data: source.legendData.slice(0),
            formatter: function(name) {
                let oa = option.series[0].data;
                let total = 0;
                oa.forEach((item, index) => {
                    total += item.value;
                });
                for (let i = 0; i < oa.length; i++) {
                    if (name == oa[i].name) {
                        return name + '{style' + i + '|' + (oa[i].value / total * 100).toFixed(2) + '%}';
                    }
                }
            },
        },

        ],
        series: [{
            type: 'pie',
            radius: ['10%', '55%'],
            center: ['25%', '50%'],
            data: source.source,
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    shadowColor: '#438bff',
                    shadowBlur: 20
                },
            }
        }]
    };
    chartQsjc.setOption(option);
}

