<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <!-- 表单 model 数据对象  rules 绑定规则 -->
    <el-form
      ref="publishForm"
      :model="formData"
      :rules="publishRules"
      style="margin-left:100px"
      label-width="100px"
    >
      <el-form-item prop="title" label="标题">
        <el-input v-model="formData.title" style="width:400px"></el-input>
      </el-form-item>
      <el-form-item prop="content" label="内容">
        <quill-editor v-model="formData.content" style="height:400px;width:800px"></quill-editor>
      </el-form-item>
      <el-form-item label="封面" style="margin-top:120px" prop="cover">
        <!-- 监听 radio的监听事件-->
        <el-radio-group v-model="formData.cover.type" @change="changeCoverType">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 封面组件 -->

      <el-form-item>
        <!-- 封面图片组件 -->
        <cover-image @onClickImg="receiveImg" :images="formData.cover.images"></cover-image>
      </el-form-item>

      <el-form-item prop="channel_id" label="频道">
        <el-select v-model="formData.channel_id">
          <!-- label(显示值)  value(真实值) -->
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="publish(false)" type="primary">发表文章</el-button>
        <el-button @click="publish(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
export default {
  data () {
    let func = function (rule, value, callBack) {
      if (value.type === 1) {
        (value.images.length === 1 && value.images[0] ? callBack() : callBack(new Error('对不起,您未设置单图的封面')))
      } else if (value.type === 3) {
        if (value.images.length === 3 && value.images[0] && value.images[1] && value.images[2]) {
          callBack()
        } else {
          callBack(new Error('对不起,您未设置全三图的封面'))
        }
        // if(value.images.length === 3 && !value.images.some(item => !item))
      } else {
        // 无图或自动[]
        if (value.images.length > 0) {
          callBack(new Error('对不起,您的封面设置有误'))
        } else {
          callBack()
        }
      }
    }
    return {
      channels: [],
      formData: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      },
      publishRules: {
        title: [
          {
            required: true,
            message: '标签不能为空'
          }, {
            min: 5,
            max: 30,
            message: '标题不能为5到30之间'
          }
        ],
        content: [
          {
            required: true,
            message: '内容不能为空'
          }
        ],
        channel_id: [
          {
            required: true,
            message: '内容不能为空'
          }
        ],
        cover: [{
          validator: func // 自定义校验函数
        }]
      }
    }
  },
  methods: {
    receiveImg (url, index) {
      // 拿到地址 更新images 需要知道更新哪一条
      // this.formData.cover.images = this.formData.cover.images.map(function (item, i) {
      //   if (i === index) {
      //     return url
      //   }
      //   return item
      // })
      this.formData.cover.images = this.formData.cover.images.map((item, i) => i === index ? url : item)
    },
    // 切换封面类型 根据当前类型决定images结构
    changeCoverType () {
      if (this.formData.cover.type === 1) {
        this.formData.cover.images = [''] // 有一张封面 待选择
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', ''] // 有三张封面 待选择
      } else {
        this.formData.cover.images = [] // 自动或者无图 没有内容
      }
    },
    // 发布草稿
    // 发布文章
    publish (draft) {
      this.$refs.publishForm.validate(isOk => {
        if (isOk) {
          this.$axios({
            url: '/articles',
            method: 'post',
            params: { draft }, // draft 为true时 就是草稿
            data: this.formData
          }).then(() => {
            // 编程式导航
            this.$router.push('/home/articles')
          })
        }
      })
    },

    // 频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    // 通过id获取文章详情
    getArticlById (articleId) {
      this.$axios({
        url: `/articles/${articleId}`
      }).then(result => {
        this.formData = result.data
      })
    }
  },
  created () {
    this.getChannels()
    let { articleId } = this.$route.params // 获取id
    if (articleId) {
      // 如果存在 修改文章 通过id 获取当前的文章数据
      this.getArticlById(articleId)
    }
  }
}
</script>

<style>
</style>
