<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="全部素材" name="all">

    </el-tab-pane>
    <el-tab-pane label="上传图片" name="upload">

    </el-tab-pane>
  </el-tabs>
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
