#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""搜索 ae 的定义"""
import os

admin_dir = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin"
index_js = os.path.join(admin_dir, "assets", "index.js")

with open(index_js, "r", encoding="utf-8") as f:
    js = f.read()

# 搜索 ae= 或 ae, 或 const ae 或 let ae 或 var ae
print("=== 搜索 ae 的定义 ===")
import re

# 搜索 ae= 或 ae,
patterns = [
    r"const\s+ae\s*=",
    r"let\s+ae\s*=",
    r"var\s+ae\s*=",
    r"ae\s*=\s*[a-zA-Z]",
]

for pat in patterns:
    matches = list(re.finditer(pat, js))
    if matches:
        print(f"模式 '{pat}' 找到 {len(matches)} 处:")
        for m in matches[:10]:  # 只显示前 10 处
            idx = m.start()
            print(f"  位置 {idx}:")
            print(f"  {js[max(0, idx-50):idx+150]}")
            print("  ---")
