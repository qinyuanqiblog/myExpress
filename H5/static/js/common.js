(function (w) {
  var sunstore = {}
  // 获取项目目录，代理域名要加 项目名
  sunstore.getProjectName = function () {
    var href = location.href
    return href.indexOf('/zpgo-shop') > -1 ? '/zpgo-shop/' : '/'
  }
  /**
   * 获取特定字符的字符串
   * @param {Object} key query中的字段
   * @param {Object} search / url 的查选字符串，默认值是 location.search
   */
  sunstore.getQuery = function (key, search) {
    var search = search || location.search
    //如果查询的第一个字符是 ？  就去掉
    if (search[0] == '?') {
      search = search.substring(1)
    } else {
      search = search.split('?')[1]
    }
    // 如果 没有 ？ 就直接返回 undefined
    if (!search) {
      return undefined
    }
    var searchArr = search.split('&')
    var searchObj = {}
    var temp
    for (var i = 0, len = searchArr.length; i < len; i++) {
      temp = searchArr[i].split('=')
      if (temp[0] in searchObj) {
        if (Array.isArray(searchObj[temp[0]])) {
          searchObj[temp[0]].push(temp[1])
        } else {
          searchObj[temp[0]] = [searchObj[temp[0]], temp[1]]
        }
      } else {
        searchObj[temp[0]] = temp[1]
      }
    }
    if (typeof key === 'string') {
      return searchObj[key.trim()]
    } else {
      return searchObj
    }
  }
  /**
   * 过滤字符串函数
   * @param {string} str 需要过滤的字符
   */
  sunstore.filterSpecialStr = function (str) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%+_]")
    var specialStr = ''
    for (var i = 0; i < str.length; i++) {
      specialStr += str.substr(i, 1).replace(pattern, '')
    }
    return specialStr
  }

  w.sunstore = sunstore
})(window)
