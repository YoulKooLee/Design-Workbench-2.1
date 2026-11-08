#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
针对 23:47 新构建的补丁（豆包重建版）
=====================================
新构建里 q/P 的三 kind 修复已保留（格式化成多行），但有两处要修：

1) gd() 仍把报告写到 <原型>/.spec/reviews/
   而 kc.fallbackPath、rulePath、templatePath 都是 docs/...
   服务端 getPrototypeReviewsDir 也已改为 docs/reviews
   → 客户端写 .spec、服务端读 docs，报告永远不显示。必须对齐成 docs/reviews。

2) handleRunReviewDirect（Dg）里
       if (Gt.current !== p || J === !1) return !1;
   J===!1 表示 AI 侧栏没接受（ACP skipRun），此处静默返回、零提示。

用法：
  python fix-new-bundle.py            # 试运行
  python fix-new-bundle.py --apply    # 写入（自动备份）
"""
import hashlib
import os
import shutil
import sys
import time

BASE = r"D:\产品设计工作台"
TARGETS = [
    r"01-项目\测试\node_modules\.pnpm\@axhub+make@0.6.21\node_modules\@axhub\make\dist\admin\assets\index.js",
    r"01-项目\Shadcn 后台管理仪表盘\node_modules\.pnpm\@axhub+make@0.6.21\node_modules\@axhub\make\dist\admin\assets\index.js",
    r"01-项目\AI漫剧工作台\node_modules\.pnpm\@axhub+make@0.6.21\node_modules\@axhub\make\dist\admin\assets\index.js",
    r"03-组件库\04-Make客户端瘦身版\admin\assets\index.js",
]

A_OLD, A_NEW = "/.spec/reviews/", "/docs/reviews/"
B_OLD = "if(Gt.current!==p||J===!1)return!1;"
MSG = "AI 侧栏未接受本次评审请求（可能上一轮仍在执行），请稍后重试或重启 AI 侧栏"
B_NEW = 'if(Gt.current!==p)return!1;if(J===!1)return h.error("' + MSG + '"),!1;'


def sha(t):
    return hashlib.sha256(t.encode("utf-8")).hexdigest()


def main():
    apply_mode = "--apply" in sys.argv
    stamp = time.strftime("%Y%m%d-%H%M%S")
    print("=" * 78)
    print(f"模式: {'实际写入' if apply_mode else '试运行（不改文件）'}")
    print("=" * 78)

    ok_all = True
    for rel in TARGETS:
        path = os.path.join(BASE, rel)
        print(f"\n--- {os.path.basename(os.path.dirname(os.path.dirname(os.path.dirname(path))))}"
              f" / {rel.split(chr(92))[1] if chr(92) in rel else rel}")
        print(f"    {rel}")
        if not os.path.exists(path):
            print("    ✗ 不存在")
            ok_all = False
            continue
        js = open(path, encoding="utf-8").read()
        n_a, n_b = js.count(A_OLD), js.count(B_OLD)
        print(f"    大小 {len(js):,}  sha256={sha(js)[:12]}")
        print(f"    锚点A '{A_OLD}' x{n_a}   锚点B 静默返回 x{n_b}")

        if js.count(A_NEW) >= 2 and js.count(B_NEW) == 1:
            print("    ✓ 已是修复后状态（幂等跳过）")
            continue
        if n_a != 2 or n_b != 1:
            print(f"    ✗ 锚点数量不符（A 需 2、B 需 1）—— 拒绝修改，避免误伤")
            ok_all = False
            continue

        patched = js.replace(A_OLD, A_NEW)              # 2 处
        patched = patched.replace(B_OLD, B_NEW, 1)      # 1 处

        if not apply_mode:
            ok = (patched.count("/.spec/reviews/") == 0
                  and patched.count("/docs/reviews/") == 2
                  and patched.count(B_NEW) == 1
                  and patched.count(B_OLD) == 0)
            print(f"    · 试运行{'可行，自检通过' if ok else '自检不通过'}")
            if not ok:
                ok_all = False
            continue

        backup = path + f".bak-newbuild-{stamp}"
        shutil.copy2(path, backup)
        with open(path, "w", encoding="utf-8", newline="") as f:
            f.write(patched)
        after = open(path, encoding="utf-8").read()
        print(f"    已写入 {len(js):,} → {len(after):,}  sha256={sha(after)[:12]}")
        print(f"    备份 → {os.path.basename(backup)}")
        checks = [
            ("gd() 已不再写 .spec/reviews", after.count("/.spec/reviews/") == 0),
            ("gd() 两处均为 docs/reviews", after.count("/docs/reviews/") == 2),
            ("静默返回已替换", after.count(B_OLD) == 0),
            ("失败提示已注入", after.count(B_NEW) == 1),
            ("q/P 三 kind 仍在", after.count('"design-note": gd(m, "design-note")') == 1),
            ("成功提示未变", after.count('h.success("AI 评审已完成")') == js.count('h.success("AI 评审已完成")')),
        ]
        file_ok = True
        for desc, good in checks:
            file_ok = file_ok and good
            print(f"      {'✓' if good else '✗'} {desc}")
        ok_all = ok_all and file_ok

    print("\n" + ("✅ 全部通过" if ok_all else "❌ 存在失败项"))
    return 0 if ok_all else 1


if __name__ == "__main__":
    sys.exit(main())
