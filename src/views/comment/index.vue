<template>
  <el-card>
    <!-- 插槽内容 -->
    <bread-crumb slot="header">
      <!-- 面包屑的具名插槽 -->
      <template slot="title">评论列表</template>
    </bread-crumb>
    <el-table :data="list">
      <!-- formatter是el-table-column的属性 -->
      <el-table-column width="500" label="标题" prop="title"></el-table-column>
      <el-table-column :formatter="formatter" label="评论状态" prop="comment_status"></el-table-column>
      <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
      <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
      <el-table-column label="操作" style="padding-rigth:0">
        <template slot-scope="obj">
          <el-button size="small" type="text">修改评论</el-button>
          <el-button
            size="small"
            :style='{color : obj.row.comment_status ? "#E6A23C" :"#409EFF"}'
            type="text"
          >{{obj.row.comment_status ? '关闭评论' : '打开评论'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    formatter (row) {
      return row.comment_status ? '正常' : '关闭'
    },
    getComments () {
      this.$axios({
        // query相当于路径参数。get参数。url参数 放在params中
        // body参数放在data中
        url: '/articles',
        params: { response_type: 'comment' }
      }).then(result => {
        // console.log(result)
        this.list = result.data.results
      })
    }
  },
  created () {
    this.getComments()
  }
}
</script>

<style lang="less" scoped>
</style>
