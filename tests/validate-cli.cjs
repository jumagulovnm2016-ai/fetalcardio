/* Быстрая проверка контента: node tests/validate-cli.cjs */
const { load } = require("./load.cjs");
const FC = load();
const r = FC.validate(FC);
r.errors.forEach(e => console.error("ОШИБКА  " + e));
console.log(`Ошибок: ${r.errors.length}. Черновиков: ${r.warnings.filter(w => w.endsWith("черновик")).length}.`);
r.warnings.filter(w => !w.endsWith("черновик")).forEach(w => console.warn("ВНИМАНИЕ " + w));
process.exit(r.errors.length ? 1 : 0);
