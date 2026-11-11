/* FetalCardio — вход курсантов и закрытие приложения без доступа.
   Отдельный проект Supabase (не Академия УЗИ): аккаунты, группы и сроки доступа — свои.
   Публичный ключ можно хранить открыто: что разрешено, решают правила доступа в базе (supabase/setup.sql).

   Если очистить URL и ключ в CONFIG, закрытие выключится и приложение станет открытым для всех.
   Как только они заданы, без входа приложение закрыто, а если модуль входа не загрузился — тоже закрыто.

   Важно: это ограничение интерфейса. Оно отсекает посторонних, но файлы сайта (data/*.js)
   и репозиторий на GitHub остаются публичными. */
var FC = globalThis.FC = globalThis.FC || {};
(function () {
"use strict";
const CONFIG = {
  url: "https://xzmfcsmmbfgzyzifpnxx.supabase.co",   // Supabase → организация Fetalcardio → Project Settings → API → Project URL
  key: "sb_publishable_n1iK5SPc6oI2Xei-nLYv0Q_4fNtDx3M"   // Publishable key — публичный, его можно хранить открыто
};
const DOMAIN = "fetalcardio.invalid";   // служебные адреса аккаунтов «по коду»
const AUTH_KEY = "fc-auth";             // своё хранилище сеанса, не общее с Академией УЗИ
const K = { profile: "fc-profile", kicked: "fc-kicked" };
const LS = {
  get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
  del(k) { try { localStorage.removeItem(k); } catch (e) {} },
  has(k) { try { return localStorage.getItem(k) !== null; } catch (e) { return false; } }
};

const listeners = [];
const api = FC.account = {
  enabled: !!(CONFIG.url && CONFIG.key), client: null, profile: null, ready: null, DOMAIN,
  onChange(cb) { listeners.push(cb); }
};
const emit = () => listeners.forEach(cb => { try { cb(api.profile); } catch (e) {} });

function ru(err) {
  const m = String((err && (err.message || err.error_description || err.error)) || err || "");
  if (/Invalid login credentials/i.test(m)) return "Неверный логин (почта) или пароль.";
  if (/already registered|already been registered|User already/i.test(m)) return "Эта почта уже зарегистрирована. Войдите или попросите преподавателя выдать новый пароль.";
  if (/Password should be at least|password.*(short|length)/i.test(m)) return "Пароль слишком короткий — нужно не меньше 6 символов.";
  if (/valid email|Unable to validate email|invalid format/i.test(m)) return "Проверьте адрес почты.";
  if (/rate limit|too many/i.test(m)) return "Слишком много попыток. Подождите минуту и попробуйте снова.";
  if (/Failed to fetch|NetworkError|Load failed|fetch/i.test(m)) return "Нет связи с сервером. Проверьте интернет.";
  if (/signups not allowed|Signups not allowed/i.test(m)) return "Регистрация сейчас закрыта. Обратитесь к преподавателю.";
  return m || "Неизвестная ошибка.";
}
api.ru = ru;

const expired = p => !!(p && p.access_until && Date.parse(p.access_until) <= Date.now());
const allowed = (p, teacherOnly) => !!(p && p.status === "active" && (p.role === "teacher" || !expired(p)) && (!teacherOnly || p.role === "teacher"));
api.expired = expired;
api.allowed = allowed;
api.who = p => p ? (p.login ? "логин " + p.login : (p.email ? "почта " + p.email : "аккаунт")) : "";

if (!api.enabled) {
  api.ready = Promise.resolve(null);
  api.gate = () => Promise.resolve(true);
  return;
}
if (!globalThis.supabase || !globalThis.supabase.createClient) {
  // модуль входа не загрузился — приложение остаётся закрытым
  api.ready = Promise.resolve(null);
  api.broken = true;
} else {
  api.client = globalThis.supabase.createClient(CONFIG.url, CONFIG.key, { auth: { persistSession: true, autoRefreshToken: true, storageKey: AUTH_KEY } });
}
const sb = api.client;

function clearLocal() { LS.del(K.profile); }

async function loadProfile() {
  const { data: { session } } = await sb.auth.getSession();
  if (!session) { api.profile = null; clearLocal(); return null; }
  // проверка на сервере: если преподаватель завершил сеансы (новый код, отключение) или вошли с другого устройства — выйти здесь
  if (navigator.onLine) {
    try {
      const { error: ue } = await sb.auth.getUser();
      if (ue && (ue.status === 400 || ue.status === 401 || ue.status === 403 || /session|not found|missing|JWT/i.test(ue.message || ""))) {
        try { await sb.auth.signOut({ scope: "local" }); } catch (x) {}
        LS.set(K.kicked, Date.now()); clearLocal(); api.profile = null; return null;
      }
    } catch (e) { /* нет связи — проверим в следующий раз */ }
  }
  try {
    const { data, error } = await sb.from("profiles").select("id,full_name,login,role,status,group_id,access_until,groups(name)").eq("id", session.user.id).single();
    if (error) throw error;
    api.profile = Object.assign({}, data, { email: data.login ? null : session.user.email, group: data.groups ? data.groups.name : null });
    delete api.profile.groups;
    LS.set(K.profile, api.profile);
  } catch (e) {
    if (navigator.onLine && e && (e.status === 401 || e.code === "PGRST301" || /JWT|token/i.test(e.message || ""))) {
      try { await sb.auth.signOut({ scope: "local" }); } catch (x) {}
      clearLocal(); api.profile = null; return null;
    }
    // без интернета — последний известный профиль этого же аккаунта
    const cached = LS.get(K.profile, null);
    api.profile = cached && cached.id === session.user.id ? cached : null;
  }
  return api.profile;
}

async function afterLogin() {
  LS.del(K.kicked);
  await loadProfile();
  // один аккаунт курсанта — одно устройство: прежние сеансы завершаются
  if (api.profile && api.profile.role !== "teacher") { try { await sb.rpc("keep_only_this_session"); } catch (e) {} }
  emit();
}

api.signIn = async (who, password) => {
  who = String(who || "").trim().toLowerCase();
  const email = who.includes("@") ? who : `${who}@${DOMAIN}`;
  const { error } = await sb.auth.signInWithPassword({ email, password: String(password || "") });
  if (error) throw new Error(ru(error));
  await afterLogin(); return api.profile;
};

api.signUp = async (fullName, email, password) => {
  fullName = String(fullName || "").trim().replace(/\s+/g, " ");
  email = String(email || "").trim().toLowerCase();
  if (fullName.split(" ").length < 2) throw new Error("Введите фамилию и имя полностью.");
  if (email.endsWith("@" + DOMAIN)) throw new Error("Проверьте адрес почты.");
  const { data, error } = await sb.auth.signUp({ email, password: String(password || ""), options: { data: { full_name: fullName } } });
  if (error) throw new Error(ru(error));
  if (!data.session) throw new Error("Регистрация прошла, но вход не выполнен: в Supabase включено подтверждение почты. Сообщите преподавателю.");
  await afterLogin(); return api.profile;
};

api.signOut = async () => {
  try { await sb.auth.signOut(); } catch (e) {}
  clearLocal(); api.profile = null; emit();
};

api.rename = async (fullName) => {
  const { error } = await sb.rpc("teacher_rename", { p_user: api.profile.id, p_full_name: String(fullName || "").trim().replace(/\s+/g, " ").slice(0, 120) });
  if (error) throw new Error(ru(error));
  await loadProfile(); emit();
};

if (sb) {
  api.ready = loadProfile().catch(() => null);
  sb.auth.onAuthStateChange(ev => { if (ev === "SIGNED_OUT") { api.profile = null; emit(); } });
}

/* ---------- закрытие приложения ----------
   opts.teacher — страница только для преподавателя. Возвращает Promise<boolean>. */
api.gate = async function (opts) {
  opts = opts || {};
  const cached = LS.get(K.profile, null);
  // быстрый путь (и работа без интернета): есть сеанс и последний известный профиль с доступом — не ждём сеть,
  // но всё равно сверяемся с сервером и закрываем, если доступ отозван
  if (sb && LS.has(AUTH_KEY) && allowed(cached, opts.teacher)) {
    api.ready.then(p => { if (navigator.onLine && !allowed(p, opts.teacher)) shutter(p, opts); });
    return true;
  }
  const p = await api.ready;
  if (allowed(p, opts.teacher)) return true;
  shutter(p, opts);
  return false;
};

function shutter(p, opts) {
  if (document.getElementById("fc-gate")) return;
  const here = location.pathname.split("/").pop() || "index.html";
  const next = encodeURIComponent(here + location.search + location.hash);
  const dlong = s => new Date(s).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
  const [title, text, btn] = api.broken
    ? ["Не удалось загрузить вход", "Модуль входа не загрузился. Проверьте интернет и обновите страницу.", "Обновить"]
    : !p
    ? ["Нужно войти", (Date.now() - LS.get(K.kicked, 0) < 7 * 864e5
        ? "На этом устройстве выполнен выход: в ваш аккаунт вошли на другом устройстве или преподаватель выдал новый код. Один аккаунт работает на одном устройстве. "
        : "") + "FetalCardio доступен только курсантам. Войдите по логину и коду от преподавателя или по своей почте.", "Войти"]
    : p.status === "active" && expired(p) ? ["Срок доступа истёк", `Доступ был открыт до ${dlong(p.access_until)}. Чтобы продлить доступ, обратитесь к преподавателю.`, "Личный кабинет"]
    : p.status === "pending" ? ["Ожидает подтверждения", "Ваша регистрация ещё не подтверждена преподавателем. Как только он откроет доступ, приложение заработает.", "Личный кабинет"]
    : p.status === "blocked" ? ["Аккаунт отключён", "Обратитесь к преподавателю.", "Личный кабинет"]
    : ["Только для преподавателя", "Эта страница доступна только преподавателю курса.", "Личный кабинет"];
  const d = document.createElement("div");
  d.id = "fc-gate";
  d.setAttribute("role", "dialog"); d.setAttribute("aria-modal", "true"); d.setAttribute("aria-labelledby", "fc-gate-t");
  d.style.cssText = "position:fixed;inset:0;z-index:9999;display:grid;place-items:center;padding:16px;background:var(--bg,#f5f7fb);background-image:var(--bg-grad,none)";
  d.innerHTML = `<div style="max-width:420px;width:100%;background:var(--surface,#fff);color:var(--text,#101828);border:1px solid var(--line,#e4e8f0);border-radius:18px;padding:24px;display:grid;gap:12px;box-shadow:var(--shadow-lg,none);font:15.5px/1.55 var(--body,system-ui,sans-serif)">
    <span style="display:flex;align-items:center;gap:10px;font-weight:700"><img src="icons/icon-192.png" alt="" width="28" height="28">FetalCardio</span>
    <b id="fc-gate-t" style="font:800 1.5rem/1.2 var(--head,system-ui,sans-serif)"></b><p style="margin:0;color:var(--muted,#5d6b82)"></p>
    <div style="display:flex;gap:10px;flex-wrap:wrap"><a data-go style="font-weight:700;border-radius:12px;padding:10px 18px;background:var(--accent,#4256e0);color:#fff;text-decoration:none"></a></div></div>`;
  d.querySelector("b").textContent = title; d.querySelector("p").textContent = text;
  const a = d.querySelector("[data-go]"); a.textContent = btn;
  if (api.broken) { a.href = "#"; a.onclick = e => { e.preventDefault(); location.reload(); }; }
  else a.href = "account.html?next=" + next;
  document.body.appendChild(d);
  document.querySelectorAll("body > :not(#fc-gate)").forEach(el => { if (el.tagName !== "SCRIPT") { el.setAttribute("aria-hidden", "true"); el.style.visibility = "hidden"; } });
}
api.shutter = shutter;
})();
