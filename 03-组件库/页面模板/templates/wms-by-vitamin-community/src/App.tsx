/**
 * Figma export shell only.
 *
 * Keep this file thin and route all shared page logic to `src/components/**`
 * so the Axhub runtime entry and Make export shell stay in sync.
 */
import React from "react";

import WmsCommunityPrototype from "./components/WmsCommunityPrototype";

export default function App() {
  return <WmsCommunityPrototype />;
}
