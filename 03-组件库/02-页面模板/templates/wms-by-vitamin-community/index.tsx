/**
 * @name 维生素社区版 WMS 原型
 *
 * 参考资料：
 * - /rules/design-guide.md
 * - /rules/development-guide.md
 * - /skills/figma-make-project-converter/SKILL.md
 *
 * 固定目录结构：
 * - 根目录 `index.tsx` 只做 Axhub runtime adapter，不承载独立页面视觉实现
 * - `src/App.tsx` 只做 Figma export shell，不承载独立页面逻辑
 * - 页面视觉与路由收敛逻辑统一沉淀在 `src/components/**` / `src/styles/**`
 */
import "./style.css";
import React from "react";

import WmsCommunityPrototype from "./src/components/WmsCommunityPrototype";

export default function WmsByVitaminCommunity() {
  return <WmsCommunityPrototype />;
}
