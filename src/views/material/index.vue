<template>
  <el-card>
      <bread-crumb>
        <template slot="title">
            素材管理
        </template>
      </bread-crumb>
      <el-tabs v-model="activeName">
    <el-tab-pane label="全部素材" name="all">
      <!-- 全部素材内容 -->
    </el-tab-pane>
    <el-tab-pane label="收藏图片" name="collect">
      <!-- 收藏素材内容 -->
    </el-tab-pane>
  </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all'
    }
  }
}
</script>

<style>

</style>
