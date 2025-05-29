import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png"],
      manifest: {
        name: "learn.mtandaocentre",
        short_name: "learn.mtandaocentre",
        description: "a learning platform by mtandao centre",
        theme_color: "#1a1a2e",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      }
    }),
  ],
   resolve: {
    alias: {
      // Axios browser compatibility
      "axios/lib/platform/node/classes/FormData": "axios/lib/platform/browser/classes/FormData"
    }
  }
});