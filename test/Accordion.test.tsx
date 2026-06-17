import { test, expect } from "vitest";
import { page } from "vitest/browser";
import { render } from "vitest-browser-react";
import {
  configure,
  takeSnapshot,
  waitForIdleNetwork,
} from "@chromatic-com/vitest";

import { Accordion } from "@/components/retroui/Accordion";

test("default", async () => {
  await render(<Accordion header="Example header">Example content</Accordion>);

  // Accordion is present
  await expect
    .element(page.getByRole("button", { name: "Example header" }))
    .toBeInTheDocument();

  // Content is not visible by default
  await expect
    .element(page.getByText("Example content"))
    .not.toBeInTheDocument();
});

test("open", async () => {
  await render(
    <Accordion header="Example header">
      Example content
      <img
        src="https://raw.githubusercontent.com/vitest-dev/vitest/refs/heads/main/docs/public/og-original.png"
        alt="Vitest Logo"
      />
    </Accordion>,
  );

  // Open accordion
  await page.getByRole("button", { name: "Example header" }).click();

  // Content should be visible
  await expect.element(page.getByText("Example content")).toBeInTheDocument();
  await expect.element(page.getByAltText("Vitest Logo")).toBeInTheDocument();
});

test("multiple states", async () => {
  configure({ disableAutoSnapshot: true });

  await render(
    <Accordion header="Example header">
      Example content
      <img
        src="https://raw.githubusercontent.com/vitest-dev/vitest/refs/heads/main/docs/public/og-original.png"
        alt="Vitest Logo"
      />
    </Accordion>,
  );

  await takeSnapshot("default");

  // Open accordions
  const toggle = page.getByRole("button", { name: "Example header" });
  await toggle.click();

  // Wait for image to load
  await waitForIdleNetwork(1_000);

  // Content should be visible
  await expect.element(page.getByText("Example content")).toBeInTheDocument();
  await expect.element(page.getByAltText("Vitest Logo")).toBeInTheDocument();

  await takeSnapshot("open");

  await toggle.click();
  await expect
    .element(page.getByText("Example content"))
    .not.toBeInTheDocument();

  await takeSnapshot("closed");
});
