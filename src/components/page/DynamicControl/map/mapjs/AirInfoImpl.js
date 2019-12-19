import axios from 'axios'
import qs from 'qs'
import { callbackify } from 'util'

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbInJlYWQiXSwib3JnYW5pemF0aW9uIjoiYWRtaW4iLCJleHAiOjE1NjQ4OTYwNDYsImF1dGhvcml0aWVzIjpbIkFETUlOIl0sImp0aSI6ImFjZDZkNmE1LTA2YjMtNGNiYy04ZjZkLTJiNWI5NzY3MzhmNCIsImNsaWVudF9pZCI6InRlc3RfY2xpZW50In0.wqaJVPPTQvzmxUZJhPBgK4rppf7NQgPAIgUelkG77R8'
const token2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIxMjMiLCJyb2xlSWQiOjEsInVzZXJJZCI6MSwiYXV0aG9yaXRpZXMiOlsiMSJdLCJjbGllbnRfaWQiOiJhcHAiLCJyZWdpb25JZCI6MSwicGhvbmUiOiIxODg5OTk5NTU1NSIsInBlcnNvbm5lbFR5cGUiOjEsInNjb3BlIjpbInNlcnZlciJdLCJ1bml0SWQiOjEsImV4cCI6MTU3MTM3NjE3MSwianRpIjoiNTFlOTZlZWItY2I4Ni00ODg0LThhNmEtNDFlY2NjZTUwMzJjIiwidXNlcm5hbWUiOiIxMjMifQ.1TaITaPyEMoRyacXjd1DeTUB4tVyiyOOdgbKZtlmFBA'
export default {
  // 根据提供的接口获取站点列表
  // 获取站点弹出框相关信息
  getpopularData: function (getDataUrl, data, callBack) {
    axios.get(getDataUrl, {
      params: data
    }
    ).then(function (response) {
      if (response.status == 200) {
        callBack(response.data)
      }
    })
      .catch(function (error) {
        console.log('站点弹出信息获取失败！详情：' + error)
      })
  },
  getpopularData_nostatue: function (getDataUrl, data, callBack) {
    axios.get(getDataUrl, {
      params: data
    }
    ).then(function (response) {
        callBack(response)
    })
      .catch(function (error) {
        console.log('站点弹出信息获取失败！详情：' + error)
      })
  },
  getpopularData_realtime: function (getDataUrl, data, callBack) {
    axios.get(getDataUrl, {
      params: data
    }
    ).then(function (response) {
      if (response.status == 200) {
        callBack(response.data,response.realTimeData)
      }
    })
      .catch(function (error) {
        console.log('站点详细信息获取失败！详情：' + error+"请求地址："+getDataUrl)
      })
  },
  // 从端口8098获取部门列表方法
  getpopularData8098: function (getDataUrl, data, callBack) {
    axios.defaults.headers.common['Authorization'] = token2
    axios.get(getDataUrl).then(function (response) {
      if (response.code == 0) {
        callBack(response.data)
      }else{
        let backdata={"code":1,"mydata":response.message};
        callbackify(backdata);
      }
    })
      .catch(function (error) {
        console.log('部门列表获取失败，原因：' + error)
        let backdata = {'code': 1, 'mydata': error}
        callbackify(backdata)
      })
  },
  // 取消报警警报
  close_warm: function (getDataUrl, data) {
    let mytext = JSON.stringify(data)
    axios.post(getDataUrl, data).then(function (response) {
      if (response=="success") {
        alert("取消报警成功！");
      }else{
        alert("发生错误，取消警报失败！");
      }
    })
      .catch(function (error) {
        alert("发生错误，取消警报失败！");
      })
  },
  // 发送排查、管控信息方法
  sendstationinfo: function (getDataUrl, data, callBack,kind) {
    axios.defaults.headers.common['Authorization'] = token2
    let mytext = JSON.stringify(data)
    var params = new URLSearchParams();
    if(kind=="paicha"){
      params.append('addScreeningTaskJosn', mytext);
    }else{
      params.append('addControlsTaskJson', mytext);
    }
    axios.post(getDataUrl, params).then(function (response) {
      if (response.status == 200) {
        callBack(response.data)
      }else{
        let backdata={"code":1,"mydata":response.data.message};
        callBack(backdata);
      }
    })
      .catch(function (error) {
        console.log('表单提交失败' + error.response.data.message);
        let backdata={"code":1,"mydata":error};
        callBack(backdata);
      })
  },
  // 获取站点列表：国控/省控/市控/微型  采用下面同一个接口
  getStationListImpl: function (getDataUrl, data, callBack) {
    // axios.defaults.headers.common['Authorization'] = token;
    axios.get(getDataUrl, {
      params: data
    }
    ).then(function (response) {
      if (response.status == 200) {
        callBack(response.data)
      }
    })
      .catch(function (error) {
        console.log('站点列表获取失败！详情：' + error)
      })
  },
  // 获取站点类型
  getStationTypeList: function (getDataUrl, data,callBack) {
    axios.get(getDataUrl, {
      params: data
    }
    ).then(function (response) {
      if (response.status == 200) {
        callBack(response.data)
      }
    })
      .catch(function (error) {
        console.log('站点类型获取失败！详情：' + error)
      })
  },
  // 污染事件
  getWrEventList: function (getDataUrl, data, callBack) {
    axios.defaults.headers.common['Authorization'] = token2
    let mytext = JSON.stringify(data)
    var params = new URLSearchParams()
    //传参参数
    params.append('selectEventJson', mytext)
    axios.post(getDataUrl, params).then(function (response) {
      if (response.code == 0) {
        callBack(response.data)
      }
      else{
        console.log('污染事件获取失败')
      } 
    })
      .catch(function (error) {
        console.log('污染事件获取失败' + error)
      })
  }
}
