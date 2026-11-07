# -*- coding: utf-8 -*-
"""Compare Arco Vue component names in vendor vs WEB catalog families."""
from __future__ import annotations

from catalog_io import load_catalog, save_catalog

import json
import re
from pathlib import Path

WEB = Path(__file__).resolve().parents[1]
JS = WEB / "vendor" / "arco" / "arco-vue.min.js"
CATALOG = WEB / "_meta" / "config.json"

# Official Arco Design Vue component catalog (kebab / family mapping)
# Source of truth intent: Arco docs component list; filtered for WEB marketing/general.
ARCO_COMPONENTS = [
    # General
    ("button", "Button", "basic", "已有 btn-* 家族"),
    ("link", "Link", "basic", "已有"),
    ("typography", "Typography", "basic", "缺口：标题/段落/文本排版"),
    ("grid", "Grid", "basic", "缺口：栅格 Row/Col（布局，偏工程）"),
    ("divider", "Divider", "basic", "已有"),
    ("space", "Space", "basic", "已有"),
    # Layout (often skip for WEB marketing stock)
    ("layout", "Layout", "basic", "偏后台壳，一般不迁 WEB"),
    # Navigation
    ("breadcrumb", "Breadcrumb", "navigation", "已有"),
    ("dropdown", "Dropdown", "navigation", "已有"),
    ("menu", "Menu", "navigation", "缺口：导航菜单（侧栏/顶栏，慎用 Pro 壳）"),
    ("page-header", "PageHeader", "navigation", "缺口：页头"),
    ("pagination", "Pagination", "navigation", "已有"),
    ("steps", "Steps", "navigation", "已有"),
    ("tabs", "Tabs", "navigation", "已有"),
    # Data Entry
    ("auto-complete", "AutoComplete", "form", "已在 input-autocomplete"),
    ("cascader", "Cascader", "form", "已在 select-cascader"),
    ("checkbox", "Checkbox", "form", "已有"),
    ("date-picker", "DatePicker", "form", "已有"),
    ("form", "Form", "form", "已有"),
    ("input", "Input", "form", "已有"),
    ("input-number", "InputNumber", "form", "已在 input-number"),
    ("input-tag", "InputTag", "form", "已在 input-tag"),
    ("mention", "Mention", "form", "已在 input-mention"),
    ("radio", "Radio", "form", "已有"),
    ("rate", "Rate", "form", "已有"),
    ("select", "Select", "form", "已有"),
    ("slider", "Slider", "form", "已有"),
    ("switch", "Switch", "form", "已有"),
    ("textarea", "Textarea", "form", "已在 input-textarea"),
    ("time-picker", "TimePicker", "form", "已有"),
    ("transfer", "Transfer", "form", "缺口：穿梭框"),
    ("tree-select", "TreeSelect", "form", "已在 select-tree-select"),
    ("upload", "Upload", "form", "已有"),
    ("verification-code", "VerificationCode", "form", "已在 input-verification-code"),
    ("color-picker", "ColorPicker", "form", "已有"),
    # Data Display
    ("avatar", "Avatar", "data-display", "已有"),
    ("badge", "Badge", "data-display", "已有"),
    ("calendar", "Calendar", "data-display", "缺口：日历面板"),
    ("card", "Card", "data-display", "缺口：内容卡片（勿与营销 wa-card 混淆）"),
    ("carousel", "Carousel", "data-display", "缺口：轮播（营销常用）"),
    ("collapse", "Collapse", "data-display", "已有"),
    ("comment", "Comment", "data-display", "缺口：评论"),
    ("descriptions", "Descriptions", "data-display", "已有"),
    ("empty", "Empty", "data-display", "已有"),
    ("image", "Image", "data-display", "缺口：图片预览"),
    ("list", "List", "data-display", "缺口：列表"),
    ("popover", "Popover", "feedback", "已有"),
    ("statistic", "Statistic", "data-display", "已有"),
    ("table", "Table", "data-display", "缺口：表格（偏后台，可精简态）"),
    ("tabs-display", "Tabs", "navigation", "已有"),
    ("tag", "Tag", "data-display", "已有"),
    ("timeline", "Timeline", "data-display", "已有"),
    ("tooltip", "Tooltip", "feedback", "已有"),
    ("tree", "Tree", "data-display", "缺口：树形控件"),
    # Feedback
    ("alert", "Alert", "feedback", "已有"),
    ("drawer", "Drawer", "feedback", "已有"),
    ("message", "Message", "feedback", "已有"),
    ("modal", "Modal", "feedback", "已有"),
    ("notification", "Notification", "feedback", "已有"),
    ("popconfirm", "Popconfirm", "feedback", "已有"),
    ("progress", "Progress", "feedback", "已有"),
    ("result", "Result", "feedback", "已有"),
    ("skeleton", "Skeleton", "feedback", "已有"),
    ("spin", "Spin", "feedback", "已有"),
    # Other
    ("affix", "Affix", "navigation", "缺口：固钉"),
    ("anchor", "Anchor", "navigation", "缺口：锚点（长文/落地页有用）"),
    ("back-top", "BackTop", "navigation", "缺口：回到顶部"),
    ("config-provider", "ConfigProvider", "basic", "工程配置，不入组件库存"),
    ("resize-box", "ResizeBox", "basic", "缺口：可拖拽分栏（偏工具）"),
    ("trigger", "Trigger", "basic", "底层触发器，一般不单独上架"),
    ("watermark", "Watermark", "data-display", "缺口：水印"),
    ("overflow-list", "OverflowList", "data-display", "缺口：溢出折叠列表"),
]

# Map catalog family slugs / notes to coverage
COVERED_ALIASES = {
    "button": {"btn-primary", "btn-secondary", "btn-outline", "btn-dashed", "btn-text", "btn-icon"},
    "auto-complete": {"input"},
    "cascader": {"select"},
    "input-number": {"input"},
    "input-tag": {"input"},
    "mention": {"input"},
    "textarea": {"input"},
    "tree-select": {"select"},
    "verification-code": {"input"},
    "tabs-display": {"tabs"},
}


def main() -> None:
    data = load_catalog()
    fam_slugs = {f["slug"] for f in data.get("families") or []}
    comp_slugs = {c["slug"] for c in data.get("components") or []}

    # Detect which Arco names exist in vendor bundle
    js = JS.read_text(encoding="utf-8", errors="ignore")
    in_vendor = {}
    for slug, name, cat, note in ARCO_COMPONENTS:
        in_vendor[slug] = (f'name:"{name}"' in js) or (f'name: "{name}"' in js) or (f"name:{name}" in js) or (f'name:"{name}"' in js.replace(" ", ""))

    # Simpler vendor check
    vendor_names = set(re.findall(r'name:"([A-Z][A-Za-z0-9]+)"', js))
    vendor_names |= set(re.findall(r"name:'([A-Z][A-Za-z0-9]+)'", js))

    print("=== WEB 已有家族 ===")
    for s in sorted(fam_slugs):
        print(f"  {s}")
    print(f"total families: {len(fam_slugs)}")
    print()

    gaps = []
    covered = []
    skip = []
    for slug, name, cat, note in ARCO_COMPONENTS:
        present = name in vendor_names
        aliases = COVERED_ALIASES.get(slug, {slug})
        has = bool(aliases & fam_slugs) or slug in fam_slugs
        # also check if note starts with 已有/已在
        if note.startswith("已有") or note.startswith("已在"):
            has = True
        row = (slug, name, cat, note, present, has)
        if "不迁" in note or "不入" in note or "不单独" in note or "偏后台壳" in note:
            skip.append(row)
        elif has:
            covered.append(row)
        else:
            gaps.append(row)

    print("=== 可考虑补进 WEB 的缺口（建议） ===")
    for slug, name, cat, note, present, _ in gaps:
        v = "vendor✓" if present or name in vendor_names else "vendor?"
        print(f"  [{cat:12}] {slug:20} {name:16} {v}  — {note}")
    print(f"gap count: {len(gaps)}")
    print()

    print("=== 建议跳过 / 工程层 ===")
    for slug, name, cat, note, present, _ in skip:
        print(f"  [{cat:12}] {slug:20} — {note}")
    print()

    print("=== vendor 中额外检测到、未映射的大写组件名（抽样） ===")
    known = {name for _, name, _, _ in ARCO_COMPONENTS}
    extras = sorted(n for n in vendor_names if n not in known and not n.startswith("Icon") and len(n) > 3)
    # filter noise
    noise = {"Symbol", "Object", "Array", "String", "Number", "Boolean", "Promise", "Error", "Date"}
    extras = [n for n in extras if n not in noise][:80]
    for n in extras:
        print(f"  {n}")


if __name__ == "__main__":
    main()
