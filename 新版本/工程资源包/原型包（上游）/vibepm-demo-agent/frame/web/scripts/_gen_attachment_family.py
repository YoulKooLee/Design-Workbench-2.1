# -*- coding: utf-8 -*-
"""Polish attachment family to match shadcnuikit.com/components/attachment (5 variants).

Run from frame/web:
  python scripts/_gen_attachment_family.py
  python scripts/sync-prompts.py attachment
"""
from __future__ import annotations

from catalog_io import load_catalog, save_catalog

import json
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
COMP = ROOT / "components" / "attachment"
CATALOG = ROOT / "_meta" / "config.json"
FAMILY = "attachment"
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

# Local SVG photo placeholders (no CDN) — soft office tones matching reference gallery
SVG_PH = {
    "1": (
        "data:image/svg+xml,"
        "%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240' viewBox='0 0 240 240'%3E"
        "%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E"
        "%3Cstop stop-color='%23d6cfc4'/%3E%3Cstop offset='1' stop-color='%239aab9c'/%3E%3C/linearGradient%3E%3C/defs%3E"
        "%3Crect width='240' height='240' fill='url(%23g)'/%3E"
        "%3Crect x='28' y='48' width='120' height='80' rx='4' fill='%23f5f1ea' opacity='.55'/%3E"
        "%3Crect x='100' y='110' width='90' height='70' rx='4' fill='%23c9b8a0' opacity='.45'/%3E"
        "%3C/svg%3E"
    ),
    "2": (
        "data:image/svg+xml,"
        "%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240' viewBox='0 0 240 240'%3E"
        "%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='0' y2='1'%3E"
        "%3Cstop stop-color='%23e8e2d8'/%3E%3Cstop offset='1' stop-color='%23b7a994'/%3E%3C/linearGradient%3E%3C/defs%3E"
        "%3Crect width='240' height='240' fill='url(%23g)'/%3E"
        "%3Crect x='40' y='70' width='160' height='10' rx='2' fill='%23fff' opacity='.5'/%3E"
        "%3Crect x='40' y='95' width='120' height='8' rx='2' fill='%23fff' opacity='.35'/%3E"
        "%3Crect x='40' y='130' width='160' height='60' rx='6' fill='%23a89880' opacity='.35'/%3E"
        "%3C/svg%3E"
    ),
    "3": (
        "data:image/svg+xml,"
        "%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240' viewBox='0 0 240 240'%3E"
        "%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='1' x2='1' y2='0'%3E"
        "%3Cstop stop-color='%23cfd5d0'/%3E%3Cstop offset='1' stop-color='%238f9e96'/%3E%3C/linearGradient%3E%3C/defs%3E"
        "%3Crect width='240' height='240' fill='url(%23g)'/%3E"
        "%3Ccircle cx='180' cy='50' r='28' fill='%23fff' opacity='.25'/%3E"
        "%3Crect x='30' y='100' width='100' height='90' rx='4' fill='%23eef1ef' opacity='.4'/%3E"
        "%3C/svg%3E"
    ),
}

CSS = """/* attachment — aligned to shadcnuikit attachment demos */
.wa-attach-stack {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 100%;
}

.wa-attach-row {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: stretch;
  gap: 12px;
  width: 100%;
  max-width: 100%;
}

/* —— horizontal file card —— */
.wa-attach {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 100%;
  min-height: 58px;
  padding: 12px 14px;
  border: 1px solid var(--color-border-2);
  border-radius: 16px;
  background: var(--color-bg-2);
  box-sizing: border-box;
}

.wa-attach--idle {
  border-style: dashed;
  border-color: var(--color-border-3);
  background: var(--color-fill-1);
}

.wa-attach--error {
  border-color: color-mix(in srgb, rgb(var(--danger-6)) 55%, var(--color-border-2));
  background: color-mix(in srgb, rgb(var(--danger-1)) 65%, var(--color-bg-2));
}

.wa-attach--done .wa-attach__media {
  color: rgb(var(--success-6));
  background: color-mix(in srgb, rgb(var(--success-1)) 80%, var(--color-fill-2));
}

.wa-attach--sm {
  min-height: 48px;
  padding: 8px 12px;
  gap: 10px;
  border-radius: 14px;
}

.wa-attach--sm .wa-attach__title {
  font-size: 12px;
}

.wa-attach--sm .wa-attach__desc {
  font-size: 11px;
}

.wa-attach--xs {
  min-height: 36px;
  padding: 6px 10px;
  gap: 8px;
  border-radius: 12px;
}

.wa-attach--xs .wa-attach__title {
  font-size: 12px;
}

.wa-attach--xs .wa-attach__desc {
  display: none;
}

.wa-attach__media {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: var(--color-fill-2);
  color: var(--color-text-2);
  overflow: hidden;
}

.wa-attach--sm .wa-attach__media {
  width: 32px;
  height: 32px;
  border-radius: 8px;
}

.wa-attach--xs .wa-attach__media {
  width: 24px;
  height: 24px;
  border-radius: 6px;
}

.wa-attach__media--image {
  padding: 0;
  background: var(--color-fill-1);
}

.wa-attach__media--image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.wa-attach__media .arco-spin {
  color: inherit;
}

.wa-attach__body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.wa-attach__title {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-1);
  line-height: 1.35;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.wa-attach--uploading .wa-attach__title,
.wa-attach--processing .wa-attach__title {
  background: linear-gradient(90deg, var(--color-text-1) 40%, var(--color-text-3) 50%, var(--color-text-1) 60%);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: wa-attach-shimmer 1.6s linear infinite;
}

@keyframes wa-attach-shimmer {
  0% { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}

.wa-attach__desc {
  font-size: 12px;
  color: var(--color-text-3);
  line-height: 1.35;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.wa-attach--error .wa-attach__desc {
  color: rgb(var(--danger-6));
}

.wa-attach__actions {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 0;
  margin-left: 4px;
}

.wa-attach__actions .arco-btn {
  width: 28px;
  height: 28px;
  padding: 0;
  color: var(--color-text-3);
}

.wa-attach__actions .arco-btn:hover {
  color: var(--color-text-1);
  background: var(--color-fill-2);
}

/* sizes / stacks fill stage */
.wa-fam-section[data-family="attachment"] .wa-fam-card[data-slug="attachment-sizes"] .wa-attach-stack {
  gap: 12px;
  width: 100%;
  max-width: 100%;
}

/* row (legacy): still full-width children when used */
.wa-attach-row > .wa-attach {
  flex: 1 1 100%;
  width: 100%;
  min-width: 0;
  max-width: 100%;
}

/* —— vertical image tile (gallery) —— */
.wa-attach-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  width: 100%;
}

.wa-attach-tile {
  flex: 0 0 auto;
  width: 96px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 8px;
  border: 1px solid var(--color-border-2);
  border-radius: 12px;
  background: var(--color-bg-2);
  box-sizing: border-box;
}

.wa-attach-tile__media {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  background: var(--color-fill-2);
  border: 1px solid var(--color-border-3);
  box-sizing: border-box;
}

.wa-attach-tile__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.wa-attach-tile__x {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 999px;
  background: color-mix(in srgb, #000 45%, transparent);
  color: #fff;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.15s ease;
}

.wa-attach-tile:hover .wa-attach-tile__x {
  opacity: 1;
}

.wa-attach-tile__name {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-1);
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.wa-attach-tile__meta {
  font-size: 11px;
  color: var(--color-text-3);
  line-height: 1.3;
  margin-top: -4px;
}

/* —— group: single column —— */
.wa-attach-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 100%;
}

.wa-attach-group .wa-attach {
  flex: none;
  width: 100%;
  max-width: 100%;
  min-width: 0;
}

.wa-attach-group .wa-attach__media--image {
  border: 1px solid var(--color-border-3);
}

.wa-fam-section[data-family="attachment"] .wa-fam-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: start;
}

.wa-fam-section[data-family="attachment"] .wa-fam-card__stage {
  width: 100%;
  justify-content: flex-start;
  align-items: stretch;
}

.wa-fam-section[data-family="attachment"] .wa-fam-card__stage > .wa-attach-stack,
.wa-fam-section[data-family="attachment"] .wa-fam-card__stage > .wa-attach-row,
.wa-fam-section[data-family="attachment"] .wa-fam-card__stage > .wa-attach-gallery,
.wa-fam-section[data-family="attachment"] .wa-fam-card__stage > .wa-attach-group {
  width: 100%;
  max-width: 100%;
}

body.wa-preview-embed .wa-preview-stage[data-slug^="attachment-"].wa-embed {
  width: min(640px, calc(100% - 32px));
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


def card(
    *,
    name: str,
    desc: str,
    state: str = "",
    size: str = "",
    icon: str = "icon-file",
    media: str = "icon",
    img: str = "",
    actions: str = "remove",
) -> str:
    cls = ["wa-attach"]
    if state:
        cls.append(f"wa-attach--{state}")
    if size:
        cls.append(f"wa-attach--{size}")
    class_attr = " ".join(cls)

    if media == "image":
        media_html = (
            f'    <div class="wa-attach__media wa-attach__media--image">'
            f'<img src="{img}" alt="" /></div>'
        )
    elif media == "spin":
        media_html = '    <div class="wa-attach__media"><a-spin :size="16"></a-spin></div>'
    elif media == "check":
        media_html = (
            '    <div class="wa-attach__media"><icon-check-circle :size="16"></icon-check-circle></div>'
        )
    elif media == "warn":
        media_html = (
            '    <div class="wa-attach__media"><icon-exclamation-circle :size="16"></icon-exclamation-circle></div>'
        )
    elif media == "clock":
        media_html = '    <div class="wa-attach__media"><icon-clock-circle :size="16"></icon-clock-circle></div>'
    else:
        media_html = f'    <div class="wa-attach__media"><{icon} :size="16"></{icon}></div>'

    act = []
    if "retry" in actions:
        act.append(
            '      <a-button type="text" size="mini" aria-label="重试">'
            "<icon-refresh :size=\"12\"></icon-refresh></a-button>"
        )
    if "cancel" in actions or "remove" in actions:
        label = "取消" if "cancel" in actions else "移除"
        act.append(
            f'      <a-button type="text" size="mini" aria-label="{label}">'
            "<icon-close :size=\"12\"></icon-close></a-button>"
        )
    actions_html = (
        '    <div class="wa-attach__actions">\n' + "\n".join(act) + "\n    </div>"
        if act
        else ""
    )

    return f"""  <div class="{class_attr}">
{media_html}
    <div class="wa-attach__body">
      <div class="wa-attach__title">{name}</div>
      <div class="wa-attach__desc">{desc}</div>
    </div>
{actions_html}
  </div>"""


MEMBERS = [
    M(
        "gallery",
        "图片附件组",
        "小号方图卡带描边，适合相册与截图引用。",
        "`.wa-attach-gallery` + `.wa-attach-tile`；悬停显示移除；本地 SVG 占位图（禁 CDN）",
        "96 方图卡（内边距+描边）+ 文件名/体积；右上角圆形关闭",
        f"""
<div class="wa-attach-gallery">
  <div class="wa-attach-tile">
    <div class="wa-attach-tile__media">
      <img src="{SVG_PH['1']}" alt="工作区" />
      <button type="button" class="wa-attach-tile__x" aria-label="移除"><icon-close :size="11"></icon-close></button>
    </div>
    <div class="wa-attach-tile__name">工作区.png</div>
    <div class="wa-attach-tile__meta">PNG · 820 KB</div>
  </div>
  <div class="wa-attach-tile">
    <div class="wa-attach-tile__media">
      <img src="{SVG_PH['2']}" alt="桌面参考" />
      <button type="button" class="wa-attach-tile__x" aria-label="移除"><icon-close :size="11"></icon-close></button>
    </div>
    <div class="wa-attach-tile__name">桌面参考.jpg</div>
    <div class="wa-attach-tile__meta">JPG · 1.1 MB</div>
  </div>
  <div class="wa-attach-tile">
    <div class="wa-attach-tile__media">
      <img src="{SVG_PH['3']}" alt="办公参考" />
      <button type="button" class="wa-attach-tile__x" aria-label="移除"><icon-close :size="11"></icon-close></button>
    </div>
    <div class="wa-attach-tile__name">办公参考.jpg</div>
    <div class="wa-attach-tile__meta">JPG · 940 KB</div>
  </div>
</div>
""",
    ),
    M(
        "uploading",
        "上传中与完成卡",
        "上传进度卡与已完成代码文件纵向叠放，宽度铺满容器。",
        "两张 `.wa-attach`：spin+取消 / 代码图标+移除",
        "纵向叠放；上传中 shimmer + 完成态；宽度 100%",
        f"""
<div class="wa-attach-stack">
{card(name="销售看板.pdf", desc="上传中 · 64%", state="uploading", media="spin", actions="cancel")}
{card(name="消息渲染器.tsx", desc="TypeScript · 12 KB", icon="icon-code", actions="remove")}
</div>
""",
    ),
    M(
        "group",
        "混合附件组",
        "PDF / 图片 / CSV / 源码单列编组，宽度铺满容器，聊天输入区常用。",
        "`.wa-attach-group` 单列叠放；图用本地 SVG 预览",
        "单列叠放铺满容器；图标或缩略图 + 移除",
        f"""
<div class="wa-attach-group">
{card(name="会议纪要.pdf", desc="PDF · 1.4 MB", size="sm", actions="remove")}
{card(name="工作区.png", desc="PNG · 820 KB", size="sm", media="image", img=SVG_PH["1"], actions="remove")}
{card(name="客户列表.csv", desc="CSV · 18 KB", size="sm", icon="icon-file", actions="remove")}
{card(name="渲染器.tsx", desc="TSX · 12 KB", size="sm", icon="icon-code", actions="remove")}
</div>
""",
    ),
    M(
        "sizes",
        "附件尺寸",
        "default / sm / xs 三档尺寸纵向叠放，适配列表与聊天输入。",
        "`.wa-attach` + `--sm` / `--xs`；xs 隐藏描述",
        "单列叠放铺满容器；三档高度、圆角与媒体尺寸递减；xs 无描述",
        f"""
<div class="wa-attach-stack">
{card(name="默认附件", desc="PDF · 2.4 MB", actions="")}
{card(name="小号附件", desc="PDF · 2.4 MB", size="sm", actions="")}
{card(name="超小附件", desc="PDF · 2.4 MB", size="xs", actions="")}
</div>
""",
    ),
    M(
        "states",
        "上传五态",
        "idle / uploading / processing / error / done 五态纵向对照。",
        "五张 `.wa-attach` 叠放；error 含重试；idle 虚线描边",
        "状态驱动边框、图标与描述文案",
        f"""
<div class="wa-attach-stack">
{card(name="已选文件.pdf", desc="准备上传", state="idle", actions="remove")}
{card(name="设计系统.zip", desc="上传中 · 64%", state="uploading", media="spin", actions="cancel")}
{card(name="市场调研.pdf", desc="正在处理文档", state="processing", media="clock", actions="cancel")}
{card(name="财务模型.xlsx", desc="上传失败，请重试", state="error", media="warn", actions="retry remove")}
{card(name="季度报告.pdf", desc="已上传 · 1.8 MB", state="done", media="check", actions="remove")}
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
    # remove obsolete dirs later
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

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将家族 `components/{FAMILY}/component.css` 中相关规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：{m["rules"]}
- 附件为展示态（非 a-upload）；选文件走 `upload` 家族
- 禁止外链 CDN 图；图预览用本地 SVG data URI 或交付内资源
- 私有样式真源在 `components/{FAMILY}/component.css`；§5 **只贴 HTML**
- Vue 模板内自定义标签勿写成自闭合

## 4. 视觉规格

- 布局 / 层级 / 强调：{m["visual"]}
- 动效：上传中标题 shimmer；图块悬停显示关闭；其余仅 hover/focus
- 颜色：只用 `--wa-*` / Arco token

## 5. 直接粘贴

```html
{m["html"]}
```

> 换文案：只改汉字与文件名；勿改 class。有私有样式时并入宿主 CSS。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/{FAMILY}/{m["subdir"]}/index.html`

## 8. 兄弟形态（同家族）

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
    # purge obsolete member dirs from first draft
    keep = {m["subdir"] for m in MEMBERS}
    for child in list(COMP.iterdir()):
        if child.is_dir() and child.name not in keep and child.name not in ("",):
            # skip none
            if child.name in ("default", "error", "uploading", "gallery", "group", "states", "sizes"):
                if child.name not in keep:
                    shutil.rmtree(child)
                    print("removed", child.relative_to(ROOT).as_posix())

    types = " / ".join(m["subdir"] for m in MEMBERS)
    cards = "\n".join(fam_card(m) for m in MEMBERS)
    members_js = ", ".join(f"'{m['slug']}'" for m in MEMBERS)
    html = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <script src="../../assets/common/js/theme.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>附件卡片 · 家族对照</title>
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
          <h1 class="wa-fam-title">附件卡片</h1>
          <p class="wa-fam-lead">文件附件展示：图组预览、上传进度、五态与多尺寸编组。</p>
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
      id: '{FAMILY}',
      members: [{members_js}],
    }}
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
    insert_at = next(
        (i + 1 for i, c in enumerate(comps) if c.get("slug") == "upload"),
        len(comps),
    )
    new_comps = [
        {
            "slug": m["slug"],
            "label": m["label"],
            "surface": "general",
            "status": "preview",
            "tier": "free",
            "path": f"components/{FAMILY}/{m['subdir']}",
            "usedByBlocks": [],
            "notes": f"家族 {FAMILY} / {m['subdir']}；对照 shadcnuikit attachment",
            "category": CATEGORY,
            "tags": [],
            "family": FAMILY,
            "relatedComponents": ["upload"],
        }
        for m in MEMBERS
    ]
    comps[insert_at:insert_at] = new_comps
    data["components"] = comps

    for fam in data.get("families", []):
        if fam.get("slug") == FAMILY:
            fam["members"] = [m["slug"] for m in MEMBERS]
            fam["label"] = "附件卡片"
            fam["notes"] = "对照 shadcnuikit；成员在 " + "/".join(m["subdir"] for m in MEMBERS)
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
