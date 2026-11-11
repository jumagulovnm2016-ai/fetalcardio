(() => {
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

  const statusBadge = st => st === "approved"
    ? `<span class="badge ok">проверено автором</span>`
    : `<span class="badge draft">черновик · на проверке</span>`;

  const ddxList = items => `<div class="ddx">${items.map(d => {
    const inner = `<b>${esc(d.name)}</b><span class="small muted">${esc(d.key)}</span>`;
    return d.id && byId(CHD, d.id) ? `<a class="card" href="#/chd/${d.id}">${inner}</a>` : `<div class="card">${inner}</div>`;
  }).join("")}</div>`;

  const foot = () => `<footer class="foot">${esc(META.title)} ${esc(META.version)} · ${esc(META.author)} · ${esc(META.updated)}<br>
    Учебный материал для врачей. Не заменяет экспертную фетальную ЭхоКГ и клиническое решение. Схемы условные, не являются УЗ-изображениями.</footer>`;

  const doneBtn = key => `<button class="btn ${isDone(key) ? "ghost" : ""}" data-done="${key}">${isDone(key) ? "✓ Изучено" : "Отметить как изученное"}</button>`;

  /* ---------- страницы ---------- */
  function home() {
    const total = VIEWS.length + ALGOS.length + CHD.length;
    const done = Object.keys(studied()).length;
    const best = store.get("quizBest", null);
    return `<section class="hero">
      <div class="kicker">Фетальная эхокардиография</div>
      <h1>От находки к диагнозу</h1>
      <p class="muted">Врач у аппарата видит не «тетраду Фалло», а «аорту верхом» или «два сосуда в 3VV». Поэтому здесь путь начинается со среза и находки.</p>
    </section>
    <div class="card"><div class="row" style="justify-content:space-between"><b>Прогресс</b><span class="small muted">${done} из ${total}</span></div>
      <div class="progress"><i style="width:${Math.round(done / total * 100)}%"></i></div>
      <span class="small muted">${best ? `Лучший результат теста: ${best.score} из ${best.total}` : "Тест ещё не пройден"}</span></div>
    <div class="grid two">
      <a class="card" href="#/views"><h3>◎ Стандартные срезы</h3><span class="small muted">Situs, 4CV, LVOT, RVOT, 3VV, 3VT — схема, техника, чек-лист, ошибки.</span></a>
      <a class="card" href="#/algos"><h3>⇢ От находки к диагнозу</h3><span class="small muted">${ALGOS.length} алгоритмов: что проверить и какой дифференциальный ряд.</span></a>
      <a class="card" href="#/chd"><h3>♥ Атлас пороков</h3><span class="small muted">${CHD.length} ключевых ВПС: критерии, срезы, дифдиагноз, ловушки.</span></a>
      <a class="card" href="#/quiz"><h3>✓ Проверка знаний</h3><span class="small muted">${QUIZ.length} вопросов с разбором.</span></a>
    </div>
    <div class="note"><b>Главное правило.</b> Ни один срез не исключает ВПС сам по себе. Нормальный 4CV не исключает ТФ, ТМА, ОАС, коарктацию и ТАДЛВ — всегда оценивайте выводные тракты и 3VV/3VT.</div>
    ${foot()}`;
  }

  function viewsList() {
    return `<h1>Стандартные срезы</h1>
      <p class="muted">Скрининговое исследование сердца плода: situs → 4CV → LVOT → RVOT → 3VV → 3VT. Сегментарный принцип: предсердия, желудочки, магистральные артерии и соединения между ними.</p>
      ${VIEWS.map(v => `<a class="card" href="#/view/${v.id}"><div class="row" style="justify-content:space-between">
        <h3>${esc(v.abbr)}</h3>${isDone("v_" + v.id) ? '<span class="done-mark">✓</span>' : ""}</div>
        <span class="small muted">${esc(v.name)}</span></a>`).join("")}${foot()}`;
  }

  function viewPage(id) {
    const v = byId(VIEWS, id); if (!v) return notFound();
    const algos = ALGOS.filter(a => a.view === id);
    const idx = VIEWS.indexOf(v), prev = VIEWS[idx - 1], next = VIEWS[idx + 1];
    return `<div class="crumb"><a href="#/views">Срезы</a> /</div>
      <h1>${esc(v.name)}</h1>
      <figure class="scheme">${SCHEMES[id] ? SCHEMES[id]() : ""}<figcaption>Схема нормы. Верх — кпереди, низ — позвоночник, левая сторона плода — справа.</figcaption></figure>
      <h2>Как получить</h2><ul>${v.how.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
      <h2>Что оценить в норме</h2><ul class="check">${v.check.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
      <h2>Типичные ошибки</h2><ul class="err">${v.errors.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
      <h2>Патологические находки</h2><ul>${v.abnormal.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
      ${algos.length ? `<h2>Алгоритмы для этого среза</h2>${algos.map(a => `<a class="card" href="#/algo/${a.id}"><b>${esc(a.title)}</b><br><span class="small muted">${esc(a.finding)}</span></a>`).join("")}` : ""}
      <div class="row" style="margin-top:16px">${doneBtn("v_" + id)}</div>
      <div class="row" style="justify-content:space-between;margin-top:14px">
        ${prev ? `<a href="#/view/${prev.id}">← ${esc(prev.abbr)}</a>` : "<span></span>"}
        ${next ? `<a href="#/view/${next.id}">${esc(next.abbr)} →</a>` : ""}</div>${foot()}`;
  }

  function algosList() {
    const groups = VIEWS.map(v => ({ v, items: ALGOS.filter(a => a.view === v.id) })).filter(g => g.items.length);
    return `<h1>От находки к диагнозу</h1>
      <p class="muted">Выберите, что вы видите на экране. Алгоритм подскажет, что проверить дальше и какие пороки входят в дифференциальный ряд.</p>
      ${groups.map(g => `<h2>${esc(g.v.abbr)}</h2>${g.items.map(a => `<a class="card" href="#/algo/${a.id}">
        <div class="row" style="justify-content:space-between"><b>${esc(a.title)}</b>${isDone("a_" + a.id) ? '<span class="done-mark">✓</span>' : ""}</div>
        <span class="small muted">${esc(a.finding)}</span></a>`).join("")}`).join("")}${foot()}`;
  }

  function algoPage(id) {
    const a = byId(ALGOS, id); if (!a) return notFound();
    const v = byId(VIEWS, a.view);
    return `<div class="crumb"><a href="#/algos">Находки</a> / <a href="#/view/${v.id}">${esc(v.abbr)}</a></div>
      <h1>${esc(a.title)}</h1><p class="muted">${esc(a.finding)}</p>
      <h2>Что проверить</h2><ol>${a.steps.map(s => `<li>${esc(s)}</li>`).join("")}</ol>
      <h2>Дифференциальный ряд</h2>${ddxList(a.ddx)}
      ${a.note ? `<div class="note info">${esc(a.note)}</div>` : ""}
      <div class="note">Алгоритм сужает поиск, но не ставит диагноз. При любой находке — экспертная фетальная ЭхоКГ.</div>
      <div class="row" style="margin-top:16px">${doneBtn("a_" + id)}</div>${foot()}`;
  }

  let chdFilter = "all";
  function chdList() {
    const list = CHD.filter(c => chdFilter === "all" || c.cat === chdFilter);
    return `<h1>Атлас пороков</h1>
      <div class="chips">${[["all", "Все"], ...Object.entries(CATS)].map(([k, t]) =>
        `<button class="chip ${chdFilter === k ? "on" : ""}" data-filter="${k}">${esc(t)}</button>`).join("")}</div>
      ${list.map(c => `<a class="card" href="#/chd/${c.id}">
        <div class="row" style="justify-content:space-between"><b>${esc(c.name)}</b>${isDone("c_" + c.id) ? '<span class="done-mark">✓</span>' : ""}</div>
        <span class="small muted">${esc(c.en)}</span><div style="margin-top:6px">
        <span class="badge">${esc(c.level)}</span>${c.normal4cv ? '<span class="badge view">4CV часто норма</span>' : ""}</div></a>`).join("")}
      ${list.length ? "" : '<p class="muted">Нет пороков в этой группе.</p>'}${foot()}`;
  }

  function chdPage(id) {
    const c = byId(CHD, id); if (!c) return notFound();
    const algos = ALGOS.filter(a => a.ddx.some(d => d.id === id));
    const sec = [["def", "Суть"], ["keys", "Критерии"], ["views", "Срезы"], ["ddx", "Дифдиагноз"], ["assoc", "Сочетания"], ["pit", "Ловушки"], ["prog", "Прогноз"]];
    return `<div class="crumb"><a href="#/chd">Пороки</a> / ${esc(CATS[c.cat])}</div>
      <h1>${esc(c.name)}</h1>
      <p class="muted" style="margin-top:-4px">${esc(c.en)}</p>
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
      ${algos.length ? `<h2>Где встречается в алгоритмах</h2>${algos.map(a => `<a class="card" href="#/algo/${a.id}"><b>${esc(a.title)}</b> <span class="badge view">${esc(byId(VIEWS, a.view).abbr)}</span></a>`).join("")}` : ""}
      <div class="row" style="margin-top:16px">${doneBtn("c_" + id)}</div>${foot()}`;
  }

  /* ---------- тест ---------- */
  let quiz = null;
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  function startQuiz(n) {
    quiz = { items: shuffle(QUIZ).slice(0, n).map(q => {
      const order = shuffle(q.opts.map((_, i) => i));
      return { ...q, order };
    }), i: 0, score: 0, answered: false, choice: null, wrong: [] };
  }
  function quizPage() {
    if (!quiz) {
      const best = store.get("quizBest", null);
      return `<h1>Проверка знаний</h1>
        <p class="muted">Вопросы выбираются случайно, варианты перемешиваются. После каждого ответа — разбор.</p>
        ${best ? `<div class="card small">Лучший результат: <b>${best.score} из ${best.total}</b></div>` : ""}
        <div class="row"><button class="btn" data-quiz="10">10 вопросов</button><button class="btn ghost" data-quiz="${QUIZ.length}">Все ${QUIZ.length}</button></div>${foot()}`;
    }
    const total = quiz.items.length;
    if (quiz.i >= total) {
      const best = store.get("quizBest", null);
      const pct = quiz.score / total;
      if (!best || pct > best.score / best.total) store.set("quizBest", { score: quiz.score, total });
      const wrong = quiz.wrong.map(q => `<div class="card"><b>${esc(q.q)}</b><br><span class="small">Верно: ${esc(q.opts[q.a])}</span><br>
        <span class="small muted">${esc(q.exp)}</span>${q.link ? `<br><a class="small" href="#/chd/${q.link}">Открыть карточку →</a>` : ""}</div>`).join("");
      return `<h1>Результат: ${quiz.score} из ${total}</h1>
        <div class="progress"><i style="width:${Math.round(pct * 100)}%"></i></div>
        <p class="muted">${pct >= .85 ? "Отличный уровень." : pct >= .6 ? "Хорошая база, повторите разобранные вопросы." : "Стоит вернуться к срезам и алгоритмам."}</p>
        ${wrong ? `<h2>Ошибки</h2>${wrong}` : ""}
        <div class="row" style="margin-top:12px"><button class="btn" data-quiz="10">Ещё раз</button><button class="btn ghost" data-quizreset="1">К началу</button></div>${foot()}`;
    }
    const q = quiz.items[quiz.i];
    const opts = q.order.map(oi => {
      let cls = "opt";
      if (quiz.answered) { if (oi === q.a) cls += " right"; else if (oi === quiz.choice) cls += " wrong"; }
      return `<button class="${cls}" data-ans="${oi}" ${quiz.answered ? "disabled" : ""}>${esc(q.opts[oi])}</button>`;
    }).join("");
    return `<div class="row" style="justify-content:space-between"><span class="small muted">Вопрос ${quiz.i + 1} из ${total}</span><span class="small muted">Верно: ${quiz.score}</span></div>
      <div class="progress"><i style="width:${Math.round(quiz.i / total * 100)}%"></i></div>
      <h2 style="margin-top:0">${esc(q.q)}</h2>${opts}
      ${quiz.answered ? `<div class="note ${quiz.choice === q.a ? "info" : ""}">${quiz.choice === q.a ? "<b>Верно.</b> " : "<b>Неверно.</b> "}${esc(q.exp)}
        ${q.link ? `<br><a href="#/chd/${q.link}">Открыть карточку порока →</a>` : ""}</div>
        <button class="btn" data-next="1">${quiz.i + 1 < total ? "Дальше" : "Результат"}</button>` : ""}`;
  }

  /* ---------- поиск ---------- */
  function searchPage(q) {
    const s = q.trim().toLowerCase();
    if (!s) return `<h1>Поиск</h1><p class="muted">Введите запрос.</p>`;
    const hit = (...t) => t.join(" ").toLowerCase().includes(s);
    const r = [];
    VIEWS.forEach(v => hit(v.abbr, v.name, ...v.check, ...v.abnormal, ...v.errors) && r.push({ h: `#/view/${v.id}`, t: v.name, k: "срез" }));
    ALGOS.forEach(a => hit(a.title, a.finding, ...a.steps, ...a.ddx.map(d => d.name + " " + d.key)) && r.push({ h: `#/algo/${a.id}`, t: a.title, k: "находка" }));
    CHD.forEach(c => hit(c.abbr, c.name, c.en, c.def, ...c.keys, c.assoc, ...c.pitfalls, ...Object.values(c.views)) && r.push({ h: `#/chd/${c.id}`, t: c.name, k: "порок" }));
    return `<h1>Поиск: «${esc(q)}»</h1>${r.length ? r.map(x => `<a class="card" href="${x.h}"><span class="badge view">${x.k}</span> <b>${esc(x.t)}</b></a>`).join("") : '<p class="muted">Ничего не найдено. Попробуйте сокращение (ТФ, 3VT) или признак («верхом», «коронарный синус»).</p>'}`;
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
      case "quiz": html = quizPage(); break;
      case "search": html = searchPage(decodeURIComponent((qs || "").replace(/^q=/, ""))); nav = ""; break;
      default: html = notFound();
    }
    $app.innerHTML = html;
    document.querySelectorAll("#nav a").forEach(a => a.classList.toggle("active", a.dataset.nav === nav));
  }

  $app.addEventListener("click", e => {
    const t = e.target.closest("button, a[data-jump]");
    if (!t) return;
    if (t.dataset.done) { toggleDone(t.dataset.done); render(); }
    else if (t.dataset.filter) { chdFilter = t.dataset.filter; render(); }
    else if (t.dataset.jump) { document.getElementById("s-" + t.dataset.jump)?.scrollIntoView({ behavior: "smooth", block: "start" }); }
    else if (t.dataset.quiz) { startQuiz(+t.dataset.quiz); render(); window.scrollTo(0, 0); }
    else if (t.dataset.quizreset) { quiz = null; render(); }
    else if (t.dataset.ans !== undefined) {
      const q = quiz.items[quiz.i]; quiz.answered = true; quiz.choice = +t.dataset.ans;
      if (quiz.choice === q.a) quiz.score++; else quiz.wrong.push(q);
      render();
    }
    else if (t.dataset.next) { quiz.i++; quiz.answered = false; quiz.choice = null; render(); window.scrollTo(0, 0); }
  });

  document.getElementById("searchForm").addEventListener("submit", e => {
    e.preventDefault();
    const q = document.getElementById("searchInput").value;
    location.hash = "#/search?q=" + encodeURIComponent(q);
    document.getElementById("searchInput").blur();
  });

  window.addEventListener("hashchange", () => { render(); window.scrollTo(0, 0); });
  render();
})();
