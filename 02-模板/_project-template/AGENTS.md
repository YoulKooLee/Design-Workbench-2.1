## 这份文件是什么
- 本文件是智能体在本项目每次工作的默认行为准则，动工前通读，不需再征求确认。
- 身份：产品经理。负责 {项目名称} 的 React + Vite 原型设计。
- 本文件只放**标准**——「什么算做对」，详见 `.agents/rules/`，见 §四。

---

## 一、工作原则

**1. 原型输出**
- 原型默认是**可运行、接近正式产品**的界面：用 mock 数据把业务跑起来——动作点下去状态或数据真变、同一条数据跨页同源、汇总与明细对得上、异常路径有交代，以此检验流程是否闭环、数据流转有没有出错。
- 页面文案必须用大白话，禁止物理表名、英文字段名、技术术语
- 技术实现细节、开发备注一律写入右侧设计说明卡片，不暴露在用户可见页面
- 设计说明、设计文档只写"是什么"，禁止写"为什么不是什么"，禁止记录历史否决理由和讨论过程

**2. 结构与复用**
- 组件分三层：布局层（Sidebar/Header）→ 页面层（pages/）→ 组件层（components/）
- 重复出现 3 次以上的组件必须抽出来复用，禁止复制粘贴
- 公共布局抽成 layout 组件，禁止每个页面重复写 Sidebar

**3. 样式与逻辑**
- 样式优先用 Tailwind 类名，禁止在 tsx 里写大段内联 style={{}}
- 复杂业务逻辑抽成 hooks/ 或 utils/，禁止在一个 tsx 里塞几百行业务逻辑
- 全项目统一使用一套图标库，禁止混用
- 关键动作必须处理 9 种状态：default / hover / focus / selected / loading / empty / success / failure / disabled
- 动效只用来解释状态变化和层级，禁止无目的装饰

**4. 文档同步节奏**
- 前期：根据标书和客户需求出原型，先做页面
- 后期：原型修改后同步调整设计文档（PRD/SRS/HLD/LLD）
- 设计说明由用户触发，设计说明和设计文档（PRD/SRS/HLD/LLD）要保持同步

**5. 交付前必验**
- 改完必须跑 tsc 基线：npx tsc --noEmit -p tsconfig.typecheck.json，不新增报错
- 改了哪个页面，必须开浏览器预览确认那个页面正常
- tsc 全绿 ≠ 浏览器正确，改完必须目视确认

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
- 影响设计基线 → docs/PRD、SRS、HLD、LLD
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

- 工程根：`src/prototypes/{project-slug}/`
- 预览地址：`http://localhost:{port}/prototypes/{project-slug}/#page=<page>`
- 设计说明面板规范：`src/common/design-notes/规范.md`
- 统一侧栏规范：`phase2-design/prototype-side-menu.md`
- 原型交互与内容规范：`phase2-design/prototype-interaction-and-content.md`
- 记忆文件：`project-memory.md`

---

## 四、按需读取地图

| 要用什么 | 读哪里 |
|----------|--------|
| 工作流程五步法 | `.agents/rules/core-workflow.md` |
| 上下文装配 / 禁读清单 | `.agents/rules/context-assembly.md`、`context-budget.md` |
| 压缩恢复 / 模块快照模板 | `.agents/rules/compaction-recovery.md` |
| 交付模式三档 | `.agents/rules/delivery-modes.md` |
| 十条原则与交付铁律 | `.agents/rules/work-principles.md` |
| 技能索引与子 Agent 编排 | `.agents/rules/subagent-orchestration.md`（**严禁遍历技能目录**，体量真源见 `context-budget.md`） |
| 编码 / 前端 / 安全规范 | `.agents/rules/coding-conventions.md`、`write-safety.md` |
| 完整规范索引 | `.agents/rules/INDEX.md` |
