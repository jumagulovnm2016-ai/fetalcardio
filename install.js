/* FetalCardio — установка приложения на телефон или ПК (PWA).
   Подключается в <head>, до остальных скриптов: событие beforeinstallprompt может прийти рано.
   Любой элемент с атрибутом data-install становится кнопкой установки:
   - Chrome, Edge, Яндекс, Samsung Internet (Android, Windows, macOS, Linux) — системное окно установки;
   - iPhone/iPad, Safari на Mac, Firefox, встроенные браузеры Instagram/Telegram/WhatsApp — пошаговая подсказка.
   В уже установленном приложении (отдельное окно) кнопки скрываются. */
(function () {
  "use strict";
  const FC = (window.FC = window.FC || {});
  const ua = navigator.userAgent || "";
  const root = document.documentElement;

  const mq = q => window.matchMedia && window.matchMedia(q).matches;
  const standalone = () =>
    mq("(display-mode: standalone)") || mq("(display-mode: fullscreen)") ||
    mq("(display-mode: minimal-ui)") || mq("(display-mode: window-controls-overlay)") ||
    navigator.standalone === true;

  const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/i.test(ua);
  const inApp = /Instagram|FBAN|FBAV|FB_IAB|Telegram|WhatsApp|Line\/|VKClient|OKApp|TikTok|musical_ly|\bwv\)/i.test(ua);
  const isFirefox = /Firefox|FxiOS/i.test(ua);
  const isEdge = /Edg(e|A|iOS)?\//.test(ua);
  const isSamsung = /SamsungBrowser/i.test(ua);
  const isYandex = /YaBrowser/i.test(ua);
  const isMacSafari = !isIOS && /Macintosh/.test(ua) && /Safari\//.test(ua) && !/Chrome|Chromium|Edg|OPR|YaBrowser|Firefox/.test(ua);

  let deferred = null; // событие beforeinstallprompt

  window.addEventListener("beforeinstallprompt", e => {
    e.preventDefault(); // своё окно не показываем сразу — только по кнопке
    deferred = e;
    root.classList.add("fc-can-install");
  });
  window.addEventListener("appinstalled", () => {
    deferred = null;
    root.classList.remove("fc-can-install");
    try { localStorage.setItem("fc_installed", "1"); } catch (e) {}
    closeModal();
    toast("Приложение установлено. Ищите значок FetalCardio на рабочем столе или экране «Домой».");
  });

  function sync() { root.classList.toggle("fc-standalone", standalone()); }
  sync();
  if (window.matchMedia) {
    const m = window.matchMedia("(display-mode: standalone)");
    if (m.addEventListener) m.addEventListener("change", sync);
  }

  /* ---------- стили (свои, чтобы работать и на странице входа, и поверх экрана «Нужно войти») ---------- */
  const css = `
.fc-standalone [data-install]{display:none!important}
.install-btn{height:40px;border-radius:12px;border:1px solid var(--line,#e4e8f0);background:var(--accent,#4256e0);color:#fff;
  display:inline-flex;align-items:center;gap:7px;padding:0 13px;font:600 14px var(--body,system-ui,sans-serif);cursor:pointer;
  white-space:nowrap;flex-shrink:0;transition:transform .15s,filter .2s}
.install-btn:hover{filter:brightness(1.07)}
.install-btn:active{transform:scale(.95)}
.install-btn svg,.fc-im svg,[data-install] svg{width:19px;height:19px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
@media (max-width:560px){.install-btn{width:40px;padding:0;justify-content:center}.install-btn span{display:none}}
.fc-im{position:fixed;inset:0;z-index:10000;display:grid;place-items:end center;background:rgba(10,15,30,.45);padding:12px;
  padding-bottom:calc(12px + env(safe-area-inset-bottom))}
@media (min-width:600px){.fc-im{place-items:center}}
.fc-im-box{width:100%;max-width:440px;max-height:calc(100vh - 24px);overflow:auto;background:var(--surface,#fff);color:var(--text,#101828);
  border:1px solid var(--line,#e4e8f0);border-radius:20px;padding:22px;box-shadow:0 20px 60px rgba(0,0,0,.25);
  font:15.5px/1.55 var(--body,system-ui,sans-serif)}
.fc-im-h{display:flex;align-items:center;gap:10px;margin:0 0 6px;font:800 1.25rem/1.25 var(--head,system-ui,sans-serif)}
.fc-im-h img{border-radius:10px}
.fc-im ol{margin:.6em 0;padding-left:1.3em}.fc-im li{margin:.45em 0}
.fc-im .muted{color:var(--muted,#5d6b82);font-size:.92em;margin:.6em 0 0}
.fc-im kbd{display:inline-block;font:600 .9em var(--body,system-ui,sans-serif);padding:1px 7px;border-radius:7px;
  background:var(--surface2,#f1f4f9);border:1px solid var(--line,#e4e8f0);white-space:nowrap}
.fc-im-row{display:flex;gap:10px;flex-wrap:wrap;margin-top:16px}
.fc-im-row button{border:0;border-radius:12px;padding:11px 18px;font:600 15px var(--body,system-ui,sans-serif);cursor:pointer;
  background:var(--accent,#4256e0);color:#fff}
.fc-im-row button.ghost{background:var(--surface2,#f1f4f9);color:var(--text,#101828);border:1px solid var(--line,#e4e8f0)}
.fc-it{position:fixed;left:50%;bottom:calc(96px + env(safe-area-inset-bottom));transform:translateX(-50%);z-index:10001;max-width:min(92vw,420px);
  background:var(--text,#101828);color:var(--bg,#fff);padding:11px 16px;border-radius:14px;font:500 14.5px/1.45 var(--body,system-ui,sans-serif);
  box-shadow:0 10px 30px rgba(0,0,0,.25)}`;
  const st = document.createElement("style");
  st.textContent = css;
  (document.head || root).appendChild(st);

  const ICON = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v11m0 0-4-4m4 4 4-4"/><path d="M5 15v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3"/></svg>`;
  const SHARE = `<svg viewBox="0 0 24 24" aria-hidden="true" style="width:16px;height:16px;vertical-align:-3px"><path d="M12 15V3m0 0-4 4m4-4 4 4"/><path d="M7 10H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-1"/></svg>`;

  /* ---------- подсказки по платформам ---------- */
  function guide() {
    const url = location.href.split("#")[0];
    if (inApp) return {
      title: "Откройте в обычном браузере",
      html: `<p>Встроенный браузер Instagram, Telegram или WhatsApp не умеет устанавливать приложения.</p>
        <ol><li>Нажмите <kbd>•••</kbd> или <kbd>⋮</kbd> в углу экрана.</li>
        <li>Выберите <kbd>Открыть в браузере</kbd> (${isIOS ? "Safari" : "Chrome"}).</li>
        <li>В браузере снова нажмите кнопку <kbd>Установить</kbd>.</li></ol>`,
      copy: url
    };
    if (isIOS) return {
      title: "Установка на iPhone / iPad",
      html: `<ol><li>Нажмите <kbd>${SHARE} Поделиться</kbd> — внизу экрана в Safari (в новых iOS сначала <kbd>•••</kbd>), в Chrome — в адресной строке.</li>
        <li>Прокрутите список и выберите <kbd>На экран «Домой»</kbd>.</li>
        <li>Нажмите <kbd>Добавить</kbd>. Значок FetalCardio появится на экране «Домой».</li></ol>
        <p class="muted">На iPhone установленное приложение хранит вход и прогресс отдельно от Safari: после установки войдите ещё раз. Прогресс можно перенести через «Экспорт в JSON» → «Импорт из файла» на главной.</p>`
    };
    if (isMacSafari) return {
      title: "Установка на Mac (Safari)",
      html: `<ol><li>В строке меню выберите <kbd>Файл</kbd> → <kbd>Добавить в Dock</kbd> (или кнопка <kbd>${SHARE}</kbd> → <kbd>Добавить в Dock</kbd>).</li>
        <li>Нажмите <kbd>Добавить</kbd>. FetalCardio откроется отдельным окном из Dock и Launchpad.</li></ol>
        <p class="muted">Нужна macOS Sonoma (14) или новее. В Chrome и Edge на Mac установка — одной кнопкой.</p>`
    };
    if (isFirefox && !isAndroid) return {
      title: "Firefox не устанавливает приложения",
      html: `<p>На компьютере Firefox не поддерживает установку веб-приложений. Откройте эту страницу в <b>Google Chrome</b>, <b>Microsoft Edge</b> или <b>Яндекс Браузере</b> и нажмите <kbd>Установить</kbd>.</p>`,
      copy: url
    };
    if (isAndroid) return {
      title: "Установка на Android",
      html: `<ol><li>Откройте меню браузера <kbd>⋮</kbd> ${isSamsung ? "или <kbd>≡</kbd> внизу" : "(справа вверху)"}.</li>
        <li>Выберите <kbd>Установить приложение</kbd> или <kbd>Добавить на главный экран</kbd>${isSamsung ? " (в Samsung Internet — <kbd>Добавить страницу на</kbd> → <kbd>Главный экран</kbd>)" : ""}.</li>
        <li>Подтвердите. Значок FetalCardio появится среди приложений.</li></ol>
        <p class="muted">Если пункта нет — приложение, возможно, уже установлено: поищите значок FetalCardio. Удобнее всего устанавливать в Google Chrome.</p>`
    };
    // компьютер: Chrome / Edge / Яндекс без готового окна установки
    return {
      title: "Установка на компьютер",
      html: `<ol>${isEdge
          ? `<li>Нажмите <kbd>•••</kbd> справа вверху → <kbd>Приложения</kbd> → <kbd>Установить этот сайт как приложение</kbd>.</li>`
          : isYandex
          ? `<li>Нажмите значок установки в правой части адресной строки или <kbd>≡</kbd> → <kbd>Дополнительно</kbd> → <kbd>Установить приложение</kbd>.</li>`
          : `<li>Нажмите значок установки (монитор со стрелкой) в правой части адресной строки<br>или <kbd>⋮</kbd> → <kbd>Трансляция, сохранение и отправка</kbd> → <kbd>Установить страницу как приложение</kbd>.</li>`}
        <li>Подтвердите <kbd>Установить</kbd>. FetalCardio откроется отдельным окном, значок появится на рабочем столе и в меню «Пуск».</li></ol>
        <p class="muted">Если пункта установки нет — приложение уже установлено на этом компьютере: найдите FetalCardio в меню «Пуск» или в Launchpad.</p>`
    };
  }

  /* ---------- окно с подсказкой ---------- */
  let modal = null, lastFocus = null;
  function closeModal() {
    if (!modal) return;
    modal.remove(); modal = null;
    document.removeEventListener("keydown", onKey);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function onKey(e) { if (e.key === "Escape") closeModal(); }
  function showGuide() {
    closeModal();
    const g = guide();
    lastFocus = document.activeElement;
    modal = document.createElement("div");
    modal.className = "fc-im";
    modal.setAttribute("role", "dialog"); modal.setAttribute("aria-modal", "true"); modal.setAttribute("aria-labelledby", "fc-im-t");
    modal.innerHTML = `<div class="fc-im-box">
      <div class="fc-im-h" id="fc-im-t"><img src="icons/icon-192.png" alt="" width="34" height="34"><span></span></div>
      ${g.html}
      <div class="fc-im-row">${g.copy ? `<button type="button" data-copy>Скопировать ссылку</button>` : ""}
        <button type="button" class="${g.copy ? "ghost" : ""}" data-close>Понятно</button></div></div>`;
    modal.querySelector(".fc-im-h span").textContent = g.title;
    modal.addEventListener("click", e => {
      if (e.target === modal || e.target.closest("[data-close]")) closeModal();
      const c = e.target.closest("[data-copy]");
      if (c) copy(g.copy).then(ok => { c.textContent = ok ? "Ссылка скопирована ✓" : g.copy; });
    });
    document.addEventListener("keydown", onKey);
    document.body.appendChild(modal);
    modal.querySelector("[data-close]").focus();
  }
  function copy(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(text).then(() => true, () => false);
    return Promise.resolve(false);
  }
  function toast(msg) {
    const t = document.createElement("div");
    t.className = "fc-it"; t.setAttribute("role", "status"); t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 4500);
  }

  /* ---------- установка ---------- */
  async function run() {
    if (standalone()) { toast("Приложение уже открыто как установленное."); return; }
    if (deferred && !inApp) {
      const e = deferred;
      deferred = null; // событие одноразовое
      root.classList.remove("fc-can-install");
      try {
        await e.prompt();
        const r = await e.userChoice;
        if (r && r.outcome === "dismissed") toast("Установка отменена. Кнопка «Установить» остаётся на месте.");
      } catch (err) { showGuide(); }
      return;
    }
    showGuide();
  }

  document.addEventListener("click", e => {
    const b = e.target.closest && e.target.closest("[data-install]");
    if (!b) return;
    e.preventDefault();
    run();
  });

  FC.install = {
    run,
    icon: ICON,
    get standalone() { return standalone(); },
    get canPrompt() { return !!deferred; },
    /* кнопка для вставки в разметку */
    button: (label, cls) => `<button type="button" class="${cls || "install-btn"}" data-install aria-label="Установить приложение">${ICON}<span>${label || "Установить"}</span></button>`
  };
})();
