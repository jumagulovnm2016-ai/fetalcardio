"""Генератор схем ДМЖП для атласа FetalCardio (стиль атласа 4CV, версия 4).

  vsd-types.svg — межжелудочковая перегородка со стороны правого желудочка
                  (вид спереди, передняя стенка ПЖ удалена) и места четырёх типов ДМЖП
                  по классификации ISNPCHD / МКБ-11 (Lopez 2018).
  vsd-4cv.svg   — четырёхкамерный срез: приточный и трабекулярные мышечные дефекты.
  vsd-5cv.svg   — пятикамерный срез (выходной тракт ЛЖ): перимембранозный дефект под аортальным клапаном.

Все три схемы — черновики (status draft) до проверки автором.
Запуск:  cd tools/atlas && python3 build_vsd.py ../../atlas
"""
import sys, os, re
import build_4cv as A
B = A.B

DRAFT = "DRAFT · REQUIRES EXPERT REVIEW"
W, H = 820, 900


def esc(s):
    return B.esc(s)


def head(svg_id, title, desc, header, meta_extra=""):
    """Корень SVG + defs/style из атласа 4CV + шапка с плашкой черновика."""
    base = A.build()
    defs = base[base.index("<defs>"):base.index("</style>") + len("</style>")]
    extra = """
<defs>
<linearGradient id="g-vsd" x1="0" x2="1"><stop offset="0" stop-color="#2452b8"/><stop offset=".5" stop-color="#7a3a8c"/><stop offset="1" stop-color="#c41d22"/></linearGradient>
<radialGradient id="g-hole" cx=".42" cy=".38" r=".7"><stop offset="0" stop-color="#ef6a5c"/><stop offset=".55" stop-color="#b3161c"/><stop offset="1" stop-color="#5c070b"/></radialGradient>
<radialGradient id="g-sept" gradientUnits="userSpaceOnUse" cx="430" cy="440" r="380">
  <stop offset="0" stop-color="#fbe9e3"/><stop offset=".65" stop-color="#f1d0c6"/><stop offset="1" stop-color="#ddb0a3"/></radialGradient>
<radialGradient id="g-pa" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#6d93e6"/><stop offset=".6" stop-color="#2452b8"/><stop offset="1" stop-color="#143584"/></radialGradient>
</defs>
<style>
.hole{fill:url(#g-hole);stroke:#2b1a1a;stroke-width:2}
.holer{fill:none;stroke:#fff;stroke-width:1.2;opacity:.5}
.vsd{fill:url(#g-vsd);stroke:none}
.rim{stroke:#2b1a1a;stroke-width:2.2;fill:none;stroke-linecap:round}
.zone{fill:none;stroke:#5b2a1f;stroke-width:1.6;stroke-dasharray:7 5;opacity:.75}
.zt{fill:#5b2a1f;font-size:12px;font-weight:700;letter-spacing:.07em;opacity:.8}
.sept{fill:url(#g-sept);stroke:#2b1a1a;stroke-width:2}
.cut{fill:url(#g-myo);stroke:#2b1a1a;stroke-width:2.4;stroke-linejoin:round}
.cutf{fill:#e9bfb3;stroke:#2b1a1a;stroke-width:1.2}
.ves{stroke:#2b1a1a;stroke-width:2}
.ring{fill:none;stroke:#2b1a1a;stroke-width:1.6}
.cusp{fill:#fbfbff;stroke:#2b1a1a;stroke-width:1.4}
.fibrous{fill:#fffaf2;stroke:#2b1a1a;stroke-width:1.2}
.flow{stroke:#ffffff;stroke-width:2.2;fill:none;stroke-linecap:round;opacity:.9}
.flowh{fill:#ffffff;opacity:.9}
</style>"""
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" role="img" aria-labelledby="t-{svg_id} d-{svg_id}" font-family="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" data-status="draft">
<title id="t-{svg_id}">{esc(title)}</title>
<desc id="d-{svg_id}">{esc(desc)} Статус: черновик, требует проверки экспертом.</desc>
<metadata>{{"app":"FetalCardio","id":"{svg_id}","status":"draft","author":"Жумагулов Н.М.","created":"2026-11-13","version":1{meta_extra}}}</metadata>
{defs}{extra}
<rect class="bg" x="0" y="0" width="{W}" height="{H}"/>
<g id="layer-header">
<text class="hd" x="24" y="34">{esc(header)}</text>
<rect class="dr" x="24" y="48" width="262" height="28" rx="6"/>
<text class="drt" x="155" y="67" text-anchor="middle">{DRAFT}</text>
</g>'''


def mark(key, num, name, abbr, x, y):
    t = num if num else "•"
    tip = esc(f"{t}. {name} ({abbr})")
    return (f'<g id="lbl-{key}" class="lbl" data-s="{key}"><title>{tip}</title>'
            f'<circle class="nb{"" if num else " nb0"}" cx="{x}" cy="{y}" r="11.5"/>'
            f'<text class="nt" x="{x}" y="{y + 4.2}" text-anchor="middle">{t}</text></g>')


def foot(lines):
    y0 = H - 8 - 20 * (len(lines) - 1)
    return '<g id="layer-orientation">' + "".join(
        f'<text class="om" x="24" y="{y0 + 20 * i}">{esc(s)}</text>' for i, s in enumerate(lines)) + "</g>\n</svg>"


# =====================================================================================
# 1. Перегородка со стороны ПЖ
# =====================================================================================
# Вид спереди (анатомическая позиция), передняя (свободная) стенка ПЖ удалена.
# Правая сторона плода — слева на рисунке; основание — вверху, верхушка — внизу справа.
HEART = ("M 300,150 C 360,128 470,128 540,150 C 640,186 720,300 740,450 "
         "C 756,580 720,720 652,800 C 620,838 590,838 566,812 C 470,760 330,700 230,640 "
         "C 140,584 104,480 118,380 C 130,280 200,190 300,150 Z")
# окно — край разреза стенки ПЖ
WIN = ("M 372,206 C 330,214 250,252 196,318 C 156,370 150,470 176,548 "
       "C 200,612 300,660 420,712 C 500,746 580,780 626,786 C 656,760 690,690 694,600 "
       "C 698,500 660,400 600,320 C 566,272 524,232 488,210 Z")
TV_C = (262, 452)           # центр кольца ТК (видно косо)
PV_C = (430, 196)           # центр кольца клапана ЛА


def septum_view():
    tvx, tvy = TV_C
    pvx, pvy = PV_C
    o = [head("vsd-types", "Типы ДМЖП: межжелудочковая перегородка со стороны правого желудочка",
              "Оригинальная учебная схема FetalCardio. Вид спереди, передняя стенка правого желудочка удалена; "
              "видна правожелудочковая поверхность межжелудочковой перегородки с приточной, трабекулярной и выходной частями "
              "и места четырёх типов дефектов по классификации ISNPCHD (МКБ-11). Анатомический рисунок, не УЗ-изображение; пропорции условны.",
              "Типы ДМЖП: перегородка со стороны ПЖ")]
    o.append('''<text class="cs" x="40" y="118">ПРАВАЯ СТОРОНА ПЛОДА</text>
<text class="cs" x="780" y="118" text-anchor="end">ЛЕВАЯ СТОРОНА ПЛОДА</text>
<g id="heart" transform="translate(60 52) scale(.86)">''')
    # магистральные артерии над основанием: аорта правее (на рисунке левее) и кзади, ствол ЛА — спереди
    o.append(f'''<g id="layer-arteries">
<g id="s-ao" data-s="ao"><path class="ves" fill="url(#g-ao)" d="M 318,196 C 312,160 318,120 340,92 L 392,104 C 378,128 374,160 378,196 Z"/>
<ellipse cx="350" cy="98" rx="27" ry="9" fill="#7f0c12" stroke="#2b1a1a" stroke-width="1.6"/></g>
<g id="s-pa" data-s="pa"><path class="ves" fill="url(#g-pa)" d="M 384,196 C 382,150 392,104 420,74 L 498,86 C 480,116 476,156 478,196 Z"/>
<ellipse cx="459" cy="80" rx="40" ry="11" fill="#0d2560" stroke="#2b1a1a" stroke-width="1.6"/></g>
</g>''')
    o.append(f'''<g id="layer-myocardium" filter="url(#f-soft)"><path class="myo" d="{HEART}"/></g>
<g id="layer-myo-texture"><path class="fibr" d="{HEART}"/></g>''')
    # поверхность перегородки внутри окна + край разреза
    o.append(f'''<g id="layer-septal-surface">
<path id="s-ivs" data-s="ivs" class="sept" d="{WIN}"/>
<path class="fibr" d="{WIN}" opacity=".55"/>
<path class="ish" d="{WIN}" opacity=".18"/>
</g>''')
    # зоны перегородки (пунктир)
    z_in = "M 312,420 C 350,410 410,414 446,436 C 452,500 440,570 410,640 C 360,622 300,596 262,570 C 290,530 306,470 312,420 Z"
    z_out = "M 360,226 C 400,214 470,216 500,236 C 506,262 494,290 470,304 C 430,306 392,300 360,286 C 352,266 352,244 360,226 Z"
    z_tr = "M 452,330 C 520,320 600,360 640,440 C 676,520 680,640 630,760 C 560,740 480,700 420,672 C 450,600 470,520 462,440 C 458,396 452,360 452,330 Z"
    o.append(f'''<g id="layer-zones">
<g id="s-z-inlet" data-s="z-inlet"><path class="zone" d="{z_in}"/><text class="zt" x="300" y="626" transform="rotate(28 300 626)">ПРИТОЧНАЯ</text></g>
<g id="s-z-trab" data-s="z-trab"><path class="zone" d="{z_tr}"/><text class="zt" x="520" y="742" transform="rotate(-62 520 742)">ТРАБЕКУЛЯРНАЯ</text></g>
<g id="s-z-outlet" data-s="z-outlet"><path class="zone" d="{z_out}"/><text class="zt" x="508" y="262">ВЫХОДНАЯ</text></g>
</g>''')
    # трабекулы на верхушечной части
    trab = "".join(A.bundle(d, w) for d, w in [
        ("M 520,620 Q 548,640 560,676", 5), ("M 560,560 Q 590,590 600,630", 5), ("M 600,500 Q 624,530 632,570", 4.5),
        ("M 470,660 Q 500,690 520,720", 4.5), ("M 590,690 Q 610,716 616,746", 4), ("M 640,600 Q 652,640 650,680", 4)])
    o.append(f'<g id="layer-trabeculae">{trab}</g>')
    # кольцо клапана ЛА со створками
    o.append(f'''<g id="layer-pv">
<g id="s-pv" data-s="pv">
<ellipse cx="{pvx}" cy="{pvy}" rx="54" ry="18" fill="url(#g-pa)" stroke="#2b1a1a" stroke-width="2"/>
<path class="cusp" d="M {pvx-50},{pvy+2} Q {pvx-34},{pvy+18} {pvx-16},{pvy+6} Q {pvx-34},{pvy-4} {pvx-50},{pvy+2} Z"/>
<path class="cusp" d="M {pvx-16},{pvy+6} Q {pvx},{pvy+20} {pvx+18},{pvy+6} Q {pvx},{pvy-2} {pvx-16},{pvy+6} Z"/>
<path class="cusp" d="M {pvx+18},{pvy+6} Q {pvx+36},{pvy+18} {pvx+50},{pvy+2} Q {pvx+36},{pvy-4} {pvx+18},{pvy+6} Z"/>
</g></g>''')
    # наджелудочковый гребень, септомаргинальная трабекула с ножками, модераторный пучок, медиальная сосочковая мышца
    o.append(f'''<g id="layer-rv-morphology">
<g id="s-crest" data-s="crest">{A.bundle("M 206,300 C 260,262 320,262 372,300 C 400,318 430,320 458,312", 22)}</g>
<g id="s-smt" data-s="smt">{A.bundle("M 470,236 C 474,270 468,300 458,330", 14)}{A.bundle("M 458,330 C 436,350 404,372 376,388", 14)}{A.bundle("M 458,330 C 486,400 520,470 560,540", 20)}</g>
<g id="s-mb" data-s="mb">{A.bundle("M 556,534 C 600,570 640,592 690,600", 15)}<ellipse class="cutf" cx="692" cy="600" rx="5" ry="9"/></g>
<g id="s-mpm" data-s="mpm"><path class="pm" d="M 372,378 C 360,374 350,380 350,390 C 352,398 364,402 376,398 Z"/>
<path class="ch" d="M 352,386 L 316,374 M 352,390 L 318,396 M 354,394 L 322,412" stroke-width="1.2"/></g>
</g>''')
    # дефекты
    o.append('''<g id="layer-defects">
<g id="s-d-pm" data-s="d-pm"><ellipse class="hole" cx="344" cy="424" rx="26" ry="22"/><ellipse class="holer" cx="341" cy="420" rx="18" ry="14"/>
<path class="fibrous" d="M 322,440 C 332,452 354,454 368,442 C 358,446 336,446 322,440 Z"/></g>
<g id="s-d-inlet" data-s="d-inlet"><ellipse class="hole" cx="352" cy="530" rx="24" ry="32" transform="rotate(-12 352 530)"/><ellipse class="holer" cx="349" cy="524" rx="16" ry="22" transform="rotate(-12 352 530)"/></g>
<g id="s-d-musc" data-s="d-musc"><ellipse class="hole" cx="530" cy="430" rx="18" ry="15"/><ellipse class="holer" cx="528" cy="427" rx="11" ry="9"/>
<ellipse class="hole" cx="604" cy="700" rx="13" ry="11"/><ellipse class="holer" cx="602" cy="698" rx="8" ry="6"/></g>
<g id="s-d-outlet" data-s="d-outlet"><path class="hole" d="M 392,214 C 400,210 462,210 470,214 C 474,236 456,252 430,252 C 404,252 388,236 392,214 Z"/>
<path class="holer" d="M 402,218 C 420,214 450,214 460,218"/></g>
</g>''')
    # кольцо ТК (косой вид) с передней и задней створками и септальной створкой
    o.append(f'''<g id="layer-tv">
<g id="s-tv" data-s="tv">
<ellipse cx="{tvx}" cy="{tvy}" rx="58" ry="112" transform="rotate(-8 {tvx} {tvy})" fill="url(#g-blue)" stroke="#2b1a1a" stroke-width="2.2"/>
<ellipse cx="{tvx}" cy="{tvy}" rx="58" ry="112" transform="rotate(-8 {tvx} {tvy})" fill="none" stroke="#fffaf2" stroke-width="5" opacity=".9"/>
<path class="lfe" d="M 222,360 Q 236,410 226,470"/><path class="lf" d="M 222,360 Q 236,410 226,470"/>
<path class="lfe" d="M 230,560 Q 250,520 268,500"/><path class="lf" d="M 230,560 Q 250,520 268,500"/>
<path class="ch" d="M 300,470 L 352,470 M 302,500 L 350,520 M 298,530 L 340,560" stroke-width="1.3"/>
<path class="lfe" d="M 318,368 C 336,420 336,500 306,556"/><path class="lf" d="M 318,368 C 336,420 336,500 306,556"/>
</g></g>''')
    S = [
        (1, "d-pm", "Центральный перимембранозный ДМЖП", "central perimembranous VSD", 384, 446),
        (2, "d-inlet", "Приточный ДМЖП", "inlet VSD", 396, 548),
        (3, "d-musc", "Трабекулярный мышечный ДМЖП", "trabecular muscular VSD", 566, 430),
        (4, "d-outlet", "Выходной ДМЖП", "outlet VSD", 488, 214),
        (5, "tv", "Трёхстворчатый клапан", "TV", 236, 430),
        (6, "pv", "Клапан лёгочной артерии", "PV", 372, 180),
        (7, "crest", "Наджелудочковый гребень", "supraventricular crest", 270, 250),
        (8, "smt", "Септомаргинальная трабекула", "septomarginal trabecula", 520, 470),
        (9, "mb", "Модераторный пучок", "moderator band", 650, 568),
        (10, "mpm", "Медиальная сосочковая мышца", "medial papillary muscle", 384, 352),
        (11, "z-inlet", "Приточная часть МЖП", "inlet septum", 372, 620),
        (12, "z-trab", "Трабекулярная часть МЖП", "trabecular septum", 500, 610),
        (13, "z-outlet", "Выходная часть МЖП", "outlet septum", 420, 280),
        (None, "ao", "Восходящая аорта", "Ao", 352, 140),
        (None, "pa", "Ствол лёгочной артерии", "MPA", 446, 128),
        (None, "ivs", "Межжелудочковая перегородка, правожелудочковая поверхность", "IVS", 660, 470),
    ]
    o.append('<g id="layer-labels">' + "\n".join(mark(k, n, nm, ab, x, y) for n, k, nm, ab, x, y in S) + "</g></g>")
    o.append(foot(["Вид спереди: передняя стенка ПЖ удалена, видна правожелудочковая поверхность МЖП.",
                   "Правая сторона плода — слева на рисунке; основание — вверху, верхушка — внизу справа.",
                   "Красные отверстия — места дефектов (сквозь них виден ЛЖ). Пунктир — части МЖП.",
                   "Анатомическая схема, не УЗ-изображение; пропорции условны. © FetalCardio, оригинальный рисунок."]))
    return "\n".join(o), S


# =====================================================================================
# 2. 4CV: приточный и трабекулярные мышечные дефекты
# =====================================================================================
def ivs_x(y):
    """Левый и правый край МЖП (координаты сердца атласа 4CV) на высоте y."""
    xl = 448 + (360 - y) * 30 / 200
    xr = 471.7 + (360 - y) * 31.3 / 224
    return xl, xr


def hole_band(y1, y2, pad=7):
    a, b = ivs_x(y1), ivs_x(y2)
    return (f"M {a[0]-pad:.1f},{y1} L {a[1]+pad:.1f},{y1} L {b[1]+pad:.1f},{y2} L {b[0]-pad:.1f},{y2} Z",
            f"M {a[0]-pad:.1f},{y1} L {a[1]+pad:.1f},{y1}", f"M {b[0]-pad:.1f},{y2} L {b[1]+pad:.1f},{y2}")


def defect(key, y1, y2):
    band, top, bot = hole_band(y1, y2)
    xm = sum(ivs_x((y1 + y2) / 2)) / 2
    ym = (y1 + y2) / 2
    # двунаправленный шунт: стрелки в обе стороны
    arr = (f'<path class="flow" d="M {xm-15:.1f},{ym-3:.1f} L {xm+15:.1f},{ym-3:.1f}"/>'
           f'<path class="flowh" d="M {xm+19:.1f},{ym-3:.1f} l -6,-3.5 l 0,7 Z"/>'
           f'<path class="flow" d="M {xm+15:.1f},{ym+4:.1f} L {xm-15:.1f},{ym+4:.1f}"/>'
           f'<path class="flowh" d="M {xm-19:.1f},{ym+4:.1f} l 6,-3.5 l 0,7 Z"/>') if y2 - y1 >= 18 else ""
    return (f'<g id="s-{key}" data-s="{key}"><path class="vsd" d="{band}"/>'
            f'<path class="rim" d="{top}"/><path class="rim" d="{bot}"/>{arr}</g>')


def slice_variant(svg_id, title, desc, header, defects, marks, foot_lines, transform_fn=None):
    base = A.build()
    body = base[base.index('<g id="heart"'):base.index('<g id="layer-orientation">')]
    if transform_fn:
        body = transform_fn(body)
    # подписи — свои
    i, j = body.index('<g id="layer-labels">'), body.index('</g>', body.index('<g id="layer-labels">'))
    # конец слоя подписей — последний </g> перед закрытием #heart
    lab_end = body.rindex('</g>\n</g>')
    labels = '<g id="layer-labels">\n' + "\n".join(mark(k, n, nm, ab, x, y) for n, k, nm, ab, x, y in marks) + "\n</g>"
    body = body[:i] + f'<g id="layer-defects">{defects}</g>\n' + labels + body[lab_end + len('</g>'):]
    o = [head(svg_id, title, desc, header),
         '<text class="cs" x="40" y="128">ПРАВЫЕ ОТДЕЛЫ</text>\n<text class="cs" x="780" y="128" text-anchor="end">ЛЕВЫЕ ОТДЕЛЫ</text>',
         body, foot(foot_lines)]
    return "\n".join(o)


def vsd_4cv():
    d = defect("d-inlet", 322, 354) + defect("d-mid", 246, 272) + defect("d-apex", 178, 192)
    M = [
        (1, "d-inlet", "Приточный ДМЖП", "inlet VSD", 512, 338),
        (2, "d-mid", "Трабекулярный мышечный ДМЖП, средний", "mid-muscular VSD", 528, 259),
        (3, "d-apex", "Трабекулярный мышечный ДМЖП, верхушечный", "apical muscular VSD", 530, 186),
        (4, "rv", "Правый желудочек", "RV", 372, 300),
        (5, "lv", "Левый желудочек", "LV", 590, 230),
        (6, "ra", "Правое предсердие", "RA", 336, 470),
        (7, "la", "Левое предсердие", "LA", 586, 480),
        (8, "ivs", "Межжелудочковая перегородка", "IVS", 446, 222),
        (9, "tv", "Трёхстворчатый клапан", "TV", 340, 340),
        (10, "mv", "Митральный клапан", "MV", 566, 344),
        (11, "mb", "Модераторный пучок", "moderator band", 384, 262),
    ]
    return slice_variant("vsd-4cv", "ДМЖП на четырёхкамерном срезе: приточный и мышечные дефекты",
                         "Оригинальная учебная схема FetalCardio на основе атласа 4CV: перерывы межжелудочковой перегородки "
                         "в приточной (под атриовентрикулярными клапанами), средней и верхушечной трабекулярной частях; стрелки — двунаправленный шунт.",
                         "ДМЖП на 4CV: приточный и мышечные", d, M,
                         ["Апикальная ориентация, как в атласе 4CV: верхушка вверху, предсердия внизу; правые отделы слева.",
                          "Перимембранозный и выходной дефекты на 4CV обычно не видны — см. схему 5CV.",
                          "Стрелки — двунаправленный шунт плода. Ширина дефектов условна.",
                          "Анатомическая схема, не УЗ-изображение; пропорции условны. © FetalCardio, оригинальный рисунок."])


# =====================================================================================
# 3. 5CV (выходной тракт ЛЖ): перимембранозный дефект под аортальным клапаном
# =====================================================================================
AO_L, AO_R, AO_TOP, AO_BOT = 446, 504, 372, 528


def five_chamber(body):
    def cut(s, a, b):
        i, j = s.index(a), s.index(b)
        return s[:i] + s[j:]
    body = cut(body, '<g id="layer-atrial-septum">', '<g id="layer-crux">')
    body = cut(body, '<g id="layer-crux">', '<g id="layer-av-valves">')
    body = cut(body, '<g id="layer-annotations">', '<g id="layer-labels">')
    # передняя створка МК начинается от задней стенки аорты (митрально-аортальный фиброзный контакт)
    body = body.replace(B.MV_ANT, f"M {AO_R + 2},382 Q 524,370 544,364")
    # верхний (базальный) отрезок МЖП под аортальным клапаном удалён — это и есть перимембранозный дефект
    xl, xr = ivs_x(330)
    ivs_new = f"M {xl:.1f},330 L 478,160 Q 490,138 503,136 L {xr:.1f},330 Z"
    body = body.replace(f'class="sep" d="{B.IVS}"', f'class="sep" d="{ivs_new}"').replace(f'class="fibr" d="{B.IVS}"', f'class="fibr" d="{ivs_new}"')
    ao = (f'<g id="layer-aorta"><g id="s-ao" data-s="ao">'
          f'<path fill="url(#g-ao)" d="M {AO_L},{AO_TOP} C {AO_L - 8},{AO_TOP + 26} {AO_L - 6},{AO_TOP + 60} {AO_L + 2},{AO_TOP + 90} '
          f'L {AO_L + 4},{AO_BOT} L {AO_R - 4},{AO_BOT} L {AO_R - 2},{AO_TOP + 90} C {AO_R + 6},{AO_TOP + 60} {AO_R + 8},{AO_TOP + 26} {AO_R},{AO_TOP} Z"/>'
          f'<path class="an" stroke-width="2.2" d="M {AO_L},{AO_TOP} C {AO_L - 8},{AO_TOP + 26} {AO_L - 6},{AO_TOP + 60} {AO_L + 2},{AO_TOP + 90} L {AO_L + 4},{AO_BOT}"/>'
          f'<path class="an" stroke-width="2.2" d="M {AO_R},{AO_TOP} C {AO_R + 8},{AO_TOP + 26} {AO_R + 6},{AO_TOP + 60} {AO_R - 2},{AO_TOP + 90} L {AO_R - 4},{AO_BOT}"/>'
          f'<ellipse cx="{(AO_L + AO_R) / 2}" cy="{AO_BOT}" rx="{(AO_R - AO_L) / 2 - 4}" ry="7" fill="#7f0c12" stroke="#2b1a1a" stroke-width="1.8"/>'
          f'<path d="M {AO_L + 14},{AO_TOP + 20} L {AO_L + 16},{AO_BOT - 10}" stroke="#fff" stroke-width="3" opacity=".35" stroke-linecap="round"/></g>'
          f'<g id="s-aov" data-s="aov"><path class="lfe" d="M {AO_L + 2},{AO_TOP + 4} Q {AO_L + 14},{AO_TOP + 26} {(AO_L + AO_R) / 2},{AO_TOP + 30}"/>'
          f'<path class="lf" d="M {AO_L + 2},{AO_TOP + 4} Q {AO_L + 14},{AO_TOP + 26} {(AO_L + AO_R) / 2},{AO_TOP + 30}"/>'
          f'<path class="lfe" d="M {AO_R - 2},{AO_TOP + 4} Q {AO_R - 14},{AO_TOP + 26} {(AO_L + AO_R) / 2},{AO_TOP + 30}"/>'
          f'<path class="lf" d="M {AO_R - 2},{AO_TOP + 4} Q {AO_R - 14},{AO_TOP + 26} {(AO_L + AO_R) / 2},{AO_TOP + 30}"/></g></g>\n')
    i = body.index('<g id="layer-av-valves">')
    return body[:i] + ao + body[i:]


def vsd_5cv():
    xl1, xr1 = ivs_x(330)
    band = f"M {xl1 - 7:.1f},330 L {xr1 + 7:.1f},330 L {AO_R - 6},{AO_TOP + 2} L {AO_L - 8},{AO_TOP + 2} Z"
    xm, ym = (xl1 + xr1) / 2 + 2, 351
    d = (f'<g id="s-d-pm" data-s="d-pm"><path class="vsd" d="{band}"/>'
         f'<path class="rim" d="M {xl1 - 7:.1f},330 L {xr1 + 7:.1f},330"/>'
         f'<path class="flow" d="M {xm-16:.1f},{ym-3} L {xm+16:.1f},{ym-3}"/><path class="flowh" d="M {xm+20:.1f},{ym-3} l -6,-3.5 l 0,7 Z"/>'
         f'<path class="flow" d="M {xm+16:.1f},{ym+5} L {xm-16:.1f},{ym+5}"/><path class="flowh" d="M {xm-20:.1f},{ym+5} l 6,-3.5 l 0,7 Z"/></g>')
    M = [
        (1, "d-pm", "Перимембранозный ДМЖП", "perimembranous VSD", 404, 322),
        (2, "ao", "Корень аорты", "Ao", 475, 486),
        (3, "aov", "Аортальный клапан", "AoV", 475, 432),
        (4, "ivs", "Межжелудочковая перегородка", "IVS", 446, 222),
        (5, "rv", "Правый желудочек", "RV", 372, 300),
        (6, "lv", "Левый желудочек", "LV", 590, 230),
        (7, "mv", "Митральный клапан", "MV", 566, 344),
        (8, "tv", "Трёхстворчатый клапан", "TV", 340, 340),
        (9, "ra", "Правое предсердие", "RA", 336, 470),
        (10, "la", "Левое предсердие", "LA", 586, 480),
    ]
    return slice_variant("vsd-5cv", "ДМЖП на пятикамерном срезе: перимембранозный дефект под аортальным клапаном",
                         "Оригинальная учебная схема FetalCardio на основе атласа 4CV: при наклоне датчика краниально в центре сердца "
                         "появляется корень аорты из левого желудочка; дефект — между гребнем межжелудочковой перегородки и аортальным клапаном.",
                         "ДМЖП на 5CV: перимембранозный (подаортальный)", d, M,
                         ["Пятикамерный срез — краниальный наклон от 4CV; корень аорты выходит из ЛЖ в центре сердца.",
                          "Дефект — под аортальным клапаном; МЖП в норме переходит в переднюю стенку аорты.",
                          "Межпредсердная перегородка и крест сердца в этой плоскости не показаны.",
                          "Анатомическая схема, не УЗ-изображение; пропорции условны. © FetalCardio, оригинальный рисунок."],
                         transform_fn=five_chamber)


if __name__ == "__main__":
    out = sys.argv[1] if len(sys.argv) > 1 else "../../atlas"
    svg, _ = septum_view()
    # vsd-5cv.svg с 14.11.2026 собирает build_views.py (на основе схемы нормы LVOT)
    for name, s in [("vsd-types", svg), ("vsd-4cv", vsd_4cv())]:
        open(os.path.join(out, name + ".svg"), "w", encoding="utf-8").write(s)
        print("ok", name, len(s))
