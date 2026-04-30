import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      // Dev: проксируем API на локальный backend (5003),
      // чтобы фронт мог обращаться к /company, /mattress и т.д. через свой origin.
      // В docker задайте VITE_PROXY_TARGET=http://backend:5003
      "/uploads": { target: process.env.VITE_PROXY_TARGET || "http://localhost:5003", changeOrigin: true },
      "/admin": {
        target: process.env.VITE_PROXY_TARGET || "http://localhost:5003",
        changeOrigin: true,
        bypass(req) {
          // /admin и /admin/ — React-роут, не проксируем
          if (req.url === "/admin" || req.url === "/admin/") return req.url;
        },
      },
      "/company": { target: process.env.VITE_PROXY_TARGET || "http://localhost:5003", changeOrigin: true },
      "/mattress": { target: process.env.VITE_PROXY_TARGET || "http://localhost:5003", changeOrigin: true },
      "/shapes": { target: process.env.VITE_PROXY_TARGET || "http://localhost:5003", changeOrigin: true },
      "/mattress-type": { target: process.env.VITE_PROXY_TARGET || "http://localhost:5003", changeOrigin: true },
      "/mattress-rigidity": { target: process.env.VITE_PROXY_TARGET || "http://localhost:5003", changeOrigin: true },
      "/feedback": { target: process.env.VITE_PROXY_TARGET || "http://localhost:5003", changeOrigin: true },
      "/sitemap.xml": { target: process.env.VITE_PROXY_TARGET || "http://localhost:5003", changeOrigin: true },
    },
    allowedHosts: [
      'liron-fura.ru',  
      'www.liron-fura.ru',
      '194.58.126.194'
    ]
  },
  preview: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: [
      'liron-fura.ru',
      'www.liron-fura.ru',
      '194.58.126.194',
      'localhost',
      '127.0.0.1'
    ]
  }
});
