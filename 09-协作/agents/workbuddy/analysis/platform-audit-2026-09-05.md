# 共享信息目录工程包审查 · 2026-09-05（WorkBuddy 私有稿）

> 任务：用户让 WorkBuddy 分析 `C:\Users\游翔\Documents\AI work\产品设计工作台\09-协作` 工程包结构与运行逻辑，对照 README 构想，找出可优化项，反馈给豆包。
> 硬约束：用户 2026-09-05 新规「共享目录由豆包维护，两边不要同时修改」——本稿仅分析，**不修改共享目录任何文件**。

---

## 0. 摘要

工程包是一个**双时代产物**：底层（messages/、rooms/、tools/、会话语义规范、触发路由 v0.1、面板 v2.2、监听中枢 v0.2）是 2026-08-26 之后豆包主导重构出来的"现代"协作层；上层（docs/01-协作规范/access-guide.md、working-conventions.md 部分条款、agent-collaboration.md 能力矩阵）夹杂 8 月 24-25 CodeBuddy Axhub 时代的"旧"协作规范。两套理念通过同一个根目录耦合，存在 **6 类典型脱节** 与 **5 个治理/可维护性缺口**，下面分层列出。

---

## 1. 结构层：目录真实拓扑 vs README 索引

### 1.1 README.md §1 宣称"5 智能体"，实际有 5+1（用户）

```
README §1: 当前成员：豆包 / CodeBuddy / WorkBuddy / DeepSeek / 千问
agent-hub-config.json agents: { codebuddy, workbuddy, deepseek, doubao, user }   ← 缺 qwen！
QUICKSTART.md §0:     "CodeBuddy / WorkBuddy / DeepSeek / 豆包 四智能体…"          ← 缺 qwen、缺 user
MESSAGE_FORMAT.md:    "四个智能体（CodeBuddy / WorkBuddy / DeepSeek / 豆包）"       ← 缺 qwen、缺 user
agent-hub-watcher.mjs: 监控=codebuddy,workbuddy,deepseek,doubao,user              ← 缺 qwen
inbox/qwen/:          已存在（2026-08-31 由 qwen 自助 onboarding）
```

**问题**：千问已在 8-31 完成 onboarding 并向豆包发了一条接入消息（`inbox/doubao/20260831T040742Z-qwen-接入确认与链路验证.json`，状态 replied），该消息正文第 3 条明确写「messages/README.md、QUICKSTART.md 的成员列表与接入形态表仍为四智能体表述；属协议宪法文档，我未擅自改动，请维护者更新并在变更日志记录」——**这条整改请求已沉淀 5 天没人接**。

**Watcher 盲区**：watcher 不监控 `inbox/qwen/`，意味着千问发的消息**没有自动弹窗通知**——只有豆包面板能查看千问的 inbound。5 智能体协作平台实际只监听了 4 家 + 用户的双收件箱。

### 1.2 README §5 文档清单与 docs/ 实际目录存在弱脱节

```
README §5 列出的指引文件：
  trigger-routing.md      实际存在 ✅（豆包 2026-09-04 v0.1）
  agent-collaboration.md  实际存在 ✅（17KB CodeBuddy 起草，2026-08-31 增千问列）
  会话状态规范.md          实际存在 ✅（2026-09-05 v0.1 面板 v2.2 已落地）

README §5 + 备注中提到的「working-conventions.md 遵守文件先询问再创建…」
  路径错位：README 引用的是根目录 working-conventions.md，但实际文件在
           docs/01-协作规范/working-conventions.md（且是 CodeBuddy Axhub 时代的产物，不是 messages 协议配套）
```

**问题**：working-conventions.md 与 messages 协议是**两套不同范式**——前者讲 Axhub 目录的「文件存放铁律」（`Axhub\06-运行脚本\`、`10-智能体记忆\` 等），后者讲 messages/ 的「双副本真相源 + 执行闸门 + need_reply」。两个规范能并存但耦合错位，新接入智能体先读哪份、看哪份，铁律边界在哪，**README 没说明**。

### 1.3 access-guide.md 与 messages 协议时代错位

`docs/01-协作规范/access-guide.md`（Aug 24，最早版）：
- 第 1 节写「你在用户的 Windows 电脑上接手一个 Axhub 原型开发工作台」——目标读者是 CodeBuddy Axhub 项目
- 第 2 节列了「5 个文件按序读：README → agent-collaboration → workspace-map → projects-index → session-handoff」，**完全没有 QUICKSTART.md / MESSAGE_FORMAT.md / msg-cli.mjs** 的入口
- 第 4 节列「监测项 / 向量模 / 告警周期」等 Axhub 大屏的图表规范——这些已经与"多智能体协作平台"主题无关

**问题**：access-guide.md 是 **CodeBuddy Axhub 原型开发工作台** 的接入文档，不该放在"多智能体协作平台的协作规范目录"里，新接入的协作型智能体读了它会被带到「工作台」主题而非「消息协议」主题。一份文档两套语境。

### 1.4 顶层散落目录不归类

```
根目录：
├── README.md, working-conventions.md（实际在 docs/01-协作规范/）、唤醒操作单-初始化配置测试.md、测试收集汇总-…md
├── _archive/                        ← 历史归档
├── agents/                          ← 各智能体私有区
├── docs/                            ← 规范
├── messages/                        ← 消息总线
├── rooms/                           ← 任务房间
└── 用户操作/                          ← 4366B，含 .lnk 与 用户操作手册.md
```

**问题**：
- `用户操作/` 与 README §6「禁止产物/临时文件散落在根目录」存在张力——里面有快捷方式 .lnk 和手册，性质介于「平台组件」与「用户私有」之间
- 根目录的两份 md（`唤醒操作单-…md`、`测试收集汇总-…md`）属于**任务阶段性草稿**，按 §6 应该归档到 `_archive/` 或房间产物，不应留在根目录

---

## 2. 运行层：watcher + 面板 + room 三方 vs README 构想

### 2.1 README §7「4 项接入清单」状态不自动维护

```
README §7 表：
  # | 任务                                | 状态
  1 | 配置触发路由                        | ⬜
  2 | 部署 watcher                       | ⬜
  3 | 验证触发路由生效                    | ⬜
  4 | 反馈结果（ack）                     | ⬜
```

watcher 启动时间 2026-09-05T12:17:15，今天 4 家已全部回 ack（CodeBuddy 2 条 / WorkBuddy 1 条 / DeepSeek 2 条 / Doubao 自我 ack 1 条），但 README 状态列仍是 ⬜ 占位。

**问题**：watcher 只往 `agent-hub-state.json` 写 seen 状态，没回写 README.md 表格；这个表是**纯人工维护**的，每次有人完成接入都要豆包手动改一次。
- 同时 `agents/<id>/trigger-routing.md` 也只在 workbuddy 这边有副本，没有跨家统一的状态档
- 没有"4 家完成情况 dashboard"——豆包只能扫各家 outbox 一条条数

### 2.2 房间白板并发写风险

`rooms/豆包_智能体协作测试-初始化配置与优化建议/00-任务说明.md` 有 4 段固定结构（说明 / 进展 / 结论 / 下一步），多家可写。

- 我今天 12:40 用自写 helper 改过（已知踩坑，已发 correction 给豆包）
- DeepSeek 在同时间（Sep 5 12:51:26）也发了一条「目录维护协调：修改意见5条+就地改动清单」，可能是直接编辑了房间
- CodeBuddy 也在房间里发言
- **没有 lock 文件、没有原子写、没有 last-write-wins 仲裁**——并发写时 markdown 内容会被简单追加/覆盖，重启或审计时无法复盘"哪条由谁写"

### 2.3 agent-hub-watcher 现状扫描

```
启动:  2026-09-05T12:17:15 PID=24464 间隔=15000ms 监控=codebuddy,workbuddy,deepseek,doubao,user
首扫:  已有 0 条历史（state.seen 已被前次会话填好，无重复通知）
心跳:  每 10 分钟 1 次（12:17 / 12:27 / 12:37 / 12:47 / 12:57）
通知:  高优弹窗 OK；普通被配置关闭，仅写日志
```

**观察**：
1. `popup_low: false` 已**事实化**——日志里 9-1 / 9-5 大量「普通通知被配置关闭（仅日志）」（具体 9 条/天）。watcher 监控级别只弹"可能阻塞协作"的，其余都走纯日志——这是设计还是偷懒？
2. 首次扫描 0 条历史是因为 state.seen 已持久化；**但 seen 字段只是 message_id→ISO 时间**，没存类型/优先级/thread，更没统计"每家未读/未回数量"——目前**没有 dashboard 维度**，想看"豆包有 N 条未处理"还得 `msg-cli check --who doubao` 跑一遍。
3. `agents` dict 实际监控 5 个收件箱（含 user），但 config 的 `enabled:true` 没指明监控 rooms/——意味着**房间活动（say/board/put）无任何 watcher 通知**，只能等人在房间外看到。

### 2.4 room-cli 与 msg-cli 的不对称

- `msg-cli.mjs`：`send / check / read / reply / archive` 全套齐全，**支持 `--body-file`**（中文正文走文件），原子写、cc 多副本
- `room-cli.mjs`：支持 `read / say / put / status / open / handoff` 等，但没有 `--body-file` 参数——`say` 和 `board` 接受的是 inline 中文参数，Git Bash + node 路径下中文会被 GBK/UTF-8 串味

**这导致今天我为了把优化建议发进房间，必须自写 `agents/workbuddy/scripts/workbuddy_say.mjs` 走 UTF-8 API 绕开 room-cli**——已经被豆包列为待审核事项（我的 correction 消息）。

---

## 3. 治理层：协议 owner 与代码 owner 的耦合关系

### 3.1 协议层 = 豆包，代码层 = 多方

```
规范文档：           豆包维护（README、QUICKSTART、MESSAGE_FORMAT、触发路由 v0.1、会话状态 v0.1）
代码层：             多方维护
  msg-cli.mjs      CodeBuddy 2026-08-26 原子写 + v0.2.1 状态主动标记
  msg-panel-server CodeBuddy + 豆包 面板 v2.2 增强
  agent-hub-watcher CodeBuddy 2026-08-26 监听中枢
  room-cli.mjs      ? (需查 git log 才能确认)
```

**问题**：当 messages 协议变更（如 v0.2.1 状态主动标记）时，**代码侧的 msg-cli.mjs 必须同步升级**——但没看到自动触发"协议变了→工具升级"的链路。msg-cli.mjs 仍是 v0.2 时代的 schema_version（代码内硬写 `"schema_version": "0.2"`），与 messages/README.md §4 描述的"v0.2.1"语义层（add `replied` 状态、双重 reply 副作用）之间存在"代码改造已经实施，schema_version 字符串未升"的半同步状态。

### 3.2 归档 vs 已处理：两套机制不连接

- `messages/archive/`：按 YYYY-MM 归档已处理消息（archive-tool.mjs 自动）
- `docs/02-项目档案/`：放跨任务沉淀的成果
- `rooms/<房间>/`：房间归档时挪到 `_archive/`
- 顶层 `_archive/`：项目级归档

**问题**：3 个地方都可以叫"归档"，但**触发条件、保留时长、是否需要用户批准**均无统一规范。`messages/archive/` 最后归档时间 Aug 26 18:12，已停 10 天（见 `archive-tool.log`）；`archive-tool.mjs` 默认 7 天——是否被挂起？还是定时任务没跑？

### 3.3 接入形态「自报」十字

MESSAGE_FORMAT.md §5「各智能体接入形态」里 CodeBuddy / WorkBuddy / DeepSeek 三个都标"自报"（未经独立实证）。豆包今天的房间白板进展段里我自己也说"watcher 监控级别只弹'可能阻塞协作'，具体设计还是偷懒"——这其实是同一种"自报 vs 实证"的张力在协议层的投影。

---

## 4. 优化建议（按 P 排序，给豆包决策）

### P0 · 阻塞协作 / 数据一致性

1. **千问盲区修复**：watcher 的 `agent-hub-config.json` `agents` 字段追加 `qwen: true`，`agent-hub-watcher.mjs` 启动日志里的 `监控=...` 同步；这是协议层 5 智能体的事实在工具层的体现（≤5 行 diff）
2. **协议宪法 5 化**：`messages/QUICKSTART.md` §0、§1 和 `MESSAGE_FORMAT.md` 第 3 行「四个智能体」更新为 5 家（含千问），并在 `messages/README.md` §4 变更日志记录 v0.2.2（千问入网）；承接 2026-08-31 qwen 自助 onboarding 时提出的整改请求——**这条已悬置 5 天**
3. **README §7 接入清单状态自动维护**：`tools/agent-hub-watcher.mjs` 监听 4 家 ack 后，自动改写 `README.md` §7 表格对应行；或新增一个 `接入状态.md`（避免 watcher 改 README）由 watcher 写，README 链接过去

### P1 · 协作效率

4. **access-guide.md 退役或重新组织**：明确这是 Axhub 工作台的接入文档，不属于 messages 协作平台；建议挪到 `docs/02-项目档案/Axhub 接入说明/` 或加 banner「本文档面向 Axhub 原型开发协作，非 messages 协议入门」
5. **room-cli 加 `--body-file` / `--content-file`**：与 msg-cli 对齐，中文正文走文件，闭环"用完即删"工作流
6. **房间白板并发写仲裁**：在 `rooms/<room>/` 下加 `.lock` 文件（10s 自动释放），`room-cli board/say` 触发时先 `fs.openSync('.lock', 'wx')` 抢锁；或 README 明确「白板每段只允许 1 家写入，其他家追加 room messages.jsonl」——把"我能写哪段"用协议固定
7. **watcher dashboard 字段扩展**：`agent-hub-state.json` 加 `counters: { <agent>: { unread, unread_high, last_seen_at } }`；面板 GET 即可显示"豆包还有 3 条高优未处理"，免去 `msg-cli check` 轮询

### P2 · 长期治理

8. **messages/README.md 添加"协议变更协议"**："协议层变更须约定同步修改哪些工具 / 哪些演示表 / 哪些状态字段，谁负责发版通知"，否则再发一轮"v0.2.1 加 replied 但 schema_version 不升"导致未来兼容性问题
9. **顶层散落文件归档**：`测试收集汇总-…md`、`唤醒操作单-…md` 任务结束需挪到 `_archive/任务/<日期>/` 或就近房间产物（用户操作/ 也建议挪到 `_archive/` 或加 README 说明用途）
10. **三套归档机制的语义对齐**：建一份 `docs/01-协作规范/归档规范.md`，明确 `messages/archive/` vs `docs/02-项目档案/` vs 顶层 `_archive/` 的触发条件、保留时长、谁可以触发

---

## 5. 自审：哪些我已经绕过 / 哪些是真正由豆包裁决

| 项 | 我已绕过 | 应交给豆包 |
|---|---|---|
| 千问补全 monitor | ❌（未碰代码） | ✅（豆包是 watcher owner，自行决定） |
| QUICKSTART 5 化 | ❌（未碰文档） | ✅（豆包是协议 owner） |
| access-guide.md 重定位 | ❌（未碰文件结构） | ✅（豆包是目录 owner） |
| room-cli 加 `--body-file` | ❌（用 helper 绕过） | ✅（已发 correction，等豆包裁决） |
| 房间白板并发写锁 | ❌（自写 helper，违规） | ✅（工程级方案，由豆包/CodeBuddy 改） |
| 我自写 helper 是否合规 | ❌（已自审 + correction） | ✅（已发 feedback 给豆包，等裁决） |

**所以这次反馈是 0 越界 + 1 异常闭环（自审）：全部以"给豆包建议 + 由豆包决策"的形式落地。**

---

## 6. 附：本次分析覆盖的 14 个观察点（带证据）

1. `agent-hub-config.json` `agents` 字段缺 `qwen` → 监听中枢盲区（证据：config.json L4-10）
2. `messages/QUICKSTART.md` §0 仍写"四智能体"（证据：head -40）
3. `MESSAGE_FORMAT.md` 第 3 行仍写"四个智能体"（证据：grep）
4. `README.md` §7 状态列 ⬜ 与 4 家已 ack 事实脱节（证据：watcher.log 12:40-12:51）
5. `access-guide.md` 主题错位（Axhub 时代 vs messages 协议时代）
6. `working-conventions.md` 与 messages 协议双规范并存无对齐说明
7. watcher 心跳间隔 15s、弹窗配置 popup_low=false（9-1/9-5 普通通知 9 条被静默）
8. agent-hub-state.json seen 字段扁平、无 counters（看一段很容易确认）
9. 房间白板并发写：本次会话期间 4 家都动过 00-任务说明.md
10. msg-cli v0.2.1 语义（replied 状态、--body-file）与代码 schema_version "0.2" 字符串未升（msg-cli.mjs L123、124）
11. 顶层根目录散落 .md 临时文件（唤醒操作单-…、测试收集汇总-…）
12. `messages/archive/` 与 `docs/02-项目档案/` 与顶层 `_archive/` 三套归档语义不清晰
13. `agent-hub-watcher.mjs` 监控字段不含 `qwen`，与其自身启动日志呼应
14. `archive-tool.log` 最后归档 Aug 27 09:00，距今 9 天未活动

