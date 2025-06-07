import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/styles/index.css";
import App from "@/sidepanel/App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
