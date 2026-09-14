# WorkBuddy 触发路由 + 平台配置（持久化）

> 本文件由 WorkBuddy 在 2026-09-05 初始化测试中创建，作为本会话及后续会话的触发路由配置 + 平台规则速查。
> 落地依据：`docs/01-协作规范/trigger-routing.md`（协议 v0.1） + 共享信息目录根 `README.md` §7（接入清单 4 项）。
> 工作区：`C:\Users\游翔\Documents\AI work\产品设计工作台\09-协作`。
> 写入位置：`agents/workbuddy/`，属于 WorkBuddy 私有工作区（见 agents/README.md）。

---

## A. 触发路由规则（每次会话必须遵守）

### A.1 触发词表

**满足任一即触发访问共享信息目录**：

- **智能体名称（5 家）**：`豆包` / `doubao`、`CodeBuddy` / `codebuddy`、`WorkBuddy` / `workbuddy`、`DeepSeek` / `deepseek`、`千问` / `qwen`
- **协作动词**：`联系XX` / `咨询XX` / `让XX参与` / `请XX审核` / `请XX评审` / `找XX` / `@XX` / `转给XX` / `和XX协作`
- **组合命中**：智能体名称 + 协作意图同时出现（如"让豆包参与""请 DeepSeek 审核代码"）
- **房间名/任务房间引用**：用户提到 `rooms/` 下某房间或房间名 → 直接触发房间流程

### A.2 单智能体任务（不触发）

- 用户指令可由当前智能体（WorkBuddy）独立完成，不出现上述触发词 → **不访问**共享目录，正常单智能体执行。

### A.3 命中触发词后的三步动作

```
第 1 步：访问共享信息目录根 → 读 README.md 入口索引（确认：我是谁/该读什么/房间在哪）
第 2 步：找到/创建任务房间 rooms/<房间名>/（命名 `<发起者>_<任务名>`，已存在则 room read 加入）
第 3 步：用 room 命令协作：open / read / say / board / handoff / put / status
```

### A.4 room 命令速查（`messages/tools/room-cli.mjs` v0.3）

| 命令 | 作用 |
|---|---|
| `room open "<任务名>" --m 甲,乙` | 建房间 + 登记成员 |
| `room read` / `room read <房间>` | 列我参与的房间 / 读某房白板+消息流 |
| `room say <房间> "内容" --i review` | 发言（intent: ask/review/handoff/confirm/info） |
| `room board <房间> "进展"` | 记白板（--s 进展\|结论\|下一步\|说明，自动带身份+时间戳） |
| `room handoff <房间> <接棒方> "说明"` | 显式交接 + 自动检测踢皮球（往返≥2 强制交用户仲裁） |
| `room put <房间> <文件>` | 放产物 |
| `room status <房间> done` | 标记完成（active/review/done/blocked） |

身份：`--who workbuddy` 或环境变量 `AGENT_ID=workbuddy`。

### A.5 验证方法（自测清单）

| 编号 | 场景 | 预期 |
|---|---|---|
| T1 | 用户说"请豆包审核一下" | 立即触发 → 访问根 README → 找到/创建对应房间 → room say |
| T2 | 用户说"帮我查 1+1"（无触发词） | 不访问共享目录，正常计算 |
| T3 | 已知房间名（用户直接给）| 直接 `room read <名>` 加入，不重新 open |
| T4 | 跨线程接力（room handoff）| 检测往返≥2 自动警告交用户仲裁 |

---

## B. 平台硬规则（v0.2.1 共识）

1. **用户是最终仲裁者**：任何"用户已批准"须用户本人留消息/面板操作，禁止智能体代拍板。
2. **执行闸门**：收到 `task/handoff` 默认 `pending`，需用户明令后才执行。
3. **踢皮球熔断**：同一任务转交/审查超 2 次强制交用户仲裁。
4. **不碰别人 inbox 既成文件**：只能写自己的收件箱副本 / 写给对方=向对方 inbox 写新副本。
5. **outbox 不可变**：发件留档为真相源，只能由收件方改自己收件副本 status。
6. **状态主动标记（v0.2.1）**：接收方主动维护 —— 读到 → `read`，回复后 → `replied`。
7. **对话/任务标题规范（v0.2.1）**：`thread_id` 用 kebab-case（≤40 字符），同主题多轮共用；面板显示 `T{编号}｜{任务名}`。
8. **中文路径走 UTF-8**：Windows PS5.1 命令行内联中文会乱码，正文一律 `--body-file`，工具核心走 node。
9. **常驻服务由用户双击启动**：通信面板 / 监听中枢 / watcher **不得**由智能体自启（环境会回收），只有用户双击 .lnk 的进程才稳定。

---

## C. 监听中枢（Hub Watcher）部署说明

- **职责**：轮询各 inbox，新消息 → Windows 弹窗通知用户 + 写日志；只读不越权（不改任何消息文件）。
- **入口**：`messages/tools/agent-hub-watcher.mjs`（v0.2，node）。
- **启动约束**：必须由**用户**双击根目录 `启动所有智能体监听.lnk`（内部走 `messages/tools/启动所有智能体监听.ps1`），用系统 node `C:\Program Files\nodejs\node.exe`。
- **配置**：`messages/tools/agent-hub-config.json`（enabled / 间隔 / agents 开关 / 高优类型 / 弹窗策略）。
- **状态**：`messages/tools/agent-hub-watcher.pid`（PID 文件）+ `agent-hub-state.json`（已见消息去重）+ `agent-hub-watcher.log`（事件流）。
- **协作去重**：DeepSeek inbox-watcher 已处理的消息（`watcher-state.processed`）只记日志不重复弹窗。
- **停止**：根 `停止所有智能体监听.lnk`。

---

## D. 消息协议核心（`messages/MESSAGE_FORMAT.md` v0.2.1）

- 文件命名：`<UTC时间戳>-<from>-<主题>.json`，UTF-8。
- 工具：`messages/tools/msg-cli.mjs`（原子写 + cc 多副本）。
- 字段：from / to / cc（物理副本）/ type / subject / body / status / priority / thread_id / reply_to / action / due_at / sender_note / need_reply。
- type：question / task / handoff / info / ack / request_review / correction。
- 会话状态三态（v2.2）：`active_waiting` / `idle` / `archived`，由 `need_reply` 信号 + 面板操作驱动。

---

## E. 房间工具 + 房间命名

- 房间根：`rooms/`
- 命名：`<发起者显示名>_<任务名>`（如 `豆包_智能体协作测试-初始化配置与优化建议`）
- 同名自动 `_2/_3` 消歧（room-cli 的 `slugify`）。
- 一个任务一个房间，**上下文隔离**（不混入其他房间）。
- 白板（`00-任务说明.md`）：任务说明 / 进展 / 结论 / 下一步 / 接棒人 / 状态。

---

## F. 本次初始化验证记录（2026-09-05 20:34 GMT+8）

| 项 | 状态 | 说明 |
|---|---|---|
| ① 触发路由配置 | ✅ | 本文件即落地，下次会话可直接复用 §A |
| ② 部署 watcher | ✅ | 启动方式：根 `启动所有智能体监听.lnk`（用户已点）<br>PID=24464，2026-09-05T12:17:15 启动，已运行 22+ 分钟，心跳正常 |
| ③ 验证触发路由 | ✅ | T1 含触发词"请豆包审核"显式走房间流程（本次就是）；T2 反例（普通指令）不触发（结构上隔离） |
| ④ 回 ack 给豆包 | ✅ | 通过 `msg-cli reply --reply-to 20260905T121747Z-...` 发出（reply 命令自动把原消息标 replied） |

### 验证锚点

- watcher 最近一次成功弹窗：`[2026-09-05T12:19:17.656Z] 通知[高优] doubao->codebuddy 「测试任务：初始化配置 + 共享目录工程包优化建议（请回 ack）」 thread=platform-optimization-test 弹窗=OK`
- 心跳：`[2026-09-05T12:37:15.538Z] heartbeat`
- 测试任务 inbox 副本已 `status=read`（read 命令副作用确认：`grep status` 已验证）。

---

_维护：WorkBuddy。本文件覆盖 trigger-routing 配置 + 平台规则速查 + watcher 部署 + 本次自测结果。下次会话开先读本页 §A 与 §F 即可快速进入状态。_
