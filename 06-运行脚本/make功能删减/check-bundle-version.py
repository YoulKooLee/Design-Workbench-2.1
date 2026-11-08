#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""核对当前磁盘上的 admin bundle 到底是哪个版本：我的补丁还在不在"""
import glob
import hashlib
import os

BASE = r"D:\产品设计工作台"
TARGETS = [
    (r"01-项目\测试\node_modules\.pnpm\@axhub+make@0.6.21\node_modules\@axhub\make\dist\admin\assets\index.js", "测试"),
    (r"01-项目\Shadcn 后台管理仪表盘\node_modules\.pnpm\@axhub+make@0.6.21\node_modules\@axhub\make\dist\admin\assets\index.js", "Shadcn"),
    (r"01-项目\AI漫剧工作台\node_modules\.pnpm\@axhub+make@0.6.21\node_modules\@axhub\make\dist\admin\assets\index.js", "AI漫剧工作台"),
    (r"03-组件库\04-Make客户端瘦身版\admin\assets\index.js", "瘦身版"),
]

MARKERS = [
    ("kind 修复 q/P", '"design-note":Xm({selectedItem:m'),
    ("kind 修复 page", 'page:Xm({selectedItem:m,reviewDocumentPath:P.page,kind:"page"})'),
    ("旧 requirements 条目", 'requirements:gd(m,"requirements")'),
    ("静默失败修复", 'AI 侧栏未接受本次评审请求'),
    ("旧静默返回", 'Gt.current!==p||J===!1'),
    ("报告路径 docs/reviews", 'docs/reviews'),
    ("报告路径 .spec/reviews", '.spec/reviews'),
    ("规则路径 docs/rules", 'docs/rules'),
    ("规则路径裸 rules/", '"rules/'),
    ("模板路径 docs/templates", 'docs/templates'),
    ("模板路径裸 templates/", '"templates/'),
    ("NE 三项 design-note", 'kind:"design-note",label:"设计说明审查"'),
]

for rel, label in TARGETS:
    p = os.path.join(BASE, rel)
    print("=" * 76)
    print(f"{label}   {rel}")
    print("=" * 76)
    if not os.path.exists(p):
        print("  ✗ 不存在")
        continue
    raw = open(p, "rb").read()
    js = raw.decode("utf-8", errors="replace")
    mt = os.path.getmtime(p)
    import datetime
    print(f"  文件大小 {len(raw):,} B   字符数 {len(js):,}")
    print(f"  SHA256(字节) {hashlib.sha256(raw).hexdigest()[:12]}")
    print(f"  最后修改 {datetime.datetime.fromtimestamp(mt):%Y-%m-%d %H:%M:%S}")
    print()
    for name, pat in MARKERS:
        c = js.count(pat)
        print(f"    {c:4d}  {name}   [{pat[:46]}]")
    print()

print("=" * 76)
print("备份文件（各代补丁前的快照）")
print("=" * 76)
for f in sorted(glob.glob(os.path.join(BASE, "01-项目", "**", "index.js.bak-*"), recursive=True)):
    if "99-回收站" in f:
        continue
    st = os.stat(f)
    import datetime
    print(f"  {st.st_size:>8,} B  {datetime.datetime.fromtimestamp(st.st_mtime):%m-%d %H:%M:%S}  {os.path.basename(f)}")
