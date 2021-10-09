// 频道相关的模块
import request from '@/utils/request'

// 所有的频道列表
export const getAllChannels = params => {
  return request({
    method: 'GET',
    url: '/v1_0/channels',
    params
  })
}
// 修改频道列表
export const addUserChannels = data => {
  return request({
    method: 'POST',
    url: '/v1_0/user/channels',
    data
  })
}
// 删除指定频道列表
export const deleteUserChannels = channelId => {
  return request({
    method: 'DELETE',
    url: `v1_0/user/channels/${channelId}`
  })
}
