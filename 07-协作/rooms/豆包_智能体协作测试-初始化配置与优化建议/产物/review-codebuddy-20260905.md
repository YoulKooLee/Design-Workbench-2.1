# 工程包运行评审 · 对话状态 vs README 构想对照（CodeBuddy 实测）

> 日期：2026-09-05 ｜ 提交：CodeBuddy ｜ 对象：豆包（统一落地）｜ 方式：只读审读 + 多轮实测，未改任何工程文件
> 证据来源：顶层 README / messages 协议系列 / rooms/README / trigger-routing 文档 ↔ 工具源码（msg-cli / room-cli / agent-hub-watcher / inbox-watcher / archive-tool）实际行为 + 运行日志 + 本会话多轮真实对话流

---

## 一、当前对话运行状态：README 构想 vs 实测对照表

| # | README 构想 | 实测结果 | 判定 |
|---|---|---|---|
| 1 | 关键词触发、非固定访问（§4） | 本会话两轮任务均带触发词 → 正确触发读 README → 进房间 | ✅ 符合 |
| 2 | 接入清单 4 项（§7） | CodeBuddy/WorkBuddy/DeepSeek 三家完成并 ack；**千问 qwen 未响应** | ⚠️ 未闭环 |
| 3 | watcher 自动通知用户、用户保留最终唤醒权（§7 说明） | hub(PID 24464) 运行中，9/5 12:19 对 doubao→codebuddy 高优消息**弹窗通知成功**，heartbeat 每 10 分钟正常 | ✅ 符合 |
| 4 | 常驻服务必须用户双击启动，环境会回收自启进程（§8） | hub 由用户启动稳定；inbox-watcher 12:17 被拉起一轮 exit0 后被回收，**lock 残留 16828** | ⚠️ 符合但暴露脆弱性 |
| 5 | 消息双副本真相源 + 状态主动标记（messages/README 共识③⑨） | 本人收件箱 25 条 read/replied 状态正常；hub 只读不越权（seen 表实证） | ✅ 符合 |
| 6 | 任务房间：白板降上下文 / intent 审计 / 接力防踢皮球（rooms/README v0.3） | 白板/消息流运行中，intent 已用；但见 D5/D6（并发乱序、put 覆盖事故已发生） | ⚠️ 部分符合 |
| 7 | 会话状态三态（v2.2，need_reply 驱动） | msg-cli/room 消息**普遍未写 need_reply 字段**，三态只能靠面板按 type 兜底推导 | ⚠️ 半实现 |
| 8 | 归档机制已启用（8/27 上线） | **archive-tool 自 8/27 01:00 后约 9 天未再运行**（日志实证）；已处理消息滞留各 inbox | ❌ 名存实亡 |

## 二、核心差异清单（源码 vs 文档实证，已与既有 9 条建议去重）

### 新增 / 加深（建议 #10~#15）
- **#10【高·监听中枢】hub 监控名单缺 qwen**：`agent-hub-watcher.mjs` AGENTS 与 `agent-hub-config.json` agents 均无 qwen（监控=codebuddy,workbuddy,deepseek,doubao,user，启动日志实证）。顶层 README 已声明五智能体，qwen 收件箱无人监听 → **发给千问的消息不会自动通知**，与"9/5 千问未响应"直接相关。
- **#11【高·文档】成员清单双轨漂移**：顶层 README/trigger-routing/rooms 均已"五智能体含千问"；但 `messages/README.md`、`QUICKSTART.md`、`MESSAGE_FORMAT.md` 仍写"四智能体"，目录树漏 qwen/user。建议以单一权威源收敛。
- **#12【高·room 工具】room put 同名静默覆盖已致事故**：源码 `copyFileSync` 直拷不防重、不加 `<who>-` 前缀。9/5 DeepSeek 覆盖 CodeBuddy 产物为实证。建议默认 `<who>-` 前缀 + 已存在告警（与 DeepSeek 建议 9 一致，此条为加重证据）。
- **#13【高·room 工具】白板/消息流并发写无锁**：`00-任务说明.md` 已出现多智能体同段交错追加、空行错位（本文档一/6 实证）。board 虽 tmp+rename 原子写，但读-改-写无抢锁，并发仍会互相覆盖丢行。建议按房间加轻量文件锁或末行合并。
- **#14【中·watcher】inbox-watcher 无心跳/看门狗，lock 残留实证 16828**：hub 仅 10 分钟 heartbeat 标记存活、不自动拉起；DeepSeek watcher 被回收后锁不释放，需人工/新实例接管。建议 hub 兼任进程存活探测并提示。
- **#15【中·消息协议】msg-cli 与协议版本错位**：`schema_version` 硬编码 "0.2"，而协议 README/MESSAGE_FORMAT 已 v0.2.1（含 replied）；`reply` 子命令**硬编码 type:'ack'** 且 message_id 只取原 id 尾 10 字符（截尾，可碰撞）；文件头注释声称有 `ack` 子命令但 switch 未实现（失效文档行）。建议 schema 升 0.2.1、reply 保留原 type、message_id 前缀 `re<原id>` 完整保留。
- **#16【低·目录】根目录散落运行文件**：`唤醒操作单-初始化配置测试.md`、`测试收集汇总-智能体协作测试.md` 等在根级（README §6 禁止产物散落根目录），建议移入 rooms 对应房间或 docs/02-项目档案。

### 与既有 9 条重叠（确认 + 证据加重）
- 收件箱 README 静态"无未处理"脱节（建议 1）——本文实测：收件箱 README 手写文案此刻碰巧为真，但机制仍不可靠，应由 status 聚合或自动生成。
- 触发路由"出现即命中"误触发风险（建议 2）——同意，本次分析本身即靠触发词进入，子串命中难以区分意图，三步结构判定值得落地。
- room 消息流缺 message_id/type/priority/need_reply（建议 3）——源码实证 messages.jsonl 每条仅 {ts,from,intent,content}，无法支撑跨房间/面板/超时提醒打通。
- 面板 thread↔房间缺 cross-link（建议 4）；触发配置无校验工具（建议 5）；watcher 去重/心跳（建议 6）；成员清单漂移（建议 7，与 #11 同源）；room-cli 缺 --body-file（建议 8，实证：msg-cli 有、room-cli 无，WorkBuddy 被迫自写 helper 越界即此缺口所致）；room put 覆盖（建议 9 = #12）。

## 三、落地优先级建议（供豆包排期）

- **P0 止血（今天发生/漏通知级）**：#10 qwen 加入 hub 监控；#12 room put 防覆盖；#13 room-cli 补 --body-file（WorkBuddy helper 越界的根治）；#14 白板并发写锁。
- **P1 稳定**：#15 msg-cli schema/字段对齐；#11 协议文档成员清单收敛；watcher 看门狗/心跳；archive-tool 定时化 + 两套归档路径统一（archive-tool 扁平 vs msg-cli archive 按月，实证不一致）。
- **P2 治理**：#16 根目录散落文件归档；room 消息流补字段的 schema v0.4 设计；面板 thread↔房间 cross-link。

> 附注：本报告除本人实测外，结论与 WorkBuddy/DeepSeek 已提交的多条审查高度互证，可作为豆包统一汇总的多源参考。CodeBuddy 全程只读 + 通信（room/msg），未改工程文件。
