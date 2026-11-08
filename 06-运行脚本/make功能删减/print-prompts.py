#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""打印三个 kind 的完整提示词，用于人工核对路径与内容"""
import os
import re
import subprocess

BASE = r"D:\产品设计工作台"
TARGET = r"01-项目\测试\node_modules\.pnpm\@axhub+make@0.6.21\node_modules\@axhub\make\dist\admin\assets\index.js"
OUT = r"D:\产品设计工作台\06-运行脚本\make功能删减\_diag"
NODE = r"C:\Users\Admin\AppData\Local\Microsoft\WinGet\Packages\OpenJS.NodeJS.22_Microsoft.Winget.Source_8wekyb3d8bbwe\node-v22.23.2-win-x64\node.exe"

js = open(os.path.join(BASE, TARGET), encoding="utf-8").read()


def brace_match(s, open_idx):
    depth = 0
    i = open_idx
    in_str = None
    while i < len(s):
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


m = re.search(r"\bkc\s*=\s*\{", js)
kc_s = m.start()
kc_e = brace_match(js, js.index("{", kc_s))
io_i = js.index("function Io(")
xm_i = js.index("function Xm(")
xm_e = brace_match(js, js.index("{", xm_i))
snippet = js[kc_s:kc_e] + "\n" + js[io_i:xm_e]

runner_code = snippet + r'''
const KINDS = ["design-note", "design", "page"];
const item = {
  displayName: "示例原型", name: "示例原型", resourceId: "demo",
  filePath: "src/prototypes/demo/index.tsx",
};
for (const kind of KINDS) {
  const docPath = gd(item, kind);
  const prompt = Xm({ selectedItem: item, reviewDocumentPath: docPath, kind });
  console.log("=".repeat(70));
  console.log("kind = " + kind);
  console.log("=".repeat(70));
  console.log(prompt);
  console.log();
}
'''

runner = os.path.join(OUT, "_print-prompts.cjs")
with open(runner, "w", encoding="utf-8", newline="") as f:
    f.write(runner_code)

r = subprocess.run([NODE, runner], capture_output=True, text=True, encoding="utf-8")
print(r.stdout)
if r.stderr.strip():
    print("--- stderr ---")
    print(r.stderr[:1500])
os.remove(runner)
