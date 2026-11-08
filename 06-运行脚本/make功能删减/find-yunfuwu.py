#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""查找云服务菜单的位置"""
import os

admin_dir = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin"
index_js = os.path.join(admin_dir, "assets", "index.js")

with open(index_js, "r", encoding="utf-8") as f:
    js = f.read()

print(f"文件大小: {len(js):,} 字节")

# 搜索"云服务"
keyword = "云服务"
idx = 0
count = 0
while True:
    idx = js.find(keyword, idx)
    if idx < 0:
        break
    count += 1
    print(f"\n--- 第 {count} 处，位置: {idx} ---")
    print(js[max(0, idx-200):idx+200])
    idx += 1

print(f"\n总共找到 {count} 处")
