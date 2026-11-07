# 图标岛顶栏

> 状态：`preview`  
> slug：`app-top-island` · 类型：layout · 母版：`web` · surface：`app` · category：`topnav`

## 1. 角色与目标

实现「图标岛顶栏」（`app-top-island`）：在 `app-icon-island` 视觉语言上，将**圆形品牌 + 胶囊图标岛**移到**顶栏**；岛**水平居中**，入口为**图标 + 文字**；主列全宽，无侧栏。

成功标准：左品牌+搜索 / 中岛居中（带文案）/ 右操作可辨认；图标有选中态；窄屏单行、岛带短文案可横滑。

## 2. 实现路径（只走一条）

- **A**（有母版）：**先查** `layouts/app-top-island/` → **有则复用预览框架并按 §5 填槽**，勿无故按 §7 重写。
- **B**（无母版 / 其它栈）：只还原框架信息架构。视觉跟宿主库。禁止外网 CDN。
- **样式落地**：多页共用允许交付内一份 `css/layout-app-top-island.css`；单页并入宿主 CSS。
- **脚本落地**：选中入口并入宿主 `js/<page>.js`；预览挂载框架不拷。

## 3. 约束

- 类名 `wa-layout*`；禁止拷 Admin ProShell 运行时
- 默认 density=compact；颜色用 `--wa-*` / `--wa-shell-*`
- 内容区仅占位；禁止外网 CDN
- 响应式：≤768px 保持单行；岛居中可横滑并保留短文案；搜索收为图标；隐藏主色/明暗切换与用户名；不进侧栏抽屉
- 交互：点岛内图标切换当前入口
- **不要**做成左侧悬浮岛（那是 `app-icon-island`）或贴边双轨

## 4. 视觉规格

- 页面底为浅底；顶栏品牌圆与横向胶囊岛悬浮，右侧为搜索 / 操作 / 用户浮块
- 品牌：独立圆形主色块，顶栏左侧
- 图标岛：白底横向胶囊、轻阴影；**顶栏水平居中**；每项图标在上、短文案在下；选中为浅主色圆角底
- 主列：内容区与顶栏有间距；无第二列面板
- 明暗跟随 `theme.js`

## 5. 可变槽位

| 槽位 | 说明 | 示例 |
|------|------|------|
| brand | 顶栏左侧圆形 Logo | 主色圆 + 图标 |
| search | LOGO 右侧搜索入口 | 胶囊「搜索页面…」 |
| island | 居中横向胶囊；图标+文字 | 概览 / 成员 / 日历 / 消息 / 文件 / 分析 / 设置 |
| actions | 顶栏右侧 | 框架切换 / 明暗 / 用户 |
| content | 主内容区 | 引导卡 |

## 6. 验收

- [ ] 圆形品牌左、带文字胶囊岛居中、操作右
- [ ] 岛内图标+文字可切换选中
- [ ] 无侧栏、无第二列；与 `app-icon-island` 可区分
- [ ] 无 ProShell 运行时、无 CDN

## 7. 参考结构（骨架）

```html
<div class="wa-layout wa-layout--top wa-layout--top-island">
  <header class="wa-layout__navbar wa-layout__navbar--top-island">
    <div class="wa-layout__navbar-left">
      <a class="wa-layout__brand wa-layout__brand--island">{{brand}}</a>
    </div>
    <div class="wa-layout__island">
      <nav class="wa-layout__island-nav">
        <button class="wa-layout__island-item is-active">
          <i class="wa-layout__nav-icon"></i>
          <span class="wa-layout__island-item-label">概览</span>
        </button>
      </nav>
    </div>
    <div class="wa-layout__navbar-right">{{actions}}</div>
  </header>
  <main class="wa-layout__content">{{content}}</main>
</div>
```

## 8. 关联

| 路径 | 说明 |
|------|------|
| `layouts/app-icon-island/` | 分叉源（侧栏图标岛） |
| `layouts/list.md` | 库存 |
