#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""新 bundle：确认 reviewPrompts(q) / reviewDocumentPaths(P) 到底有几项、当前 kind 默认值"""
import re

P = r"D:\产品设计工作台\01-项目\测试\node_modules\.pnpm\@axhub+make@0.6.21\node_modules\@axhub\make\dist\admin\assets\index.js"
js = open(P, encoding="utf-8").read()


def wrap(s, w=150):
    return "\n".join(s[i:i + w] for i in range(0, len(s), w))


print(f"bundle {len(js):,} 字符\n")

print("=" * 74)
print("q / P 的 useMemo 定义（找 Xm({selectedItem 与 gd(m,")
print("=" * 74)
for pat in [r"Xm\(\{selectedItem", r"gd\(m,", r"P\.design", r"P\.page", r'P\["design-note"\]', r"requirements"]:
    hits = [m.start() for m in re.finditer(pat, js)]
    print(f"\n[{pat}] {len(hits)} 处: {hits[:10]}")
    for h in hits[:3]:
        print("  ---")
        print("  " + wrap(js[max(0, h - 420):h + 380]).replace("\n", "\n  "))

print()
print("=" * 74)
print("当前评审 kind 的 state 默认值")
print("=" * 74)
for m in re.finditer(r"\[Un,\s*An\]\s*=\s*o\.useState\(", js):
    print(wrap(js[m.start() - 120:m.start() + 260]))
print()
for m in re.finditer(r"useState\(\"design-note\"\)|useState\(\"design\"\)", js):
    print("@", m.start(), ":", js[max(0, m.start() - 200):m.start() + 120].replace("\n", " "))

print()
print("=" * 74)
print("按钮 disabled 判定")
print("=" * 74)
for m in list(re.finditer(r"disabled:!Se\.trim\(\)|disabled: !Se\.trim\(\)", js))[:3]:
    print(wrap(js[max(0, m.start() - 700):m.start() + 200]))
