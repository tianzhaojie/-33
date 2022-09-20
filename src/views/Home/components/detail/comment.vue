<template>
  <div>
 <comment-list v-bind="$attrs"></comment-list>
  </div>
</template>

<script>
import CommentList from './comment.List.vue'
export default {
  components: {
    CommentList
  }
}
</script>

<style scoped lang="less">

</style>
