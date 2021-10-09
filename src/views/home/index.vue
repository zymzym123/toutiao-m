<template>
  <div class="home-container">
    <!--    搜索栏-->
    <van-nav-bar>
      <template #title>
        <van-button
          icon="search"
          type="primary"
          round
          class="search-btn"
          to="/search"
        >
          搜索
        </van-button>
      </template>
    </van-nav-bar>
    <!--    文章频道列表-->
    <!--    标签页组件有一个功能，只有你第一次查看标签的时候才会渲染里面的内容-->
    <van-tabs v-model="active" class="channel-tabs">
      <van-tab
        v-for="item in channels"
        :key="item.id"
        :title="item.name"
      >
        <article-list :chanerl="item">
        <!-- 文章列表-->
        </article-list>
      </van-tab>
      <!--为了按钮定位把列表挡住了 解决办法添加暂位元素-->
      <div slot="nav-right" class="nav-right-not"></div>
      <div slot="nav-right"
           @click="show = true"
           class="wap-nav-wrap"
      >
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
    <!-- /文章频道列表-->
    <van-popup
      closeable
      close-icon-position="top-left"
      v-model="show"
      position="bottom"
      class="channel-edit-popup"
      get-container="body"
      style="height:100%"
    >
      <!--模板中$event 表示事件参数-->
      <channelEdit
      :user-channels="channels"
      @close="show=false"
      @update-active="active = $event"
      :active="active"
      ></channelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
import channelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'

export default {
  name: 'HoemIndex',
  components: {
    ArticleList,
    channelEdit
  },
  data () {
    return {
      active: 0,
      channels: [],
      show: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      let channels = []
      // const { data } = await getUserChannels()
      // this.channels = data.data.channels
      if (this.user) {
        // 已登录，请求获取线上的用户频道列表
        const { data } = await getUserChannels()
        channels = data.data.channels
      } else {
        // 没有登录
        const localChannels = getItem('user-channels')
        if (localChannels) {
          channels = localChannels
        } else {
          // 用户没有登入，也没有本地存储频道列表，那就请求获取没人推荐的频道列表
          const { data } = await getUserChannels()
          channels = data.data.channels
        }
      }
      this.channels = channels
    },
    showPopup () {
      this.show = true
    }
    // onUpdateActive (index) {
    //   this.active = index
    // }
  }
}
</script>

<style scoped lang="less">
.home-container{
  /deep/.van-nav-bar__title{
    max-width: unset;
  }
  //搜索栏
  .search-btn{
    width: 277px;
    height: 32px;
    background: #5babfa;
    border: none;
    .van-button__icon{
      font-size: 16px;
    }
    .van-button__text{
      font-size: 14px;
    }
  }
  .channel-tabs{
    /deep/ .van-tab{
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
    }
    /deep/ .van-tabs__line{
      width: 15px !important;
      height: 3px;
      background: #3296fa;
      bottom: 20px;
    }
  }
  .wap-nav-wrap{
    position: fixed;
    right: 0;
    height: 43px;
    width: 33px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.9;
    .van-icon{
      font-size: 24px;
    }
    &:before{
      content:'';
      width: 1px;
      height: 43px;
      //background: url("./line.png") no-repeat;
      //background-size:contain ;
      position: absolute;
      background: #f4f4f4;
      left: 0;
      top: 0;
    }
  }
  .nav-right-not{
    width: 33px;
    flex-shrink: 0;
  }
}
.channel-edit-popup{
  height: 100%;
}
</style>
