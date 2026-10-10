# 导航地图（技能分组 + 知识库/规则/模板路径）

> 位置：`.agents/rules/nav-map.md` ｜ 读取层：按需 Read（要查技能归属、找规范文件时）
> 来源：自 `AGENTS.md` 「技能清单」「知识库速查」外迁（v2.1 瘦身，2026-10-10）。目的：让 `AGENTS.md` 整体落入宿主注入窗口（≤8.4K 字符），消除尾部章节不可见。

---

## 一、技能清单（15 技能 + common 工具库）

> **触发条件与用途以 `.agents/skills/INDEX.md` 为准**（会话开始主动 Read，见 AGENTS.md 说明），本节只给分组速记。严禁为查触发词遍历 Read 各 `SKILL.md`（遍历击穿上下文）。INDEX 缺失或过期时运行 `node .agents/scripts/build-skills-index.mjs`。

**研发主链路** `feature-dev`（核心；旧名 `page-generator`）· `delivery-plan` · `feature-list`

**文档三件套** `srs-writer`（研发真源，含 Step F PRD→SRS 转写；旧名 `req-doc`）· `hld-design` · `lld-design`

**需求对齐** `brainstorming` · `prd-writer`（仅上游只给 PRD 需转写、或研发期补轻量 PRD）

**质量与收尾** `test-driven-development` · `systematic-debugging` · `verification-before-completion` · `finishing-branch`

**辅助** `diagram-generator` · `slides` · `common`（Word 导出）· `skill-creator`

**已剥离，不在本包、勿调用**：原型生成类（`frontend-design`、`annotation`）、原型逆向与可研类（`prototype-to-prd`、`feasibility-report`）、产品管理类（`pm-*` 共 13 个）。归档于 `08-文档/2.1更新文档/admin剥离存档/`，需要时转 `_project-template`。

**需求文档路由**（三者怎么选）：Read `.agents/rules/req-doc-routing.md`。速记：未点名文档类型的想法 → `brainstorming`；研发交付 → `srs-writer`；明确产品探索 → `prd-writer`；只有 PRD 要开发 → `srs-writer` Step F。

---

## 二、知识库与工程件速查（路径省略 `.agents/` 前缀）

另有 `scripts/`（`build-skills-index.mjs`）、`adapters/`（Cursor / Claude Code 薄接线）、`commands/`（review / verify / finish）、`settings.json`（Hook 配置**唯一真源**）。

| 域 | 路径 |
| --- | --- |
| **转换与编码** | `knowledge/conventions/react-to-vue.md`（写页面必读）、`coding.md`、`frontend.md`、`security.md`、`testing.md`、`debugging.md`、`verification.md`、`git.md`、`mock.md`、`typescript.md` |
| **UI 库** | `knowledge/ui-libs/README.md` → `element-plus/`（多栈按 package.json 只加载对应一套） |
| **文档规范** | `knowledge/phase1-requirements/prd-language.md`、`section-format.md`；`phase2-design/hld-spec.md`、`lld-spec.md`；索引 `knowledge/catalog.json` |
| **工作流规则** | `rules/req-doc-routing.md`（需求文档路由）、`context-assembly.md`（装配协议）、`compaction-recovery.md`（压缩恢复）、`prd-to-srs-gate.md`（转写门禁）、`delivery-and-hooks.md`（交付模式与 Hook）、`agent-runtime.md`、`role-dispatch.md`、`soft-gates.md`、`ade-compat.md`、`nav-map.md`（本文件） |
| **模板** | `templates/交接清单模板.md`、`README-DEV.template.md`、`project-init.md`、`PACKAGING.md` |
