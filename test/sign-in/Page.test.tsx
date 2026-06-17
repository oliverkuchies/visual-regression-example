import { test, expect } from "vitest";
import { page } from "vitest/browser";
import { render } from "vitest-browser-react";
import { configure } from "@chromatic-com/vitest";

configure({ title: "Pages/Sign in" });

test("default", async () => {
  await render(
    <div>
      <h1> Sign in</h1>
    </div>,
  );

  await expect
    .element(page.getByRole("heading", { name: "Sign in", level: 1 }))
    .toBeInTheDocument();
});

test("loading", async () => {
  await render(
    <div>
      <h1>Loading... | Sign in</h1>
    </div>,
  );

  await expect
    .element(
      page.getByRole("heading", { name: "Loading... | Sign in", level: 1 }),
    )
    .toBeInTheDocument();
});
