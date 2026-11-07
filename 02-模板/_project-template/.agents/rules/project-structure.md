# 项目结构与路径约定

> 位置：`.agents/rules/project-structure.md` ｜ 读取层：按需 Read
> 来源：自 `AGENTS.md` v09（2026-09-19）该章节**原文外移**，正文未改写。

```text
├── src/                       # Axhub 原型工程（React + Vite + Tailwind）
│   ├── common/                # 公共运行时、类型和工具
│   ├── preview-templates/     # 预览页 HTML 骨架（dev-template / spec-template）— 工程基建，勿改
│   ├── prototypes/            # 原型页面目录 ← 原型产出主战场
│   ├── resources/             # 项目资料、文档和素材
│   └── themes/                # 主题与设计规范
├── admin/                     # Vue3 + Element Plus 后台框架（page-generator 交付目标）
│   ├── src/                   # 源码（views/、api/、router/、store/ 等）
│   ├── scripts/               # 构建与清理脚本
│   ├── vite-plugins/          # 自定义 Vite 插件
│   ├── README-DEV.md          # 项目实现规范（单一事实来源）
│   └── package.json           # 包管理器统一用 pnpm ≥ 8.8.0
├── templates/                 # 接入模板
│   ├── README-DEV.template.md # 项目开发规范模板
│   ├── project-init.md        # 初始化步骤
│   ├── docs-structure.md      # 文档目录结构
│   └── PACKAGING.md           # 打包说明
├── rules/                     # 产品/原型业务规范（与 .agents/rules/ 的协作工程规范分工，详见 rules/README.md）
├── vite-plugins/              # 原型工程 Vite 插件集（Make 协作/预览/HMR/IIFE）— 工程基建，勿改
├── scripts/                   # 工程脚本（主题捕获、入口扫描、metadata 同步等）— 工程基建，勿改
├── .agents/                   # Agent 编排配置
│   ├── agents/                # 3 个审查者子 Agent 定义（design-reviewer、design-note-reviewer、page-reviewer；3+3 精简版 2026-11-08）
│   ├── skills/                # 51 个工作流技能 + common/ 共享脚本（按触发词自动匹配）
│   ├── rules/                 # 工作流铁律（子 Agent 调度、Git 流程等）
│   ├── hooks/                 # Hook 脚本（GateGuard、审查提醒等）
│   ├── knowledge/             # 分阶段知识库（需求/设计/开发/测试 + UI 库参考）
│   ├── hooks.json             # 钩子配置
│   └── settings.json          # Agent 设置
├── .claude/skills/            # Claude Code 技能镜像（唯一真源 = .agents/skills/；新增技能须同步两处）
├── .axhub/make/               # 本地运行数据和项目 metadata
├── .style/                    # 预设主题样式库（9 套）
└── .workbuddy/                # WorkBuddy 工作区数据（项目记忆，运行时生成）
```

### 路径约定

所有内部引用统一使用 `.agents/` 前缀：

|资源类型|路径格式|
|-|-|
|知识库|`.agents/knowledge/{category}.md`|
|技能|`.agents/skills/{name}/SKILL.md`|
|子 Agent|`.agents/agents/{name}.md`|
|工作流规则|`.agents/rules/*.md`|

---
