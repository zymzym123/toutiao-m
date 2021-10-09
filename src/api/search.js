// 搜索请求相关模块
import request from '@/utils/request'

export const getSearchSuggestions = q => {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

export const getSearchResult = params => {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}

// 获取用户搜索历史
export const getSearchHistories = params => {
  return request({
    method: 'GET',
    url: '/v1_0/search/histories',
    params
  })
}
