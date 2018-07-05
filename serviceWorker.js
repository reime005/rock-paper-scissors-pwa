
//Files to save in cache
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

var cacheName = 'rock-paper-scissors-pwa-cache-v1.0.0';

//Adding `install` event listener
self.addEventListener('install', (event) => {
  console.info('Event: Install');

  event.waitUntil(
    caches.open(cacheName)
    .then((cache) => {
      //[] of files to cache & if any of the file not present `addAll` will fail
      return cache.addAll(files).then(() => {
        console.info('All files are cached');
        return self.skipWaiting(); //To forces the waiting service worker to become the active service worker
      })
      .catch((error) =>  {
        console.error('Failed to cache', error);
      })
    })
  );
});

self.addEventListener('activate', event => {
  //Remove old and unwanted caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            return caches.delete(cache); //Deleting the old cache (cache v1)
          }
        })
      );
    })
    .then(function () {
      console.info("Old caches are cleared!");
      // To tell the service worker to activate current one 
      // instead of waiting for the old one to finish.
      return self.clients.claim(); 
    }) 
  );
});

//Adding `fetch` event listener
self.addEventListener('fetch', (event) => {

  let request = event.request;
  let url = new URL(request.url);

  // only deal with requests on the same domain.
  if (url.origin !== location.origin) {
    return;
  }

  // for non-GET requests, go to the network.
  if (request.method !== 'GET') {
    event.respondWith(fetch(request));
    return;
  }

  // for everything else look to the cahce first,
  // then fall back to the network.
  event.respondWith(
    caches.match(request).then(response => {
      return response || fetch(request);
    })
  );
});