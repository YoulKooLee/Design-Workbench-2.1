import React from "react";
/**
 * Vite mount only.
 *
 * Keep this file thin and let `src/App.tsx` stay as the single Figma export
 * shell that reuses shared implementation from `src/components/**`.
 */
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
