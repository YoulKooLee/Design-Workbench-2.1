#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""查找 reviewPrompts 的初始化位置"""
import os

admin_dir = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin"
index_js = os.path.join(admin_dir, "assets", "index.js")

with open(index_js, "r", encoding="utf-8") as f:
    js = f.read()

# 搜索 reviewPrompts: 后面跟着的内容
import re

# 找 reviewPrompts: 后面跟着的赋值
patterns = [
    r"reviewPrompts:\s*\{",
    r"reviewPrompts:\s*\[",
    r"reviewPrompts:\s*NE",
]

for pat in patterns:
    matches = list(re.finditer(pat, js))
    if matches:
        print(f"\n=== 模式: {pat} ===")
        for m in matches[:5]:
            idx = m.start()
            print(f"位置: {idx}")
            print(js[max(0, idx-50):idx+300])
            print("---")
