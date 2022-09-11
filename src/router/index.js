import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
/* webpackChunkName: "新名字" */ // 魔法注释
// 路由懒加载 使用页面再去请求
const routes = [
  {
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/ ', //  / 为拼接的路径
    children: [
      {
        path: ' ', // 空格会自动省略首页得重定向 默认子路由
        component: () => import('@/views/Home')
      },
      {
        path: 'video',
        component: () => import(/* webpackChunkName: "base" */'@/views/video') // 请求时是名字为base不再是路径的名字src/views/video
      },
      {
        path: 'profile',
        component: () => import(/* webpackChunkName: "base" */'@/views/My') // 两个名字一样点击的时候只会请求一次减少请求次数   两个组件内容较小时使用
      },
      {
        path: 'qa',
        component: () => import('@/views/QA')
      }
    ] // 懒加载
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  }

]

const router = new VueRouter({
  routes
})

export default router
