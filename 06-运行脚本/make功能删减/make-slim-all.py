#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Make 管理端一键瘦身 + 评审功能改造脚本
============================================
每次重装 node_modules 后运行一次，就能恢复所有定制：
1. 删除顶栏：规格、批注、PRD 标注按钮
2. 删除发布菜单：Axure 导出、云服务
3. 评审功能：删除人工评审，改成三个 AI 评审项
"""
import sys
import os
import shutil

def main():
    project_dir = sys.argv[1] if len(sys.argv) > 1 else r"D:\产品设计工作台\01-项目\Shadcn 后台管理仪表盘"
    admin_dir = os.path.join(project_dir, "node_modules", "@axhub", "make", "dist", "admin")
    index_js = os.path.join(admin_dir, "assets", "index.js")
    
    if not os.path.exists(index_js):
        print(f"❌ 找不到文件: {index_js}")
        return
    
    with open(index_js, "r", encoding="utf-8") as f:
        js = f.read()
    
    orig_len = len(js)
    print(f"原始文件大小: {orig_len:,} 字节")
    print("=" * 50)
    
    changes = []
    
    # ========== 1. 删除顶栏：规格按钮 ==========
    # 找到规格按钮的完整代码块
    spec_btn_start = 'r.jsx(En,{children:r.jsxs(In,{children:[r.jsx(jn,{asChild:!0,children:r.jsxs(Le,{variant:"ghost",size:"xs",className:pn,disabled:!xe||O,onClick:()=>{fe()},children:[r.jsx(ns,{})," 规格"]})}),r.jsx(Tn,{children:xe?"打开当前原型规格":"当前原型没有明确的本地源码路径"})]})})'
    if spec_btn_start in js:
        js = js.replace(spec_btn_start, '')
        changes.append("✓ 已删除顶栏「规格」按钮")
    else:
        changes.append("⚠ 未找到「规格」按钮（可能已删除或代码有变化）")
    
    # ========== 2. 删除顶栏：批注按钮 ==========
    comment_btn = 'r.jsx(En,{children:r.jsxs(In,{children:[r.jsx(jn,{asChild:!0,children:r.jsx("div",{className:"relative inline-flex",children:r.jsxs(Le,{variant:wt?"secondary":"ghost",size:"xs",className:qe(pn,wt&&"bg-secondary text-secondary-foreground"),disabled:ge,onClick:$e,children:[r.jsx(Ws,{})," 批注"]})})}),r.jsx(Tn,{children:ht})]})})'
    if comment_btn in js:
        js = js.replace(comment_btn, '')
        changes.append("✓ 已删除顶栏「批注」按钮")
    else:
        changes.append("⚠ 未找到「批注」按钮")
    
    # ========== 3. 删除顶栏：PRD 标注按钮 ==========
    prd_btn = 'r.jsx(En,{children:r.jsxs(In,{children:[r.jsx(jn,{asChild:!0,children:r.jsxs(Le,{variant:G?"secondary":"ghost",size:"xs",className:qe(pn,G&&"bg-secondary text-secondary-foreground"),disabled:ge||Ye,onClick:dr,children:[r.jsx(Fx,{})," PRD 标注"]})}),r.jsx(Tn,{children:G?"退出标注":ge?ht:"使用标注需求和生成 RRD"})]})})'
    if prd_btn in js:
        js = js.replace(prd_btn, '')
        changes.append("✓ 已删除顶栏「PRD 标注」按钮")
    else:
        changes.append("⚠ 未找到「PRD 标注」按钮")
    
    # ========== 4. 删除发布菜单：Axure 导出组 ==========
    # 找到 Axure 分隔线 + 三个菜单项
    axure_section = 'r.jsx(Vs,{className:"px-2 py-1 text-[11px] font-normal text-muted-foreground",children:"Axure"}),Ar?r.jsxs(Vt,{onClick:()=>H(!0),disabled:!mt,title:(Ue==null?void 0:Ue.axureDisabledReason)||"",className:"gap-2 h-7 text-sm",children:[r.jsx(gs,{className:"h-3.5 w-3.5"})," 导出带交互原型"]}):null,Rr?r.jsxs(Vt,{onClick:Se,disabled:!mt,title:(Ue==null?void 0:Ue.axureDisabledReason)||"",className:"gap-2 h-7 text-sm",children:[r.jsx(Sr,{className:"h-3.5 w-3.5"})," 复制可编辑原型"]}):null,Dr?r.jsxs(Vt,{onClick:Pe,className:"gap-2 h-7 text-sm",children:[r.jsx(fo,{className:"h-3.5 w-3.5"}'
    if axure_section in js:
        # 找到 Axure 区块的结束位置
        idx = js.find(axure_section)
        # 从 Axure 开始，找到下一个分隔线 ia 的位置
        end_marker = 'r.jsx(ia,{}),r.jsx(Vs,{className:"px-2 py-1 text-[11px] font-normal text-muted-foreground",children:"云服务"})'
        end_idx = js.find(end_marker, idx)
        if end_idx > idx:
            # 删除从 Axure 开始到云服务分隔线之前的内容
            js = js[:idx] + js[end_idx:]
            changes.append("✓ 已删除发布菜单「Axure 导出」整组")
        else:
            changes.append("⚠ 找到 Axure 区块但未找到结束位置")
    else:
        changes.append("⚠ 未找到 Axure 导出菜单")
    
    # ========== 5. 删除发布菜单：云服务组 ==========
    # 从云服务分隔线开始，到"更多平台与设置"结束
    cloud_start = 'r.jsx(ia,{}),r.jsx(Vs,{className:"px-2 py-1 text-[11px] font-normal text-muted-foreground",children:"云服务"})'
    if cloud_start in js:
        idx = js.find(cloud_start)
        # 找到"更多平台与设置"菜单项的结束位置
        end_marker = '更多平台与设置'
        end_idx = js.find(end_marker, idx)
        if end_idx > idx:
            # 找到这个菜单项的结束位置（找闭合的 }）
            # 简单处理：找到下一个 r.jsx(ia,{}) 分隔线的位置
            next_sep = js.find('r.jsx(ia,{}),', end_idx)
            if next_sep > end_idx:
                # 删除从云服务开始到下一个分隔线之前的内容
                js = js[:idx] + js[next_sep:]
                changes.append("✓ 已删除发布菜单「云服务」整组")
            else:
                changes.append("⚠ 找到云服务区块但未找到结束分隔线")
        else:
            changes.append("⚠ 找到云服务区块但未找到结束标记")
    else:
        changes.append("⚠ 未找到云服务菜单")
    
    # ========== 6. 评审功能：删除人工评审页签，只留 AI 评审 ==========
    old_tabs = 'grid h-8 w-full grid-cols-2",children:[r.jsx(ii,{value:"ai-review",className:"h-6 text-xs",children:"AI 评审"}),r.jsx(ii,{value:"human-review",className:"h-6 text-xs",children:"人工评审"})]'
    new_tabs = 'grid h-8 w-full grid-cols-1",children:[r.jsx(ii,{value:"ai-review",className:"h-6 text-xs",children:"AI 评审"})]'
    if old_tabs in js:
        js = js.replace(old_tabs, new_tabs)
        changes.append("✓ 已删除人工评审页签，只留 AI 评审")
    else:
        changes.append("⚠ 未找到人工评审页签")
    
    # ========== 7. 评审功能：修改 NE 数组（从 2 个改成 3 个） ==========
    old_ne = 'NE=[{kind:"design",label:"设计评审",description:"优先读取 DESIGN.md；没有则按常规设计评审执行。"},{kind:"requirements",label:"需求评审",description:"优先读取 .spec/spec.html，其次 .spec/spec.md，并跟随必要的子文档。"}]'
    new_ne = 'NE=[{kind:"design-note",label:"设计说明审查",description:"审查页面设计说明卡片：有没有遗漏功能点、有没有技术黑话、文案规不规范。"},{kind:"design",label:"设计文档审查",description:"审查 HLD/LLD 设计文档：结构完整性、分层边界、技术规范符合。"},{kind:"page",label:"页面代码审查",description:"审查生成的页面代码：需求覆盖、组件用法、响应式适配。"}]'
    if old_ne in js:
        js = js.replace(old_ne, new_ne)
        changes.append("✓ 已修改评审项列表 NE，从 2 个改成 3 个")
    else:
        changes.append("⚠ 未找到 NE 数组")
    
    # ========== 8. 评审功能：修改 kc 对象（评审项详细定义） ==========
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
    
    # ========== 写盘 ==========
    with open(index_js, "w", encoding="utf-8") as f:
        f.write(js)
    
    new_len = len(js)
    print("\n".join(changes))
    print("=" * 50)
    print(f"原始大小: {orig_len:,} 字节")
    print(f"修改后大小: {new_len:,} 字节")
    print(f"变化: {new_len - orig_len:+,} 字节")
    print("\n*** 全部完成 ***")
    print("请清除浏览器缓存（Ctrl+Shift+R）后刷新查看效果。")
    print("\n💡 以后重装 node_modules 后，再运行一次本脚本即可全部恢复。")

if __name__ == "__main__":
    main()
