# 自定义回顶

> 状态：preview · slug：`back-top-custom` · 类型：component · 母版：web · surface：general · category：`navigation`

## 1. 角色与目标

实现「自定义回顶」（`back-top-custom`）。用默认插槽替换回顶按钮外观。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录或家族私有样式，将规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-back-top；默认插槽自定义按钮；按钮放在滚动盒外侧的相对定位包裹层内
- 若有私有样式：规则真源在同目录或家族 CSS；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：滚动区右下角；圆形描边按钮 + 上箭头图标
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<div class="wa-backtop-demo">
  <div id="wa-backtop-custom-box" class="wa-backtop-demo__scroll">
    <p v-for="n in 20" :key="n">文档段落 {{ n }}</p>
  </div>
  <a-back-top target-container="#wa-backtop-custom-box" :visible-height="40">
    <a-button class="wa-backtop-demo__custom-btn" type="secondary" shape="circle">
      <icon-up></icon-up>
    </a-button>
  </a-back-top>
</div>
```

> 换文案：只改汉字，勿改 class / type。`.wa-backtop-demo` / `__scroll` / `__custom-btn` 与回顶钮定位规则并入宿主 CSS；勿单独 link。自定义标签须显式闭合；自定义按钮用 `type="secondary"` 的 40×40 圆钮以区分默认实心态。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/back-top/custom/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `back-top-default` | `components/back-top/default/` | |
| `back-top-custom` | `components/back-top/custom/` | （本条） |
