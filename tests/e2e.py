"""Браузерная проверка FetalCardio (Playwright).
Запуск: python3 -m http.server 8765  →  python3 tests/e2e.py [папка_для_скриншотов]"""
import sys, json, os
from playwright.sync_api import sync_playwright

BASE = os.environ.get("BASE", "http://localhost:8765/")
OUT = sys.argv[1] if len(sys.argv) > 1 else None
ROUTES = ["", "views", "view/situs", "view/4cv", "view/lvot", "view/rvot", "view/3vv", "view/3vt",
          "algos", "algo/rv-gt-lv", "algo/overriding", "algo/reverse-flow", "chd",
          "chd/vsd", "chd/avsd", "chd/tof", "chd/tga", "chd/dorv", "chd/cat", "chd/hlhs", "chd/coa", "chd/ebstein", "chd/tapvr",
          "atlas", "atlas/4cv-normal",
          "quiz", "search?q=" + "%D1%84%D0%B0%D0%BB%D0%BB%D0%BE", "nonexistent"]
fails = []
def check(cond, msg):
    if not cond: fails.append(msg)

with sync_playwright() as p:
    b = p.chromium.launch(executable_path=os.environ.get("CHROME", "/usr/bin/google-chrome"))
    # Приложение закрыто без входа (account.js). Для проверки содержимого — вошедший активный курсант:
    # сеанс и профиль в localStorage, как после входа; сервер Supabase в тестах недоступен — работает «офлайн-путь».
    LOGIN = """(() => { try {
      if (localStorage.getItem('fc-auth')) return;
      const exp = Math.floor(Date.now() / 1000) + 86400;
      const user = { id: 'e2e00000-0000-0000-0000-000000000000', aud: 'authenticated', role: 'authenticated', email: 'e2e@fetalcardio.invalid', app_metadata: {}, user_metadata: {} };
      localStorage.setItem('fc-auth', JSON.stringify({ access_token: 'e2e', refresh_token: 'e2e', token_type: 'bearer', expires_in: 86400, expires_at: exp, user }));
      localStorage.setItem('fc-profile', JSON.stringify({ id: user.id, full_name: 'Тест', login: 'e2e', role: 'student', status: 'active', access_until: null }));
    } catch (e) {} })();"""
    _new_context = b.new_context
    def new_context(**kw):
        c = _new_context(**kw); c.add_init_script(LOGIN); return c
    b.new_context = new_context

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

    # 2a. Анатомический атлас: схема встроена, подписи не перекрываются, анатомические отношения
    for scheme in ["light", "dark"]:
        ctx = b.new_context(viewport={"width": 1280, "height": 900}, color_scheme=scheme, service_workers="block")
        pg = ctx.new_page()
        pg.goto(BASE + "#/atlas/4cv-normal"); pg.wait_for_selector("#atlasSvg svg #heart", timeout=5000)
        res = pg.evaluate("""() => {
          const svg = document.querySelector('#atlasSvg svg'), q = s => svg.querySelector(s);
          const bb = s => q(s).getBBox();
          // 1. подписи не перекрываются (по рамкам текстов и кружков с номерами)
          const boxes = [...svg.querySelectorAll('#layer-labels text, #layer-labels circle.nb')].map(e => {
            const r = e.getBBox(); return { id: e.closest('g').id, x: r.x, y: r.y, w: r.width, h: r.height }; });
          const over = [];
          for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
            const a = boxes[i], c = boxes[j]; if (a.id === c.id) continue;
            if (a.x < c.x + c.w && c.x < a.x + a.w && a.y < c.y + c.h && c.y < a.y + a.h) over.push(a.id + '/' + c.id);
          }
          // подписи в пределах холста
          const vb = svg.viewBox.baseVal, out = boxes.filter(r => r.x < 0 || r.y < 0 || r.x + r.w > vb.width || r.y + r.h > vb.height).map(r => r.id);
          const pt = (s, end) => { const e = q(s), l = end ? e.getTotalLength() : 0; return e.getPointAtLength(l); };
          const inside = (s, p) => q(s).isPointInFill(new DOMPoint(p.x, p.y));
          const rv = bb('#s-rv'), lv = bb('#s-lv'), ra = bb('#s-ra'), la = bb('#s-la'), ivs = bb('#s-ivs');
          const tvHinge = pt('#s-tv path.lf'), mvHinge = pt('#s-mv path.lf');
          const mbA = pt('#s-mb path.tj'), mbB = pt('#s-mb path.tj', true);
          const flapEnd = pt('#s-flap path.flap', true), ias = bb('#s-ias'), fo = bb('#s-fo');
          const lumens = [...svg.querySelectorAll('#layer-veins-lumen path')].map(e => e.getPointAtLength(e.getTotalLength()));
          return {
            over, out, n: boxes.length,
            lvApex: lv.y < rv.y,                                  // ЛЖ формирует верхушку
            sides: rv.x < lv.x && ra.x < la.x,                    // правые слева, левые справа
            ventriclesAbove: rv.y + rv.height <= ra.y + ra.height && lv.y < la.y,
            offset: tvHinge.y < mvHinge.y,                        // ТК ближе к верхушке (выше на схеме)
            mbInRV: inside('#s-rv', mbA) || inside('#s-rv', {x: (mbA.x + mbB.x) / 2, y: (mbA.y + mbB.y) / 2}),
            mbNotLV: !inside('#s-lv', {x: (mbA.x + mbB.x) / 2, y: (mbA.y + mbB.y) / 2}),
            flapInLA: inside('#s-la', flapEnd),                   // клапан ОО направлен в ЛП
            foInSeptum: fo.y > ias.y && fo.y + fo.height < ias.y + ias.height,
            pvToLA: lumens.length === 2 && lumens.every(p => inside('#s-la', p) || inside('#s-la', {x: p.x, y: p.y - 3})),
            ivsSpan: ivs.y < rv.y + 20 && ivs.y + ivs.height >= tvHinge.y - 1,
            asym: Math.abs(rv.width - lv.width) > 5 || Math.abs(rv.height - lv.height) > 5,
            laPosterior: la.y + la.height >= ra.y + ra.height - 10,
          };
        }""")
        check(not res["over"], f"атлас {scheme}: перекрытие подписей {res['over'][:5]}")
        check(not res["out"], f"атлас {scheme}: подписи за пределами холста {res['out']}")
        for k in ["lvApex", "sides", "ventriclesAbove", "offset", "mbInRV", "mbNotLV", "flapInLA", "foInSeptum", "pvToLA", "ivsSpan", "asym", "laPosterior"]:
            check(res[k], f"атлас {scheme}: анатомическая проверка {k} не пройдена")
        # подсветка из легенды и скрытие подписей
        pg.click("[data-hl='mb']")
        check(pg.evaluate("document.querySelector('#atlasSvg svg').classList.contains('focus') && document.querySelectorAll('#atlasSvg [data-s=mb].hl').length >= 2"), f"атлас {scheme}: подсветка")
        pg.click("[data-hl='mb']")
        check(pg.evaluate("!document.querySelector('#atlasSvg svg').classList.contains('focus')"), f"атлас {scheme}: снятие подсветки")
        pg.click("[data-labels]")
        check(pg.evaluate("getComputedStyle(document.querySelector('#layer-labels')).display") == "none", f"атлас {scheme}: скрытие подписей")
        if OUT: pg.locator("#atlasFig").screenshot(path=f"{OUT}/atlas-4cv-{scheme}.png")
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
    for r in ["", "chd/hlhs", "view/3vt", "search?q=TOF", "atlas/4cv-normal"]:
        pg.goto(BASE + "#/" + r); pg.wait_for_timeout(300)
        check(pg.locator("main h1").count() >= 1, f"офлайн #{r}: не открылось")
    check(pg.locator("#atlasSvg svg #heart").count() == 1, "офлайн: схема атласа не загрузилась из кэша")
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
