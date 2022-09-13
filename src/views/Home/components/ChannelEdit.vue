<template>
  <div class="edit">
    <!-- 我的频道 -->
    <!-- 标题 -->
    <van-cell title="我的频道">
      <van-button class="btn" round size="mini" style="color:red;  border-color:red" @click="isEdit = !isEdit">{{isEdit ? '完成' :'编辑'}}</van-button>
    </van-cell>
    <!-- 频道 -->
    <div class="my-pannel">
      <van-grid :column-num="4" gutter="10" :border="false">
           <van-grid-item v-for="(item,index) in myChannels" :key="item.id" :icon="isEdit&&item.name !== '推荐' ? 'cross' : ''" :text="item.name"
           :class="{active:item.name === '推荐'}" @click="handleMyChannel(item,index)"/>
       </van-grid>
    </div>

    <!-- 推荐频道 -->s
    <!-- 标题 -->
    <van-cell title="推荐的频道"></van-cell>
    <!-- 频道 -->
    <div class="recommend-pannel">
      <van-grid :column-num="4" gutter="10" :border="false">
           <van-grid-item v-for="item in recommendChannels" :key="item.id" icon="plus" :text="item.name" />
       </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannelsAPI } from '@/api'
export default {
  name: 'ChannelEdit',
  created() {
    this.getAllChannels()
  },
  props: {
    myChannels: Array
  },
  data() {
    return {
      isEdit: false,
      allChannels: []
    }
  },
  methods: {
    async getAllChannels() {
      const { data } = await getAllChannelsAPI()
      console.log(data)
      this.allChannels = data.data.channels
    },
    handleMyChannel({ name }, index) {
      if (this.isEdit && name !== '推荐') {
        console.log('删除频道', name)
      } else {
        // 这两个事件都是由父组件完成的
        // 1关闭弹窗
        // 2 切换频道
        this.$emit('change-active', index)
      }
    }
  },
  computed: {
    recommendChannels() {
      return this.allChannels.filter((allChannelsItem) => {
        return !this.myChannels.find((item) => item.id === allChannelsItem.id)
      })
    }
  }
}
</script>

<style lang="less" scoped>
  //postcss  插件无法把行内px -> rem
 .edit {
  padding-top: 92px;
  /deep/.btn {
    width: 100px;
    font-size: 25px;
  }
  :deep(.van-grid-item__content) {
  background-color: #f4f5f6;
}
// 我的频道
.my-pannel {
  // 编辑按钮居中
  .van-cell__value {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  // 关闭按钮样式
  :deep(.van-grid-item__content) {
    position: relative;

    .van-grid-item__content {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
:deep(.van-icon-cross) {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 25px;
  transform: translate(20%, -35%);
  border: 0.02667rem solid #000;
  border-radius: 50%;
  text-align: center;
  line-height: 0.32rem;
}
// 推荐频道
.recommend-pannel {
  // 推荐频道加号样式
  :deep(.van-grid-item__content) {
    flex-direction: row;

    .van-grid-item__icon {
      font-size: 0.5rem;
    }

    .van-grid-item__text {
      margin-top: 0;
    }
  }
}
 }
 /deep/.active {
  .van-grid-item__text{
    color:red
  }
 }
</style>
