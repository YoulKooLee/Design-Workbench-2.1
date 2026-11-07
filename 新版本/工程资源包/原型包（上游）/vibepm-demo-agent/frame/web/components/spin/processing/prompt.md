# 处理请求

> 状态：preview · slug：`spin-processing` · 类型：component · 母版：web · surface：general · category：`feedback`

## 1. 角色与目标

实现「处理请求」（`spin-processing`）。居中面板展示 Spin、标题、说明与取消，适合提交后等待结果。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 `a-spin` + 标题/说明 + `a-button` 取消；业务里绑定取消回调
- DOM 模板里勿写 `<a-spin … />` 自闭合，须写成 `></a-spin>`
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：描边圆角面板；上方圆形主题色浅底槽、16px 转圈；标题 + 说明；底部圆角取消钮
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<div class="wa-spin-processing" role="status" aria-label="正在处理请求">
  <div class="wa-spin-processing__icon" aria-hidden="true">
    <a-spin :size="16"></a-spin>
  </div>
  <h3 class="wa-spin-processing__title">正在处理请求</h3>
  <p class="wa-spin-processing__desc">请稍候，正在处理您的请求。请勿刷新页面。</p>
  <a-button type="secondary" shape="round" size="small">取消</a-button>
</div>
```

> 换文案：只改标题、说明与按钮汉字；勿改 class / type。有私有样式时并入宿主 CSS，勿单独 link `component.css`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/spin/processing/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `spin-default` | `components/spin/default/` | |
| `spin-dot` | `components/spin/dot/` | |
| `spin-badge` | `components/spin/badge/` | |
| `spin-input` | `components/spin/input/` | |
| `spin-steps` | `components/spin/steps/` | |
| `spin-item` | `components/spin/item/` | |
| `spin-processing` | `components/spin/processing/` | （本条） |
| `spin-area` | `components/spin/area/` | |
| `spin-fullscreen` | `components/spin/fullscreen/` | |
| `spin-page` | `components/spin/page/` | |
