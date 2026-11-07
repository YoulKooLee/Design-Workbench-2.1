# Style 选型（APP · 创建时）

**创建** `app/`（流程 A）：用下文「创建三问话术」一次问清 Style + 壳，再 scaffold / 写首页。  
**增页**延续已有配置与 `assets/common/css/global.css`，不重问 Style（换肤见 `../web/style.md`「换主题」）。

---

## 创建三问话术（固定）

用户未指定时，**同轮只发下面这一段**；已指定的项跳过。

```text
创建 APP 原型前确认 3 点（直接回复序号或关键词即可）：

1）风格 Style
   - 包内：frame/.style/ 下 *-style.md（可对同名预览）
   - 或口述主色
   - 或回复「默认」（= 亮色科技蓝）

2）壳系列 shellFamily
   - ios｜常规 H5 / iOS 观感（默认）
   - wechat｜小程序 / 微信观感

3）导航形态（映射到具体壳文件；见 shells.md / recipes.md）
   - 纯内容 → ios_frame / wechat-frame
   - 仅顶栏 → *_header
   - 仅底部 Tab → *_tabs（仅当需要底部一级导航）
   - 顶栏 + Tab → *_nav
```

定案后写入：`styleSource`、`shell`、`shellFamily`；`vendorProfile` 默认 `lean`。  
**「默认」Style** = `frame/.style/亮色科技蓝-style.md` → 写入 `styleSource: ".style/亮色科技蓝-style.md"`（母版 `global.css` 已出厂烘焙；未改母版时可沿用，换其它 Style 再整文件重写）。  
首页优先拷 `assets/app-recipes/` 对应 recipe（见 `./recipes.md`）。

---

## 与 WEB 共用的规则

下列内容 **以 `../web/style.md` 为准**，勿在本文重复维护：

- `frame/.style/` 枚举与字体本地化、预览同步（含 Motion）、清多皮、换主题  

落实时：读选定 `*-style.md` → 按 `web/style.md` **整文件重写**本端 `assets/common/css/global.css` 与 `assets/fonts/`；**含清多皮**。  
**禁止**改写或整文件覆盖 `assets/common/css/chrome.css`（设备壳结构，对齐 WEB 的 chrome / global 分工）。  
特效落点见 `../delivery-structure.md`：**第三方特效包** → `vendor/<name>/`；**本站多页共用** → `assets/effects/{名}/`；**仅本页** → `css|js/{名}.*`。勿把本站特效塞进 `vendor/`。

---

## CSS 分工（对齐 WEB）

| 文件 | 职责 | 换肤 / 烘焙 Style |
| --- | --- | --- |
| `assets/common/css/chrome.css` | 设备外框、状态栏、顶栏、Tab、Home Indicator、Gallery、窄屏去壳 | **不动** |
| `assets/common/css/global.css` | 色板 / 字体 / `--brand` / Vant 桥接（视觉真源；出厂默认 **亮色科技蓝**） | **整文件重写** |
| `css/*-frame*.css` | 各导航形态壳差异 | 一般不随主题整换 |

页引入顺序：`chrome.css` → `global.css` → 壳形态 `css/*-frame*.css`。

---

## APP 差异（仅此节）

1. 交付根为 `app/`（或用户指定）；路径相对壳页。  
2. 主题与动效只作用在 `app-shell` 内；**不破坏、不动画化**设备外框；模板 frame CSS **不**整页引用进交付。  
3. Motion 同 `web/style.md` **E**；屏内入场按 `frontend-design.md` / `component.md`。  
4. 配置：`styleSource`、`shell`、`shellFamily`；可选 `stylePrimary`、`vendorProfile`。  
5. Vant：用 CSS 变量映射主题色，勿改 vendor。  
6. 结构：`component.md` + `shells.md` + `recipes.md`。

**admin** 不询问 Style。
