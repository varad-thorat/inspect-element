var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
    '/',
    'index.html',
];
self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
            console.log('opened cache');
            return cache.addAll(urlsToCache);
        })
    )
});

self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request)
            .then(function(response){
            if (response){
                return response;
            }
            return fetch(event.response);
            }
        )
    );
});