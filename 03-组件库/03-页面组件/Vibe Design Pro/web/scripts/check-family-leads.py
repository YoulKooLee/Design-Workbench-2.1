# -*- coding: utf-8 -*-
"""Validate WEB family page leads + WA_FAMILY mount wiring.

Run from frame/web:
  python scripts/check-family-leads.py
"""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
COMPONENTS = ROOT / "components"

# Scene lead: introduce component type + usage (~20–30 字, slightly longer OK)
MIN_CHARS = 15
MAX_CHARS = 55

BANNED = re.compile(
    r"对照\s*Admin|对照\s*Arco|component-form|"
    r"(?<![A-Za-z])Admin(?![A-Za-z])|(?<![A-Za-z])Arco(?![A-Za-z])",
    re.IGNORECASE,
)

LEAD_RE = re.compile(
    r'<p\s+class="wa-fam-lead"[^>]*>(.*?)</p>',
    re.IGNORECASE | re.DOTALL,
)
CJK_RE = re.compile(r"[\u4e00-\u9fff]")
MEMBERS_BLOCK_RE = re.compile(
    r"members\s*:\s*\[(.*?)\]",
    re.DOTALL,
)
OBJECT_MEMBER_RE = re.compile(r"\{\s*id\s*:")
FAMILY_JS_RE = re.compile(
    r'<script[^>]+src=["\'][^"\']*family\.js["\']',
    re.IGNORECASE,
)
MOUNT_RE = re.compile(r"WebArco\.mount\s*\(")


def strip_tags(html: str) -> str:
    return re.sub(r"<[^>]+>", "", html).strip()


def char_len(text: str) -> int:
    """Count CJK + letters/digits (ignore spaces/punct for length band)."""
    n = 0
    for ch in text:
        if CJK_RE.match(ch) or ch.isalnum():
            n += 1
    return n


def check_index(path: Path) -> list[str]:
    errors: list[str] = []
    text = path.read_text(encoding="utf-8")
    if "wa-fam-lead" not in text:
        return errors  # not a family root page

    leads = [strip_tags(m.group(1)) for m in LEAD_RE.finditer(text)]
    scene = next((t for t in leads if not t.startswith("组件类型")), None)
    type_line = next((t for t in leads if t.startswith("组件类型")), None)

    if not scene:
        errors.append("missing scene wa-fam-lead (type + usage)")
    else:
        if BANNED.search(scene):
            errors.append(f"scene lead bans Admin/Arco provenance: {scene!r}")
        n = char_len(scene)
        if n < MIN_CHARS or n > MAX_CHARS:
            errors.append(
                f"scene lead length {n} not in {MIN_CHARS}–{MAX_CHARS} chars: {scene!r}"
            )

    if not type_line:
        errors.append("missing wa-fam-lead starting with 组件类型：")

    # members must be string slugs
    mb = MEMBERS_BLOCK_RE.search(text)
    if not mb:
        errors.append("WA_FAMILY.members missing")
    else:
        body = mb.group(1)
        if OBJECT_MEMBER_RE.search(body):
            errors.append("WA_FAMILY.members must be slug strings, not {id,name} objects")

    # single mount via family.js — no second WebArco.mount after it
    m_fam = FAMILY_JS_RE.search(text)
    if not m_fam:
        errors.append("family.js script missing")
    else:
        after = text[m_fam.end() :]
        if MOUNT_RE.search(after):
            errors.append("WebArco.mount after family.js (breaks copyPrompt)")
        # also flag page-level mount before family.js when setup exists
        before = text[: m_fam.start()]
        # Allow only mounts inside comments? Count raw mounts in before — family pages
        # should not mount themselves; setup goes into WA_FAMILY.setup.
        mounts_before = list(MOUNT_RE.finditer(before))
        if mounts_before:
            errors.append(
                f"WebArco.mount in page before family.js "
                f"({len(mounts_before)}×); use WA_FAMILY.setup instead"
            )

    return errors


def main() -> int:
    ap = argparse.ArgumentParser(
        description="Check family wa-fam-lead + WA_FAMILY mount wiring"
    )
    ap.add_argument(
        "--root",
        type=Path,
        default=COMPONENTS,
        help="components directory (default: frame/web/components)",
    )
    args = ap.parse_args()
    root = args.root.resolve()
    if not root.is_dir():
        print(f"not a directory: {root}", file=sys.stderr)
        return 2

    bad = 0
    checked = 0
    for index in sorted(root.glob("*/index.html")):
        text = index.read_text(encoding="utf-8")
        if "wa-fam-lead" not in text:
            continue
        checked += 1
        errs = check_index(index)
        if errs:
            bad += 1
            rel = index.relative_to(ROOT).as_posix()
            print(f"FAIL {rel}")
            for e in errs:
                print(f"  - {e}")

    print(f"checked {checked} family pages, failed {bad}")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
