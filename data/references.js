/* FetalCardio — реестр источников.
   Каждый источник проверен по PubMed (PMID и DOI сверены с записью PubMed 11.11.2026).
   Карточки ссылаются на источник по id и указывают раздел (section).
   organization — для руководств; у исследований её нет, показываются авторы.
   Цифры в карточках (ось сердца, частоты сочетаний) сверены с текстом/резюме источника 12.11.2026 (verified: true).
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
  },
  "morlando-2017-avsd-t21": {
    title: "The association between prenatal atrioventricular septal defects and chromosomal abnormalities",
    authors: "Morlando M, Bhide A, Familiari A, et al.",
    journal: "Eur J Obstet Gynecol Reprod Biol",
    year: 2017, volume: "208", pages: "31–35",
    doi: "10.1016/j.ejogrb.2016.10.039", pmid: "27888703",
    url: "https://doi.org/10.1016/j.ejogrb.2016.10.039"
  },
  "volpe-2003-cat": {
    title: "Common arterial trunk in the fetus: characteristics, associations, and outcome in a multicentre series of 23 cases",
    authors: "Volpe P, Paladini D, Marasini M, et al.",
    journal: "Heart",
    year: 2003, volume: "89", issue: "12", pages: "1437–1441",
    doi: "10.1136/heart.89.12.1437", pmid: "14617557",
    url: "https://doi.org/10.1136/heart.89.12.1437"
  },
  "abel-2021-tac": {
    title: "Prenatal diagnosis, associated findings and postnatal outcome of fetuses with truncus arteriosus communis (TAC)",
    authors: "Abel JS, Berg C, Geipel A, et al.",
    journal: "Arch Gynecol Obstet",
    year: 2021, volume: "304", issue: "6", pages: "1455–1466",
    doi: "10.1007/s00404-021-06067-x", pmid: "34028563",
    url: "https://doi.org/10.1007/s00404-021-06067-x"
  },
  "walter-2024-tof-raa": {
    title: "Association of right aortic arch and agenesis of ductus arteriosus in prenatal tetralogy of Fallot spectrum and its clinical implications",
    authors: "Walter A, Herberg U, Calite E, et al.",
    journal: "Prenat Diagn",
    year: 2024, volume: "44", issue: "6-7", pages: "899–906",
    doi: "10.1002/pd.6611", pmid: "38797960",
    url: "https://doi.org/10.1002/pd.6611"
  }
};
