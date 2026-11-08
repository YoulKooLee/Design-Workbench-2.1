#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""查找 ME 组件的完整调用代码"""
import os

admin_dir = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin"
index_js = os.path.join(admin_dir, "assets", "index.js")

with open(index_js, "r", encoding="utf-8") as f:
    js = f.read()

# 找 ME 组件调用的位置
me_call_start = js.find("r.jsx(ME,{")
print(f"ME 组件调用起始位置: {me_call_start}")

# 往后取 2000 字符
me_call_code = js[me_call_start:me_call_start+2000]
print("\n=== ME 组件调用代码 ===")
print(me_call_code)
