<template>
  <div class="login-container">
    <!-- <p>管理员登录页面</p> -->
    <div class="login-box">
      <div class="avatar-box">
        <img src="../assets/img/logo.png" alt>
      </div>
      <el-form :rules="loginFormRules" ref="loginFormRef" :model="loginForm">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username">
            <i slot="prefix" class="iconfont icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password">
            <i slot="prefix" class="iconfont icon-3702mima"></i>
          </el-input>
        </el-form-item>
        <el-row>
          <el-col :push="15">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="reset">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // 表单重置
    reset () {
      this.$refs.loginFormRef.resetFields()
    },
    // 后台管理员登录系统
    login () {
      // 对表单进行再次验证
      this.$refs.loginFormRef.validate(async valid => {
        if (valid === true) {
          // 用户名和密码都需要校验
          const { data: dt } = await this.$http.post('/login', this.loginForm)
          console.log(dt);
          if (dt.meta.status !== 200) {
            this.$message({
              type: 'error',
              message: dt.meta.msg,
              duration:1000
            })
          }
          // 校验成功，进入系统
          this.$router.push('/home')
        }
      })
    }
  },
  data () {
    return {
      // 给各个表单域 定义校验规则
      loginFormRules: {
        username: [
          // required:非空  message:错误提示  trigger:触发校验机制
          { required: true, message: '请输入用户名称', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      loginForm: {
        username: '',
        password: ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  height: 100%;
  background-color: #2b4b6b;
  overflow: hidden;
  .login-box {
    width: 450px;
    height: 304px;
    background-color: #fff;
    border-radius: 4px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .avatar-box {
      width: 130px;
      height: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 8px;
      box-shadow: 0 0 10px #eee;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
  }
  .el-form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>
