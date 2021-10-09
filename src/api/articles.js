import request from '@/utils/request'

// 获取文章列表
export const getArtiles = params => {
  return request({
    method: 'GET',
    url: '/v1_1/articles',
    params
  })
}
export const getArticleId = articleId => {
  return request({
    method: 'GET',
    url: `/v1_0/articles/${articleId}`
  })
}
