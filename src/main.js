import "./styles/theme.css";
import "./styles/components.css";
import "./styles/style.css";
import "./styles/impact.css";

import { startApp } from "./app.js";

startApp();

if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js")
      .catch(error => console.warn("AgroTorch offline shell registration failed:", error));
  });
}
