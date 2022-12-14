import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入vant
import Vant from 'vant'
import 'vant/lib/index.css'
import 'github-markdown-css'
// 引入font
import '@/assets/fonts/iconfont.css'

// 引入适配
import 'amfe-flexible'
// console.log(store)
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
