# CodeGraph 备忘（已留档，暂不引入，实测优先级高于 graphify）

> qwen ｜ 2026-11-06 ｜ 归档：`codegraph-1.6.2\`（npm 官方 registry 下载）
> 上游：GitHub colbymchenry/codegraph（76.8k★）｜ **MIT** ｜ 文档站 colbymchenry.github.io/codegraph
> 本机网络 GitHub 直连不可达（clone 断流两次实证），故留档走 npm；已用 jsDelivr 镜像补拉 TELEMETRY.md / install.ps1 / BUNDLING.md / CLAUDE.md / 残留上下文实测报告到 `codegraph-1.6.2\github-docs(镜像补拉)\`

## 留档内容如实说明（重要）

- npm 包 1.2 MB = **编译后 dist + 完整 .d.ts 类型 + 平台原生包声明**，非 GitHub 源码树（src/、tests/、docs/ 大部不在包内；`optionalDependencies` 按平台分发 `codegraph-win32-arm64` 等预编译二进制）
- 要看 Rust 内核源码与完整文档：需换网络克隆 GitHub，或从 Releases 拉对应平台 bundle
- 版本 1.6.2（latest，2026-11 当前）

## 是什么（对比 graphify 后更新的一句话）

Rust 内核 + SQLite/FTS5 的预索引代码图谱，以 **MCP server** 形态接入 18+ 智能体（名单含 **Qwen Code、DeepSeek Harness**——比 graphify 多覆盖了你的 deepseek 线；仍无 WorkBuddy/豆包）。主打一个 `codegraph_explore` 工具一次调用返回源码+调用路径+爆炸半径，**文件监听自动增量同步**（2s debounce + 连接时对账 + 过期横幅），治"图变旧"治在默认值里。

## 与 graphifyy 对比（结论：对现状 CodeGraph 更配）

| 维度 | CodeGraph | graphifyy |
|---|---|---|
| 免运行环境 | ✓ 自带 bundle（win-arm64 官方构建，本机 ARM 对口） | 需 Python+uv（实测可用） |
| 供应链 | npm trusted-publishing OIDC + SLSA L2 证明 | PyPI 双 y 防仿冒 |
| **⚠️ install.ps1 速审（本人工读原文）** | GitHub Releases 拉 zip **无 Get-FileHash/SHA256SUMS 自动校验**（README 承诺的 attestation 需手动 `gh attestation verify`；irm|iex 仅是注释示例非强推）→ **若引入，走 npm 安装路径，不走 PS 脚本** | 未审（uvx 隔离执行，风险面小） |
| 字符串/路由契约 | **框架感知路由 17 种**：React/Vue Router 的 path、push、<Link to> 建 route 节点 + navigates 边 | 字符串不建节点（实测 exit 4） |
| Vue | Full（Nuxt 覆盖 93.5%） | 非强项 |
| 图谱之外内容 | 只管代码 | 文档/PDF/图片/视频/SQL（独有） |
| 遥测 | **默认开**、装时询问、可 `codegraph telemetry off`；字段清单见留档 TELEMETRY.md（聚合日总量、无代码/路径/查询/IP，文件数只报粗桶） | 零遥测（但查询日志落 ~/.cache） |
| 上下文诚实度 | README 自曝：省处理 token（62%）**但残留上下文 +80%**（实测报告已镜像留档） | 只讲省 |
| 接入方式 | MCP + 自动往 CLAUDE.md/AGENTS.md/QWEN.md 写指令段 | skill + hook（codebuddy 支持） |

跑分数字（44% 省钱 / 88% 少调用等）均 ⚠️ 厂商自测，同 harness 复测过污染行，但未经第三方。

## 为什么仍暂不引入（与 graphify 同判据，优先级更高）

1. 自定义 MENUS/hash 路由**私有约定**能否被它的 React Router/Vue Router 解析器吃到——纸面无法确认，**必须实测**（上次 graphify 教训）。
2. 注入通道问题它解决一半：Qwen Code/deepseek 官方覆盖，WorkBuddy/豆包仍在名单外。
3. 引入需先做三件事：`telemetry off`、走 npm 装（绕开 PS 无校验路径）、用两个真题回放验证。

## 引入前的实测剧本（下次做）

```
npm i -g @colbymchenry/codegraph      # 装完 npm audit signatures 验 provenance
codegraph telemetry off
cd "…\01-项目\指标管理平台" ; codegraph init
codegraph impact "PageView"            # 题1：跨页爆炸半径 vs 当初人工 12 处清单
codegraph explore "topic-library"      # 题2：自定义路由字符串能否入图（对照 graphify exit 4）
codegraph query "MENUS"                # 题3：私有契约检索质量
```
三题全中 → 引入价值成立，接 Qwen Code/deepseek 线；route 题不中 → 和 graphify 同病，归档即可。

## 对 graphify 备忘的影响

graphify 归档保留作对照，但**下次实测对象换成 CodeGraph**（更配：免 Python、原生 win-arm64、MCP 自动接线、路由感知打的就是你"删页面漏引用"的痛点方向）。
