<template>
  <div class="searchSuggestion">
    <van-cell
      icon="search"
      v-for="(item, index) in suggestions"
      :key="index"
      @click="$emit('search', item)"
    >
      <div slot="title" v-html="highlight(item)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'
// 函数防抖

export default {
  name: 'search-suggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: [],
      htmlStr: 'hello <span style="color:#ff0000">word</span>'
    }
  },
  // watch侦听
  watch: {
    // 属性名，要监视的数据的名称
    // searchText (searchText) {
    //   console.log(searchText)
    // }
    searchText: {
      handler: debounce(async function () {
        const { data } = await getSearchSuggestions(this.searchText)
        this.suggestions = data.data.options
      }),
      // 找到数据接口
      // 请求获取数据
      // 模板绑定展示
      immediate: true
      // 该回调将会在侦听开始之后被立即调用
    }
  },
  created () {
  },
  methods: {
    highlight (item) {
      // a /a/gi, vue /vue/gi
      // 正则表达式 /中间的内容/都会当做正则匹配模式字符来对待

      // /this.searchText/gi错误写法
      // RegExp 是正则表达式的构造函授
      // 参数1 字符串
      // 参数2 匹配模式
      // 返回值：正则对象
      return item.replace(
        new RegExp(this.searchText, 'gi'),
        `<span style="color:red">${this.searchText}</span>`)
    }
  }
}
</script>

<style scoped lang="less">

</style>
