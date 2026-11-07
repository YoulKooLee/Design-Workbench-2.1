# -*- coding: utf-8 -*-
"""Generate remaining Arco WEB component families (carousel/image/…/overflow-list).

Run from frame/web:
  python scripts/_gen_arco_gap.py
  python scripts/sync-prompts.py
  python scripts/check-family-leads.py
  python scripts/check-utf8.py --strict
  python scripts/gen-component-list.py
"""
from __future__ import annotations

from catalog_io import load_catalog, save_catalog

import json
from pathlib import Path

WEB = Path(__file__).resolve().parents[1]
CATALOG = WEB / "_meta" / "config.json"
COMPONENTS = WEB / "components"

# Tiny local SVG placeholders (no CDN)
SVG1 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='180'%3E%3Crect fill='%232563eb' width='100%25' height='100%25'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='20' text-anchor='middle' dy='.3em'%3ESlide%201%3C/text%3E%3C/svg%3E"
SVG2 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='180'%3E%3Crect fill='%23059669' width='100%25' height='100%25'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='20' text-anchor='middle' dy='.3em'%3ESlide%202%3C/text%3E%3C/svg%3E"
SVG3 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='180'%3E%3Crect fill='%23d97706' width='100%25' height='100%25'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='20' text-anchor='middle' dy='.3em'%3ESlide%203%3C/text%3E%3C/svg%3E"
IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='160'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%233b82f6'/%3E%3Cstop offset='1' stop-color='%2306b6d4'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23g)' width='100%25' height='100%25'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='16' text-anchor='middle' dy='.3em'%3EPreview%3C/text%3E%3C/svg%3E"

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

def member_html(label: str, slug: str, control: str, extra_css: str) -> str:
    # Avoid str.format on Vue mustaches inside control.
    return (
        "<!DOCTYPE html>\n"
        '<html lang="zh-CN">\n'
        "<head>\n"
        '  <meta charset="UTF-8" />\n'
        '  <script src="../../../assets/common/js/theme.js"></script>\n'
        '  <meta name="viewport" content="width=device-width, initial-scale=1" />\n'
        f"  <title>{label} · {slug}</title>\n"
        '  <link rel="stylesheet" href="../../../vendor/arco/css/arco.css" />\n'
        '  <link rel="stylesheet" href="../../../assets/common/css/chrome.css" />\n'
        '  <link rel="stylesheet" href="../../../assets/common/css/global.css" />\n'
        '  <link rel="stylesheet" href="../../../vendor/fontawesome/css/all.min.css" />\n'
        '  <link rel="stylesheet" href="../../../assets/common/css/fa-icons.css" />\n'
        '  <link rel="stylesheet" href="../../../assets/common/css/components.css" />\n'
        '  <link rel="stylesheet" href="../../index.css" />\n'
        f"{extra_css}"
        "</head>\n"
        '<body class="wa-preview-embed">\n'
        '  <div id="app" v-cloak>\n'
        f'    <article class="wa-card wa-embed wa-preview-stage" data-slug="{slug}">\n'
        '      <div class="wa-comp-meta wa-preview-chrome">\n'
        f'        <span class="wa-comp-meta__name">{label}</span>\n'
        f'        <span class="wa-comp-meta__slug">{slug}</span>\n'
        "      </div>\n"
        '      <div class="wa-embed__stage">\n'
        + control
        + "\n"
        "      </div>\n"
        "    </article>\n"
        "  </div>\n"
        '  <script src="../../../vendor/vue/vue.global.prod.js"></script>\n'
        '  <script src="../../../vendor/arco/arco-vue.min.js"></script>\n'
        '  <script src="../../../assets/common/js/fa-icons.js"></script>\n'
        '  <script src="../../../assets/common/js/boot.js"></script>\n'
        '  <script src="../../../assets/common/js/wa-prefs.js"></script>\n'
        '  <script src="../../../assets/common/js/wa-prefs.js"></script>\n'
        '  <script src="../prompts.inline.js"></script>\n'
        '  <script src="../../copy-prompt.js"></script>\n'
        '  <script src="../../member.js"></script>\n'
        '  <script src="./component.js"></script>\n'
        "</body>\n"
        "</html>\n"
    )

PROMPT_TMPL = """# {label}

> 状态：preview · slug：`{slug}` · 类型：component · 母版：web · surface：general · category：`{category}`

## 1. 角色与目标

实现「{label}」（`{slug}`）。{scene}

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：{rule}
- 禁止外链 CDN 图片；示例可用本地质感图或 data URI

## 4. 视觉规格

- 布局 / 层级 / 强调：{visual}
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
{snippet}
```

> 换文案：只改汉字，勿改 class / type。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/{family}/{subdir}/index.html`（直开：卡内中文名 + 灰色 slug；官网 iframe 加 `?embed=1` 仅控件）

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
{siblings}
"""

TREE_DATA_JS = """[
            {
              title: '总公司', key: '0',
              children: [
                {
                  title: '华东大区', key: '0-0',
                  children: [
                    { title: '上海分部', key: '0-0-0' },
                    { title: '杭州分部', key: '0-0-1' },
                  ],
                },
                {
                  title: '华南大区', key: '0-1',
                  children: [
                    { title: '深圳分部', key: '0-1-0' },
                    { title: '广州分部', key: '0-1-1' },
                  ],
                },
              ],
            },
            {
              title: '合作伙伴', key: '1',
              children: [{ title: '渠道商', key: '1-0' }],
            },
          ]"""

TABLE_COLS = """[
            { title: '名称', dataIndex: 'name' },
            { title: '城市', dataIndex: 'city' },
            { title: '状态', dataIndex: 'status', slotName: 'status' },
          ]"""

TABLE_DATA = """[
            { key: '1', name: '演示项目 A', city: '上海', status: '进行中' },
            { key: '2', name: '演示项目 B', city: '杭州', status: '已完成' },
            { key: '3', name: '演示项目 C', city: '深圳', status: '待审核' },
          ]"""

TRANSFER_DATA = """[
            { key: '1', value: '1', label: '选项一' },
            { key: '2', value: '2', label: '选项二' },
            { key: '3', value: '3', label: '选项三' },
            { key: '4', value: '4', label: '选项四' },
            { key: '5', value: '5', label: '选项五' },
            { key: '6', value: '6', label: '选项六' },
          ]"""


def write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8", newline="\n")


def sibling_table(family: str, members: list[tuple[str, str, str]], current: str) -> str:
    rows = []
    for slug, sub, _ in members:
        mark = " （本条）" if slug == current else ""
        rows.append(f"| `{slug}` | `components/{family}/{sub}/` |{mark} |")
    return "\n".join(rows)


def copy_btn(slug: str) -> str:
    return COPY_BTN.format(slug=slug)


def card_html(slug: str, label: str, control: str, stage: bool = False) -> str:
    # Concatenate control (may contain Vue {{ }}) — never put it in an f-string.
    inner = (
        control
        if not stage
        else "            <div class=\"wa-fam-card__stage\">\n" + control + "\n            </div>"
    )
    return (
        '          <div class="wa-fam-card" data-slug="'
        + slug
        + '">\n'
        '            <div class="wa-fam-card__top">\n'
        '              <div class="wa-comp-meta"><span class="wa-comp-meta__name">'
        + label
        + '</span><span class="wa-comp-meta__slug">'
        + slug
        + "</span></div>\n"
        + copy_btn(slug)
        + "\n            </div>\n"
        + inner
        + "\n          </div>"
    )


FAMILIES: list[dict] = [
    # —— P0 ——
    {
        "slug": "carousel",
        "label": "走马灯",
        "lead": "内容轮播展示，用于首页 Banner、案例图集与产品图切换。",
        "category": "data-display",
        "types": "default / autoplay / card",
        "setup": "",
        "extra_css_family": '  <link rel="stylesheet" href="./default/component.css" />\n',
        "member_css": """.wa-carousel { width: 100%; max-width: 320px; height: 160px; }
.wa-carousel .arco-carousel-item,
.wa-carousel-slide {
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
}
""",
        "members": [
            {
                "slug": "carousel",
                "subdir": "default",
                "label": "走马灯",
                "css": True,
                "control": f"""            <a-carousel class="wa-carousel">
              <a-carousel-item><div class="wa-carousel-slide" style="background:#2563eb">幻灯一</div></a-carousel-item>
              <a-carousel-item><div class="wa-carousel-slide" style="background:#059669">幻灯二</div></a-carousel-item>
              <a-carousel-item><div class="wa-carousel-slide" style="background:#d97706">幻灯三</div></a-carousel-item>
            </a-carousel>""",
                "snippet": """<a-carousel style="width:320px;height:160px">
  <a-carousel-item><div style="height:160px;background:#2563eb;color:#fff;display:flex;align-items:center;justify-content:center">幻灯一</div></a-carousel-item>
  <a-carousel-item><div style="height:160px;background:#059669;color:#fff;display:flex;align-items:center;justify-content:center">幻灯二</div></a-carousel-item>
  <a-carousel-item><div style="height:160px;background:#d97706;color:#fff;display:flex;align-items:center;justify-content:center">幻灯三</div></a-carousel-item>
</a-carousel>""",
                "scene": "手动切换三张幻灯。",
                "rule": "真 a-carousel",
                "visual": "指示点轮播，固定高度",
            },
            {
                "slug": "carousel-autoplay",
                "subdir": "autoplay",
                "label": "走马灯（自动播放）",
                "css": True,
                "control": f"""            <a-carousel class="wa-carousel" :auto-play="true" :move-speed="500">
              <a-carousel-item><div class="wa-carousel-slide" style="background:#2563eb">自动一</div></a-carousel-item>
              <a-carousel-item><div class="wa-carousel-slide" style="background:#059669">自动二</div></a-carousel-item>
              <a-carousel-item><div class="wa-carousel-slide" style="background:#d97706">自动三</div></a-carousel-item>
            </a-carousel>""",
                "snippet": """<a-carousel :auto-play="true" style="width:320px;height:160px">
  <a-carousel-item><div style="height:160px;background:#2563eb;color:#fff;display:flex;align-items:center;justify-content:center">自动一</div></a-carousel-item>
  <a-carousel-item><div style="height:160px;background:#059669;color:#fff;display:flex;align-items:center;justify-content:center">自动二</div></a-carousel-item>
</a-carousel>""",
                "scene": "自动轮播 Banner。",
                "rule": "真 a-carousel auto-play",
                "visual": "自动播放轮播",
            },
            {
                "slug": "carousel-card",
                "subdir": "card",
                "label": "走马灯（卡片）",
                "css": True,
                "control": f"""            <a-carousel class="wa-carousel" animation-name="card" show-arrow="hover">
              <a-carousel-item><div class="wa-carousel-slide" style="background:#2563eb">卡片一</div></a-carousel-item>
              <a-carousel-item><div class="wa-carousel-slide" style="background:#059669">卡片二</div></a-carousel-item>
              <a-carousel-item><div class="wa-carousel-slide" style="background:#d97706">卡片三</div></a-carousel-item>
            </a-carousel>""",
                "snippet": """<a-carousel animation-name="card" show-arrow="hover" style="width:320px;height:160px">
  <a-carousel-item><div style="height:160px;background:#2563eb;color:#fff;display:flex;align-items:center;justify-content:center">卡片一</div></a-carousel-item>
  <a-carousel-item><div style="height:160px;background:#059669;color:#fff;display:flex;align-items:center;justify-content:center">卡片二</div></a-carousel-item>
</a-carousel>""",
                "scene": "卡片式切换轮播。",
                "rule": "真 a-carousel animation-name=card",
                "visual": "卡片动画轮播",
            },
        ],
    },
    {
        "slug": "image",
        "label": "图片",
        "lead": "图片展示与预览，用于内容插图、相册与点击放大查看。",
        "category": "data-display",
        "types": "default / preview / error",
        "setup": "",
        "members": [
            {
                "slug": "image",
                "subdir": "default",
                "label": "图片",
                "control": f'            <a-image width="200" :src="\'{IMG}\'" alt="示例图" />',
                "snippet": f'<a-image width="200" src="{IMG}" alt="示例图" />',
                "scene": "固定宽度展示图片。",
                "rule": "真 a-image",
                "visual": "圆角图片，宽度 200",
            },
            {
                "slug": "image-preview",
                "subdir": "preview",
                "label": "图片（可预览）",
                "control": f'            <a-image width="200" :src="\'{IMG}\'" alt="可预览" :preview="true" />',
                "snippet": f'<a-image width="200" src="{IMG}" alt="可预览" :preview="true" />',
                "scene": "点击打开预览层。",
                "rule": "真 a-image preview",
                "visual": "可点击放大预览",
            },
            {
                "slug": "image-error",
                "subdir": "error",
                "label": "图片（加载失败）",
                "control": """            <a-image width="200" src="about:blank" alt="失败占位">
              <template #error>
                <div style="width:200px;height:120px;display:flex;align-items:center;justify-content:center;background:var(--color-fill-2);color:var(--color-text-3)">加载失败</div>
              </template>
            </a-image>""",
                "snippet": """<a-image width="200" src="/missing.png" alt="失败占位">
  <template #error>
    <div style="width:200px;height:120px;display:flex;align-items:center;justify-content:center;background:var(--color-fill-2);color:var(--color-text-3)">加载失败</div>
  </template>
</a-image>""",
                "scene": "失败时自定义占位。",
                "rule": "真 a-image error 槽",
                "visual": "错误占位块",
            },
        ],
    },
    {
        "slug": "typography",
        "label": "排版",
        "lead": "标题段落与文本样式，用于内容页层级与可复制文案。",
        "category": "basic",
        "types": "title / paragraph / text",
        "setup": "",
        "members": [
            {
                "slug": "typography",
                "subdir": "title",
                "label": "排版（标题）",
                "control": '            <a-typography-title :heading="4" style="margin:0">产品介绍</a-typography-title>',
                "snippet": '<a-typography-title :heading="4">产品介绍</a-typography-title>',
                "scene": "四级标题排版。",
                "rule": "真 a-typography-title",
                "visual": "标题字号层级",
            },
            {
                "slug": "typography-paragraph",
                "subdir": "paragraph",
                "label": "排版（段落）",
                "control": '            <a-typography-paragraph style="margin:0;max-width:320px">用于介绍产品能力与使用场景的示例段落，可按业务替换文案。</a-typography-paragraph>',
                "snippet": "<a-typography-paragraph>用于介绍产品能力与使用场景的示例段落，可按业务替换文案。</a-typography-paragraph>",
                "scene": "正文段落。",
                "rule": "真 a-typography-paragraph",
                "visual": "段落行高与间距",
            },
            {
                "slug": "typography-text",
                "subdir": "text",
                "label": "排版（文本）",
                "control": """            <a-space>
              <a-typography-text>默认</a-typography-text>
              <a-typography-text type="secondary">次要</a-typography-text>
              <a-typography-text type="success">成功</a-typography-text>
              <a-typography-text copyable>可复制</a-typography-text>
            </a-space>""",
                "snippet": """<a-space>
  <a-typography-text>默认</a-typography-text>
  <a-typography-text type="secondary">次要</a-typography-text>
  <a-typography-text copyable>可复制</a-typography-text>
</a-space>""",
                "scene": "行内文本与复制。",
                "rule": "真 a-typography-text",
                "visual": "语义色与可复制",
            },
        ],
    },
    {
        "slug": "card",
        "label": "卡片",
        "lead": "内容容器卡片，用于信息分组、操作区与可悬浮块。",
        "category": "data-display",
        "types": "default / bordered / hoverable / actions",
        "setup": "",
        "members": [
            {
                "slug": "card",
                "subdir": "default",
                "label": "卡片",
                "control": """            <a-card title="卡片标题" style="width:280px">
              <p style="margin:0;color:var(--color-text-2)">这里是卡片主体内容说明。</p>
            </a-card>""",
                "snippet": """<a-card title="卡片标题" style="width:280px">
  <p style="margin:0">这里是卡片主体内容说明。</p>
</a-card>""",
                "scene": "带标题的内容卡。",
                "rule": "真 a-card（非营销 wa-card 壳）",
                "visual": "标题栏 + 内容区",
            },
            {
                "slug": "card-bordered",
                "subdir": "bordered",
                "label": "卡片（无边框）",
                "control": """            <a-card title="无边框" :bordered="false" style="width:280px;background:var(--color-fill-1)">
              <p style="margin:0;color:var(--color-text-2)">浅底无描边卡片。</p>
            </a-card>""",
                "snippet": """<a-card title="无边框" :bordered="false" style="width:280px">
  <p style="margin:0">浅底无描边卡片。</p>
</a-card>""",
                "scene": "无边框浅底卡片。",
                "rule": "真 a-card bordered=false",
                "visual": "无描边卡片",
            },
            {
                "slug": "card-hoverable",
                "subdir": "hoverable",
                "label": "卡片（可悬浮）",
                "control": """            <a-card title="可悬浮" hoverable style="width:280px">
              <p style="margin:0;color:var(--color-text-2)">悬停时抬升阴影。</p>
            </a-card>""",
                "snippet": """<a-card title="可悬浮" hoverable style="width:280px">
  <p style="margin:0">悬停时抬升阴影。</p>
</a-card>""",
                "scene": "可点击感悬浮卡。",
                "rule": "真 a-card hoverable",
                "visual": "悬停抬升",
            },
            {
                "slug": "card-actions",
                "subdir": "actions",
                "label": "卡片（操作）",
                "control": """            <a-card title="带操作" style="width:280px">
              <p style="margin:0 0 12px;color:var(--color-text-2)">卡片说明文案。</p>
              <template #actions>
                <a-button type="text" size="small">详情</a-button>
                <a-button type="text" size="small">编辑</a-button>
              </template>
            </a-card>""",
                "snippet": """<a-card title="带操作" style="width:280px">
  <p style="margin:0 0 12px">卡片说明文案。</p>
  <template #actions>
    <a-button type="text" size="small">详情</a-button>
    <a-button type="text" size="small">编辑</a-button>
  </template>
</a-card>""",
                "scene": "底栏操作按钮。",
                "rule": "真 a-card actions 槽",
                "visual": "底栏操作区",
            },
        ],
    },
    {
        "slug": "anchor",
        "label": "锚点",
        "lead": "页面章节锚点导航，适合长文落地页与帮助文档目录。",
        "category": "navigation",
        "types": "default / line",
        "setup": "",
        "members": [
            {
                "slug": "anchor",
                "subdir": "default",
                "label": "锚点",
                "control": """            <div style="display:flex;gap:24px;max-width:480px">
              <a-anchor :change-hash="false" style="width:120px;flex-shrink:0" :style="{ maxHeight: '160px' }">
                <a-anchor-link href="#wa-a1" title="概述" />
                <a-anchor-link href="#wa-a2" title="功能" />
                <a-anchor-link href="#wa-a3" title="定价" />
              </a-anchor>
              <div style="flex:1;height:160px;overflow:auto;border:1px solid var(--color-border-2);border-radius:4px;padding:12px">
                <h4 id="wa-a1" style="margin:0 0 8px">概述</h4>
                <p style="margin:0 0 24px;color:var(--color-text-3)">概述内容…</p>
                <h4 id="wa-a2" style="margin:0 0 8px">功能</h4>
                <p style="margin:0 0 24px;color:var(--color-text-3)">功能内容…</p>
                <h4 id="wa-a3" style="margin:0 0 8px">定价</h4>
                <p style="margin:0;color:var(--color-text-3)">定价内容…</p>
              </div>
            </div>""",
                "snippet": """<a-anchor :change-hash="false">
  <a-anchor-link href="#section-1" title="概述" />
  <a-anchor-link href="#section-2" title="功能" />
  <a-anchor-link href="#section-3" title="定价" />
</a-anchor>""",
                "scene": "侧栏锚点联动滚动。",
                "rule": "真 a-anchor",
                "visual": "目录锚点列表",
            },
            {
                "slug": "anchor-line",
                "subdir": "line",
                "label": "锚点（线条）",
                "control": """            <a-anchor line-less :change-hash="false" style="width:140px">
              <a-anchor-link href="#wa-b1" title="快速开始" />
              <a-anchor-link href="#wa-b2" title="进阶用法" />
            </a-anchor>""",
                "snippet": """<a-anchor line-less :change-hash="false">
  <a-anchor-link href="#quickstart" title="快速开始" />
  <a-anchor-link href="#advanced" title="进阶用法" />
</a-anchor>""",
                "scene": "无线条精简锚点。",
                "rule": "真 a-anchor line-less",
                "visual": "无左侧指示线",
            },
        ],
    },
    {
        "slug": "back-top",
        "label": "回到顶部",
        "lead": "长页滚动后一键回顶，减轻长落地页与列表浏览负担。",
        "category": "navigation",
        "types": "default",
        "setup": "",
        "members": [
            {
                "slug": "back-top",
                "subdir": "default",
                "label": "回到顶部",
                "control": """            <div id="wa-backtop-box" style="position:relative;height:140px;overflow:auto;border:1px solid var(--color-border-2);border-radius:4px;padding:12px;width:280px">
              <p v-for="n in 20" :key="n" style="margin:0 0 8px;color:var(--color-text-3)">滚动内容行 {{ n }}</p>
              <a-back-top target-container="#wa-backtop-box" :visible-height="40" :style="{ position: 'absolute', right: '12px', bottom: '12px' }" />
            </div>""",
                "snippet": """<div id="scroll-box" style="height:240px;overflow:auto;position:relative">
  <!-- 长内容 -->
  <a-back-top target-container="#scroll-box" :visible-height="80" />
</div>""",
                "scene": "容器内滚动后显示回顶。",
                "rule": "真 a-back-top",
                "visual": "右下角回顶按钮",
                "embed_setup": "        /* no state */",
            },
        ],
    },
    {
        "slug": "list",
        "label": "列表",
        "lead": "结构化条目列表，用于动态流、通知与带操作的条目组。",
        "category": "data-display",
        "types": "default / meta / action",
        "setup": """          listItems: [
            { title: '系统升级通知', desc: '将于本周六 02:00 进行维护' },
            { title: '新功能上线', desc: '工作台支持自定义布局' },
            { title: '安全提醒', desc: '请定期更新登录密码' },
          ],""",
        "members": [
            {
                "slug": "list",
                "subdir": "default",
                "label": "列表",
                "control": """            <a-list :bordered="true" style="width:300px">
              <a-list-item>条目一</a-list-item>
              <a-list-item>条目二</a-list-item>
              <a-list-item>条目三</a-list-item>
            </a-list>""",
                "snippet": """<a-list :bordered="true">
  <a-list-item>条目一</a-list-item>
  <a-list-item>条目二</a-list-item>
  <a-list-item>条目三</a-list-item>
</a-list>""",
                "scene": "基础边框列表。",
                "rule": "真 a-list",
                "visual": "边框条目列表",
            },
            {
                "slug": "list-meta",
                "subdir": "meta",
                "label": "列表（元信息）",
                "control": """            <a-list :bordered="false" style="width:320px">
              <a-list-item v-for="(item, i) in listItems" :key="i">
                <a-list-item-meta :title="item.title" :description="item.desc" />
              </a-list-item>
            </a-list>""",
                "snippet": """<a-list :bordered="false">
  <a-list-item>
    <a-list-item-meta title="系统升级通知" description="将于本周六 02:00 进行维护" />
  </a-list-item>
</a-list>""",
                "scene": "标题+描述元信息。",
                "rule": "真 a-list-item-meta",
                "visual": "元信息列表行",
                "embed_setup": """        listItems: [
          { title: '系统升级通知', desc: '将于本周六 02:00 进行维护' },
          { title: '新功能上线', desc: '工作台支持自定义布局' },
          { title: '安全提醒', desc: '请定期更新登录密码' },
        ],""",
            },
            {
                "slug": "list-action",
                "subdir": "action",
                "label": "列表（操作）",
                "control": """            <a-list :bordered="false" style="width:320px">
              <a-list-item v-for="(item, i) in listItems" :key="i">
                <a-list-item-meta :title="item.title" :description="item.desc" />
                <template #actions>
                  <a-button type="text" size="small">查看</a-button>
                </template>
              </a-list-item>
            </a-list>""",
                "snippet": """<a-list :bordered="false">
  <a-list-item>
    <a-list-item-meta title="系统升级通知" description="将于本周六 02:00 进行维护" />
    <template #actions>
      <a-button type="text" size="small">查看</a-button>
    </template>
  </a-list-item>
</a-list>""",
                "scene": "右侧带操作的列表。",
                "rule": "真 a-list actions 槽",
                "visual": "条目 + 操作按钮",
                "embed_setup": """        listItems: [
          { title: '系统升级通知', desc: '将于本周六 02:00 进行维护' },
          { title: '新功能上线', desc: '工作台支持自定义布局' },
        ],""",
            },
        ],
    },
    # —— P1 ——
    {
        "slug": "tree",
        "label": "树形控件",
        "lead": "层级数据选择与浏览，用于组织架构、目录与权限节点。",
        "category": "data-display",
        "types": "default / checkable",
        "setup": f"""          treeData: {TREE_DATA_JS},
          selectedKeys: api.ref(['0-0-0']),
          expandedKeys: api.ref(['0', '0-0', '0-1', '1']),
          checkedKeys: api.ref(['0-0-0', '0-0-1']),
          checkExpandedKeys: api.ref(['0', '0-0', '0-1', '1']),""",
        "members": [
            {
                "slug": "tree",
                "subdir": "default",
                "label": "树形控件",
                "control": """            <a-tree
              block-node
              :data="treeData"
              v-model:selected-keys="selectedKeys"
              v-model:expanded-keys="expandedKeys"
              style="width:240px"
            />""",
                "snippet": """<a-tree
  block-node
  :data="treeData"
  v-model:selected-keys="selectedKeys"
  v-model:expanded-keys="expandedKeys"
/>""",
                "scene": "单击选中树节点。",
                "rule": "真 a-tree",
                "visual": "可展开树",
                "embed_setup": f"""        treeData: {TREE_DATA_JS},
        selectedKeys: ref(['0-0-0']),
        expandedKeys: ref(['0', '0-0', '0-1', '1']),""",
            },
            {
                "slug": "tree-checkable",
                "subdir": "checkable",
                "label": "树形控件（复选）",
                "control": """            <a-tree
              block-node
              checkable
              :data="treeData"
              v-model:checked-keys="checkedKeys"
              v-model:expanded-keys="checkExpandedKeys"
              style="width:240px"
            />""",
                "snippet": """<a-tree
  block-node
  checkable
  :data="treeData"
  v-model:checked-keys="checkedKeys"
  v-model:expanded-keys="expandedKeys"
/>""",
                "scene": "勾选多个部门节点。",
                "rule": "真 a-tree checkable",
                "visual": "带复选框的树",
                "embed_setup": f"""        treeData: {TREE_DATA_JS},
        checkedKeys: ref(['0-0-0', '0-0-1']),
        checkExpandedKeys: ref(['0', '0-0', '0-1', '1']),""",
            },
        ],
    },
    {
        "slug": "calendar",
        "label": "日历",
        "lead": "月视图日期浏览，用于活动排期、日程概览与选日辅助。",
        "category": "data-display",
        "types": "default / cell / header / select",
        "setup": "          valueDefault: api.ref(new Date()),\n          valueCell: api.ref(new Date()),\n          valueHeader: api.ref(new Date()),\n          valueSelect: api.ref(new Date()),",
        "members": [
            {
                "slug": "calendar",
                "subdir": "default",
                "label": "日历",
                "control": '            <a-calendar v-model="valueDefault" :modes="[\'month\']" />',
                "snippet": "<a-calendar v-model=\"value\" :modes=\"['month']\" />",
                "scene": "完整月历面板，展示与选择日期。",
                "rule": "真 a-calendar；固定月视图",
                "visual": "月历全视图",
                "embed_setup": "        value: ref(new Date()),",
            },
            {
                "slug": "calendar-cell",
                "subdir": "cell",
                "label": "自定义单元格",
                "control": '            <a-calendar v-model="valueCell" :modes="[\'month\']" />',
                "snippet": '<a-calendar v-model="value" :modes="[\'month\']">…#default…</a-calendar>',
                "scene": "在日期格内展示短标签或日程摘要。",
                "rule": "真 a-calendar；#default 自定义格",
                "visual": "日期数字 + 短标签",
                "embed_setup": "        value: ref(new Date()),",
            },
            {
                "slug": "calendar-header",
                "subdir": "header",
                "label": "自定义头部",
                "control": '            <a-calendar v-model="valueHeader" :modes="[\'month\']" />',
                "snippet": '<div class="wa-cal-wrap">…nav segment…</div>',
                "scene": "外置分段翻月与今天。",
                "rule": "真 a-calendar；分段工具条",
                "visual": "顶栏分段 + 月历",
                "embed_setup": "        value: ref(new Date()),",
            },
            {
                "slug": "calendar-select",
                "subdir": "select",
                "label": "下拉选择",
                "control": '            <a-calendar v-model="valueSelect" :modes="[\'month\']" />',
                "snippet": '<div class="wa-cal-wrap">…year/month a-select…</div>',
                "scene": "年、月下拉跳转面板。",
                "rule": "真 a-calendar + a-select",
                "visual": "年月下拉 + 月历",
                "embed_setup": "        value: ref(new Date()),",
            },
        ],
    },
    {
        "slug": "table",
        "label": "表格",
        "lead": "行列数据展示，用于精简列表、斑马纹与行选择场景。",
        "category": "data-display",
        "types": "default / stripe / selection",
        "setup": f"""          columns: {TABLE_COLS},
          data: {TABLE_DATA},
          selectedKeys: api.ref([]),
          onSelectionChange(keys) {{ selectedKeys.value = keys }},""",
        "setup_note": "mixed",
        "members": [
            {
                "slug": "table",
                "subdir": "default",
                "label": "表格",
                "control": """            <a-table
              :columns="columns"
              :data="data"
              row-key="key"
              :pagination="false"
              :bordered="false"
              style="width:100%;max-width:480px"
            >
              <template #status="{ record }">
                <a-tag size="small">{{ record.status }}</a-tag>
              </template>
            </a-table>""",
                "snippet": """<a-table
  :columns="columns"
  :data="data"
  row-key="key"
  :pagination="false"
>
  <template #status="{ record }">
    <a-tag size="small">{{ record.status }}</a-tag>
  </template>
</a-table>""",
                "scene": "基础三列表格。",
                "rule": "真 a-table",
                "visual": "无边框基础表",
                "embed_setup": f"""        columns: {TABLE_COLS},
        data: {TABLE_DATA},""",
            },
            {
                "slug": "table-stripe",
                "subdir": "stripe",
                "label": "表格（斑马纹）",
                "control": """            <a-table
              :columns="columns"
              :data="data"
              row-key="key"
              :pagination="false"
              :bordered="false"
              stripe
              size="small"
              style="width:100%;max-width:480px"
            >
              <template #status="{ record }">
                <a-tag size="small">{{ record.status }}</a-tag>
              </template>
            </a-table>""",
                "snippet": """<a-table
  :columns="columns"
  :data="data"
  row-key="key"
  :pagination="false"
  stripe
  size="small"
/>""",
                "scene": "斑马纹紧凑表。",
                "rule": "真 a-table stripe",
                "visual": "斑马纹小尺寸",
                "embed_setup": f"""        columns: {TABLE_COLS},
        data: {TABLE_DATA},""",
            },
            {
                "slug": "table-selection",
                "subdir": "selection",
                "label": "表格（行选择）",
                "control": """            <a-table
              :columns="columns"
              :data="data"
              row-key="key"
              :pagination="false"
              :bordered="false"
              :row-selection="{ type: 'checkbox', showCheckedAll: true }"
              :selected-keys="selectedKeys"
              @selection-change="onSelectionChange"
              style="width:100%;max-width:480px"
            >
              <template #status="{ record }">
                <a-tag size="small">{{ record.status }}</a-tag>
              </template>
            </a-table>""",
                "snippet": """<a-table
  :columns="columns"
  :data="data"
  row-key="key"
  :pagination="false"
  :row-selection="{ type: 'checkbox', showCheckedAll: true }"
  v-model:selectedKeys="selectedKeys"
/>""",
                "scene": "多选行表格。",
                "rule": "真 a-table row-selection",
                "visual": "左侧复选列表",
                "embed_setup": f"""        columns: {TABLE_COLS},
        data: {TABLE_DATA},
        selectedKeys: ref([]),
        onSelectionChange(keys) {{ selectedKeys.value = keys }},""",
            },
        ],
    },
    {
        "slug": "transfer",
        "label": "穿梭框",
        "lead": "左右栏批量挑选，用于权限分配、字段配置与名单迁移。",
        "category": "form",
        "types": "default",
        "setup": f"""          transferData: {TRANSFER_DATA},
          transferValue: api.ref(['2', '4']),
          transferTitles: ['待选', '已选'],""",
        "members": [
            {
                "slug": "transfer",
                "subdir": "default",
                "label": "穿梭框",
                "control": """            <a-transfer
              :data="transferData"
              v-model="transferValue"
              :title="transferTitles"
            />""",
                "snippet": """<a-transfer
  :data="transferData"
  v-model="transferValue"
  :title="['待选', '已选']"
/>""",
                "scene": "左右穿梭挑选。",
                "rule": "真 a-transfer",
                "visual": "双栏穿梭",
                "embed_setup": f"""        transferData: {TRANSFER_DATA},
        transferValue: ref(['2', '4']),
        transferTitles: ['待选', '已选'],""",
            },
        ],
    },
    {
        "slug": "comment",
        "label": "评论",
        "lead": "用户评论与回复展示，用于讨论区、动态与反馈列表。",
        "category": "data-display",
        "types": "default / nest",
        "setup": "",
        "members": [
            {
                "slug": "comment",
                "subdir": "default",
                "label": "评论",
                "control": """            <a-comment author="李明" datetime="刚刚" style="max-width:360px">
              <template #avatar>
                <a-avatar :style="{ backgroundColor: 'rgb(var(--primary-6))' }">李</a-avatar>
              </template>
              <template #content>
                <div>这个方案看起来不错，建议补充验收标准。</div>
              </template>
              <template #actions>
                <a-button type="text" size="mini">回复</a-button>
              </template>
            </a-comment>""",
                "snippet": """<a-comment author="李明" datetime="刚刚">
  <template #avatar>
    <a-avatar>李</a-avatar>
  </template>
  <template #content>
    <div>这个方案看起来不错，建议补充验收标准。</div>
  </template>
  <template #actions>
    <a-button type="text" size="mini">回复</a-button>
  </template>
</a-comment>""",
                "scene": "单条评论展示。",
                "rule": "真 a-comment",
                "visual": "头像 + 作者 + 内容",
            },
            {
                "slug": "comment-nest",
                "subdir": "nest",
                "label": "评论（嵌套）",
                "control": """            <a-comment author="李明" datetime="1 小时前" style="max-width:360px">
              <template #avatar>
                <a-avatar :style="{ backgroundColor: 'rgb(var(--primary-6))' }">李</a-avatar>
              </template>
              <template #content>
                <div>先抛一个问题，大家一起看。</div>
              </template>
              <a-comment author="王芳" datetime="刚刚">
                <template #avatar>
                  <a-avatar :style="{ backgroundColor: 'rgb(var(--success-6))' }">王</a-avatar>
                </template>
                <template #content>
                  <div>同意，我补充一下数据口径。</div>
                </template>
              </a-comment>
            </a-comment>""",
                "snippet": """<a-comment author="李明" datetime="1 小时前">
  <template #avatar><a-avatar>李</a-avatar></template>
  <template #content><div>先抛一个问题，大家一起看。</div></template>
  <a-comment author="王芳" datetime="刚刚">
    <template #avatar><a-avatar>王</a-avatar></template>
    <template #content><div>同意，我补充一下数据口径。</div></template>
  </a-comment>
</a-comment>""",
                "scene": "嵌套回复评论。",
                "rule": "真 a-comment 嵌套",
                "visual": "缩进子评论",
            },
        ],
    },
    {
        "slug": "page-header",
        "label": "页头",
        "lead": "内页顶部标题区，含返回、标题副标题与右侧操作。",
        "category": "navigation",
        "types": "default / subtitle",
        "setup": "",
        "members": [
            {
                "slug": "page-header",
                "subdir": "default",
                "label": "页头",
                "control": """            <a-page-header
              style="width:100%;max-width:480px;background:var(--color-bg-2);border:1px solid var(--color-border-2);border-radius:4px"
              title="项目详情"
              subtitle="演示项目 A"
              :show-back="true"
            >
              <template #extra>
                <a-space>
                  <a-button size="small">编辑</a-button>
                  <a-button type="primary" size="small">发布</a-button>
                </a-space>
              </template>
            </a-page-header>""",
                "snippet": """<a-page-header title="项目详情" subtitle="演示项目 A" :show-back="true">
  <template #extra>
    <a-space>
      <a-button size="small">编辑</a-button>
      <a-button type="primary" size="small">发布</a-button>
    </a-space>
  </template>
</a-page-header>""",
                "scene": "带返回与操作的页头。",
                "rule": "真 a-page-header",
                "visual": "返回 + 标题 + 操作",
            },
            {
                "slug": "page-header-subtitle",
                "subdir": "subtitle",
                "label": "页头（仅标题）",
                "control": """            <a-page-header
              style="width:100%;max-width:400px;background:var(--color-bg-2);border:1px solid var(--color-border-2);border-radius:4px"
              title="设置"
              :show-back="false"
            />""",
                "snippet": '<a-page-header title="设置" :show-back="false" />',
                "scene": "无返回的简洁页头。",
                "rule": "真 a-page-header",
                "visual": "仅标题页头",
            },
        ],
    },
    {
        "slug": "affix",
        "label": "固钉",
        "lead": "滚动时固定操作条或导航，保持关键操作始终可见。",
        "category": "navigation",
        "types": "default",
        "setup": "",
        "members": [
            {
                "slug": "affix",
                "subdir": "default",
                "label": "固钉",
                "control": """            <div id="wa-affix-box" style="height:140px;overflow:auto;border:1px solid var(--color-border-2);border-radius:4px;width:280px">
              <a-affix :offset-top="0" target-container="#wa-affix-box">
                <div style="padding:8px 12px;background:var(--color-bg-2);border-bottom:1px solid var(--color-border-2)">
                  <a-button type="primary" size="small">固定操作</a-button>
                </div>
              </a-affix>
              <div style="padding:12px">
                <p v-for="n in 16" :key="n" style="margin:0 0 8px;color:var(--color-text-3)">内容行 {{ n }}</p>
              </div>
            </div>""",
                "snippet": """<div id="affix-box" style="height:240px;overflow:auto">
  <a-affix :offset-top="0" target-container="#affix-box">
    <a-button type="primary">固定操作</a-button>
  </a-affix>
  <!-- 长内容 -->
</div>""",
                "scene": "容器滚动时顶栏固定。",
                "rule": "真 a-affix",
                "visual": "吸顶操作条",
            },
        ],
    },
    {
        "slug": "watermark",
        "label": "水印",
        "lead": "内容区加水印，用于演示脱敏、版权提示与防截图标识。",
        "category": "data-display",
        "types": "default / image",
        "setup": "",
        "members": [
            {
                "slug": "watermark",
                "subdir": "default",
                "label": "水印",
                "control": """            <a-watermark content="VibePM 演示" :font="{ color: 'rgba(0,0,0,0.12)' }">
              <div style="width:280px;height:140px;padding:16px;border:1px solid var(--color-border-2);border-radius:4px">
                <p style="margin:0;color:var(--color-text-2)">受保护的内容区域，滚动或截图仍可见水印。</p>
              </div>
            </a-watermark>""",
                "snippet": """<a-watermark content="VibePM 演示">
  <div style="padding:24px">受保护的内容区域</div>
</a-watermark>""",
                "scene": "文字水印覆盖内容。",
                "rule": "真 a-watermark",
                "visual": "斜向文字水印",
            },
            {
                "slug": "watermark-multi",
                "subdir": "multi",
                "label": "水印（多行）",
                "control": """            <a-watermark :content="['VibePM', '仅供演示']" :gap="[80, 80]">
              <div style="width:280px;height:140px;padding:16px;border:1px solid var(--color-border-2);border-radius:4px">
                <p style="margin:0;color:var(--color-text-2)">多行水印示例内容。</p>
              </div>
            </a-watermark>""",
                "snippet": """<a-watermark :content="['VibePM', '仅供演示']">
  <div style="padding:24px">多行水印示例内容</div>
</a-watermark>""",
                "scene": "双行文字水印。",
                "rule": "真 a-watermark 数组 content",
                "visual": "多行水印",
            },
        ],
    },
    {
        "slug": "overflow-list",
        "label": "折叠列表",
        "lead": "空间不足时折叠多余项，用于标签组、头像组与筛选条。",
        "category": "data-display",
        "types": "default",
        "setup": """          tags: ['产品', '设计', '研发', '运营', '市场', '销售', '客服'],""",
        "members": [
            {
                "slug": "overflow-list",
                "subdir": "default",
                "label": "折叠列表",
                "control": """            <a-overflow-list style="width:240px">
              <a-tag v-for="t in tags" :key="t">{{ t }}</a-tag>
            </a-overflow-list>""",
                "snippet": """<a-overflow-list style="width:240px">
  <a-tag>产品</a-tag>
  <a-tag>设计</a-tag>
  <a-tag>研发</a-tag>
  <a-tag>运营</a-tag>
  <a-tag>市场</a-tag>
</a-overflow-list>""",
                "scene": "窄宽度折叠多余标签。",
                "rule": "真 a-overflow-list",
                "visual": "可见项 + 折叠入口",
                "embed_setup": "        tags: ['产品', '设计', '研发', '运营', '市场', '销售', '客服'],",
            },
        ],
    },
]


def embed_js(member: dict) -> str:
    setup = member.get("embed_setup")
    if setup is None:
        return """;(function () {
  WebArco.mount('#app', {})
})()
"""
    if setup.strip() in ("", "/* no state */"):
        return """;(function () {
  WebArco.mount('#app', {})
})()
"""
    # If setup contains function definitions like onSelectionChange, still OK in return
    return f""";(function () {{
  const {{ ref }} = Vue
  WebArco.mount('#app', {{
    setup() {{
      const selectedKeys = ref([])
      return {{
{setup}
      }}
    }},
  }})
}})()
"""


def fix_table_embed_js(member: dict) -> str:
    """Table selection embed needs selectedKeys defined before onSelectionChange."""
    setup = member.get("embed_setup") or ""
    if "onSelectionChange" in setup:
        return f""";(function () {{
  const {{ ref }} = Vue
  WebArco.mount('#app', {{
    setup() {{
      const selectedKeys = ref([])
      function onSelectionChange(keys) {{
        selectedKeys.value = keys
      }}
      return {{
        columns: {TABLE_COLS},
        data: {TABLE_DATA},
        selectedKeys,
        onSelectionChange,
      }}
    }},
  }})
}})()
"""
    if "columns:" in setup:
        return f""";(function () {{
  const {{ ref }} = Vue
  WebArco.mount('#app', {{
    setup() {{
      return {{
        columns: {TABLE_COLS},
        data: {TABLE_DATA},
      }}
    }},
  }})
}})()
"""
    return embed_js(member)


def family_index(fam: dict) -> str:
    cards = []
    for m in fam["members"]:
        cards.append(
            card_html(m["slug"], m["label"], m["control"], stage=bool(m.get("stage")))
        )
    cards_html = "\n".join(cards)
    extra = fam.get("extra_css_family") or ""
    member_slugs = ", ".join(f"'{m['slug']}'" for m in fam["members"])
    setup_body = fam.get("setup") or ""

    if fam.get("setup_note") == "mixed":
        wa_setup = (
            "      setup: function (api) {\n"
            "        const selectedKeys = api.ref([])\n"
            "        return {\n"
            f"          columns: {TABLE_COLS},\n"
            f"          data: {TABLE_DATA},\n"
            "          selectedKeys,\n"
            "          onSelectionChange(keys) { selectedKeys.value = keys },\n"
            "        }\n"
            "      },"
        )
    elif setup_body.strip():
        wa_setup = (
            "      setup: function (api) {\n"
            "        return {\n"
            + setup_body
            + "\n"
            "        }\n"
            "      },"
        )
    else:
        wa_setup = ""

    return (
        "<!DOCTYPE html>\n"
        '<html lang="zh-CN">\n'
        "<head>\n"
        '  <meta charset="UTF-8" />\n'
        '  <script src="../../assets/common/js/theme.js"></script>\n'
        '  <meta name="viewport" content="width=device-width, initial-scale=1" />\n'
        f"  <title>{fam['label']} · 家族对照</title>\n"
        '  <link rel="stylesheet" href="../../vendor/arco/css/arco.css" />\n'
        '  <link rel="stylesheet" href="../../assets/common/css/chrome.css" />\n'
        '  <link rel="stylesheet" href="../../assets/common/css/global.css" />\n'
        '  <link rel="stylesheet" href="../../vendor/fontawesome/css/all.min.css" />\n'
        '  <link rel="stylesheet" href="../../assets/common/css/fa-icons.css" />\n'
        '  <link rel="stylesheet" href="../../assets/common/css/components.css" />\n'
        '  <link rel="stylesheet" href="../index.css" />\n'
        f"{extra}"
        "</head>\n"
        "<body>\n"
        '  <div id="app" v-cloak>\n'
        f'    <section class="wa-fam-section wa-fam-fade-in" data-family="{fam["slug"]}">\n'
        '      <div class="wa-fam-section__inner">\n'
        '        <header class="wa-fam-head">\n'
        f'          <p class="wa-fam-kicker">{fam["slug"]}</p>\n'
        f'          <h1 class="wa-fam-title">{fam["label"]}</h1>\n'
        f'          <p class="wa-fam-lead">{fam["lead"]}</p>\n'
        f'          <p class="wa-fam-lead">组件类型：{fam["types"]}</p>\n'
        "        </header>\n"
        "\n"
        '        <div class="wa-fam-grid">\n'
        + cards_html
        + "\n"
        "        </div>\n"
        "      </div>\n"
        "    </section>\n"
        "  </div>\n"
        '  <script src="../../vendor/vue/vue.global.prod.js"></script>\n'
        '  <script src="../../vendor/arco/arco-vue.min.js"></script>\n'
        '  <script src="../../assets/common/js/fa-icons.js"></script>\n'
        '  <script src="../../assets/common/js/boot.js"></script>\n'
        '  <script src="../../assets/common/js/wa-prefs.js"></script>\n'
        '  <script src="../../assets/common/js/wa-prefs.js"></script>\n'
        '  <script src="./prompts.inline.js"></script>\n'
        "  <script>\n"
        "    window.WA_FAMILY = {\n"
        f"      id: '{fam['slug']}',\n"
        f"      members: [{member_slugs}],\n"
        f"{wa_setup}\n"
        "    }\n"
        "  </script>\n"
        '  <script src="../copy-prompt.js"></script>\n'
        '  <script src="../family.js"></script>\n'
        "</body>\n"
        "</html>\n"
    )


def catalog_entries(fam: dict) -> tuple[list[dict], dict]:
    comps = []
    for m in fam["members"]:
        comps.append(
            {
                "slug": m["slug"],
                "label": m["label"],
                "surface": "general",
                "status": "preview",
                "tier": "free",
                "path": f"components/{fam['slug']}/{m['subdir']}",
                "usedByBlocks": [],
                "notes": f"家族 {fam['slug']} / {m['subdir']}",
                "category": fam["category"],
                "tags": [],
                "family": fam["slug"],
            }
        )
    family_meta = {
        "slug": fam["slug"],
        "label": fam["label"],
        "path": f"components/{fam['slug']}",
        "surface": "general",
        "status": "preview",
        "tier": "free",
        "members": [m["slug"] for m in fam["members"]],
        "notes": f"根目录家族页；成员在 {'/'.join(m['subdir'] for m in fam['members'])}",
    }
    return comps, family_meta


def generate_family(fam: dict) -> None:
    fam_dir = COMPONENTS / fam["slug"]
    members_meta = [(m["slug"], m["subdir"], m["label"]) for m in fam["members"]]

    for m in fam["members"]:
        sub = fam_dir / m["subdir"]
        extra_css = ""
        if m.get("css") or fam.get("member_css"):
            extra_css = '  <link rel="stylesheet" href="./component.css" />\n'
            write(sub / "component.css", fam.get("member_css") or "/* member */\n")
        write(
            sub / "index.html",
            member_html(m["label"], m["slug"], m["control"], extra_css),
        )
        if fam["slug"] == "table":
            write(sub / "component.js", fix_table_embed_js(m))
        else:
            write(sub / "component.js", embed_js(m))
        write(
            sub / "prompt.md",
            PROMPT_TMPL.format(
                label=m["label"],
                slug=m["slug"],
                category=fam["category"],
                scene=m["scene"],
                rule=m["rule"],
                visual=m["visual"],
                snippet=m["snippet"],
                family=fam["slug"],
                subdir=m["subdir"],
                siblings=sibling_table(fam["slug"], members_meta, m["slug"]),
            ),
        )

    write(fam_dir / "index.html", family_index(fam))
    write(fam_dir / "prompts.inline.js", "window.WA_FAMILY_PROMPTS = {};\n")


def update_catalog(new_comps: list[dict], new_families: list[dict]) -> None:
    data = load_catalog()
    existing_fams = {f["slug"] for f in data.get("families") or []}

    added_c = 0
    for c in new_comps:
        data["components"] = [x for x in data["components"] if x.get("slug") != c["slug"]]
        data["components"].append(c)
        added_c += 1

    for f in new_families:
        if f["slug"] in existing_fams:
            data["families"] = [x for x in data["families"] if x["slug"] != f["slug"]]
        data["families"].append(f)

    ver = data.get("version") or "0.8.1"
    parts = ver.split(".")
    if len(parts) == 3 and parts[2].isdigit():
        parts[2] = str(int(parts[2]) + 1)
        data["version"] = ".".join(parts)

    save_catalog(data)
    print(f"catalog: +{added_c} components, +{len(new_families)} families, version={data['version']}")


def main() -> None:
    all_comps: list[dict] = []
    all_fams: list[dict] = []
    for fam in FAMILIES:
        generate_family(fam)
        comps, fmeta = catalog_entries(fam)
        all_comps.extend(comps)
        all_fams.append(fmeta)
        print(f"generated {fam['slug']} ({len(fam['members'])} members)")
    update_catalog(all_comps, all_fams)
    print("done")


if __name__ == "__main__":
    main()
