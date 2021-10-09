module.exports = {
  plugins: {
    // 配置浏览器的级
    autoprefixer: {
      browsers: ['Android >= 4.0', 'iOS >= 8']
    },
    'postcss-pxtorem': {
      // 正常情况下 按照你的设计稿来
      // 750的宽设计稿：750/10 75
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
