import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
Vue.use(Router)
const router = new Router({
  routes: [
    {path: '/login', component: Login},
    {path: 'home', component: Home}
  ]
})
// 设置路由守卫

router.beforeEach((to, from, next) => {
  // home/路由需要token的存在支持(表示用户处于登录状态)
  var token = window.sessionStorage.getItem('token')
  if (!token && to.path !== '/login') {
    return next('/login')
  }
  next() // 请继续
})
export default new Router({

  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home
    }
  ]
})
