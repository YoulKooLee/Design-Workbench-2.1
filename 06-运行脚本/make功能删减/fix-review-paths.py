#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""修复评审提示词的路径问题"""
import os

admin_dir = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin"
index_js = os.path.join(admin_dir, "assets", "index.js")

# 读取文件
with open(index_js, "r", encoding="utf-8") as f:
    js = f.read()

print(f"原始文件大小: {len(js)} 字符")

# 备份
backup = index_js + ".bak"
with open(backup, "w", encoding="utf-8") as f:
    f.write(js)
print(f"已备份到: {backup}")

# 1. 修改 kc 配置对象里的路径
# 原来的：
# rulePath: "rules/design-note-review-guide.md"
# templatePath: "templates/design-note-review.md"
# fallbackPath: `docs/reviews/design-note-review.md`

# 改成：
# rulePath: "docs/rules/design-note-review-guide.md"
# templatePath: "docs/templates/design-note-review.md"
# fallbackPath: `docs/reviews/design-note-review.md`

replacements = [
    # 规则文件路径
    ('rulePath: "rules/design-note-review-guide.md"', 'rulePath: "docs/rules/design-note-review-guide.md"'),
    ('rulePath: "rules/design-doc-review-guide.md"', 'rulePath: "docs/rules/design-doc-review-guide.md"'),
    ('rulePath: "rules/ui-review-guide.md"', 'rulePath: "docs/rules/ui-review-guide.md"'),
    
    # 模板文件路径
    ('templatePath: "templates/design-note-review.md"', 'templatePath: "docs/templates/design-note-review.md"'),
    ('templatePath: "templates/design-doc-review.md"', 'templatePath: "docs/templates/design-doc-review.md"'),
    ('templatePath: "templates/ui-review.md"', 'templatePath: "docs/templates/ui-review.md"'),
]

for old, new in replacements:
    count = js.count(old)
    if count > 0:
        js = js.replace(old, new)
        print(f"替换 '{old[:30]}...' → '{new[:30]}...'，共 {count} 处")
    else:
        print(f"未找到 '{old[:30]}...'")

# 2. 修改 gd 函数里的写入路径
# 原来的：
# return `${s}/.spec/reviews/${n.fileName}`;
# return i ? `src/prototypes/${i}/.spec/reviews/${n.fileName}` : "";

# 改成：
# return `${s}/docs/reviews/${n.fileName}`;
# return i ? `src/prototypes/${i}/docs/reviews/${n.fileName}` : "";

# 注意：这里要用精确匹配，避免误替换
old1 = 'return `${s}/.spec/reviews/${n.fileName}`'
new1 = 'return `${s}/docs/reviews/${n.fileName}`'
count1 = js.count(old1)
if count1 > 0:
    js = js.replace(old1, new1)
    print(f"替换 gd 函数路径 1，共 {count1} 处")
else:
    print(f"未找到 gd 函数路径 1")

old2 = 'return i ? `src/prototypes/${i}/.spec/reviews/${n.fileName}` : ""'
new2 = 'return i ? `src/prototypes/${i}/docs/reviews/${n.fileName}` : ""'
count2 = js.count(old2)
if count2 > 0:
    js = js.replace(old2, new2)
    print(f"替换 gd 函数路径 2，共 {count2} 处")
else:
    print(f"未找到 gd 函数路径 2")

# 3. 修改 yI 函数里的 .spec 路径
# 原来的：
# if (n) return `${n}/.spec`;
# return a ? `src/prototypes/${a}/.spec` : "";

# 改成：
# if (n) return `${n}/docs`;
# return a ? `src/prototypes/${a}/docs` : "";

old3 = 'if (n) return `${n}/.spec`'
new3 = 'if (n) return `${n}/docs`'
count3 = js.count(old3)
if count3 > 0:
    js = js.replace(old3, new3)
    print(f"替换 yI 函数路径 1，共 {count3} 处")
else:
    print(f"未找到 yI 函数路径 1")

old4 = 'return a ? `src/prototypes/${a}/.spec` :'
new4 = 'return a ? `src/prototypes/${a}/docs` :'
count4 = js.count(old4)
if count4 > 0:
    js = js.replace(old4, new4)
    print(f"替换 yI 函数路径 2，共 {count4} 处")
else:
    print(f"未找到 yI 函数路径 2")

# 写回文件
with open(index_js, "w", encoding="utf-8") as f:
    f.write(js)

print(f"\n修改后文件大小: {len(js)} 字符")
print("修复完成！")
