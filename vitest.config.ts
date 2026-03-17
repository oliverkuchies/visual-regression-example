import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";
import react from "@vitejs/plugin-react";
import { chromaticPlugin } from "@chromatic-com/vitest/plugin";

export default defineConfig({
  plugins: [react(), chromaticPlugin()],

  server: {
    fs: { strict: false },
  },
  test: {
    browser: {
      enabled: true,
      headless: true,
      screenshotFailures: false,
      provider: playwright(),
      instances: [{ browser: "chromium" }],
    },
  },
});
