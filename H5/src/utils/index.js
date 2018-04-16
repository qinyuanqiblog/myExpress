/*
*-------------------------------------------------------------
 * @File  : 一些工具函数 入口文件
 * @Author: qingsong.guo
* @Email : 1251005052@qq.com
 * @GitHub: https://github.com/guoqs
 * @Date  : 2017-12-07 09:34:24
 * @Last Modified by: qingsong.guo
 * @Last Modified time: 2018-01-03 15:47:44
 *-------------------------------------------------------------
 */

export default {
  log (obj) {
    if (typeof obj !== 'object') {
      console.log(obj)
    } else {
      console.log(JSON.stringify(obj, null, ' '))
    }
  },
  /**
  * 会 copy 一份 然后删除 值为空的 key
  */
  removeEmptyKeys (obj) {
    if (typeof obj !== 'object') {
      return false
    }
    let resObj = JSON.parse(JSON.stringify(obj))
    let keys = Object.keys(resObj)
    for (let i = 0, len = keys.length; i < len; i++) {
      if (!resObj[keys[i]]) {
        delete resObj[keys[i]]
      }
    }
    return resObj
  },
  /**
 * 获取浏览器 search 的对应字段的值
 * @param {string} key query中的字段
 * @param {string} url / url 的查选字符串，默认值是 location.search
 */
  getQuery (key, url) {
    var search = url || location.search
    // 如果查询的第一个字符是 ？  就去掉
    if (search[0] === '?') {
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
  },
  // 设置大小价格(整数部分和小数部分)
  setPrice (target, key) {
    target.forEach(function (v, i) {
      // let price =  v[key].toFixed(2);
      let price = typeof v[key] === 'number' ? v[key].toFixed(2) : parseFloat(v[key]).toFixed(2)
      let priceArr = price.split('.')
      Object.assign(v, {
        [key + 'Int']: priceArr[0],
        [key + 'Float']: '.' + priceArr[1]
      })
    })
  },
  getPlatform () {
    let ua = window.navigator.userAgent.toLowerCase()
    // if (/micromessenger/.test(ua)) {
    //   return 'tencent_wx'
    // } else if (/alipayclient/.test(ua)) {
    //   return 'ali_alipay'
    // } else {
    //   return ''
    // }
    return {
      platformApp: /micromessenger/.test(ua) ? 'tencent_wx' : /alipayclient/.test(ua) ? 'ali_alipay' : 'other',
      os: ua.indexOf('iphone') > -1 ? 'ios' : (ua.indexOf('android') > -1 || ua.indexOf('adr') > -1) ? 'android' : 'other'
    }
  },
  setTitle (title) {
    document.title = title || '闪士多'
  },
  /**
   * @param {*} path vue fullPath '/list/item?sex=1&gg=gg'
   * return string route1=list&route2=item&rsearch1=sex_1&rsearch2=gg_gg
   */
  setPathQuery (path) {
    let pathArr = path[0] === '/' ? path.substring(1).split('/') : path.split('/')
    let searchs = ''
    if (pathArr[pathArr.length - 1].indexOf('?') > -1) {
      let searchArr = pathArr[pathArr.length - 1].split('?')
      pathArr[pathArr.length - 1] = searchArr[0]
      searchs = searchArr[1]
    }
    let resQuery = ''
    pathArr.forEach((item, idx) => {
      // 第一个一般为空，避免出现空白路径
      if (item) {
        if (!resQuery) {
          resQuery += 'route' + idx + '=' + item
        } else {
          resQuery += '&route' + idx + '=' + item
        }
      }
    })
    if (searchs) {
      let searchItems = searchs.split('&')
      searchItems.forEach(function (item, idx) {
        let itemArr = item.split('=')
        resQuery += '&rsearch' + idx + '=' + itemArr[0] + '_' + itemArr[1]
      })
    }
    return resQuery
  }
  // dateFormat (date) {
  //   let tDate =  new Date(date)
  //   let d = tDate.toString() === 'Invalid Date' ? new Date() : tDate
  //   let yyyy = d.getFullYear()
  //   let mm = d.getMonth() + 1
  //   mm = mm > 9 ? mm : '0' + mm
  //   let dd = d.getDate()
  //   dd = dd > 9 ? dd : '0' + dd
  //   let hh = d.getHours()
  //   hh = hh > 9 ? hh : '0' + hh
  //   let minute = d.getMinutes()
  //   minute = minute > 9 ? minute : '0' + minute
  //   let ss = d.getSeconds()
  //   ss = ss > 9 ? ss : '0' + ss
  //   return yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + minute + ':' + ss
  // }
}
