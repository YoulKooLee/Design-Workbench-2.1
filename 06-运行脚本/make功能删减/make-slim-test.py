#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
测试项目 Make 管理端瘦身 + 评审功能改造
============================================
在测试项目的 index.js 上做修改，然后保存到瘦身版目录。
"""
import os
import shutil

def main():
    # 测试项目 admin 目录
    test_admin_dir = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin"
    index_js = os.path.join(test_admin_dir, "assets", "index.js")
    
    # 瘦身版目录
    slim_dir = r"D:\产品设计工作台\03-组件库\04-Make客户端瘦身版\admin"
    
    if not os.path.exists(index_js):
        print(f"❌ 找不到文件: {index_js}")
        return
    
    with open(index_js, "r", encoding="utf-8") as f:
        js = f.read()
    
    orig_len = len(js)
    print(f"原始文件大小: {orig_len:,} 字节")
    print("=" * 60)
    
    changes = []
    
    # ========== 1. 评审功能：删除人工评审页签，只留 AI 评审 ==========
    old_tabs = 'grid h-8 w-full grid-cols-2",children:[r.jsx(ii,{value:"ai-review",className:"h-6 text-xs",children:"AI 评审"}),r.jsx(ii,{value:"human-review",className:"h-6 text-xs",children:"人工评审"})]'
    new_tabs = 'grid h-8 w-full grid-cols-1",children:[r.jsx(ii,{value:"ai-review",className:"h-6 text-xs",children:"AI 评审"})]'
    if old_tabs in js:
        js = js.replace(old_tabs, new_tabs)
        changes.append("✓ 已删除人工评审页签，只留 AI 评审")
    else:
        changes.append("⚠ 未找到人工评审页签（可能已删除）")
    
    # ========== 2. 评审功能：修改 NE 数组（从 2 个改成 3 个） ==========
    old_ne = 'NE=[{kind:"design",label:"设计评审",description:"优先读取 DESIGN.md；没有则按常规设计评审执行。"},{kind:"requirements",label:"需求评审",description:"优先读取 .spec/spec.html，其次 .spec/spec.md，并跟随必要的子文档。"}]'
    new_ne = 'NE=[{kind:"design-note",label:"设计说明审查",description:"审查页面设计说明卡片：有没有遗漏功能点、有没有技术黑话、文案规不规范。"},{kind:"design",label:"设计文档审查",description:"审查 HLD/LLD 设计文档：结构完整性、分层边界、技术规范符合。"},{kind:"page",label:"页面代码审查",description:"审查生成的页面代码：需求覆盖、组件用法、响应式适配。"}]'
    if old_ne in js:
        js = js.replace(old_ne, new_ne)
        changes.append("✓ 已修改评审项列表 NE，从 2 个改成 3 个")
    else:
        changes.append("⚠ 未找到 NE 数组")
    
    # ========== 3. 评审功能：修改 kc 对象（评审项详细定义） ==========
    kc_start = js.find('kc={design:{')
    if kc_start >= 0:
        # 找到 kc 对象的结束位置
        depth = 0
        i = kc_start + 3  # 跳过 kc=
        while i < len(js):
            if js[i] == '{':
                depth += 1
            elif js[i] == '}':
                depth -= 1
                if depth == 0:
                    break
            i += 1
        kc_end = i + 1
        
        new_kc = '''kc={
  "design-note": {
    kind: "design-note",
    label: "设计说明",
    title: "设计说明审查",
    rulePath: "rules/design-note-review-guide.md",
    templatePath: "templates/design-note-review.md",
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
    rulePath: "rules/design-doc-review-guide.md",
    templatePath: "templates/design-doc-review.md",
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
    rulePath: "rules/ui-review-guide.md",
    templatePath: "templates/ui-review.md",
    fileName: "ui-review.md",
    fallbackPath: `docs/reviews/ui-review.md`,
    targetDescription: "当前原型执行页面代码审查",
    emptyDescription: "发起评审后，AI 会检查页面代码的需求覆盖、组件用法、响应式适配。",
    requiredBasis: "优先读取当前原型的源码；检查需求覆盖、组件用法、响应式适配。"
  }
}'''
        
        js = js[:kc_start] + new_kc + js[kc_end:]
        changes.append("✓ 已修改 kc 对象，从 2 个改成 3 个评审项")
    else:
        changes.append("⚠ 未找到 kc 对象")
    
    # ========== 4. 删除发布菜单：Axure 导出 ==========
    axure_marker = '导出带交互原型'
    if axure_marker in js:
        # 找到 Axure 导出菜单项的完整代码并删除
        # 先找到位置
        idx = js.find(axure_marker)
        # 往前找菜单项的开始位置（r.jsxs(Vt,{...）
        start = js.rfind('r.jsxs(Vt,{', 0, idx)
        # 往后找菜单项的结束位置（})）
        depth = 0
        i = start
        while i < len(js):
            if js[i] == '{':
                depth += 1
            elif js[i] == '}':
                depth -= 1
                if depth == 0:
                    break
            i += 1
        end = i + 1
        # 再往后找分隔线 r.jsx(ia,{})
        if js[end:end+20].find('r.jsx(ia,{})') >= 0:
            end += js[end:end+20].find('r.jsx(ia,{})') + len('r.jsx(ia,{})')
        
        js = js[:start] + js[end:]
        changes.append("✓ 已删除发布菜单「Axure 导出」")
    else:
        changes.append("⚠ 未找到 Axure 导出（可能已删除）")
    
    # ========== 5. 删除发布菜单：云服务 ==========
    cloud_marker = '云服务'
    if cloud_marker in js:
        # 找到云服务组的位置
        idx = js.find(cloud_marker)
        # 往前找分组标题位置（r.jsx(Vs,{...云服务...）
        start = js.rfind('r.jsx(Vs,{', 0, idx)
        if start >= 0:
            # 往后找下一个分组标题或菜单结束
            end = js.find('r.jsx(Vs,{', idx)
            if end < 0:
                end = len(js)
            # 再往后找分隔线
            sep_end = js.find('r.jsx(ia,{})', end)
            if sep_end >= 0:
                end = sep_end + len('r.jsx(ia,{})')
            
            js = js[:start] + js[end:]
            changes.append("✓ 已删除发布菜单「云服务」整组")
        else:
            changes.append("⚠ 找到云服务但未找到开始位置")
    else:
        changes.append("⚠ 未找到云服务（可能已删除）")
    
    # ========== 写盘 ==========
    with open(index_js, "w", encoding="utf-8") as f:
        f.write(js)
    
    new_len = len(js)
    print("\n".join(changes))
    print("=" * 60)
    print(f"原始大小: {orig_len:,} 字节")
    print(f"修改后大小: {new_len:,} 字节")
    print(f"变化: {new_len - orig_len:+,} 字节")
    
    # ========== 同步到瘦身版目录 ==========
    print("\n同步到瘦身版目录...")
    slim_index_js = os.path.join(slim_dir, "assets", "index.js")
    shutil.copy2(index_js, slim_index_js)
    print(f"✓ 已同步到: {slim_index_js}")
    
    print("\n*** 完成 ***")
    print("\n💡 以后重装 node_modules 后，把瘦身版目录复制回去即可。")

if __name__ == "__main__":
    main()
