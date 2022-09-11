<template>
  <div>
    <Articleitem v-for="item in articles" :key="item.art_id" :article="item"></Articleitem>
  </div>
</template>

<script>
import { getArticle } from '@/api'
import Articleitem from './Articleitem.vue'
export default {
  name: 'Articlelist',
  data() {
    return {
      articles: []
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
    }
  },
  components: {
    Articleitem
  }
}
</script>

<style>

</style>
