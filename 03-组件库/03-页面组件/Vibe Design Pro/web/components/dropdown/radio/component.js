;(function () {
  WebArco.mount('#app', {
    setup: function () {
      var pay = Vue.ref('card')
      return {
        pay: pay,
        payList: [
          { key: 'card', label: '银行卡' },
          { key: 'alipay', label: '支付宝' },
          { key: 'wechat', label: '微信支付' },
          { key: 'cod', label: '货到付款', disabled: true },
        ],
        setPay: function (key) {
          if (key === 'cod') return
          pay.value = key
        },
      }
    },
  })
})()
