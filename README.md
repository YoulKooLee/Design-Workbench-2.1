# 产品设计工作台 v2

> 产品原型设计工作台（以 Axhub Make 为核心引擎）。**工作台面板沿用旧版 Axhub 的 axhub-manager 体系**（用户拍板，目录名已从 axhub-manager 更名 工作台面板），并并入 v1.7 组件库、共享通信平台与记忆分层。
> **智能体（豆包 / CodeBuddy / WorkBuddy / DeepSeek / 千问）新会话第一站：读 `10-智能体记忆/BOOTSTRAP.md`。**

## 一键启动 / 停止

```
双击 启动工作台.cmd     # 启动面板（自动探测 Node，拉起 7788）
双击 停止工作台.cmd     # 停止面板(7788) + Make(53817) + ACP(32124) + 通信面板(8899) + Vite(517xx) + 清理状态
```

- 工作台面板：http://127.0.0.1:7788 （工作台面板/，旧版 axhub-manager 体系更名：项目管理 / Skill 库 / 知识库 / 工作规则 / 触发路由 / AI 联动徽标）
- Axhub Make：http://127.0.0.1:53817 （全局单例，多项目共用）
- ACP 运行时（AI 任务）：http://localhost:32124
- 项目一键起栈：`powershell -File 06-运行脚本/launch-project.ps1 -RootDir <工作台根> -ProjectName "01-项目\<项目名>"`
- 环境体检：`powershell -File 06-运行脚本/env-doctor.ps1`；冒烟自测：`node 06-运行脚本/smoke-test.mjs`

## v2 目录结构

```
产品设计工作台/
├── 工作台面板/           # 工作台面板（旧版 axhub-manager 体系更名：server.mjs + public/index.html 单文件）
├── workbench.config.json # 唯一配置真源（端口/路径/池/智能体）
├── 启动工作台.cmd        # 一键启动（旧版逻辑）
├── 停止工作台.cmd        # 一键停止（端口 + 状态清理）
├── 01-项目/              # 项目（试点：指标管理平台）
├── 02-模板/              # _project-template 项目模板
├── 03-组件库/            # v1.7 组件库（frame 母版 + ui-libs + catalog + registry）
├── 05-回收站/
├── 06-运行脚本/          # launch-project / env-doctor / smoke-test
├── 07-日志/              # 工作台运行日志
├── 08-文档/              # 手册 / 答疑 / 排错 / 架构 / 未来计划
├── 09-协作/              # 共享通信平台（消息总线/房间/交接包，整体迁入）
├── 10-智能体记忆/         # 中性记忆主干（000~004 / rules / skills / agents/<各智能体>）
└── 04-维护台账/           # 补丁立账（patches）+ 工具 + 参考版底版归档（archive）
```

## v2 新增能力

| 模块 | 说明 |
|---|---|
| 面板（工作台面板） | 旧版 axhub-manager 体系更名，KNOWN_AGENTS 扩至 5 智能体（codebuddy/workbuddy/doubao/deepseek/qwen），AI 联动徽标覆盖全部智能体 |
| 组件库（03-组件库） | v1.7 frame 母版 + 5 套 ui-libs；`component-registry.json` 登记真源；新增组件走 6 步流程（T16） |
| 智能体通信（09-协作） | 项目可指定 owner_agent；交接包双写（共享目录 rooms/ + 项目 handoff.md）；消息总线/watcher 面板 |
| 记忆分层（10-智能体记忆） | 中性主干（豆包维护）+ 各智能体分区；新会话 BOOTSTRAP 自举 |
| 运行加固 | NODE_OPTIONS/CODEBUDDY_* 显式清洗（T6）；进程日志落 07-日志；停止脚本一键全清 |

## 铁律速查（T1–T19 详见综合稿）

- T12 共享目录协议不复制不双写；通信写操作必须用户确认
- T13 交接包必须过 6 项自检，接手先读 handoff.md
- T14 组件库 JSON 合法 + 引用完整，smoke-test 不过不发布
- T15 组件调用对照重写/白名单拷贝，运行时禁止指向 03-组件库
- T18 技能以 v1.7 为权威真源，工作台只放路由入口

## 部署与上手（他人使用）

### 1. 依赖程序清单

| 依赖 | 是否必需 | 说明 / 获取方式 |
|---|---|---|
| Node.js ≥ 18（x64） | **必需** | 启动工作台面板与项目开发栈。启动器自动探测：优先 WorkBuddy 自带 node，回退系统 PATH。下载：https://nodejs.org |
| pnpm | admin 项目必需 | 仅「标准产品框架」项目首次启动自动安装依赖时使用（`npm i -g pnpm`）。Make/React 原型项目不需要 |
| 浏览器 | 必需 | Chrome / Edge 等，访问工作台面板 http://127.0.0.1:7788 |
| Git | 可选 | 克隆 / 更新本仓库 |
| 本地智能体 | 可选 | 豆包 / CodeBuddy / WorkBuddy / DeepSeek / 千问，接入工作台协作体系（见下） |

> 工作台面板本身无第三方 npm 依赖（纯 Node 内置模块），克隆即可运行；仅项目级（admin 框架）需要 pnpm 安装依赖。

### 2. 部署步骤（推荐：一键引导）

```bash
# 1) 获取代码
git clone git@github.com:YoulKooLee/Design-Workbench-2.1.git   # 或解压 zip 到任意目录（路径含中文/空格均可）
cd Design-Workbench-2.1

# 2) 首次部署引导（自动：Node 探测/架构、Git 行尾规范、pnpm、@axhub/make 预装、编码体检、冒烟自检）
powershell -ExecutionPolicy Bypass -File 06-运行脚本/bootstrap.ps1

# 3) 一键启动
双击 启动工作台.cmd        # 浏览器自动打开 http://127.0.0.1:7788
```

> 工作台面板本身无第三方 npm 依赖（纯 Node 内置模块）；bootstrap 会预装 `@axhub/make` 到模板层（`02-模板/_project-template/node_modules/`），避免首次启动开发栈时 npx 现场下载。若跳过 bootstrap，直接双击 启动工作台.cmd 也可运行（缺少的依赖由启动器按需回退）。

首次启动后建议跑一遍自检：

```bash
powershell -File 06-运行脚本/env-doctor.ps1        # 环境体检
node 06-运行脚本/smoke-test.mjs                    # 冒烟自测（组件库 JSON / 端口 / 配置）
```

> 启动器会**自动重建缺失的标准目录**（01-项目 ~ 10-智能体记忆 等），新环境无需手工建目录；`workbench.config.json` 为唯一配置真源（相对路径，可移植）。

### 3. 让本地智能体快速掌握（新会话第一站）

各智能体（豆包 / CodeBuddy / WorkBuddy / DeepSeek / 千问）接入工作台后，**新会话第一站读 `10-智能体记忆/BOOTSTRAP.md`**，其中包含角色定位、目录地图与协作协议。关键速查：

- **角色与记忆**：`10-智能体记忆/`（中性主干 + 各智能体分区；BOOTSTRAP 自举；`rules/` 门禁、`skills/` 技能）
- **协作协议**：`09-协作/`（rooms 房间消息总线 + messages/inbox 收件箱 + handoff 交接包）；**通信写操作必须用户确认（T12）**
- **项目入口**：`01-项目/<项目名>/` —— 项目专属 `.agents/`（技能/知识/规则，从模板复制）、`.workbuddy/current.json`（编辑焦点）、`handoff.md`（交接包，接手先读，T13）
- **规则/知识/技能真源**：`02-模板/_project-template/.agents/`（skills / knowledge / rules；项目级从模板复制，可独立增删；工作台面板对应三个页签）
- **组件库**：`03-组件库/`（v1.7 母版 + 页面模板 + Design-components；**运行时禁止指向组件库目录，需对照重写/白名单拷贝，T15**）
- **铁律**：详见本文件「铁律速查」与 `10-智能体记忆/rules/`（T1–T19）

### 4. 常见问题

- **启动报「未找到 Node.js」**：安装 Node ≥ 18 后重试，或安装 WorkBuddy（自带 node）
- **端口被占用**（7788/53817/32124/8899）：`停止工作台.cmd` 一键清理后重启
- **知识库/工作规则面板为空**：确认从 GitHub 克隆的最新版（`.agents/knowledge|rules` 已入库）；旧 zip 需重新拉取
- **admin 项目首次启动慢**：首次会后台 `pnpm install`（日志：`07-日志/launch-01-项目<名称>.log`），完成后自动拉起 vite 并打开预览

## 前置条件（本机现状）

- Node.js ≥ 18（建议 x64）
- 网络能访问 npm
- 旧版 Axhub 工作台（历史版本）双轨运行中，只读参考、继续使用
