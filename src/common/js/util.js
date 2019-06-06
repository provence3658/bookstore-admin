var _util = {
  // 字段的验证，支持非空、手机、邮箱的判断
  validate: function(value, type) {
    var value = $.trim(value)
    // 非空验证
    if ('require' === type) {
      return !!value
    }
    // 手机号验证
    if ('phone' === type) {
      return /^1\d{10}$/.test(value)
    }
    // 邮箱格式验证
    if ('email' === type) {
      return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value)
    }
  },
  // 获取url参数
  getUrlParam: function(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var result = window.location.search.substr(1).match(reg)
    return result ? decodeURIComponent(result[2]) : null
  }
}

module.exports = _util
