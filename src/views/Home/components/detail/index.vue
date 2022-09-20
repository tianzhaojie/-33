<template>
  <div>
    <!-- 导航 -->
    <van-nav-bar
      title="黑马头条"
      left-arrow
      @click-left="$router.back()"
       />
  <div class="bigbox">
       <!-- 内容 -->
     <div class="content">
        <!-- 标题 -->
        <h5>{{detail.title}}</h5>
         <!-- 博主信息 -->
     <van-cell :center="true" class="info" >
      <template #title>
        <van-image
        round
        width="1rem"
        height="1rem"
        :src="detail.aut_photo"
        />
        <div>
          <p>{{detail.aut_name}}</p>
          <span>{{detail.pubdate}}</span>
        </div>
      </template>

        <template>
          <van-button type="info" round @click="focusOn">
            <template #icon><van-icon name="plus" /></template>
            {{detail.is_followed? '取消关注':'关注'}}
          </van-button>
        </template>
     </van-cell>
     </div>
     <!-- 文章内容 -->
     <div class="detail-content markdown-body" v-html="detail.content" ref="content">
     </div>
     <p class="end">正文结束</p>
     <!-- 评论 -->
   <comment v-if="detail.art_id" :source="detail.art_id" ref="children"></comment>
  </div>
   <!-- 发布评论 -->
    <div class="article-bottom">
       <div class="box">
        <van-button type="default" @click="isShowSet = true">写评论</van-button>
        <van-icon name="comment-o" :badge="detail.comm_count" ></van-icon>
        <van-icon name="star-o" :class="{orange:detail.is_collected}" @click="collect" />
        <van-icon name="good-job-o" :class="{orange:detail.attitude === 1}" @click="setLike"/>
        <van-icon name="share-o" />
       </div>
    </div>
    <!-- 发布评论弹出层 -->
    <van-popup v-model="isShowSet" position="bottom" :style="{ height: '20%' }" class="Setcomment">
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
         >
         <template #extra>
          <van-button type="default" @click=" Setcomment"
          :disabled="message === ''">发布</van-button>
         </template>
         </van-field>
      </van-popup>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
import {
  getDetailAPI, makeACommentAPI, FocusonAPI, delFocusonAPI, collectAPI, delcollectAPI, setlikeAPI, delsetlikeAPI
} from '@/api/index'

import comment from './comment.vue'

export default {

  name: 'detail',
  created() {
    this.getgetDetail()
  },
  data() {
    return {
      id: this.$route.query.id,
      detail: {},
      isShowSet: false,
      message: ''
    }
  },
  components: {
    comment
  },
  methods: {
    // 获取文章详情
    async getgetDetail() {
      const { data } = await getDetailAPI(this.$route.query.id)
      //  console.log(data)
      this.detail = data.data
      // 文章详情获取成功才能获取到v-html内容
      // 数据驱动视图不是立即的  $nextTick数据更新完立马执行
      // console.log(this.$refs.content)
      this.$nextTick(() => {
        const content = this.$refs.content
        const img = content.querySelectorAll('img')
        console.log(img)
        const images = []
        img.forEach((item, index) => {
          images.push(item.src)
          // 给每个照片设置点击事件
          item.onclick = () => {
            ImagePreview({
              images,
              startPosition: index
            })
          }
        })
      })
    },
    // 对文章发布评论
    async Setcomment() {
      console.log(this.id)
      try {
        const { data } = await makeACommentAPI({ target: this.id, content: this.message })
        this.$toast.success('发布成功')
        // 重新渲染数量
        this.getgetDetail()
        console.log(data)
      } catch (error) {
        this.$toast.fail('发布失败')
      } finally {
        this.message = ''
        this.isShowSet = false
        console.log(this.$refs.children.$children)
        this.$refs.children.$children[0].getComments()
      }
    },
    // 点击关注
    async focusOn() {
      if (!this.detail.is_followed) {
        try {
          await FocusonAPI({ target: this.detail.aut_id })
          this.$toast.success('关注成功')
          // 刷新信息
          this.getgetDetail()
        } catch (error) {
          this.$toast.fail('关注失败')
        }
      } else {
        try {
          await delFocusonAPI(this.detail.aut_id)
          this.$toast.success('取消关注成功')
          // 刷新信息
          this.getgetDetail()
        } catch (error) {
          this.$toast.fail('取消关注失败')
        }
      }
    },
    // 点击收藏
    async collect() {
      if (!this.detail.is_collected) {
        try {
          await collectAPI({ target: this.detail.art_id })
          this.$toast.success('收藏成功')
          // 重新渲染
          this.getgetDetail()
        } catch (error) {
          this.$toast.fail('收藏失败')
        }
      } else {
        try {
          await delcollectAPI(this.detail.art_id)
          this.$toast.success('取消收藏成功')
          // 重新渲染
          this.getgetDetail()
        } catch (error) {
          this.$toast.fail('取消收藏失败')
        }
      }
    },
    // 对文章点赞
    async setLike() {
      if (this.detail.attitude === -1) {
        try {
          await setlikeAPI({ target: this.detail.art_id })

          this.$toast.success('点赞成功')
          // 重新渲染
          this.getgetDetail()
        } catch (error) {
          this.$toast.fail('点赞失败')
        }
      } else {
        try {
          await delsetlikeAPI(this.detail.art_id)

          this.$toast.success('取消点赞成功')
          // 重新渲染
          this.getgetDetail()
        } catch (error) {
          this.$toast.fail('取消点赞失败')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
  *{
    margin: 0;
    padding: 0;
  }
.content {
  h5{
    padding: 50px 32px;
    border-bottom: 1px solid #ccc;
  }
  /deep/.info {
    padding: 0 32px;
    .van-cell__title  {
      display: flex ;
      font-size: 24px;
      span {
        font-size: .30667rem;
    color: #b7b7b7;
      }
    }
    .van-cell__value{
      .van-button{
      width: 170px;
      height: 58px;
    }
    }
  }
}
.markdown-body {
box-sizing: border-box;
min-width: 200px;
max-width: 100rem;
margin: 0 auto;
padding: 56px 32px;
font-size: 32px;
 color: #24292f;

}
@media (max-width: 767px) {
.markdown-body {
padding: 15px;
}
}
.end {
  text-align: center;
  margin: 32px 0;
  color: #969799;
    font-size: .37333rem;
    line-height: .64rem;
}
.article-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  height: 1.17333rem;
  background-color: #ccc;
    border-top: 0.01333rem solid #d8d8d8;
    display: flex;
   align-items: center;
  .box {
    justify-content: space-around;
    align-items: center;
    width: 100%;
    display: flex;
    align-content: center;
    .van-button{
      text-align: center;
    width: 3.76rem;
    height: 0.61333rem;
    border: 0.02667rem solid #eee;
    font-size: .4rem;
    line-height: .61333rem;
    color: #a7a7a7;
    border-radius: 26.64rem;
  }
}
  }
.bigbox {
  height: calc(100vh - 92px - 92px);
  overflow: auto;
}
/deep/.Setcomment{
  .van-field{
    display: flex;
    align-items: center;
    padding: 0.42667rem 0 0.42667rem 0.42667rem;

    height: 100%;
  }
  .van-button{
    border: 0;
    color: #6ba3d8;
  }

    .van-field__value{
      width: 2rem;
    border: none;
    padding: 0;
    height: 80%;
      background-color: #f5f7f9;
    }
}
.orange{
 color: #ff9632;
}
</style>
