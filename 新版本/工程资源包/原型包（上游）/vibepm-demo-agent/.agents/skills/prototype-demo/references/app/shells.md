# APP 壳模板速览（frame/app）

选型时路径相对于 `frame/app/`；生成后落盘到交付根，禁止运行时引用 frame。

**创建时与 Style 同轮三问**：见 `./style.md`。优先交付态：`./recipes.md` / `assets/app-recipes/`。

| 模板文件 | recipe id | 说明 |
| --- | --- | --- |
| `ios_frame.html` | `ios-content` | iOS 纯内容 |
| `ios_frame_header.html` | `ios-header` | iOS 仅标题栏 |
| `ios_frame_tabs.html` | `ios-tabs` | iOS 仅底部标签栏 |
| `ios_frame_nav.html` | `ios-nav` | iOS 标题栏 + 标签栏 |
| `wechat-frame.html` | `wechat-content` | 微信纯内容 |
| `wechat-frame_header.html` | `wechat-header` | 微信仅标题栏 |
| `wechat-frame-tabs.html` | `wechat-tabs` | 微信仅底部标签栏 |
| `wechat-frame-nav.html` | `wechat-nav` | 微信标题栏 + 标签栏 |

- 常规 H5 优先 **ios**；小程序视觉用 **wechat**。  
- 未明确导航形态时用创建三问；**仅当需要底部一级导航**才选 tabs / nav。  
- 写入配置：`shell` = 上表文件名；`shellFamily` = `ios` | `wechat`。  
- 详细：`style.md`、`pages.md`、`component.md`、技能 `SKILL.md` A/B · app。
