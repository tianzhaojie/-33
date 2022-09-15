<template>
  <div>
    <!-- 搜索历史的标题 -->
    <van-cell title="搜索历史">
       <template #extra>
        <van-icon name="delete-o" v-if="!isEdit" @click="isEdit = true"/>

        <div v-else>
          <span @click="$store.commit('setHistory',[])">全部删除</span> &nbsp;
          <span @click="isEdit = false" >完成</span>
        </div>
       </template>
    </van-cell>

    <!-- 搜索历史 -->
    <van-cell v-for="(item,index) in histories" :key="index" :title="item"
    @click="!isEdit && $emit('change-keywords',item)" >
      <template #extra>
        <van-icon name="close" v-show="isEdit"
        @click="$store.commit('setHistory',histories.filter((val) => val !== item))"/>
       </template>
    </van-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      isEdit: false
    }
  },
  computed: {
    ...mapState(['histories'])
  }
}
</script>

<style>

</style>
