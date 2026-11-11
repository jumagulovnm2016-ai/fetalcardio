"""Генератор atlas/4cv-normal.svg — версия 4: стиль медицинской иллюстрации
(правые отделы синие, левые красные, светлый миокард с фактурой, тушевой контур),
без выносок: на схеме только номера структур, расшифровка — в легенде приложения.
Ранее — версия 3: объёмный стиль + анатомическое окружение.
Анатомия, слои, ключи data-s и подписи — как в build_svg.py.
Версия 3: предсердия укорочены (желудочки ≈ 2/3 длины сердца, как на 4CV плода);
добавлен контекст поперечного среза грудной клетки: лёгкие, передняя грудная стенка с рёбрами,
позвоночник с ядрами окостенения кзади от нисходящей аорты, перикард."""
import sys, math, random
import numpy as np
from svgpathtools import parse_path
from matplotlib.path import Path as MPath
import build_svg as B

# версия 3: сердце мельче, чтобы вокруг поместилась грудная клетка (сердце ≈ 1/3 площади среза)
B.S = 1.02
B.DX, B.DY = 660 - 450 * B.S, 112 - 80 * B.S
W, H, S, DX, DY = B.W, B.H, B.S, B.DX, B.DY

# ---------- уточнённая анатомия силуэта (перегородки, клапаны, овальное окно — без изменений) ----------
# предсердия — две отдельные выпуклости с межпредсердной бороздой; ЛП ниже (кзади), стенки предсердий тоньше
B.OUTLINE = ("M 512,86 C 600,96 652,186 656,292 C 658,348 648,378 634,394 "
             "C 660,420 668,500 650,556 C 632,604 576,620 520,618 C 490,617 466,610 452,602 "
             "C 432,612 396,614 362,610 C 304,602 256,566 251,500 C 248,456 252,426 262,404 "
             "C 246,384 242,352 248,316 C 258,236 344,166 432,132 C 466,118 490,94 512,86 Z")
B.RA = ("M 284,400 L 448,360 L 452,394 L 446,592 C 420,602 390,606 362,602 "
        "C 310,594 268,560 262,500 C 258,456 264,424 284,400 Z")
B.LA = ("M 468,386 L 614,388 C 648,420 658,500 640,550 C 622,598 560,612 500,608 "
        "C 478,606 462,598 454,592 L 462,394 Z")
B.RPV = "M 372,724 C 410,692 470,650 488,614"
RA_PECT = [("M 266,452 Q 282,456 290,468", 4), ("M 263,478 Q 280,482 290,494", 4.5), ("M 263,506 Q 281,508 292,520", 4.5),
           ("M 267,534 Q 284,534 296,544", 4), ("M 276,560 Q 292,558 304,566", 3.5)]

# ---------- версия 3: укорочение предсердий ----------
# Всё, что ниже AV-плоскости (y > 394), сжимается по вертикали; функция непрерывна, AV-соединение не смещается.
import re as _re
AV_Y, K_ATR = 394.0, 0.78
def fy(y): return y if y <= AV_Y else AV_Y + (y - AV_Y) * K_ATR
def squash(d):
    return _re.sub(r"(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)", lambda m: f"{m.group(1)},{fy(float(m.group(2))):.1f}", d)
for _n in ["OUTLINE", "RA", "LA", "IAS_PRIMUM", "IAS_SECUNDUM", "FO_GAP", "FO_FLAP", "RPV", "RPV_L", "LPV", "LPV_L"]:
    setattr(B, _n, squash(getattr(B, _n)))
B.DAO = (B.DAO[0], round(fy(B.DAO[1]) - 6, 1), B.DAO[2])
RA_PECT = [(squash(d), w) for d, w in RA_PECT]
B.LABELS = [tuple(list(l[:5]) + [[(x, fy(y)) for x, y in l[5]]] + list(l[6:7]) + ([fy(l[7])] if len(l) > 7 else [])) for l in B.LABELS]

# ---------- версия 3: окружение — поперечный срез грудной клетки ----------
TH = (458, 404, 400, 392)   # центр и полуоси грудной клетки (координаты сердца)
SPINE = (522, 712)          # тело позвонка — кзади от нисходящей аорты, по средней линии
def thorax():
    cx, cy, rx, ry = TH
    ribs = []
    for a in [196, 214, 232, 250, 290, 308, 326, 344, 130, 148, 166, 14, 32, 50]:
        t = math.radians(a)
        x, y = cx + (rx - 14) * math.cos(t), cy + (ry - 14) * math.sin(t)
        ribs.append(f'<ellipse class="rib" cx="{x:.1f}" cy="{y:.1f}" rx="13" ry="8" transform="rotate({a + 90} {x:.1f} {y:.1f})"/>')
    sx, sy = SPINE
    return f'''<g id="layer-thorax" clip-path="url(#c-col)">
<ellipse class="thw" cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}"/>
<ellipse class="lung" cx="{cx}" cy="{cy}" rx="{rx - 26}" ry="{ry - 26}"/>
{"".join(ribs)}
<g id="s-spine"><circle class="vb" cx="{sx}" cy="{sy}" r="30"/><path class="lam" d="M {sx-20},{sy+24} L {sx-30},{sy+62} M {sx+20},{sy+24} L {sx+30},{sy+62}"/>
<circle class="vbc" cx="{sx-30}" cy="{sy+64}" r="9"/><circle class="vbc" cx="{sx+30}" cy="{sy+64}" r="9"/></g>
<path class="pcd" d="{B.OUTLINE}" transform="translate({cx} {cy}) scale(1.05) translate({-cx} {-cy})"/>
</g>'''


# ---------- неровный (трабекулярный) край полости ----------
def poly_of(d, n=40):
    pts = []
    for seg in parse_path(d):
        for t in np.linspace(0, 1, n, endpoint=False):
            p = seg.point(t); pts.append((p.real, p.imag))
    return pts

def wavy(d, amps, seed, wl=13.0, step=1.6):
    """amps[i] — амплитуда «мышечных выступов» внутрь полости для сегмента i (0 — гладко).
    Возвращает (замкнутый путь полости, открытый путь края эндокарда без гладких отрезков)."""
    rnd = random.Random(seed)
    segs = list(parse_path(d))
    poly = MPath(poly_of(d))
    out, edges, cur = [], [], []
    for i, seg in enumerate(segs):
        L = seg.length(); n = max(2, int(L / step)); a = amps[i] if i < len(amps) else 0
        ph = rnd.random() * 6.28; bump_amp = {}
        for k in range(n):
            t = k / n; p = seg.point(t)
            if a:
                tan = seg.unit_tangent(min(max(t, 1e-3), 1 - 1e-3))
                nx, ny = -tan.imag, tan.real
                if not poly.contains_point((p.real + nx * 2, p.imag + ny * 2)): nx, ny = -nx, -ny
                s = t * L / wl; b = int(s)
                if b not in bump_amp: bump_amp[b] = a * (0.45 + 0.75 * rnd.random())
                env = math.sin(math.pi * t) ** 0.6          # к концам сегмента — ноль, точки шарниров не сдвигаются
                h = bump_amp[b] * abs(math.sin(math.pi * s + ph)) ** 0.8 * env
                x, y = p.real + nx * h, p.imag + ny * h
            else:
                x, y = p.real, p.imag
            out.append((x, y))
            if a: cur.append((x, y))
            elif cur: edges.append(cur); cur = []
        if a:
            q = seg.point(1); cur.append((q.real, q.imag))
    if cur: edges.append(cur)
    f = lambda pts: " ".join(f"{x:.1f},{y:.1f}" for x, y in pts)
    closed = "M " + f(out) + " Z"
    edge = " ".join("M " + f(e) for e in edges)
    return closed, edge

RV_C, RV_E = wavy(B.RV, [5, 12, 12, 6, 0], seed=7, wl=16)          # ПЖ: грубые трабекулы (и на септальной поверхности)
LV_C, LV_E = wavy(B.LV, [0, 5, 5, 3, 0], seed=11, wl=10)   # ЛЖ: мелкие, септальная поверхность гладкая
RA_E = "M 284,400 C 264,424 258,456 262,500 C 268,560 310,594 362,602 C 390,606 420,602 446,592"
LA_E = "M 614,388 C 648,420 658,500 640,550 C 622,598 560,612 500,608 C 478,606 462,598 454,592"
RA_E, LA_E = squash(RA_E), squash(LA_E)

def tline(a, b, cls, w=None):
    sw = f' stroke-width="{w}"' if w else ""
    return f'<line class="{cls}"{sw} x1="{a[0]}" y1="{a[1]}" x2="{b[0]}" y2="{b[1]}"/>'

def bundle(d, w):
    """Мышечный тяж: тёмный край + тело + блик."""
    return (f'<path class="tje" stroke-width="{w + 2.4}" d="{d}"/>'
            f'<path class="tj" stroke-width="{w}" d="{d}"/>'
            f'<path class="tjh" stroke-width="{max(1, w * .28):.1f}" d="{d}"/>')

def leaflet(d):
    return f'<path class="lfe" d="{d}"/><path class="lf" d="{d}"/>'


# ---------- версия 4: холст без колонок подписей ----------
W4, H4, S4 = 820, 900, 1.25
DX4, DY4 = 410 - 458 * S4, 96 - 86 * S4

# Номера структур на схеме (координаты сердца); выносок нет — номер стоит на структуре или вплотную к ней.
MARKS = {
    "rv": (372, 300), "trab": (322, 222), "mb": (384, 262), "tv": (340, 340), "avs": (432, 366),
    "ra": (336, 470), "fo": (430, 466), "ias": (430, 518), "cfb": (490, 404), "crux": (458, 420),
    "lv": (572, 240), "ivs": (478, 250), "mv": (566, 344), "offset": (530, 380), "flap": (500, 478),
    "la": (586, 480), "pv": None, "dao": None,
}

def markers():
    out = []
    for it in B.LABELS:
        num, key = it[0], it[1]
        pos = MARKS.get(key)
        if pos is None:
            pos = (B.DAO[0] + 34, B.DAO[1] + 4) if key == "dao" else B.LABELS and [a for a in it[5]][0]
            if key == "pv": pos = (pos[0] - 26, pos[1] + 20)
        x, y = pos
        t = num if num else "•"
        tip = B.esc(f"{t}. {it[2]} {it[3]}")
        out.append(f'<g id="lbl-{key}" class="lbl" data-s="{key}"><title>{tip}</title><circle class="nb{"" if num else " nb0"}" cx="{x}" cy="{y}" r="11.5"/>'
                   f'<text class="nt" x="{x}" y="{y + 4.2}" text-anchor="middle">{t}</text></g>')
    return "\n".join(out)

def build():
    o = []
    o.append(f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W4} {H4}" role="img" aria-labelledby="t4cv d4cv" font-family="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" data-status="draft">
<title id="t4cv">Четырёхкамерный срез сердца плода — анатомическая схема нормы (DRAFT)</title>
<desc id="d4cv">Оригинальная учебная схема FetalCardio в стиле медицинской иллюстрации: правые отделы — синие, левые — красные. Анатомический рисунок, не УЗ-изображение. Апикальная ориентация: верхушка вверху (кпереди), предсердия внизу (кзади); правые отделы слева, левые справа. Номера структур — в легенде. Пропорции и толщины условны. Статус: DRAFT / REQUIRES EXPERT REVIEW.</desc>
<metadata>{{"app":"FetalCardio","id":"4cv-normal","status":"draft","review":"REQUIRES EXPERT REVIEW","author":"Жумагулов Н.М.","created":"2026-11-11","version":4}}</metadata>
<defs>
<radialGradient id="g-myo" gradientUnits="userSpaceOnUse" cx="430" cy="300" r="380">
  <stop offset="0" stop-color="#fdf2ee"/><stop offset=".6" stop-color="#f6dcd4"/><stop offset="1" stop-color="#e9bfb3"/>
</radialGradient>
<radialGradient id="g-blue" gradientUnits="userSpaceOnUse" cx="350" cy="330" r="260">
  <stop offset="0" stop-color="#4f7fe0"/><stop offset=".55" stop-color="#2452b8"/><stop offset="1" stop-color="#143584"/>
</radialGradient>
<radialGradient id="g-red" gradientUnits="userSpaceOnUse" cx="570" cy="330" r="260">
  <stop offset="0" stop-color="#ec5a4c"/><stop offset=".55" stop-color="#c41d22"/><stop offset="1" stop-color="#7f0c12"/>
</radialGradient>
<linearGradient id="g-fo" x1="0" x2="1"><stop offset="0" stop-color="#2452b8"/><stop offset="1" stop-color="#c41d22"/></linearGradient>
<linearGradient id="g-vein" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#c41d22"/><stop offset="1" stop-color="#e2483f"/></linearGradient>
<radialGradient id="g-ao" cx=".38" cy=".34" r=".72"><stop offset="0" stop-color="#f28a7e"/><stop offset=".6" stop-color="#c41d22"/><stop offset="1" stop-color="#7f0c12"/></radialGradient>
<pattern id="p-fib" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(32)">
  <path d="M0,4.5 H9" stroke="#c98e80" stroke-width=".7" opacity=".55"/><path d="M0,1 H4" stroke="#b97a6c" stroke-width=".5" opacity=".35"/>
</pattern>
<pattern id="p-sheen" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(-20)">
  <path d="M0,3.5 H7" stroke="#ffffff" stroke-width=".6" opacity=".12"/>
</pattern>
<filter id="f-soft" x="-10%" y="-10%" width="120%" height="125%"><feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#3a1414" flood-opacity=".25"/></filter>
<filter id="f-ish" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="6"/></filter>
<clipPath id="c-rv"><path d="{RV_C}"/></clipPath><clipPath id="c-lv"><path d="{LV_C}"/></clipPath><clipPath id="c-ra"><path d="{B.RA}"/></clipPath><clipPath id="c-la"><path d="{B.LA}"/></clipPath>
</defs>
<style>
.bg{{fill:var(--sv-bg,#ffffff)}}
.myo{{fill:url(#g-myo);stroke:#2b1a1a;stroke-width:2.6;stroke-linejoin:round}}
.fibr{{fill:url(#p-fib);stroke:none}}
.cavr{{fill:url(#g-blue);stroke:#2b1a1a;stroke-width:1.4;stroke-linejoin:round}}
.cavl{{fill:url(#g-red);stroke:#2b1a1a;stroke-width:1.4;stroke-linejoin:round}}
.sheen{{fill:url(#p-sheen);stroke:none}}
.ish{{fill:none;stroke:#05102e;stroke-width:18;opacity:.35;filter:url(#f-ish)}}
.ishl{{fill:none;stroke:#3a0306;stroke-width:18;opacity:.35;filter:url(#f-ish)}}
.endo2{{fill:none;stroke:#ffffff;stroke-width:1;stroke-linejoin:round;opacity:.45}}
.sep{{fill:url(#g-myo);stroke:#2b1a1a;stroke-width:1.2}}
.tje{{stroke:#2b1a1a;fill:none;stroke-linecap:round}}
.tj{{stroke:#f3d2c9;fill:none;stroke-linecap:round}}
.tjh{{stroke:#ffffff;fill:none;stroke-linecap:round;opacity:.75}}
.pm{{fill:url(#g-myo);stroke:#2b1a1a;stroke-width:1.6}}
.lfe{{stroke:#2b1a1a;fill:none;stroke-width:7.2;stroke-linecap:round}}
.lf{{stroke:#fbfbff;fill:none;stroke-width:4.4;stroke-linecap:round}}
.ch{{stroke:#ffffff;stroke-width:1.1;opacity:.85}}
.che{{stroke:#2b1a1a;stroke-width:2.2;opacity:.35}}
.flap{{stroke:#fbfbff;fill:none;stroke-width:3.4;stroke-linecap:round}}
.flape{{stroke:#2b1a1a;fill:none;stroke-width:6;stroke-linecap:round}}
.fo{{fill:url(#g-fo);stroke:none}}
.fib{{fill:#fffaf2;stroke:#2b1a1a;stroke-width:1.2}}
.avs{{fill:rgba(255,190,60,.35);stroke:#8a5a00;stroke-width:1.2;stroke-dasharray:3 2}}
.vo{{stroke:#2b1a1a;fill:none;stroke-width:21;stroke-linecap:round}}
.vm{{stroke:url(#g-vein);fill:none;stroke-width:17;stroke-linecap:round}}
.vh{{stroke:#ffffff;fill:none;stroke-width:3;stroke-linecap:round;opacity:.35}}
.vi{{stroke:#e2483f;fill:none;stroke-width:9;stroke-linecap:round}}
.ao{{fill:url(#g-ao);stroke:#2b1a1a;stroke-width:2}}
.an{{stroke:#2b1a1a;stroke-width:1.8;fill:none}}
.and{{stroke:#2b1a1a;stroke-width:1.5;fill:none;stroke-dasharray:5 3}}
.anf{{fill:#2b1a1a}}
.ant{{fill:#2b1a1a;font-size:11px;font-weight:700}}
.nb{{fill:#101828;stroke:#ffffff;stroke-width:1.6}}
.nb0{{fill:#5b6578}}
.nt{{fill:#ffffff;font-size:12.5px;font-weight:700}}
.hd{{fill:var(--sv-text,#101828);font-size:22px;font-weight:700}}
.om{{fill:var(--sv-text,#101828);font-size:13px;opacity:.7}}
.dr{{fill:none;stroke:var(--sv-draft,#c0392b);stroke-width:1.5}}
.drt{{fill:var(--sv-draft,#c0392b);font-size:13px;font-weight:700;letter-spacing:.04em}}
.cs{{fill:var(--sv-text,#101828);font-size:12px;font-weight:700;letter-spacing:.08em;opacity:.5}}
</style>
<rect class="bg" x="0" y="0" width="{W4}" height="{H4}"/>
<g id="layer-header">
<text class="hd" x="24" y="34">Четырёхкамерный срез (4CV): анатомическая схема нормы</text>
<rect class="dr" x="24" y="48" width="290" height="28" rx="6"/>
<text class="drt" x="169" y="67" text-anchor="middle">DRAFT · REQUIRES EXPERT REVIEW</text>
<text class="cs" x="40" y="128">ПРАВЫЕ ОТДЕЛЫ</text>
<text class="cs" x="{W4 - 40}" y="128" text-anchor="end">ЛЕВЫЕ ОТДЕЛЫ</text>
</g>
<g id="heart" transform="translate({DX4},{DY4}) scale({S4})">''')
    # сосуды позади сердца: лёгочные вены (оксигенированная кровь — красные) и нисходящая аорта
    o.append(f'''<g id="layer-veins">
<g id="s-dao" data-s="dao"><circle class="ao" cx="{B.DAO[0]}" cy="{B.DAO[1]}" r="{B.DAO[2]}"/><ellipse cx="{B.DAO[0]-7}" cy="{B.DAO[1]-8}" rx="7" ry="4" fill="#fff" opacity=".4"/></g>
<g id="s-pv" data-s="pv"><path class="vo" d="{B.RPV}"/><path class="vo" d="{B.LPV}"/><path class="vm" d="{B.RPV}"/><path class="vm" d="{B.LPV}"/><path class="vh" d="{B.RPV}" transform="translate(-3 -2)"/><path class="vh" d="{B.LPV}" transform="translate(-3 -2)"/></g>
</g>''')
    o.append(f'''<g id="layer-myocardium" filter="url(#f-soft)"><path id="s-myo" class="myo" d="{B.OUTLINE}"/></g>
<g id="layer-myo-texture"><path class="fibr" d="{B.OUTLINE}"/></g>
<g id="layer-cavities">
<path id="s-rv" data-s="rv" class="cav cavr" d="{RV_C}"/>
<path id="s-lv" data-s="lv" class="cav cavl" d="{LV_C}"/>
<path id="s-ra" data-s="ra" class="cav cavr" d="{B.RA}"/>
<path id="s-la" data-s="la" class="cav cavl" d="{B.LA}"/>
</g>
<g id="layer-cavity-shading"><path class="ish" clip-path="url(#c-rv)" d="{RV_C}"/><path class="ishl" clip-path="url(#c-lv)" d="{LV_C}"/><path class="ish" clip-path="url(#c-ra)" d="{B.RA}"/><path class="ishl" clip-path="url(#c-la)" d="{B.LA}"/>
<path class="sheen" d="{RV_C} {LV_C} {B.RA} {B.LA}"/></g>
<g id="layer-endocardium"><path class="endo2" d="{RV_E} {LV_E}"/></g>
<g id="layer-ra-morphology"><g id="s-pect">{"".join(bundle(d, w) for d, w in RA_PECT)}</g></g>
<g id="layer-veins-lumen"><path class="vi" d="{B.RPV_L}"/><path class="vi" d="{B.LPV_L}"/></g>''')
    o.append(f'''<g id="layer-ventricular-septum">
<path id="s-ivs" data-s="ivs" class="sep" d="{B.IVS}"/><path class="fibr" d="{B.IVS}"/>
</g>''')
    trab = "".join(bundle(d, w) for d, w in [("M 284,262 Q 300,262 318,272", 5), ("M 306,232 Q 322,236 336,250", 5.5),
        ("M 338,202 Q 350,210 360,226", 5), ("M 374,178 Q 382,190 388,204", 4.5), ("M 410,160 Q 414,174 420,186", 4.5),
        ("M 446,150 Q 450,164 456,174", 4), ("M 478,200 Q 468,206 460,216", 4)])
    o.append(f'''<g id="layer-rv-morphology">
<g id="s-trab" data-s="trab">{trab}{bundle("M 318,272 Q 330,256 336,250 Q 350,236 360,226 Q 376,212 388,204", 2.6)}</g>
<path id="s-apm" class="pm" d="M 266,286 C 286,284 312,294 325,309 C 329,316 323,323 314,323 C 298,323 282,325 266,330 Z"/>
<g id="s-mb" data-s="mb">{bundle(B.MB, 9)}</g>
</g>
<g id="layer-lv-morphology">
<path id="s-lvpm" class="pm" d="M 638,246 C 624,250 604,274 598,294 C 595,303 601,309 610,309 C 620,309 630,314 638,324 Z"/>
</g>''')
    o.append(f'''<g id="layer-atrial-septum">
<g id="s-ias" data-s="ias"><path class="sep" d="{B.IAS_PRIMUM}"/><path class="sep" d="{B.IAS_SECUNDUM}"/></g>
<path id="s-fo" data-s="fo" class="cav fo" d="{B.FO_GAP}"/>
<g id="s-flap" data-s="flap"><path class="flape" d="{B.FO_FLAP}"/><path class="flap" d="{B.FO_FLAP}"/></g>
</g>''')
    tvch = "".join(tline(a, b, "che") + tline(a, b, "ch") for a, b in B.TV_CH)
    mvch = "".join(tline(a, b, "che") + tline(a, b, "ch") for a, b in B.MV_CH)
    o.append(f'''<g id="layer-crux">
<path id="s-avs" data-s="avs" class="avs" d="{B.AVS}"/>
<path id="s-cfb" data-s="cfb" class="fib" d="{B.CFB}"/>
<g id="s-crux" data-s="crux"><circle cx="460" cy="392" r="15" fill="none" stroke="#2b1a1a" stroke-width="1.4" stroke-dasharray="2 2"/></g>
</g>
<g id="layer-av-valves">
<g id="s-tv" data-s="tv">{tvch}{leaflet(B.TV_SEPT)}{leaflet(B.TV_ANT)}</g>
<g id="s-mv" data-s="mv">{mvch}{leaflet(B.MV_ANT)}{leaflet(B.MV_POST)}</g>
</g>
<g id="layer-annotations">
<g id="s-offset" data-s="offset">
<line class="and" x1="432" y1="360" x2="512" y2="360"/>
<line class="and" x1="456" y1="386" x2="512" y2="386"/>
<line class="an" x1="505" y1="364" x2="505" y2="382"/>
<path class="anf" d="M 505,360 L 500.5,368 L 509.5,368 Z"/>
<path class="anf" d="M 505,386 L 500.5,378 L 509.5,378 Z"/>
</g>
</g>
<g id="layer-labels">
{markers()}
</g>
</g>''')
    o.append(f'''<g id="layer-orientation">
<text class="om" x="24" y="{H4 - 48}">Верхушка — вверху (кпереди), предсердия — внизу (кзади); правые отделы — слева, левые — справа.</text>
<text class="om" x="24" y="{H4 - 28}">Синий — правые отделы, красный — левые и лёгочные вены. Номера структур — в легенде ниже.</text>
<text class="om" x="24" y="{H4 - 8}">Анатомическая схема, не УЗ-изображение; пропорции условны. © FetalCardio, оригинальный рисунок.</text>
</g>
</svg>''')
    return "\n".join(o)

if __name__ == "__main__":
    open(sys.argv[1], "w", encoding="utf-8").write(build())
