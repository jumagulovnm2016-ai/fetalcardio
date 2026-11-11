/* Схематические рисунки срезов (не УЗ-изображения).
   Ориентация: верх — передняя сторона плода, низ — позвоночник,
   левая сторона плода — справа на рисунке. */

const SV = {
  frame(inner, extra = "") {
    return `<svg viewBox="0 0 320 270" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui,sans-serif">
<style>
.ch{fill:var(--sv-chamber)} .my{fill:var(--sv-wall)} .wl{stroke:var(--sv-wall);fill:none}
.ao{fill:var(--sv-ao)} .pa{fill:var(--sv-pa)} .vn{fill:var(--sv-vein)}
.sao{stroke:var(--sv-ao);fill:none;stroke-linecap:round} .spa{stroke:var(--sv-pa);fill:none;stroke-linecap:round}
.svn{stroke:var(--sv-vein);fill:none;stroke-linecap:round}
.bn{fill:var(--sv-bone)} .tx{fill:var(--sv-text);font-size:12px;font-weight:600} .tm{fill:var(--sv-text);font-size:10px;opacity:.75}
.ol{fill:none;stroke:var(--sv-bone);stroke-width:2;stroke-dasharray:4 4}
</style>
<ellipse class="ol" cx="160" cy="140" rx="142" ry="120"/>
<circle class="bn" cx="160" cy="236" r="17"/>
<text class="tm" x="160" y="266" text-anchor="middle">позвоночник</text>
<text class="tm" x="160" y="14" text-anchor="middle">кпереди</text>
<text class="tx" x="8" y="144">П</text><text class="tx" x="304" y="144">Л</text>
${inner}${extra}</svg>`;
  },

  situs() {
    return this.frame(`
<path d="M30,140 C35,70 95,40 150,48 C150,95 140,160 120,200 C80,205 40,185 30,140 Z" fill="var(--sv-organ)"/>
<text class="tx" x="70" y="125">печень</text>
<ellipse cx="222" cy="118" rx="34" ry="24" fill="var(--sv-fluid)"/>
<text class="tx" x="222" y="160" text-anchor="middle">желудок</text>
<circle class="ao" cx="183" cy="208" r="10"/><text class="tx" x="200" y="212">Ао</text>
<circle class="vn" cx="136" cy="192" r="10"/><text class="tx" x="96" y="196">НПВ</text>
<path d="M160,62 C175,85 160,105 150,110" class="svn" stroke-width="5" opacity=".7"/>
<text class="tm" x="168" y="70">пупочная вена</text>`);
  },

  fourChamber() {
    return this.frame(`
<g transform="rotate(45 160 115)">
  <ellipse class="my" cx="160" cy="115" rx="66" ry="76"/>
  <ellipse class="ch" cx="131" cy="88" rx="24" ry="30"/>
  <ellipse class="ch" cx="189" cy="85" rx="22" ry="34"/>
  <ellipse class="ch" cx="130" cy="149" rx="25" ry="20"/>
  <ellipse class="ch" cx="190" cy="151" rx="24" ry="18"/>
  <line x1="111" y1="76" x2="152" y2="68" class="wl" stroke-width="4"/>
  <line x1="157" y1="121" x2="139" y2="113" stroke="var(--sv-text)" stroke-width="2"/>
  <line x1="163" y1="126" x2="181" y2="117" stroke="var(--sv-text)" stroke-width="2"/>
  <rect x="156" y="140" width="8" height="16" class="ch"/>
  <path d="M164,141 q12,6 15,16" stroke="var(--sv-text)" stroke-width="1.6" fill="none"/>
  <path d="M176,168 L168,186 M204,168 L212,186" class="svn" stroke-width="6"/>
</g>
<circle class="ao" cx="184" cy="207" r="10"/><text class="tx" x="200" y="211">Ао</text>
<text class="tx" x="158" y="80" text-anchor="middle">ПЖ</text>
<text class="tx" x="202" y="118" text-anchor="middle">ЛЖ</text>
<text class="tx" x="114" y="121" text-anchor="middle">ПП</text>
<text class="tx" x="152" y="168" text-anchor="middle">ЛП</text>
<text class="tm" x="236" y="52">верхушка</text>
<text class="tm" x="74" y="64">модераторный</text><text class="tm" x="88" y="76">тяж</text>
<text class="tm" x="216" y="182">лёгочные вены</text>`);
  },

  lvot() {
    return this.frame(`
<ellipse class="my" cx="196" cy="128" rx="54" ry="34" transform="rotate(-28 196 128)"/>
<ellipse class="ch" cx="200" cy="126" rx="40" ry="21" transform="rotate(-28 200 126)"/>
<ellipse class="my" cx="138" cy="96" rx="36" ry="26" transform="rotate(-28 138 96)"/>
<ellipse class="ch" cx="132" cy="98" rx="24" ry="15" transform="rotate(-28 132 98)"/>
<ellipse class="ch" cx="176" cy="168" rx="26" ry="16"/>
<line x1="170" y1="152" x2="182" y2="140" stroke="var(--sv-text)" stroke-width="2"/>
<path d="M176,128 C160,96 132,62 100,42" class="sao" stroke-width="16"/>
<line x1="163" y1="106" x2="177" y2="99" stroke="var(--sv-text)" stroke-width="2"/>
<circle class="ao" cx="186" cy="207" r="10"/>
<text class="tx" x="214" y="134">ЛЖ</text><text class="tx" x="108" y="106">ПЖ</text>
<text class="tx" x="168" y="186">ЛП</text><text class="tx" x="70" y="38">Ао</text>
<text class="tm" x="24" y="58">к правому плечу</text>
<text class="tm" x="190" y="58">МЖП переходит</text><text class="tm" x="190" y="70">в стенку Ао</text>
<path d="M196,74 C184,84 170,98 162,110" stroke="var(--sv-text)" stroke-width="1" fill="none" opacity=".6"/>`);
  },

  rvot() {
    return this.frame(`
<ellipse class="my" cx="138" cy="98" rx="46" ry="34"/>
<ellipse class="ch" cx="134" cy="100" rx="32" ry="21"/>
<path d="M150,76 C186,62 218,100 206,150" class="spa" stroke-width="16"/>
<path d="M205,152 C190,182 140,186 108,172" class="spa" stroke-width="8"/>
<path d="M206,152 C206,176 198,194 188,206" class="spa" stroke-width="12"/>
<circle class="ao" cx="168" cy="150" r="14"/>
<circle class="ao" cx="186" cy="208" r="10"/>
<text class="tx" x="120" y="104">ПЖ</text><text class="tx" x="216" y="96">ЛА</text>
<text class="tx" x="160" y="154" fill="#fff">Ао</text>
<text class="tm" x="70" y="186">правая ЛА</text>
<text class="tm" x="214" y="186">артериальный</text><text class="tm" x="214" y="198">проток</text>
<text class="tm" x="212" y="226">нисх. Ао</text>`);
  },

  threeVessel() {
    return this.frame(`
<ellipse cx="166" cy="60" rx="58" ry="22" fill="var(--sv-air)"/>
<text class="tm" x="166" y="63" text-anchor="middle">тимус</text>
<path d="M222,92 C220,118 212,138 200,152" class="spa" stroke-width="20"/>
<path d="M200,152 C180,172 146,174 124,170" class="spa" stroke-width="8"/>
<circle class="ao" cx="166" cy="128" r="13"/>
<circle class="vn" cx="126" cy="142" r="8"/>
<circle class="ao" cx="186" cy="208" r="10"/>
<line x1="236" y1="104" x2="108" y2="150" stroke="var(--sv-text)" stroke-width="1" stroke-dasharray="3 3" opacity=".5"/>
<text class="tx" x="238" y="92">ЛА</text><text class="tx" x="160" y="108">Ао</text><text class="tx" x="88" y="134">ВПВ</text>
<text class="tm" x="196" y="250">ЛА &gt; Ао &gt; ВПВ</text>`);
  },

  threeVesselTrachea() {
    return this.frame(`
<ellipse cx="166" cy="56" rx="58" ry="20" fill="var(--sv-air)"/>
<text class="tm" x="166" y="59" text-anchor="middle">тимус</text>
<path d="M150,100 C162,140 174,178 182,202" class="sao" stroke-width="13"/>
<path d="M226,86 C214,136 198,178 188,202" class="spa" stroke-width="15"/>
<circle class="ao" cx="186" cy="208" r="11"/>
<circle class="vn" cx="114" cy="150" r="9"/>
<circle cx="140" cy="190" r="11" fill="var(--sv-air)" stroke="var(--sv-bone)" stroke-width="3"/>
<text class="tx" x="232" y="84">ЛА / проток</text><text class="tx" x="120" y="96">дуга Ао</text>
<text class="tx" x="80" y="154">ВПВ</text><text class="tx" x="104" y="194">Тр</text>
<text class="tm" x="212" y="214">нисх. Ао</text>
<text class="tm" x="196" y="250">«V» слева от трахеи</text>`);
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
