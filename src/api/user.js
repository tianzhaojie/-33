import request from '@/utils/request'

// console.log(store) // 有state
// 划分跟后端接口文档
// 登录请求
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}

// 发送验证码
export const getSmsCode = mobile => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}
// 获取用户信息
export const getUserInfoAPI = () => {
  return request({
    method: 'get',
    url: '/v1_0/user'
    // headers: { Authorization: `Bearer ${store.state.tokenObj.token}` }
  })
}
