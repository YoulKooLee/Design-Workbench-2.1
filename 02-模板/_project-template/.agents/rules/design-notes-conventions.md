# 原型设计说明编写规范（Design Notes）

## 总则

所有原型页面的「设计说明」**必须**通过 `src/common/PrototypeLayout.tsx` 组件渲染，**禁止**在原型页面里手写内联 `<aside>` / `<div className="...-panel">` 之类的自绘说明区。

设计说明统一走 Xbox 风格（方方正正、扁平、白底绿边框、编号卡片、SVG 连线 + hover 高亮），由组件自动渲染；作者只需提供**结构化的 Markdown 内容**。

## 组件接入方式

在原型 `index.tsx` 中把页面内容包进 `PrototypeLayout`，并传入 `description`（推荐）或 `modules`：

```tsx
import { PrototypeLayout } from '../../common/PrototypeLayout';

export default function Page() {
  return (
    <PrototypeLayout
      title="页面标题"
      breadcrumb="路径 / 页面"
      description={DESIGN_NOTES}   // 结构化 Markdown，见下方规范
    >
      {/* 页面设计稿 */}
    </PrototypeLayout>
  );
}
```

> 若用 `modules`（精准连线），左侧模块需显式 `data-proto-id`，且 `modules` 的 `id` 与之对应。默认情况下 `description` 会自动拆卡并给左侧子元素自动编号，无需额外标记。

## description 结构化规范

`description` 是一段 Markdown 字符串，解析规则如下：

| 语法 | 作用 | 渲染 |
| --- | --- | --- |
| `# 标题` | 页面一句话说明（brief） | 说明面板顶部简介 |
| `## 模块标题` | 分割一个模块卡片 | 一张编号卡片 |
| `- 要点` | 模块下的列表项 | 卡片内绿色方块列表 |
| `### 子标题` | 模块内分组标题 | 卡片内 `【子标题】` 前缀段落 |
| 普通文本 | 模块的描述段落 | 卡片正文 |

### 编写模板

```markdown
# 一句话说明页面用途

## 模块标题
一段描述该模块职责的文字。
- 功能点 1
- 字段说明
- 交互要点

## 下一模块标题
...
```

### 编写要点

- **每模块只做一件事**：标题即模块职责，正文描述边界。
- **引用真实字段/接口**：涉及数据时写真实字段名、字典取值、错误码（如 `INDICATOR_CODE_DUPLICATE(3001)`），方便开发对照。
- **写交互与状态**：hover、点击、Tab 切换、空态、边界条件都要写进列表。
- **模块数量 3~6 个为宜**，过多说明页面拆得不合理，过少说明说明不充分。
- **markdown 中转义符**：含 `\`` 等特殊字符时注意转义，避免破坏解析。

## 验收（自检）

写完设计说明后对照检查：
- [ ] 用的是 `PrototypeLayout`，没有内联自绘说明区
- [ ] `description` 用 `## ` 正确拆成了 2 张以上卡片（非整段糊一起）
- [ ] 每张卡片有标题、有正文或列表、无空卡
- [ ] 左侧设计稿的关键模块能通过连线/编号对应到右侧卡片
- [ ] `npm run typecheck` 通过
