"""Браузерная проверка закрытого доступа FetalCardio (Playwright) с имитацией сервера Supabase.
Сервер не нужен: account.js подменяется копией с тестовым адресом, ответы Supabase имитируются.
Запуск: python3 -m http.server 8765  →  python3 tests/auth_e2e.py"""
import json, os, re, sys, time, base64
from playwright.sync_api import sync_playwright

BASE = os.environ.get("BASE", "http://localhost:8765/")
ROOT = os.path.join(os.path.dirname(__file__), "..")
SB = "https://fc-test.supabase.co"
fails = []
def check(cond, msg):
    if not cond: fails.append(msg)

src = open(os.path.join(ROOT, "account.js"), encoding="utf-8").read()
check('url: "",' in src and 'key: ""' in src or "supabase.co" in src, "account.js: не найден блок CONFIG")
ACCOUNT_JS = re.sub(r'url: "[^"]*"', f'url: "{SB}"', src, count=1)
ACCOUNT_JS = re.sub(r'key: "[^"]*"', 'key: "sb_publishable_test"', ACCOUNT_JS, count=1)

def b64(d): return base64.urlsafe_b64encode(json.dumps(d).encode()).decode().rstrip("=")
UID = "33333333-3333-3333-3333-333333333333"
JWT = b64({"alg": "HS256", "typ": "JWT"}) + "." + b64({"sub": UID, "role": "authenticated", "session_id": "s1", "exp": int(time.time()) + 3600}) + ".sig"
USER = {"id": UID, "aud": "authenticated", "role": "authenticated", "email": "k12345@fetalcardio.invalid", "app_metadata": {}, "user_metadata": {}, "created_at": "2026-11-11T00:00:00Z"}

def profile(**kw):
    p = {"id": UID, "full_name": "Иванов Иван", "login": "k12345", "role": "student", "status": "active", "group_id": None, "access_until": None, "groups": None}
    p.update(kw); return p

def ctx_with(b, state, **kw):
    """state: dict(profile=..., online=True) — меняется по ходу теста."""
    c = b.new_context(service_workers="block", viewport={"width": 390, "height": 844}, **kw)
    c.route("**/account.js", lambda r: r.fulfill(status=200, content_type="application/javascript; charset=utf-8", body=ACCOUNT_JS))
    def sb(route):
        u = route.request.url
        if not state.get("online", True): return route.abort("internetdisconnected")
        if "/auth/v1/token" in u:
            body = json.loads(route.request.post_data or "{}")
            if body.get("password") != "abc123": return route.fulfill(status=400, json={"error": "invalid_grant", "error_description": "Invalid login credentials"})
            return route.fulfill(status=200, json={"access_token": JWT, "token_type": "bearer", "expires_in": 3600, "expires_at": int(time.time()) + 3600, "refresh_token": "r1", "user": USER})
        if "/auth/v1/user" in u:
            return route.fulfill(status=200, json=USER) if state.get("session_ok", True) else route.fulfill(status=403, json={"code": 403, "msg": "Session not found", "message": "Session not found"})
        if "/auth/v1/logout" in u: return route.fulfill(status=204, body="")
        if "/rest/v1/rpc/" in u: return route.fulfill(status=200, json=0)
        if "/rest/v1/profiles" in u: return route.fulfill(status=200, json=state["profile"])
        return route.fulfill(status=404, json={})
    c.route(SB + "/**", sb)
    return c

def gate_title(pg):
    return pg.locator("#fc-gate b").inner_text() if pg.locator("#fc-gate").count() else None

with sync_playwright() as p:
    b = p.chromium.launch(executable_path=os.environ.get("CHROME", "/usr/bin/google-chrome"))

    # 1. Без входа приложение закрыто, контента нет
    st = {"profile": profile()}
    c = ctx_with(b, st); pg = c.new_page(); errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto(BASE + "#/atlas/4cv-normal"); pg.wait_for_timeout(600)
    check(gate_title(pg) == "Нужно войти", f"без входа: окно «Нужно войти», а не {gate_title(pg)}")
    check(pg.locator("main#app h1").count() == 0, "без входа: содержимое приложения отрисовано")
    href = pg.get_attribute("#fc-gate [data-go]", "href")
    check(href.startswith("account.html?next=") and "atlas" in href, f"ссылка входа без возврата: {href}")

    # 2. Неверный код → ошибка; верный → возврат на ту же страницу атласа
    pg.click("#fc-gate [data-go]"); pg.wait_for_selector("#f-in")
    pg.fill("#in-who", "k12345"); pg.fill("#in-pass", "wrong"); pg.click("#in-go"); pg.wait_for_timeout(500)
    check("Неверный" in pg.inner_text("#in-err"), "неверный код: нет понятной ошибки")
    pg.fill("#in-pass", "abc123"); pg.click("#in-go"); pg.wait_for_timeout(1200)
    check("#/atlas/4cv-normal" in pg.url and pg.locator("main#app h1").count() == 1 and gate_title(pg) is None,
          f"после входа не вернулись в приложение: {pg.url}")
    check(pg.evaluate("!!localStorage.getItem('fc-auth') && !localStorage.getItem('acad-auth')"), "сеанс хранится не под своим ключом")
    check(not errs, f"ошибки JS: {errs[:3]}")

    # 3. Без интернета вошедший курсант открывает приложение (последний известный профиль)
    st["online"] = False
    pg.goto(BASE + "#/chd/tof"); pg.reload(); pg.wait_for_timeout(800)
    check(pg.locator("main#app h1").count() == 1 and gate_title(pg) is None, "офлайн: вошедший курсант не открыл приложение")
    st["online"] = True

    # 4. Срок истёк → закрыто с объяснением, даже если на устройстве был активный профиль
    st["profile"] = profile(access_until="2026-01-01T23:59:59Z")
    pg.reload(); pg.wait_for_timeout(900)
    check(gate_title(pg) == "Срок доступа истёк", f"истёкший срок: {gate_title(pg)}")

    # 5. Ожидает подтверждения / отключён
    st["profile"] = profile(status="pending"); pg.reload(); pg.wait_for_timeout(900)
    check(gate_title(pg) == "Ожидает подтверждения", f"pending: {gate_title(pg)}")
    st["profile"] = profile(status="blocked"); pg.reload(); pg.wait_for_timeout(900)
    check(gate_title(pg) == "Аккаунт отключён", f"blocked: {gate_title(pg)}")

    # 6. Вошли на другом устройстве (сеанс завершён на сервере) → выход с объяснением
    st["profile"] = profile(); st["session_ok"] = False
    pg.reload(); pg.wait_for_timeout(1000)
    check(gate_title(pg) == "Нужно войти" and "другом устройстве" in pg.inner_text("#fc-gate"), "другое устройство: нет выхода с объяснением")
    check(not pg.evaluate("localStorage.getItem('fc-profile')"), "после выхода профиль остался на устройстве")
    st["session_ok"] = True

    # 7. Кабинет преподавателя закрыт для курсанта
    pg.goto(BASE + "account.html"); pg.wait_for_selector("#f-in")
    pg.fill("#in-who", "k12345"); pg.fill("#in-pass", "abc123"); pg.click("#in-go"); pg.wait_for_timeout(1000)
    check(pg.locator("#in").is_visible() and "Иванов" in pg.inner_text("#p-name"), "личный кабинет: профиль не показан")
    pg.goto(BASE + "teacher.html"); pg.wait_for_timeout(1000)
    check(pg.locator("#denied").is_visible() and pg.locator("#app").is_hidden(), "кабинет преподавателя открыт курсанту")
    c.close()

    # 8. Сессия Академии УЗИ не открывает FetalCardio
    st = {"profile": profile()}
    c = ctx_with(b, st); pg = c.new_page()
    pg.goto(BASE); pg.evaluate("localStorage.setItem('acad-auth', JSON.stringify({access_token:'x'})); localStorage.setItem('acad-profile', JSON.stringify({status:'active'}))")
    pg.reload(); pg.wait_for_timeout(700)
    check(gate_title(pg) == "Нужно войти", "вход Академии УЗИ открыл FetalCardio")
    c.close()
    b.close()

print("\n".join("FAIL " + f for f in fails) or "Все проверки доступа пройдены")
sys.exit(1 if fails else 0)
