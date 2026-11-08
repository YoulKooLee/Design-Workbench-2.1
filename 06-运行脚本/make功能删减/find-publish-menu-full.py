#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""查看发布菜单完整内容"""
import os

admin_dir = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin"
index_js = os.path.join(admin_dir, "assets", "index.js")

with open(index_js, "r", encoding="utf-8") as f:
    js = f.read()

# 从"发布"按钮开始，往后看 2000 字符
start = js.find('children:"发布"')
print(f"'发布' 按钮位置: {start}")
if start >= 0:
    segment = js[start:start+2000]
    print(segment)
