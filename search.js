/* FetalCardio — поиск.
   Нормализация (регистр, ё→е, знаки препинания), русские и английские названия,
   синонимы и аббревиатуры (aliases), поиск по всем текстовым полям карточек. */
var FC = globalThis.FC = globalThis.FC || {};
(function () {
  /* Нормализация сохраняет длину строки — это позволяет подсвечивать совпадения в исходном тексте. */
  function normalize(s) {
    let out = "";
    for (const ch of String(s)) {
      let c = ch.toLowerCase();
      if (c.length !== 1) c = ch;            // защита от символов, меняющих длину
      if (c === "ё") c = "е";
      else if (/[\s\-‐‑–—_/\\.,;:!?()«»"'“”„\[\]{}+]/.test(c)) c = " ";
      out += c.length === ch.length ? c : ch;
    }
    return out;
  }
  /* Простейшая морфология: у длинных русских слов отбрасываем окончание
     («трисомия» найдёт «трисомии», «лёгочные» — «лёгочная»). */
  const stem = t => (t.length >= 5 && /[а-я]$/.test(t)) ? t.replace(/(ями|ами|ого|его|ому|ему|ыми|ими|ая|яя|ое|ее|ые|ие|ий|ый|ой|ам|ям|ах|ях|ов|ев|ей|ью|ия|ии|ию|[аяиыеоуюйь])$/, "") : t;
  const tokens = q => normalize(q).split(" ").filter(Boolean).map(stem);

  const LABELS = {
    name: "Название", abbr: "Сокращение", en: "Английское название", aliases: "Синонимы",
    how: "Как получить", check: "Норма", errors: "Ошибки", abnormal: "Патология",
    finding: "Находка", steps: "Что проверить", ddx: "Дифдиагноз", note: "Примечание",
    def: "Суть", freq: "Частота", keys: "Критерии", views: "По срезам", assoc: "Сочетания",
    pitfalls: "Ловушки", prognosis: "Прогноз", refer: "Тактика",
    structures: "Структуры", normal: "Признаки нормы", review: "На проверке"
  };

  function buildIndex(D) {
    const docs = [];
    const add = (type, id, href, title, names, fields) => {
      const parts = [];
      Object.entries(fields).forEach(([f, v]) => {
        const arr = Array.isArray(v) ? v : (v && typeof v === "object") ? Object.entries(v).map(([k, t]) => `${k}: ${t}`) : [v];
        arr.filter(Boolean).forEach(text => parts.push({ field: f, text: String(text), norm: normalize(text) }));
      });
      const nameNorm = names.filter(Boolean).map(n => " " + normalize(n) + " ");
      docs.push({ type, id, href, title, names: nameNorm, parts, all: nameNorm.join(" ") + " " + parts.map(p => p.norm).join(" ") });
    };
    (D.VIEWS || []).forEach(v => add("view", v.id, `#/view/${v.id}`, v.name, [v.abbr, v.name, ...(v.aliases || [])],
      { how: v.how, check: v.check, errors: v.errors, abnormal: v.abnormal }));
    (D.ALGOS || []).forEach(a => add("algo", a.id, `#/algo/${a.id}`, a.title, [a.title],
      { finding: a.finding, steps: a.steps, ddx: a.ddx.map(d => `${d.name} — ${d.key}`), note: a.note }));
    (D.CHD || []).forEach(c => add("chd", c.id, `#/chd/${c.id}`, c.name, [c.abbr, c.name, c.en, ...(c.aliases || [])],
      { def: c.def, freq: c.freq, keys: c.keys, views: c.views, ddx: c.ddx.map(d => `${d.name} — ${d.key}`),
        assoc: c.assoc, pitfalls: c.pitfalls, prognosis: c.prognosis, refer: c.refer }));
    (D.ATLAS || []).forEach(t => add("atlas", t.id, `#/atlas/${t.id}`, t.title, [t.abbr, t.title, ...(t.aliases || [])],
      { structures: t.structures.map(s => `${s.name} (${s.abbr})${s.note ? " — " + s.note : ""}`), normal: t.normal, review: t.review }));
    return docs;
  }

  function snippet(part, toks, radius = 60) {
    const first = toks.map(t => part.norm.indexOf(t)).filter(i => i >= 0).sort((a, b) => a - b)[0] ?? 0;
    const start = Math.max(0, first - radius), end = Math.min(part.text.length, first + radius * 1.6);
    const text = part.text.slice(start, end), norm = part.norm.slice(start, end);
    const ranges = [];
    toks.forEach(t => { let i = norm.indexOf(t); while (i >= 0) { ranges.push([i, i + t.length]); i = norm.indexOf(t, i + t.length); } });
    ranges.sort((a, b) => a[0] - b[0]);
    const merged = [];
    ranges.forEach(r => { const l = merged[merged.length - 1]; if (l && r[0] <= l[1]) l[1] = Math.max(l[1], r[1]); else merged.push(r.slice()); });
    return { pre: start > 0, post: end < part.text.length, text, ranges: merged, field: part.field, label: LABELS[part.field] || part.field };
  }

  function query(docs, q) {
    const toks = tokens(q);
    if (!toks.length) return [];
    const res = [];
    docs.forEach(d => {
      if (!toks.every(t => d.all.includes(t))) return;
      let score = 0;
      const full = " " + toks.join(" ") + " ";
      if (d.names.some(n => n === full)) score += 50;
      toks.forEach(t => {
        if (d.names.some(n => n.includes(" " + t))) score += 10;
        else if (d.names.some(n => n.includes(t))) score += 6;
        d.parts.forEach(p => { if (p.norm.includes(t)) score += 1; });
      });
      const inName = toks.every(t => d.names.some(n => n.includes(t)));
      const part = inName ? null : d.parts.find(p => toks.some(t => p.norm.includes(t)));
      res.push({ type: d.type, id: d.id, href: d.href, title: d.title, score, snippet: part ? snippet(part, toks) : null });
    });
    const order = { chd: 0, view: 1, algo: 2, atlas: 3 };
    return res.sort((a, b) => b.score - a.score || order[a.type] - order[b.type]);
  }

  FC.search = { normalize, tokens, buildIndex, query, LABELS };
  if (typeof module !== "undefined" && module.exports) module.exports = FC.search;
})();
