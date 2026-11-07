---
文档类型: 交付验收（阶段 2a · 目标线层）
版本: V1.0
提交时间: 2026-10-07
提交方: CodeBuddy
依据: 千问《任务书·阶段2目标线层》V1.0 + 《剧情生成器架构方案》V1.1 §4 + 千问 2026-10-07 审阅放行（三决策拍板）
状态: 已实现 + 已自测，待千问复跑验收
---

# 阶段 2a 目标线层 · 交付验收

## 一、交付清单

| 文件 | 内容 | 行数/规模 |
|---|---|---|
| `backend/app/models/project_lib/goals.py` | **三张表**：`goal_lines` / `goal_stages` / `goal_conflicts` | 新建 |
| `backend/app/models/project_lib/__init__.py` | 注册进 `ProjectBase.metadata` 与建表模块清单 | +4 处 |
| `backend/app/services/goal_service.py` | 模板库（6 条 + 12 词）+ 三层 CRUD + 实例化 + 推进 + 窗口查询 | 新建 |
| `backend/app/api/routes/project_goals.py` | 15 个端点 | 新建 |
| `backend/app/main.py` | 路由注册 | +2 行 |
| `backend/tests/test_goal_lines.py` | 9 个测试（含 INV-17 / INV-18） | 新建 |
| `backend/tests/test_invariants.py` | 补表清单从 3 张扩到 6 张 | +4 行 |
| `frontend/src/api/client.ts` | 目标线类型 + `goalLines` / `goalConflicts` / `goals` 三组接口 | +165 行 |
| `frontend/src/components/GoalCards.tsx` | 目标线卡 + 冲突卡 + 两步向导 | 新建 |
| `frontend/src/pages/CharactersPage.tsx` | 挂两张卡（人设页内，导航不新增） | +12 行 |
| `frontend/src/pages/FrameworkPage.tsx` | 「本支柱待爆发冲突」只读视图 | +30 行 |
| `backend/logs/_diag21_goal_isolation.py` | 向后兼容自证脚本（四组对照，你可直跑） | 新建 |

DDL 按你批准的草案**一字未改**。

## 二、三个决策的落地

| 决策 | 落地方式 |
|---|---|
| ① dice 三参数留 | `dice_base/step/cap` 落字段，默认 0.30 / 0.10 / 0.90。窗口查询里 `dice_today = min(cap, base + step × days_in_window)` **读字段算**，代码里没有第二处这三个数。INV-18 有一条专门守它：把 base 改成 0.90 后首日掷骰必须变 0.90（`test_inv18_dice_params_are_per_conflict`） |
| ② 模板库放代码常量 | `goal_service.GOAL_LINE_TEMPLATES` 常量 + `GET /goal-templates` 端点。没建第四、五张表 |
| ③ archetype 拆 2b | 本批未做。人设页改动只有「挂两张卡」，没动性格标签入口，2b 接进来不冲突 |

另：你复核同意的两条也照做了——词表里只有「蜕变」没有「堕落」（`test_templates_expose_tags_and_six_lines` 断言 `堕落 not in tags`）；`template_key` 仍保留独立的 `corrupt`（堕落线），两个轴不混。

## 三、任务书七条验收逐条对照

| # | 验收项 | 结果 | 证据 |
|---|---|---|---|
| 1 | 三表建好，CRUD 不污染推演 | ✅ | INV-17（跨项目比对，序列逐条相同）+ `_diag21` 对照 2/3 |
| 2 | 三表空时推演与改动前完全一致 | ✅ | `_diag14` 改前改后逐行 diff：38 行里只有临时目录路径与 PS 行号 2 处差异，推演输出**零差异**（48 条 / day 9.8% / month 19.5% / year 70.7% / epoch 0%） |
| 3 | 魔兽双线 + zero_sum 能查出爆发窗口 | ✅ | INV-18 + `_diag21` 对照 4：支柱 6 第 100 天 `open_count=1`，A 线第 6/6 段、B 线第 3/3 段，今日掷骰 0.30 |
| 4 | 表单化录入，不写谓词元组 | ✅ | 两步向导：选模板卡 → 填 3 个名词 → 阶段表格改名称/勾标签/填代价。`enter_when` / `done_when` 就是文本输入框 |
| 5 | 模板库至少 6 条，选完只改名词 | ✅ | 6 条（复仇/夺宝/守护/野心/堕落/寻真），实例化后 4~5 段骨架自动生成 |
| 6 | 冲突表承载窗口 + 递增掷骰字段 | ✅ | `window_open_day` / `dice_base` / `dice_step` / `dice_cap` / `trigger_mode` / `manual_ignited_day` |
| 7 | 目标线并入人设页，框架页独立，导航不新增顶级项 | ✅ | 两张 Card 挂在人设页角色详情末尾；框架页加的是「此刻允许揭示什么」卡内的只读小节；`App.tsx` 的 NAV 仍是 9 项未动 |

**你加的两条硬要求**：

- **向后兼容自证**：见上第 2 条，`_diag14` 改前后 diff 已存（`logs/_diag14_before.txt` / `_diag14_after2.txt`）。另附更严的一条 INV-17：`logs/_diag21_goal_isolation.py` 四组对照（A 基线 / B 基线重复 / C 录满目标线 / 推演前后三表行数），其中 A==B 证明「推演可跨项目比对」这条自证方法本身成立，C==A 才是结论。
- **INV-18 反向测试**：`stage_b_at` 改成 99 → `open_count` 必须为 0（`test_inv18_clash_window_opens_and_reverse_closes`）；另加一条支柱反向：`pillar_at=6` 时查支柱 4 必须 0 条（`test_inv18_window_ignores_foreign_pillar`）。

## 四、自测数据

```
pytest:            74 passed（原 65 + 新增 9）
_diag14 改前/改后: 逐行一致（仅临时目录路径不同）
_diag21 四组对照:  A==B（可比对）· C==A（不污染）· 三表行数推演前后不变 · 窗口 1/0 正确
_diag20 框架牵引:  A 50.0% vs B 37.9%（+12.1pp，未被本批影响）
前端:              tsc --noEmit 通过；vite build 通过
```

## 五、留给阶段 4 的接口（本批没做，先说清）

1. **引擎读字段**：目标对齐加成 `w_goal`、冲突递增掷骰、目标层事件源，都等阶段 4。届时引擎必须读 `dice_base/step/cap`，不得硬编码（你的决策 1）。
2. **`is_main` 取代 `main_quest`**：方案 §6.2 三条取舍之三。本批 `goal_lines.is_main` 已落字段可写，但 `mainline_hits()` 与 `MainQuestView` 未动——改它会影响 INV-14/15/16，属于阶段 4。
3. **谓词化**：`enter_when` / `done_when` 目前是文本，方案 §4.4 的 6 个新谓词（`goal_stage_reached` 等）未实现。
4. **手动引爆不生成事件**：`POST /goal-conflicts/{id}/ignite` 只做 `latent → active` + 记天数，生成冲突事件是阶段 4 `build_clash_event` 的活。

## 六、复跑方式

```bash
cd D:/AI漫剧工作台/backend
.venv\Scripts\python -m pytest -q                      # 期望 74 passed
.venv\Scripts\python logs/_diag21_goal_isolation.py    # 四组对照
.venv\Scripts\python logs/_diag14_scale_big.py         # 与 _diag14_before.txt 比
```

---

_CodeBuddy · 2026-10-07 · 全部数据为本轮实跑，非记忆推断_
