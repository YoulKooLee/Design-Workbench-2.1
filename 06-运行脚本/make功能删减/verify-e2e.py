#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
重启后的端到端验证（只针对测试项目）
1) 服务进程/端口
2) 服务端 cli.mjs 是否仍是 docs/reviews 补丁版
3) admin bundle 是否仍是我打的 3389CFEC3D01
4) 列表接口能否读到 docs/reviews 里的真实报告
5) 管理端下发的 index.js 内容
"""
import datetime
import glob
import hashlib
import json
import os
import subprocess
import urllib.parse
import urllib.request

BASE = "http://127.0.0.1:53817"
PROJ = r"D:\产品设计工作台\01-项目\测试"
ADMIN = os.path.join(PROJ, r"node_modules\.pnpm\@axhub+make@0.6.21\node_modules\@axhub\make\dist\admin\assets\index.js")
SERVER = os.path.join(PROJ, r"node_modules\.pnpm\@axhub+make@0.6.21\node_modules\@axhub\make\dist\server\cli.mjs")


def h(p):
    return hashlib.sha256(open(p, "rb").read()).hexdigest()[:12]


def hr(t):
    print("\n" + "=" * 74)
    print(t)
    print("=" * 74)


hr("1. 服务与端口")
try:
    r = urllib.request.urlopen(BASE + "/api/health", timeout=10)
    d = json.loads(r.read().decode())
    print(f"  /api/health ok={d.get('ok')}  pid={d.get('server',{}).get('pid')}  port={d.get('server',{}).get('port')}")
    print(f"  projectRoot={d.get('projectRoot')}")
    print(f"  capabilities.reviewReports={d.get('capabilities',{}).get('reviewReports')}")
except Exception as e:
    print(f"  ✗ 服务不可达: {e}")
    raise SystemExit(1)

hr("2. 服务端代码是否为 docs/reviews 补丁版")
js = open(SERVER, encoding="utf-8").read()
import re
m = re.search(r"function getPrototypeReviewsDir\(prototypeDir\) \{[\s\S]{0,160}?\}", js)
print(f"  server 文件 {os.path.getsize(SERVER):,} B   sha256={h(SERVER)}")
print(f"  修改时间 {datetime.datetime.fromtimestamp(os.path.getmtime(SERVER)):%Y-%m-%d %H:%M:%S}")
print(f"  函数: {m.group(0).replace(chr(10), ' ') if m else '未找到'}")
server_ok = m is not None and '"docs", "reviews"' in m.group(0)
print(f"  ==> {'✓ 已是 docs/reviews' if server_ok else '✗ 仍是 .spec/reviews（补丁又被覆盖）'}")

hr("3. admin bundle 版本")
print(f"  {os.path.getsize(ADMIN):,} B   sha256={h(ADMIN)}   (期望 3389CFEC3D01)")
aj = open(ADMIN, encoding="utf-8").read()
print(f"  /.spec/reviews/ 出现 {aj.count('/.spec/reviews/')} 次（应 0）")
print(f"  /docs/reviews/  出现 {aj.count('/docs/reviews/')} 次（应 2）")
print(f"  失败提示出现 {aj.count('AI 侧栏未接受本次评审请求')} 次（应 1）")

hr("4. 列表接口实测（关键）")
for proto in ["sample-page", "shadcn-admin-dashboard"]:
    qs = urllib.parse.urlencode({"projectId": "测试", "prototypeId": proto})
    try:
        r = urllib.request.urlopen(f"{BASE}/api/review-reports?{qs}", timeout=20)
        d = json.loads(r.read().decode())
        reps = d.get("reports") or []
        print(f"\n  prototypeId={proto}  报告数={len(reps)}")
        for rep in reps:
            print(f"    ✓ {rep.get('title')}  ({rep.get('createdAt')})")
            print(f"      path={rep.get('path')}")
            print(f"      id={rep.get('id')}  reviewer={rep.get('reviewer')}  score={rep.get('score')}")
        if not reps:
            print("    （空）")
    except Exception as e:
        print(f"  {proto}: 请求失败 {e}")

hr("5. 磁盘上的报告文件")
for proto in ["sample-page", "shadcn-admin-dashboard"]:
    for label in ("docs/reviews", ".spec/reviews"):
        d = os.path.join(PROJ, "src", "prototypes", proto, *label.split("/"))
        if not os.path.isdir(d):
            print(f"  {proto}/{label}: 不存在")
            continue
        files = sorted(glob.glob(os.path.join(d, "*.md")))
        desc = ", ".join(f"{os.path.basename(f)}({os.path.getsize(f)}B)" for f in files) or "无 .md"
        print(f"  {proto}/{label}: {desc}")

hr("6. 管理端下发内容")
try:
    t = urllib.request.urlopen(BASE + "/assets/index.js", timeout=60).read().decode("utf-8", "replace")
    print(f"  长度 {len(t)}")
    print(f"  /.spec/reviews/ : {t.count('/.spec/reviews/')}（应 0）")
    print(f"  /docs/reviews/  : {t.count('/docs/reviews/')}（应 2）")
    print(f"  失败提示        : {t.count('AI 侧栏未接受本次评审请求')}（应 1）")
except Exception as e:
    print(f"  失败 {e}")

hr("结论")
print("  若第 2 项为 ✓ 且第 4 项报告数 > 0 → 全链路通了，报告能在面板里看到")
print("  若第 2 项为 ✓ 但第 4 项为 0 → 服务端还没真正重启（进程仍是旧代码）")
print("  若第 2 项为 ✗ → 补丁又被覆盖了")
