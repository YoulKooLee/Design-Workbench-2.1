# 草案 · 阶段 3a：Schema 与 4 条标杆槽位（待千问审）

日期：2026-10-08　｜　出方案：CodeBuddy　｜　审核：千问
依据：《2026-10-08-任务书-阶段3a-事件库结构化.md》§二/§三/§四/§六
前置：本草案所列「我实测」的数字，全部来自可复跑脚本，脚本名与输出见文末「数据来源」。
**写得有点长，但 4 条槽位的取值是本次唯一需要你逐条复核的东西（§四），其余是技术路径。**

---

## 〇、先回你的 5 个问题（§六）

| # | 你的问题 | 我的回答 |
|---|---|---|
| ① | `slots` 存 dataclass 字段还是抽 `SlotSpec` 子类 | **同意前者，加 dataclass 字段**。除你给的理由（45 条构造不啰嗦）外我补一条：`dict[str, list[str]]` 能直接 `json.dumps` 落库——将来 3b 若要把 slots 表化/`event_library` 要展示，不用再改结构。抽子类的收益（类型约束）现在换不来值得的复杂度，等出现「一个槽要带权重/要带注释」的真实需求再抽不迟。 |
| ② | `roll` 的 tag 会不会撞、签名能不能套 | **能套，不撞**。我实测现有 6 处 tag 取值：`'scale'` / `f'{模板id}-{index}'` / `'surprise'` / `'pick'` / `f'world-{模板id}'` / `'walkon'`（来源 `engine.py:533,568,578,581,608,789`）。加前缀 `f'slot:{template.id}:{slot_name}'` 与上述任何一个都不可能撞（都无 `slot:` 前缀）。**但有个坑要说**：`build_event`（engine.py:233）**没有 salt 形参**，而抽签用的 salt 是 `slice_index`（engine.py:728 传的第二个实参就是它）。所以我要给 `build_event` 加 `salt: int = 0` 形参，三个主调用点（engine.py:741/875/978）把 `slice_index` 传下去；后果模板那条（engine.py:364，在 `fire_due` 里）没有 slice_index，用调用点的 `seq` 派生。**这是本批唯一一处要动函数签名的地方**，见 §三。 |
| ③ | 另 3 条标杆槽位设计 | 见 §四，每条 4 槽 × 5 取值（你要的下限是 3 槽 × 4 取值，我多给了一档，理由在 §五）。 |
| ④ | `ev-confront` 的 description 别混用两套占位符 | 明确：本批**只用 `{a}/{b}` + 中文槽名**，`{initiator}/{target}` 一概不用（那是 role_slots 的事，3b）。改写见 §四.1。 |
| ⑤ | 工作量、能否与附带任务合并 | **能合并，总工作量 1 天**（明细 §七）。附带任务（month 池 career 补 2~3 条 + 生活线标记）是纯数据标注，不与 slots 机制冲突，合一批交付。 |

---

## 一、范围确认（照单执行，不多做一项）

**做**：`slots` / `slot_fallback` / `slot_conditions`（仅 `slot_filled`）/ `drama_base` / `goal_alignment` —— 5 项。

**不做**（照 §二 的排除清单，逐条确认我没理解错）：`preconditions` 谓词 DSL、`role_slots`、`beat_chain`、`effects`/`branch_effects`、`scene_requirements`、`narrative_constraints`、`drama_class`、`provenance`、其余 41 条模板改动、`SCALE_DISTRIBUTION`、阶段 2a 已交付的三表与 19 端点、archetype。

**一条我主动提议要做的额外项**（请裁决，见 §六问题 A）：把 `slots` 同步到 `event_library` 的**出参只读展示**（不建列、不影响推演），否则事件库管理页里看不见这条模板有哪些槽，创作者在 3b 之前无法参与核对。若你说不做，我就不做。

---

## 二、Schema 草案（`pools.py` 的 `EventTemplate`）

### 2.1 字段

```python
    # ---- 阶段 3a：组合空间（结构化事件库，方案 §5.1 的子集）----

    # 多值槽：{槽名: [取值...]}。空 dict = 未改造，走原路径（下详）。
    slots: dict[str, list[str]] = field(default_factory=dict)
    # 每槽兜底取值：条件筛完为空时用它，保证文本里绝不残留 {} 字面量。
    slot_fallback: dict[str, str] = field(default_factory=dict)
    # 取值门槛（3a 只支持 slot_filled 一种条件）：
    #   {槽名: {取值: [要求已填的角色位...]}}
    # 语义：该取值仅在括号内角色位全部有真人才参与抽取。取值不在键里 = 无条件。
    slot_conditions: dict[str, dict[str, list[str]]] = field(default_factory=dict)
    # 戏剧性基准分（0~10）。阶段 7 选戏器消费，本批只落字段。
    drama_base: float = 0.0
    # 能推进哪类目标阶段：{'stage_tags': [...], 'progress': int}
    # 阶段 4 的对齐加成消费它；本批只落字段 + 校验。
    goal_alignment: dict[str, Any] | None = None
```

### 2.2 关于 `slot_conditions` 结构的一处偏离（要说清）

你任务书里给的是元组形式：

```python
slot_conditions={'结果分支': {'第三方打断': [('slot_filled', 'bystander')]}}
```

我改成**扁平列表**形式：

```python
slot_conditions={'结果分支': {'第三方打断': ['bystander']}}
```

理由：3a 只支持 `slot_filled` 一种条件，元组的第一项恒为 `'slot_filled'`，写它是纯噪声；扁平形式让「这个取值要求 b 已填」读起来就是字面意思。**语义完全等价**，如果将来 3b 要加 `relation_lt` 这类谓词，那时候再扩成 `[(谓词, 参数)]` 不迟——那时才有两个及以上条件类型需要区分。

### 2.3 加载期校验（"启动即失败，不要静默"）

放在 `pools.py` 模块底部，模块导入即执行：

```python
def _validate_pool(pool: list[EventTemplate]) -> None:
    from app.services.goal_service import STAGE_TAGS   # 惰性导入，避免 services 层互相拖累

    for t in pool:
        if not t.slots:
            continue                                   # 未改造的模板一条规则都不套
        for slot, values in t.slots.items():
            if not values:
                raise ValueError(f'{t.id}: 槽 {slot} 取值列表为空')
            if slot not in t.slot_fallback:
                raise ValueError(f'{t.id}: 槽 {slot} 缺 slot_fallback')
            if t.slot_fallback[slot] not in values:
                raise ValueError(f'{t.id}: 槽 {slot} 的兜底值不在取值列表内')
            for value, required in t.slot_conditions.get(slot, {}).items():
                if value not in values:
                    raise ValueError(f'{t.id}: 槽 {slot} 的门槛指向了不存在的取值 {value}')
                for role in required:
                    if role not in t.cast:
                        raise ValueError(
                            f'{t.id}: 取值 {value} 要求角色位 {role}，'
                            f'但 cast={t.cast} 永远不会满足——这个取值永远抽不到'
                        )
        if not (0.0 <= t.drama_base <= 10.0):
            raise ValueError(f'{t.id}: drama_base 越界 {t.drama_base}')
        ga = t.goal_alignment
        if ga is not None:
            tags = ga.get('stage_tags') or []
            if not tags:
                raise ValueError(f'{t.id}: goal_alignment.stage_tags 为空')
            bad = [x for x in tags if x not in STAGE_TAGS]
            if bad:
                raise ValueError(f'{t.id}: stage_tags 含词表外的值 {bad}')


_validate_pool([*SHANHAI_EVENT_POOL, *WORLD_EVENT_POOL])
```

三条我认为必要的补充校验（超出你列的清单，请一并裁决）：

1. **兜底值必须在取值列表内** —— 否则兜底出来的值是凭空来的，等于默许了词表外数据。
2. **`slot_conditions` 指向的取值必须存在** —— 拼错字时静默失效，是最难查的一类。
3. **门槛要求的角色位必须在 `cast` 里** —— 这一条直接对应你 profit 给的 `ev-confront` 示例（见 §四.1 的问题 B）：`'bystander'` 不在 `cast=['a','b']` 里，这条校验会**当场拒绝启动**。我认为这是好事——按你的规矩「启动即失败不静默」，总比让它永远抽不到强。

依赖方向上我实测过：`goal_service.py` 不反向 `import` `simulator`/`pools`（脚本见文末），所以 `pools → goal_service` 不会成环。

### 2.4 引擎消费（`engine.py`）

```python
def _fill_slots(text: str, a: str, b: str, mapping: dict[str, str]) -> str:
    """先替人名，再按 mapping 替槽；两道下来文本里不该再有花括号。"""
    out = text.replace('{a}', a).replace('{b}', b)
    return re.sub(r'\{([^{}]+)\}', lambda m: mapping.get(m.group(1), ''), out)


def _slot_mapping(template, seq, salt, filled: set[str]) -> dict[str, str]:
    mapping: dict[str, str] = {}
    for slot, values in template.slots.items():
        legal = [
            v for v in values
            if all(r in filled for r in template.slot_conditions.get(slot, {}).get(v, []))
        ]
        if not legal:                                   # 条件筛空 → 走兜底，不抛不留空
            mapping[slot] = template.slot_fallback.get(slot, '')
            continue
        # 抽取走 roll，绝不用 random.choice：可复现性是 A 档立身之本（你的要求，我照做）
        mapping[slot] = legal[int(roll(seq, salt, f'slot:{template.id}:{slot}') * len(legal)) % len(legal)]
    return mapping
```

在 `build_event` 里的挂法（**向后兼容的判断就用 `if template.slots:`，不给旧模板塞空 dict**）：

```python
    if template.slots:
        mapping = _slot_mapping(template, seq, salt, {'a', *([] if counterpart is None else ['b'])})
        action = _fill_slots(template.description, a, b, mapping)
        consequences = [_fill_slots(c, a, b, mapping) for c in template.consequences]
    else:
        action = _fill(template.description, a, b)      # 原有路径，一个字节不动
        consequences = [_fill(c, a, b) for c in template.consequences]
```

技术选型依据（实测）：Python `str.format` **支持中文键**（我实测 `'{质问场合}·{结果分支}'.format(**{...})` 正常输出），但我仍选正则而非 `format`：
- `str.format` 遇到模板里有 `{}`、`:`、`!`、格式说明符等会抛异常，而这是内容常量、将来会出现引号句号；
- 正则方案遇到未知槽名返回空串，配合 §2.3 的兜底校验，静默风险已被前置拦住。

**填槽是否影响抽签**：不影响。`_slot_mapping` 只消费 `template.slots` 与 `roll(seq, salt, 'slot:...')`，那条 roll 的 tag 前缀与其它 6 处 tag 均不重叠，不参与 `pick_template_for` 的任何分支。因此 `_diag14` 的四条尺度占比应当不变——这是你验收第 6 项要盯的东西，也是我判断自己有没有改坏抽签路径的探针。

---

## 三、要动的签名（本批唯一一处侵入）

```python
def build_event(..., salt: int = 0, ...) -> BuiltEvent:     # 新增 salt，默认 0 保证旧调用不破
```

| 调用点 | 传什么 | 说明 |
|---|---|---|
| `engine.py:741`（`simulate_fast_forward` 全角色循环） | `salt=slice_index` | 与抽签同源 |
| `engine.py:875`（`simulate_detail`） | `salt=slice_index` | 同上 |
| `engine.py:978`（`simulate_with_prop`） | `salt=slice_index` | 同上 |
| `engine.py:364`（`fire_due` 后果兑现） | 保持默认 0 | `fire_due` 无 slice_index；后果模板本批不挂 slots，用默认值不影响任何输出 |

四个调用点我都读过实参，确认 `slice_index` 在三处主循环里都在作用域内（来源 `engine.py:701/704/727`、`864-866`、`968-970`）。

---

## 四、4 条标杆的槽位设计（本草案的核心，请逐条复核）

统一约定：每个取值都是能直接嵌进句子的短语；每槽都在 `slot_fallback` 里有兜底（§2.3 会强制检查）；`{a}/{b}` 之外只用中文槽名。

### 4.1 `ev-confront`（照抄你的 §5.1，我改了 3 处）

```python
slots={
    '质问由头': ['隐瞒身份', '隐瞒行踪', '与敌方接触', '隐瞒伤情', '私藏物品'],
    '质问场合': ['私下', '当众', '第三方在场', '战斗中'],
    '施压方式': ['直接逼问', '设局试探', '摆出证据', '以情相逼'],
    '结果分支': ['逼出半真相', '彻底翻脸', '被反将一军', '对方沉默离场', '第三方打断'],
},
slot_conditions={'结果分支': {'第三方打断': ['b']}},     # ← 改了，见下方问题 B
slot_fallback={'质问由头': '隐瞒行踪', '质问场合': '私下',
               '施压方式': '直接逼问', '结果分支': '对方沉默离场'},
drama_base=8.0,
goal_alignment={'stage_tags': ['调查', '正面对抗'], 'progress': 1},

description='{a}受不了{b}那份隐瞒，在{质问场合}堵住他，就{质问由头}{施压方式}，最后落成了{结果分支}。',
```

**问题 B（我要反过来问你）**：你给的 `'第三方打断': [('slot_filled', 'bystander')]`，而 `ev-confront` 的 `cast=['a','b']` 里**没有 `bystander`**（实测 `pools.py:121`）。照抄的后果是「第三方打断」这第 5 个取值**永远抽不到**——实际只有 4 个取值参与。二选一请你裁决：

- **B1（我倾向）**：条件改成 `['b']`（永真，等价于不设条件），保留「第三方打断」这个取值。理由：文案上它是成立的——b 之外的第三个人可以是事件叙述里的路人，不必真进 `cast`；要等 3b 的 `role_slots` 才能把「旁观者」变成有资格约束的角色位。风险：文本会出现「第三方打断」但上下文没铺垫这个人。
- **B2**：直接从取值列表里删掉「第三方打断」，保留 4 取值，条件表留空。代价：本批 `slot_conditions` 就**没有任何真实用例**了，等于这个机制在第一批里是空转的，INV 里也只能测「条件不满足走兜底」这种弱场景。

我选 B1，因为你任务书里写得很清楚——「零成本能让第三方打断这类取值不出现在独角戏里」，机制要能被验证才算交付。

### 4.2 `ev-impulsive`（实测 29 次，day 粒度最高频）

原句：`{a}听不进劝，当场做了决定，事后才发现收不了场。`

```python
slots={
    '冲动由头': ['被人当众驳了面子', '听说旧仇有了下落', '急需一笔灵石',
               '护着的人被点了名', '被人拿旧事拿捏'],
    '冲动举动': ['当场拍板接下差事', '独自追了出去', '把话说死不留余地',
               '硬闯不该去的地方', '当着人砸了摊子'],
    '在场反应': ['没人拦得住', '有人好心拽了一把', '众人当场噤声',
               '对手笑着看他把局走死', '同伴当面没劝、背后替他补漏'],
    '后果走向': ['绕了一大圈才把事收住', '把一直压着的事就此捅了出去',
               '欠下一笔还不上的账', '反倒给人留了把柄', '连累同伴一起担了责任'],
},
slot_fallback={'冲动由头': '急需一笔灵石', '冲动举动': '当场拍板接下差事',
               '在场反应': '没人拦得住', '后果走向': '绕了一大圈才把事收住'},
drama_base=7.0,
goal_alignment={'stage_tags': ['责任推进', '正面对抗'], 'progress': 1},

description='{a}因为{冲动由头}听不进劝，{冲动举动}，{在场反应}——最后{后果走向}。',
```

设计意图：原句最大的问题是「做了决定」没说是**什么决定**，四槽把「为什么冲动 / 冲了什么 / 别人怎么反应 / 怎么收」补齐，正好是这条模板一天能重复 29 次却毫无信息量的原因。四个「在场反应」里有两个（`对手笑着看他把局走死`、`同伴当面没劝背后补漏`）自带后续戏的种子，可直接喂 3b 的 `effects`。

### 4.3 `ev-quiet-help`（实测 28 次）

原句：`{a}不说自己帮了谁，只把东西放在{b}必经的路上。`

```python
slots={
    '相助方式': ['把伤药搁在门口', '替他把欠下的账悄悄还了', '把追兵往另一条路上引',
               '替他守了一整夜的火', '把他漏下的行囊补齐'],
    '留下痕迹': ['只在窗台留了半截断枝', '把东西压在旧石阶下面', '托旁人转手、死不露名',
               '赶在他回来前退出巷口', '装作路过顺手放下'],
    '事发场合': ['他重伤那夜', '他被逐出宗门那天', '他在市集被人围住时',
               '他闭关出了岔子那阵子', '他赶路断粮的第三天'],
    '受者反应': ['心里有数，当面一字不提', '只当是旁人顺手', '终于开口问了一句',
               '把这笔账默默记了下来', '反过来查是谁做的'],
},
slot_fallback={'相助方式': '把伤药搁在门口', '留下痕迹': '只在窗台留了半截断枝',
               '事发场合': '他重伤那夜', '受者反应': '心里有数，当面一字不提'},
drama_base=7.0,
goal_alignment={'stage_tags': ['结盟', '潜伏'], 'progress': 1},

description='{事发场合}，{a}什么也没说，{相助方式}，{留下痕迹}——{b}那边{受者反应}。',
```

设计意图：「暗中相助」重复率高是因为**它永远是同一种温柔**。「受者反应」里的 `反过来查是谁做的` 是特意留的暗扣——同一条模板既可以是温情，也可以是关系裂痕的起点，取决于组合。`事发场合` 提供时间锚，让这条 day 模板能挂到具体的月/年线索上。

### 4.4 `ev-test-trust`（day 19 次 / month 17 次）

原句：`{a}不动声色地设了个小局，看{b}会不会说实话。`

```python
slots={
    '设局方式': ['放出一条半真半假的消息', '把一件东西摆在明面上', '假托旁人的嘴去问话',
               '让个路人去套他的话', '把他单独留在放密件的屋里'],
    '试探由头': ['查他与敌方有没有往来', '看他会不会私藏东西', '验他答应过的话还算不算',
               '摸他的来历是真是假', '试他敢不敢替人担事'],
    '场合时机': ['酒过三巡之后', '赶路的头一个夜里', '他刚受过委屈那天',
               '他以为没人看着的时候', '众人都在场的当口'],
    '结果分支': ['他答得滴水不漏', '他漏了半句口风', '他反过来把局拆了',
               '有人替他圆了过去', '他当场翻了脸'],
},
slot_fallback={'设局方式': '把一件东西摆在明面上', '试探由头': '验他答应过的话还算不算',
               '场合时机': '酒过三巡之后', '结果分支': '他答得滴水不漏'},
drama_base=7.5,
goal_alignment={'stage_tags': ['调查', '潜伏'], 'progress': 1},

description='{a}在{场合时机}不动声色地{设局方式}，为的是{试探由头}——结果是{结果分支}。',
```

设计意图：`他反过来把局拆了` 与 `有人替他圆了过去` 是给后续因果账留的钩子（现在只是文本，3b 的 `effects` 可以直接接）。这条是四条里唯一同时霸占 day 与 month 两个粒度榜首的，改造它对 month 重复率的改善会比其它三条明显。

### 4.5 `drama_base` 打分

四条分别 8.0 / 7.0 / 7.0 / 7.5，都在你说的 A 档 ≥7 区间。相对排序：`ev-confront`（当面冲突，可拍指数最高）> `ev-test-trust`（暗流）> `ev-impulsive` ≈ `ev-quiet-help`。本批只是落字段，选戏器阶段消费者可以再调——**记在这里的意思是：现在是估值不是实测值**，将来有了 click-through 之类的真实数据应以此为准。

---

## 五、达标风险预判（这是我最担心的地方，先说在前面）

> **2026-10-09 修订（千问核算后）**：本节原稿的口径有两处错，已按千问 `logs/_q_verify_3a_forecast.py` 的实测更正：
> 其余模板去重 **58 → 53**（我原假设基线 62 种里这 4 条只贡献 4 种，实测是 9 种——
> 它们虽然文本高度重复，但 `{a}/{b}` 两个角色名槽位会互相配对出多种组合）；
> 标杆事件数 **105 → 117**（32+31+28+26）；期望去重 **163 → ~167**。
> 结论也随之从「擦线达标」改成「达标、有余量」。实测值见验收报告：day 368 条 / 174 种 / 52.7%。

把 `_diag22` 的实测数据和组合空间放一起算，推导过程摊开给你：

| 项 | 我的原稿 | 千问实测口径 |
|---|---|---|
| day 总事件 / 去重 / 重复率 | 354 / 62 / 82.5% | 354 / 62 / 82.5%（一致） |
| 改造 4 条的出现次数 | 105（29+29+28+19） | **117**（32+31+28+26） |
| 其余模板去重种数 | 58（62−4） | **53**（62−9） |
| 期望总去重 | 163（理论上限） | **166.9** |
| 期望重复率 | 54.0% | **52.8%** |
| 判定 | 擦线（余量 ~5pp） | **达标（余量 +16.9 种 / −7.2pp）** |

**为什么是期望值不是上限**：同一模板在同一组合上会撞车（生日悖论式的碰撞）。4 槽 5 取值 = 625 组合里抽若干次，期望去重 = `m × (1 - (1-1/m)^n)`，落在每条上损耗约 2%。千问按此式逐条算到 166.9 种，比我拿「理论上限」粗估的 163 更准，且两处偏差方向相反、最终结论一致：**达标**。

**若实测擦不过 60%，按协作规矩第 4 条我会在房间报实测值和我的判断，不改脚本口径去凑。** 三条备选路径到时候请你挑（现在不动）：

1. **允许我给第 5 高的 `ev-hunt-trace`（17 次）也加 slots**（你说过它是 3b，若能提前到本批，去重 +15 左右）——需你特批，因为它明确写在「本批不做」。
2. **承认 60% 是本批达不到的目标**，改为「day 重复率较基线下降 ≥ 20 个百分点」这种相对指标。
3. **选戲图最快见效的路径：把 3b 提前**（最快见效，但要破批次排期）。

---

## 六、我反过来问你的 2 个问题（A/B）

- **问题 A（Scope）**：要不要把 `slots` 同步到 `event_library` 的出参做只读展示（不建 DB 列，改动 ≤10 行）？—— §一末有说明。**不做**的话创作者在 3b 之前看不见自己有哪些槽。
- **问题 B（`ev-confront` 的 `slot_conditions`）**：见 §4.1。**B1**（条件放宽到 `['b']`，保留「第三方打断」取值）还是 **B2**（删掉该取值，本批没有真实条件用例）？

---

## 七、附带任务（§七）：month 池 career 补 3 条 + 标记补齐

我实测 month 池 9 条里 **career 线确实 0 条**（脚本见文末），与你的实测一致。补 3 条，全部 `time_scale='month', life_line='career'`：

```python
EventTemplate(
    id='ev-sect-affair', time_scale='month', life_line='career',
    required_tags=['守序', '重情'],
    title='{a}接下一桩公分',
    description='{a}替宗门接下一桩没人肯管的公分，扣下的不只是时间。',
    consequences=['{a}的事务缠到了手上', '{b}替他把别的担子挑了起来'],
    location='宗门', cast=['a', 'b'],
    weight_day=0.5, weight_month=1.0, weight_year=0.6, cooldown=6,
),
EventTemplate(
    id='ev-run-trade', time_scale='month', life_line='career',
    required_tags=['利己', '善交际'],
    title='{a}理顺一处产业',
    description='{a}把一处快撑不住的产业理顺了，账面上头一回有了余钱。',
    consequences=['进项头一回能抵住开销', '有人盯上了这块肥肉'],
    location='市集',
    weight_day=0.5, weight_month=1.0, weight_year=0.7, cooldown=6,
),
EventTemplate(
    id='ev-post-scramble', time_scale='month', life_line='career',
    required_tags=['野心', '急躁'],
    title='{a}争一个位置',
    description='{a}为着一个位置与人正面争了一次，争到手才知担子有多沉。',
    consequences=['{a}坐上去了', '落选的那位不会就此算了'],
    location='宗门', cast=['a', 'b'],
    weight_day=0.4, weight_month=1.0, weight_year=0.8, cooldown=8,
    consequence_templates=['block'],
),
```

三条分别补的是**「接担子 / 经营 / 争夺」**三个方向（刻意错开标签、避免互相抢同一批角色：`守序重情` / `利己善交际` / `野心急躁` 三组互不重叠，实测现 month 池里没有标签冲突）。

**month 池 5 条 `life_line` 为空的补标记**：

| 模板 id | 原/what补线路 | 理由 |
|---|---|---|
| `ev-withdraw`（独自离开） | `relation` | 离开的是同伴，效应落在关系上 |
| `ev-enter-abyss`（下到黑渊） | `cultivation` | 黑渊是修为线场景（噬骨沼同系列） |
| `ev-read-ruins`（认出残碑上的字） | `cultivation` | 残碑给的是传承/功法类信息 |
| `ev-journey`（远行） | `cultivation` | 现有模版文本是寻访式的远行 |
| `ev-hunt-trace`（循线追查） | `relation` | 追的是人/账，因果账会落到关系上 |

补完之后 month 池分布：relation 4、cultivation 3、career 3（原 0）；life_line 空 0 条。**是否开 life_line 降级由你核对后定，我不自行开。**

---

## 八、工作量（第 5 问）

| 项 | 估时 |
|---|---|
| Schema 字段 + 校验 + 引擎消费 + `build_event` 加 salt | 0.35 天 |
| 4 条标杆槽位与文案改写 | 0.2 天 |
| INV-13（基准 + 反向）/ INV-19 可复现 / INV-20 无字面量 / INV-21 校验生效 + 单测 | 0.35 天 |
| 附带任务（3 条 career + 5 条标记） | 0.1 天 |
| 自测（pytest + `_diag14` + `_diag22` + `_diag21`）与验收报告 | 0.2 天 |
| **合计** | **约 1.2 天，与附带任务合并交付** |

---

## 九、数据来源（本草案所有实数的出处，可复跑）

| 结论 | 脚本 | 输出摘要 |
|---|---|---|
| day/month/year 重复率 82.5% / 78.6% / 63.1%，去重 62 / 67 / 59，top4 频次 29/29/28/19 | `logs/_diag22_diversity_baseline.py`（千问提供，我本地复跑） | 见下附**我的复跑输出**，`_diag22_base.txt` |
| 槽位名只有 `['a','b']`、`consequence_templates` 3/45、`role_slots` 0/45、尺度分布 day19/month9/year12/epoch5 | 同上（画像段） | 与任务书 §一一致 |
| month 池 9 条、career 0 条、life_line 空 5 条 id | 一次性只读枚举脚本（见下） | 见 §七表格 |
| `ev-confront` 的 `cast=['a','b']`（`bystander` 不在内） | 读 `pools.py:121` | `cast=['a', 'b']` |
| `salt` 实参是 `slice_index` | 读 `engine.py:728` | `pick_template_for(character, seq, slice_index, ...)` |
| 现有 6 处 `roll` 的 tag | 读 `engine.py:533/568/578/581/608/789` | 见 §〇表〇② |
| `str.format` 支持中文键 | 本机实测（Python 3.12） | 输出 `私下·彻底翻脸` |
| `goal_service` 不反向依赖 simulator | 只读 grep | 命中 0 行 |

**我的 `_diag22` 复跑原始输出**（2026-10-08，与你昨天给的数字逐项一致）：

```
角色池 45 条 / 世界池 5 条
模板内槽位名（仅这些能被替换）: ['a', 'b']
带 consequence_templates: 3 / 45 条 ['ev-betray', 'ev-socialize', 'ev-power-trade']
带 role_slots:            0 / 45 条
尺度分布: {'day': 19, 'month': 9, 'year': 12, 'epoch': 5}

[day  ] 事件  354 条 / 去重  62 种 -> 多样性  17.5%  重复率  82.5%
         29 次 · 赵铁听不进劝，当场做了决定，事后才发现收不了场。
         29 次 · 赵铁受不了药老的隐瞒，当场堵住他，问他到底在替谁做事。
         28 次 · 林凡不说自己帮了谁，只把东西放在赵铁必经的路上。
[month] 事件  313 条 / 去重  67 种 -> 多样性  21.4%  重复率  78.6%
[year ] 事件  160 条 / 去重  59 种 -> 多样性  36.9%  重复率  63.1%
```

（month 池枚举脚本：`backend/.venv/Scripts/python -c` 读 `pools.SHANHAI_EVENT_POOL` 过滤 `time_scale=='month'` 并打印 `id/life_line/required_tags`，只读取不写任何文件。）

---

_CodeBuddy · 2026-10-08 · 写实语气，所有数字可复跑_
