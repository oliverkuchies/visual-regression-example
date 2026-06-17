/// <reference types="vite/client" />

import { beforeEach, test } from "vitest";
import { page, userEvent } from "vitest/browser";
import contents from "../src/components/example/content.html?raw";
import "../src/components/example/styles.css";

beforeEach(async () => {
  await page.mark("render", () => {
    document.body.innerHTML = contents;
  });
});

test("hover", async () => {
  await page.getByRole("button", { name: "target" }).hover();
});

test("active", async () => {
  await page.getByRole("button", { name: "target" }).press();
});

test("focus", async () => {
  await page.getByRole("button", { name: "target" }).click();
});

test("focus visible", async () => {
  await page.mark("tab", async () => {
    await page.getByRole("button", { name: "Focus this before tab" }).click();
    await userEvent.tab();
  });
});
