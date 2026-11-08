# 两列栅格

> 状态：preview · slug：`grid-two-col` · 类型：component · 母版：web · surface：general · category：`basic`

## 1. 角色与目标

实现「两列栅格」（`grid-two-col`）。中等屏以上左右对半分栏，用于落地页内容对照与双栏信息区。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有家族 `component.css`，将规则**并入**宿主页/模块 CSS；**禁止**写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-row / a-col（`:md="12"` 两列）
- 预览壳勿进 §5

## 4. 视觉规格

- 小屏通栏、中等屏及以上左右各半；列内用默认卡片（`wa-acard`：圆角 / 软阴影 / 标题加粗）
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-row :gutter="[16, 16]">
  <a-col :xs="24" :md="12"><a-card class="wa-acard" title="左栏"><p class="wa-acard-desc">主内容或图文说明</p></a-card></a-col>
  <a-col :xs="24" :md="12"><a-card class="wa-acard" title="右栏"><p class="wa-acard-desc">侧栏信息或对照内容</p></a-card></a-col>
</a-row>
```

> 换文案：只改汉字，勿改 class / type。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/grid/two-col/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `grid-two-col` | `components/grid/two-col/` | （本条） |
| `grid-three-col` | `components/grid/three-col/` | |
| `grid-four-col` | `components/grid/four-col/` | |
