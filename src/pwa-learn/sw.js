self.addEventListener('install', event => {
    console.log('install', event);
    event.waitUntil(self.skipWaiting());
    //gfdg
});
self.addEventListener('activate', event => {
    console.log('activate',event);
    event.waitUntil(self.ClientRectList.claim());
});
self.addEventListener('fetch', event => {
    console.log('fetch',event);
});