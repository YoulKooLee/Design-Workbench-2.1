# 纵向滚动

> 状态：preview · slug：`scrollbar-vertical` · 类型：component · 母版：web · surface：general · category：`basic`

## 1. 角色与目标

实现「纵向滚动」（`scrollbar-vertical`）。定高区域纵向滚动，用于卡片网格、侧栏列表与长内容嵌套。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有家族 `component.css`，将 `.wa-sb-v` / `.wa-sb-grid` / `.wa-sb-card*` 规则**并入**宿主页/模块 CSS；**禁止**写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-scrollbar；`type="embed"` 悬停显条；高度锁在 **outer-style**（与横向一致）
- 内容为三列默认卡片（`a-card.wa-acard`）网格；容器浅灰底（`--color-fill-2`）
- 预览壳勿进 §5

## 4. 视觉规格

- 定高纵向滚动；三列默认卡片（圆角 / 软阴影 / 标题加粗）；embed 悬停显细滑块，无轨道底
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-scrollbar
  type="embed"
  outer-class="wa-sb-v"
  :outer-style="{ width: '100%', maxWidth: '100%', height: '280px' }"
  style="height:100%;width:100%;overflow:auto"
>
  <div class="wa-sb-grid">
    <a-card
      v-for="n in 12"
      :key="n"
      class="wa-sb-card wa-acard"
      :title="'卡片标题 ' + n"
    >
      <p class="wa-acard-desc">这里是卡片主体内容说明。</p>
    </a-card>
  </div>
</a-scrollbar>
```

> 换文案：只改汉字，勿改 class / type。

## 6. 验收

- [ ] 三列卡片网格可纵向滚动，容器为浅灰底
- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/scrollbar/vertical/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `scrollbar-vertical` | `components/scrollbar/vertical/` | （本条） |
| `scrollbar-horizontal` | `components/scrollbar/horizontal/` | |
