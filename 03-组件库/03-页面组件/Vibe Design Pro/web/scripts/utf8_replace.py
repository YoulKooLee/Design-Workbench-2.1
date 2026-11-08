# -*- coding: utf-8 -*-
"""Safe UTF-8 batch replace under frame/web (avoids PowerShell encoding corruption).

Examples (cwd = frame/web):
  python scripts/utf8_replace.py --glob "**/*.html" \\
    --from '旧文案' --to '新文案'

  python scripts/utf8_replace.py path/to/file.html --from '旧' --to '新' --dry-run
"""
from __future__ import annotations

import argparse
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def write_utf8(path: Path, text: str) -> None:
    # LF only; no BOM — matches rest of frame/web
    path.write_text(text, encoding="utf-8", newline="\n")


def main() -> int:
    ap = argparse.ArgumentParser(description="UTF-8-safe text replace for frame/web")
    ap.add_argument("paths", nargs="*", help="explicit files (optional if --glob)")
    ap.add_argument("--glob", action="append", default=[], help="glob under frame/web")
    ap.add_argument("--from", dest="old", required=True, help="literal string to find")
    ap.add_argument("--to", dest="new", required=True, help="replacement")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    if not args.paths and not args.glob:
        print("need paths and/or --glob", file=sys.stderr)
        return 2

    files: list[Path] = []
    for p in args.paths:
        files.append(Path(p) if Path(p).is_absolute() else ROOT / p)
    for g in args.glob:
        files.extend(sorted(ROOT.glob(g)))

    # de-dupe
    seen = set()
    uniq: list[Path] = []
    for f in files:
        r = f.resolve()
        if r in seen or not f.is_file():
            continue
        seen.add(r)
        uniq.append(f)

    changed = 0
    for path in uniq:
        text = path.read_text(encoding="utf-8")
        if args.old not in text:
            continue
        n = text.count(args.old)
        out = text.replace(args.old, args.new)
        rel = path.as_posix()
        try:
            rel = path.relative_to(ROOT).as_posix()
        except ValueError:
            pass
        print(f"{'DRY ' if args.dry_run else ''}{rel}: {n} replacement(s)")
        if not args.dry_run:
            write_utf8(path, out)
        changed += 1

    print(f"{'would touch' if args.dry_run else 'touched'} {changed} file(s)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
