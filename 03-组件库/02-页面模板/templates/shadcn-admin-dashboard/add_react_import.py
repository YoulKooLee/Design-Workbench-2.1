import os
import re

root = r"D:\产品设计工作台\03-组件库\02-页面模板\templates\shadcn-admin-dashboard"

count = 0
for dirpath, dirnames, filenames in os.walk(root):
    for fn in filenames:
        if not fn.endswith(".tsx"):
            continue
        fp = os.path.join(dirpath, fn)
        with open(fp, "r", encoding="utf-8") as f:
            content = f.read()

        # 检查是否已经导入了 React
        if re.search(r'^import\s+React\s+from\s+[\'"]react[\'"]', content, re.MULTILINE):
            continue

        # 检查文件里是否有 JSX（<div 或类似的）
        # 简单判断：如果有 return ( 或 < 标签
        if not re.search(r'<[A-Za-z]', content):
            continue

        # 在第一行导入前面加 React 导入
        lines = content.split("\n")
        # 找到第一个 import 行
        first_import_idx = None
        for i, line in enumerate(lines):
            if line.startswith("import "):
                first_import_idx = i
                break

        if first_import_idx is not None:
            lines.insert(first_import_idx, 'import React from "react"')
        else:
            lines.insert(0, 'import React from "react"')

        new_content = "\n".join(lines)
        with open(fp, "w", encoding="utf-8") as f:
            f.write(new_content)
        count += 1
        print(f"OK: {fp}")

print(f"\n共修改 {count} 个文件")
