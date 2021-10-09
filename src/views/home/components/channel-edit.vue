<template>
  <div class="channel-edit">
    <!--我的频道-->
    <van-cell center :border="false">
      <div
        slot="title"
        class="channel-title"
      >我的频道</div>
      <van-button
        type="danger"
        plain
        round
        size="mini"
        @click="isEdit = !isEdit"
      >{{ isEdit ? '完成' : '编辑' }}</van-button>
    </van-cell>
    <!--:class="{active,index} in userChannels"-->
    <van-grid :gutter="10">
      <van-grid-item
        v-for="(channel, index) in userChannels"
        :icon="(isEdit && index !== 0) ? 'clear' : ''"
        :key="index"
        :text="channel.name"
        class="grid-item"
        :class="{ active: index === active }"
        @click="onUserChannelClick(channel,index)"
      >
      </van-grid-item>
    </van-grid>
    <!--频道推荐-->

    <van-cell center :border="false">
      <div slot="title" class="channel-title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name"
        class="grid-item"
        @click="onAdd(channel)"
      >
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannels, deleteUserChannels } from '@/api/channels'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'

export default {
  name: 'channel-edit',
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  components: {},
  data () {
    return {
      allChannels: [], // 所有频道列表
      isEdit: false
    }
  },
  computed: {
    ...mapState(['user']),
    // 推荐频道
    // 计算属性会观测内部依赖数据的变化而变化
    recommendChannels () {
      // 所有的频道减去我的频道
      // filter方法：过滤数据，根据方法返回的布尔值 true来收集数据
      // filter 返回查找满足所有的元素
      return this.allChannels.filter(channel => {
        // 判断channel是否属于我的频道
        // find 方法查找满足条件的单个元素
        return !this.userChannels.find(userChannel => {
          // 找到满足要查找的元素
          return userChannel.id === channel.id
        })
      })
      // 利用for循环
    //   const arr = []
    //   this.allChannels.forEach(channel => {
    //     let flag = false
    //     for (let i = 0; i < this.userChannels.length; i++) {
    //       if (this.userChannels[i].id === channel.id) {
    //         // 所有的频道中的频道属于用户频道
    //         flag = true
    //         break
    //       }
    //     }
    //     if (!flag) {
    //       arr.push(channel)
    //     }
    //   })
    //   return arr
    }
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
      console.log(data)
    },
    async onAdd (channel) {
      this.userChannels.push(channel)
      // 数据持久化
      if (this.user) {
        // 登录了，数据存储到线上
        await addUserChannels({
          channels: [
            { id: channel.id, seq: this.userChannels.length }
          ]
        })
      } else {
        // 没有登录，则储存在本地
        setItem('user-channels', this.userChannels)
      }
    },
    onUserChannelClick (channel, index) {
      // 如果是编辑状态。 删除频道
      // 非编辑专题。切换频道
      if (this.isEdit && index !== 0) {
        // 编辑状态，删除频道
        this.deleteChannel(channel, index)
      } else {
        // 非编辑状态，切换频道
        this.switchChannel(index)
        this.isEdit = false
      }
    },
    async deleteChannel (channel, index) {
      // 如果删除当前激活频道之前的频道，你的index
      if (index <= this.active) {
        // 更新激活频道的索引
        this.$emit('update-active', this.active - 1)
      }
      this.userChannels.splice(index, 1)
      if (this.user) {
        // 登录了，持久化
        await deleteUserChannels(channel.id)
      } else {
        // 没有登录，持久到本地
        setItem('user-channels', this.userChannels)
      }
    },
    switchChannel (index) {
      console.log('切换频道')
      // 切换频道
      this.$emit('update-active', index)
      // 关闭图层
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit{
  padding-top: 54px;
  .channel-title{
    font-size: 16px;
    color: #333;
  }
  .grid-item{
    width: 80px;
    height: 43px;
    border: none;
    /deep/ .van-grid-item__content{
      background: #f4f5f6;
      .van-grid-item__text{
        font-size: 14px;
        color: #222;
        margin-top: 0;
      }
    }
    /deep/ .van-grid-item__icon{
      position: absolute;
      top: -5px;
      right: -5px;
      font-size: 20px;
      color: #ccc;
    }
  }
  .active{
    /deep/ .van-grid-item__text{
      color: red !important;
    }
  }
}
</style>
