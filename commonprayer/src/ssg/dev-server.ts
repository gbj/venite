import * as path from "https://deno.land/std@0.98.0/path/mod.ts";
import { Status } from "https://deno.land/std@0.98.0/http/http_status.ts";
import { serve, Server } from "https://deno.land/std@0.98.0/http/server.ts";
import { serveFile } from "https://deno.land/std@0.98.0/http/file_server.ts";
import {
  acceptWebSocket,
  isWebSocketCloseEvent,
  WebSocket,
} from "https://deno.land/std@0.98.0/ws/mod.ts";
import { exists } from "https://deno.land/std@0.98.0/fs/mod.ts";
import { v4 } from "https://deno.land/std@0.98.0/uuid/mod.ts";

import { debounce } from "./debounce.ts";
import { SSGRefreshMap } from "./ssg-refresh-map.ts";

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
  const watcher = Deno.watchFs(
    path.join(path.fromFileUrl(import.meta.url), "..", "..")
  );

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
  for await (const req of serve({ port })) {
    const { conn, r: bufReader, w: bufWriter, headers } = req;
    const sock = await acceptWebSocket({
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

async function handleDepartures(
  uid: string,
  sock: WebSocket,
  clients: Map<string, WebSocket>
) {
  for await (const ev of sock) {
    if (isWebSocketCloseEvent(ev)) {
      console.log("\n\nClient", uid, "disconnected");
      try {
        clients.delete(uid);
      } catch (e) {
        console.warn("(handleDepartures err)", e);
      }
      return;
    }
  }
}

async function serveFiles(port: number): Promise<Server> {
  const server = serve({ port });
  console.log(`\n\nDev server active at http://localhost:${port}`);
  for await (const req of server) {
    const filePath = path.join(
      path.fromFileUrl(import.meta.url),
      "..",
      "..",
      "..",
      "www",
      req.url
    );
    if (await exists(filePath)) {
      const fileInfo = await Deno.stat(filePath);
      try {
        if (fileInfo.isFile) {
          const content = await serveFile(req, filePath);
          req.respond(content);
        } else if (
          fileInfo.isDirectory &&
          (await exists(path.join(filePath, "index.html")))
        ) {
          const content = await serveFile(
            req,
            path.join(filePath, "index.html")
          );
          req.respond(content);
        } else {
          req.respond({ status: Status.NotFound });
        }
      } catch (e) {
        console.error(e);
        try {
          req.respond({
            status: Status.NotFound,
            body: JSON.stringify(e),
          });
        } catch (e) {
          console.warn("(serveFiles error)", e);
        }
      }
      continue;
    } else {
      try {
        req.respond({
          status: Status.NotFound,
        });
      } catch (e) {
        console.warn("(serveFiles error)", e);
      }
    }
  }
  return server;
}
