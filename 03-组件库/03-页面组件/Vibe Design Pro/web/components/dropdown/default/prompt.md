# 下拉菜单

> 状态：preview · slug：`dropdown-default` · 类型：component · 母版：web · surface：general · category：`navigation`

## 1. 角色与目标

实现「下拉菜单」（`dropdown-default`）。中性按钮触发带图标的账户/设置选项列表（无分组分隔）。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录或家族私有样式，将规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-dropdown + a-doption；选项带 `#icon`；本条不分隔分组
- 若有私有样式：规则真源在同目录或家族 CSS；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：中性触发按钮 + 圆角浮层；每项前置 FA 图标，单项连续列表
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-dropdown>
  <a-button type="secondary">打开菜单 <icon-down /></a-button>
  <template #content>
    <a-doption>
      <template #icon><icon-user /></template>
      个人资料
    </a-doption>
    <a-doption>
      <template #icon><icon-settings /></template>
      账单设置
    </a-doption>
    <a-doption>
      <template #icon><icon-user-group /></template>
      团队成员
    </a-doption>
    <a-doption>
      <template #icon><icon-poweroff /></template>
      退出登录
    </a-doption>
  </template>
</a-dropdown>
```

> 换文案：只改汉字，勿改 class / type。有私有样式时并入宿主 CSS，勿单独 link `component.css`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/dropdown/default/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| dropdown-default | components/dropdown/default/ | （本条） |
| dropdown-button | components/dropdown/button/ | |
| dropdown-icons | components/dropdown/icons/ | |
| dropdown-group | components/dropdown/group/ | |
| dropdown-more | components/dropdown/more/ | |
| dropdown-user | components/dropdown/user/ | |
| dropdown-checkbox | components/dropdown/checkbox/ | |
| dropdown-radio | components/dropdown/radio/ | |
| dropdown-theme | components/dropdown/theme/ | |
| dropdown-rich | components/dropdown/rich/ | |
| dropdown-submenu | components/dropdown/submenu/ | |
| dropdown-help | components/dropdown/help/ | |
