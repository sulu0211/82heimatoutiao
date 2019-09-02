<template>
  <!-- 主容器 -->
  <el-container>
    <!-- 左边边栏 -->
    <el-aside style='width:200px;background-color:#323745'>
      <layout-aside></layout-aside>
    </el-aside>
    <!-- 右边栏 -->
    <el-container>
      <el-header>
        <layout-header></layout-header>
      </el-header>
      <el-main style="margin:0;padding:0;">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import layoutAside from '../../components/home/layout-aside'
// import layoutHeader from '../../components/home/layout-header'
export default {
//  components: {
//     'layout-aside': layoutAside,
//     'layout-header': layoutHeader
//   }
}
</script>

<style>
</style>
