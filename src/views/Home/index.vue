<template>
  <div>
    <!-- 搜索框 -->
   <van-nav-bar class="navbar">
    <template #title>
      <van-button type="default"  icon="search" size="small" round @click="$router.push({path:'/search'})">搜索</van-button>
    </template>
   </van-nav-bar>
    <!-- 频道及文章展示 -->
    <van-tabs v-model="active" swipeable>
  <van-tab v-for="item in channels" :key="item.id" :title="item.name">
    <!-- 文章详情 -->
    <Articlelist :id="item.id"></Articlelist>
  </van-tab>
  <span class="toutiao toutiao-gengduo" @click="isShow = true"></span>
    </van-tabs>

    <!-- 弹出层 -->
    <van-popup v-model="isShow" position="bottom" :style="{ height: '100%' }"
    closeable close-icon-position="top-left" >
    <channel-edit :myChannels="channels" @change-active="[(isShow = false),(active = $event)]"
    @del-channel="delChannel"
    @add-channel="addChannel"
    v-if="isShow"></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getChannelAPI, delChannelAPI, addChannelAPI } from '@/api'
import Articlelist from './components/Articlelist.vue'
import ChannelEdit from './components/ChannelEdit.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  created() {
    this.initChannel()
  },
  data() {
    return {
      active: 2,
      channels: [],
      isShow: false
    }
  },
  // ?? 相当于||，常用于语句
  //  ?. 可选连操作符 ？前面是underfined那么就不会往后取值error.response?.status
  methods: {
    ...mapMutations(['setMyChannels']),
    initChannel() {
      // 登录了就请求接受数据  没有登录就是用本地存储的
      if (this.islogin) {
        this.getChannel()
      } else {
        if (this.$store.state.myChannels.length === 0) {
          this.getChannel()
        } else {
          this.channels = this.$store.state.myChannels
        }
      }
    },
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
    },
    async delChannel(id) {
      // 1 发送请求删除频道
      try {
        const newChannels = this.channels.filter(item => item.id !== id)
        if (this.islogin) {
          await delChannelAPI(id)
        } else {
          // 未登录把我的频道存在本地
          this.setMyChannels(newChannels)
        }
        // 2视图上删除
        this.channels = newChannels
        this.$toast.success('删除成功')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('请登录再删除~')
        } else {
          throw error
        }
      }
    },
    async addChannel(channel) {
      try {
        // 1发送请求添加
        if (this.islogin) {
          await addChannelAPI(channel.id, this.channels.length)
        } else {
          // 未登录把我的频道存在本地
          this.setMyChannels([...this.channels, channel])
        }

        // 视图上添加
        this.channels.push(channel)
        this.$toast('频道添加成功')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('请登录再删除~')
        } else {
          throw error
        }
      }
    }
  },
  components: {
    Articlelist,
    ChannelEdit
  },
  computed: {
    ...mapGetters(['islogin'])
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
