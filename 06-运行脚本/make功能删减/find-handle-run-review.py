#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""查找 handleRunReviewDirect 函数"""
import os

admin_dir = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin"
index_js = os.path.join(admin_dir, "assets", "index.js")

with open(index_js, "r", encoding="utf-8") as f:
    js = f.read()

# 搜索 handleRunReviewDirect
keyword = "handleRunReviewDirect"
idx = js.find(keyword)
print(f"'{keyword}' 位置: {idx}")

if idx >= 0:
    # 往前找 200 字符，往后找 800 字符
    print(js[max(0, idx-200):idx+800])
