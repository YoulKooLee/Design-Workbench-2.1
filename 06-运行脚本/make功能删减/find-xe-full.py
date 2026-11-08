#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""查找 xE 组件的完整渲染代码"""
import os

admin_dir = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin"
index_js = os.path.join(admin_dir, "assets", "index.js")

with open(index_js, "r", encoding="utf-8") as f:
    js = f.read()

# 找 xE 函数的位置
xe_start = js.find("function xE(")
print(f"xE 函数起始位置: {xe_start}")

# 从 xE 函数开始，往后取 3000 字符
xe_code = js[xe_start:xe_start+3000]
print("\n=== xE 组件完整代码 ===")
print(xe_code)
