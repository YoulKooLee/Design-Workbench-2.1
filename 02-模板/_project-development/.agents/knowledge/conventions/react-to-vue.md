# React 原型 → Vue 工程 转换规范（react-to-vue）

> 位置：`.agents/knowledge/conventions/react-to-vue.md` ｜ 读取层：开发阶段按需（写页面前必读）
> 适用：从 `_project-template` 产出的 React 原型，在 `_project-development` 研发工程（Vue 3）中实现
> 版本：v1.0 ｜ 2026-09-29 ｜ 依据：两侧真实代码实地勘查（非通用知识推导）

---

## 零、这份规范解决什么问题

React 原型的定位是**视觉与交互的事实参照**，不是可移植代码。直接翻译 JSX 会产出"React 味儿的 Vue"——语法能跑，但绕开了本工程已有的封装体系，每次 code-review 都被打回，且无法复用既有能力（表格、CRUD、权限、国际化）。

**转换 ≠ 移植。** 正确姿势：从原型读「它做了什么」，按本工程惯例写「这里应该怎么做」。

### 硬约束（违反即验收不通过）

1. **禁止 import / 拷贝 React 原型的任何代码、样式、常量、图标名**。原型目录不进入 Vue 工程的依赖图，也不出现在任何 import 路径中。
2. **规格真源是 SRS，不是原型代码**。原型未体现而 SRS 有规定的需求（权限、空态、异常流、校验规则）必须实现；原型有而 SRS 无的，先回写 SRS 再实现。
3. **禁止新增依赖**。需要的能力先在 §五「既有封装清单」里找；确实没有，先申报（写入交接清单待办），不要擅自 `npm i`。
4. **禁止自由发明 UI 原子件**。按钮/表单/表格/弹窗/标签页一律用 Element Plus 或本工程 `Art*` 组件，见 §四。
5. **每页验收双门禁**：① 对照原型的还原度（视觉层级、交互反馈、状态种类）② 对照 SRS 的需求覆盖（含原型未实现项）。缺一不通过。

---

## 一、本工程真实技术栈（实测，勿凭旧文档）

| 项 | 实测值 | 证据 |
|---|---|---|
| 框架 | Vue **3.5** + TypeScript ~5.6 + Vite **7** | 工程根 `package.json`（模板内为 `src/admin/package.json`，建项后平铺到项目根） |
| UI 库 | **Element Plus ^2.11.2** | package.json deps；`vite.config.ts` 用 `ElementPlusResolver`；`main.ts` 引 `@styles/el-ui.scss`、`@styles/el-dark.scss`；44 个源文件使用 `El*` 组件 |
| 脚手架 | **art-design-pro** 系（`Art*` 组件前缀、`art-*` 目录、`@styles` 别名） | `src/components/core/` 命名与 `ArtLogo` 等 |
| 状态 | pinia ^3 + pinia-plugin-persistedstate | `store/index.ts`、`store/modules/*.ts` |
| 路由 | vue-router ^4，模块化注册 | `router/modules/*.ts` + `router/routes/asyncRoutes.ts` |
| 国际化 | vue-i18n ^9，**菜单标题必须走 i18n key** | `router/modules/system-config.ts` 的 `meta.title: 'menus.systemConfig.title'` |
| 请求 | axios ^1.12 统一封装 | `utils/http/index.ts`（8.7KB）+ `error.ts` + `status.ts` |
| 样式 | SCSS + `@styles` 别名 + CSS 变量主题层 | `main.ts` 引 6 个全局 scss |
| 事件总线 | mitt ^3 | package.json deps |
| 图表 | echarts ^5.6 / @antv/g2 ^5.4 / three ^0.150 | package.json deps；`composables/useChart.ts` 16.4KB |
| 工具 | @vueuse/core ^13.9、xlsx、file-saver、crypto-js、dayjs 类 | package.json deps |

> ⚠️ **本工程不使用 Arco Design Vue、不使用 Ant Design Pro、不使用 shadcn、不使用 vant**。
> 旧文档与 `knowledge/ui-libs/arco-design-vue/` 的表述已作废（历史误配，已归档）。写页面前若见到 Arco 字样，一律按 Element Plus 处理。

原型侧技术栈（对照用）：React 18.2 + TSX + Vite 5 + tailwindcss 4 + lucide-react + @xyflow/react + 自定义 CSS 变量双主题。

---

## 二、文件与目录映射

| React 原型（源） | Vue 工程（目标） | 说明 |
|---|---|---|
| `src/prototypes/<name>/index.tsx` | `src/views/<Module>/<Page>/index.vue` | 一个原型页 → 一个或多个 Vue 页面；`index.tsx` 若是"页面容器"，其编排逻辑进 `<script setup>` |
| `src/prototypes/<name>/components/*.tsx` | `src/components/<module>/*.vue` | 页面私有组件放 `src/components/<module>/`；跨页复用才进 `src/components/core/` |
| `src/prototypes/<name>/lib/*.ts`（纯逻辑） | `src/utils/<domain>/*.ts` 或 `src/composables/use<Name>.ts` | **看有无状态**：纯函数 → `utils/`；含响应式状态/生命周期 → `composables/` |
| `src/prototypes/<name>/lib/storage.ts`（localStorage） | pinia store module + `persist` 选项 | 不要直接写 localStorage，见 §三.4 |
| `src/prototypes/<name>/styles.css` | `src/views/<Module>/<Page>/index.vue` 的 `<style lang="scss" scoped>` | 全局令牌进 `@styles/`，页面样式一律 scoped |
| 类型定义（`export interface XxxProps`） | `src/types/<domain>.d.ts` 或组件内 `defineProps<T>()` | 跨模块共享类型进 `src/types/` |
| `lucide-react` 图标 | Element Plus 图标（`@element-plus/icons-vue`）或工程 iconfont（`@icons/system/iconfont.css`） | 见 §四.3 |
| mock 数据（原型内联） | `src/mock/<domain>.ts` + `createCrudApi({ mockFns })` | 见 §五.2 |

---

## 三、语法与模式映射（逐条带真实代码）

### 3.1 组件骨架

**React（原型实测：`markdesk/components/StatusBar.tsx`）**
```tsx
export interface StatusBarProps {
  lines: number;
  chars: number;
  saveState: SaveState;
}

export default function StatusBar({ lines, chars, saveState }: StatusBarProps) {
  return (
    <footer className="md-status">
      <span>{lines}</span>
      <span className={`md-status-state is-${saveState}`}>{STATE_TEXT[saveState]}</span>
    </footer>
  );
}
```

**Vue（按本工程惯例）**
```vue
<template>
  <footer class="status-bar">
    <span>{{ lines }}</span>
    <span :class="['status-bar__state', `is-${saveState}`]">{{ stateText }}</span>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// 类型放 src/types/ 或此处；跨模块共享必须外提
interface Props {
  lines: number
  chars: number
  saveState: 'saved' | 'dirty' | 'failed'
}

const props = defineProps<Props>()

const STATE_TEXT: Record<Props['saveState'], string> = {
  saved: '已保存',
  dirty: '未保存',
  failed: '保存失败'
}
const stateText = computed(() => STATE_TEXT[props.saveState])
</script>

<style lang="scss" scoped>
.status-bar { /* ... */ }
</style>
```

要点：`defineProps<T>()` 替代接口解构；模板表达式用 `{{ }}` 与 `:class`，不要写 JSX 三元；**`El*` 与 `Art*` 组件无需 import**（`unplugin-vue-components` + `ElementPlusResolver` 自动注册，见 `src/types/components.d.ts`）。

### 3.2 hooks → composables

| React | Vue 等价 | 备注 |
|---|---|---|
| `useState(v)` | `const x = ref(v)` / `reactive({...})` | 单值用 `ref`，成组用 `reactive` |
| `useMemo(fn, [deps])` | `computed(() => ...)` | 依赖自动追踪，**不要手写 deps 数组** |
| `useCallback(fn, [deps])` | 直接定义函数 | Vue 无重渲染问题，**多数 useCallback 应直接删掉** |
| `useEffect(fn, [])` | `onMounted(fn)` | 仅挂载执行 |
| `useEffect(fn, [x])` | `watch(x, fn)` 或 `watchEffect(fn)` | 显式依赖用 `watch` |
| `useEffect(() => () => cleanup(), [])` | `onMounted` + `onUnmounted(cleanup)` | 定时器/监听器必须在 `onUnmounted` 清理 |
| `useRef(el)` | `const elRef = ref<HTMLElement>()` + 模板 `ref="elRef"` | 模板 ref 与变量同名 |
| `useRef(v)`（存可变值不触发渲染） | `let v = ...` 或 `shallowRef` | 不要滥用 ref |
| `useReducer` | pinia store 或 `reactive` + 方法 | 复杂状态一律上 store |
| `useContext` | `provide` / `inject` | 跨层级少用，优先 store |
| 自定义 hook `useXxx()` | composable `src/composables/useXxx.ts` | 命名保持一致 |

**原型实测**：`markdesk/index.tsx` 用了 useState 14 次、useCallback 19 次、useEffect 12 次、useRef 9 次、useMemo 2 次。转换时预期：**19 个 useCallback 绝大部分直接消失**，14 个 useState 合并为 2-3 个 reactive 组，12 个 useEffect 分流到 onMounted/watch/onUnmounted。若转换后代码行数没明显下降，说明在直译而非重写。

**优先复用既有 composable，不要新写**：`useTable`（21.4KB，表格分页/排序/筛选/缓存/错误处理全套）、`useChart`（16.4KB）、`useTheme`、`useAuth`、`useCommon`、`useHeaderBar`、`useTableColumns`、`useCeremony`、`useFastEnter`（均在 `src/composables/`）。

### 3.3 表单：受控组件 → v-model

**React（原型模式）**
```tsx
const [email, setEmail] = useState('');
<ElInput value={email} onChange={e => setEmail(e.target.value)} />
```

**Vue（本工程实测：`views/auth/forget-password/index.vue`）**
```vue
<ElInput v-model.trim="email" clearable :placeholder="$t('forgetPassword.placeholder')" />
```

要点：`v-model` + 修饰符（`.trim`/`.lazy`/`.number`）替代 value+onChange；表单容器用 `ElForm` + `:model` + `:rules` + `ref`，校验调 `formRef.value?.validate()`（见 `views/SystemConfig/Basic/index.vue`）；文案走 `$t()`，**不要硬编码中文字面量**（既有页面有少量硬编码是历史遗留，新页面不许）。

### 3.4 状态持久化：localStorage → pinia + persist

**React（原型实测：`lib/storage.ts` 用 `markdesk:` 前缀直写 localStorage）**

**Vue（按本工程惯例）**
```ts
// src/store/modules/<name>.ts —— setup 风格，与 store/modules/user.ts 一致
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useDraftStore = defineStore(
  'draftStore',
  () => {
    const text = ref('')
    const savedAt = ref(0)
    const isDirty = computed(() => savedAt.value > 0)
    return { text, savedAt, isDirty }
  },
  { persist: true }   // pinia-plugin-persistedstate，替代手写 localStorage
)
```
要点：`defineStore('xxxStore', () => {...})` setup 写法（不是 options 写法）；`return` 暴露状态与 computed；持久化用 `persist` 选项；**不要在业务代码里直接读写 localStorage**（工程已有 `utils/storage/`，若必须用则走它）。

### 3.5 样式：CSS 变量 + 全局 className → SCSS scoped + 主题层

原型用 `styles.css` 定义 `--md-*` 令牌并全局生效、组件用 `className="md-status"`。转换规则：
1. 页面/组件样式一律进 `<style lang="scss" scoped>`，类名改 **BEM**（`.status-bar__state`），不用 `md-` 原型前缀；
2. 颜色/圆角/阴影等令牌**不要新造一套**：优先用工程既有变量（`@styles/app.scss`、`el-ui.scss`、`el-dark.scss` 已定义明暗双主题），Element Plus 变量用 `var(--el-color-primary)` 系；
3. 原型的双主题（light/dark）由工程 `useTheme` + `el-dark.scss` 承担，**不要自己实现主题切换**；
4. 移动端适配走 `@styles/mobile.scss` 既有方案。

### 3.6 事件与副作用

| 原型做法 | 本工程做法 |
|---|---|
| `window.addEventListener('keydown', ...)` | 同，但**必须** `onUnmounted` 移除；跨组件通信用 mitt |
| 组件间 props 上抛回调 | `emit('xxx', payload)` + `defineEmits<T>()` |
| 全局单例服务（`DraftService` 静态类） | pinia store 或 `utils/` 纯函数模块 |
| `setTimeout` 防抖 | `@vueuse/core` 的 `useDebounceFn`，或 `utils/table/tableUtils` 的 `createSmartDebounce` |

### 3.7 路由注册（原型无此概念，必须新建）

原型是单页/多页静态展示，Vue 工程要注册路由才能进菜单：

```ts
// src/router/modules/<module>.ts —— 与 system-config.ts 同构
import { AppRouteRecord } from '@/types/router'

export const <module>Routes: AppRouteRecord = {
  path: '/<module>',
  name: '<Module>',
  component: () => import('@/views/index/index.vue'),
  meta: { title: 'menus.<module>.title', icon: '&#xeXXX;', isFirstLevel: true },
  children: [
    {
      path: '<page>',
      name: '<Module><Page>',
      component: () => import('@/views/<Module>/<Page>/index.vue'),
      meta: { title: 'menus.<module>.<page>', keepAlive: true }
    }
  ]
}
```
再在 `router/modules/index.ts` 汇总、`router/routes/asyncRoutes.ts` 挂载；`meta.title` 的 i18n key 要在 `src/locales/` 补词条（中英两份）。

---

## 四、UI 组件映射

### 4.1 基础组件（Element Plus，自动导入免 import）

| 原型（tailwind + 原生标签） | 本工程 |
|---|---|
| `<button className="...">` | `<ElButton type="primary">` |
| `<input>` / `<textarea>` | `<ElInput>` / `<ElInput type="textarea" :rows="3">` |
| `<select>` | `<ElSelect>` + `<ElOption>` |
| 自定义表格 `<table>` | `<ElTable>` + `<ElTableColumn>`，**数据表格优先用 `useTable`** |
| 自定义弹层 | `<ElDialog>` / `<ElDrawer>` |
| 提示条 | `<ElMessage>` / `<ElNotification>`（函数式） |
| 确认框 | `ElMessageBox.confirm()` |
| 标签页 | `<ElTabs>` + `<ElTabPane>` |
| 卡片容器 | `<ElCard shadow="never">`（工程惯例，见 Basic/index.vue） |
| 加载态 | `v-loading` 指令 |
| 开关/单选/多选 | `<ElSwitch>` / `<ElRadioGroup>` / `<ElCheckboxGroup>` |

### 4.2 工程自有组件（`Art*` / `art-*`，优先于自己写）

`src/components/core/` 下已有布局、图表、设置面板等（如 `ArtLogo`、`art-settings-panel`、`art-dual-bar-compare-chart`）。写页面前先 `Glob src/components/core/**` 查有无可复用件。

### 4.3 图标

- 原型：`lucide-react`（`import { HardDriveDownload } from 'lucide-react'`）；
- 本工程：`@element-plus/icons-vue`（`<ElIcon><Download /></ElIcon>`）或 iconfont（`meta.icon: '&#xe7b9;'`）；
- **不要把 lucide-react 加进依赖**，找 Element Plus 语义最近者替代；找不到就用 iconfont 码位。

### 4.4 图表

原型若用 @xyflow/react 或自绘 canvas → 本工程用 `useChart` + echarts/@antv/g2；3D 用 three（已装）。

### 4.5 权限控制（原型无此概念，转换时最易漏）

原型通常不做权限，但本工程有完整指令体系（`src/directives/`，由 `main.ts` 的 `setupGlobDirectives` 全局注册）。**SRS 中凡有权限/角色要求，必须用指令实现，不要自己写 v-if 判断**：

```vue
<!-- 按权限标识（取当前路由 meta.authList 的 authMark）：无权限则元素被移除 -->
<ElButton v-auth="'add'" type="primary" @click="handleAdd">新增</ElButton>

<!-- 按角色码（取 useUserStore().getUserInfo.roles[].code）：命中任一即显示 -->
<ElButton v-roles="['R_SUPER', 'R_ADMIN']" @click="handleDelete">删除</ElButton>
```

另有 `v-highlight`（高亮）、`v-ripple`（水波纹，既有页面在用）两个全局指令。

> 转换检查点：读完 SRS 后先列出本页涉及的权限点，再决定哪些控件挂 `v-auth`/`v-roles`。原型截图上看不出来，必须从 SRS 取。

---

## 五、既有封装清单（写代码前先查这里，禁止重复造）

| 能力 | 位置 | 用法要点 |
|---|---|---|
| **CRUD API 生成** | `utils/crud` → `createCrudApi<T>({ baseUrl, mockFns })` | 三行生成 getList/add/update/delete/batchDelete/updateStatus/getDetail，见 `api/example-crud.ts` |
| **HTTP 请求** | `utils/http/index.ts` | 统一 axios 实例 + 拦截器；错误处理在 `utils/http/error.ts`，状态码映射在 `status.ts`。**不要裸调 axios/fetch** |
| **表格全套** | `composables/useTable.ts`（21.4KB） | 分页/排序/筛选/缓存（`utils/table/tableCache`）/防抖/错误处理/类型推导一体；配置见 `UseTableConfig`（core/transform 分段） |
| **表格列定义** | `composables/useTableColumns.ts` + `types/component` 的 `ColumnOption` | 列用 `columnsFactory` 工厂函数 |
| **图表** | `composables/useChart.ts`（16.4KB） | 主题联动、响应式尺寸 |
| **鉴权** | `composables/useAuth.ts` + `store/modules/user.ts` | 登录态、token（access/refresh） |
| **主题** | `composables/useTheme.ts` + `store/modules/setting.ts` | 明暗、主色 |
| **菜单/工作台** | `store/modules/menu.ts`、`worktab.ts` | 多页签 |
| **数据校验** | `utils/validation` | 表单规则复用 |
| **本地存储** | `utils/storage` | 若必须用（优先 pinia persist） |
| **数据处理** | `utils/dataprocess` | 树/扁平转换 |
| **导航** | `utils/navigation` | 页签、跳转 |
| **URL** | `utils/url.ts` | 参数解析 |
| **mock** | `src/mock/*.ts` + `utils/crud/mockHelper.ts` | 与 createCrudApi 配套 |
| **常量/枚举** | `utils/constants`、`src/enums` | 状态值、类型枚举 |
| **指令** | `src/directives`（`setupGlobDirectives`） | 如 `v-ripple` |
| **类型** | `src/types/*.d.ts`（`Api.*`、`AppRouteRecord`、`ColumnOption`） | 全局命名空间，无需 import |
| **路径别名** | `@` → `src/`，`@styles`、`@icons` | 见 `vite.config.ts` |

**新增依赖申报流程**：确需新库 → 在交接清单「待办」登记（库名 + 用途 + 为何既有封装不能满足）→ 由人确认 → 才写进 package.json。

---

## 六、转换作业流程（每页照此走）

1. **读规格**：SRS 对应功能条目（编号）+ HLD 模块职责 + LLD 接口契约 + 数据流契约表；
2. **看原型**：打开原型预览（交接清单里的 URL/方式）+ 读对应 `.tsx`，记录：页面结构层级、交互反馈、状态种类（空/加载/错误/正常）、边界处理；
3. **查封装**：按 §五 确认能否复用（表格类页面 90% 走 `useTable` + `createCrudApi`）；
4. **建骨架**：`views/<Module>/<Page>/index.vue` → 路由模块注册 → i18n 词条；
5. **写实现**：按 §三 映射，`<script setup lang="ts">` + Element Plus + 既有封装；
6. **接数据**：`api/<domain>.ts`（createCrudApi）+ `mock/<domain>.ts`；
7. **自检双门禁**：
   - 还原度：并排对比原型截图，逐区块核对（布局比例、控件类型、状态展示、交互反馈）；
   - 需求覆盖：对照 SRS 条目逐条打勾，**特别检查原型没实现的项**；
8. **提审**：交 page-reviewer（还原度）+ code-reviewer（工程惯例），过审才算完成。

---

## 七、反面清单（出现即打回）

- [ ] import 了 React 原型路径下的任何文件
- [ ] 出现 `useState` / `useEffect` / `useCallback` / `useMemo` / `useRef` 字样（Vue 侧无此 API）
- [ ] 出现 `.tsx` 文件、JSX 语法、`className=`
- [ ] 出现 Arco 组件（`AButton`/`ATable` 等）或 ant-design / shadcn / vant 组件
- [ ] 新增 package.json 依赖但未走申报
- [ ] 裸调 `axios`/`fetch`，未走 `utils/http`
- [ ] 手写 localStorage 读写，未用 pinia persist 或 `utils/storage`
- [ ] 手写表格分页/请求逻辑，未用 `useTable`
- [ ] 硬编码中文文案，未走 `$t()`
- [ ] 页面样式未 scoped，或自造一套 CSS 变量令牌
- [ ] 自己实现明暗主题切换（应由 `useTheme` 承担）
- [ ] 路由未注册 / i18n 词条缺失
- [ ] 定时器或全局监听未在 `onUnmounted` 清理
- [ ] 保留了原型里的 `useCallback` 直译产物（无意义的函数包装）
- [ ] SRS 有权限/角色要求，但页面未挂 `v-auth` / `v-roles`（原型看不出来，必须查 SRS）
- [ ] 代码行数与原型接近（说明在直译，重写后应显著下降）

---

## 八、纸面验证记录（用 Markdown 轻量编辑器原型试转）

以 `01-项目/Markdown 轻量编辑器/src/prototypes/markdesk/` 为样本（13 文件、`index.tsx` 23.2KB、6 个组件、5 个 lib 模块、1 个 styles.css）推演转换结果：

| 原型文件 | 转换目标 | 关键动作 |
|---|---|---|
| `index.tsx`（23.2KB，页面容器） | `views/Markdesk/Index/index.vue` + `composables/useMarkdesk.ts` | 14 useState → 2-3 reactive 组；19 useCallback 大部分删除；12 useEffect → onMounted/watch/onUnmounted；9 useRef → 模板 ref 或 let |
| `components/EditorPane.tsx`（5.9KB） | `components/markdesk/EditorPane.vue` | 受控 textarea → `v-model`；`onKeyDown` → `@keydown` |
| `components/Toolbar.tsx`（4.2KB） | `components/markdesk/Toolbar.vue` | 原生 button → `ElButton`/`ElTooltip`；lucide 图标 → Element Plus 图标 |
| `components/Sidebar.tsx`（3.4KB） | `components/markdesk/Sidebar.vue` | 列表 → `ElScrollbar` + `ElMenu` 或自定义；最近文件走 store |
| `components/StatusBar.tsx`（1.8KB） | `components/markdesk/StatusBar.vue` | 见 §3.1 完整示例 |
| `components/PreviewPane.tsx`（1.8KB） | `components/markdesk/PreviewPane.vue` | 渲染结果用 `v-html`（需消毒） |
| `components/HelpPanel.tsx`（2.4KB） | `components/markdesk/HelpPanel.vue` | → `ElDrawer` |
| `lib/markdown.ts`（9.7KB，纯解析） | `utils/markdown/index.ts` | 纯函数，`marked` 已在依赖中，可直接用 |
| `lib/storage.ts`（2.6KB，localStorage） | `store/modules/markdesk.ts`（persist） | 见 §3.4 |
| `lib/exporter.ts`（4.8KB，导出） | `utils/export/index.ts` | `file-saver` 已在依赖中 |
| `lib/fileBridge.ts`（10KB，File System Access API） | `utils/file/bridge.ts` | 浏览器 API 与框架无关，逻辑可复用但**必须重写不得拷贝** |
| `lib/highlight.ts`（4.1KB） | `utils/markdown/highlight.ts` | `highlight.js` 已在依赖中 |
| `styles.css`（13.5KB，双主题令牌） | 各组件 scoped SCSS + 复用 `@styles` 主题层 | 令牌映射到 `--el-*`，删除自造主题切换 |

**推演结论**：13 个源文件 → 1 页面 + 6 组件 + 4 utils 模块 + 1 store + 路由模块 + i18n 词条；依赖零新增（marked / highlight.js / file-saver 均已在 package.json）；预计代码总量较原型下降（useCallback 消失、样式复用主题层、表格类无）。**规范可执行，无需调整。**

---

> 维护：本文件随工程实际封装演进更新（工程根 = 项目根，模板内源在 `src/admin`）；发现封装变更（如 useTable 配置结构调整）先改本文件再写页面。
