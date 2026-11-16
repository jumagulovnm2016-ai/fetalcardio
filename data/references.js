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
  "spicer-2014-vsd": {
    title: "Ventricular septal defect",
    authors: "Spicer DE, Hsu HH, Co-Vu J, Anderson RH, Fricker FJ",
    journal: "Orphanet J Rare Dis",
    year: 2014, volume: "9", pages: "144",
    doi: "10.1186/s13023-014-0144-2", pmid: "25523232",
    url: "https://doi.org/10.1186/s13023-014-0144-2"
  },
  "lopez-2018-vsd-icd11": {
    organization: "International Society for Nomenclature of Paediatric and Congenital Heart Disease",
    title: "Classification of Ventricular Septal Defects for the Eleventh Iteration of the International Classification of Diseases — Striving for Consensus",
    authors: "Lopez L, Houyel L, Colan SD, Anderson RH, et al.",
    journal: "Ann Thorac Surg",
    year: 2018, volume: "106", issue: "5", pages: "1578–1589",
    doi: "10.1016/j.athoracsur.2018.06.020", pmid: "30031844",
    url: "https://doi.org/10.1016/j.athoracsur.2018.06.020"
  },
  "suzuki-2006-iaa-lvoto": {
    title: "Selective management of the left ventricular outflow tract for repair of interrupted aortic arch with ventricular septal defect: management of left ventricular outflow tract obstruction",
    authors: "Suzuki T, Ohye RG, Devaney EJ, et al.",
    journal: "J Thorac Cardiovasc Surg",
    year: 2006, volume: "131", issue: "4", pages: "779–784",
    doi: "10.1016/j.jtcvs.2005.11.038", pmid: "16580434",
    url: "https://doi.org/10.1016/j.jtcvs.2005.11.038"
  },
  "volpe-2002-iaa-22q11": {
    title: "Prenatal diagnosis of interruption of the aortic arch and its association with deletion of chromosome 22q11",
    authors: "Volpe P, Marasini M, Caruso G, Gentile M",
    journal: "Ultrasound Obstet Gynecol",
    year: 2002, volume: "20", issue: "4", pages: "327–331",
    doi: "10.1046/j.1469-0705.2002.00818.x", pmid: "12383312",
    url: "https://doi.org/10.1046/j.1469-0705.2002.00818.x"
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
  },
  "walters-2000-dorv": {
    organization: "Society of Thoracic Surgeons — Congenital Heart Surgery Nomenclature and Database Project",
    title: "Congenital Heart Surgery Nomenclature and Database Project: double outlet right ventricle",
    authors: "Walters HL, Mavroudis C, Tchervenkov CI, Jacobs JP, Lacour-Gayet F, Jacobs ML",
    journal: "Ann Thorac Surg",
    year: 2000, volume: "69", issue: "4 Suppl", pages: "S249–S263",
    doi: "10.1016/s0003-4975(99)01247-3", pmid: "10798433",
    url: "https://doi.org/10.1016/s0003-4975(99)01247-3"
  },
  "beattie-2016-coa": {
    title: "Toward Improving the Fetal Diagnosis of Coarctation of the Aorta",
    authors: "Beattie M, Peyvandi S, Ganesan S, Moon-Grady A",
    journal: "Pediatr Cardiol",
    year: 2017, volume: "38", issue: "2", pages: "344–352",
    doi: "10.1007/s00246-016-1520-6", pmid: "27888318",
    url: "https://doi.org/10.1007/s00246-016-1520-6"
  },
  "fricke-2020-coa": {
    title: "Fetal Echocardiographic Dimension Indices: Important Predictors of Postnatal Coarctation",
    authors: "Fricke K, Liuba P, Weismann CG",
    journal: "Pediatr Cardiol",
    year: 2021, volume: "42", issue: "3", pages: "517–525",
    doi: "10.1007/s00246-020-02509-6", pmid: "33355680",
    url: "https://doi.org/10.1007/s00246-020-02509-6"
  },
  "tavares-2026-csai": {
    title: "The carotid-subclavian artery index (CSAI) in the fetal aortic arch with classic branching and brachiobicephalic trunk in a midtrimester low-risk population",
    authors: "Tavares de Sousa M, Hergert B, Gomez O, Crispi F, Hecher K",
    journal: "Ultraschall Med",
    year: 2026,
    doi: "10.1055/a-2922-1435", pmid: "42492571",
    url: "https://doi.org/10.1055/a-2922-1435"
  },
  "anuwutnavin-2023-tapvc": {
    title: "Fetal left-atrial posterior-space-to-diagonal ratio at 17–37 weeks' gestation for prediction of total anomalous pulmonary venous connection",
    authors: "Anuwutnavin S, Unalome V, Rekhawasin T, Tongprasert F, Thongkloung P",
    journal: "Ultrasound Obstet Gynecol",
    year: 2023, volume: "61", issue: "4", pages: "488–496",
    doi: "10.1002/uog.26072", pmid: "36099492",
    url: "https://doi.org/10.1002/uog.26072"
  },
  "chen-2019-diabetes-chd": {
    title: "Risk of congenital heart defects in offspring exposed to maternal diabetes mellitus: an updated systematic review and meta-analysis",
    authors: "Chen L, Yang T, Chen L, et al.",
    journal: "Arch Gynecol Obstet",
    year: 2019, volume: "300", issue: "6", pages: "1491–1506",
    doi: "10.1007/s00404-019-05376-6", pmid: "31713644",
    url: "https://doi.org/10.1007/s00404-019-05376-6"
  },
  "michalski-2015-sex-ratio": {
    title: "Sex ratios among infants with birth defects, National Birth Defects Prevention Study, 1997–2009",
    authors: "Michalski AM, Richardson SD, Browne ML, et al.",
    journal: "Am J Med Genet A",
    year: 2015, volume: "167A", issue: "5", pages: "1071–1081",
    doi: "10.1002/ajmg.a.36865", pmid: "25711982",
    url: "https://doi.org/10.1002/ajmg.a.36865"
  },
  "samanek-1994-sex-ratio": {
    title: "Boy:girl ratio in children born with different forms of cardiac malformation: a population-based study",
    authors: "Samánek M",
    journal: "Pediatr Cardiol",
    year: 1994, volume: "15", issue: "2", pages: "53–57",
    doi: "10.1007/BF00817606", pmid: "7997413",
    url: "https://doi.org/10.1007/BF00817606"
  },
  "kurt-bilirer-2026-situs": {
    title: "Prenatal diagnosis and postnatal outcomes of foetal situs abnormalities: a single tertiary centre experience",
    authors: "Kurt Bilirer K, Özer Çaltek H, Boza B, et al.",
    journal: "J Obstet Gynaecol",
    year: 2026, volume: "46", issue: "1", pages: "2741573",
    doi: "10.1080/01443615.2026.2741573", pmid: "42836833",
    url: "https://doi.org/10.1080/01443615.2026.2741573"
  },
  "nagata-2026-pdr": {
    title: "Population-Based Study of Prenatal Detection of Critical Congenital Heart Disease in Kyu-Yama Region of Japan",
    authors: "Nagata H, Kitadai Y, Hara T, et al.",
    journal: "Pediatr Int",
    year: 2026, volume: "68", issue: "1", pages: "e70467",
    doi: "10.1111/ped.70467", pmid: "42324491",
    url: "https://doi.org/10.1111/ped.70467"
  },
  "wu-2023-heterotaxy": {
    title: "Characterization of ultrasound and postnatal pathology in fetuses with heterotaxy syndrome",
    authors: "Wu Q, Guo S, Huang B, et al.",
    journal: "Front Cardiovasc Med",
    year: 2023, volume: "10", pages: "1195191",
    doi: "10.3389/fcvm.2023.1195191", pmid: "37485264",
    url: "https://doi.org/10.3389/fcvm.2023.1195191"
  },
  "adiguzel-2025-ebstein": {
    title: "Ebstein's anomaly in children and young adults: clinical features, arrhythmia, surgical management, and factors affecting arrhythmia and mortality",
    authors: "Adıgüzel A, Aypar E, Karagöz T, et al.",
    journal: "Cardiol Young",
    year: 2025, volume: "35", issue: "1", pages: "38–45",
    doi: "10.1017/S1047951124025599", pmid: "39789986",
    url: "https://doi.org/10.1017/S1047951124025599"
  },
  "selamet-2016-ebstein": {
    title: "Assessment of Progressive Pathophysiology After Early Prenatal Diagnosis of the Ebstein Anomaly or Tricuspid Valve Dysplasia",
    authors: "Selamet Tierney ES, McElhinney DB, Freud LR, et al.",
    journal: "Am J Cardiol",
    year: 2017, volume: "119", issue: "1", pages: "106–111",
    doi: "10.1016/j.amjcard.2016.09.022", pmid: "27793395",
    url: "https://doi.org/10.1016/j.amjcard.2016.09.022"
  }
};
