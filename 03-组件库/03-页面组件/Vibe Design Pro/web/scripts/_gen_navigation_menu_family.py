# -*- coding: utf-8 -*-
"""Polish navigation-menu to match shadcnuikit.com/components/navigation-menu.

Run from frame/web:
  python scripts/_gen_navigation_menu_family.py
  python scripts/sync-prompts.py navigation-menu
"""
from __future__ import annotations

from catalog_io import load_catalog, save_catalog

import json
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
COMP = ROOT / "components" / "navigation-menu"
CATALOG = ROOT / "_meta" / "config.json"
FAMILY = "navigation-menu"
CATEGORY = "navigation"

COPY_BTN = """              <a-button
                :class="['wa-fam-copy', {{ 'wa-fam-copy--locked': copyLocked }}]"
                type="outline"
                size="small"
                @click="copyPrompt('{slug}')"
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
              </a-button>"""

CSS = """/* navigation-menu — mega menu panels aligned to shadcnuikit */
.wa-nm {
  display: flex;
  align-items: center;
  gap: 2px;
  flex-wrap: wrap;
  width: 100%;
}

.wa-nm .arco-btn-text {
  color: var(--color-text-1);
  font-weight: 500;
  padding: 0 12px;
  height: 36px;
}

.wa-nm .arco-btn-text:hover {
  background: var(--color-fill-2);
  color: var(--color-text-1);
}

.wa-nm-panel {
  display: grid;
  gap: 4px;
  padding: 8px;
  min-width: 220px;
}

.wa-nm-panel--product {
  grid-template-columns: 160px 1fr;
  gap: 12px;
  min-width: 440px;
  max-width: min(520px, 92vw);
  padding: 12px;
}

.wa-nm-panel--2 {
  grid-template-columns: 1fr 1fr;
  min-width: 360px;
  max-width: min(440px, 92vw);
  gap: 4px 8px;
  padding: 10px;
}

.wa-nm-panel--store {
  grid-template-columns: 132px 1fr;
  gap: 14px;
  min-width: 360px;
  max-width: min(420px, 92vw);
  padding: 12px;
}

.wa-nm-featured {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 8px;
  padding: 16px;
  border-radius: 14px;
  min-height: 160px;
  background: linear-gradient(165deg, var(--color-fill-2) 0%, var(--color-fill-3) 100%);
  color: var(--color-text-1);
  text-decoration: none;
}

.wa-nm-featured__icon {
  margin-bottom: auto;
  color: var(--color-text-2);
}

.wa-nm-featured__title {
  font-size: 15px;
  font-weight: 600;
  line-height: 1.3;
}

.wa-nm-featured__desc {
  font-size: 12px;
  color: var(--color-text-3);
  line-height: 1.45;
}

.wa-nm-link {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  padding: 10px;
  border-radius: 10px;
  text-decoration: none;
  color: inherit;
}

.wa-nm-link:hover {
  background: var(--color-fill-2);
}

.wa-nm-link__icon {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: var(--color-fill-2);
  color: var(--color-text-2);
}

.wa-nm-link__icon--blue { background: color-mix(in srgb, rgb(var(--primary-1)) 90%, #fff); color: rgb(var(--primary-6)); }
.wa-nm-link__icon--green { background: color-mix(in srgb, rgb(var(--success-1)) 90%, #fff); color: rgb(var(--success-6)); }
.wa-nm-link__icon--orange { background: color-mix(in srgb, rgb(var(--warning-1)) 90%, #fff); color: rgb(var(--warning-6)); }
.wa-nm-link__icon--purple { background: #f3e8ff; color: #7c3aed; }

.wa-nm-link__body {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.wa-nm-link__title {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-1);
  line-height: 1.35;
}

.wa-nm-link__desc {
  font-size: 12px;
  color: var(--color-text-3);
  line-height: 1.4;
}

.wa-nm-badge {
  display: inline-flex;
  align-items: center;
  height: 16px;
  padding: 0 5px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: #fff;
  background: rgb(var(--primary-6));
}

.wa-nm-store-img {
  width: 132px;
  height: 132px;
  border-radius: 12px;
  background: linear-gradient(145deg, #e8e2d8, #c4b5a0);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-3);
  overflow: hidden;
}

.wa-nm-store-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.wa-fam-section[data-family="navigation-menu"] .wa-fam-card {
  grid-column: 1 / -1;
}

.wa-fam-section[data-family="navigation-menu"] .wa-fam-card__stage {
  width: 100%;
  justify-content: flex-start;
  min-height: 48px;
}

body.wa-preview-embed .wa-preview-stage[data-slug^="navigation-menu-"].wa-embed {
  width: min(760px, calc(100% - 32px));
}
"""

STORE_IMG = (
    "data:image/svg+xml,"
    "%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E"
    "%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E"
    "%3Cstop stop-color='%23e9e2d6'/%3E%3Cstop offset='1' stop-color='%23b7a48a'/%3E%3C/linearGradient%3E%3C/defs%3E"
    "%3Crect width='300' height='300' fill='url(%23g)'/%3E"
    "%3Crect x='70' y='90' width='160' height='120' rx='8' fill='%23fff' opacity='.35'/%3E"
    "%3C/svg%3E"
)


def M(subdir: str, label: str, lead: str, rules: str, visual: str, html: str) -> dict:
    return {
        "subdir": subdir,
        "slug": f"{FAMILY}-{subdir}",
        "label": label,
        "lead": lead,
        "rules": rules,
        "visual": visual,
        "html": html.strip(),
    }


MEMBERS = [
    M(
        "default",
        "产品导航菜单",
        "SaaS 顶栏：产品特色卡+功能列表，资源双列，定价直达。",
        "`.wa-nm` + a-dropdown hover；产品面板 `.wa-nm-panel--product`",
        "左渐变特色卡 + 右功能链接（图标+描述）",
        """
<div class="wa-nm">
  <a-dropdown trigger="hover" position="bl" :popup-max-height="false">
    <a-button type="text">产品 <icon-down :size="11"></icon-down></a-button>
    <template #content>
      <div class="wa-nm-panel wa-nm-panel--product">
        <a class="wa-nm-featured" href="javascript:void(0)">
          <span class="wa-nm-featured__icon"><icon-apps :size="20"></icon-apps></span>
          <div class="wa-nm-featured__title">我们的平台</div>
          <div class="wa-nm-featured__desc">强大工具助力业务增长，简化日常运营。</div>
        </a>
        <div>
          <a class="wa-nm-link" href="javascript:void(0)">
            <span class="wa-nm-link__icon"><icon-apps :size="14"></icon-apps></span>
            <span class="wa-nm-link__body"><span class="wa-nm-link__title">分析看板</span><span class="wa-nm-link__desc">实时洞察与数据可视化。</span></span>
          </a>
          <a class="wa-nm-link" href="javascript:void(0)">
            <span class="wa-nm-link__icon"><icon-user-group :size="14"></icon-user-group></span>
            <span class="wa-nm-link__body"><span class="wa-nm-link__title">团队协作</span><span class="wa-nm-link__desc">实时无缝协同工作。</span></span>
          </a>
          <a class="wa-nm-link" href="javascript:void(0)">
            <span class="wa-nm-link__icon"><icon-safe :size="14"></icon-safe></span>
            <span class="wa-nm-link__body"><span class="wa-nm-link__title">安全与合规</span><span class="wa-nm-link__desc">企业级安全与 GDPR 支持。</span></span>
          </a>
          <a class="wa-nm-link" href="javascript:void(0)">
            <span class="wa-nm-link__icon"><icon-tool :size="14"></icon-tool></span>
            <span class="wa-nm-link__body"><span class="wa-nm-link__title">自动化</span><span class="wa-nm-link__desc">用自动化精简工作流。</span></span>
          </a>
        </div>
      </div>
    </template>
  </a-dropdown>
  <a-dropdown trigger="hover" position="bl" :popup-max-height="false">
    <a-button type="text">资源 <icon-down :size="11"></icon-down></a-button>
    <template #content>
      <div class="wa-nm-panel wa-nm-panel--2">
        <a class="wa-nm-link" href="javascript:void(0)"><span class="wa-nm-link__icon"><icon-file :size="14"></icon-file></span><span class="wa-nm-link__body"><span class="wa-nm-link__title">文档</span><span class="wa-nm-link__desc">指南与 API 参考。</span></span></a>
        <a class="wa-nm-link" href="javascript:void(0)"><span class="wa-nm-link__icon"><icon-message :size="14"></icon-message></span><span class="wa-nm-link__body"><span class="wa-nm-link__title">帮助中心</span><span class="wa-nm-link__desc">常见问题解答。</span></span></a>
        <a class="wa-nm-link" href="javascript:void(0)"><span class="wa-nm-link__icon"><icon-book :size="14"></icon-book></span><span class="wa-nm-link__body"><span class="wa-nm-link__title">博客</span><span class="wa-nm-link__desc">产品动态与行业洞察。</span></span></a>
        <a class="wa-nm-link" href="javascript:void(0)"><span class="wa-nm-link__icon"><icon-user-group :size="14"></icon-user-group></span><span class="wa-nm-link__body"><span class="wa-nm-link__title">社区</span><span class="wa-nm-link__desc">与其他用户交流。</span></span></a>
      </div>
    </template>
  </a-dropdown>
  <a-button type="text">定价</a-button>
</div>
""",
    ),
    M(
        "platform",
        "平台导航（徽章）",
        "双列产品面板，彩色图标与「新」徽章。",
        "`.wa-nm-panel--2`；`.wa-nm-badge`；彩色 icon 槽",
        "双列网格；徽章紧贴标题",
        """
<div class="wa-nm">
  <a-dropdown trigger="hover" position="bl" :popup-max-height="false">
    <a-button type="text">平台 <icon-down :size="11"></icon-down></a-button>
    <template #content>
      <div class="wa-nm-panel wa-nm-panel--2">
        <a class="wa-nm-link" href="javascript:void(0)">
          <span class="wa-nm-link__icon wa-nm-link__icon--blue"><icon-apps :size="14"></icon-apps></span>
          <span class="wa-nm-link__body"><span class="wa-nm-link__title">智能体 <span class="wa-nm-badge">新</span></span><span class="wa-nm-link__desc">多智能体编排。</span></span>
        </a>
        <a class="wa-nm-link" href="javascript:void(0)">
          <span class="wa-nm-link__icon wa-nm-link__icon--green"><icon-book :size="14"></icon-book></span>
          <span class="wa-nm-link__body"><span class="wa-nm-link__title">知识库</span><span class="wa-nm-link__desc">文档检索与引用。</span></span>
        </a>
        <a class="wa-nm-link" href="javascript:void(0)">
          <span class="wa-nm-link__icon wa-nm-link__icon--orange"><icon-check-circle :size="14"></icon-check-circle></span>
          <span class="wa-nm-link__body"><span class="wa-nm-link__title">评测 <span class="wa-nm-badge">新</span></span><span class="wa-nm-link__desc">提示词回归测试。</span></span>
        </a>
        <a class="wa-nm-link" href="javascript:void(0)">
          <span class="wa-nm-link__icon wa-nm-link__icon--purple"><icon-apps :size="14"></icon-apps></span>
          <span class="wa-nm-link__body"><span class="wa-nm-link__title">监控</span><span class="wa-nm-link__desc">延迟与成本看板。</span></span>
        </a>
      </div>
    </template>
  </a-dropdown>
  <a-button type="text">文档</a-button>
  <a-button type="text">定价</a-button>
</div>
""",
    ),
    M(
        "store",
        "商店导航",
        "电商顶栏：系列面板左图右链 + 女装/男装直达。",
        "`.wa-nm-panel--store`；本地 SVG 产品图",
        "左特色图 + 右分类链接",
        f"""
<div class="wa-nm">
  <a-dropdown trigger="hover" position="bl" :popup-max-height="false">
    <a-button type="text">系列 <icon-down :size="11"></icon-down></a-button>
    <template #content>
      <div class="wa-nm-panel wa-nm-panel--store">
        <div class="wa-nm-store-img"><img src="{STORE_IMG}" alt="" /></div>
        <div>
          <a class="wa-nm-link" href="javascript:void(0)"><span class="wa-nm-link__body"><span class="wa-nm-link__title">春季上新</span><span class="wa-nm-link__desc">轻薄面料与基础款。</span></span></a>
          <a class="wa-nm-link" href="javascript:void(0)"><span class="wa-nm-link__body"><span class="wa-nm-link__title">配饰</span><span class="wa-nm-link__desc">包袋、腰带与点睛单品。</span></span></a>
          <a class="wa-nm-link" href="javascript:void(0)"><span class="wa-nm-link__body"><span class="wa-nm-link__title">礼品卡</span><span class="wa-nm-link__desc">电子码即时送达。</span></span></a>
        </div>
      </div>
    </template>
  </a-dropdown>
  <a-button type="text">女装</a-button>
  <a-button type="text">男装</a-button>
</div>
""",
    ),
    M(
        "featured",
        "特色卡片导航",
        "解决方案下拉：左特色卡 + 右场景链接。",
        "特色卡含 CTA 按钮；右侧场景列表",
        "左渐变卡右链接列",
        """
<div class="wa-nm">
  <a-dropdown trigger="hover" position="bl" :popup-max-height="false">
    <a-button type="text">解决方案 <icon-down :size="11"></icon-down></a-button>
    <template #content>
      <div class="wa-nm-panel wa-nm-panel--product">
        <div class="wa-nm-featured">
          <div class="wa-nm-featured__title">从想法到上线</div>
          <div class="wa-nm-featured__desc">调研、PRD 与原型在同一工作流完成。</div>
          <a-button type="primary" size="mini">开始试用</a-button>
        </div>
        <div>
          <a class="wa-nm-link" href="javascript:void(0)"><span class="wa-nm-link__body"><span class="wa-nm-link__title">初创团队</span><span class="wa-nm-link__desc">更快验证 MVP。</span></span></a>
          <a class="wa-nm-link" href="javascript:void(0)"><span class="wa-nm-link__body"><span class="wa-nm-link__title">产品团队</span><span class="wa-nm-link__desc">对齐需求与原型。</span></span></a>
          <a class="wa-nm-link" href="javascript:void(0)"><span class="wa-nm-link__body"><span class="wa-nm-link__title">设计团队</span><span class="wa-nm-link__desc">复用组件与区块。</span></span></a>
        </div>
      </div>
    </template>
  </a-dropdown>
  <a-button type="text">定价</a-button>
</div>
""",
    ),
]


def indent_html(html: str, spaces: int) -> str:
    pad = " " * spaces
    return "\n".join(pad + ln if ln.strip() else ln for ln in html.split("\n"))


def write_member(m: dict) -> None:
    d = COMP / m["subdir"]
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
        """;(function () {
  WebArco.mount('#app', {})
})()
""",
        encoding="utf-8",
        newline="\n",
    )
    siblings = "\n".join(
        f'| `{x["slug"]}` | `components/{FAMILY}/{x["subdir"]}/` |'
        + (" （本条）" if x["slug"] == m["slug"] else "")
        + " |"
        for x in MEMBERS
    )
    prompt = f"""# {m["label"]}

> 状态：preview · slug：`{m["slug"]}` · 类型：component · 母版：web · surface：general · category：`{CATEGORY}`

## 1. 角色与目标

实现「{m["label"]}」（`{m["slug"]}`）。{m["lead"]}

成功标准：业务页出现与 §5 一致的真控件。

## 2. 实现路径

- **A**：整段粘贴 §5；换文案只改汉字。
- **样式落地**：并入宿主 CSS。

## 3. 约束

- 交互：{m["rules"]}
- 与 `dropdown` 分工：本家族是站点顶栏富内容导航；动作菜单用 dropdown
- 整段营销顶栏仍用 `blocks/marketing-nav`
- 禁 CDN 图

## 4. 视觉规格

- {m["visual"]}
- 动效：仅 hover 面板
- 颜色：`--wa-*` / Arco token

## 5. 直接粘贴

```html
{m["html"]}
```

## 6. 验收

- [ ] 与 §5 同构
- [ ] 未混入其它形态

## 7. 预览

`components/{FAMILY}/{m["subdir"]}/index.html`

## 8. 兄弟形态

| slug | 路径 | |
|------|------|--|
{siblings}
"""
    (d / "prompt.md").write_text(prompt, encoding="utf-8", newline="\n")


def fam_card(m: dict) -> str:
    body = indent_html(m["html"], 14)
    btn = COPY_BTN.format(slug=m["slug"])
    return f"""          <div class="wa-fam-card" data-slug="{m["slug"]}">
            <div class="wa-fam-card__top">
              <div class="wa-comp-meta"><span class="wa-comp-meta__name">{m["label"]}</span><span class="wa-comp-meta__slug">{m["slug"]}</span></div>
{btn}
            </div>
            <div class="wa-fam-card__stage">
{body}
            </div>
          </div>"""


def write_family() -> None:
    COMP.mkdir(parents=True, exist_ok=True)
    keep = {m["subdir"] for m in MEMBERS}
    for child in list(COMP.iterdir()):
        if child.is_dir() and child.name not in keep:
            shutil.rmtree(child)
    types = " / ".join(m["subdir"] for m in MEMBERS)
    cards = "\n".join(fam_card(m) for m in MEMBERS)
    members_js = ", ".join(f"'{m['slug']}'" for m in MEMBERS)
    html = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <script src="../../assets/common/js/theme.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>导航菜单 · 家族对照</title>
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
    <section class="wa-fam-section wa-fam-fade-in" data-family="{FAMILY}">
      <div class="wa-fam-section__inner">
        <header class="wa-fam-head">
          <p class="wa-fam-kicker">{FAMILY}</p>
          <h1 class="wa-fam-title">导航菜单</h1>
          <p class="wa-fam-lead">站点顶栏横向导航，触发富内容下拉面板与直达链接。</p>
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
    window.WA_FAMILY = {{ id: '{FAMILY}', members: [{members_js}] }}
  </script>
  <script src="../copy-prompt.js"></script>
  <script src="../family.js"></script>
</body>
</html>
"""
    (COMP / "index.html").write_text(html, encoding="utf-8", newline="\n")
    (COMP / "component.css").write_text(CSS, encoding="utf-8", newline="\n")


def update_catalog() -> None:
    data = load_catalog()
    comps = [
        c
        for c in data["components"]
        if c.get("family") != FAMILY and not str(c.get("slug", "")).startswith(f"{FAMILY}-")
    ]
    insert_at = len(comps)
    for i, c in enumerate(comps):
        if str(c.get("slug", "")).startswith("command-"):
            insert_at = i + 1
    new_comps = [
        {
            "slug": m["slug"],
            "label": m["label"],
            "surface": "general",
            "status": "preview",
            "tier": "free",
            "path": f"components/{FAMILY}/{m['subdir']}",
            "usedByBlocks": [],
            "notes": f"家族 {FAMILY} / {m['subdir']}；对照 shadcnuikit navigation-menu",
            "category": CATEGORY,
            "tags": [],
            "family": FAMILY,
        }
        for m in MEMBERS
    ]
    comps[insert_at:insert_at] = new_comps
    data["components"] = comps
    for fam in data.get("families", []):
        if fam.get("slug") == FAMILY:
            fam["members"] = [m["slug"] for m in MEMBERS]
            fam["notes"] = "对照 shadcnuikit；成员在 " + "/".join(m["subdir"] for m in MEMBERS)
            break
    save_catalog(data)


def main() -> None:
    for m in MEMBERS:
        write_member(m)
        print("member", m["slug"])
    write_family()
    update_catalog()
    print("done")


if __name__ == "__main__":
    main()
