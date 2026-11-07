# 登录框架

> 状态：`preview`  
> slug：`login-shell` · 类型：layout · 母版：`web` · surface：`general` · category：`shell`

## 1. 角色与目标

实现「登录框架」（`login-shell`），用于账号登录页：无主导航；居中登录卡片（账号、密码、记住、忘记、注册、第三方示意）。分栏品牌+表单见 `auth-split`。

成功标准：居中单卡可读；校验与弹层示意完整；跟站主题可读；无侧栏/通栏产品导航。

## 2. 实现路径（只走一条）

- **A**（有母版）：**先查** `layouts/login-shell/` → **有则复用预览框架并按 §5 填槽**，勿无故按 §7 重写。
- **B**（无母版 / 其它栈）：只还原框架信息架构。视觉跟宿主库。禁止外网 CDN。
- **样式落地**：多页共用允许交付内一份 `css/layout-login-shell.css`；单页并入宿主 CSS。
- **脚本落地**：登录校验 / 忘记密码 / 注册弹层并入宿主 `js/<page>.js`；预览挂载框架不拷。

## 3. 约束

- 类名 `wa-layout*`、`wa-layout--site-login`；禁止 ProShell 运行时
- 默认 density=comfortable；分栏登录勿塞进本目录，用 `auth-split`
- 禁止外网 CDN；原型无真实鉴权
- 交互：表单校验、忘记密码/注册 Modal、第三方登录示意；主题由 `theme.js` 跟站，无页内切换

## 4. 视觉规格

- 对齐 `vibedesign/lite/login`：主色洗染氛围底 + 居中玻璃登录卡
- 卡内居中品牌标 +「欢迎回来」标题 / 导语；字段带 label；主按钮含图标
- 卡下「返回首页」文字链；无页内明暗按钮（`theme.js` 仍跟站主题）

## 5. 可变槽位

| 槽位 | 说明 | 示例 |
|------|------|------|
| brand | 卡内居中品牌标 | Vibe Design |
| title / lead | 卡片标题与说明 | 欢迎回来 |
| fields | 账号 / 密码 / 记住 / 忘记 | admin / •••••• |
| submit | 登录按钮 | 登录 |
| register | 注册入口 | 注册账号 |
| social | 第三方登录 | 微信 / QQ / 支付宝 |
| modals | 忘记密码 / 注册 | 邮箱验证码示意 |

## 6. 验收

- [ ] 居中单卡，无产品主导航
- [ ] 无 ProShell 运行时、无 CDN、类名为 `wa-layout*`
- [ ] 跟站亮/暗可读；表单与弹层可用
- [ ] **A**：已复用 `layouts/login-shell/` 填槽

## 7. 参考结构（骨架）

```html
<div class="wa-layout wa-layout--site-login">
  <div class="wa-layout__login-bg" aria-hidden="true"><!-- glow / aura / dots --></div>
  <main class="wa-layout__login-main">
    <div class="wa-layout__login-card">
      <a class="wa-layout__login-logo">{{brand}}</a>
      <h1 class="wa-layout__login-title">{{title}}</h1>
      <p class="wa-layout__login-lead">{{lead}}</p>
      <div class="wa-layout__login-fields"><!-- {{fields}} / {{submit}} / {{social}} --></div>
    </div>
    <a class="wa-layout__login-back" href="./index.html">返回首页</a>
  </main>
  <footer class="wa-layout__login-footer">© …</footer>
</div>
```

## 8. 关联资源

| 类型 | 路径 | 说明 |
|------|------|------|
| list | `layouts/list.md` | 库存与选模板 |
| sibling | `layouts/auth-split/` | 分栏登录 |
| density | `design-library/references/layout-density.md` | 密度与 Admin 契约 |
