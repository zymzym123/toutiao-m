import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
const USER_KEY = 'toutiao-user'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY) // 当前登入用户的登录状态
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 为了防止页面刷新数据丢失,我们还需要存本地,这个仅仅为了持久化数据
      // window.localStorage.setItem('user', JSON.stringify((state.user)))
      setItem(USER_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
