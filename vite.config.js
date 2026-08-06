import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",
  envDir: "src",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        movieList: resolve(__dirname, "src/movieList/index.html"),
        moviePage: resolve(__dirname, "src/moviePage/index.html"),
        favorites: resolve(__dirname, "src/favorites/index.html"),
      },
    },
  },
});
