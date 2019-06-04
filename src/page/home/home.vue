<template>
  <div class="main">
    <h1>首页</h1>
    <div class="user">
      <div class="number">{{userNumber}}</div>
      <div class="desc">用户总数</div>
    </div>
    <div class="book">
      <div class="number">{{bookNumber}}</div>
      <div class="desc">书籍总数</div>
    </div>
    <div class="order">
      <div class="number">{{orderNumber}}</div>
      <div class="desc">订单总数</div>
    </div>
  </div>
</template>

<script>
import _user from '@/service/user-service.js'
import _book from '@/service/book-service.js'
import _order from '@/service/order-service.js'
export default {
  data() {
    return {
      orderNumber: 0,
      userNumber: 0,
      bookNumber: 0,
    }
  },
  mounted () {
    this.getNumber()
  },
  methods: {
    getNumber () {
      var _this = this
      _user.number(res=>{
        _this.userNumber = res
      },err=>{
        this.$message.error(err)
      })
      _book.number(res=>{
        _this.bookNumber = res
      },err=>{
        this.$message.error(err)
      })
      _order.number(res=>{
        _this.orderNumber = res
      },err=>{
        this.$message.error(err)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.user,.book,.order
  width 280px
  height 150px
  display inline-block
  margin 0 40px 0 0
  padding 10px
  text-align center
  border-radius 5px
  color #fff
  .number
    font-size 36px
    line-height 90px
  .desc
    font-size 16px
.user
  background #fb9a40
.book
  background #fbd341
.order
  background #cce490
</style>

