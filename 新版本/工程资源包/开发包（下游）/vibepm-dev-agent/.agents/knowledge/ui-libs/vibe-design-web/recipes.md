# Vibe Design WEB · 高频页骨架（recipes）

优先于「从零拆装 blocks」。dev 无静态 `web-recipes/` 拷贝；用 **已有 views + 壳** 当骨架，再按 slug 填区块。

## 优先对照（工程内）

| recipe / 用户说法 | 默认壳 | 先对照 | 再填 |
| --- | --- | --- | --- |
| `landing-home` / 官网首页 / 落地首页 | MarketingShell | `src/views/home`（或等价首页） | `frame/web/blocks/*` 按 `components.md` |
| `landing-pricing` / 定价页 | 同站营销壳 | 首页壳 + 新建 `views` | pricing 相关 blocks |
| `product-home` / 产品工作台 | AppSidebarLayout | `src/views/app/workplace`（或等价） | 工作台区块 / 图表 |
| `login` / 居中登录 | LoginShell | `src/views/login` | 登录表单控件 |
| `auth-split` / 分栏登录 | 后置 `auth-split` 壳 | 母版 `layouts/auth-split` → 增量迁壳 | 登录表单 |

未点名壳：营销 → `landing-home`；产品 → `product-home`。

## 步骤

1. 定 siteKind / 壳（`layouts.md`）。
2. **有同类型已有页** → 复制结构与样式分层，再改业务；禁止空白页从零拼顶栏。
3. **无已有页** → 对照 `frame/web/layouts/<slug>/` 迁壳（若尚未有工程壳），主列再按 `pages.md` / `components.md` 查 blocks。
4. 主列区块命中 slug → 对照重写；未命中 → 通用原则 + `frontend-design.md` 边界内编排。
5. 跑 `components.md` 落地自检。

## 禁止

- 有同类型 views / 壳仍从空白 SFC 另起一套顶栏侧栏。
- 登录/文档误套 `app-sidebar`；控制台页误套 `marketing-shell`。
- 把母版 `layouts/` 整目录镜像进工程。
- 引入 ProShell / `pro-*` 当「快捷骨架」。
