kc={
  "design-note": {
    kind: "design-note",
    label: "设计说明",
    title: "设计说明审查",
    rulePath: "docs/rules/design-note-review-guide.md",
    templatePath: "docs/templates/design-note-review.md",
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
    rulePath: "docs/rules/design-doc-review-guide.md",
    templatePath: "docs/templates/design-doc-review.md",
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
    rulePath: "docs/rules/ui-review-guide.md",
    templatePath: "docs/templates/ui-review.md",
    fileName: "ui-review.md",
    fallbackPath: `docs/reviews/ui-review.md`,
    targetDescription: "当前原型执行页面代码审查",
    emptyDescription: "发起评审后，AI 会检查页面代码的需求覆盖、组件用法、响应式适配。",
    requiredBasis: "优先读取当前原型的源码；检查需求覆盖、组件用法、响应式适配。"
  }
}
function Io(e){return String(e||"").trim().replace(/\\/g,"/").replace(/\/+/g,"/")}function Rh(e){return e.replace(/\/index\.(?:tsx?|jsx?|html)$/iu,"")}function gd(e,t="design"){const n=kc[t]??kc.design,a=Io((e==null?void 0:e.absoluteFilePath)||(e==null?void 0:e.filePath)),s=Rh(a);if(s)return`${s}/docs/reviews/${n.fileName}`;const i=Io((e==null?void 0:e.resourceId)||(e==null?void 0:e.name));return i?`src/prototypes/${i}/docs/reviews/${n.fileName}`:""}function yI(e){const t=Io((e==null?void 0:e.absoluteFilePath)||(e==null?void 0:e.filePath)),n=Rh(t);if(n)return`${n}/docs`;const a=Io((e==null?void 0:e.resourceId)||(e==null?void 0:e.name));return a?`src/prototypes/${a}/docs`:"src/prototypes/<prototype-id>/docs"}function Xm(e){const t=e.selectedItem,n=kc[e.kind]??kc.design,a=String((t==null?void 0:t.displayName)||(t==null?void 0:t.name)||(t==null?void 0:t.resourceId)||"当前原型").trim(),s=Io((t==null?void 0:t.filePath)||(t==null?void 0:t.absoluteFilePath)),i=Io(e.reviewDocumentPath||gd(t,n.kind)),l=n.kind==="requirements"?n.requiredBasis.replaceAll("<prototype-spec-root>",yI(t)):n.requiredBasis;return[`请对${n.targetDescription}，并把结果写成 Markdown。`,"","【前置阅读】",`- 请先读取并严格遵循：${n.rulePath}`,`- 请先读取并套用报告模板：${n.templatePath}`,"","【评审目标】",`- 原型：${a}`,s?`- 源码路径：${s}`:null,`- 评审结果写入：${i||n.fallbackPath}`,"","【执行要求】","1. 细节以规则文档和报告模板为准；这里不重复展开。",`2. ${l}`,"3. 输出 Markdown，不写 .impeccable 产物作为交付。","4. 优先级只使用 P0-P3，最多列出 5 条优先级问题。","","【最终回复要求】",`- 说明已写入的路径：${i||n.fallbackPath}`,"- 汇总 P0-P3 数量。"].filter(Boolean).join(`
`)}

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
