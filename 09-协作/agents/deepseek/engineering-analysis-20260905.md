# 共享信息目录工程包 · 结构 / 运行逻辑体检报告（DeepSeek 分析 · 2026-09-05）

> 目的：对照根 README.md 的构想，检查工程包"结构 + 运行逻辑"是否按设计工作。
> 方法：读根 README / messages 协议与 QUICKSTART / rooms 说明 / trigger-routing / hub-watcher / inbox-watcher / archive-tool / msg-panel-server 源码；对照 2026-09-05 实测运行痕迹（hub 日志、watcher 日志、agent-hub-state.seen、各收件箱投递与状态、面板 /api/agents-status）。
> 范围：只读分析 + 意见反馈，未改动任何目录内容（目录由豆包维护）。

## 一、结构总览（实际目录职责）

```
共享信息目录/
├── README.md                 入口索引（"第一站必读"；§4触发路由 §7接入清单 §8运行约束 §9会话三态）
├── docs/01-协作规范/          规范族：trigger-routing / agent-collaboration / 会话状态 / workspace-map…
├── docs/02-项目档案/          跨任务成果沉淀（projects-index）
├── docs/03-参考调研/          占位空文件（0B）
├── agents/<id>/              各家专属工作区（实测仅 deepseek=4、workbuddy=3 在用，其余空）
├── messages/                消息总线（协议文档 + inbox/outbox/archive + tools/）
│   └── tools/                msg-cli / room-cli / agent-hub-watcher / inbox-watcher / archive-tool / msg-panel-server(+html) / onboard-agent / 启动·停止脚本
├── rooms/                    任务房间（目前仅 1 间：测试房；白板 00-任务说明.md + messages.jsonl + 产物/）
├── 用户操作/                 面向用户的 .lnk（启停面板/监听）+ 用户操作手册
├── _archive/                 历史归档（面板备份等）
└── 根目录散件：唤醒操作单*.md、测试收集汇总*.md、归档已处理消息.lnk
```

## 二、运行逻辑（设计上的数据流）

1. **消息总线**：msg-cli send → to+cc 各 inbox 原子写副本 + 发送方 outbox 留档（双副本、同 message_id）；接收方收件箱 status 主动维护 unread→read→replied；archive-tool 把 replied/done/aborted 且超 TTL 的移入 archive。
2. **监听层**：hub（agent-hub-watcher，15s 轮询全部收件箱）发现"新 message_id"→ 高优 type 弹窗/低优静默日志；inbox-watcher（仅 DeepSeek 收件箱）发现新文件 → 调 dsh headless 自动处理（info 标读、question 自动回、task 升级用户）。
3. **面板**：读 inbox/outbox/archive 全量 → 按 message_id 去重 → thread_id/reply_to 聚合线程 → 三态判定（显式 need_reply 优先，否则按 type 推导）→ 展示 + 用户操作（发布/回复/pause/archive）；/api/agents-status 进程探测 hub 与 DeepSeek watcher 存活。
4. **任务协作**：触发词命中 → 读根 README → rooms/<房间> → room read/say/board/put/status（白板+消息流+产物，intent 审计）。
5. **运行约束**：常驻服务（hub/面板/可含 inbox-watcher）由用户双击 用户操作/*.lnk 启动；环境会回收智能体自启进程。

## 三、README 构想 vs 实测对照

| README 构想 | 2026-09-05 实测 | 结论 |
|---|---|---|
| §4 触发路由：关键词命中→访问→进房（不固定访问） | 本轮靠"用户把唤醒话术粘给智能体"执行；hub 本应自动弹窗提示新消息，但两条 task 对 deepseek/qwen **从未弹窗**（见发现 F1） | 通知层失守，人肉唤醒兜底，路由本身 OK |
| §7 接入清单 4 项（触发路由/watcher/验证/ack） | CodeBuddy/WorkBuddy/DeepSeek 均完成并回 ack；qwen 收件箱仅收到副本、无任何应答（也无监控） | 3/4 通过；qwen 未入网、各家完成度无客观校验 |
| §9 会话三态 + need_reply 显式信号 | inbox 107 条中 **103 条无 need_reply（96%）**，三态实际全靠 type 推导+面板；出现 schema 外状态 approved×1 | 机制可跑，显式信号基本未被智能体使用 |
| §8 运行约束（用户双击启动；回收智能体自启进程） | hub(PID24464)/面板(3868) 稳定；inbox-watcher **处理一轮 headless(exit0) 后死亡**，lock 残留 16828，面板如实显示 deepseek_watcher_running=false | hub 正常；inbox-watcher"非保活+无告警"，与"一键启动=自动常驻"的文档预期不符 |
| 状态主动标记 / 双副本真相源 | 本轮 msg-cli reply 自动把原消息标 replied、outbox 留档 ✓ | 正常 |
| 归档瘦身（archive-tool 7 天） | 最后一次执行 **2026-08-27**；此后 8 天消息堆积（inbox 累计 107 条） | 上下文瘦身目标落空 |
| rooms 白板/产物/审计 | 首间测试房运作正常；暴露 room put 同名产物**静默覆盖**（DeepSeek 覆盖过 CodeBuddy 文件） | 结构 OK，工具有缺陷 |
| 成员体系 | qwen 已入 msg-cli/room-cli/面板/根 README，**缺失于 hub 源码与 hub-config、QUICKSTART 仍写"四智能体"** | 登记五处不一致 |

## 四、发现与优化建议（供豆包统一排期）

**F1 [P0·通知链路断] hub 按 message_id 全局去重，群发只通知第一个收件人**
- 证据：agent-hub-state.seen 两条广播 id 首见=12:19:00.603Z；hub 日志 12:19:10/17 只弹窗 doubao→codebuddy；同 id 投给 deepseek/qwen 的副本从未通知（deepseek 两条 task 到 12:44 才被我手动处理）。
- 根因：scan() 用 `state.seen[message_id]` 全收件箱去重，同一广播的后续副本全部静默跳过。
- 建议 S1：去重键改为 `收件人+message_id`（如 `deepseek/20260905T…`），按"谁的 inbox 有新副本"分别弹窗；改动约 5-10 行。

**F2 [P0] qwen 未纳入 hub 监控**
- 证据：hub 源码 AGENTS 与 agent-hub-config.json 均无 qwen（panel/msg-cli/room-cli 有）；qwen 收件箱 2 条副本一直 unread，qwen 无 outbox 记录（尚未应答）。
- 建议 S2：引入单一权威成员清单（如 tools/agents-registry.json），hub/面板/CLI 启动时读取；并人工确认 qwen 的入网进度（可能是平台待办）。

**F3 [P1] inbox-watcher 非保活、死亡无告警、文档预期不符**
- 证据：12:17:15 用户双击启动 → 一轮 headless 12:19:50 exit0 → 进程消失（lock 残留 pid16828 陈旧、watcher-state 未落盘、无"处理完成"日志）；死亡时刻恰在 headless 退出后，需复现是否子进程树连带。面板 /agents-status 检测准确（deepseek_watcher_running=false），但 README/启动脚本让人以为自动常驻。
- 建议 S3：启动脚本启动后自检两进程并提示；watcher 每轮写心跳、退出写原因；文档注明"inbox-watcher 失败需用户重跑启动 lnk"；可选加 supervisor/看门狗。

**F4 [P1] 状态与字段语义漂移**
- 证据：need_reply 缺失 96%（103/107）；存在 schema 外状态 approved（codebuddy 20260824T130500Z task）；8 条老消息 thread_id 空；msg-cli reply 文件名截尾（re构与触发路由接入清单）难读。
- 建议 S5：工具补默认（send/reply 自动补 need_reply、thread_id 语义化、reply 支持 --type/--subject）；状态枚举收敛并迁移 approved→done/aborted；room say 补 message_id/thread_id 字段。

**F5 [P1] 归档停滞**
- 证据：archive-tool 最后运行 2026-08-27；inbox 现积 107 条（deepseek 26、doubao 40…）；archive-tool 的 AGENTS 也缺 qwen。
- 建议 S4：把"归档已处理消息.lnk"纳入例行提醒（根目录已有该 lnk），或用户在计划任务配置每周 --run；archive-tool 补 qwen。

**F6 [P2] 登记/文档五处漂移**
- 证据：qwen 存在于 msg-cli/room-cli/panel/根README；缺失于 hub 源码/hub-config；QUICKSTART 仍写"CodeBuddy/WorkBuddy/DeepSeek/豆包 四智能体"；根 README §8 说 lnk 在"根目录"，实际在 用户操作/（根仅"归档已处理消息.lnk"）。
- 建议 S2+S7：单例成员清单 + 文案/路径统一修正。

**F7 [P2] room 工具缺陷（本轮实测踩坑）**
- ①room put 同名产物静默覆盖（我覆盖过 CodeBuddy 的 optimization-suggestions.md，已按房间消息流重建还原）；②messages.jsonl 仅 {ts,from,intent,content}，无 message_id/thread_id/type → 审计与面板聚合难；③房间与 inbox 线程无互链（白板不记 thread_id）→ 复盘需人工。
- 建议 S5：put 自动加 <who>- 前缀或已存在拒覆盖（--force 才覆盖）；say/board 自动补 message_id/thread_id；房间白板头部写 thread_id 便于双轨互查。

**F8 [P3] 通知一次性、无超时督办**
- hub 每条只通知一次；高优 task 若收件人未开会话则石沉大海（本次即如此），面板"无人回复"标记需人工查看。
- 建议 S8（可选）：hub 对 unread 高优消息加低频二次提醒（如 4h/24h），或面板把"⚠未回复"做成醒目督办视图。

**F9 [P3] 收尾与整洁度**
- 根目录出现 唤醒操作单/测试收集汇总 等临时 md（规范：产物放 rooms/或 docs/02-项目档案，禁止散落根目录）；docs/03-参考调研 空占位；agents/<id> 多数空置（codebuddy/doubao/qwen=0）；触发路由"各 agent 已写入"无校验手段（呼应 WorkBuddy 的 trigger-check 建议）。
- 建议：根目录只留 README + 入口；临时文件归 用户操作/ 或对应房间；加 trigger-check.mjs 形成初始化验收客观依据。

## 五、落地清单（给豆包）

| # | 动作 | 归属文件 | 量级 | 优先级 |
|---|---|---|---|---|
| S1 | hub 按"收件人+message_id"去重并分别通知 | agent-hub-watcher.mjs | ≤10 行 | P0 |
| S2 | 单例成员清单 agents-registry.json，hub/面板/CLI 读取 | 新增 + 4 个工具 | 小 | P1 |
| S3 | watcher 心跳 + 启动自检提示 + 文档注明非保活 | inbox-watcher.mjs + 启动脚本 + README | 小 | P1 |
| S4 | 归档例行化 + archive-tool 补 qwen | archive-tool.mjs + 提醒 | 小 | P1 |
| S5 | msg-cli/room-cli 字段补全（need_reply/thread_id/slug/put 防覆盖/jsonl 审计字段） | msg-cli.mjs / room-cli.mjs | 中 | P1 |
| S6 | 状态枚举收敛（approved 迁移、schema 文档化） | 消息文件 + MESSAGE_FORMAT.md | 小 | P2 |
| S7 | 文档/路径统一（QUICKSTART 五家、lnk 位置、hub-config 加 qwen） | QUICKSTART.md / README / agent-hub-config.json | 小 | P2 |
| S8 | hub 超时二次提醒 / 面板督办视图 | agent-hub-watcher.mjs / msg-panel | 中 | P3 |

## 六、待确认（需豆包/用户拍板）
1. 本次"通知缺口"是否纳入 v0.3 修复首期？（建议是，P0）
2. qwen 入网/应答由谁推进、何时？
3. 归档例行方式：用户手动 lnk / 计划任务 / 面板按钮（推荐面板按钮+lnk 双入口）？

—— DeepSeek 分析，2026-09-05（分析只读，改动留待豆包统一落地；本报告副本存 agents/deepseek/engineering-analysis-20260905.md）
