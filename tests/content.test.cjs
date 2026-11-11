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

test("у каждой патологии есть references с организацией, названием, годом, DOI/URL и разделом", () => {
  for (const c of FC.CHD) {
    assert.ok(c.references.length > 0, c.id);
    for (const r of c.references) {
      const s = FC.REFS[r.source];
      assert.ok(s.organization && s.title && Number.isInteger(s.year) && (s.doi || s.url) && r.section, `${c.id} → ${r.source}`);
    }
  }
});

test("источники: DOI совпадает с URL, без непроверенных пометок verified", () => {
  for (const [id, s] of Object.entries(FC.REFS)) {
    if (s.doi) assert.equal(s.url, "https://doi.org/" + s.doi, id);
  }
  for (const x of [...FC.VIEWS, ...FC.CHD]) for (const r of x.references) assert.equal(r.verified, false, `${x.id}: verified=true без рецензии`);
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

test("атлас: файлы SVG существуют, статус draft, плашка DRAFT, без скриптов", () => {
  assert.ok(FC.ATLAS.length > 0);
  for (const t of FC.ATLAS) {
    const svg = svgOf(t);
    assert.match(svg, /^<svg[^>]+viewBox="0 0 \d+ \d+"/, `${t.id}: корневой svg с viewBox`);
    assert.equal(t.status, "draft", `${t.id}: до экспертной проверки только draft`);
    assert.match(svg, /data-status="draft"/, `${t.id}: data-status`);
    assert.match(svg, /DRAFT · REQUIRES EXPERT REVIEW/, `${t.id}: плашка DRAFT`);
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
  d = D(); d.ATLAS[0].status = "approved";
  assert.ok(FC.validate(d).errors.some(e => e.includes("reviewedBy")));
});
