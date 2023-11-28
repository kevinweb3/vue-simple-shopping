/*
 * 入口文件
 * @Author: kevin256
 * @LastEditors: kevin256
 */

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Global from './Global'
import Axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI);
Vue.use(Global);
Vue.prototype.$axios = Axios;
//console.log();

//全局请求拦截器
Axios.interceptors.request.use(config => {
// Do something before request is sent
  return config;
},error => {
// Do something with request error
  router.push({path: '/error'});
  return Promise.reject(error);
});

// 全局响应拦截器
Axios.interceptors.response.use(response => {
// Do something before response is sent
  if(response.data.code === "401"){
      Vue.prototype.notifyError(response.data.msg);
      store.dispatch("setShowLogin", true);
  }
  if(response.data.code === "500"){
      router.push({path: "/error"});
  }
  return response;
},error => {
// Do something with response error
router.push({path: "/error"});
  return Promise.reject(error);
});

// 全局拦截器,在进入需要用户权限的页面前校验是否已经登录
router.beforeResolve((to, from, next) => {
  const loginUser = store.state.user.user;
  if(to.meta.requireAuth){
    if(!loginUser){
      store.dispatch("setShowLogin", true);
      if(from.name === null){
          next("/");
          return;
      }
      next(false);
      return;
    }
  }
  next();
});

// 相对时间过滤器,把时间戳转换成时间
// 格式: 2020-02-25 21:43:23
Vue.filter('dateFormat', (dataStr) => {
  var time = new Date(dataStr);
  function timeAdd0 (str) {
    if (str < 10) {
      str = '0' + str;
    }
    return str;
  }
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y + '-' + timeAdd0(m) + '-' + timeAdd0(d) + ' ' + timeAdd0(h) + ':' + timeAdd0(mm) + ':' + timeAdd0(s);
});

//导入和注册全局组件
import MyMenu from '@/components/MyMenu.vue'
import MyList from '@/components/MyList.vue'
import MyLogin from '@/components/MyLogin.vue'
import MyRegister from '@/components/MyRegister.vue'

// Vue.use(MyMenu);
// Vue.use(MyList);
// Vue.use(MyLogin);
// Vue.use(MyRegister);
Vue.component("MyMenu", MyMenu);
Vue.component("MyList", MyList);
Vue.component("MyLogin", MyLogin);
Vue.component("MyRegister", MyRegister);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
