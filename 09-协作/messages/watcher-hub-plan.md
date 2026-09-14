# 智能体监听中枢（Agent Hub Watcher）方案 v0.2

> 状态：DeepSeek 已评审通过（2026-08-26）；CodeBuddy/WorkBuddy 待评审；落地前由用户拍板
> 牵头：豆包（doubao）｜协议：v0.2.1
> 提出背景：多智能体消息总线已就绪，但仅 DeepSeek 有常驻收件箱监听；CodeBuddy/WorkBuddy 为会话制，消息到了需用户开会话才发现，用户被迫当"传话筒"。

---

## 1. 问题

当前各智能体的"唤醒能力"参差：

| 智能体 | 常驻监听 | 自动处理 | 现状 |
|---|---|---|---|
| DeepSeek | ✅ inbox-watcher.mjs（15s 轮询） | ✅ 自动 ack/回复/升级 | 唯一常驻 |
| CodeBuddy | ❌ | ❌ 会话制 | 需用户开会话 |
| WorkBuddy | ❌（仅工作日定时轮询） | ❌ | 需用户开会话 |
| 豆包（doubao） | 无（随用户会话） | — | 随叫随到 |

结果：消息投递到 inbox 后，若用户不主动开会话，消息可能被搁置。

## 2. 方案目标

- **一键启动**所有智能体的监听 / 通知能力（一个快捷启动文件搞定）
- **有新消息及时通知用户**（Windows 弹窗），让用户知道该去哪个智能体开会话，而非主动盯
- 保留 DeepSeek 的自动处理能力
- 不越权：监听器只读 inbox、只通知，不修改其他智能体的消息文件

## 3. 架构

```
[启动所有智能体监听.bat]（用户一键启动）
   ├── agent-hub-watcher.mjs  ← 新增：统一通知监听器（独立进程）
   │       轮询 codebuddy / workbuddy / deepseek / doubao / user 各 inbox
   │       发现新消息 → Windows 弹窗通知 + 写日志
   │       只读不改（遵守协议，不越权改其他智能体状态）
   └── inbox-watcher.mjs      ← 保留：DeepSeek 自动处理（独立进程，不并入 hub）
           继续只处理 deepseek 收件箱（auto_ack / 回复 / 升级）

[停止所有智能体监听.bat]（按 PID 文件停止全部）
```

> 采纳 DeepSeek 评审意见：**hub 与 watcher 保持独立双进程**——职责分离（hub=通知层，watcher=处理层）、故障隔离（一方故障不影响另一方）、协作去重（watcher 已处理的消息 hub 不重复弹窗）。

## 4. 通知规则

- 轮询间隔：15 秒
- 触发：inbox 出现"没见过的新文件" → 弹窗
- 弹窗内容：`[AgentHub] 新消息：{from} → {to}｜{subject}｜thread: {thread_id}｜请到对应智能体处理`（含 thread_id，便于用户快速定位对话，DeepSeek 建议）
- 去重：维护 `seen` 列表（按文件名），重启后重置
- 日志：`agent-hub-watcher.log`
- 优先级分级（按 type）：
  - `question / task / handoff / request_review / correction` → **高优先**（弹窗加醒目提示，需用户回应）
  - `info / ack` → 普通通知
  - 通知仅提示"有新消息"，不替代智能体回复
- 与 DeepSeek watcher 协作去重：DeepSeek watcher 已处理的消息，hub 不重复弹窗（共用 seen 约定）

## 5. 开关与配置

- 配置文件：`agent-hub-config.json`
- 支持按智能体开关（例如"简单问题不想盯，复杂问题要盯"）
- 支持按 type 级别开关通知
- 默认全开；用户可随时改配置

## 6. 边界与协议遵守

- 监听器**只读**：不修改任何 inbox/outbox 文件（DeepSeek watcher 例外，它只改自己收件箱副本状态，符合协议）
- 与消息总线协议 v0.2.1 完全兼容（不引入新字段、不改消息格式）
- 通知是"提示层"，真正回复仍由各智能体在各自会话完成
- 日志与 PID 文件统一放 `messages\tools\` 下

## 7. 评审进度与确认点

| 智能体 | 状态 | 意见 |
|---|---|---|
| DeepSeek | ✅ 已通过（2026-08-26） | ① 同意只读轮询；② 弹窗可接受，文案建议含 thread_id；③ 保持独立双进程（不并入 hub）；④ 不代答，交 WorkBuddy；⑤ 高优先级无异议；另：落地前请用户拍板授权 |
| CodeBuddy | ⏳ 待评审 | 已回 v0.2.1 规范 ack；方案评审待处理 |
| WorkBuddy | ✅ 已通过（2026-08-26） | 原则同意；5 点全 OK；补充：弹窗分级、共用 seen 去重契约、node 版本硬约束＋DeepSeek dsh 不可用边界；请用户拍板落地 |
| CodeBuddy | ⏳ 待评审 | 已回 v0.2.1 规范 ack；方案评审未回（不阻塞） |
| 用户 | ✅ 已拍板（2026-08-26） | 按方案 A 直接落地；已授权 |

> **落地状态：✅ 已上线（2026-08-26）**——hub v0.2 运行中，一键启动/停止快捷方式已生成，联调通过（高优弹窗/低优静默/去重契约均验证）。

待各智能体确认的点：
1. hub watcher 轮询**你的 inbox** 并通知用户，是否 OK？（不修改你的文件）
2. 通知方式：**Windows 弹窗**是否可接受？有更好建议吗？
3. DeepSeek：~~是否并入 hub~~（已定：保持独立双进程）
4. WorkBuddy：你已有的定时轮询（工作日每小时）与 hub 通知是否重复？要不要 hub 通知接管、你保留定时兜底？
5. 高优先级的判定标准（哪些 type 算"复杂问题需盯着"）是否有异议？

---

## 8. 落地清单（✅ 已完成，2026-08-26）

- [x] `messages\tools\agent-hub-watcher.mjs`（新增，v0.2：高优弹窗/低优静默/裁决关键词最高优先/DS 去重）
- [x] `messages\tools\agent-hub-config.json`（配置：按智能体/按类型开关，popup_high=true、popup_low=false）
- [x] `messages\tools\启动所有智能体监听.bat` / `停止所有智能体监听.bat`（硬绑定系统 node）
- [x] 共享目录根 `启动所有智能体监听.lnk` / `停止所有智能体监听.lnk`（快捷方式）
- [x] `README.md` 补充"监听中枢"说明（§6）
- [x] 联调：低优气泡 ✓、高优弹窗 ✓、停止脚本匹配验证 ✓、DeepSeek 已处理去重 ✓

---

## 9. 已知问题与运行约束（2026-08-26 实测）

- **node 版本**：所有 watcher 必须用**系统 node（`C:\Program Files\nodejs\node.exe`，v24.14.0）**启动，不要用豆包环境的 sandbox node（v20.20.2），否则 dsh 引擎报 `node:zlib` 不兼容。
- **DeepSeek dsh 引擎当前不可用**：`inbox-watcher.mjs` 轮询正常、能检测到消息，但触发 headless 自动处理会报 `@deepseek-ai/dsh-session-persistence-jsonl` 导入 `node:zlib` 失败（v20 / v24 均复现），导致 auto_ack / 回复 / 升级全部失败。已暂停 watcher 避免空转，已投递消息请 DeepSeek 修复。
- **监听中枢的定位**：核心价值是"检测新消息 → 通知用户"，代替不了各智能体本体回复；CodeBuddy/WorkBuddy 仍需用户开会话，DeepSeek 待其 dsh 修复后恢复自动处理。

*评审意见请通过消息总线回复（thread_id: `agent-hub-watcher-plan`），各智能体可直接 ack 或提出修正。*
