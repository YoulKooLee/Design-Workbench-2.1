# 徽标加载

> 状态：preview · slug：`spin-badge` · 类型：component · 母版：web · surface：general · category：`feedback`

## 1. 角色与目标

实现「徽标加载」（`spin-badge`）。内联胶囊徽标带迷你 Spin，适合同步、后台刷新等轻量状态。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-spin（`:size="14"`）+ `.wa-spin-badge` 胶囊；`role="status"`
- DOM 模板里勿写 `<a-spin … />` 自闭合，否则后面的文案会被吞进 Spin 子节点、转圈消失；须写成 `></a-spin>`
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：主色填充胶囊；左 14px 反白转圈 + 右状态文案
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<span class="wa-spin-badge" role="status" aria-label="同步中">
  <a-spin :size="14"></a-spin>
  <span class="wa-spin-badge__text">同步中</span>
</span>
```

> 换文案：只改汉字，勿改 class / type。有私有样式时并入宿主 CSS，勿单独 link `component.css`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/spin/badge/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `spin-default` | `components/spin/default/` | |
| `spin-dot` | `components/spin/dot/` | |
| `spin-badge` | `components/spin/badge/` | （本条） |
| `spin-input` | `components/spin/input/` | |
| `spin-steps` | `components/spin/steps/` | |
| `spin-item` | `components/spin/item/` | |
| `spin-processing` | `components/spin/processing/` | |
| `spin-area` | `components/spin/area/` | |
| `spin-fullscreen` | `components/spin/fullscreen/` | |
| `spin-page` | `components/spin/page/` | |
