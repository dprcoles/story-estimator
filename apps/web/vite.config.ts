import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  build: {
    outDir: "build",
  },
  plugins: [
    react(),
    viteTsconfigPaths(),
    svgrPlugin(),
    {
      ...eslint(),
      apply: "build",
    },
    {
      ...eslint({
        failOnWarning: false,
        failOnError: false,
      }),
      apply: "serve",
      enforce: "post",
    },
  ],
  server: {
    open: true,
    port: 3000,
  },
});
