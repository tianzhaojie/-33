import axios from 'axios'
import store from '@/store'
// axios.default.baseURL = 'http://toutiao.itheima.net'

// 克隆axios const request = axios.create() 防止有多个基准地址
const request = axios.create({
  timeout: 5000,
  baseURL: 'http://toutiao.itheima.net'
})

export default request

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  console.log(config)
  const { getters: { islogin }, state: { tokenObj } } = store
  if (islogin) {
    config.headers.Authorization = `Bearer ${tokenObj.token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
