//
import router from './router'
router.beforeEach(function (to, from, next) {
  // 如果要去的地方地址以/home为起始，就说明需要判断当前是不是登陆 判断token‘
  if (to.path.startsWith('/home')) {
    let token = window.localStorage.getItem('user-token')
    if (token) {
      // 放行
      next()
    } else {
      next('/login')
    }
  } else {
    // 如果没有/home 可以认为你是安全的 不需要控制的页面
    next()
  }
})
// 将router暴露出来
export default router
