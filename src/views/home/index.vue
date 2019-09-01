<template>
  <!-- 主容器 -->
  <el-container>
    <!-- 左边边栏 -->
    <el-aside>
      <layout-aside></layout-aside>
    </el-aside>
    <!-- 右边栏 -->
    <el-container>
      <el-header>
        <layout-header></layout-header>
      </el-header>
      <el-main>主体</el-main>
    </el-container>
  </el-container>
</template>

<script>
import layoutAside from '../../components/home/layout-aside'
import layoutHeader from '../../components/home/layout-header'
export default {
  components: {
    'layout-aside': layoutAside,
    'layout-header': layoutHeader
  }
}
</script>

<style>
</style>
