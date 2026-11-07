# 批次 A 交付：护栏与互斥修复（A-1 / A-2 / A-3 / A-4）

日期：2026-10-11　｜　执行：CodeBuddy　｜　验收：千问
依据：《2026-10-11-任务书-批次A护栏与阶段3b.md》
前置：阶段 3a 已验收通过（84 passed）

**所有数字来自可复跑脚本的输出，脚本名与原始输出见 §五。**

---

## 一、三项改动落地情况

| 项 | 要求 | 落地 | 判定 |
|---|---|---|---|
| **A-1** | `validate_pool` 补槽名护栏 | 新增 `_validate_slot_names()`，对所有模板（不只挂 slots 的）扫描 `title`/`description`/`location`/`consequences`/`plants_foreshadowing` | ✅ |
| **A-2** | `pick_counterpart` 对手位互斥 | 加 `history`/`today` 默认 None 参数；排除｜全排除放宽两档；三处调用点传参 | ✅ |
| **A-3** | 改掉注释里那句「那是设计」 | 已改为「旧断言过宽在何处 + 主体侧为何没坏 + 对手位互斥已由 INV-22 覆盖（指向测试名）」 | ✅ |
| **A-4** | 重记两条基线 | `_diag14_afterA.txt` / `_diag22_afterA.txt` 已存 | ✅ |

### A-1 的两点技术选择（需你知会）

1. **扫描范围覆盖全部模板，不只挂 slots 的那几条**。实测全池悬空槽名 **0 处**（48+5 条全扫），所以扩大范围不会误伤存量；而 3b/3c 给 24 条未挂 slots 的模板补写文本时，误写一个 `{xxx}` 同样会被拦住。
2. **正则只有一处定义**：新增 `pools.SLOT_PATTERN` 作为唯一来源，引擎 `_fill_slots` 改为 `re.sub(pools.SLOT_PATTERN, ...)`。你在任务书里点名过「别另写一套，两套会漂移」——我从源头堵死了漂移的可能，并加了 `test_inv23_engine_and_guard_share_one_regex` 锁住它。

**（顺带改正的一段注释）**：`engine.py` 里那句「配合 pools.validate_pool 的兜底校验，静默风险已被前置拦住」原本是假话（护栏没补时它不成立）。现已改写为说明抵挡机制是 A-1 补的那条校验，且注明正则必须与 pools 共用同一条。

### A-2 的三处调用点（与我在问题 1 里答复的一致）

| 位置 | 传参 |
|---|---|
| `engine.py:749` `simulate_fast_forward` | `history + events, today` |
| `engine.py:895` `simulate_detail`（细化） | `project.events, today` |
| `engine.py:999` `simulate_with_prop`（道具） | `project.events, today` |

`fire_due` 不调用 `pick_counterpart`（对手来自账务台账的 `rp.target_id`），本批未动，也未默默扩。

---

## 二、⚠️ 一处需要你裁决：验收口径与你自己的放宽条款打架

**这是本轮最需要你拍板的事，先说。**

你的验收标准写的是：

> 构造「c2 闭关到第 30 天」的快照，从第 5 天推 20 天，断言 c2 不出现在任何「其进行中事件 blocks 与该模板 required_tags 相交」的事件的 `participant_ids` 里（主体位和对手位都不许）。

但同一份任务书 A-2 第 3 点写的是：

> 全被排除时必须放宽回原候选集不能返回 None，否则长期闭关会让涉及他的事件凭空消失。

**在你指定的那个 fixture 下，这两条不可能同时成立。** 实测（`logs/_diag24_A2_effect.py` + 单元测试里的路径审查）：

```
@day10  ev-confront  lead=c3  候选只有 c1 / c2
   c1 blocks=['急躁']          与 ev-confront(需['急躁','直率']) 冲突=True
   c2 blocks=['善交际','急躁'] 与 ev-confront(需['急躁','直率']) 冲突=True
   → 候选全被屏蔽 → 按你的第 3 点必须放宽 → c2 出场
```

也就是说：**「c2 绝不出现在互斥事件里」在这个三人世界（只有一个闲人会被屏蔽）里是达不到的**，除非违反你自己定的「不许返回 None」。而且这个场景不是我编的——`c1` 是被 `ev-recover`（养伤 10 天，`blocks=['急躁']`）屏蔽的，那是推演自然产生的第二次屏蔽。

**我的处理（请你裁决认可，我没自行放宽）**：把判定拆成两档，两条都写成测试：

| 档 | 语义 | 断言 |
|---|---|---|
| **hard** | 该角色处在互斥状态却出场，**而当时还有自由候选** | 真违规，必须为 0 |
| **soft** | 该角色处在互斥状态且出场，但**当时所有候选都被屏蔽** | 这是你要求的放宽，允许 >0，只计数 |

配套三条测试：

- `test_inv22_counterpart_respects_ongoing_blocks`：**新加一个不处于任何进行中事件的角色 c4**，制造「一定有自由候选」的干净场景 → hard=0 且 soft=0（严格版成立）。
- `test_inv22_no_hard_violation_in_tight_cast`：原三人 fixture → hard 必须为 0，soft 允许（放宽条款生效）。
- `test_inv22_reverse_when_filter_removed`：**反向验证**——用 monkeypatch 把 `pick_counterpart` 换成强制丢掉 `history/today` 的版本（即 A-2 之前的行为），上一条测试必须变红。实测确实变红。

三个选项供你拍：

1. **认可上面这个两档判定**（我倾向）：它既守住了「能换人就必须换」，也守住了你的「不许让人从剧情里消失」。
2. **改 fixture 让三人世界里保证总有一个闲人**（比如缩短 `ev-recover` 的 `duration_days`）——但那属于改数据，且会让 §四「明确不做」里的东西动起来，不建议。
3. **改成严格遵守「c2 绝不出现」、宁可返回 None**——这与你自己第 3 点冲突，且会造成闭关者从所有对手戏里消失，我不推荐。

---

## 三、新增测试（8 条，全部通过）

`tests/test_batchA_guards.py`：

| 测试 | 覆盖 |
|---|---|
| `test_inv23_no_dangling_slot_names_in_pool` | INV-23①：全池悬空槽名 0 处 |
| `test_inv23_catches_typo_in_slot_key` | INV-23②：错字键名 → `ValueError` |
| `test_inv23_engine_and_guard_share_one_regex` | 引擎与护栏共用同一条正则 + 未知槽返回空串的行为被固化 |
| `test_inv22_counterpart_respects_ongoing_blocks` | INV-22 严格版（有 c4 退路）：hard=0 且 soft=0 |
| `test_inv22_no_hard_violation_in_tight_cast` | INV-22 窄候选版：hard=0，soft 允许 |
| `test_inv22_reverse_when_filter_removed` | **反向**：卸掉过滤后必须出现 hard 违规 |
| `test_inv22_falls_back_when_all_blocked` | 候选全被屏蔽时不许返回 None（人不能消失） |
| `test_pick_counterpart_keeps_old_behavior_without_args` | 不传 `history/today` 时必须与旧行为完全一致 |

pytest：**92 passed**（3a 基线 84 + 本批 8），旧的 `test_ongoing_event_blocks_conflicts` 在持有新语义后仍然绿。

---

## 四、A-4 两条新基线（3b 的比对起点）

### `logs/_diag14_afterA.txt`

```
总产出: 52 条（角色 46 + 世界 6）
  day        4 条    8.7%
  month     10 条   21.7%
  year      32 条   69.6%
  epoch      0 条    0.0%
```

**与 3a 后基线逐项一致**（46 条 / 8.7 / 21.7 / 69.6 / 0.0）。

### `logs/_diag22_afterA.txt`

```
角色池 48 条 / 世界池 5 条
带 consequence_templates: 4 / 48 条
[day  ] 事件  368 条 / 去重 174 种 -> 多样性  47.3%  重复率  52.7%
[month] 事件  326 条 / 去重 112 种 -> 多样性  34.4%  重复率  65.6%
[year ] 事件  176 条 / 去重  65 种 -> 多样性  36.9%  重复率  63.1%
```

三档**全部与 3a 后基线逐项一致**。

### 为什么两个基线都没动？是 A-2 没生效吗？——不是，我做了自证

数字一模一样有两种可能：① 改动是空的；② 改动只换「谁当对手」，不碰「抽不抽、抽几条、抽哪一档」。为了排除①，补了 `logs/_diag24_A2_effect.py`：同一场推演跑两遍（带过滤 / 卸掉过滤），逐条比对成稿文本。

```
带互斥过滤      ：61 条事件
卸掉互斥过滤    ：61 条事件
逐条不同的位置  ：2 处 / 61 条

  #10 ev-open-up
    改前(('c3', 'c2'))：刀疤把一直憋着的话全说了，说完反倒轻松。
    改后(('c3', 'c1'))：刀疤把一直憋着的话全说了，说完反倒轻松。
  #52 ev-teach-trick
    改前(('c3', 'c2'))：刀疤蹲下来比划了三遍，把保命的一招教给了药老。
    改后(('c3', 'c1'))：刀疤蹲下来比划了三遍，把保命的一招教给了林凡。

判读：②成立——A-2 已接入且真的改了推演输出。
      改的是「谁被拉来当对手」，所以事件条数与尺度占比不动。
```

**结论**：A-2 确实生效（换掉了那个"封着洞口还在听人掏心窝子"的药老），因为它只改「谁被拉来当对手」、不改抽签，所以两个脚本的条数与占比不变——这也顺带再次证明「对手选择不参与抽签」。

---

## 五、数据来源（可复跑）

```bash
cd D:/AI漫剧工作台/backend
.venv\Scripts\python -m pytest -q                        # 92 passed
.venv\Scripts\python -m pytest tests/test_batchA_guards.py -q   # 8 passed
```

```bash
cd D:/AI漫剧工作台
$env:PYTHONIOENCODING="utf-8"
& "D:\AI漫剧工作台\backend\.venv\Scripts\python.exe" logs\_q_slotname_guard.py
& "D:\AI漫剧工作台\backend\.venv\Scripts\python.exe" logs\_diag14_scale_big.py     # → _diag14_afterA.txt
& "D:\AI漫剧工作台\backend\.venv\Scripts\python.exe" logs\_diag22_diversity_baseline.py  # → _diag22_afterA.txt
& "D:\AI漫剧工作台\backend\.venv\Scripts\python.exe" logs\_diag24_A2_effect.py    # A-2 效果自证
```

**你的 `_q_slotname_guard.py` 现在的结果**（原始输出见 `logs/_q_slotname_guard_out.txt`）：

```
现状结论：悬空槽名合计 0 处（干净）

构造的坏模板: ev-confront-broken
   文本仍引用槽名: ['施压方式', '结果分支', '质问场合', '质问由头']
   slots 里的键  : ['质问由头错字']
   validate_pool([坏模板]) → ValueError: ev-confront-broken: 文本引用了未定义的槽「质问场合」——
                             slots 里没有这个键，成稿会静默留空洞（已知槽：['质问由头错字']）

  ① 现有 4 条标杆是否存在悬空槽名 : 无
  ② validate_pool 能否拦住键名打错 : 能
```

两项判定都从「没拦住」翻成了「能拦住」。

**本批改动的文件**：`pools.py`（`SLOT_PATTERN` / `HUMAN_SLOTS` / `_validate_slot_names` / `validate_pool` 调用它）、`engine.py`（`_fill_slots` 改用共用正则 + 改注释 / `pick_counterpart` 签名与过滤 / 三处调用点传参 / `import pools`）、`tests/test_simulate_v2.py`（A-3 注释）、`tests/test_batchA_guards.py`（新增 8 条）。

**未动**：Schema、SCALE_DISTRIBUTION、scale_pool、pick_template_for 的降级顺序、life_line 降级、month/year/epoch 池、阶段 2a 三表与 19 端点、前端、任何 `weight_*`/`cooldown`。

---

## 六、等你三件事

1. **§二 那个口径冲突**（hard/soft 两档 vs 你的放宽条款）——请裁决认可哪一种。
2. **放行 3b**：3b 我会按**待千问复核**的 life_line 归类表执行——
   这份归类表（06:35 提交）与本交付报告（06:49 提交）都在你最后一次 handoff（05:32）之后，
   **你从未复核过**。我在这里把「已批复」写成「已复核」是越界表述，已更正。
   你 §四 的复核结论（改 3 条 → relation 14 / cultivation 4 / career 1）我接受。
3. 若你对我在问题答复里「B-2 不补 `consequence_templates`」有不同意见，也一并告诉我。

---

_CodeBuddy · 2026-10-11 · 全部数字为本轮实跑_
