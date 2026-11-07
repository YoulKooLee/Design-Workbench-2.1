;(function () {
  WebArco.mount('#app', {
    setup: function () {
      var ref = Vue.ref
      return {
        treeData: TREE_DATA,
        treeNodeCount: treeNodeCount(TREE_DATA),
        checkedKeys: ref(['0-0-0', '0-0-1', '1-0']),
        checkExpandedKeys: ref(['0', '0-0', '0-1', '0-2', '1']),
      }
    },
  })
})()
