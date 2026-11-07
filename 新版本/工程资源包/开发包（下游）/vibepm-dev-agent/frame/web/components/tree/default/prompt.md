# 树形控件

> 状态：preview · slug：`tree-default` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「树形控件」（`tree-default`）。带面板头的组织架构树，单击选中节点。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将家族 `components/tree/component.css` 中相关规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-tree；`block-node`；`class="wa-tree"`；外层 `.wa-tree-panel`
- 私有样式真源在 `components/tree/component.css`；§5 **只贴 HTML**；落地合并进宿主样式
- Vue 模板内自定义标签勿写成自闭合（用 `></a-tree>`）

## 4. 视觉规格

- 布局 / 层级 / 强调：侧栏定宽面板（约 240px，勿拉满）；圆角用 `--wa-radius`；头栏 + 计数胶囊；节点行级悬停/选中弱底
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<div class="wa-tree-panel">
  <div class="wa-tree-panel__head">
    <span class="wa-tree-panel__title">组织架构</span>
    <span class="wa-tree-panel__count">{{ selectedKeys.length }} / {{ treeNodeCount }}</span>
  </div>
  <div class="wa-tree-panel__body">
    <a-tree
      class="wa-tree"
      block-node
      :data="treeData"
      v-model:selected-keys="selectedKeys"
      v-model:expanded-keys="expandedKeys"
    ></a-tree>
  </div>
</div>
```

> 换文案：只改汉字，勿改 class / type。需提供 `treeData`、`selectedKeys`、`expandedKeys`、`treeNodeCount`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/tree/default/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `tree-default` | `components/tree/default/` | （本条） |
| `tree-checkable` | `components/tree/checkable/` | |
