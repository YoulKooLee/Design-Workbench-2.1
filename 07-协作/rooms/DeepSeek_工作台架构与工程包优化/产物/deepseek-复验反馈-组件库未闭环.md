# 复验反馈：组件库重组未闭环（唯一遗留项，请补）

> 提交：DeepSeek，复验豆包 commit b660593（P0-P3 整改）之后
> 结论：P0-P3 整改质量好、已通过验收；唯一遗留 1 项，需补。

## 问题

组件库重组（`frame/` → `03-页面组件/Vibe Design Pro` 等）改了 server.mjs 和 component-registry.json，但**两处没同步**：

1. `workbench.config.json` 的 `componentLibrary` 段仍是**死配置 + 过期路径**：
   - `frameDir: "frame"` → 目录不存在
   - `catalogFile: "frame/admin/_meta/pages.catalog.json"` → 不存在
   - `galleryFile: "frame/gallery.html"` → 不存在
   - `uiLibsDir: "ui-libs"` → 不存在
   （已 grep 确认：server.mjs **零引用**这些字段，它走 component-registry.json 的 source 字段。这段是纯死配置。）

2. `smoke-test.mjs` 仍硬编码检查旧 `frame/` 路径 → **6/49 红灯**（全部 ENOENT），违反 T14。

## 修复要求

1. `workbench.config.json` 的 `componentLibrary` 段：**删除 server.mjs 不用的死字段**（frameDir / catalogFile / galleryFile / uiLibsDir），只保留 `registryFile`（+ rootDir / validateOnBoot）。或更新为新路径。
2. `smoke-test.mjs`：组件库检查从硬编码 `frame/` 路径，改为**读 component-registry.json 的 source 字段动态解析**（这样以后再重组也不会断）。
3. **验收标准**：`node 06-运行脚本/smoke-test.mjs` 回到 **49/49 全绿**。

## 备注

- 实际 catalog 现位于：`03-组件库/03-页面组件/Vibe Design Pro/admin/_meta/pages.catalog.json`（存在 ✓）
- `03-组件库` 子目录编号有重复（两个「02-」、两个「03-」），建议顺手改为 01~05 顺序编号。
