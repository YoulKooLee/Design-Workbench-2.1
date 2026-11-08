#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""在 Dg 函数附近搜索 ae 的定义"""
import os

admin_dir = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin"
index_js = os.path.join(admin_dir, "assets", "index.js")

with open(index_js, "r", encoding="utf-8") as f:
    js = f.read()

# 在 Dg 函数附近往前找 ae 的定义
# Dg 函数在位置 554973
# 往前找 10000 字符
start = 554973 - 10000
end = 554973

print("=== 在 Dg 函数附近搜索 ae 的定义 ===")
import re

# 搜索 const { ... ae ... } 或 const ae = 或 let ae = 等
# 或者搜索 { ae, ... } 或 { ... ae ... } （解构赋值）

# 先搜索解构赋值
segment = js[start:end]
for m in re.finditer(r"\{\s*[^{}]*ae[^{}]*\s*\}", segment):
    idx = start + m.start()
    print(f"位置 {idx}:")
    print(f"  {js[idx:idx+200]}")
    print("  ---")
