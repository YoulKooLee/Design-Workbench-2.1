#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""对着 23:47 的新构建，重新摸清评审链路的实际代码"""
import os
import re

P = r"D:\产品设计工作台\01-项目\测试\node_modules\.pnpm\@axhub+make@0.6.21\node_modules\@axhub\make\dist\admin\assets\index.js"
js = open(P, encoding="utf-8").read()
OUT = r"D:\产品设计工作台\06-运行脚本\make功能删减\_diag\newbundle.txt"


def wrap(s, w=150):
    return "\n".join(s[i:i + w] for i in range(0, len(s), w))


def show(f, label, pos, before=350, after=700):
    f.write(f"\n{'=' * 72}\n{label}   @{pos}\n{'=' * 72}\n")
    f.write(wrap(js[max(0, pos - before):pos + after]) + "\n")


with open(OUT, "w", encoding="utf-8") as f:
    f.write(f"bundle 长度 {len(js):,} 字符\n")

    # 1. 评审项元数据
    f.write("\n" + "#" * 72 + "\n# 1. NE 数组 / 评审项元数据\n" + "#" * 72 + "\n")
    for pat in ["设计说明审查", "设计文档审查", "页面代码审查"]:
        hits = [m.start() for m in re.finditer(pat, js)]
        f.write(f"\n[{pat}] {len(hits)} 处: {hits[:10]}\n")
        for h in hits[:3]:
            show(f, f"NE/label {pat}", h, 300, 400)

    # 2. 报告路径生成
    f.write("\n" + "#" * 72 + "\n# 2. 报告路径 / gd 函数\n" + "#" * 72 + "\n")
    for pat in [r"\.spec/reviews", r"docs/reviews"]:
        hits = [m.start() for m in re.finditer(pat, js)]
        f.write(f"\n[{pat}] {len(hits)} 处: {hits[:10]}\n")
        for h in hits[:4]:
            show(f, pat, h, 260, 260)

    # 3. reviewPrompts / reviewDocumentPaths 的 useMemo
    f.write("\n" + "#" * 72 + "\n# 3. reviewPrompts 状态初始化\n" + "#" * 72 + "\n")
    for m in re.finditer(r"reviewPrompts", js):
        show(f, "reviewPrompts", m.start(), 300, 500)

    # 4. handleRunReviewDirect
    f.write("\n" + "#" * 72 + "\n# 4. handleRunReviewDirect\n" + "#" * 72 + "\n")
    for m in re.finditer(r"handleRunReviewDirect", js):
        show(f, "handleRunReviewDirect", m.start(), 200, 300)

    # 5. xE / 按钮
    f.write("\n" + "#" * 72 + "\n# 5. 没有可用的 Prompt / 已发送到\n" + "#" * 72 + "\n")
    for pat in ["没有可用的 Prompt", "已发送到", "提示词已复制"]:
        for m in list(re.finditer(re.escape(pat), js))[:3]:
            show(f, pat, m.start(), 320, 320)

print("写出", OUT)
