# -*- coding: utf-8 -*-
"""Generate WEB basic / display / navigation / feedback families from admin
component-basic + Arco common supplements. Run from frame/web:

  python scripts/_gen_basic_components.py
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

MEMBER_HTML = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <script src="../../../assets/common/js/theme.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{label} · {slug}</title>
  <link rel="stylesheet" href="../../../vendor/arco/css/arco.css" />
  <link rel="stylesheet" href="../../../assets/common/css/chrome.css" />
  <link rel="stylesheet" href="../../../assets/common/css/global.css" />
  <link rel="stylesheet" href="../../../vendor/fontawesome/css/all.min.css" />
  <link rel="stylesheet" href="../../../assets/common/css/fa-icons.css" />
  <link rel="stylesheet" href="../../../assets/common/css/components.css" />
  <link rel="stylesheet" href="../../index.css" />
{extra_css}</head>
<body class="wa-preview-embed">
  <div id="app" v-cloak>
    <article class="wa-card wa-embed wa-preview-stage" data-slug="{slug}">
      <div class="wa-comp-meta wa-preview-chrome">
        <span class="wa-comp-meta__name">{label}</span>
        <span class="wa-comp-meta__slug">{slug}</span>
      </div>
      <div class="wa-embed__stage">
{control}
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


def write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8", newline="\n")


def sibling_table(family: str, members: list-default[tuple[str, str, str]], current: str) -> str:
    rows = []
    for slug, sub, _ in members:
        mark = " （本条）" if slug == current else ""
        rows.append(f"| `{slug}` | `components/{family}/{sub}/` |{mark} |")
    return "\n".join(rows)


def copy_btn(slug: str) -> str:
    return COPY_BTN.format(slug=slug)


def card_html(slug: str, label: str, control: str, stage: bool = False) -> str:
    inner = control if not stage else f'            <div class="wa-fam-card__stage">\n{control}\n            </div>'
    return f"""          <div class="wa-fam-card" data-slug="{slug}">
            <div class="wa-fam-card__top">
              <div class="wa-comp-meta"><span class="wa-comp-meta__name">{label}</span><span class="wa-comp-meta__slug">{slug}</span></div>
{copy_btn(slug)}
            </div>
{inner}
          </div>"""


# ---------------------------------------------------------------------------
# Family definitions
# members: (slug, subdir, label, control_html, snippet, scene_member, rule, visual,
#           setup_js_for_member_embed or None, extra_css_links, use_stage)
# family-level: setup_js for WA_FAMILY.setup body (return object fields), fam_control per card-default
# ---------------------------------------------------------------------------

FAMILIES: list-default[dict] = [
    # —— from admin component-basic ——
    {
        "slug": "tag",
        "label": "标签",
        "lead": "状态与分类标签，用于列表筛选、状态标记与可关闭筛选条件。",
        "category": "data-display",
        "types": "default / color / closable / bordered / small",
        "setup": "",
        "members": [
            {
                "slug": "tag-default",
                "subdir": "default",
                "label": "标签",
                "control": '            <a-tag>默认</a-tag>',
                "snippet": "<a-tag>默认</a-tag>",
                "scene": "展示默认态标签文案。",
                "rule": "真 a-tag",
                "visual": "圆角小标签，跟主题色板",
            },
            {
                "slug": "tag-color",
                "subdir": "color",
                "label": "彩色标签",
                "control": '            <a-tag color="arcoblue">进行中</a-tag>',
                "snippet": '<a-tag color="arcoblue">进行中</a-tag>',
                "scene": "用颜色区分业务状态。",
                "rule": "真 a-tag + color",
                "visual": "彩色填充标签",
            },
            {
                "slug": "tag-closable",
                "subdir": "closable",
                "label": "可关闭标签",
                "control": "            <a-tag closable>可关闭</a-tag>",
                "snippet": "<a-tag closable>可关闭</a-tag>",
                "scene": "可移除的筛选条件标签。",
                "rule": "真 a-tag closable",
                "visual": "带关闭图标的标签",
            },
            {
                "slug": "tag-bordered",
                "subdir": "bordered",
                "label": "描边标签",
                "control": '            <a-tag color="green" bordered>已通过</a-tag>',
                "snippet": '<a-tag color="green" bordered>已通过</a-tag>',
                "scene": "描边态状态标签。",
                "rule": "真 a-tag bordered",
                "visual": "描边彩色标签",
            },
            {
                "slug": "tag-small",
                "subdir": "small",
                "label": "小型标签",
                "control": '            <a-tag size="small" color="gray">小型</a-tag>',
                "snippet": '<a-tag size="small" color="gray">小型</a-tag>',
                "scene": "紧凑列表中的小型标签。",
                "rule": "真 a-tag size=small",
                "visual": "小尺寸灰色标签",
            },
        ],
    },
    {
        "slug": "badge",
        "label": "徽标",
        "lead": "数字角标与状态点，用于消息未读、处理中与图标提醒。",
        "category": "data-display",
        "types": "status / count / max / dot",
        "setup": "",
        "members": [
            {
                "slug": "badge",
                "subdir": "status",
                "label": "状态徽标",
                "control": '            <a-badge status="processing" text="进行中" />',
                "snippet": '<a-badge status="processing" text="进行中" />',
                "scene": "文字旁展示处理中状态点。",
                "rule": "真 a-badge status",
                "visual": "状态点 + 文案",
            },
            {
                "slug": "badge-count",
                "subdir": "count",
                "label": "数字徽标",
                "control": """            <a-badge :count="8">
              <a-button type="outline"><template #icon><icon-notification /></template></a-button>
            </a-badge>""",
                "snippet": """<a-badge :count="8">
  <a-button type="outline"><template #icon><icon-notification /></template></a-button>
</a-badge>""",
                "scene": "图标按钮右上角未读数字。",
                "rule": "真 a-badge count 包裹触发器",
                "visual": "数字角标叠在按钮上",
                "stage": True,
            },
            {
                "slug": "badge-max",
                "subdir": "max",
                "label": "封顶徽标",
                "control": """            <a-badge :count="1000" :max-count="999">
              <a-button>消息</a-button>
            </a-badge>""",
                "snippet": """<a-badge :count="1000" :max-count="999">
  <a-button>消息</a-button>
</a-badge>""",
                "scene": "超量未读显示为封顶值。",
                "rule": "真 a-badge max-count",
                "visual": "封顶数字角标",
                "stage": True,
            },
            {
                "slug": "badge-dot",
                "subdir": "dot",
                "label": "圆点徽标",
                "control": """            <a-badge dot :count="1">
              <a-button type="outline"><template #icon><icon-message /></template></a-button>
            </a-badge>""",
                "snippet": """<a-badge dot :count="1">
  <a-button type="outline"><template #icon><icon-message /></template></a-button>
</a-badge>""",
                "scene": "仅用红点提示有更新。",
                "rule": "真 a-badge dot",
                "visual": "圆点角标",
                "stage": True,
            },
        ],
    },
    {
        "slug": "avatar",
        "label": "头像",
        "lead": "用户头像展示，支持圆形方形、文字图与头像组叠放。",
        "category": "data-display",
        "types": "default / square / text / trigger / group",
        "setup": "",
        "extra_css_family": '  <link rel="stylesheet" href="./default/component.css" />\n',
        "members": [
            {
                "slug": "avatar-default",
                "subdir": "default",
                "label": "头像",
                "control": '            <a-avatar :size="40"><icon-avatar /></a-avatar>',
                "snippet": "<a-avatar :size=\"40\"><icon-avatar /></a-avatar>",
                "scene": "圆形图标头像。",
                "rule": "真 a-avatar",
                "visual": "圆形头像，默认 40px",
                "css": True,
            },
            {
                "slug": "avatar-square",
                "subdir": "square",
                "label": "方形头像",
                "control": '            <a-avatar :size="40" shape="square"><icon-avatar /></a-avatar>',
                "snippet": '<a-avatar :size="40" shape="square"><icon-avatar /></a-avatar>',
                "scene": "方形图标头像。",
                "rule": "真 a-avatar shape=square",
                "visual": "方形头像",
                "css": True,
            },
            {
                "slug": "avatar-text",
                "subdir": "text",
                "label": "文字头像",
                "control": '            <a-avatar :size="40" :style="{ backgroundColor: \'rgb(var(--primary-6))\' }">李</a-avatar>',
                "snippet": """<a-avatar :size="40" :style="{ backgroundColor: 'rgb(var(--primary-6))' }">李</a-avatar>""",
                "scene": "用姓氏文字代替图片。",
                "rule": "真 a-avatar 文字子节点",
                "visual": "品牌色底文字头像",
                "css": True,
            },
            {
                "slug": "avatar-trigger",
                "subdir": "trigger",
                "label": "可编辑头像",
                "control": """            <a-avatar :size="40" trigger-type="button">
              <icon-avatar />
              <template #trigger-icon><icon-camera /></template>
            </a-avatar>""",
                "snippet": """<a-avatar :size="40" trigger-type="button">
  <icon-avatar />
  <template #trigger-icon><icon-camera /></template>
</a-avatar>""",
                "scene": "悬停显示更换头像入口。",
                "rule": "真 a-avatar trigger-type",
                "visual": "带相机触发条的头像",
                "css": True,
            },
            {
                "slug": "avatar-group",
                "subdir": "group",
                "label": "头像组",
                "control": """            <a-avatar-group :size="36" :max-count="3">
              <a-avatar :style="{ backgroundColor: 'rgb(var(--primary-6))' }">张</a-avatar>
              <a-avatar :style="{ backgroundColor: 'rgb(var(--cyan-6))' }">李</a-avatar>
              <a-avatar :style="{ backgroundColor: 'rgb(var(--warning-6))' }">王</a-avatar>
              <a-avatar :style="{ backgroundColor: 'rgb(var(--danger-6))' }">赵</a-avatar>
            </a-avatar-group>""",
                "snippet": """<a-avatar-group :size="36" :max-count="3">
  <a-avatar :style="{ backgroundColor: 'rgb(var(--primary-6))' }">张</a-avatar>
  <a-avatar :style="{ backgroundColor: 'rgb(var(--cyan-6))' }">李</a-avatar>
  <a-avatar :style="{ backgroundColor: 'rgb(var(--warning-6))' }">王</a-avatar>
  <a-avatar :style="{ backgroundColor: 'rgb(var(--danger-6))' }">赵</a-avatar>
</a-avatar-group>""",
                "scene": "多人协作叠放并截断多余。",
                "rule": "真 a-avatar-group",
                "visual": "叠放头像组，超出显示 +N",
                "css": True,
            },
        ],
        "member_css": """/* avatar-default 成员：与 Admin 基础样板同观感的尺寸与叠放 */
.wa-embed__stage .arco-avatar,
.wa-fam-card .arco-avatar {
  flex-shrink: 0;
}
.wa-embed__stage .arco-avatar .pro-fa-icon,
.wa-fam-card .arco-avatar .pro-fa-icon {
  font-size: 14px;
}
.wa-embed__stage .arco-avatar-group .arco-avatar:not(:first-child),
.wa-fam-card .arco-avatar-group .arco-avatar:not(:first-child) {
  margin-left: -8px;
}
""",
    },
    {
        "slug": "progress",
        "label": "进度条",
        "lead": "任务完成度展示，支持线形环形与成功警告危险状态。",
        "category": "feedback",
        "types": "default / circle / success / warning / danger",
        "setup": "          percent: api.ref(0.48),",
        "members": [
            {
                "slug": "progress-default",
                "subdir": "default",
                "label": "进度条",
                "control": '            <a-progress :percent="percent" :stroke-width="6" style="width:220px" />',
                "snippet": '<a-progress :percent="0.48" :stroke-width="6" />',
                "scene": "线形进度默认态。",
                "rule": "真 a-progress",
                "visual": "线形进度，描边 6px",
                "embed_setup": "        percent: ref(0.48),",
            },
            {
                "slug": "progress-circle",
                "subdir": "circle",
                "label": "环形进度条",
                "control": '            <a-progress type="circle" :percent="percent" :width="64" :stroke-width="6" :path-stroke-width="6" />',
                "snippet": '<a-progress type="circle" :percent="0.48" :width="64" :stroke-width="6" :path-stroke-width="6" />',
                "scene": "环形进度概览。",
                "rule": "真 a-progress type=circle",
                "visual": "环形进度 64px",
                "embed_setup": "        percent: ref(0.48),",
            },
            {
                "slug": "progress-success",
                "subdir": "success",
                "label": "成功进度条",
                "control": '            <a-progress :percent="0.72" status="success" :stroke-width="6" style="width:220px" />',
                "snippet": '<a-progress :percent="0.72" status="success" :stroke-width="6" />',
                "scene": "成功完成态进度。",
                "rule": "真 a-progress status=success",
                "visual": "成功色线形进度",
            },
            {
                "slug": "progress-warning",
                "subdir": "warning",
                "label": "警告进度条",
                "control": '            <a-progress :percent="0.36" status="warning" :stroke-width="6" style="width:220px" />',
                "snippet": '<a-progress :percent="0.36" status="warning" :stroke-width="6" />',
                "scene": "偏慢或风险进度。",
                "rule": "真 a-progress status=warning",
                "visual": "警告色线形进度",
            },
            {
                "slug": "progress-danger",
                "subdir": "danger",
                "label": "危险进度条",
                "control": '            <a-progress :percent="0.18" status="danger" :stroke-width="6" style="width:220px" />',
                "snippet": '<a-progress :percent="0.18" status="danger" :stroke-width="6" />',
                "scene": "失败或阻塞进度。",
                "rule": "真 a-progress status=danger",
                "visual": "危险色线形进度",
            },
        ],
    },
    {
        "slug": "alert",
        "label": "警告提示",
        "lead": "页内静态提示条，传达信息成功警告错误与可关闭说明。",
        "category": "feedback",
        "types": "default / success / warning / error / title",
        "setup": "",
        "members": [
            {
                "slug": "alert-default",
                "subdir": "default",
                "label": "警告提示",
                "control": """            <a-alert type="info" show-icon style="max-width:420px">
              内容已自动保存为草稿，可随时继续编辑。
            </a-alert>""",
                "snippet": """<a-alert type="info" show-icon>
  内容已自动保存为草稿，可随时继续编辑。
</a-alert>""",
                "scene": "信息类页内提示。",
                "rule": "真 a-alert",
                "visual": "通栏信息条，带图标",
            },
            {
                "slug": "alert-success",
                "subdir": "success",
                "label": "警告提示（成功）",
                "control": """            <a-alert type="success" show-icon style="max-width:420px">
              数据同步完成，共更新 128 条记录。
            </a-alert>""",
                "snippet": """<a-alert type="success" show-icon>
  数据同步完成，共更新 128 条记录。
</a-alert>""",
                "scene": "成功结果页内提示。",
                "rule": "真 a-alert type=success",
                "visual": "成功色提示条",
            },
            {
                "slug": "alert-warning",
                "subdir": "warning",
                "label": "警告提示（警告）",
                "control": """            <a-alert type="warning" show-icon style="max-width:420px">
              当前为演示环境，提交不会写入真实数据。
            </a-alert>""",
                "snippet": """<a-alert type="warning" show-icon>
  当前为演示环境，提交不会写入真实数据。
</a-alert>""",
                "scene": "风险或演示环境提醒。",
                "rule": "真 a-alert type=warning",
                "visual": "警告色提示条",
            },
            {
                "slug": "alert-error",
                "subdir": "error",
                "label": "警告提示（错误）",
                "control": """            <a-alert type="error" show-icon closable style="max-width:420px">
              部分字段校验未通过，请检查后重新提交。
            </a-alert>""",
                "snippet": """<a-alert type="error" show-icon closable>
  部分字段校验未通过，请检查后重新提交。
</a-alert>""",
                "scene": "可关闭的错误提示。",
                "rule": "真 a-alert type=error closable",
                "visual": "错误色提示条，可关闭",
            },
            {
                "slug": "alert-title-default",
                "subdir": "title-default",
                "label": "警告提示（带标题）",
                "control": """            <a-alert type="info" show-icon title="信息提示" style="max-width:420px">
              内容已自动保存为草稿，可随时继续编辑。
            </a-alert>""",
                "snippet": """<a-alert type="info" show-icon title="信息提示">
  内容已自动保存为草稿，可随时继续编辑。
</a-alert>""",
                "scene": "带标题的详细说明条。",
                "rule": "真 a-alert + title",
                "visual": "标题 + 正文提示条",
            },
        ],
    },
    {
        "slug": "message",
        "label": "全局提示",
        "lead": "操作后顶部轻提示，用于成功失败与普通消息即时反馈。",
        "category": "feedback",
        "types": "default / success / warning / error",
        "setup": """          showMessage(type) {
            const Msg = window.ArcoVue && ArcoVue.Message
            if (!Msg) return
            if (type === 'info') Msg.info('这是一条普通提示')
            if (type === 'success') Msg.success('操作成功')
            if (type === 'warning') Msg.warning('请注意相关风险')
            if (type === 'error') Msg.error('操作失败，请重试')
          },""",
        "setup_is_methods": True,
        "members": [
            {
                "slug": "message-default",
                "subdir": "default",
                "label": "全局提示",
                "control": '            <a-button type="outline" @click="showMessage(\'info\')">消息提示</a-button>',
                "snippet": """<a-button type="outline" @click="showMessage('info')">消息提示</a-button>
<!-- methods: ArcoVue.Message.info('这是一条普通提示') -->""",
                "scene": "触发普通信息轻提示。",
                "rule": "按钮触发 Message.info",
                "visual": "outline 触发按钮",
                "stage": True,
                "embed_methods": """      showMessage(type) {
        const Msg = window.ArcoVue && ArcoVue.Message
        if (Msg) Msg.info('这是一条普通提示')
      },""",
            },
            {
                "slug": "message-success",
                "subdir": "success",
                "label": "成功全局提示",
                "control": '            <a-button type="outline" status="success" @click="showMessage(\'success\')">成功提示</a-button>',
                "snippet": """<a-button type="outline" status="success" @click="showMessage('success')">成功提示</a-button>
<!-- methods: ArcoVue.Message.success('操作成功') -->""",
                "scene": "触发成功轻提示。",
                "rule": "按钮触发 Message.success",
                "visual": "成功色触发按钮",
                "stage": True,
                "embed_methods": """      showMessage() {
        const Msg = window.ArcoVue && ArcoVue.Message
        if (Msg) Msg.success('操作成功')
      },""",
            },
            {
                "slug": "message-warning",
                "subdir": "warning",
                "label": "警告全局提示",
                "control": '            <a-button type="outline" status="warning" @click="showMessage(\'warning\')">警告提示</a-button>',
                "snippet": """<a-button type="outline" status="warning" @click="showMessage('warning')">警告提示</a-button>
<!-- methods: ArcoVue.Message.warning('请注意相关风险') -->""",
                "scene": "触发警告轻提示。",
                "rule": "按钮触发 Message.warning",
                "visual": "警告色触发按钮",
                "stage": True,
                "embed_methods": """      showMessage() {
        const Msg = window.ArcoVue && ArcoVue.Message
        if (Msg) Msg.warning('请注意相关风险')
      },""",
            },
            {
                "slug": "message-error",
                "subdir": "error",
                "label": "错误全局提示",
                "control": '            <a-button type="outline" status="danger" @click="showMessage(\'error\')">错误提示</a-button>',
                "snippet": """<a-button type="outline" status="danger" @click="showMessage('error')">错误提示</a-button>
<!-- methods: ArcoVue.Message.error('操作失败，请重试') -->""",
                "scene": "触发错误轻提示。",
                "rule": "按钮触发 Message.error",
                "visual": "危险色触发按钮",
                "stage": True,
                "embed_methods": """      showMessage() {
        const Msg = window.ArcoVue && ArcoVue.Message
        if (Msg) Msg.error('操作失败，请重试')
      },""",
            },
        ],
    },
    {
        "slug": "notification",
        "label": "通知提醒",
        "lead": "带标题的右上角通知，用于待办汇总与系统级消息推送。",
        "category": "feedback",
        "types": "default",
        "setup": """          showNotification() {
            const N = window.ArcoVue && ArcoVue.Notification
            if (!N) return
            N.info({ title: '系统通知', content: '有 3 条待办事项需要处理' })
          },""",
        "setup_is_methods": True,
        "members": [
            {
                "slug": "notification-default",
                "subdir": "default",
                "label": "通知提醒",
                "control": '            <a-button type="primary" @click="showNotification">通知提醒</a-button>',
                "snippet": """<a-button type="primary" @click="showNotification">通知提醒</a-button>
<!-- methods: ArcoVue.Notification.info({ title, content }) -->""",
                "scene": "打开系统通知面板。",
                "rule": "按钮触发 Notification.info",
                "visual": "主按钮触发",
                "stage": True,
                "embed_methods": """      showNotification() {
        const N = window.ArcoVue && ArcoVue.Notification
        if (N) N.info({ title: '系统通知', content: '有 3 条待办事项需要处理' })
      },""",
            },
        ],
    },
    {
        "slug": "tooltip",
        "label": "文字提示",
        "lead": "悬停短说明，为按钮或图标补充一句话操作提示。",
        "category": "feedback",
        "types": "default",
        "setup": "",
        "members": [
            {
                "slug": "tooltip-default",
                "subdir": "default",
                "label": "文字提示",
                "control": """            <a-tooltip content="这是一段文字提示说明">
              <a-button>文字提示</a-button>
            </a-tooltip>""",
                "snippet": """<a-tooltip content="这是一段文字提示说明">
  <a-button>文字提示</a-button>
</a-tooltip>""",
                "scene": "悬停显示简短说明。",
                "rule": "真 a-tooltip 包裹触发器",
                "visual": "悬停气泡短文案",
                "stage": True,
            },
        ],
    },
    {
        "slug": "popover",
        "label": "气泡卡片",
        "lead": "点击或悬停展开说明卡片，可放额外说明与快捷操作。",
        "category": "feedback",
        "types": "default",
        "setup": "",
        "members": [
            {
                "slug": "popover-default",
                "subdir": "default",
                "label": "气泡卡片",
                "control": """            <a-popover title="气泡卡片">
              <a-button>气泡卡片</a-button>
              <template #content>
                <p style="margin:0">可用于展示额外说明或快捷操作。</p>
              </template>
            </a-popover>""",
                "snippet": """<a-popover title="气泡卡片">
  <a-button>气泡卡片</a-button>
  <template #content>
    <p style="margin:0">可用于展示额外说明或快捷操作。</p>
  </template>
</a-popover>""",
                "scene": "展开带标题的说明卡片。",
                "rule": "真 a-popover",
                "visual": "标题 + 内容气泡",
                "stage": True,
            },
        ],
    },
    {
        "slug": "modal",
        "label": "对话框",
        "lead": "操作确认与结果弹窗，覆盖信息成功警告错误与删除确认。",
        "category": "feedback",
        "types": "info / success / warning / error / confirm",
        "setup": """          showModal(type) {
            const Modal = window.ArcoVue && ArcoVue.Modal
            if (!Modal) return
            const base = { simple: true, titleAlign: 'start', width: 360 }
            const map = {
              info: { title: '信息提示', content: '该操作将同步最新配置，请确认后继续。' },
              success: { title: '操作成功', content: '数据已保存，可在列表中查看最新结果。' },
              warning: { title: '风险提示', content: '当前环境为演示数据，部分操作不会真正生效。' },
              error: { title: '操作失败', content: '提交失败，请检查网络或稍后重试。' },
            }
            if (type === 'confirm') {
              Modal.confirm({
                ...base,
                title: '确认删除',
                content: '删除后不可恢复，是否继续？',
                okText: '删除',
                cancelText: '取消',
                okButtonProps: { status: 'danger' },
                onOk: () => {
                  const Msg = window.ArcoVue && ArcoVue.Message
                  if (Msg) Msg.success('已删除')
                },
              })
              return
            }
            const fn = Modal[type]
            if (fn) fn({ ...base, ...map[type] })
          },""",
        "setup_is_methods": True,
        "members": [
            {
                "slug": "modal-info",
                "subdir": "info",
                "label": "信息对话框",
                "control": '            <a-button type="outline" @click="showModal(\'info\')">信息弹窗</a-button>',
                "snippet": """<a-button type="outline" @click="showModal('info')">信息弹窗</a-button>
<!-- Modal.info({ title, content }) -->""",
                "scene": "信息确认弹窗。",
                "rule": "按钮触发 Modal.info",
                "visual": "outline 触发按钮",
                "stage": True,
                "embed_methods": """      showModal() {
        const Modal = window.ArcoVue && ArcoVue.Modal
        if (Modal) Modal.info({ simple: true, titleAlign: 'start', width: 360, title: '信息提示', content: '该操作将同步最新配置，请确认后继续。' })
      },""",
            },
            {
                "slug": "modal-success",
                "subdir": "success",
                "label": "成功对话框",
                "control": '            <a-button type="outline" status="success" @click="showModal(\'success\')">成功弹窗</a-button>',
                "snippet": """<a-button type="outline" status="success" @click="showModal('success')">成功弹窗</a-button>
<!-- Modal.success({ title, content }) -->""",
                "scene": "成功结果弹窗。",
                "rule": "按钮触发 Modal.success",
                "visual": "成功色触发按钮",
                "stage": True,
                "embed_methods": """      showModal() {
        const Modal = window.ArcoVue && ArcoVue.Modal
        if (Modal) Modal.success({ simple: true, titleAlign: 'start', width: 360, title: '操作成功', content: '数据已保存，可在列表中查看最新结果。' })
      },""",
            },
            {
                "slug": "modal-warning",
                "subdir": "warning",
                "label": "警告对话框",
                "control": '            <a-button type="outline" status="warning" @click="showModal(\'warning\')">警告弹窗</a-button>',
                "snippet": """<a-button type="outline" status="warning" @click="showModal('warning')">警告弹窗</a-button>
<!-- Modal.warning({ title, content }) -->""",
                "scene": "风险提示弹窗。",
                "rule": "按钮触发 Modal.warning",
                "visual": "警告色触发按钮",
                "stage": True,
                "embed_methods": """      showModal() {
        const Modal = window.ArcoVue && ArcoVue.Modal
        if (Modal) Modal.warning({ simple: true, titleAlign: 'start', width: 360, title: '风险提示', content: '当前环境为演示数据，部分操作不会真正生效。' })
      },""",
            },
            {
                "slug": "modal-error",
                "subdir": "error",
                "label": "错误对话框",
                "control": '            <a-button type="outline" status="danger" @click="showModal(\'error\')">错误弹窗</a-button>',
                "snippet": """<a-button type="outline" status="danger" @click="showModal('error')">错误弹窗</a-button>
<!-- Modal.error({ title, content }) -->""",
                "scene": "失败结果弹窗。",
                "rule": "按钮触发 Modal.error",
                "visual": "危险色触发按钮",
                "stage": True,
                "embed_methods": """      showModal() {
        const Modal = window.ArcoVue && ArcoVue.Modal
        if (Modal) Modal.error({ simple: true, titleAlign: 'start', width: 360, title: '操作失败', content: '提交失败，请检查网络或稍后重试。' })
      },""",
            },
            {
                "slug": "modal-confirm",
                "subdir": "confirm",
                "label": "确认对话框",
                "control": '            <a-button type="primary" status="danger" @click="showModal(\'confirm\')">确认弹窗</a-button>',
                "snippet": """<a-button type="primary" status="danger" @click="showModal('confirm')">确认弹窗</a-button>
<!-- Modal.confirm({ title, content, okButtonProps }) -->""",
                "scene": "删除等不可逆确认。",
                "rule": "按钮触发 Modal.confirm",
                "visual": "危险主按钮触发",
                "stage": True,
                "embed_methods": """      showModal() {
        const Modal = window.ArcoVue && ArcoVue.Modal
        if (!Modal) return
        Modal.confirm({
          simple: true, titleAlign: 'start', width: 360,
          title: '确认删除', content: '删除后不可恢复，是否继续？',
          okText: '删除', cancelText: '取消',
          okButtonProps: { status: 'danger' },
          onOk: () => { const Msg = window.ArcoVue && ArcoVue.Message; if (Msg) Msg.success('已删除') },
        })
      },""",
            },
        ],
    },
    {
        "slug": "breadcrumb",
        "label": "面包屑",
        "lead": "层级路径导航，帮助用户定位当前页并快速回到上级。",
        "category": "navigation",
        "types": "default",
        "setup": "",
        "members": [
            {
                "slug": "breadcrumb-default",
                "subdir": "default",
                "label": "面包屑",
                "control": """            <div style="display:flex;align-items:center;gap:8px">
              <icon-home style="font-size:12px" />
              <a-breadcrumb>
                <a-breadcrumb-item>首页</a-breadcrumb-item>
                <a-breadcrumb-item>常用组件</a-breadcrumb-item>
                <a-breadcrumb-item>基础组件</a-breadcrumb-item>
              </a-breadcrumb>
            </div>""",
                "snippet": """<a-breadcrumb>
  <a-breadcrumb-item>首页</a-breadcrumb-item>
  <a-breadcrumb-item>常用组件</a-breadcrumb-item>
  <a-breadcrumb-item>基础组件</a-breadcrumb-item>
</a-breadcrumb>""",
                "scene": "展示三级页面路径。",
                "rule": "真 a-breadcrumb",
                "visual": "分隔路径文字，可配首页图标",
            },
        ],
    },
    # tabs 家族已迁至 _gen_nav_variants.py（default/capsule/line/card/vertical）；勿在此恢复 plain。
    {
        "slug": "pagination",
        "label": "分页",
        "lead": "列表翻页控件，支持精简页码与完整总量页容量切换。",
        "category": "navigation",
        "types": "default / full",
        "setup": "          current: api.ref(1),\n          currentFull: api.ref(1),",
        "members": [
            {
                "slug": "pagination-default",
                "subdir": "default",
                "label": "分页",
                "control": '            <a-pagination v-model:current="current" :total="86" :page-size="10" />',
                "snippet": '<a-pagination v-model:current="current" :total="86" :page-size="10" />',
                "scene": "精简页码翻页。",
                "rule": "真 a-pagination",
                "visual": "页码条",
                "embed_setup": "        current: ref(1),",
            },
            {
                "slug": "pagination-full",
                "subdir": "full",
                "label": "完整分页",
                "control": '            <a-pagination v-model:current="currentFull" :total="86" :page-size="10" show-total show-page-size />',
                "snippet": '<a-pagination v-model:current="current" :total="86" :page-size="10" show-total show-page-size />',
                "scene": "带总量与每页条数。",
                "rule": "真 a-pagination show-total/page-size",
                "visual": "完整分页工具条",
                "embed_setup": "        currentFull: ref(1),",
            },
        ],
    },
    {
        "slug": "spin",
        "label": "加载中",
        "lead": "区块级加载指示，用于列表或卡片等待数据返回时占位。",
        "category": "feedback",
        "types": "default",
        "setup": "",
        "members": [
            {
                "slug": "spin-default",
                "subdir": "default",
                "label": "加载中",
                "control": '            <a-spin tip="数据加载中..." />',
                "snippet": '<a-spin tip="数据加载中..." />',
                "scene": "展示加载中转圈与文案。",
                "rule": "真 a-spin",
                "visual": "居中转圈 + tip",
            },
        ],
    },
    {
        "slug": "divider",
        "label": "分割线",
        "lead": "内容区块分隔，可居中嵌入标题文字区分上下段落。",
        "category": "basic",
        "types": "default / with-text",
        "setup": "",
        "members": [
            {
                "slug": "divider-default",
                "subdir": "default",
                "label": "分割线",
                "control": """            <div style="width:280px">
              <p style="margin:0 0 8px;color:var(--wa-color-muted)">上方内容</p>
              <a-divider />
              <p style="margin:8px 0 0;color:var(--wa-color-muted)">下方内容</p>
            </div>""",
                "snippet": "<a-divider />",
                "scene": "水平分隔上下内容。",
                "rule": "真 a-divider",
                "visual": "细线分隔",
            },
            {
                "slug": "divider-with-text",
                "subdir": "with-text",
                "label": "文字分割线",
                "control": '            <a-divider orientation="center" style="width:280px">分割线</a-divider>',
                "snippet": '<a-divider orientation="center">分割线</a-divider>',
                "scene": "居中文字的分隔线。",
                "rule": "真 a-divider orientation=center",
                "visual": "线中嵌文字",
            },
        ],
    },
    {
        "slug": "empty",
        "label": "空状态",
        "lead": "无数据占位，用于列表筛选无结果或模块尚未产生内容时。",
        "category": "data-display",
        "types": "default",
        "setup": "",
        "members": [
            {
                "slug": "empty-default",
                "subdir": "default",
                "label": "空状态",
                "control": '            <a-empty description="暂无相关数据" />',
                "snippet": '<a-empty description="暂无相关数据" />',
                "scene": "展示暂无数据说明。",
                "rule": "真 a-empty",
                "visual": "插画 + 描述文案",
            },
        ],
    },
    {
        "slug": "dropdown",
        "label": "下拉菜单",
        "lead": "按钮触发的选项菜单，用于次要操作分组与快捷切换。",
        "category": "navigation",
        "types": "default",
        "setup": "",
        "members": [
            {
                "slug": "dropdown-default",
                "subdir": "default",
                "label": "下拉菜单",
                "control": """            <a-dropdown>
              <a-button>下拉按钮 <icon-down /></a-button>
              <template #content>
                <a-doption>选项一</a-doption>
                <a-doption>选项二</a-doption>
                <a-doption>选项三</a-doption>
              </template>
            </a-dropdown>""",
                "snippet": """<a-dropdown>
  <a-button>下拉按钮 <icon-down /></a-button>
  <template #content>
    <a-doption>选项一</a-doption>
    <a-doption>选项二</a-doption>
    <a-doption>选项三</a-doption>
  </template>
</a-dropdown>""",
                "scene": "展开三项下拉操作。",
                "rule": "真 a-dropdown + a-doption",
                "visual": "按钮 + 下拉面板",
                "stage": True,
            },
        ],
    },
    {
        "slug": "btn-outline",
        "label": "描边按钮",
        "lead": "次要描边操作按钮，用于取消、筛选与状态色描边动作。",
        "category": "basic",
        "types": "default / success / warning / danger / disabled / loading",
        "setup": "          loading: api.ref(false),\n          toggleLoading() { this.loading = true; setTimeout(() => { this.loading = false }, 1200) },",
        "setup_is_methods": True,
        "setup_mixed": True,
        "members": [
            {
                "slug": "btn-outline-default",
                "subdir": "default",
                "label": "描边按钮",
                "control": '            <a-button type="outline">描边按钮</a-button>',
                "snippet": '<a-button type="outline">描边按钮</a-button>',
                "scene": "默认描边次操作。",
                "rule": "真 a-button type=outline",
                "visual": "描边按钮",
                "stage": True,
            },
            {
                "slug": "btn-outline-success",
                "subdir": "success",
                "label": "成功描边按钮",
                "control": '            <a-button type="outline" status="success">成功</a-button>',
                "snippet": '<a-button type="outline" status="success">成功</a-button>',
                "scene": "成功色描边操作。",
                "rule": "真 a-button outline+success",
                "visual": "成功色描边",
                "stage": True,
            },
            {
                "slug": "btn-outline-warning",
                "subdir": "warning",
                "label": "警告描边按钮",
                "control": '            <a-button type="outline" status="warning">警告</a-button>',
                "snippet": '<a-button type="outline" status="warning">警告</a-button>',
                "scene": "警告色描边操作。",
                "rule": "真 a-button outline+warning",
                "visual": "警告色描边",
                "stage": True,
            },
            {
                "slug": "btn-outline-danger",
                "subdir": "danger",
                "label": "危险描边按钮",
                "control": '            <a-button type="outline" status="danger">危险</a-button>',
                "snippet": '<a-button type="outline" status="danger">危险</a-button>',
                "scene": "危险色描边操作。",
                "rule": "真 a-button outline+danger",
                "visual": "危险色描边",
                "stage": True,
            },
            {
                "slug": "btn-outline-disabled",
                "subdir": "disabled",
                "label": "禁用描边按钮",
                "control": '            <a-button type="outline" disabled>禁用</a-button>',
                "snippet": '<a-button type="outline" disabled>禁用</a-button>',
                "scene": "不可用描边按钮。",
                "rule": "真 a-button disabled",
                "visual": "禁用描边",
                "stage": True,
            },
            {
                "slug": "btn-outline-loading",
                "subdir": "loading",
                "label": "加载描边按钮",
                "control": '            <a-button type="outline" :loading="loading" @click="toggleLoading">{{ loading ? \'正在加载\' : \'触发加载\' }}</a-button>',
                "snippet": '<a-button type="outline" :loading="loading">正在加载</a-button>',
                "scene": "描边按钮正在加载。",
                "rule": "真 a-button loading",
                "visual": "描边 + loading",
                "stage": True,
                "embed_setup": "        loading: ref(true),",
            },
        ],
    },
    {
        "slug": "btn-dashed",
        "label": "虚线按钮",
        "lead": "虚线边框按钮，用于添加条目、可选操作等轻量入口。",
        "category": "basic",
        "types": "default / disabled",
        "setup": "",
        "members": [
            {
                "slug": "btn-dashed-default",
                "subdir": "default",
                "label": "虚线按钮",
                "control": '            <a-button type="dashed">虚线按钮</a-button>',
                "snippet": '<a-button type="dashed">虚线按钮</a-button>',
                "scene": "虚线边框次操作。",
                "rule": "真 a-button type=dashed",
                "visual": "虚线描边按钮",
                "stage": True,
            },
            {
                "slug": "btn-dashed-disabled",
                "subdir": "disabled",
                "label": "禁用虚线按钮",
                "control": '            <a-button type="dashed" disabled>禁用</a-button>',
                "snippet": '<a-button type="dashed" disabled>禁用</a-button>',
                "scene": "不可用虚线按钮。",
                "rule": "真 a-button dashed disabled",
                "visual": "禁用虚线按钮",
                "stage": True,
            },
        ],
    },
    {
        "slug": "btn-text",
        "label": "文字按钮",
        "lead": "无边框文字操作，用于行内链接式次要动作与表格操作列。",
        "category": "basic",
        "types": "default / disabled",
        "setup": "",
        "members": [
            {
                "slug": "btn-text-default",
                "subdir": "default",
                "label": "文字按钮",
                "control": '            <a-button type="text">文字按钮</a-button>',
                "snippet": '<a-button type="text">文字按钮</a-button>',
                "scene": "纯文字次操作。",
                "rule": "真 a-button type=text",
                "visual": "无边框文字按钮",
                "stage": True,
            },
            {
                "slug": "btn-text-disabled",
                "subdir": "disabled",
                "label": "禁用文字按钮",
                "control": '            <a-button type="text" disabled>禁用</a-button>',
                "snippet": '<a-button type="text" disabled>禁用</a-button>',
                "scene": "不可用文字按钮。",
                "rule": "真 a-button text disabled",
                "visual": "禁用文字按钮",
                "stage": True,
            },
        ],
    },
    {
        "slug": "btn-icon",
        "label": "图标按钮",
        "lead": "仅图标的圆形或方形按钮，用于工具栏搜索刷新与消息入口。",
        "category": "basic",
        "types": "circle / square / with-label",
        "setup": "",
        "members": [
            {
                "slug": "btn-icon",
                "subdir": "circle",
                "label": "圆形图标按钮",
                "control": """            <a-button type="primary" shape="circle">
              <template #icon><icon-search /></template>
            </a-button>""",
                "snippet": """<a-button type="primary" shape="circle">
  <template #icon><icon-search /></template>
</a-button>""",
                "scene": "圆形主色图标按钮。",
                "rule": "真 a-button shape=circle + icon",
                "visual": "圆形图标按钮",
                "stage": True,
            },
            {
                "slug": "btn-icon-square",
                "subdir": "square",
                "label": "方形图标按钮",
                "control": """            <a-button type="outline">
              <template #icon><icon-settings /></template>
            </a-button>""",
                "snippet": """<a-button type="outline">
  <template #icon><icon-settings /></template>
</a-button>""",
                "scene": "方形描边图标按钮。",
                "rule": "真 a-button + icon slot",
                "visual": "方形图标按钮",
                "stage": True,
            },
            {
                "slug": "btn-icon-with-label",
                "subdir": "with-label",
                "label": "带文案图标按钮",
                "control": """            <a-button type="primary">
              <template #icon><icon-plus /></template>
              新建
            </a-button>""",
                "snippet": """<a-button type="primary">
  <template #icon><icon-plus /></template>
  新建
</a-button>""",
                "scene": "图标加文案的主操作。",
                "rule": "真 a-button icon + 文案",
                "visual": "左图标右文案",
                "stage": True,
            },
        ],
    },
    # —— Arco supplements ——
    {
        "slug": "link",
        "label": "链接",
        "lead": "行内文字链接，用于跳转详情、外链与次要导航入口。",
        "category": "basic",
        "types": "default / hover / disabled",
        "setup": "",
        "members": [
            {
                "slug": "link-default",
                "subdir": "default",
                "label": "链接",
                "control": '            <a-link href="javascript:;">查看详情</a-link>',
                "snippet": '<a-link href="javascript:;">查看详情</a-link>',
                "scene": "默认文字链接。",
                "rule": "真 a-link",
                "visual": "主题色文字链接",
            },
            {
                "slug": "link-hover",
                "subdir": "hover",
                "label": "悬停下划线链接",
                "control": '            <a-link href="javascript:;" hoverable>悬停下划线</a-link>',
                "snippet": '<a-link href="javascript:;" hoverable>悬停下划线</a-link>',
                "scene": "悬停出现下划线。",
                "rule": "真 a-link hoverable",
                "visual": "悬停下划线链接",
            },
            {
                "slug": "link-disabled",
                "subdir": "disabled",
                "label": "禁用链接",
                "control": '            <a-link href="javascript:;" disabled>不可用</a-link>',
                "snippet": '<a-link href="javascript:;" disabled>不可用</a-link>',
                "scene": "不可点击链接。",
                "rule": "真 a-link disabled",
                "visual": "禁用链接",
            },
        ],
    },
    {
        "slug": "space",
        "label": "间距",
        "lead": "控件水平或换行间距容器，统一按钮组与标签组的间隙。",
        "category": "basic",
        "types": "default / wrap",
        "setup": "",
        "members": [
            {
                "slug": "space-default",
                "subdir": "default",
                "label": "间距",
                "control": """            <a-space>
              <a-button type="primary">主要</a-button>
              <a-button>次要</a-button>
              <a-button type="outline">描边</a-button>
            </a-space>""",
                "snippet": """<a-space>
  <a-button type="primary">主要</a-button>
  <a-button>次要</a-button>
  <a-button type="outline">描边</a-button>
</a-space>""",
                "scene": "水平等距按钮组。",
                "rule": "真 a-space",
                "visual": "水平间距",
                "stage": True,
            },
            {
                "slug": "space-wrap",
                "subdir": "wrap",
                "label": "换行间距",
                "control": """            <a-space wrap style="max-width:220px">
              <a-tag>标签一</a-tag>
              <a-tag>标签二</a-tag>
              <a-tag>标签三</a-tag>
              <a-tag>标签四</a-tag>
              <a-tag>标签五</a-tag>
            </a-space>""",
                "snippet": """<a-space wrap>
  <a-tag>标签一</a-tag>
  <a-tag>标签二</a-tag>
  <a-tag>标签三</a-tag>
</a-space>""",
                "scene": "窄宽度下自动换行。",
                "rule": "真 a-space wrap",
                "visual": "可换行间距",
            },
        ],
    },
    {
        "slug": "steps",
        "label": "步骤条",
        "lead": "多步流程导航，展示当前进度与已完成待办步骤。",
        "category": "navigation",
        "types": "default / dot",
        "setup": "          current: api.ref(2),",
        "members": [
            {
                "slug": "steps-default",
                "subdir": "default",
                "label": "步骤条",
                "control": """            <a-steps :current="current" style="max-width:480px">
              <a-step title="填写信息" description="基本资料" />
              <a-step title="确认配置" description="核对选项" />
              <a-step title="完成提交" description="等待结果" />
            </a-steps>""",
                "snippet": """<a-steps :current="2">
  <a-step title="填写信息" description="基本资料" />
  <a-step title="确认配置" description="核对选项" />
  <a-step title="完成提交" description="等待结果" />
</a-steps>""",
                "scene": "三步流程当前第二步。",
                "rule": "真 a-steps",
                "visual": "数字步骤条",
                "embed_setup": "        current: ref(2),",
            },
            {
                "slug": "steps-dot",
                "subdir": "dot",
                "label": "点状步骤条",
                "control": """            <a-steps :current="current" type="dot" style="max-width:480px">
              <a-step title="提交" />
              <a-step title="审核" />
              <a-step title="完成" />
            </a-steps>""",
                "snippet": """<a-steps :current="2" type="dot">
  <a-step title="提交" />
  <a-step title="审核" />
  <a-step title="完成" />
</a-steps>""",
                "scene": "点状精简步骤。",
                "rule": "真 a-steps type=dot",
                "visual": "点状步骤条",
                "embed_setup": "        current: ref(2),",
            },
        ],
    },
    {
        "slug": "popconfirm",
        "label": "气泡确认",
        "lead": "轻量二次确认，适合删除行内操作无需整页对话框。",
        "category": "feedback",
        "types": "default",
        "setup": """          onOk() {
            const Msg = window.ArcoVue && ArcoVue.Message
            if (Msg) Msg.success('已确认')
          },""",
        "setup_is_methods": True,
        "members": [
            {
                "slug": "popconfirm-default",
                "subdir": "default",
                "label": "气泡确认",
                "control": """            <a-popconfirm content="确认删除该条目？" @ok="onOk">
              <a-button type="outline" status="danger">删除</a-button>
            </a-popconfirm>""",
                "snippet": """<a-popconfirm content="确认删除该条目？" @ok="onOk">
  <a-button type="outline" status="danger">删除</a-button>
</a-popconfirm>""",
                "scene": "行内删除前确认。",
                "rule": "真 a-popconfirm",
                "visual": "气泡确认框",
                "stage": True,
                "embed_methods": """      onOk() {
        const Msg = window.ArcoVue && ArcoVue.Message
        if (Msg) Msg.success('已确认')
      },""",
            },
        ],
    },
    {
        "slug": "result",
        "label": "结果页",
        "lead": "流程结束态展示，覆盖成功失败与通用信息结果页块。",
        "category": "feedback",
        "types": "success / error / info / warning",
        "setup": "",
        "members": [
            {
                "slug": "result",
                "subdir": "success",
                "label": "成功结果页",
                "control": """            <a-result status="success" title="提交成功" subtitle="我们已收到你的申请，将尽快处理。">
              <template #extra>
                <a-space>
                  <a-button type="primary">返回列表</a-button>
                  <a-button>查看详情</a-button>
                </a-space>
              </template>
            </a-result>""",
                "snippet": """<a-result status="success" title="提交成功" subtitle="我们已收到你的申请，将尽快处理。">
  <template #extra>
    <a-space>
      <a-button type="primary">返回列表</a-button>
      <a-button>查看详情</a-button>
    </a-space>
  </template>
</a-result>""",
                "scene": "成功提交结果页。",
                "rule": "真 a-result status=success",
                "visual": "成功图标 + 标题 + 操作",
            },
            {
                "slug": "result-error",
                "subdir": "error",
                "label": "失败结果页",
                "control": '            <a-result status="error" title="提交失败" subtitle="请检查网络后重试。" />',
                "snippet": '<a-result status="error" title="提交失败" subtitle="请检查网络后重试。" />',
                "scene": "失败结果页。",
                "rule": "真 a-result status=error",
                "visual": "失败图标 + 标题",
            },
            {
                "slug": "result-info",
                "subdir": "default",
                "label": "信息结果页",
                "control": '            <a-result status="info" title="处理中" subtitle="预计需要几分钟，请稍候。" />',
                "snippet": '<a-result status="info" title="处理中" subtitle="预计需要几分钟，请稍候。" />',
                "scene": "信息态结果页。",
                "rule": "真 a-result status=info",
                "visual": "信息图标 + 标题",
            },
            {
                "slug": "result-warning",
                "subdir": "warning",
                "label": "警告结果页",
                "control": '            <a-result status="warning" title="权限不足" subtitle="请联系管理员开通相关权限。" />',
                "snippet": '<a-result status="warning" title="权限不足" subtitle="请联系管理员开通相关权限。" />',
                "scene": "警告态结果页。",
                "rule": "真 a-result status=warning",
                "visual": "警告图标 + 标题",
            },
        ],
    },
    {
        "slug": "skeleton",
        "label": "骨架屏",
        "lead": "按真实内容轮廓占位，覆盖头像文案、卡片、列表、网格与段落加载。",
        "category": "feedback",
        "types": "avatar / card / card-image / list / avatar-grid / paragraphs",
        "setup": "",
        "members": [
            {
                "slug": "skeleton-avatar",
                "subdir": "avatar",
                "label": "头像文案骨架",
                "control": """            <a-skeleton animation>
              <div class="wa-skel wa-skel-avatar" aria-busy="true">
                <a-skeleton-shape shape="circle" size="large"></a-skeleton-shape>
                <div class="wa-skel-avatar__text">
                  <a-skeleton-line :rows="1" :widths="['180px']" :line-height="16"></a-skeleton-line>
                  <a-skeleton-line :rows="1" :widths="['120px']" :line-height="14"></a-skeleton-line>
                </div>
                <span class="sr-only">加载中</span>
              </div>
            </a-skeleton>""",
                "snippet": """<a-skeleton animation>
  <div class="wa-skel wa-skel-avatar" aria-busy="true">
    <a-skeleton-shape shape="circle" size="large"></a-skeleton-shape>
    <div class="wa-skel-avatar__text">
      <a-skeleton-line :rows="1" :widths="['180px']" :line-height="16"></a-skeleton-line>
      <a-skeleton-line :rows="1" :widths="['120px']" :line-height="14"></a-skeleton-line>
    </div>
    <span class="sr-only">加载中</span>
  </div>
</a-skeleton>""",
                "scene": "圆形头像旁两行文案，用于资料或评论加载。",
                "rule": "真 a-skeleton + shape circle + line",
                "visual": "头像 + 长短两行",
            },
            {
                "slug": "skeleton-card",
                "subdir": "card",
                "label": "卡片骨架",
                "control": """            <a-skeleton animation>
              <div class="wa-skel wa-skel-card" aria-busy="true">
                <div class="wa-skel-avatar">
                  <a-skeleton-shape shape="circle" size="large"></a-skeleton-shape>
                  <div class="wa-skel-avatar__text">
                    <a-skeleton-line :rows="1" :widths="['70%']" :line-height="16"></a-skeleton-line>
                    <a-skeleton-line :rows="1" :widths="['45%']" :line-height="14"></a-skeleton-line>
                  </div>
                </div>
                <span class="sr-only">加载中</span>
              </div>
            </a-skeleton>""",
                "snippet": """<a-skeleton animation>
  <div class="wa-skel wa-skel-card" aria-busy="true">
    <div class="wa-skel-avatar">
      <a-skeleton-shape shape="circle" size="large"></a-skeleton-shape>
      <div class="wa-skel-avatar__text">
        <a-skeleton-line :rows="1" :widths="['70%']" :line-height="16"></a-skeleton-line>
        <a-skeleton-line :rows="1" :widths="['45%']" :line-height="14"></a-skeleton-line>
      </div>
    </div>
    <span class="sr-only">加载中</span>
  </div>
</a-skeleton>""",
                "scene": "卡片内头像与文案，用于看板与信息流。",
                "rule": "真 a-skeleton 包在卡片容器内",
                "visual": "描边卡片 + 头像文案",
            },
            {
                "slug": "skeleton-card-image",
                "subdir": "card-image",
                "label": "图文卡片骨架",
                "control": """            <a-skeleton animation>
              <div class="wa-skel wa-skel-card wa-skel-card--media" aria-busy="true">
                <a-skeleton-shape class="wa-skel-media" size="large"></a-skeleton-shape>
                <div class="wa-skel-card__body">
                  <div class="wa-skel-avatar">
                    <a-skeleton-shape shape="circle" size="small"></a-skeleton-shape>
                    <div class="wa-skel-avatar__text">
                      <a-skeleton-line :rows="1" :widths="['55%']" :line-height="14"></a-skeleton-line>
                      <a-skeleton-line :rows="1" :widths="['35%']" :line-height="12"></a-skeleton-line>
                    </div>
                  </div>
                </div>
                <span class="sr-only">加载中</span>
              </div>
            </a-skeleton>""",
                "snippet": """<a-skeleton animation>
  <div class="wa-skel wa-skel-card wa-skel-card--media" aria-busy="true">
    <a-skeleton-shape class="wa-skel-media" size="large"></a-skeleton-shape>
    <div class="wa-skel-card__body">
      <div class="wa-skel-avatar">
        <a-skeleton-shape shape="circle" size="small"></a-skeleton-shape>
        <div class="wa-skel-avatar__text">
          <a-skeleton-line :rows="1" :widths="['55%']" :line-height="14"></a-skeleton-line>
          <a-skeleton-line :rows="1" :widths="['35%']" :line-height="12"></a-skeleton-line>
        </div>
      </div>
    </div>
    <span class="sr-only">加载中</span>
  </div>
</a-skeleton>""",
                "scene": "16:9 封面加作者行，用于博客或商品网格。",
                "rule": "真 a-skeleton；封面用 shape + aspect-ratio",
                "visual": "封面区 + 作者头像行",
            },
            {
                "slug": "skeleton-list",
                "subdir": "list",
                "label": "列表骨架",
                "control": """            <a-skeleton animation>
              <div class="wa-skel wa-skel-list" aria-busy="true">
                <div class="wa-skel-list__row" v-for="n in 4" :key="n">
                  <a-skeleton-shape shape="circle" size="small"></a-skeleton-shape>
                  <div class="wa-skel-list__main">
                    <a-skeleton-line :rows="1" :widths="[n % 2 ? '72%' : '58%']" :line-height="14"></a-skeleton-line>
                  </div>
                  <div class="wa-skel-list__meta">
                    <a-skeleton-line :rows="1" :widths="['100%']" :line-height="14"></a-skeleton-line>
                  </div>
                </div>
                <span class="sr-only">加载中</span>
              </div>
            </a-skeleton>""",
                "snippet": """<a-skeleton animation>
  <div class="wa-skel wa-skel-list" aria-busy="true">
    <div class="wa-skel-list__row" v-for="n in 4" :key="n">
      <a-skeleton-shape shape="circle" size="small"></a-skeleton-shape>
      <div class="wa-skel-list__main">
        <a-skeleton-line :rows="1" :widths="[n % 2 ? '72%' : '58%']" :line-height="14"></a-skeleton-line>
      </div>
      <div class="wa-skel-list__meta">
        <a-skeleton-line :rows="1" :widths="['100%']" :line-height="14"></a-skeleton-line>
      </div>
    </div>
    <span class="sr-only">加载中</span>
  </div>
</a-skeleton>""",
                "scene": "多行头像 + 主文案 + 右侧短值，用于用户或流水列表。",
                "rule": "真 a-skeleton 多行列表轮廓",
                "visual": "四行列表骨架",
            },
            {
                "slug": "skeleton-avatar-grid",
                "subdir": "avatar-grid",
                "label": "头像网格骨架",
                "control": """            <a-skeleton animation>
              <div class="wa-skel wa-skel-grid" aria-busy="true">
                <div class="wa-skel-grid__title">
                  <a-skeleton-line :rows="1" :widths="['100%']" :line-height="16"></a-skeleton-line>
                </div>
                <div class="wa-skel-grid__row">
                  <a-skeleton-shape v-for="n in 4" :key="'a'+n" shape="circle" size="large"></a-skeleton-shape>
                </div>
                <div class="wa-skel-grid__row">
                  <a-skeleton-shape v-for="n in 4" :key="'b'+n" shape="circle" size="large"></a-skeleton-shape>
                </div>
                <span class="sr-only">加载中</span>
              </div>
            </a-skeleton>""",
                "snippet": """<a-skeleton animation>
  <div class="wa-skel wa-skel-grid" aria-busy="true">
    <div class="wa-skel-grid__title">
      <a-skeleton-line :rows="1" :widths="['100%']" :line-height="16"></a-skeleton-line>
    </div>
    <div class="wa-skel-grid__row">
      <a-skeleton-shape v-for="n in 4" :key="'a'+n" shape="circle" size="large"></a-skeleton-shape>
    </div>
    <div class="wa-skel-grid__row">
      <a-skeleton-shape v-for="n in 4" :key="'b'+n" shape="circle" size="large"></a-skeleton-shape>
    </div>
    <span class="sr-only">加载中</span>
  </div>
</a-skeleton>""",
                "scene": "标题条加多行圆形占位，用于团队成员或应用图标。",
                "rule": "真 a-skeleton shape circle 网格",
                "visual": "标题 + 两行圆形",
            },
            {
                "slug": "skeleton-paragraphs",
                "subdir": "paragraphs",
                "label": "段落骨架",
                "control": """            <a-skeleton animation>
              <div class="wa-skel wa-skel-paras" aria-busy="true">
                <div class="wa-skel-paras__block">
                  <a-skeleton-line :rows="3" :widths="['100%', '92%', '68%']" :line-height="14" :line-spacing="10"></a-skeleton-line>
                </div>
                <div class="wa-skel-paras__block">
                  <a-skeleton-line :rows="3" :widths="['100%', '86%', '54%']" :line-height="14" :line-spacing="10"></a-skeleton-line>
                </div>
                <span class="sr-only">加载中</span>
              </div>
            </a-skeleton>""",
                "snippet": """<a-skeleton animation>
  <div class="wa-skel wa-skel-paras" aria-busy="true">
    <div class="wa-skel-paras__block">
      <a-skeleton-line :rows="3" :widths="['100%', '92%', '68%']" :line-height="14" :line-spacing="10"></a-skeleton-line>
    </div>
    <div class="wa-skel-paras__block">
      <a-skeleton-line :rows="3" :widths="['100%', '86%', '54%']" :line-height="14" :line-spacing="10"></a-skeleton-line>
    </div>
    <span class="sr-only">加载中</span>
  </div>
</a-skeleton>""",
                "scene": "多段不等宽灰条，贴近真实正文排版。",
                "rule": "真 a-skeleton-line 分段不等宽",
                "visual": "两段长短交错灰条",
            },
        ],
    },
    {
        "slug": "timeline",
        "label": "时间轴",
        "lead": "按时间排列事件节点，用于操作日志与流程进展回顾。",
        "category": "data-display",
        "types": "default",
        "setup": "",
        "members": [
            {
                "slug": "timeline-default",
                "subdir": "default",
                "label": "时间轴",
                "control": """            <a-timeline style="max-width:320px;padding-top:8px">
              <a-timeline-item label="09:00">创建项目</a-timeline-item>
              <a-timeline-item label="11:30">提交审核</a-timeline-item>
              <a-timeline-item label="14:00" line-type="dashed">等待确认</a-timeline-item>
            </a-timeline>""",
                "snippet": """<a-timeline>
  <a-timeline-item label="09:00">创建项目</a-timeline-item>
  <a-timeline-item label="11:30">提交审核</a-timeline-item>
  <a-timeline-item label="14:00" line-type="dashed">等待确认</a-timeline-item>
</a-timeline>""",
                "scene": "三节点操作时间线。",
                "rule": "真 a-timeline",
                "visual": "竖向时间轴",
            },
        ],
    },
    {
        "slug": "descriptions",
        "label": "描述列表",
        "lead": "键值对信息展示，适合详情页基本信息与只读字段排版。",
        "category": "data-display",
        "types": "default / bordered",
        "setup": "",
        "members": [
            {
                "slug": "descriptions-default",
                "subdir": "default",
                "label": "描述列表",
                "control": """            <a-descriptions :column="1" style="max-width:360px" title="基本信息">
              <a-descriptions-item label="名称">演示项目</a-descriptions-item>
              <a-descriptions-item label="负责人">李明</a-descriptions-item>
              <a-descriptions-item label="状态">进行中</a-descriptions-item>
            </a-descriptions>""",
                "snippet": """<a-descriptions :column="1" title="基本信息">
  <a-descriptions-item label="名称">演示项目</a-descriptions-item>
  <a-descriptions-item label="负责人">李明</a-descriptions-item>
  <a-descriptions-item label="状态">进行中</a-descriptions-item>
</a-descriptions>""",
                "scene": "单列只读详情。",
                "rule": "真 a-descriptions",
                "visual": "标签 + 内容列",
            },
            {
                "slug": "descriptions-bordered",
                "subdir": "bordered",
                "label": "表格型描述列表",
                "control": """            <a-descriptions :column="2" bordered style="max-width:480px" title="订单信息">
              <a-descriptions-item label="订单号">VP-20260322</a-descriptions-item>
              <a-descriptions-item label="金额">¥128.00</a-descriptions-item>
              <a-descriptions-item label="支付方式">支付宝</a-descriptions-item>
              <a-descriptions-item label="状态">已支付</a-descriptions-item>
            </a-descriptions>""",
                "snippet": """<a-descriptions :column="2" bordered title="订单信息">
  <a-descriptions-item label="订单号">VP-20260322</a-descriptions-item>
  <a-descriptions-item label="金额">¥128.00</a-descriptions-item>
  <a-descriptions-item label="支付方式">支付宝</a-descriptions-item>
  <a-descriptions-item label="状态">已支付</a-descriptions-item>
</a-descriptions>""",
                "scene": "带边框双列详情。",
                "rule": "真 a-descriptions bordered",
                "visual": "表格化描述列表",
            },
        ],
    },
    {
        "slug": "collapse",
        "label": "折叠面板",
        "lead": "可展开收起的内容分组，适合 FAQ 长说明与分区配置。",
        "category": "data-display",
        "types": "default / accordion",
        "setup": "          activeKey: api.ref(['1']),",
        "members": [
            {
                "slug": "collapse-default",
                "subdir": "default",
                "label": "折叠面板",
                "control": """            <a-collapse v-model:active-key="activeKey" style="max-width:420px">
              <a-collapse-item header="基本说明" key="1">这里是可展开的详细说明内容。</a-collapse-item>
              <a-collapse-item header="进阶配置" key="2">进阶选项与注意事项写在这里。</a-collapse-item>
            </a-collapse>""",
                "snippet": """<a-collapse v-model:active-key="activeKey">
  <a-collapse-item header="基本说明" key="1">这里是可展开的详细说明内容。</a-collapse-item>
  <a-collapse-item header="进阶配置" key="2">进阶选项与注意事项写在这里。</a-collapse-item>
</a-collapse>""",
                "scene": "可多开折叠分组。",
                "rule": "真 a-collapse",
                "visual": "手风琴面板头",
                "embed_setup": "        activeKey: ref(['1']),",
            },
            {
                "slug": "collapse-accordion",
                "subdir": "accordion",
                "label": "手风琴折叠面板",
                "control": """            <a-collapse v-model:active-key="activeKey" accordion style="max-width:420px">
              <a-collapse-item header="问题一" key="1">答案一内容。</a-collapse-item>
              <a-collapse-item header="问题二" key="2">答案二内容。</a-collapse-item>
            </a-collapse>""",
                "snippet": """<a-collapse v-model:active-key="activeKey" accordion>
  <a-collapse-item header="问题一" key="1">答案一内容。</a-collapse-item>
  <a-collapse-item header="问题二" key="2">答案二内容。</a-collapse-item>
</a-collapse>""",
                "scene": "同时仅展开一项。",
                "rule": "真 a-collapse accordion",
                "visual": "手风琴互斥展开",
                "embed_setup": "        activeKey: ref('1'),",
            },
        ],
    },
    {
        "slug": "drawer",
        "label": "抽屉",
        "lead": "侧滑面板承载详情或表单，不打断主列表上下文浏览。",
        "category": "feedback",
        "types": "default",
        "setup": "          visible: api.ref(false),",
        "members": [
            {
                "slug": "drawer-default",
                "subdir": "default",
                "label": "抽屉",
                "control": """            <a-button type="primary" @click="visible = true">打开抽屉</a-button>
            <a-drawer v-model:visible="visible" title="详情" :width="360">
              <p>在此展示详情内容或表单项。</p>
            </a-drawer>""",
                "snippet": """<a-button type="primary" @click="visible = true">打开抽屉</a-button>
<a-drawer v-model:visible="visible" title="详情" :width="360">
  <p>在此展示详情内容或表单项。</p>
</a-drawer>""",
                "scene": "右侧滑出详情抽屉。",
                "rule": "真 a-drawer",
                "visual": "侧滑面板 360px",
                "stage": True,
                "embed_setup": "        visible: ref(false),",
            },
        ],
    },
    {
        "slug": "statistic",
        "label": "统计数值",
        "lead": "强调关键指标数字，用于概览卡、仪表盘与转化结果展示。",
        "category": "data-display",
        "types": "default / prefix",
        "setup": "",
        "members": [
            {
                "slug": "statistic-default",
                "subdir": "default",
                "label": "统计数值",
                "control": '            <a-statistic title="访问量" :value="9280" />',
                "snippet": '<a-statistic title="访问量" :value="9280" />',
                "scene": "展示带标题的关键数字。",
                "rule": "真 a-statistic",
                "visual": "标题 + 大号数字",
            },
            {
                "slug": "statistic-prefix",
                "subdir": "prefix",
                "label": "前缀统计数值",
                "control": '            <a-statistic title="成交额" :value="2680" :precision="2" :prefix="\'¥\'" />',
                "snippet": """<a-statistic title="成交额" :value="2680" :precision="2" prefix="¥" />""",
                "scene": "带货币前缀的金额。",
                "rule": "真 a-statistic prefix",
                "visual": "前缀 + 小数金额",
            },
        ],
    },
]


def embed_js(member: dict) -> str:
    setup = member.get("embed_setup") or ""
    methods = member.get("embed_methods") or ""
    if methods and setup:
        return f""";(function () {{
  const {{ ref }} = Vue
  WebArco.mount('#app', {{
    setup() {{
      return {{
{setup}
      }}
    }},
    methods: {{
{methods}
    }},
  }})
}})()
"""
    if methods:
        return f""";(function () {{
  WebArco.mount('#app', {{
    methods: {{
{methods}
    }},
  }})
}})()
"""
    if setup:
        return f""";(function () {{
  const {{ ref }} = Vue
  WebArco.mount('#app', {{
    setup() {{
      return {{
{setup}
      }}
    }},
  }})
}})()
"""
    return """;(function () {
  WebArco.mount('#app', {})
})()
"""


def family_index(fam: dict) -> str:
    cards = []
    for m in fam["members"]:
        stage = bool(m.get("stage"))
        cards.append(card_html(m["slug"], m["label"], m["control"], stage=stage))
    cards_html = "\n".join(cards)
    extra = fam.get("extra_css_family") or ""
    # WA_FAMILY setup
    setup_body = fam.get("setup") or ""
    setup_is_methods = fam.get("setup_is_methods")
    setup_mixed = fam.get("setup_mixed")
    member_slugs = ", ".join(f"'{m['slug']}'" for m in fam["members"])

    if setup_mixed:
        # refs + methods together via setup returning methods awkwardly —
        # use setup with refs and attach methods on returned object via family.js?
        # family.js only merges setup() return into mount data.
        # For loading toggle, put everything in setup returning refs + functions.
        wa_setup = f"""      setup: function (api) {{
        const loading = api.ref(false)
        return {{
          loading,
          toggleLoading() {{
            loading.value = true
            setTimeout(() => {{ loading.value = false }}, 1200)
          }},
        }}
      }},"""
    elif setup_is_methods and setup_body.strip():
        # Convert methods into setup-returned functions
        wa_setup = f"""      setup: function (api) {{
        return {{
{setup_body}
        }}
      }},"""
    elif setup_body.strip():
        wa_setup = f"""      setup: function (api) {{
        return {{
{setup_body}
        }}
      }},"""
    else:
        wa_setup = ""

    return f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <script src="../../assets/common/js/theme.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{fam['label']} · 家族对照</title>
  <link rel="stylesheet" href="../../vendor/arco/css/arco.css" />
  <link rel="stylesheet" href="../../assets/common/css/chrome.css" />
  <link rel="stylesheet" href="../../assets/common/css/global.css" />
  <link rel="stylesheet" href="../../vendor/fontawesome/css/all.min.css" />
  <link rel="stylesheet" href="../../assets/common/css/fa-icons.css" />
  <link rel="stylesheet" href="../../assets/common/css/components.css" />
  <link rel="stylesheet" href="../index.css" />
{extra}</head>
<body>
  <div id="app" v-cloak>
    <section class="wa-fam-section wa-fam-fade-in" data-family="{fam['slug']}">
      <div class="wa-fam-section__inner">
        <header class="wa-fam-head">
          <p class="wa-fam-kicker">{fam['slug']}</p>
          <h1 class="wa-fam-title">{fam['label']}</h1>
          <p class="wa-fam-lead">{fam['lead']}</p>
          <p class="wa-fam-lead">组件类型：{fam['types']}</p>
        </header>

        <div class="wa-fam-grid">
{cards_html}
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
      id: '{fam['slug']}',
      members: [{member_slugs}],
{wa_setup}
    }}
  </script>
  <script src="../copy-prompt.js"></script>
  <script src="../family.js"></script>
</body>
</html>
"""


def catalog_entries(fam: dict) -> tuple[list-default[dict], dict]:
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
            css_text = fam.get("member_css") or "/* member styles */\n"
            write(sub / "component.css", css_text)
        write(
            sub / "index.html",
            MEMBER_HTML.format(
                label=m["label"],
                slug=m["slug"],
                control=m["control"],
                extra_css=extra_css,
            ),
        )
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
    # placeholder inline prompts (sync-prompts will overwrite)
    write(fam_dir / "prompts.inline.js", "window.WA_FAMILY_PROMPTS = {};\n")


def update_catalog(new_comps: list-default[dict], new_families: list-default[dict]) -> None:
    data = load_catalog()
    existing_slugs = {c["slug"] for c in data.get("components") or []}
    existing_fams = {f["slug"] for f in data.get("families") or []}

    added_c = 0
    for c in new_comps:
        if c["slug"] in existing_slugs:
            # replace
            data["components"] = [x for x in data["components"] if x["slug"] != c["slug"]]
        data["components"].append(c)
        added_c += 1

    for f in new_families:
        if f["slug"] in existing_fams:
            data["families"] = [x for x in data["families"] if x["slug"] != f["slug"]]
        data["families"].append(f)

    # bump patch version
    ver = data.get("version") or "0.8.0"
    parts = ver.split(".")
    if len(parts) == 3 and parts[2].isdigit():
        parts[2] = str(int(parts[2]) + 1)
        data["version"] = ".".join(parts)

    save_catalog(data)
    print(f"catalog: +{added_c} components, +{len(new_families)} families, version={data['version']}")


def main() -> None:
    all_comps: list-default[dict] = []
    all_fams: list-default[dict] = []
    for fam in FAMILIES:
        generate_family(fam)
        comps, fmeta = catalog_entries(fam)
        all_comps.extend(comps)
        all_fams.append(fmeta)
        print(f"generated {fam['slug']} ({len(fam['members'])} members)")
    update_catalog(all_comps, all_fams)
    print("done. next: python scripts/sync-prompts.py && python scripts/check-family-leads.py")


if __name__ == "__main__":
    main()
