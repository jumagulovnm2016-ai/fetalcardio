"""Генератор схем нормы стандартных срезов для атласа FetalCardio (кроме 4CV).

  situs-normal.svg — поперечный срез живота (situs) + врезка: положение и ось сердца
  lvot-normal.svg  — выходной тракт ЛЖ (на основе атласа 4CV, апикальная ориентация)
  rvot-normal.svg  — выходной тракт ПЖ (поперечный срез)
  3vv-normal.svg   — срез трёх сосудов (поперечный срез верхнего средостения)
  3vt-normal.svg   — срез трёх сосудов и трахеи

Стиль — как у атласа 4CV (версия 4): синий — венозная кровь и правые отделы,
красный — левые отделы и аорта; номера на структурах, расшифровка — в легенде приложения.
Поперечные срезы — как в схемах срезов (schemes.js): верх — передняя стенка,
низ — позвоночник, левая сторона плода — справа на рисунке.
Все схемы — черновики (status draft) до проверки автором.

Запуск:  cd tools/atlas && python3 build_views.py ../../atlas
"""
import sys, os, math, re
import build_4cv as A
import build_vsd as V
B = A.B
W, H = V.W, V.H
CREATED = "2026-11-14"
esc = V.esc
mark = V.mark
bundle = A.bundle
leaflet = A.leaflet

EXTRA = """
<defs>
<radialGradient id="g-sv" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#5b7fd6"/><stop offset=".6" stop-color="#1f3f99"/><stop offset="1" stop-color="#0f2263"/></radialGradient>
<radialGradient id="g-uv" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#e76b78"/><stop offset=".6" stop-color="#b52845"/><stop offset="1" stop-color="#6d0f24"/></radialGradient>
<radialGradient id="g-body" gradientUnits="userSpaceOnUse" cx="410" cy="420" r="380"><stop offset="0" stop-color="#fdf3ec"/><stop offset=".8" stop-color="#f7e2d6"/><stop offset="1" stop-color="#eccbb9"/></radialGradient>
<radialGradient id="g-lung" cx=".5" cy=".45" r=".7"><stop offset="0" stop-color="#f6e4ea"/><stop offset="1" stop-color="#e5c3cf"/></radialGradient>
<radialGradient id="g-liver" gradientUnits="userSpaceOnUse" cx="300" cy="360" r="300"><stop offset="0" stop-color="#c0675a"/><stop offset=".7" stop-color="#9c4337"/><stop offset="1" stop-color="#7a2e25"/></radialGradient>
<radialGradient id="g-thy" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="#fbf0dd"/><stop offset="1" stop-color="#ecd3ad"/></radialGradient>
<radialGradient id="g-stw" cx=".45" cy=".4" r=".7"><stop offset="0" stop-color="#f2c2b4"/><stop offset="1" stop-color="#d98f7e"/></radialGradient>
<radialGradient id="g-fl" cx=".45" cy=".4" r=".7"><stop offset="0" stop-color="#3a4656"/><stop offset="1" stop-color="#1a222d"/></radialGradient>
<radialGradient id="g-bone" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#fffdf6"/><stop offset="1" stop-color="#e5dcc6"/></radialGradient>
<pattern id="p-lung" width="10" height="10" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1.1" fill="#c99aab" opacity=".45"/><circle cx="8" cy="7.5" r=".9" fill="#c99aab" opacity=".35"/></pattern>
<pattern id="p-liver" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(18)"><path d="M0,6 H12" stroke="#ffffff" stroke-width=".6" opacity=".12"/></pattern>
</defs>
<style>
.skin{fill:url(#g-body);stroke:#2b1a1a;stroke-width:2.4}
.wall{fill:#f3d6c9;stroke:#2b1a1a;stroke-width:1;opacity:.9}
.cavity{fill:#fbf5f1;stroke:#2b1a1a;stroke-width:1.4}
.rib{fill:url(#g-bone);stroke:#2b1a1a;stroke-width:1.4}
.bone{fill:url(#g-bone);stroke:#2b1a1a;stroke-width:1.8}
.bonel{fill:none;stroke:#2b1a1a;stroke-width:13;stroke-linecap:round}
.bonei{fill:none;stroke:#f3ecdb;stroke-width:9.4;stroke-linecap:round}
.oss{fill:#d8c7a2;opacity:.9}
.canal{fill:#fbf5f1;stroke:#2b1a1a;stroke-width:1.2}
.lung{fill:url(#g-lung);stroke:#2b1a1a;stroke-width:1.6}
.lungt{fill:url(#p-lung)}
.thy{fill:url(#g-thy);stroke:#2b1a1a;stroke-width:1.6}
.thyl{fill:none;stroke:#b89a6c;stroke-width:1;opacity:.7}
.liver{fill:url(#g-liver);stroke:#2b1a1a;stroke-width:2}
.livert{fill:url(#p-liver)}
.stw{fill:url(#g-stw);stroke:#2b1a1a;stroke-width:2}
.stl{fill:url(#g-fl);stroke:#2b1a1a;stroke-width:1}
.trw{fill:#f4f1ea;stroke:#2b1a1a;stroke-width:2}
.trl{fill:#dfe8f6;stroke:#2b1a1a;stroke-width:1}
.trc{fill:none;stroke:#b9b2a2;stroke-width:3.4}
.vso{stroke:#2b1a1a;fill:none;stroke-linecap:round;stroke-linejoin:round}
.vsh{stroke:#ffffff;fill:none;stroke-linecap:round;opacity:.33}
.cut{stroke:#2b1a1a;stroke-width:1.6}
.mid{stroke:#2b1a1a;stroke-width:1.4;stroke-dasharray:6 5;fill:none;opacity:.55}
.lin{stroke:#16794a;stroke-width:2;stroke-dasharray:8 5;fill:none}
.ax{stroke:#c26a00;stroke-width:2.4;fill:none;stroke-linecap:round}
.axt{fill:#8a4a00;font-size:12.5px;font-weight:700}
.insb{fill:var(--sv-bg,#ffffff);stroke:#2b1a1a;stroke-width:1.2;opacity:.98}
.inst{fill:var(--sv-text,#101828);font-size:11.5px;font-weight:700;letter-spacing:.04em;opacity:.65}
.dir{fill:#2b1a1a;font-size:12px;font-weight:700;opacity:.75}
.sao{fill:none;stroke:#16c46e;stroke-width:3.4;stroke-linecap:round}
</style>"""

COL = {"a": ("#c41d22", "g-ao"), "p": ("#2452b8", "g-pa"), "v": ("#1f3f99", "g-sv"), "u": ("#b52845", "g-uv")}


def head(svg_id, title, desc, header):
    s = V.head(svg_id, title, desc, header).replace('"created":"2026-11-13"', f'"created":"{CREATED}"')
    i = s.index('<rect class="bg"')
    return s[:i] + EXTRA + "\n" + s[i:]


def tube(d, w, kind, cap=None):
    """Сосуд вдоль хода: тушевой контур + заливка + блик. cap=(x, y, угол) — срез сосуда (уходит из плоскости)."""
    c = COL[kind][0]
    o = (f'<path class="vso" stroke-width="{w + 4}" d="{d}"/>'
         f'<path stroke="{c}" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="{w}" d="{d}"/>'
         f'<path class="vsh" stroke-width="{max(1.5, w * .22):.1f}" d="{d}" transform="translate({-w * .18:.1f} {-w * .18:.1f})"/>')
    if cap:
        x, y, a = cap
        o += (f'<ellipse class="cut" cx="{x}" cy="{y}" rx="{w / 2 + 1:.1f}" ry="{w / 5:.1f}" transform="rotate({a} {x} {y})" '
              f'fill="{"#7f0c12" if kind in "au" else "#0d2560"}"/>')
    return o


def vcirc(cx, cy, r, kind):
    """Сосуд в поперечном сечении."""
    g = COL[kind][1]
    return (f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="url(#{g})" stroke="#2b1a1a" stroke-width="2"/>'
            f'<ellipse cx="{cx - r * .35:.1f}" cy="{cy - r * .4:.1f}" rx="{r * .35:.1f}" ry="{r * .2:.1f}" fill="#fff" opacity=".35"/>')


def ring(cx, cy, rx, ry, n_left, n_right, a0, a1, rr=(13, 8)):
    """Рёбра в поперечном сечении по краю полости."""
    out = []
    for side, n in ((0, n_left), (1, n_right)):
        for k in range(n):
            a = (a0 + (a1 - a0) * k / max(1, n - 1))
            a = 180 - a if side == 0 else a
            t = math.radians(a)
            x, y = cx + rx * math.cos(t), cy + ry * math.sin(t)
            out.append(f'<ellipse class="rib" cx="{x:.1f}" cy="{y:.1f}" rx="{rr[0]}" ry="{rr[1]}" transform="rotate({a + 90:.0f} {x:.1f} {y:.1f})"/>')
    return "".join(out)


def spine(x, y, key="spine"):
    """Позвонок: тело, дуга с остистым отростком, позвоночный канал; три ядра окостенения."""
    arc = f"M {x - 26},{y + 22} C {x - 34},{y + 52} {x - 16},{y + 70} {x},{y + 72} C {x + 16},{y + 70} {x + 34},{y + 52} {x + 26},{y + 22}"
    return (f'<g id="s-{key}" data-s="{key}">'
            f'<path class="bonel" d="{arc}"/><path class="bonei" d="{arc}"/>'
            f'<path class="bonel" stroke-width="9" d="M {x},{y + 72} L {x},{y + 82}"/><path class="bonei" stroke-width="5.4" d="M {x},{y + 72} L {x},{y + 82}"/>'
            f'<circle class="canal" cx="{x}" cy="{y + 46}" r="13"/>'
            f'<circle class="bone" cx="{x}" cy="{y}" r="30"/>'
            f'<ellipse class="oss" cx="{x}" cy="{y + 1}" rx="15" ry="12"/>'
            f'<ellipse class="oss" cx="{x - 27}" cy="{y + 46}" rx="5" ry="8" transform="rotate(20 {x - 27} {y + 46})"/>'
            f'<ellipse class="oss" cx="{x + 27}" cy="{y + 46}" rx="5" ry="8" transform="rotate(-20 {x + 27} {y + 46})"/></g>')


def body_frame(cx, cy, rx, ry, thorax=True):
    """Стенка туловища, рёбра; грудина — только для грудной клетки."""
    o = [f'<g id="layer-body"><ellipse class="skin" cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}"/>',
         f'<ellipse class="cavity" cx="{cx}" cy="{cy}" rx="{rx - 22}" ry="{ry - 22}"/>']
    if thorax:
        o.append(ring(cx, cy, rx - 14, ry - 14, 5, 5, -62, 62))
        o.append(f'<rect class="bone" x="{cx - 22}" y="{cy - ry + 6}" width="44" height="17" rx="8"/>')
    else:
        o.append(ring(cx, cy, rx - 14, ry - 14, 4, 4, -24, 40))
    o.append("</g>")
    return "".join(o)


def lungs(right, left):
    return (f'<g id="layer-lungs"><g id="s-lungs" data-s="lungs">'
            f'<path class="lung" d="{right}"/><path class="lungt" d="{right}"/>'
            f'<path class="lung" d="{left}"/><path class="lungt" d="{left}"/></g></g>')


def thymus(d):
    return (f'<g id="s-thy" data-s="thy"><path class="thy" d="{d}"/>'
            f'<path class="thyl" d="M 410,222 C 404,260 408,296 412,318"/></g>')


FOOT_TR = ["Поперечный срез: верх — передняя стенка, низ — позвоночник; левая сторона плода — справа на рисунке.",
           "Синий — венозная кровь (ЛА, проток, полые вены), красный — аорта. Номера — в легенде ниже.",
           "Анатомическая схема, не УЗ-изображение; пропорции условны. © FetalCardio, оригинальный рисунок."]


def orient_tr(cy_top):
    return (f'<text class="cs" x="410" y="{cy_top - 14}" text-anchor="middle">КПЕРЕДИ ↑</text>'
            f'<text class="cs" x="40" y="800">← ПРАВАЯ СТОРОНА ПЛОДА</text>'
            f'<text class="cs" x="780" y="800" text-anchor="end">ЛЕВАЯ СТОРОНА ПЛОДА →</text>')


def labels(M):
    return '<g id="layer-labels">\n' + "\n".join(mark(k, n, nm, ab, x, y) for n, k, nm, ab, x, y in M) + "\n</g>"


# =====================================================================================
# Situs — поперечный срез живота
# =====================================================================================
def situs():
    cx, cy, rx, ry = 400, 470, 300, 288
    sx, sy = 400, 646
    o = [head("situs-normal", "Situs: поперечный срез живота — анатомическая схема нормы",
              "Оригинальная учебная схема FetalCardio. Поперечный срез живота плода на уровне желудка: печень справа, желудок слева, "
              "брюшная аорта слева и кпереди от позвоночника, нижняя полая вена справа и кпереди от аорты, пупочная вена и портальный синус. "
              "Врезка — положение сердца в грудной клетке и его ось. Анатомический рисунок, не УЗ-изображение; пропорции условны.",
              "Situs: поперечный срез живота"),
         orient_tr(cy - ry), '<g id="heart">', body_frame(cx, cy, rx, ry, thorax=False)]
    liver = ("M 150,372 C 156,262 252,206 372,204 C 460,202 516,222 546,246 C 512,272 476,306 452,352 "
             "C 432,392 424,440 414,500 C 404,544 384,578 360,598 C 298,610 222,598 184,550 C 154,510 144,444 150,372 Z")
    stom = ("M 548,302 C 610,284 666,334 664,404 C 662,472 612,512 562,502 C 520,492 490,452 490,402 C 490,352 508,314 548,302 Z")
    lum = ("M 552,322 C 600,310 642,350 640,404 C 638,458 600,486 564,480 C 532,474 512,442 512,404 C 512,364 524,330 552,322 Z")
    uv = "M 404,212 C 404,258 400,300 388,338"
    ps = "M 388,338 C 374,374 344,398 304,402 C 274,404 252,394 236,378"
    o.append(f'''<g id="layer-organs">
<g id="s-liver" data-s="liver"><path class="liver" d="{liver}"/><path class="livert" d="{liver}"/></g>
<g id="s-stomach" data-s="stomach"><path class="stw" d="{stom}"/><path class="stl" d="{lum}"/>
<ellipse cx="560" cy="350" rx="20" ry="9" fill="#fff" opacity=".12" transform="rotate(-25 560 350)"/></g>
</g>
<g id="layer-vessels">
<g id="s-uv" data-s="uv">{tube(uv, 15, "u")}</g>
<g id="s-ps" data-s="ps">{tube(ps, 15, "u", cap=(236, 378, -45))}</g>
<g id="s-ivc" data-s="ivc"><ellipse cx="348" cy="566" rx="20" ry="16" fill="url(#g-sv)" stroke="#2b1a1a" stroke-width="2"/>
<ellipse cx="341" cy="560" rx="7" ry="3.5" fill="#fff" opacity=".35"/></g>
<g id="s-ao" data-s="ao">{vcirc(446, 594, 17, "a")}</g>
</g>
<g id="layer-spine">{spine(sx, sy)}</g>
<g id="s-midline" data-s="midline"><path class="mid" d="M {sx},204 L {sx},610"/></g>''')
    # врезка: грудная клетка, сердце слева, ось сердца
    ix, iy = 708, 170
    hx, hy = ix + 14, iy - 4
    o.append(f'''<g id="layer-inset">
<rect class="insb" x="612" y="88" width="192" height="156" rx="10"/>
<text class="inst" x="624" y="106">ГРУДНАЯ КЛЕТКА (4CV)</text>
<ellipse cx="{ix}" cy="{iy + 8}" rx="74" ry="56" fill="url(#g-body)" stroke="#2b1a1a" stroke-width="1.6"/>
<ellipse cx="{ix}" cy="{iy + 8}" rx="64" ry="46" fill="url(#g-lung)" stroke="#2b1a1a" stroke-width="1"/>
<circle class="bone" cx="{ix}" cy="{iy + 46}" r="9"/>
<path class="mid" d="M {ix},{iy - 44} L {ix},{iy + 36}"/>
<g id="s-heartpos" data-s="heartpos">
<ellipse cx="{hx}" cy="{hy}" rx="36" ry="24" transform="rotate(-45 {hx} {hy})" fill="url(#g-myo)" stroke="#2b1a1a" stroke-width="1.8"/>
<ellipse cx="{hx - 8}" cy="{hy - 1}" rx="13" ry="9" transform="rotate(-45 {hx - 8} {hy - 1})" fill="#2452b8" stroke="#2b1a1a" stroke-width="1"/>
<ellipse cx="{hx + 5}" cy="{hy + 9}" rx="13" ry="9" transform="rotate(-45 {hx + 5} {hy + 9})" fill="#c41d22" stroke="#2b1a1a" stroke-width="1"/></g>
<g id="s-axis" data-s="axis">
<path class="ax" d="M {hx - 26},{hy + 26} L {hx + 30},{hy - 30}"/>
<path class="ax" stroke-width="1.6" d="M {ix},{iy - 30} A 30 30 0 0 1 {ix + 21.2},{iy - 21.2 + 0}"/>
<text class="axt" x="{ix - 4}" y="{iy - 48}" text-anchor="end">≈45°</text></g>
</g>''')
    M = [
        (1, "stomach", "Желудок", "stomach", 576, 404),
        (2, "liver", "Печень", "liver", 250, 470),
        (3, "uv", "Пупочная вена", "umbilical vein", 430, 262),
        (4, "ps", "Портальный синус", "portal sinus", 300, 370),
        (5, "ao", "Брюшная (нисходящая) аорта", "Ao", 480, 576),
        (6, "ivc", "Нижняя полая вена", "IVC", 312, 548),
        (7, "heartpos", "Сердце в левой половине грудной клетки", "levocardia", 772, 140),
        (8, "axis", "Ось сердца", "cardiac axis", 760, 200),
        (None, "spine", "Позвоночник", "spine", 446, 676),
        (None, "midline", "Средняя линия (ось позвоночника)", "midline", 400, 596),
    ]
    o.append(labels(M) + "\n</g>")
    o.append(V.foot(["Поперечный срез живота на уровне желудка: верх — передняя стенка, низ — позвоночник;",
                     "левая сторона плода — справа на рисунке. Пунктир — средняя линия через позвоночник.",
                     "Врезка: сердце в левой половине грудной клетки, верхушка влево; угол оси — по критериям среза.",
                     "Анатомическая схема, не УЗ-изображение; пропорции условны. © FetalCardio, оригинальный рисунок."]))
    return "\n".join(o), M


# =====================================================================================
# LVOT — на основе атласа 4CV
# =====================================================================================
# Корень аорты — в выходном отделе ЛЖ под гребнем МЖП; восходящая аорта идёт к правому плечу плода
# (на рисунке — влево и немного вверх, кпереди), на месте трёхстворчатого клапана в плоскости 4CV.
AO_UP = "M 448,360 C 430,350 392,342 340,336 C 300,332 264,328 226,326"     # передняя стенка (продолжает МЖП)
AO_LO = "M 476,404 C 444,414 398,410 350,398 C 310,390 272,384 234,382"     # задняя стенка (от передней створки МК)
AO_BODY = (f"{AO_UP} L 234,382 C 272,384 310,390 350,398 C 398,410 444,414 476,404 "
           "C 478,390 476,374 472,360 Z")


def lvot_transform(body):
    def cut(s, a, b):
        i, j = s.index(a), s.index(b)
        return s[:i] + s[j:]
    body = cut(body, '<g id="layer-atrial-septum">', '<g id="layer-crux">')
    body = cut(body, '<g id="layer-crux">', '<g id="layer-av-valves">')
    body = cut(body, '<g id="layer-annotations">', '<g id="layer-labels">')
    # трёхстворчатый клапан в плоскости LVOT не виден — на его месте корень аорты
    body = re.sub(r'<g id="s-tv" data-s="tv">.*?</g>\n', "", body, flags=re.S)
    # передняя створка МК начинается от задней стенки аорты (митрально-аортальный фиброзный контакт)
    body = body.replace(B.MV_ANT, "M 476,404 Q 508,380 544,364")
    ao = f'''<g id="layer-aorta">
<g id="s-ao" data-s="ao"><path fill="url(#g-ao)" d="{AO_BODY}"/>
<path class="an" stroke-width="2.6" d="{AO_UP}"/><path class="an" stroke-width="2.6" d="{AO_LO}"/>
<path d="M 440,368 C 400,360 340,352 250,342" stroke="#fff" stroke-width="4" opacity=".3" fill="none" stroke-linecap="round"/>
<ellipse cx="230" cy="354" rx="8" ry="29" fill="#7f0c12" stroke="#2b1a1a" stroke-width="1.8" transform="rotate(4 230 354)"/></g>
<g id="s-aov" data-s="aov">{leaflet("M 466,364 Q 446,374 444,384")}{leaflet("M 472,402 Q 450,394 444,384")}</g>
<g id="s-lvot" data-s="lvot"><path class="and" d="M 480,360 C 500,350 524,352 534,368 C 540,382 528,398 506,402" stroke-width="1.8"/></g>
<g id="s-sao" data-s="sao"><path class="sao" d="M 442,326 C 446,340 448,352 444,362 C 438,360 432,354 426,350"/></g>
<g id="s-mac" data-s="mac"><circle cx="477" cy="404" r="7.5" fill="#fffaf2" stroke="#2b1a1a" stroke-width="1.6"/></g>
<text class="dir" x="214" y="304" text-anchor="middle">к правому</text><text class="dir" x="214" y="318" text-anchor="middle">плечу ↖</text>
</g>\n'''
    i = body.index('<g id="layer-av-valves">')
    j = body.index("</g>", body.index('<g id="layer-av-valves">') + 10)
    # аорта — поверх полостей, но под митральным клапаном
    return body[:i] + ao + body[i:]


def lvot():
    M = [
        (1, "lv", "Левый желудочек", "LV", 590, 230),
        (2, "lvot", "Выходной тракт ЛЖ (подаортальный отдел)", "LVOT", 512, 336),
        (3, "aov", "Аортальный клапан", "AoV", 420, 384),
        (4, "ao", "Корень и восходящая аорта", "Ao", 310, 362),
        (5, "sao", "Септо-аортальная непрерывность", "septo-aortic continuity", 422, 330),
        (6, "mac", "Митрально-аортальный фиброзный контакт", "mitral-aortic continuity", 496, 424),
        (7, "ivs", "Межжелудочковая перегородка", "IVS", 478, 250),
        (8, "mv", "Митральный клапан", "MV", 566, 344),
        (9, "rv", "Правый желудочек", "RV", 372, 270),
        (10, "la", "Левое предсердие", "LA", 586, 480),
        (11, "ra", "Правое предсердие", "RA", 336, 480),
        (None, "dao", "Нисходящая аорта", "DAo", B.DAO[0] + 34, B.DAO[1] + 4),
    ]
    base = A.build()
    body = base[base.index('<g id="heart"'):base.index('<g id="layer-orientation">')]
    body = lvot_transform(body)
    i = body.index('<g id="layer-labels">')
    lab_end = body.rindex('</g>\n</g>')
    body = body[:i] + labels(M) + body[lab_end + len('</g>'):]
    o = [head("lvot-normal", "Выходной тракт левого желудочка (LVOT): анатомическая схема нормы",
              "Оригинальная учебная схема FetalCardio на основе атласа 4CV: при наклоне датчика краниально к правому плечу плода "
              "аорта отходит от левого желудочка; межжелудочковая перегородка продолжается в переднюю стенку аорты, "
              "передняя створка митрального клапана — в её заднюю стенку. Анатомический рисунок, не УЗ-изображение; пропорции условны.",
              "Выходной тракт ЛЖ (LVOT): анатомическая схема нормы"),
         '<text class="cs" x="40" y="128">ПРАВЫЕ ОТДЕЛЫ</text>\n<text class="cs" x="780" y="128" text-anchor="end">ЛЕВЫЕ ОТДЕЛЫ</text>',
         body,
         V.foot(["Апикальная ориентация, как в атласе 4CV: верхушка вверху (кпереди), правые отделы слева.",
                 "LVOT — наклон датчика от 4CV краниально; аорта из ЛЖ идёт к правому плечу плода.",
                 "Трёхстворчатый клапан, овальное окно и крест сердца в этой плоскости не показаны.",
                 "Анатомическая схема, не УЗ-изображение; пропорции условны. © FetalCardio, оригинальный рисунок."])]
    return "\n".join(o), M


# =====================================================================================
# Общая рамка грудной клетки для RVOT, 3VV, 3VT
# =====================================================================================
TCX, TCY, TRX, TRY = 410, 460, 318, 296
SPX, SPY = 410, 640
DAO = (454, 594, 19)
R_LUNG = ("M 338,198 C 238,206 136,296 124,428 C 114,556 186,668 300,700 C 332,690 344,662 336,628 "
          "C 324,590 286,566 276,520 C 268,470 270,420 284,376 C 300,326 330,272 338,198 Z")
L_LUNG = ("M 486,198 C 584,206 686,296 696,428 C 704,556 634,668 520,700 C 490,690 478,662 486,628 "
          "C 498,592 548,566 560,520 C 570,470 572,420 560,376 C 546,326 498,272 486,198 Z")
THY = ("M 330,232 C 360,206 460,206 496,228 C 526,252 522,300 488,318 C 452,332 378,332 344,318 C 310,300 304,258 330,232 Z")


def thorax_scene(svg_id, title, desc, header, inner, M, foot=FOOT_TR, lungs_on=True):
    o = [head(svg_id, title, desc, header), orient_tr(TCY - TRY), '<g id="heart">',
         body_frame(TCX, TCY, TRX, TRY, thorax=True)]
    if lungs_on:
        o.append(lungs(R_LUNG, L_LUNG))
    o.append(f'<g id="layer-spine">{spine(SPX, SPY)}</g>')
    o.append(inner)
    o.append(labels(M) + "\n</g>")
    o.append(V.foot(foot))
    return "\n".join(o)


def dao():
    return f'<g id="s-dao" data-s="dao">{vcirc(*DAO, "a")}</g>'


# =====================================================================================
# RVOT
# =====================================================================================
def rvot():
    rv_myo = ("M 352,262 C 370,222 470,212 524,238 C 556,254 560,296 542,322 C 526,344 500,352 478,352 "
              "L 424,352 C 380,350 342,310 352,262 Z")
    rv_cav = ("M 372,266 C 388,238 466,232 510,252 C 532,264 536,294 522,314 C 510,330 492,334 476,334 "
              "L 430,334 C 398,332 364,302 372,266 Z")
    mpa = "M 482,344 C 492,392 500,430 500,468"
    rpa = "M 496,470 C 466,506 400,516 334,508 C 302,504 282,494 264,478"
    lpa = "M 504,474 C 530,504 568,520 604,526"
    da = "M 502,474 C 512,520 494,566 466,590"
    inner = f'''<g id="layer-heart">
<g id="s-rvot" data-s="rvot"><path class="myo" d="{rv_myo}"/><path class="fibr" d="{rv_myo}"/><path class="cavr" d="{rv_cav}"/>
{bundle("M 392,282 Q 404,296 420,300", 4)}{bundle("M 420,256 Q 428,270 440,276", 4)}</g>
</g>
<g id="layer-vessels">
<g id="s-rpa" data-s="rpa">{tube(rpa, 19, "p")}</g>
<g id="s-lpa" data-s="lpa">{tube(lpa, 17, "p")}</g>
<g id="s-da" data-s="da">{tube(da, 28, "p")}</g>
<g id="s-mpa" data-s="mpa">{tube(mpa, 46, "p")}</g>
{dao()}
<g id="s-ao" data-s="ao">{vcirc(396, 426, 25, "a")}</g>
<g id="s-svc" data-s="svc">{vcirc(322, 446, 15, "v")}</g>
<g id="s-pv" data-s="pv">{leaflet("M 462,344 Q 476,356 486,350")}{leaflet("M 506,340 Q 494,354 486,350")}</g>
</g>'''
    M = [
        (1, "rvot", "Выходной отдел правого желудочка", "RVOT", 420, 300),
        (2, "pv", "Клапан лёгочной артерии", "PV", 528, 356),
        (3, "mpa", "Ствол лёгочной артерии", "MPA", 498, 412),
        (4, "rpa", "Правая ветвь ЛА", "RPA", 360, 520),
        (5, "lpa", "Левая ветвь ЛА", "LPA", 590, 500),
        (6, "da", "Артериальный проток", "DA", 520, 546),
        (7, "ao", "Аорта (поперечное сечение)", "Ao", 396, 426),
        (8, "svc", "Верхняя полая вена", "SVC", 322, 412),
        (9, "dao", "Нисходящая аорта", "DAo", 492, 610),
        (None, "lungs", "Лёгкие", "lungs", 200, 430),
        (None, "spine", "Позвоночник", "spine", 456, 666),
    ]
    svg = thorax_scene("rvot-normal", "Выходной тракт правого желудочка (RVOT): анатомическая схема нормы",
                       "Оригинальная учебная схема FetalCardio. Поперечный срез грудной клетки краниальнее LVOT: ствол лёгочной артерии "
                       "отходит от переднего правого желудочка, перекрещивается с аортой (аорта — в поперечном сечении справа от него), "
                       "направлен кзади к позвоночнику, делится на ветви и продолжается в артериальный проток. "
                       "Анатомический рисунок, не УЗ-изображение; пропорции условны.",
                       "Выходной тракт ПЖ (RVOT): анатомическая схема нормы", inner, M)
    return svg, M


# =====================================================================================
# 3VV
# =====================================================================================
def three_vv():
    pa, ao, svc = (514, 384), (412, 420, 22), (328, 450, 14)
    mpa = "M 516,318 C 524,360 520,420 502,462"
    rpa = "M 498,462 C 466,502 402,512 336,504 C 304,500 282,490 264,474"
    lpa = "M 506,466 C 528,500 566,518 604,524"
    # линия трёх сосудов — через центры
    k = (svc[1] - pa[1]) / (svc[0] - pa[0])
    x1, x2 = 560, 290
    line = f"M {x1},{pa[1] + k * (x1 - pa[0]):.1f} L {x2},{pa[1] + k * (x2 - pa[0]):.1f}"
    inner = f'''<g id="layer-mediastinum">{thymus(THY)}</g>
<g id="layer-vessels">
<g id="s-rpa" data-s="rpa">{tube(rpa, 18, "p")}</g>
<g id="s-lpa" data-s="lpa">{tube(lpa, 16, "p")}</g>
<g id="s-mpa" data-s="mpa">{tube(mpa, 52, "p")}</g>
{dao()}
<g id="s-ao" data-s="ao">{vcirc(*ao, "a")}</g>
<g id="s-svc" data-s="svc">{vcirc(*svc, "v")}</g>
</g>
<g id="layer-annotations"><g id="s-line" data-s="line"><path class="lin" d="{line}"/></g></g>'''
    M = [
        (1, "mpa", "Ствол лёгочной артерии", "MPA", 516, 384),
        (2, "ao", "Восходящая аорта", "Ao", 412, 420),
        (3, "svc", "Верхняя полая вена", "SVC", 306, 418),
        (4, "line", "Линия трёх сосудов", "3VV line", 566, 340),
        (5, "rpa", "Правая ветвь ЛА", "RPA", 380, 532),
        (6, "lpa", "Левая ветвь ЛА", "LPA", 598, 498),
        (7, "thy", "Тимус", "thymus", 452, 266),
        (8, "dao", "Нисходящая аорта", "DAo", 492, 610),
        (None, "lungs", "Лёгкие", "lungs", 200, 430),
        (None, "spine", "Позвоночник", "spine", 456, 666),
    ]
    svg = thorax_scene("3vv-normal", "Срез трёх сосудов (3VV): анатомическая схема нормы",
                       "Оригинальная учебная схема FetalCardio. Поперечный срез верхнего средостения на уровне бифуркации лёгочной артерии: "
                       "ствол ЛА (слева и кпереди, самый крупный), восходящая аорта и верхняя полая вена (справа и кзади, самая мелкая) "
                       "лежат на одной косой линии; правая ветвь ЛА проходит позади аорты и ВПВ; кпереди — тимус. "
                       "Анатомический рисунок, не УЗ-изображение; пропорции условны.",
                       "Срез трёх сосудов (3VV): анатомическая схема нормы", inner, M,
                       foot=["Поперечный срез: верх — передняя стенка, низ — позвоночник; левая сторона плода — справа на рисунке.",
                             "Зелёный пунктир — линия трёх сосудов: ЛА → аорта → ВПВ, размеры убывают в том же порядке.",
                             "Синий — ЛА и ВПВ (венозная кровь), красный — аорта. Номера — в легенде ниже.",
                             "Анатомическая схема, не УЗ-изображение; пропорции условны. © FetalCardio, оригинальный рисунок."])
    return svg, M


# =====================================================================================
# 3VT
# =====================================================================================
def three_vt():
    mpa = "M 526,300 C 532,326 534,346 534,366"
    da = "M 534,366 C 536,450 512,540 468,588"
    arch = "M 392,336 C 392,430 414,520 446,584"
    inner = f'''<g id="layer-mediastinum">{thymus(THY)}
<g id="s-trachea" data-s="trachea"><circle class="trw" cx="364" cy="556" r="22"/><circle class="trc" cx="364" cy="556" r="18" stroke-dasharray="26 6"/>
<circle class="trl" cx="364" cy="556" r="13"/></g></g>
<g id="layer-vessels">
<g id="s-da" data-s="da">{tube(da, 30, "p")}</g>
<g id="s-mpa" data-s="mpa">{tube(mpa, 40, "p")}</g>
<g id="s-arch" data-s="arch">{tube(arch, 28, "a")}</g>
{dao()}
<g id="s-svc" data-s="svc">{vcirc(318, 404, 15, "v")}</g>
</g>'''
    M = [
        (1, "arch", "Поперечная дуга аорты", "aortic arch", 406, 448),
        (2, "da", "Артериальный проток (дуга протока)", "DA", 526, 470),
        (3, "mpa", "Ствол лёгочной артерии", "MPA", 530, 334),
        (4, "dao", "Нисходящая аорта", "DAo", 492, 610),
        (5, "trachea", "Трахея", "trachea", 328, 588),
        (6, "svc", "Верхняя полая вена", "SVC", 290, 380),
        (7, "thy", "Тимус", "thymus", 452, 266),
        (None, "lungs", "Лёгкие", "lungs", 200, 430),
        (None, "spine", "Позвоночник", "spine", 456, 666),
    ]
    svg = thorax_scene("3vt-normal", "Срез трёх сосудов и трахеи (3VT): анатомическая схема нормы",
                       "Оригинальная учебная схема FetalCardio. Поперечный срез верхнего средостения краниальнее 3VV: поперечная дуга аорты "
                       "и артериальный проток образуют V-образную фигуру слева от трахеи и сходятся у нисходящей аорты слева от позвоночника; "
                       "верхняя полая вена — справа от дуги; кпереди — тимус. Анатомический рисунок, не УЗ-изображение; пропорции условны.",
                       "Срез трёх сосудов и трахеи (3VT): схема нормы", inner, M,
                       foot=["Поперечный срез: верх — передняя стенка, низ — позвоночник; левая сторона плода — справа на рисунке.",
                             "Дуга аорты и артериальный проток — «V» слева от трахеи, вершина — у нисходящей аорты.",
                             "Синий — ЛА, проток и ВПВ (венозная кровь), красный — аорта. Номера — в легенде ниже.",
                             "Анатомическая схема, не УЗ-изображение; пропорции условны. © FetalCardio, оригинальный рисунок."])
    return svg, M


BUILDERS = {"situs-normal": situs, "lvot-normal": lvot, "rvot-normal": rvot, "3vv-normal": three_vv, "3vt-normal": three_vt}

if __name__ == "__main__":
    out = sys.argv[1] if len(sys.argv) > 1 else "../../atlas"
    for name, fn in BUILDERS.items():
        s, _ = fn()
        open(os.path.join(out, name + ".svg"), "w", encoding="utf-8").write(s)
        print("ok", name, len(s))
