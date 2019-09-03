<template>
  <el-card v-loading="loading">
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
          <el-button @click="openOrClose(obj.row)"
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
    // 打开或者关闭
    openOrClose (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您是否要${mess}评论？`, '提示').then(() => {
        // 写调用接口
        this.$axios({
          // 修改文章状态 Method： PUT
          method: 'put',
          url: '/comments/status',
          params: { article_id: row.id.toString() }, // 传递article_id参数
          data: {
            allow_comment: !row.comment_status // 取反，因为当前如果是true 只能改成false，如果是false改为true
          }

        }).then(result => {
          this.getComments()// 成功之后 重新调用 拉去数据的方法
        })
      })
    },
    // formatter 用来格式化内容Function(row, column, cellValue, index)
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
