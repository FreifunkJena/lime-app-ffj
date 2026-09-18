import { lingui } from "@lingui/vite-plugin";
import preact from "@preact/preset-vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "vite";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, rootDir, "");
    const host = env.NODE_HOST || process.env.NODE_HOST || "10.13.0.1";
    const isProd = mode === "production";

    return {
        base: isProd ? "/app/" : "/",
        build: {
            outDir: "build",
            emptyOutDir: true,
            sourcemap: false,
            assetsDir: "assets",
        },
        resolve: {
            alias: {
                "~": path.resolve(rootDir, "src"),
                components: path.resolve(rootDir, "src/components"),
                containers: path.resolve(rootDir, "src/containers"),
                utils: path.resolve(rootDir, "src/utils"),
                plugins: path.resolve(rootDir, "plugins"),
            },
        },
        css: {
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true,
                },
            },
        },
        server: {
            host: true,
            port: 8080,
            strictPort: true,
            proxy: {
                "/ubus": {
                    target: `http://${host}`,
                    changeOrigin: true,
                },
                "/cgi-bin": {
                    target: `http://${host}`,
                    changeOrigin: true,
                },
            },
        },
        preview: {
            host: true,
            port: 8080,
            strictPort: true,
        },
        plugins: [
            preact({
                babel: {
                    plugins: ["@lingui/babel-plugin-lingui-macro"],
                },
            }),
            lingui(),
        ],
    };
});
