# 回到顶部

> 状态：preview · slug：`back-top-default` · 类型：component · 母版：web · surface：general · category：`navigation`

## 1. 角色与目标

实现「回到顶部」（`back-top-default`）。监听指定滚动容器，超过阈值后浮现回顶按钮。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录或家族私有样式，将规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-back-top；`target-container` 指向滚动盒；按钮放在滚动盒**外侧**的相对定位包裹层内（勿放进 overflow 内容里，否则会随内容滚走）
- 若有私有样式：规则真源在同目录或家族 CSS；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：滚动区右下角浮层；默认圆形主色按钮
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<div class="wa-backtop-demo">
  <div id="wa-backtop-box" class="wa-backtop-demo__scroll">
    <p v-for="n in 20" :key="n">长列表条目 {{ n }}</p>
  </div>
  <a-back-top target-container="#wa-backtop-box" :visible-height="40"></a-back-top>
</div>
```

> 换文案：只改汉字，勿改 class / type。`.wa-backtop-demo` / `__scroll` 与回顶钮定位规则并入宿主 CSS（对照 `components/index.css`）；勿单独 link。`a-back-top` 须显式闭合；定位勿用行内 `right:12px`（易压住滚动条）。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/back-top/default/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `back-top-default` | `components/back-top/default/` | （本条） |
| `back-top-custom` | `components/back-top/custom/` | |
