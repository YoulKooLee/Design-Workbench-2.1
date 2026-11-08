#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""工具 v2：抽取 minified index.js 中的函数/区间/关键词上下文"""
import os
import re
import sys

ADMIN = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin"
INDEX_JS = os.path.join(ADMIN, "assets", "index.js")
OUT = r"D:\产品设计工作台\06-运行脚本\make功能删减\_diag"
os.makedirs(OUT, exist_ok=True)

with open(INDEX_JS, "r", encoding="utf-8") as f:
    JS = f.read()


def wrap(s, width=150):
    return "\n".join(s[i:i + width] for i in range(0, len(s), width))


def write(name, header, text):
    path = os.path.join(OUT, name + ".txt")
    with open(path, "w", encoding="utf-8") as f:
        f.write(f"### {name}  {header}\n\n{wrap(text)}\n")
    return path


def brace_match(s, open_idx):
    depth = 0
    i = open_idx
    n = len(s)
    in_str = None
    while i < n:
        c = s[i]
        if in_str:
            if c == "\\":
                i += 2
                continue
            if c == in_str:
                in_str = None
            i += 1
            continue
        if c in "\"'`":
            in_str = c
            i += 1
            continue
        if c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                return i + 1
        i += 1
    return -1


def find_fn_def(name, limit=8):
    cands = []
    for m in re.finditer(r"(?<![\w$.])" + re.escape(name) + r"\s*=\s*", JS):
        cands.append(("assign", m.start(), m.end()))
    for m in re.finditer(r"function\s+" + re.escape(name) + r"\s*\(", JS):
        cands.append(("function", m.start(), m.end()))
    cands.sort(key=lambda x: x[1])
    results = []
    for kind, start, after in cands[:limit]:
        ob = JS.find("{", after)
        en = brace_match(JS, ob) if ob > 0 else -1
        if en < 0:
            en = min(len(JS), after + 2000)
        results.append((kind, start, en))
    return results


def ctx(name, kw, before=200, after=600, maxhits=12):
    parts = []
    pos = []
    st = 0
    while True:
        i = JS.find(kw, st)
        if i < 0:
            break
        pos.append(i)
        st = i + 1
        if len(pos) >= maxhits:
            break
    for i in pos:
        s = max(0, i - before)
        e = min(len(JS), i + after)
        parts.append(f"===== hit @{i} =====\n{JS[s:e]}")
    write(name, f'kw="{kw}" hits={len(pos)} {pos[:maxhits]}', "\n\n".join(parts))
    print(f"OK {name}: {len(pos)} hits {pos[:maxhits]}")


if __name__ == "__main__":
    cmd = sys.argv[1]
    if cmd == "fn":
        for kind, s, e in find_fn_def(sys.argv[2]):
            write(f"fn-{sys.argv[2]}-{s}", f"[{s}:{e}] {kind}", JS[s:e])
            print(f"  -> {s}:{e} ({e-s})")
    elif cmd == "range":
        s, e = int(sys.argv[2]), int(sys.argv[3])
        name = sys.argv[4] if len(sys.argv) > 4 else f"range-{s}-{e}"
        write(name, f"[{s}:{e}] range", JS[s:e])
        print(f"OK {name} ({e-s})")
    elif cmd == "ctx":
        kw = sys.argv[2]
        name = sys.argv[3] if len(sys.argv) > 3 else "ctx"
        b = int(sys.argv[4]) if len(sys.argv) > 4 else 200
        a = int(sys.argv[5]) if len(sys.argv) > 5 else 600
        ctx(name, kw, b, a)
    elif cmd == "find":
        kw = sys.argv[2]
        pos = []
        st = 0
        while True:
            i = JS.find(kw, st)
            if i < 0:
                break
            pos.append(i)
            st = i + 1
        print(f"{kw}: {len(pos)} hits {pos[:40]}")
