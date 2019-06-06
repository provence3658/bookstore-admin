'use strict'

var _mm = require('@/common/js/mm.js')

var _book = {
  // 获取书籍列表
  getBookList: function(listParam, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/manage/book/list.do'),
      data: listParam,
      success: resolve,
      error: reject
    })
  },
  // 获取书籍详细信息
  getBookDetail: function(bookId, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/manage/book/detail.do'),
      data: {
        bookId: bookId
      },
      success: resolve,
      error: reject
    })
  },
  saveBookDetail: function(bookInfo, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/manage/book/save.do'),
      data: bookInfo,
      success: resolve,
      error: reject
    })
  },
  search: function(bookInfo, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/manage/book/search.do'),
      data: bookInfo,
      success: resolve,
      error: reject
    })
  },
  number: function(resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/manage/book/number.do'),
      success: resolve,
      error: reject
    })
  },
  upload: function(file, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/manage/book/upload.do'),
      data: {
        upload_file: file
      },
      method: 'POST',
      success: resolve,
      error: reject
    })
  }
}
module.exports = _book
