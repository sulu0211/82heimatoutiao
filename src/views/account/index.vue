<template>
  <el-card v-loading="loading">
      <bread-crumb slot='header'>
         <template slot='title'>
             账户信息
         </template>
      </bread-crumb>
      <!--此处使用自定义上传实现http-request-->
      <el-upload action="" :http-request="uploadHeadImg" :show-file-list="false">
        <img :src="userInfo.photo || defaultImg" alt="" class="head-img">
      </el-upload>

      <el-form ref="userForm" :model="userInfo" :rules="userRules" label-width="100px">
          <el-form-item label="用户名" prop="name">
              <el-input v-model="userInfo.name" style='width:300px'></el-input>
          </el-form-item>
          <el-form-item label="简介" prop="intro">
              <el-input v-model="userInfo.intro"  style='width:300px'></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
              <el-input  v-model="userInfo.email" style='width:300px'></el-input>
          </el-form-item>
          <el-form-item label="手机号">
              <el-input v-model="userInfo.mobile"  style='width:300px' disabled></el-input>
          </el-form-item>
          <el-form-item>
              <el-button @click="saveUserInfo" type='primary'>保存</el-button>
          </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
import eventBus from '../../utils/events' // 公共的vue实例
export default {
  data () {
    return {
      loading: false,
      defaultImg: require('../../assets/img/404.png'),
      userInfo: {
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      },
      userRules: {
        name: [{
          required: true,
          message: '用户名不能为空'
        }, {
          min: 2,
          max: 8,
          message: '用户名长度必须为4-8位'
        }],
        email: [{
          pattern: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/,
          message: '邮箱格式不正确'
        }]
      }
    }
  },
  methods: {
    // 上传用户头像
    uploadHeadImg (params) {
      this.loading = true // 显示进度
      let data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        method: 'patch',
        url: '/user/photo',
        data
      }).then(() => {
        this.loading = false // 关闭进度条
        eventBus.$emit('updateUserInfo') // 相当于打出电话
        this.getUserInfo()
      })
    },
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.userInfo = result.data
      })
    },
    saveUserInfo () {
      this.$refs.userForm.validate((isOk) => {
        if (isOk) {
          this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.userInfo
          }).then(() => {
            this.$message({
              type: 'success',
              message: '恭喜您保存用户信息成功'
            })
            // 成功之后 要通知 头部去更新数据
            eventBus.$emit('updateUserInfo') // 相当于打出了一个电话 电话号是updateUserInfo
          })
        }
      })
    }
  },
  created () {
    this.getUserInfo()
  }

}
</script>

<style lang="less" scoped>
.head-img{
  position: absolute;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  right:200px;

}

</style>
