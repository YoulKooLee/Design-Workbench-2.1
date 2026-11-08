#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""查找 st、ne、fn 的定义"""
import os

admin_dir = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin"
index_js = os.path.join(admin_dir, "assets", "index.js")

with open(index_js, "r", encoding="utf-8") as f:
    js = f.read()

# Yr 的位置在 294488
yr_pos = 294488
search_start = max(0, yr_pos - 20000)
segment = js[search_start:yr_pos]

for var in ["st=", "ne=", "fn="]:
    pos = segment.rfind(var)
    print(f"\n=== '{var}' 位置（相对）: {pos} ===")
    if pos >= 0:
        abs_pos = search_start + pos
        print(f"绝对位置: {abs_pos}")
        print(js[max(0, abs_pos-20):abs_pos+300])
