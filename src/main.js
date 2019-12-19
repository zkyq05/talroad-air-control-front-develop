// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import $ from "jquery"
import '../static/css/css/style.css';

import ElementUi from 'element-ui'
import '../theme/index.css'
import BaiduMap from 'vue-baidu-map'
import axios from 'axios'
import App from './App'
import router from './router'
import './styles/font.css'
import echarts from 'echarts'
import { loadScript } from 'esri-loader'
// 引入echars皮肤
import '../static/css/js/echarts-skin'
import DateFormat from './components/common/unit/DateFormat'
import AppConfig from '../static/ApplicationConfig'
import Store from '../src/store/index'
import '../static/css/js/common'

import '../static/css/js/jquery.nicescroll.js'
import store from './store'
Vue.use(ElementUi);
Vue.use(BaiduMap,{
  ak:'N9ZttRqRXqE1ZnxEr17ftskG'
});

Vue.config.productionTip = false

axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (sessionStorage.getItem("token") != null) {// 判断当前的token是否存在 ；
    // console.log("auth认证成功"+sessionStorage.getItem("token"));
      config.headers['Authorization'] = sessionStorage.getItem("token");//'Bearer '+ sessionStorage.getItem("token");
  }
   //config.headers['Authorization'] ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIzMjMxIiwicm9sZUlkIjozLCJ1c2VySWQiOjIsImF1dGhvcml0aWVzIjpbIjMiXSwiY2xpZW50X2lkIjoidGFscm9hZCIsInJlZ2lvbklkIjoyLCJwaG9uZSI6IjE4ODc3Nzc4ODg4IiwicGVyc29ubmVsVHlwZSI6MSwic2NvcGUiOlsic2VydmVyIl0sInVuaXRJZCI6MiwiZXhwIjoxNTcyOTQyOTY2LCJqdGkiOiIyNDM2YmMwMy0wZTg4LTQzNTgtODE4Mi1iOGM0ODI5YTlmNGIiLCJ1c2VybmFtZSI6IjMyMzEifQ.ZFT6Qe-W51ADt3xBJBAcM7QNls2evAYYaV1YTmGBhrk";

    return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

/***********************************************************/
const options = {
    // url: 'https://js.arcgis.com/4.12/'
    url:'/arcGisApi/arcgis_js_api/library/4.11/init.js'
}
loadScript(options)
/*************************************************************/
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    //登录校验不正确跳到登录界面
    switch (response.status) {
        case 50005:
            sessionStorage.removeItem("token")
            router.app.$message.error("重新登录！");
            router.app.$router.push('/');
            return Promise.reject(response);
    }
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth){// 判断该路由是否需要登录权限
    // console.log("当前页面需要校验是否已经登陆");
    if (sessionStorage.getItem("token") != null){// 判断当前的token是否存在 ； 登录存入的token
      next();
    }else {
      next({
        path: '/',
        query:{redirect: to.fullPath}// 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next();
  }
});

//js日期格式化
DateFormat.init();

//引入公共信息文件
// var AppConfig = app_config;
Vue.prototype.AppConfig = AppConfig;
Vue.prototype.Store = Store;
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;
Vue.prototype.IMG_URL = 'http://10.0.200.26/';


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
    store,
  components: { App },
  template: '<App/>'
})
