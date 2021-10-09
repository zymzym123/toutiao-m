<template>
  <div>
    <van-cell title="搜索历史">
      <div v-if="isDelete">
        <!--
          porp 如果是引用数据可以修改，注意这个修改指的是user.name='jack'
          sarr.push(213)

          但是任何prop数据都不能重新赋值，
          如果想要prop数据，让父组件来操作
          -->
        <span @click="$emit('update-histories', [])">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDelete = false">完成</span>
      </div>
      <van-icon
        name="delete"
        v-else
        @click="isDelete = true"
      ></van-icon>
    </van-cell>
    <van-cell
      v-for="(history, index) in searchHistories"
      :key="index"
      :title="history"
      @click="onDelete(history,index)"
    >
      <van-icon
        name="close"
        v-show="isDelete"
      ></van-icon>
    </van-cell>
  </div>
</template>

<script>
// import { setItem } from '@/utils/storage'

export default {
  name: 'search-history',
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDelete: false
    }
  },
  created () {
  },
  methods: {
    onDelete (history, index) {
      if (this.isDelete) {
        return this.searchHistories.splice(index, 1)
        // 持久化处理
        // 1.修改本地存储数据
        // 2.删除线上存储数据
        // 无论是否登入，删除
        // setItem('search-histories', this.searchHistories)
      }
      this.$emit('search', history)
    }
  }
}
</script>

<style scoped lang="less">

</style>
