import request from '@/utils/request'

export const getSuggestionsAPI = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

// 获取搜索结果
export const getResultsAPI = (/* eslint-disable */page,per_page,q) => {
  return request({
    url:'/v1_0/search',
    params:{
      page,
      per_page,
      q
    }
  })
}