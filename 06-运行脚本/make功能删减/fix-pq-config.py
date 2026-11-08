#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""把 P 和 q 改成新的三个评审项"""
import os

admin_dir = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin"
index_js = os.path.join(admin_dir, "assets", "index.js")

with open(index_js, "r", encoding="utf-8") as f:
    js = f.read()

print(f"原始文件大小: {len(js)} 字符")

# 找到旧的 P 和 q 定义
old_p_start = js.find("P=o.useMemo(()=>({design:gd(m,\"design\"),requirements:gd(m,\"requirements\")})")
if old_p_start < 0:
    print("未找到旧的 P 定义")
    exit(1)

# 找到旧的 q 定义的结束位置
# 从 P= 开始，找到 q=... 的结束位置
# 简单方法：从 P= 开始，数 1000 字符
# 或者找到下一个 ; 后面的 ue=

# 先找到 q= 的结束位置
old_q_start = js.find("q=o.useMemo(()=>({design:Xm", old_p_start)
if old_q_start < 0:
    print("未找到旧的 q 定义")
    exit(1)

# 找到 q= 的结束位置（找到 ),[P,m])）
old_q_end_marker = "}),[P,m])"
old_q_end = js.find(old_q_end_marker, old_q_start)
if old_q_end < 0:
    print("未找到 q= 的结束位置")
    exit(1)

old_q_end += len(old_q_end_marker)

old_pq = js[old_p_start:old_q_end]
print(f"旧的 P 和 q 定义位置: {old_p_start} - {old_q_end}")
print(f"旧的 P 和 q 定义长度: {len(old_pq)} 字符")

# 新的 P 和 q 定义
new_pq = '''P=o.useMemo(()=>({
  "design-note": gd(m, "design-note"),
  design: gd(m, "design"),
  page: gd(m, "page")
}),[m]),q=o.useMemo(()=>({
  "design-note": Xm({selectedItem:m,reviewDocumentPath:P["design-note"],kind:"design-note"}),
  design: Xm({selectedItem:m,reviewDocumentPath:P.design,kind:"design"}),
  page: Xm({selectedItem:m,reviewDocumentPath:P.page,kind:"page"})
}),[P,m])'''

# 替换
js = js[:old_p_start] + new_pq + js[old_q_end:]

print(f"新的 P 和 q 定义长度: {len(new_pq)} 字符")

# 写回文件
with open(index_js, "w", encoding="utf-8") as f:
    f.write(js)

print(f"\n修改后文件大小: {len(js)} 字符")
print("修复完成！")
