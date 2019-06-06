'use strict'

var _mm = require('@/common/js/mm.js')

var _user = {
  // 用户登录
  login: function(userInfo, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/manage/user/login.do'),
      data: userInfo,
      method: 'POST',
      success: resolve,
      error: reject
    })
  },
  // 登出
  logout: function(resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/user/logout.do'),
      method: 'POST',
      success: resolve,
      error: reject
    })
  },
  list: function(listParam, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/manage/user/list.do'),
      data: listParam,
      success: resolve,
      error: reject
    })
  },
  // 获取用户信息
  getUserInfo: function(resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/user/get_user_info.do'),
      method: 'POST',
      success: resolve,
      error: reject
    })
  },
  number: function(resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/manage/user/number.do'),
      success: resolve,
      error: reject
    })
  }
}
module.exports = _user
