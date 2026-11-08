# 多图切换

> 状态：preview · slug：`image-group` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「多图切换」（`image-group`）。容器内只展示第一张；点击后预览层可左右切换组内全部图片。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将家族 `components/image/component.css` 中与 `.wa-image-fit` / `.wa-image-fit--preview` / `.wa-image-hint` 相关规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：把 `groupSrcList`、`groupCurrent` 与 `onGroupChange` / `onGroupVisibleChange`（调用 `__WA_setImageGroupPager`）**并入**宿主页 `js/<page>.js`；**禁止**镜像母版 `component.js` 再强制 `<script src>`。
- **预览层样式**：数字标记规则在 `assets/common/css/components.css`（`.wa-image-preview-pager`），随母版全局样式即可，勿单独拷贝。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 `a-image-preview-group` + `:src-list`；容器内仅一张可见 `a-image`（取列表首张，`:preview="false"`）；外层点击 `openGroupPreview` 受控打开；`infinite` 可循环切换
- 多图页码：`v-model:visible` + `v-model:current` + `@change` / `@visible-change`，经 `__WA_setImageGroupPager(当前从1起, 总数, visible)` 驱动预览层底部「n / N」
- **打开必须受控**：勿依赖子 `a-image` 默认 preview（Arco 自增 id 易与 `src-list` 下标撞车，会跳到最后一张并反复抢 `current` 烧 CPU）
- 悬停手势：外层加 `wa-image-fit--preview`，内嵌 `.wa-image-hint` + `icon-hand-pointer`（`pointer-events: none`，不挡点击）
- 若有私有样式：规则真源在家族 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link
- 若有私有业务脚本：真源在同目录 `component.js`；§2 须有「脚本落地」；勿在 §5 写独立 script src
- 禁止外链 CDN 图片；母版示例图真源 `assets/images/`；落地换成业务图 URL
- 图标用母版 `icon-hand-pointer`（Font Awesome 映射），禁止 emoji / 外网图标 CDN

## 4. 视觉规格

- 布局 / 层级 / 强调：外层 `.wa-image-fit.wa-image-fit--preview` 只露出第一张；其余图仅在 `src-list` 中供预览切换
- 悬停：半透明遮罩 + 居中链接手势图标；光标 `pointer`
- 预览层：多图时底部工具栏上方显示灰色圆角数字标记（如 `1 / 3`）
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-image-preview-group
  infinite
  :src-list="groupSrcList"
  v-model:visible="groupVisible"
  v-model:current="groupCurrent"
  @change="onGroupChange"
  @visible-change="onGroupVisibleChange"
>
  <div
    class="wa-image-fit wa-image-fit--preview"
    role="button"
    tabindex="0"
    @click="openGroupPreview"
    @keydown.enter.prevent="openGroupPreview"
    @keydown.space.prevent="openGroupPreview"
  >
    <a-image
      width="100%"
      height="100%"
      fit="cover"
      :preview="false"
      :src="groupSrcList[0]"
      alt="图1"
    />
    <span class="wa-image-hint" aria-hidden="true"><icon-hand-pointer></icon-hand-pointer></span>
  </div>
</a-image-preview-group>
```

配套数据（并入宿主 JS）：

```js
groupSrcList: [
  'assets/images/image_03.jpg',
  'assets/images/image_04.jpg',
  'assets/images/image_05.jpg',
],
groupCurrent: ref(0),
groupVisible: ref(false),
openGroupPreview() {
  groupCurrent.value = 0
  groupVisible.value = true
  window.__WA_setImageGroupPager(1, groupSrcList.length, true)
},
onGroupChange(index) {
  groupCurrent.value = index
  window.__WA_setImageGroupPager(index + 1, groupSrcList.length, true)
},
onGroupVisibleChange(visible) {
  groupVisible.value = !!visible
  if (!visible) groupCurrent.value = 0
  window.__WA_setImageGroupPager(groupCurrent.value + 1, groupSrcList.length, !!visible)
},
```

> 换文案：只改汉字与图片地址，勿改 class / type。有私有样式时并入宿主 CSS，勿单独 link `component.css`。
> 打开预览：缩略图始终是首张；用受控 `visible` + `:preview="false"`，不要让子图自己调 Arco `preview(id)`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗
- [ ] 容器内只显示第一张；预览层可左右切换多张图
- [ ] 悬停出现链接手势图标，且不挡住点击预览
- [ ] 多图预览底部显示「当前 / 总数」，切换时更新

## 7. 预览

`components/image/group/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `image-default` | `components/image/default/` | |
| `image-preview` | `components/image/preview/` | |
| `image-group` | `components/image/group/` | （本条） |
| `image-error` | `components/image/error/` | |
