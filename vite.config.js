import vue from '@vitejs/plugin-vue'

export default {
    plugins: [vue()],
    build: {
        outDir: "dist",
        lib: {
            entry: "src/index.ts",
            name: "notiwind-ts",
            fileName: "index"
        },
        sourcemap: "inline",
        rollupOptions: {
            external: ["vue"],
            output: {
                exports: "named"
            }
        },
    }
}
