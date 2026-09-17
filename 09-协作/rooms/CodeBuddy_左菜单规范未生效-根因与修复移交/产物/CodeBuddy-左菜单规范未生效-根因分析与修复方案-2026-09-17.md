# 左菜单规范未生效：根因分析与修复移交

- 日期：2026-09-17
- 提出方：CodeBuddy（受用户指派排查）
- 处理方：豆包（共享目录维护者）
- 性质：**只读取证 + 修复建议**。CodeBuddy 本轮未修改任何工程文件。
- 用户已拍板：采用 **方案 A**；`core` 小红点 **去掉**；`NAV` 的二级 `sub` **不进菜单层级**。

---

## 一、一句话结论

工作台里存在**两套左菜单实现**：`src/common/side-menu/`（带 `spec.md` 的规范组件）与 `StructureMonitorShell.tsx` 内的**私有 `function SideMenu`**（硬编码、未导出）。所有原型页面走壳渲染 → 只可能命中私有实现；规范组件的 **import 命中数为 0**，因此规范从未生效。

---

## 二、取证（读实物，均有 file:line）

### 2.1 规范组件（存在、完整、但无人用）

`01-项目\结构监测\src\common\side-menu\`（`index.tsx` / `style.css` / `spec.md`）

| 位置 | 内容 |
|---|---|
| `index.tsx:10` | `import './style.css';`（自带样式，类前缀 `axhub-side-menu`） |
| `index.tsx:34-44` | 契约：`title / width / collapsible / defaultCollapsed / defaultSelectedKey / defaultOpenKeys / items / onMenuSelect / onCollapseChange` |
| `index.tsx:46-59` | `resolveIcon()` 仅识别 `dashboard / shop / user / setting` |
| `index.tsx:91 / :237` | `const Component = function SideMenu(props)` / `export default Component` |
| `index.tsx:92-93 / :212` | 标题默认 `'Axhub'`；宽度默认 **240**；折叠宽 **64** |
| `spec.md:64-67` | 规范明文：展开 240 / 折叠 64 / 顶栏 48 |
| `spec.md:99-105` | 规范明文：默认/悬停/选中/禁用/**折叠**五态 |
| `spec.md:41-48` | 数据契约：`items[].key/label/icon/disabled/children` |

### 2.2 原型实际用的左菜单（私有、写死）

`01-项目\结构监测\src\common\StructureMonitorShell.tsx`

| 位置 | 内容 |
|---|---|
| `:279` | `function SideMenu({ current, onSelect })` —— **私有、未导出** |
| `:281-284` | `className="sm-left-menu"`，`width: 210`（固定） |
| `:289` | 写死标题「结构监测 V1.0」 |
| `:291-308` | 直接 `NAV.map(...)` 渲染，无 `items` 契约、无图标、无折叠 |
| `:303-305` | `n.group === 'core'` → 右侧小红点 |
| `:896` | `<SideMenu current={current} onSelect={onSelect} />`（唯一使用点） |
| `:39-43` | `export const GROUP_META` —— 取证显示**全工程 0 处消费方**（红点直接判 `group`，未用该表） |

### 2.3 全仓检索结果

| 检索 | 结果 |
|---|---|
| `from '.*side-menu'`（全工作台 `*.ts/tsx`） | **命中 0** —— 规范组件从未被 import |
| `SideMenu` | 仅 3 类命中：各项目壳内私有实现 + 规范组件自身定义 |
| 同构范围 | `02-模板\_project-template`（`:279` / `:893`）+ `01-项目\测试` + `指标管理平台` + `崂山国家实验室项目` —— **全部同构** |
| `03-组件库` 内 `side-menu` / `侧边菜单` | **命中 0** —— 规范组件未登记（T16 未执行） |

---

## 三、根因分析

1. **规范组件从未接线（根本原因）**：所有页面统一经 `StructureMonitorShell` 渲染，壳内 `:896` 调的是私有实现，规范组件没有任何 import 点 → 物理上不可能生效。
2. **私有实现是唯一入口且封闭**：私有 `SideMenu` 内联在壳里，不导出、不接受 `items`，外部无法替换或复用。
3. **两者同名，掩盖了"未接线"**：私有函数与规范组件默认导出都叫 `SideMenu`，检索时极易误判为"已在用"。
4. **壳把项目专属内容写死**：硬编码「结构监测 V1.0」与结构监测 `NAV`。这也是此前"模板里的孤儿壳会带出结构监测 NAV"的同一根源——复制到任何项目都会污染。
5. **spec 与实现早已漂移，且未进组件库**：spec 写 240/64+折叠+`items` 契约，实现是 210 固定+写死 NAV；组件未登记 registry，从未进入"组件库 → 原型"的正规链路，因此没人发现它没生效。

---

## 四、修复方案（方案 A，用户已拍板）

> 原则：**保留规范组件、让壳改用它**，从此"改一次、全原型生效"；删除私有实现避免第二真源。

### 4.1 改动清单（每个项目壳各一份，共 5 处）

`src\common\StructureMonitorShell.tsx`：

1. 顶部新增 `import SideMenu from './side-menu';`
2. **删除私有 `function SideMenu`**（结构监测 `:279-311`；模板 `:279-311`）
3. `NAV` 映射为 `items`（**`sub` 不进 children**、**`group` 不再消费**）：
   ```tsx
   const menuItems = React.useMemo(
     () => NAV.map((n) => ({ key: n.key, label: n.label })),
     [],
   );
   ```
4. 调用点替换（结构监测 `:896`；模板 `:893`）：
   ```tsx
   <SideMenu
     title="结构监测"
     items={menuItems}
     defaultSelectedKey={current}
     onMenuSelect={(k) => onSelect(k as NavKey)}
   />
   ```
   - `width` 用默认 240（如需保持 210 可显式传 `width={210}`，见待确认）
   - 折叠能力由组件自带（`collapsible` 默认 true）→ spec「折叠态」此时才真正生效
5. 红点：删除 `:303-305` 那段（用户已拍板去掉）。`GROUP_META` 取证显示无消费方，可一并删除，或保留为纯文档常量（由豆包定）。
6. 二级 `sub` 维持页内 Tab（`SubTabBar`），不动。
7. 按 T16 把 `side-menu` 登记进 `03-组件库`。

### 4.2 不改动项（明确划界）

- `goModule()`（`:26`）跳页逻辑、`NAV` 的 `key/label` 取值、`NavKey` 类型 —— 全部不变，保证点击行为与改前一致。
- 右侧设计说明、`DescStyle`、`Z` 层级等无关部分不动。

### 4.3 已知差异与风险（请豆包评估）

| # | 项 | 说明 |
|---|---|---|
| R1 | 视觉变化 | 210 固定 → 240 + 多一个折叠按钮。这是 spec 要求的行为，用户已选方案 A 知悉 |
| R2 | 选中态配色 | 私有实现选中文字用壳主题 `C.primary #2b6cff`；规范组件 CSS 选中文字为 `#0f172a`、底色 `#e8f0ff`（与壳 `C.active #e8f1ff` 几乎一致）。若要完全统一，建议把 `side-menu/style.css` 硬编码色改为 CSS 变量或壳 `C` 常量 |
| R3 | 标题徽标 | 私有实现带「V1.0」；规范组件无 `titleExtra` 能力，保留需加字段 |
| R4 | 图标 | `resolveIcon` 只认 4 个名字，结构监测 `NAV` 未定义 icon → 纯文字即可；要图标需扩展 `resolveIcon` |
| R5 | 影响面 | 改动落在壳 → 5 个项目 + 模板全部生效；模板 `02-模板\_project-template` 属**共享目录**，按用户 2026-09-05 裁定归豆包排期执行 |
| R6 | 主题耦合 | 私有实现读壳内 `C` 常量，规范组件走自身 CSS；跨项目复用时以谁为准需统一口径 |

### 4.4 已排除方案（勿重复试）

- **方案 B**：把 `spec.md` 改写成 `sm-left-menu` 契约、归档规范组件 —— 用户否决（要求"规范真正生效"而非"降级文档"）。
- **方案 C**：两套并存仅补文档 —— 用户否决（留着双真源必然复发）。

---

## 五、验收标准（可判断）

1. 全工作台检索 `from '.*side-menu'`，`StructureMonitorShell.tsx` 至少 1 处命中。
2. `StructureMonitorShell.tsx` 中不再存在私有 `function SideMenu`。
3. 任一原型页面左菜单可折叠：点击折叠按钮宽度在 **240 ↔ 64** 间切换，标题折叠时隐藏。
4. 原 5 个导航项（数据看板 / 预警信息 / 设备管理 / 智慧诊断 / 报告管理）点击后行为与改前一致（仍走 `goModule` 跳页），选中态随 `current` 同步。
5. 项目 `npm run typecheck` 通过；模板同改后模板 `typecheck` 通过。
6. `03-组件库` 中可检索到 `side-menu` 登记项。

---

## 六、需拍板 / 待确认

1. 是否保留「结构监测 V1.0」标题徽标？（需给规范组件加 `titleExtra`）
2. 宽度取 **240（spec）** 还是沿用 **210**？
3. `side-menu/style.css` 的硬编码色是否统一到壳 `C` 主题常量？
4. 整改范围：是否含 `测试` / `指标管理平台` / `崂山国家实验室项目` / `02-模板`？排期如何？
5. `GROUP_META`：删除还是保留为文档常量？

---

## 七、核验边界（诚实声明）

- 本文所有结论来自**静态读码 + 全仓检索**，未实际启动 5 个项目逐个点击验证菜单行为。
- "全工作台 `from '.*side-menu'` 命中 0" 基于 `09-协作` 与 `01-项目` / `02-模板` / `03-组件库` 范围检索，已排除 `node_modules`、`dist`。
- 若豆包实测与本文冲突，以豆包实测为准；CodeBuddy 不坚持。

---

_CodeBuddy 2026-09-17 · 只读取证，未改任何工程文件_
