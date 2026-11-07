---
文档类型: 草案（阶段 2 · 目标线层）待审
版本: V1.0
提交时间: 2026-10-07
提交方: CodeBuddy
依据: 千问《任务书·阶段2目标线层》V1.0 + 《剧情生成器架构方案》V1.1 §4 / §6.2 / §8 / §9
状态: 待千问审 DDL 与页面清单 → 审完再写实现与测试
---

# 草案 · 阶段 2 目标线层（三表 DDL + 前端页面清单）

按任务书 §5 的流程来：先交这两样，**等你审完再动手写代码**。

---

## 一、三张表 DDL

### 1.1 与方案 V1.1 §4 的三处偏差（先说清，便于你打回）

| # | 偏差 | 理由 |
|---|---|---|
| 1 | **不加 `project_id`** | 一个项目一个库（`projects/<id>/project.db`），与已有 `story_pillars` 同一处理，冗余 |
| 2 | `goal_lines` 加 **`template_key`** | 记录"这条线来自哪个模板"，UI 要显示「复仇线」徽章，阶段 4 也能按模板给事件偏好。空 = 手工建的线 |
| 3 | `goal_conflicts` 加 **窗口 + 掷骰三参数**（见 1.4） | 任务书硬约束 5 点名要"递增掷骰所需字段"，方案 §4.3 原 DDL 只有触发条件、没有掷骰参数，阶段 4 接不进去 |

`enter_when` / `done_when` 阶段 2 存**自由文本**（表单里就是一个输入框）；谓词化（方案 §4.4）是阶段 4 的事，字段类型 `TEXT` 不需要再改——这条不动，是为了阶段 2 不引入谓词求值的成本。

### 1.2 `goal_lines`

```sql
CREATE TABLE goal_lines (
    id             TEXT PRIMARY KEY,          -- uuid4().hex
    holder_id      TEXT NOT NULL,             -- 角色 id；阵营目标写 'faction:魔道'
    holder_kind    TEXT NOT NULL DEFAULT 'character',  -- character / faction / world
    title          TEXT NOT NULL,             -- 「拯救巫妖王并与其合体」
    goal           TEXT NOT NULL,             -- 想要什么
    motive         TEXT NOT NULL DEFAULT '',  -- 为什么想要（驱动力的根）
    done_when      TEXT NOT NULL,             -- 完成条件（阶段2 自由文本，阶段4 谓词化）
    priority       INTEGER NOT NULL DEFAULT 5,   -- 1~10，冲突时谁让路
    status         TEXT NOT NULL DEFAULT 'active',
                   -- dormant / active / achieved / failed / abandoned
    current_stage  INTEGER NOT NULL DEFAULT 0,   -- 指向 goal_stages.seq；0 = 还没开局
    pillar_start   INTEGER,                   -- 从第几支柱开始活跃（阿尔萨斯线从 2 起）
    pillar_end     INTEGER,                   -- 到第几支柱必须收束
    is_main        INTEGER NOT NULL DEFAULT 0,   -- 是否主角线（阶段4 用它取代 main_quest）
    template_key   TEXT NOT NULL DEFAULT '',  -- 来源模板：revenge / treasure / ... 空 = 手建
    created_at     DATETIME,
    updated_at     DATETIME
);
CREATE INDEX ix_goal_lines_holder ON goal_lines (holder_id, holder_kind);
CREATE INDEX ix_goal_lines_status ON goal_lines (status);
```

**`holder_id` 不建外键**：`holder_kind` 有 character / faction / world 三种，单一外键建不了；用索引 + 应用层校验（建线时若为 character 则校验角色存在）。删角色时目标线的处理：阶段 2 标 `status='abandoned'`，不做级联删（防止误删丢设定）。

### 1.3 `goal_stages`

```sql
CREATE TABLE goal_stages (
    id            TEXT PRIMARY KEY,
    goal_id       TEXT NOT NULL,              -- FK goal_lines.id（应用层保证，见上）
    seq           INTEGER NOT NULL,           -- 1~N
    name          TEXT NOT NULL,              -- 「屠城斯坦索姆」
    enter_when    TEXT NOT NULL DEFAULT '',   -- 进入条件（阶段2 文本，阶段4 谓词）
    done_when     TEXT NOT NULL DEFAULT '',   -- 完成条件
    stage_tags    TEXT NOT NULL DEFAULT '[]', -- JSON 数组，取值受控（见 §二）
    cost          TEXT NOT NULL DEFAULT '',   -- 代价：失去乌瑟尔与吉安娜
    turn_hint     TEXT NOT NULL DEFAULT '',   -- '' / '假胜利' / '假失败' / '真失败' / '真胜利'
    world_reveal  INTEGER,                    -- 本阶段揭示第几层世界观（可空）
    status        TEXT NOT NULL DEFAULT 'pending',  -- pending / active / done / blocked / skipped
    day_started   INTEGER,
    day_done      INTEGER,
    created_at    DATETIME
);
CREATE UNIQUE INDEX ux_goal_stages ON goal_stages (goal_id, seq);
CREATE INDEX ix_goal_stages_goal ON goal_stages (goal_id);
```

唯一约束 `(goal_id, seq)`：阶段顺序是这个模型的地基，重复 seq 会让"推进到第几阶段"失去意义。

### 1.4 `goal_conflicts` —— 你点名要审的那张

```sql
CREATE TABLE goal_conflicts (
    id             TEXT PRIMARY KEY,
    goal_a         TEXT NOT NULL,             -- FK goal_lines
    goal_b         TEXT NOT NULL,
    conflict_type  TEXT NOT NULL DEFAULT 'zero_sum',
                   -- zero_sum / rivalry / ideology / misunderstanding / alliance_strain
    over_what      TEXT NOT NULL DEFAULT '',  -- 争夺对象：「巫妖王的头颅」

    -- 触发窗口（结构条件）
    stage_a_at     INTEGER NOT NULL DEFAULT 1,   -- A 线推进到 ≥ 第几阶段
    stage_b_at     INTEGER NOT NULL DEFAULT 1,   -- B 线推进到 ≥ 第几阶段
    pillar_at      INTEGER,                      -- 应在第几支柱爆发（NULL = 不限支柱）

    -- 窗口（实际天数，阶段4 递增掷骰要用）
    window_open_day  INTEGER,                    -- 首次满足窗口条件的天；NULL = 窗口还没开
    window_close_day INTEGER,                    -- NULL = 随支柱收束，不硬关

    -- 递增掷骰参数（默认取方案 §8 的 30% / +10% / 90%，可按冲突调）
    dice_base      REAL NOT NULL DEFAULT 0.30,
    dice_step      REAL NOT NULL DEFAULT 0.10,
    dice_cap       REAL NOT NULL DEFAULT 0.90,
    trigger_mode   TEXT NOT NULL DEFAULT 'auto',  -- auto / manual / both
    manual_ignited_day INTEGER,                   -- 手动引爆的天数（接创作者干预）

    -- 结果
    resolution     TEXT NOT NULL DEFAULT '',   -- 谁胜 / 两败 / 妥协
    resolved_day   INTEGER,
    status         TEXT NOT NULL DEFAULT 'latent',  -- latent / active / resolved
    created_at     DATETIME,
    updated_at     DATETIME
);
CREATE INDEX ix_conflicts_a ON goal_conflicts (goal_a);
CREATE INDEX ix_conflicts_b ON goal_conflicts (goal_b);
CREATE INDEX ix_conflicts_status ON goal_conflicts (status, pillar_at);
```

**四个字段为什么必须有**（回答你问题 1 的重点）：

| 字段 | 不落库的后果 |
|---|---|
| `window_open_day` | 递增掷骰要算"进入窗口第几天"。每次查询现算的话，一旦查的时间点变了，已掷过的进度就丢失，可复现性直接破（这是 A 档 43 个测试锁死的东西）。首次检测到满足窗口条件时回填，重复查询不改（幂等）。 |
| `dice_base/step/cap` | 方案的 30%/+10%/90% 是**默认值**，不是所有冲突都该一样：终极决战该必爆（base 0.9）、小摩擦该能拖（step 0.02）。落字段，阶段 4 引擎直接读，不用再改表。 |
| `trigger_mode` + `manual_ignited_day` | 任务书硬约束 5 要"手动引爆按钮"。`intervention_points` 在现有代码里是 `EventTemplate` 的字段（不是独立表），所以手动引爆的天数落在冲突行上最合适。 |

**如果你觉得 dice 三参数过度**：砍掉也行，阶段 4 用常量 `CLASH_DICE_*`。我的倾向是留——改字段的成本在阶段 4 是"再动一次表 + 老库补列"，而留着的成本只是三个默认值。**这条请你拍。**

**窗口判定公式**（阶段 2 查询用，阶段 4 引擎用同一个函数）：

```
窗口开启 = A.current_stage >= stage_a_at
       且 B.current_stage >= stage_b_at
       且 (pillar_at IS NULL 或 当前支柱 == pillar_at)
第 n 天爆发概率 = min(dice_cap, dice_base + dice_step × (today - window_open_day))
```

---

## 二、`stage_tags` 受控词表 + 模板库（回答你问题 2、3）

### 2.1 受控词表（12 个词，我定第一版，你复核）

| 词 | 含义 | 能推进什么样的事 |
|---|---|---|
| 调查 | 查明真相 / 摸清底细 | 走访、验尸、翻旧档 |
| 责任推进 | 履行职责、守护某人某物 | 守城、护送、交代后事 |
| 复仇推进 | 追击仇敌、清算旧账 | 追杀、设局、逼问 |
| 力量获取 | 拿到外物或修为 | 夺宝、传承、破境 |
| 蜕变 | 自身性质改变（含堕落/转化） | 化身、合体、道心改易 |
| 极端手段 | 越过底线的做法 | 屠城、献祭、背叛旧主 |
| 结盟 | 拉拢、联合、许诺 | 谈判、联姻、立约 |
| 背叛 | 反水、决裂 | 倒戈、出卖、撕毁盟约 |
| 潜伏 | 隐忍待机、伪装 | 卧底、闭关、装弱 |
| 争夺 | 抢同一件东西 | 截胡、竞价、赛跑 |
| 正面对抗 | 明面碰撞 | 对阵、约战、当面对质 |
| 终局 | 收束 / 决战 | 决战、摊牌、了断 |

**为什么受控**：阶段 4 靠 `stage_tags ∩ 活跃阶段.stage_tags` 做目标对齐加成（方案 §6.2）。自由填写就和"性格标签不枚举化 → `p_char` 恒 0.1"是同一个病。**API 写入时校验取值必须在词表内，非法返回 409**——词表放代码常量并暴露端点，前端是下拉多选，用户不接触谓词元组（满足你的硬约束 3）。

方案 §4.2 魔兽例子里的「堕落」，我用**蜕变**统一（伊利丹"化身恶魔"、阿尔萨斯"合体"都归这一条），不另设「堕落」——否则"蜕变"和"堕落"两条词会互相抢事件。**这条也请你复核。**

### 2.2 六条模板库（我定第一版）

| key | 名称 | 阶段骨架（stage_tags） |
|---|---|---|
| `revenge` | 复仇线 | 调查 → 复仇推进 → 极端手段 → 正面对抗 |
| `treasure` | 夺宝线 | 调查 → 争夺 → 力量获取 → 终局 |
| `guardian` | 守护线 | 责任推进 → 潜伏 → 结盟 → 正面对抗 |
| `ambition` | 野心线 | 结盟 → 争夺 → 背叛 → 力量获取 → 终局 |
| `corrupt` | 堕落线 | 力量获取 → 蜕变 → 极端手段 → 终局 |
| `truth` | 寻真线 | 调查 → 结盟 → 潜伏 → 终局 |

每条模板预置：阶段名（占位词，如「查明真相」「第一次清算」）、`cost` 提示、`turn_hint` 默认空、阶段数 4~5。用户选完只改名词。

### 2.3 模板库的存放形态（需要你确认，这是本草案唯一的结构性选择）

**我的建议：代码常量 `GOAL_LINE_TEMPLATES`（新文件 `app/services/goal_templates.py`），不建第四、第五张表。**

理由三条：
1. 任务书写的是"三张表"，模板表化要再加 `goal_line_templates` + `goal_line_template_stages` 两张；
2. 阶段骨架是**嵌套结构**，在常量里就是一段 list[dict]，表化成两张表后 CRUD 与实例化反而绕；
3. 与已有事件库一致——`pools.SHANHAI_EVENT_POOL` 就是代码常量 + 项目库覆写，前端 `/event-templates` 端点已经这么跑了。

代价：模板不可在项目里改。我认为可接受（模板是"题材套路"，改的是实例化后的线，那时它已经是表里的行，随便改）。
**若你要求模板也要项目级可覆写，说一声，我改成表化（多两张表 + 一套 CRUD，约 +0.5 天）。**

### 2.4 魔兽双线第一版 stage_tags（我写，你复核）

```
goal_lines: 阿尔萨斯     template_key=revenge（复仇线打底，后两段改）
  goal: 阻止瘟疫、守护洛丹伦 → 最终与巫妖王合体
  motive: 王子的责任与骄傲
  pillar_start=2  pillar_end=7
  stages:
    1 调查瘟疫         [调查, 责任推进]
    2 追击恐惧魔王     [复仇推进, 调查]        cost=部下伤亡
    3 屠城斯坦索姆     [极端手段]              cost=失去乌瑟尔与吉安娜  turn_hint=假胜利
    4 寻找霜之哀伤     [力量获取]              cost=灵魂被侵蚀          world_reveal=2
    5 弑父             [极端手段, 蜕变]        cost=人性
    6 与巫妖王合体     [力量获取, 终局]        turn_hint=真失败

goal_lines: 伊利丹       template_key=corrupt
  goal: 消灭巫妖王，夺取力量
  motive: 被囚万年的怨恨与对力量的渴望
  pillar_start=3  pillar_end=7
  stages:
    1 获得古尔丹之颅   [力量获取]              world_reveal=1
    2 化身恶魔         [蜕变]                  cost=族人不认
    3 进攻冰封王座     [终局, 正面对抗]

goal_conflicts:
  goal_a=阿尔萨斯线  goal_b=伊利丹线
  conflict_type=zero_sum   over_what=巫妖王的存亡
  stage_a_at=6  stage_b_at=3  pillar_at=6
  → 窗口开启时：A 到第 6 阶段 + B 到第 3 阶段 + 支柱 6（终极考验）
  → 生成「冰封王座决战」（阶段 4；阶段 2 只查出窗口）
```

---

## 三、前端页面清单（回答你问题 4）

### 3.1 目标线并入人设页（`CharactersPage.tsx`，现有 415 行）

现有右栏是 Card 堆叠：基本信息 → 角色状态 → 性格标签 → …。**新增两张 Card 插在末尾**：

| Card | 位置 | 内容 |
|---|---|---|
| **① 目标线** | 性格标签 Card 之后 | 本角色的线（可多条，Chip 切换） |
| **② 目标冲突** | 目标线 Card 之后 | 项目级、跨角色 |

**① 目标线 Card**
- 头部：本角色的线列表（Chip：`复仇线 · 3/6 阶段`，当前高亮）+「新建目标线」按钮
- 线头字段：标题（Input）/ 目标（TextArea 一行）/ 动机（Input）/ 完成条件（Input）/ 状态（Chip 五选一）/ 优先级（1~10）/ 支柱区间（两个数字）
- 阶段表格（每行可编辑，可增删行、可上下移）：
  `序号 | 阶段名 | stage_tags（下拉多选，12 词）| cost | turn_hint（下拉：无/假胜利/假失败/真胜利/真失败）| world_reveal | 状态`
- 底部：「推进到下一阶段」按钮（写 `current_stage + 1`、上一阶段 `status=done` + `day_done`）——阶段 2 是**手动推进**，引擎自动推进是阶段 4

**② 目标冲突 Card（项目级）**
- 列表每行：`阿尔萨斯线 · 伊利丹线` + 类型徽章（zero_sum/rivalry/…）+ 窗口（`A≥6 且 B≥3，支柱 6`）+ **实时判定徽章**（`未到窗口` / `窗口已开 N 天` / `已爆发`）
- 新建：选 A 线 → 选 B 线 → 选类型（5 个 Chip）→ 填争夺对象 → 设 `stage_a_at / stage_b_at / pillar_at`（数字 + 支柱下拉）→ 保存
- 「手动引爆」按钮（`trigger_mode` 含 manual 时可用）：写 `status=active` + `manual_ignited_day`

### 3.2 框架页（`FrameworkPage.tsx`）新增一张只读小卡

**「本支柱待爆发冲突」**：列出 `pillar_at = 当前支柱` 且 `status=latent` 的冲突，标出"两线各到第几阶段"。
约 20 行代码，直接服务你的验收 3（"能查出爆发窗口"）。**框架页仍独立，不并入人设页**；导航仍是现有 9 项，不新增顶级项。

### 3.3 录入步数：**两步**（回答你问题 4）

| 步 | 做什么 | 为什么 |
|---|---|---|
| 第 1 步 | 选模板（6 张卡，卡上写「复仇线 · 4 阶段 · 适用：血仇/追杀」）→ 填 3 个名词：目标 / 动机 / 完成条件（线标题按模板自动带出，可改） | 用户只回答"谁想要什么" |
| 第 2 步 | 阶段表格：模板已生成 4~5 行骨架，**改阶段名 + 勾 stage_tags + 填 cost** → 保存 | 阶段名是用户最想改的东西，不能省 |
| 可跳过 | 第 2 步直接「用模板默认」保存 | 对应你的验收 5「选模板后只改名词」 |

为什么不是 1 步：阶段名不给用户看一眼就存，出来全是「查明真相/第一次清算」这种占位词，等于没录。
为什么不是 3 步：第 3 步能放的只有"冲突"，而冲突是跨角色的，放在单线向导里会让人以为"一条线只能有一个冲突"。

---

## 四、API 清单（全部挂 `/projects/{pid}/`）

| 方法 | 路径 | 用途 |
|---|---|---|
| GET | `/goal-templates` | 模板库 6 条（含阶段骨架 + 12 词词表） |
| POST | `/goal-templates/{key}/instantiate` | 选模板 → 建线 + 阶段骨架 |
| GET/POST | `/goal-lines` | 列表（可按 holder 过滤）/ 新建 |
| GET/PUT/DELETE | `/goal-lines/{id}` | 单条线 |
| GET/POST | `/goal-lines/{id}/stages` | 阶段列表 / 新增阶段 |
| PUT/DELETE | `/goal-stages/{id}` | 改 / 删阶段 |
| POST | `/goal-lines/{id}/advance` | 手动推进到下一阶段 |
| GET/POST | `/goal-conflicts` | 冲突列表 / 新建 |
| GET/PUT/DELETE | `/goal-conflicts/{id}` | 单条冲突 |
| POST | `/goal-conflicts/{id}/ignite` | 手动引爆 |
| GET | `/goals/clash-window?pillar=&day=` | **爆发窗口查询**（验收 3） |

---

## 五、向后兼容与测试计划（对应你验收 4、1）

**向后兼容怎么保证**（第 1 号验收）：
- 阶段 2 **不往 `ProjectSnapshot` 里塞目标线**，引擎一行不读这三张表 → 三表空时推演路径与改动前**逐字节相同**
- `load_snapshot` 不动 `MainQuestView` 的填法，`mainline_hits` 不受影响
- 自证：改动前后各跑一次 `_diag14`，比对 day / month / year / epoch 四条占比与事件序列

**新增测试**：
| 文件 | 内容 |
|---|---|
| `tests/test_goal_lines.py` | 三表 CRUD、模板实例化、`stage_tags` 非法值 409、`advance` 流转 |
| INV-17（并入 `test_invariants.py`） | 老库缺三表 → `open_project` 补建；**空三表时推演结果与基线一致** |
| INV-18 | 魔兽双线 fixture：A 到 6 / B 到 3 / 支柱 6 → 查出窗口；**反向**：把 `stage_b_at` 改成 99 → 必须查不出窗口（非空断言） |

INV-17 会把三张新表加进现有「旧库补表」那条 INV 的表名清单（现在是 trait_aliases / story_pillars / world_reveal_layers 三张）。

---

## 六、五问回应速览

| # | 你的问题 | 我的回应 |
|---|---|---|
| 1 | 三表怎么设计，尤 `goal_conflicts` | 见 §1.2~1.4。核心增量：`window_open_day`（递增掷骰必须落库，否则可复现性破）+ `dice_base/step/cap`（默认 0.30/0.10/0.90，可按冲突调）+ `trigger_mode/manual_ignited_day`（手动引爆）。**dice 三参数是否保留请你拍** |
| 2 | 模板库 stage_tags 谁定 | 我定第一版：12 词词表 + 6 条模板（§2.1、§2.2），你复核。另需你确认：模板库放代码常量还是建表（§2.3，我倾向常量） |
| 3 | 魔兽双线 stage_tags 谁写 | 我写，见 §2.4，按方案 §4.2 例子落成受控词（「堕落」→「蜕变」） |
| 4 | 表单几步 | 两步：选模板+3 名词 → 阶段表格微调（可跳过直接用默认）。见 §3.3 |
| 5 | 工作量，能否与阶段 1 剩余合并 | 纯目标线 **1.5~2 天**（与你 §8 估的一致）；阶段 1 只剩 C 档 archetype 填充入口（方案 §11.2 说与目标线同一交互、合并省一次前端改造），带上它 **+1 天**。我建议本批一起做，但任务书说"不强制"，**听你的** |

## 七、顺带已做的一件小事（回应你的决策 1 可选建议）

`ev-legacy-surface`（传承现世）已加标 `[1]`，现在是 `[1, 2, 4]`——采纳你"开局拿到不该拿的东西埋线"的理由。它是 year/epoch 里唯一进支柱 1 的一条，支柱 1 整体仍靠 day 级琐事铺陈，不推翻那个结论。
复跑：`pytest 65 passed`；`_diag20` A 组 50.0% vs B 组 37.9%（+12.1pp，仍达标）。

---

_CodeBuddy · 2026-10-07 · 字段名/类型/导航结构均经真实代码核实（`models/project_lib/framework.py` 写法、`App.tsx` NAV 9 项、`CharactersPage.tsx` 415 行 Card 堆叠结构），非记忆推断_
