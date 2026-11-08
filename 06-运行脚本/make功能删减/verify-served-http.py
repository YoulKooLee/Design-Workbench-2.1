#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""通过 HTTP 校验管理端实际下发的 index.js 是否为补丁后版本"""
import re
import urllib.request

BASE = "http://127.0.0.1:53817"

NEW_DN = '"design-note":Xm({selectedItem:m'
NEW_PG = 'page:Xm({selectedItem:m,reviewDocumentPath:P.page,kind:"page"})'
OLD_REQ = 'requirements:gd(m,"requirements")'
NE1 = 'kind:"design-note",label:"设计说明审查"'
NE2 = 'kind:"design",label:"设计文档审查"'
NE3 = 'kind:"page",label:"页面代码审查"'


def get(url):
    with urllib.request.urlopen(url, timeout=30) as r:
        return r.status, r.read().decode("utf-8", errors="replace")


print(f"BASE = {BASE}")
status, html = get(BASE + "/")
print(f"index.html status={status} len={len(html)}")

srcs = re.findall(r'src=["\']([^"\']+\.js)["\']', html)
print(f"script 引用: {srcs or '(无，可能是模块内联或异步加载)'}")

candidates = [s for s in srcs if "index" in s] or srcs
if not candidates:
    candidates = ["/assets/index.js"]

for s in candidates:
    url = s if s.startswith("http") else (BASE + s if s.startswith("/") else BASE + "/" + s)
    try:
        st, txt = get(url)
    except Exception as e:
        print(f"\n--- {url}\n  请求失败: {e}")
        continue
    print(f"\n--- {url}")
    print(f"  status={st} len={len(txt)}")
    print(f"  新补丁 design-note 条目 : {txt.count(NEW_DN)} 处")
    print(f"  新补丁 page 条目        : {txt.count(NEW_PG)} 处")
    print(f"  旧串 requirements:gd(m  : {txt.count(OLD_REQ)} 处（应为 0）")
    print(f"  NE 三个评审项           : {txt.count(NE1)}/{txt.count(NE2)}/{txt.count(NE3)}")

    ok = (
        txt.count(NEW_DN) == 1
        and txt.count(NEW_PG) == 1
        and txt.count(OLD_REQ) == 0
        and txt.count(NE1) == 1
        and txt.count(NE2) == 1
        and txt.count(NE3) == 1
    )
    print(f"  ==> 服务下发内容{'已是补丁版 ✓' if ok else '不是补丁版 ✗'}")
