"""Браузерная проверка FetalCardio (Playwright).
Запуск: python3 -m http.server 8765  →  python3 tests/e2e.py [папка_для_скриншотов]"""
import sys, json, os
from playwright.sync_api import sync_playwright

BASE = os.environ.get("BASE", "http://localhost:8765/")
OUT = sys.argv[1] if len(sys.argv) > 1 else None
ROUTES = ["", "views", "view/situs", "view/4cv", "view/lvot", "view/rvot", "view/3vv", "view/3vt",
          "algos", "algo/rv-gt-lv", "algo/overriding", "algo/reverse-flow", "chd",
          "chd/vsd", "chd/avsd", "chd/tof", "chd/tga", "chd/dorv", "chd/cat", "chd/hlhs", "chd/coa", "chd/ebstein", "chd/tapvr",
          "quiz", "search?q=" + "%D1%84%D0%B0%D0%BB%D0%BB%D0%BE", "nonexistent"]
fails = []
def check(cond, msg):
    if not cond: fails.append(msg)

with sync_playwright() as p:
    b = p.chromium.launch(executable_path=os.environ.get("CHROME", "/usr/bin/google-chrome"))

    # 1. Все страницы, три ширины, две темы: без ошибок JS и без горизонтальной прокрутки
    for w, h in [(360, 740), (768, 1024), (1280, 800)]:
        for scheme in ["light", "dark"]:
            ctx = b.new_context(viewport={"width": w, "height": h}, color_scheme=scheme, service_workers="block")
            pg = ctx.new_page(); errs = []
            pg.on("pageerror", lambda e: errs.append(str(e)))
            pg.on("console", lambda m: m.type == "error" and errs.append(m.text))
            for r in ROUTES:
                pg.goto(BASE + "#/" + r); pg.wait_for_timeout(120)
                check(pg.locator("main h1").count() >= 1, f"{w}/{scheme} #{r}: нет заголовка")
                sw_ = pg.evaluate("document.documentElement.scrollWidth"); cw = pg.evaluate("document.documentElement.clientWidth")
                check(sw_ <= cw + 1, f"{w}/{scheme} #{r}: горизонтальная прокрутка {sw_}>{cw}")
            check(not [e for e in errs if "fonts.g" not in e and "ERR_TUNNEL" not in e and "ERR_INTERNET" not in e], f"{w}/{scheme}: ошибки {errs[:3]}")
            if OUT and scheme == "light" and w == 360:
                pg.goto(BASE + "#/"); pg.wait_for_timeout(200); pg.screenshot(path=f"{OUT}/home-{w}.png")
            ctx.close()

    # 2. Переключатель темы, поиск, тест, экспорт/импорт
    ctx = b.new_context(viewport={"width": 390, "height": 844}, accept_downloads=True, service_workers="block")
    pg = ctx.new_page()
    pg.goto(BASE + "#/")
    themes = []
    for _ in range(3):
        pg.click("#themeBtn"); themes.append(pg.evaluate("document.documentElement.dataset.theme || 'auto'"))
    check(themes == ["light", "dark", "auto"], f"тема: {themes}")
    pg.fill("#searchInput", "Лёгочные вены"); pg.press("#searchInput", "Enter"); pg.wait_for_timeout(150)
    check(pg.locator("main mark").count() > 0, "поиск: нет подсветки")
    check("ТАДЛВ" in pg.inner_text("main") or "лёгочн" in pg.inner_text("main").lower(), "поиск: нет ТАДЛВ")
    pg.goto(BASE + "#/chd/tof"); pg.click("[data-done]"); pg.wait_for_timeout(100)
    pg.goto(BASE + "#/")
    with pg.expect_download() as d: pg.click("[data-export]")
    path = d.value.path(); data = json.load(open(path))
    check(data["app"] == "fetalcardio" and "c_tof" in data["data"]["studied"], f"экспорт: {data}")
    pg.evaluate("localStorage.clear()"); pg.reload()
    pg.on("dialog", lambda dlg: dlg.accept())
    pg.set_input_files("#importFile", path); pg.wait_for_timeout(300)
    check(pg.evaluate("JSON.parse(localStorage.getItem('fc_studied')||'{}').c_tof") == 1, "импорт: прогресс не восстановлен")
    pg.goto(BASE + "#/quiz"); pg.click("[data-quiz='10']")
    for _ in range(10):
        pg.click(".opt >> nth=0"); pg.click("[data-next]")
    check(pg.locator("[data-quizreset]").count() == 1, "тест: нет результата")
    ctx.close()

    # 3. Офлайн: после первой загрузки с Service Worker приложение открывается без сети
    ctx = b.new_context(viewport={"width": 390, "height": 844})
    pg = ctx.new_page()
    pg.goto(BASE); pg.evaluate("navigator.serviceWorker.ready.then(() => true)")
    pg.reload(); pg.wait_for_timeout(800)
    check(pg.evaluate("!!navigator.serviceWorker.controller"), "SW не управляет страницей")
    caches = pg.evaluate("caches.keys()")
    check(any(k.startswith("fetalcardio-app-") for k in caches), f"кэш: {caches}")
    ctx.set_offline(True)
    for r in ["", "chd/hlhs", "view/3vt", "search?q=TOF"]:
        pg.goto(BASE + "#/" + r); pg.wait_for_timeout(300)
        check(pg.locator("main h1").count() >= 1, f"офлайн #{r}: не открылось")
    pg.reload(); pg.wait_for_timeout(500)
    check(pg.locator("main h1").count() >= 1, "офлайн: перезагрузка не удалась")
    ctx.set_offline(False)
    # чужой кэш не удаляется
    pg.evaluate("caches.open('uzi-helper-v1').then(c=>c.put('/x', new Response('1')))")
    check("uzi-helper-v1" in pg.evaluate("caches.keys()"), "чужой кэш удалён")
    ctx.close()
    b.close()

print("\n".join("FAIL " + f for f in fails) or "Все браузерные проверки пройдены")
sys.exit(1 if fails else 0)
