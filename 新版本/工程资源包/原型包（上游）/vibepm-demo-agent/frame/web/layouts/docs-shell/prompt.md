# 文档内容壳

> 状态：`preview`  
> slug：`docs-shell` · 类型：layout · 母版：`web` · surface：`general` · category：`shell`

## 1. 角色与目标

实现「文档内容壳」（`docs-shell`），用于帮助中心 / 设计规范 / 协议长文：限宽居中；悬浮胶囊顶栏（品牌、搜索、站点导航）+ 左侧文档目录 + 正文 + 本页大纲。

成功标准：三栏阅读分区清晰；顶栏非控制台通栏；目录可折叠；搜索示意 Ctrl/⌘+K；明暗可切；无业务侧栏密度。

## 2. 实现路径（只走一条）

- **A**（有母版）：**先查** `layouts/docs-shell/` → **有则复用预览框架并按 §5 填槽**，勿无故按 §7 重写。
- **B**（无母版 / 其它栈）：只还原框架信息架构。视觉跟宿主库。禁止外网 CDN。
- **样式落地**：多页共用允许交付内一份 `css/layout-docs-shell.css`；单页并入宿主 CSS。
- **脚本落地**：目录折叠 / 搜索过滤 / 大纲跳转并入宿主 `js/<page>.js`；预览挂载框架不拷。

## 3. 约束

- 类名 `wa-layout*`、`wa-layout--site-docs`；禁止 ProShell 运行时
- 默认 density=comfortable（general）；勿套 App compact 侧栏
- 官网落地页用 `marketing-shell` / `marketing-float`；持续阅读说明页用本壳
- 禁止外网 CDN；正文为文档段落，非假看板
- 响应式：窄屏收起侧栏/大纲为抽屉或叠层（按预览实现）
- 交互：明暗、搜索、目录选中、大纲锚点

## 4. 视觉规格

- 顶栏：悬浮胶囊（品牌 | 搜索 | Docs/API 等链接 | 明暗）
- 舞台：左目录（可灰底）| 正文版心 | 右本页大纲
- 整页限宽居中；颜色只用 `--wa-*`

## 5. 可变槽位

| 槽位 | 说明 | 示例 |
|------|------|------|
| brand | 顶栏品牌 | Vibe Docs |
| topLinks | 顶栏站点分区 | 使用文档 / API / 更新日志 |
| search | 搜索触发 | Ctrl+K |
| docsNav | 左侧目录（分组/折叠） | 开始使用 / 搭建指南 |
| article | 正文 | 标题、导语、章节 |
| outline | 本页大纲 | 锚点列表 |
| footer | 页脚 | 仓库 / 联系 |

## 6. 验收

- [ ] 与 §7 / 预览同一框架分区
- [ ] 无 ProShell 运行时、无 CDN、类名为 `wa-layout*`
- [ ] 亮/暗可读；目录与大纲可用
- [ ] **A**：已复用 `layouts/docs-shell/` 填槽

## 7. 参考结构（骨架）

```html
<div class="wa-layout wa-layout--site-docs">
  <div class="wa-layout__docs-shell">
    <header class="wa-layout__docs-topbar">
      <a class="wa-layout__brand">{{brand}}</a>
      <button class="wa-layout__docs-search-trigger"><!-- {{search}} --></button>
      <nav class="wa-layout__docs-toplinks"><!-- {{topLinks}} --></nav>
    </header>
    <div class="wa-layout__docs-stage">
      <aside class="wa-layout__docs-sider"><nav><!-- {{docsNav}} --></nav></aside>
      <div class="wa-layout__docs-right">
        <main class="wa-layout__docs-main"><article><!-- {{article}} --></article></main>
        <aside class="wa-layout__docs-outline"><!-- {{outline}} --></aside>
      </div>
    </div>
  </div>
</div>
```

## 8. 关联资源

| 类型 | 路径 | 说明 |
|------|------|------|
| list | `layouts/list.md` | 库存与选模板 |
| sibling | `layouts/marketing-shell/` | 营销站壳，勿混用 |
| density | `design-library/references/layout-density.md` | 密度与 Admin 契约 |
