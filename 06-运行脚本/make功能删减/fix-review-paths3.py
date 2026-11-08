#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""修复 yI 函数第二个路径"""
import os

admin_dir = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin"
index_js = os.path.join(admin_dir, "assets", "index.js")

with open(index_js, "r", encoding="utf-8") as f:
    js = f.read()

# 替换 yI 函数第二个路径
old = 'return a?`src/prototypes/${a}/.spec`:"src/prototypes/<prototype-id>/.spec"'
new = 'return a?`src/prototypes/${a}/docs`:"src/prototypes/<prototype-id>/docs"'

count = js.count(old)
if count > 0:
    js = js.replace(old, new)
    print(f"替换 yI 函数路径 2，共 {count} 处")
else:
    print("未找到 yI 函数路径 2")

# 写回文件
with open(index_js, "w", encoding="utf-8") as f:
    f.write(js)

print(f"修改后文件大小: {len(js)} 字符")
print("修复完成！")
