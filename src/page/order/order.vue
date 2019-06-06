<template>
  <div class="order">
    <h1>订单管理</h1>
    <div class="search">
      <el-form :inline="true"
               class="demo-form-inline">
        <el-form-item label="订单号">
          <el-input v-model="search"
                    placeholder="订单号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     icon="el-icon-search"
                     @click="searchOrderBtn()">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="data.list"
              stripe
              style="width: 100%">
      <el-table-column prop="orderNo"
                       label="订单号">
      </el-table-column>
      <el-table-column prop="receiverName"
                       label="收件人">
      </el-table-column>
      <el-table-column prop="statusDesc"
                       label="订单状态">
      </el-table-column>
      <el-table-column prop="payment"
                       label="订单总价">
      </el-table-column>
      <el-table-column prop="createTime"
                       label="创建时间"
                       width="200">
      </el-table-column>
      <el-table-column prop="handle"
                       label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)"
                     type="text"
                     size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background
                   @current-change="handleCurrentChange"
                   layout="prev, pager, next"
                   :total="data.total">
    </el-pagination>
  </div>
</template>

<script>
import _order from '@/service/order-service.js'
export default {
  data () {
    return {
      data: {},
      search: ''
    }
  },
  mounted () {
    this.getOrderList(1)
  },
  methods: {
    getOrderList (page) {
      var _this = this
      _order.list({
        pageNum: page
      }, res => {
        // console.log(res)
        _this.data = res
      }, err => {
        this.$message.error(err)
      })
    },
    handleCurrentChange (currentPage) {
      this.getOrderList(currentPage)
    },
    searchOrderBtn () {
      var _this = this
      _order.search({
        orderNo: this.search
      }, res => {
        // console.log(res)
        _this.data = res
      }, err => {
        this.$message.error(err)
      })
    },
    handleClick (row) {
      // console.log(row);
      this.$router.push({ path: '/order/detail', query: { orderNo: row.orderNo } })
    }
  }
}
</script>

<style lang="stylus" scoped>
.order
  .el-pagination
    text-align center
    margin-top 20px
</style>
