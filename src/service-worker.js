/* eslint-disable */
// https://developer.chrome.com/docs/

workbox.routing.registerRoute(
   /\.(?:css|js)$/,
   new workbox.strategies.StaleWhileRevalidate({
       "cacheName":"assets"
   })
)

workbox.routing.registerRoute(
    /\.(?:png|jpg|jpeg|svg)$/,
    new workbox.strategies.CacheFirst({
        "cacheName":"images",
        plugins: [
          new workbox.expiration.Plugin({
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          })
     ]
    })
 )

 workbox.routing.registerRoute(
    ({ url }) => url.host.startsWith('kit.fontawesome'),
    new workbox.strategies.CacheFirst({
        "cacheName":"icons"
    })
 )
 workbox.routing.registerRoute(
    ({ url }) => url.host.startsWith('fonts.g'),
    new workbox.strategies.CacheFirst({
        "cacheName":"google fonts",
        plugins: [
            new workbox.expiration.Plugin({
              maxEntries: 30,
            }),
            new workbox.cacheableResponse.Plugin({
              statuses: [0, 200]
            }),
          ],
    })
 )

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});