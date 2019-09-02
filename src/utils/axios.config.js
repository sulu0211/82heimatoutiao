// 放置axios拦截器 请求拦截器和响应拦截器
import axios from 'axios'
// 请求拦截器
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
axios.interceptors.request.use(function (config) {
  // config 是axios默认请求配置 和传入的配置 结合出来
  // 必须要return config
  let token = window.localStorage.getItem('user-token')
  config.headers['Authorization'] = `Bearer ${token}` // 统一注入token
  // debugger
  return config
}, function () {})

// 响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做处理
  debugger
  return response.data ? response.data : {}
}, function (error) {
  // 对响应错误做处理
  return Promise.reject(error)
})
export default {
  install (Vue) {
    Vue.prototype.$axios = axios
  }
}
