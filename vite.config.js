import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

// Unique build version stamped at build time — forces new SW cache on every deploy
const BUILD_VERSION = Date.now().toString();

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      includeAssets: ["logo.png"],
      manifest: {
        name: "School Management System",
        short_name: "SMS",
        description: "A comprehensive school management system.",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "logo.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "logo.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        // Unique prefix ensures a brand-new cache is created on every deploy
        cacheId: `apsacs-v${BUILD_VERSION}`,
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff,woff2,json}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
        navigateFallback: "index.html",
        navigateFallbackAllowlist: [/^(?!\/__).*/],
        runtimeCaching: [],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Enable minification and optimize chunks
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: false, // Remove console logs in production if needed
        drop_debugger: true,
      },
      mangle: true,
      format: {
        comments: false,
      },
    },
    // Optimize chunks for better code splitting
    rollupOptions: {
      output: {
        // Manual chunk splitting by route and feature
        manualChunks(id) {
          // Split vendor libraries
          if (id.includes("node_modules")) {
            // React ecosystem
            if (
              id.includes("react") ||
              id.includes("react-router-dom") ||
              id.includes("@vitejs")
            ) {
              return "react-vendor";
            }
            // UI/Animation libraries
            if (
              id.includes("framer-motion") ||
              id.includes("@radix-ui") ||
              id.includes("lucide-react")
            ) {
              return "ui-vendor";
            }
            // Data fetching
            if (id.includes("@apollo/client") || id.includes("graphql")) {
              return "data-vendor";
            }
            // PDF and export libraries
            if (id.includes("jspdf") || id.includes("html-to-image")) {
              return "export-vendor";
            }
            // Default vendor chunk
            return "vendor";
          }

          // Split feature modules by route
          if (id.includes("src/routes/StudentRoutes")) {
            return "student-routes";
          }
          if (id.includes("src/routes/SuperAdminRoutes")) {
            return "admin-routes";
          }
          if (id.includes("src/routes/TeacherRoutes")) {
            return "teacher-routes";
          }
          if (id.includes("src/routes/PrincipleRoutes")) {
            return "principle-routes";
          }
          if (id.includes("src/routes/AccountantRoutes")) {
            return "accountant-routes";
          }
          if (id.includes("src/routes/SectionHeadRoutes")) {
            return "sectionhead-routes";
          }

          // Core features
          if (id.includes("src/features/chatbot")) {
            return "chatbot-feature";
          }
          if (id.includes("src/features/communication")) {
            return "communication-feature";
          }
          if (id.includes("src/features/dashboard")) {
            return "dashboard-feature";
          }
          if (id.includes("src/features/onboarding")) {
            return "onboarding-feature";
          }
          if (id.includes("src/features/finance")) {
            return "finance-feature";
          }
        },
      },
    },
    // Optimize CSS
    cssCodeSplit: true,
    sourcemap: false, // Disable sourcemaps in production for smaller bundle
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000, // Warn if chunks exceed 1MB
  },
  // Performance hints
  server: {
    middlewareMode: false,
    hmr: {
      protocol: "ws",
      host: "localhost",
      port: 5173,
    },
  },
});
