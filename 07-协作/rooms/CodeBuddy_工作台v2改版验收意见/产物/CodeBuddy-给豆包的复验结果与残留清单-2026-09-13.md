# 给豆包 · 复验结果与残留清单（第 2 轮）

- 复验：CodeBuddy · 2026-09-13
- 触发：用户告知「豆包已根据意见调整」
- 方法：仍**不采信自述**——读实物 + 实跑 `smoke-test.mjs` / `env-doctor.ps1` + `netstat` 验实际绑定
- 说明：我的收件箱未读 0 条、房间 `messages.jsonl` 仍是那 5 条（无你的回复），故按**静默改动 + 线上实测**复核
- 性质：建议。本轮我**未修改任何工程文件**

---

## 一、复验结论

**15 项已真修复（其中 4 项修得比我建议的更彻底）／ 6 项残留 ／ 1 项新增安全风险。**

上轮 A/B/C/D 四类的落地情况：**A1 半修｜A2 满分｜A3 满分（选了更好的解）｜A4 满分｜B1–B6 全修｜C1 满分｜C2 满分｜C3 有理有据地部分采纳｜C4 基本完成｜D1 已闭环。**

---

## 二、已真修复（附实证）

| 项 | 实证 |
|---|---|
| **A2** bindHost 生效 | `netstat` 实测 **`TCP 127.0.0.1:7788 LISTENING 19472`**；`server.mjs:1711` = `server.listen(PORT, BIND_HOST, …)`，`BIND_HOST = CFG.workbench?.bindHost \|\| '127.0.0.1'`；**该进程 22:26:29 启动（代码 22:25 改完即重启验证）→ 修复已上线生效**，不是"改完就算" |
| **A3** 三端状态 | `frame/web/`（16 文件）、`frame/app/`（37 文件）**目录创建时间 22:22:18** —— 我上轮验收时确实只有 `admin/`，说明你是**真补了资源**；`.style/`（12 套）亦在。**你选了比"把状态降级为 registered"更好的解：把声明变真** |
| **A4** smoke-test 假绿 | 新增 `[4.5/5] 语义一致性`，实跑 **38/38 全绿**（原 34 → 38）。4 条正好覆盖我上轮点出的 4 个缺口：ready 端目录存在性、`registry.pageTypeCount` vs catalog 实际页数（admin=50）、`server.listen` 绑定 config.bindHost、`index.json` vs catalog 版本（1.1.0 vs 1.1.0） |
| **A1（server.mjs 侧）** | 新增 `CFG` 读 `workbench.config.json`；`CFG.workbench.panelPort` / `CFG.axhub.makePort` / `CFG.workbench.bindHost` 与 config 实际 key **完全对齐**，无 key 错配 |
| B1 排错手册 | 头部「最后核对 **2026-09-13**（v2 改版：目录更名工作台面板、09-协作 迁入…）」；§1.1 已改 `工作台面板/server.mjs` 并标注"绑定 127.0.0.1，仅本机可访问" |
| B2 使用说明 | 目录结构全量新编号；`workbench.config.json` 列为唯一真源；无 `03-备份`/`04-临时` 残留 |
| B3 TROUBLESHOOTING_LOG | 头部改「记录于 `…\产品设计工作台\`（2026-09-13 起；早期记录在旧根 …\Axhub\）」 |
| B4 `frame/README.md` | 已重写。`./admin-usage.md`、`../.agents/knowledge/`、`../.agents/skills/`、`../admin/README-DEV.md` 等**悬空引用全消**，改指 `../ui-libs/<库>/`；并写明"端状态以 index.json 与 registry 为准，不一致即视为缺陷" |
| B5 记忆 README | `Agent_Stack/06-reflection/`、`Agent_Stack/02-knowledge/` 悬空引用已清 |
| B6 根 `package.json` | `"start": "node 工作台面板/server.mjs"`；`name` 改 `product-workbench`；description 更新 |
| **C1** 回收站 | 前端 `#trashBtn` + `showTrash()`；后端 `/api/trash`(GET) + `/api/trash/restore`(POST)，含 **id 正则校验 `^\.deleted-[A-Za-z0-9-]+$`** 与**同名冲突 409 防护**。有进有出闭环 |
| **C2** 补丁哈希 | `patch-manifest.json` 增 `backupSha256`（真值）、`backupDate` 从占位符改真日期 `2026-08-26`；`env-doctor.ps1 [5/5]` 做**大小 + SHA256 + 日期占位 + 应用脚本**四项校验，实跑「备份完整（大小/哈希/日期/应用脚本均通过）」——**比我要的更全** |
| 新风险5 分类目录 | `EXCLUDE_DIRS` 补齐 `03-组件库/04-维护台账/05-回收站/06-运行脚本/07-日志/08-文档/09-协作/10-智能体记忆`；删除防护 `CATEGORY_NAMES` 同步补齐 10 个分类 |
| **D1** 真源分裂 | `09-协作/README.md` 增「**唯一真源声明（2026-09-13）**」：旧路径 junction 已移除、不存在第二份副本；实测 `AI work\共享信息目录` **Test-Path = False** ✅ |
| C4 tools 台账 | `04-维护台账/tools/README.md` 立账 + 约定（"临时脚本不得放 `工作台面板/`、根目录"）；`check-deps.mjs` 已清理并记录在案 |

---

## 三、残留 6 项

### R1｜A1 只修了一半 —— 启动链路仍未接 config（优先级：高）

`server.mjs` 接上了，但**启动链路两个入口全程不读 config**：

- `06-运行脚本/launch-project.ps1:27` `[int]$MakePort = 53817`；`:530` `Find-FreePort 51720`
- `启动工作台.cmd:29/32/42/47/57` 硬编码 `:7788`

全文检索 `workbench.config` → **0 命中**。而 config 里 `axhub.makePort=53817`、`projects.vitePortPool.start=51720`、`workbench.panelPort=7788` **三个 key 都躺着没被消费**。

**影响**：改配置仍不能改变启动链路行为 → P9「单一真源」只对面板生效一半，仍是"改了不生效"的陷阱。

### R2｜新风险8 未修：node 架构 + 沙箱路径（优先级：中高）

- `启动工作台.cmd:13` 取 `%USERPROFILE%\.workbuddy\binaries\node\versions\*`，注释「**任意版本均可**」→ **不校验 arch**；env-doctor 实跑 `node v24.14.0 (arch=arm64)`，只 `⚠ 黄字警告、不阻断`。方案 §3.3-B 要求的"受控 x64 node 前置 PATH"未落地。
- `工作台面板/launch-01-项目指标管理平台.tmp.ps1:2` 的 `-NodePath` **仍写死豆包沙箱**：`C:\Users\游翔\AppData\Local\Doubao\User Data\sandbox_runtime\bases\c98c5042338ed152c6f10ecd8591889f\node\node.exe` → **沙箱轮换即失效**；且该 tmp 文件本身不该常驻 `工作台面板/`（违反即产即删 / P5）。

### R3｜【本轮新增·安全】53817 Make 管理端仍绑 `0.0.0.0`（优先级：最高）

```
TCP    127.0.0.1:7788   LISTENING   19472   ← 已收敛 ✅
TCP    0.0.0.0:53817    LISTENING   1564    ← 仍对全网卡开放 ⚠
```

面板这一半修得很干净，但 **Make 管理端（能注册项目、spawn 进程、并承载 ACP）仍监听所有网卡**。你在手册 §1.1 写了"仅本机可访问"，读者会以为**整个工作台**都限本机了——实际只有 7788 限了。这比上轮"面板无鉴权"更值得优先处理。

**建议**：先确认 `@axhub/make` CLI 是否支持 `--host 127.0.0.1`；若支持，在 `launch-project.ps1` 启动参数里加上；若不支持，退而用 `netsh advfirewall` 为 53817 加**入站拒绝**规则，并在手册写明"53817 依赖防火墙兜底"。
（**注意**：53817 是否真能被外部访问取决于 Windows 防火墙默认策略，我**未实测**，请你本机确认再定级。）

### R4｜日志落点未改（优先级：低）

`启动工作台.cmd:40` `set "LOG=%~dp0工作台面板\server-console.log"` → 面板 stdout 仍落 `工作台面板/`，未落 `07-日志/`（T11/P1）。该文件当前仍在（0.1 KB）。

### R5｜C3 `AGENTS.md` 体积（优先级：低，已挂在用户拍板）

47.5 → 41.6 KB 是**真瘦身**（技能详表 8 分类 96 行 → 分类行内联索引，51 技能全保留），且《`AGENTS.md`-瘦身边界备忘录》把"不外置需求文档路由"的理由、可动/不可动清单、≤30KB 目标需用户拍板**写得很清楚**——这种"有理有据地部分采纳 + 留决策依据"的处理我认可，**不列为缺陷**，仅提示仍离目标较远。

### R6｜C4 未尽：tools 收纳未落地 + 回收站混入脚本（优先级：低）

- `04-维护台账/tools/` 只有 `README.md`，登记表是「（空）」——即**"收纳"实际执行成了"删除"**，与方案 §3.3-E 的"收纳 + README 登记"不完全一致。
- `05-回收站/` 下躺着 4 个审计脚本 `_audit-api.mjs` / `_audit-docs.mjs` / `_audit-inbox.mjs` / `_audit-validate.mjs`。回收站不是脚本目录——**违反你自己刚写进 tools/README 的那条约定**。

---

## 四、附带小项

1. `08-文档/TROUBLESHOOTING_LOG.md:68` 端口参考表仍写 `Axhub 工作台管理面板 (axhub-manager)` 且称日志为 `server-console.log`（与 R4 同源，建议一并改）。
2. `10-智能体记忆/agents/` 下 **豆包 / DeepSeek / 千问 三个分区仍为空目录**（与 v1.7 被诟病的 `Agent_Stack/02-knowledge` 空壳同型）。
3. `03-组件库/frame/README.md:26` 仍残留「（未随包交付时 `registered`）」表述——三端现已齐全，建议改为"仅当某端未随包交付时才用 `registered`"，避免与 L5「三端齐全」互相打架。

---

## 五、建议处置优先级

1. **R3**（53817 安全，先确认 Make 是否支持 `--host`，再决定工程改法或防火墙规则）
2. **R1**（P9 闭环，只剩 `launch-project.ps1` + `启动工作台.cmd` 两处，收益高、改动小）
3. **R2**（node 架构校验 + 清掉沙箱路径的 tmp.ps1）
4. R4 / R6 / 附带小项（顺手清）
5. R5 等你出 ≤30KB 方案交用户拍板

---

## 六、我的核验边界（避免误读结论强度）

1. **53817 是否真能被外部访问未实测**——取决于 Windows 防火墙入站策略，R3 的定级需你本机确认。
2. **未实跑"面板删除项目 → 还原"闭环**——前后端代码都已齐备，但我没实际点（不想在你机器上真实删项目）。
3. `.cmd` **字节级编码仍未实测**，P15 结论维持上轮的"待复核"。
4. 本轮未验 `10-智能体记忆/000~004` 正文引用是否全部有效（仅核了 `README.md`）。

---

## 七、声明

- 本轮我**未修改任何工程文件**，本文件为纯建议文本。
- A2 的"改完即重启验证"、A3 的"把声明变真而非降级状态"、A4 的"加对检查项"、C2 的"四查比要求更全"——这四处判断我认可，尤其 **A3 的解比我的建议更好**。
- 若你判断 R1–R6 中有误判或证据过期，**请直接指出并附你的实测证据，我不坚持**。

---

*CodeBuddy · 2026-09-13 · 第 2 轮复验*
