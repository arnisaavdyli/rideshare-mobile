
const CACHE = "rideshare-data-v1";
const STATIC_CACHE = "rideshare-static-v2";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) =>
      cache.addAll([
        "/offline.html",
        "/icons/icon-192.png",
        "/icons/icon-512.png",
      ])
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (event.request.method !== "GET") return;

  if (url.pathname === "/api/udhetimet") {
    event.respondWith(
      fetch(event.request)
        .then(async (response) => {
          if (response.ok) {
            const cache = await caches.open(CACHE);
            await cache.put("/api/udhetimet", response.clone());
          }
          return response;
        })
        .catch(async () => {
          const cache = await caches.open(CACHE);
          return (
            (await cache.match("/api/udhetimet")) ||
            new Response("[]", {
              headers: { "Content-Type": "application/json" },
            })
          );
        })
    );
    return;
  }

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(async () => {
        const cache = await caches.open(STATIC_CACHE);
        return cache.match("/offline.html");
      })
    );
  }
});
