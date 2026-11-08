#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""查服务端 listReviewReports 扫描的目录：是 .spec/reviews 还是 docs/reviews"""
import os
import re

P = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\server\cli.mjs"
js = open(P, encoding="utf-8").read()
print("server cli.mjs 大小:", len(js))

anchor = js.find("src/server/managementApi.reviewReports.ts")
print("reviewReports 模块起点:", anchor)
if anchor < 0:
    raise SystemExit(1)

seg_start = anchor
seg_end = min(len(js), anchor + 22000)
seg = js[seg_start:seg_end]


def wrap(x, w=150):
    return "\n".join(x[i:i + w] for i in range(0, len(x), w))


print("\n=== 段落内所有 'reviews' 出现及其上下文 ===")
for m in re.finditer("reviews", seg):
    i = m.start()
    ctx = seg[max(0, i - 160):i + 160].replace("\n", " ")
    print(f"  @{seg_start + i}: ...{ctx}...")
    print()

print("\n=== 段落内出现的路径拼接调用（path.join / resolve） ===")
for m in re.finditer(r"path67\.(join|resolve)\([^)]{0,200}\)", seg):
    print("  ", m.group(0).replace("\n", " "))

print("\n=== 段落内的目录常量/字符串字面量 ===")
for m in re.finditer(r'"[^"\n]{2,80}"', seg):
    v = m.group(0)
    if any(k in v for k in ("review", "spec", "docs", ".md", "markdown")):
        print("  ", v)

print("\n=== 是否出现 .spec ===")
for m in re.finditer(r"\.spec", js):
    print("  @", m.start(), ":", js[max(0, m.start() - 120):m.start() + 120].replace("\n", " "))

print("\n=== 函数 listReviewReports 服务端路由 ===")
for m in re.finditer(r"review-reports", seg):
    i = m.start()
    print("  @", seg_start + i, ":", seg[max(0, i - 200):i + 260].replace("\n", " "))
    print()
