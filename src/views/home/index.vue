<template>
  <!-- 主容器 -->
  <el-container>
    <!-- 左边边栏 -->
    <el-aside>
      <layout-aside></layout-aside>
    </el-aside>
    <!-- 右边栏 -->
    <el-container>
      <el-header>顶部</el-header>
      <el-main>主体</el-main>
    </el-container>
  </el-container>
</template>

<script>
import layoutAside from '../../components/home/layout.aside'
export default {
  components: {
    'layout-aside': layoutAside
  }
}
</script>

<style>
</style>
