# -*- coding: utf-8 -*-
"""Split catalog I/O：库存在 components/layouts/blocks 各自 catalog.json；共用配置在 _meta/config.json。"""
from __future__ import annotations

import json
from pathlib import Path

WEB = Path(__file__).resolve().parents[1]
META = WEB / "_meta" / "config.json"
COMPONENTS = WEB / "components" / "catalog.json"
LAYOUTS = WEB / "layouts" / "catalog.json"
BLOCKS = WEB / "blocks" / "catalog.json"

COMP_KEYS = ("components", "families", "componentCategories")
LAY_KEYS = ("layouts", "layoutCategories")
BLOCK_GALLERY_KEYS = ("groups", "types", "source", "notes")
META_KEYS = (
    "version",
    "description",
    "surfaceDefault",
    "layoutDefault",
    "reuse",
    "tagVocabulary",
)
LEGACY_META_KEYS = (
    "blockGroups",
    "blockCategories",
    "examples",
    "exampleCategories",
    "animations",
    "animationCategories",
    "promptSchema",
    "promptTemplates",
    "frameworkId",
    "theme",
    "createdAt",
)


def _load(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8-sig"))


def _dump(path: Path, obj: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(obj, ensure_ascii=False, indent=2) + "\n", encoding="utf-8", newline="\n")


def load_catalog() -> dict:
    data = _load(META) if META.is_file() else {}
    if COMPONENTS.is_file():
        data.update(_load(COMPONENTS))
    if LAYOUTS.is_file():
        data.update(_load(LAYOUTS))
    if BLOCKS.is_file():
        block_cat = _load(BLOCKS)
        if "blocks" in block_cat:
            data["blocks"] = block_cat["blocks"]
    return data


def save_catalog(data: dict) -> None:
    comp = {k: data[k] for k in COMP_KEYS if k in data}
    lay = {k: data[k] for k in LAY_KEYS if k in data}
    if comp:
        _dump(COMPONENTS, comp)
    if lay:
        _dump(LAYOUTS, lay)
    if "blocks" in data:
        existing = _load(BLOCKS) if BLOCKS.is_file() else {}
        out = {k: existing[k] for k in existing if k != "blocks"}
        out["blocks"] = data["blocks"]
        _dump(BLOCKS, out)
    existing_meta = _load(META) if META.is_file() else {}
    meta = {k: existing_meta[k] for k in META_KEYS if k in existing_meta}
    for k in META_KEYS:
        if k in data:
            meta[k] = data[k]
    _dump(META, meta)


def split_existing_meta() -> None:
    raise SystemExit("one-shot split already applied; inventory lives in domain catalog.json files")
