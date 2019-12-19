import { loadModules } from 'esri-loader'
import {dataRequestUrl, mapExtent} from '../mapjs/AppConfig'
// 名称渲染样式
import countrylevel1 from '../images/namerender/国1.svg'
import countrylevel2 from '../images/namerender/国2.svg'
import countrylevel3 from '../images/namerender/国3.svg'
import countrylevel4 from '../images/namerender/国4.svg'
import countrylevel5 from '../images/namerender/国5.svg'
import countrylevel6 from '../images/namerender/国6.svg'
import provincelevel1 from '../images/namerender/省1.svg'
import provincelevel2 from '../images/namerender/省2.svg'
import provincelevel3 from '../images/namerender/省3.svg'
import provincelevel4 from '../images/namerender/省4.svg'
import provincelevel5 from '../images/namerender/省5.svg'
import provincelevel6 from '../images/namerender/省6.svg'
import citylevel1 from '../images/namerender/市1.svg'
import citylevel2 from '../images/namerender/市2.svg'
import citylevel3 from '../images/namerender/市3.svg'
import citylevel4 from '../images/namerender/市4.svg'
import citylevel5 from '../images/namerender/市5.svg'
import citylevel6 from '../images/namerender/市6.svg'
import countylevel1 from '../images/namerender/微1.svg'
import countylevel2 from '../images/namerender/微2.svg'
import countylevel3 from '../images/namerender/微3.svg'
import countylevel4 from '../images/namerender/微4.svg'
import countylevel5 from '../images/namerender/微5.svg'
import countylevel6 from '../images/namerender/微6.svg'
import yclevel1 from '../images/namerender/扬1.svg'
import yclevel2 from '../images/namerender/扬2.svg'
import yclevel3 from '../images/namerender/扬3.svg'
import yclevel4 from '../images/namerender/扬4.svg'
import yclevel5 from '../images/namerender/扬5.svg'
import yclevel6 from '../images/namerender/扬6.svg'
//无数值时的符号
import countrynodata from '../images/namerender/国7.svg'
import provincenodata from '../images/namerender/省7.svg'
import citynodata from '../images/namerender/市7.svg'
import countynodata from '../images/namerender/微7.svg'
import ycnodata from '../images/namerender/扬7.svg'
//数值模式
import yclevelnum1 from '../images/numrender/数值1.svg'
import yclevelnum2 from '../images/numrender/数值2.svg'
import yclevelnum3 from '../images/numrender/数值3.svg'
import yclevelnum4 from '../images/numrender/数值4.svg'
import yclevelnum5 from '../images/numrender/数值5.svg'
import yclevelnum6 from '../images/numrender/数值6.svg'
import ycnumnodata from '../images/numrender/数值7.svg'
import levelnum1 from '../images/numrender/数值1.svg'
import levelnum2 from '../images/numrender/数值2.svg'
import levelnum3 from '../images/numrender/数值3.svg'
import levelnum4 from '../images/numrender/数值4.svg'
import levelnum5 from '../images/numrender/数值5.svg'
import levelnum6 from '../images/numrender/数值6.svg'
import levelnumnodata from '../images/numrender/数值7.svg'
// 污染源
import wryoffline from '../images/namerender/污染源1.svg'
import wrynormal from '../images/namerender/污染源2.svg'
import wryalarm from '../images/namerender/污染源3.svg'
import wrynodata from '../images/namerender/污染源4.svg'
// 污染事件
import wrsj from '../images/wrsj.svg'
import store from '../../../../../store'
import {shrinkPoint} from '../mapjs/ShrinkImpl.js'

/**
 * 创建名称标注
 * @param {*} nameArcade 名称标注表达式
 */
export const createNameLabelClass = function (nameArcade) {
  //let nameArcade = '$feature.stationName' || ''
  let nameClass = {
    labelExpressionInfo: {
      expression: nameArcade
    },
    symbol: {
      type: 'text', // autocasts as new TextSymbol()
      color: 'white',
      font: {
        size: 9,
        //family: 'Helvetica Neue'
        family: 'sans-serif'
      },
      // xoffset: -50, // 需要设置xoffset 让文字左侧和上面的背景图对齐
      yoffset: 5
    },
    labelPlacement: 'below-center'
  }
  return nameClass;
}
/**
 * 创建数值标注
 * @param {*} numArcade 数值标注表达式 
 */
export const createNumLabelClass = function (numArcade) {
  let numClass = {
    labelExpressionInfo: { expression: numArcade }, // 测试用
    symbol: {
      type: 'text',
      color: 'white',
      font: {
        size: 9,
        weight: 'bold',
        family: 'sans-serif'
      },
      xoffset: 0,
      yoffset: 0
    },
    labelPlacement: 'center-center'
  }
  return numClass;
}

export const initShrinkLayer = function(curMapView,overGraphics,layerid,pointLayerId){
  // 超标报警图层
  //layerid ="airShrinkLayer";
  if(overGraphics && overGraphics.length>0){
    let params=
    {
      map:curMapView.map,
      id:layerid,
      pointLayerId:pointLayerId,
      graphics:overGraphics,
      outerFillColor:[234, 53, 34, 0.2],
      outerOutlineColor:[234, 53, 34, 0.3],
      innerFillColor: [234, 53, 34, 0.4],
      innerOutlineColor: [234, 53, 34, 0.5]
    }
    shrinkPoint(params);
  }
}

export const createAirGraphics =function(graphicResults, callBack, curMapView, renderType, renderField, selectedStationTypeId,layerId) {
  loadModules(['esri/layers/GraphicsLayer', 'esri/geometry/SpatialReference', 'esri/Graphic', 'esri/layers/support/LabelClass', 'esri/geometry/Extent'])
    .then(([GraphicsLayer, SpatialReference, Graphic, LabelClass, Extent]) => {
      let stationtypeobj=store.state.stationtype;
      let graphics = []
      let overGraphics = []
      let countryUrlList = [countrylevel1, countrylevel2, countrylevel3, countrylevel4, countrylevel5, countrylevel6, countrynodata]
      let provinceUrlList = [provincelevel1, provincelevel2, provincelevel3, provincelevel4, provincelevel5, provincelevel6, provincenodata]
      let cityUrlList = [citylevel1, citylevel2, citylevel3, citylevel4, citylevel5, citylevel6, citynodata]
      let countyUrlList = [countylevel1, countylevel2, countylevel3, countylevel4, countylevel5, countylevel6, countynodata]
      let numUrlList = [levelnum1, levelnum2, levelnum3, levelnum4, levelnum5, levelnum6, levelnumnodata]
      let picWidth = '24px'
      let picHeight = '24px'
      let renderInfo = dataRequestUrl.options.stationListInfo.renderInfo
      if(renderType.indexOf('numrender')!=-1){
        picWidth = renderInfo.defaultSymbol.width
        picHeight = renderInfo.defaultSymbol.height
      }
      let nameColor = "white";
      if(curMapView.map.basemap.id=="myVectorBasemap"){
        nameColor = "black";
      }
      let symbolLevel = dataRequestUrl.options.airLevelInfo[renderField]
      let renderFieldMap = [['aqi','aqi'],['pm25','pm25'],['pm10','pm10'],['so2','so2'],['no2','no2'],['co','co'],['o3','o3']];
      //处理报警
      for (let m = 0; m < graphicResults.length; m++) {
        let stationItem = graphicResults[m]
        if (stationItem.longitude != null && stationItem.latitude != null && stationItem.latitude < 90  && (stationItem.stationTypeId == selectedStationTypeId)) {
          if (stationItem.alarmStatus == 1 ) {
            overGraphics.push([stationItem.longitude, stationItem.latitude])
          }
        }
      }
      if(overGraphics && overGraphics.length>0){
        if(selectedStationTypeId == stationtypeobj.guokong){
          initShrinkLayer(curMapView,overGraphics,"countryShrinkLayer",layerId)
        }
        else if(selectedStationTypeId == stationtypeobj.shengkong){
          initShrinkLayer(curMapView,overGraphics,"provinceShrinkLayer",layerId)
        }
        else if(selectedStationTypeId == stationtypeobj.shikong){
          initShrinkLayer(curMapView,overGraphics,"cityShrinkLayer",layerId)
        }
        else if(selectedStationTypeId == stationtypeobj.weixing){
          initShrinkLayer(curMapView,overGraphics,"countyShrinkLayer",layerId)
        } 
      }
      for (let m = 0; m < graphicResults.length; m++) {
        let stationItem = graphicResults[m]
        let numColor;
        let graphicNum;
        if (stationItem.longitude != null && stationItem.latitude != null && stationItem.latitude < 90  && (stationItem.stationTypeId == selectedStationTypeId)) {
          let pointGeometry = {
            type: 'point',
            x: stationItem.longitude,
            y: stationItem.latitude
          }
          if (stationItem.aqi) {
            stationItem.aqi = Math.round(stationItem.aqi)
          }
          if (stationItem.pm25) {
            stationItem.pm25 = Math.round(stationItem.pm25)
          }
          if (stationItem.pm10) {
            stationItem.pm10 = Math.round(stationItem.pm10)
          }
          if (stationItem.co) {
            stationItem.co = Math.round(stationItem.co)
          }
          if (stationItem.no2) {
            stationItem.no2 = Math.round(stationItem.no2)
          }
          if (stationItem.o3) {
            stationItem.o3 = Math.round(stationItem.o3)
          }
          if (stationItem.so2) {
            stationItem.so2 = Math.round(stationItem.so2)
          }
          //根据数值区间获取符号
          let symbolPicUrl;  
          for(let j=0;j<renderFieldMap.length;j++){
            let renderFieldItem = renderFieldMap[j][0];
            if(renderField==renderFieldItem){
              if(stationItem[renderFieldMap[j][1]] && symbolLevel && symbolLevel.length ==6){
                for(let i =0;i<symbolLevel.length;i++){
                  if(stationItem[renderFieldMap[j][1]]>=symbolLevel[i][0] && stationItem[renderFieldMap[j][1]]<=symbolLevel[i][1]){
                    //数值模式，绿色/黄色/橙色用黑色字体，其他三种颜色用白色字体
                    if(renderType.indexOf('numrender')!=-1){
                      symbolPicUrl = numUrlList[i];
                      graphicNum = stationItem[renderFieldMap[j][1]];
                      if(i<3){
                        numColor = "black";
                      }
                      else{
                        numColor = "white";
                      }
                    }else{
                      if(selectedStationTypeId == stationtypeobj.guokong){
                        symbolPicUrl = countryUrlList[i];
                      }
                      else if(selectedStationTypeId == stationtypeobj.shengkong){
                        symbolPicUrl = provinceUrlList[i];
                      }
                      else if(selectedStationTypeId == stationtypeobj.shikong){
                        symbolPicUrl = cityUrlList[i];
                      }
                      else if(selectedStationTypeId == stationtypeobj.weixing){
                        symbolPicUrl = countyUrlList[i];
                      }
                    }
                    break;
                  }
                }
              }
              else{
                if(renderType.indexOf('numrender')!=-1){
                  symbolPicUrl = numUrlList[numUrlList.length-1];
                }else{
                  if(selectedStationTypeId == stationtypeobj.guokong){
                    symbolPicUrl = countryUrlList[countryUrlList.length-1];
                  }
                  else if(selectedStationTypeId == stationtypeobj.shengkong){
                    symbolPicUrl = provinceUrlList[provinceUrlList.length-1];
                  }
                  else if(selectedStationTypeId == stationtypeobj.shikong){
                    symbolPicUrl = cityUrlList[cityUrlList.length-1];
                  }
                  else if(selectedStationTypeId == stationtypeobj.weixing){
                    symbolPicUrl = countyUrlList[countyUrlList.length-1];
                  }
                }
                break;
              }
              break;
            }
          }
          if(symbolPicUrl){
            let graphicSymbol = {
              type: renderInfo.defaultSymbol.type,
              url: symbolPicUrl,
              width: picWidth,
              height: picHeight
              // xoffset: renderInfo.defaultSymbol.xoffset
            }
            //默认符号层      
            let graphic = new Graphic({
              geometry: pointGeometry,
              attributes: stationItem,
              symbol:graphicSymbol
            })
            graphics.push(graphic)
          }
          //数值标注层
          if(renderType.indexOf('numrender')!=-1){
            if(!graphicNum){
              graphicNum ="--";
              numColor ="white";
            }
            let xoffset = 0;
            var numTextSymbol = {
              type: "text", // autocasts as new TextSymbol()
              color: numColor,
              font: {
                family: "sans-serif",
                size: 9
              },
              text:graphicNum,
              xoffset:xoffset,
              yoffset:0,
              //haloColor: "black",
              //haloSize: 1,
              horizontalAlignment: "center",
              verticalAlignment: "middle"
            };
            let numGraphic = new Graphic({
              geometry: pointGeometry,
              attributes: stationItem,
              symbol:numTextSymbol
            })
            graphics.push(numGraphic)
          }
          //名称标注层
          if(renderType.indexOf('namerender')!=-1 && stationItem["stationName"]){
            var nameTextSymbol = {
              type: "text", // autocasts as new TextSymbol()
              color: nameColor,
              font: {
                family: "sans-serif",
                size: 9
              },
              text:stationItem["stationName"],
              yoffset: -15,
              //haloColor: "black",
              //haloSize: 1,
              horizontalAlignment: "center",
              verticalAlignment: "bottom"
            };
            let nameGraphic = new Graphic({
              geometry: pointGeometry,
              attributes: stationItem,
              symbol:nameTextSymbol
            })
            graphics.push(nameGraphic)
          }
        }
      }
      if(graphics && graphics.length >0){
        let airPointFeaLayer = curMapView.map.findLayerById(layerId);
        if(airPointFeaLayer !=null){
          airPointFeaLayer.removeAll();
        }else{
          airPointFeaLayer = new GraphicsLayer({
            "id":layerId
          });
        }
        airPointFeaLayer.addMany(graphics);
        let geometryExtent;
        callBack(airPointFeaLayer, geometryExtent)
      }
      else{
        callBack(null,null)
      }
    })
}

/**
 * 绘制污染源数据  污染源只有pm25\pm10\so2\no2\co\o3六参数，没有aqi
 */
export const createWryGraphics = function (graphicResults, callBack, curMapView, renderType, renderField, stationTypeId) {
  loadModules(['esri/layers/FeatureLayer', 'esri/layers/support/Field', 'esri/geometry/SpatialReference', 'esri/Graphic', 'esri/layers/support/LabelClass', 'esri/geometry/Extent'])
    .then(([FeatureLayer, Field, SpatialReference, Graphic, LabelClass, Extent]) => {
      let queryFields = dataRequestUrl.options.entStationListInfo.queryFields
      let oidFieldName = queryFields[0].name
      let renderInfo = dataRequestUrl.options.entStationListInfo.renderInfo
      let urlList = [wryoffline, wrynormal, wryalarm,wrynodata]
      let valueList = ['wryoffline', 'wrynormal', 'wryalarm','wrynodata']
      let uniqueValueInfos = []
      let valueExpression = ''
      // alarmStatus 0是无报警，1是报警，2是离线   isover 0是达标，1是超标
      valueExpression = 'When($feature.alarmStatus ==2 && $feature.stationTypeId==' + stationTypeId + ", '" + valueList[0] + "',$feature.alarmStatus ==0 && $feature.stationTypeId==" + stationTypeId + ", '" + valueList[1] + "',$feature.alarmStatus ==1 && $feature.stationTypeId==" + stationTypeId + ", '" + valueList[2] + "','wrynodata')"
      let picWidth = renderInfo.defaultSymbol.width
      let picHeight = renderInfo.defaultSymbol.height
      for (let i = 0; i < urlList.length; i++) {
        let uniqueValueInfo = {
          value: valueList[i],
          symbol: {
            type: renderInfo.defaultSymbol.type,
            url: urlList[i],
            width: picWidth,
            height: picHeight
          }
        }
        uniqueValueInfos.push(uniqueValueInfo)
      }
      let feaRenderer = {
        type: renderInfo.type, // autocasts as new UniqueValueRenderer()
        valueExpression: valueExpression,
        uniqueValueInfos: uniqueValueInfos
      }
      
      // 站点名称标注 黑色
      let nameArcade = '$feature.stationName' || ''
      let nameClass = createNameLabelClass(nameArcade);
      // 构建图层数据
      // 此处需要注意，query返回的geometry没有type信息，所以需要重新构建graphic，否则会报错

      let graphics = []
      let overGraphics = []
      for (let m = 0; m < graphicResults.length; m++) {
        let stationItem = graphicResults[m]
        if (stationItem.longitude != null && stationItem.latitude != null) {
          if (stationItem.alarmStatus == 1) {
            overGraphics.push([stationItem.longitude, stationItem.latitude])
          }
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
      // 超标报警图层
      initShrinkLayer(curMapView,overGraphics,"wryShrinkLayer","wryPointFeaLayer");
      // debugger;
      if(graphics && graphics.length>0){
        // 构建图层的字段信息
        let fieldInfos = getFieldsInfo(queryFields)
        // 排序获取数据的范围
        //let geometryExtent = calculateMapInitExtent(graphicResults)
        let geometryExtent;
        // 实例化一个弹出框
        let popupTemplate = {
          // title:"站点{"+oidFieldName+"}",
          title: '',
          fieldInfos: fieldInfos
          // content:setPopContentInfo
        }
        // 根据查询结果实例化一个featurelayer，只用国控、省控符号表示
        let labelingInfo = [];
        if(renderType.indexOf('namerender')!=-1) {
          labelingInfo.push(nameClass)
        }
        let wryPointFeaLayer = new FeatureLayer({
          fields: queryFields.map(function (field) {
            return Field.fromJSON(field)
          }),
          // opacity:"0.8",
          id: 'wryPointFeaLayer',
          objectIdField: oidFieldName,
          geometryType: 'point',
          popupEnabled:false,
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
      callBack(null,null)
      // console.log(error)
    })
}

/**
 * 绘制雷达数据
 */
export const createRadarLayers = function (curPicUrl, callBack, curMapView,geoExtent,layerId) {
  let radarwkid = geoExtent.spatialReference.wkid;
  loadModules(['esri/layers/BaseDynamicLayer', 'esri/geometry/Extent'])
    .then(([BaseDynamicLayer, Extent]) => {
      let CustomImageOverlayLayer = BaseDynamicLayer.createSubclass({
        properties: {
          picUrl: null,
          extent: null,
          image: null,
          canvas: null
        },
        getImageUrl: function (extent, width, height) {
          if (!this.image) {
            this.image = new Image()
          }
          this.image.src = this.picUrl
          // Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported
          this.image.setAttribute('crossOrigin', 'Anonymous')
          // 创建canvas DOM元素，并设置其宽高和图片一样
          if (!this.canvas) {
            this.canvas = document.createElement('canvas')
            this.canvas.setAttribute('id', 'ladar-canvas')
          }
          // 需要覆盖屏幕  需要考虑大屏的情况
          this.canvas.width = 2000
          this.canvas.height = 2000
          // 左上角坐标转换屏幕坐标,为了获取canvas绘制图片的起点
          let mapPoint = {
            x: this.extent.xmin,
            y: this.extent.ymax,
            spatialReference: {
              wkid: radarwkid
            }
          }
          let screenPoint = curMapView.toScreen(mapPoint)
          // 根据extent范围计算canvas绘制图片的宽度以及高度
          // 左下角
          let leftbottom = {
            x: this.extent.xmin,
            y: this.extent.ymin,
            spatialReference: {
              wkid: radarwkid
            }
          }
          let screen_leftbottom = curMapView.toScreen(leftbottom)
          // 右上角
          let righttop = {
            x: this.extent.xmax,
            y: this.extent.ymax,
            spatialReference: {
              wkid: radarwkid
            }
          }
          let screen_righttop = curMapView.toScreen(righttop)
          let context = this.canvas.getContext('2d')
          let left = screenPoint.x
          let top = screenPoint.y
          let imgWidth = Math.abs(screen_righttop.x - screen_leftbottom.x)
          let imgHeight = Math.abs(screen_righttop.y - screen_leftbottom.y)
          context.drawImage(this.image, left, top, imgWidth, imgHeight)
          // 根据type参数指定的类型将包含在canvas中的图片文件编码成字符串形式
          // type参数的默认值为image/png.如果该canvas的宽度或长度是0,则会返回字符串"data:,".
          // 如果指定的type参数不是image/png,但返回的字符串是以data:image/png开头的,
          // 则所请求的图片类型不支持.Chrome支持image/webp类型.如果type参数的值为image/jpeg或image/webp,
          // 则第二个参数的值如果在0.0和1.0之间的话,会被看作是图片质量参数,如果第二个参数的值不在0.0和1.0之间,则会使用默认的图片质量
          return this.canvas.toDataURL('image/png')
        }
      })
      let LadarImageLayer = new CustomImageOverlayLayer({
        picUrl: curPicUrl,
        //id: 'ladarImageLayer',
        id:layerId,
        opacity: 0.5,
        extent: geoExtent
      })
      // 加载script为异步方法
      callBack(LadarImageLayer,geoExtent)
    }).catch(function (error) {
      callBack(null)
    })
}
/**
 * 绘制污染云图
 */
export const createWrytLayers = function (curPicUrl, callBack, curMapView, geoExtent,layerId) {
  let pollution_cloudwkid=geoExtent.spatialReference.wkid;
  loadModules(['esri/layers/BaseDynamicLayer', 'esri/geometry/Extent','esri/geometry/support/webMercatorUtils'])
    .then(([BaseDynamicLayer, Extent,webMercatorUtils]) => {
      let CustomImageOverlayLayer = BaseDynamicLayer.createSubclass({
        properties: {
          picUrl: null,
          extent: null,
          image: null,
          canvas: null
        },
        getImageUrl: function (extent, width, height) {
          if (!this.image) {
            this.image = new Image()
          }
          //extent = new Extent({xmin: 73.441277, ymin: 18.159829001, xmax: 135.09105966, ymax: 53.563321521, spatialReference: {wkid: 4326}});
          this.image.src = this.picUrl
          // Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported
          this.image.setAttribute('crossOrigin', 'Anonymous')
          // 创建canvas DOM元素，并设置其宽高和图片一样
          if (!this.canvas) {
            this.canvas = document.createElement('canvas')
            this.canvas.setAttribute('id', 'wryt-canvas')
          }
          //let clientHeight = document.documentElement.clientHeight || document.body.clientHeight
          //let clientWidth = document.documentElement.clientWidth || document.body.clientWidth
          // 需要覆盖屏幕    需要考虑大屏的情况  需要比屏幕尺寸大
          this.canvas.width = 2000
          this.canvas.height = 2000
          // 左上角坐标转换屏幕坐标,为了获取canvas绘制图片的起点
          let mapPoint = {
            x: this.extent.xmin,
            y: this.extent.ymax,
            spatialReference: {
              wkid: pollution_cloudwkid
            }
          }
          let screenPoint = curMapView.toScreen(mapPoint)
          // 根据extent范围计算canvas绘制图片的宽度以及高度
          // 左下角
          let leftbottom = {
            x: this.extent.xmin,
            y: this.extent.ymin,
            spatialReference: {
              wkid: pollution_cloudwkid
            }
          }
          let screen_leftbottom = curMapView.toScreen(leftbottom)
          // 右上角
          let righttop = {
            x: this.extent.xmax,
            y: this.extent.ymax,
            spatialReference: {
              wkid: pollution_cloudwkid
            }
          }
          let screen_righttop = curMapView.toScreen(righttop)
          let context = this.canvas.getContext('2d')
          let left = screenPoint.x
          let top = screenPoint.y
          let imgWidth = Math.abs(screen_righttop.x - screen_leftbottom.x)
          let imgHeight = Math.abs(screen_righttop.y - screen_leftbottom.y)
          context.drawImage(this.image, left, top, imgWidth, imgHeight)
          // 根据type参数指定的类型将包含在canvas中的图片文件编码成字符串形式
          // type参数的默认值为image/png.如果该canvas的宽度或长度是0,则会返回字符串"data:,".
          // 如果指定的type参数不是image/png,但返回的字符串是以data:image/png开头的,
          // 则所请求的图片类型不支持.Chrome支持image/webp类型.如果type参数的值为image/jpeg或image/webp,
          // 则第二个参数的值如果在0.0和1.0之间的话,会被看作是图片质量参数,如果第二个参数的值不在0.0和1.0之间,则会使用默认的图片质量
          return this.canvas.toDataURL('image/png')
        }
      })
      // 实例化一个叠加图片图层类
      let WrytImageLayer = new CustomImageOverlayLayer({
        picUrl: curPicUrl,
        ///id: 'wrytImageLayer',
        id:layerId,
        opacity: 0.5,
        extent: geoExtent
      })
      // 加载script为异步方法
      callBack(WrytImageLayer)
    }).catch(function (error) {
      callBack(null)
    })
}
/**
 * 绘制扬尘数据 扬尘只有pm25和pm10
 */
export const createYcGraphics = function (graphicResults, callBack, curMapView, renderType, renderField, stationTypeId) {
  loadModules(['esri/layers/FeatureLayer', 'esri/layers/support/Field', 'esri/geometry/SpatialReference', 'esri/Graphic', 'esri/layers/support/LabelClass', 'esri/geometry/Extent'])
    .then(([FeatureLayer, Field, SpatialReference, Graphic, LabelClass, Extent]) => {
      // 根据查询获取的数据在前端构建空气站点featurelayer图层
      let queryFields = dataRequestUrl.options.dustStationListInfo.queryFields
      let oidFieldName = queryFields[0].name
      let renderInfo = dataRequestUrl.options.dustStationListInfo.renderInfo
      let urlList = [yclevel1, yclevel2, yclevel3, yclevel4, yclevel5, yclevel6, ycnodata]
      let valueList = ['yclevel1', 'yclevel2', 'yclevel3', 'yclevel4', 'yclevel5', 'yclevel6','ycnodata']
      let uniqueValueInfos = []
      let valueExpression = ''
      
      if (renderType.indexOf('numrender')!=-1) {
        urlList = [yclevelnum1, yclevelnum2, yclevelnum3, yclevelnum4, yclevelnum5, yclevelnum6, ycnumnodata]
        valueList = ['yclevelnum1', 'yclevelnum2', 'yclevelnum3', 'yclevelnum4', 'yclevelnum5', 'yclevelnum6','ycnodata']
      }
      let pm25Level = dataRequestUrl.options.airLevelInfo.pm25
      let pm10Level = dataRequestUrl.options.airLevelInfo.pm10
      // debugger
      // 扬尘类别 6
      if (renderField === 'pm25') {
        valueExpression = 'When($feature.pm25 >' + pm25Level[0][0] + ' && $feature.pm25 <= ' + pm25Level[0][1] + ' && $feature.stationTypeId==' + stationTypeId + ", '" + valueList[0] + "',$feature.pm25 >=" + pm25Level[1][0] + ' && $feature.pm25 <= ' + pm25Level[1][1] + ' && $feature.stationTypeId==' + stationTypeId + ", '" + valueList[1] + "',$feature.pm25 >=" + pm25Level[2][0] + ' && $feature.pm25 <= ' + pm25Level[2][1] + ' && $feature.stationTypeId==' + stationTypeId + ", '" + valueList[2] + "',$feature.pm25 >=" + pm25Level[3][0] + ' && $feature.pm25 <= ' + pm25Level[3][1] + ' && $feature.stationTypeId==' + stationTypeId + ", '" + valueList[3] + "',$feature.pm25 >=" + pm25Level[4][0] + ' && $feature.pm25 <= ' + pm25Level[4][1] + ' && $feature.stationTypeId==' + stationTypeId + ", '" + valueList[4] + "',$feature.pm25 >=" + pm25Level[5][0] + ' && $feature.stationTypeId==' + stationTypeId + ", '" + valueList[5] + "','"+ valueList[6]+ "')"
      } else if (renderField === 'pm10') {
        valueExpression = 'When($feature.pm10 >' + pm10Level[0][0] + ' && $feature.pm10 <= ' + pm10Level[0][1] + ' && $feature.stationTypeId==' + stationTypeId + ", '" + valueList[0] + "',$feature.pm10 >=" + pm10Level[1][0] + ' && $feature.pm10 <= ' + pm10Level[1][1] + ' && $feature.stationTypeId==' + stationTypeId + ", '" + valueList[1] + "',$feature.pm10 >=" + pm10Level[2][0] + ' && $feature.pm10 <= ' + pm10Level[2][1] + ' && $feature.stationTypeId==' + stationTypeId + ", '" + valueList[2] + "',$feature.pm10 >=" + pm10Level[3][0] + ' && $feature.pm10 <= ' + pm10Level[3][1] + ' && $feature.stationTypeId==' + stationTypeId + ", '" + valueList[3] + "',$feature.pm10 >=" + pm10Level[4][0] + ' && $feature.pm10 <= ' + pm10Level[4][1] + ' && $feature.stationTypeId==' + stationTypeId + ", '" + valueList[4] + "',$feature.pm10 >=" + pm10Level[5][0] + ' && $feature.stationTypeId==' + stationTypeId + ", '" + valueList[5] + "','"+ valueList[6]+ "')"
      }
      let picWidth = '24px'
      let picHeight = '24px'
      if(renderType.indexOf('numrender')!=-1){
        picWidth = renderInfo.defaultSymbol.width
        picHeight = renderInfo.defaultSymbol.height
      }
      for (let i = 0; i < urlList.length; i++) {
        /*
        if(valueList[i]=="ycnodata"){
          picWidth = '24px'
        }
        else{
          if(renderType.indexOf('numrender')!=-1){
            picWidth = renderInfo.defaultSymbol.width
          }
        }
        */
        let uniqueValueInfo = {
          value: valueList[i],
          symbol: {
            type: renderInfo.defaultSymbol.type,
            url: urlList[i],
            width: picWidth,
            height: picHeight
            // xoffset: renderInfo.defaultSymbol.xoffset
          }
        }
        uniqueValueInfos.push(uniqueValueInfo)
      }
      let feaRenderer = {
        type: renderInfo.type, // autocasts as new UniqueValueRenderer()
        // field: renderInfo.renderField,
        valueExpression: valueExpression,
        uniqueValueInfos: uniqueValueInfos
      }
      // end*****************************/从配置文件获取点符号唯一值渲染信息
      let ycArcade = ''
      if (renderField === 'pm25') {
        ycArcade = '$feature.pm25' || ''
      } else if (renderField === 'pm10') {
        ycArcade = '$feature.pm10' || ''
      }
     let ycLabelClass = createNumLabelClass(ycArcade);
      // 站点名称标注 黑色
      let nameArcade = '$feature.stationName' || ''
      let nameClass = createNameLabelClass(nameArcade);
      // end*****************************创建文本标注和站点名称标注
      // 构建图层数据
      // 构建图层的字段信息
      let fieldInfos = getFieldsInfo(queryFields)
      // 排序获取数据的范围
      //let geometryExtent = calculateMapInitExtent(graphicResults)
      let geometryExtent;
      let graphics = []
      let overGraphics = []
      for (let m = 0; m < graphicResults.length; m++) {
        let stationItem = graphicResults[m]
        if (stationItem.longitude != null && stationItem.latitude != null) {
          if (stationItem.alarmStatus == 1) {
            overGraphics.push([stationItem.longitude, stationItem.latitude])
          }
          let pointGeometry = {
            type: 'point',
            x: stationItem.longitude,
            y: stationItem.latitude
          }
          stationItem.OBJECTID = m + 1
          if (stationItem.aqi) {
            stationItem.aqi = Math.round(stationItem.aqi)
          }
          if (stationItem.pm25) {
            stationItem.pm25 = Math.round(stationItem.pm25)
          }
          if (stationItem.pm10) {
            stationItem.pm10 = Math.round(stationItem.pm10)
          }
          if (stationItem.co) {
            stationItem.co = Math.round(stationItem.co)
          }
          if (stationItem.no2) {
            stationItem.no2 = Math.round(stationItem.no2)
          }
          if (stationItem.o3) {
            stationItem.o3 = Math.round(stationItem.o3)
          }
          if (stationItem.so2) {
            stationItem.so2 = Math.round(stationItem.so2)
          }
          let graphic = new Graphic({
            geometry: pointGeometry,
            attributes: stationItem
          })
          graphics.push(graphic)
        }
      }
      // 超标报警图层
      initShrinkLayer(curMapView,overGraphics,"ycShrinkLayer",stationTypeId,"ycPointFeaLayer");
      if(graphics && graphics.length>0){
        // 实例化一个弹出框
        let popupTemplate = {
          // title:"站点{"+oidFieldName+"}",
          title: '',
          fieldInfos: fieldInfos
          // content:setPopContentInfo
        }
        // 根据查询结果实例化一个featurelayer，只用国控、省控符号表示
        let labelingInfo = [];
          if (renderType.indexOf('numrender')!=-1) {
            labelingInfo.push(ycLabelClass)
          }
          if(renderType.indexOf('namerender')!=-1) {
            labelingInfo.push(nameClass)
        }
        let ycPointFeaLayer = new FeatureLayer({
          fields: queryFields.map(function (field) {
            return Field.fromJSON(field)
          }),
          // opacity:"0.8",
          id: 'ycPointFeaLayer',
          objectIdField: oidFieldName,
          geometryType: 'point',
          popupEnabled:false,
          spatialReference: new SpatialReference(4326),
          source: graphics,
          labelingInfo: labelingInfo,
          elevationInfo: {
            mode: 'on-the-ground'
          },
          renderer: feaRenderer
        })
        // 不使用默认的图层的popup模板
        ycPointFeaLayer.popupTemplate = popupTemplate
        // 加载script为异步方法
        callBack(ycPointFeaLayer, geometryExtent)
      }
      else{
        callBack(null,null)
      }
    }).catch(function (error) {
      callBack(null,null)
      // console.log(error)
    })
}
/**
 * 绘制污染事件
 */
export const createWrsjGraphics = function (graphicResults, callBack, curMapView,selectedStationTypeId) {
  loadModules(['esri/layers/FeatureLayer', 'esri/layers/support/Field', 'esri/geometry/SpatialReference', 'esri/Graphic', 'esri/layers/support/LabelClass', 'esri/geometry/Extent'])
    .then(([FeatureLayer, Field, SpatialReference, Graphic, LabelClass, Extent]) => {
      // 根据查询获取的数据在前端构建空气站点featurelayer图层
      let queryFields = dataRequestUrl.options.wrsjListInfo.queryFields
      let oidFieldName = queryFields[0].name
      // 事件状态 处理中0/已完成1/已办结2
      let renderInfo = dataRequestUrl.options.wrsjListInfo.renderInfo
      /*
      let feaRenderer = {
        type: "simple", // autocasts as new UniqueValueRenderer()
        symbol: {
          type: renderInfo.defaultSymbol.type,
          url: wry,
          width: renderInfo.defaultSymbol.width,
          height: renderInfo.defaultSymbol.height
          // xoffset: renderInfo.defaultSymbol.xoffset
        }
      }
      */
      let feaRenderer = {
        type: "simple", // autocasts as new UniqueValueRenderer() renderInfo.type
        symbol: {
          type: renderInfo.defaultSymbol.type,
          url: wrsj,
          width: renderInfo.defaultSymbol.width,
          height: renderInfo.defaultSymbol.height
          // xoffset: renderInfo.defaultSymbol.xoffset
        }
      }
      // 站点名称标注
      let nameArcade = '$feature.eventName' || ''
      let nameClass = createNameLabelClass(nameArcade);
      // end*****************************创建AQI的文本标注和站点名称标注
      // 构建图层数据
      // 构建图层的字段信息
      let fieldInfos = getFieldsInfo(queryFields)
      // 排序获取数据的范围
      //let geometryExtent = calculateMapInitExtent(graphicResults)
      let geometryExtent;
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
          //增加临时typeid
          stationItem.stationTypeId  = selectedStationTypeId;
          let graphic = new Graphic({
            geometry: pointGeometry,
            attributes: stationItem
          })
          graphics.push(graphic)
        }
      }
      if(graphics && graphics.length>0){
        // 实例化一个弹出框
        let popupTemplate = {
          // title:"站点{"+oidFieldName+"}",
          title: '',
          fieldInfos: fieldInfos
          // content:setPopContentInfo
        }
        // 根据查询结果实例化一个featurelayer，只用国控、省控符号表示
        let wrsjPointFeaLayer = new FeatureLayer({
          fields: queryFields.map(function (field) {
            return Field.fromJSON(field)
          }),
          // opacity:"0.8",
          id: 'wrsjPointFeaLayer',
          objectIdField: oidFieldName,
          geometryType: 'point',
          popupEnabled:false,
          spatialReference: new SpatialReference(4326),
          source: graphics,
          //labelingInfo: [nameClass],
          elevationInfo: {
            mode: 'on-the-ground'
          },
          renderer: feaRenderer
        })
        // 不使用默认的图层的popup模板
        wrsjPointFeaLayer.popupTemplate = popupTemplate
        // 加载script为异步方法
        callBack(wrsjPointFeaLayer, geometryExtent)
      }
      else{
        callBack(null,null)
      }
    }).catch(function (error) {
      callBack(null,null)
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
