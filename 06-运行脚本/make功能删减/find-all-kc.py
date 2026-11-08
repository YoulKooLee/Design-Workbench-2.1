#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""搜索所有 kc 配置对象"""
import os

admin_dir = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin"
index_js = os.path.join(admin_dir, "assets", "index.js")

with open(index_js, "r", encoding="utf-8") as f:
    js = f.read()

# 搜索所有 kc={ 的位置
print("=== 所有 kc={ 的位置 ===")
import re
for m in re.finditer(r"kc\s*=\s*\{", js):
    idx = m.start()
    print(f"位置 {idx}:")
    print(js[idx:idx+500])
    print("---")
