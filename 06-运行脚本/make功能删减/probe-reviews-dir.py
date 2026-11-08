#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""找 getPrototypeReviewsDir 的定义，确认服务端扫描目录"""
import re

P = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\server\cli.mjs"
js = open(P, encoding="utf-8").read()

for name in ["getPrototypeReviewsDir", "getPrototypeDir"]:
    print("=" * 70)
    print("搜索:", name)
    print("=" * 70)
    hits = [m.start() for m in re.finditer(re.escape(name), js)]
    print(f"共 {len(hits)} 处: {hits[:20]}")
    # 找定义
    for h in hits:
        before = js[max(0, h - 60):h]
        if re.search(r"function\s+$", before) or re.search(r"function\s+$", js[max(0, h - 20):h]):
            print(f"\n--- 定义 @{h} ---")
            print(js[h - 30:h + 700])
            print()
