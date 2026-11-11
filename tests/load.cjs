/* Загружает модули приложения в изолированный контекст так же, как браузер. */
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = path.join(__dirname, "..");
const ORDER = ["data/meta.js", "data/references.js", "data/views.js", "data/algorithms.js",
  "data/pathologies.js", "data/quiz.js", "validate.js", "search.js", "progress.js"];
function load(override) {
  const ctx = {}; vm.createContext(ctx);
  ORDER.forEach(f => vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), ctx, { filename: f }));
  // Выравниваем прототипы с основным контекстом для deepStrictEqual
  const FC = ctx.FC;
  if (override) override(FC);
  return FC;
}
module.exports = { load, ROOT, ORDER };
