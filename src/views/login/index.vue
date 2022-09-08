<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="标题" class="nar-bar" />
    <!-- 表单 -->
    <!-- name提交时需要 -->
    <van-form @submit="onSubmit" class="form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请填写验证码"
        :rules="codeRules"
      >
        <!-- 字体图标 -->
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <!-- 发送验证码 -->
        <template #button>
          <van-button
            type="default"
            size="small"
            class="btn"
            round
            block
            native-type="button"
            v-if="isShow"
            @click="sendCode"
            >获取验证码</van-button
          >
          <!-- 倒计时 -->
          <van-count-down
            :time="time"
            format="ss秒"
            @finish="isShow = true"
            v-else
          />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mobileRules, codeRules } from './rule.js'
import { login, getSmsCode } from '@/api'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      time: 10 * 1000,
      isShow: true // 是否显示现在吗
    }
  },
  methods: {
    async onSubmit() {
      // 只有表单验证通过才会触发
      // 登录

      // loading  toast 开启下一个时提示时 上一个会自动关闭
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await login(this.mobile, this.code)
        console.log(data)
        this.$toast.success('登录成功')
        this.$store.commit('setUser', data.data)
      } catch (error) {
        // 细分错误
        // 如果时手机号或者验证码错误用户能知道
        // error 1 js的错误 2 axios封装的error对象 axios时promise对象
        if (error.response && error.response.status === 400) {
          console.log(error)
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()

          throw error // throw语句抛出错误
        }
      }
    },
    async sendCode() {
      // 1 验证用户是否输入手机号 注意验证码按钮类型为button 如果为submit会触发提交事件
      // 通过ref 获取form组件上的validate方法验证 成功才会执行下一步
      await this.$refs.form.validate('mobile')
      // 发送请求
      try {
        const res = await getSmsCode(this.mobile)
        this.$toast('发送成功')
        console.log(res)
      } catch (err) {
        if (err.response.status === 429) {
          this.$toast(err.response.data.message)
        } else {
          this.$toast('发送失败')
        }
      }
      // 显示倒计时
      this.isShow = false
    }
  }
}
</script>

<style scoped lang="less">
// scoped 样式作用于当前组件  不能在当前组件改其他组件样式
// vue- cil 提供了语法:deep()深度选择器
.nar-bar {
  background-color: #3296fa;
  /deep/.van-nav-bar__title {
    color: #fff;
  }
}

/deep/.form {
  .van-cell__title {
    flex: 1;
    .toutiao {
      font-size: 40px;
    }
  }
  .van-cell__value {
    flex: 20;
  }
}
.btn {
  height: 0.64rem;
  background-color: #eee;
  color: #a58594;
}
</style>
