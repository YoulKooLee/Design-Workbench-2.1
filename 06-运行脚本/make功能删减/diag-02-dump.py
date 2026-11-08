#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""诊断第 2 步：导出关键代码区间到文本文件"""
import os

admin_dir = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin"
index_js = os.path.join(admin_dir, "assets", "index.js")
out_dir = r"D:\产品设计工作台\06-运行脚本\make功能删减\_diag"
os.makedirs(out_dir, exist_ok=True)

with open(index_js, "r", encoding="utf-8") as f:
    js = f.read()

# (名字, 起始, 结束)
regions = [
    ("A-NE-metadata", 393300, 393750),
    ("B-ME-xE-components", 388900, 390100),
    ("C-ME-props", 393750, 394500),
    ("D-ME-callsite", 412700, 414100),
    ("E-handle-defs", 575100, 577200),
    ("F-handle-callsite", 583600, 588400),
    ("G-requirement-old", 465400, 465900),
]

for name, start, end in regions:
    start = max(0, start)
    end = min(len(js), end)
    path = os.path.join(out_dir, name + ".txt")
    with open(path, "w", encoding="utf-8") as f:
        f.write(f"### {name}  [{start}:{end}]  len={end-start}\n\n")
        f.write(js[start:end])
    print(f"写出 {path}  ({end-start} chars)")
