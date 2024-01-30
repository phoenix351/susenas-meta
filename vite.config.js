import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import postcssImport from "postcss-import";
import postcssPresetEnv from "postcss-preset-env";

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.tsx",
            refresh: true,
        }),
        react(),
    ],
    css: {
        postcss: {
            plugins: [
                postcssImport(),
                postcssPresetEnv({
                    stage: 1,
                }),
            ],
        },
    },
});
