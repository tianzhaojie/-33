<template>
  <div class="article">
    <!-- 触发load事件vant会将loading改为true 就不会再次触发触底 需要将loading改为true -->
<van-pull-refresh v-model="refreshing" @refresh="getNextPage">
  <!-- 触发下拉刷新会把refreshing改为true -->
  <van-list
  v-model="loading"
    @load="getNextPage"
    offset="100"
    :immediate-check="false"
    :finished="finished"
    finished-text="没有更多了"
    :error.sync="error"
    error-text="请求失败，点击重新加载"

     >
  <Articleitem v-for="item in articles" :key="item.art_id" :article="item" ></Articleitem>
  </van-list>
</van-pull-refresh>
  </div>
</template>

<script>
import { getArticle } from '@/api'
import Articleitem from './Articleitem.vue'
export default {
  name: 'Articlelist',
  data() {
    return {
      articles: [],
      timeStamp: '',
      loading: false,
      finished: false,
      error: false,
      refreshing: false
    }
  },
  props: {
    id: [String, Number]
  },
  created() {
    this.getFirstAtricle()
  },
  methods: {
    // 获取当前时间戳方法
    // +new Date() Date.now() +new Date().valueof()
    async getFirstAtricle() {
      try {
        const { data } = await getArticle(this.id, +new Date())
        this.timeStamp = data.data.pre_timestamp
        this.articles = data.data.results
      } catch (error) {
        // js的错误 和507原封不动上抛 400 上抛中文
        const status = error.response?.status
        if (!error.response || status === 507) {
          throw error
        } else {
          if (status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      }
    },
    async getNextPage() {
      try {
        // if (Math.random() < 0.5) {
        //   throw new Error()
        // }
        // 1发送请求
        const { data } = await getArticle(this.id, this.timeStamp)
        // 如果为空 下一次不会触发load
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        // 2 将数据添加到articles
        // console.log(data.data.results)
        if (this.refreshing) {
          this.articles.unshift(...data.data.results)
        } else {
          this.articles.push(...data.data.results)
        }

        // 3将时间戳更新
        this.timeStamp = data.data.pre_timestamp
      } catch (error) {
        // 提示错误
        this.error = true
      } finally {
        // 无论对错都要把loading改为false
        // 将loading改为false
        this.loading = false
        // 取消刷新状态
        this.refreshing = false
      }
    }
  },
  components: {
    Articleitem
  }
}
</script>

<style lang="less" scoped>
 .article{
  height:calc(100vh - 92px - 83px - 100px);
  overflow: auto;
// &: 代表当前元素他爹
  // ::-webkit-scrollbar : 滚动槽
  // ::-webkit-scrollbar-thumb: 滚动的滑块
  &::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #3296fa;
    border-radius: 10px;
  }
 }
</style>
