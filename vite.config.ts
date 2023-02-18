import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import Unocss from "unocss/vite";
import presetUno from "@unocss/preset-uno";
import path from "path";
import { presetWebFonts } from "unocss";

export default defineConfig({
  plugins: [
    react(),
    Unocss({
      presets: [
        presetUno(),
        presetWebFonts({
          provider: "google",
          fonts: {
            normal: "Open Sans",
            sans: "Open Sans",
            medium: "Open Sans",
            bold: "Open Sans",
          },
        }),
      ],
      theme: {
        colors: {
          primary: "#E5E5E5",
          secondary: "#FFFFFF",
          nav: {
            primary: "#232F3E",
            secondary: "#FFFFFF",
          },
        },
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
      "@services": path.resolve(__dirname, "./src/services"),
      "@modules": path.resolve(__dirname, "./src/modules"),
      "@stores": path.resolve(__dirname, "./src/stores"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@middleware": path.resolve(__dirname, "./src/middleware"),
    },
  },
});
