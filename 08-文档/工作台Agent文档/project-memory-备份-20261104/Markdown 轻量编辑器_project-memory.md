# 项目记忆
> ⚠️ 本文件是上下文衰减的兜底。**读到本行 → 顺手确认一次 `AGENTS.md` 是否还在上下文里**；不在就重读一次。`docs/README.md`、`AGENTS.md` 与本文件互为兜底点。

> 本项目专属记忆。**优先级最高**：与工作台通用规则（`10-智能体记忆/rules/`）冲突时，以本文件为准。
> AI 在本项目内开发时，先读本文件再动手；日常踩坑先记入「二、项目经验」，不急着进 `10-智能体记忆/rules/`。

## 〇、协作信息（v2 新增）

| 字段 | 值 | 说明 |
|---|---|---|
| owner_agent |  workbuddy| 负责智能体：doubao / codebuddy / workbuddy / deepseek / qwen |
| collaboration | single | single=单智能体 / pipeline=流水线 / dispatch=路由分诊 |
| room | `千问_上下文实测-MarkPane窗口版` | 上下文工程实测任务房间（qwen 建，workbuddy 主测） |
| handoff | `handoff.md` | 交接包：进度 / 推理注释 / 产物 / 已知坑（双写：共享目录 + 项目本地） |
| SPEC_SOURCE | `docs/01-需求与规划/MarkDesk-SRS需求规格说明书-V2.0.md` | 研发规格真源（2026-10-13 用户指令「完全复刻 web 版 MarkPane」触发 V2.0 扩写，覆盖 V1.0 登记；V1.0 存档保留） |
| PRD_SOURCE | `docs/01-需求与规划/MarkDesk-PRD.md` | 产品探索真源，**不得直接驱动** page-generator / HLD / LLD；其 §6「本版不做」自 2026-10-13 起失效，范围以 SRS V2.0 为准 |

## 一、项目画像

- **定位**：MarkDesk —— 复刻 MarkPane（vibepm.net/markpane）的**本地离线、打开即编辑**的 Markdown 编辑器原型。本项目同时承载「工作台上下文工程实测」任务（被测对象=装配协议/三态门禁/双滑窗/压缩闸门/context-budget hook），**流程完整性与证据质量优先于复刻还原度**。
- **功能需求**：见 `docs/01-需求与规划/MarkDesk-PRD.md`（落地版）与 `MarkDesk-功能清单.md`。MVP 五模块：①编辑内核 ②实时预览 ③文件 IO ④导出 MD/HTML ⑤视图与主题。
- **设计风格**：待设计方案阶段定（候选来自 `src/themes/`，需浅色/深色双主题）。DESIGN.md 于需求确认后产出。
- **开发规范**：原型层 React + TypeScript + Vite，落 `src/prototypes/markdesk/`；按生产级界面处理，非线框。组件优先复用 `src/component-templates/`（六分类）；设计令牌取自 `src/component-templates/_kit/theme.css`。
- **技术约束**：
  - **本地离线可运行**，不依赖 CDN 与外网；编辑器解析/渲染能力须内置（轻量方案优先）。
  - 运行形态（**2026-09-23 用户新指令更新**，原「不引入 Electron 等桌面壳」已被取代）：**双载体同源** —— ① Axhub 原型层可运行原型，经 Make 面板以独立窗口预览（`?p=markdesk`）；② **Electron 桌面应用**（`desktop/` 自包含子工程），复用同一份渲染层源码，宿主差异只收敛在 `lib/fileBridge.ts` 的判定分支内。
  - 工程包真源（`AGENTS.md` / `.agents/` / 模板 / 组件库）**禁止修改**——本任务为流程审计，只记录缺陷。

## 二、项目经验

> 本项目踩坑记录，一条一组。格式：`日期 | 场景 | 根因 | 修复 | 验证`。
> 判定可跨项目复用时，提炼为工作台层规则（`10-智能体记忆/rules/`）（scope: universal/workspace）并在「三、结项状态」登记规则 id。

- 2026-09-22 | 验证 `.agents/hooks` 是否咬得住 | ①WorkBuddy 宿主 `~/.workbuddy/settings.json` 无 `hooks` 段，工程 `.workbuddy/` 亦无 hooks 文件，`.agents/hooks.json` 未被加载；②`.agents/hooks.json` 与 `.agents/settings.json` 双份 hook 配置内容不一致（后者缺 context-budget）；③`context-budget.cjs` 的 HIGH_RISK_PATTERNS 比 AGENTS.md 禁区声明窄（未覆盖 `src/component-templates`、根级 `rules/` 全覆盖、`03-组件库` 父目录） | 会话内试探 A1/A2 全放行、零拦截输出；合成 payload 直喂脚本得「拦 5 放 4」矩阵 | 三组试探原始返回 + 覆盖面矩阵已归档 `09-协作/agents/workbuddy/上下文实测-证据/T-2-*.md`（缺陷只记录不修，回流豆包）
- 2026-09-22 | 会话内目录级 Read 被拦，易误判为「hook 生效」 | 拦截方是宿主 Read 工具自身的目录保护（文案建议 Glob/Bash），非 `context-budget.cjs` | 用合成 payload 直喂脚本做对照（同一目标未被 hook 拦），把「接线缺陷」与「工具自身保护」分离 | 见 `T-2-01`（试探 B 归因存疑）与 `T-2-02`（P2 放行）
- 2026-09-22 | 新建原型后预览页空白 | `.axhub/make/entries.json` 由 `scripts/scan-entries.js` 生成，`markdesk` 目录创建于扫描之后（entries 时间戳 14:16:48），条目未登记 → 预览路由 404，且 Make 面板里根本没有该条目 | 运行 `node scripts/scan-entries.js` 重扫（114 js / 114 html 条目），条目入册后 `GET /prototypes/markdesk/` 返回 200 | 预览页正常渲染，截图见 `T-6-01`
- 2026-09-22 | 代码块显示 `&amp;#39;`、关键字不着色 | 着色器**先整体转义再分词**：`escapeHtml` 把 `'` 转成 `&#39;`，数字规则 `\b\d+\b` 命中实体里的 `39` 并包 `<span>`，把 HTML 实体打碎 | 改为**在原文上分词、逐段转义后拼装**（扫描式 tokenizer，JSON 分支同法重写） | esbuild 探针 9 用例全过；页面实测 `codeText="const greeting = '你好，MarkDesk';"`、`tk-kw`/`tk-str` 计数正常
- 2026-09-22 | 相对图片路径被判非法、`javascript:` 链接残留字符 | `safeUrl` 用**白名单**（只放行 https/mailto/相对前缀），`a.png` 不在名单内；URL 正则遇首个 `)` 提前截断 | 改为**协议黑名单判定**（含协议者仅放行 http(s)/mailto/data:image，无协议按相对路径放行）+ URL 模式支持一层括号 | 复验：`![图](a.png)` 正常出图；`[点我](javascript:alert(1))` 中和为纯文本无残留
- 2026-09-22 | 块引用内部块的滚动锚点行号错误 | 块引用递归解析时未传 offset，内部块 `data-line` 从 0 重数 | 传入 `lineNo + 1` 保持绝对行号 | 复验 `> 引用` 内段落 `data-line="1"` 正确
- 2026-09-22 | 同时打开两个顶部下拉菜单 | 两个菜单各自 only 依赖「外部 mousedown」关闭，互相不感知 | 打开一个时显式关闭另一个 | CDP 复验 `openMenus=1`，菜单项不再混杂
- 2026-09-22 | `src/prototypes/sample-page/` 中途消失 | 未定；15:33 我读取时存在，16:02 `project.json` 被写入、16:06 面板「原型」组只剩 markdesk，现磁盘无该目录且 `entries.json` 仍残留其登记 → 特征符合「从 Make 面板删除条目」而非文件系统抖动。工程**不在 git 下**，无法版本回溯 | **未擅自重建**（用户明确不喜欢随意建目录/文件）；文件全文在会话上下文中，可一字不差重建 + 重跑 `scan-entries.js` | 已在 R1 提验与房间白板提请用户确认
- 2026-09-22 | SRS 未按 req-doc 规范撰写（首稿沿用 PRD 语汇）| 未先 Read `prd-language.md` + `section-format.md`；根因与 T-2 同链：session-start 未接线 → `INDEX.md` 未注入 → 需求文档技能路由失效 | 补读两份规范后按 L1/L2 分级重写，并执行 req-doc 门禁 2–4：布局方位/组件名/视觉词/技术词四类扫描零命中，字形描述仅保留于 L3 独立规格节；修正 3.5.3.5 章节编号错位、迁移 L2 中的等宽字形描述 | 扫描脚本复验：23 个 3.5.x 模块「一~五」结构齐一，3.2 功能点 23 条 ↔ 3.5 子功能 23 节 1:1；证据归档 `T-3-02` |
- 2026-09-23 | 桌面版主进程 `import { BrowserWindow } from 'electron'` 直接报 `does not provide an export named` | `electron` 是 **CJS 包**，ESM 下命名导出不可静态解析；改 `import electron from 'electron'` 后解构仍失败（默认导出亦为空对象） | 主进程/preload **整体改用 CJS**（`main.cjs` / `preload.cjs` + `require`），`package.json` 的 `main` 同步改为 `main.cjs`；工具脚本（`*.mjs`）保持 ESM | 窗口正常起、`app` 可用；`--selftest` 全链路通过
- 2026-09-23 | `require('electron')` 返回空对象，`app` 为 undefined | 宿主 shell 注入了 **`ELECTRON_RUN_AS_NODE=1`**（Electron 系宿主通用行为），使 `electron.exe` 退化为纯 Node 进程，不再加载 Electron 运行时 | 启动器 `run.mjs` 在 `spawn` 的 env 中 `delete env.ELECTRON_RUN_AS_NODE`（同时清 `ELECTRON_NO_ATTACH_CONSOLE`）| 自检脚本实测 `app.getVersion()` 正常返回；该变量已在本机实测确认存在
- 2026-09-23 | `npm install --prefix <子目录>` 后 `electron/dist` 缺失、打包报 `Failed to locate module "b4a" ... @axhub/make-client/node_modules/tar-stream` | **`--prefix` 只改安装目录、不改依赖解析的 cwd**：npm 按「当前目录所属工程」解析依赖树，于是把工程根包写进子工程 dependencies（`"@axhub/make-client": "file:.."`）并把工程根整棵依赖装进子目录（`desktop/node_modules` 出现 `@axhub`） | 以子目录为 cwd 重装（`cd desktop && npm install`）+ 移除被误写的根工程依赖 + 删 lock 重装；`pack.mjs` 另加 `stripSelfLinks()`（仅 `lstatSync().isSymbolicLink()` 为真才 unlink 自引用软链）作防御 | 重装后 `node_modules` 顶层 145 项、`@axhub` 不存在、`electron.exe` 在位；打包成功产出 `MarkDesk.exe`
- 2026-09-23 | `npm install` 成功但 `node_modules/electron/dist` 不存在 | Electron 的 postinstall 下载二进制**静默失败**（无报错、退出码 0） | 手动执行 `node node_modules/electron/install.js`，带 `ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/` + `npm_config_arch=arm64` | `dist/electron.exe` 落地，PE machine = `0xaa64`（ARM64 原生）
- 2026-09-23 | 打包产物截图全部 `CDP 超时: Page.captureScreenshot`（开发态同脚本完全正常） | Electron 窗口**无焦点/被遮挡时合成器不产帧**，`captureScreenshot` 一直等不到首帧（与代码无关，是窗口合成状态问题） | `verify-ui.mjs` 加**多策略兜底**：`direct` → `repaint`（先 `Emulation.setDeviceMetricsOverride` 强制重绘再截、用完 clear）→ `fromSurface:false` | 打包产物复测 5 张截图全部成功（`mode: "direct"`）
- 2026-09-23 | 待办勾选断言误判为「未生效」 | 点击后**立即断言**，未等 React 状态回写与 DOM 更新完成（`is-done` 尚未挂上），但截图肉眼可见已勾选 | 断言前加 2000ms 等待 | `doneCount 1→2`、`outerHTML` 含 `✓`、源码变 `- [x]`，三口径一致确证正常
- 2026-09-23 | 同一文件在一轮内并发两次 Edit 会互相覆盖 | 同一消息内对同一文件发两个 Edit，后一个基于旧内容写回，把前一个改动冲掉（表现为 `Cannot find name 'handlePath'` 等 9 处类型报错） | 同文件的多处改动**串行执行**，改完再改下一处 | 重新应用导入改动后 markdesk 报错归零（全项目 24，低于基线 26）
- 2026-10-13 | 工程目录改名后 `tsc`/`esbuild` 报 `Cannot find module 'react'` 等一片模块解析错，误以为要重装依赖 | pnpm 顶层包是**指向 `.pnpm` 实体的 Junction**；工程根从「产品设计工作台」改名为「01 产品设计工作台」后，`node_modules` 内 **484 条链接的目标路径全部悬空**（仍写旧路径），而 `.pnpm` 实体、全局 store（1.26 GB）均完好；`Test-Path node_modules\react` 返回 False 是断链所致，不是包缺失 | **禁止 `pnpm install`**（本机要重建会先删 `node_modules`，而 `.pnpm` 缓存就在其中，删了无法联网重下）；改为只重建链接：逐条 `readlink` → 把旧前缀换成新前缀 → **先只读校验新目标 `isdir` 全部命中（484/484）** → `os.rmdir`（仅删重解析点，不动内容）→ `mklink /J` 重指 | 类型检查恢复：markdesk 相关报错 0（全项目 24 条均为既有基线，位于 `src/common`、`component-templates`、`vite-plugins` 测试等）；渲染层 esbuild 构建 exit 0
- 2026-10-13 | `verify-ui.mjs` / 自建 CDP 探针本轮全部连不上渲染进程 | 无焦点环境下不仅 `captureScreenshot` 拿不到帧，**`Runtime.enable` 也会超时**、`/json/list` 取不到 `type=page` 的 target；`--selftest` 前台跑 300s 无新日志（停在 capture 前的握手） | 改走**不依赖窗口的两路验证**：① esbuild 把纯逻辑模块打成 cjs 跑断言（28 条：撤销栈合并/格式开关/查找倒序/目录跳围栏/转义不被打碎/新行内语法）；② `node run.mjs` 后台起窗口后只看 `app.log` 是否有未捕获异常（结果：无，仅 `GPU process exited` 这类无头噪音） | 冒烟 28/28 通过并**发现真缺陷**：`UndoStack.commit` 把 `batchBase` 误置为 `next`，导致连续输入只记最后一段、一次撤销回不到基线；改为 `batchBase = prev` 后该断言转绿。**遗留**：GUI 交互回归与打包 exe 复测仍需用户在有焦点桌面手工执行

## 三、过程层（T1 落地 · 压缩可丢 · 永不进基线）

> 以下三个小节为**过程层**：讨论、试错、被否决方案、任务进度等**不得写入基线**（PRD/SRS），一律落在这里。
> 压缩时可丢，但 `[否决]` 条目**必须保留理由一行**。写入规则见 AGENTS.md「写入侧三态门禁」。

### 决策记录（过程层·压缩可丢·永不进基线）

> 一条一组，格式：`日期 | [类型] | 决策 | 理由 | 状态(采纳/否决/挂起)`。类型 ∈ `[决策]` `[修复]` `[风险]` `[安全]`；否决必填理由。

- 2026-09-22 | [讨论] 运行形态三选一：Axhub 原型层 React 原型 / Electron 桌面窗口 / 单文件 HTML | [讨论] 原型层零新增依赖、离线可跑、与工程包流程一致；Electron 需新增依赖与构建链且偏离 Make client 定位；单文件 HTML 无工程结构，HLD/LLD 与「逐模块」流程会虚设 | 采纳（原型层 React）
- 2026-09-22 | [否决] 导出 Word | [否决理由] 需引入 docx 生成库（离线体积显著增大），且「导出 Word」属交付文档能力、非编辑器核心；MarkPane 虽提供该入口，但本地轻量版取舍为不做 | 否决
- 2026-09-22 | [否决] KaTeX 公式渲染 | [否决理由] 需内置 KaTeX + 数学字体（数 MB），与「轻量、打开即编辑」第一定位冲突；离线内置成本不抵使用频次 | 否决
- 2026-09-22 | [否决] Mermaid 图表渲染 | [否决理由] Mermaid 运行时体积大（数 MB），且渲染需异步重排、与实时预览的同步滚动互相干扰；同类需求可交外部工具完成 | 否决
- 2026-09-22 | [否决] 预览区反写编辑 | [否决理由] 需双向绑定（解析 DOM 改动 → 反推源码位置 → 回写），实现复杂度与源码损坏风险极高，收益不抵成本；与「实时预览只读」相比体验增量有限 | 否决
- 2026-09-22 | [否决] 多语言界面（i18n） | [否决理由] 目标用户为中文单一语种，引入 i18n 会带来全量文案二次维护成本；MarkPane 的多语言入口在本版取舍为不做 | 否决
- 2026-09-22 | [讨论] 选做项范围：代码块高亮 / 待办清单 / 分栏拖拽 / 导出 PDF·PNG | [讨论] 四项经用户判定全部保留为选做（不否决）；其中「导出 PDF·PNG」实现成本最高（依赖浏览器打印/截图链路），排期置于 MVP 五模块之后 | 采纳
- 2026-09-23 | [讨论] 桌面载体技术栈三选一：Electron / Edge `--app` 零依赖窗口版 / Tauri | [讨论] Electron：可下载 win-arm64 原生二进制，具备真实文件系统访问、原生菜单、系统对话框与文件关联，能把原型里的浏览器降级通道全部升级为系统级能力；Edge `--app`：零下载零依赖、立刻可用，但本质仍是浏览器窗口，无原生菜单与文件关联、保存仍受浏览器沙箱限制；Tauri：成品最小（~10MB）性能最好，但本机无 Rust 工具链，需另装 rustup + MSVC（数百 MB）且 ARM64 编译链易踩坑，工期显著拉长 | 采纳（Electron）
- 2026-09-23 | [讨论] 桌面工程落点三选一：工程内 `desktop/` 自包含子工程 / 独立工程目录 / 并入根工程 | [讨论] 自包含子工程：自带 package.json 与依赖、直接复用 `src/prototypes/markdesk` 源码，根工程 package.json 与 Make 构建链零改动、不影响面板扫描；独立工程目录：隔离彻底，但原型与桌面版代码分叉、后续需手工同步；并入根工程：最省事但会动模板级工程文件（有并发写入纪律）且 149MB 依赖进工程 node_modules | 采纳（工程内 `desktop/` 子工程）
- 2026-09-23 | [讨论] 桌面交付深度：可运行+可打包 / 仅可运行 | [讨论] 用户选「可运行 + 可打包」，既要能起真窗口，也要产出可双击运行的免安装版并实测启动 | 采纳（可运行 + 可打包）
- 2026-09-23 | [讨论] 渲染层复用方式：桌面版另写一套 / 宿主自适应零分叉 | [讨论] 另写一套会产生双份界面代码与同步成本；改为在 `lib/fileBridge.ts` 内做宿主判定（存在 `window.markdesk` 即走主进程 IPC），组件层不感知宿主，原型与桌面版共用同一份源码 | 采纳（宿主自适应零分叉）
- 2026-10-13 | [覆盖] 2026-09-22 五项否决（导出 Word / KaTeX 公式 / Mermaid 图表 / 预览区反写 / 多语言 i18n）全部作废 | [覆盖理由] 用户 2026-10-13 直接指令「完全复刻 web 版 MarkPane」，优先级高于历史取舍；经浏览器实测确认线上产品已具备上述全部能力（10 语言、Word/PDF/PNG 导出、公式、Mermaid、预览区原位编辑写回源码），复刻目标下不再以「轻量」为否决依据。原否决理由存档不删 | 覆盖（纳入 V2.0 范围）
- 2026-10-13 | [讨论] 复刻节奏三选一：分阶段全量 / 一次全做完 / 仅结构对齐 | [讨论] 用户选「分阶段全量推进」：阶段一=S1 结构对齐 + S2 编辑内核增强（SRS/HLD/LLD 文档先行），阶段二=S3 重依赖（KaTeX/Mermaid/Word·PDF·PNG 导出/导入）+ S4 高复杂度（预览反写/图片资源夹）；每阶段交付可预览 | 采纳（分阶段全量）
- 2026-10-13 | [讨论] 底部状态栏去留（线上无底栏，本地多出） | [讨论] 用户拍板「移除，对齐线上」：删 StatusBar 组件，行数/字数/光标不再呈现，保存与自动保存状态并入顶栏文案（对齐线上「自动保存已启用」形态） | 采纳（移除状态栏）
- 2026-10-13 | [讨论] 品牌名：照抄 MarkPane / 保留 MarkDesk | [讨论] 用户拍板「保留 MarkDesk」：复刻产品转桌面应用，不冒充线上网页产品；顶栏「工具介绍/更新记录」外链与 reset URL 参数为有意偏差项，已登记于 SRS V2.0 §7.1 | 采纳（保留 MarkDesk）

### 变更流水（过程层·压缩可丢·永不进基线）

> 一条一组，格式：`日期 | [类型] | 变更 | 触发人 | 影响范围`。`[敏感]` 条目只口头说明，不写在这里。

- 2026-09-22 | 项目立项，承载上下文工程实测（被测对象=工作台上下文工程）| 用户（经 qwen 建房间派单）| 全项目
- 2026-09-22 | 需求阶段方向决策落定（运行形态 + 选做项 + 5 项否决）| 用户拍板，workbuddy 执行 | 需求范围与功能清单
- 2026-09-22 | PRD→SRS 转写（Step F）完成，SRS V1.0 落盘并登记 SPEC_SOURCE | workbuddy 执行 | 研发规格真源切换；后续 HLD/LLD/逐模块均以 SRS 为输入
- 2026-09-22 | T-2 实测确认 hook 在 WorkBuddy 宿主未触发，用户裁定继续本宿主推进、T-2 记缺陷 | 用户 | 测试结论与证据口径
- 2026-09-22 | 原型输出完成，五模块 + 增强项全部落地并通过闭环验收 | workbuddy 执行 | `src/prototypes/markdesk/`（13 文件）；HLD 数据流闭环闸门转为通过；打开/保存/导出/拖拽列人工验收
- 2026-09-22 | 原型条目登记补扫（`scan-entries.js`），预览路由可用 | workbuddy 执行 | `.axhub/make/entries.json`（114 条目）；Make 面板出现 `markdesk` 条目
- 2026-09-22 | 原型调整为按千问对话内容迭代（用户指令）| 用户 | 后续原型变更范围与节奏
- 2026-09-23 | 用户裁定上下文工程实测**暂停**（实验设计不成立：复刻体量过大、代位 PM 派单偏离工程包预设分工），R2 不再开工 | 用户（qwen 通告）| 实测任务冻结；已产出 PRD/SRS/HLD/LLD、原型、T-0/T-2/T-3/T-6/T-EXEC 证据**原地保留**为将来「真实项目 + 全程数据采集」新方案的基线素材
- 2026-09-23 | 用户新指令：**根据原型开发桌面应用**，运行形态由「原型层 React」升级为「双载体同源」 | 用户 | 新增 `desktop/` Electron 子工程；`lib/fileBridge.ts` 增加宿主判定分支；LLD 追加 §十一；`src/prototypes/markdesk/` 结构不变、零分叉复用
- 2026-09-23 | 桌面工程交付完成：可运行（真窗口）+ 可打包（`MarkDesk.exe` 免安装目录版），打包产物实测全绿 | workbuddy 执行 | `desktop/`（12 项）；`desktop/release/MarkDesk-win32-arm64/`；证据归档 `09-协作/agents/workbuddy/桌面应用实测/`（11 项）
- 2026-10-13 | 用户新指令：**完全复刻 web 版 MarkPane 并转写成桌面应用**；实测盘点产出 `docs/01-需求与规划/MarkDesk-对照MarkPane差异清单-V1.md` | 用户 | 全项目范围重定义；SRS V2.0 扩写（41 功能点）、SPEC_SOURCE 切换；HLD/LLD 待同步；分阶段推进（阶段一 S1+S2 → 阶段二 S3+S4）
- 2026-10-13 | SRS V2.0 落盘并通过 req-doc 门禁 2-4（禁用词扫描零命中、3.2↔3.5 41↔41 一致、内容分级合规） | qwen 执行 | 研发真源切换至 V2.0；旧五项否决在 §7.2 登记失效；PRD §6 边界声明作废

### 任务进度（过程层·与 compaction-recovery.md 对齐）

- 上下文工程实测（MarkDesk）：**任务已暂停**（用户裁定实验设计不成立，R2 停止开工）。已产出内容原地保留：PRD/SRS/HLD/LLD、`src/prototypes/markdesk/`（13 文件）、T-0/T-2/T-3/T-6/T-EXEC 证据。
- MarkDesk 桌面应用（**用户直接指令的独立交付，非实测任务**）：**交付完成**
  - 开发态：`desktop/` Electron 44.4.3 ARM64 原生窗口，`--selftest` 全链路通过（截屏 + IPC + 原生菜单结构 + GBK 原编码回读校验）
  - 打包态：`desktop/release/MarkDesk-win32-arm64/MarkDesk.exe`（221.3 MB 免安装目录版，`asar: true`）—— CDP 实测零运行时异常、零 console 错误、5 张截图全过；首屏 `appMounted/bridgeReady` 均 true；待办回写确证 `- [x]`
  - 证据归档：`09-协作/agents/workbuddy/桌面应用实测/`（11 项）
  - **人工待验（原生文件选择器无法无头自动化，非实现缺失）**：打开 / 另存为 / 导出落盘 / 拖拽载入 exe / 关闭前拦截对话框
  - 下一步 = 用户手验上述 5 项；如需「可安装版（NSIS installer）」「应用图标」「文件关联」为增量项，未做
  - ⚠️ **本条描述的是 09-23 的旧产物**：`desktop/dist/renderer.js` 已于 2026-10-13 重建成阶段一版本，但 `release/MarkDesk.exe` **尚未用新代码重新打包**

- MarkDesk 完全复刻阶段一（S1 结构对齐 + S2 编辑内核）：**代码已落地，自动化验证全绿，GUI 交互回归待用户手验**（2026-10-13）
  - 文档：SRS **V2.0**（41 功能点 ↔ 3.5.x 41 小节，req-doc 门禁 2-4 通过）/ HLD **V2.0**（十模块 + 数据流闭环契约）/ LLD **V2.0**（§零~§十六，含双宿主与可追溯表）；V1.0 三份原地转为存档并在文首加注；`SPEC_SOURCE` 已切 V2.0
  - 代码落点 `src/prototypes/markdesk/`：新增 `TopBar / FormatToolbar / SearchPanel / OutlinePanel / LinkPrompt / ShortcutModal`，新增 `lib/{undoStack,searchEngine,formatOps,outline,lang,helpContent,importer,welcome,assets}`，重写 `index.tsx / Sidebar / EditorPane / HelpPanel / storage / fileBridge / exporter / markdown(下划线·上下标·高亮)`，**删除 `StatusBar.tsx`**（用户拍板移除底栏）；桌面侧 `main.cjs`（记住目录 + 导入通道 + 菜单扩项）、`preload.cjs` 同步
  - 有意偏差（已登记 SRS §7.1）：品牌保留 MarkDesk；顶栏品牌外链与 `?reset=` URL 参数不实现（离线约束），清理动作改由帮助面板三按钮承接
  - 阶段一**未含**：KaTeX 公式、Mermaid 图表、Word/PDF/PNG 导出、`.docx` 导入、图片上传与资源夹、预览区反写 —— 全部属阶段二（SRS 已写、LLD 已设计，代码仅有 `lib/assets.ts` 与 `importer` 的 HTML 分支先行落盘，未接线）
  - 已验证：`tsc` markdesk 0 报错（全项目 24 = 既有基线）；渲染层 `build-renderer.mjs` exit 0（曾报重复 `case 'fullscreen'` 已修）；纯逻辑冒烟 28/28 并修掉撤销栈合并真缺陷；`node run.mjs` 起窗后 `app.log` 无未捕获异常
  - **受阻/待办（非实现缺失）**：① 本环境无焦点 → `captureScreenshot` 与 `Runtime.enable` 均超时，**格式按钮点击、撤销重做往返、查找命中、视图/主题/语言切换的运行时表现未经界面级实测**；② `release/MarkDesk.exe` 未重打包；③ 阶段二整体未开工
  - 下一步 = 用户在有焦点桌面跑 `node verify-ui.mjs`（或直接在 Make 面板 `?p=markdesk` 预览）逐项验收，然后启动阶段二

- 阶段一**界面级回归实测**（WorkBuddy 接手执行，2026-10-14）：**功能通过 / 呈现不通过**
  - 方法：`desktop/verify-ui.mjs` 真窗口 + CDP 驱动 + 截屏取证；**6 轮、24 张截图，运行时异常 0、console 错误/警告 0**；新增 7 份可重跑动作脚本 `verify-actions-{stage1,stage1b,stage1c,gap,task,layout,find}.json`
  - **P0 阻断缺陷**：`.md-work` 缺 `flex-direction: column` → 格式工具栏被排成**左侧整列**（height 683px、按钮 y 全为 390 垂直居中），编辑区被压至约 247px。**一行 CSS 可修**；内存对照：加 column 后 fmtbar → `x263 y63 w991 h41`，editor/preview 各 492px，与线上同构（截图 `ui-layout/31-*.png`）
  - **P2 轻微**：SRS 3.5.1.6 边界「空数据…提示「暂无内容」」未实现（无 toast、无文案键）
  - 功能项实测全通过：A1 顶栏（导出 5 项下拉）/ A2 工具栏 23 按钮项序一致 / A3 侧栏 / A4 底栏已移除 / A5 全屏 / B6 查找替换（默认区分大小写合 SRS）/ B7 撤销重做 / D1 十语 / D2 快捷键 **3 组 11 条** / D3 帮助 7 节+三按钮 / D4 欢迎文档 / C3 新建 / 分栏夹紧 20-80 / 待办回写往返可撤销 / 预览渲染结构完整
  - 桌面自检通过：IPC 全链路 + 原生菜单结构（含全屏 F11、语言 10 项复选框）+ GBK 原编码保持
  - 对 qwen 自述修正 3 处：`StatusBar.tsx` 文件仍在（死代码，非"删除"）；差异清单 D2 应为 **11 条**非"十条"；「无焦点跑不了 GUI」属实但非本机限制
  - 待产品确认 4 项：插入类命令会替换选区 / 模板文案写死 / 待办用 span 非原生 checkbox / 底部外链为纯文本
  - 证据归档：`09-协作/agents/workbuddy/阶段一界面实测/`（49 项 + 实测报告）
  - 下一步 = ①修 P0-1（1 行）并复跑几何复验 ②补 P2-1 ③4 项待确认项对齐线上 ④清理死代码 ⑤`pack.mjs` 重打包 + 手验 5 项原生对话框

- 阶段一**修复轮**（用户拍板「P0 + P2 + 清死代码一次做完」，2026-10-14）：**已闭环并复验通过**
  - 改动 4 文件（改前均备份至 `.workbuddy/backup/2026-10-14-阶段一修复前/`，逐字节回读一致；本项目非 git 仓库）：`styles.css` `.md-work` +`flex-direction: column`（P0 本体）｜`lib/lang.ts` 十语包 +`find.empty`｜`index.tsx` `openFind` 源码为空时提示（P2，合 SRS 3.5.1.6 边界）｜删除死代码 `components/StatusBar.tsx`（LLD V2.0 已记为「删除」）并同步 `desktop/README.md`
  - 验证：`tsc` markdesk **0 报错**（全项目 24 = 既有基线）｜构建 `renderer.css` +22 B、`renderer.js` +490 B｜**P0 五项几何断言全 PASS**（`.md-work`=`column`；fmtbar `x263 y63 w991 h41` 单行横条；barAboveEditor；editorNotCrushed；widthsBalanced 492/492），且修复后截图与修复前内存对照图**字节完全一致**｜P2 toast = 「暂无内容」｜**回归 8 项全过**（导出下拉/加粗撤销重做/视图三态/待办回写/主题语言/快捷键帮助/分栏夹紧 20-80/深色首屏）｜运行时异常 0、console 错误 0
  - **新发现 P3（既有缺陷，本次未修，待裁定）**：`.md-pane{height:100%}` + `.md-preview{padding:24px 30px}` 缺 `box-sizing:border-box` → 预览元素溢出容器 48px（689 = 641+48），被 `.md-split{overflow:hidden}` 裁掉，滚到底仍有约 11px 内容不可见。**归属判定为既有**（把 `.md-work` 临时改回 `row` 后预览 bottom 同为 793）。建议修法 `.md-pane{box-sizing:border-box}`（1 行）
  - 另发现 `components/Toolbar.tsx`（4,245 B）同样零引用，亦为死代码；不在约定范围，仅报告未删
  - 证据归档扩充至 **62 项**（新增 `ui-postfix`/`ui-pvh`/`ui-pvh2` + 3 份动作脚本）
  - 下一步 = ①裁定 P3 与 `Toolbar.tsx` 是否一并修 ②4 项待确认项对齐线上 ③`pack.mjs` 重打包 + 手验 5 项原生对话框 ④阶段二

- 阶段一**修复轮 2**（用户拍板「P3 与 Toolbar 一起收拾」，2026-10-14）：**P3 已闭环并复验通过**
  - 改动 2 文件（改前均备份至 `.workbuddy/backup/2026-10-14-修复轮2/`，逐字节回读一致）：`styles.css` `.md-pane` +`box-sizing: border-box`（P3 本体）｜删除零引用死代码 `components/Toolbar.tsx`（4,245 B）
  - 验证：`tsc` markdesk **0 报错**（全项目 24 = 既有基线）｜构建 `renderer.css` 15876 → **15898 B**｜**P3 四项断言全 PASS**（`.md-pane` computed `box-sizing`=`border-box`；preview h **641** = 容器高（原 689）；preview bottom **745** = `.md-split` 底（原 793）；滚到底 `clippedPx` **−37**（原 +11），`pass: true`）｜P0 五项几何、P2 提示、8 项功能回归 全过｜运行时异常 0、console 错误 0
  - **新发现「预览区不拉伸」右缝缺陷（既有，未修，待裁定）**：`.md-pane.md-preview` 作为 `.md-pane-wrap`(flex) 的子项计算值为 **`flex: 0 1 auto`——无 `flex-grow` 即不拉伸**，宽度退化到内容 max-content。干净态（长段落欢迎文档）max-content ≥ 栏宽 → 被 shrink 压满 492，看不出问题；短文档（fixture ×6，最长行 224px）时 preview 仅 **299.33px**、**右缝 192px**，**竖向滚动条悬在栏中间**。三段对照实验：A 临时改回 `content-box` 宽度仍 299 → **证伪与本次 `border-box` 修复有关**（属既有）；B 临时补 `flex: 1 1 auto` → 492、右缝 0、滚动条贴右边缘 → **证实根因**；C `width: 100%` 等价。建议修法 `.md-preview{flex: 1 1 auto}`（1 行，**放 `.md-preview` 不放 `.md-pane`**，避免碰 `.md-editor` 的 inline `width:50%` 分栏比）
  - 新增证据：`ui-postfix2`（3 图）/ `ui-width` / `ui-gapwidth`（含 `42-长文档态-右缝检查.png`）/ `ui-gaproot`（含 `43-长文档态-补flex后.png`）+ 5 份动作脚本，档案合计 **31 项**
  - 下一步 = ①裁定右缝缺陷是否修（1 行）②4 项待确认项对齐线上 ③`pack.mjs` 重打包 + 手验 6 项原生对话框 ④阶段二评估（S3/S4）

- 阶段一**修复轮 3**（用户拍板「连带修掉」，2026-10-14）：**「预览区不拉伸」右缝缺陷已闭环**
  - 改动 1 文件（备份 `.workbuddy/backup/2026-10-14-修复轮3/`，20,341 B 逐字节一致）：`styles.css` `.md-preview` +`flex: 1 1 auto`（+3 行）｜`renderer.css` 15898 → **15912 B**（`renderer.js` 未变，纯 CSS）
  - 验证：`tsc` markdesk 0 报错（全项目 24 = 基线）｜**五场景全部填满、右缝恒 0**：干净态 492/492｜缺陷复现态（短段落×6）**492**（原 299）、右缝 **0**（原 192）｜仅预览态 990/990｜分栏拖到 80%（预览仅 20%）197/197｜空源码占位态 197/197
  - **决定性证据**：`ui-rightfix/44` 与诊断期内联 flex 版 `ui-gaproot/43` **SHA-256 逐字节相同**（`5be1e6b43c1debcd`，115360 B）→ CSS 落地效果 = 已实测通过的效果；缺陷态 `ui-gapwidth/42` 哈希不同
  - P0/P3/P2 回归全 PASS（含 `splitterBetween` 新增断言）｜功能回归 9 项全过（导出/加粗撤销重做/视图三态/待办回写/快捷键帮助/分栏夹紧 20-80/主题语言/渲染结构）｜运行时异常 0、console 错误 0
  - **一处测试误报已澄清**：X9/Y5 报「待办 0 项」实为视图重挂载后等待不足的时序问题，单轮复跑 `ui-todoref`（Z1–Z3）得 2 项、点击回写 `pass:true`、撤销复原 → **非产品缺陷**
  - 证据归档扩至 **37 项**（新增 `ui-rightfix`/`ui-rightfix-reg`/`ui-todoref` + 3 份动作脚本）
  - 下一步 = ①4 项待确认项对齐线上 ②`pack.mjs` 重打包 + 手验 6 项原生对话框 ③阶段二评估（S3/S4）

- **左侧菜单缩略化**（用户指令「与 MarkPane 有差距，MarkPane 是缩略展示，原型是撑开展示」，2026-10-14）：**已落地并复验通过**
  - 拍板：① 形态 = 图标+小字竖排 ② 最近/视图/语言 = 右侧浮层
  - 改动 3 文件（备份 `.workbuddy/backup/2026-10-14-侧栏缩略前/`，逐字节回读一致）：`components/Sidebar.tsx` **重写**为 `.md-rail` 缩略栏（`RailItem` = 图标+11px 小字）+ 三个浮层（最近/视图/语言，点外部与 Esc 关闭、再点同图标切换）｜`styles.css` 删 11 组旧侧栏规则、新增 `.md-side-wrap`/`.md-rail*`/`.md-flyout*`｜`index.tsx` 移除已无用的 `onClose`（收起改由顶栏 PanelLeft 负责）
  - **形态对齐全按线上逐像素量测**：对用户截图（1920×945，DPR=1）在 y=400 横扫 + 栏中轴竖扫 → 栏左缝 **10px**、栏宽 **56px**、栏右到编辑区 10px、主组节奏 **54px/项**（图标 ink 顶 81→134→191→243→297→351）、底部图标组 42px、小字 ink 高 9–11px→字号 11px。落地值：左缝 10 / 栏宽 56 / 节奏 53 / 底部 42 / 字号 11px
  - **条目顺序按线上改**：目录/打开/新建/… → **打开 / 新建 / 目录 / 最近 / 视图 / 帮助**
  - 验证：`tsc` markdesk 0 报错（全项目 24 = 基线）｜`renderer.css` 16283 → 16334 B、`renderer.js` +1512 B｜**16 项断言全 PASS**：几何（56/10/66、旧 `.md-sidebar` 命中 0）、顺序、六项竖排、底部三项纯图标、浮层位于栏右侧且与触发项顶对齐（72>66，279/279）、视图三态往返、最近空态与**有记录态**（种入 3 条 → 名称+时间+× 齐全，删除后剩 2 条且 localStorage 同步）、语言十语切换后栏内标签整体转英文、三种关闭语义、主题/目录/顶栏收起｜回归：P0（column、fmtbar 横条、584/584）+ P3（border-box、底部对齐）+ 右缝（`previewW=wrapW`、rightGap 0）｜运行时异常 0、console 错误 0
  - 证据归档 `09-协作/agents/workbuddy/侧栏缩略改造-2026-10-14/`：10 张截图（50–58 号）+ 1:1 对照图 + 3 份动作脚本 + 改造报告
  - 未做：「更多工具分享」仍不可点击（既有 4 项待确认项之一，行为未变）；视图浮层未含「全屏」（原本在原生菜单 F11）

- **顶栏语言入口去重**（用户拍板「移除顶栏语言」，2026-10-14）：**已闭环**
  - 依据：LLD §十一 Sidebar 行「移除视图入口的重复项（保留一处）」+ 线上顶栏无语言入口 → 语言只留缩略栏底部 globe 图标浮层
  - 改动 3 文件（备份 `.workbuddy/backup/2026-10-14-顶栏去语言前/`）：`TopBar.tsx` 删 `Globe` 与 `LangCode`/`LANG_OPTIONS` 导入、`TopBarProps` 删 `lang`/`onPickLang`、删 `langOpen`/`langRef`/语言下拉 JSX、导出按钮 onClick 简化｜`index.tsx` `TopBar` 不再传 `lang`/`onPickLang`｜`styles.css` 删零引用的 `.md-dropdown-scroll`
  - 构建：`renderer.css` 16334 → **16283 B**（−51）｜`renderer.js` 284715 → **284148 B**（−567）｜`tsc` markdesk 0 报错
  - 验证（`ui-topbar-lang` C1–C7 全 PASS）：顶栏只剩 `保存/另存为/导入/导出`、`langChips []`、`globeIcons 0`、菜单数 1；语言经缩略栏浮层切换后全站生效（顶栏与栏内标签整体转英文）；导出下拉 5 项未受影响｜运行时异常 0
  - 1:1 对照复核：我们栏边界 `x=10` 起白、`x=66` 止 → 与 MarkPane `10..65` 完全一致

- **缩略栏浮层越界修正 + 移除「更多工具分享」**（用户指令「语言浮窗位置优化下，超出屏幕了；语言下面的 更多工具分享按钮去掉」，2026-10-14）：**已闭环**
  - 缺陷：语言浮层含 10 项、高约 373px，而锚点在缩略栏底部（y≈705）→ 向下展开必然出屏
  - 改动 2 文件（备份 `.workbuddy/backup/2026-10-14-浮窗越界与更多按钮/`）：`components/Sidebar.tsx` 浮层定位改为「下方空间不足则向上翻转 + 内联 max-height、超限可滚」；删除 `.md-rail-foot` 的「更多工具分享」入口及其样式 ｜ `styles.css` 清理对应规则
  - 验证（`ui-flyout` D1–D8，**31 项断言全 PASS**，运行时异常 0、console 错误 0）：底部 `iconBtns 2`（主题 / 语言）、`md-rail-more` 命中 0；语言浮层 `flippedUpward:true`、`top 366 / bottom 739 / viewportH 757`（**完全落在视口内**）、`scrollOverflowPx 0`、内联 `max-height 383px`；视图浮层仍常规向下且与触发项顶对齐；最近空态在视口内；Esc 三种语义与语言切换往返不受影响；布局回归（column / 584 等宽 / 右缝 0 / border-box / notClipped）全过
  - 截图 59–61；证据并入 `09-协作/agents/workbuddy/阶段二实测/`

- **阶段二全量交付（S3 重依赖项 + S4 高复杂度项）**（用户指令「把阶段二内容做完」，2026-10-14）：**六项全部落地，7 轮 232 项断言 0 失败**
  - 范围：B1 KaTeX 公式 ｜ B2 Mermaid 图表 ｜ B3 预览区反写 ｜ B4 图片插入 + 资源夹落盘 ｜ C1 导出五种形态 ｜ C2 导入 `.docx` / `.html`
  - 代码落点：新增 `lib/rewrite.ts`（17,816 B 反写算法：标记·文字段树 → LCS 对齐 → 归属表 → 回写）、`lib/formula.ts`、`lib/diagram.ts`、`lib/mammoth.d.ts`、`components/ImagePrompt.tsx`；重写 `lib/{exporter,importer,assets,fileBridge}.ts`、`lib/markdown.ts`、`components/PreviewPane.tsx`、`index.tsx`；`lang.ts` 十语各补新键；桌面 `main.cjs`/`preload.cjs` 扩宿主桥（`pickImage/writeAssets/exportPdf/exportImage`）
  - **五条硬约束落地**：① 反写「以最后一次源码为准」—— `sourceRevRef` 修订号闸门（放 ref 不放 state，因 blur 早于重渲染），不一致即丢弃不合并（LLD §3.5）② 块范围按**源码结构**判定，而非「下一块锚点」（夹空行会跳号）③ 不可改写闸门补 `.md-img-broken / .md-formula-raw` ④ 待办勾选热区收窄到方框本身（`data-task` 迁到 `.md-task-box` + `::after{inset:-6px}`），文字区让给反写 ⑤ 导出与预览同款（烘焙取用预览同一张资源表）
  - 验证：`tsc` markdesk 0 报错 ｜ **95 动作 / 232 断言 / 0 失败 / 异常 0 / console 0**（`ui-flyout 31`、`ui-stage2a 24`、`ui-assets 46`、`ui-rewrite 77`、`ui-import 23`、`ui-stage2-export 8`、`ui-packaged 23`）｜反写算法离线用例 26/26 ｜导出产物五形态齐全（HTML 392,970 B、Word 393,310 B、PDF 94,357 B、PNG 37,798 B、MD 426 B）｜图片落盘 `图片一文.md` + `图片一文_assets/{粘贴图,示例图,示例图-1}.png` ｜`.docx` 导入 129 ms
  - 打包：`release/MarkDesk-win32-arm64/MarkDesk.exe` **226,621,440 B**（arm64）。打包被批量删除护栏拦下（`SAFE_DELETE_BULK_CONFIRM_REQUIRED`，73 > 50）时**不绕过护栏**，改用项目既有「旧包改名让路」。asar 56 条关键文件齐、`verify-*`/`.logs` **0 泄漏**、prune 仅留 `iconv-lite`+`safer-buffer`；**asar 内 `renderer.js/.css/index.html` 与磁盘产物哈希逐一相同**（`34bad4b172e646dc` / `b9abdd532ac36db7` / `6aab4c6b3669cf90`）→ 包里跑的就是当前源码
  - 实测踩坑（可复用）：① 预览约 300ms 渲染防抖 → 凡量 DOM 的断言必须先轮询等目标节点收敛 ② 反写提交的 Enter 必须在会话真正建立后再派发 ③ `querySelector('.katex')` 只取首个节点会误判上下标（首个是 `$E=mc^2$`；`$a_b^c$` 是第二个，且 KaTeX 走 MathML `<msubsup>`，**不是**原生 `<msub>`）④ 删掉 `.logs` 输出目录会让「保存失败」伪装成「目标文件被占用」
  - 未覆盖：原生文件选择器 6 项仍需人工过一遍（自动化走 dialog 打桩）
  - 证据归档 `09-协作/agents/workbuddy/阶段二实测/`：14 张截图（59–72）+ 8 份动作脚本 + 1 份 docx 素材生成器 + 7 份原始 report.json + 实测报告

- **实测四项修正（用户实测反馈清单）**（用户指令 4 条，2026-10-14 晚 ~ 10-15 收尾）：**四项全闭环，含 1 个补发现的滚动同步根因**
  - ①**滚动同步异常**（4 个根因，前 3 个 10-14 修、第 4 个 10-15 复跑时发现并修）：
    ⑴ textarea 软换行使 `scrollTop / lineHeight` 得到**视觉行号**而非源码行号（128 行文档 wrapFactor 1.26，naive 68 vs 真实 54；真实报告 1.47→开目录 1.87）→ 用同宽同字体离线容器逐行量高建「源码行→视觉纵坐标」映射表 + 二分换算；
    ⑵ 程序化滚动派发的 scroll 回声被当用户操作、两侧互相抢占（设一侧到 50% 后对侧 scrollTop 归零）→ `suppressRef = {box, value, until}` 同盒+位置未偏离+未超时则忽略；
    ⑶ 布局变化后整体漂移 → `ResizeObserver` 重对齐；⑷ **预览锚点是「内容坐标」，宽度一变折行数就变、整表作废**，而锚点只在 `html/view_mode/graphTick` 变化时采集 → 抽出 `collectBlocks()`，尺寸变化回调里**先重采再对齐**（修复前：目录打开态 ratio 0.5 源码 49 行对预览 38.8 行、末尾累积 18.7 行；修复后全档 delta 0）
  - ②**工具条 / 目录圆角化**：`.md-fmtbar` 与 `.md-outline` 由直角通高边改为 `border-radius: 12px` + 1px 描边 + shadow，`.md-work` 留 10px 缝露出圆角；目录与图标栏留 12px、顶与工具条顶对齐（≤2px）
  - ③**关于对话框**：去掉 `数据目录：C:\Users\...`（会带出用户名），不再写「从 MarkPane 复刻」，改为 4 行产品自述。打桩实测 `含本机路径 false / 含用户名 false / 含 MarkPane false`
  - ④**帮助面板 Markdown 语法表**：12 条 → 23 条（块级 10 + 行内 13，按 `lib/markdown.ts` 实际实现逐条比对，不多写不支持写法），分两组小标题、`table-layout: fixed` + 首列 230px、语法 chip 不换行、横向溢出 0
  - 验证：SC 轮（128 行软换行文档）**27 断言 0 失败**、SR 轮（真实 `阶段二实测报告.md`）**全档 delta 0**（含五成处开目录、目录开关往返 ×2）、回归 8 套 + 包内 1 套**全 PASS**、`tsc` markdesk 0 报错、asar 6 个关键文件 sha256 与磁盘逐一相同、包内 56 条中 `verify-*` **0 条**
  - 可复用踩坑：⑴ **Electron 打包态默认禁用 `nodeOptions` fuse**，`NODE_OPTIONS=--require=...` 打桩静默失效（日志 `not-browser-process`）→ 打包态文案核验只能走 asar 对账 ⑵ `spawnSync` 里拼 `NODE_OPTIONS` 必须把 `path.join` 的反斜杠换成正斜杠，否则被引号解析当转义符 → `MODULE_NOT_FOUND internal/preload` ⑶ **根工程 `npm run build`（vite 全量）当前是坏的**：单入口固定 IIFE + `lib/diagram.ts`/`lib/importer.ts` 动态导入产生代码分块 → `Invalid value "iife" ... code-splitting builds`；且 `scripts/build-all.js` 会先 `rmSync(dist)` 再构建，失败即删掉根 `dist/`。桌面版交付走 `desktop` 的 esbuild 通道，不受影响
  - **附带发现（既有缺陷，未改）**：资源夹内已有同名图片时再次保存，`writeAssets` 的磁盘避让改名（`示例图.png → 示例图-1-1.png`）没回写引用 → 本次写入的图片成孤儿、预览 4 张图全破。空夹具 46/46 PASS vs 同目录二跑 42/46（`F7 imagesStillResolve=false`/`F9 folderBound=false`）。该用例脚本**不幂等**，跑前须保证 `.logs/assetout/` 存在且为空
  - 证据归档 `09-协作/agents/workbuddy/实测四项修正-2026-10-14/`：6 张截图（72/74/74b/75/76/77）+ 6 份动作脚本 + 15 份报告 + 实测报告.md；备份 `.workbuddy/backup/2026-10-14-实测四项修正前|后/`

### 模块完成快照（过程层·压缩接力件）

> 六模块同步落地，故合并为一份快照（每行一条，≤300 字总量）。

| 模块 | 快照 |
|---|---|
| M1 文档编辑 | 源码 + 基线双状态；dirty=源码≠基线；草稿 500ms 防抖留存、启动自动恢复；保存首次走另存为、之后按句柄写回；编辑辅助三项（Tab 缩进/列表继承/成对符号）默认启用；统计量由源码派生 |
| M2 实时预览 | 内置解析器（原文分词 → 逐段转义），输出带 `data-line` 锚点的 HTML；300ms 防抖、超 1MB 宽至 1000ms；滚动同步按行锚点换算、驱动侧 150ms 锁定防回声，无锚点退化为比例换算 |
| M3 文件读写 | FSA 优先（可写回同一文件），缺失时降级为文件输入 + 下载通道并在状态区明示；最近文件上限 10、同路径去重；未保存拦截覆盖打开/拖拽/关闭 |
| M4 导出 | Markdown 导出直出源码原文；HTML 导出复用预览渲染结果 + 内联样式与主题变量，零外部引用 |
| M5 偏好管理 | 视图三态 / 主题 / 分栏占比 / 侧栏收起 / 编辑辅助开关，全部即时持久化 |
| M6 偏好持久化 | 键空间 `markdesk:` 下 draft / prefs / recent 三键；读取失败按默认值启动，功能不中断 |

## 四、结项状态

- **结项日期**：
- **提炼到工作台层的方法论**：<规则 id 或「无」>
- **归档位置**：<<归档目录路径（**新建前先问用户**）或「无」> 或「无」>
