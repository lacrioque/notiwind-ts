import { defineConfig, type Plugin } from "vite";
import vue from '@vitejs/plugin-vue'
import typescript from "@rollup/plugin-typescript";

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: "dist",
    lib: {
      entry: "src/index.ts",
      name: "notiwind-ts",
      fileName: (format) => `notiwind-ts.${format}.js`,
    },
    sourcemap: "inline",
    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named",
        globals: {
          vue: "vue",
        },
      },
    },
  },
});
