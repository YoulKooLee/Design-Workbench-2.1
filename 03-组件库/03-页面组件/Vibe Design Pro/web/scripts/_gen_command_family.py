# -*- coding: utf-8 -*-
"""Polish command family to match shadcnuikit.com/components/command.

Run from frame/web:
  python scripts/_gen_command_family.py
  python scripts/sync-prompts.py command
"""
from __future__ import annotations

from catalog_io import load_catalog, save_catalog

import json
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
COMP = ROOT / "components" / "command"
CATALOG = ROOT / "_meta" / "config.json"
FAMILY = "command"
CATEGORY = "navigation"

COPY_BTN = """              <a-button
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
              </a-button>"""

CSS = """/* command — aligned to shadcnuikit command demos */
.wa-command {
  width: 100%;
  max-width: 100%;
  border: 1px solid var(--color-border-2);
  border-radius: 12px;
  background: var(--color-bg-2);
  box-shadow: 0 1px 2px color-mix(in srgb, var(--color-text-1) 4%, transparent);
  overflow: hidden;
}

.wa-command__search {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border-bottom: 1px solid var(--color-border-2);
}

.wa-command__search-icon {
  flex-shrink: 0;
  color: var(--color-text-3);
  display: inline-flex;
}

.wa-command__input {
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  line-height: 1.4;
  color: var(--color-text-1);
}

.wa-command__input::-webkit-search-cancel-button,
.wa-command__input::-webkit-search-decoration {
  -webkit-appearance: none;
  appearance: none;
  display: none;
}

.wa-command__input::-ms-clear {
  display: none;
  width: 0;
  height: 0;
}

.wa-command__input::placeholder {
  color: var(--color-text-3);
}

/* 清除/关闭：对齐 Arco input clear（中性色 + 圆形悬停，无描边方框） */
.wa-command__clear {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  margin: 0;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: var(--color-text-3);
  cursor: pointer;
  line-height: 1;
}

.wa-command__clear:hover {
  background: var(--color-fill-3);
  color: var(--color-text-2);
}

.wa-command__clear .pro-fa-icon,
.wa-command__clear .arco-icon {
  font-size: 12px;
  width: 12px;
  height: 12px;
}

.wa-command__list {
  max-height: 280px;
  overflow-y: auto;
  padding: 6px;
}

.wa-command__group + .wa-command__group {
  margin-top: 4px;
}

.wa-command__heading {
  padding: 8px 10px 4px;
  font-size: 11px;
  font-weight: 500;
  color: var(--color-text-3);
  letter-spacing: 0.01em;
}

.wa-command__item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 8px 10px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--color-text-1);
  font-size: 14px;
  line-height: 1.35;
  text-align: left;
  cursor: pointer;
  box-sizing: border-box;
}

.wa-command__item:hover,
.wa-command__item.is-active {
  background: var(--color-fill-2);
}

.wa-command__item-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-3);
}

/* 统一行首槽位：头像 / 图标同宽，文案左缘对齐 */
.wa-command__item-lead {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-3);
}

.wa-command__item-lead .arco-avatar {
  flex-shrink: 0;
}

.wa-command__item-label {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.wa-command__item-meta {
  flex-shrink: 0;
  font-size: 12px;
  color: var(--color-text-3);
}

.wa-command__shortcut {
  flex-shrink: 0;
  font-size: 11px;
  color: var(--color-text-3);
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.02em;
}

.wa-command__empty {
  padding: 36px 16px;
  text-align: center;
  font-size: 14px;
  color: var(--color-text-3);
}

.wa-command__sep {
  height: 1px;
  margin: 6px 4px;
  background: var(--color-border-2);
}

.wa-command__person {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  flex: 1;
}

.wa-command__person-text {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.wa-command__person-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-1);
  line-height: 1.3;
}

.wa-command__person-email {
  font-size: 12px;
  color: var(--color-text-3);
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.wa-command__footer {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 16px;
  padding: 8px 14px;
  border-top: 1px solid var(--color-border-2);
  font-size: 11px;
  color: var(--color-text-3);
}

.wa-command__kbd {
  display: inline-block;
  min-width: 1.1em;
  padding: 0 4px;
  border: 1px solid var(--color-border-2);
  border-radius: 4px;
  background: var(--color-fill-2);
  font-size: 10px;
  line-height: 1.6;
  text-align: center;
  margin-right: 4px;
}

.wa-command__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 8px 14px;
  border-bottom: 1px solid var(--color-border-2);
}

.wa-command__tab {
  border: 1px solid var(--color-border-2);
  border-radius: 999px;
  background: transparent;
  color: var(--color-text-2);
  font-size: 12px;
  line-height: 1.3;
  padding: 4px 10px;
  cursor: pointer;
}

.wa-command__tab.is-active,
.wa-command__tab:hover {
  background: var(--color-fill-2);
  color: var(--color-text-1);
  border-color: var(--color-border-3);
}

.wa-command__header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--color-border-2);
}

.wa-command__header .wa-command__input {
  flex: 1;
}

.wa-command__header .wa-command__shortcut {
  padding: 1px 6px;
  border: 1px solid var(--color-border-2);
  border-radius: 4px;
  background: var(--color-fill-1);
}

.wa-fam-section[data-family="command"] .wa-fam-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: start;
}

.wa-fam-section[data-family="command"] .wa-fam-card__stage {
  width: 100%;
  justify-content: flex-start;
  align-items: stretch;
}

body.wa-preview-embed .wa-preview-stage[data-slug^="command-"].wa-embed {
  width: min(420px, calc(100% - 32px));
}
"""


def M(subdir: str, label: str, lead: str, rules: str, visual: str, html: str, *, setup: str = "") -> dict:
    return {
        "subdir": subdir,
        "slug": f"{FAMILY}-{subdir}",
        "label": label,
        "lead": lead,
        "rules": rules,
        "visual": visual,
        "html": html.strip(),
        "setup": setup,
    }


MEMBERS = [
    M(
        "default",
        "分类搜索列表",
        "最简命令菜单：搜索框 + 带图标的分类列表与空态。",
        "`.wa-command`；左侧搜索图标输入；列表可过滤",
        "圆角描边面板；左图标行；无匹配时居中空态",
        """
<div class="wa-command">
  <div class="wa-command__search">
    <span class="wa-command__search-icon"><icon-search :size="15"></icon-search></span>
    <input class="wa-command__input" v-model="qCats" type="text" placeholder="搜索分类…" autocomplete="off" />
    <button type="button" class="wa-command__clear" v-show="qCats" @click="qCats = ''" aria-label="清除"><icon-close :size="12"></icon-close></button>
  </div>
  <div class="wa-command__list">
    <template v-if="filteredCats.length">
      <button type="button" class="wa-command__item" v-for="item in filteredCats" :key="item.label">
        <span class="wa-command__item-icon"><component :is="item.icon" :size="14"></component></span>
        <span class="wa-command__item-label">{{ item.label }}</span>
      </button>
    </template>
    <div class="wa-command__empty" v-else>未找到匹配结果</div>
  </div>
</div>
""",
        setup="cats",
    ),
    M(
        "shortcuts",
        "分组快捷键",
        "导航 / 操作 分组，行尾展示键盘快捷键。",
        "多 `.wa-command__group` + `.wa-command__shortcut`",
        "分组标题 + 图标行 + 右侧 ⌘ 提示",
        """
<div class="wa-command">
  <div class="wa-command__search">
    <span class="wa-command__search-icon"><icon-search :size="15"></icon-search></span>
    <input class="wa-command__input" v-model="qShortcuts" type="text" placeholder="输入命令或搜索…" autocomplete="off" />
    <button type="button" class="wa-command__clear" v-show="qShortcuts" @click="qShortcuts = ''" aria-label="清除"><icon-close :size="12"></icon-close></button>
  </div>
  <div class="wa-command__list">
    <div class="wa-command__group">
      <div class="wa-command__heading">导航</div>
      <button type="button" class="wa-command__item"><span class="wa-command__item-icon"><icon-home :size="14"></icon-home></span><span class="wa-command__item-label">首页</span><span class="wa-command__shortcut">⌘+H</span></button>
      <button type="button" class="wa-command__item"><span class="wa-command__item-icon"><icon-file :size="14"></icon-file></span><span class="wa-command__item-label">文档</span><span class="wa-command__shortcut">⌘+D</span></button>
      <button type="button" class="wa-command__item"><span class="wa-command__item-icon"><icon-folder :size="14"></icon-folder></span><span class="wa-command__item-label">项目</span><span class="wa-command__shortcut">⌘+P</span></button>
    </div>
    <div class="wa-command__group">
      <div class="wa-command__heading">操作</div>
      <button type="button" class="wa-command__item"><span class="wa-command__item-icon"><icon-search :size="14"></icon-search></span><span class="wa-command__item-label">搜索</span><span class="wa-command__shortcut">⌘+K</span></button>
      <button type="button" class="wa-command__item"><span class="wa-command__item-icon"><icon-settings :size="14"></icon-settings></span><span class="wa-command__item-label">设置</span><span class="wa-command__shortcut">⌘+,</span></button>
      <button type="button" class="wa-command__item"><span class="wa-command__item-icon"><icon-user :size="14"></icon-user></span><span class="wa-command__item-label">个人资料</span><span class="wa-command__shortcut">⌘+U</span></button>
    </div>
  </div>
</div>
""",
    ),
    M(
        "files",
        "文件搜索",
        "受控搜索过滤文件列表，用于全局找文件。",
        "输入绑定过滤；空态「未找到匹配文件」",
        "文件图标 + 文件名；过滤即时",
        """
<div class="wa-command">
  <div class="wa-command__search">
    <span class="wa-command__search-icon"><icon-search :size="15"></icon-search></span>
    <input class="wa-command__input" v-model="qFiles" type="text" placeholder="搜索文件…" autocomplete="off" />
    <button type="button" class="wa-command__clear" v-show="qFiles" @click="qFiles = ''" aria-label="清除"><icon-close :size="12"></icon-close></button>
  </div>
  <div class="wa-command__list">
    <template v-if="filteredFiles.length">
      <button type="button" class="wa-command__item" v-for="item in filteredFiles" :key="item.label">
        <span class="wa-command__item-icon"><component :is="item.icon" :size="14"></component></span>
        <span class="wa-command__item-label">{{ item.label }}</span>
      </button>
    </template>
    <div class="wa-command__empty" v-else>未找到匹配文件</div>
  </div>
</div>
""",
        setup="files",
    ),
    M(
        "people",
        "成员搜索",
        "带头像、邮箱与角色的人员列表，底部分隔可加操作。",
        "头像用 a-avatar 字母；角色作 meta；底部分隔 + 添加",
        "头像+姓名邮箱 + 右侧角色",
        """
<div class="wa-command">
  <div class="wa-command__search">
    <span class="wa-command__search-icon"><icon-search :size="15"></icon-search></span>
    <input class="wa-command__input" v-model="qPeople" type="text" placeholder="搜索成员…" autocomplete="off" />
    <button type="button" class="wa-command__clear" v-show="qPeople" @click="qPeople = ''" aria-label="清除"><icon-close :size="12"></icon-close></button>
  </div>
  <div class="wa-command__list">
    <button type="button" class="wa-command__item" v-for="u in people" :key="u.email">
      <div class="wa-command__person">
        <a-avatar :size="28" :style="{ background: u.bg, color: '#fff', fontSize: '11px' }">{{ u.initials }}</a-avatar>
        <div class="wa-command__person-text">
          <span class="wa-command__person-name">{{ u.name }}</span>
          <span class="wa-command__person-email">{{ u.email }}</span>
        </div>
      </div>
      <span class="wa-command__item-meta">{{ u.role }}</span>
    </button>
    <div class="wa-command__sep"></div>
    <button type="button" class="wa-command__item">
      <span class="wa-command__item-icon"><icon-plus :size="14"></icon-plus></span>
      <span class="wa-command__item-label">添加新成员</span>
    </button>
  </div>
</div>
""",
        setup="people",
    ),
    M(
        "actions",
        "快捷创建",
        "创建/上传类快捷操作分组，带快捷键。",
        "沟通 / 媒体 / 文档 三组",
        "分组创建动作 + 右侧快捷键",
        """
<div class="wa-command">
  <div class="wa-command__search">
    <span class="wa-command__search-icon"><icon-search :size="15"></icon-search></span>
    <input class="wa-command__input" v-model="qActions" type="text" placeholder="搜索操作…" autocomplete="off" />
    <button type="button" class="wa-command__clear" v-show="qActions" @click="qActions = ''" aria-label="清除"><icon-close :size="12"></icon-close></button>
  </div>
  <div class="wa-command__list">
    <div class="wa-command__group">
      <div class="wa-command__heading">沟通</div>
      <button type="button" class="wa-command__item"><span class="wa-command__item-icon"><icon-email :size="14"></icon-email></span><span class="wa-command__item-label">新建邮件</span><span class="wa-command__shortcut">⌘+E</span></button>
      <button type="button" class="wa-command__item"><span class="wa-command__item-icon"><icon-message :size="14"></icon-message></span><span class="wa-command__item-label">新建消息</span><span class="wa-command__shortcut">⌘+M</span></button>
      <button type="button" class="wa-command__item"><span class="wa-command__item-icon"><icon-calendar :size="14"></icon-calendar></span><span class="wa-command__item-label">新建日程</span><span class="wa-command__shortcut">⌘+N</span></button>
    </div>
    <div class="wa-command__group">
      <div class="wa-command__heading">媒体</div>
      <button type="button" class="wa-command__item"><span class="wa-command__item-icon"><icon-image :size="14"></icon-image></span><span class="wa-command__item-label">上传图片</span><span class="wa-command__shortcut">⌘+I</span></button>
      <button type="button" class="wa-command__item"><span class="wa-command__item-icon"><icon-upload :size="14"></icon-upload></span><span class="wa-command__item-label">上传视频</span><span class="wa-command__shortcut">⌘+V</span></button>
      <button type="button" class="wa-command__item"><span class="wa-command__item-icon"><icon-folder :size="14"></icon-folder></span><span class="wa-command__item-label">上传音频</span><span class="wa-command__shortcut">⌘+A</span></button>
    </div>
    <div class="wa-command__group">
      <div class="wa-command__heading">文档</div>
      <button type="button" class="wa-command__item"><span class="wa-command__item-icon"><icon-file :size="14"></icon-file></span><span class="wa-command__item-label">新建文档</span><span class="wa-command__shortcut">⌘+D</span></button>
    </div>
  </div>
</div>
""",
    ),
    M(
        "settings",
        "设置搜索",
        "设置项分组列表：通用 / 安全 / 外观，组分隔。",
        "多 `.wa-command__group` + `.wa-command__sep`",
        "分组标题 + 设置项行；组分隔线",
        """
<div class="wa-command">
  <div class="wa-command__search">
    <span class="wa-command__search-icon"><icon-search :size="15"></icon-search></span>
    <input class="wa-command__input" v-model="qSettings" type="text" placeholder="搜索设置…" autocomplete="off" />
    <button type="button" class="wa-command__clear" v-show="qSettings" @click="qSettings = ''" aria-label="清除"><icon-close :size="12"></icon-close></button>
  </div>
  <div class="wa-command__list">
    <div class="wa-command__group">
      <div class="wa-command__heading">通用</div>
      <button type="button" class="wa-command__item"><span class="wa-command__item-icon"><icon-settings :size="14"></icon-settings></span><span class="wa-command__item-label">通用设置</span></button>
      <button type="button" class="wa-command__item"><span class="wa-command__item-icon"><icon-notification :size="14"></icon-notification></span><span class="wa-command__item-label">通知</span></button>
      <button type="button" class="wa-command__item"><span class="wa-command__item-icon"><icon-book :size="14"></icon-book></span><span class="wa-command__item-label">语言</span></button>
    </div>
    <div class="wa-command__sep"></div>
    <div class="wa-command__group">
      <div class="wa-command__heading">安全</div>
      <button type="button" class="wa-command__item"><span class="wa-command__item-icon"><icon-lock :size="14"></icon-lock></span><span class="wa-command__item-label">密码</span></button>
      <button type="button" class="wa-command__item"><span class="wa-command__item-icon"><icon-safe :size="14"></icon-safe></span><span class="wa-command__item-label">隐私</span></button>
    </div>
    <div class="wa-command__sep"></div>
    <div class="wa-command__group">
      <div class="wa-command__heading">外观</div>
      <button type="button" class="wa-command__item"><span class="wa-command__item-icon"><icon-moon :size="14"></icon-moon></span><span class="wa-command__item-label">主题</span></button>
    </div>
  </div>
</div>
""",
    ),
    M(
        "filter-tabs",
        "筛选标签",
        "输入下方切换「全部 / 文件 / 成员 / 命令」标签，默认展示提示词与最近搜索。",
        "`.wa-command__tabs` + tab 切换；列表随 tab 变化",
        "搜索框下胶囊标签；AI 提示与最近项",
        """
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
""",
        setup="tabs",
    ),
    M(
        "footer",
        "底栏键位",
        "自定义顶栏（筛选图标 + 关闭）与底栏导航键提示。",
        "`.wa-command__header` + `.wa-command__footer`；操作与关键词分组",
        "顶栏快捷键徽章；底栏 ↑↓ / esc",
        """
<div class="wa-command">
  <div class="wa-command__header">
    <span class="wa-command__search-icon"><icon-filter :size="15"></icon-filter></span>
    <input class="wa-command__input" v-model="qFooter" type="text" placeholder="智能搜索…" autocomplete="off" />
    <span class="wa-command__shortcut">⌘+M</span>
    <button type="button" class="wa-command__clear" aria-label="关闭"><icon-close :size="12"></icon-close></button>
  </div>
  <div class="wa-command__list">
    <div class="wa-command__group">
      <div class="wa-command__heading">操作</div>
      <button type="button" class="wa-command__item">
        <span class="wa-command__item-lead"><a-avatar :size="24" style="background:#64748b;color:#fff;font-size:10px">斯</a-avatar></span>
        <span class="wa-command__item-label">指派给斯蒙</span>
      </button>
      <button type="button" class="wa-command__item">
        <span class="wa-command__item-lead"><icon-user :size="14"></icon-user></span>
        <span class="wa-command__item-label">指派给…</span>
        <span class="wa-command__shortcut">A</span>
      </button>
      <button type="button" class="wa-command__item">
        <span class="wa-command__item-lead"><icon-close :size="14"></icon-close></span>
        <span class="wa-command__item-label">取消指派</span>
        <span class="wa-command__shortcut">U</span>
      </button>
    </div>
    <div class="wa-command__sep"></div>
    <div class="wa-command__group">
      <div class="wa-command__heading">关键词</div>
      <button type="button" class="wa-command__item">
        <span class="wa-command__item-lead"><a-avatar :size="24" style="background:#475569;color:#fff;font-size:10px">斯</a-avatar></span>
        <div class="wa-command__person-text">
          <span class="wa-command__person-name">斯蒙·普鲁辛</span>
          <span class="wa-command__person-email">simon@example.com</span>
        </div>
      </button>
      <button type="button" class="wa-command__item">
        <span class="wa-command__item-lead"><icon-file :size="14"></icon-file></span>
        <span class="wa-command__item-label">注册流程</span>
        <span class="wa-command__item-meta">Notion</span>
      </button>
      <button type="button" class="wa-command__item">
        <span class="wa-command__item-lead"><icon-apps :size="14"></icon-apps></span>
        <span class="wa-command__item-label">注册流程设计</span>
        <span class="wa-command__item-meta">MSP-10</span>
      </button>
      <button type="button" class="wa-command__item">
        <span class="wa-command__item-lead"><icon-exclamation-circle :size="14"></icon-exclamation-circle></span>
        <span class="wa-command__item-label">注册错误</span>
        <span class="wa-command__item-meta">MSD-10</span>
      </button>
    </div>
  </div>
  <div class="wa-command__footer">
    <span><span class="wa-command__kbd">↑</span><span class="wa-command__kbd">↓</span> 导航</span>
    <span><span class="wa-command__kbd">↵</span> 确认</span>
    <span><span class="wa-command__kbd">esc</span> 关闭</span>
  </div>
</div>
""",
    ),
]


def indent_html(html: str, spaces: int) -> str:
    pad = " " * spaces
    return "\n".join(pad + ln if ln.strip() else ln for ln in html.split("\n"))


def member_js(m: dict) -> str:
    kind = m.get("setup") or ""
    if kind == "cats":
        return """;(function () {
  const { ref, computed } = Vue
  WebArco.mount('#app', {
    setup() {
      const qCats = ref('')
      const cats = [
        { label: '电子产品', icon: 'icon-apps' },
        { label: '服装与时尚', icon: 'icon-user' },
        { label: '家居与园艺', icon: 'icon-home' },
        { label: '运动与户外', icon: 'icon-star' },
        { label: '美妆个护', icon: 'icon-safe' },
        { label: '图书与媒体', icon: 'icon-book' },
      ]
      const filteredCats = computed(() => {
        const s = (qCats.value || '').trim().toLowerCase()
        if (!s) return cats
        return cats.filter((x) => x.label.toLowerCase().includes(s))
      })
      return { qCats, filteredCats }
    },
  })
})()
"""
    if kind == "files":
        return """;(function () {
  const { ref, computed } = Vue
  WebArco.mount('#app', {
    setup() {
      const qFiles = ref('')
      const files = [
        { label: '文档.pdf', icon: 'icon-file' },
        { label: '演示文稿.pptx', icon: 'icon-file' },
        { label: '表格.xlsx', icon: 'icon-file' },
        { label: '照片.jpg', icon: 'icon-image' },
        { label: '压缩包.zip', icon: 'icon-folder' },
        { label: '笔记.txt', icon: 'icon-file' },
      ]
      const filteredFiles = computed(() => {
        const s = (qFiles.value || '').trim().toLowerCase()
        if (!s) return files
        return files.filter((x) => x.label.toLowerCase().includes(s))
      })
      return { qFiles, filteredFiles }
    },
  })
})()
"""
    if kind == "people":
        return """;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        qPeople: ref(''),
        people: [
          { name: '张伟', email: 'zhangwei@example.com', role: '开发', initials: '张', bg: 'rgb(var(--primary-6))' },
          { name: '李娜', email: 'lina@example.com', role: '设计', initials: '李', bg: 'rgb(var(--success-6))' },
          { name: '王强', email: 'wangqiang@example.com', role: '经理', initials: '王', bg: 'rgb(var(--warning-6))' },
          { name: '赵敏', email: 'zhaomin@example.com', role: '开发', initials: '赵', bg: 'rgb(var(--danger-6))' },
        ],
      }
    },
  })
})()
"""
    if kind == "tabs":
        return """;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return { tab: ref('all'), qTabs: ref('') }
    },
  })
})()
"""
    qmap = {
        "shortcuts": "qShortcuts",
        "actions": "qActions",
        "settings": "qSettings",
        "footer": "qFooter",
    }
    qname = qmap.get(m.get("subdir") or "")
    if qname:
        return f""";(function () {{
  const {{ ref }} = Vue
  WebArco.mount('#app', {{
    setup() {{
      return {{ {qname}: ref('') }}
    }},
  }})
}})()
"""
    return """;(function () {
  WebArco.mount('#app', {})
})()
"""


def write_member(m: dict) -> None:
    d = COMP / m["subdir"]
    d.mkdir(parents=True, exist_ok=True)
    body = indent_html(m["html"], 8)
    embed = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <script src="../../../assets/common/js/theme.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{m["label"]} · {m["slug"]}</title>
  <link rel="stylesheet" href="../../../vendor/arco/css/arco.css" />
  <link rel="stylesheet" href="../../../assets/common/css/chrome.css" />
  <link rel="stylesheet" href="../../../assets/common/css/global.css" />
  <link rel="stylesheet" href="../../../vendor/fontawesome/css/all.min.css" />
  <link rel="stylesheet" href="../../../assets/common/css/fa-icons.css" />
  <link rel="stylesheet" href="../../../assets/common/css/components.css" />
  <link rel="stylesheet" href="../../index.css" />
  <link rel="stylesheet" href="../component.css" />
</head>
<body class="wa-preview-embed">
  <div id="app" v-cloak>
    <article class="wa-card wa-embed wa-preview-stage" data-slug="{m["slug"]}">
      <div class="wa-comp-meta wa-preview-chrome">
        <span class="wa-comp-meta__name">{m["label"]}</span>
        <span class="wa-comp-meta__slug">{m["slug"]}</span>
      </div>
      <div class="wa-embed__stage">
{body}
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
    (d / "index.html").write_text(embed, encoding="utf-8", newline="\n")
    (d / "component.js").write_text(member_js(m), encoding="utf-8", newline="\n")
    siblings = "\n".join(
        f'| `{x["slug"]}` | `components/{FAMILY}/{x["subdir"]}/` |'
        + (" （本条）" if x["slug"] == m["slug"] else "")
        + " |"
        for x in MEMBERS
    )
    script_note = (
        "\n- **脚本落地**：把同目录 `component.js` 中的过滤/弹层逻辑**并入**宿主页 JS；预览挂载壳不拷。"
        if m.get("setup")
        else ""
    )
    prompt = f"""# {m["label"]}

> 状态：preview · slug：`{m["slug"]}` · 类型：component · 母版：web · surface：general · category：`{CATEGORY}`

## 1. 角色与目标

实现「{m["label"]}」（`{m["slug"]}`）。{m["lead"]}

成功标准：业务页出现与 §5 一致的真控件（非说明文案冒充）。

## 2. 实现路径（只走一条）

- **A**（有母版）：**整段粘贴 §5** 到业务页；换文案只改片段内汉字。本条只含一种形态；其它态复制兄弟 slug 提示词。禁止拼装多态橱窗。
- **B**（无母版 / 其它栈）：按 §5 还原本形态。视觉跟宿主库。
- **样式落地**：将家族 `components/{FAMILY}/component.css` 规则**并入**宿主 CSS。{script_note}

## 3. 约束

- **本提示词只含这一种形态**
- 交互：{m["rules"]}
- 搜索图标在输入左侧（对照 shadcn CommandInput）；勿用 a-input-search 默认右图标布局冒充
- 私有样式真源在 `components/{FAMILY}/component.css`
- Vue 模板内自定义标签勿写成自闭合

## 4. 视觉规格

- 布局 / 层级 / 强调：{m["visual"]}
- 动效：仅 hover/focus；Shine / Glow → `animations/`
- 颜色：只用 `--wa-*` / Arco token

## 5. 直接粘贴

```html
{m["html"]}
```

## 6. 验收

- [ ] 落地与 §5 同构（允许改文案）
- [ ] 未混入其它形态或整页橱窗

## 7. 预览

`components/{FAMILY}/{m["subdir"]}/index.html`

## 8. 兄弟形态（同家族）

| slug | 路径 | |
|------|------|--|
{siblings}
"""
    (d / "prompt.md").write_text(prompt, encoding="utf-8", newline="\n")


def fam_card(m: dict) -> str:
    body = indent_html(m["html"], 14)
    btn = COPY_BTN.format(slug=m["slug"])
    return f"""          <div class="wa-fam-card" data-slug="{m["slug"]}">
            <div class="wa-fam-card__top">
              <div class="wa-comp-meta"><span class="wa-comp-meta__name">{m["label"]}</span><span class="wa-comp-meta__slug">{m["slug"]}</span></div>
{btn}
            </div>
            <div class="wa-fam-card__stage">
{body}
            </div>
          </div>"""


def write_family() -> None:
    COMP.mkdir(parents=True, exist_ok=True)
    keep = {m["subdir"] for m in MEMBERS}
    for child in list(COMP.iterdir()):
        if child.is_dir() and child.name not in keep:
            shutil.rmtree(child)
            print("removed", child.relative_to(ROOT).as_posix())

    types = " / ".join(m["subdir"] for m in MEMBERS)
    cards = "\n".join(fam_card(m) for m in MEMBERS)
    members_js = ", ".join(f"'{m['slug']}'" for m in MEMBERS)
    html = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <script src="../../assets/common/js/theme.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>命令菜单 · 家族对照</title>
  <link rel="stylesheet" href="../../vendor/arco/css/arco.css" />
  <link rel="stylesheet" href="../../assets/common/css/chrome.css" />
  <link rel="stylesheet" href="../../assets/common/css/global.css" />
  <link rel="stylesheet" href="../../vendor/fontawesome/css/all.min.css" />
  <link rel="stylesheet" href="../../assets/common/css/fa-icons.css" />
  <link rel="stylesheet" href="../../assets/common/css/components.css" />
  <link rel="stylesheet" href="../index.css" />
  <link rel="stylesheet" href="./component.css" />
</head>
<body>
  <div id="app" v-cloak>
    <section class="wa-fam-section wa-fam-fade-in" data-family="{FAMILY}">
      <div class="wa-fam-section__inner">
        <header class="wa-fam-head">
          <p class="wa-fam-kicker">{FAMILY}</p>
          <h1 class="wa-fam-title">命令菜单</h1>
          <p class="wa-fam-lead">可搜索的快捷操作列表，适合 Cmd+K 调色板与全局跳转。</p>
          <p class="wa-fam-lead">组件类型：{types}</p>
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
      id: '{FAMILY}',
      members: [{members_js}],
      setup: function (api) {{
        var qCats = api.ref('')
        var qFiles = api.ref('')
        var cats = [
          {{ label: '电子产品', icon: 'icon-apps' }},
          {{ label: '服装与时尚', icon: 'icon-user' }},
          {{ label: '家居与园艺', icon: 'icon-home' }},
          {{ label: '运动与户外', icon: 'icon-star' }},
          {{ label: '美妆个护', icon: 'icon-safe' }},
          {{ label: '图书与媒体', icon: 'icon-book' }},
        ]
        var files = [
          {{ label: '文档.pdf', icon: 'icon-file' }},
          {{ label: '演示文稿.pptx', icon: 'icon-file' }},
          {{ label: '表格.xlsx', icon: 'icon-file' }},
          {{ label: '照片.jpg', icon: 'icon-image' }},
          {{ label: '压缩包.zip', icon: 'icon-folder' }},
          {{ label: '笔记.txt', icon: 'icon-file' }},
        ]
        return {{
          qCats: qCats,
          qFiles: qFiles,
          qShortcuts: api.ref(''),
          qPeople: api.ref(''),
          qActions: api.ref(''),
          qSettings: api.ref(''),
          qTabs: api.ref(''),
          qFooter: api.ref(''),
          tab: api.ref('all'),
          people: [
            {{ name: '张伟', email: 'zhangwei@example.com', role: '开发', initials: '张', bg: 'rgb(var(--primary-6))' }},
            {{ name: '李娜', email: 'lina@example.com', role: '设计', initials: '李', bg: 'rgb(var(--success-6))' }},
            {{ name: '王强', email: 'wangqiang@example.com', role: '经理', initials: '王', bg: 'rgb(var(--warning-6))' }},
            {{ name: '赵敏', email: 'zhaomin@example.com', role: '开发', initials: '赵', bg: 'rgb(var(--danger-6))' }},
          ],
          filteredCats: api.computed(function () {{
            var s = (qCats.value || '').trim().toLowerCase()
            if (!s) return cats
            return cats.filter(function (x) {{ return x.label.toLowerCase().indexOf(s) !== -1 }})
          }}),
          filteredFiles: api.computed(function () {{
            var s = (qFiles.value || '').trim().toLowerCase()
            if (!s) return files
            return files.filter(function (x) {{ return x.label.toLowerCase().indexOf(s) !== -1 }})
          }}),
        }}
      }},
    }}
  </script>
  <script src="../copy-prompt.js"></script>
  <script src="../family.js"></script>
</body>
</html>
"""
    (COMP / "index.html").write_text(html, encoding="utf-8", newline="\n")
    (COMP / "component.css").write_text(CSS, encoding="utf-8", newline="\n")


def update_catalog() -> None:
    data = load_catalog()
    comps = [
        c
        for c in data["components"]
        if c.get("family") != FAMILY and not str(c.get("slug", "")).startswith(f"{FAMILY}-")
    ]
    insert_at = next(
        (i + 1 for i, c in enumerate(comps) if str(c.get("slug", "")).startswith("attachment-")),
        len(comps),
    )
    # place after last attachment
    for i, c in enumerate(comps):
        if str(c.get("slug", "")).startswith("attachment-"):
            insert_at = i + 1
    new_comps = [
        {
            "slug": m["slug"],
            "label": m["label"],
            "surface": "general",
            "status": "preview",
            "tier": "free",
            "path": f"components/{FAMILY}/{m['subdir']}",
            "usedByBlocks": [],
            "notes": f"家族 {FAMILY} / {m['subdir']}；对照 shadcnuikit command",
            "category": CATEGORY,
            "tags": [],
            "family": FAMILY,
        }
        for m in MEMBERS
    ]
    comps[insert_at:insert_at] = new_comps
    data["components"] = comps
    for fam in data.get("families", []):
        if fam.get("slug") == FAMILY:
            fam["members"] = [m["slug"] for m in MEMBERS]
            fam["notes"] = "对照 shadcnuikit；成员在 " + "/".join(m["subdir"] for m in MEMBERS)
            break
    save_catalog(data)


def main() -> None:
    for m in MEMBERS:
        write_member(m)
        print("member", m["slug"])
    write_family()
    update_catalog()
    print("done")


if __name__ == "__main__":
    main()
