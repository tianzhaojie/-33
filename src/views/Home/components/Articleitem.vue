<template>
  <div>
    <!-- 没有图片 -->
  <van-cell v-if="article.cover.type === 0" :title="article.title" :label="label" @click="$router.push({path:'/detail',query:{id:article.art_id}})"></van-cell>
  <!-- 一张图片 -->
  <van-cell v-else-if="article.cover.type === 1" :title="article.title" :label="label" @click="$router.push({path:'/detail',query:{id:article.art_id}})">
    <template>
  <van-image width="100" height="100" :src="article.cover.images[0]"></van-image>
    </template>
  </van-cell>
  <!-- 三张图片 -->
  <van-cell v-else :title="article.title" @click="$router.push({path:'/detail',query:{id:article.art_id}})">
    <template #label>
     <van-image v-for="(item,index) in article.cover.images" :key="index"
     width="100" height="100" :src="item"></van-image>
     <p>{{label}}</p>
    </template>
  </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
  name: 'Articleitem',
  props: {
    article: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    /* eslint-disable */
    label () {
      const {aut_name,comm_count,pubdate} = this.article
      return `${aut_name}${comm_count}评论 ${dayjs(pubdate).fromNow()}`
    }
  }
}
</script>

<style>

</style>
