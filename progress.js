/* FetalCardio — экспорт и импорт учебного прогресса (JSON). */
var FC = globalThis.FC = globalThis.FC || {};
(function () {
  const APP = "fetalcardio", FORMAT = 1;
  const KEY_RE = /^([vact])_([a-z0-9-]+)$/;

  function validKeys(D) {
    return new Set([
      ...(D.VIEWS || []).map(x => "v_" + x.id),
      ...(D.ALGOS || []).map(x => "a_" + x.id),
      ...(D.CHD || []).map(x => "c_" + x.id),
      ...(D.ATLAS || []).map(x => "t_" + x.id)
    ]);
  }

  function build(state, now = new Date()) {
    return {
      app: APP, format: FORMAT, exportedAt: now.toISOString(),
      data: { studied: Object.keys(state.studied || {}).sort(), quizBest: state.quizBest || null }
    };
  }

  /* Возвращает { ok, data:{studied, quizBest}, skipped:[...], error } — без побочных эффектов. */
  function parse(text, D) {
    let obj;
    try { obj = typeof text === "string" ? JSON.parse(text) : text; } catch { return { ok: false, error: "Файл не является корректным JSON." }; }
    if (!obj || obj.app !== APP) return { ok: false, error: "Это не файл прогресса FetalCardio." };
    if (obj.format !== FORMAT) return { ok: false, error: `Неподдерживаемая версия формата: ${obj.format}.` };
    const d = obj.data || {};
    if (!Array.isArray(d.studied)) return { ok: false, error: "В файле нет списка изученных разделов." };
    const allowed = validKeys(D), studied = {}, skipped = [];
    d.studied.forEach(k => {
      if (typeof k === "string" && KEY_RE.test(k) && allowed.has(k)) studied[k] = 1;
      else skipped.push(String(k));
    });
    let quizBest = null;
    if (d.quizBest != null) {
      const q = d.quizBest;
      if (Number.isInteger(q.score) && Number.isInteger(q.total) && q.total > 0 && q.score >= 0 && q.score <= q.total) quizBest = { score: q.score, total: q.total };
      else skipped.push("quizBest");
    }
    return { ok: true, data: { studied, quizBest }, skipped, exportedAt: obj.exportedAt || null };
  }

  FC.progress = { build, parse, APP, FORMAT };
  if (typeof module !== "undefined" && module.exports) module.exports = FC.progress;
})();
