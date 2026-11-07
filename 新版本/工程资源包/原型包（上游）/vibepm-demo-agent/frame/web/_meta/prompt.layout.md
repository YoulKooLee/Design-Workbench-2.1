# {{中文名}}

> 状态：`skeleton` | `preview` | `stable`  
> slug：`{{slug}}` · 类型：layout · 母版：`web` · surface：`{{marketing|app|general}}` · category：`{{shell|sidebar|topnav|split|stack}}`

<!--
复制为 layouts/{slug}/prompt.md。整文件可一键复制给 Agent。
复用单元是整页壳：有母版则复用预览骨架并按 §5 填槽；§7 与预览同构。
类名用 wa-layout-*；密度见 design-library references/layout-density.md。
新建：按 layouts/list.md 复制结构最接近的已有壳再改本条差异；勿从空白起手；勿一律从 app-sidebar 复制。layoutDefault 只表示交付未点名时的默认壳。
-->

## 1. 角色与目标

实现「{{中文名}}」（`{{slug}}`），用于 {{一句话场景：如产品站侧栏导航壳 / 营销顶栏+页脚}}。

成功标准：{{用户能辨认壳分区、主内容槽位清晰、窄屏可用}}。

## 2. 实现路径（只走一条）

- **A**（有母版）：**先查** `layouts/{{slug}}/` → **有则复用预览壳并按 §5 填槽**，勿无故按 §7 重写。
- **B**（无母版 / 其它栈）：只还原壳信息架构（brand / sider / navbar / content / footer 按需）。视觉跟宿主库。禁止未探测到 Arco 时强行 import、禁止外网 CDN。
- **样式落地**：若有同目录 `layout.css`，单页使用则并入宿主页 CSS；**多页共用同一壳**时允许交付内保留一份共享 CSS（如 `css/layout-{{slug}}.css`）。禁止无故镜像母版 `layouts/.../layout.css` 目录仅供 link。
- **脚本落地**（**仅本条有业务脚本时写**；无则整条删除）：折叠 / 抽屉等逻辑并入宿主 `js/<page>.js`；禁止镜像母版 `layout.js`。预览挂载壳不拷。

## 3. 约束

- Vibe Design WEB；壳类名 `wa-layout*`；**禁止**拷 Admin ProShell 运行时（`shell.js` / `routes` / `pro-*`）
- 密度：`surface=app` 默认 compact；`marketing` / `general` 默认 comfortable；用 `--wa-shell-*` / `data-density`，勿另写一套 DOM
- **壳内控件**：有 `components/` slug 则粘贴成员 §5；内容弹窗须 `modal-class="pro-content-modal"`；确认弹窗须 `modalClass: 'pro-confirm-modal'`
- 禁止外网 CDN；资源本地化
- 内容槽沿用 app-sidebar 引导卡接法（非假看板）；交付时删引导、接入业务视图
- 响应式：{{本条规则，如窄屏 sider 改抽屉}}
- 交互：{{折叠 / 明暗切换接线等}}

## 4. 视觉规格

- 布局 / 层级：{{侧栏+主列 / 顶栏+内容 等，2～4 条}}
- 颜色：只用 `--wa-*`（及壳 token `--wa-shell-*`）
- 明暗 / 品牌：跟随 `theme.js`（明暗 + `WA_BRAND`）；预览页建议露出主题切换

## 5. 可变槽位

| 槽位 | 说明 | 示例 |
|------|------|------|
| brand | 产品名 / Logo | Vibe |
| nav | 导航项（占位即可） | 概览 / 项目 / 设置 |
| content | 主内容区 | （灰色占位块） |
| {{…}} | … | … |

## 6. 验收

- [ ] 与 §7 / 预览同一壳分区与槽位
- [ ] 符合 §3；无 ProShell 运行时、无 CDN、类名为 `wa-layout*`
- [ ] 壳内 `a-modal` / `Modal.*` 已挂组件库皮肤 class（见 §3）
- [ ] 亮/暗（及选用品牌皮）下壳可读
- [ ] **A 且已有 slug**：已复用 `layouts/{{slug}}/` 填槽，未无故全量重写

## 7. 参考结构（骨架）

与预览壳同构（按需删减区域）：

```html
<div class="wa-layout wa-layout--side" data-density="compact">
  <div class="wa-layout__body">
    <aside class="wa-layout__sider">
      <a class="wa-layout__brand">{{brand}}</a>
      <nav><!-- {{nav}} --></nav>
    </aside>
    <div class="wa-layout__main">
      <header class="wa-layout__navbar wa-layout__navbar--embedded">{{navbar}}</header>
      <main class="wa-layout__content">{{content slot}}</main>
    </div>
  </div>
</div>
```

## 8. 关联资源（可选）

无则整节删除。

| 类型 | 路径 | 说明 |
|------|------|------|
| component | `components/{{slug}}/` | 壳内用到的控件 |
| baseline | `layouts/list.md` | 库存与选模板；复制最接近的已有壳 |
| density | `design-library/references/layout-density.md` | 密度与 Admin 契约 |
