# 文字双轨

> 状态：`preview`  
> slug：`app-icon-rail` · 类型：layout · 母版：`web` · surface：`app` · category：`sidebar`

## 1. 角色与目标

实现「文字双轨」（`app-icon-rail`），用于工作台左侧八个模块入口：**看板 / 日历 / 项目 / 笔记 / 成员 / 通知 / 表单 / 设置**。与 `app-dual-rail` 分区相同（轨 + 第二列 + 主列），但第一轨是带文字的模块切换，不是分组图标换菜单树。

成功标准：轨上能读到八个中文入口；点击只换第二列面板；收起仍留带文字轨。

## 2. 实现路径（只走一条）

- **A**（有母版）：**先查** `layouts/app-icon-rail/` → **有则复用预览框架并按 §5 填槽**，勿无故按 §7 重写。
- **B**（无母版 / 其它栈）：只还原框架信息架构。视觉跟宿主库。禁止外网 CDN。
- **样式落地**：多页共用允许交付内一份 `css/layout-app-icon-rail.css`；单页并入宿主 CSS。
- **脚本落地**：模块切换 / 折叠 / 抽屉并入宿主 `js/<page>.js`；预览挂载框架不拷。

## 3. 约束

- 类名 `wa-layout*`；禁止拷 Admin ProShell 运行时
- 默认 density=compact；颜色用 `--wa-*` / `--wa-shell-*`
- 内容区仅占位；禁止外网 CDN
- 响应式：≤768px 轨与第二列进抽屉
- 交互：点轨切换 `moduleKey`（看板 / 日历 / 项目 / 笔记 / 成员 / 通知 / 表单 / 设置）；收起隐藏第二列、保留轨；主色导航只换第一轨
- 面板标题与模块动作（如「打开看板」）放在第二列顶栏；表单下拉 `popup-container="body"`，避免侧栏 overflow 裁切
- **不要**把这四个入口做成 `app-dual-rail` 的四个 preset

## 4. 视觉规格

- 侧栏 `flex-direction: row`：轨宽约 64px（窄轨，图标+两字标签）+ 第二列
- 轨按钮纵向：约 48px 宽；图标在上、12px 文字在下
- 选中为浅主色底 + 描边
- 第二列默认约 300px；日历列约 360–380px（迷你月历 + 当日待办）
- 收起时 sider 宽必须回到轨宽（勿被 is-mod-* 面板宽规则盖住）
- `is-sider-primary` 只换第一轨；设置面板可开关紧凑密度 / 主色导航 / 收起保留文字

## 5. 可变槽位

| 槽位 | 说明 | 示例 |
|------|------|------|
| brand | 轨顶 Logo | Vibe Design 标 |
| rail | 八个模块 | 看板 / 日历 / 项目 / 笔记 / 成员 / 通知 / 表单 / 设置 |
| panel | 当前模块面板 | 看板状态卡 / 日程待办 / 项目卡片列表 / 笔记 / 成员头像 / 通知 / 筛选表单 / 设置 |
| user | 轨底头像 | 同 app-dual-rail |
| crumb | 顶栏 | 首页 › 当前模块 |
| content | 主内容区 | 引导卡 |

## 6. 验收

- [ ] 轨上八个入口均有图标和文字
- [ ] 点击切换对应第二列，不拆成多套壳
- [ ] 与默认图标双轨（分组菜单）分区可区分
- [ ] 无 ProShell 运行时、无 CDN

## 7. 参考结构（骨架）

```html
<div class="wa-layout wa-layout--side wa-layout--dual wa-layout--icon-rail">
  <aside class="wa-layout__sider">
    <div class="wa-layout__rail">
      <nav class="wa-layout__rail-nav">
        <button class="wa-layout__rail-item wa-layout__rail-item--caption">
          <i class="wa-layout__nav-icon"></i>
          <span class="wa-layout__rail-caption">看板</span>
        </button>
      </nav>
    </div>
    <div class="wa-layout__panel">
      <div class="wa-layout__sider-head">
        <div class="wa-layout__panel-title">看板</div>
        <button type="button" class="wa-layout__panel-action">打开看板</button>
      </div>
      <div class="wa-layout__sider-inner">{{module panel}}</div>
    </div>
  </aside>
  <div class="wa-layout__main">{{navbar + content}}</div>
</div>
```
