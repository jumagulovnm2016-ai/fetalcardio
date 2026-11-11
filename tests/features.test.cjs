const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs"), path = require("path");
const { load, ROOT, ORDER } = require("./load.cjs");
const FC = load();
const S = FC.search, ix = S.buildIndex(FC);
const top = q => [...S.query(ix, q).map(r => r.id)];

test("поиск: нормализация ё/е и регистра", () => {
  assert.equal(S.normalize("Лёгочные ВЕНЫ"), "легочные вены");
  assert.deepEqual(top("лёгочные вены"), top("легочные вены"));
});
test("поиск: аббревиатуры и английские названия", () => {
  assert.equal(top("ТФ")[0], "tof");
  assert.equal(top("TOF")[0], "tof");
  assert.equal(top("tetralogy of Fallot")[0], "tof");
  assert.equal(top("HLHS")[0], "hlhs");
  assert.equal(top("d-TGA")[0], "tga");
});
test("поиск: синонимы", () => {
  assert.equal(top("Фалло")[0], "tof");
  assert.equal(top("транспозиция")[0], "tga");
  assert.equal(top("атриовентрикулярный канал")[0], "avsd");
  assert.equal(top("трункус")[0], "cat");
});
test("поиск: по ddx, prognosis, assoc", () => {
  assert.ok(top("Норвуд").includes("hlhs"), "prognosis");
  assert.ok(top("22q11").includes("cat"), "assoc");
  assert.ok(top("аортолегочное окно").includes("cat"), "ddx");
});
test("поиск: словоформы", () => assert.ok(top("трисомия 21").includes("avsd")));
test("поиск: пустой запрос и отсутствие совпадений", () => {
  assert.deepEqual(top("   "), []);
  assert.deepEqual(top("абракадабра"), []);
});
test("поиск: подсветка указывает на исходный текст", () => {
  const r = S.query(ix, "Норвуд").find(x => x.id === "hlhs");
  const [s, e] = r.snippet.ranges[0];
  assert.equal(r.snippet.text.slice(s, e), "Норвуд");
});

test("прогресс: экспорт → импорт без потерь", () => {
  const state = { studied: { c_tof: 1, v_4cv: 1, a_parallel: 1 }, quizBest: { score: 8, total: 10 } };
  const file = JSON.stringify(FC.progress.build(state));
  const r = FC.progress.parse(file, FC);
  assert.ok(r.ok);
  assert.deepEqual(Object.keys(r.data.studied).sort(), Object.keys(state.studied).sort());
  assert.deepEqual({ ...r.data.quizBest }, state.quizBest);
  assert.deepEqual([...r.skipped], []);
});
test("прогресс: отклоняет чужие и битые файлы", () => {
  assert.equal(FC.progress.parse("не json", FC).ok, false);
  assert.equal(FC.progress.parse(JSON.stringify({ app: "other" }), FC).ok, false);
  assert.equal(FC.progress.parse(JSON.stringify({ app: "fetalcardio", format: 99, data: { studied: [] } }), FC).ok, false);
});
test("прогресс: неизвестные ключи и некорректный тест пропускаются", () => {
  const r = FC.progress.parse(JSON.stringify({ app: "fetalcardio", format: 1, data: { studied: ["c_tof", "c_deleted", "<script>"], quizBest: { score: 11, total: 10 } } }), FC);
  assert.ok(r.ok);
  assert.deepEqual(Object.keys(r.data.studied), ["c_tof"]);
  assert.equal(r.data.quizBest, null);
  assert.equal(r.skipped.length, 3);
});

test("index.html подключает все модули, sw.js кэширует все файлы", () => {
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  const sw = fs.readFileSync(path.join(ROOT, "sw.js"), "utf8");
  for (const f of [...ORDER, "schemes.js", "app.js"]) {
    assert.ok(html.includes(`src="${f}"`), `index.html: ${f}`);
    assert.ok(sw.includes(`"${f}"`), `sw.js: ${f}`);
    assert.ok(fs.existsSync(path.join(ROOT, f)), `файл ${f}`);
  }
});
test("sw.js удаляет только свои кэши и кэширует только успешные ответы", () => {
  const sw = fs.readFileSync(path.join(ROOT, "sw.js"), "utf8");
  assert.match(sw, /k\.startsWith\(PREFIX\)/);
  assert.match(sw, /r\.ok/);
  assert.match(sw, /const PREFIX = "fetalcardio-"/);
});
