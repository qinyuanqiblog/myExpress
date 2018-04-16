import axios from 'axios'
import state from '../state/'
import demoApi from './demoApi'

// 林杰域名地址
// let baseURL = 'http://10.18.200.162:8080/'
// 林杰域名地址
// let baseURL = 'http://8bae45.natappfree.cc'
// 涛哥域名地址
// let baseURL = 'http://10.18.200.162:8080/'
// 王得彭域名地址
// let baseURL = 'http://10.18.200.146:8090/zpgo-shop/'
// 开发环境域名
// let baseURL = 'http://burt.nat300.top/zpgo-shop/'
// 预演环境
// let baseURL = 'http://mt.zpcx.cn/zpgo-shop/'
let baseURL = 'http://10.18.200.159:11111'
// 正式环境
// let baseURL = 'https://zpgo.zpcx.cn/'
let wsApis = 'ws://10.18.3.197:9090/cigar-frontend/socketServer'
let apis = axios.create({
  baseURL: baseURL,
  timeout: 60000,
  headers: {
    'token': localStorage.getItem('_sun_store_token_')
    // 'Content-Type': 'application/x-www-form-urlencoded',
    // 'Content-Type': 'application/x-www-form-urlencoded'
  }
})
let setApisAccessToken = function (token) {
  apis.defaults.headers['token'] = token
}

function getWSApi () {
  return wsApis
}
apis.defaults.transformRequest = [function (data) {
  // 判断 一个东西 是否是对象
  var isObject = function (o) {
    return o !== null && typeof o === 'object'
  }
  var param = function (obj) {
    var query = ''
    var name, value, fullSubName, subName, subValue, innerObj, i
    for (name in obj) {
      value = obj[name]
      if (value instanceof Array) {
        for (i = 0; i < value.length; ++i) {
          subValue = value[i]
          fullSubName = name + '[' + i + ']'
          innerObj = {}
          innerObj[fullSubName] = subValue
          query += param(innerObj) + '&'
        }
      } else if (value instanceof Object) {
        for (subName in value) {
          subValue = value[subName]
          fullSubName = name + '[' + subName + ']'
          innerObj = {}
          innerObj[fullSubName] = subValue
          query += param(innerObj) + '&'
        }
      } else if (value !== undefined && value !== null) {
        query += encodeURIComponent(name) + '=' +
          encodeURIComponent(value) + '&'
      }
    }

    return query.length ? query.substr(0, query.length - 1) : query
  }
  return isObject(data) && String(data) !== '[object File]' ? param(data) : data
}]
apis.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
/**
 * @param {*} httpPromise 一个ajax 请求
 */
// 类似拦截函数
let apisResConsert = function (httpPromise, isGlobeLoading) {
  if (isGlobeLoading) {
    state.commit('tips.loading', {
      show: true
    })
  }
  let promise = new Promise(function (resolve, reject) {
    httpPromise.then(function (res) {
      if (res.data.status === 200 && res.status === 200) {
        resolve(res.data)
      } else {
        reject(res.data)
      }
      if (isGlobeLoading) {
        state.commit('tips.loading', {
          show: false
        })
      }
    }).catch(function (err) {
      reject(err)
      if (isGlobeLoading) {
        state.commit('tips.loading', {
          show: false
        })
      }
    })
  })
  return promise
}
// 相关状态码处理
let rejectHander = function (err) {
  console.log(err)
  // alert(JSON.stringify(err))
  if (err.status) {
    switch (err.status) {
      case 403:
        //  403 拦截器处理相关业务
        break
      case 500:
        state.commit('tips.toast', {
          show: true,
          type: 'error',
          texts: '连接不到服务，请稍后重试'
        })
        setTimeout(() => {
          this.$router.replace('/')
        }, 2000)
        console.error('系统异常')
        break
      default:
        state.commit('tips.toast', {
          show: true,
          type: 'error',
          texts: err.message || '未知错误'
        })
    }
  } else {
    state.commit('tips.toast', {
      show: true,
      type: 'error',
      texts: '网络错误，稍后再试'
    })
  }
}
// 首页相关接口
let idxApis = {
  // psot 请求
  register (data) {
    return apisResConsert(apis({
      method: 'post',
      url: '/users/register',
      data
    }), true)
  },
  // get 请求
  // login (data) {
  //   return apisResConsert(apis({
  //     method: 'post',
  //     url: '/users/login',
  //     params: data
  //   }), true)
  // },
  login (data) {
    return apisResConsert(apis({
      method: 'post',
      url: '/users/login',
      data
    }), true)
  },
  // 上传阿里云
  uploadAliOSS (blob) {
    let promise = new Promise((resolve, reject) => {
      this.aliossPolicy().then((res) => {
        let data = res.data
        let formData = new FormData()
        let fileName = (function (blob) {
          let suffix
          let oName = blob.name
          if (oName) {
            suffix = oName.substring(oName.lastIndexOf('.'))
          } else {
            let fType = blob.type.toLowerCase()
            suffix = fType === 'image/png' ? '.png' : '.jpg'
          }
          let fName = 'sunstore_' + (+new Date()) + '_' + Math.random().toString().substring(2)
          return fName + suffix
        })(blob)
        let key = data.dir + fileName
        formData.append('OSSAccessKeyId', data.accessid)
        formData.append('policy', data.policy)
        formData.append('signature', data.signature)
        formData.append('success_action_status', '200')
        formData.append('expire', data.expire)
        formData.append('key', key)
        formData.append('file', blob, fileName)
        // 这个方法单独显示Loading
        axios({
          // url: data.host,
          // 因为后台返回的是http 的阿里云地址， 导致在正式环境里面的时候h5环境的情况，上传不了头像，暂时先改成下面的这个形式，下一个版本后台会统一返回 2018.1.15  当前版本v2.0
          url: 'https://statics.zpcx.cn',
          method: 'post',
          data: formData,
          contentType: false,
          processData: false
        }).then((res) => {
          resolve(key)
        }).catch((err) => {
          reject(err)
        })
      }).catch((err) => {
        reject(err)
      })
    })
    return promise
  }
}
// export default Object.assign({}, idxApis, { setApisAccessToken, getWSApi, rejectHander })
export default Object.assign({}, idxApis, demoApi(apis, apisResConsert), {
  setApisAccessToken,
  getWSApi,
  rejectHander
})
