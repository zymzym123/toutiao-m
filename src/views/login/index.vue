<template>
  <div class="login-content">
    <van-nav-bar title="登入/注册" left-arrow @click-left="$router.back()"></van-nav-bar>
    <!--登入表单-->
    <van-form @submit="onLogin" :show-error="false" :show-error-message="false" @failed="onFailed" validate-first ref="login-form">
      <van-cell-group inset>
        <van-field
          v-model="form.mobile"
          icon-prefix="toutiao"
          left-icon="shouji"
          name="mobile"
          placeholder="请输入手机号"
          :rules="formRules.mobile"
        />
        <van-field
          v-model="form.code"
          clearable
          center
          name="code"
          icon-prefix="toutiao"
          left-icon="yanzhengma"
          placeholder="请输入短信验证码"
          :rules="formRules.code"
          class="vanFie"
        >
          <template #button>
            <van-count-down  v-if="isCountDownShow" :time="1000 * 60" format="sss后重新获取" @finish = 'isCountDownShow = false' />
            <van-button  class="send" v-else size="small" round :loading="isSendSmsLoading" @click.prevent="onSendSms" >发送验证码</van-button>
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin:26px 16px;">
        <van-button  block type="primary" native-type="submit" >
          登录
        </van-button>
      </div>
    </van-form>
    <!--/登入表单-->
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
// import { Toast } from 'vant'

export default {
  name: 'LoginIndex',
  components: {

  },
  data () {
    return {
      form: {
        mobile: '',
        code: ''
      },
      formRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确手机号码' }],
        code: [
          { required: true, message: '请输入短信验证码' },
          { pattern: /^\d{6}$/, message: '请输入正确验证码' }]
      },
      isCountDownShow: false, // 控制倒计时和发送按钮显示状态
      isSendSmsLoading: false // 发送按钮
    }
  },
  created () {
  },
  methods: {
    async onLogin () {
      // Toast.loading({
      this.$toast.loading({
        message: '登录中...', // 提升文本
        forbidClick: true, // 禁止点击背景
        loadingType: 'spinner', // 自定义图标
        duration: 0 // 展示时间，当为0时，load将不会关闭，会一直在
      })
      // 1找到数据接口
      // 2封装请求方法
      // 3请求调用登录
      // 4处理响应结果
      try {
        const { data } = await login(this.form)
        // Toast.success('登录成功')
        this.$toast.success('登录成功')
        // 将后端返回的用户登录状态（token等数据）放到vuex容器中
        this.$store.commit('setUser', data.data)
        // 登入成功跳转回原来页面
        this.$router.back() // 这种方式有问题，不太好
      } catch (err) {
        console.log(err)
        // Toast.fail('登入失败，手机号或验证码错误')
        this.$toast.fail('登入失败，手机号或验证码错误')
      }
    },
    // 当form表单提交关闭错误提示时，就需要调用这个onFailed
    onFailed (error) {
      if (error.errors[0]) {
        // 想要设置提示框位置时，要用对象形式
        this.$toast({
          message: error.errors[0].message,
          // 错误提示框位置 position
          position: 'top'
        })
      }
    },
    // 验证码
    async onSendSms () {
      try {
        await this.$refs['login-form'].validate('mobile')
        // 验证通过
        this.isSendSmsLoading = true // 显示按钮的loading状态，防止网络用户多次点击触犯发送行为
        const res = await sendSms(this.form.mobile)
        console.log(res)
        // 短信发出去，显示倒计时
        this.isCountDownShow = true
        // 倒计时结束时 运用监听$finish事件处理
      } catch (err) {
        let message = '' // eslint-disable-line no-unused-vars
        // try 里面错误代码都会进入catch里面
        // 不同的错误需要有不同的提示，那就需要判断了
        if (err && err.response && err.response.status === 429) {
          message = '发送太频繁了，请稍后重试'
        } else if (err.name === 'mobile') {
          // 验证失败
          message = err.message
        } else {
          message = '发送失败，未知的错误'
        }
        this.$toast({
          message,
          position: 'top'
        })
      }
      this.isSendSmsLoading = false // 无论发送验证失败还是成功都要关闭loading状态
      // this.$refs['login-form'].validate('mobile').then(data => {
      //   console.log(data)
      //   this.$tosat(error.errors[0].message)
      // })
      // 当输入正确手机号验证
      // 验证通过 -》 请求发送验证码 -》 用户接收验证码 -》输入验证码 -》 请求登入
      // 请求发送验证码 -》隐藏发送按钮 -》显示倒计时
      // 倒计时结束  -》隐藏倒计时 -》显示发送验证码按钮
    }
  }
}
</script>

<style scoped lang="less">

.van-cell-group--inset{
  margin: 0;
}
.van-button--primary{
  background: #6db4fb;
  border: none;
  font-size: 15px;
}
.vanFie{
  height: 40px;
}
.send{
  width: 96px;
  height: 23px;
  line-height: 23px;
  background: #ededed;
  font-size: 11px;
  color: #666;vertical-align: middle
}
.van-count-down{
  height: 23px;
  line-height: 23px;
  border:1px solid #fff;
  font-size: 11px;
}
</style>
