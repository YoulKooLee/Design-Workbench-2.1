import os
import re

ROOT = r"D:\产品设计工作台\03-组件库\02-页面模板\templates\shadcn-admin-dashboard"

count = 0
for root, dirs, files in os.walk(ROOT):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # 把导入路径里的反斜杠改成正斜杠
            # 匹配 from 'xxx' 或 import 'xxx' 里的路径
            new_content = re.sub(r"(from ')([^']+)(')", lambda m: m.group(1) + m.group(2).replace('\\', '/') + m.group(3), content)
            new_content = re.sub(r"(import ')([^']+)(')", lambda m: m.group(1) + m.group(2).replace('\\', '/') + m.group(3), new_content)
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                count += 1

print(f"修正了 {count} 个文件的路径分隔符")
