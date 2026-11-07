# -*- coding: utf-8 -*-
"""Scan frame/web text files for UTF-8 / mojibake issues.

Run from frame/web:
  python scripts/check-utf8.py
  python scripts/check-utf8.py --strict
"""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EXTS = {".html", ".md", ".css", ".js", ".json", ".yaml", ".yml", ".txt"}
SKIP_DIRS = {"vendor", "node_modules", ".git"}

# Typical leftovers when UTF-8 was read as GBK/CP936 then re-saved as UTF-8
MOJIBAKE_MARKERS = (
    "鍏嶈",  # 免费…
    "涓绘",  # 主…
    "钀ラ",  # 营…
    "鏃ユ",  # 日…
    "瀹舵",  # 家…
    "閫夋",  # 选…
    "鐧诲",  # …
)

CJK = re.compile(r"[\u4e00-\u9fff]")
PUA = re.compile(r"[\ue000-\uf8ff]")  # private use — often from failed re-encode


def iter_files(root: Path):
    for p in root.rglob("*"):
        if not p.is_file():
            continue
        if any(part in SKIP_DIRS for part in p.parts):
            continue
        if p.suffix.lower() not in EXTS:
            continue
        yield p


def check_file(path: Path, strict: bool) -> list[str]:
    errors: list[str] = []
    raw = path.read_bytes()
    if raw.startswith(b"\xff\xfe") or raw.startswith(b"\xfe\xff"):
        errors.append("UTF-16 BOM — must be UTF-8")
        return errors
    try:
        text = raw.decode("utf-8")
    except UnicodeDecodeError as e:
        errors.append(f"not valid UTF-8: {e}")
        return errors

    if "\ufffd" in text:
        errors.append("contains U+FFFD replacement char")
    if PUA.search(text):
        errors.append("contains Private Use Area chars (likely bad re-encode)")
    for m in MOJIBAKE_MARKERS:
        if m in text:
            errors.append(f"mojibake marker {m!r}")
            break

    if strict and path.suffix.lower() == ".html":
        head = text[:800]
        if 'lang="zh-CN"' in head or "lang='zh-CN'" in head:
            if not CJK.search(text):
                errors.append('lang="zh-CN" but no CJK characters (possible total corruption)')

    return errors


def main() -> int:
    ap = argparse.ArgumentParser(description="Check frame/web files for UTF-8 / mojibake")
    ap.add_argument("--strict", action="store_true", help="extra checks for zh-CN HTML")
    ap.add_argument(
        "--root",
        type=Path,
        default=ROOT,
        help="directory to scan (default: frame/web)",
    )
    args = ap.parse_args()
    root = args.root.resolve()
    bad = 0
    checked = 0
    for p in iter_files(root):
        checked += 1
        errs = check_file(p, args.strict)
        if errs:
            bad += 1
            rel = p.relative_to(root).as_posix()
            print(f"FAIL {rel}")
            for e in errs:
                print(f"  - {e}")
    print(f"checked {checked}, failed {bad}")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
