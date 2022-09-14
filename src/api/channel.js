// 关于频道的接口

import request from '@/utils/request'
/**
 * 获取用户自己的频道
 * @returns promise
 */
export const getChannelAPI = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}

// 获取所有频道
export const getAllChannelsAPI = () => {
  return request({
    url: '/v1_0/channels'
  })
}

// 删除频道

export const delChannelAPI = (id) => {
  return request({
    url: `/v1_0/user/channels/${id}`,
    method: 'DELETE'
  })
}

/**
 *
 * @param {String | Number} id 新增频道id
 * @param { Number} seq 新增频道添加的索引值
 * @returns
 */
// 新增频道
export const addChannelAPI = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}
