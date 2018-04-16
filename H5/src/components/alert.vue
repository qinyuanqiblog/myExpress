<template>
    <transition name="modal">
      <div class="store-modal" v-if="alert.show">
        <div class="store-mask"></div>
        <div class="store-alert-content">
          <div class="title">{{alert.texts}}</div>
          <button @click="alert.btnFn()">{{alert.btnName}}</button>
        </div>
      </div>
    </transition>
</template>

<script>
export default {
  props: ['alert']
}
</script>
<style lang="scss" type="text/css" scoped>
  @import '../assets/minix.scss';
  .store-alert-content{
    @include position_a_h(50%, 50%,5.5rem,2.8rem);
    background-color: $store_fff;
    text-align: center;
    border-radius: 5px;
    font-size:12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    transform: translate(-50%,-50%);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .title{
    flex: 1;
    display: flex;
    align-items: center;
    padding: .5rem;
    line-height: 1.5;
    font-size: .32rem;
    color: $store_999;
  }
  button{
    width: 100%;
    height: .88rem;
    font-size:.32rem;
    color: $store_main;
    border-top: 1px solid $store_eee;
  }
</style>
  