# 主色锚点卡片

> 状态：preview · slug：`card-dark` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「主色锚点卡片」（`card-dark`）。对齐「亮色科技蓝」会员锚点卡：主色渐变底 + 角上半透明装饰圆；内嵌按钮白底主色加粗字。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将家族 `components/card/component.css` 中相关规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-card；外层 `.wa-acard.wa-acard--dark`；内嵌 `type=primary` 由家族 CSS 反转为白底主色加粗字
- 私有样式真源在 `components/card/component.css`；§5 **只贴 HTML**；落地合并进宿主样式
- 禁止外链 CDN 图片；封面用本地质感块或 data URI
- Vue 模板内自定义标签勿写成自闭合（如 `</a-card-meta>`、`</a-avatar>`）

## 4. 视觉规格

- 布局 / 层级 / 强调：主色 135° 渐变；右上半透明装饰圆；价格字号分层；按钮 surface 底 + primary 加粗字色 + 轻阴影
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `components/surface-fx`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-card class="wa-acard wa-acard--shadow wa-acard--dark" style="width:320px">
  <p class="wa-acard-kicker">推荐方案</p>
  <div class="wa-acard-price"><span class="wa-acard-price__currency">¥</span>199<span class="wa-acard-price__unit">/月</span></div>
  <p class="wa-acard-desc">会员头图式蓝渐变锚点卡，角上半透明装饰圆。</p>
  <a-button type="primary" shape="round" style="margin-top:16px">立即开通</a-button>
</a-card>
```

> 换文案：只改汉字，勿改 class / type。有私有样式时并入宿主 CSS，勿单独 link `component.css`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/card/dark/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `card-default` | `components/card/default/` | |
| `card-hoverable` | `components/card/hoverable/` | |
| `card-shadow` | `components/card/shadow/` | |
| `card-bordered` | `components/card/bordered/` | |
| `card-actions` | `components/card/actions/` | |
| `card-footer` | `components/card/footer/` | |
| `card-extra` | `components/card/extra/` | |
| `card-tabs` | `components/card/tabs/` | |
| `card-cta` | `components/card/cta/` | |
| `card-dark` | `components/card/dark/` |  （本条） |
| `card-form` | `components/card/form/` | |
| `card-cover` | `components/card/cover/` | |
