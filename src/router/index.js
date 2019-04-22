import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
Vue.use(Router)
const router = new Router({
  routes:[
    {path:'/login',component:Login},
    {path:'home',component:Home}
  ]
})
// 设置路由守卫
router.beforeEach((to,from,naxt) => {
  // 当前用户没有登录系统，并且还在访问非登录路由，就强制执行登录路由
  var token = window.sessionStorage.getItem('token')
  if (!token && to.path!=='/login') {
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
