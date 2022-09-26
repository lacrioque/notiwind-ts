import { defineConfig, type Plugin } from "vite";
import vue from '@vitejs/plugin-vue'
import typescript from "@rollup/plugin-typescript";

export default defineConfig({
  plugins: [vue(), ({...typescript(), apply: 'build'} as Plugin)],
  build: {
    outDir: "dist",
    lib: {
      entry: "src/index.ts",
      name: "notiwind-ts",
      fileName: "index",
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
