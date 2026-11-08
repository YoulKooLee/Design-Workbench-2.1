# -*- coding: utf-8 -*-
"""Add cascader / tree-select / brand / category to select family."""
from __future__ import annotations

from catalog_io import load_catalog, save_catalog

import json
import re
from pathlib import Path

WEB = Path(__file__).resolve().parents[1]
SELECT = WEB / "components" / "select"
CATALOG = WEB / "_meta" / "config.json"

ALL_SIBLINGS = [
    ("select", "default", "下拉选择"),
    ("select-multiple", "multiple", "多选下拉"),
    ("select-search", "search", "可搜索下拉"),
    ("select-create", "create", "可创建下拉"),
    ("select-cascader", "cascader", "级联选择"),
    ("select-tree-select", "tree-select", "树选择"),
    ("select-brand", "brand", "品牌选择"),
    ("select-category", "category", "分类选择"),
    ("select-disabled", "disabled", "禁用下拉"),
]


def write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8", newline="\n")


def sibling_table(current: str) -> str:
    rows = []
    for slug, sub, _ in ALL_SIBLINGS:
        mark = " （本条）" if slug == current else ""
        rows.append(f"| `{slug}` | `components/select/{sub}/` |{mark} |")
    return "\n".join(rows)


MEMBER_HTML = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <script src="../../../assets/common/js/theme.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{label} · {slug}</title>
  <link rel="stylesheet" href="../../../vendor/arco/css/arco.css" />
  <link rel="stylesheet" href="../../../assets/common/css/chrome.css" />
  <link rel="stylesheet" href="../../../assets/common/css/global.css" />
  <link rel="stylesheet" href="../../../vendor/fontawesome/css/all.min.css" />
  <link rel="stylesheet" href="../../../assets/common/css/fa-icons.css" />
  <link rel="stylesheet" href="../../../assets/common/css/components.css" />
  <link rel="stylesheet" href="../../index.css" />
{extra_css}</head>
<body class="wa-preview-embed">
  <div id="app" v-cloak>
    <article class="wa-card wa-embed wa-preview-stage" data-slug="{slug}">
      <div class="wa-comp-meta wa-preview-chrome">
        <span class="wa-comp-meta__name">{label}</span>
        <span class="wa-comp-meta__slug">{slug}</span>
      </div>
      <div class="wa-embed__stage">
{control}
      </div>
    </article>
  </div>
  <script src="../../../vendor/vue/vue.global.prod.js"></script>
  <script src="../../../vendor/arco/arco-vue.min.js"></script>
  <script src="../../../assets/common/js/fa-icons.js"></script>
  <script src="../../../assets/common/js/boot.js"></script>
  <script src="../../../assets/common/js/wa-prefs.js"></script>
  
  <script src="../prompts.inline.js"></script>
  <script src="../../copy-prompt.js"></script>
  <script src="../../member.js"></script>
  <script src="./component.js"></script>
</body>
</html>
"""

PROMPT_TMPL = """# {label}

> 状态：preview · slug：`{slug}` · 类型：component · 母版：web · surface：general · category：`form`

## 1. 角色与目标

实现「{label}」（`{slug}`）。{scene}

成功标准：业务页出现与 §5 一致的真选择控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。禁止未探测到 Arco 时强行 import。

## 3. 约束

- **本提示词只含这一种形态**
- 交互：{rule}

## 4. 视觉规格

- 布局：控件本体；宽度由宿主表单决定（通栏触发器）
- 强调：描边 / 面板跟 Arco / `components.css`（品牌/分类面板见本目录 `component.css`）
- 动效：无；Shine / Glow 等可复用装饰 → `animations/`，不写进本控件
- 颜色：只用 `--wa-*` / Arco token（若适用）

## 5. 直接粘贴

{snippet}

{hint}

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/select/{sub}/index.html`（直开：卡内中文名 + 灰色 slug；官网 iframe 加 `?embed=1` 仅控件）

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
{siblings}
"""


PICKER_CSS = r"""/* select 家族：Brand / Category 共用触发器（对照 Admin component-form-picker） */

.sel-picker {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 32px;
  padding: 0 12px;
  color: var(--color-text-1);
  font-size: 14px;
  line-height: 30px;
  background: var(--color-fill-1);
  border: 1px solid var(--color-border-2);
  border-radius: var(--border-radius-small, 2px);
  cursor: pointer;
  transition: border-color 0.15s, background-color 0.15s;
}

.sel-picker:hover {
  border-color: var(--color-border-3);
}

.sel-picker.is-open {
  background: var(--color-bg-2, #fff);
  border-color: rgb(var(--primary-6));
}

.sel-picker-value {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sel-picker-value.is-placeholder {
  color: var(--color-text-3);
}

.sel-picker-arrow {
  flex-shrink: 0;
  margin-left: 8px;
  color: var(--color-text-3);
  font-size: 12px;
  transition: transform 0.15s;
}

.sel-picker-arrow.is-up {
  transform: rotate(180deg);
}

.sel-picker-clear {
  display: none;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  color: var(--color-text-2, #4e5969);
  font-size: 10px;
  line-height: 10px;
  cursor: pointer;
}

.sel-picker-clear .pro-fa-icon {
  position: relative;
  z-index: 1;
}

.sel-picker.has-value:hover .sel-picker-clear,
.sel-picker.is-open.has-value .sel-picker-clear {
  display: inline-flex;
}

.sel-picker.has-value:hover .sel-picker-arrow,
.sel-picker.is-open.has-value .sel-picker-arrow {
  display: none;
}

.sel-picker-empty {
  grid-column: 1 / -1;
  padding: 24px 0;
  color: var(--color-text-3);
  font-size: 13px;
  text-align: center;
}
"""

BRAND_CSS = PICKER_CSS + r"""
/* 品牌面板 */
.sel-brand-panel {
  width: min(620px, 90vw);
  overflow: hidden;
  background: var(--color-bg-popup, #fff);
  border: 1px solid var(--color-border-2, #e5e6eb);
  border-radius: 4px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.sel-brand-letters {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  gap: 0;
  padding: 6px 12px 0;
  overflow-x: auto;
  border-bottom: 1px solid var(--color-border-2, #e5e6eb);
}

.sel-brand-letter {
  flex: 1 1 0;
  min-width: 0;
  height: 28px;
  padding: 0;
  color: var(--color-text-2);
  font-size: 14px;
  line-height: 26px;
  text-align: center;
  white-space: nowrap;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
}

.sel-brand-letter:first-child {
  flex: 0 0 auto;
  padding: 0 4px;
}

.sel-brand-letter:hover {
  color: rgb(var(--primary-6));
}

.sel-brand-letter.is-active {
  color: rgb(var(--primary-6));
  border-bottom-color: rgb(var(--primary-6));
}

.sel-brand-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 8px;
  max-height: 240px;
  padding: 12px;
  overflow: auto;
}

.sel-brand-item {
  height: 28px;
  padding: 0 8px;
  overflow: hidden;
  color: var(--color-text-1);
  font-size: 13px;
  line-height: 28px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: transparent;
  border: none;
  border-radius: 2px;
  cursor: pointer;
}

.sel-brand-item:hover {
  color: rgb(var(--primary-6));
  background: rgba(var(--primary-6), 0.06);
}

.sel-brand-item.is-active {
  color: #fff;
  background: rgb(var(--primary-6));
}
"""

CATEGORY_CSS = PICKER_CSS + r"""
/* 分类面板 */
.sel-category-panel {
  display: flex;
  width: min(540px, 90vw);
  max-height: 320px;
  overflow: hidden;
  background: var(--color-bg-popup, #fff);
  border: 1px solid var(--color-border-2, #e5e6eb);
  border-radius: 4px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.sel-category-side {
  flex: 0 0 108px;
  padding: 8px 0;
  overflow: auto;
  background: var(--color-fill-1);
  border-right: 1px solid var(--color-border-2, #e5e6eb);
}

.sel-category-l1 {
  display: block;
  width: 100%;
  height: 36px;
  padding: 0 12px;
  color: var(--color-text-1);
  font-size: 13px;
  line-height: 36px;
  text-align: left;
  background: transparent;
  border: none;
  cursor: pointer;
}

.sel-category-l1:hover {
  color: rgb(var(--primary-6));
}

.sel-category-l1.is-active {
  color: rgb(var(--primary-6));
  font-weight: 500;
  background: var(--color-bg-2, #fff);
}

.sel-category-main {
  flex: 1;
  min-width: 0;
  padding: 12px 14px;
  overflow: auto;
}

.sel-category-row {
  display: flex;
  gap: 12px;
  margin-bottom: 14px;
}

.sel-category-row:last-child {
  margin-bottom: 0;
}

.sel-category-l2 {
  flex: 0 0 48px;
  color: var(--color-text-3, #86909c);
  font-size: 13px;
  font-weight: 400;
  line-height: 28px;
}

.sel-category-items {
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  gap: 6px 8px;
  min-width: 0;
}

.sel-category-item {
  box-sizing: border-box;
  width: 104px;
  height: 28px;
  padding: 0 8px;
  overflow: hidden;
  color: var(--color-text-1);
  font-size: 13px;
  line-height: 28px;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: transparent;
  border: none;
  border-radius: 2px;
  cursor: pointer;
}

.sel-category-item:hover {
  color: rgb(var(--primary-6));
  background: rgba(var(--primary-6), 0.06);
}

.sel-category-item.is-active {
  color: #fff;
  background: rgb(var(--primary-6));
}
"""

CASCADER_CTRL = """        <a-cascader
          v-model="value"
          :options="options"
          path-mode
          allow-clear
          placeholder="请选择"
          style="width: 100%"
        />"""

TREE_CTRL = """        <a-tree-select
          v-model="value"
          :data="treeData"
          :tree-props="{ defaultExpandAll: true, blockNode: true }"
          tree-checkable
          allow-clear
          placeholder="选择选项"
          dropdown-class-name="sel-tree-select"
          style="width: 100%"
        />"""

BRAND_CTRL = """        <a-trigger
          trigger="click"
          position="bl"
          :popup-visible="open"
          :popup-translate="[0, 4]"
          unmount-on-close
          @popup-visible-change="onVisible"
        >
          <div
            class="sel-picker"
            :class="{ 'is-open': open, 'has-value': !!value }"
          >
            <span
              class="sel-picker-value"
              :class="{ 'is-placeholder': !value }"
            >{{ value || '请选择品牌' }}</span>
            <span
              v-if="value"
              class="arco-icon-hover sel-picker-clear"
              role="button"
              aria-label="清除"
              @click="clear"
            >
              <icon-close />
            </span>
            <icon-down class="sel-picker-arrow" :class="{ 'is-up': open }" />
          </div>
          <template #content>
            <div class="sel-brand-panel" @click.stop>
              <div class="sel-brand-letters">
                <button
                  v-for="letter in letters"
                  :key="'bl-' + letter"
                  type="button"
                  class="sel-brand-letter"
                  :class="{ 'is-active': letterFilter === letter }"
                  @click="letterFilter = letter"
                >{{ letterLabel(letter) }}</button>
              </div>
              <div class="sel-brand-grid">
                <button
                  v-for="item in filtered"
                  :key="'brand-' + item.name"
                  type="button"
                  class="sel-brand-item"
                  :class="{ 'is-active': value === item.name }"
                  @click="select(item.name)"
                >{{ item.name }}</button>
                <div v-if="!filtered.length" class="sel-picker-empty">暂无品牌</div>
              </div>
            </div>
          </template>
        </a-trigger>"""

CATEGORY_CTRL = """        <a-trigger
          trigger="click"
          position="bl"
          :popup-visible="open"
          :popup-translate="[0, 4]"
          unmount-on-close
          @popup-visible-change="onVisible"
        >
          <div
            class="sel-picker"
            :class="{ 'is-open': open, 'has-value': !!value }"
          >
            <span
              class="sel-picker-value"
              :class="{ 'is-placeholder': !value }"
            >{{ value || '请选择分类' }}</span>
            <span
              v-if="value"
              class="arco-icon-hover sel-picker-clear"
              role="button"
              aria-label="清除"
              @click="clear"
            >
              <icon-close />
            </span>
            <icon-down class="sel-picker-arrow" :class="{ 'is-up': open }" />
          </div>
          <template #content>
            <div class="sel-category-panel" @click.stop>
              <div class="sel-category-side">
                <button
                  v-for="node in tree"
                  :key="'cat-l1-' + node.key"
                  type="button"
                  class="sel-category-l1"
                  :class="{ 'is-active': l1 === node.key }"
                  @click="l1 = node.key"
                >{{ node.label }}</button>
              </div>
              <div class="sel-category-main">
                <div
                  v-for="group in activeNode.groups"
                  :key="'cat-g-' + group.title"
                  class="sel-category-row"
                >
                  <div class="sel-category-l2">{{ group.title }}</div>
                  <div class="sel-category-items">
                    <button
                      v-for="item in group.items"
                      :key="'cat-i-' + group.title + '-' + item"
                      type="button"
                      class="sel-category-item"
                      :class="{ 'is-active': value === item }"
                      @click="select(item)"
                    >{{ item }}</button>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </a-trigger>"""

CASCADER_JS = r""";(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        value: ref(),
        options: [
          {
            label: '华东',
            value: 'east',
            children: [
              {
                label: '上海',
                value: 'shanghai',
                children: [
                  { label: '黄浦区', value: 'huangpu' },
                  { label: '徐汇区', value: 'xuhui' },
                  { label: '浦东新区', value: 'pudong' },
                ],
              },
              {
                label: '浙江',
                value: 'zhejiang',
                children: [
                  { label: '杭州', value: 'hangzhou' },
                  { label: '宁波', value: 'ningbo' },
                  { label: '温州', value: 'wenzhou' },
                ],
              },
            ],
          },
          {
            label: '华南',
            value: 'south',
            children: [
              {
                label: '广东',
                value: 'guangdong',
                children: [
                  { label: '广州', value: 'guangzhou' },
                  { label: '深圳', value: 'shenzhen' },
                  { label: '佛山', value: 'foshan' },
                ],
              },
            ],
          },
        ],
      }
    },
  })
})()
"""

TREE_JS = r""";(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        value: ref([]),
        treeData: [
          {
            title: '分组一',
            key: 'group1',
            children: [
              {
                title: '子分组一',
                key: 'group1-sub',
                children: [
                  { title: '选择项一', key: 'group1-opt1' },
                  { title: '选择项二', key: 'group1-opt2' },
                ],
              },
            ],
          },
          {
            title: '分组二',
            key: 'group2',
            children: [
              {
                title: '子集菜单一',
                key: 'group2-sub',
                children: [
                  { title: '选择项一', key: 'group2-opt1' },
                  { title: '选择项二', key: 'group2-opt2' },
                ],
              },
            ],
          },
        ],
      }
    },
  })
})()
"""

BRAND_JS = r""";(function () {
  const { ref, computed } = Vue
  const brandOptions = [
    { name: '阿玛尼', letter: 'A' },
    { name: '爱登堡', letter: 'A' },
    { name: '安踏', letter: 'A' },
    { name: '阿迪达斯', letter: 'A' },
    { name: '奥康', letter: 'A' },
    { name: '百丽', letter: 'B' },
    { name: '波司登', letter: 'B' },
    { name: '彪马', letter: 'B' },
    { name: 'Chanel', letter: 'C' },
    { name: 'CK', letter: 'C' },
    { name: '李宁', letter: 'L' },
    { name: '耐克', letter: 'N' },
    { name: '森马', letter: 'S' },
    { name: '太平鸟', letter: 'T' },
    { name: '特步', letter: 'T' },
    { name: '优衣库', letter: 'Y' },
    { name: '雅戈尔', letter: 'Y' },
    { name: '周大福', letter: 'Z' },
    { name: '周生生', letter: 'Z' },
    { name: '七匹狼', letter: '#' },
    { name: '361度', letter: '#' },
  ]
  WebArco.mount('#app', {
    setup() {
      const value = ref('')
      const open = ref(false)
      const letterFilter = ref('all')
      const letters = ['all', '#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z']
      const filtered = computed(function () {
        if (letterFilter.value === 'all') return brandOptions
        return brandOptions.filter(function (b) {
          return b.letter === letterFilter.value
        })
      })
      return {
        value,
        open,
        letterFilter,
        letters,
        filtered,
        letterLabel: function (letter) {
          return letter === 'all' ? '全部' : letter
        },
        select: function (name) {
          value.value = name
          open.value = false
        },
        clear: function (e) {
          if (e) {
            e.preventDefault()
            e.stopPropagation()
          }
          value.value = ''
          open.value = false
        },
        onVisible: function (visible) {
          open.value = visible
        },
      }
    },
  })
})()
"""

CATEGORY_JS = r""";(function () {
  const { ref, computed } = Vue
  const tree = [
    {
      key: 'bags',
      label: '箱包/鞋靴',
      groups: [
        { title: '女包', items: ['真皮包', '手提包', '小方包', '单肩包', '斜挎包'] },
        { title: '男包', items: ['公文包', '电脑包', '商务包', '腰包'] },
        { title: '旅行箱', items: ['拉杆箱', '登机箱', '万向轮箱'] },
      ],
    },
    {
      key: 'apparel',
      label: '女装/男装',
      groups: [
        { title: '女装', items: ['连衣裙', 'T恤', '衬衫', '外套', '牛仔裤'] },
        { title: '男装', items: ['夹克', '衬衫', '西裤', '卫衣'] },
      ],
    },
    {
      key: 'digital',
      label: '家电/数码',
      groups: [
        { title: '大家电', items: ['冰箱', '洗衣机', '空调', '电视'] },
        { title: '数码', items: ['手机', '平板', '笔记本', '耳机'] },
      ],
    },
    {
      key: 'beauty',
      label: '美妆/洗护',
      groups: [
        { title: '护肤', items: ['洁面', '精华', '面霜', '面膜'] },
        { title: '彩妆', items: ['口红', '粉底', '眼影'] },
      ],
    },
  ]
  WebArco.mount('#app', {
    setup() {
      const value = ref('')
      const open = ref(false)
      const l1 = ref('bags')
      const activeNode = computed(function () {
        return tree.find(function (n) {
          return n.key === l1.value
        }) || tree[0]
      })
      return {
        value,
        open,
        l1,
        tree,
        activeNode,
        select: function (name) {
          value.value = name
          open.value = false
        },
        clear: function (e) {
          if (e) {
            e.preventDefault()
            e.stopPropagation()
          }
          value.value = ''
          open.value = false
        },
        onVisible: function (visible) {
          open.value = visible
        },
      }
    },
  })
})()
"""

CASCADER_SNIP = """```html
<a-cascader
  v-model="value"
  :options="options"
  path-mode
  allow-clear
  placeholder="请选择"
/>
```"""

TREE_SNIP = """```html
<a-tree-select
  v-model="value"
  :data="treeData"
  :tree-props="{ defaultExpandAll: true, blockNode: true }"
  tree-checkable
  allow-clear
  placeholder="选择选项"
  dropdown-class-name="sel-tree-select"
/>
```"""

BRAND_SNIP = """```html
<a-trigger
  trigger="click"
  position="bl"
  :popup-visible="open"
  :popup-translate="[0, 4]"
  unmount-on-close
  @popup-visible-change="onVisible"
>
  <div class="sel-picker" :class="{ 'is-open': open, 'has-value': !!value }">
    <span class="sel-picker-value" :class="{ 'is-placeholder': !value }">{{ value || '请选择品牌' }}</span>
    <span v-if="value" class="arco-icon-hover sel-picker-clear" role="button" aria-label="清除" @click="clear">
      <icon-close />
    </span>
    <icon-down class="sel-picker-arrow" :class="{ 'is-up': open }" />
  </div>
  <template #content>
    <div class="sel-brand-panel" @click.stop>
      <!-- 字母筛选 + 品牌网格，样式见 component.css -->
    </div>
  </template>
</a-trigger>
```"""

CATEGORY_SNIP = """```html
<a-trigger
  trigger="click"
  position="bl"
  :popup-visible="open"
  :popup-translate="[0, 4]"
  unmount-on-close
  @popup-visible-change="onVisible"
>
  <div class="sel-picker" :class="{ 'is-open': open, 'has-value': !!value }">
    <span class="sel-picker-value" :class="{ 'is-placeholder': !value }">{{ value || '请选择分类' }}</span>
    <span v-if="value" class="arco-icon-hover sel-picker-clear" role="button" aria-label="清除" @click="clear">
      <icon-close />
    </span>
    <icon-down class="sel-picker-arrow" :class="{ 'is-up': open }" />
  </div>
  <template #content>
    <div class="sel-category-panel" @click.stop>
      <!-- 左侧一级 + 右侧分组项，样式见 component.css -->
    </div>
  </template>
</a-trigger>
```"""


def write_member(slug, sub, label, control, js, snippet, scene, rule, hint, extra_css="", css_body=None):
    d = SELECT / sub
    css_links = ""
    if extra_css:
        css_links = f'  <link rel="stylesheet" href="{extra_css}" />\n'
    write(
        d / "index.html",
        MEMBER_HTML.format(label=label, slug=slug, control=control, extra_css=css_links),
    )
    write(d / "component.js", js)
    if css_body is not None:
        write(d / "component.css", css_body)
    write(
        d / "meta.yaml",
        f"""slug: {slug}
label: {label}
type: component
surface: general
status: preview
tier: free
framework: web
category: form
tags:
  - input
path: components/select/{sub}
""",
    )
    write(
        d / "prompt.md",
        PROMPT_TMPL.format(
            label=label,
            slug=slug,
            sub=sub,
            scene=scene,
            rule=rule,
            snippet=snippet,
            hint=hint,
            siblings=sibling_table(slug),
        ),
    )


def update_existing_prompts():
    for slug, sub, _ in ALL_SIBLINGS:
        p = SELECT / sub / "prompt.md"
        if not p.is_file():
            continue
        text = p.read_text(encoding="utf-8-sig")
        # replace §8 table
        new_table = "| slug | 路径 | |\n|------|------|--|\n" + sibling_table(slug)
        text2, n = re.subn(
            r"\| slug \| 路径 \| \|\n\|------\|------\|--\|\n(?:\|.*\|\n?)+",
            new_table + "\n",
            text,
            count=1,
        )
        if n:
            write(p, text2)


def card(slug, label, body):
    return f"""          <div class="wa-fam-card" data-slug="{slug}">
            <div class="wa-fam-card__top">
              <div class="wa-comp-meta"><span class="wa-comp-meta__name">{label}</span><span class="wa-comp-meta__slug">{slug}</span></div>
              <a-button
                :class="['wa-fam-copy', {{ 'wa-fam-copy--locked': copyLocked }}]"
                type="outline"
                size="small"
                @click="copyPrompt('{slug}')"
                :title="copyTitle"
                :aria-label="copyTitle"
              >
                <span class="wa-fam-copy__inner" v-if="copyLocked">
                  <icon-lock></icon-lock>
                  <span class="wa-fam-copy__label">开通权限</span>
                </span>
                <span class="wa-fam-copy__inner" v-else>
                  <icon-copy></icon-copy>
                  <span class="wa-fam-copy__label">提示词</span>
                </span>
              </a-button>
            </div>
{body}
          </div>"""


def write_family_index():
    cards = "\n\n".join(
        [
            card(
                "select",
                "下拉选择",
                """            <a-select
              v-model="select"
              :options="selectOptions"
              placeholder="请选择"
              allow-clear
              style="width: 100%"
            />""",
            ),
            card(
                "select-multiple",
                "多选下拉",
                """            <a-select
              v-model="multi"
              multiple
              :max-tag-count="2"
              :options="platformOptions"
              placeholder="请选择"
              allow-clear
              style="width: 100%"
            />""",
            ),
            card(
                "select-search",
                "可搜索下拉",
                """            <a-select
              v-model="search"
              :options="cityOptions"
              placeholder="请搜索或选择"
              allow-search
              allow-clear
              style="width: 100%"
            />""",
            ),
            card(
                "select-create",
                "可创建下拉",
                """            <a-select
              v-model="create"
              :options="createOptions"
              placeholder="选择或输入创建"
              allow-create
              allow-search
              allow-clear
              style="width: 100%"
            />""",
            ),
            card(
                "select-cascader",
                "级联选择",
                """            <a-cascader
              v-model="cascader"
              :options="regionOptions"
              path-mode
              allow-clear
              placeholder="请选择"
              style="width: 100%"
            />""",
            ),
            card(
                "select-tree-select",
                "树选择",
                """            <a-tree-select
              v-model="treeSelect"
              :data="treeSelectData"
              :tree-props="{ defaultExpandAll: true, blockNode: true }"
              tree-checkable
              allow-clear
              placeholder="选择选项"
              dropdown-class-name="sel-tree-select"
              style="width: 100%"
            />""",
            ),
            card(
                "select-brand",
                "品牌选择",
                BRAND_CTRL.replace("          ", "            ").replace("letterFilter", "brandLetter").replace("letters", "brandLetters").replace("filtered", "filteredBrands").replace("letterLabel", "brandLetterLabel").replace("select(", "selectBrand(").replace("clear", "clearBrand").replace("onVisible", "onBrandVisible").replace("value", "brand").replace("open", "brandOpen"),
            ),
            card(
                "select-category",
                "分类选择",
                CATEGORY_CTRL.replace("          ", "            ").replace("l1", "categoryL1").replace("tree", "categoryTree").replace("activeNode", "activeCategoryNode").replace("select(", "selectCategory(").replace("clear", "clearCategory").replace("onVisible", "onCategoryVisible").replace("value", "category").replace("open", "categoryOpen"),
            ),
            card(
                "select-disabled",
                "禁用下拉",
                """            <a-select
              v-model="disabledSelect"
              :options="selectOptions"
              placeholder="请选择"
              disabled
              style="width: 100%"
            />""",
            ),
        ]
    )
    # Fix brand/category cards - the naive replace is fragile. Write explicit HTML instead.
    brand_body = """            <a-trigger
              trigger="click"
              position="bl"
              :popup-visible="brandOpen"
              :popup-translate="[0, 4]"
              unmount-on-close
              @popup-visible-change="onBrandVisible"
            >
              <div
                class="sel-picker"
                :class="{ 'is-open': brandOpen, 'has-value': !!brand }"
              >
                <span
                  class="sel-picker-value"
                  :class="{ 'is-placeholder': !brand }"
                >{{ brand || '请选择品牌' }}</span>
                <span
                  v-if="brand"
                  class="arco-icon-hover sel-picker-clear"
                  role="button"
                  aria-label="清除"
                  @click="clearBrand"
                >
                  <icon-close />
                </span>
                <icon-down class="sel-picker-arrow" :class="{ 'is-up': brandOpen }" />
              </div>
              <template #content>
                <div class="sel-brand-panel" @click.stop>
                  <div class="sel-brand-letters">
                    <button
                      v-for="letter in brandLetters"
                      :key="'bl-' + letter"
                      type="button"
                      class="sel-brand-letter"
                      :class="{ 'is-active': brandLetter === letter }"
                      @click="brandLetter = letter"
                    >{{ brandLetterLabel(letter) }}</button>
                  </div>
                  <div class="sel-brand-grid">
                    <button
                      v-for="item in filteredBrands"
                      :key="'brand-' + item.name"
                      type="button"
                      class="sel-brand-item"
                      :class="{ 'is-active': brand === item.name }"
                      @click="selectBrand(item.name)"
                    >{{ item.name }}</button>
                    <div v-if="!filteredBrands.length" class="sel-picker-empty">暂无品牌</div>
                  </div>
                </div>
              </template>
            </a-trigger>"""
    category_body = """            <a-trigger
              trigger="click"
              position="bl"
              :popup-visible="categoryOpen"
              :popup-translate="[0, 4]"
              unmount-on-close
              @popup-visible-change="onCategoryVisible"
            >
              <div
                class="sel-picker"
                :class="{ 'is-open': categoryOpen, 'has-value': !!category }"
              >
                <span
                  class="sel-picker-value"
                  :class="{ 'is-placeholder': !category }"
                >{{ category || '请选择分类' }}</span>
                <span
                  v-if="category"
                  class="arco-icon-hover sel-picker-clear"
                  role="button"
                  aria-label="清除"
                  @click="clearCategory"
                >
                  <icon-close />
                </span>
                <icon-down class="sel-picker-arrow" :class="{ 'is-up': categoryOpen }" />
              </div>
              <template #content>
                <div class="sel-category-panel" @click.stop>
                  <div class="sel-category-side">
                    <button
                      v-for="node in categoryTree"
                      :key="'cat-l1-' + node.key"
                      type="button"
                      class="sel-category-l1"
                      :class="{ 'is-active': categoryL1 === node.key }"
                      @click="categoryL1 = node.key"
                    >{{ node.label }}</button>
                  </div>
                  <div class="sel-category-main">
                    <div
                      v-for="group in activeCategoryNode.groups"
                      :key="'cat-g-' + group.title"
                      class="sel-category-row"
                    >
                      <div class="sel-category-l2">{{ group.title }}</div>
                      <div class="sel-category-items">
                        <button
                          v-for="item in group.items"
                          :key="'cat-i-' + group.title + '-' + item"
                          type="button"
                          class="sel-category-item"
                          :class="{ 'is-active': category === item }"
                          @click="selectCategory(item)"
                        >{{ item }}</button>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </a-trigger>"""
    cards = "\n\n".join(
        [
            card("select", "下拉选择", """            <a-select
              v-model="select"
              :options="selectOptions"
              placeholder="请选择"
              allow-clear
              style="width: 100%"
            />"""),
            card("select-multiple", "多选下拉", """            <a-select
              v-model="multi"
              multiple
              :max-tag-count="2"
              :options="platformOptions"
              placeholder="请选择"
              allow-clear
              style="width: 100%"
            />"""),
            card("select-search", "可搜索下拉", """            <a-select
              v-model="search"
              :options="cityOptions"
              placeholder="请搜索或选择"
              allow-search
              allow-clear
              style="width: 100%"
            />"""),
            card("select-create", "可创建下拉", """            <a-select
              v-model="create"
              :options="createOptions"
              placeholder="选择或输入创建"
              allow-create
              allow-search
              allow-clear
              style="width: 100%"
            />"""),
            card("select-cascader", "级联选择", """            <a-cascader
              v-model="cascader"
              :options="regionOptions"
              path-mode
              allow-clear
              placeholder="请选择"
              style="width: 100%"
            />"""),
            card("select-tree-select", "树选择", """            <a-tree-select
              v-model="treeSelect"
              :data="treeSelectData"
              :tree-props="{ defaultExpandAll: true, blockNode: true }"
              tree-checkable
              allow-clear
              placeholder="选择选项"
              dropdown-class-name="sel-tree-select"
              style="width: 100%"
            />"""),
            card("select-brand", "品牌选择", brand_body),
            card("select-category", "分类选择", category_body),
            card("select-disabled", "禁用下拉", """            <a-select
              v-model="disabledSelect"
              :options="selectOptions"
              placeholder="请选择"
              disabled
              style="width: 100%"
            />"""),
        ]
    )
    html = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <script src="../../assets/common/js/theme.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>下拉选择 · 家族对照</title>
  <link rel="stylesheet" href="../../vendor/arco/css/arco.css" />
  <link rel="stylesheet" href="../../assets/common/css/chrome.css" />
  <link rel="stylesheet" href="../../assets/common/css/global.css" />
  <link rel="stylesheet" href="../../vendor/fontawesome/css/all.min.css" />
  <link rel="stylesheet" href="../../assets/common/css/fa-icons.css" />
  <link rel="stylesheet" href="../../assets/common/css/components.css" />
  <link rel="stylesheet" href="../index.css" />
  <link rel="stylesheet" href="./brand/component.css" />
  <link rel="stylesheet" href="./category/component.css" />
</head>
<body>
  <div id="app" v-cloak>
    <section class="wa-fam-section wa-fam-fade-in" data-family="select">
      <div class="wa-fam-section__inner">
        <header class="wa-fam-head">
          <p class="wa-fam-kicker">select</p>
          <h1 class="wa-fam-title">下拉选择</h1>
          <p class="wa-fam-lead">表单中单选/多选、级联、树选、品牌与分类等（对照 Admin component-form 选择类与 Arco）。</p>
          <p class="wa-fam-lead">组件类型：default / multiple / search / create / cascader / tree-select / brand / category / disabled</p>
        </header>

        <div class="wa-fam-grid">
{cards}
        </div>
      </div>
    </section>
  </div>
  <script src="../../vendor/vue/vue.global.prod.js"></script>
  <script src="../../vendor/arco/arco-vue.min.js"></script>
  <script src="../../assets/common/js/fa-icons.js"></script>
  <script src="../../assets/common/js/boot.js"></script>
  <script src="../../assets/common/js/wa-prefs.js"></script>
  
  <script src="./prompts.inline.js"></script>
  <script>
    window.WA_FAMILY = {{
      id: 'select',
      members: [
        'select',
        'select-multiple',
        'select-search',
        'select-create',
        'select-cascader',
        'select-tree-select',
        'select-brand',
        'select-category',
        'select-disabled',
      ],
      setup: function (api) {{
        var brand = api.ref('')
        var brandOpen = api.ref(false)
        var brandLetter = api.ref('all')
        var brandOptions = [
          {{ name: '阿玛尼', letter: 'A' }},
          {{ name: '爱登堡', letter: 'A' }},
          {{ name: '安踏', letter: 'A' }},
          {{ name: '阿迪达斯', letter: 'A' }},
          {{ name: '奥康', letter: 'A' }},
          {{ name: '百丽', letter: 'B' }},
          {{ name: '波司登', letter: 'B' }},
          {{ name: '彪马', letter: 'B' }},
          {{ name: 'Chanel', letter: 'C' }},
          {{ name: 'CK', letter: 'C' }},
          {{ name: '李宁', letter: 'L' }},
          {{ name: '耐克', letter: 'N' }},
          {{ name: '森马', letter: 'S' }},
          {{ name: '太平鸟', letter: 'T' }},
          {{ name: '特步', letter: 'T' }},
          {{ name: '优衣库', letter: 'Y' }},
          {{ name: '雅戈尔', letter: 'Y' }},
          {{ name: '周大福', letter: 'Z' }},
          {{ name: '周生生', letter: 'Z' }},
          {{ name: '七匹狼', letter: '#' }},
          {{ name: '361度', letter: '#' }},
        ]
        var category = api.ref('')
        var categoryOpen = api.ref(false)
        var categoryL1 = api.ref('bags')
        var categoryTree = [
          {{
            key: 'bags',
            label: '箱包/鞋靴',
            groups: [
              {{ title: '女包', items: ['真皮包', '手提包', '小方包', '单肩包', '斜挎包'] }},
              {{ title: '男包', items: ['公文包', '电脑包', '商务包', '腰包'] }},
              {{ title: '旅行箱', items: ['拉杆箱', '登机箱', '万向轮箱'] }},
            ],
          }},
          {{
            key: 'apparel',
            label: '女装/男装',
            groups: [
              {{ title: '女装', items: ['连衣裙', 'T恤', '衬衫', '外套', '牛仔裤'] }},
              {{ title: '男装', items: ['夹克', '衬衫', '西裤', '卫衣'] }},
            ],
          }},
          {{
            key: 'digital',
            label: '家电/数码',
            groups: [
              {{ title: '大家电', items: ['冰箱', '洗衣机', '空调', '电视'] }},
              {{ title: '数码', items: ['手机', '平板', '笔记本', '耳机'] }},
            ],
          }},
          {{
            key: 'beauty',
            label: '美妆/洗护',
            groups: [
              {{ title: '护肤', items: ['洁面', '精华', '面霜', '面膜'] }},
              {{ title: '彩妆', items: ['口红', '粉底', '眼影'] }},
            ],
          }},
        ]
        var filteredBrands = api.computed(function () {{
          if (brandLetter.value === 'all') return brandOptions
          return brandOptions.filter(function (b) {{ return b.letter === brandLetter.value }})
        }})
        var activeCategoryNode = api.computed(function () {{
          return categoryTree.find(function (n) {{ return n.key === categoryL1.value }}) || categoryTree[0]
        }})
        return {{
          select: api.ref(),
          multi: api.ref([]),
          search: api.ref(),
          create: api.ref(),
          cascader: api.ref(),
          treeSelect: api.ref([]),
          brand: brand,
          brandOpen: brandOpen,
          brandLetter: brandLetter,
          brandLetters: ['all', '#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'],
          brandOptions: brandOptions,
          filteredBrands: filteredBrands,
          brandLetterLabel: function (letter) {{ return letter === 'all' ? '全部' : letter }},
          selectBrand: function (name) {{ brand.value = name; brandOpen.value = false }},
          clearBrand: function (e) {{
            if (e) {{ e.preventDefault(); e.stopPropagation() }}
            brand.value = ''; brandOpen.value = false
          }},
          onBrandVisible: function (visible) {{ brandOpen.value = visible }},
          category: category,
          categoryOpen: categoryOpen,
          categoryL1: categoryL1,
          categoryTree: categoryTree,
          activeCategoryNode: activeCategoryNode,
          selectCategory: function (name) {{ category.value = name; categoryOpen.value = false }},
          clearCategory: function (e) {{
            if (e) {{ e.preventDefault(); e.stopPropagation() }}
            category.value = ''; categoryOpen.value = false
          }},
          onCategoryVisible: function (visible) {{ categoryOpen.value = visible }},
          disabledSelect: api.ref('online'),
          selectOptions: [
            {{ label: '线上', value: 'online' }},
            {{ label: '线下', value: 'offline' }},
            {{ label: '混合', value: 'hybrid' }},
          ],
          platformOptions: [
            {{ label: '抖音', value: 'douyin' }},
            {{ label: '快手', value: 'kuaishou' }},
            {{ label: '小红书', value: 'xiaohongshu' }},
            {{ label: 'B 站', value: 'bilibili' }},
          ],
          cityOptions: [
            {{ label: '北京', value: 'beijing' }},
            {{ label: '上海', value: 'shanghai' }},
            {{ label: '广州', value: 'guangzhou' }},
            {{ label: '深圳', value: 'shenzhen' }},
            {{ label: '成都', value: 'chengdu' }},
            {{ label: '武汉', value: 'wuhan' }},
          ],
          createOptions: [
            {{ label: '运营', value: 'ops' }},
            {{ label: '投放', value: 'ads' }},
            {{ label: '设计', value: 'design' }},
          ],
          regionOptions: [
            {{
              label: '华东',
              value: 'east',
              children: [
                {{
                  label: '上海',
                  value: 'shanghai',
                  children: [
                    {{ label: '黄浦区', value: 'huangpu' }},
                    {{ label: '徐汇区', value: 'xuhui' }},
                    {{ label: '浦东新区', value: 'pudong' }},
                  ],
                }},
                {{
                  label: '浙江',
                  value: 'zhejiang',
                  children: [
                    {{ label: '杭州', value: 'hangzhou' }},
                    {{ label: '宁波', value: 'ningbo' }},
                    {{ label: '温州', value: 'wenzhou' }},
                  ],
                }},
              ],
            }},
            {{
              label: '华南',
              value: 'south',
              children: [
                {{
                  label: '广东',
                  value: 'guangdong',
                  children: [
                    {{ label: '广州', value: 'guangzhou' }},
                    {{ label: '深圳', value: 'shenzhen' }},
                    {{ label: '佛山', value: 'foshan' }},
                  ],
                }},
              ],
            }},
          ],
          treeSelectData: [
            {{
              title: '分组一',
              key: 'group1',
              children: [
                {{
                  title: '子分组一',
                  key: 'group1-sub',
                  children: [
                    {{ title: '选择项一', key: 'group1-opt1' }},
                    {{ title: '选择项二', key: 'group1-opt2' }},
                  ],
                }},
              ],
            }},
            {{
              title: '分组二',
              key: 'group2',
              children: [
                {{
                  title: '子集菜单一',
                  key: 'group2-sub',
                  children: [
                    {{ title: '选择项一', key: 'group2-opt1' }},
                    {{ title: '选择项二', key: 'group2-opt2' }},
                  ],
                }},
              ],
            }},
          ],
        }}
      }},
    }}
  </script>
  <script src="../copy-prompt.js"></script>
  <script src="../family.js"></script>
</body>
</html>
"""
    write(SELECT / "index.html", html)


def update_catalog():
    data = load_catalog()
    new_items = [
        {
            "slug": "select-cascader",
            "label": "级联选择",
            "surface": "general",
            "status": "preview",
            "tier": "free",
            "path": "components/select/cascader",
            "usedByBlocks": [],
            "notes": "家族 select / cascader；对照 Admin Cascader",
            "category": "form",
            "tags": ["input"],
            "family": "select",
        },
        {
            "slug": "select-tree-select",
            "label": "树选择",
            "surface": "general",
            "status": "preview",
            "tier": "free",
            "path": "components/select/tree-select",
            "usedByBlocks": [],
            "notes": "家族 select / tree-select；对照 Admin TreeSelect",
            "category": "form",
            "tags": ["input"],
            "family": "select",
        },
        {
            "slug": "select-brand",
            "label": "品牌选择",
            "surface": "general",
            "status": "preview",
            "tier": "free",
            "path": "components/select/brand",
            "usedByBlocks": [],
            "notes": "家族 select / brand；对照 Admin Brand 选择器",
            "category": "form",
            "tags": ["input"],
            "family": "select",
        },
        {
            "slug": "select-category",
            "label": "分类选择",
            "surface": "general",
            "status": "preview",
            "tier": "free",
            "path": "components/select/category",
            "usedByBlocks": [],
            "notes": "家族 select / category；对照 Admin Category 选择器",
            "category": "form",
            "tags": ["input"],
            "family": "select",
        },
    ]
    existing = {c["slug"] for c in data["components"]}
    # insert after select-disabled
    comps = data["components"]
    insert_at = next((i for i, c in enumerate(comps) if c["slug"] == "select-disabled"), len(comps))
    for item in new_items:
        if item["slug"] in existing:
            continue
        comps.insert(insert_at, item)
        insert_at += 1

    for fam in data.get("families") or []:
        if fam.get("slug") == "select":
            fam["members"] = [s for s, _, _ in ALL_SIBLINGS]
            fam["notes"] = "根目录家族页；对照 Admin component-form 选择类 + Arco"
            break

    save_catalog(data)


def patch_arco_controls():
    path = WEB / "css" / "components.css"
    text = path.read_text(encoding="utf-8")
    marker = "/* ── TreeSelect 面板（对照 Admin component-form-tree-select）── */"
    if marker in text:
        return
    block = """
""" + marker + """

.arco-tree-select-popup.sel-tree-select .arco-tree-select-tree-wrapper {
  padding-right: 0;
  padding-left: 0;
}

.arco-tree-select-popup.sel-tree-select .arco-tree-node {
  box-sizing: border-box;
  padding-right: 12px;
  padding-left: 12px;
}

.arco-tree-select-popup.sel-tree-select .arco-tree-node:hover {
  background-color: var(--color-fill-1);
}

.arco-tree-select-popup.sel-tree-select .arco-tree-node-selected,
.arco-tree-select-popup.sel-tree-select .arco-tree-node-selected:hover {
  background-color: rgba(var(--primary-6), 0.06);
}

.arco-tree-select-popup.sel-tree-select .arco-tree-node-title {
  margin-left: 6px;
  padding-left: 0;
  border-radius: 0;
}

.arco-tree-select-popup.sel-tree-select .arco-tree-node-title:hover,
.arco-tree-select-popup.sel-tree-select .arco-tree-node:hover .arco-tree-node-title,
.arco-tree-select-popup.sel-tree-select .arco-tree-node-selected .arco-tree-node-title {
  background-color: transparent;
}

.arco-tree-select-popup.sel-tree-select .arco-tree-node-switcher {
  margin-left: 4px;
  margin-right: 0;
  color: var(--color-text-3);
}

.arco-tree-select-popup.sel-tree-select .arco-tree-node-indent-block {
  width: 10px;
  margin-right: 4px;
}

.arco-tree-select-popup.sel-tree-select .arco-checkbox {
  margin-left: 6px;
  margin-right: 0;
}
"""
    path.write_text(text.rstrip() + "\n" + block, encoding="utf-8", newline="\n")


def main():
    write_member(
        "select-cascader",
        "cascader",
        "级联选择",
        CASCADER_CTRL,
        CASCADER_JS,
        CASCADER_SNIP,
        "省市区等多级路径选择（对照 Admin Cascader）。",
        "真 `a-cascader` + `path-mode`；`:options` 树；可清空",
        "> 换文案：只改 placeholder / options 汉字。宿主需提供级联 `options`。",
    )
    write_member(
        "select-tree-select",
        "tree-select",
        "树选择",
        TREE_CTRL,
        TREE_JS,
        TREE_SNIP,
        "树形多选（对照 Admin TreeSelect，可勾选）。",
        "真 `a-tree-select` + `tree-checkable`；`:data`；`dropdown-class-name=\"sel-tree-select\"`",
        "> 换文案：只改 placeholder / 树节点汉字。面板样式依赖 `components.css` 中 `.sel-tree-select`。",
    )
    write_member(
        "select-brand",
        "brand",
        "品牌选择",
        BRAND_CTRL,
        BRAND_JS,
        BRAND_SNIP,
        "按字母筛选的品牌面板（对照 Admin Brand 选择器）。",
        "真 `a-trigger` + `.sel-picker` 触发器；面板字母筛选与网格点选；可清除",
        "> 换文案：只改占位与品牌列表汉字；须挂本目录 `component.css`（含 `.sel-picker` / `.sel-brand-*`）。",
        extra_css="./component.css",
        css_body=BRAND_CSS,
    )
    write_member(
        "select-category",
        "category",
        "分类选择",
        CATEGORY_CTRL,
        CATEGORY_JS,
        CATEGORY_SNIP,
        "左侧一级 + 右侧分组的分类面板（对照 Admin Category 选择器）。",
        "真 `a-trigger` + `.sel-picker` 触发器；左侧切换一级、右侧点选叶子；可清除",
        "> 换文案：只改占位与分类树汉字；须挂本目录 `component.css`（含 `.sel-picker` / `.sel-category-*`）。",
        extra_css="./component.css",
        css_body=CATEGORY_CSS,
    )
    write_family_index()
    update_existing_prompts()
    update_catalog()
    patch_arco_controls()
    print("ok: cascader / tree-select / brand / category")


if __name__ == "__main__":
    main()
