#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate WEB chart component families from Admin chart dictionary."""
from __future__ import annotations

from catalog_io import load_catalog, save_catalog

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
COMP = ROOT / "components"
CATALOG = ROOT / "_meta" / "config.json"

FAMILIES = [
    {
        "id": "chart-bar",
        "label": "柱状图",
        "lead": "纵向柱对比分类数值，适合周报量、渠道贡献与构成拆解。",
        "members": [
            ("default", "基础柱状图", "单一指标按分类对比"),
            ("grouped", "分组柱状图", "多系列同屏分组横向对比"),
            ("stacked", "堆积柱状图", "总量与各部分构成一并展示"),
        ],
    },
    {
        "id": "chart-horizontal-bar",
        "label": "条形图",
        "lead": "横向条形展示排名与对照，长类别名称更易阅读。",
        "members": [
            ("default", "基础条形图", "横向展示排名"),
            ("compare", "对比条形图", "本期与上期并排对照"),
        ],
    },
    {
        "id": "chart-area",
        "label": "面积图",
        "lead": "用面积强调累计与趋势起伏，适合流量与内容量走势。",
        "members": [
            ("sharp", "锋利面积图", "直角折线勾勒趋势"),
            ("sharp-compare", "锋利对比面积图", "棱角双系列同屏对照"),
            ("smooth", "圆滑面积图", "平滑曲线弱化毛刺"),
            ("smooth-compare", "圆滑对比面积图", "平滑面积对照两路趋势"),
        ],
    },
    {
        "id": "chart-line",
        "label": "折线图",
        "lead": "折线对照多指标走势，便于找拐点与周期差异。",
        "members": [
            ("sharp", "锋利对比折线图", "棱角折线找拐点"),
            ("smooth", "圆滑对比折线图", "平滑折线讲趋势"),
        ],
    },
    {
        "id": "chart-combo",
        "label": "柱线组合图",
        "lead": "柱状看量额，折线同步看达成率，适合经营周报。",
        "members": [("default", "柱线组合图", "柱看量、线看率")],
    },
    {
        "id": "chart-funnel",
        "label": "漏斗图",
        "lead": "按阶段拆解转化漏斗，定位流失环节。",
        "members": [("default", "基础漏斗图", "阶段转化与流失")],
        "extra_css": ["chart-funnel.css"],
        "kind": "funnel",
    },
    {
        "id": "chart-donut",
        "label": "圆环图",
        "lead": "环形展示分类占比，适合渠道结构与份额扫读。",
        "members": [
            ("basic", "基础圆环图", "右侧图例同步读数与份额"),
            ("compact", "精简圆环图", "中心汇总、底部图例更省空间"),
        ],
        "kind": "donut",
    },
    {
        "id": "chart-radar",
        "label": "雷达图",
        "lead": "多维能力或指标雷达对比，适合评估与对照。",
        "members": [
            ("dots", "基础雷达图", "打点评估多维强弱"),
            ("circle", "圆形雷达图", "面状填充覆盖范围"),
            ("compare", "对比雷达图", "双系列多维对照"),
        ],
    },
    {
        "id": "chart-rose",
        "label": "玫瑰图",
        "lead": "极坐标扇区对比多分类数值，适合品类与区域分布。",
        "members": [
            ("nightingale", "南丁格尔玫瑰图", "等角扇区半径映射数值"),
            ("semi", "半圆玫瑰图", "180° 极坐标横向对比"),
        ],
        "kind": "rose",
    },
    {
        "id": "chart-radial",
        "label": "径向图",
        "lead": "径向弧段展示占比或进度，适合支付方式与目标达成。",
        "members": [
            ("simple", "基础径向图", "径向扫读分类占比"),
            ("label", "标签径向图", "环上标签标注占比"),
            ("text", "文字径向图", "中心大数字强调核心指标"),
            ("shape", "形状径向图", "弧形进度强调达成"),
            ("stacked", "堆叠径向图", "双指标弧段叠合对比"),
        ],
        "kind": "radial",
    },
    {
        "id": "chart-gauge",
        "label": "仪表盘",
        "lead": "进度弧或指针强调目标完成度与评分结果。",
        "members": [
            ("default", "基础仪表盘", "蹄形进度弧"),
            ("semi", "半环仪表盘", "半环进度扫读"),
            ("score", "评分仪表盘", "中心评分强调结果"),
            ("needle", "指针仪表盘", "指针落点强调区间"),
        ],
        "kind": "gauge",
    },
    {
        "id": "chart-liquid",
        "label": "水球图",
        "lead": "动态水位强调单一完成率，适合目标进度。",
        "members": [("default", "动态水球图", "水位映射完成率")],
    },
    {
        "id": "chart-palette",
        "label": "图表配色",
        "lead": "切换主题单色或多色板，统一图表与图例色阶。",
        "members": [
            ("theme", "主题单色", "跟随主色深浅阶梯"),
            ("colorful", "多彩分类", "高辨识多分类色板"),
            ("brand", "柔和品牌", "紫蓝主轴成套色板"),
            ("muted", "莫兰迪柔彩", "低饱和克制色板"),
        ],
        "extra_css": ["chart-palette.css"],
        "kind": "palette",
        "palette_ids": {"theme": "theme", "colorful": "a", "brand": "b", "muted": "c"},
    },
]


def write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text.replace("\r\n", "\n"), encoding="utf-8", newline="\n")


def card_html(slug: str, name: str, kind: str) -> str:
    host = f'id="host-{slug}" class="shadcn-chart-host" style="min-height:260px"'
    stage = f'<div {host}></div>\n              <div class="shadcn-chart-legend" data-legend-for="{slug}"></div>'
    if kind == "funnel":
        stage = f'''<div class="shadcn-donut-layout wa-chart-funnel-layout">
                <div class="shadcn-donut-chart">
                  <div id="host-{slug}" class="crm-funnel crm-funnel--trap" data-funnel-root></div>
                </div>
                <div class="shadcn-donut-legend-wrap">
                  <ul class="shadcn-donut-legend shadcn-donut-legend--inline" data-legend-for="{slug}"></ul>
                </div>
              </div>'''
    elif kind == "donut" and slug.endswith("-basic"):
        stage = f'''<div class="shadcn-donut-layout">
                <div class="shadcn-donut-chart">
                  <div id="host-{slug}" class="shadcn-chart-host shadcn-donut-host" style="min-height:200px"></div>
                </div>
                <div class="shadcn-donut-legend-wrap">
                  <ul class="shadcn-donut-legend shadcn-donut-legend--inline" data-legend-for="{slug}"></ul>
                </div>
              </div>'''
    elif kind == "donut" and slug.endswith("-compact"):
        stage = f'''<div class="wa-chart-donut-slot">
                <div id="host-{slug}" class="shadcn-chart-host shadcn-chart-host--donut"></div>
              </div>
              <div class="shadcn-chart-legend" data-legend-for="{slug}"></div>'''
    elif kind == "rose" and slug.endswith("-semi"):
        stage = f'''<div id="host-{slug}" class="shadcn-chart-host shadcn-chart-host--rose shadcn-chart-host--rose-semi"></div>
              <div class="shadcn-donut-legend-wrap wa-chart-rose-semi-legend">
                <ul class="shadcn-donut-legend shadcn-donut-legend--inline shadcn-rose-legend" data-legend-for="{slug}"></ul>
              </div>'''
    elif kind == "rose":
        stage = f'''<div class="shadcn-donut-layout shadcn-rose-layout">
                <div class="shadcn-donut-chart shadcn-rose-chart">
                  <div id="host-{slug}" class="shadcn-chart-host shadcn-rose-host" style="min-height:220px"></div>
                </div>
                <div class="shadcn-donut-legend-wrap">
                  <ul class="shadcn-donut-legend shadcn-donut-legend--inline shadcn-rose-legend" data-legend-for="{slug}"></ul>
                </div>
              </div>'''
    elif kind == "radial" and (slug.endswith("-simple") or slug.endswith("-label")):
        stage = f'''<div class="shadcn-donut-layout">
                <div class="shadcn-donut-chart">
                  <div id="host-{slug}" class="shadcn-chart-host shadcn-chart-host--radial shadcn-radial-host"></div>
                </div>
                <div class="shadcn-donut-legend-wrap">
                  <ul class="shadcn-donut-legend shadcn-donut-legend--inline" data-legend-for="{slug}"></ul>
                </div>
              </div>'''
    elif kind == "radial" and (slug.endswith("-text") or slug.endswith("-shape")):
        stage = f'''<div class="wa-chart-radial-fill">
                <div id="host-{slug}" class="shadcn-chart-host shadcn-chart-host--radial shadcn-radial-host"></div>
              </div>'''
    elif kind == "radial" and slug.endswith("-stacked"):
        stage = f'''<div class="wa-chart-radial-fill">
                <div id="host-{slug}" class="shadcn-chart-host shadcn-chart-host--radial shadcn-radial-host"></div>
              </div>
              <div class="shadcn-chart-legend" data-legend-for="{slug}"></div>'''
    elif kind == "gauge" and slug.endswith("-score"):
        stage = f'''<div class="wa-chart-gauge-block">
                <div id="host-{slug}" class="shadcn-chart-host shadcn-chart-host--gauge shadcn-radial-host"></div>
                <div class="wa-chart-gauge-footer" data-gauge-footer="{slug}"></div>
              </div>'''
    elif kind == "gauge":
        stage = f'''<div class="wa-chart-gauge-block">
                <div id="host-{slug}" class="shadcn-chart-host shadcn-chart-host--gauge shadcn-radial-host"></div>
              </div>'''
    elif kind == "palette":
        stage = f'''<div class="chart-palette-swatches cols-10" data-palette-swatches="{slug}"></div>'''
    return f'''          <div class="wa-fam-card{' shadcn-donut-card' if 'shadcn-donut-layout' in stage else ''}" data-slug="{slug}">
            <div class="wa-fam-card__top">
              <div class="wa-comp-meta"><span class="wa-comp-meta__name">{name}</span><span class="wa-comp-meta__slug">{slug}</span></div>
              <a-tooltip :content="famCopyTip('{slug}')">
              <a-button
                :class="['wa-fam-copy', {{ 'wa-fam-copy--locked': copyLocked, 'is-copied': famCopied('{slug}') }}]"
                type="secondary"
                size="small"
                @click="copyPrompt('{slug}')"
                :aria-label="famCopyTip('{slug}')"
              >
                <span class="wa-fam-copy__inner" v-if="copyLocked">
                  <icon-lock></icon-lock>
                  <span class="wa-fam-copy__label">开通权限</span>
                </span>
                <span class="wa-fam-copy__inner" v-else>
                  <icon-check v-if="famCopied('{slug}')"></icon-check>
                  <icon-copy v-else></icon-copy>
                  <span class="wa-fam-copy__label">提示词</span>
                </span>
              </a-button>
              </a-tooltip>
            </div>
            <div class="wa-fam-card__stage">
              {stage}
            </div>
          </div>'''


def css_links(prefix: str, extra: list[str] | None) -> str:
    lines = [
        f'<link rel="stylesheet" href="{prefix}/vendor/arco/css/arco.css" />',
        f'<link rel="stylesheet" href="{prefix}/assets/common/css/chrome.css" />',
        f'<link rel="stylesheet" href="{prefix}/assets/common/css/global.css" />',
        f'<link rel="stylesheet" href="{prefix}/vendor/fontawesome/css/all.min.css" />',
        f'<link rel="stylesheet" href="{prefix}/assets/common/css/fa-icons.css" />',
        f'<link rel="stylesheet" href="{prefix}/assets/common/css/components.css" />',
        f'<link rel="stylesheet" href="{prefix}/components/index.css" />',
        f'<link rel="stylesheet" href="{prefix}/assets/common/charts/shadcn-chart.css" />',
    ]
    for name in extra or []:
        lines.append(f'<link rel="stylesheet" href="{prefix}/assets/common/css/{name}" />')
    return "\n  ".join(lines)


def scripts(prefix: str, tail: str) -> str:
    return f'''  <script src="{prefix}/vendor/vue/vue.global.prod.js"></script>
  <script src="{prefix}/vendor/arco/arco-vue.min.js"></script>
  <script src="{prefix}/assets/common/js/fa-icons.js"></script>
  <script src="{prefix}/assets/common/js/boot.js"></script>
  <script src="{prefix}/vendor/unovis/unovis.min.js"></script>
  <script src="{prefix}/assets/common/charts/chart-palette.js"></script>
  <script src="{prefix}/assets/common/charts/shadcn-charts.js"></script>
  <script src="{prefix}/assets/common/charts/wa-chart-demos.js"></script>
{tail}'''


def family_index(fam: dict) -> str:
    fid = fam["id"]
    members = fam["members"]
    kind = fam.get("kind", "chart")
    if kind == "palette":
        return family_index_palette(fam)
    subdirs = " / ".join(m[0] for m in members)
    cards = "\n".join(card_html(f"{fid}-{m[0]}", m[1], kind) for m in members)
    slugs = ", ".join(f"'{fid}-{m[0]}'" for m in members)
    setup = f'''  <script src="./prompts.inline.js"></script>
  <script>
  window.WA_FAMILY = {{
    id: '{fid}',
    members: [{slugs}],
    setup: function () {{
      var charts = []
      Vue.onMounted(function () {{
        Vue.nextTick(function () {{
          if (!window.WaChartDemos) return
          charts = WaChartDemos.mountFamily('{fid}') || []
        }})
      }})
      Vue.onBeforeUnmount(function () {{
        if (window.ProShadcnCharts) charts.forEach(function (c) {{ ProShadcnCharts.destroy(c) }})
      }})
      return {{}}
    }}
  }}
  </script>
  <script src="../family.js"></script>'''
    return f'''<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <script src="../../assets/common/js/theme.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{fam["label"]} · 家族对照</title>
  {css_links("../..", fam.get("extra_css"))}
</head>
<body>
  <div id="app" v-cloak>
    <section class="wa-fam-section wa-fam-fade-in" data-family="{fid}">
      <div class="wa-fam-section__inner">
        <header class="wa-fam-head">
          <p class="wa-fam-kicker">{fid}</p>
          <h1 class="wa-fam-title">{fam["label"]}</h1>
          <p class="wa-fam-lead">{fam["lead"]}</p>
          <p class="wa-fam-lead">组件类型：{subdirs}</p>
        </header>
        <div class="wa-fam-grid">
{cards}
        </div>
      </div>
    </section>
  </div>
{scripts("../..", setup)}
</body>
</html>
'''


def family_index_palette(fam: dict) -> str:
    """Admin-aligned scheme switcher; no demo charts."""
    fid = fam["id"]
    members = fam["members"]
    subdirs = " / ".join(m[0] for m in members)
    slugs = ", ".join(f"'{fid}-{m[0]}'" for m in members)
    # No Unovis / shadcn-charts — palette page only needs chart-palette.js
    head_css = css_links("../..", fam.get("extra_css"))
    return f'''<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <script src="../../assets/common/js/theme.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{fam["label"]} · 家族对照</title>
  {head_css}
</head>
<body>
  <div id="app" v-cloak>
    <section class="wa-fam-section wa-fam-fade-in" data-family="{fid}">
      <div class="wa-fam-section__inner">
        <header class="wa-fam-head">
          <p class="wa-fam-kicker">{fid}</p>
          <h1 class="wa-fam-title">{fam["label"]}</h1>
          <p class="wa-fam-lead">切换主题单色或多色板，统一图表与图例色阶。点击方案即可应用（跨页保持）。</p>
          <p class="wa-fam-lead">组件类型：{subdirs}</p>
        </header>

        <div class="chart-palette-page">
          <article
            v-for="scheme in schemes"
            :key="scheme.id"
            class="chart-palette-scheme"
            :class="{{ 'is-active': activeId === scheme.id }}"
            @click="selectScheme(scheme.id)"
          >
            <div class="chart-palette-scheme-head">
              <h2 class="chart-palette-scheme-title">{{{{ scheme.title }}}}</h2>
              <div class="chart-palette-scheme-actions">
                <a-tag v-if="scheme.badge" color="arcoblue" size="small">{{{{ scheme.badge }}}}</a-tag>
                <a-button size="mini" type="primary" @click.stop="selectScheme(scheme.id)">
                  <template v-if="activeId === scheme.id" #icon>
                    <icon-check-circle></icon-check-circle>
                  </template>
                  {{{{ activeId === scheme.id ? '当前方案' : '应用' }}}}
                </a-button>
                <a-tooltip :content="famCopyTip(slugOf(scheme.id))">
                  <a-button
                    type="secondary"
                    size="mini"
                    :class="['wa-fam-copy', {{ 'wa-fam-copy--locked': copyLocked, 'is-copied': famCopied(slugOf(scheme.id)) }}]"
                    @click.stop="copyPrompt(slugOf(scheme.id))"
                    :aria-label="famCopyTip(slugOf(scheme.id))"
                  >
                    <span class="wa-fam-copy__inner" v-if="copyLocked">
                      <icon-lock></icon-lock>
                      <span class="wa-fam-copy__label">开通权限</span>
                    </span>
                    <span class="wa-fam-copy__inner" v-else>
                      <icon-check v-if="famCopied(slugOf(scheme.id))"></icon-check>
                      <icon-copy v-else></icon-copy>
                      <span class="wa-fam-copy__label">提示词</span>
                    </span>
                  </a-button>
                </a-tooltip>
              </div>
            </div>
            <p class="chart-palette-why">{{{{ scheme.why }}}}</p>
            <div :class="swatchClass(scheme.cols)">
              <div v-for="c in scheme.colors" :key="scheme.id + '-sw-' + c.id">
                <div class="chart-palette-chip" :style="{{ background: c.hex || c.css }}"></div>
                <div
                  v-if="!scheme.noSoft"
                  class="chart-palette-soft"
                  :style="{{ background: softBg(c.hex || c.css, scheme.softAlpha || 0.14) }}"
                ></div>
                <div class="chart-palette-meta">
                  <b>{{{{ metaLabel(c) }}}}</b>{{{{ c.hex }}}}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
  <script src="../../vendor/vue/vue.global.prod.js"></script>
  <script src="../../vendor/arco/arco-vue.min.js"></script>
  <script src="../../assets/common/js/fa-icons.js"></script>
  <script src="../../assets/common/js/boot.js"></script>
  <script src="../../assets/common/charts/chart-palette.js"></script>
  <script src="./prompts.inline.js"></script>
  <script>
  window.WA_FAMILY = {{
    id: '{fid}',
    members: [{slugs}],
    setup: function (ctx) {{
      var ref = ctx.ref
      var activeId = ref('theme')
      var schemes = ref([])
      var SCHEME_SLUG = {{
        theme: 'chart-palette-theme',
        a: 'chart-palette-colorful',
        b: 'chart-palette-brand',
        c: 'chart-palette-muted',
      }}

      function syncFromStore() {{
        var api = window.ArcoProChartPalette || window.WaChartPalette
        if (!api) return
        activeId.value = api.getCurrentId()
        schemes.value = (api.schemes || []).map(function (s) {{
          return api.schemeForDisplay(s)
        }})
      }}

      function softBg(hex, alpha) {{
        var api = window.ArcoProChartPalette || window.WaChartPalette
        return api && api.soft ? api.soft(hex, alpha) : hex
      }}

      function swatchClass(cols) {{
        if (cols === 10) return 'chart-palette-swatches cols-10'
        if (cols === 8) return 'chart-palette-swatches cols-8'
        if (cols === 6) return 'chart-palette-swatches cols-6'
        return 'chart-palette-swatches'
      }}

      function metaLabel(c) {{
        return c.name ? c.id + ' ' + c.name : c.id
      }}

      function slugOf(id) {{
        return SCHEME_SLUG[id] || 'chart-palette-theme'
      }}

      function selectScheme(id) {{
        var api = window.ArcoProChartPalette || window.WaChartPalette
        if (!api) return
        api.set(id)
        syncFromStore()
        if (window.ArcoVue && ArcoVue.Message) {{
          var scheme = api.getScheme(id)
          ArcoVue.Message.success('已切换：' + ((scheme && scheme.title) || id))
        }}
      }}

      Vue.onMounted(function () {{
        syncFromStore()
        window.addEventListener('arco-pro-chart-palette-change', syncFromStore)
        window.addEventListener('arco-pro-theme-change', syncFromStore)
        window.addEventListener('wa-theme-change', syncFromStore)
      }})
      Vue.onBeforeUnmount(function () {{
        window.removeEventListener('arco-pro-chart-palette-change', syncFromStore)
        window.removeEventListener('arco-pro-theme-change', syncFromStore)
        window.removeEventListener('wa-theme-change', syncFromStore)
      }})

      return {{
        activeId: activeId,
        schemes: schemes,
        softBg: softBg,
        swatchClass: swatchClass,
        metaLabel: metaLabel,
        slugOf: slugOf,
        selectScheme: selectScheme,
      }}
    }},
  }}
  </script>
  <script src="../family.js"></script>
</body>
</html>
'''


def member_stage(slug: str, kind: str) -> str:
    if kind == "funnel":
        return f'''        <div class="shadcn-donut-layout wa-chart-funnel-layout">
          <div class="shadcn-donut-chart">
            <div id="chart-host" class="crm-funnel crm-funnel--trap" data-funnel-root></div>
          </div>
          <div class="shadcn-donut-legend-wrap">
            <ul class="shadcn-donut-legend shadcn-donut-legend--inline" id="chart-legend"></ul>
          </div>
        </div>'''
    if kind == "donut" and slug.endswith("-basic"):
        return '''        <div class="shadcn-donut-layout">
          <div class="shadcn-donut-chart">
            <div id="chart-host" class="shadcn-chart-host shadcn-donut-host" style="min-height:200px"></div>
          </div>
          <div class="shadcn-donut-legend-wrap">
            <ul class="shadcn-donut-legend shadcn-donut-legend--inline" id="chart-legend"></ul>
          </div>
        </div>'''
    if kind == "donut" and slug.endswith("-compact"):
        return '''        <div class="wa-chart-donut-slot">
          <div id="chart-host" class="shadcn-chart-host shadcn-chart-host--donut"></div>
        </div>
        <div id="chart-legend" class="shadcn-chart-legend"></div>'''
    if kind == "rose" and slug.endswith("-semi"):
        return '''        <div id="chart-host" class="shadcn-chart-host shadcn-chart-host--rose shadcn-chart-host--rose-semi"></div>
        <div class="shadcn-donut-legend-wrap wa-chart-rose-semi-legend">
          <ul class="shadcn-donut-legend shadcn-donut-legend--inline shadcn-rose-legend" id="chart-legend"></ul>
        </div>'''
    if kind == "rose":
        return '''        <div class="shadcn-donut-layout shadcn-rose-layout">
          <div class="shadcn-donut-chart shadcn-rose-chart">
            <div id="chart-host" class="shadcn-chart-host shadcn-rose-host" style="min-height:220px"></div>
          </div>
          <div class="shadcn-donut-legend-wrap">
            <ul class="shadcn-donut-legend shadcn-donut-legend--inline shadcn-rose-legend" id="chart-legend"></ul>
          </div>
        </div>'''
    if kind == "radial" and (slug.endswith("-simple") or slug.endswith("-label")):
        return '''        <div class="shadcn-donut-layout">
          <div class="shadcn-donut-chart">
            <div id="chart-host" class="shadcn-chart-host shadcn-chart-host--radial shadcn-radial-host"></div>
          </div>
          <div class="shadcn-donut-legend-wrap">
            <ul class="shadcn-donut-legend shadcn-donut-legend--inline" id="chart-legend"></ul>
          </div>
        </div>'''
    if kind == "radial" and (slug.endswith("-text") or slug.endswith("-shape")):
        return '''        <div class="wa-chart-radial-fill">
          <div id="chart-host" class="shadcn-chart-host shadcn-chart-host--radial shadcn-radial-host"></div>
        </div>'''
    if kind == "radial" and slug.endswith("-stacked"):
        return '''        <div class="wa-chart-radial-fill">
          <div id="chart-host" class="shadcn-chart-host shadcn-chart-host--radial shadcn-radial-host"></div>
        </div>
        <div id="chart-legend" class="shadcn-chart-legend"></div>'''
    if kind == "gauge" and slug.endswith("-score"):
        return '''        <div class="wa-chart-gauge-block">
          <div id="chart-host" class="shadcn-chart-host shadcn-chart-host--gauge shadcn-radial-host"></div>
          <div class="wa-chart-gauge-footer" id="chart-gauge-footer"></div>
        </div>'''
    if kind == "gauge":
        return '''        <div class="wa-chart-gauge-block">
          <div id="chart-host" class="shadcn-chart-host shadcn-chart-host--gauge shadcn-radial-host"></div>
        </div>'''
    if kind == "palette":
        return '''        <div class="chart-palette-swatches cols-10" id="chart-swatches"></div>'''
    return '''        <div id="chart-host" class="shadcn-chart-host" style="min-height:260px"></div>
        <div id="chart-legend" class="shadcn-chart-legend"></div>'''


def member_index(fam: dict, sub: str, name: str, slug: str) -> str:
    kind = fam.get("kind", "chart")
    stage = member_stage(slug, kind)
    card_cls = "wa-card wa-embed wa-preview-stage"
    if "shadcn-donut-layout" in stage:
        card_cls += " shadcn-donut-card"
    tail = f'''  <script src="./component.js"></script>'''
    if kind == "palette":
        body_scripts = f'''  <script src="../../../vendor/vue/vue.global.prod.js"></script>
  <script src="../../../vendor/arco/arco-vue.min.js"></script>
  <script src="../../../assets/common/js/fa-icons.js"></script>
  <script src="../../../assets/common/js/boot.js"></script>
  <script src="../../../assets/common/charts/chart-palette.js"></script>
  <script src="../../../assets/common/charts/wa-chart-demos.js"></script>
{tail}'''
    else:
        body_scripts = scripts("../../..", tail)
    return f'''<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <script src="../../../assets/common/js/theme.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{name} · {slug}</title>
  {css_links("../../..", fam.get("extra_css"))}
</head>
<body class="wa-preview-embed">
  <div id="app" v-cloak>
    <article class="{card_cls}" data-slug="{slug}">
      <div class="wa-comp-meta wa-preview-chrome">
        <span class="wa-comp-meta__name">{name}</span>
        <span class="wa-comp-meta__slug">{slug}</span>
      </div>
      <div class="wa-embed__stage">
{stage}
      </div>
    </article>
  </div>
{body_scripts}
</body>
</html>
'''


def member_js(slug: str) -> str:
    if slug.startswith("chart-palette-"):
        return f''';(function () {{
  WebArco.mount('#app', {{
    setup: function () {{
      Vue.onMounted(function () {{
        Vue.nextTick(function () {{
          if (!window.WaChartDemos) return
          var swatches = document.getElementById('chart-swatches')
          WaChartDemos.mountOne('{slug}', null, null, swatches)
        }})
      }})
      return {{}}
    }},
  }})
}})()
'''
    return f''';(function () {{
  WebArco.mount('#app', {{
    setup: function () {{
      var charts = []
      Vue.onMounted(function () {{
        Vue.nextTick(function () {{
          if (!window.WaChartDemos) return
          var host = document.getElementById('chart-host')
          var legend = document.getElementById('chart-legend')
          var swatches = document.getElementById('chart-swatches')
          var inst = WaChartDemos.mountOne('{slug}', host, legend, swatches)
          if (inst) charts = Array.isArray(inst) ? inst : [inst]
        }})
      }})
      Vue.onBeforeUnmount(function () {{
        if (window.ProShadcnCharts) charts.forEach(function (c) {{ ProShadcnCharts.destroy(c) }})
      }})
      return {{}}
    }},
  }})
}})()
'''


def prompt_md(fam: dict, sub: str, name: str, slug: str, scene: str) -> str:
    siblings = "\n".join(
        f"| `{fam['id']}-{m[0]}` | `components/{fam['id']}/{m[0]}/` |{' （本条）' if m[0] == sub else ''} |"
        for m in fam["members"]
    )
    mount_hint = {
        "chart-bar-default": "ProShadcnCharts.mountBarChart（单系列）",
        "chart-bar-grouped": "ProShadcnCharts.mountBarChart（多系列）",
        "chart-bar-stacked": "ProShadcnCharts.mountStackedBarChart",
        "chart-combo-default": "ProShadcnCharts.mountComboChart",
        "chart-horizontal-bar-default": "ProShadcnCharts.mountHorizontalBarChart",
        "chart-horizontal-bar-compare": "ProShadcnCharts.mountHorizontalBarChart（双系列）",
        "chart-area-sharp": "ProShadcnCharts.mountAreaChart（curveType: linear）",
        "chart-area-sharp-compare": "ProShadcnCharts.mountAreaChart（对比 + linear）",
        "chart-area-smooth": "ProShadcnCharts.mountAreaChart（monotoneX）",
        "chart-area-smooth-compare": "ProShadcnCharts.mountAreaChart（对比 + monotoneX）",
        "chart-line-sharp": "ProShadcnCharts.mountLineChart（linear）",
        "chart-line-smooth": "ProShadcnCharts.mountLineChart（monotoneX）",
        "chart-donut-basic": "ProShadcnCharts.mountDonutChart + 侧栏图例",
        "chart-donut-compact": "ProShadcnCharts.mountDonutChart（height/radius/arcWidth 对齐 Admin；槽位垂直居中）",
        "chart-radar-dots": "ProShadcnCharts.mountRadarChart",
        "chart-radar-circle": "ProShadcnCharts.mountRadarChart（圆形填充）",
        "chart-radar-compare": "ProShadcnCharts.mountRadarChart（双系列）",
        "chart-rose-nightingale": "ProShadcnCharts.mountRoseChart",
        "chart-rose-semi": "ProShadcnCharts.mountRoseChart（半圆）",
        "chart-radial-simple": "ProShadcnCharts.mountRadialBarChart",
        "chart-radial-label": "ProShadcnCharts.mountRadialBarChart（标签）",
        "chart-radial-text": "ProShadcnCharts.mountRadialBarChart（中心文字）",
        "chart-radial-shape": "ProShadcnCharts.mountRadialBarChart（形状）",
        "chart-radial-stacked": "ProShadcnCharts.mountRadialBarChart（堆叠）",
        "chart-gauge-default": "ProShadcnCharts.mountGaugeChart",
        "chart-gauge-semi": "ProShadcnCharts.mountGaugeChart（半环）",
        "chart-gauge-score": "ProShadcnCharts.mountGaugeChart（评分）",
        "chart-gauge-needle": "ProShadcnCharts.mountGaugeChart（指针）",
        "chart-liquid-default": "ProShadcnCharts.mountLiquidFillChart",
        "chart-funnel-default": "梯形漏斗 DOM（crm-funnel）",
        "chart-palette-theme": "WaChartPalette.set('theme')",
        "chart-palette-colorful": "WaChartPalette.set('a')",
        "chart-palette-brand": "WaChartPalette.set('b')",
        "chart-palette-muted": "WaChartPalette.set('c')",
    }.get(slug, "ProShadcnCharts 对应 mount*")

    html5 = '''```html
<div id="chart-host" class="shadcn-chart-host" style="min-height:260px"></div>
<div class="shadcn-chart-legend"><!-- 图例项 --></div>
```'''
    if slug == "chart-donut-compact":
        html5 = '''```html
<div class="wa-chart-donut-slot">
  <div id="chart-host" class="shadcn-chart-host shadcn-chart-host--donut"></div>
</div>
<div class="shadcn-chart-legend"><!-- 底图例项 --></div>
```'''
    if slug == "chart-rose-semi":
        html5 = '''```html
<div id="chart-host" class="shadcn-chart-host shadcn-chart-host--rose shadcn-chart-host--rose-semi"></div>
<div class="shadcn-donut-legend-wrap wa-chart-rose-semi-legend">
  <ul class="shadcn-donut-legend shadcn-donut-legend--inline shadcn-rose-legend"><!-- 城市 + 读数 + 占比 --></ul>
</div>
```'''
    if slug in ("chart-radial-simple", "chart-radial-label"):
        html5 = '''```html
<div class="shadcn-donut-layout">
  <div class="shadcn-donut-chart">
    <div id="chart-host" class="shadcn-chart-host shadcn-chart-host--radial shadcn-radial-host"></div>
  </div>
  <div class="shadcn-donut-legend-wrap">
    <ul class="shadcn-donut-legend shadcn-donut-legend--inline"><!-- 侧栏图例 --></ul>
  </div>
</div>
```'''
    if slug in ("chart-radial-text", "chart-radial-shape"):
        html5 = '''```html
<div class="wa-chart-radial-fill">
  <div id="chart-host" class="shadcn-chart-host shadcn-chart-host--radial shadcn-radial-host"></div>
</div>
```'''
    if slug == "chart-radial-stacked":
        html5 = '''```html
<div class="wa-chart-radial-fill">
  <div id="chart-host" class="shadcn-chart-host shadcn-chart-host--radial shadcn-radial-host"></div>
</div>
<div class="shadcn-chart-legend"><!-- 底图例项 --></div>
```'''
    if slug.startswith("chart-gauge-"):
        if slug.endswith("-score"):
            html5 = '''```html
<div class="wa-chart-gauge-block">
  <div id="chart-host" class="shadcn-chart-host shadcn-chart-host--gauge shadcn-radial-host"></div>
  <div class="wa-chart-gauge-footer">评估时间：2026-09-30</div>
</div>
```'''
        else:
            html5 = '''```html
<div class="wa-chart-gauge-block">
  <div id="chart-host" class="shadcn-chart-host shadcn-chart-host--gauge shadcn-radial-host"></div>
</div>
```'''
    if fam.get("kind") == "funnel":
        html5 = '''```html
<div class="shadcn-donut-layout wa-chart-funnel-layout">
  <div class="shadcn-donut-chart">
    <div class="crm-funnel crm-funnel--trap"><!-- 阶段步进 --></div>
  </div>
  <div class="shadcn-donut-legend-wrap">
    <ul class="shadcn-donut-legend shadcn-donut-legend--inline"><!-- 图例 --></ul>
  </div>
</div>
```'''
    elif fam.get("kind") == "palette":
        html5 = '''```html
<div class="chart-palette-swatches cols-10"><!-- chip + soft + meta --></div>
```'''
        return f'''# {name}

> 状态：preview · slug：`{slug}` · 类型：component · 母版：web · surface：general · category：`chart`

## 1. 角色与目标

实现「{name}」（`{slug}`）。{scene}。

成功标准：业务页可调用 `WaChartPalette.set(...)` 写入 `--chart-1…10`，色板展示与 §5 同构（chip + soft + hex meta）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库；图表色用 `--chart-1…10`（由图表配色方案写入）。
- **样式落地**：将 `components/chart-palette/component.css`（及 `--chart-*` 相关 token）规则**并入**宿主页/模块 CSS；**禁止**在交付里写死母版相对 link。
- **脚本落地**：挂载逻辑用 `{mount_hint}`；依赖本地 `chart-palette`；并入宿主页 `js/<page>.js`。预览挂载壳不拷。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：色板展示 + `WaChartPalette.set`；家族页可切换方案；本条不附示例图表
- 颜色：系列色用 `var(--chart-n)`，由 `WaChartPalette` / `ArcoProChartPalette` 写入
- 禁止外链 CDN

## 4. 视觉规格

- 布局：chip（主色）+ soft（浅底）+ meta（id/名称 + hex），与 Admin `component-chart-palette` 一致
- 动效：无强制动效
- 颜色：只用 `--chart-*` / `--wa-*` / Arco text token

## 5. 直接粘贴

{html5}

> 换文案：只改汉字与数据；样式/脚本并入宿主，勿单独 link 母版路径。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案与数据）
- [ ] 未混入其它形态或整页橱窗
- [ ] 无 CDN；配色走 `--chart-*`

## 7. 预览

`components/{fam["id"]}/{sub}/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
{siblings}
'''

    return f'''# {name}

> 状态：preview · slug：`{slug}` · 类型：component · 母版：web · surface：general · category：`chart`

## 1. 角色与目标

实现「{name}」（`{slug}`）。{scene}。

成功标准：业务页出现与 §5 一致的真图表（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库；图表色用 `--chart-1…10`（由图表配色方案写入）。
- **样式落地**：将 `assets/common/charts/shadcn-chart.css` 规则**并入**宿主页/模块 CSS（漏斗另并 `components/chart-funnel/component.css`；配色预览另并 `components/chart-palette/component.css`）；**禁止**在交付里写死母版相对 link。
- **脚本落地**：挂载逻辑用 `{mount_hint}`；依赖本地 Unovis + `shadcn-charts` + `chart-palette`；并入宿主页 `js/<page>.js`。预览挂载壳不拷。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 Unovis 图表宿主（`.shadcn-chart-host`）或漏斗 DOM；禁止用静态图片冒充实图
- 颜色：系列色用 `var(--chart-n)` / `var(--chart-radial-n)`，由 `WaChartPalette` / `ArcoProChartPalette` 写入
- 禁止外链 CDN

## 4. 视觉规格

- 布局 / 层级 / 强调：{scene}；图例与宿主同卡
- 动效：图表入场/悬停提示由 Unovis 封装处理；漏斗用 crm-funnel-in
- 颜色：只用 `--chart-*` / `--wa-*` / Arco text token

## 5. 直接粘贴

{html5}

> 换文案：只改汉字与数据；样式/脚本并入宿主，勿单独 link 母版路径。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案与数据）
- [ ] 未混入其它形态或整页橱窗
- [ ] 无 CDN；配色走 `--chart-*`

## 7. 预览

`components/{fam["id"]}/{sub}/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
{siblings}
'''


def patch_catalog(entries: list[dict], families: list[dict]) -> None:
    data = load_catalog()
    cats = data.setdefault("componentCategories", [])
    if "chart" not in cats:
        cats.append("chart")
    # remove prior chart components/families if re-run
    data["components"] = [c for c in data.get("components", []) if c.get("category") != "chart" and not str(c.get("slug", "")).startswith("chart-")]
    data["families"] = [f for f in data.get("families", []) if not str(f.get("slug", "")).startswith("chart-")]
    data["components"].extend(entries)
    data["families"].extend(families)
    save_catalog(data)


def append_components_css() -> None:
    path = ROOT / "assets" / "css" / "components.css"
    marker = "/* charts family：单列 + 窄版心；舞台纵向，图例在底部 */"
    text = path.read_text(encoding="utf-8")
    block = """
/* charts family：单列 + 窄版心；舞台纵向，图例在底部 */
.wa-fam-section[data-family^="chart-"] .wa-fam-section__inner {
  max-width: 520px;
}
.wa-fam-section[data-family^="chart-"] .wa-fam-grid {
  grid-template-columns: 1fr;
}
.wa-fam-section[data-family^="chart-"] .wa-fam-card__stage {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  min-height: 0;
}
.wa-fam-section[data-family^="chart-"] .wa-fam-card__stage > .shadcn-chart-host {
  width: 100%;
  min-height: 260px;
}
.wa-fam-section[data-family^="chart-"] .wa-fam-card__stage > .shadcn-chart-legend {
  width: 100%;
  margin-top: 20px;
}
"""
    if marker in text:
        return
    path.write_text(text.rstrip() + "\n" + block, encoding="utf-8", newline="\n")


def main() -> None:
    comp_entries = []
    fam_entries = []
    for fam in FAMILIES:
        fam_dir = COMP / fam["id"]
        write(fam_dir / "index.html", family_index(fam))
        members_slugs = []
        for sub, name, scene in fam["members"]:
            slug = f"{fam['id']}-{sub}"
            members_slugs.append(slug)
            mdir = fam_dir / sub
            write(mdir / "index.html", member_index(fam, sub, name, slug))
            write(mdir / "component.js", member_js(slug))
            write(mdir / "prompt.md", prompt_md(fam, sub, name, slug, scene))
            comp_entries.append(
                {
                    "slug": slug,
                    "label": name,
                    "surface": "general",
                    "status": "preview",
                    "tier": "free",
                    "path": f"components/{fam['id']}/{sub}",
                    "notes": f"家族 {fam['id']} / {sub}",
                    "category": "chart",
                    "tags": [],
                    "family": fam["id"],
                }
            )
        fam_entries.append(
            {
                "slug": fam["id"],
                "label": fam["label"],
                "path": f"components/{fam['id']}",
                "surface": "general",
                "status": "preview",
                "tier": "free",
                "members": members_slugs,
                "notes": "Unovis + shadcn-chart；配色见 chart-palette",
            }
        )
    patch_catalog(comp_entries, fam_entries)
    append_components_css()
    print(f"generated {len(fam_entries)} families, {len(comp_entries)} members")


if __name__ == "__main__":
    main()
