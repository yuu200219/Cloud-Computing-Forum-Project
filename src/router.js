// https://hackmd.io/@FortesHuang/SyMAtS6qH#Login-%E7%99%BB%E5%85%A5%E6%A9%9F%E5%88%B6%E5%AF%A6%E4%BD%9C
import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('./views/Login.vue')
    },
    // 其他路由
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: { requireAuth: true }, // 用來作為此頁是否需要權限驗證的設定
      children: [...]
    },
    // ...
  ]
})

export default router