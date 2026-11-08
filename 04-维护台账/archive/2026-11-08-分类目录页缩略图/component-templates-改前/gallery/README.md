# gallery · 组件画廊（组件页签入口）

开发栈组件面板的「gallery」页签：**全部分类组件的可视化画廊**（参照 Vibe Design Pro 母版选型 Gallery 的交互形态）。

## 能力

- **live 缩略图**：每张卡片用 iframe 按 1200×750 渲染、`scale(0.2)` 缩到 240×150，随源页面实时更新（不是截图，不会过期）
- **懒加载**：IntersectionObserver 进入视口前 400px 才挂 iframe，200 个组件页不卡
- **分类侧栏**：17 分类带计数，点击过滤
- **搜索**：跨分类按组件名 / 中文标签 / 分类名平铺检索
- **预览 / 复制**：hover 卡片出「预览」（新窗口打开组件页）与「复制」（复制 Make 路由 `/component-templates/<分类>/<页>`）

## 文件说明

| 文件 | 用途 |
| --- | --- |
| `index.tsx` | 画廊主体（缩略图卡片 / 侧栏 / 搜索 / 分组） |
| `index.html` | 挂载壳 + 深色画廊样式 |
| `catalog.ts` | **自动生成**的清单：17 分类 / 200 组件页，勿手改 |
| `_meta/gen-catalog.mjs` | 清单生成器 |

## 维护

新增组件页后重新生成清单（在模板与各项目里都要跑）：

```bash
node src/component-templates/gallery/_meta/gen-catalog.mjs
```

生成器按优先级识别各分类的页面清单：

1. `pages.json`（daisyUI 格式）
2. `index.tsx` 里的 `ITEMS` 数组（Codebuddy 分类格式：`{ name, label, href }`）
3. `index.tsx` 里的 JSX `<a href="./X/index.html">` 直链（表单 / 页面模式等格式）
4. 分类根本身是单页面板（icons）
5. 兜底：扫描子目录 `index.html`

## 已知边界

- 缩略图 iframe 与主页面同源（同一 Vite/Make 服务），无跨域问题
- daisyUI 展示页较重（全量 CSS），懒加载缓解首屏
- 卡片缩略图取页面顶部 1200×750 视口，长页面只显示首屏
