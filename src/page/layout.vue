<template>
  <el-container>
    <el-header>
      <div class="collapse-btn">
        <i class="el-icon-menu"></i>
      </div>
      <div class="logo">书城后台管理系统</div>
      <div class="header-right">
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-s-custom"></i>
            欢迎,{{username}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside width="220px">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo">
          <el-menu-item index="1" @click="goToPage('home')">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="2" @click="goToPage('Book')">
            <i class="el-icon-collection"></i>
            <span slot="title">书籍管理</span>
          </el-menu-item>
          <el-menu-item index="3" @click="goToPage('Category')">
            <i class="el-icon-s-operation"></i>
              <span slot="title">品类管理</span>
          </el-menu-item>
          <el-menu-item index="4" @click="goToPage('Order')">
            <i class="el-icon-s-order"></i>
            <span slot="title">订单管理</span>
          </el-menu-item>
          <el-menu-item index="5" @click="goToPage('User')">
            <i class="el-icon-s-custom"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import _user from '@/service/user-service.js'
export default {
  data () {
    return {
      username:''
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    goToPage (path) {
      this.$router.push({name: path})
    },
    getUserInfo() {
      var _this = this
      _user.getUserInfo(res=>{
        _this.username = res.username
      },err=>{
        this.$message.error(err)
      })
    },
    logout() {
      var _this = this
      // console.log(1)
      _user.logout(res=>{
        _this.$router.push('/login')
      },err=>{
        this.$message.error(err)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.el-header
  font-size: 22px
  color: #fff
  background #409EFF
  height: 60px
  line-height 60px
  position relative
  .collapse-btn
    float: left;
    cursor: pointer;
    padding 0 25px 0 0
  .logo
    float: left;
    width: 250px;
  .header-right
    position absolute
    right 10px
    .el-dropdown-link
      font-size: 16px
      color: #fff
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>