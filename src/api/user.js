import request from '@/utils/request'
// 非组件模块。store必须通过这种方式
// import store from '@/store/'

// 登录/注册
export const login = data => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}
// 短信验证码
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}
// 获取用户信息
export const getCurrentUser = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
// 获取用户频道列表
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
// 获取用户频道列表
export const getUserArticles = () => {
  return request({
    method: 'GET',
    url: '/v1_1/articles'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
