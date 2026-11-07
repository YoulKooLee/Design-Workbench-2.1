# admin/ 依赖升级方案

> **状态**：P0、P1、P2、P3-lite 已完成；P3 全量 Lint 可选  
> **基准日期**：2026-08-30（依赖小同步 2026-11-06：Arco ^2.59.0、axios ^1.21.0）  
> **前提**：官方 [arco-design-pro-vue](https://github.com/arco-design/arco-design-pro-vue) 已停更；升级在本仓库内分批自维护，不等待 Pro 上游。策略背景见 [README-DEV.md § 底座与自维护策略](./README-DEV.md#底座与自维护策略)。

---

## 1. 现状快照

### 1.1 声明 vs 实际安装

| 包 | `package.json` 声明 | lock 实际 | 最新（npm） | 备注 |
|----|---------------------|-----------|-------------|------|
| `@arco-design/web-vue` | ^2.59.0 | **2.59.0** | 2.59.0 | 2026-11-06 与 web 对齐 |
| `vue` | ^3.5.42 | **3.5.x** | 3.5.x | P2 已跟进 |
| `vite` | ^5.4.0 | **5.4.21** | 8.x | P1 完成；P4 再议 6/7/8 |
| `typescript` | ~5.6.3 | **5.6.3** | 7.x | P1 完成 |
| `axios` | ^1.21.0 | **1.21.0** | 1.21.x | 2026-11-06 安全小版本对齐 web |
| `vue-tsc` | ^1.0.14 | **1.8.27** | 3.x | 与 TS / Vite 联动 |
| `pinia` | ^2.0.23 | **2.3.1** | 4.x | 建议先到 3.x |
| `vue-router` | ^4.0.14 | **4.6.4** | 5.x | **暂留 4.x** |
| `vue-i18n` | ^9.2.2 | **9.14.5** | 11.x | 已 `legacy: false`，9.x 够用 |
| `echarts` / `vue-echarts` | ^5.4 / ^6.2 | 5.6 / 6.7 | — | **遗留，可移除** |

### 1.2 主要风险点

| 风险 | 说明 |
|------|------|
| **axios 0.24** | 版本过旧，存在已知 CVE；拦截器仍用已废弃的 `AxiosRequestConfig` 作请求拦截参数类型 |
| **Vite 3 + TS 4** | 与 README 建议 Node ≥20 不匹配；新插件、ESLint 集成、构建性能均受限 |
| **vite-plugin-eslint** | Vite 5+ 常失效或拖慢 dev；本工程已在 dev 配置里 `failOnError: false`，升级时应**移除** |
| **vite-plugin-imagemin** | 依赖 native 二进制，Node 20+ / Windows 易失败；且**未接入** `vite.config.prod.ts`，仅为 dead code |
| **echarts 分包** | `vite.config.prod.ts` 仍 `manualChunks.chart: ['echarts','vue-echarts']`，但业务图已走 `ProChart`（Unovis），规范禁止业务使用遗留 `<Chart>` |
| **pnpm resolutions** | 强制 `rollup@^2.56.3` 与 Vite 5+ 自带 Rollup 4 冲突，升级 Vite 时必须删除 |
| **package.json engines** | 仍写 `node >=14`，与 README「≥20.19.0」不一致 |

### 1.3 遗留 echarts 引用（移除前清单）

| 路径 | 用途 |
|------|------|
| `src/components/chart/index.vue` | 遗留 echarts 封装 |
| `src/hooks/chart-option.ts` | echarts option 工具 |
| `src/types/echarts.ts` | echarts 类型 |
| `config/vite.config.prod.ts` | `manualChunks.chart` |
| `src/styles/global.less` | `.echarts-tooltip-diy`（移除组件后评估是否保留） |

业务页与橱窗均已使用 `@/components/charts/pro-chart.vue` + `public/vendor/charts/shadcn-charts.js`。

---

## 2. 升级原则

1. **分批合并**：每批独立 PR，可回滚；批与批之间 `pnpm build` 必须通过。
2. **先清债后跃迁**：P0 移除无用依赖、修安全项；P1 再动 Vite / TS 大版本。
3. **不追最新**：目标版本参考同工作区 `element-plus/` Starter 已验证组合，而非 npm latest 全拉。
4. **对照源不变**：升级不改变 `frame/admin` 对照规范；仅动工程底座。
5. **Agent 冒烟**：每批完成后至少手动或脚本覆盖：登录、`list-search-table`、`form/basic`、`dashboard/workplace`、`charts/palette`。

---

## 3. 分批计划

### P0 — 低风险清理与安全 ✅（2026-08-30 完成）

**目标**：不动构建主版本，去掉 dead code，修复最高优先级安全债。

| 动作 | 目标版本 | 状态 |
|------|----------|------|
| 同步 `@arco-design/web-vue` 声明 | `^2.58.0` | ✅ |
| 升级 `axios` | `^1.12.2`（实际 1.20.0） | ✅ |
| 升级 `dayjs` | 最新 patch | ✅ |
| **移除** `echarts`、`vue-echarts` | — | ✅ |
| **移除** `vite-plugin-imagemin` | — | ✅ |
| 更新 `engines.node` | `>=20.19.0` | ✅ |
| 删除 `resolutions.rollup` / `gifsicle` | — | ✅ |

**附带修复**（axios 1.x 类型更严）：

- `src/api/interceptor.ts`：`InternalAxiosRequestConfig` + 响应解包类型断言
- `src/components/tab-bar/index.vue`：`@select` 回调允许 `undefined`

**验收**：`pnpm type:check` ✅ · `pnpm build` ✅

---

### P1 — 构建链现代化 ✅（2026-08-30 完成）

**目标**：Vite 5 + TypeScript 5 + 配套插件；**不一步跳到 Vite 8**。

| 包 | 升级前 | 升级后 | 状态 |
|----|--------|--------|------|
| `vite` | 3.2.x | **5.4.21** | ✅ |
| `@vitejs/plugin-vue` | 3.x | **5.2.4** | ✅ |
| `@vitejs/plugin-vue-jsx` | 2.x | **4.2.0** | ✅ |
| `vite-svg-loader` | 3.x | **5.1.2** | ✅ |
| `typescript` | 4.9 | **5.6.3** | ✅ |
| `vue-tsc` | 1.x | **2.1.10** | ✅ |
| `unplugin-vue-components` | 0.24 | **0.27.5** | ✅ |
| `@arco-plugins/vite-vue` | 1.4.x | 1.4.6（保持） | ✅ |
| `vite-plugin-eslint` | — | **已移除** | ✅ |
| `rollup`（显式 devDep） | 3.x | **已移除** | ✅ |

**工程变更**：

- `config/vite.config.dev.ts` — 移除 `vite-plugin-eslint`
- `config/vite.config.base.ts` — `breakpoint.less` 改为绝对路径
- `config/vite.config.prod.ts` — `manualChunks` 改为函数式，仅拆 `arco`（避免 circular chunk）
- `tsconfig.json` — `moduleResolution: bundler`、`ESNext`、`noEmit`

**验收**：`pnpm type:check` ✅ · `pnpm build` ✅ · `pnpm dev` ✅（Vite 5.4.21）

**已知提示**（非阻塞）：Vite CJS Node API deprecated 警告；待 P4 或加 `"type": "module"` 时处理。

---

### P2 — Vue 生态跟进 ✅（2026-08-30 完成）

| 包 | 升级前 | 升级后 | 状态 |
|----|--------|--------|------|
| `pinia` | 2.3.1 | **3.0.4** | ✅ |
| `@vueuse/core` | 9.13.0 | **13.9.0** | ✅ |
| `query-string` | 8.2.0 | **9.5.0** | ✅ |
| `vue` | 3.5.41 | **3.5.42** | ✅ |

**代码变更**：无（Options 式 `defineStore`、`query-string` 默认 import、`@vueuse/core` 常用 API 均兼容）。

**验收**：`pnpm type:check` ✅ · `pnpm build` ✅

**仍暂缓**：`vue-router` 5、`vue-i18n` 11、`pinia` 4。

---

### P3 — 开发体验与 Lint（可选，建议 2～3 天独立 PR）

与业务运行时解耦，可参考 `element-plus/` 的 flat ESLint 配置。

| 包 | 当前 | 目标 |
|----|------|------|
| `eslint` | 8.x | **^9.9.0** + flat config |
| `@typescript-eslint/*` | 5.x | **^8.9.0** |
| `eslint-plugin-vue` | 9.x | **^9.27.0** |
| `prettier` | 2.x | **^3.5.0** |
| `stylelint` + configs | 14.x | **^16.20.0** 系 |
| `husky` | 8.x | **^9.1.0**（`prepare`: `husky` 而非 `husky install`） |
| `lint-staged` | 13.x | **^15.5.0** |
| `@commitlint/*` | 17.x | **^19.4.0** |

**说明**：`eslint-config-airbnb-base` 对 ESLint 9 支持滞后，可改为 eslint recommended + typescript-eslint + vue 组合（与 element-plus 一致），或暂留 P3。

#### P3-lite — 安装告警收敛 ✅（2026-08-30）

不升 ESLint 9 / Stylelint 16，仅消除 `npm/pnpm install` 常见告警：

| 项 | 处理 |
|----|------|
| Husky `not a git repository` | `prepare` → `node scripts/prepare-husky.mjs`（无 `.git` 时跳过） |
| `postcss-html` peer 冲突 | 锁定 `stylelint-config-recommended-vue@1.4.0` + `pnpm.overrides`（`stylelint-config-html@1.1.0`、`stylelint-config-recommended@9.0.0`） |
| `stylelint-config-rational-order` 嵌套 Stylelint 9 | 从依赖与 `.stylelintrc.js` 移除（保留 `stylelint-order` 插件） |
| 包管理器 | **请用 `pnpm install`**，勿用 `npm install`（避免生成 `package-lock.json` 与 `pnpm-lock.yaml` 不一致） |

完整 P3（ESLint 9 flat、Stylelint 16、Prettier 3）仍建议独立 PR。

---

### P4 — 远期对齐（按需立项）

| 项 | 说明 |
|----|------|
| Vite 6 / 7 | 与 `element-plus/` Starter 完全对齐时再议 |
| `vue-router` 5 | 等新项目或路由大改时一并迁移 |
| `@arco-design/web-vue` 3.x | 若 Arco 发布大版本，单独立项 + 全量 UI 回归 |
| CI 门禁 | 按需立项（如 GitHub Actions：`type:check` + `build`，Node 20 + pnpm 9） |

---

## 4. 推荐执行顺序

```text
P0（清理 + axios + 声明同步）
  ↓
P1（Vite 5 + TS 5 + 去 vite-plugin-eslint）
  ↓
P2（pinia 3 + vueuse 13）
  ↓
P3（lint 体系，可选）
  ↓
P4（与 element-plus 栈对齐，可选）
```

每批 **禁止** 同时做 P1 + P3（构建与 lint 同时大爆炸，难定位问题）。

---

## 5. 每批通用验收清单

- [ ] `pnpm install` 无 peer dependency 致命错误
- [ ] `pnpm type:check` 通过
- [ ] `pnpm build` 通过
- [ ] `pnpm dev` 启动，端口 3006
- [ ] Mock 登录 `admin / 123456`
- [ ] 打开「数据列表」`list/search-table` — 筛选、表格、分页
- [ ] 打开「基础表单」`form/basic`
- [ ] 打开「工作台」`dashboard/workplace` — 图表渲染
- [ ] 打开「图表配色」`charts/palette` — 顶栏切换 palette
- [ ] 切换明暗主题、侧栏折叠无控制台报错

---

## 6. 回滚策略

- 每批单独分支 / PR，合并前打 tag（如 `admin-deps-p0`）。
- `pnpm-lock.yaml` 随 PR 提交；回滚 revert 整 PR 即可。
- P1 若失败，可暂留 P0 成果（axios、去 echarts），Vite 升级另开分支 retry。

---

## 7. 与 README-DEV 的衔接

| README-DEV 约定 | 升级时注意 |
|-----------------|------------|
| 业务图只用 `ProChart` | P0 移除 echarts 后无影响 |
| 登录走 Pro mockjs（`20000`） | axios 升级勿改拦截器语义 |
| `vite-svg-loader` + `?url` | P1 必测异常页 / 个人中心 SVG |
| Windows LF | 升级 prettier / eslint 后勿改 `endOfLine: lf` |
| 禁止长期占用 `pnpm dev` | 验收完关闭 dev 进程 |

---

## 8. 参考：element-plus Starter 已验证组合

同工作区 `element-plus/package.json` 可作为 P1～P3 目标锚点（不必照搬其业务依赖）：

- Vite **^7.1.5**、Vue **^3.5.21**、TypeScript **~5.6.3**、vue-tsc **~2.1.6**
- axios **^1.12.2**、pinia **^3.0.2**、eslint **^9.9.1**
- **未使用** vite-plugin-eslint、vite-plugin-imagemin

admin 工程因 Arco 全量注册 + Pro 遗留配置，建议 Vite **5→6→7** 分步逼近，而非一次对齐。

---

## 9. 一句话摘要

- **P0 立刻做**：axios 1.x、去掉 echarts/imagemin、同步 Arco 声明、修正 engines。  
- **P1 核心**：Vite 5 + TS 5，移除 vite-plugin-eslint。  
- **P2/P3 按需**：Pinia 3、VueUse、Lint 现代化。  
- **不追 vue-router 5 / vue-i18n 11**，除非有新项目驱动。
