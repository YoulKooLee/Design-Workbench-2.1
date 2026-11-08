#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""查找 Yr 按钮组的定义"""
import os

admin_dir = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin"
index_js = os.path.join(admin_dir, "assets", "index.js")

with open(index_js, "r", encoding="utf-8") as f:
    js = f.read()

# 找 Yr 的定义：Yr= 或 Yr =
# 在 minified JS 里通常是 const Xxx=... 或 Yr=...
# 我们找 Yr= 这个模式
pattern = "Yr="
idx = js.find(pattern)
print(f"'Yr=' 第一次出现位置: {idx}")

if idx >= 0:
    print(js[max(0, idx-100):idx+1000])
