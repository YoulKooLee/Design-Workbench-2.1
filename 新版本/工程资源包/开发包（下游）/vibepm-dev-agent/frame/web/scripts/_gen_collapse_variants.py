# -*- coding: utf-8 -*-
"""Generate / refresh collapse family members (UTF-8). Run from frame/web:
  python scripts/_gen_collapse_variants.py
"""
from __future__ import annotations

from catalog_io import load_catalog, save_catalog

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
COLLAPSE = ROOT / "components" / "collapse"
CATALOG = ROOT / "_meta" / "config.json"

MEMBERS = [
    {
        "subdir": "default",
        "slug": "collapse-default",
        "label": "折叠面板",
        "lead": "无外边框 FAQ 列表，靠分割线区分条目，可同时展开多项。",
        "rules": "真 a-collapse；`:bordered=\"false\"`；`#expand-icon` 用 `icon-down`；可多开",
        "visual": "无外边框；左侧 chevron-down，展开旋转 180°；内容文字弱化",
        "class": " wa-collapse-chevron",
        "attrs": ' :bordered="false"',
        "body": "faq_plain",
        "active": "['1']",
    },
    {
        "subdir": "accordion",
        "slug": "collapse-accordion",
        "label": "手风琴折叠面板",
        "lead": "同时仅展开一项，适合 FAQ 互斥阅读。",
        "rules": "真 a-collapse；`accordion`；`:bordered=\"false\"`；`#expand-icon` 用 `icon-down`",
        "visual": "手风琴互斥；左侧 chevron-down",
        "class": " wa-collapse-chevron",
        "attrs": ' accordion :bordered="false"',
        "body": "faq_plain",
        "active": "['1']",
    },
    {
        "subdir": "bordered",
        "slug": "collapse-bordered",
        "label": "边框折叠面板",
        "lead": "整组带外边框的 FAQ，适合独立信息块。",
        "rules": "真 a-collapse；默认 bordered；挂 `.wa-collapse-bordered`；展开项标题与内容间有分隔线",
        "visual": "整组外边框 + 圆角；展开时标题/内容分隔线；内容区顶部留白",
        "class": " wa-collapse-chevron wa-collapse-bordered",
        "attrs": "",
        "body": "faq_plain",
        "active": "['1']",
    },
    {
        "subdir": "plus",
        "slug": "collapse-plus",
        "label": "加减号折叠面板",
        "lead": "展开图标为加号/减号，点击在开合间切换。",
        "rules": "真 a-collapse；`:bordered=\"false\"`；根级 `#expand-icon` 用 icon-plus / icon-minus；挂 `.wa-collapse-plus` 禁用箭头旋转",
        "visual": "无外边框；右侧加减号；展开显示减号；私有样式见 component.css",
        "class": " wa-collapse-plus",
        "attrs": ' :bordered="false" expand-icon-position="right"',
        "body": "faq_plus",
        "active": "['1']",
    },
    {
        "subdir": "icon",
        "slug": "collapse-icon",
        "label": "图标折叠面板",
        "lead": "标题前带圆形图标，便于按主题扫读分区。",
        "rules": "真 a-collapse；`:bordered=\"false\"`；`#header` 内放图标+标题；挂 `.wa-collapse-icon`",
        "visual": "无外边框；左侧圆形图标 + 标题；图标用 FA icon-*",
        "class": " wa-collapse-chevron wa-collapse-icon",
        "attrs": ' :bordered="false" expand-icon-position="right"',
        "body": "faq_icon",
        "active": "['1']",
    },
    {
        "subdir": "subtext",
        "slug": "collapse-subtext",
        "label": "副文案折叠面板",
        "lead": "标题下附一行摘要，收起时也能预览内容要点。",
        "rules": "真 a-collapse；`:bordered=\"false\"`；`#header` 含标题+副文案；挂 `.wa-collapse-subtext`",
        "visual": "无外边框；标题 14px + 副文案 12px 次要色；右侧 chevron-down",
        "class": " wa-collapse-chevron wa-collapse-subtext",
        "attrs": ' :bordered="false" expand-icon-position="right"',
        "body": "faq_subtext",
        "active": "['1']",
    },
    {
        "subdir": "stacked",
        "slug": "collapse-stacked",
        "label": "卡片式折叠面板",
        "lead": "每项独立圆角卡片，项间留白，适合设置分组。",
        "rules": "真 a-collapse；`:bordered=\"false\"` + `.wa-collapse-stacked`",
        "visual": "分卡片间距 12px；单项自带描边圆角；右侧 chevron-down",
        "class": " wa-collapse-chevron wa-collapse-stacked",
        "attrs": ' :bordered="false" expand-icon-position="right"',
        "body": "faq_plain",
        "active": "['1']",
    },
    {
        "subdir": "active",
        "slug": "collapse-active",
        "label": "高亮折叠面板",
        "lead": "卡片式布局且展开项浅底高亮，当前阅读位置更醒目。",
        "rules": "真 a-collapse；`accordion`；`:bordered=\"false\"` + `.wa-collapse-stacked.wa-collapse-active`",
        "visual": "卡片式 + 展开项 fill 高亮；右侧 chevron-down",
        "class": " wa-collapse-chevron wa-collapse-stacked wa-collapse-active",
        "attrs": ' accordion :bordered="false" expand-icon-position="right"',
        "body": "faq_plain",
        "active": "['1']",
    },
]

FAQ_ANSWERS = {
    "1": "提供免费版、专业版与企业版，可按席位升级；核心能力各档通用，高级协作与专属支持随档位解锁。",
    "2": "可随时在账户设置中取消。当期已付权益保留至账期结束，不会按天自动退款。",
    "3": "支持支付宝、微信支付与主流信用卡；企业版可申请对公转账与发票。",
    "4": "工作日在线客服；专业版含工单优先，企业版配备专属客户成功经理。",
}

FAQ_TITLES = {
    "1": "有哪些定价方案可选？",
    "2": "可以随时取消订阅吗？",
    "3": "支持哪些支付方式？",
    "4": "提供什么类型的支持服务？",
}

FAQ_SUBS = {
    "1": "按团队规模选择合适订阅",
    "2": "账期与续费完全由你掌控",
    "3": "安全灵活的收款方式",
    "4": "需要时获得优先协助",
}

FAQ_ICONS = {
    "1": "icon-tag",
    "2": "icon-check-circle",
    "3": "icon-credit-card",
    "4": "icon-message",
}


def faq_plain() -> str:
    parts = []
    for k, title in FAQ_TITLES.items():
        parts.append(
            f'  <a-collapse-item header="{title}" key="{k}">{FAQ_ANSWERS[k]}</a-collapse-item>'
        )
    return "\n".join(parts)


def faq_plus() -> str:
    return (
        '  <template #expand-icon="{ active }">\n'
        '    <icon-minus v-if="active" :size="10" style="color: var(--color-text-3)"></icon-minus>\n'
        '    <icon-plus v-else :size="10" style="color: var(--color-text-3)"></icon-plus>\n'
        "  </template>\n"
        + faq_plain()
    )


def faq_icon() -> str:
    parts = []
    for k, title in FAQ_TITLES.items():
        icon = FAQ_ICONS[k]
        parts.append(
            f'  <a-collapse-item key="{k}">\n'
            f"    <template #header>\n"
            f'      <div class="wa-collapse-head">\n'
            f'        <span class="wa-collapse-head__icon"><{icon}></{icon}></span>\n'
            f'        <span class="wa-collapse-head__title">{title}</span>\n'
            f"      </div>\n"
            f"    </template>\n"
            f"    {FAQ_ANSWERS[k]}\n"
            f"  </a-collapse-item>"
        )
    return "\n".join(parts)


def faq_subtext() -> str:
    parts = []
    for k, title in FAQ_TITLES.items():
        parts.append(
            f'  <a-collapse-item key="{k}">\n'
            f"    <template #header>\n"
            f'      <div class="wa-collapse-head">\n'
            f'        <div class="wa-collapse-head__body">\n'
            f'          <span class="wa-collapse-head__title">{title}</span>\n'
            f'          <span class="wa-collapse-head__sub">{FAQ_SUBS[k]}</span>\n'
            f"        </div>\n"
            f"      </div>\n"
            f"    </template>\n"
            f"    {FAQ_ANSWERS[k]}\n"
            f"  </a-collapse-item>"
        )
    return "\n".join(parts)


BODY_FN = {
    "faq_plain": faq_plain,
    "faq_plus": faq_plus,
    "faq_icon": faq_icon,
    "faq_subtext": faq_subtext,
}


CHEVRON_SLOT = (
    '  <template #expand-icon="{ active }">\n'
    '    <icon-up v-if="active" :size="10" style="color: var(--color-text-3)"></icon-up>\n'
    '    <icon-down v-else :size="10" style="color: var(--color-text-3)"></icon-down>\n'
    "  </template>\n"
)


def collapse_html(m: dict, indent: str = "") -> str:
    body = BODY_FN[m["body"]]()
    # plus 自带加减号；其余默认用右侧 chevron-down
    if m["body"] != "faq_plus":
        body = CHEVRON_SLOT + body
    cls = m["class"].strip()
    class_attr = f' class="{cls}"' if cls else ""
    open_tag = f'<a-collapse v-model:active-key="activeKey"{m["attrs"]}{class_attr}>'
    lines = [open_tag] + body.split("\n") + ["</a-collapse>"]
    return "\n".join(indent + ln if ln else ln for ln in lines)


COMPONENT_JS = """;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        activeKey: ref(%s),
      }
    },
  })
})()
"""


def write_member(m: dict) -> None:
    d = COLLAPSE / m["subdir"]
    d.mkdir(parents=True, exist_ok=True)
    # all members link family component.css (embed width + shared skins)
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
{collapse_html(m, "        ")}
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
        COMPONENT_JS % m["active"], encoding="utf-8", newline="\n"
    )

    siblings = "\n".join(
        f'| `{x["slug"]}` | `components/collapse/{x["subdir"]}/` |'
        + (" （本条）" if x["slug"] == m["slug"] else "")
        + " |"
        for x in MEMBERS
    )
    style_note = (
        "；私有样式真源在家族 `component.css`，落地并入宿主 CSS"
        if m["class"].strip()
        else ""
    )
    prompt = f"""# {m["label"]}

> 状态：preview · slug：`{m["slug"]}` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「{m["label"]}」（`{m["slug"]}`）。{m["lead"]}

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录或家族 `component.css`，将规则**并入**宿主页/模块 CSS（如 `css/<page>.css`、scoped style）；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：{m["rules"]}
- 若有私有样式：规则真源在 `components/collapse/component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：{m["visual"]}{style_note}
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
{collapse_html(m)}
```

> 换文案：只改汉字，勿改 class / type。有私有样式时并入宿主 CSS，勿单独 link `component.css`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/collapse/{m["subdir"]}/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
{siblings}
"""
    (d / "prompt.md").write_text(prompt, encoding="utf-8", newline="\n")


def card_html(m: dict, key_expr: str) -> str:
    # family page uses per-card active key var name
    body = collapse_html(m, "              ").replace(
        'v-model:active-key="activeKey"', f'v-model:active-key="{key_expr}"'
    )
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
    key_map = {
        "default": "activeDefault",
        "accordion": "activeAccordion",
        "bordered": "activeBordered",
        "plus": "activePlus",
        "icon": "activeIcon",
        "subtext": "activeSubtext",
        "stacked": "activeStacked",
        "active": "activeHighlight",
    }
    cards = "\n".join(card_html(m, key_map[m["subdir"]]) for m in MEMBERS)
    setup_lines = ",\n".join(
        f"          {key_map[m['subdir']]}: api.ref({m['active']})" for m in MEMBERS
    )
    members_js = ", ".join(f"'{m['slug']}'" for m in MEMBERS)

    html = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <script src="../../assets/common/js/theme.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>折叠面板 · 家族对照</title>
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
    <section class="wa-fam-section wa-fam-fade-in" data-family="collapse">
      <div class="wa-fam-section__inner">
        <header class="wa-fam-head">
          <p class="wa-fam-kicker">collapse</p>
          <h1 class="wa-fam-title">折叠面板</h1>
          <p class="wa-fam-lead">可展开收起的内容分组，适合 FAQ、产品说明与分区配置。</p>
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
      id: 'collapse',
      members: [{members_js}],
      setup: function (api) {{
        return {{
{setup_lines},
        }}
      }},
    }}
  </script>
  <script src="../copy-prompt.js"></script>
  <script src="../family.js"></script>
</body>
</html>
"""
    (COLLAPSE / "index.html").write_text(html, encoding="utf-8", newline="\n")


def update_catalog() -> None:
    data = load_catalog()
    # remove old collapse-* components then insert fresh after descriptions-bordered
    comps = [c for c in data["components"] if not str(c.get("slug", "")).startswith("collapse-")]
    insert_at = next(
        (i for i, c in enumerate(comps) if c.get("slug") == "descriptions-bordered"),
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
                "path": f"components/collapse/{m['subdir']}",
                "usedByBlocks": [],
                "notes": f"家族 collapse / {m['subdir']}",
                "category": "data-display",
                "tags": [],
                "family": "collapse",
            }
        )
    if insert_at is None:
        comps.extend(new_comps)
    else:
        comps[insert_at + 1 : insert_at + 1] = new_comps
    data["components"] = comps

    for fam in data.get("families", []):
        if fam.get("slug") == "collapse":
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
