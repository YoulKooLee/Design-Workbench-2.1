# 详情抽屉

> 状态：preview · slug：`drawer-default` · 类型：component · 母版：web · surface：general · category：`feedback`

## 1. 角色与目标

实现「详情抽屉」（`drawer-default`）。右侧滑出详情面板，带取消/确定页脚。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将 `components/item/component.css` 中 `.wa-item*` 规则**并入**宿主页/模块 CSS；**禁止**在交付里写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-drawer；正文用 `.wa-item-stack` + `.wa-item--outline` 展示字段；页脚取消/确定胶囊按钮（对齐弹窗）
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：右侧 360px；标题加粗；正文为条目字段卡；页脚 secondary + primary 胶囊按钮
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：标题 `--color-text-1`；按钮主色 / secondary

## 5. 直接粘贴

```html
<a-button type="secondary" @click="visible = true">查看详情</a-button>
<a-drawer
  v-model:visible="visible"
  title="详情"
  :width="360"
  unmount-on-close
  @cancel="visible = false"
>
  <div class="wa-item-stack">
    <div class="wa-item wa-item--outline">
      <div class="wa-item__body">
        <div class="wa-item__title">项目名称</div>
        <div class="wa-item__desc">北极星改版</div>
      </div>
    </div>
    <div class="wa-item wa-item--outline">
      <div class="wa-item__body">
        <div class="wa-item__title">负责人</div>
        <div class="wa-item__desc">林晓</div>
      </div>
    </div>
    <div class="wa-item wa-item--outline">
      <div class="wa-item__body">
        <div class="wa-item__title">当前状态</div>
        <div class="wa-item__desc">进行中 · 本周更新</div>
      </div>
    </div>
    <div class="wa-item wa-item--outline">
      <div class="wa-item__body">
        <div class="wa-item__title">最近更新</div>
        <div class="wa-item__desc">今天 14:20</div>
      </div>
    </div>
  </div>
  <template #footer>
    <a-button type="secondary" shape="round" @click="visible = false">取消</a-button>
    <a-button type="primary" shape="round" @click="visible = false">确定</a-button>
  </template>
</a-drawer>
```

> 换文案：只改汉字，勿改 class / type。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/drawer/default/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| drawer-default | components/drawer/default/ | （本条）
| drawer-left | components/drawer/left/ |
| drawer-top | components/drawer/top/ |
| drawer-bottom | components/drawer/bottom/ |
| drawer-form | components/drawer/form/ |
| drawer-scroll | components/drawer/scroll/ |
| drawer-float-form | components/drawer/float-form/ |
| drawer-float-scroll | components/drawer/float-scroll/ |
| drawer-float-login | components/drawer/float-login/ |
| drawer-float-cookie | components/drawer/float-cookie/ |
