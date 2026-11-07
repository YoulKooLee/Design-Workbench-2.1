# Vibe Design WEB · 样式与令牌

对照母版：`frame/web/assets/common/css/`。工程分层对齐 Admin（`pro|charts|pages`）思路，目录名用 WEB 语义：

| 工程 | 对照母版 / 角色 |
| --- | --- |
| `src/styles/common/chrome.css` | `chrome.css`（结构壳 / reset，换肤少动） |
| `src/styles/common/global.css` | `global.css`（**Style 真源**，`--wa-*`） |
| `src/styles/common/components.css` 等 | 同名 common 控件皮 |
| `src/styles/layouts/*.css` | 各壳 `layout.css`（在对应 `layouts/*.vue` 内 import，勿放 `pages/`、勿挂 `main.ts`） |
| `src/styles/pages/*` | 页级 CSS（在对应 `views` 内 `import`，**勿**挂进 `main.ts`） |

入口：`main.ts` 只挂 `common/*`（+ fonts）；三壳 CSS 随布局组件按路由加载。营销浮标样式并入 `layouts/marketing-shell.css`。

## 令牌

- 前缀 **`--wa-*`**（颜色、圆角、阴影、字体槽）
- 明暗：`html[data-theme="dark"]` + `body[arco-theme="dark"]`（见 Pinia `stores/theme`）
- Arco 主色阶写在 `body` 的 `--primary-*`（与母版一致思路）

## 纪律

1. 未点名不改默认主色 / 默认暗色 / 默认字体
2. 换肤只改交付工程（`common/global.css` / theme store），**禁止改 `frame/web`**
3. **禁止**引入 Admin `arco-theme-pro.css` 与 ProShell；**禁止**把 WEB 样式放进 `admin/src/styles/pro/`
4. 营销站与产品站可共用 token；壳结构不可混用 Admin ProShell（详见 `cross-end.md`）
5. 页级样式进 `pages/`，对照 Admin `src/styles/pages/` 用法
6. `frontend-design.md` 只在已定 Style 边界内强化气质，**不得**另选色板/字体推翻本文

## 与 Admin 映射

WEB→Admin 主色对齐时，可读 `ui-libs/arco-design-vue/style.md` 的映射说明；两端视觉气质**不强求统一**，结构互鉴、壳隔离（`cross-end.md`）。

## 官网规范来源

用户可从官网设计库取得 Style / 组件 prompt；粘贴后按 `components.md`「官网 prompt 阅读顺序」落地，token 仍以工程 `global.css` 为交付真源。
