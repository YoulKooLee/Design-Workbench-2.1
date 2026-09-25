# _DSH-template 审查报告：逻辑与路由

> qwen ｜ 2026-09-25 ｜ 方法：全目录实勘 + AGENTS.md 声明路径逐一存在性核验 + hooks 双配置比对 + build/entries 路由链源码核验，并对照 ai-drama-studio 测试报告 P1-P7 逐条检查吸收情况
> 被审对象：`02-模板\_DSH-template`（AGENTS.md 6,634B/101 行；.agents 9.7MB/391 文件；根级 rules 16 文件）

## 总评

**方向对、结构好，但"文档改了、机制没跟上"——上两轮实测实锤的 7 个 P 级问题，本版吸收了 4 个，原样残留 3 个，另新增 1 处自相矛盾。** 可以当"认知升级"看，还不能当"工程闭环"用。

## 一、做得好的（相对 _project-template 35.8KB 旧版的实质进步）

| # | 改进 | 证据 |
|---|---|---|
| G1 | **AGENTS.md 35.8KB → 6.6KB**，吸收 P1"注入截断"：只留三类内容（本工程事实/本工程约定/压缩保什么），技能清单、裁决速查、知识库速查全部下沉 `.agents/rules/` | L6-7 自述设计原则 |
| G2 | **消灭 L33 式虚假断言**：全文不再出现"技术强制"表述，技能/审查改为"需要时查、没命中说明即可、不必强行匹配"的诚实降级 | 旧版最要命的过度承诺已删 |
| G3 | **真源收敛**：CLAUDE.md=264B 指针（"以 AGENTS.md 为唯一真源"）；AGENTS.template.md 由 `build-agents-template.mjs` 从 AGENTS.md **机械生成**（正向：正本→模板），杜绝手工同步脱节——实测两文件差异恰等于脚本插入的提醒块+占位符，正文零漂移 ✓ | 脚本 1691B 逻辑核验 |
| G4 | **任务分流**（吸收 P6）：L24-33"先分流再决定要不要停下来问人"，局部改动可跳过正式对齐；L76 单文件≤600行的理由也改成了上下文成本而非观感 | 结构核心变化 |
| G5 | **子 Agent 定位务实**（吸收 P3）：L61-63"适合盘点取结论、不适合审查（实测会截断）"、"部分宿主只认自己的子 Agent 路径"——ai-drama-studio 的教训进文了 |
| G6 | **路由注册进编码底线**：L97"新增原型页面必须同步注册路由"——正是上轮 markdesk entries.json 404 事故的对症条款 |
| G7 | session-start.cjs 注入逻辑是真实的（读 INDEX.md 全文+缺失时给生成指引），非空头声明 |

## 二、问题清单（按优先级，全部有实测证据）

### X1 · P0 · 双配置分裂原样残留（上轮 T-2-03 根因2，未修）

`.agents/hooks.json` 与 `.agents/settings.json` **仍是两份互相矛盾的注册**：
- hooks.json：小写事件名（`preToolUse`），**含 context-budget**（matcher `Read\|Glob\|Grep`）；
- settings.json：PascalCase 事件名（`PreToolUse`），**完全不含 context-budget**，PreToolUse 只挂 config-protection+gateguard（matcher 仅 `Edit\|Write\|MultiEdit`）。

后果与上轮定性相同：宿主若按 Claude Code 惯例读 settings.json，**预算护栏静默失效**——"或"字面下接哪份全凭运气。两份还差一处：settings.json 有 `PostToolUse Agent` 追踪、hooks.json 写成 `Task` matcher，review-tracker 行为也随读哪份而变。

### X2 · P1 · AGENTS.md 新禁区 vs hook 旧名单（本版自己制造的新脱节）

本版 L16 新写"组件真源 `src/component-templates/`，**禁止整目录 Read**"——但 `context-budget.cjs` 的 `HIGH_RISK_PATTERNS` **实测仍是原封不动的 6 条**（与旧版逐字节比对一致），`component-templates` 零覆盖；根级 `rules/` 仍只拦 impeccable 子路径；`03-组件库` 仍只拦 vendor 层。
→ 上轮 P5"文档与名单不一致"的问题，本版不但没对齐，还**新增了一条文档单方面禁止、技术上不拦的禁区**。AGENTS.md 越瘦，剩下的每条越该有牙齿。

### X3 · P1 · INDEX.md 注入与"永不常驻"自相矛盾（吸收 P2 半截）

同一版本内三处打架：
- session-start **全量注入** INDEX.md（实测 **21.7KB**，是 AGENTS.md 正文的 3.3 倍——注入侧截断风险原样复刻，测试报告 P2 建议压到 ≤6KB 未执行）；
- AGENTS.md 第六节标题却写"按需读取地图（**永不常驻**）"，技能索引列在第一位；
- L59 又说"**需要时查** INDEX.md"。
到底注入还是不注入、主动查还是被动收？三处必须择一。建议按 P2 方案：INDEX 瘦身到"技能名+触发词"≤6KB，注入成立、常驻声明才成立。

### X4 · P1 · build-all.js Windows bug 原样残留（ai-drama-studio P7，未修）

L36 `spawnSync('npx', ['vite','build'], {stdio:'inherit'})` **无 `shell:true`**——Windows 下 npx 是 .cmd，实测该环境下退出码 null。同目录测试报告已给出 10 行内修法（`shell: process.platform==='win32'` 或 node 直跑 vite bin），**报告落款 09-24，本版未采纳**。而 AGENTS.md L97 底线"完成声明前必须运行构建"恰好依赖这个跑不通的脚本——验证收口在 Windows 上是空头条款。

### X5 · P2 · 文档引用路由：16 处声明 15 处核验通过，1 处断链+前缀风格分裂

对 AGENTS.md 全部路径引用逐一 `existsSync`：14/14 工程内路径 ✓、03-组件库（工作台根）✓、08-文档 ✓。唯 **L93 `10-智能体记忆/BOOTSTRAP.md`** 工程根下不存在（在工作台根才有）——同文件 L51 用的是 `../../08-文档/` 相对前缀风格，L93 却无前缀。工程实例化到 `01-项目/<name>/` 后深度恰好是 `../../`，L93 按字面解析即断链；且模板工程与实例工程的相对深度不同，这类引用需在模板里统一写成明确的锚定风格。

### X6 · P2 · session-context.md：死文件 + 错误环境 + BOM 三合一

`.agents/rules/session-context.md` 全工程 **0 引用**（grep 核验）= 死文件；内容仍是「Vue 3 + Element Plus、`cd admin && npx vite build`」——**与本工程（React+Vite+Tailwind）完全不符的模板残留**，被任何宿主或 agent 读到即注入错误项目环境；文件头 BOM 依旧。处置要么删除、要么改成本工程真实环境并接入加载链。

### X7 · P3 · 兜底引用落空

L63"子 Agent 不可用时按 `.agents/rules/agent-orchestration.md` 自行审查"——核验该文件**不含任何"不可用/兜底/自审 checklist"内容**，引用指向一个不存在的兜底。P3 建议的 30 行审查 checklist 落地位置应该就是这里，没落。

### X8 · P3 · 双 lock 文件

根级 `skills-lock.json`（35B，空 skills:{}）与 `.agents/skills-lock.json`（2,401B，真内容）同名异体并存，易被工具/人读错。建议删空壳或改名。

### 备注 · run.cjs 无白名单（低风险，顺带记录）

本版 `run.cjs` 是按 argv 动态 `require(hookName+'.cjs')`，无白名单限制且 catch 静默 exit(0)——上轮 admin 版"分发器缺注册"的坑这里不存在，但"注册了≠生效"的判断仍只适用于支持 hooks 约定的宿主（WorkBuddy 接线问题超出模板本身能解决的范围）。

## 三、路由专项结论（用户问的"路由有没有问题"）

1. **技能路由链**（INDEX→SKILL）：脚本与文档都齐，断在体量矛盾（X3）+ 宿主接线（X1）——链路设计 ✓，工程闭环 ✗；
2. **文档引用路由**：15/16 可达，1 断链（X5）+1 死文件错误内容（X6）——比旧版明显干净；
3. **页面路由/entries 链**：vite.config.ts 构建期 `scanProjectEntries(['prototypes','themes'])` + `writeEntriesManifestAtomic` + ENTRY_KEY 校验（查不到即 throw）逻辑自洽，AGENTS.md L97 也补了注册义务条款；但 build-all.js 的 Windows 断点（X4）让"构建即重扫"在实机上不可用，上轮 markdesk"面板无条目"事故路径依旧敞开；
4. **基线路由**（SRS/HLD/LLD 三件套路径约定 + 写入侧三态门禁）：L43-51 与旧裁决一致（SRS=需求规格说明书、[否决]理由必填只进过程层），术语无翻转 ✓。

## 四、能不能用？

- **AGENTS.md 本体（101 行）可以定稿**——瘦身、分流、诚实降级三个方向都站住了；
- **四个必修再放行**：X1（双配置合一）、X2（名单补 component-templates/根rules/03-组件库父目录，与文档禁区逐条对齐）、X3（INDEX 瘦身 ≤6KB + 三处表述择一）、X4（build-all.js 十行修法，测试报告现成）；
- X5-X8 属低危卫生项，可并给豆包批量清。

## 五、对照 ai-drama-studio 测试报告吸收矩阵（快查）

| 测试报告 | _DSH-template 吸收情况 |
|---|---|
| P1 注入截断/瘦 AGENTS | ✅ 6.6KB 定稿；⚠️ 但注入侧无上限检查（X3 把截断风险转移给了 INDEX.md） |
| P2 索引未注入/INDEX 过大 | ◐ 注入逻辑坐实了，但 21.7KB 未瘦身 + 常驻矛盾（X3） |
| P3 code-reviewer 路径 | ◐ 写了兜底条款，兜底文件内容缺失（X7） |
| P4 memories 跨项目污染 | —（宿主侧问题，模板无从修） |
| P5 名单与文档不一致 | ✗ 未修，且新增缺口（X2） |
| P6 装配过重 | ✅ 分流表（G4） |
| P7 build-all.js Windows | ✗ 原样残留（X4） |
