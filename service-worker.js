const CACHE_NAME = "app-seguranca-v1";
const URLS_TO_CACHE = [
  "index.html",
  "style.css",
  "script.js",
  "firebase.js",
  "manifest.json",
  "login.html",
  "cadastro.html",
  "https://unpkg.com/leaflet/dist/leaflet.css",
  "https://unpkg.com/leaflet/dist/leaflet.js",
  "https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js",
  "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth-compat.js",
  "https://www.gstatic.com/firebasejs/9.22.2/firebase-database-compat.js"
];

// Instala e armazena arquivos no cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("Cache aberto");
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// Ativação do novo service worker
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    })
  );
});

// Busca do cache ou da rede
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna do cache se existir
        if (response) {
          return response;
        }
        // Senão, busca da rede
        return fetch(event.request);
      })
  );
});
