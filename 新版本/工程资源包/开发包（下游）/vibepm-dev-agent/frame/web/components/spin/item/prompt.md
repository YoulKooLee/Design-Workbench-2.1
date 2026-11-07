# 列表项加载

> 状态：preview · slug：`spin-item` · 类型：component · 母版：web · surface：general · category：`feedback`

## 1. 角色与目标

实现「列表项加载」（`spin-item`）。列表行左侧 Spin、中间标题与进度元信息、右侧取消，适合下载或支付进行中。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 `a-spin` + 文案行 + `a-button` 取消；业务里绑定进度与取消回调
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：描边列表行；左转圈、中标题/元信息、右取消
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<div class="wa-spin-item" role="status" aria-label="下载中">
  <span class="wa-spin-item__spin"><a-spin :size="16"></a-spin></span>
  <div class="wa-spin-item__body">
    <p class="wa-spin-item__title">下载中 (35%)</p>
    <p class="wa-spin-item__meta">129 MB / 1000 MB</p>
  </div>
  <div class="wa-spin-item__actions">
    <a-button type="text" size="mini">取消</a-button>
  </div>
</div>
```

> 换文案：只改标题、元信息与按钮汉字；勿改 class / type。有私有样式时并入宿主 CSS，勿单独 link `component.css`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/spin/item/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `spin-default` | `components/spin/default/` | |
| `spin-dot` | `components/spin/dot/` | |
| `spin-badge` | `components/spin/badge/` | |
| `spin-input` | `components/spin/input/` | |
| `spin-steps` | `components/spin/steps/` | |
| `spin-item` | `components/spin/item/` | （本条） |
| `spin-processing` | `components/spin/processing/` | |
| `spin-area` | `components/spin/area/` | |
| `spin-fullscreen` | `components/spin/fullscreen/` | |
| `spin-page` | `components/spin/page/` | |
