#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
把服务端评审报告扫描目录从 .spec/reviews 改为 docs/reviews
==========================================================
背景：客户端已改为让 AI 写到 <原型>/docs/reviews/<file>.md，
      但服务端 dist/server/cli.mjs 的 getPrototypeReviewsDir() 仍返回
      <原型>/.spec/reviews，导致 listReports() 永远扫不到新报告。

改动：只动 getPrototypeReviewsDir 这一个函数体里的 ".spec" → "docs"。
      其余 6 处 ".spec"（产物历史、acp 会话、spec.html、排除目录等）保持不动。

注意：服务端由 bin/cli.mjs 在启动时 import，Node 只加载一次 ——
      改完必须重启 Make 客户端服务才生效。

用法：
  python fix-server-reviews-dir.py            # 试运行
  python fix-server-reviews-dir.py --apply    # 写入（自动备份）
"""
import hashlib
import os
import re
import shutil
import sys
import time

BASE = r"D:\产品设计工作台"

SERVER_FILES = [
    (r"01-项目\测试\node_modules\.pnpm\@axhub+make@0.6.21\node_modules\@axhub\make\dist\server\cli.mjs", "测试"),
    (r"01-项目\Shadcn 后台管理仪表盘\node_modules\.pnpm\@axhub+make@0.6.21\node_modules\@axhub\make\dist\server\cli.mjs", "Shadcn 后台管理仪表盘"),
    (r"01-项目\AI漫剧工作台\node_modules\.pnpm\@axhub+make@0.6.21\node_modules\@axhub\make\dist\server\cli.mjs", "AI漫剧工作台"),
]

OLD = '''function getPrototypeReviewsDir(prototypeDir) {
  return path44.join(prototypeDir, ".spec", "reviews");
}'''

NEW = '''function getPrototypeReviewsDir(prototypeDir) {
  return path44.join(prototypeDir, "docs", "reviews");
}'''

# 补丁后必须成立
CHECKS_EXACT = [
    (OLD, 0, "旧的 .spec/reviews 函数已替换"),
    (NEW, 1, "新的 docs/reviews 函数已注入"),
    ('SOURCE_EXCLUDED_DIR_NAMES = new Set([\n  ".spec"\n]);', 1, "产物扫描排除 .spec 未受影响"),
    ('.spec", "acp", "conversations.json', 1, ".spec/acp 会话路径未受影响"),
    ('function getPrototypeReviewConfigPath(prototypeDir) {\n  return path44.join(getPrototypeReviewsDir(prototypeDir), REVIEW_CONFIG_FILE_NAME);\n}', 1, "config 路径改由同一函数派生"),
]

# 补丁前后数量必须不变
CHECKS_UNCHANGED = ["findMainPrototypeSpec"]

# 补丁前后必须「正好差 1」的计数（函数体里那一处 .spec 被换成 docs）
CHECKS_MINUS_ONE = ['".spec"']


def sha(t):
    return hashlib.sha256(t.encode("utf-8")).hexdigest()


def migrate_configs(apply_mode):
    """把各原型 .spec/reviews/config.json 复制到 docs/reviews/config.json，保住局域网提交开关"""
    print("\n" + "=" * 78)
    print("配置迁移：.spec/reviews/config.json → docs/reviews/config.json")
    print("=" * 78)
    projects = [
        os.path.join(BASE, r"01-项目\测试"),
        os.path.join(BASE, r"01-项目\Shadcn 后台管理仪表盘"),
        os.path.join(BASE, r"01-项目\AI漫剧工作台"),
    ]
    moved = 0
    for proj in projects:
        proto_root = os.path.join(proj, "src", "prototypes")
        if not os.path.isdir(proto_root):
            print(f"  - {os.path.basename(proj)}: 无 src/prototypes，跳过")
            continue
        for name in sorted(os.listdir(proto_root)):
            src = os.path.join(proto_root, name, ".spec", "reviews", "config.json")
            if not os.path.isfile(src):
                continue
            dst_dir = os.path.join(proto_root, name, "docs", "reviews")
            dst = os.path.join(dst_dir, "config.json")
            if os.path.exists(dst):
                print(f"  · {os.path.basename(proj)}/{name}: 目标已存在，跳过")
                continue
            print(f"  → {os.path.basename(proj)}/{name}: {src.replace(BASE + chr(92), '')}")
            if apply_mode:
                os.makedirs(dst_dir, exist_ok=True)
                shutil.copy2(src, dst)
                same = sha(open(src, encoding="utf-8").read()) == sha(open(dst, encoding="utf-8").read())
                print(f"      已复制，内容一致: {same}")
            moved += 1
    if moved == 0:
        print("  没有需要迁移的 config.json")
    return moved


def main():
    apply_mode = "--apply" in sys.argv
    stamp = time.strftime("%Y%m%d-%H%M%S")
    print("=" * 78)
    print(f"模式: {'实际写入' if apply_mode else '试运行（不改文件）'}")
    print("=" * 78)

    ok_all = True
    for rel, label in SERVER_FILES:
        path = os.path.join(BASE, rel)
        print(f"\n--- {label}")
        print(f"    {rel}")
        if not os.path.exists(path):
            print("    ✗ 文件不存在")
            ok_all = False
            continue
        js = open(path, encoding="utf-8").read()
        n_old, n_new = js.count(OLD), js.count(NEW)
        print(f"    大小 {len(js):,}  sha256={sha(js)[:12]}  旧串 {n_old} / 新串 {n_new}")

        if n_new == 1 and n_old == 0:
            print("    ✓ 已是修复后状态（幂等跳过）")
            continue
        if n_old != 1:
            print(f"    ✗ 旧串应命中 1 次，实际 {n_old} —— 拒绝修改")
            ok_all = False
            continue

        patched = js.replace(OLD, NEW, 1)
        if not apply_mode:
            bad = [(k, c, patched.count(k)) for k, c, _ in CHECKS_EXACT if patched.count(k) != c]
            drift = [(k, js.count(k), patched.count(k)) for k in CHECKS_UNCHANGED if js.count(k) != patched.count(k)]
            offby = [(k, js.count(k), patched.count(k)) for k in CHECKS_MINUS_ONE if js.count(k) - patched.count(k) != 1]
            if bad or drift or offby:
                ok_all = False
                print(f"    · 自检不通过（精确 {len(bad)} / 漂移 {len(drift)} / 计数差 {len(offby)}）")
                for k, e, a in bad:
                    print(f"        ✗ {k.splitlines()[0][:46]} 期望 {e} 实际 {a}")
                for k, b, a in drift:
                    print(f"        ✗ {k} 补丁前 {b} 补丁后 {a}")
                for k, b, a in offby:
                    print(f"        ✗ {k} 应正好减少 1 处，实际 {b} → {a}")
            else:
                print("    · 试运行可行，自检全通过")
            continue

        backup = path + f".bak-serverfix-{stamp}"
        shutil.copy2(path, backup)
        with open(path, "w", encoding="utf-8", newline="") as f:
            f.write(patched)
        after = open(path, encoding="utf-8").read()
        print(f"    已写入 {len(js):,} → {len(after):,}  sha256={sha(after)[:12]}")
        print(f"    备份 → {os.path.basename(backup)}")
        file_ok = True
        for k, e, desc in CHECKS_EXACT:
            a = after.count(k)
            good = a == e
            file_ok = file_ok and good
            print(f"      {'✓' if good else '✗'} {desc}: {a}（期望 {e}）")
        for k in CHECKS_UNCHANGED:
            b, a = js.count(k), after.count(k)
            good = b == a
            file_ok = file_ok and good
            print(f"      {'✓' if good else '✗'} 未漂移 {k}: {b} → {a}")
        for k in CHECKS_MINUS_ONE:
            b, a = js.count(k), after.count(k)
            good = (b - a) == 1
            file_ok = file_ok and good
            print(f"      {'✓' if good else '✗'} 正好减少 1 处 {k}: {b} → {a}")
        ok_all = ok_all and file_ok

    migrate_configs(apply_mode)

    print("\n" + "=" * 78)
    if ok_all:
        print("✅ 补丁就绪")
        if apply_mode:
            print("   ⚠ 服务端需重启才生效：Make 客户端进程仍在跑旧代码。")
    else:
        print("❌ 存在失败项")
    print("=" * 78)
    return 0 if ok_all else 1


if __name__ == "__main__":
    sys.exit(main())
