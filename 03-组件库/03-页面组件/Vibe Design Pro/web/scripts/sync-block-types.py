#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Sync blocks/catalog.json -> blocks/catalog.data.js (file:// friendly)."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "blocks" / "catalog.json"
DST = ROOT / "blocks" / "catalog.data.js"


def main() -> None:
    data = json.loads(SRC.read_text(encoding="utf-8"))
    gallery = {k: data[k] for k in ("version", "source", "groups", "types") if k in data}
    body = json.dumps(gallery, ensure_ascii=False, indent=2)
    header = (
        "/** Auto-synced from catalog.json — file:// 可加载。\n"
        " * 改列表：先编辑 blocks/catalog.json，再运行 python scripts/sync-block-types.py\n"
        " */\n"
    )
    DST.write_text(header + "window.WA_BLOCK_TYPES = " + body + ";\n", encoding="utf-8", newline="\n")
    print(f"ok: {DST.relative_to(ROOT)} ({DST.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
