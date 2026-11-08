#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
服务端补丁验证：
  1. node --check 三个 cli.mjs（按 ESM 解析）
  2. 把补丁后的 getPrototypeReviewsDir 抽出来，在 Node 里真跑一次，确认返回 docs/reviews
  3. 打印相关派生路径（config.json）
"""
import json
import os
import re
import subprocess
import tempfile

BASE = r"D:\产品设计工作台"
NODE = r"C:\Users\Admin\AppData\Local\Microsoft\WinGet\Packages\OpenJS.NodeJS.22_Microsoft.Winget.Source_8wekyb3d8bbwe\node-v22.23.2-win-x64\node.exe"

FILES = [
    (r"01-项目\测试\node_modules\.pnpm\@axhub+make@0.6.21\node_modules\@axhub\make\dist\server\cli.mjs", "测试"),
    (r"01-项目\Shadcn 后台管理仪表盘\node_modules\.pnpm\@axhub+make@0.6.21\node_modules\@axhub\make\dist\server\cli.mjs", "Shadcn 后台管理仪表盘"),
    (r"01-项目\AI漫剧工作台\node_modules\.pnpm\@axhub+make@0.6.21\node_modules\@axhub\make\dist\server\cli.mjs", "AI漫剧工作台"),
]

TMP = os.path.join(BASE, r"06-运行脚本\make功能删减\_diag")
os.makedirs(TMP, exist_ok=True)

FN_PAT = re.compile(
    r"function\s+getPrototypeReviewsDir\s*\(prototypeDir\)\s*\{.*?\n\}"
    r"|function\s+getPrototypeReviewConfigPath\s*\(prototypeDir\)\s*\{.*?\n\}",
    re.S,
)

print("=" * 78)
print("1. 语法校验 node --check")
print("=" * 78)
all_ok = True
for rel, label in FILES:
    p = os.path.join(BASE, rel)
    tmp = os.path.join(TMP, "_chk-server.mjs")
    with open(p, "rb") as f, open(tmp, "wb") as g:
        g.write(f.read())
    r = subprocess.run([NODE, "--check", tmp], capture_output=True, text=True, encoding="utf-8")
    status = "OK" if r.returncode == 0 else "FAIL"
    if r.returncode != 0:
        all_ok = False
    print(f"  [{status}] {label}  (exit={r.returncode})")
    if r.returncode != 0:
        print("    ", (r.stderr or "")[:600])
    os.remove(tmp)

print()
print("=" * 78)
print("2. 运行时行为验证：抽函数在 Node 里真跑")
print("=" * 78)
for rel, label in FILES:
    p = os.path.join(BASE, rel)
    js = open(p, encoding="utf-8").read()
    fns = FN_PAT.findall(js)
    if not fns:
        print(f"  ✗ {label}: 抽不到函数")
        all_ok = False
        continue
    harness = (
        "import path44 from 'node:path';\n"
        "const REVIEW_CONFIG_FILE_NAME = 'config.json';\n"
        + "\n".join(fns)
        + "\nconst dir = path44.join('D:' + path44.sep, 'proj', 'src', 'prototypes', 'demo');\n"
        "console.log(JSON.stringify({\n"
        "  reviewsDir: getPrototypeReviewsDir(dir),\n"
        "  configPath: getPrototypeReviewConfigPath(dir),\n"
        "}));\n"
    )
    tmp = os.path.join(TMP, "_run-server-fn.mjs")
    with open(tmp, "w", encoding="utf-8", newline="") as f:
        f.write(harness)
    r = subprocess.run([NODE, tmp], capture_output=True, text=True, encoding="utf-8")
    os.remove(tmp)
    if r.returncode != 0:
        print(f"  ✗ {label}: 运行失败 {(r.stderr or '')[:300]}")
        all_ok = False
        continue
    try:
        data = json.loads(r.stdout.strip())
    except Exception as e:
        print(f"  ✗ {label}: 输出无法解析 {e}  raw={r.stdout[:200]}")
        all_ok = False
        continue
    reviews_dir = str(data["reviewsDir"]).replace("\\", "/")
    config_path = str(data["configPath"]).replace("\\", "/")
    good = reviews_dir.endswith("docs/reviews") and config_path.endswith("docs/reviews/config.json")
    if not good:
        all_ok = False
    print(f"  [{'OK' if good else 'FAIL'}] {label}")
    print(f"        reviewsDir = {reviews_dir}")
    print(f"        configPath = {config_path}")

print()
print("=" * 78)
print("3. 配置迁移结果")
print("=" * 78)
for rel_proj, label in [
    (r"01-项目\测试", "测试"),
    (r"01-项目\Shadcn 后台管理仪表盘", "Shadcn"),
    (r"01-项目\AI漫剧工作台", "AI漫剧工作台"),
]:
    proto_root = os.path.join(BASE, rel_proj, "src", "prototypes")
    if not os.path.isdir(proto_root):
        continue
    for name in sorted(os.listdir(proto_root)):
        docs_cfg = os.path.join(proto_root, name, "docs", "reviews", "config.json")
        spec_cfg = os.path.join(proto_root, name, ".spec", "reviews", "config.json")
        if os.path.exists(docs_cfg):
            print(f"  ✓ {label}/{name}: docs/reviews/config.json 就位 ({os.path.getsize(docs_cfg)} B)")
        elif os.path.exists(spec_cfg):
            print(f"  ! {label}/{name}: 只有 .spec/reviews/config.json，未迁移")

print()
print("✅ 全部通过" if all_ok else "❌ 有问题，请检查")
