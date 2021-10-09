<template>
  <!--  //下拉数据请求数据-->
  <div class="article-list">
    <van-pull-refresh
      v-model="refreshing"
      :success-text="refreshSuccessText"
      :success-duration = "1500"
      @refresh="onRefresh"
    >
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <article-item
        v-for="(item, index) in articlesList"
        :key="index"
        :article="item"
      >
      </article-item>
    </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArtiles } from '@/api/articles'
import articleItem from '@/components/article-item'
export default {
  name: 'article-list',
  components: {
    articleItem
  },
  props: {
    chanerl: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      articlesList: [],
      loading: false,
      finished: false,
      timestamp: null, // 获取下一页数据戳
      refreshing: false, // 下拉刷新
      refreshSuccessText: '' // 下拉刷新成功为空
    }
  },
  methods: {
    async onLoad () {
      // 1.请求获取数据
      const { data } = await getArtiles({
        channel_id: this.chanerl.id, // 频道ID
        timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐指定的时间戳，timesp相当于页码
        with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，包含置顶，0不包含
      })
      // 2.把数据放在articlesList数组中
      const { results } = data.data
      this.articlesList.push(...data.data.results)
      // 3.设置本次加载状态结束，它才可以判断是否需要加载下一次，否则会永远停在这里
      this.loading = false
      // 4.数据全部加载完成
      // 如果还有下一页数据
      if (results.length) {
        // 更新获取下一页数据的页码
        this.timestamp = data.data.pre_timestamp
      } else {
        // 没有数据了，把加载状态设置接受，不再触发加载更多
        this.finished = true
      }
    },
    async onRefresh () {
      // 下拉刷新，组件自己会展示loading状态
      // 1.请求获取数据
      const { data } = await getArtiles({
        channel_id: this.chanerl.id, // 频道ID
        timestamp: Date.now(), // 为了方面学习，只要你传递不同的时间戳就一定给你返回不一样的数据，而且数据不为空
        with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，包含置顶，0不包含
      })
      // 2.把数据放到数据列表中
      const { results } = data.data
      this.articlesList.unshift(...data.data.results)
      // 3.关闭刷新数据列表loading
      // 清空列表数据
      this.refreshing = false
      this.refreshSuccessText = `更新了${results.length}条数据`
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      // this.loading = true
    }
  }
}
</script>

<style scoped lang="less">
  .article-list{
    position: fixed;
    left: 0;
    right: 0;
    top: 90px;
    bottom: 50px;
    overflow-y: auto;
  }
</style>
