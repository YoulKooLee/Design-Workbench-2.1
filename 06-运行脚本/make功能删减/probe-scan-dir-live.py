#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
实测服务端到底扫哪个目录。
分别在 .spec/reviews 与 docs/reviews 放一个探针报告，调列表 API 看哪个被读出来，然后清理。
"""
import json
import os
import urllib.request
import urllib.parse

BASE = "http://127.0.0.1:53817"
PROJECT_ROOT = r"D:\产品设计工作台\01-项目\测试"
PROTO = "sample-page"
PROTO_DIR = os.path.join(PROJECT_ROOT, "src", "prototypes", PROTO)

SPEC_REVIEWS = os.path.join(PROTO_DIR, ".spec", "reviews")
DOCS_REVIEWS = os.path.join(PROTO_DIR, "docs", "reviews")

PROBE_SPEC = os.path.join(SPEC_REVIEWS, "zzprobe-spec.md")
PROBE_DOCS = os.path.join(DOCS_REVIEWS, "zzprobe-docs.md")

REPORT = """---
title: 探针报告
reviewer: probe
createdAt: 2026-11-08T14:00:00.000Z
source: probe
---

# 探针正文
"""


def get(path):
    url = BASE + path
    with urllib.request.urlopen(url, timeout=20) as r:
        return r.status, r.read().decode("utf-8", errors="replace")


def try_get(path):
    try:
        return get(path)
    except Exception as e:
        return None, f"{type(e).__name__}: {e}"


print("=" * 70)
print("1. 准备探针文件")
print("=" * 70)
os.makedirs(SPEC_REVIEWS, exist_ok=True)
os.makedirs(DOCS_REVIEWS, exist_ok=True)
for p in (PROBE_SPEC, PROBE_DOCS):
    with open(p, "w", encoding="utf-8", newline="") as f:
        f.write(REPORT)
    print(f"  写入 {p}")

print()
print("=" * 70)
print("2. 尝试调用列表 API")
print("=" * 70)
qs = urllib.parse.urlencode({"projectId": "", "prototypeId": PROTO})
candidates = [
    f"/api/review-reports?{qs}",
    f"/api/review-reports/list?{qs}",
    f"/api/review-reports?prototypeId={PROTO}",
]
found = None
for c in candidates:
    st, body = try_get(c)
    print(f"\n  GET {c}\n    -> status={st}")
    if st == 200:
        print("    body:", body[:600])
        if found is None:
            found = (c, body)
    else:
        print("    err:", str(body)[:200])

print()
print("=" * 70)
print("3. 清理探针文件")
print("=" * 70)
for p in (PROBE_SPEC, PROBE_DOCS):
    if os.path.exists(p):
        os.remove(p)
        print(f"  已删除 {p}")
# 移除可能新建的空 docs/reviews
for d in (DOCS_REVIEWS,):
    if os.path.isdir(d) and not os.listdir(d):
        os.rmdir(d)
        print(f"  已移除空目录 {d}")

print()
print("=" * 70)
print("4. 结论依据")
print("=" * 70)
if found:
    route, body = found
    has_spec = "zzprobe-spec" in body
    has_docs = "zzprobe-docs" in body
    print(f"  列表接口: {route}")
    print(f"  读到 .spec/reviews 里的探针: {has_spec}")
    print(f"  读到 docs/reviews  里的探针: {has_docs}")
    if has_spec or has_docs:
        target = ".spec/reviews" if has_spec else "docs/reviews"
        print(f"  ==> 服务端实际扫描的是: {target}")
else:
    print("  未能调通列表接口，改用代码静态结论：getPrototypeReviewsDir 返回 .spec/reviews")
