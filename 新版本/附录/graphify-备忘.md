# graphify 备忘（暂不引入）

> 归档：qwen ｜ 2026-11-05 ｜ 本地：`graphify-0.9.102\`（PyPI 官方 sdist，764 文件 / 12.4 MB）
> 上游：GitHub Graphify-Labs/graphify（142.6k★，YC S26，活跃，日提交）｜ **许可：Apache-2.0 + MIT 双许可（LICENSE / LICENSE-MIT 两份原文均已核）**
> ⚠️ GitHub 直连被本地网络重置，本归档走 PyPI（包名 **graphifyy 双 y**，官方 README 明示其他 graphify* 均非官方）。sdist 不含 ARCHITECTURE.md / docs/，要研究 extractor 扩展接口时再换网络补拉。

## 是什么

把代码库（含文档/PDF/图片/视频）本地解析成可查询知识图谱的 CLI + AI 助手技能：tree-sitter 确定性 AST 提取（代码零 LLM 零出网）、每条边标 EXTRACTED/INFERRED、产出 graph.json + graph.html + GRAPH_REPORT.md，之后 query/path/explain/affected 查图代替翻文件。

## 本机实测（2026-11-05，指标管理平台 69 文件副本）

| 项 | 结果 |
|---|---|
| Windows ARM64 兼容 | ✓ 过关，uvx 31 包 1.24s 装完，无编译 |
| 建图（`graphify update src`，纯 AST 零 API） | ✓ 63 文件 / 4 秒 / 656 节点 1527 边 23 社区 |
| TSX 符号解析质量 | 好：`affected Pagination()` 列出 15 个页面调用点，带文件行号、EXTRACTED 标签 |
| **字符串契约（pageKey/MENUS/route 里的 `'topic-library'`）** | **不建节点**，`affected` exit 4——而"删页面要盘 12 处"恰是本工作区原型工程的高频返工点 |

## 为什么暂不引入（判据，防等下次被文章重新种草）

1. 原型工程引用以**字符串契约**存在，AST 符号图打不中这个痛点；grep 带引号字面量 3 文件 14 处即秒出，30 行独立脚本可解，不必养一张会过期的图。
2. 价值判据 = **仓库内符号级引用（import/call）的密度** × 智能体接力频次。现工程两个变量都低。
3. 改造可补盲区（.graphifyrc 只配语言映射，无字符串提取开关；正路是给 extractor 层写插件，官方 ARCHITECTURE.md 教扩展、欢迎 worked examples），但那是正经开发项目 + 追快迭代上游，性价比不成立。

## 值得记的机制（若将来引入，这些是卖点）

- `graphify install --platform codebuddy`：官方支持 CodeBuddy（CODEBUDDY.md + PreToolUse hook）；Claude Code 有 `--strict`——**未先查图就拒 Read/Grep**，正是我们想手搓的强制通道，别自造轮子
- `watch` extra + `hook install`（post-commit/checkout）自动重建 → 解决"图变旧"风险
- extras：`sql`/`postgres`（schema 入图）、`chinese`（jieba 查询分词）、`ollama`（全本地语义提取）
- 隐私：零遥测无分析；但**每次 query/path/explain 会记到 `~/.cache/graphify-queries.log`**（JSONL，可 `GRAPHIFY_QUERY_LOG_DISABLE=1` 关）——备忘里记一笔，别到时候以为完全无痕
- 云版（跨仓/常驻/形式化验证）闭源收费，与本地 CLI 无关

## 引入触发条件（满足再回头看）

1. admin/真后端长大：Vue 组件、utils 封装、服务调用链形成符号依赖网，智能体接力改 bug 频繁
2. 若只想治"删契约漏点"：先写 30 行契约穷举脚本（grep 带引号 pageKey + 对照 PageKey 类型差集）并入家规 §4.6，图化不急

## 复用命令（本机验证过）

```
uvx --from graphifyy graphify update <目录>          # 零 LLM 建图
uvx --from graphifyy graphify affected "符号" --graph <out>/graph.json
uvx --from graphifyy graphify explain "符号"
```

---

> **2026-11-06 追记**：后续评估了 CodeGraph（colbymchenry/codegraph，见同目录 `codegraph-备忘.md`），与本项目痛点（跨文件字符串契约、MCP 自动接线、win-arm64 原生构建、免 Python）匹配度更高。**下次实测对象为 CodeGraph，本归档降级为对照参考。**
