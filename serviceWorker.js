// All files for the cache
var files = [
  './',
  './index.html',
  './src/css/main.css',
  './src/img/hand-paper-solid.svg',
  './src/img/hand-paper.svg',
  './src/img/hand-rock-solid.svg',
  './src/img/hand-rock.svg',
  './src/img/hand-scissors-solid.svg',
  './src/img/hand-scissors.svg',
  './src/img/icon/icon-192.png',
  './src/img/icon/icon-512.png',
  './src/img/icon/icon.ico',
  './build/bundle.js',
  './manifest.json'
];

var cacheNameTag = 'rock-paper-scissors-pwa-cache-v1.0.0';

// Adding the install event listener
self.addEventListener('install', (event) => {
  console.info('Event: Install');

  event.waitUntil(
    caches.open(cacheNameTag)
      .then((cache) => {
      return cache.addAll(files).then(() => {
        console.info('Files are cached');
        // force immediate activation of the service worker
        return self.skipWaiting();
      })
      .catch((error) =>  {
        console.error('Failed to cache files', error);
      })
    })
  );
});

// Adding the activate event listener
self.addEventListener('activate', event => {
  // Delete old caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          // Delete cache if the versions differ
          if (cacheNameTag !== cache) {
            return caches.delete(cache);
          }
        })
      );
    })
    .then(() => {
      // tell the service worker to take control of any open pages
      console.info("Old caches are cleared!");
      return self.clients.claim(); 
    }) 
  );
});

// Adding the fetch event listener
self.addEventListener('fetch', (event) => {
  let req = event.request;
  let reqUrl = new URL(req.url);

  // only handle requests that are on the same domain
  if (location.origin !== reqUrl.origin) {
    return;
  }

  // only GET requests, else fetch network
  if (req.method !== 'GET') {
    event.respondWith(fetch(req));
    return;
  }

  // if request is cached then answer with response,
  // else fetch network
  event.respondWith(
    caches.match(req).then(response => {
      return response || fetch(req);
    })
  );
});
