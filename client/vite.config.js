import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
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
