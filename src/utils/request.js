import axios from 'axios'

// axios.default.baseURL = 'http://toutiao.itheima.net'

// 克隆axios const request = axios.create() 防止有多个基准地址
const request = axios.create({
  timeout: 5000,
  baseURL: 'http://toutiao.itheima.net'
})

export default request
