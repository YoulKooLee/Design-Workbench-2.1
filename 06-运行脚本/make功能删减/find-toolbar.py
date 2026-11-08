#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""查找顶栏按钮组的完整代码"""
import os

admin_dir = r"D:\产品设计工作台\01-项目\Shadcn 后台管理仪表盘\node_modules\@axhub\make\dist\admin"
index_js = os.path.join(admin_dir, "assets", "index.js")

with open(index_js, "r", encoding="utf-8") as f:
    js = f.read()

print(f"文件大小: {len(js):,} 字节")
print("=" * 60)

# 找 hn= 变量的位置
hn_marker = 'hn=r.jsx(r.Fragment,{children:a&&r.jsx(r.Fragment,{children:mr||wt?Fn:s==="canvas"?Zr:r.jsxs(r.Fragment,{children:['
idx = js.find(hn_marker)
print(f"hn= 位置: {idx}")

if idx >= 0:
    # 往前找 5000 字符
    start = max(0, idx - 5000)
    print(f"\n=== hn 前面 5000 字符 ===")
    print(js[start:idx + 2000])
else:
    print("未找到 hn= 标记")
    # 找 " 批注" 按钮的位置
    idx2 = js.find('" 批注"')
    print(f"\n\" 批注\" 位置: {idx2}")
    if idx2 >= 0:
        start = max(0, idx2 - 2000)
        print(f"\n=== \" 批注\" 前面 2000 字符 ===")
        print(js[start:idx2 + 500])
