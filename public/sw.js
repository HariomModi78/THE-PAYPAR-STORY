const CACHE_NAME = "dairy-cache-v1";
const urlsToCache = [
  "/",
  "/images/icon.png",  
  "/stylesheets/home.css",  
  "/stylesheets/login.css",  
  "/stylesheets/profile.css",  
  "/stylesheets/search.css",  
  "/javaScripts/home.js",  
  "/javaScripts/index.js",  
  "/javaScripts/login.js",  
  "/javaScripts/nav.js",  
  "/javaScripts/otp.js",  
  "/javaScripts/profile.js",  
  "/javaScripts/search.js",  
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
