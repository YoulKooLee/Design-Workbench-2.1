# 四列栅格

> 状态：preview · slug：`grid-four-col` · 类型：component · 母版：web · surface：general · category：`basic`

## 1. 角色与目标

实现「四列栅格」（`grid-four-col`）。四列响应式分栏，用于特性图标区、指标卡与密集信息排布。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有家族 `component.css`，将规则**并入**宿主页/模块 CSS；**禁止**写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-row / a-col（`:md="6"` 四列）
- 预览壳勿进 §5

## 4. 视觉规格

- 响应式四列（xs 通栏 / sm 两列 / md 四列）；列内用默认卡片（`wa-acard`：圆角 / 软阴影 / 标题加粗）
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-row :gutter="[16, 16]">
  <a-col :xs="24" :sm="12" :md="6"><a-card class="wa-acard" title="栏目一"><p class="wa-acard-desc">栅格列内容 A</p></a-card></a-col>
  <a-col :xs="24" :sm="12" :md="6"><a-card class="wa-acard" title="栏目二"><p class="wa-acard-desc">栅格列内容 B</p></a-card></a-col>
  <a-col :xs="24" :sm="12" :md="6"><a-card class="wa-acard" title="栏目三"><p class="wa-acard-desc">栅格列内容 C</p></a-card></a-col>
  <a-col :xs="24" :sm="12" :md="6"><a-card class="wa-acard" title="栏目四"><p class="wa-acard-desc">栅格列内容 D</p></a-card></a-col>
</a-row>
```

> 换文案：只改汉字，勿改 class / type。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/grid/four-col/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `grid-two-col` | `components/grid/two-col/` | |
| `grid-three-col` | `components/grid/three-col/` | |
| `grid-four-col` | `components/grid/four-col/` | （本条） |
