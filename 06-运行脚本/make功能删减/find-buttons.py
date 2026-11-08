#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""定位顶栏按钮的位置"""
import sys
import os

def main():
    project_dir = sys.argv[1] if len(sys.argv) > 1 else r"D:\产品设计工作台\01-项目\Shadcn 后台管理仪表盘"
    admin_dir = os.path.join(project_dir, "node_modules", "@axhub", "make", "dist", "admin")
    index_js = os.path.join(admin_dir, "assets", "index.js")
    
    with open(index_js, "r", encoding="utf-8") as f:
        js = f.read()
    
    # 搜索所有按钮文字
    targets = [" 规格", " 批注", " PRD 标注", " 决策", " 评审"]
    
    for target in targets:
        idx = 0
        count = 0
        while True:
            idx = js.find(target, idx)
            if idx < 0:
                break
            count += 1
            start = max(0, idx - 100)
            end = min(len(js), idx + 100)
            print(f"\n--- {target} 第 {count} 处 (位置 {idx}) ---")
            print(js[start:end])
            idx += 1
            if count >= 5:
                break

if __name__ == "__main__":
    main()
