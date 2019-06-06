'use strict'

var _mm = require('@/common/js/mm.js')

var _order = {
  list: function(listParam, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/manage/order/list.do'),
      data: listParam,
      success: resolve,
      error: reject
    })
  },
  queryOrderPayStatus: function(orderNo, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/order/query_order_pay_status.do'),
      data: {
        orderNo: orderNo
      },
      success: resolve,
      error: reject
    })
  },
  search: function(listParam, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/manage/order/search.do'),
      data: listParam,
      success: resolve,
      error: reject
    })
  },
  getOrderDetail: function(orderNo, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/manage/order/detail.do'),
      data: {
        orderNo: orderNo
      },
      success: resolve,
      error: reject
    })
  },
  send: function(orderNo, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/manage/order/send.do'),
      data: {
        orderNo: orderNo
      },
      success: resolve,
      error: reject
    })
  },
  number: function(resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/manage/order/number.do'),
      success: resolve,
      error: reject
    })
  }
}
module.exports = _order
