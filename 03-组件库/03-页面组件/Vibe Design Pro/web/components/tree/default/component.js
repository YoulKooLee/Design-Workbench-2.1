;(function () {
  WebArco.mount('#app', {
    setup: function () {
      var ref = Vue.ref
      return {
        treeData: TREE_DATA,
        treeNodeCount: treeNodeCount(TREE_DATA),
        selectedKeys: ref(['0-0-0']),
        expandedKeys: ref(['0', '0-0', '0-1', '0-2', '1']),
      }
    },
  })
})()
