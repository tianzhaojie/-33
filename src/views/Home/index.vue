<template>
  <div>
    <!-- 搜索框 -->
   <van-nav-bar class="navbar">
    <template #title>
      <van-button type="default"  icon="search" size="small" round>搜索</van-button>
    </template>
   </van-nav-bar>
    <!-- 频道及文章展示 -->
    <van-tabs v-model="active" swipeable>
  <van-tab v-for="item in channels" :key="item.id" :title="item.name">
    <!-- 文章详情 -->
    <Articlelist :id="item.id"></Articlelist>
  </van-tab>
  <span class="toutiao toutiao-gengduo"></span>
    </van-tabs>
  </div>
</template>

<script>
import { getChannelAPI } from '@/api'
import Articlelist from './components/Articlelist.vue'
export default {
  created() {
    this.getChannel()
  },
  data() {
    return {
      active: 2,
      channels: []
    }
  },
  // ?? 相当于||，常用于语句
  //  ?. 可选连操作符 ？前面是underfined那么就不会往后取值error.response?.status
  methods: {
    async getChannel() {
      try {
        const { data } = await getChannelAPI()
        console.log(data)
        this.channels = data.data.channels
      } catch (error) {
        if (error.response && error.response.status === 507) { // 这里err.response是为了保证error.response不是未定义 否则error.response.status 未定义.status会保错
          this.$toast.fail('请刷新')
        } else {
          throw error
        }
      }
    }
  },
  components: {
    Articlelist
  }
}
</script>

<style lang="less" scoped>
 .navbar {
  background-color: #3296fa;
  // unset 不设置
  // inherit继承
 /deep/.van-nav-bar__title {
  max-width: unset;
  .van-button {
    width: 7.4rem;
    background-color: #5babfb;
    border: 0;
    color: #fff;
    font-size: 30px;
  }
  .van-icon {
    color: #fff;
  }
  }
 }
 /* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/imgs/gradient-gray-line.png');
  }
}
</style>
