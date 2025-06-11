import path from "path";
import { fileURLToPath } from "url";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
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
        sidepanel: path.resolve(__dirname, "src/sidepanel/index.html"),
        captureOverlay: path.resolve(__dirname, "src/content/captureOverlay.js"),
      },
      output: {
        entryFileNames: (chunk) => {
          if (chunk.name === "captureOverlay") {
            return "captureOverlay.js";
          }
          return "assets/[name]-[hash].js";
        },
      },
    },
    outDir: "dist",
    emptyOutDir: true,
  },
});
