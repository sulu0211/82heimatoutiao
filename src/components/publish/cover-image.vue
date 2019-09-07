
<template>
  <div class='cover-image'>
      <!-- 注册图片点击事件 -->
      <div @click="showDialog" class='image-item' v-for="(item,index) in  images" :key="index">
          <img :src="item ? item : defaultImg" alt="">
      </div>
      <el-dialog @close="dialogVisbile=false" :visible="dialogVisbile">
          <!--  -->
          <slect-image></slect-image>
     </el-dialog >
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
      dialogVisbile: false
    }
  },
  methods: {
    // 显示弹框
    showDialog () {
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
        width:200px;
        height:200px;
        border: 1px solid #ccc;
        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
