#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""查看 DeepSeek 写的提示词生成代码"""
import os

admin_dir = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin"
index_js = os.path.join(admin_dir, "assets", "index.js")

with open(index_js, "r", encoding="utf-8") as f:
    js = f.read()

# 1. 查看 kc 配置对象
print("=== 1. kc 配置对象（位置 463322 附近） ===")
idx = js.find("kc={")
if idx >= 0:
    print(js[idx:idx+2000])
else:
    print("未找到 kc={")

# 2. 查看提示词生成函数 Xm
print("\n=== 2. Xm 函数（提示词生成） ===")
idx = js.find("function Xm")
if idx >= 0:
    print(js[idx:idx+2000])
else:
    # 或者是 const Xm =
    import re
    m = re.search(r"Xm\s*=\s*", js)
    if m:
        idx = m.start()
        print(js[max(0, idx-100):idx+2000])
    else:
        print("未找到 Xm")
