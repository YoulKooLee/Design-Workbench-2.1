# ui-libs 知识库说明

本目录是 **多技术栈组件规范库**，由 `page-spec-loader` 角色（`agents/page-spec-loader.md`）在 feature-dev Step 2 **按子项目 `package.json` 检测技术栈后只加载对应那一套**。

> ⚠️ **不要把本目录理解成"本工程用了这些库"**。工程实际用哪套，取决于被开发子项目的 `package.json`。

## 各套库对应关系（page-spec-loader 第 1 步检测规则）

| 目录 | 触发条件（package.json） | 状态 |
|---|---|---|
| `element-plus/` | `element-plus` | ✅ **本模板 `src/admin` 的实际栈**，2026-09-29 实测确认（含 charts.md） |
| `vant/` | `vant` | 保留：移动端子项目（`mobile/`）用，见 `templates/project-init.md` 第 2 步 |
| `arco-design-vue/` | `@arco-design/web-vue` | 保留：非本模板栈，供其他 Arco 子项目用 |
| `ant-design-pro/` | `antd` + `@ant-design/pro-components` + (`@umijs/max`\|`umi`) | 保留：React 中后台子项目用 |
| `shadcn/` | `react` + `tailwindcss` + (`class-variance-authority`\|`components.json`) | 保留：React + shadcn 子项目用 |

**本模板 `src/admin` 只用 Element Plus**：`package.json` 有 `element-plus: ^2.11.2`、**无 arco 依赖**；`vite.config.ts` 用 `ElementPlusResolver`；`main.ts` 引 `@styles/el-ui.scss`、`@styles/el-dark.scss`；44 个源文件使用 `El*` 组件。写本模板的页面一律按 `element-plus/` 走。

## 每套库的文件约定

| 文件 | 作用 | 加载时机 |
|---|---|---|
| `components.md` | 组件用法规范 | page-spec-loader 第 4 步（按需摘录，不整篇复制） |
| `pages.md` | 页面类型规范（列表页/表单页/详情页） | page-spec-loader 第 5 步 |
| `charts.md` | 图表规范 | 仅当页面涉及图表时加载 |

## 已知内容偏差（读非本栈目录时注意）

`arco-design-vue/charts.md` 与 `shadcn/charts.md` 描述的是 **Vibe Design Pro / ProChart / Unovis / shadcn-charts** 体系，其中引用的 `frame/admin/_meta/charts.md`、`ProChart`、`public/vendor/charts/shadcn-charts.js` 等路径与封装**在本模板工程中不存在**（`frame/` 已于 2026-09-29 移出）。

- 若你开发的是本模板 `src/admin`（Element Plus）→ 只读 `element-plus/charts.md`，**不要读 arco/shadcn 的图表规范**；
- 若你开发的是真实使用 Arco/shadcn 的其他子项目 → 按该子项目 `README-DEV.md` 为准，本文相应章节可能需按该工程实况校正。

## 新增一套库

1. 建目录 `ui-libs/<lib-name>/`，至少含 `components.md` + `pages.md`；
2. 在 `agents/page-spec-loader.md` 第 1 步补检测条件、第 4/5 步补加载映射；
3. 在本 README 表格登记触发条件。

三处不同步会导致"库在盘上但永远不会被加载"（历史教训：context-budget hook 曾注册未接线）。
