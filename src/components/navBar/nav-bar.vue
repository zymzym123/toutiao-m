<template>
  <div>
  <van-nav-bar title="标题" left-text="返回" left-arrow>
    <slot name="title"></slot>
  </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'nav-bar',
  data () {
    return {
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>
