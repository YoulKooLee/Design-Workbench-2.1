# WEB 设计资源（`preview/web` ↔ `frame/web`）

**Vibe Design WEB**：组件 / 区块 / 布局（Arco HTML）。本文件在真源与交付镜像中**同文**，整目录同步时可直接覆盖，勿再分叉维护。

| | `website/home/preview/web/` | `vibepm-demo-agent/frame/web/` |
|--|--|--|
| 角色 | **权威真源**（站上预览、catalog、prompt） | **交付镜像**（`prototype-demo` scaffold） |
| 改结构 / 新组件 | **在此改**并写 `status` | 按需从真源同步；勿当权威编辑 |
| 技能 | `website/.cursor/skills/design-library/` | 包内由 `prototype-demo` 消费 |

## 目录

```text
├── _meta/           config、prompt 模板（镜像侧常用）
├── components/      控件家族对照 + 成员 demo
├── blocks/          营销区块
├── layouts/         页面壳 / 布局框架
├── theme/           换肤 / token 验收 lab（非栏目路由）
├── assets/
│   ├── common/
│   │   ├── css/     global · chrome · components + fa-icons
│   │   ├── js/      theme · boot · fa-icons
│   │   ├── charts/  shadcn-chart + palette / charts JS
│   │   └── themes/  可选品牌皮（global.css @import）
│   ├── effects/     橱窗共用特效（按特效名分子目录）
│   ├── fonts/
│   └── images/
├── vendor/          Vue / Arco / Font Awesome（禁 CDN）
└── scripts/         sync-vendor · sync-prompts · UTF-8 工具
```

- 共享 CSS：`global.css` · `chrome.css` · `components.css`。页级样式留在各组件/区块/layout 目录，不进 `assets/common`。
- slug：`components|layouts|blocks/catalog.json`。  
- 档位：`status` = `预览`｜`库存`｜`上架`（仅上架进栏目与搜索）——见 `design-library` SKILL。
- 整页示范 `examples/` 暂缓。

## 职责

| 目录 | 放什么 | 不放 |
|------|--------|------|
| `components/` | 控件 + 交互动效；表面修饰 `surface-fx` | 营销整段 → `blocks/` |
| `blocks/` | 营销区段结构与皮肤（各 `block.css`） | 共享 `blocks.css` |
| `layouts/` | 可复用页面壳（`wa-layout-*`）；默认壳 `layouts/app-sidebar/` | Admin ProShell；整页业务拼装 |
| `theme/` | 换肤 / token lab | 共用特效真源（见 `assets/effects/`） |
| `assets/effects/` | layouts / blocks / theme **共用**页级装饰特效 | 正式动效库存；控件交互动效 |

## 特效落点

| 场景 | 落点 |
|------|------|
| layouts / blocks / theme **多页共用** | `assets/effects/{特效名}/`（如 `dashed-orbit/dashed-orbit.css` + `.js`） |
| **仅本页**使用 | 与该页同级平铺（如 `page.css` 旁的 `{特效名}.css` / `.js`） |
| 区块变体内私有 WebGL 等 | 该变体目录 `assets/`（采集默认） |
| 控件交互 / `surface-fx` | `components/` |

`assets/effects/` 只服务本树橱窗共用，非正式 `/animations` 库存；交付到业务站时仍拷到目标页同级（或按 prompt），勿运行时依赖母版 `effects/` 路径。

## 约定

- 结构与默认文案在 HTML；JS 仅交互。无 `skeleton.html`（骨架在 prompt）。
- 编码 **UTF-8 only**；批量改中文用 `scripts/utf8_replace.py`，勿用 PowerShell `Get-Content`；自检 `scripts/check-utf8.py --strict`。
- vendor：镜像侧可用 `scripts/sync-vendor.ps1` 从 `frame/admin/vendor` 同步 Vue / Arco / Font Awesome，并同步 `fa-icons.js` 与 `assets/fonts`。
- 图标：强制 `fa-icons.js`；WEB 默认 Classic Pro（默认不用 Sharp）。
- Arco 控件微调：`assets/common/css/components.css`。
- layouts：建议 `index.html` + `layout.css` + `prompt.md`；新建先读 `layouts/list.md`。

## 预览参数

| 参数 | 说明 |
|------|------|
| `theme=dark\|light` | 明暗 |
| `brand=` | 品牌皮 |
| `embed=1` | 成员页抠控件 |
| `demo=1` | 壳内自动打开 modal/drawer |

官网栏目深链（`?family=` / `?type=` / `?layout=` 等）由站点 `design-resources.js` 处理，与搜索索引一致。
