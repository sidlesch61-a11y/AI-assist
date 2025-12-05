import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        ws: true, // Enable WebSocket proxying
      },
    },
  },
  build: {
    // Performance optimizations
    target: "esnext",
    minify: "esbuild",
    cssMinify: true,
    sourcemap: false, // Disable in production for smaller bundles
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks for better caching
          vendor: ["react", "react-dom", "react-router-dom"],
          ui: ["zustand"],
        },
      },
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "zustand"],
  },
});


