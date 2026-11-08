#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""检查三个评审项的提示词配置"""
import os

admin_dir = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin"
index_js = os.path.join(admin_dir, "assets", "index.js")

with open(index_js, "r", encoding="utf-8") as f:
    js = f.read()

# 1. 查看 kc 配置对象
print("=== 1. kc 配置对象（三个评审项） ===")
idx = js.find("kc={")
if idx >= 0:
    print(js[idx:idx+2500])
else:
    print("未找到 kc={")

# 2. 查看 Xm 函数（提示词生成）
print("\n=== 2. Xm 函数（提示词生成） ===")
idx = js.find("function Xm(")
if idx >= 0:
    print(js[idx:idx+1500])
else:
    print("未找到 Xm 函数")
