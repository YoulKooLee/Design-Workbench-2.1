# 可滚动抽屉

> 状态：preview · slug：`drawer-scroll` · 类型：component · 母版：web · surface：general · category：`feedback`

## 1. 角色与目标

实现「可滚动抽屉」（`drawer-scroll`）。右侧长内容面板，正文滚动、标题与页脚固定。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将 `components/item/component.css` 中 `.wa-item*` 规则**并入**宿主页/模块 CSS；**禁止**在交付里写死 `<link …/component.css>`。
- **脚本落地**：把 `activities` 列表数据**并入**宿主页 `js/<page>.js`；预览挂载壳不拷。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-drawer；正文用 `.wa-item-stack` 长列表；页脚取消/确定胶囊按钮
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：右侧 400px；头/脚固定，中间 `.arco-drawer-body` 滚动；描边条目卡
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：标题 `--color-text-1`；描述 `--color-text-3`；图标槽中性浅底 + 中性描边 + 实心图标

## 5. 直接粘贴

```html
<a-button type="secondary" @click="visible = true">查看动态</a-button>
<a-drawer
  v-model:visible="visible"
  title="最近动态"
  :width="400"
  unmount-on-close
  @cancel="visible = false"
>
  <div class="wa-item-stack">
    <div class="wa-item wa-item--outline" v-for="row in activities" :key="row.title">
      <div class="wa-item__media wa-item__media--primary">
        <component :is="row.icon" :size="15"></component>
      </div>
      <div class="wa-item__body">
        <div class="wa-item__title">{{ row.title }}</div>
        <div class="wa-item__desc">{{ row.desc }}</div>
      </div>
    </div>
  </div>
  <template #footer>
    <a-button type="secondary" shape="round" @click="visible = false">取消</a-button>
    <a-button type="primary" shape="round" @click="visible = false">确定</a-button>
  </template>
</a-drawer>
```

> 换文案：只改汉字，勿改 class / type。`activities` 为 `{ icon, title, desc }[]`，示例见成员 `component.js`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗
- [ ] 长内容时仅正文滚动，页脚仍可见

## 7. 预览

`components/drawer/scroll/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| drawer-default | components/drawer/default/ |
| drawer-left | components/drawer/left/ |
| drawer-top | components/drawer/top/ |
| drawer-bottom | components/drawer/bottom/ |
| drawer-form | components/drawer/form/ |
| drawer-scroll | components/drawer/scroll/ | （本条）
| drawer-float-form | components/drawer/float-form/ |
| drawer-float-scroll | components/drawer/float-scroll/ |
| drawer-float-login | components/drawer/float-login/ |
| drawer-float-cookie | components/drawer/float-cookie/ |
