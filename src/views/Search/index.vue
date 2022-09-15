<template>
  <div>
    <!-- 搜索框 -->
    <form action="/">
      <van-search
    class="search"
      v-model.trim="keywords"
      placeholder="请输入搜索关键词"
      :show-action="true"
      background= "#3397f3"
      @search="onsearch"
      @focus="isShowResult = false"
      @cancel="$router.push('/')"
     />
    </form>
    <!-- 搜索历史/搜索结果/建议  一次传参所有动态组件都可以接收 -->
    <!-- <component :is="componentName" :keywords="keywords"
    @change-keywords="[(keywords = $event),(isShowResult = true)]"></component> -->
    <component :is="componentName" :keywords="keywords"
    @change-keywords="onsearch"></component>
    <!-- 改关键词并触发搜索 -->
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResuilt.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'

import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      keywords: '',
      isShowResult: false
    }
  },
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  computed: {
    ...mapState(['histories']),
    // 搜索历史: 搜索框的值为空
    componentName() {
      if (this.keywords === '') {
        return 'SearchHistory'
      } else if (this.isShowResult) {
        return 'SearchResult'
      } else {
        return 'SearchSuggestion'
      }
    }
  },
  methods: {
    ...mapMutations(['setHistory']),
    onsearch(keywords) {
      // 去重
      const distinctHistories = [...new Set([keywords, ...this.histories])]
      this.setHistory(distinctHistories)
      // keywords是自定义事件传来的 但是onserach也有回调参数 自动获取搜索的值 所有kewords可以是输入的关键词
      // 也可以是点击搜索建议时的关键词
      this.keywords = keywords
      this.isShowResult = true
    }
  }

}

</script>

<style scoped lang="less">
  //属性选择器 [属性=‘属性值’]
   .search{
     [role="button"] {
      color: #fff;
     }
   }
</style>
