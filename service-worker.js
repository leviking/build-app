/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

/* eslint no-console: ["error", { allow: ["info"] }] */

console.info(
  'Service worker disabled for development, will be generated at build time.'
);
self.addEventListener('install', function(e) {
  const timeStamp = Date.now();
  e.waitUntil(
    caches.open('buildalert').then(cache => {
      return cache.addAll([
        '/',
        'src/my-app.html',
        'manifest.json'
      ])
      .then(() => self.skipWaiting());
    })
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch: true}).then(response => {
      return response || fetch(event.request)
    })
  )
})
