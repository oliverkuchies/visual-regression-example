import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { chromaticPlugin } from "@chromatic-com/vitest/plugin";

export default defineConfig({
  plugins: [react(), tailwindcss(), chromaticPlugin({ turboSnap: true })],

  resolve: {
    tsconfigPaths: true,
  },

  optimizeDeps: {
    force: true,
    include: ["react-dom/client"],
  },

  server: {
    fs: { strict: false },
  },
  test: {
    setupFiles: ["./test/setup.ts"],
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: "chromium" }],
      viewport: { width: 600, height: 400 },

      commands: {
        async holdMouseKey(context, selector: string, stack: Error["stack"]) {
          const frame = await context.frame();
          const box = await frame.locator(selector).boundingBox();

          if (!box) {
            throw new Error(
              `Could not find element with selector: ${selector}`,
            );
          }

          await context.page.mouse.move(
            box.x + box.width / 2,
            box.y + box.height / 2,
          );
          await context.page.mouse.down();
        },
      },
    },
  },
});

/** @internal */
declare module "vitest/browser" {
  interface BrowserCommands {
    holdMouseKey: (selector: string, stack: Error["stack"]) => Promise<void>;
  }
}
