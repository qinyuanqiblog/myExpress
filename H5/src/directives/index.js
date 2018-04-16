/*
 *-------------------------------------------------------------
 * @File  : 一些指令
 * @Author: qingsong.guo
* @Email : 1251005052@qq.com
 * @GitHub: https://github.com/guoqs
 * @Date  : 2017-11-20 11:43:11
 * @Last Modified by: qingsong.guo
 * @Last Modified time: 2018-01-02 12:37:31
 *-------------------------------------------------------------
 */
export default function (vue) {
  // 文件输入指令
  vue.directive('img-input', {
    inserted (el, binding) {
      el.addEventListener('change', function () {
        let $this = this
        if ($this.value) {
          let dataset = el.dataset
          let value = binding.value
          let url = window.URL || window.webkitURL
          if (!Array.isArray(value)) {
            console.error('v-img-input 指令必须传一个 数组')
            return
          }
          let files = [].slice.call($this.files)
          if (dataset.once) {
            files = [files[0]]
          }
          let tempImgs = []
          let targetSize = dataset.size || 240 * 320
            ; (function compresImgs (files, idx) {
              let file = files[idx - 1]
              if (file) {
                // if (file.size < targetSize) {
                //   tempImgs.push({
                //     src: url.createObjectURL(file),
                //     blob: file
                //   })
                //   compresImgs(files, ++idx)
                // } else {
                let img = document.createElement('img')
                let canvas = document.createElement('canvas')
                let can2d = canvas.getContext('2d')
                img.addEventListener('load', function () {
                  let _this = this
                  let tempW = _this.naturalWidth
                  let tempH = _this.naturalHeight
                  let realSize = tempW * tempH

                  // 处理苹果手机或者手机拍照翻转的情况
                  window.EXIF.getData(_this, function () {
                    let Orientation = window.EXIF.getTag(this, 'Orientation')
                    if (Orientation === 6) {
                      canvas.width = tempH
                      canvas.height = tempW
                      can2d.rotate(90 * Math.PI / 180)
                      can2d.translate(0, -tempH)
                    } else if (Orientation === 3) {
                      canvas.width = tempW
                      canvas.height = tempH
                      can2d.rotate(180 * Math.PI / 180)
                      can2d.translate(-tempW, -tempH)
                    } else if (Orientation === 8) {
                      canvas.width = tempH
                      canvas.height = tempW
                      can2d.rotate(-90 * Math.PI / 180)
                      can2d.translate(-tempW, 0)
                    } else {
                      canvas.width = tempW
                      canvas.height = tempH
                    }
                    can2d.drawImage(_this, 0, 0)
                    // 如果图片本身的分辨率比设置的分辨率小，就直接处理，不压缩
                    if (realSize < targetSize) {
                      canvas.toBlob(function (blob) {
                        tempImgs.push({
                          src: url.createObjectURL(blob),
                          blob: blob
                        })
                        compresImgs(files, ++idx)
                      }, file.type, 1)
                    } else {
                      // 如果图片分辨率较大，就按照设置的最大分辨率大小进行等比压缩
                      // 友情提示：不要操作同一个画布，不然坑死你，用另一个canvas 来处理
                      let canvasCompress = document.createElement('canvas')
                      let ctxCompress = canvasCompress.getContext('2d')
                      let per = canvas.width / canvas.height
                      // 得到压缩后的高度
                      let newHeight = Math.sqrt(targetSize / per)
                      canvasCompress.height = newHeight
                      canvasCompress.width = newHeight * per
                      ctxCompress.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, canvasCompress.width, canvasCompress.height)
                      canvasCompress.toBlob(function (blob) {
                        tempImgs.push({
                          src: url.createObjectURL(blob),
                          blob: blob
                        })
                        compresImgs(files, ++idx)
                      }, file.type, 0.9)
                    }
                  })
                }, false)

                img.src = url.createObjectURL(file)

                // }
              } else {
                // 处理完毕 该返回赋值了
                if (dataset.once) {
                  // value[0] = tempImgs[0]
                  value.splice(0, value.length, tempImgs[0])
                } else {
                  value.splice(value.length, 0, ...tempImgs)
                }
                // 清除input的值，可以让用户上传同一张图片
                $this.value = ''
              }
            })(files, 1)

          // if (files.length) {
          //   if (dataset.once) {
          //     value.length = 0
          //     value.push({
          //       src: url.createObjectURL(files[0]),
          //       blob: files[0]
          //     })
          //   } else {
          //     files.forEach(function (file) {
          //       value.push({
          //         src: url.createObjectURL(file),
          //         blob: file
          //       })
          //     })
          //   }
          // }
        }
      }, false)
    }
  })
  // Load more 指令
  vue.directive('load-more', {
    inserted (el, binding) {
      el.addEventListener('scroll', function (e) {
        if (el.scrollHeight - el.scrollTop < el.offsetHeight + 50) {
          binding.value()
        }
      }, false)
    }
  })
  // 首页轮播
  vue.directive('swiper', {
    update (el, binding) {
      let dataset = el.dataset
      let playList = JSON.parse(dataset.playList).data
      let swiperData = playList.materials[0].mediaMaterial
      let htmlStr = ''
      htmlStr = `<div class="swiper-container"><div class="swiper-wrapper"></div><div class="swiper-pagination"></div>
      </div>`
      el.innerHTML = htmlStr
      switch (playList.materials.materialType) {
        // 视频
        case 0:

          break
        // 文本
        case 2:

          break
        // 图片
        default:
          let swiperWrapper = el.querySelector('.swiper-wrapper')
          for (let i = 0; i < swiperData.length; i++) {
            let div = document.createElement('div')
            div.className = 'swiper-slide'
            div.innerHTML = '<img src="' + swiperData[i].content + '"/>'
            swiperWrapper.appendChild(div)
          }
          break
      }

      let stroeSwiper = new window.Swiper('.swiper-container', {
        autoplay: {
          delay: playList.adDuration * 1000 || 3000,
          stopOnLastSlide: false,
          disableOnInteraction: true
        },
        pagination: {
          el: '.swiper-pagination'
        }
      })
      stroeSwiper.on('click', function (e) {
        // console.log(e)
      })
    }
    // updated () {
    // }
  })
  // 修改生日
  vue.directive('birthday-change', {
    inserted (el, binding) {
      let dataset = el.dataset
      let platform = JSON.parse(dataset.platform)
      if (platform.os === 'ios') {
        el.addEventListener('blur', function () {
          if (dataset.birthDay && (dataset.oldBirth ? dataset.birthDay !== dataset.oldBirth.substring(0, 10) : true)) {
            binding.value(dataset.birthDay)
          }
        }, false)
      }
    }
  })
}
