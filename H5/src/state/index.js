/**
 * storage
 * 一些固定的数据，比如控制 loading ， toast  或者  alert  以及 confirm
 * 这么小型的项目就没必要用vuex 了
 */
import imgsBase64 from './imgBase64'
let data = {
  imgsBase64,
  tips: {
    loading: {
      show: false,
      showAll: false,
      texts: '数据加载中...'
    },
    toast: {
      show: false,
      type: 'success',
      texts: '一个提示...'
    },
    alert: {
      show: false,
      texts: '一个小警告而已',
      btnName: '确定',
      btnFn: function () {
        this.show = false
      }
    },
    confirm: {
      show: false,
      texts: '一个确认框，问你要干嘛',
      cancelName: '取消',
      confirmName: '确定',
      cancalFn: function () {
        this.show = false
      },
      confirmFn: function () {
        this.show = false
      }
    }
  },
  regExp: {
    mobile: /^1[3|4|5|6|7|8|9]\d{9}$/,
    code: /\d{6}/
  }
}
export default {
  getAll () {
    return data
  },
  // 获取对应键值的数据
  getStorage (key) {
    if (typeof key !== 'string' || key.trim() === '') {
      console.warn('storage.getStorage 必须传一个字符串的参数，你的是类型是' + (typeof key) + '值：', key)
      return null
    }
    key = key.trim()
    let keyArr = key.split('.')
    let target = null
    for (let i = 0, len = keyArr.length; i < len; i++) {
      target = !target ? data[keyArr[i]] : target[keyArr[i]]
      if (!target) {
        return null
      }
    }
    return target
  },
  removeStorage (key) {
    if (typeof key !== 'string' || key.trim() === '') {
      console.warn('storage.removeStorage 必须传一个字符串的参数，你的是类型是' + (typeof key) + '值：', key)
      return null
    }
    key = key.trim()
    let keyArr = key.split('.')
    if (keyArr.length === 1) {
      delete data[keyArr[0]]
      return true
    }
    let target = null
    for (let i = 0, len = keyArr.length - 1; i < len; i++) {
      target = !target ? data[keyArr[i]] : target[keyArr[i]]
      if (!target) {
        return false
      }
    }
    if (target) {
      delete target[keyArr[keyArr.length - 1]]
    }
    return true
  },
  // 提交要保留或者修改数据
  commit (key, value) {
    if (typeof key !== 'string' || key.trim() === '') {
      console.warn('storage.commit 必须传一个非空字符串的参数，你的是类型是' + (typeof key) + '值：', key)
    } else {
      let oPath = key.split('.')
      let target
      let targetData = target = data[oPath[0]]
      // 非正常套路，如果第一个字段都没有则需要新加
      if (!targetData) {
        targetData = target = data[oPath[0]] = {}
      }
      // 正常套路修改固定data 里面的值
      if (oPath.length === 1) {
        Object.assign(targetData, value)
      } else {
        // 第一个已经用过，现在从第二个开始
        for (let i = 1, len = oPath.length; i < len; i++) {
          if (!target[oPath[i]]) {
            target[oPath[i]] = {}
          }
          target = target[oPath[i]]
        }
        Object.assign(target, value)
      }
      /**
       * 如果是 toast 则需要对应处理
       */
      if (key.indexOf('toast') > -1) {
        setTimeout(function () {
          data.tips.toast.show = false
        }, 2000)
      }
    }
  }
}
