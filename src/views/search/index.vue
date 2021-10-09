<template>
  <div class="search-container">
    <!--    搜索栏-->
    <form action="/">
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch(searchText)"
        @cancel="$router.back()"
        @focus="isResultShow = false"
      />
    </form>
    <!--    搜索结果-->
    <search-result
      v-if="isResultShow"
      :search-text="searchText"
    ></search-result>
    <!--    联想建议-->
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    ></search-suggestion>
    <!--    历史记录-->
    <search-history
      :search-histories="searchHistories"
      @update-histories="searchHistories = $event"
      v-else
      @search="onSearch"
    ></search-history>
  </div>
</template>

<script>
import SearchSuggestion from './components/search-suggestion'
import SearchHistory from './components/search-history'
import SearchResult from './components/search-result'
import { setItem, getItem } from '@/utils/storage'
// import { getSearchHistories } from '@/api/search'
import { mapState } from 'vuex'
export default {
  name: 'index',
  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResult
  },
  data () {
    return {
      searchText: '',
      isResultShow: false, // 控制搜索结果
      searchHistories: getItem('search-histories') || [] // 搜索历史数据
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {
    searchHistories () {
      setItem('search-histories', this.searchHistories)
    }
  },
  created () {
    this.loadSearchHistories()
  },
  methods: {
    async onSearch (searchText) {
      // 把输入框设置为你要搜索的文本
      this.searchText = searchText
      // 触发搜索记录搜索历史记录
      const index = this.searchHistories.indexOf(searchText)
      if (index !== -1) {
        // 把重复项移除掉
        this.searchHistories.splice(index, 1)
      }
      // 把最新搜索记录放在顶部
      this.searchHistories.unshift(searchText)

      // 如果用户已登录，则把搜索历史记录存储到线上，
      // if (this.user) {
      //   const { data } = await getSearchHistories()
      //   console.log(data)
      // }
      // 如果没有登入，则把搜索历史记录存储到本地
      // setItem('search-histories', this.searchHistories)
      this.isResultShow = true
    },

    async loadSearchHistories () {
      // 如果后端给的数据太少，才4个的话，我们可以把本地线上的合并
      // 判断是否登入
      const searchHistories = getItem('search-histories') || [] // eslint-disable-line no-unused-vars
      // if (this.user) {
      //   const { data } = await getSearchHistories()
      //   // console.log(data.data.keywords)
      //   // console.log(localStorage)
      //   // 让
      //   searchHistories = [...new Set([
      //     ...searchHistories,
      //     ...data.data.keywords])]
      // }
      this.searchHistories = searchHistories
    }
  }
}
</script>

<style scoped>

</style>
