"""Генератор схем нормы стандартных срезов для атласа FetalCardio (кроме 4CV).

  situs-normal.svg — поперечный срез живота (situs) + врезка: положение и ось сердца
  lvot-normal.svg  — выходной тракт ЛЖ (поперечный срез, ось сердца ~45°, как на эхограмме)
  rvot-normal.svg  — выходной тракт ПЖ (поперечный срез)
  3vv-normal.svg   — срез трёх сосудов (поперечный срез верхнего средостения)
  3vt-normal.svg   — срез трёх сосудов и трахеи
  vsd-5cv.svg      — ДМЖП на LVOT (перимембранозный) — на основе схемы нормы LVOT

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
.ribo{stroke:#2b1a1a;fill:none;stroke-linecap:round}
.ribi{stroke:#f3ecdb;fill:none;stroke-linecap:round}
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


def ribs(cx, cy, rx, ry, segs, w=9):
    """Рёбра в поперечном срезе — дуги вдоль контура стенки (ребро идёт по окружности грудной клетки).
    segs — пары углов (градусы, 0 — левая сторона плода/справа на рисунке, 90 — кзади) для левой стороны;
    правая сторона — зеркально."""
    out = []
    def pt(a):
        t = math.radians(a)
        return cx + rx * math.cos(t), cy + ry * math.sin(t)
    for a0, a1 in segs:
        for b0, b1 in ((a0, a1), (180 - a1, 180 - a0)):
            (x0, y0), (x1, y1) = pt(b0), pt(b1)
            d = f"M {x0:.1f},{y0:.1f} A {rx} {ry} 0 0 1 {x1:.1f},{y1:.1f}"
            out.append(f'<path class="ribo" stroke-width="{w + 3.4}" d="{d}"/><path class="ribi" stroke-width="{w}" d="{d}"/>')
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
        # спереди — от грудины, сбоку и сзади — к позвоночнику; промежутки — межрёберья
        o.append(ribs(cx, cy, rx - 12, ry - 12, [(-76, -40), (-30, 14), (24, 58), (66, 80)]))
        o.append(f'<rect class="bone" x="{cx - 22}" y="{cy - ry + 6}" width="44" height="17" rx="8"/>')
    else:
        # на уровне желудка ребро идёт непрерывной дугой по боковой стенке — спереди-сбоку до позвоночника
        o.append(ribs(cx, cy, rx - 12, ry - 12, [(-42, 80)]))
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
    # центр грудной клетки (cx, cy); ось сердца пересекает среднюю линию в (ix, iy)
    cx2, cy2, ix, iy = 708, 180, 708, 188
    hx, hy = 726, 170                     # центр сердца — на оси, в левой половине грудной клетки
    o.append(f'''<g id="layer-inset">
<rect class="insb" x="612" y="88" width="192" height="156" rx="10"/>
<text class="inst" x="624" y="106">ГРУДНАЯ КЛЕТКА (4CV)</text>
<ellipse cx="{cx2}" cy="{cy2}" rx="80" ry="58" fill="url(#g-body)" stroke="#2b1a1a" stroke-width="1.6"/>
<ellipse cx="{cx2}" cy="{cy2}" rx="70" ry="48" fill="url(#g-lung)" stroke="#2b1a1a" stroke-width="1"/>
{ribs(cx2, cy2, 75, 53, [(-72, -34), (-24, 22), (32, 74)], w=3.2)}
<circle class="bone" cx="{cx2}" cy="{cy2 + 42}" r="8"/>
<path class="mid" d="M {cx2},{cy2 - 52} L {cx2},{cy2 + 32}"/>
<g id="s-heartpos" data-s="heartpos">
<ellipse cx="{hx}" cy="{hy}" rx="30" ry="20" transform="rotate(-45 {hx} {hy})" fill="url(#g-myo)" stroke="#2b1a1a" stroke-width="1.8"/>
<ellipse cx="{hx - 6}" cy="{hy - 6}" rx="11" ry="7" transform="rotate(-45 {hx - 6} {hy - 6})" fill="#2452b8" stroke="#2b1a1a" stroke-width="1"/>
<ellipse cx="{hx + 9}" cy="{hy + 1}" rx="12" ry="7" transform="rotate(-45 {hx + 9} {hy + 1})" fill="#c41d22" stroke="#2b1a1a" stroke-width="1"/></g>
<g id="s-axis" data-s="axis">
<path class="ax" d="M {ix - 16},{iy + 16} L {ix + 44},{iy - 44}"/>
<path class="ax" stroke-width="1.6" d="M {ix},{iy - 30} A 30 30 0 0 1 {ix + 21.2},{iy - 21.2}"/>
<text class="axt" x="{ix - 10}" y="{iy - 12}" text-anchor="end">≈45°</text></g>
</g>''')
    M = [
        (1, "stomach", "Желудок", "stomach", 576, 404),
        (2, "liver", "Печень", "liver", 250, 470),
        (3, "uv", "Пупочная вена", "umbilical vein", 430, 262),
        (4, "ps", "Портальный синус", "portal sinus", 300, 370),
        (5, "ao", "Брюшная (нисходящая) аорта", "Ao", 480, 576),
        (6, "ivc", "Нижняя полая вена", "IVC", 312, 548),
        (7, "heartpos", "Сердце в левой половине грудной клетки", "levocardia", 776, 132),
        (8, "axis", "Ось сердца", "cardiac axis", 762, 204),
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


def flow_arrows(d, ts, sz=7):
    """Белые стрелки-шевроны по ходу сосуда (направление — от начала пути к концу)."""
    from svgpathtools import parse_path
    p = parse_path(d)
    out = []
    for t in ts:
        pt = p.point(t); tg = p.unit_tangent(t)
        x, y, ux, uy = pt.real, pt.imag, tg.real, tg.imag
        nx, ny = -uy, ux
        a = (x + ux * sz, y + uy * sz)
        b = (x - ux * sz + nx * sz, y - uy * sz + ny * sz)
        c = (x - ux * sz - nx * sz, y - uy * sz - ny * sz)
        out.append(f'<path d="M {b[0]:.1f},{b[1]:.1f} L {a[0]:.1f},{a[1]:.1f} L {c[0]:.1f},{c[1]:.1f}" '
                   f'stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".95"/>')
    return "".join(out)


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
</g>
<g id="layer-flow"><g id="s-flow" data-s="flow">{flow_arrows(arch, [.3, .62])}{flow_arrows(da, [.3, .62])}{flow_arrows(mpa, [.5])}</g></g>'''
    M = [
        (None, "flow", "Направление кровотока: в дуге и протоке одинаковое — к нисходящей аорте", "flow", 470, 520),
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
                             "Стрелки — кровоток: в дуге и протоке однонаправленный, к нисходящей аорте (на ЦДК — один цвет).",
                             "Цвет — насыщение крови, а не направление: красный — из ЛЖ, синий — из ПЖ. Схема условна. © FetalCardio"])
    return svg, M


# =====================================================================================
# LVOT — поперечный срез грудной клетки, как на эхограмме (версия 2)
# =====================================================================================
# Сердце рисуется в «апикальной» системе (верхушка вверх, ПЖ слева, ЛЖ справа, база внизу)
# и поворачивается на 45° по часовой стрелке — нормальная ось: верхушка кпереди и влево,
# ПЖ — самый передний, ЛП — самый задний, у нисходящей аорты.
# В этой системе восходящая аорта из ЛЖ идёт вниз-влево, т. е. после поворота — к правой стороне плода;
# МЖП тупым углом переходит в переднюю стенку аорты, передняя створка МК — в заднюю.
LV_HX, LV_HY, LV_ROT, LV_SC = 440, 362, 45, 1.0

L_OUT = ("M 10,-182 C 74,-174 126,-104 132,-22 C 134,18 128,46 118,62 C 146,90 146,150 110,172 "
         "C 70,190 20,182 4,160 C -6,148 -14,134 -28,124 C -54,110 -90,90 -112,68 "
         "C -134,46 -140,10 -134,-24 C -122,-92 -66,-156 -16,-176 C -6,-180 2,-182 10,-182 Z")
L_LV = ("M 24,48 L 18,-150 Q 22,-164 36,-160 C 82,-142 110,-82 112,-12 C 113,20 108,40 100,54 L 40,64 Z")
L_RV = ("M -4,28 L -2,-150 C -14,-160 -32,-152 -52,-134 C -92,-98 -120,-42 -118,2 "
        "C -117,24 -106,40 -90,48 C -62,54 -30,48 -4,28 Z")
L_IVS = "M -4,28 L -2,-150 Q 8,-160 18,-150 L 24,48 C 16,50 4,44 -4,28 Z"
L_LA = ("M 40,64 L 100,54 C 132,78 138,140 106,162 C 72,180 30,172 18,150 C 10,134 14,108 28,90 Z")
AO2_UP = "M -4,28 C -8,52 -26,74 -56,88 C -74,96 -90,102 -106,107"            # передняя стенка = продолжение МЖП
AO2_LO = "M 40,64 C 30,94 6,120 -30,134 C -56,144 -80,148 -102,152"            # задняя стенка ← передняя створка МК
AO2 = f"{AO2_UP} L -102,152 C -80,148 -56,144 -30,134 C 6,120 30,94 40,64 C 34,52 26,46 24,48 C 14,50 4,44 -4,28 Z"
L_MV_A = "M 40,64 Q 60,40 74,20"
L_MV_P = "M 100,54 Q 92,34 80,22"
L_MV_CH = [((70, 26), (104, -20)), ((76, 22), (105, -18)), ((84, 24), (106, -16)), ((92, 34), (107, -14))]
L_LVPM = "M 113,-40 C 102,-34 92,-18 90,-6 C 96,-2 106,2 113,6 Z"
L_PV = ["M 34,166 C 20,190 0,206 -24,218", "M 124,128 C 146,118 164,100 176,80"]
LUNG_R2 = ("M 300,214 C 214,230 132,312 124,430 C 116,556 186,668 300,700 C 330,690 344,662 336,628 "
           "C 322,586 270,560 254,500 C 240,446 236,386 244,330 C 252,282 278,240 300,214 Z")
LUNG_L2 = ("M 596,224 C 660,262 698,340 698,432 C 700,556 634,668 520,700 C 490,690 476,664 484,632 "
           "C 492,600 540,584 576,552 C 610,516 626,470 626,420 C 626,346 620,282 596,224 Z")


def lv_pt(x, y):
    t = math.radians(LV_ROT)
    return (round(LV_HX + LV_SC * (x * math.cos(t) - y * math.sin(t)), 1),
            round(LV_HY + LV_SC * (x * math.sin(t) + y * math.cos(t)), 1))


def lvot(vsd=False):
    RV_C2, RV_E2 = A.wavy(L_RV, [0, 8, 9, 5, 0], seed=5, wl=14)
    LV_C2, LV_E2 = A.wavy(L_LV, [0, 0, 4, 4, 3, 0, 0], seed=9, wl=10)
    ch = "".join(A.tline(a, b, "che") + A.tline(a, b, "ch") for a, b in L_MV_CH)
    trab = "".join(bundle(d, w) for d, w in [("M -96,-70 Q -84,-66 -76,-56", 4.5), ("M -74,-112 Q -64,-104 -60,-92", 4.5),
                                             ("M -40,-140 Q -34,-128 -32,-116", 4), ("M -112,-24 Q -98,-22 -90,-12", 4.5)])
    # кровоток из ЛЖ в аорту — белые стрелки по оси выходного тракта
    flow = ('<path class="flw" d="M 40,10 C 30,40 10,70 -24,96 C -50,114 -70,122 -88,126"/>'
            '<path class="flwh" d="M -96,128 l 10,-9 l 1,12 Z"/>')
    ivs, defect, sao = L_IVS, "", f'<g id="s-sao" data-s="sao"><path class="sao" d="M -4,4 C -4,16 -4,24 -6,36 C -10,52 -18,64 -30,74"/></g>'
    if vsd:
        # перимембранозный дефект: верхний (базальный) отрезок МЖП под аортальным клапаном отсутствует,
        # передняя стенка аорты не продолжает перегородку
        ivs = "M -3,-8 L -2,-150 Q 8,-160 18,-150 L 21,-8 C 14,-4 4,-4 -3,-8 Z"
        defect = ('<g id="layer-defects"><g id="s-d-pm" data-s="d-pm">'
                  '<path class="vsd" d="M -3,-8 C 4,-4 14,-4 21,-8 L 24,48 C 16,50 4,44 -4,28 Z"/>'
                  '<path class="rim" d="M -3,-8 C 4,-4 14,-4 21,-8"/>'
                  '<path class="flow" d="M -10,14 L 26,14"/><path class="flowh" d="M 31,14 l -7,-4 l 0,8 Z"/>'
                  '<path class="flow" d="M 28,24 L -8,24"/><path class="flowh" d="M -13,24 l 7,-4 l 0,8 Z"/></g></g>')
        sao = ""
    heart = f'''<g id="layer-heart" transform="translate({LV_HX} {LV_HY}) rotate({LV_ROT}) scale({LV_SC})">
<g id="layer-veins"><g id="s-pvn" data-s="pvn">{"".join(f'<path class="vo" stroke-width="15" d="{d}"/><path class="vm" stroke-width="11" d="{d}"/>' for d in L_PV)}</g></g>
<g id="layer-myocardium" filter="url(#f-soft)"><path class="myo" d="{L_OUT}"/></g>
<g id="layer-myo-texture"><path class="fibr" d="{L_OUT}"/></g>
<g id="layer-cavities">
<path id="s-rv" data-s="rv" class="cavr2" d="{RV_C2}"/>
<path id="s-lv" data-s="lv" class="cavl2" d="{LV_C2}"/>
<path id="s-la" data-s="la" class="cavl2" d="{L_LA}"/>
<path class="sheen" d="{RV_C2} {LV_C2} {L_LA}"/>
<path class="endo2" d="{RV_E2} {LV_E2}"/>
</g>
<g id="layer-ventricular-septum"><path id="s-ivs" data-s="ivs" class="sep" d="{ivs}"/><path class="fibr" d="{ivs}"/></g>{defect}
<g id="layer-rv-morphology">{trab}<g id="s-mb">{bundle("M -6,-48 C -40,-46 -76,-34 -108,-14", 7)}</g></g>
<g id="layer-lv-morphology"><path class="pm" d="{L_LVPM}"/></g>
<g id="layer-aorta">
<g id="s-ao" data-s="ao"><path fill="url(#g-ao)" d="{AO2}"/>
<path class="an" stroke-width="2.4" d="{AO2_UP}"/><path class="an" stroke-width="2.4" d="{AO2_LO}"/>
<ellipse cx="-104" cy="129.5" rx="23" ry="7" fill="#7f0c12" stroke="#2b1a1a" stroke-width="1.8" transform="rotate(80 -120 134)"/>
<path d="M -14,62 C -40,88 -66,102 -92,112" stroke="#fff" stroke-width="3.5" opacity=".3" fill="none" stroke-linecap="round"/></g>
<g id="s-lvot" data-s="lvot"><path class="and" stroke-width="1.6" d="M 0,10 C 14,0 40,4 52,20 C 58,32 52,48 42,56"/></g>
<g id="s-flow" data-s="flow">{flow}</g>
<g id="s-aov" data-s="aov">{leaflet("M -2,34 Q -6,52 4,62")}{leaflet("M 38,64 Q 20,70 4,62")}</g>
{sao}
<g id="s-mac" data-s="mac"><circle cx="40" cy="64" r="7" fill="#fffaf2" stroke="#2b1a1a" stroke-width="1.6"/></g>
</g>
<g id="layer-av-valves"><g id="s-mv" data-s="mv">{ch}{leaflet(L_MV_A)}{leaflet(L_MV_P)}</g></g>
</g>'''
    P = lv_pt
    M = [
        (1, "lv", "Левый желудочек", "LV", *P(64, -80)),
        (2, "lvot", "Выходной тракт ЛЖ (подаортальный отдел)", "LVOT", *P(30, 26)),
        (3, "aov", "Аортальный клапан", "AoV", *P(-6, 78)),
        (4, "ao", "Корень и восходящая аорта", "Ao", *P(-72, 118)),
        (5, "sao", "Септо-аортальная непрерывность", "septo-aortic continuity", *P(-30, 40)),
        (6, "mac", "Митрально-аортальный фиброзный контакт", "mitral-aortic continuity", *P(58, 82)),
        (7, "ivs", "Межжелудочковая перегородка", "IVS", *P(8, -96)),
        (8, "mv", "Митральный клапан", "MV", *P(94, 10)),
        (9, "rv", "Правый желудочек", "RV", *P(-60, -60)),
        (10, "la", "Левое предсердие", "LA", *P(76, 128)),
        (11, "pvn", "Лёгочные вены", "pulmonary veins", *P(-44, 214)),
        (None, "flow", "Направление кровотока: из ЛЖ в аорту", "flow", *P(-84, 146)),
        (None, "dao", "Нисходящая аорта", "DAo", 492, 610),
        (None, "lungs", "Лёгкие", "lungs", 186, 440),
        (None, "spine", "Позвоночник", "spine", 456, 666),
    ]
    if vsd:
        M = [
            (1, "d-pm", "Перимембранозный ДМЖП", "perimembranous VSD", *P(-34, 6)),
            (2, "ao", "Корень и восходящая аорта", "Ao", *P(-72, 118)),
            (3, "aov", "Аортальный клапан", "AoV", *P(-6, 78)),
            (4, "ivs", "Межжелудочковая перегородка", "IVS", *P(8, -96)),
            (5, "rv", "Правый желудочек", "RV", *P(-60, -60)),
            (6, "lv", "Левый желудочек", "LV", *P(64, -80)),
            (7, "mv", "Митральный клапан", "MV", *P(94, 10)),
            (8, "mac", "Митрально-аортальный фиброзный контакт", "mitral-aortic continuity", *P(58, 82)),
            (9, "la", "Левое предсердие", "LA", *P(76, 128)),
            (None, "dao", "Нисходящая аорта", "DAo", 492, 610),
            (None, "lungs", "Лёгкие", "lungs", 186, 440),
            (None, "spine", "Позвоночник", "spine", 456, 666),
        ]
    style = """<defs><radialGradient id="g-rb" cx=".55" cy=".6" r=".7"><stop offset="0" stop-color="#4f7fe0"/><stop offset=".6" stop-color="#2452b8"/><stop offset="1" stop-color="#143584"/></radialGradient>
<radialGradient id="g-rr" cx=".45" cy=".55" r=".7"><stop offset="0" stop-color="#ec5a4c"/><stop offset=".6" stop-color="#c41d22"/><stop offset="1" stop-color="#8f1016"/></radialGradient></defs>
<style>.cavr2{fill:url(#g-rb);stroke:#2b1a1a;stroke-width:1.4;stroke-linejoin:round}.cavl2{fill:url(#g-rr);stroke:#2b1a1a;stroke-width:1.4;stroke-linejoin:round}
.flw{stroke:#ffffff;stroke-width:2.6;fill:none;stroke-linecap:round;stroke-dasharray:9 6;opacity:.9}
.flwh{fill:#ffffff;opacity:.9}</style>"""
    if vsd:
        o = [head("vsd-5cv", "ДМЖП на срезе LVOT (5CV): перимембранозный дефект под аортальным клапаном",
                  "Оригинальная учебная схема FetalCardio на основе схемы нормы LVOT: поперечный срез, ось сердца влево. "
                  "Базальный отрезок межжелудочковой перегородки под аортальным клапаном отсутствует — перимембранозный дефект; "
                  "передняя стенка аорты не продолжает перегородку; стрелки — двунаправленный шунт. Анатомический рисунок, не УЗ-изображение.",
                  "ДМЖП на 5CV: перимембранозный (подаортальный)") + style,
             orient_tr(TCY - TRY), '<g id="heart">', body_frame(TCX, TCY, TRX, TRY, thorax=True),
             lungs(LUNG_R2, LUNG_L2), f'<g id="layer-spine">{spine(SPX, SPY)}</g>', dao(), heart,
             labels(M) + "\n</g>",
             V.foot(["Схема нормы LVOT с дефектом: поперечный срез, верх — передняя стенка, левая сторона плода — справа.",
                     "Дефект — между гребнем МЖП и аортальным клапаном; в норме МЖП переходит в переднюю стенку аорты.",
                     "Стрелки — двунаправленный шунт плода. Ширина дефекта условна.",
                     "Анатомическая схема, не УЗ-изображение; пропорции условны. © FetalCardio, оригинальный рисунок."])]
        return "\n".join(o), M
    o = [head("lvot-normal", "Выходной тракт левого желудочка (LVOT): анатомическая схема нормы",
              "Оригинальная учебная схема FetalCardio. Поперечный срез грудной клетки, как на эхограмме: ось сердца направлена влево, "
              "верхушка кпереди и влево. Аорта отходит от левого желудочка в центре сердца и идёт к правой стороне плода; "
              "межжелудочковая перегородка продолжается в переднюю стенку аорты, передняя створка митрального клапана — в её заднюю стенку; "
              "кзади от корня аорты — левое предсердие. Анатомический рисунок, не УЗ-изображение; пропорции условны.",
              "Выходной тракт ЛЖ (LVOT): анатомическая схема нормы") + style,
         orient_tr(TCY - TRY), '<g id="heart">', body_frame(TCX, TCY, TRX, TRY, thorax=True),
         lungs(LUNG_R2, LUNG_L2), f'<g id="layer-spine">{spine(SPX, SPY)}</g>', dao(), heart,
         labels(M) + "\n</g>",
         V.foot(["Поперечный срез, как на эхограмме: верх — передняя стенка, низ — позвоночник; левая сторона плода — справа.",
                 "LVOT — наклон датчика от 4CV краниально к правому плечу плода: аорта из ЛЖ уходит вправо (на рисунке — влево).",
                 "Правое предсердие и трёхстворчатый клапан в этой плоскости обычно не видны. Пунктир со стрелкой — кровоток.",
                 "Анатомическая схема, не УЗ-изображение; пропорции условны. © FetalCardio, оригинальный рисунок."])]
    return "\n".join(o), M


BUILDERS = {"vsd-5cv": lambda: lvot(vsd=True), "situs-normal": situs, "lvot-normal": lvot, "rvot-normal": rvot, "3vv-normal": three_vv, "3vt-normal": three_vt}

if __name__ == "__main__":
    out = sys.argv[1] if len(sys.argv) > 1 else "../../atlas"
    for name, fn in BUILDERS.items():
        s, _ = fn()
        open(os.path.join(out, name + ".svg"), "w", encoding="utf-8").write(s)
        print("ok", name, len(s))
