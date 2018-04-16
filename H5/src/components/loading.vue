<template>
    <transition name="fade">
      <div class="store-modal" v-if="loading.show||loading.showAll">
        <div class="store-mask"></div>
        <div class="store-loading-content">
            <svg class="qsui-loading-quan" width="50" height="50" version="1.1" xmlns="http://www.w3.org/2000/svg"><rect x="23" y="15" width="4" height="12" style="fill:rgba(255,255,255,0.08333333333333333);    transform-origin: 25px 25px; transform: matrix(1,0,0,1,0,-15);"></rect><rect x="23" y="15" width="4" height="12" style="fill:rgba(255,255,255,0.16666666666666666);    transform-origin: 25px 25px; transform: matrix(0.8660254037844387,0.49999999999999994,-0.49999999999999994,0.8660254037844387,7.499999999999999,-12.99038105676658);"></rect><rect x="23" y="15" width="4" height="12" style="fill:rgba(255,255,255,0.25);    transform-origin: 25px 25px; transform: matrix(0.5000000000000001,0.8660254037844386,-0.8660254037844386,0.5000000000000001,12.990381056766578,-7.500000000000002);"></rect><rect x="23" y="15" width="4" height="12" style="fill:rgba(255,255,255,0.3333333333333333);    transform-origin: 25px 25px; transform: matrix(6.123233995736766e-17,1,-1,6.123233995736766e-17,15,-9.18485099360515e-16);"></rect><rect x="23" y="15" width="4" height="12" style="fill:rgba(255,255,255,0.4166666666666667);    transform-origin: 25px 25px; transform: matrix(-0.4999999999999998,0.8660254037844387,-0.8660254037844387,-0.4999999999999998,12.99038105676658,7.4999999999999964);"></rect><rect x="23" y="15" width="4" height="12" style="fill:rgba(255,255,255,0.5);    transform-origin: 25px 25px; transform: matrix(-0.8660254037844387,0.49999999999999994,-0.49999999999999994,-0.8660254037844387,7.499999999999999,12.99038105676658);"></rect><rect x="23" y="15" width="4" height="12" style="fill:rgba(255,255,255,0.5833333333333334);    transform-origin: 25px 25px; transform: matrix(-1,1.2246467991473532e-16,-1.2246467991473532e-16,-1,1.83697019872103e-15,15);"></rect><rect x="23" y="15" width="4" height="12" style="fill:rgba(255,255,255,0.6666666666666666);    transform-origin: 25px 25px; transform: matrix(-0.8660254037844386,-0.5000000000000001,0.5000000000000001,-0.8660254037844386,-7.500000000000002,12.990381056766578);"></rect><rect x="23" y="15" width="4" height="12" style="fill:rgba(255,255,255,0.75);    transform-origin: 25px 25px; transform: matrix(-0.5000000000000004,-0.8660254037844385,0.8660254037844385,-0.5000000000000004,-12.990381056766577,7.500000000000007);"></rect><rect x="23" y="15" width="4" height="12" style="fill:rgba(255,255,255,0.8333333333333334);    transform-origin: 25px 25px; transform: matrix(-1.8369701987210297e-16,-1,1,-1.8369701987210297e-16,-15,2.7554552980815444e-15);"></rect><rect x="23" y="15" width="4" height="12" style="fill:rgba(255,255,255,0.9166666666666666);    transform-origin: 25px 25px; transform: matrix(0.5000000000000001,-0.8660254037844386,0.8660254037844386,0.5000000000000001,-12.990381056766578,-7.500000000000002);"></rect><rect x="23" y="15" width="4" height="12" style="fill:rgba(255,255,255,1);    transform-origin: 25px 25px; transform: matrix(0.8660254037844384,-0.5000000000000004,0.5000000000000004,0.8660254037844384,-7.500000000000007,-12.990381056766577);"></rect></svg>
            <span>{{loading.texts}}</span>  
        </div>
      </div>
    </transition>
</template>

<script>
export default {
  props: ['loading']
}
</script>
<style lang="scss" type="text/css" scoped>
  @import '../assets/minix.scss';
  .store-loading-content{
    @include position_a_h(50%, 50%,100px,100px);
    background-color: rgba(40, 40, 40, .75);
    text-align: center;
    border-radius: 5px;
    font-size:12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    transform: translate(-50%,-50%);
    span{
      color: #fff;
    }
    svg{
      animation: loading 1s infinite linear;
    }
  }

  @keyframes loading {
    from{
      transform: rotate(0deg)
    }
    to{
      transform: rotate(360deg)
    }
  }
</style>
  