<template>
  <transition name="modal">
      <div class="store-modal" v-if="confirm.show">
        <div class="store-mask"></div>
        <div class="store-confirm-content">
            <div class="title">{{confirm.texts}}</div>
            <div class="btns">
                <button @click="confirm.cancalFn()">{{confirm.cancelName}}</button>
                <button @click="confirm.confirmFn()">{{confirm.confirmName}}</button>
            </div>
        </div>
      </div>
  </transition>
</template>

<script>
export default {
  props: ['confirm'],
  mounted () {
    // console.log(this.confirm)
  }
}
</script>
<style lang="scss" type="text/css" scoped>
  @import '../assets/minix.scss';
  .store-confirm-content{
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
  .btns{
    width: 100%;
    height: .88rem;
    font-size:.32rem;
    color: $store_fff;
    display: flex;
    border-top: 1px solid  $store_eee;
  }
  button{
    display: block;
    flex: 1;
    font-size: .3rem;
    &:nth-child(1){
      color:$store_666;
      border-right: 1px solid  $store_eee;
    }
    &:nth-child(2){
      color:$store_main;
    }
  }

</style>
  