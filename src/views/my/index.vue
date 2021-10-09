<template>
  <div class="my-container">
    <van-cell-group class="my-info" v-if="user">
      <van-cell :border="false" center class="call-info">
        <template #icon>
          <van-image
            fit="cover"
            round
            class="avatar" :src="currentUser.photo"
          ></van-image>
        </template>
        <template #title>
          <span class="custom-title">{{ currentUser.name }}</span>
        </template>
        <van-button size="small" class="update-btn" round>编辑资料</van-button>
      </van-cell >
      <van-grid :border="false" class="data-info">
        <van-grid-item class="data-info-item">
          <div class="text-warp" slot="text">
            <div class="count">{{currentUser.art_count}}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-warp" slot="text">
            <div class="count">{{ currentUser.follow_count }}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-warp" slot="text">
            <div class="count">{{ currentUser.fans_count }}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-warp" slot="text">
            <div class="count">{{ currentUser.like_count }}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid >
    </van-cell-group>
    <div class="not-login" v-else>
      <img class="login-mobile" src="./mobile.png" alt="" @click="$router.push('./login')">
      <div class="dengLu"  @click="$router.push('./login')"> 登录/注册</div>
    </div>
    <van-grid :column-num="2" class="nav-grid mb-4">
      <van-grid-item class="nav-grid-item" icon-prefix="toutiao" icon="shoucang" text="收藏" />
      <van-grid-item class="nav-grid-item" icon-prefix="toutiao" icon="lishi" text="历程  " />
    </van-grid>

    <van-cell title="消息通知" is-link to="" />
    <van-cell class="mb-4" title="小智同学" is-link to="" />
    <van-cell class="logout-cell" title="退出登录" v-if="user"  to="" style="text-align: center" @click="autoLogin" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getCurrentUser } from '@/api/user'

export default {
  name: 'MyIndex',
  data () {
    return {
      currentUser: {} // 当前登入用户数据
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.loadCurrentUser()
  },
  methods: {
    async loadCurrentUser () {
      const { data } = await getCurrentUser()
      this.currentUser = data.data
    },
    autoLogin () {
      // 提示用户是否退出
      // 确认 => 真的退出
      this.$dialog.confirm({
        title: '退出提示',
        message: '确认退出吗？'
      })
        .then(() => { // 确认提示
          // 清除用户登入状态
          // on confirm
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style scoped lang="less">
  .my-container{
    .my-info{
      background: url("./banner.png") no-repeat;
      background-size:cover ;
      .call-info{
        background: unset;
        height: 115px;
        box-sizing: border-box;
        padding-top: 38px;
        padding-bottom: 11px;
        .avatar{
          box-sizing: border-box;
          width: 66px;
          height: 66px;
          border: 1px solid #fff;
          margin-right: 11px;
        }
        .custom-title{
          color:#fff;
          font-size: 15px;
        }
        .update-btn{
          width: 68px;
          height: 16px;
          color: #666;
        }
      }
      .data-info{
        .data-info-item{
          height: 65px;
          color: #fff;
          .text-warp{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .count{
              font-size: 18px;
            }
            .text{
              font-size: 11px;
            }
          }
        }
      }
       /deep/ .van-grid-item__content{
          background: unset;
      }
    }
    /deep/ .nav-grid{
      .nav-grid-item{
        height: 70px;
        .toutiao{
          font-size: 22px;
        }
        .toutiao-shoucang{
          color: #eb5253;
        }
        .toutiao-lishi{
          color: #ff9d1d;
        }
        .van-grid-item__text{
          color: #333;
          font-size: 14px;
        }
      }
    }
    .not-login{
      background: url("./banner.png") no-repeat;
      background-size: cover;
      height: 180px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .login-mobile{
        width: 66px;
        height: 66px;
      }
      .dengLu{
        color: #fff;
        font-size: 14px;
        padding-top: 6px;
      }
    }
    .logout-cell{
      text-align: center;
      color: #d86262;
    }
    .mb-4{
      margin-bottom: 4px;
    }
  }
</style>
