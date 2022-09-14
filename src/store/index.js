import Vue from 'vue'
import Vuex from 'vuex'
// import { getItem, setItem } from '@/utils/storage'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
// const TOKEN_KEY = 'TOUTIAO_USER'

// vuex-persistedstate
// 下载包 yarn add vuex-persistedstate@3.2.1
// 引入 import create
// 调用 plugins:[createPersistedState(
//   {
// key: 'HEIMA-TOUTIAO'// 设置key名字本地存储名字
// storage: window.sessionStorage // 设置存贮位置,
// reducer 是一个函数指定持久化哪些数据 return一个对象 对象作为存储的value
//   }
// )]
// 存到本地key默认值为vuex
export default new Vuex.Store({
  plugins: [createPersistedState({
    key: 'HEIMA-TOUTIAO', // 设置key名字本地存储名字
    // storage: window.sessionStorage // 设置存贮位置
    reducer(state) { // 可以拿到state里面的数据 可以指定存哪些数据  不写就是全部存
      console.log(state)
      const { tokenObj, myChannels } = state
      return { tokenObj, myChannels }
    }
  })],
  state: {
    // 一个对象,存储当前登录用户信息
    tokenObj: {
    },
    myChannels: []
  },
  getters: {
    // 定义的计算属性标识有没有登录
    islogin(state) {
      return !!state.tokenObj.token
    }
  },
  mutations: {
    setUser(state, data) {
      state.tokenObj = data
      // 防止数据丢失存到本地
    },
    /**
     *
     * @param {*} state
     * @param {*} channels 传的是经过筛选后的数组
     */
    setMyChannels(state, channels) {
      state.myChannels = channels
    }
  },
  actions: {
  },
  modules: {
  }
})

// vuex声明变量
//  - 声明: 在state里
//  - 取: $store.state.属性名

// vuex修改数据
// - 自产自销
// - 规范: 函数命名采用大驼峰
// - mutations: 函数
// - mutations里的函数的参数
//  - state: 数据
//  - payload: 载荷,触发mutation的参数

// 触发mutations里面的方法
// - this.$store.commit('mutation方法名字',参数)

// getters  --> 相当于computed计算属性
// getters的函数 第一个参数是state
