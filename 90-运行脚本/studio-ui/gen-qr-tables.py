# -*- coding: utf-8 -*-
"""从 segno 的标准表生成 JS 用二维码分块表（纠错等级 L / M，版本 1..40）。"""
import json
import segno.consts as c

LEVELS = {'L': 1, 'M': 0}
out = {}
for name, key in LEVELS.items():
    rows = {}
    for v in range(1, 41):
        ecs = c.ECC[v - 1][key]
        # EC(num_blocks, num_total, num_data)
        groups = []
        for e in ecs:
            groups.append([e.num_blocks, e.num_data])
        ec_per_block = ecs[0].num_total - ecs[0].num_data
        # 合并相同 (num_blocks, num_data) 的相邻项
        merged = []
        for g in groups:
            if merged and merged[-1][1] == g[1]:
                merged[-1][0] += g[0]
            else:
                merged.append(g)
        rows[v] = [ec_per_block, merged]
    out[name] = rows

align = {1: []}
for idx, pos in enumerate(c.ALIGNMENT_POS):
    align[idx + 2] = list(pos)

print(json.dumps({'blocks': out, 'align': align}, ensure_ascii=False))
