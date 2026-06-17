import { test, expect } from "vitest";
import { page } from "vitest/browser";
import { render } from "vitest-browser-react";
import { configure } from "@chromatic-com/vitest";

configure({ title: "Pages/Sign out" });

test("default", async () => {
  await render(
    <div>
      <h1> Sign out</h1>
    </div>,
  );

  await expect
    .element(page.getByRole("heading", { name: "Sign out", level: 1 }))
    .toBeInTheDocument();
});

test("loading", async () => {
  await render(
    <div>
      <h1>Loading... | Sign out</h1>
    </div>,
  );

  await expect
    .element(
      page.getByRole("heading", { name: "Loading... | Sign out", level: 1 }),
    )
    .toBeInTheDocument();
});
