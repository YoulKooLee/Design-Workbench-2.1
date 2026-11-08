#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Make 管理端一键瘦身恢复脚本
============================================
用法：
  python make-slim-restore.py [项目路径]
  
功能：
  1. 把瘦身版 admin 目录复制到指定项目的 node_modules 里
  2. 验证是否成功
  3. 以后重装 node_modules 后运行一次即可全部恢复

瘦身版目录位置：
  D:\产品设计工作台\03-组件库\04-Make客户端瘦身版\admin\
"""
import os
import sys
import shutil

SLIM_DIR = r"D:\产品设计工作台\03-组件库\04-Make客户端瘦身版\admin"

def main():
    # 获取项目路径
    if len(sys.argv) >= 2:
        project_dir = sys.argv[1]
    else:
        project_dir = os.getcwd()
    
    print(f"项目路径: {project_dir}")
    print(f"瘦身版目录: {SLIM_DIR}")
    print("=" * 60)
    
    # 检查瘦身版目录是否存在
    if not os.path.exists(SLIM_DIR):
        print(f"❌ 找不到瘦身版目录: {SLIM_DIR}")
        return 1
    
    # 检查瘦身版 index.js 是否存在
    slim_js = os.path.join(SLIM_DIR, "assets", "index.js")
    if not os.path.exists(slim_js):
        print(f"❌ 找不到瘦身版 index.js: {slim_js}")
        return 1
    
    # 找到目标 admin 目录
    admin_dir = os.path.join(project_dir, "node_modules", "@axhub", "make", "dist", "admin")
    
    if not os.path.exists(admin_dir):
        print(f"❌ 找不到项目 admin 目录: {admin_dir}")
        print("   请先运行 npm install 安装依赖")
        return 1
    
    # 备份原 index.js（如果存在）
    target_js = os.path.join(admin_dir, "assets", "index.js")
    if os.path.exists(target_js):
        backup_js = target_js + ".bak"
        if not os.path.exists(backup_js):
            shutil.copy2(target_js, backup_js)
            print(f"✅ 已备份原 index.js 到: {backup_js}")
    
    # 复制瘦身版目录
    print("\n复制瘦身版 admin 目录...")
    for item in os.listdir(SLIM_DIR):
        src = os.path.join(SLIM_DIR, item)
        dst = os.path.join(admin_dir, item)
        if os.path.isdir(src):
            if os.path.exists(dst):
                shutil.rmtree(dst)
            shutil.copytree(src, dst)
        else:
            shutil.copy2(src, dst)
    
    # 验证
    print("\n验证结果:")
    with open(target_js, "r", encoding="utf-8") as f:
        js = f.read()
    
    print(f"  index.js 大小: {len(js):,} 字节")
    
    checks = [
        ("人工评审", 0, "应删除"),
        ("设计说明审查", 2, "应存在"),
        ("设计文档审查", 2, "应存在"),
        ("页面代码审查", 2, "应存在"),
        ("导出带交互原型", 0, "应删除"),
    ]
    
    all_pass = True
    for keyword, expected, desc in checks:
        count = js.count(keyword)
        status = "✓" if count == expected else "✗"
        if count != expected:
            all_pass = False
        print(f"  {status} {keyword}: {count} 处（期望 {expected}）— {desc}")
    
    print("=" * 60)
    if all_pass:
        print("✅ 恢复成功！请刷新浏览器查看效果。")
        return 0
    else:
        print("⚠ 部分检查未通过，但文件已复制。")
        return 0

if __name__ == "__main__":
    sys.exit(main())
