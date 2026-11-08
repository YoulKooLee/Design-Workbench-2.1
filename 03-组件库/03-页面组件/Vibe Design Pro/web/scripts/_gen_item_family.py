# -*- coding: utf-8 -*-
"""Independent item family — aligned to shadcnuikit.com/components/item.

Run from frame/web:
  python scripts/_gen_item_family.py
  python scripts/sync-prompts.py item
"""
from __future__ import annotations

from catalog_io import load_catalog, save_catalog

import json
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
COMP = ROOT / "components" / "item"
CATALOG = ROOT / "_meta" / "config.json"
FAMILY = "item"
CATEGORY = "data-display"

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

COVER = {
    "1": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%231a1a2e'/%3E%3Cstop offset='1' stop-color='%234a3f6b'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='160' height='160' fill='url(%23g)'/%3E%3Ccircle cx='120' cy='40' r='30' fill='%23e8c547' opacity='.35'/%3E%3C/svg%3E",
    "2": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='1' x2='1' y2='0'%3E%3Cstop stop-color='%233d2914'/%3E%3Cstop offset='1' stop-color='%23c4a574'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='160' height='160' fill='url(%23g)'/%3E%3C/svg%3E",
    "3": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop stop-color='%230a1628'/%3E%3Cstop offset='1' stop-color='%231e4d6b'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='160' height='160' fill='url(%23g)'/%3E%3Ccircle cx='40' cy='120' r='40' fill='%2346e0c0' opacity='.25'/%3E%3C/svg%3E",
}

CSS = """/* item — aligned to shadcnuikit Item */
.wa-item-stack {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 100%;
}

.wa-item-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.wa-item-group > .wa-item {
  border-color: var(--color-border-2);
  background: var(--color-bg-2);
}

.wa-item-group > .wa-item--link:hover {
  background: var(--color-fill-1);
}

.wa-item__title-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  min-width: 0;
}

.wa-item__title-row .wa-item__title {
  flex-shrink: 0;
  max-width: 55%;
}

.wa-item__subtitle {
  font-size: 13px;
  font-weight: 400;
  color: var(--color-text-3);
  line-height: 1.35;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}

.wa-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 14px;
  box-sizing: border-box;
  border-radius: 12px;
  background: transparent;
  border: 1px solid transparent;
  color: inherit;
  text-decoration: none;
}

.wa-item--outline {
  border-color: var(--color-border-2);
  background: var(--color-bg-2);
}

.wa-item--muted {
  background: var(--color-fill-2);
  border-color: transparent;
}

.wa-item--link:hover {
  background: var(--color-fill-2);
}

.wa-item__media {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: var(--color-fill-2);
  color: var(--color-text-2);
  overflow: hidden;
}

.wa-item__media--danger {
  background: color-mix(in srgb, rgb(var(--danger-1)) 80%, var(--color-fill-2));
  color: rgb(var(--danger-6));
}

.wa-item__media--image {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  padding: 0;
}

.wa-item__media--image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.wa-item__body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.wa-item__title {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-1);
  line-height: 1.35;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.wa-item__desc {
  font-size: 13px;
  color: var(--color-text-3);
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.wa-item__actions {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-left: 4px;
}

.wa-item__meta {
  flex-shrink: 0;
  font-size: 12px;
  color: var(--color-text-3);
  font-variant-numeric: tabular-nums;
}

.wa-item__chevron {
  flex-shrink: 0;
  color: var(--color-text-3);
}

.wa-item-avatars {
  display: flex;
  align-items: center;
}

.wa-item-avatars .arco-avatar {
  border: 2px solid var(--color-bg-2);
  margin-left: -8px;
  filter: grayscale(1);
  opacity: 0.85;
}

.wa-item-avatars .arco-avatar:first-child {
  margin-left: 0;
}

.wa-fam-section[data-family="item"] .wa-fam-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: start;
}

.wa-fam-section[data-family="item"] .wa-fam-card__stage {
  width: 100%;
  justify-content: flex-start;
  align-items: stretch;
}

.wa-fam-section[data-family="item"] .wa-fam-card__stage > .wa-item,
.wa-fam-section[data-family="item"] .wa-fam-card__stage > .wa-item-stack,
.wa-fam-section[data-family="item"] .wa-fam-card__stage > .wa-item-group {
  width: 100%;
  max-width: 100%;
}

body.wa-preview-embed .wa-preview-stage[data-slug^="item-"].wa-embed {
  width: min(460px, calc(100% - 32px));
}
"""


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
        "basic",
        "基础条目",
        "描边条目：标题、描述与右侧操作按钮。",
        "`.wa-item--outline` + `.wa-item__actions` 内 a-button outline",
        "圆角描边卡；左文右操作",
        """
<div class="wa-item wa-item--outline">
  <div class="wa-item__body">
    <div class="wa-item__title">基础条目</div>
    <div class="wa-item__desc">带标题与描述的简单条目。</div>
  </div>
  <div class="wa-item__actions">
    <a-button type="outline" size="small">操作</a-button>
  </div>
</div>
""",
    ),
    M(
        "link",
        "链接条目",
        "整行链接：文档入口，右侧 chevron。",
        "`.wa-item--outline.wa-item--link`；asChild 式 `<a>`",
        "标题描述 + 右侧箭头；悬停浅底",
        """
<a class="wa-item wa-item--outline wa-item--link" href="javascript:void(0)">
  <div class="wa-item__body">
    <div class="wa-item__title">查看文档</div>
    <div class="wa-item__desc">了解如何快速上手本设计系统。</div>
  </div>
  <icon-right :size="14" class="wa-item__chevron"></icon-right>
</a>
""",
    ),
    M(
        "alert",
        "警示条目",
        "安全提醒行：危险色图标媒体 + 操作。",
        "`.wa-item__media--danger`；outline 按钮",
        "危险色媒体槽 + 标题描述 + 操作",
        """
<div class="wa-item wa-item--outline">
  <div class="wa-item__media wa-item__media--danger"><icon-safe :size="15"></icon-safe></div>
  <div class="wa-item__body">
    <div class="wa-item__title">安全提醒</div>
    <div class="wa-item__desc">检测到未知设备的新登录。</div>
  </div>
  <div class="wa-item__actions">
    <a-button type="outline" size="small">操作</a-button>
  </div>
</div>
""",
    ),
    M(
        "team",
        "空团队条目",
        "重叠灰阶头像 + 无成员文案 + 邀请。",
        "`.wa-item-avatars` 叠放；outline 邀请",
        "叠放头像组 + 文案 + 按钮",
        """
<div class="wa-item wa-item--outline">
  <div class="wa-item-avatars">
    <a-avatar :size="28" style="background:#bbb;color:#fff;font-size:10px">甲</a-avatar>
    <a-avatar :size="28" style="background:#999;color:#fff;font-size:10px">乙</a-avatar>
    <a-avatar :size="28" style="background:#777;color:#fff;font-size:10px">丙</a-avatar>
  </div>
  <div class="wa-item__body">
    <div class="wa-item__title">暂无团队成员</div>
    <div class="wa-item__desc">邀请成员一起协作本项目。</div>
  </div>
  <div class="wa-item__actions">
    <a-button type="outline" size="small">邀请</a-button>
  </div>
</div>
""",
    ),
    M(
        "avatar",
        "头像条目",
        "多名成员头像列表：姓名、邮箱与添加操作。",
        "`.wa-item-group` 内多张描边行；a-avatar + text +",
        "分行描边；头像 + 姓名/邮箱 + 右侧 +",
        """
<div class="wa-item-group">
  <div class="wa-item wa-item--outline">
    <a-avatar :size="36" style="background: #4b5563; color:#fff; font-size:12px">闪</a-avatar>
    <div class="wa-item__body">
      <div class="wa-item__title">闪灯</div>
      <div class="wa-item__desc">shandeng@acme.com</div>
    </div>
    <div class="wa-item__actions">
      <a-button type="text" size="mini" aria-label="添加">
        <icon-plus :size="14"></icon-plus>
      </a-button>
    </div>
  </div>
  <div class="wa-item wa-item--outline">
    <a-avatar :size="36" style="background: #6b7280; color:#fff; font-size:12px">启</a-avatar>
    <div class="wa-item__body">
      <div class="wa-item__title">启明</div>
      <div class="wa-item__desc">qiming@acme.com</div>
    </div>
    <div class="wa-item__actions">
      <a-button type="text" size="mini" aria-label="添加">
        <icon-plus :size="14"></icon-plus>
      </a-button>
    </div>
  </div>
  <div class="wa-item wa-item--outline">
    <a-avatar :size="36" style="background: #111827; color:#fff; font-size:12px">恶</a-avatar>
    <div class="wa-item__body">
      <div class="wa-item__title">恶兔</div>
      <div class="wa-item__desc">etu@acme.com</div>
    </div>
    <div class="wa-item__actions">
      <a-button type="text" size="mini" aria-label="添加">
        <icon-plus :size="14"></icon-plus>
      </a-button>
    </div>
  </div>
</div>
""",
    ),
    M(
        "playlist",
        "媒体列表",
        "独立描边行：封面 + 标题/副标签 + 专辑 + 时长，整行可点。",
        "`.wa-item-group` 内多张 `.wa-item--outline.wa-item--link`；本地 SVG 封面",
        "分行描边；标题旁副标签同行；下方专辑名；右侧时长",
        f"""
<div class="wa-item-group">
  <a class="wa-item wa-item--outline wa-item--link" href="javascript:void(0)">
    <div class="wa-item__media wa-item__media--image"><img src="{COVER['1']}" alt="" /></div>
    <div class="wa-item__body">
      <div class="wa-item__title-row">
        <div class="wa-item__title">午夜城灯</div>
        <span class="wa-item__subtitle">电光之夜</span>
      </div>
      <div class="wa-item__desc">霓虹梦境</div>
    </div>
    <span class="wa-item__meta">3:45</span>
  </a>
  <a class="wa-item wa-item--outline wa-item--link" href="javascript:void(0)">
    <div class="wa-item__media wa-item__media--image"><img src="{COVER['2']}" alt="" /></div>
    <div class="wa-item__body">
      <div class="wa-item__title-row">
        <div class="wa-item__title">咖啡馆闲谈</div>
        <span class="wa-item__subtitle">都市故事</span>
      </div>
      <div class="wa-item__desc">晨间冲泡</div>
    </div>
    <span class="wa-item__meta">4:05</span>
  </a>
  <a class="wa-item wa-item--outline wa-item--link" href="javascript:void(0)">
    <div class="wa-item__media wa-item__media--image"><img src="{COVER['3']}" alt="" /></div>
    <div class="wa-item__body">
      <div class="wa-item__title-row">
        <div class="wa-item__title">数字雨</div>
        <span class="wa-item__subtitle">二进制节拍</span>
      </div>
      <div class="wa-item__desc">赛博交响</div>
    </div>
    <span class="wa-item__meta">3:30</span>
  </a>
</div>
""",
    ),
    M(
        "variants",
        "样式变体",
        "默认 / 描边 / 弱化三态，带图标媒体槽。",
        "三张 `.wa-item`：默认透明、outline 描边、muted 浅底",
        "左圆角图标槽 + 标题描述",
        """
<div class="wa-item-stack">
  <div class="wa-item">
    <div class="wa-item__media"><icon-email :size="15"></icon-email></div>
    <div class="wa-item__body">
      <div class="wa-item__title">默认变体</div>
      <div class="wa-item__desc">透明背景，无描边。</div>
    </div>
  </div>
  <div class="wa-item wa-item--outline">
    <div class="wa-item__media"><icon-email :size="15"></icon-email></div>
    <div class="wa-item__body">
      <div class="wa-item__title">描边变体</div>
      <div class="wa-item__desc">可见边框的描边样式。</div>
    </div>
  </div>
  <div class="wa-item wa-item--muted">
    <div class="wa-item__media"><icon-email :size="15"></icon-email></div>
    <div class="wa-item__body">
      <div class="wa-item__title">弱化变体</div>
      <div class="wa-item__desc">浅底背景，适合次要内容。</div>
    </div>
  </div>
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

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5**；换文案只改汉字。
- **B**（无母版）：按 §5 还原。
- **样式落地**：并入宿主 CSS；禁止独立 link `component.css`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：{m["rules"]}
- 与 `list` 分工：Item 是单行原语/小组；a-list 多条目列表用 `list`
- 禁止 CDN 图；封面用本地 SVG data URI
- Vue 自定义标签勿自闭合

## 4. 视觉规格

- 布局 / 层级 / 强调：{m["visual"]}
- 动效：仅 hover/focus
- 颜色：`--wa-*` / Arco token

## 5. 直接粘贴

```html
{m["html"]}
```

## 6. 验收

- [ ] 落地与 §5 同构
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
  <title>条目 · 家族对照</title>
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
          <h1 class="wa-fam-title">条目</h1>
          <p class="wa-fam-lead">媒体、标题、描述与操作的单行布局，适合成员、通知与媒体清单。</p>
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
    # drop list-outline/avatar/link leftovers and prior item
    drop = {"list-outline", "list-avatar", "list-link"}
    comps = [
        c
        for c in data["components"]
        if c.get("slug") not in drop
        and c.get("family") != FAMILY
        and not str(c.get("slug", "")).startswith(f"{FAMILY}-")
    ]
    insert_at = next((i + 1 for i, c in enumerate(comps) if c.get("slug") == "list-empty"), len(comps))
    new_comps = [
        {
            "slug": m["slug"],
            "label": m["label"],
            "surface": "general",
            "status": "preview",
            "tier": "free",
            "path": f"components/{FAMILY}/{m['subdir']}",
            "usedByBlocks": [],
            "notes": f"家族 {FAMILY} / {m['subdir']}；对照 shadcnuikit item",
            "category": CATEGORY,
            "tags": [],
            "family": FAMILY,
            "relatedComponents": ["list"],
        }
        for m in MEMBERS
    ]
    comps[insert_at:insert_at] = new_comps
    data["components"] = comps

    for fam in data.get("families", []):
        if fam.get("slug") == "list":
            fam["members"] = [s for s in fam.get("members", []) if s not in drop]
            fam["notes"] = "根目录家族页；成员在 " + "/".join(
                s.replace("list-", "", 1) for s in fam["members"]
            )

    families = data.setdefault("families", [])
    entry = {
        "slug": FAMILY,
        "label": "条目",
        "path": f"components/{FAMILY}",
        "surface": "general",
        "status": "preview",
        "tier": "free",
        "members": [m["slug"] for m in MEMBERS],
        "notes": "对照 shadcnuikit Item；成员在 " + "/".join(m["subdir"] for m in MEMBERS),
    }
    found = False
    for fam in families:
        if fam.get("slug") == FAMILY:
            fam.update(entry)
            found = True
            break
    if not found:
        idx = next((i + 1 for i, f in enumerate(families) if f.get("slug") == "list"), len(families))
        families[idx:idx] = [entry]

    save_catalog(data)


def cleanup_list_dirs() -> None:
    lst = ROOT / "components" / "list"
    for name in ("outline", "avatar", "link"):
        d = lst / name
        if d.is_dir():
            shutil.rmtree(d)
            print("removed", d.relative_to(ROOT).as_posix())


def main() -> None:
    cleanup_list_dirs()
    for m in MEMBERS:
        write_member(m)
        print("member", m["slug"])
    write_family()
    update_catalog()
    print("done")


if __name__ == "__main__":
    main()
