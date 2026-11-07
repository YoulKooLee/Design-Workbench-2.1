# 嵌套锚点

> 状态：preview · slug：`anchor-nested` · 类型：component · 母版：web · surface：general · category：`navigation`

## 1. 角色与目标

实现「嵌套锚点」（`anchor-nested`）。多级目录，适合章节含小节的长文档。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录或家族私有样式，将规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：自定义滚动容器时，把点击锚点后写 `scrollTop` 的逻辑**并入**宿主页 `js/<page>.js`；预览挂载壳不拷。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-anchor；子级放在 `#sublist` 插槽（勿塞进默认插槽）；`scroll-container`；自定义 overflow 盒须自管点击滚动；`:change-hash=false`
- 若有私有样式：规则真源在同目录或家族 CSS；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link
- 若有私有业务脚本：真源在同目录 `component.js`；§2 须有「脚本落地」；勿在 §5 写独立 script src

## 4. 视觉规格

- 布局 / 层级 / 强调：父级 + 缩进子级；指示线随当前项移动
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<div class="wa-anchor-demo">
  <a-anchor
    :change-hash="false"
    scroll-container="#wa-anchor-scroll-n"
  >
    <a-anchor-link href="#wa-n1" title="产品">
      <template #sublist>
        <a-anchor-link href="#wa-n1-1" title="能力"></a-anchor-link>
        <a-anchor-link href="#wa-n1-2" title="场景"></a-anchor-link>
      </template>
    </a-anchor-link>
    <a-anchor-link href="#wa-n2" title="方案"></a-anchor-link>
  </a-anchor>
  <div id="wa-anchor-scroll-n" class="wa-anchor-demo__scroll">
    <div id="wa-n1" style="min-height:100px;margin-bottom:12px">产品：整体介绍与价值主张。</div>
    <div id="wa-n1-1" style="min-height:100px;margin-bottom:12px;padding-left:8px">能力：核心模块与能力边界。</div>
    <div id="wa-n1-2" style="min-height:100px;margin-bottom:12px;padding-left:8px">场景：典型落地场景说明。</div>
    <div id="wa-n2" style="min-height:100px">方案：实施路径与交付节奏。</div>
  </div>
</div>
```

> 换文案：只改汉字，勿改 class / type。`.wa-anchor-demo` / `__scroll` 规则并入宿主 CSS；勿单独 link。自定义滚动盒时宿主 JS 需点击后写盒内 `scrollTop`；窗口滚动可去掉 `scroll-container`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/anchor/nested/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `anchor-default` | `components/anchor/default/` | |
| `anchor-line` | `components/anchor/line/` | |
| `anchor-nested` | `components/anchor/nested/` | （本条） |
