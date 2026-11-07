import os
import re

ROOT = r"D:\产品设计工作台\03-组件库\02-页面模板\templates\shadcn-admin-dashboard"

def fix_imports(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 计算相对路径：从文件所在目录到模板根目录
    rel_dir = os.path.relpath(ROOT, os.path.dirname(filepath))
    # rel_dir 类似 ".." 或 "../.." 或 "../../.."
    
    # 替换 @/ 导入
    # @/lib/utils → {rel_dir}/lib/utils
    # @/components/ui/xxx → {rel_dir}/components/ui/xxx
    # @/context/xxx → {rel_dir}/context/xxx
    # @/hooks/xxx → {rel_dir}/hooks/xxx
    # @/features/xxx → {rel_dir}/features/xxx
    
    def replace_import(match):
        import_path = match.group(1)
        return f"from '{rel_dir}/{import_path}'"
    
    # 匹配 from '@/xxx' 格式
    new_content = re.sub(r"from '@/([^']+)'", replace_import, content)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

count = 0
for root, dirs, files in os.walk(ROOT):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            filepath = os.path.join(root, file)
            if fix_imports(filepath):
                count += 1

print(f"修正了 {count} 个文件的导入路径")
