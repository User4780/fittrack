// Service Worker: App-Shell und Produktdatenbank liegen im Cache, damit FitTrack offline startet.
const SHELL_CACHE = "fittrack-shell-v1";
const DB_CACHE = "fittrack-db-2026-10-29";
const SHELL = ["./", "index.html", "manifest.webmanifest", "vendor/zxing.min.js", "vendor/anthropic.min.js",
  "icons/apple-touch-icon.png", "icons/icon-192.png", "icons/icon-512.png"];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(SHELL_CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== SHELL_CACHE && k !== DB_CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Produktdatenbank: einmal laden, danach immer aus dem Cache
  if (url.pathname.includes("/db/")) {
    event.respondWith(caches.open(DB_CACHE).then(async cache => {
      const hit = await cache.match(req, { ignoreSearch: true });
      if (hit) return hit;
      const res = await fetch(req);
      if (res.ok) cache.put(req, res.clone());
      return res;
    }));
    return;
  }

  // App-Shell: sofort aus dem Cache, im Hintergrund aktualisieren
  event.respondWith(caches.open(SHELL_CACHE).then(async cache => {
    const key = req.mode === "navigate" ? "index.html" : req;
    const hit = await cache.match(key, { ignoreSearch: true });
    const net = fetch(req).then(res => { if (res.ok) cache.put(key, res.clone()); return res; }).catch(() => hit);
    return hit || net;
  }));
});
