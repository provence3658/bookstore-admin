<template>
  <div class="order-detail">
    <h1>订单详情</h1>
    <el-form ref="form" :model="orderInfo" label-width="80px">
      <el-form-item label="订单号">
        <el-input v-model="orderInfo.orderNo"></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input v-model="orderInfo.createTime"></el-input>
      </el-form-item>
      <el-form-item label="收件人">
        <el-input v-model="receiverInfo"></el-input>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-input v-model="orderInfo.statusDesc"></el-input>
        <el-button v-show="orderInfo.status === 20" type="primary" round @click="deliver(orderInfo.orderNo)">立即发货</el-button>
      </el-form-item>
      <el-form-item label="订单金额">
        <el-input v-model="orderInfo.payment"></el-input>
      </el-form-item>
    </el-form>
    <el-table
      :data="orderInfo.orderItemVoList"
      stripe
      style="width: 100%">
      <el-table-column
        label="图片">
        <template slot-scope="scope">
          <el-image :src="scope.row.bookImage"></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="bookName"
        label="书名">
      </el-table-column>
      <el-table-column
        prop="onePrice"
        label="单价">
      </el-table-column>
      <el-table-column
        prop="quantity"
        label="数量">
      </el-table-column>
      <el-table-column
        prop="totalPrice"
        label="合计">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import _order from '@/service/order-service.js'
export default {
  data() {
    return {
      orderNo: this.$route.query.orderNo,
      orderInfo:{}
    }
  },
  mounted () {
    this.getOrderDetail()
  },
  methods: {
    onSubmit() {
      // console.log('submit!');
      var _this = this
      _order.updateBookDetail(this.orderInfo,res=>{
        // console.log(res)
        _this.orderInfo = res
      },err=>{
        this.$message.error(err)
      })
    },
    getOrderDetail() {
      var _this = this
      _order.getOrderDetail(this.orderNo,res=>{
        // console.log(res)
        _this.orderInfo = res
      },err=>{
        this.$message.error(err)
      })
    },
    deliver(orderNo) {
      _order.send(orderNo,res=>{
        this.$message.success(res)
      },err=>{
        this.$message.error(err)
      })
      setTimeout(()=>{
        this.$router.go(0)
      },1000)
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
.el-input
  width 50%
.el-image
  height 100px
  width 80px
</style>

