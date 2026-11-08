#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""查找 AI 评审调用的 API 类型"""
import os

admin_dir = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin"
index_js = os.path.join(admin_dir, "assets", "index.js")

with open(index_js, "r", encoding="utf-8") as f:
    js = f.read()

# 搜索关键词
keywords = [
    "CodeBuddy",
    "codebuddy",
    "网页任务",
    "webTask",
    "web_task",
    "runReview",
    "startReview",
    "reviewApi",
    "apiService",
]

for kw in keywords:
    idx = js.find(kw)
    if idx >= 0:
        print(f"\n=== '{kw}' 位置: {idx} ===")
        print(js[max(0, idx-150):idx+300])
        print("---")
