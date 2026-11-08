#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""查找发布菜单的位置"""
import os

admin_dir = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin"
index_js = os.path.join(admin_dir, "assets", "index.js")

with open(index_js, "r", encoding="utf-8") as f:
    js = f.read()

print(f"文件大小: {len(js):,} 字节")

# 搜索"导出 HTML"
keyword = "导出 HTML"
idx = js.find(keyword)
print(f"\n'导出 HTML' 位置: {idx}")
if idx >= 0:
    print(js[max(0, idx-300):idx+500])

# 搜索"发布"
print("\n" + "="*60)
keyword = "发布"
idx = 0
count = 0
while count < 10:
    idx = js.find(keyword, idx)
    if idx < 0:
        break
    count += 1
    print(f"\n--- '发布' 第 {count} 处，位置: {idx} ---")
    print(js[max(0, idx-50):idx+100])
    idx += 1
