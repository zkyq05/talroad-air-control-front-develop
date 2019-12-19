import { loadModules } from 'esri-loader'
import {dataRequestUrl, mapExtent} from '../mapjs/AppConfig'
// 名称渲染样式
import canyin1 from '../images/PollutionSource_icon/canyin1.svg'
import canyin2 from '../images/PollutionSource_icon/canyin2.svg'
import canyin3 from '../images/PollutionSource_icon/canyin3.svg'
import gangtie1 from '../images/PollutionSource_icon/gangtie1.svg'
import gangtie2 from '../images/PollutionSource_icon/gangtie2.svg'
import gangtie3 from '../images/PollutionSource_icon/gangtie3.svg'
import meitan1 from '../images/PollutionSource_icon/meitan1.svg'
import meitan2 from '../images/PollutionSource_icon/meitan2.svg'
import meitan3 from '../images/PollutionSource_icon/meitan3.svg'
import zhuzao1 from '../images/PollutionSource_icon/zhuzao1.svg'
import zhuzao2 from '../images/PollutionSource_icon/zhuzao2.svg'
import zhuzao3 from '../images/PollutionSource_icon/zhuzao3.svg'
import gongdi1 from '../images/PollutionSource_icon/gongdi1.svg'
import gongdi2 from '../images/PollutionSource_icon/gongdi2.svg'
import gongdi3 from '../images/PollutionSource_icon/gongdi3.svg'
import wry from '../images/污染源.svg'
/**
 * 绘制各种类型的污染源站点数据
 */
export const createPollutionGraphics = function (graphicResults, callBack, pollutiontype,pullution_selectstatue,curRenderType) {
  loadModules(['esri/layers/FeatureLayer', 'esri/layers/support/Field', 'esri/geometry/SpatialReference', 'esri/Graphic', 'esri/layers/support/LabelClass', 'esri/geometry/Extent'])
    .then(([FeatureLayer,  Field, SpatialReference, Graphic, LabelClass, Extent]) => {
      
      // graphicResults=linshidata;
      let queryFields = dataRequestUrl.options.entStationListInfo.queryFields;
      let oidFieldName = queryFields[0].name;
      let renderInfo = dataRequestUrl.options.entStationListInfo.renderInfo_source;

      let canyinUrlList = [canyin1, canyin2, canyin3]
      let gangtieUrlList = [gangtie1, gangtie2, gangtie3]
      let gongdiUrlList = [gongdi1, gongdi2, gongdi3]
      let meitanUrlList = [meitan1, meitan2, meitan3]
      let zhuzaoUrlList = [zhuzao1, zhuzao2, zhuzao3]

      let canyinValueList = ['canyin1', 'canyin2', 'canyin3']
      let gangtieValueList = ['gangtie1', 'gangtie2', 'gangtie3']
      let gongdiValueList = ['gongdi1', 'gongdi2', 'gongdi3']
      let meitanValueList = ['meitan1', 'meitan2', 'meitan3']
      let zhuzaoValueList = ['zhuzao1', 'zhuzao2', 'zhuzao3']

      let picWidth = '24px'
      let picHeight = '24px'

      let uniqueValueInfos2 = [] 
      let urlList2 = [canyinUrlList,gangtieUrlList,gongdiUrlList,meitanUrlList,zhuzaoUrlList]
      let valueList2 = [canyinValueList,gangtieValueList,gongdiValueList,meitanValueList,zhuzaoValueList]

      let typekind=pollutiontype;
      let type_rule=[];
      for( let i=0;i<typekind.length;i++){
        type_rule[i]=new Object;
        switch (typekind[i].text){
          case "钢铁":
              type_rule[i].id=typekind[i].value;
              type_rule[i].sym="gangtie";
          break;
          case "煤炭":
              type_rule[i].id=typekind[i].value;
              type_rule[i].sym="meitan";
          break;
          case "工地":
              type_rule[i].id=typekind[i].value;
              type_rule[i].sym="gongdi";
          break;
          case "餐饮":
              type_rule[i].id=typekind[i].value;
              type_rule[i].sym="canyin";
          break;
          case "铸造":
              type_rule[i].id=typekind[i].value;
              type_rule[i].sym="zhuzao";
          break;
        }
      }
      // let renderField=pullution_selectstatue;
      let renderField='all';
      let valueExpression2 ="";
      if(renderField === 'all'){
        valueExpression2 ="When("
        for(let j=0;j<type_rule.length;j++){
        //离线
          valueExpression2 = valueExpression2 + "($feature.alarmStatus == 2 || $feature.isover ==null)&&" + "$feature.entType =='" +type_rule[j].id + "','" + type_rule[j].sym+"3',";
        //达标
         valueExpression2 = valueExpression2 + "$feature.alarmStatus !=2 && $feature.isover == 0" + "&& $feature.entType =='" +type_rule[j].id + "','" + type_rule[j].sym+"2',";
        //超标
        valueExpression2 = valueExpression2 + "$feature.alarmStatus !=2 && $feature.isover == 1" + "&& $feature.entType =='" +type_rule[j].id + "','" + type_rule[j].sym+"1',";
        };
        valueExpression2 = valueExpression2 +"'other')";
      }else if(renderField === 'qualification'){
        valueExpression2 ="When("
        for(let j=0;j<type_rule.length;j++){
          //达标
          valueExpression2 = valueExpression2 + "$feature.alarmStatus !=2 && $feature.isover == 0" + "&& $feature.entType =='" +type_rule[j].id + "','" + type_rule[j].sym+"2',";
          };
          valueExpression2 = valueExpression2 +"'other')";
      }else if(renderField === 'Excess'){
        valueExpression2 ="When("
        for(let j=0;j<type_rule.length;j++){
          //超标
          valueExpression2 = valueExpression2 + "$feature.alarmStatus !=2 && $feature.isover == 1" + "&& $feature.entType =='" +type_rule[j].id + "','" + type_rule[j].sym+"1',";
          };
          valueExpression2 = valueExpression2 +"'other')";
      }else if(renderField === 'Offline'){
        valueExpression2 ="When("
        for(let j=0;j<type_rule.length;j++){
          //离线
            valueExpression2 = valueExpression2 + "($feature.alarmStatus ==2 || $feature.isover ==null)&&" + "$feature.entType =='" +type_rule[j].id + "','" + type_rule[j].sym+"3',";
          };
          valueExpression2 = valueExpression2 +"'other')";
      }
      //种类站点选择
      for(let i=0;i<urlList2.length;i++){
        for(let j=0;j<urlList2[i].length;j++){
          let uniqueValueInfo = {
            value: valueList2[i][j],
            symbol: {
              type: renderInfo.defaultSymbol.type,
              url: urlList2[i][j],
              width: picWidth,
              height: picHeight
              // xoffset: renderInfo.defaultSymbol.xoffset
            }
          }
          uniqueValueInfos2.push(uniqueValueInfo)
        }
      }
      let feaRenderer = {
        type: renderInfo.type, // autocasts as new UniqueValueRenderer()
        // valueExpression: valueExpression2,
        valueExpression: valueExpression2,
        uniqueValueInfos: uniqueValueInfos2
      }
      
      
      // 站点名称标注 黑色
      let nameArcade = '$feature.stationName' || ''
      let nameClass = new LabelClass({
        labelExpressionInfo: {
          expression: nameArcade
        },
        symbol: {
          type: 'text', // autocasts as new TextSymbol()
          color: 'white',
          font: {
            size: 9,
            weight: 'bold'
          },
          // xoffset: -50, // 需要设置xoffset 让文字左侧和上面的背景图对齐
          yoffset: 0
        },
        labelPlacement: 'below-center'
      })
      // 构建图层数据
      // 此处需要注意，query返回的geometry没有type信息，所以需要重新构建graphic，否则会报错

      let graphics = []
      for (let m = 0; m < graphicResults.length; m++) {
        let stationItem = graphicResults[m]
        if (stationItem.longitude != null && stationItem.latitude != null) {
          let pointGeometry = {
            type: 'point',
            x: stationItem.longitude,
            y: stationItem.latitude
          }
          stationItem.OBJECTID = m + 1

          let graphic = new Graphic({
            geometry: pointGeometry,
            attributes: stationItem
          })
          graphics.push(graphic)
        }
      }

      if(graphics && graphics.length>0){
        // 构建图层的字段信息
        let fieldInfos = getFieldsInfo(queryFields)
        // 排序获取数据的范围
        let geometryExtent = calculateMapInitExtent(graphicResults)
        // 实例化一个弹出框
        let popupTemplate = {
          // title:"站点{"+oidFieldName+"}",
          title: '',
          fieldInfos: fieldInfos
          // content:setPopContentInfo
        }
        let labelingInfo = [];
        if(curRenderType==1){
          labelingInfo.push(nameClass);
        }else{
          labelingInfo=[];
        }
        
        

        let wryPointFeaLayer = new FeatureLayer({
          fields: queryFields.map(function (field) {
            return Field.fromJSON(field)
          }),
          // opacity:"0.8",
          id: 'pollutionPointFeaLayer',
          objectIdField: oidFieldName,
          geometryType: 'point',
          spatialReference: new SpatialReference(4326),
          source: graphics,
          popupEnabled:false,
          labelingInfo: labelingInfo,
          elevationInfo: {
            mode: 'on-the-ground'
          },
          renderer: feaRenderer
        })
        // 不使用默认的图层的popup模板
        wryPointFeaLayer.popupTemplate = popupTemplate
        // 加载script为异步方法
        callBack(wryPointFeaLayer, geometryExtent)
      }
      else{
        callBack(null, null)
      }

    }).catch(function (error) {
      callBack(null, null)
      // console.log(error)
    })
}

export const createPollutionGraphics_his = function (graphicResults, callBack, pollutiontype,pullution_selectstatue,curRenderType) {
  loadModules(['esri/layers/FeatureLayer', 'esri/layers/support/Field', 'esri/geometry/SpatialReference', 'esri/Graphic', 'esri/layers/support/LabelClass', 'esri/geometry/Extent'])
    .then(([FeatureLayer,  Field, SpatialReference, Graphic, LabelClass, Extent]) => {
      
      // graphicResults=linshidata;
      let queryFields = dataRequestUrl.options.entStationListInfo.queryFields;
      let oidFieldName = queryFields[0].name;
      let renderInfo = dataRequestUrl.options.entStationListInfo.renderInfo_source;

      let canyinUrlList = [canyin1, canyin2, canyin3]
      let gangtieUrlList = [gangtie1, gangtie2, gangtie3]
      let gongdiUrlList = [gongdi1, gongdi2, gongdi3]
      let meitanUrlList = [meitan1, meitan2, meitan3]
      let zhuzaoUrlList = [zhuzao1, zhuzao2, zhuzao3]

      let canyinValueList = ['canyin1', 'canyin2', 'canyin3']
      let gangtieValueList = ['gangtie1', 'gangtie2', 'gangtie3']
      let gongdiValueList = ['gongdi1', 'gongdi2', 'gongdi3']
      let meitanValueList = ['meitan1', 'meitan2', 'meitan3']
      let zhuzaoValueList = ['zhuzao1', 'zhuzao2', 'zhuzao3']

      let picWidth = '24px'
      let picHeight = '24px'

      let uniqueValueInfos2 = [] 
      let urlList2 = [canyinUrlList,gangtieUrlList,gongdiUrlList,meitanUrlList,zhuzaoUrlList]
      let valueList2 = [canyinValueList,gangtieValueList,gongdiValueList,meitanValueList,zhuzaoValueList]

      let typekind=pollutiontype;
      let type_rule=[];
      for( let i=0;i<typekind.length;i++){
        type_rule[i]=new Object;
        switch (typekind[i].text){
          case "钢铁":
              type_rule[i].id=typekind[i].value;
              type_rule[i].sym="gangtie";
          break;
          case "煤炭":
              type_rule[i].id=typekind[i].value;
              type_rule[i].sym="meitan";
          break;
          case "工地":
              type_rule[i].id=typekind[i].value;
              type_rule[i].sym="gongdi";
          break;
          case "餐饮":
              type_rule[i].id=typekind[i].value;
              type_rule[i].sym="canyin";
          break;
          case "铸造":
              type_rule[i].id=typekind[i].value;
              type_rule[i].sym="zhuzao";
          break;
        }
      }
      let renderField=pullution_selectstatue;
      let valueExpression2 ="";
      if(renderField === 'all'){
        valueExpression2 ="When("
        for(let j=0;j<type_rule.length;j++){
        //离线
          valueExpression2 = valueExpression2 + "($feature.alarmStatus == 2 || $feature.isover ==null)&&" + "$feature.entType =='" +type_rule[j].id + "','" + type_rule[j].sym+"3',";
        //达标
         valueExpression2 = valueExpression2 + "$feature.alarmStatus !=2 && $feature.isover == 0" + "&& $feature.entType =='" +type_rule[j].id + "','" + type_rule[j].sym+"2',";
        //超标
        valueExpression2 = valueExpression2 + "$feature.alarmStatus !=2 && $feature.isover == 1" + "&& $feature.entType =='" +type_rule[j].id + "','" + type_rule[j].sym+"1',";
        };
        valueExpression2 = valueExpression2 +"'other')";
      }else if(renderField === 'qualification'){
        valueExpression2 ="When("
        for(let j=0;j<type_rule.length;j++){
          //达标
          valueExpression2 = valueExpression2 + "$feature.alarmStatus !=2 && $feature.isover == 0" + "&& $feature.entType =='" +type_rule[j].id + "','" + type_rule[j].sym+"2',";
          };
          valueExpression2 = valueExpression2 +"'other')";
      }else if(renderField === 'Excess'){
        valueExpression2 ="When("
        for(let j=0;j<type_rule.length;j++){
          //超标
          valueExpression2 = valueExpression2 + "$feature.alarmStatus !=2 && $feature.isover == 1" + "&& $feature.entType =='" +type_rule[j].id + "','" + type_rule[j].sym+"1',";
          };
          valueExpression2 = valueExpression2 +"'other')";
      }else if(renderField === 'Offline'){
        valueExpression2 ="When("
        for(let j=0;j<type_rule.length;j++){
          //离线
            valueExpression2 = valueExpression2 + "($feature.alarmStatus ==2 || $feature.isover ==null)&&" + "$feature.entType =='" +type_rule[j].id + "','" + type_rule[j].sym+"3',";
          };
          valueExpression2 = valueExpression2 +"'other')";
      }
      //种类站点选择
      for(let i=0;i<urlList2.length;i++){
        for(let j=0;j<urlList2[i].length;j++){
          let uniqueValueInfo = {
            value: valueList2[i][j],
            symbol: {
              type: renderInfo.defaultSymbol.type,
              url: urlList2[i][j],
              width: picWidth,
              height: picHeight
              // xoffset: renderInfo.defaultSymbol.xoffset
            }
          }
          uniqueValueInfos2.push(uniqueValueInfo)
        }
      }
      let feaRenderer = {
        type: renderInfo.type, // autocasts as new UniqueValueRenderer()
        // valueExpression: valueExpression2,
        valueExpression: valueExpression2,
        uniqueValueInfos: uniqueValueInfos2
      }
      
      
      // 站点名称标注 黑色
      let nameArcade = '$feature.stationName' || ''
      let nameClass = new LabelClass({
        labelExpressionInfo: {
          expression: nameArcade
        },
        symbol: {
          type: 'text', // autocasts as new TextSymbol()
          color: 'white',
          font: {
            size: 9,
            weight: 'bold'
          },
          // xoffset: -50, // 需要设置xoffset 让文字左侧和上面的背景图对齐
          yoffset: 0
        },
        labelPlacement: 'below-center'
      })
      // 构建图层数据
      // 此处需要注意，query返回的geometry没有type信息，所以需要重新构建graphic，否则会报错

      let graphics = []
      for (let m = 0; m < graphicResults.length; m++) {
        let stationItem = graphicResults[m]
        if (stationItem.longitude != null && stationItem.latitude != null) {
          let pointGeometry = {
            type: 'point',
            x: stationItem.longitude,
            y: stationItem.latitude
          }
          stationItem.OBJECTID = m + 1

          let graphic = new Graphic({
            geometry: pointGeometry,
            attributes: stationItem
          })
          graphics.push(graphic)
        }
      }

      if(graphics && graphics.length>0){
        // 构建图层的字段信息
        let fieldInfos = getFieldsInfo(queryFields)
        // 排序获取数据的范围
        let geometryExtent = calculateMapInitExtent(graphicResults)
        // 实例化一个弹出框
        let popupTemplate = {
          // title:"站点{"+oidFieldName+"}",
          title: '',
          fieldInfos: fieldInfos
          // content:setPopContentInfo
        }
        let labelingInfo = [];
        if(curRenderType==1){
          labelingInfo.push(nameClass);
        }else{
          labelingInfo=[];
        }
        
        

        let wryPointFeaLayer = new FeatureLayer({
          fields: queryFields.map(function (field) {
            return Field.fromJSON(field)
          }),
          // opacity:"0.8",
          id: 'pollutionPointFeaLayer_his',
          objectIdField: oidFieldName,
          geometryType: 'point',
          spatialReference: new SpatialReference(4326),
          source: graphics,
          labelingInfo: labelingInfo,
          elevationInfo: {
            mode: 'on-the-ground'
          },
          renderer: feaRenderer
        })
        // 不使用默认的图层的popup模板
        wryPointFeaLayer.popupTemplate = popupTemplate
        // 加载script为异步方法
        callBack(wryPointFeaLayer, geometryExtent)
      }
      else{
        callBack(null, null)
      }

    }).catch(function (error) {
      callBack(null, null)
      // console.log(error)
    })
}
/*
*构建图层的字段信息
*/
export const getFieldsInfo = function (queryFields) {
  let fieldInfos = []
  for (let fieldIndex in queryFields) {
    let fieldInfo = {
      fieldName: queryFields[fieldIndex].name,
      visible: true,
      label: queryFields[fieldIndex].alias,
      format: {
        places: 0,
        digitSeparator: true
      }}
    fieldInfos.push(fieldInfo)
  }
  return fieldInfos
}


// 需要根据弹窗的内容去定制html
export const setPopContentInfo = function (feature) {
  let aqiValue = feature.graphic.attributes.aqi
  return "<div style='text-align:left'>AQI " + aqiValue + '(2019-03-12 12:09)<br/>' + '实时数据<br/>' + '<p>PM2.5 PM10  SO2  CO</p>' + '24小时数据</div>'
}

function compare (val1, val2) {
  return val1 - val2
};

// 返回地图的初始范围
export const calculateMapInitExtent = function (graphicResults) {
  let xList = []
  let yList = []
  let geometryExtent = null
  for (let m = 0; m < graphicResults.length; m++) {
    let stationItem = graphicResults[m]
    if (stationItem.longitude != null && stationItem.latitude != null) {
      xList.push(stationItem.longitude)
      yList.push(stationItem.latitude)
    }
  }
  if (xList.length > 1) {
    xList.sort(compare)
    yList.sort(compare)
    let extentXmin = xList[0]
    let extentXmax = xList[xList.length - 1]
    let extentYmin = yList[0]
    let extentYmax = yList[yList.length - 1]
    geometryExtent = {
      // autocasts as new Extent()
      xmin: extentXmin,
      ymin: extentYmin,
      xmax: extentXmax,
      ymax: extentYmax,
      spatialReference: { wkid: 4326 }
    }
  }

  return geometryExtent
}

const linshidata= [
  {
    "stationId": "1",
    "stationName": "汾阳市实验印刷厂测试1",
    "longitude": 119.49,
    "latitude": 31.21,
    "stationTypeId": 1005,
    "entType": "11",
    "isover": 0,
    "alarmStatus": 2
  },
  {
    "stationId": "2",
    "stationName": "汾阳市东晟机械制造有限公司测试2",
    "longitude": 110.59,
    "latitude": 35.02,
    "stationTypeId": 1005,
    "entType": "12",
    "isover": 0,
    "alarmStatus": 1
  },
  {
    "stationId": "3",
    "stationName": "汾阳市华茂传动轴有限公司测试3",
    "longitude": 99.1,
    "latitude": 25.08,
    "stationTypeId": 1005,
    "entType": "13",
    "isover": 0,
    "alarmStatus": 1
  },
  {
    "stationId": "4",
    "stationName": "汾阳市日升活性炭有限公司测试4",
    "longitude": 101.72,
    "latitude": 31.93,
    "stationTypeId": 1005,
    "entType": "14",
    "isover": 1,
    "alarmStatus": 2
  },
  {
    "stationId": "5",
    "stationName": "汾阳市石富高钙灰有限公司测试5",
    "longitude": 112.27,
    "latitude": 23.03,
    "stationTypeId": 1005,
    "entType": "15",
    "isover": 1,
    "alarmStatus":1
  }
]
