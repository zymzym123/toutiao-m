<template>
  <div class="search-result">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell
            v-for="(article, index) in list"
            :key="index"
            :title="article.title" />
        </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'search-result',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      articlesList: [],
      page: 1,
      perPage: 10
    }
  },
  methods: {
    async onLoad () {
      // 1.请求获取数据
      const { data } = await getSearchResult({
        page: this.page, // 页码
        per_page: this.perPage, // 每页大小
        q: this.searchText // 搜索的字符
      })
      // 2.将数据放到数据列表中
      const { results } = data.data
      this.list.push(...results)

      // 3.关闭本次的loading
      this.loading = false
      // 4.如果是否还有数据
      if (results.length) {
        this.page++
      } else {
        this.finished = true
      }
      // 如果有，则更新获取下一页数据的页码
      // 如果没有，则把finished设置为true， 关闭加载更多
    }
  }
}
</script>

<style scoped lang="less">
.search-result{
  position: fixed;
  width: 100%;
  top: 54px;
  left: 0;
  bottom: 0;
  overflow-y: auto;
}
</style>
