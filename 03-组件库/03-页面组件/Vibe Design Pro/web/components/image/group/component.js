;(function () {
  WebArco.mount('#app', {
    setup: function () {
      var groupSrcList = [
        '../../../assets/images/image_03.jpg',
        '../../../assets/images/image_04.jpg',
        '../../../assets/images/image_05.jpg',
      ]
      var groupCurrent = Vue.ref(0)
      var groupVisible = Vue.ref(false)
      function publishPager(visible) {
        if (typeof window.__WA_setImageGroupPager === 'function') {
          window.__WA_setImageGroupPager(
            groupCurrent.value + 1,
            groupSrcList.length,
            visible !== false
          )
        }
      }
      return {
        groupSrcList: groupSrcList,
        groupCurrent: groupCurrent,
        groupVisible: groupVisible,
        openGroupPreview: function () {
          /* 受控打开：避开 Arco 子图自增 id 与 src-list 下标撞车，始终从第一张起 */
          groupCurrent.value = 0
          groupVisible.value = true
          publishPager(true)
        },
        onGroupChange: function (index) {
          groupCurrent.value = index
          publishPager(true)
        },
        onGroupVisibleChange: function (visible) {
          groupVisible.value = !!visible
          if (!visible) groupCurrent.value = 0
          publishPager(!!visible)
        },
      }
    },
  })
})()
