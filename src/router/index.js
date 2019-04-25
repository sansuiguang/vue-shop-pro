import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Welcome from '@/components/Welcome'
import User from '@/components/User'

Vue.use(Router)
const router = new Router({
  routes: [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [{
      path: '/welcome',
      component: Welcome
    },
    {path: '/users', component: User}]
  }
  ]
})
// 设置路由守卫
router.beforeEach((to, from, next) => {
  // home/路由需要token的存在支持(表示用户处于登录状态)
  var token = window.sessionStorage.getItem('token')
  if (token === null && to.path !== '/login') {
    return next('/home')
  }
  next() // 请继续
})
export default router
