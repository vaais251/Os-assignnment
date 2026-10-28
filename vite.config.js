import { defineConfig } from "vite";
export default defineConfig({
  base: "./",
  server: { watch: { ignored: ["**/tmp/**", "**/submission/**", "**/docs/**"] } },
  test: { environment: "jsdom", setupFiles: "./tests/setup.js" },
});
