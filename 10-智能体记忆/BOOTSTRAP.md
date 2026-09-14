# 产品设计工作台 v2 · 开工自举入口（BOOTSTRAP）

> **任何智能体（豆包 / CodeBuddy / WorkBuddy / DeepSeek / 千问）新会话开工第一站。**
> 读本文件 → 按索引定位 → 再动手。目标：5 分钟内自举，不靠对话历史。

## 我是谁

- 本目录 = **产品设计工作台 v2**（工作台面板沿用旧版 axhub-manager 体系，目录已更名「工作台面板」；+ v1.7 组件库并入 + 共享通信平台整体迁入）。
- 维护方：**豆包**（目录结构 / 共享组件库 / 工作台记忆主干 / 09-协作）。
- 其他智能体为使用方，按规范在 `10-智能体记忆/agents/<自己>/` 分区维护，只提建议不直接改共享目录。

## 工作台在哪

| 项 | 位置 |
|---|---|
| 根目录 | `C:\Users\游翔\Documents\AI work\产品设计工作台` |
| 面板 | `工作台面板/`（旧版体系：server.mjs + public/index.html，端口 7788，AI 联动徽标含 5 智能体） |
| 项目 | `01-项目/`（试点：指标管理平台） |
| 模板 | `02-模板/_project-template/` |
| 组件库 | `03-组件库/`（v1.7 frame + ui-libs，catalog + registry 登记） |
| 通信 | `09-协作/`（共享信息目录整体迁入：消息总线 / 房间 / watcher / 交接包） |
| 配置真源 | `workbench.config.json`（端口 / 路径 / 池，一切以它为准） |
| 记忆主干 | `10-智能体记忆/`（本目录） |
| 旧版（只读参考） | `C:\Users\游翔\Documents\AI work\Axhub`（继续使用中，勿改） |

## 开工先读什么（按场景）

| 场景 | 先读 |
|---|---|
| 任何新会话 | 本文件 → `10-智能体记忆/README.md` → `10-智能体记忆/router.md` |
| 面板 / 项目管理 | `工作台面板/`（http://127.0.0.1:7788，启动工作台.cmd / 停止工作台.cmd） |
| 启动项目 | `10-智能体记忆/001-启动与状态机.md` → `06-运行脚本/env-doctor.ps1` → `launch-project.ps1` |
| 写脚本 / 编码 | `10-智能体记忆/002-脚本与编码纪律.md` → `rules/script-encoding.md` |
| 改工作台代码 | `10-智能体记忆/004-工作台架构与联动坑.md`（必读，都是血泪） |
| 做原型页面 | `10-智能体记忆/003-布局与前端实现.md` → `skills/axhub-layout.md` → 组件库 `03-组件库/frame/README.md` |
| 组件选型 / 调用 | `03-组件库/component-registry.json` → `03-组件库/frame/admin/_meta/pages.catalog.json` → `03-组件库/ui-libs/<库>/` |
| 智能体协作 / 交接 | `09-协作/docs/01-协作规范/session-handoff.md` → 项目 `handoff.md`（双写） |
| 查排错 | `08-文档/工作台架构与排错手册.md` → `10-智能体记忆/004` |

## 触发路由（router 摘要）

> 完整表见 `router.md` / `router.json`。命中即按路由访问对应资产。

| 触发词 | 路由 |
|---|---|
| 启动 / 起栈 / 起服务 / 端口 | 06-运行脚本 env-doctor → launch-project |
| 组件 / 样板 / 母版 / UI 库 | 03-组件库 registry → catalog → ui-libs |
| 通信 / 消息 / 房间 / 交接 / 指派 | 09-协作（消息总线 / rooms / session-handoff） |
| 记忆 / 踩坑 / 规则 / 技能 | 10-智能体记忆（000~004 / rules / skills） |
| 项目 / 原型 / 预览 | 01-项目 → launch-project（预览链接 `http://localhost:<vite>/prototypes/...`） |

## 铁律（T1–T19 摘要，全量见综合稿 §附）

- T5 PowerShell 读 JSON 一律 `-Encoding UTF8`；T6 外环境注入（NODE_OPTIONS 等）必须显式清洗；T9 永不删锁文件；T10 命令行禁止内联中文路径。
- T12 共享目录协议不复制、不双写；通信写操作必须用户确认。
- T13 交接包生成必须过 6 项自检；接手必须先读 handoff.md 再动手。
- T14 组件库 JSON 必须合法且引用完整；smoke-test 不过不得发布。
- T15 组件调用只允许对照重写或白名单拷贝；运行时禁止 href/src 指向 03-组件库/。
- T16 新增组件必须走标准流程并登记 registry。
- T17 迁移后以 09-协作/ 为唯一真源，junction 过渡期内不改双份。
- T18 技能一律以 `更新资料\vibepm-dev-agent-v1.7` 为权威真源，工作台只放路由/入口。
- T19 标注统一理念、两种载体：原型期附注 / 交付期 v1.7 annotation。

## 快速体检

```powershell
cd "C:\Users\游翔\Documents\AI work\产品设计工作台"
powershell -File 06-运行脚本/env-doctor.ps1   # 环境体检
node 06-运行脚本/smoke-test.mjs               # 冒烟自测
# 面板：双击 启动工作台.cmd（http://127.0.0.1:7788）；停止：双击 停止工作台.cmd
```
