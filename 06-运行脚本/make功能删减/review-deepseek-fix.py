#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""复核 DeepSeek 的修复"""
import os

admin_dir = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin"
index_js = os.path.join(admin_dir, "assets", "index.js")

with open(index_js, "r", encoding="utf-8") as f:
    js = f.read()

print(f"文件大小: {len(js)} 字符")

# 1. 检查 NE 数组
print("\n=== 1. NE 数组位置 ===")
idx = js.find("design-note")
if idx >= 0:
    print(f"找到 'design-note' 位置: {idx}")
    print(js[max(0, idx-200):idx+400])
else:
    print("未找到 'design-note'")

# 2. 检查 reviewPrompts 初始化
print("\n=== 2. reviewPrompts 相关 ===")
import re

# 找 reviewPrompts: 后面跟着的赋值
patterns = [
    r"reviewPrompts:\s*\{",
    r"reviewPrompts:\s*NE",
    r"reviewPrompts:\s*async",
]

for pat in patterns:
    matches = list(re.finditer(pat, js))
    if matches:
        print(f"模式 '{pat}' 找到 {len(matches)} 处:")
        for m in matches[:3]:
            idx = m.start()
            print(f"  位置 {idx}: {js[max(0, idx-50):idx+200]}")

# 3. 检查 handleRunReviewDirect
print("\n=== 3. handleRunReviewDirect ===")
idx = js.find("handleRunReviewDirect")
if idx >= 0:
    print(f"找到 'handleRunReviewDirect' 位置: {idx}")
    print(js[max(0, idx-100):idx+500])
else:
    print("未找到 'handleRunReviewDirect'")

# 4. 检查"AI 评审已完成"提示
print("\n=== 4. AI 评审已完成 ===")
idx = js.find("AI 评审已完成")
if idx >= 0:
    print(f"找到位置: {idx}")
    print(js[max(0, idx-200):idx+300])
else:
    print("未找到 'AI 评审已完成'")
