import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tsPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
export default defineConfig({
  plugins: [
    tsPaths(),
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    svgr(),
  ],
});
