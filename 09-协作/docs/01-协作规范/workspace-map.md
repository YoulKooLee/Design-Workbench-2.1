# workspace-map — Axhub 工作台架构地图

> 本文档让你（任何智能体）在 5 分钟内搞懂这套原型开发工作台的**端口分工、启动方式、目录组织、记忆体系**。
> 处理「启动/构建/端口/依赖/预览」类问题前，请先读本文。

---

## 一、一句话总览

这是一套基于 **@axhub/make** 的原型开发栈：每个项目是一个可独立运行的 Vite 工程，多个项目共用一个 Make 管理端（工作台）来统一预览与切换。你日常接触的"原型/PRD/需求"都在各项目的 `src/` 下。

---

## 二、三个端口分工（最常踩坑的地方，务必记牢）

| 端口 | 是谁 | 作用 | 说明 |
|---|---|---|---|
| **7788** | Axhub 工作台客户端 | 管理所有项目的浏览器面板入口 | 双击 `启动工作台.cmd` 启动（`node server.mjs`） |
| **53817** | Make 管理端（全局唯一单例） | **用户真正预览原型的地址** | `http://localhost:53817/?projectId=项目名&p=原型id` |
| **51720** | 项目 Vite dev server | 给 make-server 提供渲染后端 | **不是**用户直接访问的入口；被占时顺延 51721/51722 |

> 预览原型的标准地址格式：`http://localhost:53817/?projectId=结构监测&p=dashboard`
> Make 管理端页面：`http://localhost:53817/`

---

## 三、启动方式

```
1. 双击  C:\Users\游翔\Documents\AI work\产品设计工作台\启动工作台.cmd   （启动 7788 工作台）
2. 浏览器打开工作台面板（7788），对目标项目点「启动开发栈」
3. 工作台会拉起该项目 Vite（51720）+ 注册到 Make（53817）
4. 等待项目状态从「启动中」→「活跃」后，点预览即可
```

**状态机**：`stopped → starting（启动中，过渡态）→ editing/active`。
- 启动 Vite 需要几十秒，期间项目显示「启动中」，**不要判死**。
- 若 Vite 已就绪会自动升级为 active。

---

## 四、目录组织（权威，数字前缀分层）

```
C:\Users\游翔\Documents\AI work\产品设计工作台\
├── 01-项目\            ← 所有原型项目（核心）
│   ├── 结构监测\
│   ├── 健康档案\
│   ├── Dingcan_app\
│   ├── Digital Twin\数字孪生\
│   ├── 演示项目\
│   ├── Nanshan_Visualization\
│   └── Rongzhihui_app\
├── 02-模板\_project-template\   ← 新项目模板
├── 03-备份\            ← 备份
├── 05-回收站\
├── 06-运行脚本\        ← launch-project.ps1 / scan-projects.ps1 等
├── 07-日志\
├── 08-文档\            ← 工作台架构与排错手册、使用说明等
├── 09-导出\
├── 10-智能体记忆\       ← 工作台记忆（4类，frontmatter 机读）
├── Agent_Stack\        ← 技能/规则/路由/反思（自建 Agent 层）
└── axhub-manager\      ← 工作台管理端代码（server.mjs）
```

> ⚠️ **顶层必须带数字前缀。** 旧记忆里不带 `01-项目/02-模板` 前缀的裸路径全部作废。

---

## 五、记忆体系（知道"知识在哪"）

```
10-智能体记忆\          ← 工作台外部记忆（纯文本，任何 AI 可读）
├── 000-文件与操作规范.md    （用户铁律：存放/备份/锁文件）
├── 001-启动与状态机.md      （必点两次/starting 状态/Make 联动）
├── 002-脚本与编码纪律.md    （PowerShell 5.1 坑/中文路径纪律）
├── 003-布局与前端实现.md    （Tailwind 4/PrototypeLayout/16:9 大屏）
└── README.md

Agent_Stack\           ← 分层 Agent 层
├── 01-skill\    axhub-launch / axhub-layout / axhub-script
├── 02-knowledge\  （引用 10-智能体记忆）
├── 03-rules\     rules.index.json + 4 分类
├── 04-router\    router.json + router.md（意图→资产路由）
├── 05-archive\   历史归档
└── 06-reflection\ 反思协议
```

**scope 加载过滤（重要）**：`project > universal > workspace`
- 处理某个项目 → 读该项目 `AGENTS.md` / `rules/` / `docs/`
- 处理工作台本身 → 读 `Agent_Stack/`（workspace + universal）
- 通用方法论 → 读 `Agent_Stack/03-rules/` + `10-智能体记忆/`

---

## 六、关键技术约束（踩坑红线）

1. **端口 53817 是全局单例**：多项目共享。若第二个项目启动失败，检查是否端口冲突（见 README 根因：runtimeOrigin 严格匹配）。
2. **改完 node_modules 依赖后必须重启 53817**，否则内存里还是旧模块（判断标准：进程 StartTime 是否晚于依赖改动）。
3. **ARM64 机器 rollup/vite bug**：vite build 报 `Cannot find module @rollup/rollup-win32-x64-msvc` 时 → 删 node_modules + package-lock.json → `npm i`，不要 `npm install rollup --force` 单包绕路。
4. **Windows 中文路径编码**：PowerShell 5.1 内联中文路径会乱码（`游翔`→`娓哥繑`）。需要传中文路径时，写 UTF-8 脚本内部用字面量，再用 `chcp 65001` + node 执行。
5. **绝不能 `taskkill /f /im node.exe`** 全量杀 node（会误杀 53817/51720）。只能按 PID 精准杀。
6. **本地预览必须用 HTTP**：不要直接双击 index.html（file:// 协议触发中文路径 UTF-8 vs GBK 编码陷阱 → ERR_FILE_NOT_FOUND）。

---

## 七、给处理"工作台/构建/启动"任务的新智能体

1. 先读本文档 + `10-智能体记忆/001-启动与状态机.md` + `Agent_Stack/01-skill/axhub-launch.md`。
2. 涉及端口/进程：先 `netstat -ano | findstr :53817` / `:51720` 看现状，不要盲目杀进程。
3. 改依赖后：**记得重启 53817**，并确认其 StartTime 晚于改动。
4. 完成改动后，把新坑回写到 `10-智能体记忆/` 对应类目，并同步更新本文件（如端口/目录有变）。
