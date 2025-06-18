import path from "path";
import { fileURLToPath } from "url";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  base: "./",

  plugins: [
    react(),
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: "src/background/background.js",
          dest: "background",
        },
        {
          src: "src/content/style/style.css",
          dest: "style",
        },
        {
          src: "src/content/script/*",
          dest: "content",
        },
        {
          src: "src/constants/*",
          dest: "constants",
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        "src/sidepanel/index": path.resolve(__dirname, "src/sidepanel/index.html"),
        loginPopup: path.resolve(__dirname, "loginPopup.html"),
      },
    },
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    historyApiFallback: true,
  },
});
