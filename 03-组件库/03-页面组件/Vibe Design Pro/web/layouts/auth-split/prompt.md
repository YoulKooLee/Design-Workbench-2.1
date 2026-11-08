# 分栏登录

> 状态：`preview`  
> slug：`auth-split` · 类型：layout · 母版：`web` · surface：`general` · category：`shell`

## 1. 角色与目标

实现「分栏登录」（`auth-split`），用于品牌感更强的登录页：左侧品牌叙事区 + 右侧登录表单。表单交互与 `login-shell` 同源；居中单卡仍用 `login-shell`。

成功标准：左右分区清晰；窄屏上下叠放；校验与弹层可用；跟站主题可读；无产品主导航。

## 2. 实现路径（只走一条）

- **A**（有母版）：**先查** `layouts/auth-split/` → **有则复用预览框架并按 §5 填槽**，勿无故按 §7 重写。
- **B**（无母版 / 其它栈）：只还原框架信息架构。视觉跟宿主库。禁止外网 CDN。
- **样式落地**：多页共用允许交付内一份 `css/layout-auth-split.css`；单页并入宿主 CSS。
- **脚本落地**：登录校验 / 忘记密码 / 注册弹层并入宿主 `js/<page>.js`；预览挂载框架不拷。

## 3. 约束

- 类名 `wa-layout*`、`wa-layout--site-auth-split`；禁止 ProShell 运行时
- 从 `login-shell` 分叉，勿把分栏塞回居中壳
- 默认 density=comfortable；禁止外网 CDN；原型无真实鉴权
- 响应式：≤900px 品牌区在上、表单在下
- 交互：表单校验、忘记密码/注册 Modal、第三方登录示意；主题由 `theme.js` 跟站，无页内切换

## 4. 视觉规格

- 左栏：主色渐变底、品牌、标题、卖点列表、版权
- 右栏：浅底表单列（标题、带 label 字段、登录、注册、社交）
- 输入框样式与 `login-shell` 同源（半透明灰底 + 主色描边）
- 颜色用 `--wa-*`；无页内明暗按钮（`theme.js` 仍跟站主题）

## 5. 可变槽位

| 槽位 | 说明 | 示例 |
|------|------|------|
| panelBrand | 左栏品牌 | Vibe Design |
| panelCopy | 左栏标题、导语、卖点与页脚文案 | 产品协作与设计资产分享平台；勿写「左/右侧」布局说明 |
| title / lead | 右栏标题与说明 | 账号登录 |
| fields | 账号 / 密码 / 记住 / 忘记 | admin / •••••• |
| submit / register / social | 登录与其它方式 | 同 login-shell |
| modals | 忘记密码 / 注册 | 邮箱验证码示意 |

## 6. 验收

- [ ] 左右分栏（窄屏叠放）
- [ ] 无 ProShell 运行时、无 CDN、类名为 `wa-layout*`
- [ ] 跟站亮/暗可读；表单与弹层可用
- [ ] **A**：已复用 `layouts/auth-split/` 填槽

## 7. 参考结构（骨架）

```html
<div class="wa-layout wa-layout--site-auth-split">
  <aside class="wa-layout__auth-panel">
    <a class="wa-layout__auth-panel-brand">{{panelBrand}}</a>
    <div class="wa-layout__auth-panel-body"><!-- {{panelCopy}} --></div>
  </aside>
  <div class="wa-layout__auth-form-col">
    <main class="wa-layout__login-main">
      <div class="wa-layout__login-form-wrap"><!-- {{fields}} --></div>
    </main>
  </div>
</div>
```

## 8. 关联资源

| 类型 | 路径 | 说明 |
|------|------|------|
| list | `layouts/list.md` | 库存与选模板 |
| sibling | `layouts/login-shell/` | 居中登录源 |
| density | `design-library/references/layout-density.md` | 密度与 Admin 契约 |
