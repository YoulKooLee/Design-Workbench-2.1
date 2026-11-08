# -*- coding: utf-8 -*-
"""Generate layout-utility blocks: Menu / Grid / ResizeBox / Split / Scrollbar / Layout.

Run from frame/web:
  python scripts/_gen_layout_blocks.py
  python scripts/check-utf8.py --strict
"""
from __future__ import annotations

from catalog_io import load_catalog, save_catalog

import json
from pathlib import Path

WEB = Path(__file__).resolve().parents[1]
CATALOG = WEB / "_meta" / "config.json"
BLOCKS = WEB / "blocks"

BLOCKS_DEF = [
    {
        "slug": "nav-menu",
        "label": "导航菜单",
        "category": "nav",
        "surface": "general",
        "lead": "水平菜单导航区段，用于站内栏目切换与当前项高亮。",
        "scene": "通用站顶栏或区段内水平菜单",
        "tags": [],
        "notes": "Arco Menu 水平态；暂作区块评估，未升组件家族",
        "relatedComponents": ["link"],
    },
    {
        "slug": "layout-grid",
        "label": "栅格布局",
        "category": "content",
        "surface": "general",
        "lead": "响应式栅格分栏，用于内容区多列卡片与信息排布。",
        "scene": "内容区多列排版",
        "tags": ["layout-split"],
        "notes": "Arco Grid Row/Col；暂作区块评估",
        "relatedComponents": ["card"],
    },
    {
        "slug": "layout-resize-box",
        "label": "可调宽面板",
        "category": "content",
        "surface": "general",
        "lead": "可拖拽调整宽度的内容面板，用于左右对照与工具边栏。",
        "scene": "内容区可拖拽分栏预览",
        "tags": ["layout-split"],
        "notes": "Arco ResizeBox；暂作区块评估",
        "relatedComponents": [],
    },
    {
        "slug": "layout-split",
        "label": "分割面板",
        "category": "content",
        "surface": "general",
        "lead": "左右或上下可拖分割，用于对照预览与双栏工作区。",
        "scene": "双栏对照内容区",
        "tags": ["layout-split"],
        "notes": "Arco Split；暂作区块评估",
        "relatedComponents": [],
    },
    {
        "slug": "layout-scrollbar",
        "label": "滚动容器",
        "category": "chrome",
        "surface": "general",
        "lead": "定高区域自定义滚动条，用于侧栏列表与长内容嵌套滚动。",
        "scene": "定高内容区滚动",
        "tags": [],
        "notes": "Arco Scrollbar；暂作区块评估",
        "relatedComponents": [],
    },
    {
        "slug": "layout-shell",
        "label": "布局壳",
        "category": "chrome",
        "surface": "general",
        "lead": "页头内容页脚布局骨架，用于通用站壳评估而非后台侧栏。",
        "scene": "轻量页壳拼装评估",
        "tags": [],
        "notes": "Arco Layout；WEB 轻量演示，禁止 Pro 侧栏气质",
        "relatedComponents": [],
    },
]


def write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8", newline="\n")


def block_css(slug: str) -> str:
    return f"""/**
 * {slug} — 区块视觉真源
 */
section[data-slug="{slug}"] {{
  padding: 48px 0;
}}

section[data-slug="{slug}"] .wa-section__inner {{
  max-width: var(--wa-container, 1120px);
  margin: 0 auto;
  padding: 0 24px;
}}

section[data-slug="{slug}"] .wa-kicker {{
  margin: 0 0 8px;
  font-size: 13px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--wa-color-muted);
}}

section[data-slug="{slug}"] .wa-title {{
  margin: 0 0 10px;
  font-size: clamp(22px, 2.4vw, 28px);
  line-height: 1.25;
  color: var(--wa-color-text);
}}

section[data-slug="{slug}"] .wa-lead {{
  margin: 0 0 24px;
  max-width: 42em;
  color: var(--wa-color-muted);
  font-size: 15px;
  line-height: 1.6;
}}

section[data-slug="{slug}"] .wa-block-stage {{
  border: 1px solid var(--wa-color-border, var(--color-border-2));
  border-radius: 8px;
  background: var(--wa-color-surface, var(--color-bg-2));
  padding: 16px;
}}
"""


def prompt_md(b: dict) -> str:
    slug = b["slug"]
    return f"""# {b['label']}

> 状态：preview · slug：`{slug}` · 类型：block · 母版：web · surface：{b['surface']} · category：{b['category']}

## 1. 角色与目标

实现「{b['label']}」（`{slug}`），用于 {b['scene']}。

成功标准：预览区段展示真控件形态，可整段复用并按 §5 换文案。

## 2. 实现路径（只走一条）

- **A**（有母版）：**先查** `blocks/{slug}/` → **有则复用预览区段并按 §5 填槽**，勿无故按 §7 重写。
- **B**（无母版 / 其它栈）：只还原区段信息架构。视觉跟宿主库。禁止外网 CDN。

## 3. 约束

- WEB；禁止 Admin 侧栏 / ProShell / 后台密排气质
- 禁止外网 CDN；资源本地化
- 响应式：窄屏下结构可纵向堆叠，勿横向溢出
- 交互：仅本区段控件交互；本区块用于布局能力评估，后续再决定是否升为 `components/` 家族

## 4. 视觉规格

- 布局：区头（kicker / title / lead）+ 舞台 `.wa-block-stage`
- 强调：舞台内真控件；颜色只用 `--wa-*` / Arco token
- 动效：无

## 5. 可变槽位

| 槽位 | 说明 | 示例 |
|------|------|------|
| `{{{{kicker}}}}` | 英文区标 | Layout |
| `{{{{headline}}}}` | 区标题 | {b['label']} |
| `{{{{lead}}}}` | 一句说明 | {b['lead']} |
| `{{{{stage}}}}` | 舞台内控件与文案 | 见预览 |

## 6. 验收

- [ ] 与 §7 / 预览同一区段信息架构
- [ ] 符合 §3；无 Pro 壳、无 CDN
- [ ] **A 且已有 slug**：已复用 `blocks/{slug}/` 填槽，未无故全量重写

## 7. 参考结构（骨架）

与预览区段同构：

```html
<section data-slug="{slug}" class="wa-section">
  <div class="wa-section__inner">
    <header>
      <p class="wa-kicker">{{{{kicker}}}}</p>
      <h2 class="wa-title">{{{{headline}}}}</h2>
      <p class="wa-lead">{{{{lead}}}}</p>
    </header>
    <div class="wa-block-stage">
      <!-- 真控件舞台 -->
    </div>
  </div>
</section>
```

预览：`blocks/{slug}/index.html`

## 8. 关联资源（可选）

| 类型 | 路径 | 说明 |
|------|------|------|
| css | `block.css` | 本区块视觉真源 |
| notes | — | 暂未升组件；评估后再迁 `components/` |
"""


def meta_yaml(b: dict) -> str:
    return f"""slug: {b['slug']}
label: {b['label']}
type: block
surface: {b['surface']}
category: {b['category']}
status: preview
tier: free
framework: web
phase: 1
"""


def block_js_simple() -> str:
    return """;(function () {
  WebArco.mount('#app', {
    setup() {
      return {}
    },
  })
})()
"""


def block_js_menu() -> str:
    return """;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      const selected = ref(['product'])
      return { selected }
    },
  })
})()
"""


def block_js_split() -> str:
    return """;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      const size = ref(0.48)
      return { size }
    },
  })
})()
"""


def block_js_resize() -> str:
    return """;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      const width = ref(220)
      return { width }
    },
  })
})()
"""


STAGE = {
    "nav-menu": """        <div class="wa-block-stage">
          <a-menu mode="horizontal" v-model:selected-keys="selected">
            <a-menu-item key="product">产品</a-menu-item>
            <a-menu-item key="solutions">方案</a-menu-item>
            <a-sub-menu key="resources" title="资源">
              <a-menu-item key="docs">文档</a-menu-item>
              <a-menu-item key="blog">博客</a-menu-item>
            </a-sub-menu>
            <a-menu-item key="pricing">定价</a-menu-item>
          </a-menu>
        </div>""",
    "layout-grid": """        <div class="wa-block-stage">
          <a-row :gutter="16">
            <a-col :xs="24" :sm="12" :md="8">
              <a-card title="栏目一" :bordered="true"><p style="margin:0;color:var(--color-text-2)">栅格列内容 A</p></a-card>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8">
              <a-card title="栏目二" :bordered="true"><p style="margin:0;color:var(--color-text-2)">栅格列内容 B</p></a-card>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8">
              <a-card title="栏目三" :bordered="true"><p style="margin:0;color:var(--color-text-2)">栅格列内容 C</p></a-card>
            </a-col>
          </a-row>
        </div>""",
    "layout-resize-box": """        <div class="wa-block-stage" style="min-height:180px">
          <a-resize-box
            v-model:width="width"
            :directions="['right']"
            style="min-height:140px;padding:12px;border:1px dashed var(--color-border-2);background:var(--color-fill-1)"
          >
            <p style="margin:0 0 8px;font-weight:600">可拖右缘调宽</p>
            <p style="margin:0;color:var(--color-text-3)">当前宽度约 {{ Math.round(width) }}px</p>
          </a-resize-box>
        </div>""",
    "layout-split": """        <div class="wa-block-stage">
          <a-split v-model:size="size" style="height:180px;width:100%;border:1px solid var(--color-border-2);border-radius:4px;overflow:hidden">
            <template #first>
              <div style="height:100%;padding:12px;background:var(--color-fill-1)">
                <strong>左侧面板</strong>
                <p style="margin:8px 0 0;color:var(--color-text-3)">拖中间分隔线调整比例</p>
              </div>
            </template>
            <template #second>
              <div style="height:100%;padding:12px;background:var(--color-bg-2)">
                <strong>右侧面板</strong>
                <p style="margin:8px 0 0;color:var(--color-text-3)">适合对照预览</p>
              </div>
            </template>
          </a-split>
        </div>""",
    "layout-scrollbar": """        <div class="wa-block-stage">
          <a-scrollbar style="height:160px;overflow:auto;border:1px solid var(--color-border-2);border-radius:4px;padding:0 4px">
            <div style="padding:12px">
              <p v-for="n in 24" :key="n" style="margin:0 0 8px;color:var(--color-text-2)">滚动内容行 {{ n }} — 用于定高区域列表</p>
            </div>
          </a-scrollbar>
        </div>""",
    "layout-shell": """        <div class="wa-block-stage" style="padding:0;overflow:hidden">
          <a-layout style="min-height:220px">
            <a-layout-header style="background:var(--color-fill-2);color:var(--color-text-1);padding:0 16px;display:flex;align-items:center;font-weight:600">
              站点页头
            </a-layout-header>
            <a-layout>
              <a-layout-sider
                :width="140"
                style="background:var(--color-fill-1);color:var(--color-text-2);padding:12px;border-right:1px solid var(--color-border-2)"
              >
                侧栏导航<br /><span style="font-size:12px;color:var(--color-text-3)">轻量示意</span>
              </a-layout-sider>
              <a-layout-content style="padding:16px;background:var(--color-bg-2);color:var(--color-text-2)">
                主内容区。此壳仅作布局能力评估，勿当作 Admin Pro 侧栏模板。
              </a-layout-content>
            </a-layout>
            <a-layout-footer style="background:var(--color-fill-2);color:var(--color-text-3);padding:10px 16px;font-size:13px">
              页脚
            </a-layout-footer>
          </a-layout>
        </div>""",
}

JS_FOR = {
    "nav-menu": block_js_menu,
    "layout-grid": block_js_simple,
    "layout-resize-box": block_js_resize,
    "layout-split": block_js_split,
    "layout-scrollbar": block_js_simple,
    "layout-shell": block_js_simple,
}

EXTRA_CSS = {
    "nav-menu": """
section[data-slug="nav-menu"] .arco-menu-horizontal {
  background: transparent;
  border-bottom: none;
}
""",
    "layout-shell": """
section[data-slug="layout-shell"] .arco-layout-sider {
  box-shadow: none !important;
}
""",
}


def index_html(b: dict) -> str:
    slug = b["slug"]
    stage = STAGE[slug]
    # Use concatenation so Vue {{ }} in stage is safe
    return (
        "<!DOCTYPE html>\n"
        '<html lang="zh-CN">\n'
        "<head>\n"
        '  <meta charset="UTF-8" />\n'
        '  <script src="../../assets/common/js/theme.js"></script>\n'
        '  <meta name="viewport" content="width=device-width, initial-scale=1" />\n'
        f"  <title>{b['label']} · {slug}</title>\n"
        '  <link rel="stylesheet" href="../../vendor/arco/css/arco.css" />\n'
        '  <link rel="stylesheet" href="../../assets/common/css/chrome.css" />\n'
        '  <link rel="stylesheet" href="../../assets/common/css/global.css" />\n'
        '  <link rel="stylesheet" href="../../assets/common/css/components.css" />\n'
        '  <link rel="stylesheet" href="./block.css" />\n'
        "</head>\n"
        "<body>\n"
        '  <div id="app" v-cloak>\n'
        f'    <section class="wa-section wa-fade-in" data-slug="{slug}">\n'
        '      <div class="wa-section__inner">\n'
        "        <header>\n"
        '          <p class="wa-kicker">Layout</p>\n'
        f'          <h2 class="wa-title">{b["label"]}</h2>\n'
        f'          <p class="wa-lead">{b["lead"]}</p>\n'
        "        </header>\n"
        + stage
        + "\n"
        "      </div>\n"
        "    </section>\n"
        "  </div>\n"
        '  <script src="../../vendor/vue/vue.global.prod.js"></script>\n'
        '  <script src="../../vendor/arco/arco-vue.min.js"></script>\n'
        '  <script src="../../assets/common/js/boot.js"></script>\n'
        '  <script src="./block.js"></script>\n'
        "</body>\n"
        "</html>\n"
    )


def generate(b: dict) -> None:
    d = BLOCKS / b["slug"]
    css = block_css(b["slug"]) + EXTRA_CSS.get(b["slug"], "")
    write(d / "block.css", css)
    write(d / "index.html", index_html(b))
    write(d / "block.js", JS_FOR[b["slug"]]())
    write(d / "prompt.md", prompt_md(b))
    write(d / "meta.yaml", meta_yaml(b))
    print(f"generated blocks/{b['slug']}")


def update_catalog(defs: list[dict]) -> None:
    data = load_catalog()
    existing = {b["slug"] for b in data.get("blocks") or []}
    for b in defs:
        entry = {
            "slug": b["slug"],
            "label": b["label"],
            "surface": b["surface"],
            "status": "preview",
            "tier": "free",
            "phase": 1,
            "path": f"blocks/{b['slug']}",
            "relatedComponents": b["relatedComponents"],
            "relatedAnimations": [],
            "notes": b["notes"],
            "category": b["category"],
            "tags": b["tags"],
        }
        if b["slug"] in existing:
            data["blocks"] = [x for x in data["blocks"] if x["slug"] != b["slug"]]
        data["blocks"].append(entry)

    ver = data.get("version") or "0.8.2"
    parts = ver.split(".")
    if len(parts) == 3 and parts[2].isdigit():
        parts[2] = str(int(parts[2]) + 1)
        data["version"] = ".".join(parts)

    save_catalog(data)
    print(f"catalog blocks updated, version={data['version']}")


def main() -> None:
    for b in BLOCKS_DEF:
        generate(b)
    update_catalog(BLOCKS_DEF)


if __name__ == "__main__":
    main()
