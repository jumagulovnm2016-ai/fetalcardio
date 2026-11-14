"""Малая схема среза LVOT для schemes.js (SV.lvot) из общей геометрии lvot_geom.py.
Запуск: cd tools/atlas && python3 build_scheme_lvot.py  — печатает тело функции lvot() для schemes.js."""
import lvot_geom as G

K, X0, Y0 = 0.31, 184, 116
fx = lambda x, y: (round(X0 + K * (x - 470), 1), round(Y0 + K * (y - 380), 1))
mp = lambda d: G.map_path(d, fx)
P = lambda p: "%.1f,%.1f" % fx(*p)


def inner():
    cx, cy, rx, ry, ang = G.AO_CUT
    ccx, ccy = fx(cx, cy)
    mv = "".join(f'<path class="vl" d="{mp(d)}"/>' for d in G.MV)
    aov = "".join(f'<path class="vl" stroke-width="1.6" d="{mp(d)}"/>' for d in G.AOV)
    pv = "".join(f'<path class="svn" stroke-width="5" d="{mp(d)}"/>' for d in G.PV)
    trab = "".join(f'<path class="vl" stroke="var(--sv-wall)" stroke-width="2.2" d="{mp(d)}"/>' for d, _ in G.TRAB)
    return f"""<!-- Срез LVOT (версия 3, геометрия — tools/atlas/lvot_geom.py): ось сердца ~45° влево, верхушку образует ЛЖ.
     Аорта отходит от ЛЖ в центре сердца и идёт к правому плечу плода (на рисунке — влево и кпереди), кзади от ПЖ;
     МЖП продолжается в переднюю стенку аорты, передняя створка МК — в заднюю; кзади от корня аорты — ЛП, справа и кзади — ПП. -->
{pv}
<path class="pc" d="{mp(G.OUT)}" transform="translate(184 116) scale(1.06) translate(-184 -116)"/>
<path class="my" d="{mp(G.OUT)}"/>
<path class="ch" d="{mp(G.RV)}"/><path class="ch" d="{mp(G.LV)}"/><path class="ch" d="{mp(G.LA)}"/><path class="ch" d="{mp(G.RA)}"/>
{trab}<path class="mb" stroke-width="3.2" d="{mp(G.MB)}"/>
<path class="ao" d="{mp(G.AO)}"/>
<ellipse cx="{ccx}" cy="{ccy}" rx="{rx * K:.1f}" ry="{ry * K:.1f}" transform="rotate({ang} {ccx} {ccy})" fill="var(--sv-wall-edge)" opacity=".55"/>
{aov}{mv}
<circle cx="{P(G.MA).split(',')[0]}" cy="{P(G.MA).split(',')[1]}" r="2.4" fill="var(--sv-bg)" stroke="var(--sv-wall-edge)" stroke-width="1"/>
<circle class="ao" cx="180" cy="196" r="9"/>"""


LABELS = """
<path class="ld" d="M 168,74 L 130,40"/><text class="tx" x="110" y="36">ПЖ</text>
<path class="ld" d="M 222,92 L 262,80"/><text class="tx" x="264" y="78">ЛЖ</text>
<path class="ld" d="M 206,148 L 238,180"/><text class="tx" x="236" y="194">ЛП</text>
<path class="ld" d="M 158,140 L 112,162"/><text class="tx" x="90" y="170">ПП</text>
<path class="ld" d="M 136,96 L 86,100"/><text class="tx" x="48" y="98">восх.</text><text class="tx" x="48" y="111">Ао</text>
<path class="ld" d="M 176,106 L 200,24"/><text class="tm" x="160" y="20">МЖП → передняя стенка Ао</text>
<path class="ld" d="M 185,120 L 120,200"/><text class="tm" x="40" y="208">митрально-аортальный</text><text class="tm" x="40" y="218">контакт</text>
<path class="ld" d="M 174,113 L 84,136"/><text class="tm" x="24" y="140">аортальный клапан</text>
<path class="ld" d="M 189,199 L 232,212"/><text class="tx" x="234" y="216">нисх. Ао</text>"""

if __name__ == "__main__":
    print("    return this.frame(`\n" + inner() + LABELS + "`);")
