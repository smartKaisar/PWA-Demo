
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('static').then(function (cache) {
            cache.addAll(
                [
                    '/',
                    '/index.html',
                    '/js/jquery.js',
                    '/js/main.js',
                    'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',
                    'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
                    '/css/style.css',
                    '/images/*'
                ]
            );
        }));
});

self.addEventListener('fetch', event => {
    console.log(event.request.url);
    event.respondWith(
        caches.open('static').then(cache => {
            return fetch(event.request).then(response => {
                cache.put(event.request, response.clone());
                return response;
            });
        })
    );
});

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});