import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import state from './state/'
import utils from './utils/'
import apis from './apis/'
import setDirectives from './directives/'
// import slider from '@/components/slider'
Vue.config.productionTip = false
/* eslint-disable no-new */
// 公共的扫一扫方法
// 把一下数据存储到 state 里
Vue.prototype.state = state
// api 文件
Vue.prototype.apis = apis
// utils 函数
Vue.prototype.utils = utils
setDirectives(Vue)
Vue.use(ElementUI)
// 这是轮播
// Vue.component('slider', slider)
// 设置 rem
// ;(function () {
//   let resizeTimer
//   ;(function setRem () {
//     let dom = document.querySelector('html')
//     let w = getComputedStyle(dom, null).width
//     w = parseInt(w)
//     dom.style.fontSize = ((w > 640 ? 640 : w) / 7.5) + 'px'
//     if (resizeTimer) {
//       clearTimeout(resizeTimer)
//     }
//     resizeTimer = setTimeout(setRem, 16)
//   })()
// })()
/* eslint-disable*/
// Promise 添加 finally 方法
// alert('Promise.prototype.finally')
// alert(typeof Promise.prototype.finally)
// if(!Promise.prototype.finally){
//   Promise.prototype.finally = function (callback) {
//     let P = this.constructor;
//     return this.then(
//       value  => P.resolve(callback()).then(() => value),
//       reason => P.resolve(callback()).then(() => { throw reason })
//     );
//   };
// }

// 动态加载wxjssdk 和 支付宝的js
if (utils.getPlatform().platformApp === 'tencent_wx') {
  let wxjs = document.createElement('script')
  wxjs.setAttribute('id', 'wx-js')
  document.head.appendChild(wxjs)
  wxjs.addEventListener('error', function () {
    alert('wxjs 加载失败，请稍后再试')
  }, false)
  wxjs.addEventListener('load', storeInit, false)
  wxjs.src = '//res.wx.qq.com/open/js/jweixin-1.2.0.js'
} else {
  storeInit()
}
// else if(utils.getPlatform().platformApp === 'ali_alipay'){
//   let alibaba = document.createElement('script')
//   alibaba.setAttribute('id', 'alibaba-js')
//   document.head.appendChild(alibaba)
//   alibaba.addEventListener('error', function () {
//     alert('alibabajs 加载失败，请稍后再试')
//   }, false)
//   alibaba.src = 'https://a.alipayobjects.com/g/h5-lib/alipayjsapi/3.0.6/alipayjsapi.min.js'
// }
// 处理安卓输入框弹出键盘被挡住问题
;(function(){
  // .container 设置了 overflow 属性, 导致 Android 手机下输入框获取焦点时, 输入法挡住输入框的 bug
  // 相关 issue: https://github.com/weui/weui/issues/15
  // 解决方法:
  // 0. .container 去掉 overflow 属性, 但此 demo 下会引发别的问题
  // 1. 参考 http://stackoverflow.com/questions/23757345/android-does-not-correctly-scroll-on-input-focus-if-not-body-element
  //    Android 手机下, input 或 textarea 元素聚焦时, 主动滚一把
  if (/Android/gi.test(navigator.userAgent)) {
      window.addEventListener('resize', function () {
          if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
              window.setTimeout(function () {
                  document.activeElement.scrollIntoViewIfNeeded();
              }, 0);
          }
      })
  }
})();
/* eslint-disable*/
//初始化 vue 主组件
function  storeInit() {
  let store =  new Vue({
    el: '#app',
    router,
    render: h => h(App)
  })
  window.store = store
}

