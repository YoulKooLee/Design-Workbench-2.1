const TREE_DATA = [
  {
    title: '总公司',
    key: '0',
    children: [
      {
        title: '华东大区',
        key: '0-0',
        children: [
          { title: '上海分部', key: '0-0-0' },
          { title: '杭州分部', key: '0-0-1' },
          { title: '南京分部', key: '0-0-2' },
        ],
      },
      {
        title: '华南大区',
        key: '0-1',
        children: [
          { title: '深圳分部', key: '0-1-0' },
          { title: '广州分部', key: '0-1-1' },
          { title: '厦门分部', key: '0-1-2', disabled: true },
        ],
      },
      {
        title: '华北大区',
        key: '0-2',
        children: [
          { title: '北京分部', key: '0-2-0' },
          { title: '天津分部', key: '0-2-1' },
        ],
      },
    ],
  },
  {
    title: '支撑中心',
    key: '1',
    children: [
      { title: '人力资源', key: '1-0' },
      { title: '财务中心', key: '1-1' },
      { title: '信息技术', key: '1-2' },
    ],
  },
]

function treeNodeCount(nodes) {
  return (nodes || []).reduce(function (sum, node) {
    return sum + 1 + treeNodeCount(node.children)
  }, 0)
}
