# -*- coding: utf-8 -*-
"""Generate / refresh statistic family (UTF-8). Run from frame/web:
  python scripts/_gen_statistic_variants.py
"""
from __future__ import annotations

from catalog_io import load_catalog, save_catalog

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
STAT = ROOT / "components" / "statistic"
CATALOG = ROOT / "_meta" / "config.json"

MEMBERS = [
    {
        "subdir": "default",
        "slug": "statistic-default",
        "label": "统计数值",
        "lead": "基础概览指标；大数默认开千分位，卡内多组并排。",
        "rules": "真 a-statistic；`show-group-separator`；外层 `.wa-stat-row` 排多组",
        "visual": "三列计数指标；千分位可读；无货币前缀、无单位后缀",
        "body": "default",
        "needs_setup": False,
    },
    {
        "subdir": "prefix",
        "slug": "statistic-prefix",
        "label": "前缀统计数值",
        "lead": "专用于金额：货币前缀 + 小数位。",
        "rules": "真 a-statistic；`#prefix` 插槽（无 prefix prop）；可配 `precision`",
        "visual": "¥ 前缀 + 两位小数；与计数类 default 区分",
        "body": "prefix",
        "needs_setup": False,
    },
    {
        "subdir": "suffix",
        "slug": "statistic-suffix",
        "label": "后缀统计数值",
        "lead": "带单位后缀的指标组（人、次、%）。",
        "rules": "真 a-statistic；`#suffix` 或 suffix 文案",
        "visual": "数字后单位后缀；三列",
        "body": "suffix",
        "needs_setup": False,
    },
    {
        "subdir": "extra",
        "slug": "statistic-extra",
        "label": "附加说明统计数值",
        "lead": "标题带图标，数字下方附带弱化说明文案。",
        "rules": "真 a-statistic；`#title` 含图标；`#extra` 用 `.wa-stat-extra`",
        "visual": "标题图标 + 数字 + 底部 12px 次要色说明",
        "body": "extra",
        "needs_setup": False,
    },
    {
        "subdir": "animation",
        "slug": "statistic-animation",
        "label": "动效统计数值",
        "lead": "数字滚动进场，适合仪表盘首屏。",
        "rules": "真 a-statistic；`animation`；可配 `animation-duration`",
        "visual": "滚动动效；三列",
        "body": "animation",
        "needs_setup": False,
    },
    {
        "subdir": "trend",
        "slug": "statistic-trend",
        "label": "趋势统计数值",
        "lead": "附加涨跌箭头与百分比，表达趋势。",
        "rules": "真 a-statistic；`#extra` 内趋势行（FA icon-trending-up/down）",
        "visual": "绿涨红跌；图标 + 百分比",
        "body": "trend",
        "needs_setup": False,
    },
    {
        "subdir": "countdown",
        "slug": "statistic-countdown",
        "label": "倒计时统计数值",
        "lead": "活动/截止倒计时，多组并排。",
        "rules": "真 a-countdown；`:value` 为截止时间戳",
        "visual": "时分秒倒计时；三列场景",
        "body": "countdown",
        "needs_setup": True,
    },
]


def wrap_row(items: list[str]) -> str:
    blocks = "\n".join(items)
    indented = "\n".join("  " + ln if ln else ln for ln in blocks.split("\n"))
    return f'<div class="wa-stat-row">\n{indented}\n</div>'


def body_default() -> str:
    return wrap_row(
        [
            '<a-statistic title="页面浏览" :value="1289604" show-group-separator></a-statistic>',
            '<a-statistic title="下载量" :value="986420" show-group-separator></a-statistic>',
            '<a-statistic title="消息数" :value="45218" show-group-separator></a-statistic>',
        ]
    )


def body_prefix() -> str:
    return wrap_row(
        [
            '<a-statistic title="成交额" :value="12680.5" :precision="2" show-group-separator>\n  <template #prefix>¥</template>\n</a-statistic>',
            '<a-statistic title="客单价" :value="186.5" :precision="2">\n  <template #prefix>¥</template>\n</a-statistic>',
            '<a-statistic title="退款金额" :value="1320" :precision="2" show-group-separator>\n  <template #prefix>¥</template>\n</a-statistic>',
        ]
    )


def body_suffix() -> str:
    return wrap_row(
        [
            '<a-statistic title="新增用户" :value="328">\n  <template #suffix>人</template>\n</a-statistic>',
            '<a-statistic title="打开次数" :value="4520">\n  <template #suffix>次</template>\n</a-statistic>',
            '<a-statistic title="转化率" :value="12.6" :precision="1">\n  <template #suffix>%</template>\n</a-statistic>',
        ]
    )


def body_extra() -> str:
    return wrap_row(
        [
            """<a-statistic :value="1284">
  <template #title>
    <span class="wa-stat-title"><icon-ordered-list :size="12"></icon-ordered-list>本周订单</span>
  </template>
  <template #extra>
    <span class="wa-stat-extra wa-stat-extra--up"><icon-trending-up :size="11"></icon-trending-up>较上周 +8.2%</span>
  </template>
</a-statistic>""",
            """<a-statistic :value="92" :precision="0">
  <template #title>
    <span class="wa-stat-title"><icon-check-circle :size="12"></icon-check-circle>完成率</span>
  </template>
  <template #extra>
    <span class="wa-stat-extra"><icon-tag :size="11"></icon-tag>目标 100%</span>
  </template>
</a-statistic>""",
            """<a-statistic :value="36">
  <template #title>
    <span class="wa-stat-title"><icon-clock-circle :size="12"></icon-clock-circle>待处理</span>
  </template>
  <template #extra>
    <span class="wa-stat-extra wa-stat-extra--warn"><icon-exclamation-circle :size="11"></icon-exclamation-circle>需今日跟进</span>
  </template>
</a-statistic>""",
        ]
    )


def body_animation() -> str:
    return wrap_row(
        [
            '<a-statistic title="访问量" :value="9280" animation :animation-duration="2000"></a-statistic>',
            '<a-statistic title="成交额" :value="2680" :precision="0" animation>\n  <template #prefix>¥</template>\n</a-statistic>',
            '<a-statistic title="转化率" :value="12.6" :precision="1" animation>\n  <template #suffix>%</template>\n</a-statistic>',
        ]
    )


def body_trend() -> str:
    return wrap_row(
        [
            """<a-statistic title="访问量" :value="9280" show-group-separator>
  <template #extra>
    <span class="wa-stat-trend wa-stat-trend--up"><icon-trending-up :size="12"></icon-trending-up> 12.4%</span>
  </template>
</a-statistic>""",
            """<a-statistic title="跳出率" :value="32.8" :precision="1">
  <template #suffix>%</template>
  <template #extra>
    <span class="wa-stat-trend wa-stat-trend--down"><icon-trending-down :size="12"></icon-trending-down> 3.1%</span>
  </template>
</a-statistic>""",
            """<a-statistic title="付费转化" :value="4.2" :precision="1">
  <template #suffix>%</template>
  <template #extra>
    <span class="wa-stat-trend wa-stat-trend--up"><icon-trending-up :size="12"></icon-trending-up> 0.6%</span>
  </template>
</a-statistic>""",
        ]
    )


def body_countdown() -> str:
    return wrap_row(
        [
            '<a-countdown title="秒杀结束" :value="deadlineFlash" format="HH:mm:ss"></a-countdown>',
            '<a-countdown title="报名截止" :value="deadlineSign" format="DD 天 HH:mm:ss"></a-countdown>',
            '<a-countdown title="维护倒计时" :value="deadlineMaint" format="HH:mm:ss"></a-countdown>',
        ]
    )


BODY_FN = {
    "default": body_default,
    "prefix": body_prefix,
    "suffix": body_suffix,
    "extra": body_extra,
    "animation": body_animation,
    "trend": body_trend,
    "countdown": body_countdown,
}


def stat_html(m: dict, indent: str = "") -> str:
    html = BODY_FN[m["body"]]()
    return "\n".join(indent + ln if ln else ln for ln in html.split("\n"))


COMPONENT_JS_PLAIN = """;(function () {
  WebArco.mount('#app', {})
})()
"""

COMPONENT_JS_COUNTDOWN = """;(function () {
  const { ref } = Vue
  const now = Date.now()
  WebArco.mount('#app', {
    setup() {
      return {
        deadlineFlash: ref(now + 2 * 60 * 60 * 1000),
        deadlineSign: ref(now + 3 * 24 * 60 * 60 * 1000),
        deadlineMaint: ref(now + 45 * 60 * 1000),
      }
    },
  })
})()
"""


def write_member(m: dict) -> None:
    d = STAT / m["subdir"]
    d.mkdir(parents=True, exist_ok=True)
    css_link = '  <link rel="stylesheet" href="../component.css" />\n'
    embed = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <script src="../../../assets/common/js/theme.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{m["label"]} · {m["slug"]}</title>
  <link rel="stylesheet" href="../../../vendor/arco/css/arco.css" />
  <link rel="stylesheet" href="../../../assets/common/css/chrome.css" />
  <link rel="stylesheet" href="../../../assets/common/css/global.css" />
  <link rel="stylesheet" href="../../../vendor/fontawesome/css/all.min.css" />
  <link rel="stylesheet" href="../../../assets/common/css/fa-icons.css" />
  <link rel="stylesheet" href="../../../assets/common/css/components.css" />
  <link rel="stylesheet" href="../../index.css" />
{css_link}</head>
<body class="wa-preview-embed">
  <div id="app" v-cloak>
    <article class="wa-card wa-embed wa-preview-stage" data-slug="{m["slug"]}">
      <div class="wa-comp-meta wa-preview-chrome">
        <span class="wa-comp-meta__name">{m["label"]}</span>
        <span class="wa-comp-meta__slug">{m["slug"]}</span>
      </div>
      <div class="wa-embed__stage">
{stat_html(m, "        ")}
      </div>
    </article>
  </div>
  <script src="../../../vendor/vue/vue.global.prod.js"></script>
  <script src="../../../vendor/arco/arco-vue.min.js"></script>
  <script src="../../../assets/common/js/fa-icons.js"></script>
  <script src="../../../assets/common/js/boot.js"></script>
  <script src="../../../assets/common/js/wa-prefs.js"></script>
  
  <script src="../prompts.inline.js"></script>
  <script src="../../copy-prompt.js"></script>
  <script src="../../member.js"></script>
  <script src="./component.js"></script>
</body>
</html>
"""
    (d / "index.html").write_text(embed, encoding="utf-8", newline="\n")
    (d / "component.js").write_text(
        COMPONENT_JS_COUNTDOWN if m["needs_setup"] else COMPONENT_JS_PLAIN,
        encoding="utf-8",
        newline="\n",
    )

    siblings = "\n".join(
        f'| `{x["slug"]}` | `components/statistic/{x["subdir"]}/` |'
        + (" （本条）" if x["slug"] == m["slug"] else "")
        + " |"
        for x in MEMBERS
    )
    script_line = ""
    if m["needs_setup"]:
        script_line = (
            "\n- **脚本落地**：把截止时间逻辑**并入**宿主页 `js/<page>.js`；"
            "**禁止**镜像母版 `component.js` 再强制 `<script src>`。预览挂载壳不拷。"
        )

    prompt = f"""# {m["label"]}

> 状态：preview · slug：`{m["slug"]}` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「{m["label"]}」（`{m["slug"]}`）。{m["lead"]}

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将家族 `components/statistic/component.css` 中 `.wa-stat-row` 等相关规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。{script_line}

## 3. 约束

- **本提示词只含这一种形态**
- 交互：{m["rules"]}
- 若有私有样式：规则真源在 `components/statistic/component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：{m["visual"]}；卡内多组用 `.wa-stat-row` 三列
- 动效：{"数字滚动（animation）" if m["body"] == "animation" else "仅本控件轻交互（hover/focus）"}；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
{stat_html(m)}
```

> 换文案：只改汉字，勿改 class / type。有私有样式时并入宿主 CSS，勿单独 link `component.css`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/statistic/{m["subdir"]}/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
{siblings}
"""
    (d / "prompt.md").write_text(prompt, encoding="utf-8", newline="\n")


def card_html(m: dict) -> str:
    body = stat_html(m, "              ")
    return f"""          <div class="wa-fam-card" data-slug="{m["slug"]}">
            <div class="wa-fam-card__top">
              <div class="wa-comp-meta"><span class="wa-comp-meta__name">{m["label"]}</span><span class="wa-comp-meta__slug">{m["slug"]}</span></div>
              <a-button
                :class="['wa-fam-copy', {{ 'wa-fam-copy--locked': copyLocked }}]"
                type="outline"
                size="small"
                @click="copyPrompt('{m["slug"]}')"
                :title="copyTitle"
                :aria-label="copyTitle"
              >
                <span class="wa-fam-copy__inner" v-if="copyLocked">
                  <icon-lock></icon-lock>
                  <span class="wa-fam-copy__label">开通权限</span>
                </span>
                <span class="wa-fam-copy__inner" v-else>
                  <icon-copy></icon-copy>
                  <span class="wa-fam-copy__label">提示词</span>
                </span>
              </a-button>
            </div>
            <div class="wa-fam-card__stage">
{body}
            </div>
          </div>"""


def write_family() -> None:
    types = " / ".join(m["subdir"] for m in MEMBERS)
    cards = "\n".join(card_html(m) for m in MEMBERS)
    members_js = ", ".join(f"'{m['slug']}'" for m in MEMBERS)
    needs_cd = any(m["needs_setup"] for m in MEMBERS)
    setup = ""
    if needs_cd:
        setup = """
      setup: function (api) {
        var now = Date.now()
        return {
          deadlineFlash: api.ref(now + 2 * 60 * 60 * 1000),
          deadlineSign: api.ref(now + 3 * 24 * 60 * 60 * 1000),
          deadlineMaint: api.ref(now + 45 * 60 * 1000),
        }
      },"""

    html = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <script src="../../assets/common/js/theme.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>统计数值 · 家族对照</title>
  <link rel="stylesheet" href="../../vendor/arco/css/arco.css" />
  <link rel="stylesheet" href="../../assets/common/css/chrome.css" />
  <link rel="stylesheet" href="../../assets/common/css/global.css" />
  <link rel="stylesheet" href="../../vendor/fontawesome/css/all.min.css" />
  <link rel="stylesheet" href="../../assets/common/css/fa-icons.css" />
  <link rel="stylesheet" href="../../assets/common/css/components.css" />
  <link rel="stylesheet" href="../index.css" />
  <link rel="stylesheet" href="./component.css" />
</head>
<body>
  <div id="app" v-cloak>
    <section class="wa-fam-section wa-fam-fade-in" data-family="statistic">
      <div class="wa-fam-section__inner">
        <header class="wa-fam-head">
          <p class="wa-fam-kicker">statistic</p>
          <h1 class="wa-fam-title">统计数值</h1>
          <p class="wa-fam-lead">强调关键指标数字，用于概览卡、仪表盘与转化结果展示。</p>
          <p class="wa-fam-lead">组件类型：{types}</p>
        </header>

        <div class="wa-fam-grid">
{cards}
        </div>
      </div>
    </section>
  </div>
  <script src="../../vendor/vue/vue.global.prod.js"></script>
  <script src="../../vendor/arco/arco-vue.min.js"></script>
  <script src="../../assets/common/js/fa-icons.js"></script>
  <script src="../../assets/common/js/boot.js"></script>
  <script src="../../assets/common/js/wa-prefs.js"></script>
  
  <script src="./prompts.inline.js"></script>
  <script>
    window.WA_FAMILY = {{
      id: 'statistic',
      members: [{members_js}],{setup}
    }}
  </script>
  <script src="../copy-prompt.js"></script>
  <script src="../family.js"></script>
</body>
</html>
"""
    (STAT / "index.html").write_text(html, encoding="utf-8", newline="\n")


def update_catalog() -> None:
    data = load_catalog()
    comps = [c for c in data["components"] if not str(c.get("slug", "")).startswith("statistic-")]
    insert_at = next(
        (i for i, c in enumerate(comps) if c.get("slug") == "collapse-active"),
        None,
    )
    new_comps = []
    for m in MEMBERS:
        new_comps.append(
            {
                "slug": m["slug"],
                "label": m["label"],
                "surface": "general",
                "status": "preview",
                "tier": "free",
                "path": f"components/statistic/{m['subdir']}",
                "usedByBlocks": [],
                "notes": f"家族 statistic / {m['subdir']}",
                "category": "data-display",
                "tags": [],
                "family": "statistic",
            }
        )
    if insert_at is None:
        comps.extend(new_comps)
    else:
        comps[insert_at + 1 : insert_at + 1] = new_comps
    data["components"] = comps

    for fam in data.get("families", []):
        if fam.get("slug") == "statistic":
            fam["members"] = [m["slug"] for m in MEMBERS]
            fam["notes"] = "根目录家族页；成员在 " + "/".join(m["subdir"] for m in MEMBERS)
            break
    save_catalog(data)


def main() -> None:
    for m in MEMBERS:
        write_member(m)
        print("member", m["slug"])
    write_family()
    print("family index")
    update_catalog()
    print("catalog updated")


if __name__ == "__main__":
    main()
