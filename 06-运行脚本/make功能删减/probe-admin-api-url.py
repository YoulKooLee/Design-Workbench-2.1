#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""从 admin bundle 里找 listReviewReports 的实际请求 URL 与参数"""
import re

P = r"D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin\assets\index.js"
js = open(P, encoding="utf-8").read()


def wrap(s, w=150):
    return "\n".join(s[i:i + w] for i in range(0, len(s), w))


print("=== admin bundle 中 review-reports 相关字面量 ===")
for m in re.finditer(r"review-reports", js):
    i = m.start()
    print(f"@{i}: {wrap(js[max(0, i - 300):i + 300])}")
    print("---")

print()
print("=== listReviewReports 调用点 ===")
for m in re.finditer(r"listReviewReports", js):
    i = m.start()
    print(f"@{i}: {wrap(js[max(0, i - 350):i + 250])}")
    print("---")
