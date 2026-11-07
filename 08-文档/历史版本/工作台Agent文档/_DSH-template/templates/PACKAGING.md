# Vibepm Dev Agent  · 最小交付清单

本文说明**不含前端脚手架（无 admin/）**时的 vibepm-dev-agent 交付内容。用户自行创建 Vue / React 等前端项目后，将 vibepm-dev-agent 接入即可使用 AI 工作流。

## 部署清单（从业务项目根目录视角）

将以下文件复制到业务项目根目录（2026-09-19 由 `AGENTS.md` 移入本文：部署属打包动作，项目设计执行时用不到）：

| 路径 | 必需 | 说明 |
| --- | --- | --- |
| `.agents/` | ✅ | 技能、Agent、知识库、规则、Hook 的完整配置 |
| `AGENTS.md` | ✅ | AI 代理工作指南（唯一正本；`AGENTS.template.md` 是其派生副本，见下） |
| `templates/` | 建议 | 接入模板：`README-DEV.template.md`、`project-init.md`、本文 |
| `README-DEV.md` | ✅ | 项目开发规范；从 `templates/README-DEV.template.md` 复制到各 `{PROJECT_PATH}/` 并填写 |
| `admin/` | 可选（建议） | Vue3 + Element Plus 后台框架；`page-generator` 的交付目标；不含 node_modules |
| `rules/` | 建议 | 原型开发、主题、Review 等工作规则 |
| `project-memory.md` | ✅ | 项目级记忆（项目画像 / 项目经验 / 结项状态）；项目专属要求记录于此，优先级最高 |

### AGENTS.md 与 AGENTS.template.md 的关系（重要，避免误改）

- **`AGENTS.md` 是唯一正本**。由产品设计工作台面板新建项目时，`工作台面板/server.mjs` 用 `fs.cpSync` 从 `02-模板/_project-template` **整体拷贝**（仅排除 `node_modules` 与 `.git`），项目初始即带 `AGENTS.md`。
- **不存在"由 template 再生成 AGENTS.md"的步骤。** `AGENTS.template.md` 由 `.agents/scripts/build-agents-template.mjs` 从 `AGENTS.md` **单向派生**（仅在标题后插入维护提醒 + `{{PROJECT_INFO_SECTION}}` 占位符，其余正文一致），定位接近**备份/占位参考**，不参与项目生成。
- 故：改 `AGENTS.md` 即刻对新项目生效；跑生成器同步 template 是**可选的收尾动作**（避免 template 成为过期副本误导后续维护者），不是生效前提。

## 交付目录结构

```
vibepm-dev-agent/
├── .agents/                      # 必需：技能、Agent、知识库、规则、Hook
├── AGENTS.md                     # 必需：AI 工作流入口
├── CHANGELOG.md                  # 建议：版本变更记录
├── docs/                         # 建议：空目录或示例 SRS 结构（见 templates/docs-structure.md）
└── templates/                    # 建议：接入模板
    ├── PACKAGING.md              # 本文件
    ├── project-init.md           # 项目初始化步骤
    ├── README-DEV.template.md    # 复制到子项目并重命名为 README-DEV.md
    └── docs-structure.md         # docs/ 目录建议
```

**不包含**：`admin/`、`mobile/` 等前端源码。如需参考实现，单独提供 Starter 仓库。

## 用户接入后的工作区结构

### 单前端项目（根目录即 PROJECT_PATH）

```
my-project/
├── .agents/
├── AGENTS.md
├── CHANGELOG.md
├── docs/
├── README-DEV.md          # 从 templates/README-DEV.template.md 复制并填写
├── package.json
├── src/
└── ...
```

此时 `WORKSPACE_PATH` = `PROJECT_PATH` = 项目根目录。

### 多前端子项目（推荐）

```
my-workspace/
├── .agents/
├── AGENTS.md
├── CHANGELOG.md
├── docs/
├── admin/                 # PROJECT_PATH（PC Vue + Element Plus，可选 Starter）
│   ├── README-DEV.md
│   ├── package.json
│   └── src/
├── shadcn/                # PROJECT_PATH（PC React + shadcn/ui，可选 Starter）
│   ├── README-DEV.md
│   ├── package.json
│   └── src/
└── mobile/                # PROJECT_PATH（移动端，可选）
    ├── README-DEV.md
    ├── package.json
    └── src/
```

此时 `WORKSPACE_PATH` = 仓库根；各子目录各自一份 `README-DEV.md`。

## 接入检查清单

- [ ] 复制 `.agents/`、`AGENTS.md` 到工作区根目录
- [ ] 创建或引入前端项目（含 `package.json` + `src/`）
- [ ] 将 `templates/README-DEV.template.md` 复制为 `{PROJECT_PATH}/README-DEV.md` 并填写占位项
- [ ] 创建 `docs/` 目录（写 SRS 时使用）
- [ ] 在 `{PROJECT_PATH}` 执行 `pnpm install` 与 `pnpm dev` 验证可运行
- [ ] 至少保留 1 个列表页作为 `page-generator` 风格参考（可选但强烈建议）

## 与 Starter 的关系

| 交付物 | 定位 |
| --- | --- |
| **vibepm-dev-agent**（本文） | AI 工作流 + 知识库，框架无关 |
| **Starter**（如 admin/） | 可选参考实现，开箱即用 |

vibepm-dev-agent 可单独交付；Starter 作为增值示例，不捆绑在 vibepm-dev-agent 内。
