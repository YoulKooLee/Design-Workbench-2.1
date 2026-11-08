#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""查看 Dg 函数的完整代码"""
import os

admin_dir = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin"
index_js = os.path.join(admin_dir, "assets", "index.js")

with open(index_js, "r", encoding="utf-8") as f:
    js = f.read()

# 从位置 554973 开始，打印 2000 字符
idx = 554973
print(js[idx:idx+2000])
