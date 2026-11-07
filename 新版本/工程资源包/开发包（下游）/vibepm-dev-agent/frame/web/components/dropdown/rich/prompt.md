# 富文本菜单

> 状态：preview · slug：`dropdown-rich` · 类型：component · 母版：web · surface：general · category：`navigation`

## 1. 角色与目标

实现「富文本菜单」（`dropdown-rich`）。带图标瓷砖与描述的添加块菜单。

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。
- **样式落地**：若有同目录或家族私有样式，将规则**并入**宿主页/模块 CSS；**禁止**在交付里保留独立 `component.css` 或写死 `<link …/component.css>`。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：真 a-dropdown；选项 class `wa-dropdown-rich`
- 若有私有样式：规则真源在同目录或家族 CSS；§5 **只贴 HTML**；落地合并进宿主样式，勿在 §5 写独立 link

## 4. 视觉规格

- 布局 / 层级 / 强调：左侧圆角图标格 + 标题 + 灰色描述
- 动效：仅本控件轻交互（hover/focus）；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

```html
<a-dropdown>
          <a-button type="secondary" class="wa-dropdown-icon-btn" aria-label="添加区块">
            <template #icon><icon-plus /></template>
          </a-button>
          <template #content>
            <a-doption class="wa-dropdown-rich">
              <div class="wa-dropdown-rich__row">
                <span class="wa-dropdown-rich__icon"><icon-heading /></span>
                <span class="wa-dropdown-rich__body">
                  <span class="wa-dropdown-rich__title">标题</span>
                  <span class="wa-dropdown-rich__desc">插入分区标题与说明</span>
                </span>
              </div>
            </a-doption>
            <a-doption class="wa-dropdown-rich">
              <div class="wa-dropdown-rich__row">
                <span class="wa-dropdown-rich__icon"><icon-file /></span>
                <span class="wa-dropdown-rich__body">
                  <span class="wa-dropdown-rich__title">段落</span>
                  <span class="wa-dropdown-rich__desc">添加正文段落内容</span>
                </span>
              </div>
            </a-doption>
            <a-doption class="wa-dropdown-rich">
              <div class="wa-dropdown-rich__row">
                <span class="wa-dropdown-rich__icon"><icon-image /></span>
                <span class="wa-dropdown-rich__body">
                  <span class="wa-dropdown-rich__title">图片</span>
                  <span class="wa-dropdown-rich__desc">上传或嵌入媒体资源</span>
                </span>
              </div>
            </a-doption>
            <a-doption class="wa-dropdown-rich">
              <div class="wa-dropdown-rich__row">
                <span class="wa-dropdown-rich__icon"><icon-table /></span>
                <span class="wa-dropdown-rich__body">
                  <span class="wa-dropdown-rich__title">表格</span>
                  <span class="wa-dropdown-rich__desc">插入结构化数据表</span>
                </span>
              </div>
            </a-doption>
          </template>
        </a-dropdown>
```

> 换文案：只改汉字，勿改 class / type。有私有样式时并入宿主 CSS，勿单独 link `component.css`。

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/dropdown/rich/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
| dropdown-default | components/dropdown/default/ | |
| dropdown-button | components/dropdown/button/ | |
| dropdown-icons | components/dropdown/icons/ | |
| dropdown-group | components/dropdown/group/ | |
| dropdown-more | components/dropdown/more/ | |
| dropdown-user | components/dropdown/user/ | |
| dropdown-checkbox | components/dropdown/checkbox/ | |
| dropdown-radio | components/dropdown/radio/ | |
| dropdown-theme | components/dropdown/theme/ | |
| dropdown-rich | components/dropdown/rich/ | （本条） |
| dropdown-submenu | components/dropdown/submenu/ | |
| dropdown-help | components/dropdown/help/ | |
