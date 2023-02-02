import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import Unocss from "unocss/vite";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    Unocss({
      shortcuts: {},
      theme: {
        colors: {},
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@tests": path.resolve(__dirname, "./src/tests"),
      "@routers": path.resolve(__dirname, "./src/routers"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@utils": path.resolve(__dirname, "./src/utilities"),
      "@service": path.resolve(__dirname, "./src/service"),
      "@modules": path.resolve(__dirname, "./src/modules"),
      "@stores": path.resolve(__dirname, "./src/stores"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
    },
  },
});
