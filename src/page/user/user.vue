<template>
  <div class="user">
    <h1>用户列表</h1>
    <el-table
      :data="data.list"
      stripe
      style="width: 100%">
      <el-table-column
        prop="id"
        label="用户ID">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @current-change="handleCurrentChange"
      layout="prev, pager, next"
      :total="data.total">
    </el-pagination>
  </div>
</template>

<script>
import _user from '@/service/user-service.js'

export default {
  data () {
    return {
      data:{}
    }
  },
  mounted () {
    this.getUserList(1)
  },
  methods: {
    getUserList (page) {
      var _this = this
      _user.list({
        pageNum: page
      },res=>{
        // console.log(res)
        _this.data = res
      },err=>{
        this.$message.error(err)
      })
    },
    handleCurrentChange(currentPage) {
      this.getUserList(currentPage)
    }
  }
}
</script>

<style lang="stylus" scoped>
.user
  .el-pagination
    text-align center
    margin-top 20px
</style>
