import { defineConfig } from "vite";
import banner from "vite-plugin-banner";
import fs from "fs";

const licenseBanner = fs.readFileSync("./LICENSE", "utf8");

export default defineConfig({
  build: {
    lib: {
      entry: "index.js",
      name: "AstronomySVG",
      formats: ["iife", "es"],
      fileName: (format) =>
        format === "iife"
          ? "astronomy-svg.min.js"
          : `astronomy-svg.${format}.js`,
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
  },
  plugins: [banner(licenseBanner)],
});
