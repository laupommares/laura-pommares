// Renders /cv to PDF for each locale and writes the files served by the
// "Download CV" button. The locale comes from a cookie (see src/i18n/config.ts),
// so each pass sets it before navigating.
//
//   npm run cv                        # builds, starts a server, generates both PDFs
//   CV_BASE_URL=http://localhost:3000 npm run cv   # reuses a server you already have running
//
// Drives headless Chrome over the DevTools Protocol using Node's built-in
// WebSocket, so there is no puppeteer dependency to install or keep updated.

import { spawn } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { setTimeout as sleep } from "node:timers/promises";

const CHROME = process.env.CHROME_PATH ?? "google-chrome";
const PORT = Number(process.env.CV_PORT ?? 4321);
// Call the Next binary directly rather than through `npx`: npx spawns Next as a
// grandchild, so killing the npx wrapper would leak the actual server. A leaked
// server keeps the port bound and serves a stale build to the next run.
const NEXT_BIN = join("node_modules", ".bin", "next");
const OUTPUTS = [
  { locale: "es", file: "public/cv-laura-pommares.pdf" },
  { locale: "en", file: "public/cv-laura-pommares-en.pdf" },
];

function run(command, args, opts = {}) {
  return spawn(command, args, { stdio: "inherit", ...opts });
}

function runToCompletion(command, args) {
  return new Promise((resolve, reject) => {
    run(command, args).on("exit", (code) =>
      code === 0 ? resolve() : reject(new Error(`${command} exited with ${code}`))
    );
  });
}

// Refuse to run if the port is already taken — otherwise Chrome would silently
// connect to whatever leaked server is bound there and render a stale CV.
async function assertPortFree(port) {
  try {
    await fetch(`http://localhost:${port}/`, { cache: "no-store" });
  } catch {
    return; // nothing listening — good
  }
  throw new Error(
    `Port ${port} is already in use. Kill the process bound to it (ss -ltnp | grep :${port}) ` +
      `or set CV_PORT to a free port.`
  );
}

async function waitForServer(baseUrl, timeoutMs = 120_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(`${baseUrl}/cv`, { cache: "no-store" });
      if (res.ok) return;
    } catch {
      // server not accepting connections yet
    }
    await sleep(500);
  }
  throw new Error(`Server at ${baseUrl} did not become ready in time`);
}

// Minimal CDP client: send(method, params) -> result, plus one-shot event waits.
function connect(wsUrl) {
  const ws = new WebSocket(wsUrl);
  const pending = new Map();
  const eventWaiters = [];
  let nextId = 0;

  ws.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.id !== undefined) {
      const entry = pending.get(message.id);
      if (!entry) return;
      pending.delete(message.id);
      if (message.error) entry.reject(new Error(message.error.message));
      else entry.resolve(message.result);
      return;
    }
    for (let i = eventWaiters.length - 1; i >= 0; i--) {
      if (eventWaiters[i].method === message.method) {
        eventWaiters.splice(i, 1)[0].resolve(message.params);
      }
    }
  });

  const ready = new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve, { once: true });
    ws.addEventListener("error", () => reject(new Error("Could not connect to Chrome")), {
      once: true,
    });
  });

  return {
    ready,
    send(method, params = {}) {
      const id = ++nextId;
      return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject });
        ws.send(JSON.stringify({ id, method, params }));
      });
    },
    waitFor(method, timeoutMs = 30_000) {
      return Promise.race([
        new Promise((resolve) => eventWaiters.push({ method, resolve })),
        sleep(timeoutMs).then(() => {
          throw new Error(`Timed out waiting for ${method}`);
        }),
      ]);
    },
    close: () => ws.close(),
  };
}

async function launchChrome() {
  const profile = await mkdtemp(join(tmpdir(), "cv-pdf-"));
  const chrome = run(
    CHROME,
    [
      "--headless=new",
      "--remote-debugging-port=0",
      `--user-data-dir=${profile}`,
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-gpu",
      "about:blank",
    ],
    { stdio: "ignore" }
  );

  // Chrome writes the port it actually bound to as the first line of this file.
  const portFile = join(profile, "DevToolsActivePort");
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    try {
      const [port] = (await readFile(portFile, "utf8")).split("\n");
      if (port) {
        const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
        const page = targets.find((t) => t.type === "page");
        if (page) return { chrome, profile, wsUrl: page.webSocketDebuggerUrl };
      }
    } catch {
      // port file not written yet, or Chrome still starting up
    }
    await sleep(250);
  }
  throw new Error("Chrome did not expose a debugging endpoint in time");
}

async function renderPdf(client, baseUrl, locale) {
  await client.send("Network.setCookie", {
    name: "locale",
    value: locale,
    url: baseUrl,
  });

  const loaded = client.waitFor("Page.loadEventFired");
  await client.send("Page.navigate", { url: `${baseUrl}/cv` });
  await loaded;

  // Web fonts change line wrapping, so let them settle before measuring pages.
  await client.send("Runtime.evaluate", {
    expression: "document.fonts.ready.then(() => true)",
    awaitPromise: true,
  });
  await sleep(300);

  const { data } = await client.send("Page.printToPDF", {
    printBackground: true,
    preferCSSPageSize: true, // honours the @page rule in src/app/cv/print.css
  });
  return Buffer.from(data, "base64");
}

async function main() {
  const externalBaseUrl = process.env.CV_BASE_URL;
  const baseUrl = externalBaseUrl ?? `http://localhost:${PORT}`;
  let server;

  if (!externalBaseUrl) {
    await assertPortFree(PORT);
    console.log("→ Building the site…");
    await runToCompletion(NEXT_BIN, ["build"]);
    console.log(`→ Starting a server on port ${PORT}…`);
    // detached: give the server its own process group so the whole tree can be
    // torn down together in the finally block (see server.kill below).
    server = run(NEXT_BIN, ["start", "-p", String(PORT)], {
      stdio: "ignore",
      detached: true,
    });
  }

  const { chrome, profile, wsUrl } = await launchChrome();
  const client = connect(wsUrl);

  try {
    await waitForServer(baseUrl);
    await client.ready;
    await client.send("Page.enable");
    await client.send("Network.enable");

    for (const { locale, file } of OUTPUTS) {
      const pdf = await renderPdf(client, baseUrl, locale);
      await writeFile(file, pdf);
      console.log(`✓ ${file} (${locale}, ${(pdf.length / 1024).toFixed(0)} KB)`);
    }
  } finally {
    client.close();
    chrome.kill();
    if (server?.pid) {
      // Negative PID targets the whole process group, so no server is left
      // bound to the port to serve a stale build on the next run.
      try {
        process.kill(-server.pid, "SIGTERM");
      } catch {
        server.kill("SIGTERM");
      }
    }
    // Chrome can still be releasing the profile dir; retry briefly.
    for (let i = 0; i < 5; i++) {
      try {
        await rm(profile, { recursive: true, force: true });
        break;
      } catch {
        await sleep(200);
      }
    }
  }
}

main().catch((error) => {
  console.error(`✗ ${error.message}`);
  process.exit(1);
});
