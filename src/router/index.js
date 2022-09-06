import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 路由懒加载 使用页面再去请求
const routes = [
  {
    path: '/login',
    component: () => import('@/views/login')
  }
]

const router = new VueRouter({
  routes
})

export default router
