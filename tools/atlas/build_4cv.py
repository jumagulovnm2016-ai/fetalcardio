"""Генератор atlas/4cv-normal.svg — версия 3: объёмный стиль + анатомическое окружение.
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

def build():
    o = []
    o.append(f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" role="img" aria-labelledby="t4cv d4cv" font-family="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" data-status="draft">
<title id="t4cv">Четырёхкамерный срез сердца плода — анатомическая схема нормы (DRAFT)</title>
<desc id="d4cv">Оригинальная учебная схема FetalCardio. Анатомический рисунок, не УЗ-изображение. Апикальная ориентация: верхушка вверху (кпереди, к передней грудной стенке), предсердия внизу (кзади, к позвоночнику); правые отделы слева, левые справа. Показаны лёгкие, рёбра, позвоночник и нисходящая аорта. Пропорции и толщины условны. Статус: DRAFT / REQUIRES EXPERT REVIEW.</desc>
<metadata>{{"app":"FetalCardio","id":"4cv-normal","status":"draft","review":"REQUIRES EXPERT REVIEW","author":"Жумагулов Н.М.","created":"2026-11-11","version":3}}</metadata>
<defs>
<radialGradient id="g-myo" gradientUnits="userSpaceOnUse" cx="420" cy="250" r="420">
  <stop offset="0" stop-color="#f4c3b1"/><stop offset=".55" stop-color="#e0a08b"/><stop offset="1" stop-color="#c47a66"/>
</radialGradient>
<radialGradient id="g-cav" gradientUnits="userSpaceOnUse" cx="450" cy="330" r="330">
  <stop offset="0" stop-color="#fcebe4"/><stop offset=".7" stop-color="#f4d5c9"/><stop offset="1" stop-color="#ebc0b1"/>
</radialGradient>
<radialGradient id="g-ao" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#f08a8a"/><stop offset="1" stop-color="#b8394a"/></radialGradient>
<filter id="f-soft" x="-10%" y="-10%" width="120%" height="125%"><feDropShadow dx="0" dy="5" stdDeviation="7" flood-color="#7a3a2c" flood-opacity=".22"/></filter>
<filter id="f-blur" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="2.2"/></filter>
<filter id="f-ish" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="5"/></filter>
<clipPath id="c-col"><rect x="{(B.LX + 6 - DX) / S:.1f}" y="{(62 - DY) / S:.1f}" width="{(B.RX - B.LX - 12) / S:.1f}" height="{(H - 150 - 62) / S:.1f}" rx="20"/></clipPath>
<clipPath id="c-rv"><path d="{RV_C}"/></clipPath><clipPath id="c-lv"><path d="{LV_C}"/></clipPath><clipPath id="c-ra"><path d="{B.RA}"/></clipPath><clipPath id="c-la"><path d="{B.LA}"/></clipPath>
</defs>
<style>
.bg{{fill:var(--sv-bg,#ffffff)}}
.myo{{fill:url(#g-myo);stroke:#a65c4a;stroke-width:2.2}}
.thw{{fill:var(--sv-organ,#f2e3d3);stroke:var(--sv-wall-edge,#a8606d);stroke-width:2;opacity:.75}}
.lung{{fill:var(--sv-air,#e8eefb)}}
.rib{{fill:var(--sv-bone,#cdd5e0);stroke:var(--sv-wall-edge,#a8606d);stroke-width:.8;opacity:.9}}
.vb{{fill:var(--sv-bone,#cdd5e0);stroke:var(--sv-wall-edge,#a8606d);stroke-width:1}}
.vbc{{fill:var(--sv-bone,#cdd5e0)}}
.lam{{stroke:var(--sv-bone,#cdd5e0);stroke-width:9;stroke-linecap:round;fill:none}}
.pcd{{fill:none;stroke:#a65c4a;stroke-width:1.3;stroke-dasharray:5 4;opacity:.7}}
.cx{{fill:var(--sv-text,#101828);font-size:12.5px;opacity:.6;font-style:italic}}
.cav{{fill:url(#g-cav);stroke:url(#g-cav);stroke-width:.8}}
.endo{{fill:none;stroke:#a85a48;stroke-width:3.2;stroke-linejoin:round;opacity:.0}}
.ish{{fill:none;stroke:#9c4f3e;stroke-width:16;opacity:.33;filter:url(#f-ish)}}
.endo2{{fill:none;stroke:#b4644f;stroke-width:1.1;stroke-linejoin:round;opacity:.75}}
.sep{{fill:url(#g-myo)}}
.tje{{stroke:#a65c4a;fill:none;stroke-linecap:round}}
.tj{{stroke:#dc977f;fill:none;stroke-linecap:round}}
.tjh{{stroke:#f6cbbb;fill:none;stroke-linecap:round;opacity:.8}}
.pm{{fill:url(#g-myo);stroke:#a65c4a;stroke-width:1.6}}
.lfe{{stroke:#b48a73;fill:none;stroke-width:7;stroke-linecap:round}}
.lf{{stroke:#fff8f1;fill:none;stroke-width:4.4;stroke-linecap:round}}
.ch{{stroke:#c99a85;stroke-width:1.15}}
.che{{stroke:#fff6ee;stroke-width:2.4;opacity:.7}}
.flap{{stroke:#fff3ea;fill:none;stroke-width:3.2;stroke-linecap:round}}
.flape{{stroke:#a65c4a;fill:none;stroke-width:5.4;stroke-linecap:round}}
.fib{{fill:#fbf6ee;stroke:#a88468;stroke-width:1.2}}
.avs{{fill:var(--sv-accent-soft,rgba(224,138,0,.28));stroke:var(--sv-accent,#c26a00);stroke-width:1.2;stroke-dasharray:3 2}}
.vo{{stroke:#a98fbd;fill:none;stroke-width:18;stroke-linecap:round}}
.vm{{stroke:#d8c8e4;fill:none;stroke-width:14;stroke-linecap:round}}
.vi{{stroke:#f4d5c9;fill:none;stroke-width:8;stroke-linecap:round}}
.ao{{fill:url(#g-ao);stroke:#9c2c3c;stroke-width:1.4}}
.an{{stroke:var(--sv-accent,#c26a00);stroke-width:1.6;fill:none}}
.and{{stroke:var(--sv-accent,#c26a00);stroke-width:1.4;fill:none;stroke-dasharray:4 3}}
.anf{{fill:var(--sv-accent,#c26a00)}}
.ld{{stroke:var(--sv-text,#101828);stroke-width:1;fill:none;opacity:.55}}
.ad{{fill:var(--sv-text,#101828);stroke:var(--sv-halo,#ffffff);stroke-width:1.5}}
.nb{{fill:var(--sv-text,#101828)}}
.nb0{{opacity:.45}}
.nt{{fill:var(--sv-halo,#ffffff);font-size:13px;font-weight:700}}
.l1{{fill:var(--sv-text,#101828);font-size:18px;font-weight:600}}
.l2{{fill:var(--sv-text,#101828);font-size:14.5px;opacity:.8}}
.l3{{fill:var(--sv-text,#101828);font-size:14px;opacity:.62;font-style:italic}}
.hd{{fill:var(--sv-text,#101828);font-size:24px;font-weight:700}}
.sh{{fill:var(--sv-text,#101828);font-size:15px;font-weight:700;letter-spacing:.06em;opacity:.55}}
.om{{fill:var(--sv-text,#101828);font-size:15px;opacity:.7}}
.dr{{fill:none;stroke:var(--sv-draft,#c0392b);stroke-width:1.5}}
.drt{{fill:var(--sv-draft,#c0392b);font-size:15px;font-weight:700;letter-spacing:.04em}}
</style>
<rect class="bg" x="0" y="0" width="{W}" height="{H}"/>
<g id="layer-header">
<text class="hd" x="24" y="38">Четырёхкамерный срез (4CV): анатомическая схема нормы</text>
<rect class="dr" x="{W-360}" y="16" width="336" height="34" rx="7"/>
<text class="drt" x="{W-192}" y="38.5" text-anchor="middle">DRAFT · REQUIRES EXPERT REVIEW</text>
<text class="sh" x="{B.LX-30}" y="96" text-anchor="end">ПРАВЫЕ ОТДЕЛЫ</text>
<text class="sh" x="{B.RX+30}" y="96">ЛЕВЫЕ ОТДЕЛЫ</text>
</g>
<g id="heart" transform="translate({DX},{DY}) scale({S})">''')
    o.append(thorax())
    # сосуды позади сердца
    o.append(f'''<g id="layer-veins">
<g id="s-dao" data-s="dao"><circle class="ao" cx="{B.DAO[0]}" cy="{B.DAO[1]}" r="{B.DAO[2]}"/><ellipse cx="{B.DAO[0]-6}" cy="{B.DAO[1]-8}" rx="7" ry="4" fill="#fff" opacity=".35"/></g>
<g id="s-pv" data-s="pv"><path class="vo" d="{B.RPV}"/><path class="vo" d="{B.LPV}"/><path class="vm" d="{B.RPV}"/><path class="vm" d="{B.LPV}"/><path class="vi" d="{B.RPV}"/><path class="vi" d="{B.LPV}"/></g>
</g>''')
    o.append(f'''<g id="layer-myocardium" filter="url(#f-soft)"><path id="s-myo" class="myo" d="{B.OUTLINE}"/></g>
<g id="layer-cavities">
<path id="s-rv" data-s="rv" class="cav" d="{RV_C}"/>
<path id="s-lv" data-s="lv" class="cav" d="{LV_C}"/>
<path id="s-ra" data-s="ra" class="cav" d="{B.RA}"/>
<path id="s-la" data-s="la" class="cav" d="{B.LA}"/>
</g>
<g id="layer-cavity-shading"><path class="ish" clip-path="url(#c-rv)" d="{RV_C}"/><path class="ish" clip-path="url(#c-lv)" d="{LV_C}"/><path class="ish" clip-path="url(#c-ra)" d="{B.RA}"/><path class="ish" clip-path="url(#c-la)" d="{B.LA}"/></g>
<g id="layer-endocardium"><path class="endo" d="{RV_E} {LV_E} {RA_E} {LA_E}"/><path class="endo2" d="{RV_E} {LV_E}"/></g>
<g id="layer-ra-morphology"><g id="s-pect">{"".join(bundle(d, w) for d, w in RA_PECT)}</g></g>
<g id="layer-veins-lumen"><path class="vi" d="{B.RPV_L}"/><path class="vi" d="{B.LPV_L}"/></g>''')
    o.append(f'''<g id="layer-ventricular-septum">
<path id="s-ivs" data-s="ivs" class="sep" d="{B.IVS}"/>
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
<path id="s-fo" data-s="fo" class="cav" d="{B.FO_GAP}"/>
<g id="s-flap" data-s="flap"><path class="flape" d="{B.FO_FLAP}"/><path class="flap" d="{B.FO_FLAP}"/></g>
</g>''')
    tvch = "".join(tline(a, b, "che") + tline(a, b, "ch") for a, b in B.TV_CH)
    mvch = "".join(tline(a, b, "che") + tline(a, b, "ch") for a, b in B.MV_CH)
    o.append(f'''<g id="layer-crux">
<path id="s-avs" data-s="avs" class="avs" d="{B.AVS}"/>
<path id="s-cfb" data-s="cfb" class="fib" d="{B.CFB}"/>
<g id="s-crux" data-s="crux"><circle cx="460" cy="392" r="15" fill="none" stroke="var(--sv-accent,#c26a00)" stroke-width="1.4" stroke-dasharray="2 2"/></g>
</g>
<g id="layer-av-valves">
<g id="s-tv" data-s="tv">{tvch}{leaflet(B.TV_SEPT)}{leaflet(B.TV_ANT)}</g>
<g id="s-mv" data-s="mv">{mvch}{leaflet(B.MV_ANT)}{leaflet(B.MV_POST)}</g>
</g>''')
    o.append(f'''<g id="layer-annotations">
<g id="s-context"><text class="cx" x="{TH[0] - 236}" y="{TH[1] - 150}">лёгкое</text><text class="cx" x="{TH[0] + 200}" y="{TH[1] - 150}">лёгкое</text>
<text class="cx" x="{SPINE[0] + 48}" y="{SPINE[1] + 8}">позвоночник</text><text class="cx" x="{TH[0] - 34}" y="{TH[1] - TH[3] + 40}">грудная стенка</text></g>
<g id="s-offset" data-s="offset">
<line class="and" x1="440" y1="360" x2="506" y2="360"/>
<line class="and" x1="462" y1="386" x2="506" y2="386"/>
<line class="an" x1="499" y1="364" x2="499" y2="382"/>
<path class="anf" d="M 499,361 L 495,368 L 503,368 Z"/>
<path class="anf" d="M 499,385 L 495,378 L 503,378 Z"/>
</g>
</g>
</g>''')
    left = [l for l in B.LABELS if l[6] == "L"]; right = [l for l in B.LABELS if l[6] == "R"]
    o.append('<g id="layer-labels">')
    for it, y in B.layout(left, 150, H - 112): o.append(B.label_svg(it, round(y), "L"))
    for it, y in B.layout(right, 150, H - 112): o.append(B.label_svg(it, round(y), "R"))
    o.append('</g>')
    o.append(f'''<g id="layer-orientation">
<text class="om" x="24" y="{H - 44}">Ориентация: верхушка — вверху (кпереди), предсердия — внизу (кзади, к позвоночнику); правые отделы — слева, левые — справа.</text>
<text class="om" x="24" y="{H - 18}">Анатомическая схема, не УЗ-изображение. Клапаны закрыты; пропорции, толщины и величина смещения условны. © FetalCardio, оригинальный рисунок.</text>
</g>
</svg>''')
    return "\n".join(o)

if __name__ == "__main__":
    open(sys.argv[1], "w", encoding="utf-8").write(build())
