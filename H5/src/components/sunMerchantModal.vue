/*
 *-------------------------------------------------------------
 * @File  : Describe the file
 * @Author: qingsong.guo
 * @Email : 1251005052@qq.com
 * @GitHub: https://github.com/guoqs
 * @Date  : 2018-01-23 14:01:52
 * @Last Modified by: qingsong.guo
 * @Last Modified time: 2018-03-16 11:03:22
 *-------------------------------------------------------------
 */
<template>
  <div :id="modalId" class="modal fade" data-backdrop="static" data-keyboard="false">
    <!-- <div class="modal-dialog" :class="size" role="document"> -->
    <div class="modal-dialog" :class="size" >
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
          <h4 class="modal-title" id="myModalLabel">{{title}}</h4>
        </div>
        <div class="modal-body scrollbar">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" v-if="!hiddleCancel" data-dismiss="modal">{{cancelTexts||'取消'}}</button>
          <button type="button" class="btn btn-primary" v-if="isConifrm" @click="confirm()">{{confirmTexts||'确定'}}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
let $ = window.jQuery
export default {
  props: ['modalId', 'size', 'title', 'isConifrm', 'confirmTexts', 'hiddleCancel', 'cancelTexts', 'params'],
  mounted () {
    // setTimeout(() => {
    //   $('#' + this.modalId).modal({show: true})
    // }, 3 * 1000)
  },
  methods: {
    confirm () {
      let modalEle = $('#' + this.modalId)
      modalEle.on('hidden.bs.modal', (e) => {
        this.$emit('confirm', this.params || true)
        modalEle.off('hidden.bs.modal')
      })
      modalEle.modal('hide')
    }
  }
}
</script>
<style  scoped lang="scss" type="text/css" >
.modal-body{
  max-height: 500px;
  overflow: auto;
}
</style>

