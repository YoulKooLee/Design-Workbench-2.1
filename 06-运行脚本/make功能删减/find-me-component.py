#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""查找 ME 组件里 Eo 组件的使用"""
import os

admin_dir = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin"
index_js = os.path.join(admin_dir, "assets", "index.js")

with open(index_js, "r", encoding="utf-8") as f:
    js = f.read()

# 找 ME 函数的位置
me_start = js.find("function ME(")
print(f"ME 函数起始位置: {me_start}")

# 从 ME 函数开始，往后找 3000 字符，看看 Eo 组件的使用
me_code = js[me_start:me_start+3000]
print("\n=== ME 组件代码（前 3000 字符） ===")
print(me_code)
