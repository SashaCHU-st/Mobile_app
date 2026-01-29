import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  retries: 0,
  use: {
    baseURL: "http://localhost:19006",
    headless: true,
  },
  webServer: {
    command: "npx expo start --web --port 19006",
    url: "http://localhost:19006",
    reuseExistingServer: true,
    timeout: 120_000,
    env: {
      EXPO_NO_INTERACTIVE: "1",
      CI: "1",
    },
  },
});
