#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""搜索顶栏按钮文字"""
import os

admin_dir = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin"
index_js = os.path.join(admin_dir, "assets", "index.js")

with open(index_js, "r", encoding="utf-8") as f:
    js = f.read()

print(f"文件大小: {len(js):,} 字节")

# 搜索顶栏按钮文字（前面带空格）
keywords = ['" 规格"', '" 批注"', '" PRD 标注"', '" 评审"']
for kw in keywords:
    print(f"\n=== {kw} ===")
    idx = 0
    count = 0
    while count < 5:
        idx = js.find(kw, idx)
        if idx < 0:
            break
        count += 1
        print(f"  位置 {idx}: ...{js[max(0,idx-50):idx+80]}...")
        idx += 1
    print(f"  共 {count} 处")
