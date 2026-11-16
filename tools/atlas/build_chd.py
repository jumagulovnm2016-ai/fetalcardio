"""Генератор схем пороков (ВПС) для атласа FetalCardio — на основе схем нормы.

Стиль, слои и система номеров — как в build_4cv.py / build_views.py / build_vsd.py.
Каждая функция возвращает (svg, M), где M — список меток (номер, ключ, название, обозначение, x, y);
легенда (structures) в data/anatomy.js должна совпадать с M.
Все схемы — черновики (status draft) до проверки автором.

Запуск:  cd tools/atlas && python3 build_chd.py ../../atlas
"""
import sys, os, re
import build_4cv as A
import build_vsd as V
import build_views as BV
import lvot_geom as G0

B = A.B
CREATED = "2026-11-16"
esc, mark, bundle, leaflet, tube, vcirc = V.esc, V.mark, A.bundle, A.leaflet, BV.tube, BV.vcirc
labels, flow_arrows = BV.labels, BV.flow_arrows
TCX, TCY, TRX, TRY, SPX, SPY = BV.TCX, BV.TCY, BV.TRX, BV.TRY, BV.SPX, BV.SPY

CHD_STYLE = """
<defs>
<linearGradient id="g-mix" x1="0" x2="1"><stop offset="0" stop-color="#2452b8"/><stop offset=".5" stop-color="#7a3a8c"/><stop offset="1" stop-color="#c41d22"/></linearGradient>
<radialGradient id="g-mixr" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#b678c8"/><stop offset=".6" stop-color="#7a3a8c"/><stop offset="1" stop-color="#4a1d5a"/></radialGradient>
<radialGradient id="g-efe" cx=".5" cy=".5" r=".6"><stop offset="0" stop-color="#e2483f"/><stop offset=".7" stop-color="#b3161c"/><stop offset="1" stop-color="#fff3e8"/></radialGradient>
<radialGradient id="g-atr" gradientUnits="userSpaceOnUse" cx="360" cy="330" r="120"><stop offset="0" stop-color="#8fb0f0"/><stop offset="1" stop-color="#4a72cc"/></radialGradient>
<radialGradient id="g-rb" cx=".55" cy=".6" r=".7"><stop offset="0" stop-color="#4f7fe0"/><stop offset=".6" stop-color="#2452b8"/><stop offset="1" stop-color="#143584"/></radialGradient>
<radialGradient id="g-rr" cx=".45" cy=".55" r=".7"><stop offset="0" stop-color="#ec5a4c"/><stop offset=".6" stop-color="#c41d22"/><stop offset="1" stop-color="#8f1016"/></radialGradient>
</defs>
<style>
.vsd{fill:url(#g-mix);stroke:none}
.rim{stroke:#2b1a1a;stroke-width:2.2;fill:none;stroke-linecap:round}
.flow{stroke:#ffffff;stroke-width:2.2;fill:none;stroke-linecap:round;opacity:.9}
.flowh{fill:#ffffff;opacity:.9}
.flw{stroke:#ffffff;stroke-width:2.6;fill:none;stroke-linecap:round;stroke-dasharray:9 6;opacity:.9}
.flwh{fill:#ffffff;opacity:.9}
.cavr2{fill:url(#g-rb);stroke:#2b1a1a;stroke-width:1.4;stroke-linejoin:round}
.cavl2{fill:url(#g-rr);stroke:#2b1a1a;stroke-width:1.4;stroke-linejoin:round}
.efe{fill:none;stroke:#fff6ea;stroke-width:5;opacity:.9;stroke-linejoin:round}
.atr{fill:url(#g-atr);stroke:#2b1a1a;stroke-width:1.2;stroke-dasharray:4 3}
.ann{stroke:#2b1a1a;stroke-width:1.8;fill:none;stroke-dasharray:6 4}
.meas{stroke:#c26a00;stroke-width:2;fill:none}
.measf{fill:#c26a00}
.shelf{fill:url(#g-myo);stroke:#2b1a1a;stroke-width:1.6}
.cone{fill:url(#g-myo);stroke:#2b1a1a;stroke-width:1.6}
.jet{stroke:#ffffff;stroke-width:3;fill:none;stroke-linecap:round;stroke-dasharray:2 5;opacity:.95}
</style>"""


def head(svg_id, title, desc, header):
    s = BV.head(svg_id, title, desc, header).replace('"created":"2026-11-14"', f'"created":"{CREATED}"')
    i = s.index('<rect class="bg"')
    return s[:i] + CHD_STYLE + "\n" + s[i:]


def arrow(x1, y1, x2, y2, cls="flow", hs=6):
    """Белая стрелка-кровоток от (x1,y1) к (x2,y2)."""
    import math
    dx, dy = x2 - x1, y2 - y1
    L = math.hypot(dx, dy); ux, uy = dx / L, dy / L
    bx, by = x2 - ux * hs, y2 - uy * hs
    return (f'<path class="{cls}" d="M {x1:.1f},{y1:.1f} L {bx:.1f},{by:.1f}"/>'
            f'<path class="flowh" d="M {x2:.1f},{y2:.1f} L {bx - uy * hs * .6:.1f},{by + ux * hs * .6:.1f} L {bx + uy * hs * .6:.1f},{by - ux * hs * .6:.1f} Z"/>')


FOOT_END = "Анатомическая схема, не УЗ-изображение; пропорции условны. © FetalCardio, оригинальный рисунок."


# =====================================================================================
# 3VT — варианты (КоА, СГЛОС, правая дуга)
# =====================================================================================
TRACH = (364, 556)


def trachea(x=TRACH[0], y=TRACH[1]):
    return (f'<g id="s-trachea" data-s="trachea"><circle class="trw" cx="{x}" cy="{y}" r="22"/>'
            f'<circle class="trc" cx="{x}" cy="{y}" r="18" stroke-dasharray="26 6"/><circle class="trl" cx="{x}" cy="{y}" r="13"/></g>')


def coa_3vt():
    mpa = "M 526,300 C 532,326 534,346 536,366"
    da = "M 536,366 C 540,450 516,540 470,590"
    arch_prox = "M 400,336 C 400,400 408,452 420,500"
    isth = "M 420,500 C 428,532 438,560 448,584"
    inner = f'''<g id="layer-mediastinum">{BV.thymus(BV.THY)}{trachea()}</g>
<g id="layer-vessels">
<g id="s-da" data-s="da">{tube(da, 34, "p")}</g>
<g id="s-mpa" data-s="mpa">{tube(mpa, 44, "p")}</g>
<g id="s-isth" data-s="isth">{tube(isth, 10, "a")}</g>
<g id="s-arch" data-s="arch">{tube(arch_prox, 15, "a")}</g>
{BV.dao()}
<g id="s-svc" data-s="svc">{vcirc(318, 404, 15, "v")}</g>
</g>
<g id="layer-flow"><g id="s-flow" data-s="flow">{flow_arrows(arch_prox, [.45], sz=5)}{flow_arrows(da, [.3, .62])}{flow_arrows(mpa, [.5])}</g></g>
'''
    M = [
        (1, "arch", "Гипоплазированная поперечная дуга аорты", "hypoplastic arch", 372, 430),
        (2, "isth", "Узкий перешеек аорты", "isthmus", 464, 528),
        (3, "da", "Артериальный проток (шире дуги)", "DA", 560, 470),
        (4, "mpa", "Ствол лёгочной артерии", "MPA", 530, 334),
        (5, "dao", "Нисходящая аорта", "DAo", 492, 610),
        (6, "trachea", "Трахея", "trachea", 328, 588),
        (7, "svc", "Верхняя полая вена", "SVC", 290, 380),
        (None, "flow", "Кровоток в дуге антеградный (к нисходящей аорте)", "flow", 450, 420),
        (None, "thy", "Тимус", "thymus", 452, 266),
        (None, "lungs", "Лёгкие", "lungs", 200, 430),
        (None, "spine", "Позвоночник", "spine", 456, 666),
    ]
    svg = BV.thorax_scene("coa-3vt", "Коарктация аорты на срезе 3VT: узкая дуга и перешеек",
                          "Оригинальная учебная схема FetalCardio на основе схемы нормы 3VT: поперечная дуга аорты гипоплазирована "
                          "и сужается к перешейку, артериальный проток и ствол ЛА заметно шире дуги; V-образная фигура сохранена, "
                          "кровоток в дуге антеградный. Анатомический рисунок, не УЗ-изображение; пропорции условны.",
                          "Коарктация аорты на 3VT: узкая дуга", inner, M,
                          foot=["Поперечный срез: верх — передняя стенка, низ — позвоночник; левая сторона плода — справа на рисунке.",
                                "Дуга аорты узкая и сужается к перешейку; проток и ЛА заметно шире. «V» слева от трахеи сохранена.",
                                "Стрелки — антеградный кровоток. При КоА пренатальный диагноз вероятностный: оценивайте дугу в двух плоскостях.",
                                FOOT_END])
    return fix_head(svg, "coa-3vt"), M


def fix_head(svg, svg_id):
    """thorax_scene строит шапку через build_views.head — добавляем стиль пороков и дату."""
    svg = svg.replace('"created":"2026-11-14"', f'"created":"{CREATED}"')
    i = svg.index('<rect class="bg"')
    return svg[:i] + CHD_STYLE + "\n" + svg[i:]


# =====================================================================================
# Сагиттальный срез дуги аорты (КоА: «полка», удлинённый перешеек)
# =====================================================================================
def coa_arch():
    o = [head("coa-arch", "Коарктация аорты: сагиттальный срез дуги аорты",
              "Оригинальная учебная схема FetalCardio. Продольный (сагиттальный) срез дуги аорты: восходящая аорта, поперечная дуга "
              "с плечеголовным стволом, левой общей сонной и левой подключичной артериями, перешеек и нисходящая аорта. "
              "При коарктации: гипоплазия дуги, сужение перешейка с задней «полкой» напротив впадения протока, "
              "увеличенное расстояние между левой общей сонной и левой подключичной артериями. Анатомический рисунок, не УЗ-изображение.",
              "Коарктация аорты: сагиттальный срез дуги")]
    o.append('<text class="cs" x="410" y="120" text-anchor="middle">ГОЛОВА ↑</text>'
             '<text class="cs" x="40" y="800">← КПЕРЕДИ</text>'
             '<text class="cs" x="780" y="800" text-anchor="end">КЗАДИ (ПОЗВОНОЧНИК) →</text>')
    o.append('<g id="heart">')
    # контур туловища в сагиттальной плоскости
    body = "M 150,150 C 260,132 560,132 690,150 C 720,300 722,600 700,770 C 560,790 280,790 140,770 C 120,600 124,300 150,150 Z"
    o.append(f'<g id="layer-body"><path class="skin" d="{body}"/>'
             f'<path class="cavity" d="M 176,176 C 280,160 540,160 664,176 C 690,320 692,590 674,746 C 540,764 290,764 166,746 C 150,590 152,320 176,176 Z"/></g>')
    # позвоночник: тела позвонков вдоль задней стенки
    vb = "".join(f'<rect class="bone" x="618" y="{y}" width="40" height="34" rx="8"/><ellipse class="oss" cx="638" cy="{y + 17}" rx="10" ry="9"/>'
                 for y in range(196, 740, 46))
    o.append(f'<g id="layer-spine"><g id="s-spine" data-s="spine">{vb}</g></g>')
    # сердце
    hrt = "M 200,560 C 196,470 262,420 340,420 C 420,420 470,470 474,540 C 478,620 420,690 336,694 C 254,696 204,640 200,560 Z"
    o.append(f'''<g id="layer-heart"><g id="s-hrt" data-s="hrt">
<path class="myo" filter="url(#f-soft)" d="{hrt}"/><path class="fibr" d="{hrt}"/>
<path class="cavr2" d="M 230,560 C 230,500 268,462 318,458 C 330,500 330,560 316,620 C 268,626 232,606 230,560 Z"/>
<path class="cavl2" d="M 340,462 C 400,466 444,506 446,556 C 448,612 404,654 344,656 C 356,600 356,520 340,462 Z"/>
</g></g>''')
    asc = "M 372,470 C 364,420 360,370 370,320"
    arch = "M 370,320 C 382,262 440,236 500,244"
    isth = "M 500,244 C 532,250 552,270 560,300"
    daor = "M 560,300 C 566,330 568,360 568,400 L 568,770"
    da = "M 300,470 C 290,410 330,352 420,342 C 480,336 530,334 562,340"
    bca, lcca, lsa = "M 388,292 C 384,250 376,210 370,176", "M 430,256 C 430,220 428,196 426,176", "M 512,246 C 516,214 520,196 522,176"
    o.append(f'''<g id="layer-vessels">
<g id="s-mpa" data-s="mpa">{tube("M 296,500 C 296,486 298,478 300,470", 30, "p")}</g>
<g id="s-da" data-s="da">{tube(da, 22, "p")}</g>
<g id="s-dao" data-s="dao">{tube(daor, 22, "a")}</g>
<g id="s-bca" data-s="bca">{tube(bca, 11, "a")}</g>
<g id="s-lcca" data-s="lcca">{tube(lcca, 9, "a")}</g>
<g id="s-lsa" data-s="lsa">{tube(lsa, 9, "a")}</g>
<g id="s-asc" data-s="asc">{tube(asc, 24, "a")}</g>
<g id="s-arch" data-s="arch">{tube(arch, 15, "a")}</g>
<g id="s-isth" data-s="isth">{tube(isth, 9, "a")}</g>
<g id="s-shelf" data-s="shelf"><path class="shelf" d="M 572,296 C 560,300 548,310 544,324 C 558,324 570,318 576,308 Z"/></g>
</g>
<g id="layer-flow"><g id="s-flow" data-s="flow">{flow_arrows(asc, [.5])}{flow_arrows(arch, [.55], sz=5)}{flow_arrows(daor, [.25, .6])}{flow_arrows(da, [.35, .7])}</g></g>
<g id="layer-annotations"><g id="s-gap" data-s="gap">
<path class="meas" d="M 432,176 L 520,176"/><path class="measf" d="M 432,176 l 8,-4 l 0,8 Z"/><path class="measf" d="M 520,176 l -8,-4 l 0,8 Z"/>
</g></g>''')
    M = [
        (1, "asc", "Восходящая аорта", "AAo", 340, 380),
        (2, "arch", "Гипоплазированная поперечная дуга", "transverse arch", 444, 284),
        (3, "isth", "Узкий перешеек аорты", "isthmus", 520, 290),
        (4, "shelf", "Задняя «полка» (коарктационный гребень)", "posterior shelf", 596, 312),
        (5, "gap", "Увеличенное расстояние ЛОСА — ЛПКА", "LCCA–LSA distance", 476, 156),
        (6, "da", "Артериальный проток", "DA", 430, 366),
        (7, "dao", "Нисходящая аорта", "DAo", 598, 520),
        (8, "bca", "Плечеголовной ствол", "BCA", 360, 220),
        (9, "lcca", "Левая общая сонная артерия", "LCCA", 406, 206),
        (10, "lsa", "Левая подключичная артерия", "LSA", 546, 210),
        (11, "mpa", "Ствол лёгочной артерии", "MPA", 266, 486),
        (None, "hrt", "Сердце", "heart", 336, 600),
        (None, "flow", "Кровоток в дуге антеградный", "flow", 330, 330),
        (None, "spine", "Позвоночник", "spine", 680, 420),
    ]
    o.append(labels(M) + "\n</g>")
    o.append(V.foot(["Сагиттальный срез: голова — вверху, передняя стенка — слева, позвоночник — справа.",
                     "КоА: дуга тонкая, перешеек сужен, напротив протока — задняя «полка»; ЛОСА и ЛПКА разведены.",
                     "Ход сосудов и ширина условны; проток и дуга в одной плоскости видны не всегда.",
                     FOOT_END]))
    return "\n".join(o), M


# =====================================================================================
# 4CV — параметрическая версия атласа нормы (build_4cv.build) для пороков
# =====================================================================================
TRAB_RV = [("M 284,262 Q 300,262 318,272", 5), ("M 306,232 Q 322,236 336,250", 5.5),
           ("M 338,202 Q 350,210 360,226", 5), ("M 374,178 Q 382,190 388,204", 4.5), ("M 410,160 Q 414,174 420,186", 4.5),
           ("M 446,150 Q 450,164 456,174", 4), ("M 478,200 Q 468,206 460,216", 4)]
APM = "M 266,286 C 286,284 312,294 325,309 C 329,316 323,323 314,323 C 298,323 282,325 266,330 Z"
LVPM = "M 638,246 C 624,250 604,274 598,294 C 595,303 601,309 610,309 C 620,309 630,314 638,324 Z"


def chords(lst):
    return "".join(A.tline(a, b, "che") + A.tline(a, b, "ch") for a, b in lst)


def fourch(svg_id, title, desc, header, M, foot, **p):
    g = lambda k, d: p.get(k, d)
    outline = g("outline", B.OUTLINE)
    rv_c, rv_e = A.wavy(g("rv", B.RV), g("rv_amps", [5, 12, 12, 6, 0]), seed=7, wl=16)
    lv_c, lv_e = A.wavy(g("lv", B.LV), g("lv_amps", [0, 5, 5, 3, 0]), seed=11, wl=10)
    ra, la, ivs = g("ra", B.RA), g("la", B.LA), g("ivs", B.IVS)
    rv_cls, lv_cls, ra_cls, la_cls = g("rv_cls", "cavr"), g("lv_cls", "cavl"), g("ra_cls", "cavr"), g("la_cls", "cavl")
    dao = g("dao", B.DAO)
    veins = g("veins", f'<g id="s-pv" data-s="pv"><path class="vo" d="{B.RPV}"/><path class="vo" d="{B.LPV}"/><path class="vm" d="{B.RPV}"/><path class="vm" d="{B.LPV}"/>'
                       f'<path class="vh" d="{B.RPV}" transform="translate(-3 -2)"/><path class="vh" d="{B.LPV}" transform="translate(-3 -2)"/></g>')
    veins_lumen = g("veins_lumen", f'<path class="vi" d="{B.RPV_L}"/><path class="vi" d="{B.LPV_L}"/>')
    rv_morph = g("rv_morph", "".join(bundle(d, w) for d, w in TRAB_RV) + f'<path class="pm" d="{APM}"/><g id="s-mb" data-s="mb">{bundle(B.MB, 9)}</g>')
    lv_morph = g("lv_morph", f'<path class="pm" d="{LVPM}"/>')
    pect = "".join(bundle(d, w) for d, w in A.RA_PECT)
    ias = g("ias", f'<g id="s-ias" data-s="ias"><path class="sep" d="{B.IAS_PRIMUM}"/><path class="sep" d="{B.IAS_SECUNDUM}"/></g>'
                   f'<path id="s-fo" data-s="fo" class="cav fo" d="{B.FO_GAP}"/>'
                   f'<g id="s-flap" data-s="flap"><path class="flape" d="{B.FO_FLAP}"/><path class="flap" d="{B.FO_FLAP}"/></g>')
    crux = g("crux", f'<path class="avs" d="{B.AVS}"/><path class="fib" d="{B.CFB}"/>')
    av = g("av", f'<g id="s-tv" data-s="tv">{chords(B.TV_CH)}{leaflet(B.TV_SEPT)}{leaflet(B.TV_ANT)}</g>'
                 f'<g id="s-mv" data-s="mv">{chords(B.MV_CH)}{leaflet(B.MV_ANT)}{leaflet(B.MV_POST)}</g>')
    extra_defs = (f'<defs><clipPath id="c-rv2"><path d="{rv_c}"/></clipPath><clipPath id="c-lv2"><path d="{lv_c}"/></clipPath>'
                  f'<clipPath id="c-ra2"><path d="{ra}"/></clipPath><clipPath id="c-la2"><path d="{la}"/></clipPath></defs>')
    sides = g("sides", ("ПРАВЫЕ ОТДЕЛЫ", "ЛЕВЫЕ ОТДЕЛЫ"))
    body = f"""<g id="heart" transform="translate({A.DX4},{A.DY4}) scale({A.S4})">
<g id="layer-veins">
<g id="s-dao" data-s="dao"><circle class="ao" cx="{dao[0]}" cy="{dao[1]}" r="{dao[2]}"/><ellipse cx="{dao[0]-7}" cy="{dao[1]-8}" rx="7" ry="4" fill="#fff" opacity=".4"/></g>
{veins}
</g>
<g id="layer-myocardium" filter="url(#f-soft)"><path id="s-myo" class="myo" d="{outline}"/></g>
<g id="layer-myo-texture"><path class="fibr" d="{outline}"/></g>
<g id="layer-cavities">
<path id="s-{g("rv_key", "rv")}" data-s="{g("rv_key", "rv")}" class="cav {rv_cls}" d="{rv_c}"/>
<path id="s-{g("lv_key", "lv")}" data-s="{g("lv_key", "lv")}" class="cav {lv_cls}" d="{lv_c}"/>
<path id="s-ra" data-s="ra" class="cav {ra_cls}" d="{ra}"/>
<path id="s-la" data-s="la" class="cav {la_cls}" d="{la}"/>
</g>
<g id="layer-cavity-shading"><path class="ish" clip-path="url(#c-rv2)" d="{rv_c}"/><path class="ishl" clip-path="url(#c-lv2)" d="{lv_c}"/><path class="ish" clip-path="url(#c-ra2)" d="{ra}"/><path class="ishl" clip-path="url(#c-la2)" d="{la}"/>
<path class="sheen" d="{rv_c} {lv_c} {ra} {la}"/></g>
{g("post_cav", "")}
<g id="layer-endocardium"><path class="endo2" d="{rv_e} {lv_e}"/></g>
<g id="layer-ra-morphology"><g id="s-pect">{pect}</g></g>
<g id="layer-veins-lumen">{veins_lumen}</g>
<g id="layer-ventricular-septum"><path id="s-ivs" data-s="ivs" class="sep" d="{ivs}"/><path class="fibr" d="{ivs}"/></g>
<g id="layer-rv-morphology">{rv_morph}</g>
<g id="layer-lv-morphology">{lv_morph}</g>
<g id="layer-atrial-septum">{ias}</g>
<g id="layer-crux">{crux}</g>
<g id="layer-av-valves">{av}</g>
{g("extra", "")}
{labels(M)}
</g>"""
    o = [head(svg_id, title, desc, header), extra_defs,
         f'<text class="cs" x="40" y="128">{sides[0]}</text>\n<text class="cs" x="780" y="128" text-anchor="end">{sides[1]}</text>',
         body, V.foot(foot)]
    return "\n".join(o), M


# ---------- СГЛОС ----------
def hlhs_4cv():
    outline = ("M 456,96 C 530,92 590,160 606,240 C 616,300 622,350 626,392 C 660,414.3 668,476.7 650,520.4 "
               "C 632,557.8 576,570.3 520,568.7 C 490,567.9 466,562.5 452,556.2 C 432,564.0 396,565.6 362,562.5 "
               "C 304,556.2 256,528.2 251,476.7 C 248,442.4 252,419.0 262,401.8 C 246,384.0 242,352.0 248,316.0 "
               "C 258,226.0 360,120.0 456,96 Z")
    rv = "M 448,360 L 484,222 C 490,186 480,146 454,134 C 386,140 296,214 270,320 C 265,356 272,384 284,400 Z"
    ivs = "M 448,360 L 484,222 C 490,204 512,212 524,238 L 494,300 L 474,386 L 471.7,360 Z"
    lv = "M 474,386 L 494,300 C 504,262 514,240 526,236 C 546,250 556,300 562,340 C 566,366 576,382 590,388 Z"
    la = ("M 474,386 L 600,388 C 632,412 640,470 626,506 C 610,540 560,552 510,550 "
          "C 486,549 466,545 456,540 L 462,394 Z")
    flapd = "M 450,456 C 424,462 418,482 442,492"
    ias = (f'<g id="s-ias" data-s="ias"><path class="sep" d="{B.IAS_PRIMUM}"/><path class="sep" d="M 448.4,474 L 457.2,474 L 454,540 L 446,540 Z"/></g>'
           f'<path id="s-fo" data-s="fo" class="cav fo" d="M 447.6,454.1 L 460.8,454.1 L 459.2,474.4 L 446.4,474.4 Z"/>'
           f'<g id="s-flap" data-s="flap"><path class="flape" d="{flapd}"/><path class="flap" d="{flapd}"/></g>')
    mv_ant, mv_post = "M 474,386 Q 494,378 512,376", "M 590,388 Q 552,376 516,377"
    av = (f'<g id="s-tv" data-s="tv">{chords(B.TV_CH)}{leaflet(B.TV_SEPT)}{leaflet(B.TV_ANT)}</g>'
          f'<g id="s-mv" data-s="mv"><path class="lfe" stroke-width="9" d="{mv_ant}"/><path class="lf" stroke-width="6" d="{mv_ant}"/>'
          f'<path class="lfe" stroke-width="9" d="{mv_post}"/><path class="lf" stroke-width="6" d="{mv_post}"/></g>')
    efe = '<path class="efe" d="M 478,384 L 497,300 C 507,264 515,245 526,241 C 543,255 551,300 557,340 C 561,364 571,379 586,386"/>'
    extra = (f'<g id="layer-efe"><g id="s-efe" data-s="efe">{efe}</g></g>'
             '<g id="layer-flow"><g id="s-shunt" data-s="shunt">' + arrow(474, 466, 420, 478) + '</g></g>')
    rv_trab = [("M 284,262 Q 300,262 318,272", 5), ("M 306,222 Q 322,228 336,244", 5.5), ("M 340,186 Q 352,196 360,212", 5),
               ("M 380,156 Q 388,170 392,186", 4.5), ("M 420,148 Q 424,160 428,172", 4.5), ("M 456,140 Q 460,152 464,164", 4)]
    rv_morph = ("".join(bundle(d, w) for d, w in rv_trab) + f'<path class="pm" d="{APM}"/>'
                f'<g id="s-mb" data-s="mb">{bundle("M 474,226 Q 380,252 296,304", 9)}</g>')
    M = [
        (1, "lv", "Гипоплазированный ЛЖ, не формирует верхушку", "hypoplastic LV", 530, 300),
        (2, "efe", "Яркий эндокард (фиброэластоз)", "EFE", 570, 318),
        (3, "mv", "Гипоплазированный / атретичный МК", "MV", 540, 404),
        (4, "rv", "Расширенный ПЖ формирует верхушку", "RV", 372, 290),
        (5, "flap", "Клапан овального окна выбухает в ПП", "reversed flap", 402, 468),
        (6, "shunt", "Шунт через овальное окно слева направо", "L→R shunt", 470, 500),
        (7, "la", "Левое предсердие", "LA", 560, 470),
        (8, "ra", "Правое предсердие", "RA", 330, 470),
        (9, "tv", "Трёхстворчатый клапан", "TV", 340, 340),
        (10, "ivs", "Межжелудочковая перегородка", "IVS", 474, 270),
        (11, "mb", "Модераторный пучок", "moderator band", 392, 258),
        (None, "dao", "Нисходящая аорта", "DAo", 596, 610),
        (None, "pv", "Лёгочные вены", "pulmonary veins", 470, 588),
    ]
    return fourch("hlhs-4cv", "СГЛОС на четырёхкамерном срезе: маленький ЛЖ, ПЖ формирует верхушку",
                  "Оригинальная учебная схема FetalCardio на основе атласа 4CV: левый желудочек маленький, с ярким эндокардом "
                  "(фиброэластоз), не доходит до верхушки; митральный клапан гипоплазирован; верхушку формирует расширенный правый желудочек; "
                  "клапан овального окна выбухает в правое предсердие (шунт слева направо). Анатомический рисунок, не УЗ-изображение.",
                  "СГЛОС на 4CV: маленький ЛЖ", M,
                  ["Апикальная ориентация, как в атласе 4CV: верхушка вверху, предсердия внизу; правые отделы слева.",
                   "Вариант со стенозом/атрезией МК и фиброэластозом; при атрезии МК и АК полость ЛЖ бывает щелевидной.",
                   "Стрелка — шунт через овальное окно слева направо; рестриктивное окно ухудшает прогноз.",
                   FOOT_END],
                  outline=outline, rv=rv, ivs=ivs, lv=lv, la=la, lv_amps=[0, 0, 2, 2, 2, 0, 0], ias=ias, av=av,
                  rv_morph=rv_morph, extra=extra, rv_amps=[0, 10, 10, 6, 0], lv_morph="")


# ---------- АВСД ----------
def avsd_4cv():
    y_top = 316
    xl, xr = V.ivs_x(y_top)
    ivs = f"M {xl:.1f},{y_top} L 478,160 Q 490,138 503,136 L {xr:.1f},{y_top} Z"
    ias = (f'<g id="s-ias" data-s="ias"><path class="sep" d="{B.IAS_SECUNDUM}"/></g>'
           f'<path class="cav fo" d="{B.FO_GAP}"/>'
           f'<g><path class="flape" d="{B.FO_FLAP}"/><path class="flap" d="{B.FO_FLAP}"/></g>')
    # единый дефект в центре сердца: межпредсердный (первичный) + приточный межжелудочковый компоненты
    asd = '<path class="vsd" d="M 446,372 L 474,372 L 466,446 L 446,446 Z"/><path class="rim" d="M 446,446 L 466,446"/>'
    vsd = (f'<path class="vsd" d="M {xl - 4:.1f},{y_top} L {xr + 4:.1f},{y_top} L 476,368 L 444,368 Z"/>'
           f'<path class="rim" d="M {xl - 4:.1f},{y_top} L {xr + 4:.1f},{y_top}"/>')
    extra = (f'<g id="layer-defects"><g id="s-d-asd" data-s="d-asd">{asd}{arrow(440, 416, 470, 416)}</g>'
             f'<g id="s-d-vsd" data-s="d-vsd">{vsd}{arrow(442, 340, 474, 340)}</g></g>')
    # общий AV-клапан: мостовидные створки на одном уровне (нет смещения)
    l1, l2 = "M 284,398.7 Q 360,368 452,374", "M 614,388 Q 540,370 470,374"
    ch = chords([((330, 382), (318, 316)), ((370, 374), (320, 314)), ((420, 373), (452, 330)),
                 ((500, 374), (476, 332)), ((540, 375), (600, 300)), ((580, 380), (603, 302))])
    av = (f'<g id="s-cavv" data-s="cavv">{ch}{leaflet(l1)}{leaflet(l2)}</g>'
          f'<g id="s-lin" data-s="lin"><path class="ann" d="M 270,374 L 630,374"/></g>')
    M = [
        (1, "d-asd", "Межпредсердный компонент (первичный ДМПП)", "primum ASD", 420, 430),
        (2, "d-vsd", "Приточный межжелудочковый компонент", "inlet VSD", 500, 336),
        (3, "cavv", "Общий атриовентрикулярный клапан", "common AV valve", 380, 392),
        (4, "lin", "Створки на одном уровне — нет смещения", "no offset", 640, 360),
        (5, "rv", "Правый желудочек", "RV", 372, 290),
        (6, "lv", "Левый желудочек", "LV", 572, 240),
        (7, "ra", "Правое предсердие", "RA", 330, 470),
        (8, "la", "Левое предсердие", "LA", 586, 480),
        (9, "ivs", "Межжелудочковая перегородка (укорочена)", "IVS", 478, 250),
        (10, "ias", "Вторичная часть межпредсердной перегородки", "IAS", 430, 520),
        (None, "dao", "Нисходящая аорта", "DAo", 596, 610),
        (None, "pv", "Лёгочные вены", "pulmonary veins", 470, 588),
    ]
    return fourch("avsd-4cv", "Полный АВСД на четырёхкамерном срезе: нет креста сердца, общий AV-клапан",
                  "Оригинальная учебная схема FetalCardio на основе атласа 4CV: в центре сердца отсутствуют нижняя часть межпредсердной "
                  "перегородки (первичный дефект) и приточная часть межжелудочковой перегородки; крест сердца не формируется; "
                  "единый атриовентрикулярный клапан с мостовидными створками открывается в оба желудочка, нормального смещения "
                  "мест прикрепления нет. Анатомический рисунок, не УЗ-изображение.",
                  "Полный АВСД на 4CV: нет креста сердца", M,
                  ["Апикальная ориентация, как в атласе 4CV: верхушка вверху, предсердия внизу; правые отделы слева.",
                   "Полная форма: дефект межпредсердной и межжелудочковой перегородок + общий AV-клапан. Лучше видно в диастолу.",
                   "Пунктир — створки прикреплены на одном уровне (в норме ТК ближе к верхушке). Стрелки — шунт, условно.",
                   FOOT_END],
                  ivs=ivs, ias=ias, crux="", av=av, extra=extra)


# ---------- Аномалия Эбштейна ----------
def ebstein_4cv():
    hx = 448 + (360 - 262) * 30 / 200         # смещённое место прикрепления септальной створки на МЖП
    sept = f"M {hx:.1f},262 Q 432,262 404,274"
    ant = "M 284,398.7 Q 300,330 350,292 Q 376,276 398,276"
    atr = f"M 284,398.7 L 448,360 L {hx:.1f},262 Q 432,262 404,274 Q 376,280 350,292 Q 300,330 284,398.7 Z"
    ch = chords([((330, 316), (318, 290)), ((366, 286), (320, 286)), ((420, 266), (450, 232))])
    av = (f'<g id="s-atr" data-s="atr"><path class="atr" d="{atr}"/></g>'
          f'<g id="s-ann" data-s="ann"><path class="ann" d="M 284,398.7 L 448,360"/></g>'
          f'<g id="s-tvs" data-s="tvs">{leaflet(sept)}</g>'
          f'<g id="s-tva" data-s="tva">{ch}{leaflet(ant)}</g>'
          f'<g id="s-mv" data-s="mv">{chords(B.MV_CH)}{leaflet(B.MV_ANT)}{leaflet(B.MV_POST)}</g>')
    extra = (f'<g id="layer-flow"><g id="s-jet" data-s="jet"><path class="jet" d="M 402,282 C 396,330 380,400 360,470"/>'
             f'{arrow(366, 448, 360, 476)}</g></g>'
             f'<g id="layer-annotations"><g id="s-offset" data-s="offset">'
             f'<line class="and" x1="{hx:.1f}" y1="262" x2="520" y2="262"/><line class="and" x1="470" y1="386" x2="520" y2="386"/>'
             f'<line class="an" x1="512" y1="268" x2="512" y2="380"/><path class="anf" d="M 512,262 L 507.5,270 L 516.5,270 Z"/>'
             f'<path class="anf" d="M 512,386 L 507.5,378 L 516.5,378 Z"/></g></g>')
    # увеличенное ПП (кардиомегалия)
    outline = B.OUTLINE.replace("C 304,556.2 256,528.2 251,476.7 C 248,442.4 252,419.0 262,401.8",
                                "C 290,568 226,540 222,476.7 C 220,440 236,416 262,401.8")
    ra = "M 284,398.7 L 448,360.0 L 452,394.0 L 446,548.4 C 420,556.2 390,559.4 362,556.2 C 296,556 240,530 236,476.7 C 234,440 256,414 284,398.7 Z"
    M = [
        (1, "tvs", "Септальная створка ТК смещена к верхушке", "displaced septal leaflet", 432, 246),
        (2, "tva", "Передняя створка ТК — большая, «парусная»", "sail-like anterior leaflet", 318, 338),
        (3, "atr", "Атриализованная часть ПЖ", "atrialized RV", 372, 336),
        (4, "rv", "Функциональный ПЖ (уменьшен)", "functional RV", 372, 218),
        (5, "ann", "Истинное AV-кольцо", "true annulus", 300, 378),
        (6, "offset", "Увеличенное смещение ТК относительно МК", "increased offset", 540, 324),
        (7, "jet", "Трикуспидальная регургитация", "TR", 384, 420),
        (8, "ra", "Увеличенное правое предсердие", "RA", 300, 490),
        (9, "lv", "Левый желудочек", "LV", 572, 240),
        (10, "la", "Левое предсердие", "LA", 586, 480),
        (11, "mv", "Митральный клапан", "MV", 566, 344),
        (12, "ivs", "Межжелудочковая перегородка", "IVS", 478, 220),
        (None, "dao", "Нисходящая аорта", "DAo", 596, 610),
        (None, "pv", "Лёгочные вены", "pulmonary veins", 470, 588),
    ]
    return fourch("ebstein-4cv", "Аномалия Эбштейна на четырёхкамерном срезе: смещение септальной створки ТК",
                  "Оригинальная учебная схема FetalCardio на основе атласа 4CV: место прикрепления септальной створки трёхстворчатого "
                  "клапана смещено к верхушке, передняя створка большая, «парусная»; часть ПЖ между истинным кольцом и створками "
                  "атриализована; правое предсердие увеличено, видна регургитация. Анатомический рисунок, не УЗ-изображение.",
                  "Аномалия Эбштейна на 4CV", M,
                  ["Апикальная ориентация, как в атласе 4CV: верхушка вверху, предсердия внизу; правые отделы слева.",
                   "Голубой пунктир — атриализованная часть ПЖ между истинным кольцом и смещёнными створками.",
                   "Скобка — смещение мест прикрепления ТК и МК; пунктир со стрелкой — регургитация в ПП.",
                   FOOT_END],
                  av=av, extra=extra, outline=outline, ra=ra)


# ---------- ТАДЛВ ----------
def tapvr_4cv():
    dao = (562, 628, 20)
    conf = "M 420,580 C 470,588 560,588 650,572"
    rpv, lpv = "M 360,618 C 380,604 400,592 424,582", "M 690,606 C 676,590 664,580 646,574"
    veins = (f'<g id="s-pv" data-s="pv">{"".join(f"<path class=\"vo\" d=\"{d}\"/><path class=\"vm\" d=\"{d}\"/>" for d in (rpv, lpv))}</g>'
             f'<g id="s-conf" data-s="conf"><path class="vo" stroke-width="25" d="{conf}"/><path class="vm" stroke-width="21" d="{conf}"/>'
             f'<path class="vh" d="{conf}" transform="translate(-2 -3)"/>'
             f'<ellipse cx="416" cy="580" rx="11" ry="12" fill="#7f0c12" stroke="#2b1a1a" stroke-width="1.6"/></g>')
    extra = ('<g id="layer-annotations"><g id="s-dist" data-s="dist">'
             '<line class="meas" x1="530" y1="550" x2="530" y2="606"/><path class="measf" d="M 530,550 l -4,8 l 8,0 Z"/>'
             '<path class="measf" d="M 530,606 l -4,-8 l 8,0 Z"/></g></g>')
    la = ("M 468,386 L 606,388 C 636,412 644,470 628,506 C 612,540 556,550 500,548 "
          "C 478,546 462,542 454,538 L 462,394 Z")
    ias = (f'<g id="s-ias" data-s="ias"><path class="sep" d="{B.IAS_PRIMUM}"/><path class="sep" d="M 448.4,487.6 L 457.2,487.6 L 454,538 L 446,538 Z"/></g>'
           f'<path id="s-fo" data-s="fo" class="cav fo" d="{B.FO_GAP}"/>'
           f'<g id="s-flap" data-s="flap"><path class="flape" d="{B.FO_FLAP}"/><path class="flap" d="{B.FO_FLAP}"/></g>')
    M = [
        (1, "conf", "Коллектор лёгочных вен позади ЛП", "PV confluence", 470, 600),
        (2, "pv", "Лёгочные вены впадают в коллектор, а не в ЛП", "pulmonary veins", 690, 586),
        (3, "la", "Маленькое ЛП с гладкой задней стенкой", "LA", 560, 470),
        (4, "dist", "Увеличенное расстояние ЛП — нисходящая аорта", "LA–DAo distance", 508, 560),
        (5, "dao", "Нисходящая аорта", "DAo", 596, 632),
        (6, "rv", "Правый желудочек (увеличен)", "RV", 372, 300),
        (7, "lv", "Левый желудочек", "LV", 572, 240),
        (8, "ra", "Правое предсердие", "RA", 336, 470),
        (9, "fo", "Овальное окно (право-левый шунт)", "foramen ovale", 430, 466),
        (10, "ivs", "Межжелудочковая перегородка", "IVS", 478, 250),
    ]
    return fourch("tapvr-4cv", "ТАДЛВ на четырёхкамерном срезе: коллектор лёгочных вен позади ЛП",
                  "Оригинальная учебная схема FetalCardio на основе атласа 4CV: лёгочные вены не впадают в левое предсердие, "
                  "а сливаются в коллектор позади него; задняя стенка ЛП гладкая, ЛП маленькое; расстояние между ЛП и нисходящей "
                  "аортой увеличено; правые отделы преобладают. Анатомический рисунок, не УЗ-изображение.",
                  "ТАДЛВ на 4CV: коллектор позади ЛП", M,
                  ["Апикальная ориентация, как в атласе 4CV: верхушка вверху, предсердия внизу; правые отделы слева.",
                   "Коллектор — вена между ЛП и аортой; кровь уходит из него по вертикальной/нисходящей вене.",
                   "Скобка — увеличенное расстояние ЛП — нисходящая аорта. Подтверждайте впадение вен на ЦДК.",
                   FOOT_END],
                  veins=veins, veins_lumen="", dao=dao, la=la, ias=ias, extra=extra)


# =====================================================================================
# LVOT (версия 3, lvot_geom.py) — конотрункальные пороки
# =====================================================================================
BV.COL["m"] = ("#7a3a8c", "g-mixr")      # смешанная кровь (общий ствол)
mp = lambda d: G0.map_path(d, G0.fx)
fxp = lambda x, y: G0.fx(x, y)


def lvot_scene(svg_id, title, desc, header, M, foot, *, ivs=G0.IVS, ra=G0.RA, arteries="", defect="", mv=None,
               mac=True, flow="", extra=""):
    RV_C, RV_E = A.wavy(mp(G0.RV), G0.RV_AMPS, seed=5, wl=14)
    LV_C, LV_E = A.wavy(mp(G0.LV), G0.LV_AMPS, seed=9, wl=10)
    ch = chords([(G0.fx(*a), G0.fx(*b)) for a, b in G0.MV_CH])
    trab = "".join(bundle(mp(d), w) for d, w in G0.TRAB)
    ivs_m = mp(ivs)
    mvx = mv if mv is not None else f'<g id="s-mv" data-s="mv">{ch}{"".join(leaflet(mp(d)) for d in G0.MV)}</g>'
    ra_el = f'<path id="s-ra" data-s="ra" class="cavr2" d="{mp(ra)}"/>' if ra else ""
    MA = G0.fx(*G0.MA)
    mac_el = (f'<g id="s-mac" data-s="mac"><circle cx="{MA[0]}" cy="{MA[1]}" r="7" fill="#fffaf2" stroke="#2b1a1a" stroke-width="1.6"/></g>'
              if mac else "")
    heart = f'''<g id="layer-heart">
<g id="layer-veins"><g id="s-pvn" data-s="pvn">{"".join(f'<path class="vo" stroke-width="16" d="{mp(d)}"/><path class="vm" stroke-width="12" d="{mp(d)}"/>' for d in G0.PV)}</g></g>
<g id="layer-myocardium" filter="url(#f-soft)"><path class="myo" d="{mp(G0.OUT)}"/></g>
<g id="layer-myo-texture"><path class="fibr" d="{mp(G0.OUT)}"/></g>
<g id="layer-cavities">
<path id="s-rv" data-s="rv" class="cavr2" d="{RV_C}"/>
{ra_el}
<path id="s-lv" data-s="lv" class="cavl2" d="{LV_C}"/>
<path id="s-la" data-s="la" class="cavl2" d="{mp(G0.LA)}"/>
<path class="sheen" d="{RV_C} {LV_C} {mp(G0.LA)}"/>
<path class="endo2" d="{RV_E} {LV_E}"/>
</g>
<g id="layer-ventricular-septum"><path id="s-ivs" data-s="ivs" class="sep" d="{ivs_m}"/><path class="fibr" d="{ivs_m}"/></g>
<g id="layer-rv-morphology">{trab}<g id="s-mb">{bundle(mp(G0.MB), 7)}</g></g>
<g id="layer-lv-morphology"><path class="pm" d="{mp(G0.LVPM)}"/></g>
<g id="layer-defects">{defect}</g>
<g id="layer-arteries">{arteries}{mac_el}</g>
<g id="layer-av-valves">{mvx}</g>
<g id="layer-flow">{flow}</g>
{extra}
</g>'''
    M2 = [(n, k, nm, ab, *G0.fx(x, y)) if k not in ("dao", "lungs", "spine") else (n, k, nm, ab, x, y) for n, k, nm, ab, x, y in M]
    o = [head(svg_id, title, desc, header), BV.orient_tr(TCY - TRY), '<g id="heart">', BV.body_frame(TCX, TCY, TRX, TRY, thorax=True),
         BV.lungs(BV.LUNG_R2, BV.LUNG_L2), f'<g id="layer-spine">{BV.spine(SPX, SPY)}</g>', BV.dao(), heart,
         labels(M2) + "\n</g>", V.foot(foot)]
    return "\n".join(o), M2


def artery(key, up, lo, cut, grad="g-ao", hl=None):
    """Магистральная артерия в плоскости среза: стенки up/lo (координаты lvot_geom), срез сосуда cut=(cx, cy, rx, ry, угол)."""
    cx, cy, rx, ry, a = cut
    X, Y = G0.fx(cx, cy)
    u, l = mp(up), mp(lo)
    # замкнутый контур: up → конец lo → lo в обратном направлении
    end = re.findall(r"-?\d+(?:\.\d+)?,-?\d+(?:\.\d+)?", lo)[-1]
    body = f'{u} L {mp("M " + end)[2:]} ' + reverse_cubic(lo) + " Z"
    sheen = f'<path d="{mp(hl)}" stroke="#fff" stroke-width="3.5" opacity=".3" fill="none" stroke-linecap="round"/>' if hl else ""
    return (f'<g id="s-{key}" data-s="{key}"><path fill="url(#{grad})" d="{body}"/>'
            f'<path class="an" stroke-width="2.4" d="{u}"/><path class="an" stroke-width="2.4" d="{l}"/>'
            f'<ellipse cx="{X}" cy="{Y}" rx="{rx * G0.SCALE:.1f}" ry="{ry * G0.SCALE:.1f}" fill="{"#0d2560" if grad == "g-pa" else ("#4a1d5a" if grad == "g-mixr" else "#7f0c12")}" '
            f'stroke="#2b1a1a" stroke-width="1.8" transform="rotate({a} {X} {Y})"/>{sheen}</g>')


def reverse_cubic(d):
    """Путь 'M p0 C c1 c2 p1 C ...' (координаты lvot_geom) → обратный ход ' C ... ' в координатах атласа (без начального M)."""
    nums = [tuple(map(float, t.split(","))) for t in re.findall(r"-?\d+(?:\.\d+)?,-?\d+(?:\.\d+)?", d)]
    p0, rest = nums[0], nums[1:]
    segs = [rest[i:i + 3] for i in range(0, len(rest), 3)]
    out, start = [], p0
    pts = [p0] + [s[2] for s in segs]
    for i in range(len(segs) - 1, -1, -1):
        c1, c2, p1 = segs[i]
        a, b, c = G0.fx(*c2), G0.fx(*c1), G0.fx(*pts[i])
        out.append(f"C {a[0]},{a[1]} {b[0]},{b[1]} {c[0]},{c[1]}")
    return " ".join(out)


IVS_SHORT = "M 462,318 C 486,290 512,248 540,204 Q 556,194 566,214 C 536,262 504,302 476,330 Z"
VSD_SUBAO = "M 462,318 L 476,330 L 462,370 L 432,346 Z"
FOOT_LV = "Поперечный срез, как в схеме нормы LVOT: верх — передняя стенка, низ — позвоночник; левая сторона плода — справа."


def tof_lvot():
    up = "M 414,316 C 396,304 372,296 348,288 C 328,282 310,276 288,270"
    lo = "M 474,392 C 450,384 420,374 392,366 C 366,358 340,350 288,340"
    arteries = (artery("ao", up, lo, (290, 305, 36, 9, 100), hl="M 420,340 C 390,326 350,312 300,298")
                + f'<g id="s-aov" data-s="aov">{leaflet(mp("M 414,316 Q 402,304 388,300"))}{leaflet(mp("M 474,392 Q 460,382 444,380"))}</g>')
    defect = (f'<g id="s-d-vsd" data-s="d-vsd"><path class="vsd" d="{mp(VSD_SUBAO)}"/>'
              f'<path class="rim" d="{mp("M 462,318 L 476,330")}"/></g>')
    a1, b1 = G0.fx(396, 270), G0.fx(392, 318)
    a2, b2 = G0.fx(560, 300), G0.fx(470, 352)
    flow = f'<g id="s-flow" data-s="flow">{arrow(*a1, *b1)}{arrow(*a2, *b2)}</g>'
    M = [
        (1, "ao", "Расширенная аорта «сидит верхом» на МЖП", "overriding aorta", 340, 316),
        (2, "d-vsd", "Подаортальный ДМЖП (malalignment)", "malalignment VSD", 452, 336),
        (3, "ivs", "Гребень МЖП под серединой аортального кольца", "IVS", 520, 252),
        (4, "aov", "Аортальный клапан", "AoV", 420, 368),
        (5, "mac", "Митрально-аортальный контакт сохранён", "mitral-aortic continuity", 486, 414),
        (6, "rv", "Правый желудочек", "RV", 410, 232),
        (7, "lv", "Левый желудочек", "LV", 594, 300),
        (8, "la", "Левое предсердие", "LA", 540, 482),
        (9, "ra", "Правое предсердие", "RA", 374, 460),
        (10, "mv", "Митральный клапан", "MV", 556, 392),
        (None, "flow", "Кровь из обоих желудочков уходит в аорту", "flow", 600, 260),
        (None, "dao", "Нисходящая аорта", "DAo", 492, 610),
        (None, "lungs", "Лёгкие", "lungs", 186, 440),
        (None, "spine", "Позвоночник", "spine", 456, 666),
    ]
    return lvot_scene("tof-lvot", "Тетрада Фалло на срезе LVOT: аорта над ДМЖП",
                      "Оригинальная учебная схема FetalCardio на основе схемы нормы LVOT: расширенная аорта отходит над большим "
                      "подаортальным дефектом межжелудочковой перегородки и «сидит верхом» на её гребне; передняя стенка аорты "
                      "не продолжает перегородку, митрально-аортальный контакт сохранён; кровь из обоих желудочков уходит в аорту. "
                      "Анатомический рисунок, не УЗ-изображение; пропорции условны.",
                      "Тетрада Фалло на LVOT: аорта над ДМЖП", M,
                      [FOOT_LV,
                       "ТФ: подаортальный ДМЖП + декстропозиция аорты; сужение выходного тракта ПЖ и ЛА — на RVOT/3VV.",
                       "Стрелки — кровь из ПЖ и ЛЖ в аорту. Степень «верхом» условна; при выраженном смещении к ПЖ — думайте о DORV.",
                       FOOT_END],
                      ivs=IVS_SHORT, arteries=arteries, defect=defect, flow=flow)


def cat_lvot():
    up = "M 410,312 C 392,298 368,288 344,280 C 324,274 306,268 284,262"
    lo = "M 476,394 C 450,386 420,376 392,368 C 366,360 340,354 284,346"
    pa = "M 372,360 C 368,386 362,404 352,420"
    rpa, lpa = "M 352,420 C 334,438 312,446 286,448", "M 352,420 C 362,444 382,458 410,464"
    arteries = (f'<g id="s-mpa" data-s="mpa">{tube(mp(pa), 22, "m")}</g>'
                f'<g id="s-pab" data-s="pab">{tube(mp(rpa), 13, "m")}{tube(mp(lpa), 13, "m")}</g>'
                + artery("trunk", up, lo, (286, 304, 42, 10, 100), grad="g-mixr", hl="M 420,338 C 390,322 350,308 300,294")
                + f'<g id="s-trv" data-s="trv"><path class="lfe" stroke-width="10" d="{mp("M 410,312 Q 398,318 384,316")}"/><path class="lf" stroke-width="6.5" d="{mp("M 410,312 Q 398,318 384,316")}"/>'
                f'<path class="lfe" stroke-width="10" d="{mp("M 476,394 Q 460,384 442,384")}"/><path class="lf" stroke-width="6.5" d="{mp("M 476,394 Q 460,384 442,384")}"/></g>')
    defect = (f'<g id="s-d-vsd" data-s="d-vsd"><path class="vsd" d="{mp(VSD_SUBAO)}"/>'
              f'<path class="rim" d="{mp("M 462,318 L 476,330")}"/></g>')
    a1, b1 = G0.fx(396, 266), G0.fx(390, 314)
    a2, b2 = G0.fx(560, 300), G0.fx(470, 352)
    flow = f'<g id="s-flow" data-s="flow">{arrow(*a1, *b1)}{arrow(*a2, *b2)}</g>'
    M = [
        (1, "trunk", "Общий артериальный ствол над ДМЖП", "truncus arteriosus", 330, 310),
        (2, "trv", "Утолщённый трункальный клапан", "truncal valve", 424, 366),
        (3, "mpa", "Лёгочная артерия отходит от ствола", "PA from trunk", 384, 396),
        (4, "pab", "Ветви лёгочной артерии", "RPA / LPA", 300, 440),
        (5, "d-vsd", "Выходной ДМЖП", "outlet VSD", 452, 336),
        (6, "rv", "Правый желудочек", "RV", 410, 232),
        (7, "lv", "Левый желудочек", "LV", 594, 300),
        (8, "la", "Левое предсердие", "LA", 540, 482),
        (9, "ivs", "Межжелудочковая перегородка", "IVS", 520, 252),
        (10, "mv", "Митральный клапан", "MV", 556, 392),
        (None, "mac", "Контакт трункального клапана с МК", "truncal-mitral continuity", 486, 414),
        (None, "flow", "Кровь из обоих желудочков уходит в ствол", "flow", 600, 260),
        (None, "dao", "Нисходящая аорта", "DAo", 492, 610),
        (None, "lungs", "Лёгкие", "lungs", 186, 440),
        (None, "spine", "Позвоночник", "spine", 456, 666),
    ]
    return lvot_scene("cat-lvot", "Общий артериальный ствол на срезе LVOT: один сосуд над ДМЖП",
                      "Оригинальная учебная схема FetalCardio на основе схемы нормы LVOT: из сердца выходит один крупный сосуд — общий "
                      "артериальный ствол — над выходным дефектом межжелудочковой перегородки; трункальный клапан утолщён; от ствола "
                      "отходит лёгочная артерия, которая делится на ветви. Отдельного выхода ЛА из ПЖ нет. "
                      "Анатомический рисунок, не УЗ-изображение; пропорции условны.",
                      "Общий артериальный ствол на LVOT", M,
                      [FOOT_LV,
                       "Один сосуд над ДМЖП; ЛА отходит от ствола (вариант с коротким стволом ЛА), отдельного клапана ЛА нет.",
                       "Фиолетовый — смешанная кровь. ПП в этой плоскости не показано. Ход и длина ЛА условны.",
                       FOOT_END],
                      ivs=IVS_SHORT, ra="", arteries=arteries, defect=defect, flow=flow)


def tga_lvot():
    up = "M 444,352 C 428,368 414,386 404,408"
    lo = "M 474,392 C 460,406 446,424 436,446"
    rpa, lpa = "M 414,430 C 394,452 366,462 334,466", "M 424,440 C 432,468 452,486 482,494"
    ao_up = "M 404,282 C 384,280 352,280 300,282"
    ao_lo = "M 418,326 C 392,326 352,326 300,326"
    arteries = (f'<g id="s-pab" data-s="pab">{tube(mp(rpa), 15, "a")}{tube(mp(lpa), 15, "a")}</g>'
                + artery("pa", up, lo, (420, 428, 22, 7, 40), grad="g-ao")
                + f'<g id="s-pulv" data-s="pulv">{leaflet(mp("M 444,352 Q 434,366 432,378"))}{leaflet(mp("M 474,392 Q 460,396 448,394"))}</g>'
                + artery("ao", ao_up, ao_lo, (300, 304, 22, 7, 92), grad="g-pa"))
    a2, b2 = G0.fx(560, 300), G0.fx(470, 360)
    flow = f'<g id="s-flow" data-s="flow">{arrow(*a2, *b2)}</g>'
    M = [
        (1, "pa", "Лёгочная артерия отходит от ЛЖ", "PA from LV", 446, 404),
        (2, "pab", "Ранняя бифуркация: сосуд из ЛЖ делится", "RPA / LPA", 360, 470),
        (3, "ao", "Аорта отходит от ПЖ, кпереди", "Ao from RV", 340, 300),
        (4, "mac", "Митрально-лёгочный контакт", "mitral-pulmonary continuity", 486, 414),
        (5, "pulv", "Клапан лёгочной артерии", "PV", 476, 372),
        (6, "rv", "Правый желудочек", "RV", 440, 232),
        (7, "lv", "Левый желудочек", "LV", 594, 300),
        (8, "la", "Левое предсердие", "LA", 560, 492),
        (9, "ivs", "Межжелудочковая перегородка", "IVS", 520, 252),
        (10, "mv", "Митральный клапан", "MV", 556, 392),
        (None, "flow", "Кровь из ЛЖ уходит в лёгочную артерию", "flow", 600, 260),
        (None, "dao", "Нисходящая аорта", "DAo", 492, 610),
        (None, "lungs", "Лёгкие", "lungs", 186, 440),
        (None, "spine", "Позвоночник", "spine", 456, 666),
    ]
    return lvot_scene("tga-lvot", "Транспозиция магистральных артерий на срезе LVOT: из ЛЖ выходит ЛА",
                      "Оригинальная учебная схема FetalCardio на основе схемы нормы LVOT: сосуд, отходящий от левого желудочка, "
                      "идёт кзади и рано делится на ветви — это лёгочная артерия; аорта отходит от правого желудочка кпереди; "
                      "магистральные артерии идут параллельно, без перекреста. Анатомический рисунок, не УЗ-изображение; пропорции условны.",
                      "ТМА на LVOT: из ЛЖ — лёгочная артерия", M,
                      [FOOT_LV,
                       "d-ТМА: из ЛЖ — ЛА (идёт кзади и делится), из ПЖ — аорта кпереди; сосуды параллельны, перекреста нет.",
                       "Цвет — насыщение крови: из ЛЖ (красный) в ЛА, из ПЖ (синий) в аорту. ПП в этой плоскости не показано.",
                       FOOT_END],
                      ra="", arteries=arteries, flow=flow)


def dorv_lvot():
    ao_up = "M 400,292 C 380,286 350,282 300,280"
    ao_lo = "M 424,334 C 396,330 356,326 300,324"
    pa_up = "M 452,236 C 420,226 380,220 330,218"
    pa_lo = "M 472,272 C 440,264 400,260 330,258"
    cone = "M 424,334 L 444,352 L 474,392 C 456,388 440,378 426,364 C 414,354 410,342 424,334 Z"
    arteries = (artery("pa", pa_up, pa_lo, (332, 238, 19, 6, 92), grad="g-pa")
                + artery("ao", ao_up, ao_lo, (300, 302, 22, 7, 92), grad="g-ao")
                + f'<g id="s-cone" data-s="cone"><path class="cone" d="{mp(cone)}"/><path class="fibr" d="{mp(cone)}"/></g>'
                + f'<g id="s-aov" data-s="aov">{leaflet(mp("M 400,292 Q 388,300 386,310"))}{leaflet(mp("M 424,334 Q 410,330 398,326"))}</g>')
    defect = (f'<g id="s-d-vsd" data-s="d-vsd"><path class="vsd" d="{mp(VSD_SUBAO)}"/>'
              f'<path class="rim" d="{mp("M 462,318 L 476,330")}"/></g>')
    a2, b2 = G0.fx(560, 300), G0.fx(452, 340)
    a3, b3 = G0.fx(446, 330), G0.fx(410, 314)
    flow = f'<g id="s-flow" data-s="flow">{arrow(*a2, *b2)}{arrow(*a3, *b3)}</g>'
    M = [
        (1, "ao", "Аорта отходит от ПЖ", "Ao from RV", 346, 304),
        (2, "pa", "Лёгочная артерия отходит от ПЖ", "PA from RV", 380, 240),
        (3, "cone", "Мышечный конус под аортой — частый, но не обязательный признак", "subaortic conus", 432, 358),
        (4, "d-vsd", "ДМЖП — единственный выход из ЛЖ", "VSD", 476, 346),
        (5, "aov", "Аортальный клапан", "AoV", 380, 326),
        (6, "rv", "Правый желудочек", "RV", 470, 222),
        (7, "lv", "Левый желудочек", "LV", 594, 300),
        (8, "la", "Левое предсердие", "LA", 540, 482),
        (9, "ra", "Правое предсердие", "RA", 374, 460),
        (10, "ivs", "Межжелудочковая перегородка", "IVS", 520, 252),
        (11, "mv", "Митральный клапан", "MV", 556, 392),
        (None, "flow", "Кровь из ЛЖ — через ДМЖП в ПЖ и магистральные артерии", "flow", 600, 260),
        (None, "dao", "Нисходящая аорта", "DAo", 492, 610),
        (None, "lungs", "Лёгкие", "lungs", 186, 440),
        (None, "spine", "Позвоночник", "spine", 456, 666),
    ]
    return lvot_scene("dorv-lvot", "DORV на срезе LVOT: обе артерии отходят от ПЖ",
                      "Оригинальная учебная схема FetalCardio на основе схемы нормы LVOT: аорта и лёгочная артерия отходят от правого "
                      "желудочка и идут параллельно; между аортальным и митральным клапанами показан мышечный конус (частый, но не обязательный "
                      "признак); единственный выход из ЛЖ — ДМЖП. Анатомический рисунок, не УЗ-изображение; пропорции условны.",
                      "DORV на LVOT: обе артерии из ПЖ", M,
                      [FOOT_LV,
                       "Обе артерии отходят от ПЖ полностью или преимущественно. Подаортальный конус и отсутствие контакта",
                       "АК с МК встречаются часто, но для диагноза не обязательны. Вариант с подаортальным ДМЖП.",
                       FOOT_END],
                      ivs=IVS_SHORT, arteries=arteries, defect=defect, flow=flow, mac=False)


# =====================================================================================
# 3VV / 3VT — варианты
# =====================================================================================
FOOT_TR = "Поперечный срез: верх — передняя стенка, низ — позвоночник; левая сторона плода — справа на рисунке."


def line3(pa, svc, x1=560, x2=290):
    k = (svc[1] - pa[1]) / (svc[0] - pa[0])
    return f"M {x1},{pa[1] + k * (x1 - pa[0]):.1f} L {x2},{pa[1] + k * (x2 - pa[0]):.1f}"


def tof_3vv():
    ao, svc = (420, 404, 30), (328, 450, 14)
    mpa = "M 512,330 C 516,370 512,420 500,458"
    rpa = "M 496,458 C 466,496 402,508 336,500 C 304,496 282,486 264,470"
    lpa = "M 504,462 C 526,494 566,512 604,518"
    inner = f'''<g id="layer-mediastinum">{BV.thymus(BV.THY)}</g>
<g id="layer-vessels">
<g id="s-rpa" data-s="rpa">{tube(rpa, 12, "p")}</g>
<g id="s-lpa" data-s="lpa">{tube(lpa, 11, "p")}</g>
<g id="s-mpa" data-s="mpa">{tube(mpa, 24, "p")}</g>
{BV.dao()}
<g id="s-ao" data-s="ao">{vcirc(*ao, "a")}</g>
<g id="s-svc" data-s="svc">{vcirc(*svc, "v")}</g>
</g>
<g id="layer-annotations"><g id="s-line" data-s="line"><path class="lin" d="{line3((512, 380), svc)}"/></g></g>'''
    M = [
        (1, "mpa", "Узкий ствол лёгочной артерии", "small MPA", 540, 390),
        (2, "ao", "Расширенная аорта — самый крупный сосуд", "dilated Ao", 420, 404),
        (3, "svc", "Верхняя полая вена", "SVC", 306, 418),
        (4, "rpa", "Правая ветвь ЛА (узкая)", "RPA", 380, 522),
        (5, "lpa", "Левая ветвь ЛА (узкая)", "LPA", 598, 494),
        (6, "line", "Линия трёх сосудов", "3VV line", 566, 340),
        (7, "dao", "Нисходящая аорта", "DAo", 492, 610),
        (None, "thy", "Тимус", "thymus", 452, 266),
        (None, "lungs", "Лёгкие", "lungs", 200, 430),
        (None, "spine", "Позвоночник", "spine", 456, 666),
    ]
    svg = BV.thorax_scene("tof-3vv", "Тетрада Фалло на срезе 3VV: узкая ЛА, широкая аорта",
                          "Оригинальная учебная схема FetalCardio на основе схемы нормы 3VV: порядок сосудов сохранён, но соотношение "
                          "размеров нарушено — ствол лёгочной артерии и её ветви узкие, аорта расширена и становится самым крупным сосудом. "
                          "Анатомический рисунок, не УЗ-изображение; пропорции условны.",
                          "Тетрада Фалло на 3VV: ЛА < аорты", inner, M,
                          foot=[FOOT_TR,
                                "Порядок ЛА → аорта → ВПВ сохранён, размеры — нет: ЛА уже аорты (в норме — наоборот).",
                                "При атрезии ЛА ствол может не визуализироваться; кровоток в протоке тогда ретроградный.",
                                FOOT_END])
    return fix_head(svg, "tof-3vv"), M


def tga_3vv():
    ao, svc = (446, 352, 23), (328, 430, 14)
    mpa = "M 498,382 C 494,410 486,432 474,452"
    rpa = "M 470,452 C 440,488 384,500 330,494 C 300,490 280,480 264,466"
    lpa = "M 478,456 C 502,488 552,508 604,516"
    inner = f'''<g id="layer-mediastinum">{BV.thymus(BV.THY)}</g>
<g id="layer-vessels">
<g id="s-rpa" data-s="rpa">{tube(rpa, 17, "a")}</g>
<g id="s-lpa" data-s="lpa">{tube(lpa, 15, "a")}</g>
<g id="s-mpa" data-s="mpa">{tube(mpa, 44, "a")}</g>
{BV.dao()}
<g id="s-ao" data-s="ao">{vcirc(*ao, "p")}</g>
<g id="s-svc" data-s="svc">{vcirc(*svc, "v")}</g>
</g>'''
    M = [
        (1, "ao", "Аорта — кпереди и справа от ЛА", "anterior Ao", 446, 352),
        (2, "mpa", "Лёгочная артерия — кзади, делится на ветви", "posterior PA", 512, 420),
        (3, "svc", "Верхняя полая вена", "SVC", 306, 398),
        (4, "rpa", "Правая ветвь ЛА", "RPA", 380, 512),
        (5, "lpa", "Левая ветвь ЛА", "LPA", 598, 492),
        (6, "dao", "Нисходящая аорта", "DAo", 492, 610),
        (None, "thy", "Тимус", "thymus", 452, 266),
        (None, "lungs", "Лёгкие", "lungs", 200, 430),
        (None, "spine", "Позвоночник", "spine", 456, 666),
    ]
    svg = BV.thorax_scene("tga-3vv", "ТМА на срезе 3VV: аорта кпереди от лёгочной артерии",
                          "Оригинальная учебная схема FetalCardio на основе схемы нормы 3VV: нормального косого ряда «ЛА — аорта — ВПВ» нет; "
                          "аорта лежит кпереди и справа от лёгочной артерии, лёгочная артерия — кзади, делится на ветви; "
                          "в срезе видны два сосуда вместо трёх. Анатомический рисунок, не УЗ-изображение; пропорции условны.",
                          "ТМА на 3VV: аорта кпереди от ЛА", inner, M,
                          foot=[FOOT_TR,
                                "d-ТМА: аорта (из ПЖ) кпереди и справа, ЛА (из ЛЖ) кзади; ряда из трёх сосудов нет.",
                                "Цвет — насыщение крови: в аорте — из ПЖ (синий), в ЛА — из ЛЖ (красный).",
                                FOOT_END])
    return fix_head(svg, "tga-3vv"), M


def hlhs_3vt():
    mpa = "M 524,296 C 532,326 536,346 538,366"
    da = "M 538,366 C 542,450 518,540 470,590"
    arch = "M 412,350 C 412,430 428,520 450,584"
    arch_rev = "M 450,584 C 428,520 412,430 412,350"
    inner = f'''<g id="layer-mediastinum">{BV.thymus(BV.THY)}{trachea()}</g>
<g id="layer-vessels">
<g id="s-da" data-s="da">{tube(da, 36, "p")}</g>
<g id="s-mpa" data-s="mpa">{tube(mpa, 50, "p")}</g>
<g id="s-arch" data-s="arch">{tube(arch, 9, "a")}</g>
{BV.dao()}
<g id="s-svc" data-s="svc">{vcirc(318, 404, 15, "v")}</g>
</g>
<g id="layer-flow"><g id="s-rflow" data-s="rflow">{flow_arrows(arch_rev, [.35, .7], sz=5)}</g>
<g id="s-flow" data-s="flow">{flow_arrows(da, [.3, .62])}{flow_arrows(mpa, [.5])}</g></g>'''
    M = [
        (1, "arch", "Нитевидная (гипоплазированная) дуга аорты", "hypoplastic arch", 380, 470),
        (2, "rflow", "Ретроградный кровоток в дуге — от протока", "reversed arch flow", 440, 400),
        (3, "da", "Широкий артериальный проток", "DA", 566, 470),
        (4, "mpa", "Расширенный ствол ЛА", "MPA", 532, 330),
        (5, "dao", "Нисходящая аорта", "DAo", 492, 610),
        (6, "trachea", "Трахея", "trachea", 328, 588),
        (7, "svc", "Верхняя полая вена", "SVC", 290, 380),
        (None, "flow", "Кровоток в протоке — к нисходящей аорте", "flow", 500, 520),
        (None, "thy", "Тимус", "thymus", 452, 266),
        (None, "lungs", "Лёгкие", "lungs", 200, 430),
        (None, "spine", "Позвоночник", "spine", 456, 666),
    ]
    svg = BV.thorax_scene("hlhs-3vt", "СГЛОС на срезе 3VT: нитевидная дуга с ретроградным кровотоком",
                          "Оригинальная учебная схема FetalCardio на основе схемы нормы 3VT: поперечная дуга аорты нитевидная, "
                          "ствол ЛА и артериальный проток широкие; кровь в дугу поступает из протока, поэтому кровоток в дуге "
                          "ретроградный — навстречу кровотоку в протоке. Анатомический рисунок, не УЗ-изображение; пропорции условны.",
                          "СГЛОС на 3VT: ретроградная дуга", inner, M,
                          foot=[FOOT_TR,
                                "Дуга нитевидная; стрелки в дуге направлены от нисходящей аорты к сердцу — ретроградный кровоток.",
                                "На ЦДК дуга и проток окрашены в разные цвета. Ретроградная дуга бывает и при критической обструкции ЛЖ.",
                                FOOT_END])
    return fix_head(svg, "hlhs-3vt"), M


# =====================================================================================
# Клапанные пороки: стеноз ЛА (RVOT), стеноз аорты (LVOT)
# =====================================================================================
def ps_rvot():
    rv_myo = ("M 352,262 C 370,222 470,212 524,238 C 556,254 560,296 542,322 C 526,344 500,352 478,352 "
              "L 424,352 C 380,350 342,310 352,262 Z")
    rv_cav = ("M 372,266 C 388,238 466,232 510,252 C 532,264 536,294 522,314 C 510,330 492,334 476,334 "
              "L 430,334 C 398,332 364,302 372,266 Z")
    mpa = "M 484,348 C 496,392 504,430 502,468"
    rpa = "M 496,470 C 466,506 400,516 334,508 C 302,504 282,494 264,478"
    lpa = "M 504,474 C 530,504 568,520 604,526"
    da = "M 502,474 C 512,520 494,566 466,590"
    dome = "M 466,344 C 474,368 490,370 504,342"
    inner = f'''<g id="layer-heart">
<g id="s-rvot" data-s="rvot"><path class="myo" d="{rv_myo}"/><path class="fibr" d="{rv_myo}"/><path class="cavr" d="{rv_cav}"/>
{bundle("M 392,282 Q 404,296 420,300", 4)}{bundle("M 420,256 Q 428,270 440,276", 4)}</g>
</g>
<g id="layer-vessels">
<g id="s-rpa" data-s="rpa">{tube(rpa, 19, "p")}</g>
<g id="s-lpa" data-s="lpa">{tube(lpa, 17, "p")}</g>
<g id="s-da" data-s="da">{tube(da, 26, "p")}</g>
<g id="s-mpa" data-s="mpa">{tube(mpa, 58, "p")}</g>
{BV.dao()}
<g id="s-ao" data-s="ao">{vcirc(396, 426, 25, "a")}</g>
<g id="s-svc" data-s="svc">{vcirc(322, 446, 15, "v")}</g>
<g id="s-pv" data-s="pv"><path class="lfe" stroke-width="10" d="{dome}"/><path class="lf" stroke-width="6.4" d="{dome}"/>
<path d="M 466,344 L 504,342" stroke="#2b1a1a" stroke-width="2.2"/></g>
</g>
<g id="layer-flow"><g id="s-jet" data-s="jet"><path class="jet" d="M 486,368 C 490,396 494,420 496,448"/>{arrow(492, 430, 496, 456)}</g></g>'''
    M = [
        (1, "pv", "Утолщённый куполообразный клапан ЛА", "domed PV", 532, 352),
        (2, "mpa", "Постстенотическое расширение ствола ЛА", "dilated MPA", 532, 420),
        (3, "jet", "Турбулентный поток через клапан", "jet", 466, 420),
        (4, "rvot", "Выходной отдел ПЖ (стенка утолщена)", "RVOT", 420, 300),
        (5, "rpa", "Правая ветвь ЛА", "RPA", 360, 520),
        (6, "lpa", "Левая ветвь ЛА", "LPA", 590, 500),
        (7, "da", "Артериальный проток", "DA", 520, 546),
        (8, "ao", "Аорта (поперечное сечение)", "Ao", 396, 426),
        (9, "svc", "Верхняя полая вена", "SVC", 322, 412),
        (10, "dao", "Нисходящая аорта", "DAo", 492, 610),
        (None, "lungs", "Лёгкие", "lungs", 200, 430),
        (None, "spine", "Позвоночник", "spine", 456, 666),
    ]
    svg = BV.thorax_scene("ps-rvot", "Стеноз клапана лёгочной артерии на срезе RVOT",
                          "Оригинальная учебная схема FetalCardio на основе схемы нормы RVOT: створки клапана ЛА утолщены и в систолу "
                          "открываются куполом; через суженное отверстие проходит турбулентный поток; ствол ЛА за клапаном расширен "
                          "(постстенотическое расширение). Анатомический рисунок, не УЗ-изображение; пропорции условны.",
                          "Стеноз клапана ЛА на RVOT", inner, M,
                          foot=[FOOT_TR,
                                "Клапанный стеноз ЛА: купол створок в систолу, турбулентный поток, расширение ствола за клапаном.",
                                "При критическом стенозе / атрезии кровоток в протоке может стать ретроградным (из аорты в ЛА).",
                                FOOT_END])
    return fix_head(svg, "ps-rvot"), M


def as_lvot():
    up = "M 444,352 C 426,336 400,324 376,318 C 350,310 326,300 296,290"
    lo = "M 474,392 C 450,388 418,382 392,376 C 364,368 340,360 296,348"
    dome1, dome2 = "M 444,352 C 438,366 446,376 458,378", "M 474,392 C 470,382 464,378 458,378"
    arteries = (artery("ao", up, lo, (298, 319, 31, 8, 100), hl="M 420,350 C 390,336 350,322 300,306")
                + f'<g id="s-aov" data-s="aov"><path class="lfe" stroke-width="10" d="{mp(dome1)}"/><path class="lf" stroke-width="6.4" d="{mp(dome1)}"/>'
                f'<path class="lfe" stroke-width="10" d="{mp(dome2)}"/><path class="lf" stroke-width="6.4" d="{mp(dome2)}"/></g>')
    j0, j1 = G0.fx(452, 366), G0.fx(380, 340)
    flow = f'<g id="s-jet" data-s="jet"><path class="jet" d="M {j0[0]},{j0[1]} L {j1[0]},{j1[1]}"/>{arrow(*G0.fx(396, 346), *G0.fx(372, 336))}</g>'
    efe = f'<g id="layer-efe"><g id="s-efe" data-s="efe"><path class="efe" d="{mp("M 452,346 C 496,308 538,260 566,218 C 598,226 622,264 626,312 C 629,354 618,388 600,410")}"/></g></g>'
    M = [
        (1, "aov", "Утолщённый куполообразный аортальный клапан", "domed AoV", 420, 392),
        (2, "ao", "Постстенотическое расширение восходящей аорты", "dilated AAo", 336, 330),
        (3, "jet", "Турбулентный поток через клапан", "jet", 400, 312),
        (4, "lv", "Левый желудочек", "LV", 594, 300),
        (5, "efe", "Яркий эндокард ЛЖ (при тяжёлом стенозе)", "EFE", 640, 330),
        (6, "mac", "Митрально-аортальный контакт", "mitral-aortic continuity", 486, 414),
        (7, "ivs", "Межжелудочковая перегородка", "IVS", 524, 252),
        (8, "mv", "Митральный клапан", "MV", 556, 392),
        (9, "rv", "Правый желудочек", "RV", 418, 248),
        (10, "la", "Левое предсердие", "LA", 540, 482),
        (11, "ra", "Правое предсердие", "RA", 374, 460),
        (None, "dao", "Нисходящая аорта", "DAo", 492, 610),
        (None, "lungs", "Лёгкие", "lungs", 186, 440),
        (None, "spine", "Позвоночник", "spine", 456, 666),
    ]
    return lvot_scene("as-lvot", "Стеноз аортального клапана на срезе LVOT",
                      "Оригинальная учебная схема FetalCardio на основе схемы нормы LVOT: створки аортального клапана утолщены "
                      "и в систолу открываются куполом; через суженное отверстие проходит турбулентный поток; восходящая аорта за клапаном "
                      "расширена; при тяжёлом стенозе эндокард ЛЖ становится ярким. Анатомический рисунок, не УЗ-изображение; пропорции условны.",
                      "Стеноз аортального клапана на LVOT", M,
                      [FOOT_LV,
                       "Клапанный стеноз аорты: купол створок, турбулентный поток, расширение восходящей аорты.",
                       "Критический стеноз может прогрессировать в СГЛОС: оценивайте размер и функцию ЛЖ, кровоток в дуге.",
                       FOOT_END],
                      arteries=arteries, flow=flow, extra=efe)


# =====================================================================================
# Гетеротаксия: правый и левый изомеризм (поперечный срез живота)
# =====================================================================================
def isomerism(kind):
    cx, cy, rx, ry = 400, 470, 300, 288
    sx, sy = 400, 646
    liver = ("M 150,380 C 160,270 260,214 400,212 C 540,214 640,270 650,380 C 650,420 610,436 560,440 "
             "C 520,444 470,470 440,520 C 420,560 380,560 360,520 C 330,470 280,444 240,440 C 190,436 150,420 150,380 Z")
    stom = "M 560,452 C 610,444 646,480 642,530 C 638,578 600,600 562,594 C 526,588 504,556 506,520 C 508,482 526,458 560,452 Z"
    lum = "M 562,470 C 598,464 624,494 620,530 C 616,566 590,580 564,576 C 538,572 524,548 526,520 C 528,492 540,474 562,470 Z"
    o = [head(f"{kind}-situs", "", "", ""), BV.orient_tr(cy - ry), '<g id="heart">', BV.body_frame(cx, cy, rx, ry, thorax=False)]
    o.append(f'''<g id="layer-organs">
<g id="s-liver" data-s="liver"><path class="liver" d="{liver}"/><path class="livert" d="{liver}"/></g>
<g id="s-stomach" data-s="stomach"><path class="stw" d="{stom}"/><path class="stl" d="{lum}"/></g>
</g>''')
    if kind == "rai":
        vessels = (f'<g id="s-ao" data-s="ao">{vcirc(352, 604, 17, "a")}</g>'
                   f'<g id="s-ivc" data-s="ivc"><ellipse cx="350" cy="566" rx="20" ry="16" fill="url(#g-sv)" stroke="#2b1a1a" stroke-width="2"/>'
                   f'<ellipse cx="343" cy="560" rx="7" ry="3.5" fill="#fff" opacity=".35"/></g>'
                   f'<g id="s-same" data-s="same"><path class="ann" d="M 312,540 L 312,626"/></g>')
        M = [
            (1, "ivc", "Нижняя полая вена — кпереди от аорты", "IVC", 314, 566),
            (2, "ao", "Аорта — на той же стороне позвоночника, что и НПВ", "Ao", 386, 604),
            (3, "same", "Сосуды на одной стороне (юкстапозиция)", "juxtaposition", 290, 600),
            (4, "liver", "Печень по средней линии (симметричная)", "midline liver", 400, 300),
            (5, "stomach", "Желудок (положение вариабельно)", "stomach", 574, 520),
            (None, "midline", "Средняя линия (ось позвоночника)", "midline", 400, 470),
            (None, "spine", "Позвоночник", "spine", 446, 676),
        ]
        title = "Правый изомеризм (аспления): аорта и НПВ на одной стороне"
        desc = ("Оригинальная учебная схема FetalCardio на основе схемы situs: поперечный срез живота; печень расположена по средней линии, "
                "брюшная аорта и нижняя полая вена лежат на одной стороне от позвоночника, вена — кпереди от аорты (юкстапозиция); "
                "положение желудка вариабельно. Анатомический рисунок, не УЗ-изображение; пропорции условны.")
        header = "Правый изомеризм: юкстапозиция аорты и НПВ"
        f2 = "Правый изомеризм: аорта и НПВ на одной стороне, НПВ кпереди; часто АВСД, ТАДЛВ, обструкция выхода ПЖ."
    else:
        vessels = (f'<g id="s-ao" data-s="ao">{vcirc(426, 596, 17, "a")}</g>'
                   f'<g id="s-azy" data-s="azy">{vcirc(372, 606, 12, "v")}</g>'
                   f'<g id="s-noivc" data-s="noivc"><ellipse cx="348" cy="548" rx="20" ry="16" fill="none" stroke="#2b1a1a" stroke-width="1.6" stroke-dasharray="4 3"/>'
                   f'<path d="M 334,534 L 362,562 M 362,534 L 334,562" stroke="#c0392b" stroke-width="2.2"/></g>')
        M = [
            (1, "azy", "Непарная вена — продолжение НПВ, рядом с аортой", "azygos", 352, 632),
            (2, "ao", "Аорта", "Ao", 452, 572),
            (3, "noivc", "Печёночный сегмент НПВ отсутствует", "interrupted IVC", 314, 540),
            (4, "liver", "Печень по средней линии (симметричная)", "midline liver", 400, 300),
            (5, "stomach", "Желудок (положение вариабельно)", "stomach", 574, 520),
            (None, "midline", "Средняя линия (ось позвоночника)", "midline", 400, 470),
            (None, "spine", "Позвоночник", "spine", 446, 676),
        ]
        title = "Левый изомеризм (полиспления): перерыв НПВ с продолжением в непарную вену"
        desc = ("Оригинальная учебная схема FetalCardio на основе схемы situs: поперечный срез живота; печёночный сегмент нижней полой "
                "вены отсутствует, кровь оттекает по расширенной непарной вене, которая лежит кзади, рядом с аортой "
                "(«двойной сосуд»); печень по средней линии, положение желудка вариабельно. Анатомический рисунок, не УЗ-изображение.")
        header = "Левый изомеризм: перерыв НПВ, непарная вена"
        f2 = "Левый изомеризм: НПВ прервана, рядом с аортой — непарная вена; часто АВСД, блокада сердца."
    o[0] = head(f"{kind}-situs", title, desc, header)
    o.append(f'<g id="layer-vessels">{vessels}</g>')
    o.append(f'<g id="layer-spine">{BV.spine(sx, sy)}</g><g id="s-midline" data-s="midline"><path class="mid" d="M {sx},204 L {sx},610"/></g>')
    o.append(labels(M) + "\n</g>")
    o.append(V.foot(["Поперечный срез живота: верх — передняя стенка, низ — позвоночник; левая сторона плода — справа на рисунке.",
                     f2, "Положение органов при изомеризме вариабельно; на схеме — один из вариантов.", FOOT_END]))
    return "\n".join(o), M


# =====================================================================================
# Правая дуга аорты с левым протоком: U-образная фигура вокруг трахеи (3VT)
# =====================================================================================
def rab_3vt():
    mpa = "M 526,300 C 532,326 534,346 534,366"
    da = "M 534,366 C 536,450 518,540 470,598"
    arch = "M 392,336 C 360,400 316,480 314,548 C 312,592 340,620 390,626 C 420,628 444,618 456,604"
    inner = f'''<g id="layer-mediastinum">{BV.thymus(BV.THY)}{trachea(366, 556)}</g>
<g id="layer-vessels">
<g id="s-da" data-s="da">{tube(da, 30, "p")}</g>
<g id="s-mpa" data-s="mpa">{tube(mpa, 40, "p")}</g>
<g id="s-arch" data-s="arch">{tube(arch, 26, "a")}</g>
<g id="s-dao" data-s="dao">{vcirc(462, 600, 18, "a")}</g>
<g id="s-svc" data-s="svc">{vcirc(300, 380, 15, "v")}</g>
</g>
<g id="layer-flow"><g id="s-flow" data-s="flow">{flow_arrows(arch, [.25, .55])}{flow_arrows(da, [.3, .62])}</g></g>
<g id="layer-annotations"><g id="s-ring" data-s="ring"><circle cx="366" cy="556" r="44" fill="none" stroke="#16794a" stroke-width="2" stroke-dasharray="8 5"/></g></g>'''
    M = [
        (1, "arch", "Дуга аорты справа от трахеи", "right aortic arch", 300, 470),
        (2, "da", "Левый артериальный проток", "left DA", 560, 470),
        (3, "ring", "U-образная фигура — сосудистое кольцо вокруг трахеи", "U sign", 420, 520),
        (4, "trachea", "Трахея (между дугой и протоком)", "trachea", 366, 556),
        (5, "mpa", "Ствол лёгочной артерии", "MPA", 530, 334),
        (6, "dao", "Нисходящая аорта", "DAo", 498, 618),
        (7, "svc", "Верхняя полая вена", "SVC", 272, 356),
        (None, "flow", "Кровоток в дуге и протоке — к нисходящей аорте", "flow", 470, 420),
        (None, "thy", "Тимус", "thymus", 452, 266),
        (None, "lungs", "Лёгкие", "lungs", 200, 430),
        (None, "spine", "Позвоночник", "spine", 456, 666),
    ]
    svg = BV.thorax_scene("rab-3vt", "Правая дуга аорты с левым протоком на срезе 3VT: U-образная фигура",
                          "Оригинальная учебная схема FetalCardio на основе схемы нормы 3VT: дуга аорты проходит справа от трахеи, "
                          "артериальный проток — слева; позади трахеи они соединяются, образуя U-образную фигуру — сосудистое кольцо "
                          "вокруг трахеи (и пищевода). Анатомический рисунок, не УЗ-изображение; пропорции условны.",
                          "Правая дуга аорты + левый проток на 3VT", inner, M,
                          foot=[FOOT_TR,
                                "U-образная фигура: дуга справа, проток слева, трахея между ними — сосудистое кольцо.",
                                "Правая дуга бывает изолированной и при конотрункальных пороках (ТФ, ОАС); ищите делецию 22q11.",
                                FOOT_END])
    return fix_head(svg, "rab-3vt"), M


# =====================================================================================
# Корригированная ТМА: инверсия желудочков на 4CV
# =====================================================================================
def cctga_4cv():
    rtr = [("M 636,262 Q 620,262 602,272", 5), ("M 614,232 Q 598,236 584,250", 5.5), ("M 590,196 Q 578,206 568,222", 5),
           ("M 560,168 Q 552,182 548,198", 4.5), ("M 528,146 Q 524,162 520,176", 4)]
    mb = "M 486,236 Q 560,258 630,300"
    lv_morph = ("".join(bundle(d, w) for d, w in rtr) + f'<g id="s-mb" data-s="mb">{bundle(mb, 9)}</g>')
    rv_morph = f'<path class="pm" d="M 266,300 C 280,296 300,300 310,312 C 312,320 306,326 296,326 C 284,326 274,330 266,336 Z"/>'
    # AV-клапаны: слева на рисунке — митральный (выше), справа — трёхстворчатый (ближе к верхушке)
    l_sept, l_ant = "M 448,384 Q 410,372 372,370", "M 284,398.7 Q 330,380 372,370"
    r_sept, r_ant = "M 471.7,352 Q 510,344 546,348", "M 614,388 Q 584,360 546,350"
    av = (f'<g id="s-mv" data-s="mv">{chords([((400, 376), (300, 318)), ((350, 376), (296, 320))])}{leaflet(l_sept)}{leaflet(l_ant)}</g>'
          f'<g id="s-tv" data-s="tv">{chords([((508, 346), (470, 300)), ((560, 352), (600, 300)), ((590, 368), (604, 302))])}{leaflet(r_sept)}{leaflet(r_ant)}</g>')
    extra = ('<g id="layer-annotations"><g id="s-offset" data-s="offset">'
             '<line class="and" x1="432" y1="384" x2="512" y2="384"/><line class="and" x1="456" y1="352" x2="512" y2="352"/>'
             '<line class="an" x1="505" y1="358" x2="505" y2="378"/><path class="anf" d="M 505,352 L 500.5,360 L 509.5,360 Z"/>'
             '<path class="anf" d="M 505,384 L 500.5,376 L 509.5,376 Z"/></g></g>')
    M = [
        (1, "mlv", "Морфологически левый желудочек — справа (гладкая стенка)", "morphologic LV", 372, 290),
        (2, "mrv", "Морфологически правый желудочек — слева (трабекулы)", "morphologic RV", 560, 236),
        (3, "mb", "Модераторный пучок — в левостороннем желудочке", "moderator band", 556, 268),
        (4, "tv", "Трёхстворчатый клапан — слева, ближе к верхушке", "TV", 576, 344),
        (5, "mv", "Митральный клапан — справа", "MV", 340, 356),
        (6, "offset", "Обратное смещение AV-клапанов", "reversed offset", 530, 368),
        (7, "ra", "Правое предсердие", "RA", 336, 470),
        (8, "la", "Левое предсердие", "LA", 586, 480),
        (9, "ivs", "Межжелудочковая перегородка", "IVS", 478, 250),
        (None, "dao", "Нисходящая аорта", "DAo", 596, 610),
        (None, "pv", "Лёгочные вены", "pulmonary veins", 470, 588),
    ]
    return fourch("cctga-4cv", "Корригированная ТМА на четырёхкамерном срезе: инверсия желудочков",
                  "Оригинальная учебная схема FetalCardio на основе атласа 4CV: предсердия на своих местах, но желудочки инвертированы — "
                  "правое предсердие соединяется через митральный клапан с гладкостенным морфологически левым желудочком (справа), "
                  "левое предсердие через трёхстворчатый клапан — с трабекулярным морфологически правым желудочком с модераторным "
                  "пучком (слева); смещение AV-клапанов обратное. Анатомический рисунок, не УЗ-изображение.",
                  "Корригированная ТМА на 4CV: инверсия желудочков", M,
                  ["Апикальная ориентация, как в атласе 4CV: верхушка вверху, предсердия внизу; правая сторона плода — слева.",
                   "ккТМА: AV-дискордантность (ПП → мЛЖ, ЛП → мПЖ) + ВА-дискордантность; магистральные артерии — на LVOT/3VV.",
                   "Ключ к морфологии желудочка — модераторный пучок и клапан, прикреплённый ближе к верхушке (ТК).",
                   FOOT_END],
                  rv_key="mlv", lv_key="mrv", rv_amps=[0, 3, 3, 2, 0], lv_amps=[0, 12, 12, 6, 0],
                  rv_morph=rv_morph, lv_morph=lv_morph, av=av, extra=extra, crux=f'<path class="fib" d="{B.CFB}"/>',
                  sides=("ПРАВАЯ СТОРОНА ПЛОДА", "ЛЕВАЯ СТОРОНА ПЛОДА"))


BUILDERS = {"ps-rvot": ps_rvot, "as-lvot": as_lvot, "rai-situs": lambda: isomerism("rai"), "lai-situs": lambda: isomerism("lai"),
            "rab-3vt": rab_3vt, "cctga-4cv": cctga_4cv,
            "tof-3vv": tof_3vv, "tga-3vv": tga_3vv, "hlhs-3vt": hlhs_3vt,
            "tof-lvot": tof_lvot, "cat-lvot": cat_lvot, "tga-lvot": tga_lvot, "dorv-lvot": dorv_lvot,
            "coa-3vt": coa_3vt, "coa-arch": coa_arch, "hlhs-4cv": hlhs_4cv, "avsd-4cv": avsd_4cv,
            "ebstein-4cv": ebstein_4cv, "tapvr-4cv": tapvr_4cv}

if __name__ == "__main__":
    out = sys.argv[1] if len(sys.argv) > 1 else "../../atlas"
    only = sys.argv[2:] or list(BUILDERS)
    for name in only:
        s, _ = BUILDERS[name]()
        open(os.path.join(out, name + ".svg"), "w", encoding="utf-8").write(s)
        print("ok", name, len(s))
