"""Геометрия и подписи схемы 4CV (база для tools/atlas/build_4cv.py)."""
import sys

S = 1.2          # масштаб сердца
DX, DY = 660 - 450 * S, 92 - 80 * S
W, H = 1320, 1030
LX, RX = 372, 948  # края колонок подписей

def P(x, y):
    return (round(x * S + DX, 1), round(y * S + DY, 1))

# ---------------- геометрия (координаты сердца) ----------------
OUTLINE = ("M 512,88 C 610,100 656,200 656,300 C 657,352 646,380 632,394 "
           "C 658,428 664,505 646,552 C 622,602 540,620 452,610 "
           "C 380,622 300,616 270,590 C 232,560 226,460 262,404 "
           "C 248,384 244,352 248,320 C 256,240 340,170 432,134 "
           "C 466,120 488,96 512,88 Z")

LV = ("M 468,386 L 503,136 Q 508,112 528,114 C 594,128 634,206 636,298 "
      "C 637,344 628,372 614,388 Z")
RV = ("M 448,360 L 478,160 C 474,146 458,142 440,150 C 360,190 276,250 268,320 "
      "C 265,356 272,384 284,400 Z")
RA = ("M 284,400 L 448,360 L 452,394 L 446,592 C 400,606 322,604 288,578 "
      "C 252,548 246,462 284,400 Z")
LA = ("M 468,386 L 614,388 C 642,420 648,500 630,548 C 610,590 540,604 454,592 "
      "L 462,394 Z")

IVS = "M 448,360 L 478,160 Q 490,138 503,136 L 471.7,360 Z"
AVS = "M 448,360 L 471.7,360 L 468,386 L 462,394 L 452,394 Z"
CFB = "M 452,389 L 460,381 L 468,389 L 460,398 Z"
IAS_PRIMUM = "M 452,394 L 462,394 L 458.8,472 L 449.6,472 Z"
IAS_SECUNDUM = "M 448.4,514 L 457.2,514 L 454,592 L 446,592 Z"
FO_GAP = "M 447.6,471 L 460.8,471 L 459.2,515 L 446.4,515 Z"
FO_FLAP = "M 459,472 C 492,480 497,518 469,534"

TRAB = [((270, 282), (296, 278)), ((280, 256), (304, 258)), ((296, 232), (318, 238)),
        ((318, 210), (336, 222)), ((344, 190), (358, 206)), ((372, 172), (382, 190)),
        ((402, 158), (408, 176)), ((428, 150), (432, 168)), ((452, 148), (454, 166)),
        ((476, 186), (464, 190)), ((473, 208), (462, 212))]
TRAB_NET = ("M 296,278 Q 306,268 304,258 M 304,258 Q 314,248 318,238 "
            "M 318,238 Q 330,230 336,222 M 336,222 Q 348,214 358,206 "
            "M 358,206 Q 372,198 382,190 M 382,190 Q 396,182 408,176 "
            "M 408,176 Q 420,172 432,168 M 432,168 Q 444,168 454,166")
APM = "M 268,296 C 284,296 314,300 320,314 C 300,320 282,320 268,322 Z"
MB = "M 467,236 Q 380,262 296,304"
LV_TRAB = [((536, 120), (538, 134)), ((566, 130), (560, 142)), ((590, 146), (580, 154))]
LV_PM = "M 637,254 C 624,262 610,284 604,300 C 614,306 628,312 637,318 Z"

TV_SEPT = "M 448,360 Q 410,350 372,352"
TV_ANT = "M 284,400 Q 330,372 372,352"
TV_CH = [((432, 355), (452.5, 330)), ((410, 353), (454.3, 318)), ((392, 352), (456, 306)),
         ((330, 376), (318, 316)), ((350, 364), (320, 314))]
MV_ANT = "M 468,386 Q 505,370 544,364"
MV_POST = "M 614,388 Q 582,370 546,365"
MV_CH = [((508, 371), (600, 298)), ((528, 366), (601, 300)), ((568, 368), (603, 302)),
         ((592, 376), (606, 304))]

RPV = "M 372,724 C 410,690 470,646 488,606"
RPV_L = "M 486,616 L 490,584"
LPV = "M 672,712 C 662,670 642,626 624,600"
LPV_L = "M 628,608 L 602,570"
DAO = (562, 676, 21)

# ---------------- подписи ----------------
# (номер, ключ, название, обозначение, пояснение, якоря (в координатах сердца), сторона)
LABELS = [
    (7,  "rv",    "Правый желудочек", "(RV)", "грубые трабекулы, укороченная верхушка", [(372, 290)], "L"),
    (10, "trab",  "Трабекулы ПЖ", "(RV trabeculations)", None, [(330, 224)], "L"),
    (11, "mb",    "Модераторный пучок", "(moderator band)", "от МЖП к передней сосочковой мышце", [(390, 266)], "L"),
    (12, "tv",    "Трёхстворчатый клапан", "(TV)", "септальная и передняя створки", [(352, 360)], "L"),
    (15, "avs",   "Атриовентрикулярная перегородка", "(AV septum)", "разделяет ПП и ЛЖ", [(455, 376)], "L"),
    (1,  "ra",    "Правое предсердие", "(RA)", None, [(296, 566)], "L", 550),
    (4,  "fo",    "Овальное окно", "(foramen ovale)", "отверстие в перегородке, не дефект", [(453, 494)], "L"),
    (3,  "ias",   "Межпредсердная перегородка", "(IAS)", None, [(450, 556)], "L"),
    (16, "cfb",   "Центральное фиброзное тело", "(central fibrous body)", None, [(460, 389)], "L"),

    (8,  "lv",    "Левый желудочек", "(LV)", "формирует верхушку, гладкая МЖП", [(570, 240)], "R"),
    (9,  "ivs",   "Межжелудочковая перегородка", "(IVS)", "от верхушки до AV-соединения", [(484, 250)], "R"),
    (13, "mv",    "Митральный клапан", "(MV)", "передняя и задняя створки", [(560, 368)], "R"),
    (14, "offset","Смещение мест прикрепления", "(AV valve offset)", "ТК ближе к верхушке, чем МК", [(497, 373)], "R"),
    (17, "crux",  "Крест сердца", "(crux cordis)", "соединение перегородок и AV-колец", [(462, 400)], "R"),
    (5,  "flap",  "Клапан овального окна", "(septum primum)", "открывается в ЛП", [(487, 506)], "R"),
    (2,  "la",    "Левое предсердие", "(LA)", None, [(566, 470)], "R"),
    (6,  "pv",    "Лёгочные вены → ЛП", "(pulmonary veins)", None, [(480, 632), (650, 642)], "R"),
    (0,  "dao",   "Нисходящая аорта", "(DAo) — ориентир", None, [(DAO[0] + 14, DAO[1] + 8)], "R"),
]

LH = 72  # высота блока подписи

def layout(items, top, bottom):
    """Подписи по порядку якорей; минимальный шаг LH; в пределах [top, bottom]."""
    key = lambda it: P(0, it[7])[1] if len(it) > 7 else P(*it[5][0])[1]
    items = sorted(items, key=key)
    ys = [key(it) for it in items]
    n = len(ys)
    # прямой проход
    for i in range(n):
        ys[i] = max(ys[i], top if i == 0 else ys[i - 1] + LH)
    # обратный проход
    ys[-1] = min(ys[-1], bottom)
    for i in range(n - 2, -1, -1):
        ys[i] = min(ys[i], ys[i + 1] - LH)
    ys[0] = max(ys[0], top)
    for i in range(1, n):
        ys[i] = max(ys[i], ys[i - 1] + LH)
    return list(zip(items, ys))

def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")

def label_svg(it, y, side):
    num, key, name, abbr, note, anchors = it[:6]
    lines = []
    tx = LX - 30 if side == "L" else RX + 30
    anchor = "end" if side == "L" else "start"
    bx = tx + 24 if side == "L" else tx - 24   # кружок с номером
    lines.append(f'<g id="lbl-{key}" class="lbl" data-s="{key}">')
    # выноски
    for (ax, ay) in anchors:
        X, Y = P(ax, ay)
        ex = bx + (14 if side == "L" else -14)
        mid = ex + (18 if side == "L" else -18)
        lines.append(f'<path class="ld" d="M {ex},{y} L {mid},{y} L {X},{Y}"/>')
        lines.append(f'<circle class="ad" cx="{X}" cy="{Y}" r="3.6"/>')
    if num:
        lines.append(f'<circle class="nb" cx="{bx}" cy="{y}" r="12.5"/>')
        lines.append(f'<text class="nt" x="{bx}" y="{y + 4.5}" text-anchor="middle">{num}</text>')
    else:
        lines.append(f'<circle class="nb nb0" cx="{bx}" cy="{y}" r="12.5"/>')
        lines.append(f'<text class="nt" x="{bx}" y="{y + 4.5}" text-anchor="middle">•</text>')
    lines.append(f'<text class="l1" x="{tx}" y="{y - 5}" text-anchor="{anchor}">{esc(name)}</text>')
    sub = abbr + ((" · " + note) if note else "")
    if len(sub) > 40 and note:
        lines.append(f'<text class="l2" x="{tx}" y="{y + 15}" text-anchor="{anchor}">{esc(abbr)}</text>')
        lines.append(f'<text class="l3" x="{tx}" y="{y + 32}" text-anchor="{anchor}">{esc(note)}</text>')
    else:
        lines.append(f'<text class="l2" x="{tx}" y="{y + 15}" text-anchor="{anchor}">{esc(abbr)}</text>')
        if note:
            lines.append(f'<text class="l3" x="{tx}" y="{y + 32}" text-anchor="{anchor}">{esc(note)}</text>')
    lines.append("</g>")
    return "\n".join(lines)

def line(a, b, cls):
    return f'<line class="{cls}" x1="{a[0]}" y1="{a[1]}" x2="{b[0]}" y2="{b[1]}"/>'

def build():
    o = []
    o.append(f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" role="img" aria-labelledby="t4cv d4cv" font-family="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" data-status="draft">
<title id="t4cv">Четырёхкамерный срез сердца плода — анатомическая схема нормы (DRAFT)</title>
<desc id="d4cv">Оригинальная учебная схема FetalCardio. Анатомический рисунок, не УЗ-изображение. Апикальная ориентация: верхушка вверху (кпереди), предсердия внизу (кзади); правые отделы слева, левые справа. Пропорции и толщины условны. Статус: DRAFT / REQUIRES EXPERT REVIEW.</desc>
<metadata>{{"app":"FetalCardio","id":"4cv-normal","status":"draft","review":"REQUIRES EXPERT REVIEW","author":"Жумагулов Н.М.","created":"2026-11-11"}}</metadata>
<style>
.bg{{fill:var(--sv-bg,#ffffff)}}
.myo{{fill:var(--sv-wall,#d3909a);stroke:var(--sv-wall-edge,#a8606d);stroke-width:2}}
.cav{{fill:var(--sv-chamber,#f8e8ea);stroke:var(--sv-chamber,#f8e8ea);stroke-width:.8}}
.sep{{fill:var(--sv-wall,#d3909a)}}
.mus{{stroke:var(--sv-wall,#d3909a);fill:none;stroke-linecap:round}}
.musf{{fill:var(--sv-wall,#d3909a)}}
.net{{stroke:var(--sv-wall,#d3909a);fill:none;stroke-width:2.2;stroke-linecap:round}}
.vl{{stroke:var(--sv-valve,#7a4b12);fill:none;stroke-width:4;stroke-linecap:round}}
.ch{{stroke:var(--sv-valve,#7a4b12);stroke-width:1.2;opacity:.75}}
.fib{{fill:var(--sv-fibrous,#f3efe6);stroke:var(--sv-valve,#7a4b12);stroke-width:1.2}}
.avs{{fill:var(--sv-accent-soft,rgba(224,138,0,.28));stroke:var(--sv-accent,#c26a00);stroke-width:1.2;stroke-dasharray:3 2}}
.vo{{stroke:var(--sv-vein,#8250c4);fill:none;stroke-width:17;stroke-linecap:round}}
.vi{{stroke:var(--sv-chamber,#f8e8ea);fill:none;stroke-width:8;stroke-linecap:round}}
.ao{{fill:var(--sv-ao,#d6334a)}}
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
<text class="sh" x="{LX-30}" y="96" text-anchor="end">ПРАВЫЕ ОТДЕЛЫ</text>
<text class="sh" x="{RX+30}" y="96">ЛЕВЫЕ ОТДЕЛЫ</text>
</g>
<g id="heart" transform="translate({DX},{DY}) scale({S})">''')

    # вены и аорта — позади сердца
    o.append(f'''<g id="layer-veins">
<g id="s-dao" data-s="dao"><circle class="ao" cx="{DAO[0]}" cy="{DAO[1]}" r="{DAO[2]}"/></g>
<g id="s-pv" data-s="pv"><path class="vo" d="{RPV}"/><path class="vo" d="{LPV}"/><path class="vi" d="{RPV}"/><path class="vi" d="{LPV}"/></g>
</g>''')
    o.append(f'''<g id="layer-myocardium"><path id="s-myo" class="myo" d="{OUTLINE}"/></g>
<g id="layer-cavities">
<path id="s-rv" data-s="rv" class="cav" d="{RV}"/>
<path id="s-lv" data-s="lv" class="cav" d="{LV}"/>
<path id="s-ra" data-s="ra" class="cav" d="{RA}"/>
<path id="s-la" data-s="la" class="cav" d="{LA}"/>
</g>
<g id="layer-veins-lumen"><path class="vi" d="{RPV_L}"/><path class="vi" d="{LPV_L}"/></g>''')
    o.append(f'''<g id="layer-ventricular-septum">
<path id="s-ivs" data-s="ivs" class="sep" d="{IVS}"/>
</g>''')
    trab = "".join(line(a, b, "mus") for a, b in TRAB)
    lvtr = "".join(line(a, b, "mus") for a, b in LV_TRAB)
    o.append(f'''<g id="layer-rv-morphology">
<g id="s-trab" data-s="trab" style="stroke-width:6">{trab.replace('class="mus"', 'class="mus" stroke-width="8"')}<path class="net" d="{TRAB_NET}"/></g>
<path id="s-apm" class="musf" d="{APM}"/>
<path id="s-mb" data-s="mb" class="mus" stroke-width="10" d="{MB}"/>
</g>
<g id="layer-lv-morphology">
<g id="s-lvtrab">{lvtr.replace('class="mus"', 'class="mus" stroke-width="3"')}</g>
<path id="s-lvpm" class="musf" d="{LV_PM}"/>
</g>''')
    o.append(f'''<g id="layer-atrial-septum">
<g id="s-ias" data-s="ias"><path class="sep" d="{IAS_PRIMUM}"/><path class="sep" d="{IAS_SECUNDUM}"/></g>
<path id="s-fo" data-s="fo" class="cav" d="{FO_GAP}"/>
<path id="s-flap" data-s="flap" class="vl" style="stroke:var(--sv-wall-edge,#a8606d);stroke-width:3.2" d="{FO_FLAP}"/>
</g>''')
    tvch = "".join(line(a, b, "ch") for a, b in TV_CH)
    mvch = "".join(line(a, b, "ch") for a, b in MV_CH)
    o.append(f'''<g id="layer-crux">
<path id="s-avs" data-s="avs" class="avs" d="{AVS}"/>
<path id="s-cfb" data-s="cfb" class="fib" d="{CFB}"/>
<g id="s-crux" data-s="crux"><circle cx="460" cy="392" r="15" fill="none" stroke="var(--sv-accent,#c26a00)" stroke-width="1.4" stroke-dasharray="2 2"/></g>
</g>
<g id="layer-av-valves">
<g id="s-tv" data-s="tv">{tvch}<path class="vl" d="{TV_SEPT}"/><path class="vl" d="{TV_ANT}"/></g>
<g id="s-mv" data-s="mv">{mvch}<path class="vl" d="{MV_ANT}"/><path class="vl" d="{MV_POST}"/></g>
</g>''')
    # аннотация смещения
    o.append('''<g id="layer-annotations">
<g id="s-offset" data-s="offset">
<line class="and" x1="440" y1="360" x2="506" y2="360"/>
<line class="and" x1="462" y1="386" x2="506" y2="386"/>
<line class="an" x1="499" y1="364" x2="499" y2="382"/>
<path class="anf" d="M 499,361 L 495,368 L 503,368 Z"/>
<path class="anf" d="M 499,385 L 495,378 L 503,378 Z"/>
</g>
</g>
</g>''')

    # подписи
    left = [l for l in LABELS if l[6] == "L"]
    right = [l for l in LABELS if l[6] == "R"]
    o.append('<g id="layer-labels">')
    for it, y in layout(left, 150, H - 112):
        o.append(label_svg(it, round(y), "L"))
    for it, y in layout(right, 150, H - 112):
        o.append(label_svg(it, round(y), "R"))
    o.append('</g>')

    o.append(f'''<g id="layer-orientation">
<text class="om" x="24" y="{H - 44}">Ориентация: верхушка — вверху (кпереди), предсердия — внизу (кзади, к позвоночнику); правые отделы — слева, левые — справа.</text>
<text class="om" x="24" y="{H - 18}">Анатомическая схема, не УЗ-изображение. Клапаны закрыты; пропорции, толщины и величина смещения условны. © FetalCardio, оригинальный рисунок.</text>
</g>
</svg>''')
    return "\n".join(o)

if __name__ == "__main__":
    open(sys.argv[1], "w", encoding="utf-8").write(build())
