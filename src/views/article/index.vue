<template>
  <div class="article-container">
    <van-nav-bar
      class="app-nav-bar"
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>
    <h1 class="title">牛逼程序员都用的开源工具，你用了几个？</h1>
    <van-cell center class="user-info">
      <div slot="title" class="name">天涯小镖客</div>
      <van-image
        class="avatar"
        slot="icon"
        round
        flt="cover"
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
      ></van-image>
      <div slot="label" class="pubdate">14小时前</div>
      <van-button
        type="info"
        round
        size="small"
        class="follow-btn"
        icon="plus"
      >关注</van-button>
    </van-cell>
    <div class="content markdown-body">
      <p>hello</p>
      <p>word</p>
    </div>
  </div>
</template>

<script>
// 在组件中获取动态路由参数
// 方式一 this.$route,params.xxx
// 方式二 props传参
import './github-markdown.css'
import { getArticleId } from '@/api/articles'
export default {
  name: 'index',
  components: {},
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {}
  },
  watch: {},
  created () {
    this.loadArticle()
  },
  methods: {
    async loadArticle () {
      const { data } = await getArticleId(this.articleId)
      console.log(data)
    }
  }
}
</script>

<style scoped lang="less">

  .title{
    font-size: 20px;
    color: #3a3a3a;
    padding:14px;
    background: #fff;
    margin: 0;
  }
  .user-info{
    .avatar{
      width: 35px;
      height: 35px;
      margin-right: 8px;
    }
    .name{
      font-size: 12px;
      color: #333;
    }
    .pubdate{
      font-size: 12px;
      color: #b4b4b4;
    }
    .follow-btn{
      width: 85px;
      height: 29px;
    }
  }
  .markdown-body{
    padding: 14px;
    background: #fff;
  }
</style>
