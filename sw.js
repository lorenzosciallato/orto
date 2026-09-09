/* Orto — funziona anche senza campo. Pagine e codice: prima la rete, poi la copia salvata. Foto e dati: prima la copia salvata. */
const VERSIONE = "orto-202609092134";
const BASE = [ "./", "index.html", "css/stile.css?v=202609092134", "js/mesi.js?v=202609092134", "js/ricette.js?v=202609092134", "js/schede.js?v=202609092134", "js/clima.js?v=202609092134", "js/semina.js?v=202609092134", "js/schede-extra.js?v=202609092134", "js/consigli.js?v=202609092134", "js/allevare.js?v=202609092134", "js/coltivare.js?v=202609092134", "js/app.js?v=202609092134", "manifest.json", "dati/italia.json", "img/icona-192.jpg", "img/icona-512.jpg" ];
self.addEventListener("install", e=>{ e.waitUntil(caches.open(VERSIONE).then(c=>c.addAll(BASE)).then(()=>self.skipWaiting())); });
self.addEventListener("activate", e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSIONE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener("fetch", e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=="GET") return;
  if(u.origin!==location.origin) return; /* meteo e siti esterni: sempre rete */
  const statico = /\.(jpe?g|png|webp|svg|json)$/i.test(u.pathname);
  if(statico){
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{ const copia=res.clone(); caches.open(VERSIONE).then(c=>c.put(e.request,copia)); return res; })));
  } else {
    e.respondWith(fetch(e.request,{cache:"no-cache"}).then(res=>{ const copia=res.clone(); caches.open(VERSIONE).then(c=>c.put(e.request,copia)); return res; }).catch(()=>caches.match(e.request).then(r=>r||(e.request.mode==="navigate"?caches.match("index.html"):Response.error()))));
  }
});
