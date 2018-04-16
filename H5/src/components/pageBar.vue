<!--
 * -------------------------------------------------------------
 * @File  : page bar
 * @Author: qingsong.guo
 * @Email : 1251005052@qq.com
 * @GitHub: https://github.com/guoqs
 * @Date  : 2017-11-22 11:25:26
 * @Last Modified by:   qingsong.guo
 * @Last Modified time: 2017-11-22 11:25:26
 * -------------------------------------------------------------
 * user
 * <page-bar :pages="totalPages" :current-page = "currentPage" @pageChange="pageChangeHander"></page-bar>
 * -------------------------------------------------------------
-->

<template>
    <ul class="pagination">
      <li class="disabled"><a href="javascript:void(0)" aria-label="Previous"><span aria-hidden="true">共{{pages}}页</span></a></li>
      <li class="disabled"><a href="javascript:void(0)" aria-label="Previous"><span aria-hidden="true">共{{size}}条记录</span></a></li>
      <!-- 上一页按钮 -->
      <li v-if="currentPage==1" class="disabled"><a href="javascript:void(0)" aria-label="Previous"><span aria-hidden="true">«</span></a></li>
      <li v-else><a href="javascript:void(0)" aria-label="Previous" @click="pageChange(currentPage-1)"><span aria-hidden="true">«</span></a></li>
      <!-- 分页显示 -->
      <li v-for="(page,idx) in pageList" :class="currentPage == page?'active':''" :key="idx">
          <a v-if = "currentPage == page" href="javascript:void(0)">{{page}}</a>
          <a v-else href="javascript:void(0)" @click="pageChange(page)">{{page}}</a>
      </li>
      <!-- 下一页按钮 -->
      <li v-if="currentPage==pages" class="disabled"><a href="javascript:void(0)" aria-label="Next"><span aria-hidden="true">»</span></a></li>
      <li v-else><a href="javascript:void(0)" aria-label="Next" @click="pageChange(currentPage+1)"><span aria-hidden="true">»</span></a></li>
      <li  class="disabled" ><a style="margin-left:10px;"><span aria-hidden="true">跳转</span></a></li>
      <!-- 跳转到第几页 -->
      <li ><a style="padding: 0;">
        <input aria-hidden="true" class="form-control"  type="text"  v-model.trim="toPage" style="width: 3em;height: 32px;border-color: transparent;">
      </a></li>
      <li  class="disabled" ><a><span aria-hidden="true">页</span></a></li>
      <li ><a href="javascript:void(0)"  @click="pageChange(toPage)"><span aria-hidden="true">确定</span></a></li>
    </ul>
</template>
<script>
export default {
  name: 'page-bar',
  data () {
    return {
      pageList: [],
      toPage: 1
    }
  },
  props: ['pages', 'currentPage', 'size'],
  created () {
    this.setPageList()
  },
  // updated () {
  //   // this.pageList.length = 0
  //   this.setPageList()
  // },
  watch: {
    currentPage () {
      this.setPageList()
    },
    pages () {
      this.pageList = []
      this.setPageList()
    }
  },
  methods: {
    pageChange (page) {
      if (page > this.pages) {
        alert('最多' + this.pages)
        return
      }
      this.$emit('pageChange', page)
    },
    setPageList () {
      let $this = this
      let pages = $this.pages
      if (!$this.pageList.length) {
        if (pages > 6) {
          $this.pageList = [1, 2, 3, 4, 5, 6]
        } else {
          $this.pageList = []
          for (let i = 1; i <= pages; i++) {
            $this.pageList.push(i)
          }
        }
      } else {
        let $ = window.jQuery
        // let pageListLen = $this.pageList.length
        if ($this.pageList[$this.pageList.length - 1] === $this.currentPage) {
          if ($this.currentPage + 6 < pages) {
            $.each($this.pageList, function (i, v) {
              $this.pageList[i] = $this.pageList[i] + 5
            })
          } else if ($this.currentPage < pages) {
            $.each($this.pageList, function (i, v) {
              $this.pageList[i] = $this.pageList[i] + 1
            })
          }
        } else if ($this.pageList[0] === $this.currentPage || $this.pageList[0] === $this.currentPage + 1) {
          if ($this.currentPage - 6 > 1) {
            $.each($this.pageList, function (i, v) {
              $this.pageList[i] = $this.pageList[i] - 5
            })
          } else if ($this.currentPage > 1) {
            $.each($this.pageList, function (i, v) {
              $this.pageList[i] = $this.pageList[i] - 1
            })
          }
        }
      }
    }
  }
}
</script>
<style  scoped lang="scss" type="text/css" >
.pagination{
  margin: 13px 0;
}
</style>
