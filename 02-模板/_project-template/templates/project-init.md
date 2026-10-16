# 前端项目初始化指南

在已复制 vibepm-dev-agent（`.agents/` + `AGENTS.md`）的前提下，按本文创建前端子项目并接入 `page-generator`。

---

## 第 0 步：工程包初始化与工作纪律（复制工程包后**先做这一步**）

### 0.1 重写 `AGENTS.md` 的「本工程独有的事实」

模板里 §一「本工程独有的事实」与 §三「基线落盘路径」都是**示例**，必须**逐条按项目实际重写**——目录层、构建命令、真源文件、载体形态。
**尤其注意 `docs/` 布局**：模板按 `docs/01-需求与规划/` 分目录写，但**很多在用项目的 `docs/` 是扁平的**（如 `docs/2026-09-08-XX-PRD.md`），照抄会写出不存在的路径。
**宁可留空或标「待核」，也不要沿用示例事实。** 核对来源优先序：项目 `project-memory.md` §一 > 实际目录树 > 项目 `README` / `docs`。

> 实证代价（2026-10-15）：某项目迁移时沿用了模板事实表，结果写出**一个不存在的 `admin/`**，同时**漏掉真正的 Electron 载体 `desktop/`**——文档可信度下降，且真实工作层失去约束与路径索引。

### 0.2 写纪律时必守：触发条件必须「当下可观测」

- ❌ **反例**：「若你发现本文件不在上下文 → 主动 Read 一次本文件」——**自举悖论**：指令写在它要求重读的那个文件里，文件被驱逐时指令一起消失，**条件永远观测不到**。
- ✅ **正例**：「**要写页面时** → 读 `conventions/react-to-vue.md`」——触发条件来自**当前任务**，而任务永远在上下文里。
- **判据**：触发条件必须是**动作**（读到某行 / 要写某类文件 / 要跑构建），**不能是记忆**（发现某东西不在、想起某规则）。依赖记忆的规则会随记忆一起衰减。

### 0.3 `AGENTS.md` 只放两类内容

**执行规则 + 工作铁律。** 以下一律不写进去：

- 纠错记录（曾经误配成某物、某表述已作废、历史误配）
- 实测过程与日期痕迹、对话结论、一次性测试数据
- 任何形式的「请去改别的文件」的待办指令（**该直接改完，不要留成规则**）

这些内容各有其位：**项目经验 / 决策记录** → 项目根 `project-memory.md`（过程层）；**规范正文与「为什么」** → `.agents/rules/`、`.agents/knowledge/`；**本文件自身的维护须知** → 本文档。

### 0.4 上限与形态

- `AGENTS.md` **≤ 8,000 字符**（宿主注入窗口实测约 8.4K 字符，**超窗尾部不会被模型看到**）。
- 正确形态：**只放「触发条件 → 读哪个文件」的路由 + 铁律，正文一律外置**——目标是**按需装载**，不是把内容压进窗口「塞得下就行」。

### 0.5 持续约束只有三个可靠落点

`AGENTS.md` 只在**会话首轮注入一次**，压缩**不会**把它带回来——故它**不承担持续约束**。真正能持续的只有：

| # | 落点 | 为什么 |
|---|---|---|
| ① | **构建命令 / git hook / CI** | 模型绕不过去，**唯一真强制** |
| ② | **用户的固定开场话术** | 压缩**保留用户消息原文**，故一句开场话比写进文档有效 |
| ③ | **`project-memory.md` 顶部** | 工程侧每轮都会被维护 / 回读的兜底位；提醒须写成**动作触发**（读到本行 → 顺手确认 `AGENTS.md` 是否还在） |

**配套**：**按模块 / 阶段新开会话**——唯一能让 `AGENTS.md` 重新注入的办法；结论**立刻落盘**（实测：压缩后**工具结果正文 99.5% 被丢弃**，只留「做了什么动作」）。

## 第 1 步：确定布局

| 模式 | 目录 | WORKSPACE_PATH | PROJECT_PATH |
|------|------|----------------|--------------|
| 单项目 | 根目录即前端 | 项目根 | 项目根 |
| 多子项目 | `admin/`、`mobile/` 并列 | 仓库根 | 各子目录 |

## 第 2 步：创建前端工程

以 **Vue 3 + Vite + TypeScript + Element Plus** 为例（其他 UI 库同理，安装对应依赖即可）：

```bash
# 在 WORKSPACE_PATH 下
pnpm create vite admin --template vue-ts
cd admin
pnpm install
pnpm add element-plus vue-router pinia axios
pnpm add -D unplugin-vue-components unplugin-auto-import
```

移动端示例：创建 `mobile/` 后安装 `vant` 而非 `element-plus`。

## 第 3 步：建立最小 src 结构

```
src/
├── api/
├── mock/
├── router/
│   └── modules/
│       └── index.ts       # 导出 routeModules 数组
├── types/
├── utils/
│   └── http/              # HTTP 封装（request.get/post 等）
├── views/
│   └── index/             # 布局壳页面（若有后台布局）
├── App.vue
└── main.ts
```

**最低要求**：存在 `package.json`、`src/`、可运行的 `pnpm dev`。

## 第 4 步：编写 README-DEV.md

```bash
# 在 PROJECT_PATH 下
cp ../templates/README-DEV.template.md ./README-DEV.md
```

编辑 `README-DEV.md`，填写文首「项目配置」表格中的所有占位项。  
这是 `page-spec-loader` 的**最高优先级**规范来源，不可省略。

## 第 5 步：配置 Mock（推荐）

在 `{PROJECT_PATH}/.env` 中：

```bash
VITE_USE_MOCK = true
VITE_PORT = 3006
```

按 README-DEV.md 中的 Mock 规范实现 `src/mock/` 与 API 层 `USE_MOCK` 判断。

## 第 6 步：准备 docs（若要写 SRS / 用 page-generator）

在工作区根目录：

```bash
mkdir -p docs/01-需求与规划
```

参见 [docs-structure.md](./docs-structure.md)。

## 第 7 步：验证

```bash
cd {PROJECT_PATH}
pnpm dev          # 能启动
pnpm build        # 能构建（page-generator 收尾会执行）
```

## 第 8 步：开始 AI 生成页面

1. 用 `req-doc` 编写 SRS（或使用已有需求文档）
2. 触发 `page-generator`：「按照 SRS 实现 xxx 功能」
3. AI 将自动：
   - 选定 `PROJECT_PATH`
   - 读取 `{PROJECT_PATH}/README-DEV.md`
   - 按 `package.json` 匹配 UI 库知识库
   - 在 `{PROJECT_PATH}/src/` 下生成代码

## 常见问题

**Q: 没有 README-DEV.md 能生成吗？**  
A: 可以，但会退化为读 `.agents/knowledge/conventions/` 和扫现有代码推断，风格不稳定。**强烈建议始终维护 README-DEV.md**。

**Q: 没有任何已有页面能生成吗？**  
A: 可以，但缺少风格参考。建议至少手写或生成 1 个标准列表页供后续对齐。

**Q: UI 库不是 Element Plus？**  
A: 在 `package.json` 安装对应库（如 `vant`），`page-spec-loader` 会自动加载 `ui-libs/vant/` 规范。
