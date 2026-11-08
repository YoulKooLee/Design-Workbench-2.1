#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""检查最近 ACP 线程：提示词是否正确、assistant 是否产出、是否写了报告"""
import glob
import json
import os
import sys
import datetime

PROJECT = r"D:\产品设计工作台\01-项目\测试"
PROTOS = ["shadcn-admin-dashboard", "sample-page"]
LIMIT = int(sys.argv[1]) if len(sys.argv) > 1 else 4


def fmt(ts):
    try:
        return datetime.datetime.fromtimestamp(ts).strftime("%m-%d %H:%M:%S")
    except Exception:
        return "?"


for proto in PROTOS:
    spec = os.path.join(PROJECT, "src", "prototypes", proto, ".spec")
    threads = os.path.join(spec, "acp", "threads")
    reviews_docs = os.path.join(PROJECT, "src", "prototypes", proto, "docs", "reviews")
    reviews_spec = os.path.join(PROJECT, "src", "prototypes", proto, ".spec", "reviews")

    print("=" * 78)
    print(f"原型: {proto}")
    print("=" * 78)

    for label, d in (("docs/reviews", reviews_docs), (".spec/reviews", reviews_spec)):
        files = glob.glob(os.path.join(d, "*")) if os.path.isdir(d) else []
        print(f"  {label}: {'不存在' if not os.path.isdir(d) else (', '.join(os.path.basename(f) for f in files) or '空目录')}")
    print()

    if not os.path.isdir(threads):
        print("  无 threads 目录")
        continue

    files = sorted(glob.glob(os.path.join(threads, "*.json")), key=os.path.getmtime, reverse=True)[:LIMIT]
    for p in files:
        mt = fmt(os.path.getmtime(p))
        size = os.path.getsize(p)
        try:
            d = json.load(open(p, encoding="utf-8"))
        except Exception as e:
            print(f"  [{mt}] {os.path.basename(p)[:10]} {size:>9,}B  解析失败 {e}")
            continue
        run = (d.get("run") or {}).get("state")
        msgs = (d.get("repository") or {}).get("messages", [])
        print(f"  [{mt}] {os.path.basename(p)[:10]} {size:>9,}B  run={run}  msgs={len(msgs)}")
        for m in msgs:
            c = m.get("content") or {}
            role = c.get("role")
            parts = c.get("parts") or []
            kinds = [pt.get("type") for pt in parts]
            txt = "".join(pt.get("text") or "" for pt in parts if pt.get("type") == "text")
            tools = [pt.get("type") for pt in parts if pt.get("type") not in
                     ("text", "reasoning", "step-start", "step-finish")]
            if role == "user":
                head = txt.split("\n")[0] if txt else ""
                tgt = ""
                for line in txt.split("\n"):
                    if "评审结果写入" in line:
                        tgt = line.strip()
                print(f"       [user] {len(txt)}字符: {head[:56]}")
                if tgt:
                    print(f"              目标: {tgt}")
            else:
                print(f"       [assistant] {len(txt)}字符 parts={kinds[:8]}{'...' if len(kinds) > 8 else ''}")
                if txt.strip():
                    print(f"              开头: {txt.strip()[:110]}")
                if tools:
                    print(f"              非文本 part: {sorted(set(tools))}")
        print()
