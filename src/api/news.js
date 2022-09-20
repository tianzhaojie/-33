import request from '@/utils/request'

// 所有有关于新闻的接口

/**
 * 获取文章
 * @param {String | Number} id 频道的id
 * @param {Number} timestamp   请求新的推荐数据读取的时间戳
 * @returns
 */
export const getArticle = (id, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: id,
      timestamp
    }
  })
}

// 获取文章详情
export const getDetailAPI = (id) => {
  return request({
    url: `/v1_0/articles/${id}`
  })
}

// 获取评论或评论回复
export const getCommentsAPI = (params) => {
  return request({
    url: '/v1_0/comments',
    params
  })
}

// 对文章进行评论
export const makeACommentAPI = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}
// 关注用户
export const FocusonAPI = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data
  })
}
// 取消关注
export const delFocusonAPI = (id) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${id}`
  })
}
// 收藏文章
export const collectAPI = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data
  })
}
// 取消收藏
export const delcollectAPI = (id) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${id}`
  })
}
// 对文章点赞
export const setlikeAPI = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data
  })
}
// 取消文章点赞
export const delsetlikeAPI = (id) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${id}`
  })
}
// 对评论或回复进行点赞
export const setCommentLikeAPI = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data
  })
}
// 取消对评论或回复进行点赞
export const delCommentLikeAPI = (id) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${id}`
  })
}
