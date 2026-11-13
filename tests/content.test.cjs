const test = require("node:test");
const assert = require("node:assert/strict");
const { load } = require("./load.cjs");
const FC = load();
const clone = x => JSON.parse(JSON.stringify(x));

test("валидатор: контент без ошибок", () => {
  const r = FC.validate(FC);
  assert.deepEqual([...r.errors], []);
});

test("уникальность ID во всех коллекциях", () => {
  for (const name of ["VIEWS", "ALGOS", "CHD"]) {
    const ids = FC[name].map(x => x.id);
    const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
    assert.deepEqual([...dup], [], `${name}: повторы ${dup}`);
  }
});

test("целостность ссылок: ddx, алгоритмы, вопросы, источники", () => {
  const chd = new Set(FC.CHD.map(c => c.id)), views = new Set(FC.VIEWS.map(v => v.id));
  for (const c of FC.CHD) for (const d of c.ddx) if (d.id) assert.ok(chd.has(d.id), `${c.id} → ${d.id}`);
  for (const a of FC.ALGOS) {
    assert.ok(views.has(a.view), `${a.id}.view → ${a.view}`);
    for (const d of a.ddx) if (d.id) assert.ok(chd.has(d.id), `${a.id} → ${d.id}`);
  }
  for (const q of FC.QUIZ) if (q.link !== null) assert.ok(chd.has(q.link), `вопрос → ${q.link}`);
  for (const x of [...FC.VIEWS, ...FC.CHD]) for (const r of x.references) assert.ok(FC.REFS[r.source], `${x.id} → ${r.source}`);
});

test("обязательные поля у каждой патологии", () => {
  const req = Object.entries(FC.SCHEMA.CHD).filter(([, t]) => !t.endsWith("?")).map(([f]) => f);
  for (const c of FC.CHD) for (const f of req) assert.ok(c[f] !== undefined && c[f] !== "", `${c.id}: нет поля ${f}`);
});

test("у каждой патологии есть references с организацией или авторами, названием, годом, DOI/URL и разделом", () => {
  for (const c of FC.CHD) {
    assert.ok(c.references.length > 0, c.id);
    for (const r of c.references) {
      const s = FC.REFS[r.source];
      assert.ok((s.organization || s.authors) && s.title && Number.isInteger(s.year) && (s.doi || s.url) && r.section, `${c.id} → ${r.source}`);
    }
  }
});

test("источники: DOI совпадает с URL; verified=true только для конкретного раздела, не для всей карточки", () => {
  for (const [id, s] of Object.entries(FC.REFS)) {
    if (s.doi) assert.equal(s.url, "https://doi.org/" + s.doi, id);
  }
  for (const x of [...FC.VIEWS, ...FC.CHD]) for (const r of x.references) if (r.verified) assert.notEqual(r.section, "card", `${x.id}: verified=true для всей карточки — сверка возможна только по разделу`);
});

test("тест: ответы корректны", () => {
  for (const [i, q] of FC.QUIZ.entries()) {
    assert.ok(Number.isInteger(q.a) && q.a >= 0 && q.a < q.opts.length, `вопрос ${i}: индекс ответа`);
    assert.equal(new Set(q.opts).size, q.opts.length, `вопрос ${i}: повтор вариантов`);
    assert.ok(q.exp.length > 10, `вопрос ${i}: нет разбора`);
  }
});

test("статусы: все карточки — draft до экспертной проверки; approved только с рецензентом", () => {
  for (const x of [...FC.VIEWS, ...FC.ALGOS, ...FC.CHD]) {
    if (x.status === "approved") assert.ok(x.reviewedBy && /^\d{4}-\d{2}-\d{2}$/.test(x.reviewedAt), `${x.id}: approved без рецензента`);
    else assert.equal(x.status, "draft", x.id);
  }
});

/* Отрицательные проверки: валидатор должен ловить типичные ошибки */
const broken = mutate => { const D = { ...FC, CHD: clone(FC.CHD), ALGOS: clone(FC.ALGOS), QUIZ: clone(FC.QUIZ), VIEWS: clone(FC.VIEWS) }; mutate(D); return FC.validate(D).errors; };
test("валидатор ловит битую ссылку в ddx", () => assert.ok(broken(D => D.CHD[0].ddx[0].id = "nope").some(e => e.includes("nope"))));
test("валидатор ловит дубликат id", () => assert.ok(broken(D => D.CHD[1].id = D.CHD[0].id).some(e => e.includes("повторяющийся id"))));
test("валидатор ловит отсутствующее поле", () => assert.ok(broken(D => delete D.CHD[0].prognosis).some(e => e.includes("prognosis"))));
test("валидатор ловит неверный индекс ответа", () => assert.ok(broken(D => D.QUIZ[0].a = 9).some(e => e.includes("вне диапазона"))));
test("валидатор ловит approved без рецензента", () => assert.ok(broken(D => D.CHD[0].status = "approved").some(e => e.includes("reviewedBy"))));
test("валидатор ловит неизвестный источник", () => assert.ok(broken(D => D.CHD[0].references[0].source = "fake").some(e => e.includes("fake"))));
test("валидатор ловит лишнее поле", () => assert.ok(broken(D => D.CHD[0].extra = "x").some(e => e.includes("extra"))));

/* ---------- Анатомический атлас ---------- */
const fs = require("fs"), path = require("path");
const { ROOT } = require("./load.cjs");
const svgOf = t => fs.readFileSync(path.join(ROOT, t.svg), "utf8");

test("атлас: файлы SVG существуют, статус в SVG совпадает с данными, без скриптов", () => {
  assert.ok(FC.ATLAS.length > 0);
  for (const t of FC.ATLAS) {
    const svg = svgOf(t);
    assert.match(svg, /^<svg[^>]+viewBox="0 0 \d+ \d+"/, `${t.id}: корневой svg с viewBox`);
    assert.ok(["draft", "approved"].includes(t.status), `${t.id}: статус`);
    assert.match(svg, new RegExp(`data-status="${t.status}"`), `${t.id}: data-status в SVG = статус в data/anatomy.js`);
    if (t.status === "draft") assert.match(svg, /DRAFT · REQUIRES EXPERT REVIEW/, `${t.id}: плашка DRAFT`);
    else {
      assert.ok(t.reviewedBy && /^\d{4}-\d{2}-\d{2}$/.test(t.reviewedAt), `${t.id}: кто и когда проверил`);
      assert.match(svg, /Проверено автором/, `${t.id}: отметка о проверке`);
      assert.doesNotMatch(svg, /DRAFT/, `${t.id}: проверенная схема без плашки DRAFT`);
    }
    assert.doesNotMatch(svg, /<script|<foreignObject|on\w+=/i, `${t.id}: активное содержимое`);
    assert.doesNotMatch(svg, /<image|href="http/i, `${t.id}: внешние ресурсы`);
  }
});

test("атлас: каждая структура легенды есть на схеме и в подписях", () => {
  for (const t of FC.ATLAS) {
    const svg = svgOf(t);
    for (const s of t.structures) {
      assert.ok(svg.includes(`id="s-${s.key}"`), `${t.id}: нет структуры s-${s.key}`);
      assert.ok(svg.includes(`id="lbl-${s.key}"`), `${t.id}: нет подписи lbl-${s.key}`);
      assert.ok(svg.includes(s.abbr.split(" ")[0]), `${t.id}: подпись без обозначения ${s.abbr}`);
    }
    const inSvg = [...svg.matchAll(/id="lbl-([a-z0-9-]+)"/g)].map(m => m[1]);
    assert.deepEqual(inSvg.filter(k => !t.structures.some(s => s.key === k)), [], `${t.id}: подписи без легенды`);
  }
});

test("атлас 4CV: все 17 обязательных структур, номера 1–17, нужные слои", () => {
  const t = FC.ATLAS.find(x => x.id === "4cv-normal");
  const nums = t.structures.map(s => s.n).filter(n => n !== null).sort((a, b) => a - b);
  assert.deepEqual([...nums], Array.from({ length: 17 }, (_, i) => i + 1));
  const svg = svgOf(t);
  for (const layer of ["myocardium", "cavities", "ventricular-septum", "atrial-septum", "rv-morphology",
    "lv-morphology", "av-valves", "crux", "veins", "annotations", "labels"])
    assert.ok(svg.includes(`id="layer-${layer}"`), `нет слоя ${layer}`);
  // модераторный пучок — в слое морфологии ПЖ, не ЛЖ
  const rvLayer = svg.slice(svg.indexOf('id="layer-rv-morphology"'), svg.indexOf('id="layer-lv-morphology"'));
  assert.ok(rvLayer.includes('id="s-mb"'), "модераторный пучок вне слоя ПЖ");
  // числовых диагностических критериев в учебном тексте нет
  for (const x of [...t.normal, ...t.structures.map(s => s.note || "")])
    assert.doesNotMatch(x, /\d+\s*(мм|см|%|°)/, `числовой критерий без источника: ${x}`);
});

test("валидатор ловит ошибки атласа", () => {
  const D = () => ({ ...FC, ATLAS: clone(FC.ATLAS) });
  let d = D(); d.ATLAS[0].structures[1].key = d.ATLAS[0].structures[0].key;
  assert.ok(FC.validate(d).errors.some(e => e.includes("повторяющийся ключ")));
  d = D(); d.ATLAS[0].svg = "../evil.svg";
  assert.ok(FC.validate(d).errors.some(e => e.includes("atlas/<имя>.svg")));
  d = D(); d.ATLAS[0].view = "nope";
  assert.ok(FC.validate(d).errors.some(e => e.includes("nope")));
  d = D(); d.ATLAS[0].status = "approved"; delete d.ATLAS[0].reviewedBy; delete d.ATLAS[0].reviewedAt;
  assert.ok(FC.validate(d).errors.some(e => e.includes("reviewedBy")));
});

test("атлас пороков: схемы ДМЖП привязаны к карточке, без привязки — ошибка", () => {
  const vsd = FC.ATLAS.filter(t => t.chd === "vsd").map(t => t.id).sort();
  assert.equal(vsd.join(","), "vsd-4cv,vsd-5cv,vsd-types");
  for (const id of vsd) assert.equal(FC.ATLAS.find(t => t.id === id).status, "draft", `${id}: до проверки автором — черновик`);
  const d = { ...FC, ATLAS: clone(FC.ATLAS) }, t = d.ATLAS.find(x => x.id === "vsd-types");
  delete t.chd;
  assert.ok(FC.validate(d).errors.some(e => e.includes("нужна привязка")));
  t.chd = "nope";
  assert.ok(FC.validate(d).errors.some(e => e.includes("nope")));
});

/* ---------- библиотека эхограмм ---------- */
test("эхограммы: каждый файл существует, не пустой и не больше 2 МБ", () => {
  const fs = require("fs"), path = require("path");
  assert.ok(FC.IMAGES.length > 0);
  for (const im of FC.IMAGES) {
    const f = path.join(__dirname, "..", im.file);
    assert.ok(fs.existsSync(f), `${im.id}: нет файла ${im.file}`);
    const size = fs.statSync(f).size;
    assert.ok(size > 1000 && size < 2 * 1024 * 1024, `${im.id}: размер ${size}`);
  }
  const files = new Set(FC.IMAGES.map(im => path.basename(im.file)));
  for (const f of fs.readdirSync(path.join(__dirname, "..", "img"))) assert.ok(files.has(f), `img/${f} не описан в data/images.js`);
});

test("эхограммы: у каждого снимка есть автор, источник, ссылка и лицензия; статус проверки корректен", () => {
  for (const im of FC.IMAGES) {
    const s = im.source;
    for (const f of ["authors", "title", "url", "license"]) assert.ok(s[f], `${im.id}: нет ${f}`);
    if (s.kind === "article") {
      assert.match(s.url, /^https:\/\/doi\.org\/10\./, `${im.id}: ссылка на статью через DOI`);
      assert.equal(s.license, "CC BY", `${im.id}: статьи берём только под CC BY`);
    } else {
      assert.match(s.url, /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/, im.id);
      assert.ok(["CC BY", "CC BY-SA", "CC0", "Public domain"].some(l => s.license.startsWith(l)), `${im.id}: лицензия ${s.license}`);
    }
    assert.ok(im.status === "draft" || (im.status === "approved" && im.reviewedBy && /^\d{4}-\d{2}-\d{2}$/.test(im.reviewedAt)), `${im.id}: approved только с reviewedBy и reviewedAt`);
    assert.ok(im.captionRu && /[а-яё]/i.test(im.captionRu), `${im.id}: нет русского перевода подписи`);
  }
});

test("эхограммы: валидатор ловит несуществующую карточку, чужой путь и пустую лицензию", () => {
  const D = clone(FC);
  D.IMAGES[0].cards = ["chd:nope"];
  D.IMAGES[1].file = "../secret.jpg";
  D.IMAGES[2].source.license = "";
  const errs = FC.validate(D).errors.join("\n");
  assert.match(errs, /нет карточки «chd:nope»/);
  assert.match(errs, /ожидается img\//);
  assert.match(errs, /license: обязательное поле/);
});

test("банк теста: не меньше 100 вопросов; approved только с рецензентом", () => {
  assert.ok(FC.QUIZ.length >= 100, `вопросов: ${FC.QUIZ.length}`);
  for (const [i, q] of FC.QUIZ.entries()) {
    if (q.status === "approved") assert.ok(q.reviewedBy && /^\d{4}-\d{2}-\d{2}$/.test(q.reviewedAt), `вопрос ${i}: approved без рецензента`);
    else if (q.status !== undefined) assert.equal(q.status, "draft", `вопрос ${i}`);
  }
});

test("атлас нормы: у каждого стандартного среза есть схема нормы", () => {
  for (const v of FC.VIEWS) {
    const t = FC.ATLAS.find(x => x.view === v.id && !x.chd);
    assert.ok(t, `${v.id}: нет схемы нормы в атласе`);
    const nums = t.structures.map(s => s.n).filter(n => n !== null).sort((a, b) => a - b);
    assert.deepEqual([...nums], Array.from({ length: nums.length }, (_, i) => i + 1), `${t.id}: номера по порядку`);
    if (t.id !== "4cv-normal") assert.equal(t.status, "draft", `${t.id}: до проверки автором — черновик`);
    for (const x of [...t.normal, ...t.structures.map(s => s.note || "")])
      assert.doesNotMatch(x, /\d+\s*(мм|см|%|°)/, `${t.id}: числовой критерий без источника: ${x}`);
  }
});
