# 带内容页头

> 状态：preview · slug：`page-header-content` · 类型：component · 母版：web · surface：general · category：`navigation`

## 1. 角色与目标

实现「带内容页头」（`page-header-content`）。标题区下方挂说明正文，适合帮助页与详情导语。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录或家族私有样式，将规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：把 `@back` 处理逻辑**并入**宿主页 `js/<page>.js`（预览挂载壳不拷）。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-page-header；默认插槽放正文；`@back` 接返回逻辑
- 若有私有样式：规则真源在同目录或家族 CSS；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：标题行 + 下方说明区
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-page-header
  class="wa-page-header-demo"
  title="帮助中心"
  subtitle="使用指南"
  :show-back="true"
  @back="onBack"
>
  <template #extra>
    <a-button type="primary" size="small">反馈</a-button>
  </template>
  <div class="wa-page-header-demo__body">
    本页汇总常见问题与操作步骤，点击返回可回到上一级列表。
  </div>
</a-page-header>
```

> 换文案：只改汉字，勿改 class / type。`.wa-page-header-demo` / `__body` 规则并入宿主 CSS；勿单独 link。宿主需提供 `onBack`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/page-header/content/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `page-header-default` | `components/page-header/default/` | |
| `page-header-extra` | `components/page-header/extra/` | |
| `page-header-breadcrumb` | `components/page-header/breadcrumb/` | |
| `page-header-content` | `components/page-header/content/` | （本条） |
