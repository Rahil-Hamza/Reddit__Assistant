import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  // extensionApi: "chrome",
  modules: ["@wxt-dev/module-react"],

  manifest: ({ browser, manifestVersion, mode, command }) => {
    return {
      manifest_version: 2,
      name: "My Reddit Buddy",
      description: "WXT Example-1",
      version: "1.0.0",
      permissions: ["storage", "tabs"],
    };
  },
});
