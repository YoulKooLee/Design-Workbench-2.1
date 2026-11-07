# 规则目录（rules）

本目录存放**产品/原型业务规范**（与 `.agents/rules/` 的 Agent 协作/工程规范分工，互不重叠）：

| 规则文件 | 用途 |
| --- | --- |
| `requirements-alignment-guide.md` | 需求对齐：原型主规格流程、确认门槛、双向同步 |
| `prototype-development-guide.md` | 原型开发与验收规范（`src/prototypes/`） |
| `prototype-review-guide.md` | 原型评审规范 |
| `review-common-guide.md` | 通用评审规范 |
| `ui-review-guide.md` | UI Review 结论规范（`.spec/ui-review.md`） |
| `theme-guide.md` / `theme-source-capture-guide.md` | 主题/设计系统构建与素材采集 |
| `resource-management-guide.md` | 项目资料/文档/资源/画布管理（`src/resources/`） |
| `axhub-make-global-settings.md` / `axure-*.md` / `v0-*.md` / `html-agent-capabilities.md` / `ai-studio-*.md` | 外部工具接入（Axure 导出 / v0 / AI Studio / HTML Agent） |
| `references/` | 上述规则的参考子文档 |

**分工约定**：
- `rules/`（本目录）＝ 产品/原型业务规则，产品与原型工作流按需读取；
- `.agents/rules/` ＝ Agent 协作与工程规则（agent-orchestration、git-workflow、prd-to-srs-gate、soft-gates 等），由 Hook 与主流程按需读取；
- `.agents/knowledge/` ＝ 编码/需求/设计/测试知识库（索引见 `.agents/knowledge/catalog.json`）。

> 新增规则文件时保持命名风格（`<领域>-guide.md`），并在上表补一行索引。
