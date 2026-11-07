# open-design prototype 上下文工程 · 把关报告与借鉴优化建议

> 把关对象：`D:\Github开源项目\产品线\prototype上下文工程`（豆包归档，2026-10-23）
> 核对基准：`D:\Github开源项目\open-design` 源头文件与 daemon 装配源码（逐文件 MD5 + 体积实测）
> 本报告仅作分析结论，未对工作台做任何改动。

---

## 一、总评

**豆包这份归档质量相当高，可以采信使用**：23 个归档文件与源头逐字一致（MD5 全等 23/23）、28 文件计数准确、三大核心体积（core 26.8KB / orchestration 14.0KB / prototype 27.9KB）与实测吻合、版本号（strategy v3.3.8、core 声明 v3.2.0、prototype v3.1.9、frames 1.0.1、layout.css 1.1.2）全部准确、译文抽查忠实（字段名/命令/标记保留原文）。"prototype 是注入量最大的任务类型"（27,902 B，居 13 个档案之首）与"已知 5 对手工维护镜像已漂移"（`docs/prompt-composition.md` 原文可证）两条关键断言均核实成立。

但有 **1 处方向性误读、2 处无出处断言、2 处小错**，以及 **4 个豆包没挖到的重要机制**——其中两个恰好能补工作台最大的短板。

---

## 二、逐条核对结果

### 2.1 豆包说错的

| # | 豆包断言 | 实测 | 严重度 |
|---|---|---|---|
| E1 | 核心结论第 3 条 + 02-工作流："**禁止任何生成后质量检查**，质量靠写源码时一次达标" | **以偏概全**。`general-orchestration.md` 禁的是截图/渲染/预览/验收子代理/修复轮（L27-32、L40、L212 原文属实）；但 OD 同时存在 **POST self-verify scorecard 强制机制**：当记忆体系中有 `Verified rules` 激活时，system prompt 要求产出制品后**必须**逐项自评并发 `<od-card type="verify-scorecard">`，daemon 用 `memory-verify.ts` **确定性地**检查记分卡是否覆盖每条规则，缺失记为 enforcement failure 呈现给用户，默认开启（`memoryHooks.verify ?? true`）。OD 的真实纪律是"**写时一次达标 + 可核验规则的事后记分卡**"，不是纯粹的"禁一切检查" | 🔴 高——直接影响转译方案"不吸收"的裁决 |
| E2 | 01-架构 §⑤："核心章程要求每轮保持绑定——**后续轮次不得改回裸 hex**" | 在 core / orchestration / prototype 三份档案中检索 `bare hex`、hex、palette lock 均**无出处**。疑似无依据引申（prototype.md L236 的"外壳不设 palette"说的是设备壳，不是这条） | 🟡 中——落地时别把这句当真规则抄进去 |
| E3 | 01-架构 §⑥ 注入分层图：Craft 规则"技能 od.craft.requires 声明注入" | 机制本身属实（`docs/skills-protocol.md` §5.5 + L212 注入顺序），但 `craftBody` 只出现在**常规装配路径**（`apps/daemon/src/prompts/system.ts`）；OD Next recipe 的装配入参（`packages/contracts/src/prompts/od-next-strategy.ts`）中有 designSystem* 八个字段却**检索不到 craft**。五层注入图疑似把 legacy 路径与 OD Next 路径的机制混在一张图里 | 🟡 中——OD 自身双路径（system.ts:905 提前返回分叉）豆包未区分 |
| E4 | web-prototype："**8 个**可粘贴区块骨架" | `references/layouts.md` 实测 `##` 区块 **11 个** | 🟢 小 |
| E5 | core-system-prompt 标为 "v3.2.0" | 这是 `open-design.json` 的**声明版本**；文件自身标题为 "OD Next Core Strategy **v3.1.1**"。OD 内部两处版本标注不一致，豆包照抄了声明值（翻译版倒是忠实保留了 v3.1.1） | 🟢 小 |

### 2.2 豆包没挖到的（按价值排序）

| # | 遗漏机制 | 出处（实证） | 对工作台的价值 |
|---|---|---|---|
| M1 | **Verified rules + verify-scorecard 闭环**：每条规则体含 `Assertion:` / `Check:` 行 → 组装成 rubric 注入 → 产出后模型自评记分卡 → daemon 确定性校验覆盖度 → 缺失记 enforcement failure | `apps/daemon/src/memory.ts:666-680`、`prompts/system.ts:1222-1224`、`memory-verify.ts`（"used to be honor-system…now deterministically evaluates"）、`cli.ts:11138/11560` | ⭐⭐⭐ 正好补工作台"质量把关全靠 prompt 软约束"的短板（现状：9 个 hook 里唯一真跑代码的只查 console.log） |
| M2 | **Critique Theater 多代理评审的下线裁决**：曾实现完整评审剧场（rollout 分级 M0-M3、面板协议、Prometheus 指标），2026-08-26 产品裁决下线，直接原因是**协议标签整块漏进聊天正文**（`<CRITIQUE_RUN>` 用户可见），且注入源没查清；留有兜底剥离器 `panel-grammar-strip.ts` | `apps/daemon/src/critique/rollout.ts:85-100`、`prompts/panel.ts`、`skills.ts:95-104`（`od.critique.policy` 仍在协议里） | ⭐⭐⭐ 工作台重度依赖 LLM 评审 agent（design-reviewer/page-reviewer），这是同行产品的真实翻车案例：标记语法防泄漏、评审协议要可控剥离 |
| M3 | **个人记忆双循环（two-loop memory）**：profile（画像）/ rewrite（改写沉淀）/ verify（验证规则）三个钩子开关，跨会话偏好注入且声明"captured 的不再问" | `memory.ts`、`system.ts:800-807,1212-1224` | ⭐⭐ 对标工作台 `project-memory.md`（三层记忆），OD 把"记忆条目"与"可执行规则"分型（rule 型带 Check），比工作台纯散文记忆更可机检 |
| M4 | **提示词组装的维护层文档** `docs/prompt-composition.md`（14.3KB）：四轴变体矩阵、资产名册、package hash、**host contract 表**（data-od-deck-protocol 等每条有宿主消费者与行号）、deck-framework 单源三路径共用的"模范形状"、#7568/#7651 两个 PR 的漂移事故复盘 | 文件存在 + 通读（豆包引用了其中 4 条结论却未收录原文） | ⭐⭐ "一条规则→宿主消费者→行号"的契约登记法，是治工作台 README 数字漂移/悬空引用（10-智能体记忆缺失、27 处引用悬空）的对症药 |

### 2.3 补充事实（档案未收，影响不大）

- `open-design.json` 只注册 6 个 taskProfiles（prototype/ppt/marketing/hyperframes/discovery/motion-design），其余 7 个档案文件仅挂 `context.assets`；`motion-design.md` 23.9KB 是第二大档案，未归档。
- discovery 档案捆绑全部 13 个档案 + 设备壳作为 resources，且壳版本是 **1.0.0**（prototype 档案是 1.0.1）——同资源跨档案版本漂移，OD 自己也会漏。
- 13 个任务类型属实（task-profiles 目录 13 个文件）；"13 份 craft 规则"实为 11 条规则 + README + FUTURE_SECTIONS（预告 motion-discipline/pixel-discipline/typographic-rhythm 三个未发布的 slug，配 `pnpm lint:craft` 校验前向引用）。

---

## 三、对豆包《转译接入方案》的把关意见

方案的落点判断（`.agents\knowledge\phase2-design\` + `catalog.json` 登记 + AGENTS.md §六路由、不动 INDEX.md、不造新技能）与工作台实测机制**一致，骨架可用**。草案 `prototype-design-baseline.draft.md` 质量高，基线值/文案预算/反 AI 光泽/按类型取图均与 prototype.md 原文对得上。三点修正建议：

1. **"ship-on-write 不吸收"的理由要改写，结论反而可以更激进**。豆包拒绝吸收的理由是"OD 禁一切事后检查，与工作台评审流程冲突"——但 E1 证明 OD 自己就有事后记分卡。正确姿势不是二选一，而是 OD 的分层：**生成期一次达标（吸收为纪律）+ Verified rules 记分卡（吸收为机制）+ 截图/预览类重检查（继续禁止）**。工作台的 page-reviewer 评审环节与这套完全兼容，方案里"评审/验收环节保持不变"的目标不变、论据要换。
2. **补吸收三旋钮**（视觉风格/信息密度 relaxed 24-96px / standard 16-64px / compact 8-32px / 动效强度 restrained/standard/rich）：在 02-工作流里有总结，但草案知识文件没落。这是把"风格怎么调"变成可核验档位的关键，建议进 baseline 草案。
3. **落地前先修账**（见下节 A1）：方案第 5 步"给 CodeBuddy/千问发变更说明"依赖文档-实物一致，而工作台当前数字/引用多处失真，先修再挂新知识，否则新文件一登记就加入漂移。

---

## 四、工作台可借鉴与优化清单（结合实测现状）

> 现状依据：本次对 `_project-template` 的实测（常驻三件套 15.9KB 与 README 宣称 14.5KB 不符、Vue 包 21.2KB 且缺 project-memory、hook 实测 9 个 vs 宣称 8、`10-智能体记忆/` 不存在但 27 处引用悬空、impeccable 369KB 工艺规则存在但未接入任何受控路由）。

| 优先级 | 借鉴点 | 来源机制 | 具体动作 |
|---|---|---|---|
| **A0** | 修账：文档声明=实测值 | M4 host-contract 登记法 + OD 的 byte-equality 集成测试思路 | ① README 三件套/hook 数/组件库体积按实测改正；② `10-智能体记忆/` 悬空引用：补 BOOTSTRAP.md 或清除 27 处引用，二选一；③ Vue 包补齐 project-memory.md 或显式声明不适用；④ 给"声明数字"写一个校验脚本（照 INDEX.md 脚本生成的先例），把 rationale 里的 22KB/10.6KB 旧数一并清掉 |
| **A1** | 接线 impeccable（369KB 孤儿资产） | §⑥ craft 注入位序 + "brand 决定用哪个 token、craft 决定怎么用"的冲突裁决句（craft/README.md 原句） | 按豆包方案 P1 落 3 份知识文件时，同步在路由表点名 `rules\references\impeccable\` 的 craft/critique/typeset/animate 四件，或把其精华并入新文件——两套规则并存不接线等于没有 |
| **A2** | Verified rules 记分卡 | M1 | ① 评审清单（prototype-review-guide 等）里可测项改写成 `断言: / 检查:` 两行格式；② page-generator 步骤 6 验收增加"发记分卡"要求（pass/fail/fixed + 自动修复优先）；③ 仿 `memory-verify.ts` 写一个确定性脚本：核对记分卡是否覆盖全部激活规则，缺卡即拦（可挂到现有 stop-quality-gate hook——它目前只查 console.log） |
| **A3** | 评审协议防泄漏 | M2 | 凡给 LLM 评审 agent 加的标记语法（记分卡/评审卡），必须配"用户可见正文剥离"兜底 + 禁止把未剥离的协议标签当交付内容；OD 的下线教训是漏检三次用户可见才查因，防线要前置 |
| **B1** | 设备外壳契约 + layout 原语 | §⑨（豆包已列，P2） | 维持方案：device-frame 化进 `03-组件库\03-页面组件`，layout.css 形状表转工作台类体系；注意 OD 壳是"呈现不是设计系统"这条定性要一并带过来 |
| **B2** | 记忆条目的"画像/规则"分型 | M3 | project-memory.md 三层结构里，把"经验"层中可测的条目升格为 rule 型（带检查行），供 A2 的记分卡消费；同时给"模块快照 ≤300 字"机制补上 project-memory.md 的承接小节（现状缺失，机制空转） |
| **C1** | 声明式能力最小化 | open-design.json `capabilities: [prompt:inject, pipeline:*, fs:write]` + `pipeline.stages` | 工作台技能 frontmatter 若将来加权限声明，参考这种"能力白名单+阶段原子"最小声明；现阶段仅记录为设计参照 |
| **C2** | 前向引用 lint | `pnpm lint:craft` + FUTURE_SECTIONS 机制 | catalog.json 校验（Test-Json）之外，加一条"路由表指向的文件必须存在"检查，防再产生悬空引用 |

---

## 五、结论一句话

豆包的归档**忠实度高、结构清晰，P1 三件套可照案执行**；但要按 E1 修正对 ship-on-write 的理解、剔除 E2 的无出处规则、补上三旋钮，然后按 A0→A2 的顺序推进——**先修账再接线，最后上记分卡**。M1（Verified rules 闭环）+ M2（评审防泄漏）是这次把关挖出的、豆包没给工作台的最大增量。

---

*核对方法：MD5 逐字比对 23 对文件；体积实测 30+ 文件；源码取证 system.ts / memory.ts / memory-verify.ts / production-marker.ts / strategy-v2.ts / od-next-strategy.ts / critique/rollout.ts / skills-protocol.md / prompt-composition.md；翻译版与原版开头对读抽查。*
