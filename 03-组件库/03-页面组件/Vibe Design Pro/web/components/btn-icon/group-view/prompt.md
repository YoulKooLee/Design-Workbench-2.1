# 视图切换按钮组

> 状态：preview · slug：`btn-icon-group-view` · 类型：component · 母版：web · surface：general · category：`basic`

## 1. 角色与目标

实现「视图切换按钮组」（`btn-icon-group-view`）。列表 / 宫格视图切换，用于内容浏览工具栏。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-button-group + 纯图标按钮
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 中性连体图标按钮组
- 列表 / 宫格两入口
- 动效：仅本控件轻交互（hover/focus）
- 颜色：Arco secondary（中性）

## 5. 直接粘贴

```html
<a-button-group type="secondary">
  <a-button type="secondary">
    <template #icon><icon-list /></template>
  </a-button>
  <a-button type="secondary">
    <template #icon><icon-apps /></template>
  </a-button>
</a-button-group>
```

> 换图标：只改 icon-*，勿改 class / type。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/btn-icon/group-view/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `btn-icon` | `components/btn-icon/circle/` | |
| `btn-icon-square` | `components/btn-icon/square/` | |
| `btn-icon-with-label` | `components/btn-icon/with-label/` | |
| `btn-icon-group-pager` | `components/btn-icon/group-pager/` | |
| `btn-icon-group` | `components/btn-icon/group/` | |
| `btn-icon-group-view` | `components/btn-icon/group-view/` | （本条） |
