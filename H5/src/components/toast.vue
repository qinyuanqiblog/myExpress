<template>
    <transition name="fade">
    <div class="store-modal" v-show="toast.show">
      <div class="store-mask"></div>
      <div class="store-toast-content">
          <img v-show="toast.type == 'success'" src="../assets/icon_path@2x.png" alt="">
          <img v-show="toast.type == 'warning'" src="../assets/icon_notice@2x.png" alt="">
          <img v-show="toast.type == 'error'" src="../assets/icon_fail@2x.png" alt="">
        <span>{{toast.texts}}</span>  
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['toast']
}
</script>
<style lang="scss" type="text/css" scoped>
  @import '../assets/minix.scss';
  .store-mask{
    background-color: transparent;
  }
  .store-toast-content{
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
    img{
      width: 50px;
      height: 50px;
    }
  }
</style>
  