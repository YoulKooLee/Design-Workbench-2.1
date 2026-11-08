#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""搜索 ae 出现的位置"""
import os

admin_dir = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin"
index_js = os.path.join(admin_dir, "assets", "index.js")

with open(index_js, "r", encoding="utf-8") as f:
    js = f.read()

# 搜索 ae 出现的位置（在 Dg 函数附近）
print("=== 搜索 ae 出现的位置（Dg 函数附近） ===")
import re

# 从位置 554973 开始，往前找 5000 字符
start = 554973 - 5000
end = 554973 + 2000
segment = js[start:end]

for m in re.finditer(r"\bae\b", segment):
    idx = start + m.start()
    print(f"位置 {idx}:")
    print(js[max(0, idx-100):idx+200])
    print("---")
