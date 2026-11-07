# 交付报告 · 阶段 3b（day 池 15 条挂 slots）

日期：2026-10-11 ｜ 执行：CodeBuddy ｜ 验收方：千问（qwen）
依据：《2026-10-11-任务书-阶段3b-day池结构化.md》+ 千问 10:06 的《3b 前置与五问全部裁决完毕》

一句话：day 池 19 条全部挂上 slots，**day 去重 174 → 299 种、重复率 52.7% → 18.8%**，
探针 `_diag14` 与 A 后基线逐项一致未动，pytest 92 → **96 passed**（无回归、无跳过的失败）。

---

## 一、11 项验收自证（每项附脚本与原始输出）

| # | 验收项 | 标准 | 实测 | 脚本 / 原始输出 |
|---|---|---|---|---|
| 1 | pytest | 92 不回归 + 本批新增 | **96 passed** | `pytest -q` |
| 2 | INV-13 多样性 | day 去重 ≥250 / 重复率 ≤32% | **368 条 / 299 种 / 18.8%** ✅ | `_diag22_diversity_baseline.py` → `_diag22_out_3b.txt` |
| 3 | INV-13 反向 | 清空 slots → 重复率 ≥70% | **82.3%**（368 条 / 65 种）✅ | `tests/test_batch3b_slots.py::test_invariant_13_reverse_*` |
| 4 | `_diag14` 探针 | 与 A 后基线逐项一致 | **52 条（角色 46）/ 8.7 · 21.7 · 69.6 · 0.0** ✅ 一字未变 | `_diag14_scale_big.py` → `_diag14_out_3b.txt` |
| 5 | cast 一致性 | `ev-cover-track` 处清零 | **✅ 无此类不一致** | `_q_cast_consistency.py` → `_q_cast_out_3b.txt` |
| 6 | life_line 分布 | relation 14 / cultivation 4 / career 1 = 19、空 0 | **完全一致** ✅ | `_q_life_line_review.py` → `_q_life_line_out_3b.txt` |
| 7 | 槽名护栏 | 悬空 0 处 + 坏模板抛错 | **悬空 0 / 注入坏模板抛 ValueError** ✅ | `_q_slotname_guard.py` → `_q_slotname_out_3b.txt` |
| 8 | 护栏与补 cast 同批 | 把 cast 改回 `['a']` 必须抛错 | **✅ 抛错并指明模板与字段**（有测试锁） | `tests/test_batch3b_slots.py::test_cast_guard_rejects_b_without_cast_b` |
| 9 | `None` 可区分 | 注释 + 测试断言清单 | **`NOTE_NONE_GOAL_ALIGNMENT` 常量 + 断言** ✅ | 见 §三 第 2 点 |
| 10 | 跨模板去重自查 | 总 / 去重 / 共用清单 | **353 短语 / 353 去重 / 共用 0** ✅ | `_q3b_cross_template_check.py` → `_q3b_out.txt` |
| 11 | `_diag26` 分布 | 14 / 4 / 1、空 0 | **四项全 ✅** | `_diag26_life_line_forecast.py` → `_diag26_out_3b.txt` |

附带：全批英文残留扫描 → **全 48 条模板 0 处**（同一脚本 ① 部分）。

### 第 2 项对照千问的阈值依据

千问在任务书 §四 按「3a 那 4 条 119 次出现产出 117 种（98.3%）」外推 3b 约 296 种 / 20%，
保守定阈 ≥250 / ≤32%。**实测 299 种 / 18.8%，落在他的中值区间**，证明这条外推成立。

### 第 3 项为什么重要

反向清空后 82.3%，与 3a 改造前的原始基线 82.5% 几乎重合——
说明这 45 个百分点的改善**确实由 slots 带来**，不是模板条数或运气。

---

## 二、改了什么

### 1. 前置三项（按裁决落地）

| 项 | 改动 |
|---|---|
| 前置 1 | `ev-cover-track` 补 `cast=['a','b']`（并补 `life_line='relation'`） |
| 前置 2 | 11 条 `life_line` 标记，含遗漏的 `ev-impulsive → relation`（裁决确认） |
| 建议 1 | 新增 `_validate_cast_against_b()` 护栏：写了 `{b}` 却没 cast → **报错**；反向只 `warn`（存量 15 条，实测与千问预估条数一致） |
| 建议 2 | `_audit` 的 `prior` 改严格 `<`（改前实测 hard/soft 完全不变、反向仍红，零风险） |

### 2. 15 条内容改造

每条 ≥3 槽 × ≥4 取值 + `slot_fallback`（兜底值必在取值表内）+ `drama_base` + `goal_alignment`。

| 类别 | 模板 | 槽数 | drama_base | stage_tags |
|---|---|---|---|---|
| 一（6） | `ev-hide-wound` | 5 | 6.5 | 潜伏 |
| | `ev-quarrel-night` | 5 | 8.0 | 正面对抗 |
| | `ev-neutral-aid` | 5 | 5.0 | **None**（有意留空） |
| | `ev-recover` | 4 | 2.5 | **None** |
| | `ev-rescue` | 4 | 9.0 | 结盟 / 责任推进 |
| | `ev-teach-trick` | 4 | 7.0 | 力量获取 / 结盟 |
| 二（2） | `ev-open-up` | 4 | 7.5 | 结盟 |
| | `ev-shadow-follow` | 4 | 5.5 | 调查 / 潜伏 |
| 三（6） | `ev-practice-alone` | 5 | 3.5 | **None** |
| | `ev-socialize` | 4 | 4.0 | 调查 |
| | `ev-memory` | 5 | 3.0 | **None** |
| | `ev-ask-price` | 4 | 4.5 | 调查 / 争夺 |
| | `ev-night-sneak` | 4 | 5.0 | 调查 |
| | `ev-whistle-call` | 4 | 5.5 | 调查 |
| 四（1） | `ev-cover-track` | 5 | 6.0 | 潜伏 / 调查 |

分布自查：A 档 4 / B 档 8 / C 档 3，值域 2.5~9.0。类别二两条**按裁决让文本用上 `{b}`**
（不是砍 cast），白挑对手位的毛病随之清零。

---

## 三、两件必须单独报的事

### 1. 我踩了一个坑：槽取值里写了 `{a}/{b}`（已修，并加了护栏）

写完 15 条跑 INV-20 直接红，成稿里残留 `'{b}承认了，却把话锋一转反问回去'`。根因：
**引擎是先替换人名、再填槽**，所以槽取值里的 `{a}/{b}` 不会被二次替换，会原样吐给编剧模型。

处理分两步：
- 文案改为「对方 / 那人」这类称呼（涉及 `open-up` 两槽、`shadow-follow`、`teach-trick`、`whistle-call`）
- **新增护栏**：`validate_pool` 里槽取值若含 `HUMAN_SLOTS` → 抛 `ValueError` 并指明是哪条槽的哪个取值。
  这条护栏当场又抓出一个我肉眼漏看的（`他练得比{a}预想的快得多`）——5 处违规全部清零。

护栏成本一行，收益是 3c 标 24 条时不会再有人踩。**这是超出 §五 建议清单的自作主张，特此报备**；
它不改 Schema、不动抽签，只是加载期校验，且已有测试覆盖。

### 2. 我改了两条既存测试（不是悄悄改，理由如下）

改别人的验收测试必须显式声明，所以我单列：

| 测试 | 原断言 | 为什么必须改 |
|---|---|---|
| `test_stage3a_slots.py::test_inv13_reverse_when_slots_cleared` | 只清 4 条标杆 slots ≥75% | 3b 后剩 15 条也挂了 slots，只清 4 条实测 **48.4% 却照样能通过**——这条测试的保护作用已经失效（假绿）。改成清 day 池全部，实测 82.3%，与改前基线吻合 |
| `test_stage3a_slots.py::test_untouched_templates_still_use_legacy_fill` | 挂 slots 的必须 == 4 条标杆 | 断言主干已过期。**改成「day 池 19 条全挂 + 其余池一条未挂」**——它真正要守的后半句我保留了，而且更硬：3c 之前谁动了 month/year/epoch 池会当场红 |

两条都没有降低标准，是把标准抬到能抓住新错误的高度。

### 3. `goal_alignment` 有意留空已可区分（交付项 #9）

`pools.py` 新增模块级常量 `NOTE_NONE_GOAL_ALIGNMENT`（4 条 + 逐条理由），
测试断言「day 池实际留空集合 == 清单」。3c 新增留空必须显式改清单，否则 pytest 红。

---

## 四、边界与没动的东西

- **不动 month/year/epoch 池**（有测试锁死）、不改 Schema、不动 `SCALE_DISTRIBUTION`/`scale_pool`、
  不开 life_line 降级、不补 `consequence_templates`、不加模板、**未调任何 `weight_*`/`cooldown`**
- **已知边界（上轮已报、千问已记待办）**：`ev-cover-track` 补 cast 后，
  **独角色项目**里 `counterpart=None` 仍回落到「同行的人」泛称兜底；2 角色及以上才落到实名。
- 本批新增两条测试面临的场景：新增测试用的推演口径与 `_diag22` **逐字一致**（6 轮 × 20 日 HTTP）。
  中间踩过一次：直接用单次 `simulate_fast_forward(120 天)` 只出 61 条，样本差一个数量级，
  重复率会虚高好看——已在测试注释里写死这个坑，防止后来人图省事改用单次调用。

---

## 五、复跑方式

```powershell
cd D:/AI漫剧工作台/backend
$env:PYTHONIOENCODING="utf-8"
python -m pytest -q                              # 期望 96 passed
python ..\logs\_diag22_diversity_baseline.py     # day 368 / 299 / 18.8%
python ..\logs\_diag14_scale_big.py              # 52 条 / 8.7-21.7-69.6-0.0
python ..\logs\_q_life_line_review.py            # 14 / 4 / 1、空 0
python ..\logs\_q_cast_consistency.py            # 无不一致
python ..\logs\_q_slotname_guard.py              # 悬空 0 / 注入坏模板报错
python ..\logs\_q3b_cross_template_check.py      # 353/353，共用 0；英文残留 0
python ..\logs\_diag26_life_line_forecast.py     # 14 / 4 / 1、空 0
```

原始输出固定文件名：`logs/_diag22_out_3b.txt`、`_diag14_out_3b.txt`、`_q_life_line_out_3b.txt`、
`_q_cast_out_3b.txt`、`_q_slotname_out_3b.txt`、`_q3b_out.txt`、`_diag26_out_3b.txt`。

改动文件只有三个：
`backend/app/services/simulator/pools.py`、`backend/tests/test_stage3a_slots.py`、
`backend/tests/test_batch3b_slots.py`（新增）。

—— CodeBuddy 2026-10-11
