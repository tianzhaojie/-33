<template>
  <div>
    <!-- 外部评论列表 -->
    <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :immediate-check="false"
   >
<van-cell v-for ="( item,index) in comment" :key="index" >
      <template #icon>
        <van-image
        round
        width="1rem"
        height="1rem"
        :src="item.aut_photo"
        />
      </template>
      <template #title>
         <span>{{item.aut_name}}</span>
         <p>{{item.content}}</p>
      </template>
      <template #label>
         <div class="bot" style=" display: flex;
    align-items: center; margin-top: 15px;">
          <span>{{item.pubdate | formNow}}</span>
          <van-button @click="btn(item,index)">
            <template>
              回复{{item.reply_count}}
            </template>
          </van-button>
         </div>
      </template>
      <template #default >
        <div @click="Like(item)"  :class="{orange:item.is_liking}">
        <van-icon v-if="comment" :name="comment.is_liking ? 'good-job' :'good-job-o'" /><span >赞</span>
       </div>
      </template>
    </van-cell>
   </van-list>
   <!-- 弹出回复 -->
   <van-popup
  v-model="isShowreplay"
  closeable
  position="bottom"
  :style="{ height: '100%' }"
>
     <van-nav-bar
      left-arrow
      @click-left="isShowreplay = false"
       >
       <template #title>
           {{count}} 条回复
       </template>
       </van-nav-bar>
       <!-- 内层顶部原评论 -->
      <van-cell v-if="comment[commentindex]">
      <template #icon>
        <van-image
        round
        width="1rem"
        height="1rem"
        :src="comment[commentindex].aut_photo"
        />
      </template>
      <template #title>
         <span>{{comment[commentindex].aut_name}}</span>
         <p>{{comment[commentindex].content}}</p>
      </template>
      <template #label>
         <div class="bot" style=" display: flex;
    align-items: center; margin-top: 15px;">
          <span>{{comment[commentindex].pubdate | formNow}}</span>
          <van-button>
            <template>
              回复{{comment[commentindex].reply_count}}
            </template>
          </van-button>
         </div>
      </template>
      <template #default >
        <van-icon name="good-job-o" /><span>赞</span>
      </template>
    </van-cell>
    <hr>
      <span class="allcomment">全部回复</span>
<van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :immediate-check="false"
   >
<van-cell v-for="item in replay" :key="item.com_id" >
      <template #icon>
        <van-image
        round
        width="1rem"
        height="1rem"
        :src="item.aut_photo"
        />
      </template>
      <template #title>
         <span>{{item.aut_name}}</span>
         <p>{{item.content}}</p>
      </template>
      <template #label>
         <div class="bot" style=" display: flex;
    align-items: center; margin-top: 15px;">
          <span>{{item.pubdate | formNow}}</span>
          <van-button>
            <template>
              回复{{item.reply_count}}
            </template>
          </van-button>
         </div>
      </template>
      <template #default >
        <van-icon name="good-job-o" /><span>赞</span>
      </template>
    </van-cell>
   </van-list>
   <div class="writeComment">
      <van-button type="default" @click="isShowSet = true" >发布评论</van-button>
   </div>
</van-popup>
    <!-- 内部发布评论弹出层 -->
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
          <van-button type="default" @click="Setcomment"
          :disabled="message === ''">发布</van-button>
         </template>
         </van-field>
      </van-popup>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
import { getCommentsAPI, makeACommentAPI, setCommentLikeAPI, delCommentLikeAPI } from '@/api'
export default {
  name: 'commentlist',
  created() {
    this.getComments()
  },
  data() {
    return {
      // 点击的回复的索引
      commentindex: '',
      replay: [],
      comment: [],
      loading: false,
      finished: false,
      // 最后一条评论id
      id: '',
      isShowreplay: false,
      count: '',
      isShowSet: false,
      // 内曾回复评论
      message: ''
    }
  },
  props: {
    // 文章id
    source: {
      type: [String, Number, Object],
      required: true
    }
  },
  methods: {
    // 获取首次评论
    async  getComments() {
      // console.log(this.source)
      const data = await getCommentsAPI(
        {
          type: 'a',
          source: this.source
        }
      )
      // console.log(data)
      this.comment = data.data.data.results
      this.id = data.data.data.end_id // 没有评论为空
      // console.log(this.id)
    },
    async  onLoad() {
      // 判断是否为最后一个
      if (this.comment[this.comment.length - 1]?.com_id === this.id || this.id === null) {
        this.finished = true
      }
      // 获取下一页评论
      try {
        const data = await getCommentsAPI(
          {
            type: 'a',
            source: this.source,
            offset: this.comment[this.comment.length - 1]?.com_id
          }
        )
        this.comment.push(...data.data.data.results)
        this.results = data.data.data.results
        //  console.log(this.results)
      } catch (error) {
        this.$toast.fail('获取失败')
      } finally {
        this.loading = false
      }
    },
    // 获取回复
    async btn(item, index) {
      this.commentindex = index
      console.log(item)
      this.count = item.reply_count
      this.isShowreplay = true
      const { data } = await getCommentsAPI(
        {
          type: 'c',
          source: item.com_id
        }
      )
      this.replay = data.data.results
      console.log(data)
    },
    // 对内部回复就行评论
    // 对文章发布评论
    async Setcomment() {
      try {
        const { data } = await makeACommentAPI({ target: this.comment[this.commentindex].com_id, content: this.message, art_id: this.source })
        this.$toast.success('发布成功')

        console.log(data)
      } catch (error) {
        this.$toast.fail('发布失败')
      } finally {
        this.message = ''
        this.isShowSet = false
        // 重新渲染数据
        this.btn(this.comment[this.commentindex], this.commentindex)
      }
    },
    // 对评论点赞
    async Like(item) {
      if (!item.is_liking) {
        // 点赞
        try {
          console.log(item.com_id)
          const { data } = await setCommentLikeAPI({ target: item.com_id })
          this.$toast.success('点赞成功')

          console.log(data)
        } catch (error) {
          this.$toast.fail('点赞失败')
        } finally {
        // 重新渲染
          this.getComments()
        }
      } else {
        // 取消点赞
        try {
          console.log(item.com_id)
          const { data } = await delCommentLikeAPI(item.com_id)
          this.$toast.success('取消点赞成功')

          console.log(data)
        } catch (error) {
          this.$toast.fail('取消点赞失败')
        } finally {
        // 重新渲染
          this.getComments()
        }
      }
    }
  },
  filters: {
    formNow(value) {
      return dayjs(value).fromNow()
    }
  }
}
</script>

<style scoped lang="less">
  *{
    margin: 0;
    padding: 0;
  }
  .van-cell{
    padding: 32px;
    .van-cell__title{
      margin-left: 10px;
    span{
      color: rgb(70, 107, 157);
      font-size: .37333rem;

    }
    p {
      color: rgb(54, 54, 54);
      font-size: .32rem;
    line-height: .48rem;
    }
    /deep/.van-cell__label{
      span {
        font-size: 24px;
        color: #969799;
      }
      .van-button{
           width: 2.2rem;
           height: 0.64rem;
           line-height: .64rem;
           font-size: .28rem;
           color: #222;
           border-radius: 26.64rem;
           margin-left: 40px;
        }
    }
  }
  }
  .allcomment {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.42667rem 0;
    color: #969799;
    font-size: .37333rem;
    line-height: .64rem;
    border-color: #ebedf0;
    border-style: solid;
    border-width: 0;
}
.writeComment{
   position: fixed;
   left: 0;
   bottom: 0;
   width: 100%;
   display: flex;
   justify-content: center;
   .van-button {
   width: 100%;
   }
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
