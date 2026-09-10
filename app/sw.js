const CACHE="mbh-services-v7";
const ASSETS=["./mbh-app-2026.webmanifest","./mbh-official-icon-2026.png"];
self.addEventListener("install",event=>{
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));
});
self.addEventListener("activate",event=>{
  event.waitUntil(Promise.all([
    clients.claim(),
    caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key))))
  ]));
});
self.addEventListener("fetch",event=>{
  if(event.request.mode==="navigate"){
    event.respondWith(fetch(event.request).catch(()=>caches.match("./")));
  }else{
    event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)));
  }
});