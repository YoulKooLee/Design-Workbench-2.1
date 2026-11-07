# 跨项目长期记忆

## 工作铁律（2026-09-11 用户指令，永久生效）

- **完成任务后必须验证成果，验证过才许汇报"完成"。** 不许只跑完写入就报成功。
- 验证手段按成果类型选，至少走一条：
  - **在线文档/表格**：① API 回读（如 `get_dimension_size` 回读列宽）；② `manage.export_file` 导出回 xlsx 用 openpyxl 核对（列宽/合并/表头）；③ 浏览器打开截图亲眼看（登录墙时会失败，用 ①② 兜底）。
  - **本地文件/网页原型**：像豆包一样**截图看成果**（headless Chrome `--screenshot` 或 agent-browser），肉眼确认渲染正确。
  - **代码**：跑测试/构建，看真实输出。
- 反面教材（2026-09-11）：腾讯文档模板交付时没验证，列宽单位传错（像素列被当字符数，14→竖排字），被用户截图当场抓包。
- 用户原话要点：学豆包，"每次完成原型都知道截图看下成果"。

## 多智能体协作通信约定（2026-08-24 起，2026-08-26 升级 v0.2.1）

- **通信目录已迁移（2026-09-13 确认）**：`共享信息目录` 整体迁入 `产品设计工作台\09-协作\`（messages/rooms/agents/docs 结构不变）。每次会话开始先检查 `09-协作\messages\inbox\workbuddy\` 未读消息并处理。
- 通信协议见该目录 `messages/README.md` 与 `MESSAGE_FORMAT.md`（**v0.2.1**，JSON 消息）；参与者：CodeBuddy / WorkBuddy / DeepSeek Harness / 豆包；用户是最终仲裁者。
- 发消息：JSON 文件写入对方 `messages/inbox/<对方>/`，并在 `messages/outbox/workbuddy/` 留不可变副本；工具在 `messages/tools/`（node 实现，中文路径安全）；优先用 `msg-cli.mjs reply`（自动继承 thread_id + 自动标 replied）。
- **v0.2.1 状态主动标记**：读到消息把自己 inbox 副本 status 改 read；回复后改 replied；只改自己 inbox 副本，不动他人 inbox 与发送方 outbox；task/handoff 走 pending → done / aborted 执行闸门。
- **v0.2.1 标题规范**：thread_id 用 kebab-case（≤40 字符），同一主题多轮沿用同一 thread_id；任务名以线程内用户发起的 task/question subject 为准；面板显示 T{编号}｜{任务名}。
- 原则：用户是最终仲裁者；交接必带推理注释；不修改他人 inbox 中的既有文件；同一任务转交超过 2 次强制交用户仲裁；网页版智能体由用户当信使。
- **通信协调牵头人 = 豆包（2026-08-26 用户指令）**：多智能体通信任务整体交给豆包负责；WorkBuddy 后续若有问题/需协调，消息发往豆包（to: doubao）并抄送用户（cc: user），用户在通信面板查看。会话开始检查 workbuddy inbox、用户为最终仲裁者等原则不变。
- **msg-cli 踩坑**：原消息文件名与 message_id 不一致时（user 消息常见），reply 找不到原文件 → thread_id 回退为 message_id、原消息不自动标 replied，需手动修正。CLI 头注释的 ack 子命令未实现。`send` 的 `--type` 只接受 `question/task/handoff/info/ack/request_review/correction`（写 `feedback` 会报错）；`--action` 自由填写（如 `schedule_planned_fixes`）。
- **文件编码规范 v1.1（2026-09-17 豆包发布，WorkBuddy 与 CodeBuddy 双路实证后定稿）**：`.cmd/.bat/.ps1` **要** UTF-8 带 BOM；`.json/.jsonl/.md/.ts/.tsx` 等数据/文本文件**必须 UTF-8 无 BOM**（`JSON.parse` 不认 BOM，曾是"消息总线漏消息"级缺陷根因）。写 JSON 用 node fs 或编辑器默认，**禁用 PowerShell 5.1 `Out-File -Encoding UTF8`**（会写 BOM）。msg-cli v2.2 起已内置 `readJSON()` 去 BOM 兜底。
- **工作规范**：遵守 `共享信息目录\working-conventions.md`（文件先询问再创建/分类存放/用完即删/破坏先备份/永不删 lock；先沟通确认再动手；全页合规 ReviewPass）。
- **共享信息目录维护权 = 豆包（2026-09-05 用户新规）**：
  - `C:\Users\游翔\Documents\AI work\共享信息目录` 由豆包统一维护；WorkBuddy **不要两边同时修改**。
  - 合规通道（仍是协议允许）：① `msg-cli send` 写新消息副本到对方 inbox（双副本原则允许）；② `msg-cli reply` 自动副作用（标 read/replied + 写 to/cc + 发件 outbox）；③ `room-cli` 官方命令（说/板/交接/产物），但不支持 `--body-file` 是已知工程缺陷。
  - **禁用通道**：自写 helper / node -e 等绕过 room-cli / msg-cli 直接编辑 `messages/`、`rooms/`、`docs/`、`agents/<别人>/`、根 `README.md`/`MESSAGE_FORMAT.md`/`trigger-routing.md` 等共享维护文件——修改意见统一反馈给豆包（`messages/inbox/doubao/`）由其合入。
  - **WorkBuddy 私有目录例外**：`agents/workbuddy/` 与本会话工作区 `.workbuddy/memory/` 是自己的工作区，可自由读写。
  - **自审踩坑（2026-09-05 20:50）**：本会话曾在 20:34-20:42 期间用自写 helper 写房间 `messages.jsonl` 和白板 `00-任务说明.md` 几次（已通过 msg-cli send correction 反馈给豆包，建议方案 A 维持现状）。新规后任何此类操作必须先 feedback 再等批复。
- **共享组件库（03-组件库/03-页面组件/Codebuddy Design）并发写入纪律（2026-09-19 豆包裁定）**：
  - **写入权按分类切分**：WorkBuddy = 订单/付款/触发器/CMS/工作流（已收尾冻结）；CodeBuddy = 页面模式。**非本方分类一律不碰**。
  - **登记文件同一时刻只有一个写入方**：`components.catalog.json`（唯一真源）、`sync-registry.mjs` 的**写回**模式、`gallery.html`/`README.md`/`提示词手册.md`/`选型映射.md` —— 交棒后不再动，只保留只读 `sync-registry.mjs --check` 作自检。收尾重生成由单一方以 catalog 为源统一执行，避免互相覆盖（该目录**不在 git 下**）。
  - **组件依赖装配 = 方案 B**：组件在 catalog 里声明 `components.*.extraDependencies`，由 `server.mjs` 新建工程时自动合并进项目 `package.json`（已有同包不覆盖）；**不要改模板直装**（会让所有新工程背上运行时）。
  - **避坑**：`componentCount` 是**嵌套字段**（`index.json` → `ends.<end>.frameworks.<fw>.componentCount`；`component-registry.json` → `componentTemplateLib.componentCount`），直读顶层会得 `undefined` 并误判为"字段丢失"。读登记/配置 JSON 先 dump 顶层键。
- **make「组件」页签落地契约（2026-09-19 实测）**：make 只扫 `<工程>/src/component-templates/` 的**顶层目录、不递归**；条目判定 = `顶层目录/index.tsx` 存在；预览 = iframe 加载 `components/<目录名>/index.html`。**判断页签有没有条目，直接读权威产物 `<工程>/.axhub/make/entries.json`**（keys 形如 `components/<目录名>`、`prototypes/<名>`），比推断可靠。典型坑：顶层放「分类」目录而下层才放 `index.tsx` → 页签 0 条目。
- **静态断链检测要排除字符串常量**：预览页/文档常把用法示例 `import { X } from "..."` 写进 `PROMPT` 字符串常量，宽松正则 `from\s+['"]([^'"]+)['"]` 会**成批误报**（本次误报 52 处）。正解：只匹配**行首**的 `^\s*(import|export)\b[^;]*?from\s+['"]`。

## Axhub 原型 / 大屏视觉规范约定

- **必须加载既定规范**：做 Axhub Make 原型或数据大屏前，先读取当前项目的 `.style/*.md` 视觉规范、`src/themes/` 主题 token、`rules/theme-guide.md` 验收指南；禁止直接自创配色。
- **来源优先级**：用户提供的参考图/Design.md > 项目 `.style/` 规范 > `src/themes/` 标准主题 > `rules/theme-guide.md` > 通用经验。
- **大屏默认倾向**：政府/医疗/卫生类数据大屏优先用亮色科技蓝或暗色科技蓝；SaaS 监控大屏可用暗色紫色科技感；潮流/社交类产品才考虑电光玻璃/霓虹风格。
- **已验证案例**：学校卫生监测大屏从深色草版（自创配色）重做为亮色医疗科技风（参考健康档案项目 + `.style/亮色科技蓝-style.md`），页面背景 `#f0f4f8`、白卡、医疗蓝 `#2563eb`、Inter/PingFang SC 字体、16px 圆角、轻投影。
- **禁忌**：TSX 文件 `/** ... */` JSDoc 块内禁止出现字面量 `*/`（含 JSX 注释 `{/* */}`），否则 Babel parser 提前闭合注释 → Vite 500。
- **两个 axhub 目录职责不可混用（2026-09-17 用户澄清，权威口径）**：
  - `src\component-templates\axhub\` = **原型页面组件**（页面里 import 的高频 UI 组件）→ 组件库唯一正确落点
  - `src\components\axhub\` = **Make 客户端工具组件**（原型批注、发送修改上下文给智能体等）→ **不可放原型组件**
  - 反面教材：我曾把"工程里两个 axhub 目录并存"判为"落地路径没统一"的硬伤，还建议统一到 `components/axhub` —— 判定与建议全错，已撤回。**教训：看到"两处都有/两处不一致"，先问清各自职责归属，再下"没统一"的结论，别急着报缺陷。**

## 组件库「组件页签」预览层（2026-09-22 实测确认）

- **三层位置别混**：`03-组件库/03-页面组件/<库名>/` = 库真源（**扁平** `<中文分类>/<Name>.tsx`，无 preview 页）；`02-模板/_project-template/src/component-templates/` = **make「组件」页签扫描目标**（`<分类>/index.tsx`+`index.html` 分类卡片网格 + `<分类>/<组件名>/{index.tsx,index.html,preview.tsx}`）；`01-项目/<项目>/…` = 建项目时的副本（旧项目曾定"不更新"）。→ **补 demo 改的是模板，不是 03-组件库**。
- **demo 缺口判据**：`preview.tsx` 的 `Demo()` 函数体内**无任何 JSX 属性**（`xxx=`）= 裸调用/占位，预览会走默认参数并常显示兜底文案「默认参数无法直接渲染该组件」。切片必须切到**下一个顶层 `function`** 为止，固定长度切片会溢进 `function App()` 导致**全部漏判**。
- **改导入行必须行内限定**：用 `/^import \{[^}]*\} from '\.\/index';$/m`；用 `[\s\S]*?` 会跨行吞掉 `createRoot`/`theme.css` 等中间导入行。
- **两个必踩坑**：①依赖例外组件（`工作流/WorkflowCanvas` 需 `@xyflow/react`，模板按设计不带）**不能静态导入**，否则 Vite 解析失败 → **整页白屏**（DemoBoundary 兜不住模块解析错误），须动态 `import()` + `.catch` 兜底提示；②同分类 ≠ 同模块 —— `PAYMENT_METHOD_PRESETS` 属 `付款/PaymentMethodPicker`，从 `付款/PaymentCashier` 的 `./index` 导入即白屏，**跨组件常量以 catalog 的 `exports` 字段为准**。
- **起 vite 必须用 x64 node**（本机 ARM）：managed `C:\Users\游翔\.workbuddy\binaries\node\versions\22.22.2-3\node.exe` 是 x64；`C:\Program Files\nodejs\node.exe` 是 arm64，用错会报 `Cannot find module @rollup/rollup-win32-arm64-msvc`。
- 详细可复用流程见技能 `axhub-component-preview-demo`（含无头实测三道判据：无报错 + 业务关键词断言 + 抽样截图肉眼验收）。
