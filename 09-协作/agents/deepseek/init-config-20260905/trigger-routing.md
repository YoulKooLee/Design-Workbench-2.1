# DeepSeek 触发路由配置（初始化配置 · 项①）

> 依据：`docs/01-协作规范/trigger-routing.md` v0.1（模板 §3）
> 写入时间：2026-09-05（由豆包《测试任务：初始化配置 + 工程包优化建议》唤醒处理时配置）
> 用途：本文件是共享信息目录内的配置留档副本；同内容已写入 DeepSeek 长期记忆（跨会话可查），供每次会话遵守。

## 【触发路由规则 - 必须遵守】

- 当我收到用户指令或处理任务时，识别是否出现触发词：
  - 智能体名称：豆包 / CodeBuddy / WorkBuddy / DeepSeek / 千问（及对应 ID：doubao / codebuddy / workbuddy / deepseek / qwen）
  - 协作动词：联系 / 咨询 / 让…参与 / 请…审核 / 请…评审 / 找 / @ / 转给 / 和…协作
  - 组合命中：同时出现「智能体名称」+「协作意图」也算命中（如"请 DeepSeek 审核代码"）
- 若命中触发词 → 立即暂停当前文本回复，执行三步：
  1. 访问共享信息目录 `C:\Users\游翔\Documents\AI work\产品设计工作台\09-协作`
  2. 读根 README.md 入口索引 → 定位任务房间 `rooms/<房间名>/`
  3. 用 room 命令协作：`node messages/tools/room-cli.mjs open|read|say|put|status`（身份 `--who deepseek`）
- 若未命中触发词 → 正常单智能体执行，不访问共享目录（避免每次访问）。
- 完成后：若涉及跨智能体协作，在房间内留一句结论/进展；需要时向发起协作方回 ack 留痕。

## 相关路径速查

- 共享目录根：C:\Users\游翔\Documents\AI work\产品设计工作台\09-协作
- 我的收件箱：messages/inbox/deepseek/（收 = 查 inbox；发 = msg-cli send/reply，outbox 留档）
- 任务房间：rooms/<发起者>_<任务名>/（白板 00-任务说明.md + messages.jsonl + 产物/）
- 工具：messages/tools/msg-cli.mjs（消息）、messages/tools/room-cli.mjs（房间）、messages/tools/agent-hub-watcher.mjs（通知监听，用户双击启动）

## 验证记录（项③，2026-09-05）

- 触发样例：本会话唤醒话术含「豆包 / 智能体协作测试 / room 命令」等触发词 → 已触发访问共享目录、读根 README、定位并进入房间（room read 可用）→ 命中正确。
- 非触发样例（关键词扫描 0 命中，不访问共享目录）：
  - "帮我计算 25×4" → 无触发词
  - "整理一下今天的待办" → 无触发词
- 房间命令实测：room read / board / say / put 均可用（记录见房间 豆包_智能体协作测试-初始化配置与优化建议）。
