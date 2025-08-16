<template>
  <div class="login">
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)" />
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input v-model="mobile" class="inp" maxlength="11" placeholder="15751776629" type="text">
        </div>
        <div class="form-item">
          <input class="inp" v-model="picCode" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img v-if='picUrl' :src="picUrl" alt="" @click="getPicCode">
        </div>
        <div class="form-item">
          <input class="inp" v-model="msgCode" placeholder="请输入短信验证码" type="text">
          <button @click="getCode">
            {{ second === totalSecond ? '获取验证码' : second + '秒后重新发送' }}
          </button>
        </div>
      </div>

      <div class="login-btn" @click="login">登录</div>
    </div>
  </div>
</template>

<script>

import { getPicCode, getMsgCode, codeLogin } from '@/api/login'

export default {
  name: 'LoginPage',
  data () {
    return {
      picCode: '', // 用户输入的图形验证码
      picKey: '', // 将来请求传递的图形验证码唯一标识
      picUrl: '', // 存储请求渲染的图片地址
      totalSecond: 60, // 总秒数
      second: 60, // 当前秒数
      timer: null, // 定时器
      mobile: '',
      msgCode: '' // 手机号

    }
  },
  async created () {
    this.getPicCode()
  },
  methods: {
    async getPicCode () {
      const { data: { base64, key } } = await getPicCode()
      this.picUrl = base64 // 地址
      this.picKey = key // 唯一标识
    },
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    },
    async  getCode () {
      if (!this.validFn()) {
        return false
      }
      // 检查是否存在计时器且是否处于初始状态（总秒数）
      // 避免重复启动计时器
      if (!this.timer && this.second === this.totalSecond) {
        // 设置计时器，每秒执行一次
        // eslint-disable-next-line no-undef
        const res = await getMsgCode(this.picCode, this.picKey, this.mobile)
        this.$toast('短信验证码发送成功')
        // console.log(res.message)
        alert(res.message)
        this.timer = setInterval(() => {
          // 每秒减少剩余秒数
          // console.log(this.second)
          this.second--
          // 当倒计时结束时
          if (this.second <= 0) {
            // 清除计时器
            clearInterval(this.timer)
            // 重置计时器变量
            this.timer = null
            // 恢复到初始总秒数，以便下次使用
            this.second = this.totalSecond
          }
        }, 1000) // 每秒执行一次
      }
    },
    async login () {
      if (!this.validFn()) {
        return
      }
      if (!/^\d{6}$/.test(this.msgCode)) {
        this.$toast('请输入正确的手机验证码')
        return
      }
      const res = await codeLogin(this.mobile, this.msgCode)
      console.log(res.data)
      this.$store.commit('user/setUserInfo', res.data)
      this.$toast('登录成功')
      const url = this.$route.query.backUrl || '/'
      this.$router.replace(url)
    }

  },
  // getCode () {

  // },
  // 离开页面清除定时器
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;

    h3 {
      font-size: 26px;
      font-weight: normal;
    }

    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;

    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }

    img {
      width: 94px;
      height: 31px;
    }

    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg, #ecb53c, #ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, .1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
