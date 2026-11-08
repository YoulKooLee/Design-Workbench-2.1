#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""查看 q 和 P 的定义"""
import os

admin_dir = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin"
index_js = os.path.join(admin_dir, "assets", "index.js")

with open(index_js, "r", encoding="utf-8") as f:
    js = f.read()

# 搜索 q=o.useMemo 和 P=o.useMemo
print("=== 搜索 P=o.useMemo ===")
import re
for m in re.finditer(r"P\s*=\s*o\.useMemo", js):
    idx = m.start()
    print(f"位置 {idx}:")
    print(js[idx:idx+800])
    print("---")

print("\n=== 搜索 q=o.useMemo ===")
for m in re.finditer(r"q\s*=\s*o\.useMemo", js):
    idx = m.start()
    print(f"位置 {idx}:")
    print(js[idx:idx+1000])
    print("---")
