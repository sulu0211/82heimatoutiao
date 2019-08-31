<template>
  <div class='login'>
    <el-card class="login-card">
      <div class="logo">
        <img src="../../assets/img/logo_index.png" alt="">
      </div>
      <!-- 表单组件 -->
      <el-form>
         <!-- 表单项 -->
         <el-form-item>
           <!-- 放置组件内容 -->
           <el-input></el-input>
         </el-form-item>
         <el-form-item>
            <el-input style='width:260px'></el-input>
            <el-button style='float:right'>发送验证码</el-button>
         </el-form-item>
         <!-- 选择框 -->
         <el-form-item>
           <el-checkbox>
             我已阅读并同意用户协议和隐私条款
           </el-checkbox>
         </el-form-item>
         <!-- 登录框 -->
         <el-form-item>
           <el-button type="primary" style="width:100%">登录</el-button>
         </el-form-item>
      </el-form>

    </el-card>

  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
//如果要用less/scss等预处理css语言的话，需要一个lang属性
.login{
  background-image:url("../../assets/img/login_bg.jpg");
  width:100%;
  height:100vh;
  background-size:cover;
  display:flex;
  justify-content:center;
  align-items:center;
  .login-card{
    width:420px;
    height: 330px;
    img{
      display: block;
      width:200px;
      margin:10px auto;
    }
  }

}
</style>
