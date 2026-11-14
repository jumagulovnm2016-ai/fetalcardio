/* Схематические рисунки срезов (не УЗ-изображения). Версия 2: анатомически приближённые.
   Ориентация, как на поперечном срезе плода: верх — передняя стенка, низ — позвоночник,
   левая сторона плода — справа на рисунке. Пропорции приближены к норме II триместра,
   но не являются диагностическими. Проверено автором (Жумагулов Н.М.) 12.11.2026;
   схема LVOT перерисована 14.11.2026 (версия 3) — черновик до проверки автором. */

const SV = {
  /* Общая рамка: поперечный срез туловища — кожа, рёбра, позвоночник с тремя ядрами окостенения. */
  frame(inner, { abdomen = false, lungs = true } = {}) {
    const ribs = abdomen
      ? `<path class="rib" d="M58,92 A118,104 0 0 0 48,170"/><path class="rib" d="M262,92 A118,104 0 0 1 272,170"/>`
      : `<path class="rib" d="M64,74 A116,104 0 0 0 40,150"/><path class="rib" d="M50,178 A116,104 0 0 0 92,224"/>
         <path class="rib" d="M256,74 A116,104 0 0 1 280,150"/><path class="rib" d="M270,178 A116,104 0 0 1 228,224"/>`;
    const lung = lungs
      ? `<path class="lu" d="M160,34 C96,34 40,78 36,138 C34,186 66,224 118,236 L202,236 C254,224 286,186 284,138 C280,78 224,34 160,34 Z"/>`
      : "";
    return `<svg viewBox="0 0 320 280" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui,sans-serif">
<style>
.skin{fill:var(--sv-bg);stroke:var(--sv-wall-edge);stroke-width:2.5}
.lu{fill:var(--sv-air)} .rib{fill:none;stroke:var(--sv-bone);stroke-width:5;stroke-linecap:round}
.bn{fill:var(--sv-bone)} .bnl{fill:none;stroke:var(--sv-bone);stroke-width:5;stroke-linecap:round}
.my{fill:var(--sv-wall);stroke:var(--sv-wall-edge);stroke-width:1.2} .ch{fill:var(--sv-chamber)}
.pc{fill:none;stroke:var(--sv-wall-edge);stroke-width:1;stroke-dasharray:3 2;opacity:.8}
.vl{stroke:var(--sv-valve);stroke-width:2;fill:none;stroke-linecap:round}
.mb{stroke:var(--sv-wall);stroke-width:4;stroke-linecap:round;fill:none}
.ao{fill:var(--sv-ao)} .pa{fill:var(--sv-pa)} .vn{fill:var(--sv-vein)}
.sao{stroke:var(--sv-ao);fill:none;stroke-linecap:round} .spa{stroke:var(--sv-pa);fill:none;stroke-linecap:round}
.svn{stroke:var(--sv-vein);fill:none;stroke-linecap:round}
.org{fill:var(--sv-organ)} .fl{fill:var(--sv-fluid)}
.tr{fill:var(--sv-air);stroke:var(--sv-bone);stroke-width:3}
.ld{stroke:var(--sv-text);stroke-width:.8;opacity:.55;fill:none}
.tx{fill:var(--sv-text);font-size:11.5px;font-weight:700;paint-order:stroke;stroke:var(--sv-halo);stroke-width:3px}
.tm{fill:var(--sv-text);font-size:9.5px;opacity:.85;paint-order:stroke;stroke:var(--sv-halo);stroke-width:3px}
</style>
<ellipse class="skin" cx="160" cy="136" rx="138" ry="116"/>
${lung}${ribs}
<g>
  <circle class="bn" cx="160" cy="222" r="13"/>
  <path class="bnl" d="M150,236 L146,248"/><path class="bnl" d="M170,236 L174,248"/>
</g>
${inner}
<text class="tm" x="160" y="276" text-anchor="middle">позвоночник</text>
<text class="tm" x="4" y="14">↑ кпереди</text>
<text class="tx" x="4" y="140">П</text><text class="tx" x="306" y="140">Л</text>
</svg>`;
  },

  /* Сердце в «апикальной» системе координат: верхушка вверх, предсердия вниз, правые отделы слева.
     Поворот на 45° по часовой стрелке даёт нормальную ось: верхушка кпереди и влево,
     ПЖ — самый передний, ЛП — самый задний, у нисходящей аорты. */
  heart() {
    return `
  <path class="pc" d="M14,-82 C52,-80 74,-38 72,6 C70,38 58,60 32,68 L-32,68 C-60,60 -72,38 -72,6 C-72,-38 -48,-82 14,-82 Z"/>
  <path class="my" d="M12,-74 C46,-72 64,-34 62,6 C60,34 50,52 28,58 L-28,58 C-52,52 -62,34 -62,6 C-62,-34 -42,-74 12,-74 Z"/>
  <!-- ЛЖ: формирует верхушку, гладкая септальная поверхность -->
  <path class="ch" d="M5,6 C5,-24 7,-50 11,-63 C29,-60 47,-36 49,-6 C50,3 47,7 41,7 Z"/>
  <!-- ПЖ: короче, не доходит до верхушки, трабекулярный -->
  <path class="ch" d="M-5,3 C-5,-22 -8,-42 -15,-52 C-36,-48 -52,-26 -51,-2 C-51,3 -48,5 -42,5 Z"/>
  <path class="mb" d="M-8,-17 C-22,-20 -34,-16 -45,-9"/>
  <path d="M-45,-34 l6,3 M-49,-22 l7,2 M-24,-48 l3,6" stroke="var(--sv-wall)" stroke-width="2.4" stroke-linecap="round"/>
  <!-- предсердия -->
  <path class="ch" d="M-4,14 C-4,32 -14,46 -30,49 C-48,47 -54,32 -52,12 Z"/>
  <path class="ch" d="M4,16 C4,32 14,44 30,46 C46,44 50,30 48,16 Z"/>
  <!-- овальное окно и его клапан в ЛП -->
  <rect x="-4" y="22" width="8" height="10" class="ch"/>
  <path class="vl" d="M4,22 C11,25 14,30 14,36" stroke-width="1.6"/>
  <!-- АВ-клапаны (диастола): септальная створка ТК прикреплена ближе к верхушке, чем МК -->
  <path class="vl" d="M-4,7 L-13,-10"/><path class="vl" d="M-50,8 L-40,-10"/>
  <path class="vl" d="M4,13 L13,-6"/><path class="vl" d="M48,12 L39,-7"/>
  <!-- лёгочные вены впадают в заднюю стенку ЛП -->
  <path class="svn" d="M18,44 L32,58" stroke-width="6"/><path class="svn" d="M38,40 L52,54" stroke-width="6"/>`;
  },

  situs() {
    return this.frame(`
<!-- печень: правая доля крупнее, заходит влево -->
<path class="org" d="M38,140 C34,92 70,52 128,44 C178,40 206,56 210,70 C186,82 168,100 158,128 C150,160 136,196 112,212 C70,206 42,180 38,140 Z"/>
<!-- желудок слева -->
<path class="fl" d="M206,82 C236,74 266,96 266,126 C266,152 246,164 228,158 C214,152 200,136 196,116 C192,98 196,86 206,82 Z"/>
<!-- пупочная вена → портальный синус (J-образный ход вправо) -->
<path class="svn" d="M162,26 C162,52 158,72 150,90 C140,112 120,118 104,112" stroke-width="7"/>
<!-- нисходящая аорта: слева и кпереди от позвоночника; НПВ: справа и кпереди от аорты -->
<circle class="ao" cx="180" cy="200" r="9"/>
<ellipse class="vn" cx="138" cy="186" rx="10" ry="8"/>
<text class="tx" x="58" y="160">печень</text>
<path class="ld" d="M244,118 L274,86"/><text class="tx" x="250" y="80">желудок</text>
<text class="tm" x="170" y="40">пупочная вена</text><path class="ld" d="M108,112 L88,128"/><text class="tm" x="40" y="138">портальный синус</text>
<path class="ld" d="M189,203 L232,214"/><text class="tx" x="234" y="218">нисх. Ао</text>
<path class="ld" d="M129,189 L88,206"/><text class="tx" x="64" y="214">НПВ</text>`, { abdomen: true, lungs: false });
  },

  fourChamber() {
    return this.frame(`
<g transform="translate(166 124) rotate(45) scale(.86)">${this.heart()}</g>
<circle class="ao" cx="182" cy="198" r="9"/>
<path class="ld" d="M164,92 L122,52"/><text class="tx" x="102" y="48">ПЖ</text>
<path class="ld" d="M199,123 L240,102"/><text class="tx" x="242" y="100">ЛЖ</text>
<path class="ld" d="M130,124 L82,138"/><text class="tx" x="58" y="144">ПП</text>
<path class="ld" d="M163,154 L128,196"/><text class="tx" x="110" y="208">ЛП</text>
<path class="ld" d="M216,89 L232,60"/><text class="tm" x="222" y="56">верхушка</text>
<path class="ld" d="M157,98 L112,30"/><text class="tm" x="58" y="26">модераторный пучок</text>
<path class="ld" d="M150,140 L96,170"/><text class="tm" x="52" y="174">овальное окно</text>
<path class="ld" d="M164,184 L196,170"/><text class="tm" x="198" y="168">лёгочные вены</text>
<path class="ld" d="M191,201 L232,212"/><text class="tx" x="234" y="216">нисх. Ао</text>
<path class="ld" d="M258,150 L270,128"/><text class="tm" x="250" y="122">лёгкое</text>`);
  },

  lvot() {
    return this.frame(`
<!-- Срез LVOT (версия 3, геометрия — tools/atlas/lvot_geom.py): ось сердца ~45° влево, верхушку образует ЛЖ.
     Аорта отходит от ЛЖ в центре сердца и идёт к правому плечу плода (на рисунке — влево и кпереди), кзади от ПЖ;
     МЖП продолжается в переднюю стенку аорты, передняя створка МК — в заднюю; кзади от корня аорты — ЛП, справа и кзади — ПП. -->
<path class="svn" stroke-width="5" d="M 185.9,162.5 C 175.9,168.1 165.4,169.3 153.6,168.1"/><path class="svn" stroke-width="5" d="M 225.5,153.2 C 233.0,158.2 240.4,160.0 249.1,158.8"/>
<path class="pc" d="M 211.9,53.4 C 227.4,55.9 238.6,71.4 239.8,91.2 C 240.7,107.3 236.7,121.6 229.9,131.5 C 236.7,141.4 236.7,156.9 225.5,165.0 C 213.8,172.4 195.2,172.4 184.0,167.5 C 174.7,170.6 159.2,168.7 148.0,161.9 C 136.9,155.1 133.2,142.7 135.0,130.9 C 136.3,123.4 137.5,118.5 139.4,114.8 C 134.4,105.5 132.5,92.4 137.5,80.0 C 144.9,62.1 168.5,50.9 190.8,49.7 C 199.5,49.3 206.3,50.9 211.9,53.4 Z" transform="translate(184 116) scale(1.06) translate(-184 -116)"/>
<path class="my" d="M 211.9,53.4 C 227.4,55.9 238.6,71.4 239.8,91.2 C 240.7,107.3 236.7,121.6 229.9,131.5 C 236.7,141.4 236.7,156.9 225.5,165.0 C 213.8,172.4 195.2,172.4 184.0,167.5 C 174.7,170.6 159.2,168.7 148.0,161.9 C 136.9,155.1 133.2,142.7 135.0,130.9 C 136.3,123.4 137.5,118.5 139.4,114.8 C 134.4,105.5 132.5,92.4 137.5,80.0 C 144.9,62.1 168.5,50.9 190.8,49.7 C 199.5,49.3 206.3,50.9 211.9,53.4 Z"/>
<path class="ch" d="M 172.2,103.6 C 185.9,90.0 196.4,74.5 204.5,62.1 C 197.0,55.9 182.8,54.0 168.5,57.1 C 151.8,61.4 140.6,72.6 137.5,85.0 C 136.9,88.7 138.1,90.6 141.2,90.6 C 151.1,93.7 162.9,98.6 172.2,103.6 Z"/><path class="ch" d="M 175.9,107.3 C 190.8,94.9 204.5,79.4 213.8,64.5 C 224.3,67.0 232.4,79.4 233.6,94.9 C 234.5,108.6 230.5,119.7 224.3,126.5 L 217.5,128.4 L 185.2,119.7 Z"/><path class="ch" d="M 185.2,119.7 L 217.5,128.4 C 226.2,134.6 230.5,147.0 226.2,156.9 C 221.2,165.6 205.7,168.1 193.3,165.6 C 185.9,164.1 180.9,159.4 179.7,153.2 L 179.0,138.3 C 179.7,130.9 181.5,124.7 185.2,119.7 Z"/><path class="ch" d="M 176.6,124.7 C 177.2,133.4 177.2,142.7 175.9,152.0 C 168.5,156.9 156.7,156.9 149.3,152.0 C 142.5,146.4 140.0,136.5 141.8,125.9 C 149.3,119.1 163.5,119.1 176.6,124.7 Z"/>
<path class="vl" stroke="var(--sv-wall)" stroke-width="2.2" d="M 189.0,59.0 Q 187.7,62.7 185.2,64.5"/><path class="vl" stroke="var(--sv-wall)" stroke-width="2.2" d="M 174.1,59.0 Q 175.3,63.3 173.5,67.0"/><path class="vl" stroke="var(--sv-wall)" stroke-width="2.2" d="M 151.1,67.0 Q 154.9,68.9 157.3,72.6"/><path class="vl" stroke="var(--sv-wall)" stroke-width="2.2" d="M 141.8,79.4 Q 146.2,80.0 149.3,82.5"/><path class="mb" stroke-width="3.2" d="M 197.0,74.5 C 189.0,70.7 180.3,64.5 173.5,58.3"/>
<path class="ao" d="M 175.9,107.3 C 170.4,103.6 163.5,101.1 157.3,99.3 C 149.9,96.2 142.5,92.4 132.5,88.7 L 130.1,102.4 C 143.7,105.5 151.8,108.6 159.8,111.7 C 168.5,114.1 177.8,117.2 185.2,119.7 Z"/>
<ellipse cx="131.3" cy="95.5" rx="7.1" ry="2.2" transform="rotate(100 131.3 95.5)" fill="var(--sv-wall-edge)" opacity=".55"/>
<path class="vl" stroke-width="1.6" d="M 175.9,107.3 Q 171.6,104.2 166.6,103.6"/><path class="vl" stroke-width="1.6" d="M 185.2,119.7 Q 180.9,116.6 175.9,116.0"/><path class="vl" d="M 185.2,119.7 Q 193.3,118.5 202.0,123.4"/><path class="vl" d="M 217.5,128.4 Q 209.4,125.3 202.0,123.4"/>
<circle cx="185.2" cy="119.7" r="2.4" fill="var(--sv-bg)" stroke="var(--sv-wall-edge)" stroke-width="1"/>
<circle class="ao" cx="180" cy="196" r="9"/>
<path class="ld" d="M 168,74 L 130,40"/><text class="tx" x="110" y="36">ПЖ</text>
<path class="ld" d="M 222,92 L 262,80"/><text class="tx" x="264" y="78">ЛЖ</text>
<path class="ld" d="M 206,148 L 238,180"/><text class="tx" x="236" y="194">ЛП</text>
<path class="ld" d="M 158,140 L 112,162"/><text class="tx" x="90" y="170">ПП</text>
<path class="ld" d="M 136,96 L 86,100"/><text class="tx" x="48" y="98">восх.</text><text class="tx" x="48" y="111">Ао</text>
<path class="ld" d="M 176,106 L 200,24"/><text class="tm" x="160" y="20">МЖП → передняя стенка Ао</text>
<path class="ld" d="M 185,120 L 120,200"/><text class="tm" x="40" y="208">митрально-аортальный</text><text class="tm" x="40" y="218">контакт</text>
<path class="ld" d="M 174,113 L 84,136"/><text class="tm" x="24" y="140">аортальный клапан</text>
<path class="ld" d="M 189,199 L 232,212"/><text class="tx" x="234" y="216">нисх. Ао</text>`);
  },

  rvot() {
    return this.frame(`
<!-- выходной отдел ПЖ кпереди; ствол ЛА идёт кзади и влево, перекрещивая аорту -->
<path class="my" d="M112,58 C140,44 184,44 204,62 C214,74 206,92 190,98 L134,98 C114,94 102,72 112,58 Z"/>
<path class="ch" d="M122,62 C144,52 180,52 196,66 C200,76 194,86 184,88 L138,88 C124,86 116,72 122,62 Z"/>
<path class="spa" d="M176,82 C186,104 192,124 192,146" stroke-width="16"/>
<path class="vl" d="M168,86 l9,-4 M188,84 l-8,-4"/>
<!-- бифуркация: правая ЛА уходит вправо позади аорты, артериальный проток — к нисходящей аорте -->
<path class="spa" d="M190,146 C176,160 150,166 112,160" stroke-width="8"/>
<path class="spa" d="M194,146 C196,166 192,184 186,196" stroke-width="10"/>
<circle class="ao" cx="146" cy="128" r="12"/>
<circle class="vn" cx="114" cy="136" r="7"/>
<circle class="ao" cx="182" cy="204" r="9"/>
<path class="ld" d="M150,62 L130,30"/><text class="tx" x="96" y="26">ПЖ (выходной отдел)</text>
<path class="ld" d="M196,112 L240,98"/><text class="tx" x="242" y="96">ствол ЛА</text>
<path class="ld" d="M138,126 L80,104"/><text class="tx" x="46" y="100">Ао</text>
<path class="ld" d="M108,138 L70,136"/><text class="tx" x="36" y="140">ВПВ</text>
<path class="ld" d="M130,162 L92,186"/><text class="tm" x="44" y="196">правая ЛА</text>
<path class="ld" d="M196,172 L240,166"/><text class="tm" x="242" y="164">проток</text>
<path class="ld" d="M191,207 L232,218"/><text class="tx" x="234" y="222">нисх. Ао</text>`);
  },

  threeVessel() {
    return this.frame(`
<!-- тимус кпереди от сосудов -->
<path class="org" d="M118,46 C140,38 184,38 204,48 C212,62 200,78 182,82 L138,82 C120,78 110,62 118,46 Z"/>
<!-- три сосуда на одной линии: ЛА (самая крупная, слева-кпереди) > Ао > ВПВ (самая мелкая, справа-кзади) -->
<path class="spa" d="M196,94 C198,108 196,124 190,138" stroke-width="18"/>
<path class="spa" d="M190,136 C172,150 146,156 116,152" stroke-width="8"/>
<circle class="ao" cx="154" cy="112" r="12"/>
<circle class="vn" cx="120" cy="126" r="8"/>
<circle class="ao" cx="182" cy="204" r="9"/>
<path class="ld" d="M160,52 L170,24"/><text class="tm" x="160" y="20">тимус</text>
<path class="ld" d="M206,112 L242,104"/><text class="tx" x="244" y="102">ЛА</text>
<path class="ld" d="M145,108 L90,88"/><text class="tx" x="70" y="86">Ао</text>
<path class="ld" d="M112,128 L72,132"/><text class="tx" x="38" y="136">ВПВ</text>
<path class="ld" d="M140,154 L104,186"/><text class="tm" x="58" y="196">правая ЛА</text>
<path class="ld" d="M191,207 L232,218"/><text class="tx" x="234" y="222">нисх. Ао</text>
<text class="tm" x="160" y="248" text-anchor="middle" dy="0" opacity=".7">ЛА &gt; Ао &gt; ВПВ, на одной линии</text>`);
  },

  threeVesselTrachea() {
    return this.frame(`
<path class="org" d="M118,46 C140,38 184,38 204,48 C212,62 200,78 182,82 L138,82 C120,78 110,62 118,46 Z"/>
<!-- «V»: артериальный проток и дуга аорты сходятся кзади слева от трахеи и переходят в нисходящую аорту -->
<path class="spa" d="M200,92 C204,124 198,166 186,198" stroke-width="15"/>
<path class="sao" d="M150,96 C148,130 160,170 182,200" stroke-width="12"/>
<circle class="ao" cx="184" cy="204" r="9"/>
<circle class="vn" cx="116" cy="118" r="8"/>
<circle class="tr" cx="146" cy="176" r="9"/>
<path class="ld" d="M160,52 L170,24"/><text class="tm" x="160" y="20">тимус</text>
<path class="ld" d="M206,122 L244,110"/><text class="tx" x="214" y="104">ЛА / проток</text>
<path class="ld" d="M150,122 L94,94"/><text class="tx" x="52" y="88">дуга Ао</text>
<path class="ld" d="M108,120 L72,128"/><text class="tx" x="38" y="132">ВПВ</text>
<path class="ld" d="M138,180 L94,194"/><text class="tx" x="50" y="198">трахея</text>
<path class="ld" d="M193,207 L232,218"/><text class="tx" x="234" y="222">нисх. Ао</text>
<text class="tm" x="160" y="248" text-anchor="middle" opacity=".7">«V» слева от трахеи</text>`);
  }
};

const SCHEMES = {
  situs: () => SV.situs(),
  "4cv": () => SV.fourChamber(),
  lvot: () => SV.lvot(),
  rvot: () => SV.rvot(),
  "3vv": () => SV.threeVessel(),
  "3vt": () => SV.threeVesselTrachea()
};
