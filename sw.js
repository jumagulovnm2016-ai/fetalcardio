/* FetalCardio — Service Worker.
   Важно: на домене *.github.io кэши общие для всех приложений автора,
   поэтому удаляются ТОЛЬКО кэши с префиксом "fetalcardio-". */
const PREFIX = "fetalcardio-";
const VERSION = "v31";
const APP_CACHE = `${PREFIX}app-${VERSION}`;
const FONT_CACHE = `${PREFIX}fonts-v1`;
/* Эхограммы (img/) не входят в предзагрузку (~17 МБ): кэшируются при первом просмотре
   в отдельный кэш, который не сбрасывается при обновлении версии приложения. */
const IMG_CACHE = `${PREFIX}img-v1`;
const KEEP = [APP_CACHE, FONT_CACHE, IMG_CACHE];
const FILES = [
  "./", "index.html", "style.css", "app.js", "schemes.js", "search.js", "validate.js", "progress.js",
  "data/meta.js", "data/references.js", "data/views.js", "data/algorithms.js", "data/pathologies.js", "data/quiz.js", "data/anatomy.js", "data/images.js",
  "atlas/4cv-normal.svg",
  "atlas/situs-normal.svg", "atlas/lvot-normal.svg", "atlas/rvot-normal.svg", "atlas/3vv-normal.svg", "atlas/3vt-normal.svg",
  "atlas/vsd-types.svg", "atlas/vsd-4cv.svg", "atlas/vsd-5cv.svg",
  "install.js", "account.js", "vendor/supabase-js-2.119.0.umd.js", "account.html", "teacher.html", "pages.css",
  "manifest.json", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-maskable-512.png", "icons/apple-touch-icon.png", "icons/favicon-64.png"
];
const FONT_HOSTS = ["fonts.googleapis.com", "fonts.gstatic.com"];

/* Кэшируем только успешные ответы (2xx). Ошибки 404/500, редиректы и непрозрачные ответы не кэшируются. */
const cacheable = r => r && r.ok && (r.type === "basic" || r.type === "cors");

self.addEventListener("install", e => {
  e.waitUntil((async () => {
    const cache = await caches.open(APP_CACHE);
    await Promise.all(FILES.map(async f => {
      const r = await fetch(f, { cache: "reload" });
      if (!cacheable(r)) throw new Error(`Не удалось закэшировать ${f}: ${r.status}`);
      await cache.put(f, r);
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith(PREFIX) && !KEEP.includes(k)).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (!/^https?:$/.test(url.protocol)) return;

  // Шрифты: сначала кэш, затем сеть.
  if (FONT_HOSTS.includes(url.hostname)) {
    e.respondWith((async () => {
      const cache = await caches.open(FONT_CACHE);
      const hit = await cache.match(req);
      if (hit) return hit;
      try {
        const r = await fetch(req);
        if (cacheable(r)) cache.put(req, r.clone());
        return r;
      } catch { return new Response("", { status: 504 }); }
    })());
    return;
  }

  // Чужие домены не обрабатываем.
  if (url.origin !== self.location.origin) return;

  // Эхограммы: сначала кэш, затем сеть (файлы неизменны — при замене меняется имя).
  if (url.pathname.includes("/img/")) {
    e.respondWith((async () => {
      const cache = await caches.open(IMG_CACHE);
      const hit = await cache.match(req, { ignoreSearch: true });
      if (hit) return hit;
      try {
        const r = await fetch(req);
        if (cacheable(r)) cache.put(req, r.clone());
        return r;
      } catch { return new Response("", { status: 504 }); }
    })());
    return;
  }

  // Файлы приложения: сначала сеть (свежий контент), при отсутствии сети — кэш.
  e.respondWith((async () => {
    const cache = await caches.open(APP_CACHE);
    try {
      const r = await fetch(req);
      if (cacheable(r)) cache.put(req, r.clone());
      return r;
    } catch {
      const hit = await cache.match(req, { ignoreSearch: true });
      if (hit) return hit;
      if (req.mode === "navigate") return (await cache.match("index.html")) || (await cache.match("./"));
      return new Response("Нет соединения", { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } });
    }
  })());
});
