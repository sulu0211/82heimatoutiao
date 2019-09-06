import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home'
import Login from './views/login'
import Main from './views/home/main.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/login',
    component: Login
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [{
      path: '', // 默认的二级路由的地址path为空串
      component: Main
    },
    {
      path: '/home/comment',
      component: () => import('./views/comment')
    }, {
      // 内容管理
      path: '/home/articles',
      component: () => import('./views/articles')
    }, {
      path: '/home/material',
      component: () => import('./views/material')
    }, {
      // 发布文章
      path: '/home/publish',
      component: () => import('./views/publish')
    }, {
      path: '/home/account',
      component: () => import('./views/account')
    }, {
      // 修改文章
      path: 'publish/:articledId', // 定义动态路由参数
      component: () => import('./views/publish')
    }]
  }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
