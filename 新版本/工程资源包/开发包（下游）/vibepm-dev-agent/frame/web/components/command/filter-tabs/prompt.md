# 筛选标签

> 状态：preview · slug：`command-filter-tabs` · 类型：component · 母版：web · surface：general · category：`navigation`

## 1. 角色与目标

实现「筛选标签」（`command-filter-tabs`）。输入下方切换「全部 / 文件 / 成员 / 命令」标签，默认展示提示词与最近搜索。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。
- **样式落地**：将家族 `components/command/component.css` 规则**并入**宿主 CSS。
- **脚本落地**：把同目录 `component.js` 中的过滤/弹层逻辑**并入**宿主页 JS；预览挂载壳不拷。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：`.wa-command__tabs` + tab 切换；列表随 tab 变化
- 搜索图标在输入左侧（对照 shadcn CommandInput）；勿用 a-input-search 默认右图标布局冒充
- 私有样式真源在 `components/command/component.css`
- Vue 模板内自定义标签勿写成自闭合

## 4. 视觉规格

- 布局 / 层级 / 强调：搜索框下胶囊标签；AI 提示与最近项
- 动效：仅 hover/focus；Shine / Glow → `animations/`
- 颜色：只用 `--wa-*` / Arco token

## 5. 直接粘贴

```html
<div class="wa-command">
  <div class="wa-command__search">
    <span class="wa-command__search-icon"><icon-search :size="15"></icon-search></span>
    <input class="wa-command__input" v-model="qTabs" type="text" placeholder="搜索…" autocomplete="off" />
    <button type="button" class="wa-command__clear" v-show="qTabs" @click="qTabs = ''" aria-label="清除"><icon-close :size="12"></icon-close></button>
  </div>
  <div class="wa-command__tabs">
    <button type="button" class="wa-command__tab" :class="{ 'is-active': tab === 'all' }" @click="tab = 'all'">全部</button>
    <button type="button" class="wa-command__tab" :class="{ 'is-active': tab === 'files' }" @click="tab = 'files'">文件</button>
    <button type="button" class="wa-command__tab" :class="{ 'is-active': tab === 'people' }" @click="tab = 'people'">成员</button>
    <button type="button" class="wa-command__tab" :class="{ 'is-active': tab === 'commands' }" @click="tab = 'commands'">命令</button>
  </div>
  <div class="wa-command__list">
    <template v-if="tab === 'all' || tab === 'commands'">
      <div class="wa-command__group">
        <div class="wa-command__heading">AI 提示词</div>
        <button type="button" class="wa-command__item"><span class="wa-command__item-label">生成本日销售摘要</span></button>
        <button type="button" class="wa-command__item"><span class="wa-command__item-label">根据今日预测创建待办</span></button>
      </div>
    </template>
    <template v-if="tab === 'all'">
      <div class="wa-command__group">
        <div class="wa-command__heading">最近搜索</div>
        <button type="button" class="wa-command__item"><span class="wa-command__item-icon"><icon-email :size="14"></icon-email></span><span class="wa-command__item-label">我的收件箱</span><span class="wa-command__item-meta">邮件</span></button>
        <button type="button" class="wa-command__item"><span class="wa-command__item-icon"><icon-plus :size="14"></icon-plus></span><span class="wa-command__item-label">添加新任务</span><span class="wa-command__item-meta">个人草稿</span></button>
        <button type="button" class="wa-command__item"><span class="wa-command__item-icon"><icon-user-group :size="14"></icon-user-group></span><span class="wa-command__item-label">数据分析团队</span><span class="wa-command__item-meta">群聊</span></button>
      </div>
    </template>
    <template v-if="tab === 'files'">
      <button type="button" class="wa-command__item"><span class="wa-command__item-icon"><icon-file :size="14"></icon-file></span><span class="wa-command__item-label">季度报告.pdf</span></button>
      <button type="button" class="wa-command__item"><span class="wa-command__item-icon"><icon-file :size="14"></icon-file></span><span class="wa-command__item-label">路线图.xlsx</span></button>
    </template>
    <template v-if="tab === 'people'">
      <button type="button" class="wa-command__item"><span class="wa-command__item-icon"><icon-user :size="14"></icon-user></span><span class="wa-command__item-label">张伟</span><span class="wa-command__item-meta">开发</span></button>
      <button type="button" class="wa-command__item"><span class="wa-command__item-icon"><icon-user :size="14"></icon-user></span><span class="wa-command__item-label">李娜</span><span class="wa-command__item-meta">设计</span></button>
    </template>
  </div>
</div>
```

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/command/filter-tabs/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| `command-default` | `components/command/default/` | |
| `command-shortcuts` | `components/command/shortcuts/` | |
| `command-files` | `components/command/files/` | |
| `command-people` | `components/command/people/` | |
| `command-actions` | `components/command/actions/` | |
| `command-settings` | `components/command/settings/` | |
| `command-filter-tabs` | `components/command/filter-tabs/` | （本条） |
| `command-footer` | `components/command/footer/` | |
