#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""修复评审写入路径（精确匹配）"""
import os

admin_dir = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin"
index_js = os.path.join(admin_dir, "assets", "index.js")

with open(index_js, "r", encoding="utf-8") as f:
    js = f.read()

print(f"原始文件大小: {len(js)} 字符")

# 1. 替换 gd 函数里的路径
# 原来的：
# if(s)return`${s}/.spec/reviews/${n.fileName}`;
# return i?`src/prototypes/${i}/.spec/reviews/${n.fileName}`:""

# 改成：
# if(s)return`${s}/docs/reviews/${n.fileName}`;
# return i?`src/prototypes/${i}/docs/reviews/${n.fileName}`:""

old1 = 'if(s)return`${s}/.spec/reviews/${n.fileName}`;'
new1 = 'if(s)return`${s}/docs/reviews/${n.fileName}`;'
count1 = js.count(old1)
if count1 > 0:
    js = js.replace(old1, new1)
    print(f"替换 gd 函数路径 1，共 {count1} 处")
else:
    print(f"未找到 gd 函数路径 1")

old2 = 'return i?`src/prototypes/${i}/.spec/reviews/${n.fileName}`:""'
new2 = 'return i?`src/prototypes/${i}/docs/reviews/${n.fileName}`:""'
count2 = js.count(old2)
if count2 > 0:
    js = js.replace(old2, new2)
    print(f"替换 gd 函数路径 2，共 {count2} 处")
else:
    print(f"未找到 gd 函数路径 2")

# 2. 替换 yI 函数里的路径
# 原来的：
# if(n)return`${n}/.spec`;
# return a?`src/prototypes/${a}/.spec`:""

# 改成：
# if(n)return`${n}/docs`;
# return a?`src/prototypes/${a}/docs`:""

# 先找 yI 函数的位置
yI_start = js.find("function yI(")
if yI_start >= 0:
    print(f"\nyI 函数位置: {yI_start}")
    yI_code = js[yI_start:yI_start+500]
    print(f"yI 函数代码: {yI_code}")
    
    # 替换
    old3 = 'if(n)return`${n}/.spec`;'
    new3 = 'if(n)return`${n}/docs`;'
    count3 = js.count(old3)
    if count3 > 0:
        js = js.replace(old3, new3)
        print(f"替换 yI 函数路径 1，共 {count3} 处")
    else:
        print(f"未找到 yI 函数路径 1")
    
    old4 = 'return a?`src/prototypes/${a}/.spec`:""'
    new4 = 'return a?`src/prototypes/${a}/docs`:""'
    count4 = js.count(old4)
    if count4 > 0:
        js = js.replace(old4, new4)
        print(f"替换 yI 函数路径 2，共 {count4} 处")
    else:
        print(f"未找到 yI 函数路径 2")
else:
    print("未找到 yI 函数")

# 写回文件
with open(index_js, "w", encoding="utf-8") as f:
    f.write(js)

print(f"\n修改后文件大小: {len(js)} 字符")
print("修复完成！")
