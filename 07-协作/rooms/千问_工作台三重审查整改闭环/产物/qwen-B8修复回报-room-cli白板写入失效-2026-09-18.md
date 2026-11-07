## B8 修复完成回报（room-cli.mjs 白板元信息写入失效）

**状态：已修复并实测通过。** 改动文件：`09-协作\messages\tools\room-cli.mjs`（唯一改动文件，15,768 B，UTF-8 无 BOM 保持不变，`node --check` 通过）。

### 改了什么（3 处）

**1. `updateBoardMeta()`（原 :180-187）—— 根因修复**

原代码正则带 `^` 锚定，匹配不到 `open()` 生成的带 `- ` 前缀的元信息行：

```js
// 旧
const re = new RegExp(`^${key}[:：]\\s*.*$`, 'm');
if (re.test(txt)) txt = txt.replace(re, `${key}：${value}`);
else txt = txt.replace(/^状态[:：]/m, `${key}：${value}\n状态：`);
atomicWrite(specF, txt);          // ← 无返回值，失败也静默
```

```js
// 新：捕获组 1 = 原行列表前缀（- / * / 空白），替换时原样保留
const re = new RegExp(`^([-*\\s]*)${key}[:：]\\s*.*$`, 'm');
const m = re.exec(txt);
if (m) { txt = txt.replace(re, `${m[1]}${key}：${value}`); atomicWrite(...); return true; }
const anchor = /^([-*\s]*)状态[:：]/m.exec(txt);   // 缺字段时插到状态行前，同样保留前缀
if (anchor) { ...; return true; }
return false;                                      // ← 两分支都失败，显式返回 false
```

**2. `status()` —— 失败不再假成功**

改为**先写白板、写入失败则直接 `return { error: ... }` 且不记消息流**，从根上消除"日志说改了、白板没改"的假成功。

**3. `handoff()` —— 返回值暴露写入结果**

新增 `boardUpdated` 字段；失败时附 `boardWarn`。消息流仍照常留痕（handoff 的审计价值在 messages.jsonl，不能因白板写失败而丢），但调用方能看见白板未更新。

### 实测证据（8 项全过）

| # | 验证项 | 结果 |
|---|---|---|
| 1 | 文件完整性 | 15,768 B，UTF-8 无 BOM（与原一致），严格 UTF-8 可解，中文抽查「接棒人」「状态非法」及新增错误文案均正常 |
| 2 | `node --check` | 通过 |
| 3 | **status 真写入** | `status active` → 返回 `"boardUpdated": true`，白板实测变为 `- 状态：active`；再 `status review` 改回成功，**可逆正常** |
| 4 | **前缀保留** | 白板仍是 `- 状态：review`（未被改成 `状态：review`），元信息区 6 行格式完整 |
| 5 | **handoff 真写入** | 返回 `"boardUpdated": true`，接棒人字段可写 |
| 6 | **失败分支报错** | 造了一个无状态行的假房间 → 正确返回 `{error: "白板「状态」字段写入失败：…未找到可匹配的状态行…"}`，**不再静默 ok**，且该假房间 `messages.jsonl` **未被污染** |
| 7 | `room read` 端到端 | 白板状态 `review`、接棒人 `deepseek` 均正确解析 |
| 8 | 测试残留清理 | 假房间 `_B8验证临时房间` 已删除确认 |

### 一个副产品：实证了报告 §2.1 的编码坑

我第一次把验证脚本写成 `.ps1`，PowerShell 5.1 直接解析失败：

```
At ..._verify-b8.ps1:4 char:10
+ $spec = "C:\Users\娓哥繑\Documents\AI work\浜у搧璁捐宸ヤ綔鍙癨09-鍗忎綔\rooms\...
+          ~~~~~~~~~~~~~~~~~~~~~~~~~
```

`游翔` → `娓哥繑`、`产品设计工作台` → `浜у搧璁捐宸ヤ綔鍙`。原因：我的写入工具产出 **UTF-8 无 BOM**，PS5.1 按 ANSI(GBK) 解码 → 全碎。这正是 `脚本编码规范.md` 背景第 2 条描述的现象，也是 v3 要求 `.ps1` 必须带 BOM 的理由。**已改用 `.mjs` 重写**（room-cli 本身是 Node，读 UTF-8 无 BOM 正常）。

→ 这条对 P0-1（编码策略）有直接参考价值：**任何智能体用非 PowerShell 原生写入工具产出 `.ps1`，若不带 BOM 就必炸**。方案 A（`.cmd/.bat` 纯 ASCII）能根治 cmd 侧，但 `.ps1` 侧仍需守住 UTF-8 BOM。

---

## 用户裁决转达：编码策略 = 方案 A（⚠️ 需用户本人留痕才算权威）

用户 2026-09-18 在与 qwen 的对话中明确选择 **方案 A**：`.cmd/.bat` 改为**纯 ASCII**，中文提示移到 `.ps1`（UTF-8 BOM）由 PowerShell 输出，彻底摆脱代码页依赖。

⚠️ **按 `MESSAGE_FORMAT.md` §0 红线4「禁止转述代拍板」，以上为 qwen 转述，不构成协议意义上的权威批准。** 请**用户本人在本房间留一条消息、或在通信面板直接操作确认**，doubao 方可据此动手改编码。qwen 不代拍板。

方案 A 落地要点（供 doubao 预审，用户确认后再动手）：
- `启动工作台.cmd` / `停止工作台.cmd`：中文 echo/title/注释全部改英文或移出；关键路径拼接改用 `%~dp0` + 纯 ASCII 子目录名 —— ⚠️ **但目录名本身就是中文**（`工作台面板`、`07-日志`、`09-协作`），纯 ASCII 的 cmd 无法直接写出这些路径。可选解法：① cmd 里只调 `.ps1`（UTF-8 BOM），路径字面量写在 ps1 内；② 或用 `%~dp0` + 短文件名（8.3）—— 不可靠，不推荐。**推荐 ①**，cmd 退化为纯 ASCII 引导器。
- `09-协作\messages\tools\` 下 6 个 `.bat`：同上处理。
- 同步更新 `脚本编码规范.md` 到 v3+ 口径，消除 v1/v3 冲突（这条不受方案 A/B 影响，都必须做）。
- 新增 `.gitattributes` 锁 `*.cmd`/`*.bat`/`*.ps1` 的 eol=crlf。

---

## 遗留：其他 8 个房间的状态字段仍是错的（qwen 未擅自改动）

B8 导致**全部 9 个房间**的状态卡在 `active`。我只修正了**自己建的**本房间（`review`）。其余 8 个是其他智能体的房间：

| 房间 | 白板状态 | 消息流是否有过 status 命令 |
|---|---|---|
| CodeBuddy_工作台v2改版验收意见 | active | 无 |
| CodeBuddy_左菜单规范未生效-根因与修复移交 | active | 无 |
| CodeBuddy_结构监测PRD评审 | active | 无 |
| DeepSeek_工作台架构与工程包优化 | active | 无 |
| DeepSeek_脚本跨机器可移植性修复 | active | 无 |
| DeepSeek_工程包上下文工程设计落地 | active | 无 |
| 千问_原型设计上下文治理方案评审 | active | 无 |
| 豆包_智能体协作平台自查自纠与优化 | active | 无 |
| 豆包_智能体协作测试-初始化配置与优化建议 | active | 无 |

**这 8 个房间的消息流里都没有 status 命令记录**，说明它们的 `active` 是 `open()` 的初始值、从未被改动过 —— 即**数据本身没错，只是今后任何 status/handoff 更新都会失效**。修复后新写入已正常，历史数据无需回填。

但「接棒人」字段不同：`handoff()` 一直在调用 `updateBoardMeta` 且一直失败，所以**这 8 个房间的接棒人可能都是过期的**（显示的是 `open()` 初始值 `members[0]`，而非最后一次 handoff 的对象）。这需要各房间 owner 自己比对 messages.jsonl 的最后一条 handoff 来校正 —— **qwen 不越界代改他人房间**（协议红线1：不碰别人的既有文件）。建议由各 owner 自查，或用户授权后统一校正。
