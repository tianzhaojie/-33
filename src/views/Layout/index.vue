<template>
  <div>
    <!-- 二级路由 -->
    <router-view></router-view>
    <!-- 导航组件 -->
<van-tabbar  class="tabbar" route>
  <van-tabbar-item to="/ ">
    <template #icon>
  <span class="toutiao toutiao-shouye"></span>
  <span>首页</span>
    </template>
  </van-tabbar-item>
  <van-tabbar-item to="/video">
    <template #icon>
      <span class="toutiao toutiao-shipin"></span>
      <span>视频</span>
    </template>
  </van-tabbar-item>
  <van-tabbar-item to="/qa">
    <template #icon>
      <span class="toutiao toutiao-wenda"></span>
      <span>问答</span>
    </template>
  </van-tabbar-item>
  <van-tabbar-item to="/profile">
    <template #icon>
      <span class="toutiao toutiao-wode"></span>
      <span>{{islogin ? '我的' : '未登录'}}</span>
    </template>
  </van-tabbar-item>
</van-tabbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['islogin'])
  }
}
</script>

<style lang="less" scoped>
 .tabbar {
  /deep/.van-tabbar-item__icon {
    display: flex;
    flex-direction: column;
    text-align: center;
   align-items: center;
   height: 100%;
   justify-content: space-evenly;
  }
  .toutiao{
    font-size: 40px;
  }
  span {
    font-size: 30px;
  }
 }
</style>
