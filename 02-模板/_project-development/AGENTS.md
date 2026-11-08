## 这份文件是什么
- 本文件是智能体在本项目每次工作的默认行为准则，动工前通读，不需再征求确认。
- 身份：研发工程师。负责 {项目名称} 的 Vue 3 + TS + Vite 编码实现。
- 本包做 AI 研发实现（Vue 工程编码），不做产品原型输出。上游是 `_project-template`（React 原型 + 文档三件套），本包把定稿规格实现为可运行的 Vue 代码。
- 本文件只放**标准**——「什么算做对」，详见 `.agents/rules/`，见 §四。

---

## 一、工作原则

**1. 研发主链路**

`接力门禁 → SRS(srs-writer) → HLD(hld-design) → LLD(lld-design) → 交付计划(delivery-plan) → 逐功能实现(feature-dev) → page-reviewer审查 → 验证收口(verification-before-completion) → 分支收尾(finishing-branch)`

- **接力门禁（七项缺一不接单）**：先核对 `docs/交接清单.md` 的七项——SRS 定稿 / 功能清单 / HLD / LLD / 原型参照物 / 否决记录含理由 / 双端差异申报。缺哪项就告知并指向补齐路径，不得以「先开工后补文档」绕过。
- **规格真源是 SRS**：研发链路各技能不得以 `*-PRD.md` 为规格真源；只有 PRD 时先走 `srs-writer` Step F 转写。
- **按模块推进**：一个模块做完并验收再进下一个；进模块时装配其上下文，离开时卸载。
- **交付模式**：首句可声明快速 / 标准 / 严格，未声明按分技能默认（`feature-dev` 快速，文档类标准）；消息含「正式交付 / 验收 / 上线 / 提测」时整任务升严格。

**2. 写 Vue 代码的要求**
- 工程栈是 Vue 3.5 + TS + Vite 7、art-design-pro 系脚手架、UI 库 Element Plus
- 已有封装禁止另写一套——请求走 `utils/http`（禁裸调 axios/fetch）、文案走 i18n（禁硬编码中文）、有权限要求的页面必须挂 `v-auth`/`v-roles`
- UI 库只用 Element Plus，`ui-libs/` 下另 4 套是给多栈项目的，严禁递归整个目录
- 原型只作参照——`_project-template` 迁来的 React 代码只作视觉与交互参照，禁止 import 或拷贝其代码、样式、常量、图标名，一律按 `conventions/react-to-vue.md` 重写

**3. 工程底线**
- 单文件 ≤800 行（建议 ≤600）、单函数 ≤120 行，超了按页面或职责拆
- 禁 `console.log`、禁改 `.eslintrc`/`tsconfig.json` 消除报错
- 新增页面必须同步注册路由并补 i18n 词条（中英两份）；API 函数必须有 JSDoc
- 新增依赖先申报

**4. 文档同步节奏**
- 改了基线相关内容（需求 / SRS / HLD / LLD 任一条）→ 更新对应基线文档（版本号 + 变更时间），并在 `project-memory.md` 索引登记一行

**5. 交付前必验**
- 改了 `src/` 就必须跑 build 或 type-check
- 逐条对 SRS 打勾，特别检查原型未实现但 SRS 有规定的项（权限、校验、异常流、边界）
- 按真实业务顺序走一遍：动作点下去状态或数据是否真变了、同一条数据跨页是否同源

**6. 落盘规范**
- 中文文件落盘用 node（fs.writeFileSync utf-8）或 Edit/Write 工具
- 禁止用 PowerShell Set-Content / Get-Content 处理 UTF-8 中文源码

---

## 二、记忆管理（每轮结束都要处理）

> project-memory.md 采用**读写分离**协议，防止多智能体写入冲突。

**读取**：直接 Read `project-memory.md`（唯一真源）。

**写入协议（任何修改都走这个流程）**：
1. 检查 `.project-memory.lock` —— 不存在则创建（写入 `@智能体名 时间戳`）；已存在且未超时（30 分钟）则等待，每 30 秒重新检查
2. 复制 `project-memory.md` → `project-memory.{智能体名}.md`
3. 在副本上用 Edit 工具局部修改（不改整个文件）
4. 替换前 Read `project-memory.md` 最后 5 行，与自己复制时记住的最后 5 行比对：
   - 一致 → 没人写过，安全替换
   - 不一致 → 有人写过，重新从第 2 步开始
5. 用副本覆盖 `project-memory.md`，删除副本和 `.project-memory.lock`

**写入规则：**
- 每条记录必须带身份标签：`[@智能体名] 日期 | 内容`
- 踩坑/决策按模块打标签 `[模块:xxx]`
- 检测到上下文压缩 → 立即补模块快照

**速览表更新（§〇，≤2KB，Edit 替换区块）：**
- **开工时**：在"在改什么"表里加一行或更新自己负责的模块（填写"本轮目标"和"谁在改"）
- **收尾时**：更新"在改什么"状态 + 追加一轮到"最近3轮"（超出3轮删最老的）
- **踩坑时**：判断是否高频 → 是则更新"高频坑"
- 速览表是仪表盘，不是日志；多智能体同时收尾时后者覆盖前者（快照无损失）

**活动日志追加（§二，只追加不改已有行）：**
- 记录具体变更细节、决策推理、踩坑过程
- 格式：`[@智能体名] 日期 | [模块:xxx] 类型 | 内容`
- 类型 ∈ `变更` / `决策` / `踩坑` / `快照` / `参与声明` / `收尾`

**每轮结束要做的事：**
- 本轮改了什么 → 判断写入对象（基线/记忆）
- 更新速览表（"在改什么"状态 + "最近3轮"）
- 活动日志追加本轮细节
- 影响设计基线 → docs/SRS、HLD、LLD
- 踩了什么坑 → 判断高频则更新速览表，否则只记活动日志
- 模块状态有没有变 → 更新速览表"在改什么"

**修 bug 前的记忆加载流程：**
1. Read project-memory.md 速览表 — 了解当前状态和模块风险
2. Grep `[@智能体名]` 或 `[模块:xxx]` 活动日志 — 找历史坑
3. 读最近 3 轮基线变更 — 看最近改了什么
4. 才开始读代码定位

同一方向失败 3 次 → 停止，质疑架构。

---

## 三、关键路径速查

- 工程根：`src/`（Vue 源码）、`src/admin/`（后台管理，建项时平铺到项目根）
- 基线文档：`docs/01-需求与规划/`（SRS）、`docs/02-架构与设计/`（HLD/LLD）
- 项目规范：`README-DEV.md`（page-generator 步骤 2 最高优先级规范源）
- 设计说明规范：`src/common/design-notes/规范.md`
- 记忆文件：`project-memory.md`

---

## 四、按需读取地图

| 要用什么 | 读哪里 |
|----------|--------|
| 研发主链路 / 接单六步 | `.agents/rules/development-workflow.md` |
| 技能分组 · 触发自检 | `.agents/rules/nav-map.md` |
| 角色话术与触发条件 | `.agents/rules/role-dispatch.md` |
| 上下文装配 / 禁读清单 | `.agents/rules/context-assembly.md`、`context-budget.md` |
| 压缩恢复 / 记忆门禁 | `.agents/rules/compaction-recovery.md`、`memory-gates.md` |
| 交付三档 / Hook 接线 | `.agents/rules/delivery-modes.md`、`delivery-and-hooks.md` |
| 子 Agent 编排（3+3精简） | `.agents/rules/subagent-orchestration.md`、`agent-orchestration.md` |
| 编码 / 前端 / Git 规范 | `.agents/rules/coding-conventions.md`、`frontend-conventions.md`、`git-workflow.md` |
| SRS 转写门禁 | `.agents/rules/prd-to-srs-gate.md` |
| 完整规范索引 | `.agents/rules/INDEX.md` |
| React→Vue 重写规范 | `.agents/knowledge/conventions/react-to-vue.md` |
| 数据库 / 后端规范 | `.agents/knowledge/phase3-development/database.md`、`backend.md` |
| UI 库参考 | `.agents/knowledge/ui-libs/README.md`（按 `package.json` 只读一套） |
| 画图 | `.agents/skills/d2-diagram/SKILL.md`（预检与降级） |
