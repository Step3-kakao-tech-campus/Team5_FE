/* eslint-disable no-restricted-globals */
const CACHE_NAME = "static-cache-v1";

const FILES_TO_CACHE = ["./offline.html"];

// When the service worker is installing, open the cache and add the precache resources to it
self.addEventListener("install", (event) => {
  console.log("Service worker install event!");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE)),
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service worker activate event!");
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        // eslint-disable-next-line array-callback-return, consistent-return
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("Removing old cache data", key);
            return caches.delete(key);
          }
        }),
      ),
    ),
  );
});

// When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
self.addEventListener("fetch", (event) => {
  if (event.request.mode !== "navigate") {
    // Not a page navigation, bail.
    return;
  }
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match("offline.html");
      });
    }),
  );
});
