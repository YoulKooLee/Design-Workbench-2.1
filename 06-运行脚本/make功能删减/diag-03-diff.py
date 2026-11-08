#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""对比 patch-backup 原始版与当前版，找出所有改动（行级 + 行内偏移）"""
import difflib
import os

CUR = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin\assets\index.js"
OLD = r"D:\产品设计工作台\03-组件库\04-Make客户端瘦身版\admin\.patch-backup\assets\index.js"
OUT = r"D:\产品设计工作台\06-运行脚本\make功能删减\_diag\diff-patch.txt"

old = open(OLD, encoding="utf-8").read()
cur = open(CUR, encoding="utf-8").read()

old_lines = old.split("\n")
cur_lines = cur.split("\n")

print(f"old: {len(old)} chars, {len(old_lines)} lines")
print(f"cur: {len(cur)} chars, {len(cur_lines)} lines")

# 行级差异
sm = difflib.SequenceMatcher(None, old_lines, cur_lines, autojunk=False)
chunks = []
for tag, i1, i2, j1, j2 in sm.get_opcodes():
    if tag == "equal":
        continue
    chunks.append((tag, i1, i2, j1, j2))

print(f"行级差异块数: {len(chunks)}")

with open(OUT, "w", encoding="utf-8") as f:
    f.write(f"old {len(old)} chars / cur {len(cur)} chars\n")
    f.write(f"old lines {len(old_lines)} / cur lines {len(cur_lines)}\n\n")
    for tag, i1, i2, j1, j2 in chunks:
        o = "\n".join(old_lines[i1:i2])
        c = "\n".join(cur_lines[j1:j2])
        f.write(f"########## {tag}  old_lines[{i1}:{i2}] new_lines[{j1}:{j2}]\n")
        f.write(f"-- OLD ({len(o)} chars) --\n{o}\n")
        f.write(f"-- NEW ({len(c)} chars) --\n{c}\n\n")
        # 行内精细 diff
        sm2 = difflib.SequenceMatcher(None, o, c, autojunk=False)
        inl = 0
        for t2, a1, a2, b1, b2 in sm2.get_opcodes():
            if t2 == "equal":
                continue
            inl += 1
            f.write(f"  [{t2}] old@{a1}:{a2} new@{b1}:{b2}\n")
            f.write(f"    OLD: {o[max(0,a1-60):a2+60]!r}\n")
            f.write(f"    NEW: {c[max(0,b1-60):b2+60]!r}\n")
        f.write(f"  (行内差异 {inl} 处)\n\n")

print(f"写出 {OUT}")
for tag, i1, i2, j1, j2 in chunks:
    print(f"  {tag} old[{i1}:{i2}] new[{j1}:{j2}]")
