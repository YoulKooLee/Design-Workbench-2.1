#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""查找 Xr 的定义"""
import os

admin_dir = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin"
index_js = os.path.join(admin_dir, "assets", "index.js")

with open(index_js, "r", encoding="utf-8") as f:
    js = f.read()

# Yr 的位置在 294488
# 往前找 Xr=
yr_pos = 294488
search_start = max(0, yr_pos - 10000)
segment = js[search_start:yr_pos]

# 找 Xr=
xr_pos = segment.rfind("Xr=")
print(f"往前找 Xr= 位置（相对）: {xr_pos}")
if xr_pos >= 0:
    abs_pos = search_start + xr_pos
    print(f"绝对位置: {abs_pos}")
    print(js[max(0, abs_pos-50):abs_pos+1000])
