# 交付模式（三档）

> 位置：`.agents/rules/delivery-modes.md` ｜ 读取层：按需 Read
> 来源：自 `AGENTS.md` v09（2026-09-19）该章节**原文外移**，正文未改写。

用户可在首句声明 **快速 / 标准 / 严格**，覆盖下表分技能默认。**未声明时按「分技能默认」取值，不是全局统一默认。**

### 分技能默认

|技能|未声明时默认|
|-|-|
|**`req-doc`**（SRS）|**标准**|
|**`prd-writer`** / **`prototype-to-prd`**|**标准**|
|**`page-generator`**|**快速**|
|**`pm-product-pipeline`**|**标准**|

各技能须在步骤 1（或等效门禁）记录 `DELIVERY\_MODE`；子 Agent prompt 首行传入 `交付模式：{DELIVERY\_MODE}`。

### 自动升档（覆盖分技能默认）

用户消息含 **正式交付、验收、上线、提测、完整审查、严格模式** 等意图时，**整任务升为严格**，直至用户另声明模式。

### 三档审查强度

|模式|触发词示例|SRS（req-doc）|PRD（prd-writer）|代码（page-generator）|
|-|-|-|-|-|
|**快速**|快速模式、先出稿、跳过审查|仅结构检查 + grep；不跑 reviewer|单文件 PRD；跳过概念版与 MVP 口头确认|步骤 6 **降级**：page-reviewer **仅维2**；code-reviewer **仅 P0 安全**；维1/3/4 跳过|
|**标准**|标准模式|A6 抽检 reviewer；P0 自动修；P1 问一次|分两版交付；可说快速模式走快路径（单文件）|步骤 6 **全量双审查**|
|**严格**|严格模式、正式交付、完整审查|全量 req-reviewer；修复前确认|完整概念版确认 + MVP 口头确认 + 全量 self-check|步骤 6 全量 + 可按需加审|

**模式冲突**：同一任务只认 **用户最新一句** 模式声明；**自动升档 > 用户显式声明 > 分技能默认**。

**page-generator 快速模式批量收口**：批量全部功能完成（或单次任务宣称完成）时，须运行 `npm run build` 或项目等效 `type-check`（见「验证收口」铁律）；步骤 6 跳过的 type-check/lint 在此补做。

> 各档默认值的理由见 `.agents/rules/AGENTS-rationale.md` §五。

---
