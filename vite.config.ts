import { defineConfig, loadEnv } from "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    build: {
      outDir: "web"
    },
    server: {
      proxy: {
        "/api/my": {
          target: env.OPS_HOST || env.OPSDEV_HOST,
        changeOrigin: true
      }
    },
    host: "0.0.0.0",
    port: 5173,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
};
});
