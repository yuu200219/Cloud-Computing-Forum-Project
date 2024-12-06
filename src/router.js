import Vue from 'vue'
import Router from 'vue-router'
// import Cookies from 'js-cookie'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('./components/LoginForm.vue'),
      meta: { requireAuth: true }
    }
  ]
})

export default router