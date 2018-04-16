export default function (apis, apisResConsert) {
  return {
    // 获取商品信息
    getAntiFakeProdinfo (data) {
      return apisResConsert(apis({
        method: 'post',
        url: '/h5/antiforgery/get/prodinfo',
        data: data
      }), true)
    }
  }
}
