<template>
  <div class="order-detail">
    <h1>订单详情</h1>
    <el-button v-show="orderInfo.status === 20"
               class="shipping"
               type="primary"
               round
               @click="deliver(orderInfo.orderNo)">立即发货</el-button>
    <el-form ref="form"
             :model="orderInfo"
             label-width="80px">
      <el-form-item label="订单号">
        <div class="text">{{orderInfo.orderNo}}</div>
      </el-form-item>
      <el-form-item label="创建时间">
        <div class="text">{{orderInfo.createTime}}</div>
      </el-form-item>
      <el-form-item label="收件人">
        <div class="text">{{receiverInfo}}</div>
      </el-form-item>
      <el-form-item label="订单状态">
        <div class="text">{{orderInfo.statusDesc}}</div>
      </el-form-item>
      <el-form-item label="订单金额">
        <div class="text">￥{{orderInfo.payment|keepTwoNum}}</div>
      </el-form-item>
    </el-form>
    <el-table :data="orderInfo.orderItemVoList"
              stripe
              style="width: 100%">
      <el-table-column label="图片">
        <template slot-scope="scope">
          <el-image :src="scope.row.bookImage"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="bookName"
                       label="书名">
      </el-table-column>
      <el-table-column prop="onePrice"
                       label="单价">
        <template slot-scope="scope">
          <span>{{scope.row.onePrice | keepTwoNum}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="quantity"
                       label="数量">
      </el-table-column>
      <el-table-column prop="totalPrice"
                       label="合计">
        <template slot-scope="scope">
          <span>{{scope.row.totalPrice | keepTwoNum}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import _order from '@/service/order-service.js'
export default {
  data () {
    return {
      orderNo: this.$route.query.orderNo,
      orderInfo: {},
    }
  },
  filters: {
    keepTwoNum (value) {
      value = Number(value)
      return value.toFixed(2)
    }
  },
  mounted () {
    this.getOrderDetail()
  },
  methods: {
    onSubmit () {
      // console.log('submit!');
      var _this = this
      _order.updateBookDetail(this.orderInfo, res => {
        // console.log(res)
        _this.orderInfo = res
      }, err => {
        this.$message.error(err)
      })
    },
    getOrderDetail () {
      var _this = this
      _order.getOrderDetail(this.orderNo, res => {
        // console.log(res)
        _this.orderInfo = res
      }, err => {
        this.$message.error(err)
      })
    },
    deliver (orderNo) {
      _order.send(orderNo, res => {
        this.$message.success(res)
      }, err => {
        this.$message.error(err)
      })
      setTimeout(() => {
        this.$router.go(0)
      }, 1000)
    }
  },
  computed: {
    receiverInfo () {
      var receive = this.orderInfo.shippingVo
      if (receive != null) {
        return `${receive.receiverName}, ${receive.receiverPhone}, ${receive.receiverProvince} ${receive.receiverCity} ${receive.receiverDistrict} ${receive.receiverAddress}`
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.order-detail
  position relative
  .shipping
    position absolute
    top 0
    right 0
.text
  color #606266
.el-image
  height 100px
  width 80px
</style>

