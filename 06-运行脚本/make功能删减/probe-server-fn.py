#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""探查 3 个 dist/server/cli.mjs 里 getPrototypeReviewsDir 的确切写法"""
import os
import re

FILES = [
    (r"01-项目\测试\node_modules\.pnpm\@axhub+make@0.6.21\node_modules\@axhub\make\dist\server\cli.mjs", "测试"),
    (r"01-项目\Shadcn 后台管理仪表盘\node_modules\.pnpm\@axhub+make@0.6.21\node_modules\@axhub\make\dist\server\cli.mjs", "Shadcn"),
    (r"01-项目\AI漫剧工作台\node_modules\.pnpm\@axhub+make@0.6.21\node_modules\@axhub\make\dist\server\cli.mjs", "AI漫剧工作台"),
]
BASE = r"D:\产品设计工作台"

PAT = re.compile(
    r"function\s+getPrototypeReviewsDir\s*\([^)]*\)\s*\{\s*return\s+[\w$]+\.join\([^;]{0,200}?\)\s*;?\s*\}"
)

for rel, label in FILES:
    p = os.path.join(BASE, rel)
    print("=" * 74)
    print(f"{label}  ({rel})")
    print("=" * 74)
    if not os.path.exists(p):
        print("  ✗ 文件不存在")
        continue
    js = open(p, encoding="utf-8").read()
    print(f"  大小 {len(js):,} 字符")
    hits = list(PAT.finditer(js))
    print(f"  getPrototypeReviewsDir 定义命中 {len(hits)} 处")
    for m in hits:
        print(f"    @{m.start()}: {m.group(0)}")
    # 备选：宽松搜索函数体
    alt = [m.start() for m in re.finditer(r"getPrototypeReviewsDir", js)]
    print(f"  标识符总出现 {len(alt)} 处: {alt[:12]}")
    if not hits and alt:
        i = alt[0]
        print("  首个出现处上下文:")
        print("   ", js[max(0, i - 60):i + 400].replace("\n", " "))
    # 检查其他 ".spec" 用法，确保改动不会误伤
    print("  '\".spec\"' 字面量出现次数:", js.count('".spec"'))
    for m in re.finditer(r'"\.spec"', js):
        i = m.start()
        print("    @", i, ":", js[max(0, i - 90):i + 90].replace("\n", " "))
    print()
