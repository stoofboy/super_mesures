/* =======================================================================
   service-worker.js — Les Super Mesures
   Stratégie : « stale-while-revalidate »
   - Le contenu est servi instantanément depuis le cache (donc hors-ligne OK)
   - En parallèle, il est rafraîchi depuis le réseau quand il y en a un
   ➜ Pour forcer une mise à jour chez tout le monde : changer CACHE_NAME (v1 → v2).
   ======================================================================= */
const CACHE_NAME = 'super-mesures-v1';
const PRECACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg',
  './icon-192.png',
  './icon-512.png',
];

// Installation : on met tous les fichiers de l'appli en cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

// Activation : on supprime les anciens caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Requêtes : cache d'abord, réseau en renfort
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || !req.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.open(CACHE_NAME).then(async cache => {
      const cached = await cache.match(req, { ignoreSearch: true });
      const network = fetch(req)
        .then(res => { if (res && res.ok) cache.put(req, res.clone()); return res; })
        .catch(() => null);
      return cached || (await network) || (await cache.match('./index.html'));
    })
  );
});
