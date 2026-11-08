# -*- coding: utf-8 -*-
"""Generate components/list.md and components/index.html from components/catalog.json."""
from __future__ import annotations

from catalog_io import load_catalog, save_catalog

import html
import json
from collections import defaultdict
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "_meta" / "config.json"
OUT_MD = ROOT / "components" / "list.md"
OUT_HTML = ROOT / "components" / "index.html"

# (中文名, 英文名) — 导航与分类标题双语展示
CATEGORY_LABELS = {
    "basic": ("基础组件", "Basic"),
    "form": ("表单控件", "Form"),
    "data-display": ("数据展示", "Data Display"),
    "navigation": ("内容导航", "Navigation"),
    "feedback": ("反馈提示", "Feedback"),
    "chart": ("数据图表", "Chart"),
}

def category_pair(cid: str) -> tuple[str, str]:
    pair = CATEGORY_LABELS.get(cid)
    if isinstance(pair, tuple) and len(pair) == 2:
        return pair[0], pair[1]
    label = str(pair or cid)
    return label, label

SURFACE_LABELS = {
    "marketing": "营销",
    "general": "通用",
}


def member_type(comp: dict, family_slug: str | None) -> str:
    """Derive 组件类型 from path subdir (e.g. default / range / icon)."""
    path = comp.get("path") or ""
    parts = path.replace("\\", "/").split("/")
    if len(parts) >= 3 and parts[0] == "components":
        # components/{family}/{subdir}
        if family_slug and parts[1] == family_slug and len(parts) >= 3:
            return parts[2]
        if len(parts) == 2:
            return "flat"
        return parts[-1]
    slug = comp.get("slug") or ""
    if family_slug and slug.startswith(family_slug + "-"):
        return slug[len(family_slug) + 1 :]
    if family_slug and slug == family_slug:
        return "default"
    return "—"


def family_href(f: dict) -> str:
    """Relative link from components/ to family index.html."""
    path = (f.get("path") or "").replace("\\", "/")
    if path.startswith("components/"):
        rel = path[len("components/") :]
    else:
        rel = f.get("slug") or ""
    return f"./{rel}/index.html"


def member_embed_href(c: dict) -> str:
    """Relative link from components/ to member embed preview (?embed=1)."""
    path = (c.get("path") or "").replace("\\", "/")
    if path.startswith("components/"):
        rel = path[len("components/") :]
    else:
        rel = path
    return f"./{rel}/index.html?embed=1"


def build_family_groups(
    components: list[dict],
    families: list[dict],
    cat_vocab: list[str],
) -> tuple[dict[str, dict], dict[str, list[dict]], list[str]]:
    by_slug = {c["slug"]: c for c in components}

    def family_category(f: dict) -> str:
        for mid in f.get("members") or []:
            c = by_slug.get(mid)
            if c and c.get("category"):
                return c["category"]
        return "—"

    families_by_cat: dict[str, list[dict]] = defaultdict(list)
    for f in families:
        families_by_cat[family_category(f)].append(f)
    family_cat_order = [c for c in cat_vocab if c in families_by_cat]
    for c in sorted(families_by_cat.keys()):
        if c not in family_cat_order:
            family_cat_order.append(c)
    return by_slug, families_by_cat, family_cat_order


def write_markdown(
    data: dict,
    by_slug: dict[str, dict],
    families_by_cat: dict[str, list[dict]],
    family_cat_order: list[str],
    by_cat: dict[str, list[dict]],
    ordered_cats: list[str],
) -> None:
    components: list[dict] = data.get("components") or []
    families: list[dict] = data.get("families") or []
    cat_vocab: list[str] = data.get("componentCategories") or []
    family_by_slug = {f["slug"]: f for f in families}
    version = data.get("version", "")
    created = data.get("createdAt", "")

    lines: list[str] = []
    lines.append("# WEB 母版组件登记列表")
    lines.append("")
    lines.append(
        "本文档记录 `frame/web/components` 已登记组件，数据源为 "
        "`frame/web/components/catalog.json` 的 `components[]` / `families[]`。"
    )
    lines.append("")
    lines.append(
        "可点击预览：打开同目录 [`index.html`](./index.html)（按分类列出家族，点击进入家族对照页）。"
    )
    lines.append("")
    lines.append("| 项 | 值 |")
    lines.append("| --- | --- |")
    lines.append(f"| 母版版本 | {version} |")
    lines.append(f"| catalog 创建日 | {created} |")
    lines.append(f"| 文档生成日 | {date.today().isoformat()} |")
    lines.append(f"| 组件条目数 | {len(components)} |")
    lines.append(f"| 家族数 | {len(families)} |")
    lines.append("")
    lines.append("> 权威登记仍以 `components/catalog.json` 为准；新增/变更组件后应同步更新本表。")
    lines.append("")
    lines.append("## 分类总览")
    lines.append("")
    lines.append("| 分类 ID | 中文名 | 条目数 |")
    lines.append("| --- | --- | --- |")
    for cid in cat_vocab:
        zh, en = category_pair(cid)
        lines.append(
            "| `{cid}` | {label} | {n} |".format(
                cid=cid,
                label=f"{zh} / {en}" if zh != en else zh,
                n=len(by_cat.get(cid, [])),
            )
        )
    for cid in ordered_cats:
        if cid in cat_vocab:
            continue
        zh, en = category_pair(cid)
        lines.append(
            "| `{cid}` | {label} | {n} |".format(
                cid=cid,
                label=f"{zh} / {en}" if zh != en else zh,
                n=len(by_cat[cid]),
            )
        )
    lines.append("")

    lines.append("## 家族一览")
    lines.append("")
    for cid in family_cat_order:
        zh, en = category_pair(cid)
        cat_label = f"{zh} / {en}" if zh != en else zh
        lines.append(f"### {cat_label}（`{cid}`）")
        lines.append("")
        lines.append(
            "| 家族 slug | 家族名称 | 表面 | 状态 | 成员数 | 家族页 |"
        )
        lines.append("| --- | --- | --- | --- | --- | --- |")
        for f in families_by_cat[cid]:
            surf = SURFACE_LABELS.get(f.get("surface", ""), f.get("surface", "—"))
            href = family_href(f)
            lines.append(
                "| `{slug}` | [{label}]({href}) | {surf} | {status} | {n} | [{path}]({href}) |".format(
                    slug=f.get("slug", ""),
                    label=f.get("label", ""),
                    href=href,
                    surf=surf,
                    status=f.get("status", "—"),
                    n=len(f.get("members") or []),
                    path=f.get("path", ""),
                )
            )
        lines.append("")

    lines.append("## 家族成员对照")
    lines.append("")
    lines.append(
        "字段说明：**组件分类** = `category`；**组件名称** = `label`；"
        "**组件类型** = 家族内子目录名（如 `default` / `range`）；"
        "**slug** = 可复制交付单元；另含表面 / 状态 / 路径。"
        "家族标题可点击打开对照页。"
    )
    lines.append("")

    for cid in family_cat_order:
        zh, en = category_pair(cid)
        cat_label = f"{zh} / {en}" if zh != en else zh
        lines.append(f"### {cat_label}（`{cid}`）")
        lines.append("")
        for f in families_by_cat[cid]:
            slug = f.get("slug", "")
            href = family_href(f)
            lines.append(f"#### [`{slug}` — {f.get('label', '')}]({href})")
            lines.append("")
            if f.get("notes"):
                lines.append(f"> {f['notes']}")
                lines.append("")
            lines.append(
                "| 组件分类 | 组件名称 | 组件类型 | slug | 表面 | 状态 | 路径 |"
            )
            lines.append("| --- | --- | --- | --- | --- | --- | --- |")
            for mid in f.get("members") or []:
                c = by_slug.get(mid)
                if not c:
                    lines.append(
                        f"| — | （未在 components[] 找到） | — | `{mid}` | — | — | — |"
                    )
                    continue
                mtype = member_type(c, slug)
                surf = SURFACE_LABELS.get(
                    c.get("surface", ""), c.get("surface", "—")
                )
                lines.append(
                    "| `{cat}` | {name} | `{mtype}` | `{mid}` | {surf} | {status} | `{path}` |".format(
                        cat=c.get("category") or cid,
                        name=c.get("label", ""),
                        mtype=mtype,
                        mid=mid,
                        surf=surf,
                        status=c.get("status", "—"),
                        path=c.get("path", ""),
                    )
                )
            lines.append("")

    orphans = [c for c in components if not c.get("family")]
    if orphans:
        lines.append("## 无家族（扁平）组件")
        lines.append("")
        lines.append("| 组件分类 | 组件名称 | 组件类型 | slug | 路径 |")
        lines.append("| --- | --- | --- | --- | --- |")
        for c in orphans:
            lines.append(
                "| `{cat}` | {name} | `{mtype}` | `{slug}` | `{path}` |".format(
                    cat=c.get("category", "—"),
                    name=c.get("label", ""),
                    mtype=member_type(c, None),
                    slug=c.get("slug", ""),
                    path=c.get("path", ""),
                )
            )
        lines.append("")

    missing_in_comp = []
    for f in families:
        for mid in f.get("members") or []:
            if mid not in by_slug:
                missing_in_comp.append((f.get("slug"), mid))
    not_in_family_members = []
    for c in components:
        fam = c.get("family")
        if not fam:
            continue
        f = family_by_slug.get(fam)
        if not f:
            not_in_family_members.append((c["slug"], fam, "家族未登记"))
        elif c["slug"] not in (f.get("members") or []):
            not_in_family_members.append((c["slug"], fam, "未出现在 members[]"))

    lines.append("## 维护说明")
    lines.append("")
    lines.append(
        "1. 新增组件：按 `web-frame-author` 流程登记 `catalog.components[]`，"
        "有家族则同步 `families[].members`。"
    )
    lines.append(
        "2. 本文件与 `index.html` 可由 `scripts/gen-component-list.py` 从 catalog 重新生成："
    )
    lines.append("")
    lines.append("```bash")
    lines.append("python frame/web/scripts/gen-component-list.py")
    lines.append("```")
    lines.append("")
    lines.append(
        "3. 字段与 catalog 对齐：`category` / `label` / 子目录类型 / `slug` / "
        "`family` / `surface` / `status` / `path`。"
    )
    lines.append("")

    if missing_in_comp or not_in_family_members:
        lines.append("## 一致性告警")
        lines.append("")
        if missing_in_comp:
            lines.append("家族 `members` 中有、但 `components[]` 缺失：")
            lines.append("")
            for fam, mid in missing_in_comp:
                lines.append(f"- 家族 `{fam}` → `{mid}`")
            lines.append("")
        if not_in_family_members:
            lines.append("组件声明了 `family` 但未正确挂到家族：")
            lines.append("")
            for slug, fam, reason in not_in_family_members:
                lines.append(f"- `{slug}` → 家族 `{fam}`（{reason}）")
            lines.append("")

    OUT_MD.write_text("\n".join(lines) + "\n", encoding="utf-8", newline="\n")


def write_html(
    data: dict,
    by_slug: dict[str, dict],
    families_by_cat: dict[str, list[dict]],
    family_cat_order: list[str],
) -> None:
    components: list[dict] = data.get("components") or []
    families: list[dict] = data.get("families") or []
    version = data.get("version", "")

    parts: list[str] = []
    parts.append("<!DOCTYPE html>")
    parts.append('<html lang="zh-CN" data-theme="default">')
    parts.append("<head>")
    parts.append('  <meta charset="UTF-8" />')
    parts.append('  <script src="../assets/common/js/theme.js"></script>')
    parts.append('  <script src="../assets/common/js/brand.js"></script>')
    parts.append(
        '  <meta name="viewport" content="width=device-width, initial-scale=1" />'
    )
    parts.append("  <title>VibePM · 组件类型索引 · WEB 母版</title>")
    parts.append(
        '  <meta name="description" content="VibePM「组件类型索引」：提供可复用的 WEB 控件类型，打开类型页复制提示词后粘贴到 Agent 即可落地；可对照设计系统风格预览。">'
    )
    parts.append(
        '  <meta name="keywords" content="VibePM,组件索引,components,WEB母版,组件库,类型对照,Vibe Design,Arco">'
    )
    parts.append(
        '  <link rel="icon" href="https://www.vibepm.net/assets/images/favicon.ico" type="image/x-icon">'
    )
    parts.append(
        '  <link rel="stylesheet" href="../assets/common/css/chrome.css" />'
    )
    parts.append(
        '  <link rel="stylesheet" href="../assets/common/css/global.css" />'
    )
    parts.append(
        '  <link rel="stylesheet" href="../vendor/fontawesome/css/all.min.css" />'
    )
    parts.append(
        '  <link rel="stylesheet" href="../assets/common/css/fa-icons.css" />'
    )
    parts.append(
        '  <link rel="stylesheet" href="../assets/common/css/components.css" />'
    )
    parts.append(
        '  <link rel="stylesheet" href="./index.css" />'
    )
    parts.append("</head>")
    parts.append("<body>")
    parts.append('  <div class="wa-comp-index">')
    parts.append('    <header class="wa-comp-index__head">')
    parts.append('      <div class="wa-comp-index__head-top">')
    parts.append('        <div class="wa-comp-index__head-copy">')
    parts.append(
        '          <p class="wa-fam-kicker">'
        '<span class="wa-icon-badge wa-icon-badge--soft" aria-hidden="true">'
        '<i class="pro-fa-icon fa-solid fa-cube"></i></span>'
        "components</p>"
    )
    parts.append('          <h1 class="wa-fam-title">Vibe Design 组件类型索引</h1>')
    parts.append('          <div class="wa-comp-index__lead-row">')
    parts.append(
        '            <p class="wa-comp-index__lead">'
        "提供可复用的 WEB 控件类型；打开类型页获取提示词，粘贴到 Agent 可快速落地，"
        "配合 VibePM 工具包时还原效果最好。</p>"
    )
    parts.append(
        '            <div class="wa-comp-index__stats" aria-label="登记规模">'
        f'<span class="wa-comp-index__stat">v{html.escape(str(version))}</span>'
        f'<span class="wa-comp-index__stat">{len(families)} 类型</span>'
        f'<span class="wa-comp-index__stat">{len(components)} 成员</span>'
        '<button type="button" class="wa-lg-theme" data-wa-theme-toggle aria-label="切换为暗色">'
        '<i class="fa-light fa-moon" aria-hidden="true"></i></button></div>'
    )
    parts.append("          </div>")
    parts.append('          <div class="wa-comp-index__tools">')
    parts.append(
        '            <a class="wa-comp-index__theme-preview" href="../theme/index.html" '
        'target="_blank" rel="noopener noreferrer" data-wa-theme-preview>'
        '<i class="fa-regular fa-swatchbook" aria-hidden="true"></i>'
        "<span>查看设计系统风格预览</span></a>"
    )
    parts.append(
        '            <a class="wa-comp-index__toolkit-link" '
        'href="../../../pricing/index.html" target="_top">'
        '<i class="fa-regular fa-crown" aria-hidden="true"></i>'
        "<span>开通会员获取工具包</span></a>"
    )
    parts.append("          </div>")
    parts.append("        </div>")
    parts.append("      </div>")

    parts.append('      <nav class="wa-comp-index__nav" aria-label="分类导航">')
    for cid in family_cat_order:
        zh, en = category_pair(cid)
        n = len(families_by_cat[cid])
        parts.append(
            f'        <a class="wa-comp-index__nav-link" href="#cat-{html.escape(cid)}">'
            f'<span class="wa-comp-index__nav-zh">{html.escape(zh)}</span>'
            f'<span class="wa-comp-index__nav-en">{html.escape(en)}</span>'
            f'<span class="wa-comp-index__nav-count">{n}</span></a>'
        )
    parts.append("      </nav>")
    parts.append("    </header>")

    for cid in family_cat_order:
        zh, en = category_pair(cid)
        parts.append(
            f'    <section class="wa-comp-index__cat" id="cat-{html.escape(cid)}">'
        )
        parts.append('      <header class="wa-comp-index__cat-head">')
        parts.append(
            f'        <h2 class="wa-comp-index__cat-title">'
            f'{html.escape(zh)}'
            f'<span class="wa-comp-index__cat-en">{html.escape(en)}</span></h2>'
        )
        parts.append(
            f'        <p class="wa-comp-index__cat-meta">'
            f"{len(families_by_cat[cid])} 个类型</p>"
        )
        parts.append("      </header>")
        parts.append('      <div class="wa-comp-index__grid">')

        for f in families_by_cat[cid]:
            fslug = f.get("slug", "")
            flabel = f.get("label", "")
            href = family_href(f)
            surf = SURFACE_LABELS.get(f.get("surface", ""), f.get("surface", "—"))
            status = f.get("status", "—")
            members = f.get("members") or []

            member_rows: list[str] = []
            for mid in members:
                c = by_slug.get(mid)
                if not c:
                    member_rows.append(
                        f'            <li class="wa-comp-index__member">'
                        f'<span class="wa-comp-index__member-name '
                        f'wa-comp-index__member-name--muted">（未登记）</span>'
                        f"<code>{html.escape(mid)}</code></li>"
                    )
                    continue
                mtype = member_type(c, fslug)
                label = c.get("label", "") or mid
                preview = member_embed_href(c)
                member_rows.append(
                    f'            <li class="wa-comp-index__member">'
                    f'<button type="button" class="wa-comp-index__member-name" '
                    f'data-preview="{html.escape(preview)}" '
                    f'data-label="{html.escape(label)}" '
                    f'data-slug="{html.escape(c.get("slug", ""))}">'
                    f"{html.escape(label)}</button>"
                    f"<code>{html.escape(mtype)}</code></li>"
                )

            parts.append('        <article class="wa-comp-index__card">')
            parts.append('          <div class="wa-comp-index__card-head">')
            parts.append('            <div class="wa-comp-index__card-top">')
            parts.append(
                '              <div class="wa-comp-meta">'
                f'<span class="wa-comp-meta__name">{html.escape(flabel)}</span>'
                f'<span class="wa-comp-meta__slug">{html.escape(fslug)}</span>'
                "</div>"
            )
            parts.append(
                f'              <a class="wa-comp-index__card-go" '
                f'href="{html.escape(href)}" target="_blank" '
                'rel="noopener noreferrer" title="在新窗口打开类型页">'
                '<i class="fa-solid fa-layer-group" aria-hidden="true"></i>'
                "打开类型页</a>"
            )
            parts.append("            </div>")
            parts.append('            <div class="wa-comp-index__card-sub">')
            parts.append(
                f'              <p class="wa-comp-index__card-count">'
                f"{len(members)} 个相关组件</p>"
            )
            # badge 暂隐藏：surface/status 仍写入 HTML，样式 display:none，便于日后恢复
            parts.append(
                f'              <span class="wa-comp-index__badge">'
                f"{html.escape(surf)} · {html.escape(str(status))}</span>"
            )
            parts.append("            </div>")
            parts.append("          </div>")
            if member_rows:
                parts.append('          <ul class="wa-comp-index__members">')
                parts.extend(member_rows)
                parts.append("          </ul>")
            parts.append("        </article>")

        parts.append("      </div>")
        parts.append("    </section>")

    # 底部与 examples/theme-style 对齐：关注条 + 版权
    parts.append(
        '    <section class="wa-comp-index__follow" aria-label="关注入口">'
    )
    parts.append('      <p class="wa-comp-index__follow-kicker">Social CTA</p>')
    parts.append('      <h2 class="wa-comp-index__follow-title">关注我们</h2>')
    parts.append(
        '      <p class="wa-comp-index__follow-lead">'
        "获取最新设计规范与组件更新，访问官网或联系团队。</p>"
    )
    parts.append(
        '      <div class="wa-comp-index__follow-bar" role="group" '
        'aria-label="访问 Vibe Design">'
    )
    parts.append('        <div class="wa-comp-index__follow-text">')
    parts.append(
        '          <div class="wa-comp-index__follow-label">Visit us</div>'
    )
    parts.append(
        '          <div class="wa-comp-index__follow-name">'
        "Vibe Design · 产品协作</div>"
    )
    parts.append("        </div>")
    parts.append(
        '        <div class="wa-comp-index__follow-divider" aria-hidden="true"></div>'
    )
    parts.append('        <div class="wa-comp-index__follow-icons">')
    parts.append(
        '          <a class="wa-comp-index__follow-icon" '
        'href="https://www.vibepm.net/" target="_blank" rel="noopener noreferrer" '
        'aria-label="官网主页">'
        '<i class="fa-solid fa-house" aria-hidden="true"></i></a>'
    )
    parts.append(
        '          <a class="wa-comp-index__follow-icon" '
        'href="https://work.weixin.qq.com/kfid/kfc30961678e9017618" '
        'target="_blank" rel="noopener noreferrer" aria-label="企业微信">'
        '<i class="fa-brands fa-weixin" aria-hidden="true"></i></a>'
    )
    parts.append(
        '          <a class="wa-comp-index__follow-icon" '
        'href="mailto:20841030@qq.com" aria-label="邮件联系">'
        '<i class="fa-solid fa-paper-plane" aria-hidden="true"></i></a>'
    )
    parts.append("        </div>")
    parts.append("      </div>")
    parts.append("    </section>")
    parts.append(
        '    <footer class="wa-comp-index__foot">'
        "Copyright © 2026 "
        '<a href="https://www.vibepm.net" target="_blank" '
        'rel="noopener noreferrer">www.vibepm.net</a> '
        "Vibe Design — All rights reserved"
        "</footer>"
    )
    parts.append("  </div>")
    parts.append(
        '  <div class="wa-comp-index__modal" id="wa-comp-preview" hidden '
        'role="dialog" aria-modal="true" aria-labelledby="wa-comp-preview-title">'
    )
    parts.append('    <div class="wa-comp-index__modal-backdrop" data-close></div>')
    parts.append('    <div class="wa-comp-index__modal-panel">')
    parts.append('      <header class="wa-comp-index__modal-bar">')
    parts.append('        <div class="wa-comp-meta">')
    parts.append(
        '          <span class="wa-comp-meta__name" id="wa-comp-preview-title"></span>'
    )
    parts.append(
        '          <span class="wa-comp-meta__slug" id="wa-comp-preview-slug"></span>'
    )
    parts.append("        </div>")
    parts.append('        <div class="wa-comp-index__modal-actions">')
    parts.append(
        '          <a class="wa-comp-index__modal-action" id="wa-comp-preview-open" '
        'href="#" target="_blank" rel="noopener noreferrer" '
        'aria-label="在新窗口打开组件页" title="在新窗口打开">'
        '<i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>'
    )
    parts.append(
        '          <button type="button" class="wa-comp-index__modal-action '
        'wa-comp-index__modal-close" data-close aria-label="关闭预览" title="关闭">'
        '<i class="fa-solid fa-xmark" aria-hidden="true"></i></button>'
    )
    parts.append("        </div>")
    parts.append("      </header>")
    parts.append('      <div class="wa-comp-index__modal-body">')
    parts.append(
        '        <div class="wa-comp-index__modal-loading" aria-hidden="true">'
        '<div class="arco-spin arco-spin-with-tip">'
        '<span class="arco-spin-icon">'
        '<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" '
        'stroke="currentColor" class="arco-icon arco-icon-loading" stroke-width="4" '
        'stroke-linecap="butt" stroke-linejoin="miter" aria-hidden="true">'
        '<path d="M42 24c0 9.941-8.059 18-18 18S6 33.941 6 24 14.059 6 24 6"></path>'
        "</svg></span>"
        '<div class="arco-spin-tip">Loading</div></div></div>'
    )
    parts.append(
        '        <iframe class="wa-comp-index__modal-frame" title="组件预览" '
        'loading="lazy"></iframe>'
    )
    parts.append("      </div>")
    parts.append("    </div>")
    parts.append("  </div>")
    parts.append(
        '  <script src="./index.js"></script>'
    )
    parts.append("</body>")
    parts.append("</html>")

    OUT_HTML.write_text("\n".join(parts) + "\n", encoding="utf-8", newline="\n")


def main() -> None:
    data = load_catalog()
    components: list[dict] = data.get("components") or []
    families: list[dict] = data.get("families") or []
    cat_vocab: list[str] = data.get("componentCategories") or []

    by_cat: dict[str, list[dict]] = defaultdict(list)
    for c in components:
        by_cat[c.get("category") or "—"].append(c)

    ordered_cats = [c for c in cat_vocab if c in by_cat]
    for c in sorted(by_cat.keys()):
        if c not in ordered_cats:
            ordered_cats.append(c)

    by_slug, families_by_cat, family_cat_order = build_family_groups(
        components, families, cat_vocab
    )

    write_markdown(
        data, by_slug, families_by_cat, family_cat_order, by_cat, ordered_cats
    )
    write_html(data, by_slug, families_by_cat, family_cat_order)

    print(
        f"Wrote {OUT_MD.name} + {OUT_HTML.name} "
        f"({len(components)} components, {len(families)} families)"
    )


if __name__ == "__main__":
    main()
