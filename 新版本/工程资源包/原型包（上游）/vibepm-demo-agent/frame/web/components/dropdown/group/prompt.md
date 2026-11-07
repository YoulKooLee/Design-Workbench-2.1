# 标签分组

> 状态：preview · slug：`dropdown-group` · 类型：component · 母版：web · surface：general · category：`navigation`

## 1. 角色与目标

实现「标签分组」（`dropdown-group`）。带组标题的图标菜单：两组「标签」分别含复制/编辑与分组/克隆/删除。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录或家族私有样式，将规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-dropdown + a-dgroup + a-doption；组间 `.wa-dropdown-sep`
- 若有私有样式：规则真源在同目录或家族 CSS；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：组标题（灰色小字）+ 图标选项；两组之间分隔线
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-dropdown>
  <a-button type="secondary">带标签分组 <icon-down /></a-button>
  <template #content>
    <a-dgroup title="标签">
      <a-doption>
        <template #icon><icon-copy /></template>
        复制
      </a-doption>
      <a-doption>
        <template #icon><icon-edit /></template>
        编辑
      </a-doption>
    </a-dgroup>
    <div class="wa-dropdown-sep" role="separator"></div>
    <a-dgroup title="标签">
      <a-doption>
        <template #icon><icon-layer-group /></template>
        分组
      </a-doption>
      <a-doption>
        <template #icon><icon-clone /></template>
        克隆
      </a-doption>
      <a-doption>
        <template #icon><icon-delete /></template>
        删除
      </a-doption>
    </a-dgroup>
  </template>
</a-dropdown>
```

> 换文案：只改汉字，勿改 class / type。有私有样式时并入宿主 CSS，勿单独 link `component.css`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/dropdown/group/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| dropdown-default | components/dropdown/default/ | |
| dropdown-button | components/dropdown/button/ | |
| dropdown-icons | components/dropdown/icons/ | |
| dropdown-group | components/dropdown/group/ | （本条） |
| dropdown-more | components/dropdown/more/ | |
| dropdown-user | components/dropdown/user/ | |
| dropdown-checkbox | components/dropdown/checkbox/ | |
| dropdown-radio | components/dropdown/radio/ | |
| dropdown-theme | components/dropdown/theme/ | |
| dropdown-rich | components/dropdown/rich/ | |
| dropdown-submenu | components/dropdown/submenu/ | |
| dropdown-help | components/dropdown/help/ | |
