#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
评审链路端到端验证
==================
检查三件事：
  1. 原型 .spec/reviews/ 下有没有生成 .md 报告
  2. 最新 ACP 线程：用户提示词是否正确、assistant 是否真有输出、run 状态
  3. codebuddy 日志：这次请求有没有被 skipRun 吞掉

用法：
  python verify-review-flow.py                          # 默认查 shadcn-admin-dashboard
  python verify-review-flow.py sample-page              # 查指定原型
"""
import glob
import json
import os
import re
import sys

PROJECT = r"D:\产品设计工作台\01-项目\测试"
PROTO = sys.argv[1] if len(sys.argv) > 1 else "shadcn-admin-dashboard"
SPEC = os.path.join(PROJECT, "src", "prototypes", PROTO, ".spec")
REVIEWS = os.path.join(SPEC, "reviews")
THREADS = os.path.join(SPEC, "acp", "threads")
LOGDIR = os.path.expanduser(r"~\.codebuddy\logs")

GEN = os.path.join(PROJECT, ".agents", "_placeholder")  # 仅占位，未使用


def hr(title):
    print("\n" + "=" * 74)
    print(title)
    print("=" * 74)


hr(f"1. 报告文件 — {PROTO}/.spec/reviews/")
if not os.path.isdir(REVIEWS):
    print("  目录不存在")
else:
    mds = sorted(glob.glob(os.path.join(REVIEWS, "*.md")), key=os.path.getmtime, reverse=True)
    if not mds:
        print("  ✗ 没有任何 .md 报告（列表会是「暂无评审报告」空态）")
    else:
        for p in mds:
            st = os.stat(p)
            import datetime
            t = datetime.datetime.fromtimestamp(st.st_mtime).strftime("%Y-%m-%d %H:%M:%S")
            print(f"  ✓ {os.path.basename(p):28s} {st.st_size:7d} B  {t}")
    others = [os.path.basename(p) for p in glob.glob(os.path.join(REVIEWS, "*")) if not p.endswith(".md")]
    if others:
        print(f"  （同目录非 .md 文件: {', '.join(others)}）")

hr("2. 最新 ACP 线程")
if not os.path.isdir(THREADS):
    print("  无 threads 目录")
else:
    files = sorted(glob.glob(os.path.join(THREADS, "*.json")), key=os.path.getmtime, reverse=True)
    for p in files[:3]:
        import datetime
        mt = datetime.datetime.fromtimestamp(os.path.getmtime(p)).strftime("%H:%M:%S")
        try:
            d = json.load(open(p, encoding="utf-8"))
        except Exception as e:
            print(f"  {mt} {os.path.basename(p)[:12]} 解析失败: {e}")
            continue
        run = (d.get("run") or {}).get("state")
        print(f"\n  --- {os.path.basename(p)[:12]}  mtime={mt}  run={run}")
        for m in (d.get("repository") or {}).get("messages", []):
            c = m.get("content") or {}
            role = c.get("role")
            parts = c.get("parts") or []
            txt = "".join(pt.get("text") or "" for pt in parts if pt.get("type") == "text")
            kinds = [pt.get("type") for pt in parts]
            if role == "user":
                head = txt.split("\n")[0] if txt else ""
                print(f"    [user] {len(txt)}字符  首行: {head[:70]}")
            else:
                flag = "✓ 有正文" if txt.strip() else "✗ 无正文（空回复）"
                print(f"    [assistant] {len(txt)}字符 parts={kinds}  {flag}")
                if txt.strip():
                    print(f"      开头: {txt.strip()[:160]}")
                meta = (c.get("metadata") or {}).get("custom") or {}
                acp = meta.get("acpRun") or {}
                if acp:
                    print(f"      acpRun.status={acp.get('status')} error={acp.get('error')}")

hr("3. codebuddy 日志 — 是否又被 skipRun")
cands = sorted(glob.glob(os.path.join(LOGDIR, "*", "*.log")), key=os.path.getmtime, reverse=True)
if not cands:
    print("  未找到日志")
else:
    logp = cands[0]
    import datetime
    print(f"  日志: {logp}")
    print(f"  修改时间: {datetime.datetime.fromtimestamp(os.path.getmtime(logp)):%Y-%m-%d %H:%M:%S}")
    lines = open(logp, encoding="utf-8", errors="replace").read().splitlines()
    tail = lines[-4000:]
    skips = [l for l in tail if "skipRun" in l and "preserving active run" in l]
    prompts = [l for l in tail if "PromptIterator] received prompt" in l]
    errs = [l for l in tail if re.search(r"\[Error\]", l)]
    print(f"  最近 4000 行内: 收到 prompt {len(prompts)} 条 / skipRun 吞掉 {len(skips)} 条 / Error {len(errs)} 条")
    for l in skips[-3:]:
        print("    SKIP:", l[:190])
    for l in errs[-3:]:
        print("    ERR :", l[:190])

hr("判定")
has_md = os.path.isdir(REVIEWS) and bool(glob.glob(os.path.join(REVIEWS, "*.md")))
print("  报告文件已生成:", "✓ 是" if has_md else "✗ 否")
print()
print("  若 assistant 有正文但没 .md -> AI 回了话但没落文件，看它的回复里怎么说")
print("  若 assistant 仍无正文      -> 会话可能又卡住了，需要再重置一次")
print("  若日志仍有 skipRun         -> 会话未真正重置")
