(() => {
  const { META, CATS, VIEWS, ALGOS, CHD, QUIZ, REFS } = FC;
  const ATLAS = FC.ATLAS || [];
  const IMAGES = FC.IMAGES || [], IMAGE_GROUPS = FC.IMAGE_GROUPS || [];
  const check = FC.validate ? FC.validate(FC) : { errors: [] };
  if (check.errors.length) console.error("FetalCardio: ошибки контента", check.errors);
  const $app = document.getElementById("app");
  const store = {
    get(k, d) { try { const v = localStorage.getItem("fc_" + k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem("fc_" + k, JSON.stringify(v)); } catch {} }
  };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const byId = (arr, id) => arr.find(x => x.id === id);
  const studied = () => store.get("studied", {});
  const isDone = key => !!studied()[key];
  const toggleDone = key => { const s = studied(); s[key] ? delete s[key] : (s[key] = 1); store.set("studied", s); };

  /* ---------- иконки ---------- */
  const I = {
    chev: '<svg class="chev" viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></svg>',
    sun: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/></svg>',
    moon: '<svg viewBox="0 0 24 24"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/></svg>',
    auto: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 3.5v17" /><path d="M12 3.5a8.5 8.5 0 0 1 0 17z" fill="currentColor" stroke="none"/></svg>',
    views: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="3.5"/></svg>',
    algos: '<svg viewBox="0 0 24 24"><circle cx="5" cy="6" r="2.2"/><circle cx="5" cy="18" r="2.2"/><circle cx="19" cy="12" r="2.2"/><path d="M7.2 6H11v12H7.2M11 12h5.8"/></svg>',
    heart: '<svg viewBox="0 0 24 24"><path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z"/></svg>',
    quiz: '<svg viewBox="0 0 24 24"><rect x="4" y="3.5" width="16" height="17" rx="3"/><path d="m8.5 12 2.5 2.5 4.5-5"/></svg>'
  };

  /* ---------- тема ---------- */
  const THEMES = ["auto", "light", "dark"];
  const THEME_LABEL = { auto: "Тема: как в системе", light: "Тема: дневная", dark: "Тема: ночная" };
  const $themeBtn = document.getElementById("themeBtn");
  function applyTheme(t) {
    const root = document.documentElement;
    t === "auto" ? root.removeAttribute("data-theme") : root.setAttribute("data-theme", t);
    const dark = t === "dark" || (t === "auto" && matchMedia("(prefers-color-scheme: dark)").matches);
    document.getElementById("themeColor").setAttribute("content", dark ? "#0a0f1a" : "#f5f7fb");
    $themeBtn.innerHTML = I[t === "auto" ? "auto" : t === "light" ? "sun" : "moon"];
    $themeBtn.title = THEME_LABEL[t]; $themeBtn.setAttribute("aria-label", THEME_LABEL[t]);
  }
  let theme = store.get("theme", "auto");
  applyTheme(theme);
  $themeBtn.addEventListener("click", () => {
    theme = THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length];
    store.set("theme", theme); applyTheme(theme); toast(THEME_LABEL[theme]);
  });
  matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change", () => theme === "auto" && applyTheme("auto"));

  let toastTimer;
  function toast(msg) {
    let el = document.getElementById("toast");
    if (!el) {
      el = document.createElement("div"); el.id = "toast";
      el.style.cssText = "position:fixed;left:50%;top:70px;transform:translateX(-50%);z-index:50;padding:9px 16px;border-radius:12px;font-size:14px;font-weight:600;background:var(--text);color:var(--bg);box-shadow:var(--shadow-lg);transition:opacity .25s;pointer-events:none";
      document.body.appendChild(el);
    }
    el.textContent = msg; el.style.opacity = "1";
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.style.opacity = "0", 1300);
  }

  /* ---------- общие блоки ---------- */
  const statusBadge = st => st === "approved"
    ? `<span class="badge ok">✓ проверено автором</span>`
    : `<span class="badge draft">● черновик · на проверке</span>`;

  const refsBlock = refs => {
    if (!refs || !refs.length) return "";
    const items = refs.map(r => {
      const s = REFS[r.source]; if (!s) return "";
      return `<li><b>${esc(s.organization)}</b>. ${esc(s.title)}. <i>${esc(s.journal || "")}</i> ${s.year}${s.volume ? `;${esc(s.volume)}` : ""}${s.pages ? `:${esc(s.pages)}` : ""}.
        ${s.doi ? `<a href="${esc(s.url)}" target="_blank" rel="noopener">doi:${esc(s.doi)}</a>` : `<a href="${esc(s.url)}" target="_blank" rel="noopener">ссылка</a>`}
        <br><span class="badge ${r.verified ? "ok" : "draft"}">${r.verified ? "сверено с текстом" : "источник по теме, утверждения не сверены"}</span></li>`;
    }).join("");
    return `<h2 id="s-refs">Источники</h2><ol class="refs">${items}</ol>`;
  };

  /* ---------- эхограммы из открытых источников ---------- */
  const imgCredit = s => s.kind === "article"
    ? `${esc(s.authors)} ${esc(s.title)}${/[.?!]$/.test(s.title) ? "" : "."} <i>${esc(s.journal)}</i> ${s.year}, ${esc(s.figure)}. Лицензия ${esc(s.license)}.`
    : `${esc(s.authors)}. ${esc(s.title)}. Wikimedia Commons. ${s.licenseUrl ? `Лицензия <a href="${esc(s.licenseUrl)}" target="_blank" rel="noopener">${esc(s.license)}</a>` : esc(s.license === "Public domain" ? "Общественное достояние" : s.license)}.`;
  const thumbs = list => `<div class="imgs">${list.map(im => `<a class="imgs-i" href="#/img/${im.id}">
      <img src="${esc(im.file)}" alt="${esc(im.label)}" loading="lazy" decoding="async"><span>${esc(im.label)}</span></a>`).join("")}</div>`;
  const imgBlock = card => {
    const list = IMAGES.filter(im => im.cards.includes(card));
    if (!list.length) return "";
    return `<h2 id="s-img">Эхограммы из открытых источников</h2>
      <p class="small muted">${statusBadge("draft")} Привязка снимков к карточке и перевод подписей авторов не проверены экспертом. Нажмите на снимок — откроется подпись, источник и лицензия.</p>
      ${thumbs(list)}`;
  };

  const doneMark = key => isDone(key) ? '<span class="done-mark">✓</span>' : I.chev;

  const item = (href, tile, title, sub, key, tileCls = "") => `<a class="card list-item" href="${href}">
    <span class="tile ${tileCls}">${tile}</span>
    <span class="li-body"><b>${esc(title)}</b><br><span class="small muted">${sub}</span></span>${doneMark(key)}</a>`;

  const ddxList = items => `<div class="ddx">${items.map(d => {
    const inner = `<b>${esc(d.name)}</b><span class="small muted">${esc(d.key)}</span>`;
    return d.id && byId(CHD, d.id) ? `<a class="card" href="#/chd/${d.id}">${inner}</a>` : `<div class="card">${inner}</div>`;
  }).join("")}</div>`;

  const foot = () => `<footer class="foot">${esc(META.title)} ${esc(META.version)} · ${esc(META.author)} · ${esc(META.updated)}<br>
    Учебный материал для врачей. Не заменяет экспертную фетальную ЭхоКГ и клиническое решение. Схемы условные, не являются УЗ-изображениями. Эхограммы — из открытых источников, авторы и лицензии указаны у каждого снимка.</footer>`;

  const doneBtn = key => `<button class="btn ${isDone(key) ? "done" : ""}" data-done="${key}">${isDone(key) ? "✓ Изучено" : "Отметить как изученное"}</button>`;

  /* ---------- страницы ---------- */
  function home() {
    const total = VIEWS.length + ALGOS.length + CHD.length + ATLAS.length;
    const done = Object.keys(studied()).length;
    const best = store.get("quizBest", null);
    const feat = (href, icon, cls, title, sub) => `<a class="card feature" href="${href}"><span class="tile ${cls}">${icon}</span>
      <span><h3>${title}</h3><span class="small muted">${sub}</span></span></a>`;
    return `<section class="hero">
      <div class="kicker">Фетальная эхокардиография</div>
      <h1>От находки к диагнозу</h1>
      <p>Врач у аппарата видит не «тетраду Фалло», а «аорту верхом» или «два сосуда в 3VV». Поэтому здесь путь начинается со среза и находки.</p>
      <div class="stats">
        <div class="stat"><b>${done}/${total}</b><span>изучено</span></div>
        <div class="stat"><b>${best ? `${best.score}/${best.total}` : "—"}</b><span>лучший тест</span></div>
        <div class="stat"><b>${CHD.length}</b><span>пороков</span></div>
      </div>
      <div class="progress" style="margin:14px 0 0"><i style="width:${Math.round(done / total * 100)}%"></i></div>
    </section>
    <div class="grid two">
      ${feat("#/views", I.views, "", "Стандартные срезы", "Situs, 4CV, LVOT, RVOT, 3VV, 3VT — схема, техника, чек-лист, ошибки.")}
      ${feat("#/algos", I.algos, "", "От находки к диагнозу", `${ALGOS.length} алгоритмов: что проверить и какой дифференциальный ряд.`)}
      ${feat("#/chd", I.heart, "red", "Атлас пороков", `${CHD.length} ключевых ВПС: критерии, срезы, дифдиагноз, ловушки.`)}
      ${feat("#/quiz", I.quiz, "red", "Проверка знаний", `${QUIZ.length} вопросов с разбором ответов.`)}
    </div>
    ${IMAGES.length ? `<a class="card feature" href="#/images"><span class="tile red">${I.views}</span>
      <span><h3>Библиотека эхограмм</h3><span class="small muted">${IMAGES.length} снимков и рисунков из открытых источников с указанием автора и лицензии. Черновик.</span></span></a>` : ""}
    ${ATLAS.length ? `<a class="card feature" href="#/atlas"><span class="tile">${I.views}</span>
      <span><h3>Анатомический атлас</h3><span class="small muted">Подробные анатомические схемы срезов с подписями и легендой. Черновики — на экспертной проверке.</span></span></a>` : ""}
    <div class="card">
      <div class="row between"><h3 style="margin:0">Мой прогресс</h3><span class="small muted">${done} из ${total}</span></div>
      <p class="small muted" style="margin:.4em 0 .8em">Прогресс хранится только в этом браузере. Сохраните его в файл, чтобы перенести на другое устройство.</p>
      ${FC.account && FC.account.enabled ? `<p class="small" style="margin:0 0 .8em"><a href="account.html">Личный кабинет${FC.account.profile && FC.account.profile.role === "teacher" ? " · кабинет преподавателя" : ""} →</a></p>` : ""}
      <div class="row"><button class="btn ghost" data-export="1">⤓ Экспорт в JSON</button>
      <button class="btn ghost" data-import="1">⤒ Импорт из файла</button></div>
      <input type="file" id="importFile" accept="application/json,.json" hidden>
    </div>
    <div class="note"><b>Главное правило.</b> Ни один срез не исключает ВПС сам по себе. Нормальный 4CV не исключает ТФ, ТМА, ОАС, коарктацию и ТАДЛВ — всегда оценивайте выводные тракты и 3VV/3VT.</div>
    ${foot()}`;
  }

  function viewsList() {
    return `<h1>Стандартные срезы</h1>
      <p class="subtitle">Скрининг сердца плода по порядку: situs → 4CV → LVOT → RVOT → 3VV → 3VT. Сегментарный принцип: предсердия, желудочки, магистральные артерии и соединения между ними.</p>
      ${VIEWS.map(v => item(`#/view/${v.id}`, esc(v.abbr), v.name, `${v.check.length} пунктов чек-листа`, "v_" + v.id)).join("")}${foot()}`;
  }

  function viewPage(id) {
    const v = byId(VIEWS, id); if (!v) return notFound();
    const algos = ALGOS.filter(a => a.view === id);
    const idx = VIEWS.indexOf(v), prev = VIEWS[idx - 1], next = VIEWS[idx + 1];
    return `<div class="crumb"><a href="#/views">Срезы</a> / ${esc(v.abbr)}</div>
      <h1>${esc(v.name)}</h1>
      <div>${statusBadge(v.status)}</div>
      <figure class="scheme">${SCHEMES[id] ? SCHEMES[id]() : ""}<figcaption>Схема нормы, приближенная к анатомии поперечного среза (черновик, пропорции условны). Верх — кпереди, низ — позвоночник, левая сторона плода — справа.</figcaption></figure>
      ${ATLAS.filter(t => t.view === id).map(t => item(`#/atlas/${t.id}`, esc(t.abbr), "Подробная анатомическая схема среза", `Атлас: ${t.structures.length} структур с подписями и легендой · черновик`, "t_" + t.id)).join("")}
      <h2>Как получить</h2><ol class="steps">${v.how.map(x => `<li>${esc(x)}</li>`).join("")}</ol>
      <h2>Что оценить в норме</h2><ul class="check">${v.check.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
      <h2>Типичные ошибки</h2><ul class="err">${v.errors.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
      <h2>Патологические находки</h2><ul>${v.abnormal.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
      ${imgBlock("view:" + id)}
      ${algos.length ? `<h2>Алгоритмы для этого среза</h2>${algos.map(a => item(`#/algo/${a.id}`, I.algos, a.title, esc(a.finding), "a_" + a.id)).join("")}` : ""}
      ${refsBlock(v.references)}
      <div class="row" style="margin-top:18px">${doneBtn("v_" + id)}</div>
      <div class="pager">
        ${prev ? `<a class="card" href="#/view/${prev.id}"><small>← Назад</small><b>${esc(prev.abbr)}</b></a>` : ""}
        ${next ? `<a class="card next" href="#/view/${next.id}"><small>Далее →</small><b>${esc(next.abbr)}</b></a>` : ""}</div>${foot()}`;
  }

  /* ---------- библиотека эхограмм ---------- */
  function imagesList() {
    return `<h1>Библиотека эхограмм</h1>
      <p class="subtitle">${IMAGES.length} изображений из статей открытого доступа (CC BY) и Wikimedia Commons. Подписи переведены на русский (черновик), оригинал автора — под переводом. У каждого снимка указаны источник и лицензия.</p>
      <div class="note">${statusBadge("draft")} <b>Черновик.</b> Распределение по разделам и привязка к карточкам не проверены экспертом. Снимки не подтверждают текст карточек: источники утверждений — в разделах «Источники».</div>
      <nav class="toc">${IMAGE_GROUPS.map((g, i) => IMAGES.some(im => im.group === g) ? `<a href="javascript:void(0)" data-jump="g${i}">${esc(g)}</a>` : "").join("")}</nav>
      ${IMAGE_GROUPS.map((g, i) => { const list = IMAGES.filter(im => im.group === g); return list.length ? `<h2 id="s-g${i}">${esc(g)} <span class="small muted">· ${list.length}</span></h2>${thumbs(list)}` : ""; }).join("")}
      ${foot()}`;
  }

  function imagePage(id) {
    const im = byId(IMAGES, id); if (!im) return notFound();
    const list = IMAGES.filter(x => x.group === im.group), i = list.indexOf(im), prev = list[i - 1], next = list[i + 1];
    const links = im.cards.map(c => { const [k, cid] = c.split(":"); const x = byId(k === "chd" ? CHD : VIEWS, cid);
      return x ? `<a class="badge view" href="#/${k}/${cid}">${esc(k === "chd" ? x.abbr : "Срез " + x.abbr)}</a>` : ""; }).join(" ");
    return `<div class="crumb"><a href="#/images">Эхограммы</a> / ${esc(im.group)}</div>
      <h1>${esc(im.label)}</h1>
      <div>${statusBadge(im.status)}</div>
      <figure class="imgfig"><a href="${esc(im.file)}" target="_blank" rel="noopener"><img src="${esc(im.file)}" alt="${esc(im.label)}"></a>
        <figcaption>${im.captionRu ? `<p class="cap-ru">${esc(im.captionRu)}</p>` : ""}
          ${im.caption ? `<details class="cap-en"${im.captionRu ? "" : " open"}><summary>Оригинальная подпись автора</summary><p lang="${im.source.kind === "commons" && /semanas/.test(im.id) ? "es" : "en"}">${esc(im.caption)}</p></details>` : ""}
          ${im.group === IMAGE_GROUPS[IMAGE_GROUPS.length - 1] ? '<p class="small muted">Автор не указал, какой срез на снимке. Требует экспертной разметки.</p>' : ""}
          ${im.captionRu ? `<p><span class="badge draft wrap">перевод подписи — черновик, не проверен экспертом</span></p>` : ""}</figcaption></figure>
      <h2>Источник и лицензия</h2>
      <p class="small">${imgCredit(im.source)} <a href="${esc(im.source.url)}" target="_blank" rel="noopener">Открыть источник ↗</a></p>
      ${im.source.license.startsWith("CC BY-SA") ? '<p class="small muted">CC BY-SA: изменённую версию (стрелки, подписи, кадрирование) распространяйте под той же лицензией.</p>' : ""}
      ${links ? `<h2>Привязан к карточкам</h2><p>${links}</p>` : ""}
      <div class="pager">
        ${prev ? `<a class="card" href="#/img/${prev.id}"><small>← Назад</small><b>${esc(prev.label)}</b></a>` : ""}
        ${next ? `<a class="card next" href="#/img/${next.id}"><small>Далее →</small><b>${esc(next.label)}</b></a>` : ""}</div>${foot()}`;
  }

  /* ---------- анатомический атлас ---------- */
  function atlasList() {
    return `<h1>Анатомический атлас</h1>
      <p class="subtitle">Подробные анатомические схемы стандартных срезов. Это рисунки строения сердца, а не УЗ-изображения. Все схемы — черновики до проверки врачом-экспертом.</p>
      ${ATLAS.map(t => item(`#/atlas/${t.id}`, esc(t.abbr), t.title, `${t.structures.length} структур · черновик`, "t_" + t.id)).join("")}${foot()}`;
  }

  function atlasPage(id) {
    const t = byId(ATLAS, id); if (!t) return notFound();
    const v = byId(VIEWS, t.view);
    const legend = t.structures.map(s => `<li><button type="button" data-hl="${esc(s.key)}" aria-pressed="false">
      <span class="n ${s.n ? "" : "o"}">${s.n || "•"}</span>
      <span><b>${esc(s.name)}</b> (${esc(s.abbr)})${s.note ? `<small>${esc(s.note)}</small>` : ""}</span></button></li>`).join("");
    return `<div class="crumb"><a href="#/atlas">Атлас</a> / <a href="#/view/${v.id}">${esc(v.abbr)}</a></div>
      <h1>${esc(t.title)}</h1>
      <div class="row">${statusBadge(t.status)} ${t.status !== "approved" ? '<span class="badge review">DRAFT · REQUIRE EXPERT REVIEW</span>' : ""}</div>
      <div class="note info small">${esc(t.orientation)}</div>
      <figure class="atlas-fig" id="atlasFig" data-atlas="${esc(t.id)}">
        <div class="atlas-bar"><span class="small">Нажмите на структуру в легенде — она подсветится на схеме.</span>
          <span class="row"><button class="btn ghost" type="button" data-labels="1" aria-pressed="false">Скрыть подписи</button>
          <a class="btn ghost" href="${esc(t.svg)}" target="_blank" rel="noopener">SVG ↗</a></span></div>
        <div class="atlas-scroll" id="atlasSvg"><div class="atlas-loading">Загрузка схемы…</div></div>
        <figcaption>Оригинальная схема FetalCardio. Анатомический рисунок, не УЗ-изображение; пропорции условны. Статус: черновик.</figcaption>
      </figure>
      <h2>Структуры на схеме</h2><ol class="legend">${legend}</ol>
      <h2>Нормальные анатомические признаки ${esc(t.abbr)}</h2><ul class="check">${t.normal.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
      <h2>Требует экспертной проверки</h2><ul class="err">${t.review.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
      ${refsBlock(t.references)}
      <div class="row" style="margin-top:18px">${doneBtn("t_" + id)}</div>
      <div class="pager"><a class="card" href="#/view/${v.id}"><small>← Срез</small><b>${esc(v.name)}</b></a></div>${foot()}`;
  }

  /* SVG встраивается в страницу (а не через <img>), чтобы работали темы и подсветка структур. */
  const svgCache = {};
  async function mountAtlas() {
    const fig = document.getElementById("atlasFig"); if (!fig) return;
    const t = byId(ATLAS, fig.dataset.atlas), box = document.getElementById("atlasSvg");
    try {
      if (!svgCache[t.svg]) {
        const r = await fetch(t.svg);
        if (!r.ok) throw new Error(r.status);
        svgCache[t.svg] = await r.text();
      }
      const doc = new DOMParser().parseFromString(svgCache[t.svg], "image/svg+xml");
      const svg = doc.documentElement;
      if (svg.nodeName !== "svg" || doc.querySelector("parsererror")) throw new Error("parse");
      svg.querySelectorAll("script, foreignObject").forEach(n => n.remove());
      if (document.getElementById("atlasFig") !== fig) return; // страницу успели сменить
      box.replaceChildren(document.importNode(svg, true));
    } catch {
      box.innerHTML = `<img src="${esc(t.svg)}" alt="${esc(t.title)}" style="display:block;width:100%;min-width:900px;height:auto">`;
    }
  }

  function algosList() {
    const groups = VIEWS.map(v => ({ v, items: ALGOS.filter(a => a.view === v.id) })).filter(g => g.items.length);
    return `<h1>От находки к диагнозу</h1>
      <p class="subtitle">Выберите, что вы видите на экране. Алгоритм подскажет, что проверить дальше и какие пороки входят в дифференциальный ряд.</p>
      ${groups.map(g => `<h2>${esc(g.v.abbr)}</h2>${g.items.map(a => item(`#/algo/${a.id}`, esc(g.v.abbr), a.title, esc(a.finding), "a_" + a.id)).join("")}`).join("")}${foot()}`;
  }

  function algoPage(id) {
    const a = byId(ALGOS, id); if (!a) return notFound();
    const v = byId(VIEWS, a.view);
    return `<div class="crumb"><a href="#/algos">Находки</a> / <a href="#/view/${v.id}">${esc(v.abbr)}</a></div>
      <h1>${esc(a.title)}</h1><p class="subtitle">${esc(a.finding)}</p><div>${statusBadge(a.status)}</div>
      <h2>Что проверить</h2><ol class="steps">${a.steps.map(s => `<li>${esc(s)}</li>`).join("")}</ol>
      <h2>Дифференциальный ряд</h2>${ddxList(a.ddx)}
      ${a.note ? `<div class="note info">${esc(a.note)}</div>` : ""}
      <div class="note">Алгоритм сужает поиск, но не ставит диагноз. При любой находке — экспертная фетальная ЭхоКГ.</div>
      <div class="row" style="margin-top:18px">${doneBtn("a_" + id)}</div>${foot()}`;
  }

  let chdFilter = "all";
  function chdList() {
    const list = CHD.filter(c => chdFilter === "all" || c.cat === chdFilter);
    return `<h1>Атлас пороков</h1>
      <div class="chips">${[["all", "Все"], ...Object.entries(CATS)].map(([k, t]) =>
        `<button class="chip ${chdFilter === k ? "on" : ""}" data-filter="${k}">${esc(t)}</button>`).join("")}</div>
      ${list.map(c => item(`#/chd/${c.id}`, esc(c.abbr.slice(0, 5)), c.name,
        `${esc(c.en)}<br><span class="badge" style="margin-top:6px">${esc(c.level)}</span>${c.normal4cv ? '<span class="badge view">4CV часто норма</span>' : ""}`,
        "c_" + c.id, "red")).join("")}
      ${list.length ? "" : '<p class="muted">Нет пороков в этой группе.</p>'}${foot()}`;
  }

  function chdPage(id) {
    const c = byId(CHD, id); if (!c) return notFound();
    const algos = ALGOS.filter(a => a.ddx.some(d => d.id === id));
    const sec = [["def", "Суть"], ["keys", "Критерии"], ["views", "Срезы"], ["ddx", "Дифдиагноз"], ["assoc", "Сочетания"], ["pit", "Ловушки"], ["prog", "Прогноз"],
      ...(IMAGES.some(im => im.cards.includes("chd:" + id)) ? [["img", "Эхограммы"]] : []), ["refs", "Источники"]];
    return `<div class="crumb"><a href="#/chd">Пороки</a> / ${esc(CATS[c.cat])}</div>
      <h1>${esc(c.name)}</h1>
      <p class="subtitle">${esc(c.en)}</p>
      <div><span class="badge">${esc(c.level)}</span>${statusBadge(c.status)}</div>
      <nav class="toc">${sec.map(([k, t]) => `<a href="javascript:void(0)" data-jump="${k}">${t}</a>`).join("")}</nav>
      ${c.normal4cv ? `<div class="note"><b>Четырёхкамерный срез часто нормальный.</b> Порок выявляется в выводных трактах и 3VV/3VT.</div>` : ""}
      <h2 id="s-def">Суть</h2><p>${esc(c.def)}</p><p class="small muted">${esc(c.freq)}</p>
      <h2 id="s-keys">Ключевые критерии</h2><ul class="check">${c.keys.map(k => `<li>${esc(k)}</li>`).join("")}</ul>
      <h2 id="s-views">По срезам</h2><table class="vt">${Object.entries(c.views).map(([k, t]) => `<tr><td>${esc(k)}</td><td>${esc(t)}</td></tr>`).join("")}</table>
      <h2 id="s-ddx">Дифференциальная диагностика</h2>${ddxList(c.ddx)}
      <h2 id="s-assoc">Сочетания и генетика</h2><p>${esc(c.assoc)}</p>
      <h2 id="s-pit">Диагностические ловушки</h2><ul class="err">${c.pitfalls.map(p => `<li>${esc(p)}</li>`).join("")}</ul>
      <h2 id="s-prog">Ведение и прогноз</h2><p>${esc(c.prognosis)}</p>
      <div class="note info"><b>Тактика:</b> ${esc(c.refer)}</div>
      ${imgBlock("chd:" + id)}
      ${refsBlock(c.references)}
      ${algos.length ? `<h2>Где встречается в алгоритмах</h2>${algos.map(a => item(`#/algo/${a.id}`, esc(byId(VIEWS, a.view).abbr), a.title, esc(a.finding), "a_" + a.id)).join("")}` : ""}
      <div class="row" style="margin-top:18px">${doneBtn("c_" + id)}</div>${foot()}`;
  }

  /* ---------- тест ---------- */
  let quiz = null;
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  function startQuiz(n) {
    quiz = { items: shuffle(QUIZ).slice(0, n).map(q => ({ ...q, order: shuffle(q.opts.map((_, i) => i)) })),
      i: 0, score: 0, answered: false, choice: null, wrong: [] };
  }
  function quizPage() {
    if (!quiz) {
      const best = store.get("quizBest", null);
      return `<h1>Проверка знаний</h1>
        <p class="subtitle">Вопросы выбираются случайно, варианты перемешиваются. После каждого ответа — разбор.</p>
        ${best ? `<div class="card row between"><span class="muted">Лучший результат</span><b>${best.score} из ${best.total}</b></div>` : ""}
        <div class="row" style="margin-top:14px"><button class="btn" data-quiz="10">Начать: 10 вопросов</button><button class="btn ghost" data-quiz="${QUIZ.length}">Все ${QUIZ.length}</button></div>${foot()}`;
    }
    const total = quiz.items.length;
    if (quiz.i >= total) {
      const best = store.get("quizBest", null);
      const pct = quiz.score / total;
      if (!best || pct > best.score / best.total) store.set("quizBest", { score: quiz.score, total });
      const wrong = quiz.wrong.map(q => `<div class="card"><b>${esc(q.q)}</b><br><span class="small">Верно: <b>${esc(q.opts[q.a])}</b></span><br>
        <span class="small muted">${esc(q.exp)}</span>${q.link ? `<br><a class="small" href="#/chd/${q.link}">Открыть карточку →</a>` : ""}</div>`).join("");
      return `<div class="card" style="text-align:center;padding:26px 18px">
          <div class="kicker muted">Результат</div><div class="score">${quiz.score} / ${total}</div>
          <div class="progress" style="max-width:280px;margin:14px auto"><i style="width:${Math.round(pct * 100)}%"></i></div>
          <p class="muted" style="margin:0">${pct >= .85 ? "Отличный уровень." : pct >= .6 ? "Хорошая база — повторите разобранные вопросы." : "Стоит вернуться к срезам и алгоритмам."}</p></div>
        ${wrong ? `<h2>Разбор ошибок</h2>${wrong}` : ""}
        <div class="row" style="margin-top:14px"><button class="btn" data-quiz="10">Ещё раз</button><button class="btn ghost" data-quizreset="1">К началу</button></div>${foot()}`;
    }
    const q = quiz.items[quiz.i];
    const letters = "АБВГ";
    const opts = q.order.map((oi, k) => {
      let cls = "opt";
      if (quiz.answered) { if (oi === q.a) cls += " right"; else if (oi === quiz.choice) cls += " wrong"; }
      return `<button class="${cls}" data-ans="${oi}" ${quiz.answered ? "disabled" : ""}><span class="ol">${letters[k]}</span><span>${esc(q.opts[oi])}</span></button>`;
    }).join("");
    return `<div class="row between"><span class="small muted">Вопрос ${quiz.i + 1} из ${total}</span><span class="badge ok">Верно: ${quiz.score}</span></div>
      <div class="progress"><i style="width:${Math.round(quiz.i / total * 100)}%"></i></div>
      <h2 style="margin-top:4px">${esc(q.q)}</h2>${opts}
      ${quiz.answered ? `<div class="note ${quiz.choice === q.a ? "info" : ""}">${quiz.choice === q.a ? "<b>Верно.</b> " : "<b>Неверно.</b> "}${esc(q.exp)}
        ${q.link ? `<br><a href="#/chd/${q.link}">Открыть карточку порока →</a>` : ""}</div>
        <button class="btn" data-next="1">${quiz.i + 1 < total ? "Дальше →" : "Результат"}</button>` : ""}`;
  }

  /* ---------- поиск ---------- */
  let searchIndex = null;
  function searchPage(q) {
    if (!q.trim()) return `<h1>Поиск</h1><p class="muted">Введите запрос: название, сокращение (ТФ, TOF, 3VT), синоним или признак.</p>`;
    searchIndex = searchIndex || FC.search.buildIndex(FC);
    const res = FC.search.query(searchIndex, q);
    const hl = sn => {
      let out = "", pos = 0;
      sn.ranges.forEach(([s, e]) => { out += esc(sn.text.slice(pos, s)) + "<mark>" + esc(sn.text.slice(s, e)) + "</mark>"; pos = e; });
      return (sn.pre ? "…" : "") + out + esc(sn.text.slice(pos)) + (sn.post ? "…" : "");
    };
    const kind = { view: ["срез", ""], algo: ["находка", ""], chd: ["порок", "red"], atlas: ["атлас", ""] };
    const rows = res.map(r => {
      const tile = r.type === "chd" ? esc(byId(CHD, r.id).abbr.slice(0, 5)) : r.type === "view" ? esc(byId(VIEWS, r.id).abbr)
        : r.type === "atlas" ? esc(byId(ATLAS, r.id).abbr) : I.algos;
      const sub = r.snippet ? `<span class="badge view">${esc(r.snippet.label)}</span> ${hl(r.snippet)}` : kind[r.type][0];
      return item(r.href, tile, r.title, sub, ({ view: "v_", algo: "a_", chd: "c_", atlas: "t_" })[r.type] + r.id, kind[r.type][1]);
    });
    return `<h1>Поиск</h1><p class="subtitle">«${esc(q)}» — найдено: ${res.length}</p>${rows.length ? rows.join("") : '<p class="muted">Ничего не найдено. Попробуйте сокращение (ТФ, TOF, 3VT), английское название или признак («верхом», «коронарный синус»).</p>'}`;
  }

  const notFound = () => `<h1>Страница не найдена</h1><p><a href="#/">На главную</a></p>`;

  /* ---------- роутер ---------- */
  function render() {
    const h = location.hash.replace(/^#\/?/, "");
    const [path, qs] = h.split("?");
    const [p, id] = path.split("/");
    let html, nav = p || "home";
    switch (p) {
      case "": case undefined: html = home(); break;
      case "views": html = viewsList(); break;
      case "view": html = viewPage(id); nav = "views"; break;
      case "algos": html = algosList(); break;
      case "algo": html = algoPage(id); nav = "algos"; break;
      case "chd": html = id ? chdPage(id) : chdList(); break;
      case "atlas": html = id ? atlasPage(id) : atlasList(); nav = "views"; break;
      case "images": html = imagesList(); nav = ""; break;
      case "img": html = imagePage(id); nav = ""; break;
      case "quiz": html = quizPage(); break;
      case "search": html = searchPage(decodeURIComponent((qs || "").replace(/^q=/, ""))); nav = ""; break;
      default: html = notFound();
    }
    $app.innerHTML = html;
    $app.style.animation = "none"; void $app.offsetWidth; $app.style.animation = "";
    document.querySelectorAll("#nav a").forEach(a => a.classList.toggle("active", a.dataset.nav === nav));
    if (p === "atlas" && id) mountAtlas();
  }

  $app.addEventListener("click", e => {
    const t = e.target.closest("button, a[data-jump]");
    if (!t) return;
    if (t.dataset.done) { toggleDone(t.dataset.done); render(); }
    else if (t.dataset.hl) highlight(t.dataset.hl);
    else if (t.dataset.labels) {
      const fig = document.getElementById("atlasFig"), off = fig.classList.toggle("nolabels");
      t.textContent = off ? "Показать подписи" : "Скрыть подписи"; t.setAttribute("aria-pressed", off);
    }
    else if (t.dataset.filter) { chdFilter = t.dataset.filter; render(); }
    else if (t.dataset.jump) {
      const el = document.getElementById("s-" + t.dataset.jump);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - 120, behavior: "smooth" });
    }
    else if (t.dataset.quiz) { startQuiz(+t.dataset.quiz); render(); window.scrollTo(0, 0); }
    else if (t.dataset.quizreset) { quiz = null; render(); }
    else if (t.dataset.ans !== undefined) {
      const q = quiz.items[quiz.i]; quiz.answered = true; quiz.choice = +t.dataset.ans;
      if (quiz.choice === q.a) quiz.score++; else quiz.wrong.push(q);
      render();
    }
    else if (t.dataset.export) exportProgress();
    else if (t.dataset.import) document.getElementById("importFile").click();
    else if (t.dataset.next) { quiz.i++; quiz.answered = false; quiz.choice = null; render(); window.scrollTo(0, 0); }
  });

  function highlight(key) {
    const svg = document.querySelector("#atlasSvg svg");
    const btn = document.querySelector(`[data-hl="${key}"]`);
    const on = btn.getAttribute("aria-pressed") !== "true";
    document.querySelectorAll("[data-hl]").forEach(b => b.setAttribute("aria-pressed", "false"));
    if (svg) {
      svg.querySelectorAll(".hl").forEach(n => n.classList.remove("hl"));
      svg.classList.toggle("focus", on);
      if (on) svg.querySelectorAll(`[data-s="${key}"]`).forEach(n => n.classList.add("hl"));
    }
    if (on) {
      btn.setAttribute("aria-pressed", "true");
      // на узком экране схема шире рамки — прокручиваем к подсвеченной структуре
      const box = document.getElementById("atlasSvg"), el = svg && svg.querySelector(`#heart [data-s="${key}"]`);
      if (box && el && box.scrollWidth > box.clientWidth) {
        const b = box.getBoundingClientRect(), e = el.getBoundingClientRect();
        box.scrollTo({ left: box.scrollLeft + (e.left + e.width / 2) - (b.left + b.width / 2), behavior: "smooth" });
      }
      const fig = document.getElementById("atlasFig"), r = fig.getBoundingClientRect();
      if (r.top < 60 || r.top > innerHeight * .5) window.scrollTo({ top: r.top + scrollY - 80, behavior: "smooth" });
    }
  }

  function exportProgress() {
    const data = FC.progress.build({ studied: studied(), quizBest: store.get("quizBest", null) });
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `fetalcardio-progress-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    toast("Прогресс сохранён в файл");
  }

  $app.addEventListener("change", async e => {
    if (e.target.id !== "importFile" || !e.target.files[0]) return;
    const file = e.target.files[0]; e.target.value = "";
    if (file.size > 1e6) return alert("Файл слишком большой для файла прогресса.");
    const res = FC.progress.parse(await file.text(), FC);
    if (!res.ok) return alert("Импорт невозможен. " + res.error);
    const cur = Object.keys(studied()).length, next = Object.keys(res.data.studied).length;
    const best = store.get("quizBest", null), nb = res.data.quizBest;
    const msg = [
      "Текущий прогресс будет заменён данными из файла.",
      `Изучено: ${cur} → ${next}`,
      `Лучший тест: ${best ? best.score + "/" + best.total : "—"} → ${nb ? nb.score + "/" + nb.total : "—"}`,
      res.skipped.length ? `Пропущено неизвестных записей: ${res.skipped.length}` : "",
      "", "Продолжить?"
    ].filter(x => x !== null).join("\n");
    if (!confirm(msg)) return;
    store.set("studied", res.data.studied);
    nb ? store.set("quizBest", nb) : (() => { try { localStorage.removeItem("fc_quizBest"); } catch {} })();
    render(); toast("Прогресс импортирован");
  });

  document.getElementById("searchForm").addEventListener("submit", e => {
    e.preventDefault();
    const q = document.getElementById("searchInput").value;
    location.hash = "#/search?q=" + encodeURIComponent(q);
    document.getElementById("searchInput").blur();
  });

  /* Доступ: без входа приложение закрыто (account.js). Пока сервер не настроен — открыто. */
  const acc = FC.account;
  (acc ? acc.gate() : Promise.resolve(true)).then(ok => {
    if (!ok) return;
    window.addEventListener("hashchange", () => { render(); window.scrollTo(0, 0); });
    render();
  });
})();
