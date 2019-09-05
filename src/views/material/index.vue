<template>
  <el-card class="material">
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="全部素材" name="all">
        <!-- 全部素材内容 -->
        <!-- {{list.length}} -->
        <div class="card-list">
          <el-card v-for="item in list" :key="item.id" class="img-card">
            <img :src="item.url" alt />
            <div type="flex" justify="space-around" class="operate" align="middle">
              <i :style="{color:item.is_collected ? 'red' : ''}" class="el-icon-star-on"></i>
              <i class="el-icon-delete-solid"></i>
            </div>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收藏图片" name="collect">
        <!-- 收藏素材内容 -->
        <div class="card-list">
          <el-card v-for="item in list" :key="item.id" class="img-card">
            <img :src="item.url" alt />
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 分页 -->
    <el-row type="flex" justify="center">
      <el-pagination @current-change="changePage" :current-page="page.page" :page-size="pageSize" :total="page.total" background layout="prev, pager, next" ></el-pagination>
    </el-row>
  </el-card>
</template>
<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [],
      page: {
        page: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  methods: {
    // 切换分页
    changePage (newPage) {
      this.page.page = newPage
      this.getMaterial()
    },
    // 切换页签
    changeTab () {
      this.page.page = 1
      // this.activeName是最新的页签
      // 加载不同类型的数据 all=》所有的数据 collect=》去加载收藏数据
      this.getMaterial()
    },
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          page: this.page.page, // 默认第一次是第一页
          per_page: this.page.pageSize, // 默认第一页为10条
          // collect: false
          collect: this.activeName === 'collect' // collect 为true时是加载收藏页面，为false是全部加载页面
        }
      }).then(result => {
        this.list = result.data.results// 接收数据
        this.page.total = result.data.total_count// 将图片总数据赋值给总页
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>
<style lang="less" scoped>
.material {
  .upload-btn {
    position: absolute;
    right: 10px;
    margin-top: -10px;
  }
  .card-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .img-card {
      width: 180px;
      height: 180px;
      margin: 30px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .operate {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        height: 30px;
        background-color: #f4f5f6;
        font-size: 18px;
        .el-icon-star-on {
          margin-right: 70px;
        }
      }
    }
  }
}
</style>
