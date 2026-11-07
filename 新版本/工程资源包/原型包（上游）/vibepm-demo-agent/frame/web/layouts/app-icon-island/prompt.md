# 图标岛侧栏

> 状态：`preview`  
> slug：`app-icon-island` · 类型：layout · 母版：`web` · surface：`app` · category：`sidebar`

## 1. 角色与目标

实现「图标岛侧栏」（`app-icon-island`），用于轻量工作台：左侧悬浮圆形品牌与胶囊形图标岛，主列浮层顶栏 + 内容。与贴边 `app-icon-rail` / `app-dual-rail` 分区不同——导航不贴边、无第二列面板。

成功标准：能辨认圆形品牌 + 胶囊岛 + 主列；图标岛有选中态；窄屏岛进抽屉。

## 2. 实现路径（只走一条）

- **A**（有母版）：**先查** `layouts/app-icon-island/` → **有则复用预览框架并按 §5 填槽**，勿无故按 §7 重写。
- **B**（无母版 / 其它栈）：只还原框架信息架构。视觉跟宿主库。禁止外网 CDN。
- **样式落地**：多页共用允许交付内一份 `css/layout-app-icon-island.css`；单页并入宿主 CSS。
- **脚本落地**：选中入口 / 抽屉并入宿主 `js/<page>.js`；预览挂载框架不拷。

## 3. 约束

- 类名 `wa-layout*`；禁止拷 Admin ProShell 运行时
- 默认 density=compact；颜色用 `--wa-*` / `--wa-shell-*`
- 内容区仅占位；禁止外网 CDN
- 响应式：≤768px 图标岛进抽屉
- 交互：点岛内图标切换当前入口；无收起第二列（本壳无第二列）
- **不要**做成贴边双轨或带文字的 `app-icon-rail`

## 4. 视觉规格

- 页面底为浅底；左侧留白，品牌圆与图标岛悬浮
- 品牌：独立圆形主色块，与岛分离
- 图标岛：白底胶囊（大圆角）、轻阴影；图标纵向居中；选中为浅主色圆底
- 主列：顶栏可做成浮层条；内容区与岛有间距
- 明暗跟随 `theme.js`

## 5. 可变槽位

| 槽位 | 说明 | 示例 |
|------|------|------|
| brand | 悬浮圆形 Logo | 主色圆 + 图标 |
| island | 胶囊内图标入口 | 概览 / 成员 / 日历 / 消息 / 文件 / 分析 / 设置 |
| navbar | 主列浮层顶栏 | 搜索入口 / 框架切换 / 用户 |
| content | 主内容区 | 引导卡 |

## 6. 验收

- [ ] 圆形品牌与胶囊岛分离悬浮，不贴边
- [ ] 岛内图标可切换选中
- [ ] 无第二列面板；与 `app-icon-rail` 可区分
- [ ] 无 ProShell 运行时、无 CDN

## 7. 参考结构（骨架）

```html
<div class="wa-layout wa-layout--side wa-layout--icon-island">
  <aside class="wa-layout__sider">
    <a class="wa-layout__brand wa-layout__brand--island">{{brand}}</a>
    <div class="wa-layout__island">
      <nav class="wa-layout__island-nav">
        <button class="wa-layout__island-item is-active" aria-label="概览">
          <i class="wa-layout__nav-icon"></i>
        </button>
      </nav>
    </div>
  </aside>
  <div class="wa-layout__main">
    <header class="wa-layout__navbar wa-layout__navbar--island">{{navbar}}</header>
    <main class="wa-layout__content">{{content}}</main>
  </div>
</div>
```

## 8. 关联

| 路径 | 说明 |
|------|------|
| `layouts/app-top-island/` | 同源视觉；岛置于顶栏 |
