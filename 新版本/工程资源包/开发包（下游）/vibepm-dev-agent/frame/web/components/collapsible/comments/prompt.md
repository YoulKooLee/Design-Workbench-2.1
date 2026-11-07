# 评论回复折叠

> 状态：preview · slug：`collapsible-comments` · 类型：component · 母版：web · surface：general · category：`data-display`

## 1. 角色与目标

实现「评论回复折叠」（`collapsible-comments`）。主评论常显，回复线程收纳在「N 条回复」折叠内。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：将家族 `components/collapsible/component.css` 中相关规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。
- **脚本落地**：把同目录 `component.js` 中的业务逻辑**并入**宿主页 `js/<page>.js`；预览挂载壳不拷。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：外层主评 + ghost「N 条回复」按钮控 bare a-collapse
- 与 `collapse` 分工：本家族是**单段**展开；多条目 FAQ 组用 `collapse`
- 私有样式真源在 `components/collapsible/component.css`；§5 **只贴 HTML**；落地合并进宿主样式
- Vue 模板内自定义标签勿写成自闭合（如 `</icon-code>`、`</a-avatar>`）

## 4. 视觉规格

- 布局 / 层级 / 强调：头像主评；Message + N 条回复 + chevron；展开缩进回复
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<div class="wa-collapsible-comments">
  <div class="wa-collapsible-comments__main">
    <a-avatar :size="36"><icon-user :size="14"></icon-user></a-avatar>
    <div class="wa-collapsible-comments__body">
      <div class="wa-collapsible-comments__meta">
        <strong>张明</strong>
        <span>2 小时前</span>
      </div>
      <p>这个功能太赞了！实现得很到位。</p>
      <a-button
        type="text"
        size="mini"
        class="wa-collapsible-comments__toggle"
        :aria-expanded="isOpen ? 'true' : 'false'"
        @click="toggle"
      >
        <icon-message :size="12"></icon-message>
        <span>2 条回复</span>
        <span class="wa-collapsible-chevron wa-collapsible-chevron--sm" :class="{ 'is-open': isOpen }"><icon-down :size="10"></icon-down></span>
      </a-button>
      <a-collapse v-model:active-key="activeKey" :bordered="false" :show-expand-icon="false" class="wa-collapsible wa-collapsible--bare">
        <a-collapse-item key="1" :show-expand-icon="false">
          <div class="wa-collapsible-comments__replies">
            <div class="wa-collapsible-comments__reply">
              <a-avatar :size="28"><icon-user :size="12"></icon-user></a-avatar>
              <div>
                <div class="wa-collapsible-comments__meta">
                  <strong>李婷</strong>
                  <span>1 小时前</span>
                </div>
                <p>完全同意！设计也非常出色。</p>
              </div>
            </div>
            <div class="wa-collapsible-comments__reply">
              <a-avatar :size="28"><icon-user :size="12"></icon-user></a-avatar>
              <div>
                <div class="wa-collapsible-comments__meta">
                  <strong>王强</strong>
                  <span>45 分钟前</span>
                </div>
                <p>感谢分享，很有帮助！</p>
              </div>
            </div>
          </div>
        </a-collapse-item>
      </a-collapse>
    </div>
  </div>
</div>
```

> 换文案：只改汉字，勿改 class / type。有私有样式时并入宿主 CSS，勿单独 link `component.css`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/collapsible/comments/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `collapsible-show-more` | `components/collapsible/show-more/` | |
| `collapsible-code` | `components/collapsible/code/` | |
| `collapsible-form` | `components/collapsible/form/` | |
| `collapsible-comments` | `components/collapsible/comments/` | （本条） |
| `collapsible-card` | `components/collapsible/card/` | |
| `collapsible-tree` | `components/collapsible/tree/` | |
