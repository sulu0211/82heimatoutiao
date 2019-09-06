// 放置axios拦截器 请求拦截器和响应拦截器
import axios from 'axios'
import router from '../permission'
import { Message } from 'element-ui' // 单独引入提示消息
import jsonBigInt from 'json-bigint'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'// 赋值基本地址

// 统一处理大数字类型
axios.defaults.transformResponse = [function (data) {
  // data 响应回来的字符串
//  debugger
  // return JSON.parse(data)

  return data ? jsonBigInt.parse(data) : {}
}]

// 请求拦截器

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
  // debugger
  // console.log(response)
  return response.data ? response.data : {}
}, function (error) {
  // 对响应错误做处理
  let status = error.response.status
  let message = ''
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      message = '用户非实名认证用户，无权限登录'
      break
    case 507:
      message = '服务器或数据库异常'
      break
    case 404:
      message = '手机号不正确'
      break
    case 401:
      window.localStorage.clear() // 因为token有可能过期 清除垃圾token
      router.push('/login')
      break
    default:
      // console.log(error)
      message = '未知错误'
      break
  }
  Message({ type: 'warning', message })
  return new Promise(function () {}) // 直接返回一个promise 表示错误已经被处理掉 相当于强行截止错误
  // return Promise.reject(error)
})
// export default {
//   install (Vue) {
//     Vue.prototype.$axios = axios
//   }
// }
export default axios
