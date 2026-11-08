# 选项标签组

> 状态：preview · slug：`tag-option` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「选项标签组」（`tag-option`）。单选状态胶囊组：未选中主色浅底，选中实底 + 主色光晕（如草稿箱 / 审阅中）。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：`.wa-tag--pill` / `.wa-tag--option` 已写入全局 `assets/common/css/components.css`；把家族 `component.css` 中 `.wa-tag-option-group` **并入**宿主 CSS。
- **脚本落地**：把 `option` / `selectOption`（或等价单选态）**并入**宿主页 `js/<page>.js`；**禁止**镜像母版 `component.js`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-tag + `checkable` + `bordered` + `wa-tag--option`；用共享 `option` 做互斥单选；勿加预设 `color`
- 若有私有业务脚本：真源在同目录 `component.js`；勿在 §5 写独立 script src

## 4. 视觉规格

- 布局 / 层级 / 强调：胶囊横排；未选 soft、选中 solid + `0 4px 14px` 主色光晕
- 动效：仅 hover 轻抬与选中过渡；Shine / Glow 装饰 → `animations/`
- 颜色：只用 `--wa-color-primary`

## 5. 直接粘贴

```html
<div class="wa-tag-option-group" role="radiogroup" aria-label="状态筛选">
  <a-tag checkable bordered class="wa-tag--pill wa-tag--option" :checked="option === 'draft'" @check="(v) => selectOption('draft', v)">草稿箱</a-tag>
  <a-tag checkable bordered class="wa-tag--pill wa-tag--option" :checked="option === 'review'" @check="(v) => selectOption('review', v)">审阅中</a-tag>
  <a-tag checkable bordered class="wa-tag--pill wa-tag--option" :checked="option === 'published'" @check="(v) => selectOption('published', v)">已发布</a-tag>
  <a-tag checkable bordered class="wa-tag--pill wa-tag--option" :checked="option === 'archived'" @check="(v) => selectOption('archived', v)">已归档</a-tag>
</div>
```

> 换文案：只改汉字与 key。宿主须已挂 `components.css`，并提供 `option` / `selectOption`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 同时仅一项选中；选中有主色光晕
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/tag/option/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `tag-color` | `components/tag/color/` | |
| `tag-bordered` | `components/tag/bordered/` | |
| `tag-default` | `components/tag/default/` | |
| `tag-closable` | `components/tag/closable/` | |
| `tag-small` | `components/tag/small/` | |
| `tag-checkable` | `components/tag/checkable/` | |
| `tag-icon` | `components/tag/icon/` | |
| `tag-loading` | `components/tag/loading/` | |
| `tag-soft` | `components/tag/soft/` | |
| `tag-option` | `components/tag/option/` | （本条） |
| `tag-icon-text` | `components/tag/icon-text/` | |
| `tag-icon-badge` | `components/tag/icon-badge/` | |
