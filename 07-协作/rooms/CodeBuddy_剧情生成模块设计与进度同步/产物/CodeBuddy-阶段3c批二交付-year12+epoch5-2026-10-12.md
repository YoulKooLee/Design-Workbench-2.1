# 阶段 3c 批二交付 · year 12 + epoch 5 条（含 9 条白挑处置 + 主因路径拆分）

日期：2026-10-12 ｜ 交付方：CodeBuddy ｜ 验收方：千问（qwen）
范围：3c 裁决的批二主体——year 12 条 + epoch 5 条挂 slots，9 条 year/epoch 白挑逐条处置
配套：上一份《CodeBuddy-阶段3c批二-引擎改动与世界池5条-2026-10-11.md》（已单独交付自证）

**结论：批二两条验收线全部达成，11 项自证 + 3 条额外全绿，pytest 104 passed。**

---

## 一、数字

| 口径 | 3b 基线 | 批一后 | 引擎改动后 | **批二全完成后** |
|---|---|---|---|---|
| day | 368 条 / 299 种 / 18.8% | 364 / 322 / 11.5% | 364 / 362 / 0.5% | 364 / **362** / **0.5%** |
| month | 326 / 154 / **52.8%** | 326 / 251 / 23.0% | 326 / 288 / 11.7% | 326 / **322** / **1.2%** |
| year | 176 / 69 / **60.8%** | 176 / 85 / 51.7% | 176 / 100 / 43.2% | 176 / **175** / **0.6%** |

**验收线（取你我两数中更严的一栏）**：

| 线 | 要求 | 实测 | |
|---|---|---|---|
| month | ≤2.5% 且 ≥318 种 | **1.2% / 322 种** | ✅ |
| year | ≤4% 且 ≥169 种 | **0.6% / 175 种** | ✅ |

year/epoch 池自身（不靠别的池抬轿）：104 条 / 103 种 / 1.0%。

## 二、交付内容

### year 12 条

| 类别 | 模板 | 处置 |
|---|---|---|
| 二 · 用上 `{b}` | `ev-old-enemy`（18 次） | **千问点名排最前**。「多年前的那个人」**就是 b**，却一直被兜底成泛称「同行的人」——participant_ids 里查无此人。四槽：怨什么 / 怎么进门 / 主怎么应 / 怎么收场 |
| 二 · 用上 `{b}` | `ev-power-shift`（20 次） | 更迭必有上下任。四槽：怎么上位 / 那几天山上什么样 / {a}站哪边 / 换下来的那边怎样 |
| 二 · 用上 `{b}` | `ev-legacy-surface`（11 次） | 传承现世必有人在争同一件东西。四槽：出的是什么 / 怎么现的 / 谁在抢 / 到手的代价 |
| 二 · 去掉 cast b | `ev-seclusion-out`（14 次） | 出关是单人状态变化，无对手位 |
| 一 · 直接挂 | `ev-breakthrough`（**37 次，全池最高频**）、`ev-faith-shake`（16）、`ev-sect-tournament`（3）、`ev-old-friend`（6）、`ev-lifespan-end`（3）、`ev-dao-parting`（2）、`ev-betray`（6）、`ev-power-trade`（3） | 各 4-5 槽 |

### epoch 5 条（整池去掉 cast b）

`sect-rise-fall` / `dynasty-change` / `qi-tide` / `mighty-fall` / `world-turn`
——语义是"时代变了，人在其中"，硬塞对手位会把「天地异变」写成两人对手戏。

**cast 核查二（白挑对手位）：全池剩 0 条**（3b 时 13 条 → 批一后 9 条 → 现在清零）。

## 三、11 项自证（套 year 口径）+ 3 条额外

脚本 `logs/_q3c_batch2_cross_check.py`，输出 `_q3c_batch2_crosscheck_out.txt`。

| # | 项 | 结果 |
|---|---|---|
| ① | year 口径总账 | 176 条 / **175 种** / **0.6%**（线 ≤4% 且 ≥169）✅ |
| ② | month 口径复核 | 326 / **322** / **1.2%**（线 ≤2.5% 且 ≥318）✅ |
| ③ | year+epoch 池自身 | 104 条 / 103 种 / 1.0% |
| ④ | 花括号残留（含世界事件） | 866 条样本，**0 处** ✅ |
| ⑤ | cast 核查一（写 {b} 无 cast b） | **0 条** ✅ |
| ⑥ | cast 核查二（白挑对手位） | **0 条** ✅ |
| ⑦ | 跨模板文本共用 | **0 句** ✅ |
| ⑧ | 英文残留 | 0 条 ✅ |
| ⑨ | 占位词 | 0 条 ✅ |
| ⑩ | life_line 空值 / NOTE 清单 | 空 0；留空 12 条 vs 清单 12 条 **一致** ✅ |
| ⑪ | 反向（清 year/epoch/世界池 slots） | year 回到 **51.7%**（要求 ≥40%）✅ |
| A | `_diag14` 与批二前对照 | 40 行 vs 40 行，**业务行逐行一致** ✅ |
| B | day 归因沿用 | 364 vs 368，差 **+4**，批一那条断言仍成立 ✅ |

pytest **104 passed**（xfail 摘标记后，1 xfailed → 全绿）。

## 四、你点名的「主因路径拆分」——A-2 射程 vs state 传导

脚本 `logs/_q3c_batch2_path_split.py`。批一我写"两条同根、哪条是主因没往下拆"，现在拆完：

**静态判定（读引擎就能定生死）**

- **A-2 互斥射程 ✅ 通**
  `engine.py:319` `participant_ids=[c.id for c in [lead, counterpart] if c]`
  → `engine.py:478` `_ongoing_blocks`: `if character_id not in e.participant_ids: continue`
  → counterpart 少了，那个角色就不再被这条事件的 `blocks` 屏蔽，**后续抽签的过滤集随之改变**。
- **state 传导 ❌ 断**
  `relationship_note` 确实随 counterpart 变（`engine.py:340`），
  但 `pick_template_for` 读 state **只读两个字段**（`engine.py:559-560`）：
  `state.equipment`（只由 `prev.equipment + template.introduced_props` 决定，与 counterpart 无关）
  与 `state.current_realm`（同样无关）。**relationship_note 是自由文本，抽签不读它。**

**动态单变量（day 口径，6 轮 × 20 日）**

| 组 | 条数 | 较现状 |
|---|---|---|
| 现状（批二改完） | 364 | — |
| 只回 `journey` 的 cast | **368** | **+4**（序列有差异） |
| 只回 `seclusion-out` 的 cast | 364 | +0（序列**完全相同**） |
| 只回 epoch 5 条 cast | 364 | +0（序列**完全相同**） |
| 全部回 b（批一前状态） | **368** | +4（与批一前基线 368 吻合） |

→ **漂移全部来自 `journey` 一条**；`seclusion-out` 与 epoch 5 条在 day 口径零贡献
（它们是 year/epoch 尺度，`weight_day` 0.05~0.1，这个样本里没被触发到能改变序列的程度）。

**结论：主因路径 = A-2 互斥射程；state 传导被证伪。**

## 五、测试的三处口径变化（逐条交代）

| 测试 | 变化 |
|---|---|
| `test_untouched_templates_still_use_legacy_fill` | 这条守的是"year/epoch 不许提前动"。批二开工后守门线两次后移，epoch 挂完即**角色池 48 条全部结构化**，断言翻面成"谁把 slots 清掉/漏挂要在这里红" |
| `cleared_managed_slots` / `cleared_day_slots` / `_bench_slots_cleared`（3 条反向） | 反向口径含世界池（上一份交付已做），本批再扩到 year/epoch |
| 新增回归断言 | 批一那条 `d_journey == 4` 经本批复跑**仍然成立**，不需要改数字（你交代过"红了停下报归因，别改那个 4"） |

## 六、待裁（已单独反馈，未擅自改）

1. **`wv-treasure-born` 缺 `cycle_days` / `cooldown`**：冷却是同池的 1/60~1/90，day 口径 21 次 vs 其他各 6 次。
   **我修正 3c 那句"最大重复源"**：挂 slots 后 21 次是 21 种不同文本，重复问题已解决，剩下的只是频率偏高。
   **且补值会让 month 条数 326→308，去重上限 308 < 验收线 318 → 数学上不可达。**
2. **验收线第二栏建议改相对栏**：`≥318` 是绑死在"326 条"上的绝对值，任何改变总条数的改动都会让它失真。
   建议改成相对栏（去重率 ≥97.5%，与 ≤2.5% 恒等）或随实测条数联动。**本次两条线都过了，所以这不影响本次验收结论**，但批三/阶段 4 会踩到。
3. git init：用户裁**不建库**。

## 七、复跑

```powershell
cd D:/AI漫剧工作台/backend
$env:PYTHONIOENCODING="utf-8"
python -m pytest -q                                   # 104 passed
python ..\logs\_q3c_batch2_cross_check.py             # 11 项 + 3 条额外
python ..\logs\_q3c_batch2_path_split.py              # 主因路径拆分
python ..\logs\_diag22_diversity_baseline.py          # 0.5% / 1.2% / 0.6%
python ..\logs\_q3c_batch2_engine_selfcheck.py        # 引擎改动那次的自证（上一份）
```

—— CodeBuddy 2026-10-12
