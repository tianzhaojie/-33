<template>
  <div>
    <!-- 个人信息导航条 -->
    <van-nav-bar
   class="navbar"
  title="个人信息"
  left-arrow
  @click-left="$router.back()"
/>
    <!-- 信息修改 -->
    <van-cell
    title="头像" is-link
    @click="$refs.file.click()">
    <van-image
     round
     width="0.8rem"
     height="0.8rem"
     :src="userInfo.photo"
     />
  </van-cell>
  <van-cell title="昵称" :value="userInfo.name
" is-link @click="isShowName = true">
    </van-cell>
  <van-cell title="性别" :value="userInfo.gender === 0 ? '男':'女'" is-link @click="isShowgender = true" />
  <van-cell title="生日" :value="userInfo.birthday " is-link @click="isShowbirthday = true" />
  <!-- 更新头像的弹出层 -->
  <!-- 通过ref快速获取dom元素 -->
  <!-- accept限制上传格式 -->
  <!-- 用户选择的图片被保存到了value属性上 保存文件的决定路径  files数组里保存的file对象 -->
  <!-- file对象 文件的二进制 -->
  <!-- multiple同时上传多张图片 -->
  <input type="file" hidden ref="file" accept=".png,.pdf,.jpg" @change="selectPhoto" multiple>
  <van-popup v-model="isShowImg" position="bottom" :style="{ height: '100%' }" closeable>
   <UpdataAvator :photo="photo" v-if="isShowImg" :avator.sync="userInfo.photo"></UpdataAvator>
   <!-- v-if="isShowPhoto" 解决第一次接收图片后 第二次打开接收图片 不会显示第二接收的图片的bug 原因是弹出层this.init() 挂载后mounted 只执行了一次 通过v-if 可以让页面关闭销毁 下次打开后重新触发mounted里面的this.init() -->
  </van-popup>
  <!-- 点击昵称弹出层 -->
  <van-popup v-model="isShowName" position="bottom" :style="{ height: '100%' }">
    <van-nav-bar
     title="更新昵称"
     left-text="取消"
     right-text="保存"
     left-arrow
     @click-left="onClickLeft"
     @click-right="onClickRight"
     />
     <van-field
     v-model="message"
     rows="2"
     autosize
     type="textarea"
     maxlength="11"
     show-word-limit
     />
  </van-popup>
  <!-- 点击性别 -->
  <van-popup v-model="isShowgender" position="bottom" :style="{ height: '30%' }" >
    <van-picker
     title="标题"
     show-toolbar
     :columns="columns"
     @confirm="onConfirm"
     @cancel="onCancel"
     ref="picker"
     :default-index="this.userInfo.gender"
    />
    </van-popup>
    <!-- 点击生日 -->
    <van-popup v-model="isShowbirthday" position="bottom" :style="{ height: '30%' }" >
      <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="cfm"
      @cancel="cel"
      />
    </van-popup>
</div>
</template>

<script>
import moment from 'moment'
import UpdataAvator from './components/UpdataAvator.vue'
import { userInfoAPI, editUserInfoAPI } from '@/api/index'
import { resolveToBase64 } from '@/utils'
export default {
  created() {
    this.getuserInfo()
  },
  data() {
    return {
      columns: [{ text: '男', value: 0 }, { text: '女', value: 1 }],
      userInfo: {},
      isShowImg: false,
      photo: '',
      isShowName: false,
      isShowgender: false,
      isShowbirthday: false,
      message: '',
      minDate: new Date(1900, 1, 1),
      maxDate: new Date(),
      currentDate: new Date()
    }
  },
  components: {
    UpdataAvator
  },
  methods: {
    // 获取用户信息
    async getuserInfo() {
      const { data } = await userInfoAPI()
      // console.log(data)
      this.userInfo = data.data
      this.message = this.userInfo.name
    },
    async selectPhoto() {
      console.dir(this.$refs.file)
      // console.log(this.$refs.file.files[0])
      // console.log(this.$refs.file.value)
      const file = this.$refs.file.files[0]
      console.log(file)
      // file要对象转换为img.src可识别的属性.  file对象转换为base64
      // 使用FileReader文件阅读器  const fr =new FileReader() 如然后调用 fr.readAsDataURL(file)
      // 文件阅读器读文件是异步的所有要使用 fr.onload =(e) => {e.target.result} 在读取完文件时会调用onload 接收一个对象e
      // const fr = new FileReader()
      // fr.readAsDataURL(file)
      // fr.onload = (e) => { console.log(e.target.result) }  打印出的就是base64

      // 封装后
      const base64 = await resolveToBase64(file)
      // console.log(base64)
      // 传递图片给子组件
      this.photo = base64
      // 打开弹窗
      this.isShowImg = true
    },
    onClickLeft() {
      this.isShowName = false
      // 取消时将修改的值改回来
      this.message = this.userInfo.name
    },
    onClickRight() {
      this.isShowName = false
      this.userInfo.name = this.message
      this.editUserInfo()
    },
    // 上传修改信息到接口
    async editUserInfo() {
      await editUserInfoAPI(this.userInfo)

    //  console.log(data)
    },
    onConfirm() {
      this.isShowgender = false
      // console.log(this.$refs.picker)
      // console.log(this.$refs.picker.getValues()[0].value)
      this.userInfo.gender = this.$refs.picker.getValues()[0].value
      this.editUserInfo()
    },
    onCancel() {
      this.isShowgender = false
    },
    cfm(value) {
      this.userInfo.birthday = moment(value).format('YYYY-MM-DD')
      this.isShowbirthday = false
      this.editUserInfo()
    },
    cel() {
      this.isShowbirthday = false
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  background: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff !important;
  }
  :deep(.van-icon) {
    color: #fff !important;
  }
}
</style>
