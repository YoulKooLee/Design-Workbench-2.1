#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""查找 hn 的定义"""
import os

admin_dir = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin"
index_js = os.path.join(admin_dir, "assets", "index.js")

with open(index_js, "r", encoding="utf-8") as f:
    js = f.read()

# Yr 的位置在 294488
# 往前找 hn=
yr_pos = 294488
search_start = max(0, yr_pos - 20000)
segment = js[search_start:yr_pos]

# 找 hn=
hn_pos = segment.rfind("hn=")
print(f"往前找 hn= 位置（相对）: {hn_pos}")
if hn_pos >= 0:
    abs_pos = search_start + hn_pos
    print(f"绝对位置: {abs_pos}")
    print(js[max(0, abs_pos-50):abs_pos+1500])
