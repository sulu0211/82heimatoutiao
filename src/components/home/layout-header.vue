<template>
  <!-- 用el-row el-col -->
  <el-row class="layout-header" type="flex" justify="space-between">
    <!-- span是给col的宽度  elementUI将页面分为24分 -->
    <el-col class="left" :span="6">
      <!-- <i class='el-icon-s-unfold icon'></i> -->
      <i
        @click="openOrClose"
        :class="{'el-icon-s-unfold':close,'el-icon-s-fold':!close}"
        class="icon"
      ></i>
      <span>江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col :span="3" class="right">
      <!-- 属性不给:就相当于字符串 -->
      <img class="head-img" :src="userInfo.photo ? userInfo.photo : defaultImg" alt />
      <!-- <img class='head-img' :src="defaultImg" alt=""> -->

      <el-dropdown trigger="click" @command="handleMenuItem">
        <!-- 匿名插槽 -->
        <span class="el-dropdown-link">
          {{userInfo.name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <!-- 具名插槽 -->
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="account">个人信息</el-dropdown-item>
          <el-dropdown-item command="git">git地址</el-dropdown-item>
          <el-dropdown-item command="lgout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
import eventBus from '../../utils/events'
export default {
  data () {
    return {
      close: false, // 默认展开
      userInfo: {},
      defaultImg: require('../../assets/img/avatar.jpg') // 转成base64 字符串
    }
  },
  methods: {
    // 展开或者折叠
    openOrClose () {
      // (this.close = !this.close), eventBus.$emit('openOrClose', this.close)
      this.close = !this.close
      eventBus.$emit('openOrClose', this.close)
    },
    // 获取用户数据
    getUserInfo () {
      // let token = window.localStorage.getItem('user-token') // 获取token
      this.$axios({
        url: '/user/profile'
        // headers: { 'Authorization': `Bearer ${token}` }
      }).then(result => {
        this.userInfo = result.data
        // console.log(result)
      })
    },
    // 点击菜单项触发方法
    handleMenuItem (command) {
      if (command === 'account') {
        console.log(2)
        // 账户信息
      } else if (command === 'git') {
        // git地址
        window.location.href = 'https://github.com/shuiruohanyu/82heimatoutiao' // 改变当前的地址
      } else {
        console.log(1)
        // 退出
        window.localStorage.clear() // 清空缓存 清除所有的缓存  只能清除自己当前项目的缓存
        this.$router.push('/login') // 跳转到登录页
      }
    }
  },
  created () {
    eventBus.$on('updateUserInfo', () => {
      this.getUserInfo()
    })
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
.layout-header {
  display: flex;
  align-items: center;
  padding: 8px 0;
  .left {
    .icon {
      font-size: 22px;
      margin-right: 3px;
    }
    span {
      font-size: 14px;
    }
  }
  .right {
    display: flex;
    align-items: center;
    .head-img {
      border-radius: 50%;
      margin-right: 5px;
      width: 40px;
      height: 40px;
    }
  }
}
</style>
