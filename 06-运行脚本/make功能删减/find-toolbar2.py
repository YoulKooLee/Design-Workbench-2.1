#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""查找顶栏左边 ea 变量的定义"""
import os

admin_dir = r"D:\产品设计工作台\01-项目\Shadcn 后台管理仪表盘\node_modules\@axhub\make\dist\admin"
index_js = os.path.join(admin_dir, "assets", "index.js")

with open(index_js, "r", encoding="utf-8") as f:
    js = f.read()

# 找顶栏的 return 语句
toolbar_marker = 'className:"ax-presentation-toolbar relative h-10 flex items-center justify-between border-b px-2 bg-background shrink-0 text-[12px]"'
idx = js.find(toolbar_marker)
print(f"顶栏 return 位置: {idx}")

if idx >= 0:
    # 往前找 ea 变量
    start = max(0, idx - 10000)
    segment = js[start:idx]
    
    # 搜索 ",ea=" 或 "ea="
    import re
    matches = list(re.finditer(r'[,;\s]ea=', segment))
    print(f"\n找到 {len(matches)} 个 ea= 定义:")
    for m in matches[-5:]:  # 最后5个
        pos = m.start() + start
        print(f"\n--- 位置: {pos} ---")
        print(js[pos:pos+500])
