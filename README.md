# 产品设计工作台

> 以 Axhub Make 为核心引擎的产品原型设计工作台，支持多智能体协作（豆包 / CodeBuddy / WorkBuddy / DeepSeek / 千问）。

---

## 一、环境要求

| 依赖 | 是否必需 | 说明 |
|---|---|---|
| Node.js ≥ 18（x64） | **必需** | 启动工作台面板与项目开发栈。下载：https://nodejs.org |
| pnpm | admin 项目必需 | 仅「标准产品框架」项目首次启动依赖时使用（`npm i -g pnpm`） |
| 浏览器 | 必需 | Chrome / Edge 等 |
| Git | 可选 | 克隆 / 更新本仓库 |
| 本地智能体 | 可选 | 豆包 / CodeBuddy / WorkBuddy / DeepSeek / 千问 |

> 工作台面板本身无第三方 npm 依赖（纯 Node 内置模块），克隆即可运行。

---

## 二、安装

```bash
# 1. 获取代码
git clone https://github.com/YoulKooLee/Design-Workbench-2.1.git
cd Design-Workbench-2.1

# 2. 首次部署引导（自动：Node 探测、Git 行尾规范、pnpm、@axhub/make 预装、编码体检、冒烟自检）
powershell -ExecutionPolicy Bypass -File 06-运行脚本/bootstrap.ps1

# 3. 一键启动
双击 启动工作台.cmd
```

启动后浏览器自动打开 http://127.0.0.1:7788

首次启动后建议跑一遍自检：

```bash
powershell -File 06-运行脚本/env-doctor.ps1        # 环境体检
node 06-运行脚本/smoke-test.mjs                    # 冒烟自测
```

---

## 三、启动与停止

```
双击 启动工作台.cmd     # 启动面板（自动探测 Node，拉起 7788）
双击 停止工作台.cmd     # 停止面板(7788) + Make(53817) + ACP(32124) + Vite(517xx) + 清理状态
```

| 服务 | 端口 | 说明 |
|---|---|---|
| 工作台面板 | 7788 | 项目管理 / Skill 库 / 知识库 / 工作规则 / 组件库 / 通信看板 |
| Axhub Make | 53817 | 全局单例，多项目共用 |
| ACP 运行时 | 32124 | AI 任务 |

---

## 四、文件目录

```
产品设计工作台/
├── 工作台面板/           # 面板服务（server.mjs + public/index.html）
├── workbench.config.json # 唯一配置真源（端口/路径/智能体）
├── 启动工作台.cmd        # 一键启动
├── 停止工作台.cmd        # 一键停止
├── launcher.ps1          # 启动脚本
├── stopper.ps1          # 停止脚本
│
├── 01-项目/              # 项目（每个项目独立目录）
├── 02-模板/              # 工程模板
│   ├── _project-template/  # React 原型工程模板（空白页起步）
│   └── _admin-template/    # 标准产品框架模板（Vue3/VibePM，成熟框架起步）
├── 03-组件库/            # 组件与页面模板（工作台组件库页签可维护）
│   ├── 01-补丁源/          # 新建项目自动添加的应用补丁
│   ├── 02-页面模板/        # 原型框架·页面模板
│   ├── 02-标品框架/        # 标准产品框架母版
│   ├── 03-页面组件/        # 原型框架·组件库
│   └── 03-UI风格/          # UI 风格知识库
├── 05-回收站/            # 删除的项目（可还原）
├── 06-运行脚本/          # launch-project / env-doctor / smoke-test / bootstrap
├── 07-日志/              # 工作台运行日志
├── 08-文档/              # 手册 / 答疑 / 排错 / 架构 / 未来计划
├── 09-协作/              # 智能体通信（消息总线 / 房间 / 交接包）
├── 10-智能体记忆/         # 智能体记忆主干（BOOTSTRAP 自举）
└── 04-维护台账/           # 补丁立账 + 工具
```

---

## 五、常见问题

| 问题 | 解决 |
|---|---|
| 启动报「未找到 Node.js」 | 安装 Node ≥ 18 后重试 |
| 端口被占用（7788/53817/32124） | 双击 停止工作台.cmd 一键清理后重启 |
| 知识库/工作规则面板为空 | 确认从 GitHub 克隆最新版 |
| admin 项目首次启动慢 | 首次后台 `pnpm install`，日志在 `07-日志/` |
| 智能体新会话不知从何开始 | 读 `10-智能体记忆/BOOTSTRAP.md` |

---

## 附录：上下文工程包

> 本节说明 `02-模板/_project-template/.agents/` 的设计原理，供维护者参考。

### 要解决什么问题

| 痛点 | 对策 |
|---|---|
| 过程讨论污染需求文档 | 写入侧三态门禁：`[事实]` 进基线，`[讨论]`/`[否决]` 进过程层 |
| 跨端开发失忆 | 模块完成快照（≤300 字）入常驻基线 |
| 上下文溢出 | 路径级技术拦截（context-budget hook）+ 分层按需检索 |

### 四层结构

| 层 | 内容 | 体量 |
|---|---|---|
| 常驻入口 | `AGENTS.md` 每次会话必读 | 6.5 KB |
| 装配层 | 常驻基线 / 模块滑窗 / 按需检索 | — |
| 强制层 | 8 个 hook 注册点 + 7 条拦截名单 | — |
| 记忆层 | 三态门禁 + 基线三件套 + 模块快照 | — |

### 真正常驻的内容

只有三个文件，合计约 **14.5 KB**：
- `AGENTS.md`（6.5 KB）——本工程独有事实与约定
- `.agents/skills/INDEX.md`（5.8 KB）——技能名 + 触发词
- `project-memory.md`（2.2 KB）——过程层摘要

技能库（2.4 MB）、组件库（1.46 MB）、业务规范（436 KB）**全部禁止整目录读取**，只允许精确单文件访问。

### Hook 注册（唯一真源）

`.agents/settings.json` 是 hook 注册的唯一真源（已删除并存的 hooks.json）：

| 事件 | 作用 |
|---|---|
| SessionStart | 清理上轮状态 + 注入技能索引 |
| PreToolUse (Edit/Write) | config-protection（防改配置）+ gateguard（防盲改） |
| PreToolUse (Read/Glob/Grep) | context-budget（拦截高危目录整读） |
| PostToolUse (Edit/Write) | review-reminder（提醒调用审查） |
| PreCompact | 压缩前保存状态快照 |
| Stop | 回复结束检查 console.log 残留 |

### 修改规则时必须同步

| 改了什么 | 必须跟着做 |
|---|---|
| `AGENTS.md` | 运行 `node .agents/scripts/build-agents-template.mjs` 同步派生 |
| 增删技能 | 运行 `node .agents/scripts/build-skills-index.mjs` 重生成 INDEX.md |
| 新增禁区目录 | 同步更新 `context-budget.cjs` 的拦截名单 |

### 已知边界

- **宿主接线**：全部 hook 依赖宿主加载 `.agents/settings.json`。WorkBuddy 宿主实测不加载，此时 hook 不生效，AGENTS.md 约束退化为纯文字。
- **写入侧门禁**：三态门禁目前是纪律约定，无技术兜底。
- **预算红线**：context-budget 是路径拦截器，不含字节阈值，体量约束目前只是文档约定。
