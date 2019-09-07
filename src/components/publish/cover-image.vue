<template>
  <div class='cover-image'>
      <div class='image-item' v-for="(item,index) in  images" :key="index">
          <img :src="item ? item : defaultImg" alt="">
      </div>
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
      defaultImg: require('../../assets/img/pic_bg.png') // 定义一个变量 base64字符串
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
        border: 1px  solid #ccc;
        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
