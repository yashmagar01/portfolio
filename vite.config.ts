import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";

export default defineConfig({
  plugins: [
    devtools({
      logging: false,
      eventBusConfig: { enabled: false },
      enhancedLogs: { enabled: false },
      consolePiping: { enabled: false },
      removeDevtoolsOnBuild: false,
      injectSource: { enabled: true },
    }),
    tanstackStart({ server: { entry: "server" } }),
    viteReact(),
    tailwindcss(),
  ],
  resolve: {
    tsconfigPaths: true,
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  css: { transformer: "lightningcss" },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-dom/client",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
    ],
  },
});
