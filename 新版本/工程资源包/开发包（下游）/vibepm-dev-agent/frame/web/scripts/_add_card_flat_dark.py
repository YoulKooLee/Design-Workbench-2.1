# -*- coding: utf-8 -*-
"""Add card-flat / card-dark members without rewriting component.css.
Run from frame/web:
  python scripts/_add_card_flat_dark.py
  python scripts/sync-prompts.py
  python scripts/gen-component-list.py
"""
from __future__ import annotations

from catalog_io import load_catalog, save_catalog

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CARD = ROOT / "components" / "card"
CATALOG = ROOT / "_meta" / "config.json"

JS = """;(function () {
  WebArco.mount('#app', {})
})()
"""

NEW = [
    {
        "subdir": "flat",
        "slug": "card-flat",
        "label": "平面卡片",
        "lead": "继承默认表面底；实线描边、无投影，适合弱层级说明区。",
        "rules": "真 a-card；外层 `.wa-acard.wa-acard--flat`；勿加 hoverable",
        "visual": "实线 `--wa-border-card`；无 box-shadow；背景继承 `--wa-color-surface`",
        "html": """<a-card class="wa-acard wa-acard--flat" style="width:320px">
  <h3 class="wa-acard-title">Card Flat</h3>
  <p class="wa-acard-desc">无投影平面卡，适合弱层级说明。</p>
  <hr class="wa-acard-split" />
  <p class="wa-acard-desc">常用于次级说明区。</p>
</a-card>""",
        "after_slug": "card-bordered",
    },
    {
        "subdir": "dark",
        "slug": "card-dark",
        "label": "主色锚点卡片",
        "lead": "主色渐变锚点卡；内嵌按钮白底主色字，形成节奏对比。",
        "rules": "真 a-card；外层 `.wa-acard.wa-acard--dark`；内嵌 `type=primary` 由家族 CSS 反转为白底主色字",
        "visual": "主色渐变底；白字；按钮 surface 底 + primary 字色",
        "html": """<a-card class="wa-acard wa-acard--dark" style="width:320px">
  <p class="wa-acard-kicker">推荐方案</p>
  <div class="wa-acard-price">¥ 199/月</div>
  <p class="wa-acard-desc">主色锚点卡形成节奏对比；内嵌按钮反转为白底主色字。</p>
  <a-button type="primary" shape="round" style="margin-top:16px">立即开通</a-button>
</a-card>""",
        "after_slug": "card-cta",
    },
]


def indent_html(html: str, spaces: int) -> str:
    pad = " " * spaces
    return "\n".join(pad + ln if ln.strip() else ln for ln in html.split("\n"))


def sibling_rows(current: str) -> str:
    # Discover existing members from catalog after we update, or from dirs
    order = [
        "default",
        "hoverable",
        "bordered",
        "flat",
        "actions",
        "extra",
        "tabs",
        "consent",
        "cta",
        "dark",
        "form",
        "cover",
        "meta",
        "footer",
    ]
    labels = {m["subdir"]: m["slug"] for m in NEW}
    rows = []
    for sub in order:
        slug = f"card-{sub}"
        mark = " （本条）" if slug == current else ""
        rows.append(f"| `{slug}` | `components/card/{sub}/` |{mark} |")
    return "\n".join(rows)


def write_prompt(m: dict) -> str:
    return f"""# {m["label"]}

> 状态：preview · slug：`{m["slug"]}` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「{m["label"]}」（`{m["slug"]}`）。{m["lead"]}

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将家族 `components/card/component.css` 中相关规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：{m["rules"]}
- 私有样式真源在 `components/card/component.css`；§5 **只贴 HTML**；落地合并进宿主样式
- 禁止外链 CDN 图片；封面用本地质感块或 data URI
- Vue 模板内自定义标签勿写成自闭合（如 `</a-card-meta>`、`</a-avatar>`）

## 4. 视觉规格

- 布局 / 层级 / 强调：{m["visual"]}
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
{m["html"]}
```

> 换文案：只改汉字，勿改 class / type。有私有样式时并入宿主 CSS，勿单独 link `component.css`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/card/{m["subdir"]}/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
{sibling_rows(m["slug"])}
"""


def write_embed(m: dict) -> None:
    d = CARD / m["subdir"]
    d.mkdir(parents=True, exist_ok=True)
    body = indent_html(m["html"], 8)
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
  <link rel="stylesheet" href="../component.css" />
</head>
<body class="wa-preview-embed">
  <div id="app" v-cloak>
    <article class="wa-card wa-embed wa-preview-stage" data-slug="{m["slug"]}">
      <div class="wa-comp-meta wa-preview-chrome">
        <span class="wa-comp-meta__name">{m["label"]}</span>
        <span class="wa-comp-meta__slug">{m["slug"]}</span>
      </div>
      <div class="wa-embed__stage">
{body}
      </div>
    </article>
  </div>
  <script src="../../../vendor/vue/vue.global.prod.js"></script>
  <script src="../../../vendor/arco/arco-vue.min.js"></script>
  <script src="../../../assets/common/js/fa-icons.js"></script>
  <script src="../../../assets/common/js/boot.js"></script>
  <script src="./component.js"></script>
</body>
</html>
"""
    (d / "index.html").write_text(embed, encoding="utf-8", newline="\n")
    (d / "component.js").write_text(JS, encoding="utf-8", newline="\n")
    (d / "prompt.md").write_text(write_prompt(m), encoding="utf-8", newline="\n")


def fam_card_block(m: dict) -> str:
    body = indent_html(m["html"], 14)
    return f"""          <div class="wa-fam-card" data-slug="{m["slug"]}">
            <div class="wa-fam-card__top">
              <div class="wa-comp-meta"><span class="wa-comp-meta__name">{m["label"]}</span><span class="wa-comp-meta__slug">{m["slug"]}</span></div>
              <a-tooltip :content="famCopyTip('{m["slug"]}')">
              <a-button
                :class="['wa-fam-copy', {{ 'wa-fam-copy--locked': copyLocked, 'is-copied': famCopied('{m["slug"]}') }}]"
                type="secondary"
                size="small"
                @click="copyPrompt('{m["slug"]}')"
                :aria-label="famCopyTip('{m["slug"]}')"
              >
                <span class="wa-fam-copy__inner" v-if="copyLocked">
                  <icon-lock></icon-lock>
                  <span class="wa-fam-copy__label">开通权限</span>
                </span>
                <span class="wa-fam-copy__inner" v-else>
                  <icon-check v-if="famCopied('{m["slug"]}')"></icon-check>
                  <icon-copy v-else></icon-copy>
                  <span class="wa-fam-copy__label">提示词</span>
                </span>
              </a-button>
              </a-tooltip>
            </div>
            <div class="wa-fam-card__stage">
{body}
            </div>
          </div>"""


def patch_family_index() -> None:
    path = CARD / "index.html"
    text = path.read_text(encoding="utf-8")

    # insert fam cards after matching after_slug stage card
    for m in NEW:
        if f'data-slug="{m["slug"]}"' in text:
            continue
        block = fam_card_block(m)
        # find end of after_slug fam-card
        after = m["after_slug"]
        pat = rf'(<div class="wa-fam-card" data-slug="{re.escape(after)}">.*?</div>\s*</div>)'
        match = re.search(pat, text, flags=re.S)
        if not match:
            raise SystemExit(f"cannot find fam card {after}")
        text = text[: match.end()] + "\n" + block + text[match.end() :]

    # update types lead line
    text = re.sub(
        r'(<p class="wa-fam-lead">组件类型：)[^<]+(</p>)',
        r"\1default / hoverable / bordered / flat / actions / extra / tabs / consent / cta / dark / form / cover / meta / footer\2",
        text,
        count=1,
    )

    # update members array
    text = re.sub(
        r"members:\s*\[[^\]]+\]",
        "members: ['card-default', 'card-hoverable', 'card-bordered', 'card-flat', 'card-actions', 'card-extra', 'card-tabs', 'card-consent', 'card-cta', 'card-dark', 'card-form', 'card-cover', 'card-meta', 'card-footer']",
        text,
        count=1,
    )

    path.write_text(text, encoding="utf-8", newline="\n")


def patch_catalog() -> None:
    data = load_catalog()
    comps = data["components"]
    existing = {c.get("slug") for c in comps}

    def insert_after(slug_after: str, entry: dict) -> None:
        if entry["slug"] in existing:
            return
        idx = next(i for i, c in enumerate(comps) if c.get("slug") == slug_after)
        comps.insert(idx + 1, entry)
        existing.add(entry["slug"])

    for m in NEW:
        insert_after(
            m["after_slug"],
            {
                "slug": m["slug"],
                "label": m["label"],
                "surface": "general",
                "status": "preview",
                "tier": "free",
                "path": f"components/card/{m['subdir']}",
                "usedByBlocks": [],
                "notes": f"家族 card / {m['subdir']}",
                "category": "data-display",
                "tags": [],
                "family": "card",
            },
        )

    for fam in data.get("families", []):
        if fam.get("slug") != "card":
            continue
        members = fam.get("members") or []
        desired = [
            "card-default",
            "card-hoverable",
            "card-bordered",
            "card-flat",
            "card-actions",
            "card-extra",
            "card-tabs",
            "card-consent",
            "card-cta",
            "card-dark",
            "card-form",
            "card-cover",
            "card-meta",
            "card-footer",
        ]
        fam["members"] = desired
        fam["notes"] = (
            "根目录家族页；成员在 default/hoverable/bordered/flat/actions/extra/tabs/"
            "consent/cta/dark/form/cover/meta/footer"
        )
        break

    save_catalog(data)


def patch_sibling_tables() -> None:
    """Refresh §8 sibling tables in existing card prompts to include flat/dark."""
    table = sibling_rows("PLACEHOLDER")
    # For each prompt, rebuild §8 with current slug marked
    for p in CARD.glob("*/prompt.md"):
        text = p.read_text(encoding="utf-8")
        slug = f"card-{p.parent.name}"
        new_table = sibling_rows(slug)
        text2, n = re.subn(
            r"(## 8\. 兄弟形态（同家族）\n\n\| slug \| 路径 \| \|\n\|------\|------\|--\|\n)(?:\|.*\|\n)+",
            r"\1" + new_table + "\n",
            text,
            count=1,
        )
        if n:
            p.write_text(text2, encoding="utf-8", newline="\n")


def main() -> None:
    for m in NEW:
        write_embed(m)
    patch_family_index()
    patch_catalog()
    patch_sibling_tables()
    print("added card-flat + card-dark; catalog + family index patched")


if __name__ == "__main__":
    main()
