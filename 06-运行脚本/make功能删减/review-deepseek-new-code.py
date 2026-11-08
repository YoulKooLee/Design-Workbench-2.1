#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""复核 DeepSeek 加了什么新代码"""
import os

admin_dir = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin"
index_js = os.path.join(admin_dir, "assets", "index.js")

with open(index_js, "r", encoding="utf-8") as f:
    js = f.read()

# 搜索新的关键词
keywords = [
    "design-note",
    "页面代码审查",
    "设计说明审查",
    "设计文档审查",
    "reviewPrompts",
    "buildPrompt",
    "handleStartReview",
]

for kw in keywords:
    idx = js.find(kw)
    if idx >= 0:
        print(f"\n=== '{kw}' 第一次出现位置: {idx} ===")
        print(js[max(0, idx-100):idx+300])
        print("---")
    else:
        print(f"'{kw}' 未找到")

# 搜索所有 design-note 出现的位置
print("\n=== 所有 'design-note' 出现的位置 ===")
import re
for m in re.finditer(r"design-note", js):
    idx = m.start()
    print(f"位置 {idx}: {js[max(0, idx-50):idx+100]}")
    print("---")
