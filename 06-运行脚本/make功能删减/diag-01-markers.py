#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""诊断第 1 步：定位所有关键标识符出现位置"""
import os

admin_dir = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin"
index_js = os.path.join(admin_dir, "assets", "index.js")

with open(index_js, "r", encoding="utf-8") as f:
    js = f.read()

print(f"文件长度: {len(js)}")
print(f"行数: {js.count(chr(10)) + 1}")

keywords = [
    "design-note",
    "设计说明审查",
    "设计文档审查",
    "页面代码审查",
    "审查页面设计说明卡片",
    "审查 HLD/LLD",  # 注意 NE 里可能没空格
    "审查 HLD",
    "审查生成的页面代码",
    "reviewPrompts",
    "handleStartReview",
    "handleRunReviewDirect",
    "onRunReviewDirect",
    "onExecutePrompt",
    "onDirectExecute",
    "reviewDocumentPaths",
    "AI 执行",
    "AI审核",
    "AI 审核",
    "已发送到 AI 侧栏",
    "提示词已复制到剪贴板",
    "没有可用的 Prompt",
    "requirement",
]

for kw in keywords:
    positions = []
    start = 0
    while True:
        idx = js.find(kw, start)
        if idx < 0:
            break
        positions.append(idx)
        start = idx + 1
        if len(positions) > 30:
            break
    print(f"\n[{kw}] 出现 {len(positions)} 次: {positions[:30]}")
