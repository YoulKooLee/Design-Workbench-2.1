#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""查找 handleStartReview 函数"""
import os

admin_dir = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin"
index_js = os.path.join(admin_dir, "assets", "index.js")

with open(index_js, "r", encoding="utf-8") as f:
    js = f.read()

# 搜索 handleStartReview 的定义（不是调用）
# 可能是 handleStartReview: 或 function handleStartReview 或 const handleStartReview
import re

patterns = [
    r"handleStartReview\s*[=:]\s*async",
    r"handleStartReview\s*[=:]\s*\(",
    r"handleStartReview\s*[=:]\s*function",
]

for pat in patterns:
    matches = list(re.finditer(pat, js))
    if matches:
        print(f"\n=== 模式: {pat} ===")
        for m in matches[:3]:
            idx = m.start()
            print(f"位置: {idx}")
            print(js[max(0, idx-100):idx+500])
            print("---")
