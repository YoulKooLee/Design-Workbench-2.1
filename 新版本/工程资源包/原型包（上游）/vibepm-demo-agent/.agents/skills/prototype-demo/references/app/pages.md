# APP 增页 / 多屏约定

创建见技能 `SKILL.md` 流程 A · app、`./style.md`、`./shells.md`、`./recipes.md`。本文管**已有交付根上加屏或改屏**。

## 前置

1. 锁定交付根；读 `.prototype-config.json`。  
2. 缺 `shell` / `styleSource` → 先按 `../config.md`「app 旧根补字段」写回。  
3. 延续壳与 Style；不重问（除非用户明确换壳/换 Style）。  
4. 同名 html 先问再写。

## 决策表

| 场景 | 做法 |
| --- | --- |
| 新开交付 / 换壳 | 拷 `assets/app-recipes/<id>/` 或 `frame/app/<shell>` → 填 `app-shell` |
| 同壳加内容屏 | **优先**同 html 内多 `section`/面板切换 |
| 同壳多入口 url | 同级多 `*.html`（共用同一壳系列与相对路径） |
| 业务样式/脚本 | 页级或并入已有；**禁止**改设备外框 CSS 做动效 |
| 第三方图标库 / 第三方特效**包** | `vendor/<name>/`（如 FA） |
| 本站 SVG / favicon | `assets/icons/`（少则可放 `images/`） |
| 本站多页共用特效 | `assets/effects/{名}/` |
| 仅本页装饰特效 | `css|js/{名}.*`（不进 effects / vendor） |

## 壳与内容

- 业务 UI **只**写在 `main.screen-content > section.app-shell`（或等价节点）内。  
- **不**删除、不动画化设备外框（刘海、Home Indicator、手机框等）。  
- 补齐缺失的 `vendor` / `assets/fonts`；路径相对本交付根（`../delivery-structure.md`）。

## 禁止

- 内容画在壳外；运行时引用 `frame/`。  
- 静默覆盖；CDN；改其它端目录。  
- 业务多页用子目录 `*/index.html`；第三方图标库/特效**包**整包塞进页级 `css/`/`js/` 或 `assets/icons|effects`（应进 `vendor/`）；本站特效误进 `vendor/`。  
- 有对应 recipe 仍从空白设备框起手。
