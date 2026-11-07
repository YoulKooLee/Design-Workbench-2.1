# 无线条锚点

> 状态：preview · slug：`anchor-line` · 类型：component · 母版：web · surface：general · category：`navigation`

## 1. 角色与目标

实现「无线条锚点」（`anchor-line`）。无左侧指示线的简洁目录，适合紧凑侧栏。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录或家族私有样式，将规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：自定义滚动容器时，把点击锚点后写 `scrollTop` 的逻辑**并入**宿主页 `js/<page>.js`；预览挂载壳不拷。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-anchor；`line-less`；`scroll-container`；自定义 overflow 盒须自管点击滚动；`:change-hash=false`
- 若有私有样式：规则真源在同目录或家族 CSS；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link
- 若有私有业务脚本：真源在同目录 `component.js`；§2 须有「脚本落地」；勿在 §5 写独立 script src

## 4. 视觉规格

- 布局 / 层级 / 强调：无轴线；高亮靠文字态区分
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<div class="wa-anchor-demo">
  <a-anchor
    line-less
    :change-hash="false"
    scroll-container="#wa-anchor-scroll-b"
  >
    <a-anchor-link href="#wa-b1" title="快速开始"></a-anchor-link>
    <a-anchor-link href="#wa-b2" title="进阶用法"></a-anchor-link>
    <a-anchor-link href="#wa-b3" title="常见问题"></a-anchor-link>
  </a-anchor>
  <div id="wa-anchor-scroll-b" class="wa-anchor-demo__scroll">
    <div id="wa-b1" style="min-height:140px;margin-bottom:16px">快速开始：安装与最小可运行示例。</div>
    <div id="wa-b2" style="min-height:140px;margin-bottom:16px">进阶用法：自定义边界、平滑滚动与容器内锚点。</div>
    <div id="wa-b3" style="min-height:140px">常见问题：点击目录项可在右侧滚动区内跳转。</div>
  </div>
</div>
```

> 换文案：只改汉字，勿改 class / type。`.wa-anchor-demo` / `__scroll` 规则并入宿主 CSS；勿单独 link。自定义滚动盒时宿主 JS 需点击后写盒内 `scrollTop`；窗口滚动可去掉 `scroll-container`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/anchor/line/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `anchor-default` | `components/anchor/default/` | |
| `anchor-line` | `components/anchor/line/` | （本条） |
| `anchor-nested` | `components/anchor/nested/` | |
