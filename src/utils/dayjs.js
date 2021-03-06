import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用处理相对时间
dayjs.extend(relativeTime)
// 配置使用中文语言包
dayjs.locale('zh-cn')
// 例如日期格式化
// console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'))
// console.log(dayjs('2021-09-26 15:30').from(dayjs()))
// 做一个过滤器
Vue.filter('relativeTime', value => {
  return dayjs().from(dayjs(value))
})
