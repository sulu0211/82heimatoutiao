<template>
  <div class='login'>
    <el-card class="login-card">
      <div class="logo">
        <img src="../../assets/img/logo_index.png" alt="">
      </div>
      <!-- 表单组件 -->
      <el-form  ref="loginForm" :model="loginForm" :rules="loginRules">
         <!-- 表单项 -->
         <el-form-item prop="mobile">
           <!-- 放置组件内容 -->
           <el-input placeholder="请输入手机号" v-model="loginForm.mobile"></el-input>
         </el-form-item>
         <el-form-item prop="code" >
            <el-input v-model="loginForm.code" style='width:260px' placeholder="请输入验证码"></el-input>
            <el-button style='float:right'>发送验证码</el-button>
         </el-form-item>
         <!-- 选择框 -->
         <el-form-item prop="check">
           <el-checkbox v-model="loginForm.check">
             我已阅读并同意用户协议和隐私条款
           </el-checkbox>
         </el-form-item>
         <!-- 登录框 -->
         <el-form-item>
           <el-button @click="login" type="primary" style="width:100%">登录</el-button>
         </el-form-item>
      </el-form>

    </el-card>

  </div>
</template>

<script>
export default {
  data () {
    let validator = function (rule, value, callBack) {
      if (value) {
        callBack()// 如果value位true直接跳过
      } else {
        callBack(new Error('您必须无条件同意'))
      }
    }
    return {
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        check: false // 是否勾选协议
      },
      // 定义rules去校验规则，表单是根据规则校验 没有规则 就没有校验
      // key（字段名):value（数组对象=>对个=>一个字段可能否有一个或者多个校验规则）
      loginRules: {
        mobile: [{
          required: true, // 意味着必填
          message: '手机号不能为空' // 如果没有满足要求 就会提示message的内容
        }, {
          pattern: /^1[3456789]\d{9}$/, // 正则表达式
          message: '手机号格式不正确'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码必须为6位数字'
        }],
        check: [{
          validator
        }]

      }

    }
  },
  methods: {
    login () {
      // console.log(this.$refs.loginForm.validate)//可以获取validate
      // this.$refs.xx  获取DOM对象  validate对整个表单进行验证
      // 通过el-form 组件的validate方法 校验整个表单
      // 传入一个回到函数 isOk为true 说明所有的校验规则都成功了
      // 如果我false 说明错误
      this.$refs.loginForm.validate((isOk, obj) => {
        if (isOk) {
          // 通过axios请求获取
          // axios中data中放置body参数 params是放置地址参数的
          // this.$axios({
          //   url:'',
          //   method:'post',
          // })
          this.$message({ type: 'success', message: '成功' })
        } else {
          this.$message({ type: 'warning', message: '失败' })
        }
      }

      )
    }
  }
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
