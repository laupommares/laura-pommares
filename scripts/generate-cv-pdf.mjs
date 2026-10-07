// Genera el PDF del CV en cada idioma a partir de su página (/cv y /en/cv) y
// escribe los archivos que descarga el botón "Descargar CV".
//
//   npm run cv                        # compila, levanta un servidor y genera los dos PDFs
//   CV_BASE_URL=http://localhost:3000 npm run cv   # reutiliza un servidor que ya tengas corriendo
//
// Maneja Chrome headless por el DevTools Protocol con el WebSocket nativo de Node,
// así no hay que instalar ni mantener puppeteer.

import { spawn } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { setTimeout as sleep } from "node:timers/promises";

const CHROME = process.env.CHROME_PATH ?? "google-chrome";
const PORT = Number(process.env.CV_PORT ?? 4321);
// Se llama al binario de Next directo y no con `npx`: npx lanza Next como nieto, y al
// matar a npx quedaría el servidor real corriendo, ocupando el puerto y sirviendo un
// build viejo en la próxima corrida.
const NEXT_BIN = join("node_modules", ".bin", "next");
const OUTPUTS = [
  { locale: "es", path: "/cv", file: "public/cv-laura-pommares.pdf" },
  { locale: "en", path: "/en/cv", file: "public/cv-laura-pommares-en.pdf" },
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

// No corre si el puerto ya está ocupado: si no, Chrome se conectaría sin avisar a
// cualquier servidor que haya quedado ahí y generaría un CV desactualizado.
async function assertPortFree(port) {
  try {
    await fetch(`http://localhost:${port}/`, { cache: "no-store" });
  } catch {
    return; // no hay nada escuchando: bien
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
      // el servidor todavía no acepta conexiones
    }
    await sleep(500);
  }
  throw new Error(`Server at ${baseUrl} did not become ready in time`);
}

// Cliente CDP mínimo: send(method, params) -> resultado, más esperas de eventos puntuales.
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

  // Chrome escribe en la primera línea de este archivo el puerto que realmente tomó.
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
      // el archivo del puerto todavía no existe o Chrome sigue arrancando
    }
    await sleep(250);
  }
  throw new Error("Chrome did not expose a debugging endpoint in time");
}

async function renderPdf(client, baseUrl, path) {
  const loaded = client.waitFor("Page.loadEventFired");
  await client.send("Page.navigate", { url: `${baseUrl}${path}` });
  await loaded;

  // Las fuentes web cambian los saltos de línea: se espera a que carguen antes de paginar.
  await client.send("Runtime.evaluate", {
    expression: "document.fonts.ready.then(() => true)",
    awaitPromise: true,
  });
  await sleep(300);

  const { data } = await client.send("Page.printToPDF", {
    printBackground: true,
    preferCSSPageSize: true, // respeta la regla @page de src/app/[locale]/cv/print.css
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
    // detached: el servidor tiene su propio grupo de procesos, así se puede cerrar todo
    // el árbol junto en el bloque finally (ver server.kill más abajo).
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

    for (const { locale, path, file } of OUTPUTS) {
      const pdf = await renderPdf(client, baseUrl, path);
      await writeFile(file, pdf);
      console.log(`✓ ${file} (${locale}, ${(pdf.length / 1024).toFixed(0)} KB)`);
    }
  } finally {
    client.close();
    chrome.kill();
    if (server?.pid) {
      // El PID negativo apunta a todo el grupo de procesos, así no queda ningún servidor
      // ocupando el puerto con un build viejo para la próxima corrida.
      try {
        process.kill(-server.pid, "SIGTERM");
      } catch {
        server.kill("SIGTERM");
      }
    }
    // Chrome puede seguir liberando la carpeta del perfil: se reintenta un momento.
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
