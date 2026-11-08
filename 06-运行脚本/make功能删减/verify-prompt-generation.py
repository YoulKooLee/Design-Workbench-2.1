#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
修复后验证：把 kc 元数据 + Xm() 提示词生成器原样从补丁后的 bundle 里抽出来，
在 Node 里真跑一遍，证明三个 kind 都能生成非空提示词。
"""
import os
import re
import subprocess
import sys

BASE = r"D:\产品设计工作台"
TARGET = r"01-项目\测试\node_modules\@axhub\make\dist\admin\assets\index.js"
OUT = r"D:\产品设计工作台\06-运行脚本\make功能删减\_diag"

NODE = r"C:\Users\Admin\AppData\Local\Microsoft\WinGet\Packages\OpenJS.NodeJS.22_Microsoft.Winget.Source_8wekyb3d8bbwe\node-v22.23.2-win-x64\node.exe"

js = open(os.path.join(BASE, TARGET), encoding="utf-8").read()


def brace_match(s, open_idx):
    depth = 0
    i = open_idx
    n = len(s)
    in_str = None
    while i < n:
        c = s[i]
        if in_str:
            if c == "\\":
                i += 2
                continue
            if c == in_str:
                in_str = None
            i += 1
            continue
        if c in "\"'`":
            in_str = c
            i += 1
            continue
        if c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                return i + 1
        i += 1
    return -1


# 1) 抽取 kc = {...}
m = re.search(r"\bkc\s*=\s*\{", js)
assert m, "找不到 kc 定义"
kc_start = m.start()
kc_open = js.index("{", m.start())
kc_end = brace_match(js, kc_open)
assert kc_end > 0
kc_src = js[kc_start:kc_end]
print(f"kc 定义抽取: [{kc_start}:{kc_end}]  {kc_end-kc_start} 字符")

# 2) 抽取 function Io ... 直到 Xm 结束（含 Io/Rh/gd/yI/Xm）
io_i = js.index("function Io(")
xm_i = js.index("function Xm(")
xm_open = js.index("{", xm_i)
xm_end = brace_match(js, xm_open)
assert xm_end > 0
fn_src = js[io_i:xm_end]
print(f"函数抽取: [{io_i}:{xm_end}]  {xm_end-io_i} 字符")

snippet = kc_src + "\n" + fn_src + "\n"

test_code = r"""
// ---- 测试入口 ----
const KINDS = ["design-note", "design", "page"];
const item = {
  displayName: "示例原型",
  name: "示例原型",
  resourceId: "demo-prototype",
  filePath: "src/prototypes/demo/index.tsx",
};
let fail = 0;
const report = [];
for (const kind of KINDS) {
  const meta = kc[kind];
  if (!meta) { console.log("FAIL  kc 缺少 kind=" + kind); fail++; continue; }
  const need = ["kind","label","title","rulePath","templatePath","fileName","fallbackPath","targetDescription","emptyDescription","requiredBasis"];
  const missing = need.filter(k => !String(meta[k] || "").trim());
  if (missing.length) { console.log("FAIL  kc[" + kind + "] 缺字段: " + missing.join(",")); fail++; continue; }
  const docPath = gd(item, kind);
  const prompt = Xm({ selectedItem: item, reviewDocumentPath: docPath, kind });
  const text = String(prompt || "").trim();
  if (!text) { console.log("FAIL  kind=" + kind + " 提示词为空"); fail++; continue; }
  report.push({ kind, docPath, len: text.length, head: text.split("\n").slice(0, 3).join(" | ") });
}
console.log("");
for (const r of report) {
  console.log("OK    kind=" + r.kind.padEnd(12) + " 提示词 " + String(r.len).padStart(4) + " 字符  docPath=" + r.docPath);
  console.log("      开头: " + r.head);
}
// 交叉验证：三个提示词互不相同
const uniq = new Set(report.map(r => r.head));
console.log("");
console.log("三种 kind 提示词互不相同: " + (uniq.size === 3 ? "是" : "否 (仅 " + uniq.size + " 种)"));
if (uniq.size !== 3) fail++;
console.log(fail === 0 ? "\nRESULT: PASS" : "\nRESULT: FAIL (" + fail + ")");
process.exit(fail === 0 ? 0 : 1);
"""

os.makedirs(OUT, exist_ok=True)
runner = os.path.join(OUT, "_verify-prompt.cjs")
with open(runner, "w", encoding="utf-8", newline="") as f:
    f.write(snippet + test_code)
print(f"验证脚本: {runner}\n")

r = subprocess.run([NODE, runner], capture_output=True, text=True, encoding="utf-8")
print(r.stdout)
if r.stderr.strip():
    print("--- stderr ---")
    print(r.stderr[:3000])
print(f"exit={r.returncode}")
sys.exit(r.returncode)
