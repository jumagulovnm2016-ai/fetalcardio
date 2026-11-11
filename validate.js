/* FetalCardio — схема и валидатор контента.
   Работает в браузере (FC.validate) и в Node (тесты).
   Схема описана декларативно: при добавлении поля меняйте SCHEMA, а не код проверки. */
var FC = globalThis.FC = globalThis.FC || {};
(function () {
  const STATUS = ["draft", "approved", "outdated"];
  const LEVELS = ["базовый", "продвинутый", "экспертный"];
  const SECTIONS = ["card", "def", "keys", "views", "ddx", "assoc", "pitfalls", "prognosis", "refer",
    "how", "check", "errors", "abnormal", "steps"];
  const SLUG = /^[a-z0-9][a-z0-9-]*$/;
  const DATE = /^\d{4}-\d{2}-\d{2}$/;
  const DOI = /^10\.\d{4,9}\/\S+$/;

  /* Типы полей:
     str — непустая строка; strs — непустой массив непустых строк; bool; int;
     enum:<имя> — значение из списка; ref:<коллекция> — id существующей записи;
     obj:str — объект с непустыми строковыми значениями; ddx; refs; structs — структуры атласа;
     svgpath — путь atlas/<имя>.svg; imgpath — путь img/<имя>.(jpg|png|gif|webp);
     text — строка (может быть пустой); cardrefs — массив "chd:<id>"/"view:<id>";
     imgsrc — атрибуция изображения (автор, название, ссылка, лицензия); ? в конце — необязательное поле */
  const SCHEMA = {
    VIEWS: {
      id: "slug", abbr: "str", name: "str", aliases: "strs", status: "enum:status",
      how: "strs", check: "strs", errors: "strs", abnormal: "strs", references: "refs",
      reviewedBy: "str?", reviewedAt: "date?"
    },
    ALGOS: {
      id: "slug", view: "ref:VIEWS", title: "str", status: "enum:status", finding: "str",
      steps: "strs", ddx: "ddx", note: "str?", references: "refs?", reviewedBy: "str?", reviewedAt: "date?"
    },
    CHD: {
      id: "slug", abbr: "str", name: "str", en: "str", aliases: "strs", cat: "enum:cat",
      level: "enum:level", status: "enum:status", normal4cv: "bool", def: "str", freq: "str",
      keys: "strs", views: "obj:str", ddx: "ddx", assoc: "str", pitfalls: "strs",
      prognosis: "str", refer: "str", references: "refs", reviewedBy: "str?", reviewedAt: "date?"
    },
    QUIZ: { q: "str", opts: "strs", a: "int", exp: "str", link: "ref:CHD|null" },
    ATLAS: {
      id: "slug", view: "ref:VIEWS", abbr: "str", title: "str", aliases: "strs", status: "enum:status",
      svg: "svgpath", orientation: "str", structures: "structs", normal: "strs", review: "strs",
      references: "refs", reviewedBy: "str?", reviewedAt: "date?"
    },
    IMAGES: {
      id: "slug", file: "imgpath", label: "str", caption: "text", captionRu: "text", group: "enum:group", cards: "cardrefs",
      status: "enum:status", source: "imgsrc", reviewedBy: "str?", reviewedAt: "date?"
    },
    REFS: {
      organization: "str", title: "str", authors: "str?", journal: "str?", year: "int",
      volume: "str?", issue: "str?", pages: "str?", doi: "doi?", pmid: "str?", url: "url"
    }
  };

  function validate(D) {
    const errors = [], warnings = [];
    const err = (where, msg) => errors.push(`${where}: ${msg}`);
    const ids = {
      VIEWS: new Set((D.VIEWS || []).map(x => x.id)),
      CHD: new Set((D.CHD || []).map(x => x.id)),
      REFS: new Set(Object.keys(D.REFS || {}))
    };
    const enums = { status: STATUS, level: LEVELS, cat: Object.keys(D.CATS || {}), group: D.IMAGE_GROUPS || [] };
    const isStr = v => typeof v === "string" && v.trim().length > 0;

    function check(where, val, type) {
      const optional = type.endsWith("?");
      const t = optional ? type.slice(0, -1) : type;
      if (val === undefined) { if (!optional) err(where, "обязательное поле отсутствует"); return; }
      if (t === "str") { if (!isStr(val)) err(where, "ожидается непустая строка"); }
      else if (t === "slug") { if (!isStr(val) || !SLUG.test(val)) err(where, "id: латиница в нижнем регистре, цифры, дефис"); }
      else if (t === "strs") {
        if (!Array.isArray(val) || !val.length) err(where, "ожидается непустой массив строк");
        else val.forEach((s, i) => !isStr(s) && err(`${where}[${i}]`, "ожидается непустая строка"));
      }
      else if (t === "bool") { if (typeof val !== "boolean") err(where, "ожидается true/false"); }
      else if (t === "int") { if (!Number.isInteger(val)) err(where, "ожидается целое число"); }
      else if (t === "date") { if (!isStr(val) || !DATE.test(val)) err(where, "ожидается дата ГГГГ-ММ-ДД"); }
      else if (t === "doi") { if (!isStr(val) || !DOI.test(val)) err(where, "некорректный DOI"); }
      else if (t === "svgpath") { if (!isStr(val) || !/^atlas\/[a-z0-9-]+\.svg$/.test(val)) err(where, "ожидается путь atlas/<имя>.svg"); }
      else if (t === "structs") {
        if (!Array.isArray(val) || !val.length) { err(where, "ожидается непустой массив структур"); return; }
        const keys = new Set(), nums = new Set();
        val.forEach((s, i) => {
          const w = `${where}[${i}]`;
          if (!isStr(s.key) || !SLUG.test(s.key)) err(w + ".key", "латиница, цифры, дефис");
          else { if (keys.has(s.key)) err(w + ".key", `повторяющийся ключ «${s.key}»`); keys.add(s.key); }
          if (!(s.n === null || (Number.isInteger(s.n) && s.n > 0))) err(w + ".n", "ожидается целое > 0 или null");
          else if (s.n !== null) { if (nums.has(s.n)) err(w + ".n", `повторяющийся номер ${s.n}`); nums.add(s.n); }
          if (!isStr(s.name)) err(w + ".name", "обязательное поле");
          if (!isStr(s.abbr)) err(w + ".abbr", "обязательное поле");
          if (s.note !== undefined && !isStr(s.note)) err(w + ".note", "ожидается непустая строка");
          Object.keys(s).forEach(k => !["n", "key", "name", "abbr", "note"].includes(k) && err(w, `лишнее поле «${k}»`));
        });
      }
      else if (t === "url") { if (!isStr(val) || !/^https:\/\//.test(val)) err(where, "ожидается https-ссылка"); }
      else if (t.startsWith("enum:")) { const e = enums[t.slice(5)]; if (!e.includes(val)) err(where, `допустимо: ${e.join(", ")}`); }
      else if (t.startsWith("ref:")) {
        const [coll, alt] = t.slice(4).split("|");
        if (alt === "null" && val === null) return;
        if (!ids[coll].has(val)) err(where, `ссылка на несуществующий ${coll}: «${val}»`);
      }
      else if (t === "obj:str") {
        if (!val || typeof val !== "object" || Array.isArray(val) || !Object.keys(val).length) err(where, "ожидается непустой объект");
        else Object.entries(val).forEach(([k, s]) => !isStr(s) && err(`${where}.${k}`, "ожидается непустая строка"));
      }
      else if (t === "ddx") {
        if (!Array.isArray(val) || !val.length) { err(where, "ожидается непустой массив"); return; }
        val.forEach((d, i) => {
          const w = `${where}[${i}]`;
          if (!isStr(d.name)) err(w + ".name", "обязательное поле");
          if (!isStr(d.key)) err(w + ".key", "обязательное поле");
          if (d.id !== undefined && !ids.CHD.has(d.id)) err(w + ".id", `ссылка на несуществующий порок «${d.id}»`);
          Object.keys(d).forEach(k => !["id", "name", "key"].includes(k) && err(w, `лишнее поле «${k}»`));
        });
      }
      else if (t === "imgpath") { if (typeof val !== "string" || !/^img\/[a-z0-9][a-z0-9-]*\.(jpg|png|gif|webp)$/.test(val)) err(where, "ожидается img/<имя>.(jpg|png|gif|webp)"); }
      else if (t === "text") { if (typeof val !== "string") err(where, "ожидается строка"); }
      else if (t === "cardrefs") {
        if (!Array.isArray(val)) { err(where, "ожидается массив"); return; }
        val.forEach((c, i) => {
          const m = typeof c === "string" && c.match(/^(chd|view):(.+)$/);
          if (!m) err(`${where}[${i}]`, "формат chd:<id> или view:<id>");
          else if (!ids[m[1] === "chd" ? "CHD" : "VIEWS"].has(m[2])) err(`${where}[${i}]`, `нет карточки «${c}»`);
        });
        if (new Set(val).size !== val.length) err(where, "повторяющиеся карточки");
      }
      else if (t === "imgsrc") {
        if (!val || typeof val !== "object") { err(where, "ожидается объект"); return; }
        if (!["article", "commons"].includes(val.kind)) err(where + ".kind", "article или commons");
        ["authors", "title", "url", "license"].forEach(f => !isStr(val[f]) && err(`${where}.${f}`, "обязательное поле"));
        if (isStr(val.url) && !/^https:\/\//.test(val.url)) err(where + ".url", "ожидается https-ссылка");
        if (val.kind === "article") ["journal", "figure", "pmcid"].forEach(f => !isStr(val[f]) && err(`${where}.${f}`, "обязательное поле"));
        if (val.kind === "article" && !Number.isInteger(val.year)) err(where + ".year", "ожидается год");
      }
      else if (t === "refs") {
        if (!Array.isArray(val) || !val.length) { err(where, "нужен хотя бы один источник"); return; }
        const seen = new Set();
        val.forEach((r, i) => {
          const w = `${where}[${i}]`;
          if (!ids.REFS.has(r.source)) err(w + ".source", `источник «${r.source}» отсутствует в реестре`);
          if (!SECTIONS.includes(r.section)) err(w + ".section", `допустимо: ${SECTIONS.join(", ")}`);
          if (typeof r.verified !== "boolean") err(w + ".verified", "ожидается true/false");
          const k = r.source + "|" + r.section;
          if (seen.has(k)) err(w, "дубликат источника для раздела"); seen.add(k);
        });
      }
      else err(where, `неизвестный тип схемы ${t}`);
    }

    function collection(name, items, label) {
      const schema = SCHEMA[name], seen = new Set();
      items.forEach((it, i) => {
        const where = `${name}[${it.id ?? i}]`;
        Object.entries(schema).forEach(([f, t]) => check(`${where}.${f}`, it[f], t));
        Object.keys(it).forEach(f => !(f in schema) && err(where, `поле «${f}» не описано в схеме`));
        if (it.id !== undefined) { if (seen.has(it.id)) err(where, "повторяющийся id"); seen.add(it.id); }
        if (it.status === "approved" && (!it.reviewedBy || !it.reviewedAt))
          err(where, "status approved требует reviewedBy и reviewedAt");
        if (it.status === "draft" && label) warnings.push(`${where}: черновик`);
      });
    }

    if (!D.CATS || typeof D.CATS !== "object") err("CATS", "отсутствует");
    ["VIEWS", "ALGOS", "CHD", "QUIZ", "ATLAS"].forEach(n => Array.isArray(D[n]) ? collection(n, D[n], n !== "QUIZ") : err(n, "отсутствует массив"));
    if (D.IMAGES !== undefined) Array.isArray(D.IMAGES) ? collection("IMAGES", D.IMAGES, false) : err("IMAGES", "ожидается массив");
    (D.IMAGES || []).forEach(im => { if (im.file && D.IMAGES.filter(x => x.file === im.file).length > 1) err(`IMAGES[${im.id}].file`, "файл используется дважды"); });
    Object.entries(D.REFS || {}).forEach(([id, r]) => {
      if (!SLUG.test(id)) err(`REFS[${id}]`, "id: латиница, цифры, дефис");
      Object.entries(SCHEMA.REFS).forEach(([f, t]) => check(`REFS[${id}].${f}`, r[f], t));
      Object.keys(r).forEach(f => !(f in SCHEMA.REFS) && err(`REFS[${id}]`, `поле «${f}» не описано в схеме`));
    });

    (D.QUIZ || []).forEach((q, i) => {
      const w = `QUIZ[${i}]`;
      if (Array.isArray(q.opts)) {
        if (q.opts.length < 2) err(w + ".opts", "нужно минимум 2 варианта");
        if (new Set(q.opts).size !== q.opts.length) err(w + ".opts", "повторяющиеся варианты");
        if (Number.isInteger(q.a) && (q.a < 0 || q.a >= q.opts.length)) err(w + ".a", "индекс ответа вне диапазона вариантов");
      }
    });
    const qs = new Set();
    (D.QUIZ || []).forEach((q, i) => { if (qs.has(q.q)) err(`QUIZ[${i}]`, "повторяющийся вопрос"); qs.add(q.q); });

    (D.CHD || []).forEach(c => (c.ddx || []).forEach(d => d.id === c.id && err(`CHD[${c.id}].ddx`, "порок ссылается сам на себя")));
    const used = new Set();
    ["VIEWS", "ALGOS", "CHD", "ATLAS"].forEach(n => (D[n] || []).forEach(x => (x.references || []).forEach(r => used.add(r.source))));
    ids.REFS.forEach(id => !used.has(id) && warnings.push(`REFS[${id}]: источник нигде не используется`));

    return { errors, warnings, ok: errors.length === 0 };
  }

  FC.SCHEMA = SCHEMA;
  FC.validate = validate;
  if (typeof module !== "undefined" && module.exports) module.exports = { SCHEMA, validate };
})();
