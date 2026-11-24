// Guarda os ficheiros da aplicação no telemóvel: abre mais depressa e funciona sem rede.
// Ao publicar uma versão nova, mudar VERSAO para os telemóveis descarregarem os ficheiros novos.
const VERSAO = 'digitalizador-web-1.0';
const FICHEIROS = ['./', 'index.html', 'app.js', 'pdf.js', 'worker.js', 'motor.js', 'jpeg-decoder.js',
  'manifest.webmanifest', 'icones/icone-180.png', 'icones/icone-192.png', 'icones/icone-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSAO).then(c => c.addAll(FICHEIROS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== VERSAO).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
// primeiro a rede (para receber logo as versões novas); sem rede, a cópia guardada
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request)
    .then(r => { const copia = r.clone(); caches.open(VERSAO).then(c => c.put(e.request, copia)); return r; })
    .catch(() => caches.match(e.request, { ignoreSearch: true })));
});
