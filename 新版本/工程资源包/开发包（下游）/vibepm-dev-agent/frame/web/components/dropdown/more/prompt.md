# 更多操作

> 状态：preview · slug：`dropdown-more` · 类型：component · 母版：web · surface：general · category：`navigation`

## 1. 角色与目标

实现「更多操作」（`dropdown-more`）。省略号文字按钮触发行内次要操作菜单。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录或家族私有样式，将规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-dropdown；触发器仅图标并带 `aria-label`；危险项 `wa-dropdown-danger`
- 若有私有样式：规则真源在同目录或家族 CSS；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：紧凑省略号触发；选项带图标；删除项红色分隔
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-dropdown position="br">
  <a-button type="text" aria-label="更多操作">
    <template #icon><icon-ellipsis /></template>
  </a-button>
  <template #content>
    <a-doption>
      <template #icon><icon-eye /></template>
      查看
    </a-doption>
    <a-doption>
      <template #icon><icon-edit /></template>
      编辑
    </a-doption>
    <a-doption>
      <template #icon><icon-copy /></template>
      复制
    </a-doption>
    <div class="wa-dropdown-sep" role="separator"></div>
    <a-doption class="wa-dropdown-danger">
      <template #icon><icon-delete /></template>
      删除
    </a-doption>
  </template>
</a-dropdown>
```

> 换文案：只改汉字，勿改 class / type。有私有样式时并入宿主 CSS，勿单独 link `component.css`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/dropdown/more/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| dropdown-default | components/dropdown/default/ | |
| dropdown-button | components/dropdown/button/ | |
| dropdown-icons | components/dropdown/icons/ | |
| dropdown-group | components/dropdown/group/ | |
| dropdown-more | components/dropdown/more/ | （本条） |
| dropdown-user | components/dropdown/user/ | |
| dropdown-checkbox | components/dropdown/checkbox/ | |
| dropdown-radio | components/dropdown/radio/ | |
| dropdown-theme | components/dropdown/theme/ | |
| dropdown-rich | components/dropdown/rich/ | |
| dropdown-submenu | components/dropdown/submenu/ | |
| dropdown-help | components/dropdown/help/ | |
