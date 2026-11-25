const CACHE_NAME = "journal-tiny-v7";
const ASSETS = [
  "./index.html",
  "./journal-data.js",
  "./manifest.json",
  "./robots.txt",
  "./icon.svg",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png",
  "./x0.js",
  "./x1.js",
  "./x2.js",
  "./x3.js",
  "./x4.js",
  "./x5.js",
  "./x6.js",
  "./x7.js",
  "./x8.js",
  "./x9.js",
  "./x10.js",
  "./x11.js",
  "./x12.js",
  "./x13.js",
  "./x14.js",
  "./x15.js",
  "./x16.js",
  "./x17.js",
  "./x18.js",
  "./x19.js",
  "./x20.js",
  "./x21.js",
  "./x22.js",
  "./x23.js",
  "./x24.js",
  "./x25.js",
  "./x26.js",
  "./x27.js",
  "./x28.js",
  "./x29.js",
  "./x30.js",
  "./x31.js",
  "./a0.js",
  "./a1.js",
  "./a2.js",
  "./a3.js",
  "./a4.js",
  "./a5.js",
  "./a6.js",
  "./a7.js",
  "./a8.js",
  "./a9.js",
  "./c0.css",
  "./c1.css"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fetchPromise = fetch(event.request).then((response) => {
        if (response && response.status === 200) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return response;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});