# 分享气泡

> 状态：preview · slug：`popover-share` · 类型：component · 母版：web · surface：general · category：`feedback`

## 1. 角色与目标

实现「分享气泡」（`popover-share`）。居中标题 + 圆形渠道按钮 + 胶囊链接条，支持一键复制。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将母版 `components.css` 中 Popover / `.wa-popover-share*` / `.wa-popover-panel--share` 规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：把 `shareUrl` / `copied` / `copyShare` **并入**宿主页 `js/<page>.js`；预览挂载壳不拷。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-popover；`trigger="click"`；渠道用 `type="secondary" shape="circle"`（嵌入 / X / Facebook / 邮件）+ 胶囊链接条复制
- 若有私有样式：规则真源在同目录 `component.css`；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：标题居中「分享代码」；四枚中性圆形 secondary 渠道居中横排；底部浅底胶囊条，右侧复制图标
- 动效：仅本控件轻交互（hover/focus 外环）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）；圆角用 `--wa-radius-lg`

## 5. 直接粘贴

```html
<a-popover trigger="click" content-class="wa-popover-panel wa-popover-panel--share">
  <a-button type="secondary" shape="round">分享</a-button>
  <template #content>
    <div class="wa-popover-share">
      <p class="wa-popover-share__title">分享代码</p>
      <div class="wa-popover-share__channels">
        <a-button type="secondary" shape="circle" class="wa-popover-share__chan" aria-label="嵌入代码">
          <icon-code></icon-code>
        </a-button>
        <a-button type="secondary" shape="circle" class="wa-popover-share__chan" aria-label="分享到 X">
          <i class="fa-brands fa-x-twitter" aria-hidden="true"></i>
        </a-button>
        <a-button type="secondary" shape="circle" class="wa-popover-share__chan" aria-label="分享到 Facebook">
          <i class="fa-brands fa-facebook-f" aria-hidden="true"></i>
        </a-button>
        <a-button type="secondary" shape="circle" class="wa-popover-share__chan" aria-label="发送邮件">
          <icon-email></icon-email>
        </a-button>
      </div>
      <div class="wa-popover-share__link">
        <span class="wa-popover-share__url">{{ shareUrl }}</span>
        <a-tooltip :content="copied ? '已复制' : '复制链接'">
          <button type="button" class="wa-popover-share__copy" aria-label="复制" @click="copyShare">
            <icon-check v-if="copied"></icon-check>
            <icon-copy v-else></icon-copy>
          </button>
        </a-tooltip>
      </div>
    </div>
  </template>
</a-popover>
```

> 换文案：只改汉字与 `shareUrl`，勿改 class / type。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗
- [ ] 复制后按钮短暂显示对勾
- [ ] 渠道为 secondary 圆形按钮、链接条为胶囊浅底

## 7. 预览

`components/popover/share/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `popover-default` | `components/popover/default/` | |
| `popover-bottom` | `components/popover/bottom/` | |
| `popover-left` | `components/popover/left/` | |
| `popover-right` | `components/popover/right/` | |
| `popover-form` | `components/popover/form/` | |
| `popover-notifications` | `components/popover/notifications/` | |
| `popover-tips` | `components/popover/tips/` | |
| `popover-share` | `components/popover/share/` | （本条）|
| `popover-feedback` | `components/popover/feedback/` | |
| `popover-profile` | `components/popover/profile/` | |
