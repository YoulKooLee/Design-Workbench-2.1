# 连体分页

> 状态：preview · slug：`pagination-joined` · 类型：component · 母版：web · surface：general · category：`navigation`

## 1. 角色与目标

实现「连体分页」（`pagination-joined`）。共享边框的页码按钮组，适合工具条与紧凑筛选栏。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将家族 `components/pagination/component.css` 中 `.wa-pg-joined` 等规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：把翻页状态与 `goPrev` / `goNext` / `goPage` **并入**宿主页 `js/<page>.js`；禁止镜像母版 `component.js` 再强制 `<script src>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 `a-button`（text）组成连体组；当前页加 `wa-pg-joined__active` 与 `aria-current="page"`
- 私有样式真源在 `components/pagination/component.css`；§5 **只贴 HTML**；落地合并进宿主样式

## 4. 视觉规格

- 布局 / 层级 / 强调：共用外框与内分格；圆角跟 `--wa-input-radius`、高 32px，与 Arco 分页页码同规格；箭头 FA 12px；悬停中性 fill-1（箭头不加主色）；当前页主色浅底 + 主色字
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<nav class="wa-pg-joined" aria-label="分页">
  <a-button type="text" :disabled="current <= 1" aria-label="上一页" @click="goPrev">
    <icon-left :size="12" />
  </a-button>
  <a-button
    v-for="n in visiblePages"
    :key="n"
    type="text"
    :class="{ 'wa-pg-joined__active': n === current }"
    :aria-current="n === current ? 'page' : undefined"
    @click="goPage(n)"
  >{{ n }}</a-button>
  <span class="wa-pg-joined__ellipsis" aria-hidden="true">…</span>
  <a-button type="text" :disabled="current >= pageTotal" aria-label="下一页" @click="goNext">
    <icon-right :size="12" />
  </a-button>
</nav>
```

> 换文案：只改汉字，勿改 class / type。有私有样式时并入宿主 CSS，勿单独 link `component.css`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/pagination/joined/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `pagination-default` | `components/pagination/default/` | |
| `pagination-mini` | `components/pagination/mini/` | |
| `pagination-jumper` | `components/pagination/jumper/` | |
| `pagination-full` | `components/pagination/full/` | |
| `pagination-all` | `components/pagination/all/` | |
| `pagination-simple` | `components/pagination/simple/` | |
| `pagination-prev-next` | `components/pagination/prev-next/` | |
| `pagination-counter` | `components/pagination/counter/` | |
| `pagination-text` | `components/pagination/text/` | |
| `pagination-joined` | `components/pagination/joined/` | （本条） |
| `pagination-disabled` | `components/pagination/disabled/` | |
