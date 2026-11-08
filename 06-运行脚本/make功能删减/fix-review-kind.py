#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
修复 Make 管理端 AI 评审「AI 执行」无反应
==========================================
根因：NE / kc 已改成三个新 kind（design-note / design / page），
      但 reviewPrompts(q) 和 reviewDocumentPaths(P) 的 useMemo
      仍硬编码旧的 design / requirements 两个 key。
      → 新 kind 取不到提示词 → xE 的 disabled 变 true → 点击无任何反应。

修法：把 P / q 改为按三个 kind 派生，删除旧的 requirements 条目。

用法：
  python fix-review-kind.py            # 试运行，只报告不改文件
  python fix-review-kind.py --apply    # 实际写入（自动备份）
"""
import hashlib
import os
import shutil
import sys
import time

BASE = r"D:\产品设计工作台"

# 4 个真实物理文件（node_modules 下的 @axhub/make 是 junction，指向 .pnpm 真身）
TARGETS = [
    r"01-项目\测试\node_modules\.pnpm\@axhub+make@0.6.21\node_modules\@axhub\make\dist\admin\assets\index.js",
    r"01-项目\Shadcn 后台管理仪表盘\node_modules\.pnpm\@axhub+make@0.6.21\node_modules\@axhub\make\dist\admin\assets\index.js",
    r"01-项目\AI漫剧工作台\node_modules\.pnpm\@axhub+make@0.6.21\node_modules\@axhub\make\dist\admin\assets\index.js",
    r"03-组件库\04-Make客户端瘦身版\admin\assets\index.js",
]

OLD = (
    'P=o.useMemo(()=>({design:gd(m,"design"),requirements:gd(m,"requirements")}),[m]),'
    'q=o.useMemo(()=>({design:Xm({selectedItem:m,reviewDocumentPath:P.design,kind:"design"}),'
    'requirements:Xm({selectedItem:m,reviewDocumentPath:P.requirements,kind:"requirements"})}),[P,m]),'
)

NEW = (
    'P=o.useMemo(()=>({"design-note":gd(m,"design-note"),design:gd(m,"design"),page:gd(m,"page")}),[m]),'
    'q=o.useMemo(()=>({'
    '"design-note":Xm({selectedItem:m,reviewDocumentPath:P["design-note"],kind:"design-note"}),'
    'design:Xm({selectedItem:m,reviewDocumentPath:P.design,kind:"design"}),'
    'page:Xm({selectedItem:m,reviewDocumentPath:P.page,kind:"page"})'
    '}),[P,m]),'
)

# 修复后必须成立的自检项：(关键词, 期望出现次数, 说明)
CHECKS_AFTER = [
    ('"design-note":Xm({selectedItem:m', 1, 'design-note 提示词条目已生成'),
    ('page:Xm({selectedItem:m,reviewDocumentPath:P.page,kind:"page"})', 1, 'page 提示词条目已生成'),
    ('requirements:gd(m,"requirements")', 0, '旧的 requirements 路径条目已移除'),
    ('requirements:Xm({selectedItem', 0, '旧的 requirements 提示词条目已移除'),
    ('kind:"design",label:"设计文档审查"', 1, 'NE 数组中 design 项仍在'),
    ('kind:"page",label:"页面代码审查"', 1, 'NE 数组中 page 项仍在'),
    ('kind:"design-note",label:"设计说明审查"', 1, 'NE 数组中 design-note 项仍在'),
    ('[Un,An]=o.useState("design")', 1, 'Un 默认值未被改动（按约定保持 design）'),
    ('没有可用的 Prompt', 2, 'xE 空提示词兜底仍在'),
    ('已发送到网页 AI 侧栏', 1, 'xE 成功提示仍在'),
    ('提示词已复制到剪贴板', 4, '复制兜底提示仍在'),
    ('AI 评审已完成', 1, '评审完成提示仍在'),
]


def sha(text):
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def wrap(s, w=150):
    return "\n".join(s[i:i + w] for i in range(0, len(s), w))


def main():
    apply_mode = "--apply" in sys.argv
    stamp = time.strftime("%Y%m%d-%H%M%S")
    print("=" * 78)
    print(f"模式: {'实际写入 (--apply)' if apply_mode else '试运行（不改文件）'}")
    print("=" * 78)

    results = []
    for rel in TARGETS:
        path = os.path.join(BASE, rel)
        print(f"\n--- {rel}")
        if not os.path.exists(path):
            print("  ✗ 文件不存在，跳过")
            results.append((rel, False, "missing"))
            continue

        js = open(path, encoding="utf-8").read()
        before_len = len(js)
        before_hash = sha(js)

        n_old = js.count(OLD)
        n_new = js.count(NEW)
        print(f"  原始大小 {before_len:,} 字符  sha256={before_hash[:12]}")
        print(f"  旧串命中 {n_old} 处 / 新串已存在 {n_new} 处")

        if n_new == 1 and n_old == 0:
            print("  ✓ 已是修复后状态，无需改动（幂等跳过）")
            results.append((rel, True, "already"))
            continue
        if n_old != 1:
            print(f"  ✗ 旧串命中数应为 1，实际 {n_old} —— 拒绝修改，避免误伤")
            results.append((rel, False, f"old_count={n_old}"))
            continue

        patched = js.replace(OLD, NEW, 1)
        if not apply_mode:
            print("  · 试运行：替换可行，未写入")
            ok = all(patched.count(k) == c for k, c, _ in CHECKS_AFTER)
            print(f"  · 预检自检项: {'全部通过' if ok else '存在不通过项'}")
            results.append((rel, ok, "dry-run"))
            continue

        # 备份
        backup = path + f".bak-reviewfix-{stamp}"
        shutil.copy2(path, backup)
        print(f"  ✓ 已备份 → {os.path.basename(backup)}")

        with open(path, "w", encoding="utf-8", newline="") as f:
            f.write(patched)

        after = open(path, encoding="utf-8").read()
        after_hash = sha(after)
        print(f"  已写入，大小 {before_len:,} → {len(after):,} 字符（{len(after)-before_len:+d}）")
        print(f"  新 sha256={after_hash[:12]}")

        # 自检
        all_ok = True
        for kw, expect, desc in CHECKS_AFTER:
            cnt = after.count(kw)
            good = cnt == expect
            all_ok = all_ok and good
            print(f"    {'✓' if good else '✗'} {desc}: {cnt} 处（期望 {expect}）")
        # 必须仍然包含唯一一次替换
        if after.count(NEW) != 1:
            print("    ✗ 新串命中数不为 1")
            all_ok = False
        results.append((rel, all_ok, "patched"))

    print("\n" + "=" * 78)
    print("汇总")
    print("=" * 78)
    for rel, ok, state in results:
        print(f"  {'✓' if ok else '✗'} [{state:9s}] {rel}")

    all_ok = all(ok for _, ok, _ in results)
    print("\n" + ("✅ 全部通过" if all_ok else "❌ 存在失败项，请检查"))
    return 0 if all_ok else 1


if __name__ == "__main__":
    sys.exit(main())
