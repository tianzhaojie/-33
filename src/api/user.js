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

export const uploadPhoto = (file) => {
  const fm = new FormData()
  fm.append('photo', file) // 属性名photo 值file 保存form表单格式
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fm // 当data值是表单属性时会自动添加对应请求头 是对象时会自动添加json请求头
  })
}
// 获取用户个人资料
export const userInfoAPI = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}
// 编辑用户个人资料
export const editUserInfoAPI = (data) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data

  })
}
