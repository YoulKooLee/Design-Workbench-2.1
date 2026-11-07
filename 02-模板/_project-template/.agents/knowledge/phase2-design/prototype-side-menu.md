---
updated: 2026-11-01
version: 1.0
scope: global
description: 多页面原型侧边导航生成规范——菜单单一数据源（MENU_TREE）派生路由/标题/面包屑、两级分组结构、菜单↔路由↔页面三方双向同步自检、可复制代码模板与 Vue/原生迁移映射
---

# 原型侧边导航（Side-Menu）生成规范与智能体手册

> 版本：v1.0（2026-11-01）
> 适用对象：参与本原型工程的全部智能体（CodeBuddy / WorkBuddy / DeepSeek / 千问等）与前端开发
> 适用工程：`src/prototypes/indicator-platform/`（React 18 + 轻量 hash 路由 `src/common/useHashPage.ts`）；Vue / 原生实现可按附录映射
> 目标：**任何多页面原型都必须带统一侧栏；侧栏必须有分组 + 子页面目录；菜单、路由、页面标题、面包屑、宿主目录树保持双向同步，不允许出现第二份手工清单。**
> 说明：本规范提炼自指标管理平台原型实践，已纳入模板知识库供所有原型项目复用。正文示例中的分组名、页面 key（`indicator-*`、`datasource-*` 等）与 §12 反例为该项目历史记录，作为通用模板时视为**示意**，新项目按自身业务域替换；技术栈以 React + hash 路由为基线，Vue / 原生迁移见附录 B。

---

## 1. 为什么要立这份规范

多智能体协作生成原型时，侧栏（左侧导航菜单）反复出现三类问题，本手册逐条对应解决：

| # | 常见失败现象 | 后果 | 本手册对应章节 |
|---|---|---|---|
| P1 | 只写了几个页面，**根本没有侧栏 / 没有统一外壳**，页面之间无法跳转，只能靠 hash 地址手敲 | 原型不可演示、不成系统 | §3、§7、§13 |
| P2 | 有侧栏但**只有一级平铺、没有子页面目录**；或分组下漏挂子页，二级页只能从按钮进、菜单里找不到 | 目录残缺、功能"藏"起来，评审找不到页面 | §4、§5、§8 |
| P3 | **菜单与路由双向脱节**：菜单点了没反应；页面写了但菜单没入口；菜单显示了但路由没注册；宿主左侧目录树与应用内侧栏两套内容；分组归属前后不一致 | 死菜单、孤儿页面、面包屑缺失、评审被质疑"页面到底做完没有" | §3、§9、§10 |

判定标准：一个合格原型必须同时满足——

1. 登录成功后进入统一外壳（顶栏 + 侧栏 + 主内容区）；
2. 侧栏为「分组 → 子页面」两级结构，当前页高亮、当前分组自动展开；
3. 每一个可访问页面都能从侧栏或页面内明确入口到达；每一个菜单项点击后都能渲染真实页面；
4. 菜单配置、路由表、页面标题、面包屑、宿主目录树由同一份数据派生，可通过自检脚本/清单一次核对。

---

## 2. 术语对齐

| 术语 | 含义 |
|---|---|
| **外壳 Shell** | `TopBar + Sidebar + main` 的整体布局；登录页不进外壳 |
| **分组 Group（一级菜单）** | 侧栏粗体标题，如「指标管理」；可点击折叠展开，也可直接挂一个落地页（`link`） |
| **子页面 Leaf（二级菜单）** | 分组下可点击的具体页面项，如「指标列表」 |
| **pageKey / pageId** | 页面唯一标识，路由与菜单共用，如 `indicator-list` |
| **路由表 Route** | `defineHashPageRoute([{id,title,group}])` 的结果，驱动 `#page=xxx` 切换与页面渲染 |
| **运行导航菜单** | 应用内 `Sidebar` 渲染的导航（本手册主角） |
| **权限配置演示数据** | 「系统管理 → 菜单权限」页面里供勾选演示的树（如 `data.ts` 的 `menuTree`），**与运行导航是两回事**，不要互相复制粘贴后各自漂移 |
| **宿主目录树** | Axhub 原型宿主左侧的页面文件树，由路由表通过 `postMessage(AXHUB_PROTOTYPE_ROUTE_INFO)` 广播生成 |

---

## 3. 核心原则：单一数据源（Single Source of Truth）

### 3.1 禁止多份手工清单

反模式（本工程历史上出现过，必须避免）：同一份页面信息分散写在 `PageKey 联合类型`、`MENUS`、`route`、`PAGE_TITLES`、`CRUMBS`、`menuTree` 六处，新增页面要逐个文件改，漏一处就脱节。

**正确做法：只维护一张「菜单真源表 `MENU_TREE`」，其余全部由它派生：**

```
                 ┌─ 路由表 pages（id/title/group）──→ defineHashPageRoute ──→ hash 切换 / 宿主目录树
                 │
 MENU_TREE 真源 ─┼─ Sidebar 菜单结构（分组 + 子项）
（唯一手工维护） ├─ 页面标题 title（PAGE_TITLES 派生）
                 ├─ 面包屑 crumbs（派生）
                 └─ 页面组件映射表（key → 组件，单独维护但 key 必须取自真源）
```

### 3.2 派生规则

- `route` 的 `pages`：遍历 `MENU_TREE` 叶子拍平为 `{id: key, title, group: 分组名}`；
- `PAGE_TITLES`：由叶子 `title` 汇总，不再手写对象；
- `CRUMBS`：由「分组名 / 叶子 title」自动拼接；
- `Sidebar`：直接渲染 `MENU_TREE`；
- 页面组件映射 `PageView`：`Record<PageKey, React.ComponentType>`，key 仍用联合类型，但联合类型也可由真源 `keyof` 推导（见 §13 模板）。

> 例外：表单编辑页、详情页、弹窗承载页等**不希望常驻菜单**的页面，在真源里标 `hidden: true`，仍进入路由表与标题映射，但不出现在侧栏。

---

## 4. 数据模型规范（MenuNode）

### 4.1 类型定义

```ts
// 分组（一级）
export interface MenuGroup {
  kind: 'group';
  key: string;                 // 分组稳定标识，如 'indicator'，仅用于展开态记忆，不参与路由
  title: string;               // 分组显示名（大白话）
  order: number;               // 分组排列顺序，小在前
  link?: string;               // 分组本身就是一个页面时填 pageKey（如「原始库管理」直接落地）；无则点分组只折叠
  icon?: string;               // 可选图标标识，原型阶段可省略
  children: MenuLeaf[];        // 子页面；link 型分组可为空数组
}

// 子页面（二级，可路由）
export interface MenuLeaf {
  kind: 'leaf';
  key: string;                 // = 路由 id，kebab-case，如 'indicator-list'
  title: string;               // 页面标题（侧栏文案 + 页头标题 + 路由 title 共用）
  crumb?: string;              // 可选自定义面包屑；缺省用「分组名 / title」
  hidden?: boolean;            // true = 进路由但不显示在侧栏（表单/详情/弹窗页）
  order: number;               // 分组内顺序
  badge?: string;              // 可选角标文字，如「新」
  disabled?: boolean;          // 原型预留：置灰不可点
  roles?: string[];           // 原型预留：可见角色，静态阶段不做真实鉴权
}

export type MenuNode = MenuGroup | MenuLeaf;
```

### 4.2 字段填写要求

| 字段 | 要求 |
|---|---|
| `key` | 见 §5.1；一旦上线不随意改名（改名会改变 hash 地址、书签失效） |
| `title` | 面向最终用户的大白话（见 §5.2），不写技术缩写、不写「页面/模块」等冗余后缀 |
| `order` | 分组之间、分组内部都要显式排序，不要依赖数组巧合顺序；新增项取相邻值之间的整数 |
| `hidden` | 仅用于「从列表页点进去的表单/详情」；**主功能页一律不得 hidden** |
| `link` | 只有「分组即首页」时使用；使用后 `children` 通常为空 |

---

## 5. 命名与文案规范

### 5.1 pageKey 命名（强制）

1. 仅小写字母、数字、连字符：`/^[a-z0-9-]+$/`（与 `useHashPage.ts` 的 `PAGE_ID_RE` 一致，违反会被路由归一化丢弃）；
2. 「功能域 - 动作/对象」结构，用连字符连接：`datasource-interface`、`alert-config-form`；
3. 禁止中文、驼峰、下划线、空格、大写；禁止 `page1`、`test`、`aaa` 等无意义名；
4. 表单页统一加 `-form` 后缀：`alert-config-form`、`api-form`；详情页加 `-detail`；
5. 同一页面在菜单、路由、组件映射、`data-proto-id`、设计说明 `contentKey` 中使用**同一个 key**。

### 5.2 文案规范（与全局 UI 文案偏好一致）

1. 侧栏与页头使用业务大白话：「原始库管理」「接口数据源」「数据接入日志」；
2. 禁止把等保、加密、哈希、限流、RBAC 等技术词放进菜单；技术细节写进右侧设计说明卡片；
3. 同名区分：当分组名与子项名相同时（如分组「数据源管理」下也有「数据源管理」），允许保留，但路由 key 必须区分（`datasource-manage` vs 分组 `datasource`）；
4. 分组数量建议 5–9 个；超过 10 个先合并归类，不要平铺。

### 5.3 层级规范

1. 原型阶段**固定两级**：分组 → 子页面；不做三级嵌套（三级会显著降低原型可读性）；
2. 确需第三层（如某模块下再分「配置 / 记录」）时，用子页面标题前缀或页内 Tabs 表达，不增加侧栏层级；
3. 每个分组下子项建议 2–8 个；单个分组超过 10 项应拆分。

---

## 6. 文件分工（推荐落点）

```
src/prototypes/indicator-platform/
├─ menus.ts                # 【真源】MENU_TREE + 派生函数 buildRoutePages()/getTitle()/getCrumbs()
├─ ui.tsx                  # Sidebar / TopBar / 通用组件；Sidebar 只消费 MENU_TREE
├─ index.tsx               # App 外壳：useHashPage(route)、渲染 Sidebar、PageView 组件映射
├─ pages-*.tsx             # 各页面组件（一个文件可导出多个相关页面）
└─ data.ts                 # 演示数据；menuTree 仅限「菜单权限」演示勾选，不参与运行导航
```

> 工程若已存在旧的 `MENUS / PAGE_TITLES / CRUMBS` 手工对象，按 §13 模板迁移到 `menus.ts` 派生，迁移完成后删除旧对象，不允许长期并存。

---

## 7. 标准生成流程（智能体按序执行）

1. **列功能清单**：先从 PRD / 整改清单抽出全部页面，标注「主功能页 / 表单详情页 / 登录页」；
2. **定分组**：按业务域归并为分组，确定分组顺序与落地 `link`；
3. **写真源表 `MENU_TREE`**：每个叶子填 `key/title/order`，表单页标 `hidden`；
4. **派生路由**：`buildRoutePages()` 生成 `defineHashPageRoute` 入参，指定 `defaultPageId`（通常是看板或首页）；
5. **搭外壳**：`TopBar + Sidebar + main`；登录页单独渲染、不挂侧栏；
6. **实现页面并挂映射**：每个页面组件登记进 `PageView`；页面内跳转统一 `setPage(key)`，不直接拼 hash 字符串；
7. **自检**：执行 §10 双向同步核对，全部通过后再交付；
8. **补设计说明卡片**：每个主功能页补设计说明（遵循《设计说明卡片编写规范》）。

新增一个页面时只做三件事：①`MENU_TREE` 加叶子；②`PageView` 加组件映射；③（表单页）在列表页补跳转按钮。路由、标题、面包屑、侧栏、宿主目录自动更新。

---

## 8. Sidebar 组件交互规范

### 8.1 结构与行为

1. 两级渲染：分组标题行 + 可折叠子项列表；
2. **展开态记忆**：用 `Record<groupKey, boolean>` 保存各分组折叠状态；默认展开「当前页所在分组」与常用分组；
3. **选中高亮**：
   - 叶子当前页：`.side-item.active` 高亮；
   - 分组：当前页属于该分组（或等于 `link`）时，分组标题同步高亮；
4. **自动展开**：路由切换到某分组下页面时，若该分组处于折叠态，自动展开（避免用户看到高亮却找不到子项）；
5. **点击行为**：
   - `link` 型分组：点击直接 `onNav(link)`；
   - 普通分组：点击标题只切换折叠；点击子项 `onNav(leaf.key)`；
6. **登录页不渲染侧栏**；退出登录 `setPage('login')`；
7. 侧栏自身高度撑满外壳、内部 `overflow-y:auto`，分组过多时在侧栏内滚动，不顶破页面；
8. 选中当前子项后**不自动收起**分组，方便同组切换；
9. `disabled` 项置灰、`cursor:not-allowed`、不响应点击；`hidden` 项不渲染；
10. 响应式（可选）：窄屏可折叠为图标条；原型阶段固定宽度即可，但宽度值集中在 CSS 变量，便于调整。

### 8.2 视觉约定（沿用本工程 `style.css` 类名）

- 容器：`.sidebar`；分组标题：`.side-group-title(.active)`；子项：`.side-item(.active)`；角标：`.side-badge`；禁用态：`.side-item.disabled`；
- 选中色与主色一致；分组标题字重高于子项；子项左缩进体现层级；
- 折叠箭头 `▴ / ▾` 随状态切换；不使用 emoji 充当图标；
- 禁用项置灰、`cursor:not-allowed`；角标小号亮色、不抢占主文案位置。

---

## 9. 路由与页面挂载规范

### 9.1 路由机制（基于 `src/common/useHashPage.ts`）

- URL 形态：`#page=<pageId>`；`setPage(key)` 统一写入；
- `defineHashPageRoute(pages, { defaultPageId })` 会过滤掉缺 `id/title` 的非法项，`id` 不符合字符集会被归一化为空——所以**不要依赖运行时静默过滤，生成期就要保证合法**；
- `useHashPage(route)` 返回 `{ page, setPage, pages, defaultPageId }`；
- 路由表会通过 `postMessage` 向宿主广播：
  - `AXHUB_PROTOTYPE_ROUTE_INFO`：`{ pages, defaultPageId, activePageId }` → 生成宿主左侧目录树；
  - `AXHUB_PROTOTYPE_PAGE_CHANGE`：`{ pageId }` → 宿主高亮对应文件。

> 这就是「双向同步」的技术链路：**运行侧栏（MENU_TREE）与宿主目录树（route.pages）必须同源**，否则两边目录必然不一致。

### 9.2 页面挂载规则

| 页面类型 | 是否进路由表 | 是否显示侧栏 | 入口来源 |
|---|---|---|---|
| 登录页 `login` | 是（特殊） | 否 | 启动默认 / 退出登录 |
| 主功能列表页 / 看板 | 是 | 是（`hidden` 缺省 false） | 侧栏 |
| 分组落地页（`link`） | 是 | 分组标题点击 | 侧栏分组 |
| 新增 / 编辑表单页 | 是 | 否（`hidden:true`） | 列表页「新增 / 编辑」按钮 |
| 详情页 | 是 | 否（`hidden:true`） | 列表页行操作 |
| 纯弹窗内编辑（不独立成页） | 否 | 否 | 弹窗组件 |

### 9.3 兜底与清理

1. 未知 / 非法 `pageId` 回落到 `defaultPageId`，不得白屏；
2. `PageView` 对未匹配 key 渲染「页面建设中 / 暂无此页面」占位，而不是 `undefined` 崩溃；
3. 删除页面时同步删除：真源叶子、`PageView` 映射、相关 `data.ts` 演示数据、设计说明卡片；删除后重新跑 §10 自检，确认无残留引用；
4. 死页面（已废弃路由但组件仍在、菜单已不挂）必须清理，不允许长期留 `raw-table`、`topic-table` 这类孤儿页。

---

## 10. 双向同步校验机制（交付前必过）

### 10.1 一致性规则（四条硬约束）

1. **菜单叶子 key 集合 ⊆ 路由 pages id 集合**：显示在侧栏的页面必须已注册路由；
2. **路由中「非 hidden」页面 ⊆ 菜单叶子**：所有应可见页面都有菜单入口（hidden 表单/详情页除外）；
3. **`PageView` 映射 key 集合 = 路由 pages id 集合**：每个路由 id 都有组件，每个组件 key 都有路由；
4. **分组归属唯一**：一个叶子只属于一个分组；`CRUMBS` 与 `route.group` 一致，不允许同一页面在菜单与面包屑里分属不同分组。

### 10.2 自检函数（可直接放入 `menus.ts` 或开发期临时执行）

```ts
import { defineHashPageRoute } from '../../common/useHashPage';

export function selfCheckMenu(menuTree: MenuGroup[], pageViewKeys: string[]) {
  const leaves = menuTree.flatMap(g => g.children.map(l => ({ ...l, group: g.title })));
  const routePages = buildRoutePages(menuTree);
  const routeIds = new Set(routePages.map(p => p.id));
  const menuVisibleKeys = new Set(leaves.filter(l => !l.hidden).map(l => l.key));
  const errors: string[] = [];

  // 规则1：菜单可见项必须有路由
  menuVisibleKeys.forEach(k => { if (!routeIds.has(k)) errors.push(`[菜单无路由] ${k}`); });
  // 规则2：非 hidden 叶子必须出现在路由（派生天然满足，这里兜底检查 key 合法性）
  leaves.forEach(l => { if (!/^[a-z0-9-]+$/.test(l.key)) errors.push(`[key 非法] ${l.key}`); });
  // 规则3：路由 id 必须有组件映射
  const viewSet = new Set(pageViewKeys);
  routePages.forEach(p => { if (!viewSet.has(p.id)) errors.push(`[路由无组件] ${p.id}`); });
  // 规则4：重复 key / 重复 title
  const keyCount = new Map<string, number>();
  leaves.forEach(l => keyCount.set(l.key, (keyCount.get(l.key) || 0) + 1));
  keyCount.forEach((n, k) => { if (n > 1) errors.push(`[key 重复] ${k} ×${n}`); });

  return { ok: errors.length === 0, errors, stats: { groups: menuTree.length, leaves: leaves.length, routes: routePages.length } };
}
```

开发期可在控制台 `console.table(selfCheckMenu(MENU_TREE, Object.keys(PageView)))`；`ok=false` 时按 `errors` 逐条修复，不允许带错交付。

### 10.3 人工核对清单（走查一遍界面）

- [ ] 从默认首页开始，逐个点击每个分组、每个可见子项，页面均正常渲染、无白屏 / 无 404；
- [ ] 每个页面刷新后（`#page=xxx`）仍停留在该页，且侧栏高亮正确；
- [ ] 表单 / 详情页不在侧栏出现，但从列表按钮可正常进入、可返回；
- [ ] 面包屑层级与侧栏分组一致；
- [ ] 宿主左侧目录树（刷新原型宿主后）页面数量、名称与应用内菜单对得上；
- [ ] 退出登录回到登录页，侧栏消失；重新登录回到默认页；
- [ ] 控制台无报错、无 `undefined` 渲染警告。

---

## 11. 权限、角标与扩展预留（原型阶段不实现真实逻辑）

1. `roles` 字段仅作数据预留；静态原型不接鉴权，不写登录鉴权拦截代码；
2. `badge` 用于「新 / 待处理」等提示，原型可用静态文字；
3. 禁用 `disabled` 用于未开放功能项，需同时在设计说明卡片注明「本期不做」及原因；
4. 外链 / 外部系统入口：单独 `external: true` 标记，点击新开页，不占用内部路由 id；
5. 分组顺序、页面顺序调整只改 `order`，不挪动组件文件位置。

---

## 12. 现存反例（本工程核对记录，迁移时对照清理）

> 以下为历史代码中真实出现的脱节类型，作为反面教材，修复时逐条消除。

1. **多处手工清单并存**：`ui.tsx` 的 `MENUS`、`PAGE_TITLES`、`index.tsx` 的 `route`、`CRUMBS`、`data.ts` 的 `menuTree` 各自维护，新增页面易漏改；→ 统一到 `menus.ts` 真源派生（§6、§13）。
2. **分组归属漂移**：同一页面（如「来源依据」）在菜单挂「数据源管理」、在路由 `group` 与面包屑归「指标管理」；→ 以真源分组为准，派生消除分歧。
3. **主功能页无菜单入口**：如「专题配置 `topic-config`」「数据维护 `topic-maintenance`」已注册路由且有页面，但侧栏未挂；表单页（`indicator-config`、`api-form`、`alert-config-form`）虽可不进菜单，但必须在对应列表页有明确跳转按钮；→ 主功能页补叶子，隐藏页补页面内入口。
4. **死页面残留**：废弃的 `raw-table / topic-table` 仍残留在 `PageKey` 联合类型与组件文件中（路由表已不注册、菜单不挂）；→ 删除页面组件、类型成员、演示数据与卡片引用，保证类型、路由、菜单三者同时清空。
5. **权限演示数据与运行菜单混用**：`menuTree` 只服务「菜单权限」勾选演示，不得反向当作运行导航来源。

> 预防性要求（当前代码未发现，后续必须遵守）：页面跳转一律 `setPage(key)`，不直接改写 `location.hash`，否则 `AXHUB_PROTOTYPE_PAGE_CHANGE` 广播缺失、宿主目录不联动（见 §9.1、附录 A）。

---

## 13. 可直接复制的代码模板

### 13.1 `menus.ts`（真源 + 派生 + 自检）

```ts
import type { ComponentType } from 'react';

export interface MenuGroup {
  kind: 'group'; key: string; title: string; order: number;
  link?: string; children: MenuLeaf[];
}
export interface MenuLeaf {
  kind: 'leaf'; key: string; title: string; order: number;
  crumb?: string; hidden?: boolean; badge?: string; disabled?: boolean;
}
export type MenuNode = MenuGroup | MenuLeaf;

// ===== 唯一手工维护的导航真源 =====
export const MENU_TREE: MenuGroup[] = [
  { kind: 'group', key: 'dashboard', title: '指标看板', order: 1, link: 'dashboard', children: [] },
  { kind: 'group', key: 'datasource', title: '数据源管理', order: 2, children: [
    { kind: 'leaf', key: 'datasource-jdbc', title: 'JDBC驱动管理', order: 1 },
    { kind: 'leaf', key: 'datasource-manage', title: '数据源管理', order: 2 },
    { kind: 'leaf', key: 'datasource-interface', title: '接口数据源', order: 3 },
  ]},
  { kind: 'group', key: 'raw', title: '原始库管理', order: 3, link: 'topic-library', children: [
    { kind: 'leaf', key: 'topic-config', title: '专题配置', order: 1, hidden: true },
    { kind: 'leaf', key: 'topic-maintenance', title: '数据维护', order: 2, hidden: true },
  ]},
  // ……其余分组按业务补齐
];

// ===== 派生：路由 pages =====
export function buildRoutePages() {
  return MENU_TREE.flatMap(g =>
    g.children.map(l => ({ id: l.key, title: l.title, group: g.title }))
      .concat(g.link ? [{ id: g.link, title: g.title, group: g.title }] : [])
  );
}

// ===== 派生：标题 / 面包屑 =====
export function getTitle(key: string): string {
  for (const g of MENU_TREE) {
    if (g.link === key) return g.title;
    const hit = g.children.find(l => l.key === key);
    if (hit) return hit.title;
  }
  return key;
}
export function getCrumbs(key: string): string {
  for (const g of MENU_TREE) {
    const hit = g.children.find(l => l.key === key);
    if (hit) return hit.crumb ?? `${g.title} / ${hit.title}`;
    if (g.link === key) return g.title;
  }
  return '';
}

export const DEFAULT_PAGE_ID = 'dashboard';
```

### 13.2 `ui.tsx` 的 Sidebar（只消费真源）

```tsx
import { useState } from 'react';
import { MENU_TREE } from './menus';

export function Sidebar({ page, onNav }: { page: string; onNav: (k: string) => void }) {
  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(MENU_TREE.map(g => [g.key, true]))
  );
  return (
    <nav className="sidebar">
      {MENU_TREE.map(g => {
        const active = g.link === page || g.children.some(l => l.key === page);
        if (g.link && g.children.length === 0) {
          return (
            <div key={g.key} className={`side-group-title ${active ? 'active' : ''}`}
                 onClick={() => onNav(g.link!)}>
              <span>{g.title}</span>
            </div>
          );
        }
        const isOpen = open[g.key];
        return (
          <div key={g.key}>
            <div className={`side-group-title ${active ? 'active' : ''}`}
                 onClick={() => setOpen(s => ({ ...s, [g.key]: !s[g.key] }))}>
              <span>{g.title}</span>
              <span style={{ fontSize: 10 }}>{isOpen ? '▴' : '▾'}</span>
            </div>
            {isOpen && g.children.filter(l => !l.hidden).map(l => (
              <div key={l.key}
                   className={`side-item ${page === l.key ? 'active' : ''} ${l.disabled ? 'disabled' : ''}`}
                   onClick={() => !l.disabled && onNav(l.key)}>
                {l.title}{l.badge ? <em className="side-badge">{l.badge}</em> : null}
              </div>
            ))}
          </div>
        );
      })}
    </nav>
  );
}
```

### 13.3 `index.tsx` 外壳（路由派生 + PageView + 兜底）

```tsx
import type { ComponentType } from 'react';
import { defineHashPageRoute, useHashPage } from '../../common/useHashPage';
import { buildRoutePages, DEFAULT_PAGE_ID, getTitle, getCrumbs } from './menus';
import { Sidebar, TopBar } from './ui';
// import 各页面组件 ……

const route = defineHashPageRoute(buildRoutePages(), { defaultPageId: DEFAULT_PAGE_ID });

const PageView: Record<string, ComponentType<{ setPage: (k: string) => void }>> = {
  // 'dashboard': DashboardPage,
  // 'topic-library': TopicLibraryPage,
};

export default function App() {
  const { page, setPage } = useHashPage(route);
  if (page === 'login') return <LoginPage onLogin={() => setPage(DEFAULT_PAGE_ID)} />;
  const View = PageView[page];
  return (
    <div className="app-shell">
      <TopBar onLogout={() => setPage('login')} />
      <div className="shell-body">
        <Sidebar page={page} onNav={setPage} />
        <main className="main">
          <div className="page-head">
            <h2>{getTitle(page)}</h2>
            <div className="crumbs">{getCrumbs(page)}</div>
          </div>
          {View ? <View setPage={setPage} /> : <div className="empty">暂无此页面：{page}</div>}
        </main>
      </div>
    </div>
  );
}
```

---

## 14. 智能体交付检查单（提交前逐项打勾）

**生成前**
- [ ] 已读 PRD / 整改清单，页面清单与「主功能 / 表单详情 / 登录」分类明确
- [ ] 分组方案与顺序确定，无三级嵌套计划

**生成中**
- [ ] 只维护 `MENU_TREE` 一份真源；路由 / 标题 / 面包屑均派生
- [ ] 所有 `key` 符合 `[a-z0-9-]+`，命名遵循 §5.1
- [ ] 主功能页未被 `hidden`；表单 / 详情页 `hidden:true` 且有页面内入口
- [ ] 页面跳转全部走 `setPage(key)`，无手拼 hash
- [ ] 登录页不渲染侧栏；默认页已指定

**生成后（自检 + 走查）**
- [ ] `selfCheckMenu` 返回 `ok=true`，无 `errors`
- [ ] §10.3 人工清单全部通过
- [ ] 删除的旧手工对象（MENUS / PAGE_TITLES / CRUMBS 重复定义）已清理，无第二份清单
- [ ] 死页面、未使用路由、未使用 import 已清理
- [ ] 控制台 0 报错；刷新任意 hash 页高亮正确
- [ ] 宿主目录树与应用菜单数量、名称一致
- [ ] 每个主功能页已按《设计说明卡片编写规范》补卡片说明

---

## 附录 A：与 `useHashPage.ts` 的对接要点

1. `id` 即 `key`，不要在路由层另起一套命名；
2. `defineHashPageRoute` 第二参 `defaultPageId` 必须是 `buildRoutePages()` 中真实存在的 id；
3. `useHashPage` 已自动处理 hash 监听、非法 id 归一、向宿主广播；不要在业务代码里重复 `window.addEventListener('hashchange')`；
4. 若新增 `query` 参数（如 `#page=alert-config-form&id=xxx`），扩展解析时保持 `page` 主参数优先，且不破坏现有 `parseHashPage` 约定。

## 附录 B：Vue / 原生技术栈迁移要点

| 本工程（React + hash） | Vue Router | 原生多页 / 静态原型 |
|---|---|---|
| `MENU_TREE` 真源 | `meta.menu` + 单一路由配置表 | 单一 `nav.config.js` 导出树 |
| `defineHashPageRoute` | `createWebHashHistory` 路由表，`meta:{group,title,hidden}` | 页面注册表 `{key,title,group,html}` |
| `setPage(key)` | `router.push({name:key})` | location.hash 切换 + 目录渲染 |
| `Sidebar` 组件 | `SideMenu.vue` 递归/两级渲染 | 按配置动态生成 `<li>` |
| 自检函数 | 路由元信息与菜单树互查脚本 | 构建期扫描页面文件与配置差集 |

> 迁移时保留同样的硬约束：**一份配置真源、两级目录、菜单↔路由↔页面三方互查**；技术栈可变，约束不变。

---

## 附：配套规范

- 设计说明模块《规范.md》v3.0（`src/common/design-notes/规范.md`，三份合一）：Part B 打标三步法（`data-proto-id` 与卡片连线）、Part C 卡片编写（含 §8.1 内容来源红线）
