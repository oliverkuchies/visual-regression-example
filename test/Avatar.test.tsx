import { test, onTestFinished } from "vitest";
import { render } from "vitest-browser-react";
import { http, HttpResponse } from "msw";
import { setupWorker } from "msw/browser";
import { takeSnapshot, configure } from "@chromatic-com/vitest";

import { Avatar } from "@/components/retroui/Avatar";

test("default", async () => {
  await render(
    <Avatar>
      <Avatar.Image
        src="https://avatars.githubusercontent.com/u/95747107?s=200&v=4"
        alt="Logo"
      />
    </Avatar>,
  );
});

test("loading", async () => {
  configure({ disableAutoSnapshot: true });

  const worker = setupWorker();
  onTestFinished(() => worker.stop());
  onTestFinished(() => worker.resetHandlers());
  await worker.start({ quiet: true });

  let continueRequest = () => {};
  const blocking = new Promise<void>((resolve) => (continueRequest = resolve));

  worker.use(
    http.get("/example.jpg", async () => {
      await blocking;
      return HttpResponse.text("Not found", { status: 404 });
    }),
  );

  await render(
    <Avatar>
      <Avatar.Image src="/example.jpg" alt="Logo" />
      <Avatar.Fallback>404</Avatar.Fallback>
    </Avatar>,
  );

  await takeSnapshot();
  continueRequest();
});

test("fallback", async () => {
  await render(
    <Avatar>
      <Avatar.Image src="broken-link" alt="Logo" />
      <Avatar.Fallback>Oops</Avatar.Fallback>
    </Avatar>,
  );
});
