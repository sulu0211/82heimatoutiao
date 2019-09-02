import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import router from './permission'
import ElementUI from 'element-ui'
import axios from 'axios'
import Component from './components' // 自定义组件
import 'element-ui/lib/theme-chalk/index.css' // 引入样式

import './style/index.less' // 给Vue对象的原型属性赋值 那么所有vue实例自动拥有$axios
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 赋值基础地址
Vue.prototype.$axios = axios // 给Vue对象的原型属性赋值 那么所有vue实例自动拥有$axios

Vue.config.productionTip = false
Vue.use(ElementUI) // 全局注册ElementUI组件 任意位置都可以使用
Vue.use(Component) // 全局祖册自定组件
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
