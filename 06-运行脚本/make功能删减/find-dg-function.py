#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""查找 Dg 函数的定义"""
import os

admin_dir = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin"
index_js = os.path.join(admin_dir, "assets", "index.js")

with open(index_js, "r", encoding="utf-8") as f:
    js = f.read()

# 搜索 Dg = 或 function Dg
print("=== 搜索 Dg 函数定义 ===")
import re

# 搜索 const Dg = 或 let Dg = 或 var Dg = 或 function Dg(
patterns = [
    r"const\s+Dg\s*=",
    r"let\s+Dg\s*=",
    r"var\s+Dg\s*=",
    r"function\s+Dg\s*\(",
]

for pat in patterns:
    matches = list(re.finditer(pat, js))
    if matches:
        print(f"模式 '{pat}' 找到 {len(matches)} 处:")
        for m in matches:
            idx = m.start()
            print(f"  位置 {idx}:")
            print(f"  {js[idx:idx+500]}")
            print("  ---")
