/* FetalCardio — реестр источников.
   Каждый источник проверен по PubMed (PMID и DOI сверены с записью PubMed 11.11.2026).
   Карточки ссылаются на источник по id и указывают раздел (section).
   section: "card" — источник относится к теме карточки в целом;
   соответствие конкретным утверждениям НЕ сверено (verified: false) — это делает автор при рецензии. */
var FC = globalThis.FC = globalThis.FC || {};
FC.REFS = {
  "isuog-2023-screening": {
    organization: "International Society of Ultrasound in Obstetrics and Gynecology (ISUOG)",
    title: "ISUOG Practice Guidelines (updated): fetal cardiac screening",
    authors: "Carvalho JS, Axt-Fliedner R, Chaoui R, et al.",
    journal: "Ultrasound Obstet Gynecol",
    year: 2023, volume: "61", issue: "6", pages: "788–803",
    doi: "10.1002/uog.26224", pmid: "37267096",
    url: "https://doi.org/10.1002/uog.26224"
  },
  "aha-2014-fetal": {
    organization: "American Heart Association (AHA)",
    title: "Diagnosis and treatment of fetal cardiac disease: a scientific statement from the American Heart Association",
    authors: "Donofrio MT, Moon-Grady AJ, Hornberger LK, et al.",
    journal: "Circulation",
    year: 2014, volume: "129", issue: "21", pages: "2183–2242",
    doi: "10.1161/01.cir.0000437597.44550.5d", pmid: "24763516",
    url: "https://doi.org/10.1161/01.cir.0000437597.44550.5d"
  },
  "ase-2023-fetal-echo": {
    organization: "American Society of Echocardiography (ASE)",
    title: "Guidelines and Recommendations for Performance of the Fetal Echocardiogram: An Update from the American Society of Echocardiography",
    authors: "Moon-Grady AJ, Donofrio MT, Gelehrter S, et al.",
    journal: "J Am Soc Echocardiogr",
    year: 2023, volume: "36", issue: "7", pages: "679–723",
    doi: "10.1016/j.echo.2023.04.014", pmid: "37227365",
    url: "https://doi.org/10.1016/j.echo.2023.04.014"
  }
};
