import { commands, Locator, locators } from "vitest/browser";
import "../src/index.css";

locators.extend({
  press() {
    const error = new Error();
    // @ts-expect-error -- it's there
    Error.captureStackTrace?.(error, this.press);
    return commands.holdMouseKey((this as Locator).selector, error.stack);
  },
});

declare module "vitest/browser" {
  interface LocatorSelectors {
    press(): Promise<void>;
  }
}
