# 步骤加载

> 状态：preview · slug：`spin-steps` · 类型：component · 母版：web · surface：general · category：`feedback`

## 1. 角色与目标

实现「步骤加载」（`spin-steps`）。清单中已完成打勾、当前步 Spin、后续步静音，适合导入/入职等多步任务。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：列表三项态 `is-done` / `is-active` / `is-pending`；当前步真 `a-spin`；完成步 `icon-check`
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：纵向清单；左图标槽 + 右步骤文案；进行中加粗
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<ul class="wa-spin-steps" role="list">
  <li class="wa-spin-steps__item is-done">
    <span class="wa-spin-steps__icon" aria-hidden="true"><icon-check :size="14" /></span>
    <span>解析文件</span>
  </li>
  <li class="wa-spin-steps__item is-active">
    <span class="wa-spin-steps__icon" role="status" aria-label="进行中"><a-spin :size="14"></a-spin></span>
    <span>写入数据库</span>
  </li>
  <li class="wa-spin-steps__item is-pending">
    <span class="wa-spin-steps__icon" aria-hidden="true"><span class="wa-spin-steps__dot"></span></span>
    <span>发送通知</span>
  </li>
</ul>
```

> 换文案：只改步骤汉字；增减步改 `li` 与态 class。有私有样式时并入宿主 CSS，勿单独 link `component.css`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/spin/steps/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `spin-default` | `components/spin/default/` | |
| `spin-dot` | `components/spin/dot/` | |
| `spin-badge` | `components/spin/badge/` | |
| `spin-input` | `components/spin/input/` | |
| `spin-steps` | `components/spin/steps/` | （本条） |
| `spin-item` | `components/spin/item/` | |
| `spin-processing` | `components/spin/processing/` | |
| `spin-area` | `components/spin/area/` | |
| `spin-fullscreen` | `components/spin/fullscreen/` | |
| `spin-page` | `components/spin/page/` | |
