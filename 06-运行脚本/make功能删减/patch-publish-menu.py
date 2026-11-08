#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""删除发布菜单：Axure 导出和云服务"""
import sys
import os

def main():
    project_dir = sys.argv[1] if len(sys.argv) > 1 else r"D:\产品设计工作台\01-项目\Shadcn 后台管理仪表盘"
    admin_dir = os.path.join(project_dir, "node_modules", "@axhub", "make", "dist", "admin")
    index_js = os.path.join(admin_dir, "assets", "index.js")
    
    with open(index_js, "r", encoding="utf-8") as f:
        js = f.read()
    
    orig_len = len(js)
    print(f"原始文件大小: {orig_len:,} 字节")
    
    changes = []
    
    # ========== 1. 删除 Axure 区块 ==========
    # 从 Axure 分隔线开始，到 HTML 区块之前
    axure_start = 'r.jsx(ia,{}),r.jsx(Vs,{className:"px-2 py-1 text-[11px] font-normal text-muted-foreground",children:"Axure"})'
    if axure_start in js:
        idx = js.find(axure_start)
        # 找到 HTML 区块的开始位置
        html_start = 'r.jsx(Vs,{className:"px-2 py-1 text-[11px] font-normal text-muted-foreground",children:"HTML"})'
        html_idx = js.find(html_start, idx)
        if html_idx > idx:
            # 找到 HTML 区块之前的分隔线
            prev_sep = js.rfind('r.jsx(ia,{}),', idx, html_idx)
            if prev_sep > idx:
                # 删除从 Axure 分隔线到 HTML 分隔线之前的内容
                js = js[:idx] + js[html_idx:]
                changes.append("✓ 已删除发布菜单「Axure 导出」整组")
            else:
                changes.append("⚠ 找到 Axure 区块但未找到精确结束位置")
        else:
            changes.append("⚠ 找到 Axure 区块但未找到 HTML 区块")
    else:
        changes.append("⚠ 未找到 Axure 菜单")
    
    # ========== 2. 删除云服务区块 ==========
    # 从云服务分隔线开始，到"更多平台与设置"结束
    cloud_start = 'r.jsx(ia,{}),r.jsx(Vs,{className:"px-2 py-1 text-[11px] font-normal text-muted-foreground",children:"云服务"})'
    if cloud_start in js:
        idx = js.find(cloud_start)
        # 找到下一个分隔线或菜单结束
        next_sep = js.find('r.jsx(ia,{}),', idx)
        if next_sep > idx:
            # 删除从云服务开始到下一个分隔线之前的内容
            js = js[:idx] + js[next_sep:]
            changes.append("✓ 已删除发布菜单「云服务」整组")
        else:
            changes.append("⚠ 找到云服务区块但未找到结束位置")
    else:
        changes.append("⚠ 未找到云服务菜单")
    
    # ========== 写盘 ==========
    with open(index_js, "w", encoding="utf-8") as f:
        f.write(js)
    
    new_len = len(js)
    print("\n".join(changes))
    print("=" * 50)
    print(f"原始大小: {orig_len:,} 字节")
    print(f"修改后大小: {new_len:,} 字节")
    print(f"变化: {new_len - orig_len:+,} 字节")
    print("\n*** 完成 ***")

if __name__ == "__main__":
    main()
