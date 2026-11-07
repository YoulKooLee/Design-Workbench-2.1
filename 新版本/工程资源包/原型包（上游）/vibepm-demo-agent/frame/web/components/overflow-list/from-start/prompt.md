# 从首折叠

> 状态：preview · slug：`overflow-list-from-start` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「从首折叠」（`overflow-list-from-start`）。容器限宽时从首部折叠多余标签（`from="start"`）。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-overflow-list，`from="start"`；须给列表明确宽度
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link
- 禁止外链 CDN 图片；示例可用本地质感图或 data URI

## 4. 视觉规格

- 布局：固定示例宽 `240px`（演示用）；业务页改为宿主容器宽
- 折叠方向：`from="start"`（折叠入口在左侧，收起靠前的项）
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-overflow-list style="width:240px" from="start">
  <a-tag>产品</a-tag>
  <a-tag>设计</a-tag>
  <a-tag>研发</a-tag>
  <a-tag>运营</a-tag>
  <a-tag>市场</a-tag>
  <a-tag>销售</a-tag>
  <a-tag>客服</a-tag>
</a-overflow-list>
```

> 换文案：只改汉字，勿改 class / type。落地时把 `240px` 换成宿主容器宽。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗
- [ ] 限宽后折叠入口出现在列表左侧

## 7. 预览

`components/overflow-list/from-start/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `overflow-list-default` | `components/overflow-list/default/` | |
| `overflow-list-from-start` | `components/overflow-list/from-start/` | （本条） |
| `overflow-list-overflow-slot` | `components/overflow-list/overflow-slot/` | |
