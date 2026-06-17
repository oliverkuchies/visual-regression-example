import { test, expect } from "vitest";
import { page } from "vitest/browser";
import { render } from "vitest-browser-react";
import { takeSnapshot, configure } from "@chromatic-com/vitest";
import { Button } from "@/components/retroui/Button";

test("default", async () => {
  await render(<Button>Submit</Button>);

  await expect
    .element(page.getByRole("button", { name: "Submit" }))
    .toBeInTheDocument();
});

test("hover", async () => {
  await render(<Button>Submit</Button>);

  await page.getByRole("button", { name: "Submit" }).hover();
});

test("many states", async () => {
  configure({ disableAutoSnapshot: true });

  await render(
    <Box>
      <Button>Default</Button>
      <Button>Testing</Button>
    </Box>,
  );
  await takeSnapshot("Default");

  await page.getByRole("button", { name: "Testing" }).hover();
  await takeSnapshot("Hover");

  await page.getByRole("button", { name: "Testing" }).press();
  await takeSnapshot("Press");
});

function Box({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "baseline",
        gap: 15,
        padding: 30,
      }}
    >
      {children}
    </div>
  );
}
