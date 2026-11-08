#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""查找 xE 组件的定义"""
import os

admin_dir = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin"
index_js = os.path.join(admin_dir, "assets", "index.js")

with open(index_js, "r", encoding="utf-8") as f:
    js = f.read()

# 搜索 directExecuteLabel，这是 xE 组件特有的 prop
keyword = "directExecuteLabel"
idx = js.find(keyword)
print(f"'{keyword}' 位置: {idx}")

if idx >= 0:
    # 往前找 500 字符，看看函数定义
    print("\n=== 往前 500 字符 ===")
    print(js[max(0, idx-500):idx])
    print("\n=== 往后 1000 字符 ===")
    print(js[idx:idx+1000])
