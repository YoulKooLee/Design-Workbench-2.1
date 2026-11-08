#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""查找 AI 评审已完成 提示的位置"""
import os

admin_dir = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin"
index_js = os.path.join(admin_dir, "assets", "index.js")

with open(index_js, "r", encoding="utf-8") as f:
    js = f.read()

# 搜索关键词
keywords = [
    "AI 评审已完成",
    "评审已完成",
    "AI 评审",
]

for kw in keywords:
    idx = js.find(kw)
    if idx >= 0:
        print(f"\n=== '{kw}' 位置: {idx} ===")
        print(js[max(0, idx-300):idx+500])
        print("---")
    else:
        print(f"'{kw}' 未找到")
