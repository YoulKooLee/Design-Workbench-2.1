# -*- coding: utf-8 -*-
"""Generate / refresh list family (UTF-8), aligned with denser card/item patterns.
Run from frame/web:
  python scripts/_gen_list_variants.py
"""
from __future__ import annotations

from catalog_io import load_catalog, save_catalog

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LIST = ROOT / "components" / "list"
CATALOG = ROOT / "_meta" / "config.json"


def M(
    subdir: str,
    label: str,
    lead: str,
    rules: str,
    visual: str,
    html: str,
    *,
    setup: str = "",
) -> dict:
    return {
        "subdir": subdir,
        "slug": f"list-{subdir}",
        "label": label,
        "lead": lead,
        "rules": rules,
        "visual": visual,
        "html": html.strip(),
        "setup": setup,
    }


LIST_ITEMS_SETUP = """
          listItems: [
            { title: '系统升级通知', desc: '将于本周六 02:00 进行维护', icon: 'icon-tool', bg: 'rgb(var(--primary-6))' },
            { title: '新功能上线', desc: '工作台支持自定义布局', icon: 'icon-apps', bg: 'rgb(var(--success-6))' },
            { title: '安全提醒', desc: '请定期更新登录密码', icon: 'icon-safe', bg: 'rgb(var(--warning-6))' },
          ],
"""

TEAM_ITEMS_SETUP = """
          teamItems: [
            { title: '李明', desc: '产品设计 · 可编辑', icon: 'icon-user', bg: 'rgb(var(--primary-6))' },
            { title: '王芳', desc: '前端工程 · 可查看', icon: 'icon-user', bg: 'rgb(var(--success-6))' },
            { title: '陈伟', desc: '客户成功 · 可查看', icon: 'icon-user', bg: 'rgb(var(--warning-6))' },
          ],
"""

FAMILY_SETUP = LIST_ITEMS_SETUP + TEAM_ITEMS_SETUP

AVATAR_SLOT = """      <template #avatar>
        <a-avatar class="wa-list-avatar" :size="36" :style="{ backgroundColor: item.bg }">
          <component :is="item.icon" :size="15"></component>
        </a-avatar>
      </template>"""

MEMBERS = [
    M(
        "default",
        "列表",
        "基础边框条目列表，适合简单分组与目录。",
        "真 a-list；`:bordered=\"true\"`；条目为纯文本",
        "描边列表；条目等分分隔；宽度随容器",
        """
<a-list class="wa-list" :bordered="true">
  <a-list-item>条目一 · 今日待办</a-list-item>
  <a-list-item>条目二 · 本周里程碑</a-list-item>
  <a-list-item>条目三 · 风险跟进</a-list-item>
  <a-list-item>条目四 · 客户反馈</a-list-item>
</a-list>
""",
    ),
    M(
        "meta",
        "元信息列表",
        "带图标头像、标题与描述的条目行（轻量 Item 布局）。",
        "真 a-list；`a-list-item-meta` + `#avatar` 内 FA 图标（勿用汉字占位）",
        "图标圆标 + 标题/描述；间距充足；文案可省略号",
        f"""
<a-list class="wa-list" :bordered="false">
  <a-list-item v-for="(item, i) in listItems" :key="i">
    <a-list-item-meta :title="item.title" :description="item.desc">
{AVATAR_SLOT}
    </a-list-item-meta>
  </a-list-item>
</a-list>
""",
        setup=LIST_ITEMS_SETUP,
    ),
    M(
        "action",
        "操作列表",
        "元信息条目 + 行尾操作，适合通知与待办流。",
        "真 a-list；`#actions` 文本按钮；`#avatar` 用 FA 图标",
        "图标元信息 + 右侧操作；行高与间距对齐",
        f"""
<a-list class="wa-list" :bordered="false">
  <a-list-item v-for="(item, i) in listItems" :key="i">
    <a-list-item-meta :title="item.title" :description="item.desc">
{AVATAR_SLOT}
    </a-list-item-meta>
    <template #actions>
      <a-button type="text" size="small">查看</a-button>
    </template>
  </a-list-item>
</a-list>
""",
        setup=LIST_ITEMS_SETUP,
    ),
    M(
        "hoverable",
        "可悬浮列表",
        "条目悬停高亮，适合可点击的选择列表。",
        "真 a-list；`hoverable`；`#avatar` 用 FA 图标",
        "悬停底色；图标元信息行",
        f"""
<a-list class="wa-list" :bordered="false" hoverable>
  <a-list-item v-for="(item, i) in listItems" :key="i">
    <a-list-item-meta :title="item.title" :description="item.desc">
{AVATAR_SLOT}
    </a-list-item-meta>
  </a-list-item>
</a-list>
""",
        setup=LIST_ITEMS_SETUP,
    ),
    M(
        "header",
        "带页眉列表",
        "列表头/尾说明区，适合团队成员与分组清单。",
        "真 a-list；`#header` / `#footer`；成员行用 `icon-user`",
        "顶栏标题说明 + 成员行 + 底栏邀请",
        f"""
<a-list class="wa-list wa-list--panel" :bordered="true">
  <template #header>
    <div class="wa-list-panel__head">
      <div class="wa-list-panel__title">团队成员</div>
      <div class="wa-list-panel__desc">邀请同事一起协作。</div>
    </div>
  </template>
  <a-list-item v-for="(item, i) in teamItems" :key="i">
    <a-list-item-meta :title="item.title" :description="item.desc">
{AVATAR_SLOT}
    </a-list-item-meta>
  </a-list-item>
  <template #footer>
    <a-button type="outline" size="small" long>
      <template #icon><icon-plus></icon-plus></template>
      邀请成员
    </a-button>
  </template>
</a-list>
""",
        setup=TEAM_ITEMS_SETUP,
    ),
    M(
        "empty",
        "空状态列表",
        "无数据时的空态列表，引导邀请或调整筛选。",
        "真 a-list；`#empty` 内嵌 a-empty；可配合 `#header`",
        "页眉 + 居中空态与主按钮",
        """
<a-list class="wa-list wa-list--panel wa-list--empty" :bordered="true" :data="[]">
  <template #header>
    <div class="wa-list-panel__head">
      <div class="wa-list-panel__title">团队成员</div>
      <div class="wa-list-panel__desc">邀请你的团队成员一起协作。</div>
    </div>
  </template>
  <template #empty>
    <div class="wa-list-empty">
      <a-empty description="未找到匹配的团队成员">
        <a-button type="primary" size="small">
          <template #icon><icon-plus></icon-plus></template>
          邀请成员
        </a-button>
      </a-empty>
    </div>
  </template>
</a-list>
""",
    ),
]


COMPONENT_JS_PLAIN = """;(function () {
  WebArco.mount('#app', {})
})()
"""

COMPONENT_CSS = """/* list family — icon avatars + readable item layout */
.wa-list.arco-list {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  background: var(--color-bg-2);
}

.wa-fam-section[data-family="list"] .wa-fam-card__stage {
  width: 100%;
  align-items: stretch;
  justify-content: flex-start;
}

.wa-fam-section[data-family="list"] .wa-fam-card__stage > .wa-list,
body.wa-preview-embed .wa-preview-stage[data-slug^="list-"] .wa-embed__stage > .wa-list {
  width: 100%;
  max-width: 100%;
}

.wa-list .arco-list-item {
  padding: 14px 16px;
  align-items: center;
  box-sizing: border-box;
}

.wa-list .arco-list-item-main {
  display: flex;
  align-items: center;
  min-width: 0;
  flex: 1;
}

.wa-list .arco-list-item-meta {
  align-items: center;
  flex: 1;
  min-width: 0;
}

.wa-list .arco-list-item-meta-avatar {
  margin-right: 12px;
  flex-shrink: 0;
}

.wa-list .arco-list-item-meta-content {
  flex: 1;
  min-width: 0;
}

.wa-list .arco-list-item-meta-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-1);
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.wa-list .arco-list-item-meta-description {
  font-size: 13px;
  color: var(--color-text-3);
  margin-top: 2px;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.wa-list .arco-list-item-action {
  flex-shrink: 0;
  margin-left: 8px;
  padding-left: 0;
}

.wa-list-avatar.arco-avatar {
  color: #fff;
  flex-shrink: 0;
}

.wa-list-avatar .pro-fa-icon,
.wa-list-avatar i[class*="fa-"] {
  color: inherit;
  font-size: 15px;
  line-height: 1;
}

.wa-list-panel__head {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.wa-list-panel__title {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-1);
  line-height: 1.35;
}

.wa-list-panel__desc {
  font-size: 13px;
  color: var(--color-text-3);
  line-height: 1.4;
}

.wa-list--panel .arco-list-header,
.wa-list--panel .arco-list-footer {
  padding: 14px 16px;
}

.wa-list--panel .arco-list-footer {
  border-top: 1px solid var(--color-border-2);
}

/* Arco Empty 默认横向 flex，列表空态改为竖排居中 */
.wa-list-empty {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  justify-content: center;
  padding: 8px 0 4px;
}

.wa-list-empty .arco-empty,
.wa-list--empty .arco-empty {
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  min-height: 168px;
  padding: 20px 16px 28px;
  box-sizing: border-box;
  gap: 4px;
}

.wa-list-empty .arco-empty-image,
.wa-list--empty .arco-empty-image {
  margin-bottom: 4px;
}

.wa-list-empty .arco-empty-description,
.wa-list--empty .arco-empty-description {
  margin: 0 0 12px;
  text-align: center;
  color: var(--color-text-3);
  font-size: 13px;
  line-height: 1.5;
}

body.wa-preview-embed .wa-preview-stage[data-slug^="list-"].wa-embed {
  width: min(420px, calc(100% - 32px));
}
"""


def indent_html(html: str, spaces: int) -> str:
    pad = " " * spaces
    return "\n".join(pad + ln if ln.strip() else ln for ln in html.split("\n"))


def member_js(m: dict) -> str:
    if not m.get("setup"):
        return COMPONENT_JS_PLAIN
    setup_body = m["setup"].rstrip()
    return f""";(function () {{
  WebArco.mount('#app', {{
    setup: function (api) {{
      return {{{setup_body}
      }}
    }},
  }})
}})()
"""


def write_member(m: dict) -> None:
    d = LIST / m["subdir"]
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
    (d / "component.js").write_text(member_js(m), encoding="utf-8", newline="\n")

    siblings = "\n".join(
        f'| `{x["slug"]}` | `components/list/{x["subdir"]}/` |'
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
- **样式落地**：将家族 `components/list/component.css` 中相关规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：{m["rules"]}
- 私有样式真源在 `components/list/component.css`；§5 **只贴 HTML**；落地合并进宿主样式
- Vue 模板内自定义标签勿写成自闭合（如 `</a-list-item-meta>`、`</a-avatar>`）

## 4. 视觉规格

- 布局 / 层级 / 强调：{m["visual"]}
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
{m["html"]}
```

> 换文案：只改汉字，勿改 class / type。有私有样式时并入宿主 CSS，勿单独 link `component.css`。若使用 `listItems`，在页面 setup 中提供同构数据。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/list/{m["subdir"]}/index.html`

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
    html = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <script src="../../assets/common/js/theme.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>列表 · 家族对照</title>
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
    <section class="wa-fam-section wa-fam-fade-in" data-family="list">
      <div class="wa-fam-section__inner">
        <header class="wa-fam-head">
          <p class="wa-fam-kicker">list</p>
          <h1 class="wa-fam-title">列表</h1>
          <p class="wa-fam-lead">结构化条目行：元信息、操作、悬停与空态，适合通知流与成员清单。</p>
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
      id: 'list',
      members: [{members_js}],
      setup: function (api) {{
        return {{{FAMILY_SETUP}
        }}
      }},
    }}
  </script>
  <script src="../copy-prompt.js"></script>
  <script src="../family.js"></script>
</body>
</html>
"""
    (LIST / "index.html").write_text(html, encoding="utf-8", newline="\n")
    (LIST / "component.css").write_text(COMPONENT_CSS, encoding="utf-8", newline="\n")


def update_catalog() -> None:
    data = load_catalog()
    comps = [
        c
        for c in data["components"]
        if not (c.get("family") == "list" and str(c.get("slug", "")).startswith("list-"))
    ]
    insert_at = next(
        (i for i, c in enumerate(comps) if c.get("slug") == "tree-default"),
        len(comps),
    )
    new_comps = [
        {
            "slug": m["slug"],
            "label": m["label"],
            "surface": "general",
            "status": "preview",
            "tier": "free",
            "path": f"components/list/{m['subdir']}",
            "usedByBlocks": [],
            "notes": f"家族 list / {m['subdir']}",
            "category": "data-display",
            "tags": [],
            "family": "list",
        }
        for m in MEMBERS
    ]
    comps[insert_at:insert_at] = new_comps
    data["components"] = comps

    for fam in data.get("families", []):
        if fam.get("slug") == "list":
            fam["members"] = [m["slug"] for m in MEMBERS]
            fam["notes"] = "根目录家族页；成员在 " + "/".join(x["subdir"] for x in MEMBERS)
            break
    save_catalog(data)


def main() -> None:
    for m in MEMBERS:
        write_member(m)
        print("member", m["slug"])
    write_family()
    print("family index + css")
    update_catalog()
    print("catalog updated")


if __name__ == "__main__":
    main()
