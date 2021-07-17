import {
  extname,
  join,
  fromFileUrl,
} from "https://deno.land/std@0.98.0/path/mod.ts";
import { Status } from "https://deno.land/std@0.98.0/http/http_status.ts";
//import { serve, Server } from "https://deno.land/std@0.98.0/http/server.ts";
//import { serveFile } from "https://deno.land/std@0.98.0/http/file_server.ts";
/*import {
  acceptWebSocket,
  isWebSocketCloseEvent,
  WebSocket,
} from "https://deno.land/std@0.98.0/ws/mod.ts";*/
import { exists } from "https://deno.land/std@0.98.0/fs/mod.ts";
import { v4 } from "https://deno.land/std@0.98.0/uuid/mod.ts";

import { debounce } from "./debounce.ts";
import { SSGRefreshMap } from "./ssg-refresh-map.ts";

const MEDIA_TYPES: Record<string, string> = {
  ".md": "text/markdown",
  ".html": "text/html",
  ".htm": "text/html",
  ".json": "application/json",
  ".map": "application/json",
  ".txt": "text/plain",
  ".ts": "text/typescript",
  ".tsx": "text/tsx",
  ".js": "application/javascript",
  ".jsx": "text/jsx",
  ".gz": "application/gzip",
  ".css": "text/css",
  ".wasm": "application/wasm",
  ".mjs": "application/javascript",
  ".svg": "image/svg+xml",
};

/** Returns the content-type based on the extension of a path. */
function contentType(path: string): string | undefined {
  return MEDIA_TYPES[extname(path)];
}

export async function devServer(
  build: () => Promise<SSGRefreshMap>,
  staticPort = 8000,
  socketPort = 8001
) {
  // Initial build
  console.log("\n\nInitial build...\n\n");
  const initialRefreshMap = await build();

  // Launch socket server
  const clients = reloadServer(socketPort);

  // Watch for rebuilds
  watchFiles(build, clients, initialRefreshMap);

  // Launch static server
  serveFiles(staticPort);
}

function checkMap(map: SSGRefreshMap, path: string): Function | undefined {
  console.log("checking map for ", path);
  if (path.endsWith(".ts") || path.endsWith(".tsx")) {
    return (
      map[path] ||
      map[path.replace(".ts", ".js")] ||
      map[path.replace(".tsx", ".jsx")]
    );
  } else {
    return map[path];
  }
}

async function watchFiles(
  build: () => void,
  clients: Map<string, WebSocket>,
  refreshMap: SSGRefreshMap
) {
  const watcher = Deno.watchFs(join(fromFileUrl(import.meta.url), "..", ".."));

  let rebuilding = false;

  while (true) {
    try {
      for await (const event of watcher) {
        if (
          !event.paths
            .map((path) => path.includes("/dist/"))
            .reduce((acc, curr) => acc && curr, true)
        ) {
          debounce(async () => {
            try {
              if (!rebuilding && event.kind == "modify") {
                rebuilding = true;

                console.log("\n\nRebuilding...\n\n");

                const rebuildFragments = event.paths.map((path) =>
                  checkMap(refreshMap, path)
                );
                // if every fragment has a function to update it, call them all
                if (!rebuildFragments.includes(undefined)) {
                  await Promise.all(
                    event.paths.map((path) => {
                      console.log("Rebuilding ", path);
                      const f = checkMap(refreshMap, path);
                      if (f) f();
                    })
                  );
                }
                // otherwise, just rebuild the whole app
                else {
                  console.log("\n\nRebuilding complete app.\n\n");
                  await build();
                }

                console.log("\n\nFinished rebuilding.");
                console.log(
                  "\n\nTelling ",
                  Array.from(clients.entries()).length,
                  "clients to refresh."
                );

                if (Array.from(clients.entries()).length > 0) {
                  for (const [, sock] of clients) {
                    try {
                      await sock.send("Refresh");
                    } catch (e) {
                      console.error("Socket error", e);
                    }
                  }
                }
                rebuilding = false;
              }
            } catch (e) {
              console.warn("(watchFiles error)", e);
            }
          }, 50)();
        }
      }
    } catch (e) {
      console.warn(e);
    }
  }
}

function reloadServer(port: number) {
  const clients: Map<string, WebSocket> = new Map();

  waitForClients(port, clients);

  return clients;
}

async function waitForClients(port: number, clients: Map<string, WebSocket>) {
  const server = Deno.listen({ port });
  for await (const conn of server) {
    (async () => {
      const httpConn = Deno.serveHttp(conn);

      for await (const requestEvent of httpConn) {
        const { websocket, response } = Deno.upgradeWebSocket(
          requestEvent.request
        );

        const uid = v4.generate();
        clients.set(uid, websocket);
        console.log(
          "\n\nClient",
          uid,
          "connected — now ",
          Array.from(clients.entries()).length
        );

        requestEvent.respondWith(response);

        handleDepartures(uid, websocket, clients);
      }
    })();
  }
}

/*  const sock = await acceptWebSocket({
      conn,
      bufReader,
      bufWriter,
      headers,
    });

    const uid = v4.generate();
    clients.set(uid, sock);
    console.log(
      "\n\nClient",
      uid,
      "connected — now ",
      Array.from(clients.entries()).length
    );

    handleDepartures(uid, sock, clients);
  }
}
 */
function handleDepartures(
  uid: string,
  websocket: WebSocket,
  clients: Map<string, WebSocket>
) {
  websocket.onopen = () => {
    websocket.send("Hello World!");
  };
  websocket.onmessage = (e) => {
    console.log(e.data);
    websocket.close();
  };
  websocket.onclose = () => {
    console.log("\n\nClient", uid, "disconnected");
    clients.delete(uid);
  };
  websocket.onerror = (e) => console.error("WebSocket error:", e);
}

async function serveFiles(port: number): Promise<Deno.Listener> {
  const server = Deno.listen({ port });
  console.log(`\n\nDev server active at http://localhost:${port}`);
  for await (const conn of server) {
    (async () => {
      const httpConn = Deno.serveHttp(conn);

      for await (const requestEvent of httpConn) {
        const req = requestEvent.request,
          url = new URL(req.url),
          pathname = url.pathname;
        const filePath = join(
          fromFileUrl(import.meta.url),
          "..",
          "..",
          "..",
          "www",
          pathname
        );

        if (await exists(filePath)) {
          const fileInfo = await Deno.stat(filePath);
          try {
            if (fileInfo.isFile) {
              const content = await Deno.readFile(filePath);
              await requestEvent.respondWith(
                new Response(content, {
                  status: Status.OK,
                  headers: {
                    "Content-Type": contentType(filePath),
                  },
                })
              );
            } else if (
              fileInfo.isDirectory &&
              (await exists(join(filePath, "index.html")))
            ) {
              const content = await Deno.readFile(join(filePath, "index.html"));
              await requestEvent.respondWith(
                new Response(content, {
                  status: Status.OK,
                  headers: {
                    "Content-Type": contentType("index.html"),
                  },
                })
              );
            } else {
              // TODO real 404 page
              await requestEvent.respondWith(
                new Response("", { status: Status.NotFound })
              );
            }
          } catch (e) {
            console.error(e);
            try {
              await requestEvent.respondWith(
                new Response(JSON.stringify(e), {
                  status: Status.InternalServerError,
                })
              );
            } catch (e) {
              console.warn("(serveFiles error)", e);
              await requestEvent.respondWith(
                new Response(JSON.stringify(e), {
                  status: Status.InternalServerError,
                })
              );
            }
          }
          continue;
        } else {
          try {
            // TODO real 404 page
            await requestEvent.respondWith(
              new Response("", {
                status: Status.NotFound,
              })
            );
          } catch (e) {
            console.warn(e);
            await requestEvent.respondWith(
              new Response(JSON.stringify(e), {
                status: Status.InternalServerError,
              })
            );
          }
        }
      }
    })();
  }
  return server;
}
