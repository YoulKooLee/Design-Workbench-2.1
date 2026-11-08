#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""从顶栏位置往前找 Yr 的定义"""
import os

admin_dir = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin"
index_js = os.path.join(admin_dir, "assets", "index.js")

with open(index_js, "r", encoding="utf-8") as f:
    js = f.read()

# 找顶栏容器的位置
toolbar_pos = js.find("ax-presentation-toolbar")
print(f"顶栏容器位置: {toolbar_pos}")

# 从顶栏位置往前找 Yr= 或 Yr =
# 往前找 50000 字符
search_start = max(0, toolbar_pos - 50000)
segment = js[search_start:toolbar_pos]

# 找 Yr=
yr_pos = segment.rfind("Yr=")
print(f"\n往前找 Yr= 位置（相对）: {yr_pos}")
if yr_pos >= 0:
    abs_pos = search_start + yr_pos
    print(f"绝对位置: {abs_pos}")
    print(js[max(0, abs_pos-100):abs_pos+800])
