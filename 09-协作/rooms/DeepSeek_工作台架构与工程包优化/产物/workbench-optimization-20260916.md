# 产品设计工作台 · 架构与工程包优化清单

> 提交：DeepSeek（session-e54b5286-569e-4027-9001-88e5e7c5fb00）
> 接收/修改：豆包
> 流程：豆包按本清单整改 → 改完 DeepSeek 复验

## 一、用户裁定（整改前必读，避免返工）

1. **跨目录读不可靠**：用户明确"多数情况都是我主动要求智能体才会跨目录读"。
   - 因此 `.agents` 内的**文本上下文**（规则/知识/技能 .md，实测约 1.2MB / 234 文件）**每项目复制是正确做法，保留不动**。
   - 不要改成"所有智能体跨目录读共享真源"。
2. 本清单真正要优化的是：**混进 `.agents` 的非上下文资产（vendor 8.4MB + impeccable 1.5MB）**，以及面板 / 上下文 / 运行时结构性缺陷。

## 二、优化点（按优先级）

### P0 · 上下文溢出防护（最高优先）

背景：全工程仅 AGENTS.md 一处文字警告"遍历会挤爆上下文"，无技术护栏。技能全文 ~400KB(≈11万 token) + 知识 210KB(≈7万 token) + rules 约 60万 token，一次误读目录即击穿上下文窗口。

- [ ] P0-1 `AGENTS.md` 41.6KB 超重（~1.4万 token），内含三张重复技能表（「技能清单」+「技能索引压缩版」+「同类技能裁决速查」），与运行时预加载的 description 构成三重冗余 → 收敛为一张表 + 指向预加载 description。
- [ ] P0-2 无 token 预算 / 加载守卫 → 加 token 预算 hook，或把知识库挂 MCP/检索层，或在 AGENTS.md 顶部加"上下文预算自检"硬提示。

### P1 · 工程包资产瘦身

- [ ] P1-1 `.agents/skills/*/assets/vendor/` 下 8.4MB（vue/vant/g2plot/fontawesome 等 .js/.css/.woff2/.svg/.html）是生成技能的**运行时素材**、非上下文 → 抽到 `03-组件库` 或全局 vendor 目录，生成技能运行时按需拷贝。
- [ ] P1-2 `rules/references/impeccable/` 内嵌 ~1.5MB 第三方工具（live-browser.js 350KB 等）→ 移出工程包。
- [ ] P1-3 `AGENTS.template.md` 41.6KB 是 AGENTS.md 全量副本 → 漂移风险，改为生成脚本或占位符（参考 CLAUDE.md 已用的占位做法）。

### P2 · 真源收敛

- [ ] P2-1 skills 三处重复：`.agents/skills/`(52) + `.claude/skills/`(13，全部与 .agents 同名) + `10-智能体记忆/skills/` → 明确唯一真源，其余改索引/入口。
- [ ] P2-2 Hook 双配置：`.agents/settings.json` 与 `.agents/hooks.json` 各一套，settings.json 里 10 段重复内联 `node -e` 命令 → 合并单配置，命令抽成脚本引用。
- [ ] P2-3 两层 rules 目录（模板根 `rules/` vs `.agents/rules/`）语义重叠 → 统一或加索引说明。

### P3 · 面板架构

- [ ] P3-1 `工作台面板/server.mjs` 123KB 单体，40+ 内联 `if(p==='/api/...')` 路由，无模块拆分、无测试 → 拆路由/服务/存储模块 + 补冒烟测试。

### P4 · 运行时

- [ ] P4-1 崂山国家实验室项目 node_modules 漂移到 npm（有 package-lock.json，261MB 真物理复制；模板规范 pnpm≥8.8）→ 迁回 pnpm，享受 store 硬链接去重。
- [ ] P4-2 全局单例 Make(53817) 跨项目共享，单点故障 + active 错位（004 已记录）→ 评估按项目隔离或加锁。

## 三、附：实测数据（供整改对照）

- `.agents` 拆解：文本上下文 1.2MB(234文件) + vendor 资源 8.4MB(88文件)。
- 各项目 node_modules：Vibase2.0 443.6MB(pnpm) / 崂山 261MB(npm) / 指标管理平台 156MB(pnpm) / 结构监测 0。
- 模板总体积 64.5MB；skills 双目录 .agents/skills 52 个 vs .claude/skills 13 个（13 个全同名）。
