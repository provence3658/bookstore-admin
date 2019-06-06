<template>
  <div class="login-wrapper">
    <div class="login">
      <el-form ref="form">
        <el-form-item>
          <h2 class="title">书城管理系统</h2>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="用户名"
                    v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="密码"
                    v-model="user.password"
                    show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import _user from '@/service/user-service.js'
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit () {
      var _this = this
      _user.login(this.user, res => {
        _this.$router.push({ path: '/home' })
      }, err => {
        this.$message.error(err)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.login-wrapper
  position relative
  display flex
  justify-content center
  .login
    margin-top 120px
    width 460px
    height 340px
    border 1px solid #eaeaea
    box-shadow 0 0 25px #cac6c6
    .el-form
      margin 30px 80px auto
      .el-form-item
        width 300px
        .title
          text-align center
          font-weight bold
          color #505458
        .el-button
          width 300px
</style>

