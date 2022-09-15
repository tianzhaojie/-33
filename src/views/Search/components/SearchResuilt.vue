<template>
  <div class="result">
  <van-list v-model="loading" @load="getResults"
  :finished="finished"
    finished-text="没有更多了"
    :error.sync="error"
     error-text="请求失败，点击重新加载">
    <van-cell v-for="item in results" :key="item.art_id"
    :title="item.title"
    @click="$router.push({path:'/detail',query:{articleId:item.art_id}})"
   >
    </van-cell>
  </van-list>
  </div>
</template>

<script>
import { getResultsAPI } from '@/api'

export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      page: 1,
      perPage: 10,
      results: [],
      finished: false,
      error: false
    }
  },
  methods: {
    async getResults() {
      try {
        // if (Math.random() < 0.8) {
        //   throw new Error()
        // }
        const { data } = await getResultsAPI(this.page++, this.perPage, this.keywords)
        const results = data.data.results
        console.log(results)
        if (results.length === 0) {
          this.finished = true
        }
        // 保存数据 不能是覆盖否则一直显示一页
        this.results = [...this.results, ...results]
      } catch (error) {
        this.error = true
      } finally {
        // 数据更新完毕后，将 loading 设置成 false 即可
        // 改为false  关闭触底 可以触发下一次触底
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
  //overlay用法和auto基本一致
  .result {
    height: calc(100vh - 100px);
    overflow: overlay;
  }
</style>
