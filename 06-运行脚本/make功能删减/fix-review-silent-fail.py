#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
修复 AI 评审「静默失败」—— 失败时没有任何提示
==============================================
问题：handleRunReviewDirect（内部名 Dg）里

    const J = await ae({context, prompt, targetPath});
    if (Gt.current !== p || J === !1) return !1;     // ← J===!1 时静默返回，零提示

ae() 返回 false 表示「AI 侧栏没有接受这次请求」（典型场景：上一轮 run 卡在
agent_running / model_requesting，ACP 直接 skipRun 并 end_turn，桥接层拿到 false）。
用户看到的结果就是：点了按钮、没有 toast、没有复制、也没有报错。

修法：把「上下文已切换」和「AI 未接受」拆成两个分支，后者给出明确错误提示。

用法：
  python fix-review-silent-fail.py            # 试运行
  python fix-review-silent-fail.py --apply    # 实际写入（自动备份）
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

OLD = 'if(Gt.current!==p||J===!1)return!1;'

MSG = "AI 侧栏未接受本次评审请求（可能上一轮仍在执行），请稍后重试或重启 AI 侧栏"

NEW = (
    'if(Gt.current!==p)return!1;'
    'if(J===!1)return h.error("' + MSG + '"),!1;'
)

# 必须精确成立的断言（补丁后）
CHECKS_EXACT = [
    (OLD, 0, "旧的静默返回已移除"),
    (NEW, 1, "新的显式错误提示已注入"),
    (MSG, 1, "提示文案存在"),
    ('"design-note":Xm({selectedItem:m', 1, "上一轮 kind 修复仍在"),
    ('page:Xm({selectedItem:m,reviewDocumentPath:P.page,kind:"page"})', 1, "page 提示词条目仍在"),
    ('.spec/reviews', 0, "旧报告路径已彻底移除"),
]

# 只要求「补丁前后数量不变」的断言（这些文案在 bundle 里可能有多处）
CHECKS_UNCHANGED = [
    'h.success("AI 评审已完成")',
    '没有可发送的提示词内容',
    'AI 助手入口未就绪',
    '没有可用的 Prompt',
    'docs/reviews',
    'docs/rules',
    'docs/templates',
]


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
        print(f"\n--- {rel}")
        if not os.path.exists(path):
            print("  ✗ 不存在")
            ok_all = False
            continue
        js = open(path, encoding="utf-8").read()
        n_old, n_new = js.count(OLD), js.count(NEW)
        print(f"  大小 {len(js):,}  sha256={sha(js)[:12]}  旧串 {n_old} / 新串 {n_new}")

        if n_new == 1 and n_old == 0:
            print("  ✓ 已是修复后状态，跳过（幂等）")
            continue
        if n_old != 1:
            print(f"  ✗ 旧串应命中 1 次，实际 {n_old} —— 拒绝修改")
            ok_all = False
            continue

        patched = js.replace(OLD, NEW, 1)
        if not apply_mode:
            bad = [(k, c, patched.count(k)) for k, c, _ in CHECKS_EXACT if patched.count(k) != c]
            drift = [(k, js.count(k), patched.count(k)) for k in CHECKS_UNCHANGED if js.count(k) != patched.count(k)]
            if bad or drift:
                print(f"  · 试运行：自检不通过（精确 {len(bad)} 项 / 漂移 {len(drift)} 项）")
                for k, exp, act in bad:
                    print(f"      ✗ {k[:52]} 期望 {exp} 实际 {act}")
                for k, b, a in drift:
                    print(f"      ✗ {k[:52]} 补丁前 {b} 补丁后 {a}")
                ok_all = False
            else:
                print("  · 试运行：可行，自检全通过")
            continue

        backup = path + f".bak-silentfail-{stamp}"
        shutil.copy2(path, backup)
        with open(path, "w", encoding="utf-8", newline="") as f:
            f.write(patched)
        after = open(path, encoding="utf-8").read()
        print(f"  已写入 {len(js):,} → {len(after):,} 字符  sha256={sha(after)[:12]}")
        print(f"  备份 → {os.path.basename(backup)}")
        file_ok = True
        for k, exp, desc in CHECKS_EXACT:
            act = after.count(k)
            good = act == exp
            file_ok = file_ok and good
            print(f"    {'✓' if good else '✗'} {desc}: {act}（期望 {exp}）")
        for k in CHECKS_UNCHANGED:
            b, a = js.count(k), after.count(k)
            good = b == a
            file_ok = file_ok and good
            print(f"    {'✓' if good else '✗'} 未漂移「{k[:34]}」: {b} → {a}")
        ok_all = ok_all and file_ok

    print("\n" + ("✅ 全部通过" if ok_all else "❌ 存在失败项"))
    return 0 if ok_all else 1


if __name__ == "__main__":
    sys.exit(main())
