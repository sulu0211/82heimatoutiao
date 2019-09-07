<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="全部素材" name="all">
       <div class="img-list">
           <el-card class="img-item" v-for="item in list" :key="item.id">
               <img @click="selectImg(item)" :src="item.url" alt="">
           </el-card>
       </div>
       <el-row type="flex" justify="center">
         <el-pagination @current-change="changePage" :current-page="page.page" :page-size="page.pageSize" :total="page.total" background layout="prev, pager, next"></el-pagination>
       </el-row>

    </el-tab-pane>
    <el-tab-pane label="上传图片" name="upload">

    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [], // 全部
      page: {
        page: 1,
        pageSize: 8,
        total: 0
      }
    }
  },
  methods: {
    // 选择一张图片
    selectImg (item) {
      // 获取点击图片的地址 item.url
      alert(item.url)
    },
    changePage (newPage) {
      this.page.page = newPage
      this.getMaterial()
    },
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false,
          page: this.page.page,
          per_page: this.page.pageSize
        }
      }).then(result => {
        this.list = result.data.results // list
        this.page.total = result.data.total_count // 图片总数
      })
    }
  },
  created () {
    this.getMaterial()
  }
}

</script>

<style lang="less" scoped>
.img-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .img-item {
    margin: 20px 10px;
    width: 160px;
    height: 130px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

</style>
