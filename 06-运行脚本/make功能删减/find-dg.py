#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""查找 Dg 在哪里被赋值"""
import os

admin_dir = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin"
index_js = os.path.join(admin_dir, "assets", "index.js")

with open(index_js, "r", encoding="utf-8") as f:
    js = f.read()

# 搜索 Dg 出现的位置
print("=== 搜索 Dg 出现的位置 ===")
import re
for m in re.finditer(r"\bDg\b", js):
    idx = m.start()
    print(f"位置 {idx}:")
    print(js[max(0, idx-100):idx+200])
    print("---")
