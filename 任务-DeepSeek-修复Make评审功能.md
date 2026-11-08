# Make 管理端 AI 评审功能修复任务

## 一、问题描述

### 背景
Make 管理端（Axhub Make）的评审功能需要改造：
- 原来的评审项是 2 个（设计评审、需求评审）
- 现在改成 3 个（设计说明审查、设计文档审查、页面代码审查）

### 当前状态
1. ✅ UI 已改好：三个评审项都正常显示了
2. ❌ 点击"AI 执行"按钮没有任何反应
   - 不提示"已发送到 AI 侧栏"
   - 不提示"提示词已复制到剪贴板"
   - ACP WebUI 里也收不到任何提示词
   - 剪贴板里也是空的

---

## 二、文件路径

- **测试项目 Make 管理端 index.js**：
  `D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin\assets\index.js`
  
  （约 706,404 字节，minified JS）

- **瘦身版 admin 目录备份**：
  `D:\产品设计工作台\03-组件库\04-Make客户端瘦身版\admin\`

- **一键恢复脚本**：
  `D:\产品设计工作台\06-运行脚本\make功能删减\make-slim-restore.py`

---

## 三、已定位的关键代码位置

### 1. 三个评审项的元数据（NE 数组）
- **位置**：约 398183 字符处
- **代码**：
```js
NE = [
  {kind:"design-note", label:"设计说明审查", description:"审查页面设计说明卡片：有没有遗漏功能点、有没有技术黑话、文案规不规范。"},
  {kind:"design", label:"设计文档审查", description:"审查 HLD/LLD 设计文档：结构完整性、分层边界、技术规范符合。"},
  {kind:"page", label:"页面代码审查", description:"审查生成的页面代码：需求覆盖、组件用法、响应式适配。"}
]
```

### 2. 评审面板组件（ME）
- **位置**：约 393848 字符处
- **关键逻辑**：
  - `ME` 组件接收 `reviewPrompts`、`reviewDocumentPaths`、`onExecutePrompt`、`onRunReviewDirect` 等 props
  - 渲染评审项时，遍历 `NE.map(ee)`
  - 每个评审项的按钮组件是 `xE`

### 3. "AI 执行"按钮组件（xE）
- **位置**：约 389245 字符处
- **工作流程**：
  ```
  点击按钮 → 调用 E("direct")
  → 先调用 R() 生成提示词
  → 如果提示词是空的，直接返回（显示"没有可用的 Prompt"）
  → 如果是 direct 模式，调用 onDirectExecute 回调
  ```
- **关键代码**：
```js
T = async H => (await C(H), re(H))  // 生成提示词
re = H => (i == null ? void 0 : i[H]) || a  // 从 reviewPrompts 里根据 kind 取提示词
```

### 4. 事件绑定传递链路
```
xE.onDirectExecute
→ ME.onRunReviewDirect (props)
→ t.handleRunReviewDirect (顶层组件方法)
```

---

## 四、问题猜测

### 最可能的原因
1. 我只改了 `NE` 数组里的 `kind`（从 `design`、`requirement` 改成了 `design-note`、`design`、`page`）
2. 但 `reviewPrompts` 状态里的 key 还是旧的（`design`、`requirement`）
3. 所以 `re(H.kind)` 找不到对应的提示词，返回空
4. 所以 `R()` 函数生成的提示词是空的
5. 所以按钮看起来是可用的，但点击后直接返回了，不执行后续操作

### 其他可能原因
1. `handleRunReviewDirect` 函数不存在或为空
2. 事件绑定断了
3. 按钮被禁用了（但从 UI 看不像）

---

## 五、需要做的事情

### 任务目标
让三个评审项的"AI 执行"按钮都能正常工作：
1. 点击后能正确生成提示词
2. 点击后能发送到 AI 侧栏（或复制到剪贴板）
3. 有正确的提示信息（"已发送到 AI 侧栏" 或 "提示词已复制到剪贴板"）

### 具体步骤
1. **找到 `handleStartReview` 函数的定义**
   - 看看它是怎么生成 `reviewPrompts` 状态的
   - 看看它里面的 kind 是不是还是旧的

2. **找到 `handleRunReviewDirect` 函数的定义**
   - 看看它是怎么工作的
   - 看看它接收什么参数

3. **修复 kind 不匹配的问题**
   - 如果 `reviewPrompts` 状态里的 key 是旧的，改成新的
   - 如果 `handleStartReview` 函数里的逻辑是旧的，改成新的
   - 确保三个新的 kind（`design-note`、`design`、`page`）都能正确生成提示词

4. **验证事件绑定**
   - 确保 `onRunReviewDirect` 回调正确传递
   - 确保点击按钮后能正确调用

5. **测试**
   - 在浏览器里打开 Make 管理端（http://localhost:51720）
   - 打开评审面板
   - 点击三个评审项的"AI 执行"按钮
   - 确认有正确的提示信息
   - 确认 ACP WebUI（http://localhost:32124）里能收到提示词

---

## 六、注意事项

### 重要提醒
1. **不要破坏其他功能**：只改评审相关的代码，不要动其他地方
2. **备份**：修改前先备份原始 index.js
3. **minified JS**：这是压缩后的代码，变量名都是短的（如 `NE`、`ME`、`xE`、`re`、`T`），不要被迷惑
4. **三个项目都要改**：
   - 测试项目：`D:\产品设计工作台\01-项目\测试\node_modules\@axhub\make\dist\admin\`
   - Shadcn 项目：`D:\产品设计工作台\01-项目\Shadcn 后台管理仪表盘\node_modules\@axhub\make\dist\admin\`
   - 瘦身版备份：`D:\产品设计工作台\03-组件库\04-Make客户端瘦身版\admin\`

### 验收标准
1. 三个评审项的"AI 执行"按钮都能正常点击
2. 点击后有正确的提示信息（"已发送到 AI 侧栏" 或 "提示词已复制到剪贴板"）
3. ACP WebUI 里能收到对应的提示词
4. 其他功能（顶栏按钮、发布菜单、页面编辑等）不受影响

---

## 七、相关辅助脚本

在 `D:\产品设计工作台\06-运行脚本\make功能删减\` 目录下，有很多之前写的辅助脚本：
- `find-review-done.py` — 查找"AI 评审已完成"提示的位置
- `find-xe-component.py` — 查找 xE 组件的定义
- `find-xe-full.py` — 查找 xE 组件的完整代码
- `find-me-component.py` — 查找 ME 组件的代码
- `find-me-call.py` — 查找 ME 组件的调用位置
- `find-handle-run-review.py` — 查找 handleRunReviewDirect 函数
- `find-review-prompts-init.py` — 查找 reviewPrompts 的初始化位置

可以直接运行这些脚本来定位代码。

---

## 八、当前进度

- [x] 定位到三个评审项的 UI 代码（NE 数组）
- [x] 定位到评审面板组件（ME）
- [x] 定位到"AI 执行"按钮组件（xE）
- [x] 定位到事件绑定传递链路
- [ ] 找到 handleStartReview 函数的定义
- [ ] 找到 handleRunReviewDirect 函数的定义
- [ ] 修复 kind 不匹配的问题
- [ ] 验证事件绑定
- [ ] 测试通过
