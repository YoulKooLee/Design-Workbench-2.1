#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""搜索 .spec/reviews 位置"""
import os

admin_dir = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin"
index_js = os.path.join(admin_dir, "assets", "index.js")

with open(index_js, "r", encoding="utf-8") as f:
    js = f.read()

# 搜索 .spec/reviews
print("=== 搜索 '.spec/reviews' ===")
import re
for m in re.finditer(r"\.spec/reviews", js):
    idx = m.start()
    print(f"位置 {idx}: {js[max(0, idx-100):idx+100]}")
    print("---")

# 搜索 .spec
print("\n=== 搜索 '.spec'（前 20 个） ===")
for i, m in enumerate(re.finditer(r"\.spec", js)):
    if i >= 20:
        break
    idx = m.start()
    print(f"位置 {idx}: {js[max(0, idx-50):idx+80]}")
    print("---")
