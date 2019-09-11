
<template>
  <div class="cover-image">
    <!-- 注册图片点击事件 -->
    <div @click="showDialog(index)" class="image-item" v-for="(item,index) in  images" :key="index">
      <img :src="item ? item : defaultImg" alt />
    </div>
    <el-dialog @close="hideDialog" :visible="dialogVisbile">
      <!-- 上传图片 -->
      <slect-image @onSelectImg="receiveImg"></slect-image>
    </el-dialog>
  </div>
</template>

<script>
// 根据images 来渲染页面
// images ['']
// images ['','','']
// images []
export default {
  props: ['images'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'), // 定义一个变量 base64字符串
      dialogVisbile: false,
      selectIndex: -1
    }
  },
  methods: {
    receiveImg (url) {
      // alert(`我是${url}`)
      this.$emit('onClickImg', url, this.selectIndex)
      this.dialogVisbile = false
    },
    // 隐藏弹层
    hideDialog () {
      this.dialogVisbile = false
    },
    // 显示弹框
    showDialog (index) {
      this.selectIndex = index // 将当前点击的索引赋值给data中一个变量
      this.dialogVisbile = true // 显示弹框
    }
  }
}
</script>

<style lang='less' scoped>
.cover-image {
  display: flex;
  .image-item {
    padding: 10px;
    width: 200px;
    height: 200px;
    border: 1px solid #ccc;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
