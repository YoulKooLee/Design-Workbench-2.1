# -*- coding: utf-8 -*-
"""Generate / refresh card family (UTF-8), inspired by shadcn Card layouts.
Run from frame/web:
  python scripts/_gen_card_variants.py
"""
from __future__ import annotations

from catalog_io import load_catalog, save_catalog

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CARD = ROOT / "components" / "card"
CATALOG = ROOT / "_meta" / "config.json"

# Each member: subdir, slug, label, lead, rules, visual, html (snippet), setup_keys optional
MEMBERS: list[dict] = []


def M(
    subdir: str,
    label: str,
    lead: str,
    rules: str,
    visual: str,
    html: str,
    *,
    setup: bool = False,
) -> dict:
    return {
        "subdir": subdir,
        "slug": f"card-{subdir}",
        "label": label,
        "lead": lead,
        "rules": rules,
        "visual": visual,
        "html": html.strip(),
        "setup": setup,
    }


MEMBERS = [
    M(
        "default",
        "卡片",
        "带标题与正文的内容容器，信息分组的基础形态。",
        "真 a-card；标题 + 正文；外层 `.wa-acard`",
        "圆角描边卡片；标题栏与正文分层",
        """
<a-card class="wa-acard" title="项目概览" style="width:320px">
  <p class="wa-acard-desc">汇总本周进度、风险与待办，便于团队快速对齐。</p>
</a-card>
""",
    ),
    M(
        "hoverable",
        "可悬浮卡片",
        "悬停抬升阴影，适合可点击的入口卡。",
        "真 a-card；`hoverable`",
        "悬停阴影抬升；说明文案两行",
        """
<a-card class="wa-acard" title="可悬浮" hoverable style="width:320px">
  <p class="wa-acard-desc">悬停时抬升阴影，暗示可点击进入详情；适合入口卡、快捷操作与推荐位。</p>
</a-card>
""",
    ),
    M(
        "bordered",
        "无边框卡片",
        "浅底无描边卡片，适合嵌在色块或分区背景上。",
        "真 a-card；`:bordered=\"false\"`；浅底填充",
        "无描边；浅填充底",
        """
<a-card class="wa-acard wa-acard--soft" title="无边框" :bordered="false" style="width:320px">
  <p class="wa-acard-desc">浅底无描边，适合叠在分区背景上。</p>
</a-card>
""",
    ),
    M(
        "actions",
        "操作卡片",
        "正文说明 + 底栏多个文本操作。",
        "真 a-card；`#actions` 多个 text 按钮",
        "标题正文 + 底栏操作项",
        """
<a-card class="wa-acard" title="带操作" style="width:320px">
  <p class="wa-acard-desc">卡片说明文案，底栏放置次要操作。</p>
  <template #actions>
    <a-button type="text" size="small">详情</a-button>
    <a-button type="text" size="small">编辑</a-button>
  </template>
</a-card>
""",
    ),
    M(
        "extra",
        "页眉操作卡片",
        "标题栏右侧放置菜单或次要操作（对应 CardAction）。",
        "真 a-card；`#extra` 放 a-dropdown / 图标按钮",
        "标题左对齐；右上角更多操作",
        """
<a-card class="wa-acard" title="理赔帮助" style="width:320px">
  <template #extra>
    <a-dropdown>
      <a-button type="text" size="mini">
        <icon-ellipsis></icon-ellipsis>
      </a-button>
      <template #content>
        <a-doption>查看指南</a-doption>
        <a-doption>复制链接</a-doption>
        <a-doption>反馈问题</a-doption>
      </template>
    </a-dropdown>
  </template>
  <p class="wa-acard-desc">按步骤完成每周福利认证，可随时回来查看进度。</p>
</a-card>
""",
    ),
    M(
        "tabs",
        "选项卡卡片",
        "卡片内切换多视图，无需离开当前页。",
        "真 a-card 内嵌 a-tabs；`v-model:active-key`",
        "顶部线条选项卡；内容随页切换",
        """
<a-card class="wa-acard wa-acard--tabs" style="width:360px" :body-style="{ paddingTop: '4px' }">
  <a-tabs v-model:active-key="cardTab" type="line" size="medium">
    <a-tab-pane key="1" title="概览">
      <p class="wa-acard-desc">查看项目指标、近期动态与关键绩效，随时掌握进度。</p>
    </a-tab-pane>
    <a-tab-pane key="2" title="分析">
      <p class="wa-acard-desc">按日 / 周汇总访问与转化，支持导出报表。</p>
    </a-tab-pane>
    <a-tab-pane key="3" title="设置">
      <p class="wa-acard-desc">调整通知、可见性与协作成员权限。</p>
    </a-tab-pane>
  </a-tabs>
</a-card>
""",
        setup=True,
    ),
    M(
        "consent",
        "同意提示卡片",
        "Cookie / 隐私同意条：说明文案 + 拒绝 / 接受。",
        "真 a-card；`#actions` 双按钮右对齐",
        "紧凑说明 + 底栏次/主按钮",
        """
<a-card class="wa-acard wa-acard--consent" title="Cookie 设置" style="width:360px">
  <p class="wa-acard-desc">我们使用 Cookie 以提升浏览体验、提供个性化内容并分析流量。点击「全部接受」即表示同意。</p>
  <template #actions>
    <a-button size="small">拒绝</a-button>
    <a-button type="primary" size="small">全部接受</a-button>
  </template>
</a-card>
""",
    ),
    M(
        "cta",
        "行动号召卡片",
        "升级/定价提示：标题、说明与通栏主按钮。",
        "真 a-card；`a-card-meta` + 通栏 `a-button long`",
        "标题区 + 说明 + 底部通栏主按钮",
        """
<a-card class="wa-acard wa-acard--cta" style="width:320px">
  <a-card-meta title="升级 Pro" description="解锁高级自动化、分析与优先支持，帮助团队更快交付。"></a-card-meta>
  <a-button type="primary" long style="margin-top:16px">开始免费试用</a-button>
</a-card>
""",
    ),
    M(
        "form",
        "表单卡片",
        "登录/注册等表单容器：标题副文案、字段与通栏操作。",
        "真 a-card（无标题栏）；内嵌 a-form；主/次按钮竖排 long；底栏注册引导",
        "头区标题+副文案；密码行右侧忘记密码；按钮通栏竖排；底栏居中链接",
        """
<a-card class="wa-acard wa-acard--form" style="width:340px">
  <div class="wa-acard-form__head">
    <div class="wa-acard-form__title">登录账户</div>
    <p class="wa-acard-form__sub">输入邮箱与密码以登录你的账户。</p>
  </div>
  <a-form :model="{}" layout="vertical" class="wa-acard-form">
    <a-form-item label="邮箱">
      <a-input placeholder="name@example.com" allow-clear></a-input>
    </a-form-item>
    <a-form-item>
      <template #label>
        <span class="wa-acard-form__label-row">
          <span>密码</span>
          <a class="wa-acard-form__link" href="javascript:;">忘记密码？</a>
        </span>
      </template>
      <a-input-password placeholder="请输入密码" allow-clear></a-input-password>
    </a-form-item>
  </a-form>
  <div class="wa-acard-form__actions">
    <a-button type="primary" long>登录</a-button>
    <a-button type="outline" long>使用 Google 继续</a-button>
  </div>
  <p class="wa-acard-form__foot">还没有账户？<a class="wa-acard-form__link wa-acard-form__link--em" href="javascript:;">注册</a></p>
</a-card>
""",
    ),
    M(
        "cover",
        "封面卡片",
        "顶部通栏封面图 + 标题摘要，适合博客/案例预览。",
        "真 a-card；`#cover` 用本地质感块（禁 CDN）；正文 + 阅读更多",
        "顶图满宽圆角；下文案与链接",
        """
<a-card class="wa-acard wa-acard--cover" style="width:320px" :body-style="{ paddingTop: '16px' }">
  <template #cover>
    <div class="wa-acard-cover wa-acard-cover--blog" role="img" aria-label="文章封面"></div>
  </template>
  <a-card-meta title="如何做出惊艳的渐变背景" description="用简单 CSS 混合色彩与动态纹理，提升落地页氛围。"></a-card-meta>
  <template #actions>
    <a-button type="text" size="small">阅读更多</a-button>
  </template>
</a-card>
""",
    ),
]


COMPONENT_JS_PLAIN = """;(function () {
  WebArco.mount('#app', {})
})()
"""

COMPONENT_JS_TABS = """;(function () {
  WebArco.mount('#app', {
    setup: function (api) {
      return { cardTab: api.ref('1') }
    },
  })
})()
"""

COMPONENT_CSS = """/* card family — shadcn-inspired layouts; tokens only */
.wa-acard.arco-card {
  max-width: 100%;
}

.wa-acard-desc {
  margin: 0;
  color: var(--color-text-2);
  font-size: 14px;
  line-height: 1.75;
  letter-spacing: 0.01em;
}

.wa-acard .arco-card-meta-title {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.45;
  letter-spacing: 0.01em;
}

.wa-acard .arco-card-meta-description {
  margin-top: 6px;
  color: var(--color-text-2);
  font-size: 14px;
  line-height: 1.7;
  letter-spacing: 0.01em;
}

.wa-acard--soft.arco-card {
  background: var(--color-fill-1);
}

.wa-acard--cta .arco-card-body {
  padding-top: 16px;
  padding-bottom: 16px;
}

.wa-acard--cta .arco-card-meta-title {
  font-size: 17px;
  line-height: 1.4;
}

.wa-acard--cta .arco-card-meta-description {
  margin-top: 6px;
  line-height: 1.7;
}

.wa-acard--cta .arco-btn {
  margin-top: 16px !important;
}

.wa-acard--form.arco-card .arco-card-body {
  padding: 24px 22px 20px;
}

.wa-acard-form__head {
  margin-bottom: 20px;
}

.wa-acard-form__title {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.35;
  color: var(--color-text-1);
  letter-spacing: 0.01em;
}

.wa-acard-form__sub {
  margin: 6px 0 0;
  font-size: 13px;
  line-height: 1.6;
  color: var(--color-text-3);
}

.wa-acard-form.arco-form-vertical .arco-form-item {
  margin-bottom: 16px;
}

.wa-acard-form.arco-form-vertical .arco-form-item:last-child {
  margin-bottom: 4px;
}

.wa-acard-form.arco-form-vertical .arco-form-item-label-col {
  margin-bottom: 6px;
}

.wa-acard-form.arco-form-vertical .arco-form-item-label-col > .arco-form-item-label {
  display: flex;
  width: 100%;
  justify-content: flex-start;
  line-height: 1.4;
  color: var(--color-text-1);
  font-weight: 500;
}

.wa-acard-form__label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 8px;
}

.wa-acard-form__link {
  font-size: 12px;
  font-weight: 400;
  color: var(--color-text-2);
  text-decoration: none;
  line-height: 1.4;
  white-space: nowrap;
}

.wa-acard-form__link:hover {
  color: rgb(var(--primary-6));
}

.wa-acard-form__link--em {
  color: var(--color-text-1);
  text-decoration: underline;
  text-underline-offset: 2px;
  margin-left: 2px;
}

.wa-acard-form__actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 18px;
}

.wa-acard-form__foot {
  margin: 16px 0 0;
  text-align: center;
  font-size: 13px;
  line-height: 1.5;
  color: var(--color-text-3);
}

.wa-acard-cover {
  display: block;
  width: 100%;
  height: 140px;
  background-size: cover;
  background-position: center;
}

.wa-acard-cover--blog {
  background-image:
    linear-gradient(135deg, rgba(var(--primary-6), 0.85), rgba(var(--primary-3), 0.55)),
    linear-gradient(160deg, var(--color-fill-3), var(--color-fill-1));
}

.wa-acard--cover .arco-card-cover {
  overflow: hidden;
}

.wa-acard--cover .arco-card-body {
  padding-top: 18px;
  padding-bottom: 8px;
}

.wa-acard--cover .arco-card-meta-title {
  font-size: 16px;
  line-height: 1.45;
}

.wa-acard--cover .arco-card-meta-description {
  margin-top: 10px;
}

.wa-acard--tabs .arco-tabs-content {
  padding-top: 12px;
}

.wa-acard--tabs .arco-tabs-content-item {
  padding-bottom: 4px;
}

.wa-acard--tabs .wa-acard-desc {
  line-height: 1.8;
  padding: 2px 0 6px;
}

.wa-acard--consent .arco-card-actions {
  justify-content: flex-end;
}

.wa-acard--consent .wa-acard-desc {
  line-height: 1.75;
}

/* family / embed width for wider demos */
.wa-fam-section[data-family="card"] .wa-fam-card[data-slug="card-tabs"] .wa-fam-card__stage,
.wa-fam-section[data-family="card"] .wa-fam-card[data-slug="card-consent"] .wa-fam-card__stage {
  min-width: 0;
}

body.wa-preview-embed .wa-preview-stage[data-slug^="card-"].wa-embed {
  width: min(420px, calc(100% - 32px));
}
"""


def indent_html(html: str, spaces: int) -> str:
    pad = " " * spaces
    return "\n".join(pad + ln if ln.strip() else ln for ln in html.split("\n"))


def write_member(m: dict) -> None:
    d = CARD / m["subdir"]
    d.mkdir(parents=True, exist_ok=True)
    old = d / "component.css"
    if old.exists():
        old.unlink()

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
        COMPONENT_JS_TABS if m.get("setup") else COMPONENT_JS_PLAIN,
        encoding="utf-8",
        newline="\n",
    )

    siblings = "\n".join(
        f'| `{x["slug"]}` | `components/card/{x["subdir"]}/` |'
        + (" （本条）" if x["slug"] == m["slug"] else "")
        + " |"
        for x in MEMBERS
    )
    style_note = (
        "将家族 `components/card/component.css` 中相关规则**并入**宿主页/模块 CSS；"
        "**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。"
    )
    prompt = f"""# {m["label"]}

> 状态：preview · slug：`{m["slug"]}` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「{m["label"]}」（`{m["slug"]}`）。{m["lead"]}

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：{style_note}

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
{siblings}
"""
    (d / "prompt.md").write_text(prompt, encoding="utf-8", newline="\n")


def fam_card_html(m: dict) -> str:
    body = indent_html(m["html"], 14)
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
    cards = "\n".join(fam_card_html(m) for m in MEMBERS)
    members_js = ", ".join(f"'{m['slug']}'" for m in MEMBERS)
    needs_setup = any(m.get("setup") for m in MEMBERS)
    setup_block = ""
    if needs_setup:
        setup_block = """
      setup: function (api) {
        return { cardTab: api.ref('1') }
      },"""
    html = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <script src="../../assets/common/js/theme.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>卡片 · 家族对照</title>
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
    <section class="wa-fam-section wa-fam-fade-in" data-family="card">
      <div class="wa-fam-section__inner">
        <header class="wa-fam-head">
          <p class="wa-fam-kicker">card</p>
          <h1 class="wa-fam-title">卡片</h1>
          <p class="wa-fam-lead">内容容器：标题区、正文与底栏操作，覆盖行动号召、表单、封面与空态等常见布局。</p>
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
      id: 'card',
      members: [{members_js}],{setup_block}
    }}
  </script>
  <script src="../copy-prompt.js"></script>
  <script src="../family.js"></script>
</body>
</html>
"""
    (CARD / "index.html").write_text(html, encoding="utf-8", newline="\n")
    (CARD / "component.css").write_text(COMPONENT_CSS, encoding="utf-8", newline="\n")


def update_catalog() -> None:
    data = load_catalog()
    comps = [c for c in data["components"] if not str(c.get("slug", "")).startswith("card-")]
    # insert after typography-ellipsis if present, else before list-default
    insert_at = next(
        (i for i, c in enumerate(comps) if c.get("slug") == "list-default"),
        len(comps),
    )
    new_comps = [
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
        }
        for m in MEMBERS
    ]
    comps[insert_at:insert_at] = new_comps
    data["components"] = comps

    for fam in data.get("families", []):
        if fam.get("slug") == "card":
            fam["members"] = [m["slug"] for m in MEMBERS]
            fam["notes"] = "根目录家族页；成员在 " + "/".join(x["subdir"] for x in MEMBERS)
            break
    save_catalog(data)


def prune_obsolete() -> None:
    import shutil

    keep = {m["subdir"] for m in MEMBERS}
    if not CARD.is_dir():
        return
    for child in CARD.iterdir():
        if child.is_dir() and child.name not in keep and not child.name.startswith("."):
            shutil.rmtree(child)
            print("removed", child.name)


def main() -> None:
    for m in MEMBERS:
        write_member(m)
        print("member", m["slug"])
    write_family()
    print("family index + css")
    update_catalog()
    print("catalog updated")
    prune_obsolete()


if __name__ == "__main__":
    main()
