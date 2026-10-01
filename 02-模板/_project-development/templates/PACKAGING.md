# Vibepm Dev Agent  · 最小交付清单

本文说明**不含前端脚手架（无 admin/）**时的 vibepm-dev-agent 交付内容。用户自行创建 Vue / React 等前端项目后，将 vibepm-dev-agent 接入即可使用 AI 工作流。

## 交付目录结构

```
vibepm-dev-agent/
├── .agents/                      # 通用核 + 可选增强
│   ├── skills / agents / knowledge / rules
│   ├── hooks/                    # L2：策略脚本（接入可选）
│   └── adapters/                 # L3：Claude / Cursor 薄接线；Cline 见 other-ade.md
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

## 通用核 vs 可选增强

| 层 | 内容 | 承诺 |
| --- | --- | --- |
| **通用核（L0+L1）** | `AGENTS.md` + `.agents/skills` / `agents` / `knowledge` / `rules` | 任意能读 `AGENTS.md` / Skills 的 ADE 可跑通主交付链路 |
| **可选增强（L2）** | `.agents/hooks/*.cjs`、`run.cjs` | 同一套策略脚本 |
| **可选增强（L3）** | `.agents/adapters/` | 按需复制到项目 `.claude/` / `.cursor/` 接到具体 IDE；未复制 ≠ 工作流不可用 |

未接入 Hook 时按 `.agents/rules/agent-runtime.md` 降级表与 `soft-gates.md` 用软约束执行，**不等于工作流不可用**。禁止承诺各 IDE 硬门禁等价。接线步骤见 `.agents/adapters/README.md`。

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
├── admin/                 # PROJECT_PATH（Vibe Design Pro，Vue + Arco，可选 Starter）
│   ├── README-DEV.md
│   ├── package.json
│   └── src/
├── element-plus/          # PROJECT_PATH（Vue + Element Plus，可选 Starter）
│   ├── README-DEV.md
│   ├── package.json
│   └── src/
├── ant-design-pro/        # PROJECT_PATH（React + Umi Max + antd Pro，可选 Starter）
│   ├── README-DEV.md
│   ├── package.json
│   └── src/
├── shadcn/                # PROJECT_PATH（React + shadcn/ui，可选 Starter）
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
- [ ] 至少保留 1 个列表页作为 `feature-dev` 风格参考（可选但强烈建议）
- [ ] 可选：按 `.agents/adapters/README.md` 复制对应薄接线（Claude → `.claude/settings.json`，Cursor → `.cursor/hooks.json`）
- [ ] 可选（Cline）：按 `.agents/adapters/other-ade.md` 联接 `.cline/skills` → `.agents/skills`，不要拷贝技能目录

## 与 Starter 的关系

| 交付物 | 定位 |
| --- | --- |
| **vibepm-dev-agent**（本文） | AI 工作流 + 知识库，框架无关 |
| **Starter**（如 `admin/`、`element-plus/`、`ant-design-pro/`、`shadcn/`） | 可选参考实现，开箱即用；`admin/` 对照 `frame/admin` 母版，其余 Starter 独立规范 |

vibepm-dev-agent 可单独交付；Starter 作为增值示例，不捆绑在 vibepm-dev-agent 内。
