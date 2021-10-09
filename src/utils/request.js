// 封装axios请求模块
import axios from 'axios'
import store from '@/store'
import JSONbig from 'json-bigint'
const request = axios.create({
  baseURL: 'http://toutiao-app.itheima.net/',

  transformResponse: [function (data) {
    try {
      return JSONbig.parse(data)
    } catch (err) {
      console.log('转换失败', err)
      return data
    }
  }]
})
// 请求拦截
// add a request interceptors
request.interceptors.request.use(function (config) {
  const { user } = store.state
  if (user) {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
  // 处理完之后一定要把config发回，否则会失败
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截器
export default request
