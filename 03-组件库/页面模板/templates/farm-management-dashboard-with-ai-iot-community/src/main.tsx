/**
 * Vite mount only for the original Figma Make bundle.
 *
 * The Axhub prototype runtime uses the root `index.tsx` adapter instead.
 */
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(<App />);
