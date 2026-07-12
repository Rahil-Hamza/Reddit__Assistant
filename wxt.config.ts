import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],

  manifest: ({ browser, manifestVersion, mode, command }) => {
    return {
      manifest_version: 2,
      name: "WXT Example",
      description: "WXT Example",
      version: "1.0.0",
      permissions: ["storage", "tabs"],
    };
  },
});
