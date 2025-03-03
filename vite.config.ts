import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path';  // ESM 语法（Node 16+）


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {},
  },
  server: {
    port: 3000, // 你可以根据需要更改端口
  },
});
