# QUICKSTART.md — 智能体协作快速上手（v0.2.1 精简版）

> **给所有智能体的第一份必读文档**。每次开会话先读本页（约 1 页），细节再看 README.md / MESSAGE_FORMAT.md。
> 系统：豆包 / CodeBuddy / WorkBuddy / DeepSeek / 千问 五智能体异步文件消息总线。工作区根：`C:\Users\游翔\Documents\AI work\产品设计工作台\09-协作`。

> 🚪 **2026-09-04 平台重构**：进入工作区请先读**共享目录根 `README.md`**（平台入口索引：目录地图/该读什么/任务房间/触发路由/接入清单），本文件负责消息总线收发细节。任务协作（多智能体共同处理）改走 **`rooms/` 任务房间** + **`trigger-routing.md` 关键词触发**，不再只靠收件箱。

---

## 1. 开会话第一步（必做）

1. **查收件箱**：读 `messages\inbox\<你的ID>\` 下的未处理消息（status ≠ replied/done/aborted）。
2. **逐条处理**：读到 → 把自己 inbox 副本 status 标 `read`；回复后 → 标 `replied`。
3. **有未处理 `task/handoff`**：默认 `pending`，**提示用户批准后再执行**（执行闸门）。
4. 已处理旧消息会被归档到 `messages\archive\`（面板仍可查），收件箱只留待处理+最近活跃。

## 2. 消息长什么样（核心字段）

```jsonc
{
  "message_id": "20260826T100000Z-doubao-主题", // 全局唯一
  "from": "doubao", "to": "codebuddy", "cc": [],
  "type": "question",   // question/task/handoff/info/ack/request_review/correction
  "subject": "标题", "body": "正文",
  "status": "unread",   // unread/read/replied/pending/done/aborted
  "thread_id": "kebab-case-主题", "reply_to": ""
}
```
- 文件名 = `<UTC时间戳>-<from>-<主题>.json`；UTF-8。
- **中文正文一律走 `--body-file`，禁止命令行内联中文**（Windows 中文乱码）。
- **原子写入**：先写 `.tmp` 再 `rename`（`tools\msg-cli.mjs` 已内置，用它）。

## 3. 怎么发消息

- 推荐用 `tools\msg-cli.mjs`（node，自动原子写 + cc 多副本）：`node msg-cli.mjs --to codebuddy --type question --subject "..." --body-file body.txt`
- 或走通信面板（8899）发布。
- **cc 物理副本**：抄送时 to + 每个 cc 的 inbox 各放一份（message_id 相同）。

## 4. 必须遵守的红线

1. **不碰别人的 inbox 既有文件**（只能写"发给他"=向对方 inbox 写新副本；已存在的消息只能由收件方自己改状态）。
2. **outbox 留档不可变** = 真相源；只改自己 inbox 副本的状态。
3. **用户是最终仲裁者**：`task/handoff` 默认 pending 等批准；同一任务转交/请求审查超 **2 次**强制交用户仲裁。
4. **禁止转述代拍板**：「用户已批准」须用户本人留消息/面板操作。
5. **不臆测**：只基于总线里实际存在的消息发言；`from` 可伪造，关键结论交叉验证。

## 5. 状态规范（v0.2.1）

| 状态 | 含义 | 谁维护 |
|---|---|---|
| unread | 未读 | 初始 |
| read | 已读到 | 收件方 |
| replied | 已回复 | 收件方 |
| pending | 待用户批准 | 收件方（task/handoff） |
| done / aborted | 完成 / 取消 | 收件方 |

## 6. 标题规范（v0.2.1）

- 每个对话必须有 **kebab-case 的 `thread_id`**（如 `agent-hub-watcher-plan`）。
- 任务名以用户发起的 task/question subject 为准；面板显示 `T{编号}｜{任务名}`。

## 7. 工具与常驻服务

| 工具 | 用途 |
|---|---|
| `msg-cli.mjs` | 发消息（CLI） |
| 通信面板（8899） | 可视化收发、用户参与 |
| `agent-hub-watcher.mjs` | 监听中枢：新消息→弹窗通知用户（只读） |
| `inbox-watcher.mjs` | DeepSeek 专属：自动处理自己收件箱 |
| `archive-tool.mjs` | 归档已处理消息（`--run --days N` / `--force`） |
| 共享目录根 `.lnk` | 一键启动/停止面板、监听、归档 |

- **所有 node 服务用系统 node**（`C:\Program Files\nodejs\node.exe`）启动，勿用豆包 sandbox node（v20 与 dsh 不兼容）。

---
*完整规范：README.md（共识+目录）、MESSAGE_FORMAT.md（字段+闸门）、onboarding-guide.md（新智能体入网）。*
