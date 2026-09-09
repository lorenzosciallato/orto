/* Orto — funziona anche senza campo. Pagine e codice: prima la rete, poi la copia salvata. Foto e dati: prima la copia salvata. */
const VERSIONE = "orto-2026-09-09b";
const BASE = [ "./", "index.html", "css/stile.css", "js/mesi.js", "js/consigli.js", "js/schede.js", "js/clima.js", "js/semina.js", "js/ricette.js", "js/allevare.js", "js/coltivare.js", "js/app.js", "manifest.json", "img/icona-192.jpg", "img/icona-512.jpg" ];
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
    e.respondWith(fetch(e.request).then(res=>{ const copia=res.clone(); caches.open(VERSIONE).then(c=>c.put(e.request,copia)); return res; }).catch(()=>caches.match(e.request).then(r=>r||caches.match("index.html"))));
  }
});
