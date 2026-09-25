# 验收意见：工作台模板与组件扩充（修订版 v2）

- **验收人**：WorkBuddy｜**日期**：2026-09-17（v2 修订于 11:40）
- **任务书来源**：豆包 → CodeBuddy（`20260916T144009Z`，cc WorkBuddy，due 2026-09-17T16:00Z）
- **验收对象**：`03-组件库\页面模板\`（任务 1）、`03-组件库\组件模板\`（任务 3）；任务 2 尚未开始
- **方式**：静态核查 + **类型级实跑** + 浏览器截图；**未修改任何工程文件**（只读）

> **修订说明**：v1 把"工程里存在 `src\components\axhub\`"误判为"落地路径没统一"的硬伤，并建议改指向 `components\axhub`。经用户澄清目录职责后，**该判定与建议方向性错误，全部撤回**。详见下节。

---

## 〇、重要更正（v1 → v2）

用户澄清的目录职责（**这才是权威口径**）：

| 路径 | 职责 | 能否放原型组件 |
| --- | --- | --- |
| `src\component-templates\axhub\` | **原型页面组件**（页面里 import 的高频 UI 组件） | ✅ 唯一正确落点 |
| `src\components\axhub\` | **Make 客户端工具组件**（原型批注、发送修改上下文给智能体等） | ❌ 不可混用 |

**结论：文档口径（`README.md` / `提示词手册.md` / `gallery.html` 三处一致写 `src/component-templates/axhub/`）本来就是对的我却判成了错。** v1 的 P1 判定、以及"推荐统一到 `src/components/axhub`"的建议，**均予撤回**。

v1 观察到的现象是真实存在的（两个目录都有组件文件），但**归因错了**——那不是"路径没统一"，而是"旧组件库残留 + 部分项目尚未迁移"。已改写为下方的 A1 / A2。

---

## 一、结论速览（修订）

| 任务 | 内容 | 落地情况 | 验收判定 |
| --- | --- | --- | --- |
| 任务 1 | 导入 10 个品牌设计系统为页面模板 | 10 个模板目录 + 封面 + 注册表登记齐全 | ✅ **通过** |
| 任务 2 | 补 4-6 个业务型页面模板 | `business-*` 模板 **0 个** | ⏳ 未开始 |
| 任务 3 | 组件库分类目录 + 持续扩充机制 | 6 分类 45 条登记、gallery、提示词手册、选型映射齐备 | ✅ **通过** |

**总评**：产出质量高、完成度扎实。组件库是很好的一版——零第三方运行时依赖、有统一出口、有复制即用的提示词手册与选型映射，**类型检查全量通过（47 文件 / 0 诊断）**，落地路径口径也正确。剩余问题集中在**旧版本残留清理**与**迁移覆盖不全**（A1、A2），属收尾工作，不是方向问题。

---

## 二、我实际跑的验证（不是看文件列表）

| # | 验证项 | 方法 | 结果 |
| --- | --- | --- | --- |
| 1 | 页面模板注册表完整性 | 解析 `templates.json`，逐条校验必填字段/id 唯一/`sourcePath` 目录/`coverPath` 文件 | 46 条全部通过，0 缺失 |
| 2 | 品牌模板依赖登记真实性 | 正则抽取 10 个模板全部 `import` 的第三方包，与 `extraDependencies` 对账 | 检出 0 个第三方包 → `[]` 登记**真实** |
| 3 | 品牌模板与骨架兼容性 | 读 `index.tsx` 的 className 用法 + 骨架 `package.json` | 模板**不用 Tailwind 工具类**，与骨架 Tailwind v4 **无冲突** |
| 4 | **组件库类型检查（地面真相）** | 把组件库临时拷进 `01-项目\指标管理平台\`，用该工程**真实 node_modules + tsc 5.9.3** 全量编译 | **47 个文件 / 0 诊断** ✅（用完即删并回验） |
| 5 | 真源 ↔ 项目副本同步性 | 对 48 个 `.ts/.tsx/.css` 做 md5 对账 | 文件数、内容**完全一致**，无缺漏 |
| 6 | gallery 展示真实性 | 截图 + 卡片数 vs 实际导出对账 | 卡片数与文件数的差异**非虚报**：按"展示块"分组 |
| 7 | 落地路径口径核对 | 比对 `README.md` / `提示词手册.md` / `gallery.html` | 三处**一致**指向 `src/component-templates/axhub/` → 口径正确 ✅ |

**截图证据**：`07-日志\验收-组件库gallery-20260917.png`（45 条登记、7 分类、亮色渲染正常）

---

## 三、发现的问题（修订版，按严重度）

### 🔴 A1 · 旧组件库残留，且占用了 Make 客户端组件的目录名

| 残留位置 | 内容 | 建于 | 问题 |
| --- | --- | --- | --- |
| `<工程>\src\components\axhub\` | 旧 8 组件扁平版（11 文件）+ 旧 README | 09-13 23:00 | **该目录属 Make 客户端工具组件**，被原型组件占用 → 语义混用 |
| `<工程>\src\component-templates\Design-components\` | 旧 8 组件第二份副本 + docs | 09-14 | 已被新库 `axhub/` 取代，仍留在库目录里 |
| `component-templates\{basic,data,feedback,form,component-library,axhub-components}\index.tsx` | 组件库**浏览页** | — | 仍 `import ... from '../Design-components'` → **指向旧库，没跟新库接上** |

- **后果**：① 智能体看到 `components/axhub` 里躺着一套可用组件，会误当原型组件库用，**继续制造混用**；② 组件库浏览页展示的是旧 8 组件，不看新库 38 组件；③ Make 客户端目录被污染。
- **涉及工程**：骨架、结构监测、崂山（3 处 `components/axhub` 残留最重）；指标管理平台、测试已无 `components/axhub` 组件残留。

### 🟡 A2 · 新库迁移只覆盖 3/5

| 工程 | `component-templates/axhub/` 新库 | 状态 |
| --- | --- | --- |
| `02-模板\_project-template`（骨架） | ✅ 49 文件（11:01 落位） | 已迁 |
| `01-项目\指标管理平台` | ✅ 48 文件 | 已迁 |
| `01-项目\测试` | ✅ 已迁 | 已迁 |
| `01-项目\结构监测` | ❌ 仍是 `Design-components` + `components/axhub` | **未迁** |
| `01-项目\崂山国家实验室项目` | ❌ 同上 | **未迁** |

骨架已迁是关键利好——以后新建项目自动带新库。剩下两个存量项目按需迁移即可。

### 🟡 P2 · 同名组件两套并存，迁移需保超集

- 同名重叠：`Button` / `Card` / `StatCard` / `Tag` / `DataTable` / `Modal` / `ResultPage`
- 旧库 `index.ts` 还导出类型：`ButtonProps` `ButtonVariant` `ButtonSize` `CardProps` `StatTone` `Column` `FormFieldProps` `InputProps` `SelectProps` `SelectOption` `ResultStatus`
- 已核：新库这些类型**都在**（`export *` 链覆盖），可无损替换；但**替换前必须跑一次编译验证**，否则既有页面 import 断链

### 🟡 P3 · `server.mjs` 的 SKIP_NAMES 大小写缺陷（已实测复现）

`server.mjs:1193-1205` 的过滤写成 `SKIP_NAMES.has(path.basename(src.toLowerCase()))`——basename 恒为小写，而集合里含大写项：

| 文件 | 实际行为 | 应为 |
| --- | --- | --- |
| `package.json` | 已跳过 ✅ | 跳过 |
| `tsconfig.json` | 已跳过 ✅ | 跳过 |
| `AUTHOR.txt` | **被拷进原型目录** ❌ | 跳过（集合里写的是 `AUTHOR.txt`，永不命中） |
| `README.md` | **被拷进原型目录** ❌ | 同上 |

影响：模板库中 **18 个以上**含 `AUTHOR.txt`、含 `README.md` 的模板，新建项目后会往 `src/prototypes/<slug>/` 多塞两个无用文件。影响小，但属真缺陷，修法一行（两个常量改小写，或比较前统一 `toLowerCase()`）。

### 🟢 P4 · 品牌模板的 `tw.css` 是空壳且未被引用

```css
@import "tailwindcss";

/* TODO: Generate Tailwind v4 theme for HP. */
```

且 `index.tsx` **只 import `globals.css`，没有 import `tw.css`** → 死文件。建议删除，或补成真主题。

### 🟢 P5 · gallery 没有真实渲染预览

每张卡只有：组件名 + 来源目录 + 一句说明 + 「复制提示词」。**看不到组件长什么样**。组件库最核心的价值是"看得见、选得快"，现在只能靠名字猜。

### 🟢 P6 · 分类口径需在文档里说清（已降级）

- `component-templates\` 下 6 个目录（`basic`/`data`/`feedback`/`form`/`component-library`/`axhub-components`）**不是组件分类目录，而是组件库浏览页**（每个只含 `index.html` + `index.tsx`）。
- 组件分类目录是 `component-templates\axhub\` 内部的 `base/layout/form/data/feedback/business`（6 类）。
- → 两者同名易混（`data`/`form`/`feedback` 重名），建议在 README 里一句话点明"浏览页 vs 组件分类"的区别。

---

## 四、出主意（建议动作，按优先级）

### 1. 清理旧组件残留（解 A1，最优先）

1. `src\components\axhub\` 里的旧 8 组件**移出/删除**，该目录**留给 Make 客户端工具组件专用**（用户已明确职责）；
2. `src\component-templates\Design-components\` 整目录归档或删除（已被 `axhub/` 取代）；
3. 6 个组件库浏览页的 `import ... from '../Design-components'` **改指 `../axhub`**，卡片内容切换为新库 38 组件；
4. 删除 `AUTHOR.txt` / 旧 `README.md` 等随拷贝带进来的杂物。

> 一句话：**旧库退场、目录归位、浏览页接新库。**

### 2. 补齐 `结构监测` / `崂山` 迁移（解 A2）

这两个是存量项目、非新建，按实际进度排期即可；不需要重写页面（新旧库类型兼容）。

### 3. 任务 2 直接用新库搭业务模板（一石二鸟）

别手写控件了：6 个业务页模板直接用 `business/data/layout` 的 `PageHeader` + `FilterBar` + `TableCard`+`DataTable`+`Pagination` + `FormField`/`FormActions` + `KpiRow` + `ResultPage` 组合。
好处：① 交付任务 2 ② 顺带证明"新库被业务页真实复用"（任务 2 的验收原文要求）③ 6 个模板本身就是新库的运行级实测。

### 4. 给 gallery 加渲染预览（解 P5）

两条低成本路线：
- **内嵌 iframe**：每个组件配一个 3-5 行 demo 片段，gallery 里 iframe 指向项目的 vite 预览路由；
- **静态首帧截图**：用 headless Chrome 批量截每个组件的首帧，贴进卡片（一次脚本跑完，零运行时依赖）。

有了预览，选型才是"看图选"，而不是"看名猜"。

### 5. 处理 `tw.css`（解 P4）

建议直接删（避免空壳误导后人）。若坚持保留，就把 `theme.json` 色板映射成 Tailwind v4 `@theme` token，让它真的被 `globals.css` 引用起来。

> **v1 的"建立真源→项目同步机制"建议已撤回**：用户明确真源模板是给开发用的、这部分计划剔除，当前阶段专注原型，暂不做同步机制。

---

## 五、我没做 / 需拍板

1. **未做端到端实测**「新建项目 → 启动 → 浏览器渲染」。这会在你的数据区真实创建项目，按协作红线（task 需用户批准）我没擅自执行。
2. **未修改任何工程文件**（全程只读）。唯一的写操作是在 `01-项目\指标管理平台\` 下建过一个类型检查用的临时目录，**已删除并回验**。
3. **P3 属 `工作台面板\server.mjs`（工程文件）**，按共享目录维护权归豆包排期，我只报不动。
4. 本意见的 P2~P6 + gallery 预览建议，**将反馈给豆包汇总**（用户指定）。

---

## 附：可复现的核验命令

```bash
# 1. 组件库类型检查（地面真相）
#    先把 03-组件库\组件模板\ 拷到任一有 node_modules 的工程下（如 01-项目\指标管理平台\.wb-tscheck\）
#    补 ambient.d.ts:  declare module '*.css'; declare module '*.webp'; declare module '*?url';
#    用工程自带 tsc： tsconfig 需 lib: ["ES2020","DOM","DOM.Iterable"]、jsx: react-jsx
node <工程>/node_modules/typescript/lib/typescript.js

# 2. 注册表完整性 / 依赖对账 / 哈希同步：见 07-日志 或向 WorkBuddy 索取脚本

# 3. gallery 视觉核验
chrome --headless=new --window-size=1440,2600 --screenshot=out.png \
  "file:///.../03-组件库/组件模板/gallery.html"
```
