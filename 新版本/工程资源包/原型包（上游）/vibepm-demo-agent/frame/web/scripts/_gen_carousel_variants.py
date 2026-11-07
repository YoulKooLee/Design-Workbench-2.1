# -*- coding: utf-8 -*-
"""Generate / refresh carousel family (UTF-8). Run from frame/web:
  python scripts/_gen_carousel_variants.py
"""
from __future__ import annotations

from catalog_io import load_catalog, save_catalog

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CAR = ROOT / "components" / "carousel"
CATALOG = ROOT / "_meta" / "config.json"

SLIDES = [
    ("1", "产品发布", "全新版本已上线"),
    ("2", "客户案例", "增长团队真实反馈"),
    ("3", "设计系统", "组件与规范同步"),
    ("4", "活动报名", "限时早鸟通道开启"),
    ("5", "更新日志", "本周能力速览"),
]


def slide_html(idx: str, title: str, sub: str) -> str:
    return (
        f'<a-carousel-item>\n'
        f'  <div class="wa-carousel-slide wa-carousel-slide--{idx}">\n'
        f"    <span>{title}</span>\n"
        f'    <span class="wa-carousel-slide__sub">{sub}</span>\n'
        f"  </div>\n"
        f"</a-carousel-item>"
    )


def slides_block(n: int = 4) -> str:
    return "\n".join(slide_html(i, t, s) for i, t, s in SLIDES[:n])


MEMBERS = [
    {
        "subdir": "default",
        "slug": "carousel-default",
        "label": "走马灯",
        "lead": "基础横向轮播，常显箭头与圆点指示器。",
        "rules": "真 a-carousel；默认 slide；外层 `.wa-carousel` 满宽",
        "visual": "满宽横滑；底部圆点；箭头常显",
        "attrs": ' show-arrow="always"',
        "cls": "wa-carousel",
        "n": 4,
    },
    {
        "subdir": "autoplay",
        "slug": "carousel-autoplay",
        "label": "自动播放走马灯",
        "lead": "自动轮播 Banner，适合首页首屏。",
        "rules": "真 a-carousel；`:auto-play=\"true\"`；`show-arrow=\"hover\"`",
        "visual": "满宽自动播放；箭头悬停显示",
        "attrs": ' :auto-play="true" :move-speed="500" show-arrow="hover"',
        "cls": "wa-carousel",
        "n": 4,
    },
    {
        "subdir": "card",
        "slug": "carousel-card",
        "label": "卡片走马灯",
        "lead": "卡片透视切换，两侧可见前后页。",
        "rules": "真 a-carousel；`animation-name=\"card\"`（勿写 card-default）；`show-arrow=\"hover\"`",
        "visual": "3D 卡片层叠；悬停出箭头",
        "attrs": ' animation-name="card" show-arrow="hover"',
        "cls": "wa-carousel wa-carousel--card",
        "n": 5,
    },
    {
        "subdir": "fade",
        "slug": "carousel-fade",
        "label": "淡入走马灯",
        "lead": "淡入淡出切换，适合氛围图与品牌页。",
        "rules": "真 a-carousel；`animation-name=\"fade\"`；`show-arrow=\"hover\"`",
        "visual": "满宽淡入切换；箭头悬停显示",
        "attrs": ' animation-name="fade" show-arrow="hover"',
        "cls": "wa-carousel",
        "n": 4,
    },
    {
        "subdir": "vertical",
        "slug": "carousel-vertical",
        "label": "纵向走马灯",
        "lead": "纵向滚动切换，适合窄栏或侧边推荐。",
        "rules": "真 a-carousel；`direction=\"vertical\"`；`show-arrow=\"hover\"`；指示器在右",
        "visual": "纵向滑动；箭头悬停显示；指示器右侧",
        "attrs": ' direction="vertical" indicator-position="right" show-arrow="hover"',
        "cls": "wa-carousel wa-carousel--vertical",
        "n": 4,
    },
    {
        "subdir": "line",
        "slug": "carousel-line",
        "label": "线条指示走马灯",
        "lead": "底部线条指示器，偏营销落地页观感。",
        "rules": "真 a-carousel；`indicator-type=\"line\"`；`show-arrow=\"hover\"`",
        "visual": "线条进度指示；箭头悬停显示",
        "attrs": ' indicator-type="line" show-arrow="hover"',
        "cls": "wa-carousel",
        "n": 4,
    },
]


def carousel_html(m: dict, indent: str = "") -> str:
    inner = slides_block(m["n"])
    attrs = m["attrs"]
    cls = m["cls"]
    html = (
        f'<a-carousel class="{cls}"{attrs}>\n'
        + "\n".join("  " + ln if ln else ln for ln in inner.split("\n"))
        + "\n</a-carousel>"
    )
    return "\n".join(indent + ln if ln else ln for ln in html.split("\n"))


COMPONENT_JS = """;(function () {
  WebArco.mount('#app', {})
})()
"""


def write_member(m: dict) -> None:
    d = CAR / m["subdir"]
    d.mkdir(parents=True, exist_ok=True)
    # remove obsolete per-member css if any (shared family css)
    old_css = d / "component.css"
    if old_css.exists():
        old_css.unlink()

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
{carousel_html(m, "        ")}
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
    (d / "component.js").write_text(COMPONENT_JS, encoding="utf-8", newline="\n")

    siblings = "\n".join(
        f'| `{x["slug"]}` | `components/carousel/{x["subdir"]}/` |'
        + (" （本条）" if x["slug"] == m["slug"] else "")
        + " |"
        for x in MEMBERS
    )
    prompt = f"""# {m["label"]}

> 状态：preview · slug：`{m["slug"]}` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「{m["label"]}」（`{m["slug"]}`）。{m["lead"]}

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将家族 `components/carousel/component.css` 中相关规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：{m["rules"]}
- 私有样式真源在 `components/carousel/component.css`；§5 **只贴 HTML**；落地合并进宿主样式
- 禁止外链 CDN 图片；示例用渐变色块即可

## 4. 视觉规格

- 布局 / 层级 / 强调：{m["visual"]}；宽度跟随容器（勿写死 320px）
- 动效：轮播切换；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）；示例渐变可保留

## 5. 直接粘贴

```html
{carousel_html(m)}
```

> 换文案：只改汉字，勿改 class / type。有私有样式时并入宿主 CSS，勿单独 link `component.css`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/carousel/{m["subdir"]}/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
{siblings}
"""
    (d / "prompt.md").write_text(prompt, encoding="utf-8", newline="\n")


def card_html(m: dict) -> str:
    body = carousel_html(m, "              ")
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
    html = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <script src="../../assets/common/js/theme.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>走马灯 · 家族对照</title>
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
    <section class="wa-fam-section wa-fam-fade-in" data-family="carousel">
      <div class="wa-fam-section__inner">
        <header class="wa-fam-head">
          <p class="wa-fam-kicker">carousel</p>
          <h1 class="wa-fam-title">走马灯</h1>
          <p class="wa-fam-lead">内容轮播展示，用于首页 Banner、案例图集与产品图切换。</p>
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
      id: 'carousel',
      members: [{members_js}],
    }}
  </script>
  <script src="../copy-prompt.js"></script>
  <script src="../family.js"></script>
</body>
</html>
"""
    (CAR / "index.html").write_text(html, encoding="utf-8", newline="\n")


def update_catalog() -> None:
    data = load_catalog()
    comps = [c for c in data["components"] if not str(c.get("slug", "")).startswith("carousel-")]
    insert_at = next(
        (i for i, c in enumerate(comps) if c.get("slug") == "statistic-countdown"),
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
                "path": f"components/carousel/{m['subdir']}",
                "usedByBlocks": [],
                "notes": f"家族 carousel / {m['subdir']}",
                "category": "data-display",
                "tags": [],
                "family": "carousel",
            }
        )
    if insert_at is None:
        comps.extend(new_comps)
    else:
        comps[insert_at + 1 : insert_at + 1] = new_comps
    data["components"] = comps

    for fam in data.get("families", []):
        if fam.get("slug") == "carousel":
            fam["members"] = [m["slug"] for m in MEMBERS]
            fam["notes"] = "根目录家族页；成员在 " + "/".join(x["subdir"] for x in MEMBERS)
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
