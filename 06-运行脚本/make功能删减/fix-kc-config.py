#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""把 kc 配置对象改成新的三个评审项"""
import os

admin_dir = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin"
index_js = os.path.join(admin_dir, "assets", "index.js")

with open(index_js, "r", encoding="utf-8") as f:
    js = f.read()

print(f"原始文件大小: {len(js)} 字符")

# 找到旧的 kc 配置对象
old_kc_start = js.find("kc={design:{kind:\"design\"")
if old_kc_start < 0:
    print("未找到旧的 kc 配置对象")
    exit(1)

# 找到旧的 kc 配置对象的结束位置
# 从 kc={ 开始，找到匹配的 }
# 简单方法：从 kc={ 开始，数大括号，找到匹配的 }
brace_count = 0
i = old_kc_start
while i < len(js):
    if js[i] == '{':
        brace_count += 1
    elif js[i] == '}':
        brace_count -= 1
        if brace_count == 0:
            break
    i += 1

old_kc_end = i + 1
old_kc = js[old_kc_start:old_kc_end]
print(f"旧的 kc 配置对象位置: {old_kc_start} - {old_kc_end}")
print(f"旧的 kc 配置对象长度: {len(old_kc)} 字符")

# 新的 kc 配置对象
new_kc = '''kc={
  "design-note": {
    kind: "design-note",
    label: "设计说明",
    title: "设计说明审查",
    rulePath: "docs/rules/design-note-review-guide.md",
    templatePath: "docs/templates/design-note-review.md",
    fileName: "design-note-review.md",
    fallbackPath: `docs/reviews/design-note-review.md`,
    targetDescription: "当前原型的设计说明卡片执行审查",
    emptyDescription: "发起评审后，AI 会检查设计说明有没有遗漏功能点、有没有技术黑话、文案规不规范。",
    requiredBasis: "优先读取页面右侧设计说明卡片；检查是否有技术黑话、是否覆盖所有功能点、文案是否规范。"
  },
  design: {
    kind: "design",
    label: "设计文档",
    title: "设计文档审查",
    rulePath: "docs/rules/design-doc-review-guide.md",
    templatePath: "docs/templates/design-doc-review.md",
    fileName: "design-doc-review.md",
    fallbackPath: `docs/reviews/design-doc-review.md`,
    targetDescription: "当前项目的 HLD/LLD 设计文档执行审查",
    emptyDescription: "发起评审后，AI 会检查设计文档的结构完整性、分层边界、技术规范符合。",
    requiredBasis: "优先读取项目的 HLD/LLD 设计文档；检查结构完整性、分层边界、技术规范符合。"
  },
  page: {
    kind: "page",
    label: "页面代码",
    title: "页面代码审查",
    rulePath: "docs/rules/ui-review-guide.md",
    templatePath: "docs/templates/ui-review.md",
    fileName: "ui-review.md",
    fallbackPath: `docs/reviews/ui-review.md`,
    targetDescription: "当前原型执行页面代码审查",
    emptyDescription: "发起评审后，AI 会检查页面代码的需求覆盖、组件用法、响应式适配。",
    requiredBasis: "优先读取当前原型的源码；检查需求覆盖、组件用法、响应式适配。"
  }
}'''

# 替换
js = js[:old_kc_start] + new_kc + js[old_kc_end:]

print(f"新的 kc 配置对象长度: {len(new_kc)} 字符")

# 写回文件
with open(index_js, "w", encoding="utf-8") as f:
    f.write(js)

print(f"\n修改后文件大小: {len(js)} 字符")
print("修复完成！")
