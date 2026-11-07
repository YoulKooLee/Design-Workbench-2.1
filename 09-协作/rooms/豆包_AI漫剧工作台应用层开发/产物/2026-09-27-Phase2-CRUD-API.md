---
阶段: Phase 2 第 4 步
日期: 2026-09-27
执行: CodeBuddy
状态: 完成，待豆包验收
一句话摘要: 六个实体的 REST CRUD + 项目开关 + 推演确认/丢弃链路完成，后端测试 17/17 通过。
---

# Phase 2 第 4 步 · CRUD API

## 一、接口清单

一律挂在 `/api/projects/{project_id}` 下：

| 资源 | 端点 |
|---|---|
| 项目开关 | `POST /open`、`POST /close`、`GET /summary` |
| 角色 | `GET POST /characters`、`GET PATCH DELETE /characters/{id}`、`GET /traits` |
| 关系 | `GET POST /relations`、`GET PATCH DELETE /relations/{id}` |
| 事件 | `GET POST /events`、`GET PATCH DELETE /events/{id}` |
| 事件确认 | `POST /events/{id}/confirm`、`POST /events/{id}/unconfirm` |
| 推演 | `POST /simulate/fast-forward`、`POST /simulate/{batch_id}/confirm`、`DELETE /simulate/{batch_id}` |
| 分集 | `GET POST /episodes`、`GET PATCH DELETE /episodes/{id}` |
| 伏笔 | `GET POST /foreshadowings`、`GET PATCH DELETE /foreshadowings/{id}` |
| 待办后果 | `GET POST /repercussions`、`GET PATCH DELETE /repercussions/{id}` |

事件列表支持 `confirmed` / `scale` / `character_id` / `day_from` / `day_to` 过滤；
后果支持 `resolved` / `executor_id`；伏笔支持 `status` / `tied_character_id`。

## 二、关键决策与理由

**1. 「确认才落盘」拆成三段，而不是一次写完。**
`stage_batch` 写临时态（`confirmed=0`），此时**不动**故事时间游标、关系、性格；
`confirm_batch` 才做转正 + 关系变化 + 性格演化 + 台账兑现/顺延 + 游标推进；
`discard_batch` 把整批连同快照、伏笔、新台账收走。
这样「跑了推演」和「这批剧情算数」是两件事，后者只能由人点出来。

**2. 批次副作用存进 `generation_runs.input_json`。**
确认是另一个 HTTP 请求，拿不到内存里的 batch 对象。把关系变化、性格演化、
fired / postponed、结束时间序列化进那条留痕，确认时照单执行，不重算一遍——
留痕原本就要留，正好一物两用。

**3. 给四张表加 `batch_id` / `confirmed`。**
`story_events`、`pending_repercussions`、`character_states`、`foreshadowings`。
这一层是做时才看清的：没有批次归属就没法整批丢弃，没有确认标记就无法让
编排与剧本只认已生效的事件。文档 §4.5 / §4.8 / §4.9 已同步。

**4. 临时态不参与下一次推演。**
`load_events` / `load_states` 默认只按已确认口径读——没点头留下的东西不该
当作历史去判定「这人已经没了」。

**5. 手工操作即时生效，推演产物要确认。**
手工登记伏笔与后果 `confirmed=1`（人已经拿定主意了）；手工新增事件仍走临时态，
因为它同样可能只是随手一记。

**6. 关闭项目释放连接。**
`close` 走 `engine.dispose()` 并摘掉缓存；删项目时先 `close` 再删目录，
否则 Windows 上库文件句柄还挂着，删不掉。

## 三、实测

```
$ python -m pytest backend/tests -q
17 passed
```

覆盖：健康检查；项目增删改（含删除连带清目录）；项目开关与概览；六个实体的
主路径与冲突分支（角色重名 409、关系自指 400、重复关系 409、集次重复 409、
回收伏笔必须写明锚点 400、参与者不存在 404）；事件确认 / 取消确认；
**推演 → 临时态 → 确认转正 → 时间游标推进到次月**；**另一批 → 整批丢弃 → 回到原样**；
重复确认被拒（409）；未确认时游标不动；推演确定性（同种子两个项目逐条一致）。

## 四、Python 环境（按豆包拍板）

沿用 `backend/.venv`（Python 3.12）。README 里的启动方式已统一写这份解释器，
并补了「Windows 上 PATH 里的 python 可能指向商店占位程序」的提醒。

## 五、下一步，等豆包派

1. 编排链路（第 5 步）：已确认事件 → 分集（含 AI 剧情骨架）
2. 剧本链路：上下文切片 + 双 Agent + 六项审查 + 定稿回写
3. 前端从原型迁移页面（先接这批 API）
4. 双 Agent 接真模型（责编可先降级为纯规则）
