<template>
  <div>
    <router-view></router-view>
    <store-loading :loading="loading"></store-loading>
    <store-toast :toast="toast"></store-toast>
    <store-alert :alert="alert"></store-alert>
    <store-confirm :confirm="confirm"></store-confirm>
  </div>
</template>
<script>
import loading from '@/components/loading'
import toast from '@/components/toast'
import alert from '@/components/alert'
import confirm from '@/components/confirm'
export default {
  name: 'app',
  data () {
    return Object.assign({}, this.state.getStorage('tips'), {transitionName: ''})
  },
  created () {
  },
  components: {
    'store-loading': loading,
    'store-toast': toast,
    'store-alert': alert,
    'store-confirm': confirm
  },
  methods: {
    // post demo
    getSNScode () {
      let apis = this.apis
      apis.getSNScode({
        mobile: 123456,
        valiCode: 4567
      }).then(function (res) {
        // console.log(res)
      }).catch(apis.rejectHander)
    }
  },
  watch: {
    'toast.show': function (n) {
      if (!n) {
        // 设置toast的默认值为success, 这会导致连续快速点击的时候会一直变成success状态的
        // let $this = this
        // setTimeout(function () {
        //   $this.toast.type = 'success'
        // }, 600)
      }
    },
    'alert.show': function (n) {
      if (!n) {
        this.alert.texts = ''
        this.alert.btnName = '确定'
        this.alert.btnFn = function () { this.show = false }
      }
    },
    'confirm.show': function (n) {
      if (!n) {
        this.confirm.texts = ''
        this.confirm.confirmName = '确定'
        this.confirm.cancelName = '取消'
        let defaultFn = function () { this.show = false }
        this.confirm.cancalFn = defaultFn
        this.confirm.confirmFn = defaultFn
      }
    }
  }
}
</script>
<style lang="scss" type="text/css">
  @import './assets/minix.scss';
  /* 公用的css */
  html{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }
  html,body{
    @include position_a();
  }
  #sunstore-contianer{
    @include position_a_h(0,50%,100%,100%);
    transform: translate(-50%);
    // max-width: 640px;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: $store_main_bg;
  }
.bgcolor-fff{
  @include position_a();
  background-color: $store_fff;
}
  /* 弹出层 */
  .store-modal{
    z-index: 999;
    @include position_a();
    .store-mask{
      @include position_a();
      background-color: rgba(0,0,0,.3);
    }
  }
  /* 弹出层通用 */
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  /* modal（包含 alert confirm） */
  $times: 0.2s !default;
  $delay: 0.1s !default;
  .store-modal{
    transition-duration: $times + $delay;
    .store-mask{
      transition-duration:  $delay;
    }
    .store-confirm-content,.store-alert-content{
      transition-duration: $times;
      box-shadow: 0 0 10px #000;
      transition-timing-function: ease-in;
    }
  }
  .modal-enter{
    .store-mask{
      opacity: 0;
    }
    .store-confirm-content,.store-alert-content{
      transition-delay:  $delay;
      opacity: 0;
      transform: translate(-50%,-200%) scale(.8) !important;
    }
  }
  .modal-enter-to{
    .store-mask{
      opacity: 1;
    }
    .store-confirm-content,.store-alert-content{
      transition-delay:  $delay;
      opacity: 1;
      transform: translate(-50%,-50%) scale(1) !important;
    }
  }
  .modal-leave{
    .store-mask{
      opacity: 1;
      transition-delay:  $times;
    }
    .store-confirm-content,.store-alert-content{
      opacity: 1;
      transform: translate(-50%,-50%) scale(1) !important;
    }
  }
  .modal-leave-to{
    .store-mask{
      opacity: 0;
      transition-delay:  $times;
    }
    .store-confirm-content,.store-alert-content{
      opacity: 0;
      transform: translate(-50%,-200%) scale(.8) !important;
    }
  }
  /* alert 和 confirm 弹窗动画 */
  /* reset css */
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
	display: block;
}
a{
  text-decoration: none;
}
ol, ul {
	list-style: none;
}
input,a,button,input[type=submit]{
  appearance: none;
  outline: none;
  border: none;
  margin: 0;
  padding: 0;
  background-color: transparent;
  transition-duration: .3s;
  font-size:.26rem;
}
input,a,button,input[type=submit]{
  &:active{
    background-color: $store_e3e3e3;
  }
}
button{
  &:active{
    background-color: rgba(15, 146, 123,.8) !important;
  }
}
.btn{
  height: .8rem;
  border-radius: 3px;
  padding: 0 10px;
}
.btn-main{
  background-color: $store_main;
  color:$store_fff;
}
.btn:disabled{
  background-color: $store_disabled;
}
/* 一些公用的样式 */
.flex{
  display: flex;
}
.flex-column{
  display: flex;
  flex-direction: column;
}
.flex-jcsb{
  display: flex;
  justify-content: space-between;
}
.price-bold{
  font-weight: 400;
  font-size: 0.29rem;
}
.price{
  color:$store_f63;
  // font-weight: 900;
  .price-symbol,.price-dec{
    font-size: .8em;
  }
}
.bg-img-center{
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
.arrow-right{
  width: 1em;
  position: relative;
  &:after{
    content: '';
    display:block;
    @include position_a_h(50%,50%,8px,8px);
    border-color:$store_999;
    border-width: 1px 1px 0  0;
    border-style:solid;
    transform: translate(-50%, -50%) rotate(45deg);
  }
}
.text-load{
    font-size: .2rem;
    color: $store_999;
    text-align: center;
    line-height: 2;
    border-bottom: .24rem solid $store_main_bg;
    background-color: $store_main_bg;

}
.no-datas{
    line-height: 3;
    color: $store_999;
    font-size: .3rem;
    text-align: center;
}
  .store-swiper{
    @include position_a_h(0,0,100%,2.36rem);
    .swiper-container{
      height: 2.36rem;
      img{
        display: block;
        max-width: 100%;
        max-height: 100%;
        font-size: 0;
        margin:  auto;
      }
    }
    .swiper-pagination{
      font-size: 10px;
      bottom:0;
    }
  }
</style>
