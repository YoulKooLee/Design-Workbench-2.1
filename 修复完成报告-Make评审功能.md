# Make 管理端 AI 评审功能 — 修复完成报告

> 交接来源：`任务-DeepSeek-修复Make评审功能.md`
> 修复范围：4 个项目副本 + 瘦身版备份，共 4 个物理文件
> 备份时间戳：`20261108-214542`

---

## 一、根因（与交接单的猜测不同）

交接单猜测是「`kind` 不匹配导致提示词为空」。方向对，但实际链路比猜测更严重：

`NE`（三个评审项）和 `kc`（每种评审的元数据）都已改成新 kind，但 **`reviewPrompts` 与 `reviewDocumentPaths` 的 `useMemo` 被漏改**，仍硬编码旧的两个 key。

补丁前的真实代码（`assets/index.js`，字符偏移 **506175**，全局唯一）：

```js
[Un,An] = o.useState("design")                              // Un = 当前评审 kind

P  = o.useMemo(()=>({ design: gd(m,"design"),
                      requirements: gd(m,"requirements") }), [m])
q  = o.useMemo(()=>({ design: Xm({...kind:"design"}),
                      requirements: Xm({...kind:"requirements"}) }), [P,m])
ue = P[Un]        // reviewDocumentPath
Ze = q[Un]        // reviewPrompt
```

- `q` = `reviewPrompts`，`P` = `reviewDocumentPaths`
- 两者**只有 `design` / `requirements` 两个 key**，新的 `design-note` 和 `page` 一个条目都没有

### 点击为什么「完全没反应」

事件链路本身是通的，`ME` 里绑定正确：

```js
buildPrompt:     () => T(H.kind)      // T = async H => (await C(H), re(H))
onDirectExecute: () => E(H.kind)
```

但问题出在状态塌陷：

1. `handleStartReview(kind)` 的实现就是 `Rg = o.useCallback(g => { An(g) }, [])`，**第一步就把 `Un` 改成了新 kind**
2. 新 kind 在 `q` 里没有条目 → `Ze = q[Un]` 变成 `undefined`
3. `xE` 按钮的 `disabled: !Se.trim()`（`Se = re(kind) = i[kind] || a`）随之变成 `true`
4. **disabled 的按钮点击不触发任何 handler** → 无 toast、不复制、ACP 收不到、剪贴板为空

所以不是「提示词为空直接 return」，而是按钮直接被禁用掉了。这也是为什么 UI 上看不出异常、但点下去毫无动静。

> 附带说明：`handleRunReviewDirect`（内部名 `Dg`）本身逻辑完好，取词是 `q[g] || Ze`；事件绑定 `xE.onDirectExecute → ME.onRunReviewDirect → t.handleRunReviewDirect` 也完好。**这两处都没有改动**。

---

## 二、改动内容（只改这一处）

`P` / `q` 改为按三个 kind 派生，并删除已无 UI 项对应的 `requirements` 条目：

```js
P = o.useMemo(()=>({
  "design-note": gd(m,"design-note"),
  design:        gd(m,"design"),
  page:          gd(m,"page")
}), [m])

q = o.useMemo(()=>({
  "design-note": Xm({ selectedItem:m, reviewDocumentPath:P["design-note"], kind:"design-note" }),
  design:        Xm({ selectedItem:m, reviewDocumentPath:P.design,          kind:"design" }),
  page:          Xm({ selectedItem:m, reviewDocumentPath:P.page,           kind:"page" })
}), [P,m])
```

- 未改动 `[Un,An]=o.useState("design")`（按约定保持默认值）
- 未改动 `NE` 数组、`kc` 元数据、`ME` / `xE` 组件、任何事件绑定
- 净增 84 字符（703,920 → 704,004）

---

## 三、实际修改的 4 个物理文件

`node_modules\@axhub\make` 是 **junction**，指向各自 `.pnpm` 下的真身，所以必须改 `.pnpm` 里的真实文件：

| # | 文件 | 改前 sha256 | 改后 sha256 |
|---|---|---|---|
| 1 | `01-项目\测试\node_modules\.pnpm\@axhub+make@0.6.21\node_modules\@axhub\make\dist\admin\assets\index.js` | `2dea79dd3d9e` | `21084d31666d` |
| 2 | `01-项目\Shadcn 后台管理仪表盘\node_modules\.pnpm\...\index.js` | `2dea79dd3d9e` | `21084d31666d` |
| 3 | `01-项目\AI漫剧工作台\node_modules\.pnpm\...\index.js` | `2dea79dd3d9e` | `21084d31666d` |
| 4 | `03-组件库\04-Make客户端瘦身版\admin\assets\index.js` | `2dea79dd3d9e` | `21084d31666d` |

> 第 3 项「AI漫剧工作台」交接单未提及，但改前与另外三个**字节完全相同**，存在同样的 bug，经确认一并修复。

每个文件旁均生成备份（原大小 743,048 字节）：

```
index.js.bak-reviewfix-20261108-214542
```

---

## 四、验证结果

### 1. 语法校验
`node --check`（按 ESM 解析）对 4 个文件全部 `exit=0`；补丁前后均通过，排除语法破坏。

### 2. 提示词生成器实测（最关键）
把补丁后 bundle 中的 `kc` 与 `Xm()` 原样抽出，在 Node 里真跑三个 kind：

```
OK    kind=design-note   提示词 492 字符  docPath=src/prototypes/demo/.spec/reviews/design-note-review.md
      开头: 请对当前原型的设计说明卡片执行审查，并把结果写成 Markdown。
OK    kind=design        提示词 494 字符  docPath=src/prototypes/demo/.spec/reviews/design-doc-review.md
      开头: 请对当前项目的 HLD/LLD 设计文档执行审查，并把结果写成 Markdown。
OK    kind=page          提示词 441 字符  docPath=src/prototypes/demo/.spec/reviews/ui-review.md
      开头: 请对当前原型执行页面代码审查，并把结果写成 Markdown。
三种 kind 提示词互不相同: 是
RESULT: PASS
```

三个 kind 均能产出非空、互不相同、路径互不冲突的提示词 → `disabled` 不会再变 `true`。

### 3. 服务实际下发内容
管理端真实端口是 **`http://127.0.0.1:53817`**（pid 1548，`@axhub/make/bin/cli.mjs`；`51720` 是 Vite 项目预览，不是管理端）。

直接 HTTP 拉取 `/assets/index.js`：

```
status=200 len=704004
新 design-note 条目: 1
新 page 条目: 1
旧 requirements:gd: 0
NE design-note/design/page: 1/1/1
```

**运行中的服务已经在下发补丁版**，无需重启。

### 4. 幂等性
再次运行补丁脚本，4 个文件全部命中「已是修复后状态，无需改动」，不重复写入。

### 5. 未受影响项
`xE` 的兜底与提示文案全部保留：`没有可用的 Prompt`（2）、`已发送到网页 AI 侧栏`（1）、`提示词已复制到剪贴板`（4）、`AI 评审已完成`（1）。
唯一残留的 `requirements` 引用是 `Xm()` 内的死分支 `n.kind==="requirements"`，对所有新 kind 恒不成立，无害，未动。

---

## 五、需要你手动做的验收

管理端服务已在跑且已下发新代码，**只需刷新浏览器**（建议 Ctrl+Shift+R 硬刷新，避免 JS 缓存）。

打开 `http://127.0.0.1:53817` → 打开评审面板 → 依次点三个评审项的「AI 执行」，逐项确认：

- [ ] 「设计说明审查」：有 toast，提示词是「设计说明卡片」那一份
- [ ] 「设计文档审查」：有 toast，提示词是「HLD/LLD 设计文档」那一份
- [ ] 「页面代码审查」：有 toast，提示词是「页面代码」那一份
- [ ] 应出现「已发送到网页 AI 侧栏」（助手可用时）或「提示词已复制到剪贴板」（助手不可用时兜底）
- [ ] ACP WebUI `http://localhost:32124` 能收到对应提示词
- [ ] 三个按钮**点击后不会变灰**
- [ ] 其他功能不受影响：顶栏按钮、发布菜单、页面编辑

> 注：若某个评审项报「AI 助手入口未就绪」，那是 `ae`（AI 助手桥）没连上，与本次 kind 修复无关，属另一条链路。

---

## 六、回滚方法

任选其一：

**A. 还原单个文件**
```powershell
Copy-Item "index.js.bak-reviewfix-20261108-214542" "index.js" -Force
```

**B. 用瘦身版一键恢复覆盖项目**（注意：瘦身版备份已是修复版）
```powershell
python "D:\产品设计工作台\06-运行脚本\make功能删减\make-slim-restore.py" "<项目路径>"
```

---

## 七、本次新增的可复用脚本

均在 `06-运行脚本\make功能删减\`：

| 脚本 | 用途 |
|---|---|
| `fix-review-kind.py` | 补丁脚本。默认试运行；`--apply` 才写入（自动备份 + 12 项自检 + 幂等） |
| `verify-prompt-generation.py` | 抽出 `kc`/`Xm()` 在 Node 里实测三个 kind 的提示词 |
| `verify-served-http.py` | 校验管理端 HTTP 实际下发的 bundle 是否为补丁版 |
| `ex.py` | 压缩 JS 定位工具：`fn <名字>` / `range <起> <止>` / `ctx <关键词>` |
| `diag-01-markers.py` 等 | 本轮排查用的诊断脚本，产物在 `_diag\` |

### 以后重装 node_modules 会失效吗

会。`npm/pnpm install` 会还原 `.pnpm` 里的原始文件。届时按顺序执行：

```powershell
python "D:\产品设计工作台\06-运行脚本\make功能删减\make-slim-restore.py" "<项目路径>"
```

因为瘦身版备份本身已是修复版，恢复即可带回本修复。

---

# 八、第二轮排查：点了有提示，但看不到评审报告

## 8.1 报告在哪里看

**UI**：就是评审面板本身。面板**上方是报告列表区**：
- 加载中 → 「正在加载报告...」
- 加载失败 → 「暂时无法加载评审报告」
- **没有报告 → 「暂无评审报告」，小字「可以从底部发起一次评审，或上传已有 Markdown 报告。」**
- 有报告 → 每条显示标题 / 分数 / 时间，点进去看正文

**文件**：`src/prototypes/<原型>/.spec/reviews/<文件名>.md`

| 评审项 | kind | 写入文件 |
|---|---|---|
| 设计说明审查 | `design-note` | `design-note-review.md` |
| 设计文档审查 | `design` | `design-doc-review.md` |
| 页面代码审查 | `page` | `ui-review.md` |

列表数据来自 `Mn.listReviewReports({projectId, prototypeId})`，由服务端扫描该目录。**文件不存在 → 列表必然是空的**，这不是前端 bug。

## 8.2 kind 修复已确认生效

22:15 三次点击，ACP 线程里记录的提示词**完全正确且互不相同**：

| 时间 | 线程 | 提示词首行 |
|---|---|---|
| 22:15:25 | `484320df…` | 请对当前原型的设计说明卡片执行审查… |
| 22:15:28 | `9c211d34…` | 请对当前项目的 HLD/LLD 设计文档执行审查… |
| 22:15:30 | `57377a15…` | 请对当前原型执行页面代码审查… |

三份内容、目标路径各不相同 → 验收标准第 1、2 条达成。

## 8.3 真凶：ACP 会话卡死在 model_requesting

三个线程的 assistant 都只有 `step-start`，`usage: 0`，`error: null`。查 `~\.codebuddy\logs\2026-11-08\测试__*.log` 得到时间线：

```
20:09:01  PromptIterator received prompt  route=resolveWaiter  runState=idle
20:09:02  agent_running → model_requesting → model_streaming（正常）
20:10:40  ...tool_executing → model_requesting  ← 此后永远没离开
20:52:39  skipRun … preserving active run state=model_requesting  ← 开始静默吞消息
20:57:09/12/14/17/19  ×5 全部 skipRun
22:15:25/28/30       ×3（本次点击）全部 skipRun → prompt() completed, stopReason: end_turn
```

`[AgentService] skipRun=true for agent=cli, runState=model_requesting, queueLen=12`
`[SessionRunStateMachine] ignored invalid transition | event=RUN_PREPARING | current=model_requesting | busy=true`

一次 20:10 的请求把状态机永久卡住，之后 **8 条提示词全被 skip 静默丢弃**，每次都返回 `end_turn` + 零输出。
`streamIdleTimeoutMs=300000`（5 分钟）空闲监控虽已 armed 但未生效，状态机没有自愈。

**处置**：终止持有该会话的 codebuddy agent 进程（pid 28092，父进程 cmd 16948 → ACP 服务 29324）。
终止后：28092 / 16948 已退出，ACP 服务 29324 仍在健康运行（`127.0.0.1:32124` 返回 200），
卡死的 run 被标记为 `error`。

**provider 健康度冒烟测试**：`codebuddy -p "只回复两个字：收到"` → `exit=0`，输出「收到」。
证明模型后端正常，问题纯粹是会话状态机卡死。

## 8.4 第二层问题：规则/模板文件缺失，且无人可审

提示词让 AI「先读取并严格遵循」以下文件，但这些文件**不存在**：

| 引用路径 | 状态 |
|---|---|
| `rules/design-note-review-guide.md` | ✗ 缺失 |
| `templates/design-note-review.md` | ✗ 缺失 |
| `rules/design-doc-review-guide.md` | ✗ 缺失 |
| `templates/design-doc-review.md` | ✗ 缺失 |
| `rules/ui-review-guide.md` | ✓ 存在（页面代码审查用） |
| `templates/ui-review.md` | ✓ 存在（页面代码审查用） |

AI 在唯一跑出推理的那次里明确写了：
> "The guide and template don't exist at the specified paths."
> "Let me locate the actual guide, template, and the prototype's HLD/LLD docs."

它就是卡在到处搜这些文件的过程中把 run 拖死的。

另外 `docs/` 下只有 `README.md`，**没有任何 HLD/LLD 文档**，所以「设计文档审查」当前无内容可审。

**分工**：这 4 个规则/模板文件由豆包按项目现有材料补齐
（可参照 `.agents/agents/design-note-reviewer.md`、`design-reviewer.md`、
`.agents/knowledge/phase2-design/hld-spec.md`、`lld-spec.md`、
`rules/review-common-guide.md`、`templates/ui-review.md` 的体例）。
HLD/LLD 文档由用户补在 `docs/` 下。

## 8.5 验证脚本

`06-运行脚本\make功能删减\verify-review-flow.py`，一键看三件事：

```powershell
python "D:\产品设计工作台\06-运行脚本\make功能删减\verify-review-flow.py"
python "D:\产品设计工作台\06-运行脚本\make功能删减\verify-review-flow.py" sample-page
```

输出：①reviews 目录下的 .md 及时间 ②最新 3 个 ACP 线程的提示词首行 + assistant 是否真有正文 + run 状态 ③codebuddy 日志是否又出现 skipRun。

**判定口径**：
- assistant 有正文 + `.md` 已生成 → 全链路通
- assistant 有正文但无 `.md` → AI 回了话但没落文件，看回复内容
- assistant 仍无正文 → 会话又卡住，需再重置
- 日志仍有 `skipRun` → 会话未真正重置

## 8.6 当前状态

- [x] kind 修复（`q` / `P` 按三个 kind 派生）— 已确认提示词正确
- [x] 卡死的 ACP 会话已重置，ACP 服务与 provider 均健康
- [ ] 豆包补齐 4 个规则/模板文件
- [ ] 用户在 `docs/` 下补 HLD/LLD
- [ ] 点「页面代码审查」做端到端验证（唯一规则模板齐全的一项）

---

# 九、第三轮：路径迁移、静默失败、卡死复现

## 9.1 三条路径改动 —— 已在 bundle 中，非本次改动

任务里列的三项路径调整**已经有人改好了**（bundle 最后修改 22:24:34，哈希 `0D51AC34E229`）：

| 改动 | 落地情况 |
|---|---|
| 报告路径 `.spec/reviews/` → `docs/reviews/` | `gd()` 已返回 `${原型目录}/docs/reviews/<file>`；`.spec/reviews` 全文件 0 处 |
| 规则路径 `rules/` → `docs/rules/` | `kc` 三项的 `rulePath` 均为 `docs/rules/...`（3 处） |
| 模板路径 `templates/` → `docs/templates/` | `kc` 三项的 `templatePath` 均为 `docs/templates/...`（11 处） |

改动时保留了第二轮的 `q`/`P` 三 kind 修复（`"design-note":Xm(...)` 仍在，1 处），没有回退。

## 9.2 路径改动的副作用：规则/模板现在全部不存在

`docs/` 目录下**只有 `README.md`**：

```
01-项目\测试\docs\README.md   427 字节
```

而原先可用的两个文件仍在项目根目录：

```
rules/ui-review-guide.md      3998 字节   ← 现在代码去 docs/rules/ 找，不在这
templates/ui-review.md        1964 字节   ← 现在代码去 docs/templates/ 找，不在这
```

结果：**三个评审项引用的规则/模板一个都不存在**。
改动前至少「页面代码审查」能找到文件，改动后连它也找不到了 —— 这是一处回归。

待办二选一：
- 把 `rules/ui-review-guide.md`、`templates/ui-review.md` 复制（不是移动）到 `docs/rules/`、`docs/templates/`
- 或由豆包在 `docs/rules/`、`docs/templates/` 下统一创建全部 6 个文件

## 9.3 静默失败已修复

**问题**：`handleRunReviewDirect`（内部名 `Dg`）里

```js
const J = await ae({context, prompt, targetPath});
if (Gt.current !== p || J === !1) return !1;      // ← J===!1 时静默返回
```

`ae()` 返回 `false` 表示「AI 侧栏没有接受这次请求」——正是 ACP `skipRun` 的表现。
此时函数直接返回，**不弹任何 toast、不复制、不报错**，用户看到就是「点了没反应」。

**修法**：把「上下文已切换」和「AI 未接受」拆开，后者给明确提示。

```js
if (Gt.current !== p) return !1;
if (J === !1) return h.error("AI 侧栏未接受本次评审请求（可能上一轮仍在执行），请稍后重试或重启 AI 侧栏"), !1;
```

未改动成功提示、空提示词分支、助手未就绪分支，均核对无漂移。

## 9.4 卡死会复现 —— 第二次实录

杀掉第一轮卡死进程后，ACP 在 22:36:20 重新拉起 agent（pid 20528），
它 **22:36:22 起跑、22:36:44.300 走到 `TOOL_ENDED → agent_running` 后就再没动过**：

```
22:36:22.929  RUN_PREPARING  idle → preparing
22:36:22.954  RUN_ACCEPTED   preparing → pending
22:36:44.212  TOOL_STARTED   model_requesting → tool_executing
22:36:44.300  TOOL_ENDED     tool_executing → agent_running
              ……此后无任何状态变化
22:47:00.904  ignored invalid transition | event=RUN_PREPARING | current=agent_running | busy=true
22:47:00.910  skipRun=true for agent=cli, runState=agent_running, queueLen=1
22:47:00.911  prompt() completed with stopReason: end_turn
```

即：**工具执行完之后 run 状态机没有继续推进**，之后所有提示词被静默吞掉。
这是 codebuddy / `@axhub/acp` 侧的状态机缺陷，不是 Make 前端能根治的。

前端的补偿措施就是 9.3 的显式报错 —— 至少失败可见、可判断。

## 9.5 新增自愈工具

`06-运行脚本\make功能删减\reset-acp-wedge.ps1`

从 codebuddy 日志里识别「持有卡死 run 的 agent 进程」，默认只报告，`-Kill` 才终止。

```powershell
# 只检查
powershell -NoProfile -ExecutionPolicy Bypass -File ".\reset-acp-wedge.ps1"

# 检查并终止
powershell -NoProfile -ExecutionPolicy Bypass -File ".\reset-acp-wedge.ps1" -Kill
```

脚本会：①定位当前项目的 codebuddy 日志 ②解析 `skipRun ... preserving active run state=` 反查 pid、卡住状态、已吞条数、会话 id ③列出处置建议 ④校验 ACP 服务 32124 健康度。

> 注意：文件带 UTF-8 BOM，否则 Windows PowerShell 5.1 会按 ANSI 读、中文把字符串搞断。
> 本机默认 shell 是 PowerShell 5.1（Desktop），没有 `pwsh` 7。

**实测结果**：识别出 pid 20528（`agent_running`，存活）与 pid 28092（`model_requesting`，已退出）；
用 `-Kill` 终止 20528 后复查，两个卡死进程均已退出，ACP 服务 32124 仍返回 200。

## 9.6 本次改动清单

```
04 个 bundle：704,029 → 704,093 字符（+64）
新哈希（SHA256 字节）：083950ACB000
备份：index.js.bak-silentfail-20261108-225513（原 743,157 字节）
```

验证：
- `node --check` 4 个文件全部 `exit=0`
- 4 个文件哈希一致 `083950ACB000`，大小一致 743,011 字节
- 服务实际下发（`127.0.0.1:53817/assets/index.js`）已是补丁版：新提示 1 处、旧静默返回 0 处、kind 修复 1 处、`docs/reviews` 5 处、`docs/rules` 3 处、`docs/templates` 11 处、`.spec/reviews` 0 处
- 幂等：重跑脚本会命中「已是修复后状态，跳过」

## 9.7 当前待办

- [x] kind 修复（`q`/`P` 按三 kind 派生）
- [x] 三条路径迁移（他人已完成，本次仅核对）
- [x] 静默失败改为显式报错
- [x] 卡死会话自愈工具
- [ ] `docs/rules/`、`docs/templates/` 下的规则与模板文件（6 个，豆包补齐 + 迁移现有 2 个）
- [ ] `docs/reviews/` 目录会在 AI 首次写报告时自动创建，也可预建
- [ ] HLD/LLD 设计文档（用户补在 `docs/` 下）
- [ ] 端到端验证：硬刷新后点「页面代码审查」

---

# 十、第四轮：服务端扫目录不一致（关键）

## 10.1 发现的硬伤

三条路径改动只完成了一半。客户端让 AI 写到 `<原型>/docs/reviews/<file>.md`，
但**服务端仍只扫 `<原型>/.spec/reviews`**：

```js
// dist/server/cli.mjs
function getPrototypeReviewsDir(prototypeDir) {
  return path44.join(prototypeDir, ".spec", "reviews");   // ← 没跟着改
}

function listReports(projectRoot, prototypeDir) {
  const reviewsDir = getPrototypeReviewsDir(prototypeDir);
  if (fs59.existsSync(reviewsDir)) {
    for (const entry of fs59.readdirSync(reviewsDir, { withFileTypes: true })) { ... }
  }
}

// 列表接口
if (pathname === "/api/review-reports" && req.method === "GET") {
  sendJson(res, { reports: listReports(context.project.root, prototypeDir) });
}
```

后果：AI 就算把报告写进 `docs/reviews`，列表也永远是「暂无评审报告」。

## 10.2 已做的复制（原计划那两步）

| 操作 | 结果 |
|---|---|
| `rules/ui-review-guide.md` → `docs/rules/ui-review-guide.md` | 3998 B，哈希 `D4EA8E9075AC` 与源一致 |
| `templates/ui-review.md` → `docs/templates/ui-review.md` | 1964 B，哈希 `14E9D02DA4F7` 与源一致 |

复制（非移动），原文件仍在 `rules/`、`templates/`。

## 10.3 服务端补丁

`fix-server-reviews-dir.py` —— 只改 `getPrototypeReviewsDir` 函数体里的 `".spec"` → `"docs"`，
其余 6 处 `".spec"`（产物历史、`.spec/acp` 会话、`spec.html`、`SOURCE_EXCLUDED_DIR_NAMES` 等）一律不动。

```js
function getPrototypeReviewsDir(prototypeDir) {
  return path44.join(prototypeDir, "docs", "reviews");
}
```

同时把各原型 `.spec/reviews/config.json` 复制到 `docs/reviews/config.json`，保住「局域网提交」开关。
已迁移：`测试/sample-page`（53 B，内容一致）。

### 关于硬链接（重要）

pnpm 用硬链接，改动会通过同一 inode 传播：

| 文件 | links | 说明 |
|---|---|---|
| `dist/server/cli.mjs` | **5** | 测试 + Shadcn 共享同一 inode（另 3 个在 `99-回收站`）。改一处两个项目同时生效，脚本对该情形做了幂等跳过 |
| `dist/admin/assets/index.js` | 1 | 各项目独立文件，必须逐个改（已改 4 个） |

`fsutil hardlink list` 实测 5 个位置：测试、Shadcn、以及 `99-回收站` 里的 3 份已删副本。**没有误伤其他在用的项目。**
备份由 `shutil.copy2` 生成，是独立新文件，回滚可靠。

## 10.4 验证结果

`verify-server-patch.py`：

1. **语法**：三个 `cli.mjs` 全部 `node --check` 通过（ESM）
2. **运行时行为**（把补丁后的函数抽出来在 Node 里真跑）：

```
[OK] 测试                reviewsDir = D:/proj/src/prototypes/demo/docs/reviews
[OK] Shadcn 后台管理仪表盘 reviewsDir = D:/proj/src/prototypes/demo/docs/reviews
[OK] AI漫剧工作台         reviewsDir = D:/proj/src/prototypes/demo/docs/reviews
     configPath = .../docs/reviews/config.json
```

3. 自检：新函数 1 处、旧函数 0 处、`".spec"` 正好由 7 处减到 6 处、`SOURCE_EXCLUDED_DIR_NAMES` 与 `.spec/acp` 路径零漂移

## 10.5 服务端补丁的持久性风险

瘦身版目录 `03-组件库\04-Make客户端瘦身版\` **只有 `admin/`，没有 `dist/server/`**。
所以：
- `make-slim-restore.py` 只恢复 admin，**恢复不了服务端补丁**
- `pnpm install` / 重装依赖会还原 `dist/server/cli.mjs`，本补丁丢失

需要时重跑：`python "06-运行脚本\make功能删减\fix-server-reviews-dir.py" --apply`

若要让 restore 脚本也能带上服务端，得把 `dist/server/cli.mjs` 也纳入瘦身版并改 `make-slim-restore.py` 的复制范围（当前未做）。

## 10.6 本轮结束时的实际环境状态

排查末段发现**所有相关服务均已停止**，端口全部无监听：

```
53817  Make 客户端      （原 pid 1548，已退出）
51720  项目预览 Vite    （原 pid 23492，已退出）
32124  ACP WebUI        （原 pid 29324，已退出）
```

含义：
- 客户端的 admin 补丁（第四轮前的三处）与服务端补丁**都会在下次启动时自然生效**，不需要额外「重启」
- 但也意味着补丁在服务端层面的效果尚未在真实请求中验证过

启动后请按 10.7 验证。

## 10.7 启动后如何验证服务端补丁真的生效

1. 启动 Make 客户端与 ACP
2. 随便往 `<原型>/docs/reviews/` 放一个带 frontmatter 的 `.md`，例如：

```markdown
---
title: 冒烟测试
reviewer: probe
createdAt: 2026-11-08T14:00:00.000Z
source: probe
---

# 正文
```

3. 打开评审面板。**能看到「冒烟测试」这条 → 服务端补丁生效**；仍显示「暂无评审报告」→ 补丁没生效（可能服务端没重启或改错文件）
4. 验证完删掉该文件

脚本辅助：`python "06-运行脚本\make功能删减\verify-review-flow.py"` 会列出 `docs/reviews` 下的 `.md` 及时间。

## 10.8 剩余待办

- [x] 复制 `docs/rules/ui-review-guide.md`、`docs/templates/ui-review.md`
- [x] 服务端扫目录改为 `docs/reviews`（含 config 迁移）
- [x] 语法 + 运行时行为验证
- [ ] **启动 Make 客户端与 ACP**，做 10.7 的冒烟验证
- [ ] 豆包补另外 4 个规则/模板：`docs/rules/design-note-review-guide.md`、`docs/templates/design-note-review.md`、`docs/rules/design-doc-review-guide.md`、`docs/templates/design-doc-review.md`
- [ ] `docs/` 下补 HLD/LLD 设计文档
- [ ] 每次会话卡死时跑 `reset-acp-wedge.ps1 -Kill` 复位
