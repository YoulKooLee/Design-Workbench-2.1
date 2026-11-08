#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""查找 AI 评审已完成 的位置"""
import os

admin_dir = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin"
index_js = os.path.join(admin_dir, "assets", "index.js")

with open(index_js, "r", encoding="utf-8") as f:
    js = f.read()

print(f"文件大小: {len(js):,} 字节")

# 搜索"AI 评审已完成"
keyword = "AI 评审已完成"
idx = js.find(keyword)
print(f"\n'{keyword}' 位置: {idx}")
if idx >= 0:
    print(js[max(0, idx-200):idx+500])
