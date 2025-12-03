import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tsPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";

const APP = "./src/app";
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      routesDirectory: `${APP}/routes`,
    }),
    tsPaths(),
    react({
      babel: {
        plugins: [
          ["@babel/plugin-proposal-decorators", { legacy: true }],
          ["@babel/plugin-proposal-class-properties", { loose: true }],
          ["babel-plugin-react-compiler"],
        ],
      },
    }),
    svgr(),
  ],
});
