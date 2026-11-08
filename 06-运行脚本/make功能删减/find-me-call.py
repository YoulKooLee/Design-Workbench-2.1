#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""查找 ME 组件的调用位置"""
import os

admin_dir = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin"
index_js = os.path.join(admin_dir, "assets", "index.js")

with open(index_js, "r", encoding="utf-8") as f:
    js = f.read()

# 搜索 ME 组件的调用（r.jsx(ME, 或 r.jsxs(ME,）
import re

patterns = [
    r"r\.jsx\(ME,",
    r"r\.jsxs\(ME,",
]

for pat in patterns:
    matches = list(re.finditer(pat, js))
    if matches:
        print(f"\n=== 模式: {pat} ===")
        for m in matches[:3]:
            idx = m.start()
            print(f"位置: {idx}")
            print(js[max(0, idx-100):idx+800])
            print("---")
