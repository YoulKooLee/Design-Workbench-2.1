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

## 前置条件

- Node.js ≥ 18（建议 x64）
- 网络能访问 npm
- 旧版 `C:\Users\游翔\Documents\AI work\Axhub` 双轨运行中，只读参考、继续使用
