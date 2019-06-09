'use strict'

var _mm = require('@/common/js/mm.js')

var _category = {
  //
  getCategoryList: function(categoryId, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/manage/category/get_category.do'),
      data: {
        categoryId: categoryId
      },
      success: resolve,
      error: reject
    })
  },
  //
  updateCategoryName: function(categoryInfo, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/manage/category/set_category_name.do'),
      data: categoryInfo,
      success: resolve,
      error: reject
    })
  },
  addCategory: function(categoryInfo, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/manage/category/add_category.do'),
      data: categoryInfo,
      success: resolve,
      error: reject
    })
  },
  getParentId: function(categoryId, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/manage/category/get_parent_id.do'),
      data: {
        categoryId: categoryId
      },
      success: resolve,
      error: reject
    })
  },
  getCategoryName: function(categoryId, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/category/get_name.do'),
      data: {
        categoryId: categoryId
      },
      success: resolve,
      error: reject
    })
  }
}
module.exports = _category
