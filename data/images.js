/* FetalCardio — библиотека эхограмм и рисунков из открытых источников.
   Подпись (caption) — оригинальная подпись автора на английском, без перевода.
   source — откуда взято изображение и на каких условиях (лицензия). Это атрибуция картинки,
   а НЕ подтверждение медицинских утверждений карточки: такие источники — в data/references.js.
   cards — к каким карточкам привязан снимок (chd:<id>, view:<id>). Привязка — черновик до экспертной проверки.
   status: "draft" до проверки; "approved" требует reviewedBy и reviewedAt. */
var FC = globalThis.FC = globalThis.FC || {};
FC.IMAGE_GROUPS = ["Норма и методика", "Другие ВПС", "Аномалии дуги аорты и вен", "Нарушения ритма", "Опухоли, кардиомиопатии, сужение протока", "Функция сердца", "Схемы и модели", "Ранние сроки и общие снимки", "Срез не определён (Nevit Dilmen)"];
FC.IMAGES = [
 {
  "id": "pmc13723304-f1",
  "file": "img/pmc13723304-f1.webp",
  "label": "Echocardiography 2026, рис. 1",
  "caption": "Position and Refine before STIC acquisition. (A) Initial assessment of fetal position and cardiac orientation using the OB General preset. (B) After switching to the Fetal Heart preset, acoustic shadowing and multiple unequal rib arcs may suggest an unfavorable or oblique insonation plane. (C) After transducer repositioning and 2D optimization, the heart is centered in the four‐chamber view and the ROI encompasses the fetal thorax and heart, ready for STIC acquisition. The rib‐arc appearance is a practical teaching cue, not an independently validated diagnostic or adequacy criterion. ROI, region of interest; STIC, spatiotemporal image correlation.",
  "group": "Норма и методика",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Giubilato AF, Bravo-Valenzuela NJ, Albrecht MEM, et al.",
   "title": "A Structured Approach to Teaching Volumetric Fetal Echocardiography Using Fetal Intelligent Navigation Echocardiography (FINE).",
   "journal": "Echocardiography",
   "year": 2026,
   "figure": "FIGURE 1",
   "pmcid": "PMC13723304",
   "url": "https://doi.org/10.1111/echo.70659",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc13723304-f2",
  "file": "img/pmc13723304-f2.webp",
  "label": "Echocardiography 2026, рис. 2",
  "caption": "Obtain: STIC volume quality‐control checkpoint. The acquired volume is reviewed in STICLOOP for inclusion of required anatomy and targets, absence of obscuring artifacts, preserved spatial continuity during motion review, and coherence of adjacent planes. The volume is classified as adequate when all criteria are met, usable but suboptimal when a localized imperfection remains but required anatomy is assessable, or inadequate when required anatomy or targets are obscured, distorted or uncertain. Adequate volumes proceed to Build; suboptimal volumes require documentation of the limitation and local refinement; inadequate volumes require reassessment of Position/Refine and reacquisition. These proposed operational teaching categories require prospective validation. Rib‐arc continuity, when used to assess coherence, is a teaching aid and has not been independently validated as an adequacy criterion.",
  "group": "Норма и методика",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Giubilato AF, Bravo-Valenzuela NJ, Albrecht MEM, et al.",
   "title": "A Structured Approach to Teaching Volumetric Fetal Echocardiography Using Fetal Intelligent Navigation Echocardiography (FINE).",
   "journal": "Echocardiography",
   "year": 2026,
   "figure": "FIGURE 2",
   "pmcid": "PMC13723304",
   "url": "https://doi.org/10.1111/echo.70659",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc13723304-f3",
  "file": "img/pmc13723304-f3.webp",
  "label": "Echocardiography 2026, рис. 3",
  "caption": "Build: seven‐landmark sequence and decision logic. The anatomical schematics show the Anatomic Box® marking sequence: (1) cross‐section of the aorta at the stomach level; (2) cross‐section of the aorta at the four‐chamber level; (3) crux cordis; (4) right atrial wall; (5) pulmonary valve; (6) cross‐section of the superior vena cava; and (7) transverse aortic arch. Green crosses indicate the marking sites. At the right atrial wall, the green guide indicates alignment with the interventricular septum and ends at the wall marker. For every landmark, the operator navigates, recognizes the anatomy, confirms the plane and cardiac phase, and then marks. Orientation and cardiac phase are reassessed after the crux. Uncertainty prompts local reassessment; repeated difficulty prompts review of source‐volume quality and return to Position, Refine or Obtain when needed. The schematics are not to scale. The marking sequence is specific to FINE; anatomical confirmation and iterative reassessment are transferable teaching principles.",
  "group": "Норма и методика",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Giubilato AF, Bravo-Valenzuela NJ, Albrecht MEM, et al.",
   "title": "A Structured Approach to Teaching Volumetric Fetal Echocardiography Using Fetal Intelligent Navigation Echocardiography (FINE).",
   "journal": "Echocardiography",
   "year": 2026,
   "figure": "FIGURE 3",
   "pmcid": "PMC13723304",
   "url": "https://doi.org/10.1111/echo.70659",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc13723304-f4",
  "file": "img/pmc13723304-f4.webp",
  "label": "Echocardiography 2026, рис. 4",
  "caption": "Evaluate: critical review of reconstructed diagnostic planes. Each view is reviewed for anatomical coverage, plane orientation, cardiac phase and relevant artifacts. Navigation with VIS‐Assistance or Maestro Planar Navigation is used, as appropriate, to interrogate the plane and surrounding anatomy. Following adjustment, the plane is reassessed and updated when appropriate. A technically inadequate plane prompts review of landmark placement and source‐volume quality, with reacquisition when needed. Any suspicious finding that persists after plane interrogation, or cannot be confidently attributed to a recognized artifact, requires verification with real‐time 2D ultrasound and color Doppler, with referral for fetal echocardiography when indicated. The grayscale PROBE workflow does not constitute a complete fetal cardiac assessment; interpretation remains the operator's responsibility.",
  "group": "Норма и методика",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Giubilato AF, Bravo-Valenzuela NJ, Albrecht MEM, et al.",
   "title": "A Structured Approach to Teaching Volumetric Fetal Echocardiography Using Fetal Intelligent Navigation Echocardiography (FINE).",
   "journal": "Echocardiography",
   "year": 2026,
   "figure": "FIGURE 4",
   "pmcid": "PMC13723304",
   "url": "https://doi.org/10.1111/echo.70659",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc2949622-f1",
  "file": "img/pmc2949622-f1.jpg",
  "label": "Cardiovasc Ultrasound 2010, рис. 1",
  "caption": "After standardization of fetal position in the STIC volume dataset to place the fetus in the exact dorsal supine position, navigating in the volume is similar to moving the transducer over the fetal chest in real time 2-dimensional scanning. The transverse planes are displayed in plane A and the saggital planes are displayed in plane B.",
  "group": "Норма и методика",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Jantarasaengaram S, Vairojanavong K",
   "title": "Eleven fetal echocardiographic planes using 4-dimensional ultrasound with spatio-temporal image correlation (STIC): a logical approach to fetal heart volume analysis.",
   "journal": "Cardiovasc Ultrasound",
   "year": 2010,
   "figure": "Figure 1",
   "pmcid": "PMC2949622",
   "url": "https://doi.org/10.1186/1476-7120-8-41",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc2949622-f2",
  "file": "img/pmc2949622-f2.jpg",
  "label": "Cardiovasc Ultrasound 2010, рис. 2",
  "caption": "This image illustrates the steps to standardize virtual fetal position in order to place the fetus in the \"exact dorsal supine position\". a. In plane A, rotate the spine down to six o'clock. b. In plane A, move the reference dot to the center of the aorta. c. In plane B, spin the volume around the y-axis to display long axis of the descending aorta d. In plane B, rotate the volume around the z-axis to place the descending aorta horizontally. (According to this movement, the volume is placed as if the fetus was lying down on a flat table. However, the fetus may not lie in the exact supine position but more or less on its side.) e. Move to plane A and scrolling parallel up and down through the volume until the sternum echo is depicted. f. Rotate the image in plane A around the z-axis until the sternum and the spine are in a vertical alignment. This last movement results in the exact dorsal supine fetal position.",
  "group": "Норма и методика",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Jantarasaengaram S, Vairojanavong K",
   "title": "Eleven fetal echocardiographic planes using 4-dimensional ultrasound with spatio-temporal image correlation (STIC): a logical approach to fetal heart volume analysis.",
   "journal": "Cardiovasc Ultrasound",
   "year": 2010,
   "figure": "Figure 2",
   "pmcid": "PMC2949622",
   "url": "https://doi.org/10.1186/1476-7120-8-41",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc2949622-f3",
  "file": "img/pmc2949622-f3.jpg",
  "label": "Cardiovasc Ultrasound 2010, рис. 3",
  "caption": "After standardization of fetal position in the STIC volume dataset to place the fetus in the exact dorsal supine position, navigating systematically in the volume usually provides a reproducible image from a corresponded movement. Placing the reference dot in the center of the aorta in the four-chamber (4 CH) view in plane A simultaneously displays long axis of the ductal arch in plane B.",
  "group": "Норма и методика",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Jantarasaengaram S, Vairojanavong K",
   "title": "Eleven fetal echocardiographic planes using 4-dimensional ultrasound with spatio-temporal image correlation (STIC): a logical approach to fetal heart volume analysis.",
   "journal": "Cardiovasc Ultrasound",
   "year": 2010,
   "figure": "Figure 3",
   "pmcid": "PMC2949622",
   "url": "https://doi.org/10.1186/1476-7120-8-41",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc2949622-f4",
  "file": "img/pmc2949622-f4.jpg",
  "label": "Cardiovasc Ultrasound 2010, рис. 4",
  "caption": "After standardization of fetal position in the STIC volume dataset to place the fetus in the exact dorsal supine position, navigating systematically in the volume usually provides a reproducible image from a corresponded movement. Placing the reference dot at the aortic valve in the five-chamber view in plane A and spin the volume around y-axis 15-30 degrees simultaneously displays the LVOT in plane A and short axis of the great vessels in plane B.",
  "group": "Норма и методика",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Jantarasaengaram S, Vairojanavong K",
   "title": "Eleven fetal echocardiographic planes using 4-dimensional ultrasound with spatio-temporal image correlation (STIC): a logical approach to fetal heart volume analysis.",
   "journal": "Cardiovasc Ultrasound",
   "year": 2010,
   "figure": "Figure 4",
   "pmcid": "PMC2949622",
   "url": "https://doi.org/10.1186/1476-7120-8-41",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc5481875-f1",
  "file": "img/pmc5481875-f1.jpg",
  "label": "Cardiovasc Ultrasound 2017, рис. 1",
  "caption": "Multiplanar slicing of a fetus with normal cardiac structure of 19 gestational weeks. Panels a, b, and c represent three orthogonal planes (A, transverse; B, sagittal; and C, coronal). The cardiac apex in the 4CV was oriented upwards and the reference point (indicated by the green arrow) was placed in the crux of the heart in Panel a (A). Move the reference point to the left ventricle in Panel a. By adjusting the position of the reference point in Panel a, near the position of the outflow tract (at the basal part of the left ventricle, near the crux of the heart), a great artery with clear course could be visualized in Panel b (B). Moving the reference point to this artery and then navigating along the course of the artery in Panel B, we could demonstrate a round (transverse) cross section of one great artery and a longitudinal section of the other great artery (characterized by the short trunk with bifurcation) (C). They were aorta and the pulmonary artery. As the reference point was located at the aorta, it could be confirmed that aorta was originated from the left ventricle. Back to the initial state in Panel a (A). Move the reference point to the right ventricle in Panel a. By adjusting the position of the reference point in Panel A, near the position of the outflow tract (at the basal part of the right ventricle, near the crux of the heart), a great artery with its valve could be clearly visualized in Panel b (D). Moving the reference point to the valve in Panel b, two great arteries with cross section and longitudinal section respectively could be visualized in Panel a (E). As the reference point was located at the pulmonary artery, it could be confirmed that the pulmonary artery was originated from the right ventricle. AO, aorta; LV, left ventricle; PA, pulmonary artery; RV, right ventricle",
  "group": "Норма и методика",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Wang Y, Fan M, Siddiqui FA, et al.",
   "title": "Prenatal screening of fetal ventriculoarterial connections: benefits of 4D technique in fetal heart imaging.",
   "journal": "Cardiovasc Ultrasound",
   "year": 2017,
   "figure": "Fig. 1",
   "pmcid": "PMC5481875",
   "url": "https://doi.org/10.1186/s12947-017-0108-5",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc8303209-f1",
  "file": "img/pmc8303209-f1.jpg",
  "label": "Diagnostics (Basel) 2021, рис. 1",
  "caption": "(A) LVOT angle measured in a 22 week fetus. (B) Drawing of the LVOT measurement. Ao—aorta; IVS—interventricular septum; LV—left ventricle; RV—right ventricle.",
  "group": "Норма и методика",
  "cards": [
   "view:lvot"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Raucher Sternfeld A, Betzer T, Tamir A, et al.",
   "title": "Can Fetal Echocardiographic Measurements of the Left Ventricular Outflow Tract Angle Detect Fetuses with Conotruncal Cardiac Anomalies?",
   "journal": "Diagnostics (Basel)",
   "year": 2021,
   "figure": "Figure 1",
   "pmcid": "PMC8303209",
   "url": "https://doi.org/10.3390/diagnostics11071185",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc8303209-f6",
  "file": "img/pmc8303209-f6.jpg",
  "label": "Diagnostics (Basel) 2021, рис. 6",
  "caption": "Schematic presentation of the normal LVOT angle with normal variation marked by the green triangle. The red triangle represents the angle seen in cases of AV canal. The orange triangle represents the angle seen in cases of D-TGA or AS.",
  "group": "Норма и методика",
  "cards": [
   "view:lvot"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Raucher Sternfeld A, Betzer T, Tamir A, et al.",
   "title": "Can Fetal Echocardiographic Measurements of the Left Ventricular Outflow Tract Angle Detect Fetuses with Conotruncal Cardiac Anomalies?",
   "journal": "Diagnostics (Basel)",
   "year": 2021,
   "figure": "Figure 6",
   "pmcid": "PMC8303209",
   "url": "https://doi.org/10.3390/diagnostics11071185",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "commons-aortic-stenosis-1",
  "file": "img/commons-aortic-stenosis-1.jpg",
  "label": "Wikimedia Commons: Aortic stenosis 1.JPG",
  "caption": "Aortic stenosis: Four chamber view ((Foetus 26 weeks)",
  "group": "Другие ВПС",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "commons",
   "authors": "Mirmillon",
   "title": "Aortic stenosis 1.JPG",
   "url": "https://commons.wikimedia.org/wiki/File:Aortic_stenosis_1.JPG",
   "license": "Public domain",
   "licenseUrl": ""
  }
 },
 {
  "id": "commons-aortic-stenosis-2",
  "file": "img/commons-aortic-stenosis-2.jpg",
  "label": "Wikimedia Commons: Aortic stenosis 2.JPG",
  "caption": "Aortic stenosis: Narrowed aorta 3mm ((Foetus 26 weeks)",
  "group": "Другие ВПС",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "commons",
   "authors": "Mirmillon",
   "title": "Aortic stenosis 2.JPG",
   "url": "https://commons.wikimedia.org/wiki/File:Aortic_stenosis_2.JPG",
   "license": "Public domain",
   "licenseUrl": ""
  }
 },
 {
  "id": "commons-aortic-stenosis-3",
  "file": "img/commons-aortic-stenosis-3.jpg",
  "label": "Wikimedia Commons: Aortic stenosis 3.JPG",
  "caption": "Aortic stenosis: Pulmonary arteria 7 mm ((Foetus 26 weeks)",
  "group": "Другие ВПС",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "commons",
   "authors": "Mirmillon",
   "title": "Aortic stenosis 3.JPG",
   "url": "https://commons.wikimedia.org/wiki/File:Aortic_stenosis_3.JPG",
   "license": "Public domain",
   "licenseUrl": ""
  }
 },
 {
  "id": "commons-reprodmed-03-00005-g004-550",
  "file": "img/commons-reprodmed-03-00005-g004-550.jpg",
  "label": "Wikimedia Commons: Reprodmed-03-00005-g004-550.jpg",
  "caption": "Figure 4. Images of Case 2. (A) Prenatal ultrasound at 13 weeks shows hydrops fetalis; (B) Hypoplastic left heart syndrome at 13 weeks; (C) 15-week fetus postpartum showing loose skin as a result of extreme hydrops. Also visible are typical dysmorphic facial features, including hypertelorism, small chin, bulbous nose, and cleft lip.",
  "group": "Другие ВПС",
  "cards": [
   "chd:hlhs"
  ],
  "status": "draft",
  "source": {
   "kind": "commons",
   "authors": "Zaghi M, Janssens K, et al.",
   "title": "Reprodmed-03-00005-g004-550.jpg",
   "url": "https://commons.wikimedia.org/wiki/File:Reprodmed-03-00005-g004-550.jpg",
   "license": "CC BY 4.0",
   "licenseUrl": "https://creativecommons.org/licenses/by/4.0/"
  }
 },
 {
  "id": "commons-tgvecho1",
  "file": "img/commons-tgvecho1.gif",
  "label": "Wikimedia Commons: TGVecho1.gif",
  "caption": "TGV - echo foetal",
  "group": "Другие ВПС",
  "cards": [
   "chd:tga"
  ],
  "status": "draft",
  "source": {
   "kind": "commons",
   "authors": "Pezard",
   "title": "TGVecho1.gif",
   "url": "https://commons.wikimedia.org/wiki/File:TGVecho1.gif",
   "license": "CC BY-SA 3.0",
   "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
  }
 },
 {
  "id": "commons-tgvecho2",
  "file": "img/commons-tgvecho2.gif",
  "label": "Wikimedia Commons: TGVecho2.gif",
  "caption": "TGV - echo foetal aorte",
  "group": "Другие ВПС",
  "cards": [
   "chd:tga"
  ],
  "status": "draft",
  "source": {
   "kind": "commons",
   "authors": "Pezard",
   "title": "TGVecho2.gif",
   "url": "https://commons.wikimedia.org/wiki/File:TGVecho2.gif",
   "license": "CC BY-SA 3.0",
   "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
  }
 },
 {
  "id": "commons-tgvecho3",
  "file": "img/commons-tgvecho3.gif",
  "label": "Wikimedia Commons: TGVecho3.gif",
  "caption": "TGV - Echo foetal hros vaisseaux",
  "group": "Другие ВПС",
  "cards": [
   "chd:tga"
  ],
  "status": "draft",
  "source": {
   "kind": "commons",
   "authors": "Pezard",
   "title": "TGVecho3.gif",
   "url": "https://commons.wikimedia.org/wiki/File:TGVecho3.gif",
   "license": "CC BY-SA 3.0",
   "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
  }
 },
 {
  "id": "commons-tgvecho4",
  "file": "img/commons-tgvecho4.gif",
  "label": "Wikimedia Commons: TGVecho4.gif",
  "caption": "Transposition of the great vessels",
  "group": "Другие ВПС",
  "cards": [
   "chd:tga"
  ],
  "status": "draft",
  "source": {
   "kind": "commons",
   "authors": "Pezard",
   "title": "TGVecho4.gif",
   "url": "https://commons.wikimedia.org/wiki/File:TGVecho4.gif",
   "license": "CC BY-SA 3.0",
   "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
  }
 },
 {
  "id": "pmc10282755-f2",
  "file": "img/pmc10282755-f2.jpg",
  "label": "Front Pediatr 2023, рис. 2",
  "caption": "The prenatal sonographic features of supracardiac TAPVC. (A) The posterior wall of LA was smooth without orifice of PV, the pulmonary venous confluence behind the LA. (B) The left and right PVs converging to form a common PV truck, the CPV going upward as VV. (C) The VV drained into the SVC via the LBCV. (D) The entire drainage route of PVs. TAPVC, total anomalous pulmonary venous connection; PV, pulmonary vein; LA, left atrium; CPV, common pulmonary vein; VV, vertical vein; SVC, superior vena cava; LBCV, left brachiocephalic vein.",
  "group": "Другие ВПС",
  "cards": [
   "chd:tapvr"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Xue X, Wu Q, Xiong M, et al.",
   "title": "Prenatal diagnosis and postnatal verification in fetuses with total anomalous pulmonary venous connection.",
   "journal": "Front Pediatr",
   "year": 2023,
   "figure": "Figure 2",
   "pmcid": "PMC10282755",
   "url": "https://doi.org/10.3389/fped.2023.1206032",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc10282755-f3",
  "file": "img/pmc10282755-f3.jpg",
  "label": "Front Pediatr 2023, рис. 3",
  "caption": "The prenatal and postnatal sonographic features of intracardiac TAPVC. (A) The four-chamber view showed ventricular discrepancy and no connection between PVs and LA. (B) The PVs drained into RA via dilated CS. (C) The entire drainage route of anomalous PVs. (D) The obvious asymmetry on the four-chamber view after birth. (E) All the PVs were not connected with LA. (F) The CPV drained into RA via dilated CS. TAPVC, total anomalous pulmonary venous connection; PV, pulmonary vein; LA, left atrium; RA, right atrium; CPV, common pulmonary vein; CS, coronary sinus.",
  "group": "Другие ВПС",
  "cards": [
   "chd:tapvr"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Xue X, Wu Q, Xiong M, et al.",
   "title": "Prenatal diagnosis and postnatal verification in fetuses with total anomalous pulmonary venous connection.",
   "journal": "Front Pediatr",
   "year": 2023,
   "figure": "Figure 3",
   "pmcid": "PMC10282755",
   "url": "https://doi.org/10.3389/fped.2023.1206032",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc10282755-f4",
  "file": "img/pmc10282755-f4.jpg",
  "label": "Front Pediatr 2023, рис. 4",
  "caption": "The sonographic features of infracardiac TAPVC and postnatal confirmation. (A) CPV was located behind the LA, with an increased posterior left atrium space. (B) The Doppler spectrum of PV was continuous instead of pulsatile. (C) The VV appeared as an extra vessel in the transabdominal section. (D) The VV drained into DV in a turbulent flow. (E) The obstruction was confirmed postnatally. (F) The CTA showed the entire drainage route of PVs. TAPVC, total anomalous pulmonary venous connection; PV, pulmonary vein; LA, left atrium; CPV, common pulmonary vein; VV, vertical vein; DV, ductus venous; CTA, computerized tomographic angiography.",
  "group": "Другие ВПС",
  "cards": [
   "chd:tapvr"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Xue X, Wu Q, Xiong M, et al.",
   "title": "Prenatal diagnosis and postnatal verification in fetuses with total anomalous pulmonary venous connection.",
   "journal": "Front Pediatr",
   "year": 2023,
   "figure": "Figure 4",
   "pmcid": "PMC10282755",
   "url": "https://doi.org/10.3389/fped.2023.1206032",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc10282755-f5",
  "file": "img/pmc10282755-f5.jpg",
  "label": "Front Pediatr 2023, рис. 5",
  "caption": "The sonographic features of mixed TAPVC and postnatal anatomic cardiovascular casting findings. (A) A dilated IVC in transabdominal section. (B) The ventricles were asymmetrical and the CPV was located behind the LA. (C) The VV appeared as an extra vessel behind the aorta. (D) The color Doppler showed the drainage of the RSPV, RLPV, and the LSPV into the LBCV via VV. (E) The LLPV drained into IVC. (F,G) Obstruction was confirmed in both the supracardiac and infracardiac pathways. (H) The entire drainage route of all PVs. (I): The postnatal casting of the TAPVC heart showed the RSPV, RLPV, and LSPV drainage into LBCV via the VV, and the LLPV drainage into the IVC. TAPVC, total anomalous pulmonary venous connection; IVC, inferior vena cava; CPV, common pulmonary vein; LA, left atrium; VV, vertical vein; RSPV, right superior pulmonary vein; RLPV, right low pulmonary vein; LSPV, left superior pulmonary vein; LBCV, left brachiocephalic vein; LLPV, left low pulmonary vein.",
  "group": "Другие ВПС",
  "cards": [
   "chd:tapvr"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Xue X, Wu Q, Xiong M, et al.",
   "title": "Prenatal diagnosis and postnatal verification in fetuses with total anomalous pulmonary venous connection.",
   "journal": "Front Pediatr",
   "year": 2023,
   "figure": "Figure 5",
   "pmcid": "PMC10282755",
   "url": "https://doi.org/10.3389/fped.2023.1206032",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc10475158-f1",
  "file": "img/pmc10475158-f1.jpg",
  "label": "Cureus 2023, рис. 1",
  "caption": "Initial echocardiogram at 25 weeks of gestational ageLeft ventricular outflow tract (LVOT) view demonstrating a dilated ascending aorta diameter measuring 7.99 mm, immediately distal to the LVOT at the initial echocardiogram at 25 weeks of gestation",
  "group": "Другие ВПС",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Weymon A, Huebner KT, Sommerfield J, et al.",
   "title": "Intrauterine Adenosine Administration for the Treatment of Fetal Supraventricular Tachycardia in a Fetus With Aortic Stenosis.",
   "journal": "Cureus",
   "year": 2023,
   "figure": "Figure 1",
   "pmcid": "PMC10475158",
   "url": "https://doi.org/10.7759/cureus.42931",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc10475158-f2",
  "file": "img/pmc10475158-f2.jpg",
  "label": "Cureus 2023, рис. 2",
  "caption": "Apical four-chamber and transverse view at 25 weeks of gestational ageApical four-chamber view (A) and transverse view (B) demonstrating an absence of ventricular hypertrophy, endocardial fibroelastosis (EFE), or pericardial effusion at the initial echocardiogram at 25 weeks of gestation",
  "group": "Другие ВПС",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Weymon A, Huebner KT, Sommerfield J, et al.",
   "title": "Intrauterine Adenosine Administration for the Treatment of Fetal Supraventricular Tachycardia in a Fetus With Aortic Stenosis.",
   "journal": "Cureus",
   "year": 2023,
   "figure": "Figure 2",
   "pmcid": "PMC10475158",
   "url": "https://doi.org/10.7759/cureus.42931",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc10475158-f3",
  "file": "img/pmc10475158-f3.jpg",
  "label": "Cureus 2023, рис. 3",
  "caption": "Doppler echocardiogram at 25 weeks of gestational agePulsed wave Doppler demonstrating markedly increased pressures across the aortic valve with a maximum peak gradient of 53 mmHg and a mean of 32 mmHg (peak velocity: 3.6 m/s)",
  "group": "Другие ВПС",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Weymon A, Huebner KT, Sommerfield J, et al.",
   "title": "Intrauterine Adenosine Administration for the Treatment of Fetal Supraventricular Tachycardia in a Fetus With Aortic Stenosis.",
   "journal": "Cureus",
   "year": 2023,
   "figure": "Figure 3",
   "pmcid": "PMC10475158",
   "url": "https://doi.org/10.7759/cureus.42931",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc10475158-f4",
  "file": "img/pmc10475158-f4.jpg",
  "label": "Cureus 2023, рис. 4",
  "caption": "Echocardiogram at 32 and 6/7 weeks of gestation(A) LVOT view demonstrating turbulent blood flow through the narrowed aortic outflow tract. (B) Apical four-chamber view of the fetal heart minimal pericardial effusion measuring 4.2 mm on echocardiography performed at 32 and 6/7 weeks of gestationLVOT: left ventricular outflow tract",
  "group": "Другие ВПС",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Weymon A, Huebner KT, Sommerfield J, et al.",
   "title": "Intrauterine Adenosine Administration for the Treatment of Fetal Supraventricular Tachycardia in a Fetus With Aortic Stenosis.",
   "journal": "Cureus",
   "year": 2023,
   "figure": "Figure 4",
   "pmcid": "PMC10475158",
   "url": "https://doi.org/10.7759/cureus.42931",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc10475158-f5",
  "file": "img/pmc10475158-f5.jpg",
  "label": "Cureus 2023, рис. 5",
  "caption": "M-mode image at 32 and 6/7 weeks of gestationM-mode recording in SVT with 1:1 AV relation; fetal HR of 257 bpm seen at 32 and 6/7 weeks of gestationSVT, supraventricular tachycardia; AV, atrioventricular; HR, heart rate; bpm, beats per minute",
  "group": "Другие ВПС",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Weymon A, Huebner KT, Sommerfield J, et al.",
   "title": "Intrauterine Adenosine Administration for the Treatment of Fetal Supraventricular Tachycardia in a Fetus With Aortic Stenosis.",
   "journal": "Cureus",
   "year": 2023,
   "figure": "Figure 5",
   "pmcid": "PMC10475158",
   "url": "https://doi.org/10.7759/cureus.42931",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc10772931-f1",
  "file": "img/pmc10772931-f1.jpg",
  "label": "CASE (Phila) 2023, рис. 1",
  "caption": "Transabdominal two-dimensional fetal echocardiogram, 4-chamber view, demonstrates a severely hypoplastic, hypertrophied, and aneurysmal RV with an atretic tricuspid valve (asterisk). LA, Left atrium; RA, right atrium.",
  "group": "Другие ВПС",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Sourour W, Powell SK",
   "title": "A Rare Case of Tricuspid Atresia Absent Pulmonary Valve Diagnosed on Fetal Echocardiography.",
   "journal": "CASE (Phila)",
   "year": 2023,
   "figure": "Figure 1",
   "pmcid": "PMC10772931",
   "url": "https://doi.org/10.1016/j.case.2023.09.002",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc10772931-f2",
  "file": "img/pmc10772931-f2.jpg",
  "label": "CASE (Phila) 2023, рис. 2",
  "caption": "Transabdominal two-dimensional fetal echocardiogram, outflow tract view, demonstrates a normal-sized MPA and no evidence of PV leaflets (asterisk). Ao, Aorta; SVC, superior vena cava.",
  "group": "Другие ВПС",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Sourour W, Powell SK",
   "title": "A Rare Case of Tricuspid Atresia Absent Pulmonary Valve Diagnosed on Fetal Echocardiography.",
   "journal": "CASE (Phila)",
   "year": 2023,
   "figure": "Figure 2",
   "pmcid": "PMC10772931",
   "url": "https://doi.org/10.1016/j.case.2023.09.002",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc10894161-f1",
  "file": "img/pmc10894161-f1.jpg",
  "label": "Arch Gynecol Obstet 2024, рис. 1",
  "caption": "Sonographic appearance of the FO flap. A redundant FO flap that extents more than 50% across the left atrium (‘spinnaker-like’, B flat FO, the flap swings less than 30% into the left atrium, C fixed FO without any swinging movements of the flap, D and E hypermobile FO flap, that bidirectionally oscillates through the small FO orifice between the left (D) and the right atrium (E)",
  "group": "Другие ВПС",
  "cards": [
   "chd:tga"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Gottschalk I, Walter A, Menzel T, et al.",
   "title": "D-Transposition of the great arteries with restrictive foramen ovale in the fetus: the dilemma of predicting the need for postnatal urgent balloon atrial septostomy.",
   "journal": "Arch Gynecol Obstet",
   "year": 2024,
   "figure": "Fig. 1",
   "pmcid": "PMC10894161",
   "url": "https://doi.org/10.1007/s00404-023-06997-8",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc10894161-f2",
  "file": "img/pmc10894161-f2.jpg",
  "label": "Arch Gynecol Obstet 2024, рис. 2",
  "caption": "Flow patterns of pulmonary veins. A continuous forward flow with a ‘plateau’ and small a-wave reversal, B continuous forward flow with an increased a-wave reversal (‘pulsatile’), C to-and-fro flow pattern with absent early diastolic forward flow, highly suspicious for restrictive FO",
  "group": "Другие ВПС",
  "cards": [
   "chd:tga"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Gottschalk I, Walter A, Menzel T, et al.",
   "title": "D-Transposition of the great arteries with restrictive foramen ovale in the fetus: the dilemma of predicting the need for postnatal urgent balloon atrial septostomy.",
   "journal": "Arch Gynecol Obstet",
   "year": 2024,
   "figure": "Fig. 2",
   "pmcid": "PMC10894161",
   "url": "https://doi.org/10.1007/s00404-023-06997-8",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc10894161-f3",
  "file": "img/pmc10894161-f3.jpg",
  "label": "Arch Gynecol Obstet 2024, рис. 3",
  "caption": "Maximum Doppler flow velocity in the pulmonary vein",
  "group": "Другие ВПС",
  "cards": [
   "chd:tga"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Gottschalk I, Walter A, Menzel T, et al.",
   "title": "D-Transposition of the great arteries with restrictive foramen ovale in the fetus: the dilemma of predicting the need for postnatal urgent balloon atrial septostomy.",
   "journal": "Arch Gynecol Obstet",
   "year": 2024,
   "figure": "Fig. 3",
   "pmcid": "PMC10894161",
   "url": "https://doi.org/10.1007/s00404-023-06997-8",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc10894161-f4",
  "file": "img/pmc10894161-f4.jpg",
  "label": "Arch Gynecol Obstet 2024, рис. 4",
  "caption": "DA in the 3-vessel view in B-mode and Color Doppler. A ventriculo-arterial discordance with the pulmonary trunk arising from the left ventricle, B 3-vessel view with restrictive arterial duct, the arrow shows the size of the arterial duct, C 3-vessel view in Color Doppler, showing an antegrade perfusion of the restrictive arterial duct. (LV left ventricle, RV right ventricle, TP main pulmonary trunk, LPA left pulmonary artery, RPA right pulmonary artery, Ao descending aorta, AoA aortic arch)",
  "group": "Другие ВПС",
  "cards": [
   "chd:tga"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Gottschalk I, Walter A, Menzel T, et al.",
   "title": "D-Transposition of the great arteries with restrictive foramen ovale in the fetus: the dilemma of predicting the need for postnatal urgent balloon atrial septostomy.",
   "journal": "Arch Gynecol Obstet",
   "year": 2024,
   "figure": "Fig. 4",
   "pmcid": "PMC10894161",
   "url": "https://doi.org/10.1007/s00404-023-06997-8",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc11122070-f1",
  "file": "img/pmc11122070-f1.jpg",
  "label": "J Cardiovasc Dev Dis 2024, рис. 1",
  "caption": "Panel (A): Paired fetal echocardiographic apical still frame images showing cardiomegaly, right atrial dilation, tricuspid annular dilation, and right ventricular enlargement at presentation at 28 6/7 weeks gestation. RA = Right Atrium, RV = Right Ventricle, LA = Left Atrium, LV = Left Ventricle. Doppler Color flow mapping superimposed on the panel at right demonstrates severe tricuspid insufficiency (arrow). Panel (B): Paired fetal echocardiographic sagittal still frame images of the dilated RV, the normal-sized RVOT, and the reverse-oriented ductus. RV = Right Ventricle, PV = Pulmonary Valve, MPA = Main Pulmonary Artery, LV = Left Ventricle, DA = Ductus Arteriosus. Doppler Color flow mapping in the panel at right demonstrates retrograde flow in the reverse-oriented ductus (blue), retrograde flow in the main pulmonary artery (orange), and marked pulmonary valve insufficiency (red). All images were produced on a GE Voluson E10 Ultrasound System.",
  "group": "Другие ВПС",
  "cards": [
   "chd:ebstein"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Kavanaugh-McHugh A, Zuckerwise LC, Killen SAS, et al.",
   "title": "Management of Ebstein Anomaly in the Current Era: The Story of One Fetus and the Collaboration of Many-A Case Report.",
   "journal": "J Cardiovasc Dev Dis",
   "year": 2024,
   "figure": "Figure 1",
   "pmcid": "PMC11122070",
   "url": "https://doi.org/10.3390/jcdd11050147",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc11122070-f3",
  "file": "img/pmc11122070-f3.jpg",
  "label": "J Cardiovasc Dev Dis 2024, рис. 3",
  "caption": "Echocardiographic sagittal still frame image of the fetal chest and abdomen demonstrating ascites and pericardial effusion (arrows) in the setting of early fetal hydrops at 30 6/7 weeks gestation (GE Voluson E10 Imaging System).",
  "group": "Другие ВПС",
  "cards": [
   "chd:ebstein"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Kavanaugh-McHugh A, Zuckerwise LC, Killen SAS, et al.",
   "title": "Management of Ebstein Anomaly in the Current Era: The Story of One Fetus and the Collaboration of Many-A Case Report.",
   "journal": "J Cardiovasc Dev Dis",
   "year": 2024,
   "figure": "Figure 3",
   "pmcid": "PMC11122070",
   "url": "https://doi.org/10.3390/jcdd11050147",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc11122070-f4",
  "file": "img/pmc11122070-f4.jpg",
  "label": "J Cardiovasc Dev Dis 2024, рис. 4",
  "caption": "Echocardiographic sagittal still frame image of the fetal thorax with color flow mapping demonstrating retrograde flow in a diminutive ductus arteriosus (arrow). RA = Right Atrium, AAo = Ascending Aorta, LA = Left Atrium, DAo = Descending Aorta (GE Voluson E10 Imaging System).",
  "group": "Другие ВПС",
  "cards": [
   "chd:ebstein"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Kavanaugh-McHugh A, Zuckerwise LC, Killen SAS, et al.",
   "title": "Management of Ebstein Anomaly in the Current Era: The Story of One Fetus and the Collaboration of Many-A Case Report.",
   "journal": "J Cardiovasc Dev Dis",
   "year": 2024,
   "figure": "Figure 4",
   "pmcid": "PMC11122070",
   "url": "https://doi.org/10.3390/jcdd11050147",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc12338190-f1",
  "file": "img/pmc12338190-f1.jpg",
  "label": "Medicine (Baltimore) 2025, рис. 1",
  "caption": "Imaging of pentalogy of Cantrell. (A) Fetal chest wall defect with exposed heart; (B) upper abdominal wall defect above the umbilicus with exposed liver; (C) fetal umbilical herniation; (D) the postnatal photograph following induced labor.",
  "group": "Другие ВПС",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Peng W, Li L, Yang R, et al.",
   "title": "Prenatal ultrasound diagnosis of pentalogy of Cantrell: A case report.",
   "journal": "Medicine (Baltimore)",
   "year": 2025,
   "figure": "Figure 1",
   "pmcid": "PMC12338190",
   "url": "https://doi.org/10.1097/md.0000000000043674",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc12426840-f1",
  "file": "img/pmc12426840-f1.jpg",
  "label": "CASE (Phila) 2025, рис. 1",
  "caption": "Two-dimensional fetal echocardiogram, obtained at 21 weeks of gestation, transverse plane, four-chamber view (A), demonstrates levocardia, two balanced ventricles, and a common atrioventricular valve consistent with an AVSD; transverse plane, three-vessel view superior sweep with color flow Doppler (B) demonstrates four vessels, different color displays of the two venous vessels (opposite direction of flow), a prominent IV (C) with an ascending vein to the left of the PA draining to the IV (D). 4th V, Fourth vessel; LV, left ventricle; RV, right ventricle; SVC, superior vena cava.",
  "group": "Другие ВПС",
  "cards": [
   "chd:tapvr"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Dzhelepova N, Jones CB",
   "title": "Clues on the Three-Vessel View for Fetal Diagnosis of Supracardiac Total Anomalous Pulmonary Venous Connection.",
   "journal": "CASE (Phila)",
   "year": 2025,
   "figure": "Figure 1",
   "pmcid": "PMC12426840",
   "url": "https://doi.org/10.1016/j.case.2025.04.005",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc12426840-f2",
  "file": "img/pmc12426840-f2.jpg",
  "label": "CASE (Phila) 2025, рис. 2",
  "caption": "Two-dimensional fetal echocardiogram with color flow and pulsed-wave Doppler obtained at 21 weeks of gestation, transverse plane, demonstrates the spectral Doppler display from one presumed pulmonary vein (arrow) with an unclear site of drainage; the spectral Doppler profile is abnormal, as the pattern below the baseline does not demonstrate conventional phasic flow patterns seen with pulmonary veins.",
  "group": "Другие ВПС",
  "cards": [
   "chd:tapvr"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Dzhelepova N, Jones CB",
   "title": "Clues on the Three-Vessel View for Fetal Diagnosis of Supracardiac Total Anomalous Pulmonary Venous Connection.",
   "journal": "CASE (Phila)",
   "year": 2025,
   "figure": "Figure 2",
   "pmcid": "PMC12426840",
   "url": "https://doi.org/10.1016/j.case.2025.04.005",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc12426840-f3",
  "file": "img/pmc12426840-f3.jpg",
  "label": "CASE (Phila) 2025, рис. 3",
  "caption": "Two-dimensional fetal echocardiogram, obtained at 28 weeks of gestation, transverse plane, four-chamber view without (left) and with (right) simultaneous color flow Doppler, demonstrates AVSD (arrow) and, by tilting posteriorly, reveals a small pulmonary venous confluence (PVC; arrow) behind the left atrium. LV, Left ventricle; RV, right ventricle.",
  "group": "Другие ВПС",
  "cards": [
   "chd:tapvr"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Dzhelepova N, Jones CB",
   "title": "Clues on the Three-Vessel View for Fetal Diagnosis of Supracardiac Total Anomalous Pulmonary Venous Connection.",
   "journal": "CASE (Phila)",
   "year": 2025,
   "figure": "Figure 3",
   "pmcid": "PMC12426840",
   "url": "https://doi.org/10.1016/j.case.2025.04.005",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc12426840-f4",
  "file": "img/pmc12426840-f4.jpg",
  "label": "CASE (Phila) 2025, рис. 4",
  "caption": "Two-dimensional fetal echocardiogram, obtained at 28 weeks of gestation, sagittal plane, bicaval view, demonstrates that the superior vena cava is larger than the inferior vena cava, which suggests drainage of the TAPVC to the RSVC.",
  "group": "Другие ВПС",
  "cards": [
   "chd:tapvr"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Dzhelepova N, Jones CB",
   "title": "Clues on the Three-Vessel View for Fetal Diagnosis of Supracardiac Total Anomalous Pulmonary Venous Connection.",
   "journal": "CASE (Phila)",
   "year": 2025,
   "figure": "Figure 4",
   "pmcid": "PMC12426840",
   "url": "https://doi.org/10.1016/j.case.2025.04.005",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc12426840-f5",
  "file": "img/pmc12426840-f5.jpg",
  "label": "CASE (Phila) 2025, рис. 5",
  "caption": "Two-dimensional fetal echocardiogram, obtained at 28 weeks of gestation, sagittal plane, without (left) and with (right) simultaneous color flow Doppler, demonstrates pulmonary veins joining the confluence, the ascending vein (AV) draining toward the IV, and the right upper pulmonary vein (RUPV) draining directly to the RSVC. PVC, Pulmonary venous connection; SVC, superior vena cava.",
  "group": "Другие ВПС",
  "cards": [
   "chd:tapvr"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Dzhelepova N, Jones CB",
   "title": "Clues on the Three-Vessel View for Fetal Diagnosis of Supracardiac Total Anomalous Pulmonary Venous Connection.",
   "journal": "CASE (Phila)",
   "year": 2025,
   "figure": "Figure 5",
   "pmcid": "PMC12426840",
   "url": "https://doi.org/10.1016/j.case.2025.04.005",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc12564150-f1",
  "file": "img/pmc12564150-f1.jpg",
  "label": "Diagnostics (Basel) 2025, рис. 1",
  "caption": "Four-chamber view in case nr 1 and case nr 2 with critical aortic stenosis, with schematic presentation of functional parameters for the left and right ventricles in fetuses at 35 weeks of pregnancy, with significantly reduced parameters: GS—global strain; FAC—fractional area change; and EF—ejection for left akinetic. Dilated left ventricle with endocardial fibroelastosis for case 2. End-diastole and end-systole are defined in different colors.",
  "group": "Другие ВПС",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Murlewska J, Witkowski S, Strzelecka I, et al.",
   "title": "Fetal Speckle Tracking Technology for Critical Aortic Stenosis: Advancing Through Innovation.",
   "journal": "Diagnostics (Basel)",
   "year": 2025,
   "figure": "Figure 1",
   "pmcid": "PMC12564150",
   "url": "https://doi.org/10.3390/diagnostics15202591",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc12771062-f1",
  "file": "img/pmc12771062-f1.jpg",
  "label": "Cureus 2025, рис. 1",
  "caption": "(A-B) Pre-natal ultrasound scan. A modified long-axis view of the three-vessel view showed the three vessels (SVC, aorta, and MPA) and a large single cystic mass adjacent to the left side of the fetal heart, but it failed to demonstrate communication with the LA.Ao: aortic valve; Cyst: congenital left atrial appendage aneurysm (CLAAA); MPA: main pulmonary artery; RA: right atrium; SVC: superior vena cava; LA: left atrium",
  "group": "Другие ВПС",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Algonaid OA, Alaskar RS, Altamimi O, et al.",
   "title": "Congenital Left Atrial Appendage Aneurysm: The Role of Prenatal Fetal Echocardiography in Early Recognition.",
   "journal": "Cureus",
   "year": 2025,
   "figure": "Figure 1",
   "pmcid": "PMC12771062",
   "url": "https://doi.org/10.7759/cureus.98614",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc12771062-f2",
  "file": "img/pmc12771062-f2.jpg",
  "label": "Cureus 2025, рис. 2",
  "caption": "(A-D) Fetal echocardiography in a long-axis view, tilted cranially from the four-chamber view, showed a single cystic mass adjacent to the left side of the heart representing the CLAAA. Color Doppler demonstrated flow from the CLAAA to the LA (bold white arrow, image D) during diastole when the TV is open, and flow returning to it (bold black arrow, image B) during systole when the TV is closed, with forward flow seen across the Ao. The slim orange arrow indicates the level of the Ao.Ao: aortic valve; CLAAA: congenital left atrial appendage aneurysm; LA: left atrium; RA: right atrium; TV: tricuspid valve",
  "group": "Другие ВПС",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Algonaid OA, Alaskar RS, Altamimi O, et al.",
   "title": "Congenital Left Atrial Appendage Aneurysm: The Role of Prenatal Fetal Echocardiography in Early Recognition.",
   "journal": "Cureus",
   "year": 2025,
   "figure": "Figure 2",
   "pmcid": "PMC12771062",
   "url": "https://doi.org/10.7759/cureus.98614",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc12880957-f1",
  "file": "img/pmc12880957-f1.jpg",
  "label": "Prenat Diagn 2026, рис. 1",
  "caption": "Atrial morphology patterns categorized into four types based on imaging characteristics. The four types (1–4) are displayed with (a) image examples from the fetal cardiac four‐chamber view, (b) short descriptions, and (c) bar‐plot showing distributions among the types. LA, left atrium; RA, right atrium; RV, right ventricle.",
  "group": "Другие ВПС",
  "cards": [
   "chd:hlhs"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Dannesbo S, Ho G, Seed M, et al.",
   "title": "Fetal Diagnosis of Hypoplastic Left Heart Syndrome With Restrictive Atrial Septum-Atrial Septal Morphology, Associated Lung Disease and Outcomes.",
   "journal": "Prenat Diagn",
   "year": 2026,
   "figure": "FIGURE 1",
   "pmcid": "PMC12880957",
   "url": "https://doi.org/10.1002/pd.70000",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc12967494-f1",
  "file": "img/pmc12967494-f1.jpg",
  "label": "Cureus 2026, рис. 1",
  "caption": "Four-chamber viewA. Inversion of the ventricles, with the morphological right ventricle (RV) (thin arrow) positioned on the left; the morphological left ventricle (LV) positioned on the right (white arrow); the left atrium (star) connected to the morphological right ventricle (RV); the right atrium (blue arrow) connected to the morphological left ventricle (LV)B. Pulmonary artery (blue arrow) originating from the morphological left ventricle (LV) (white arrow)C. Aorta (blue arrow) originating from the morphological right ventricle (RV) (white arrow)Maternal right (MR), Maternal left (ML), Fetal right (R), Fetal left (L)",
  "group": "Другие ВПС",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Chavhan AR, Sahu J, Mitra K, et al.",
   "title": "Prenatal Diagnosis of Isolated Congenitally Corrected Transposition of the Great Arteries.",
   "journal": "Cureus",
   "year": 2026,
   "figure": "Figure 1",
   "pmcid": "PMC12967494",
   "url": "https://doi.org/10.7759/cureus.103097",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc12967494-f2",
  "file": "img/pmc12967494-f2.jpg",
  "label": "Cureus 2026, рис. 2",
  "caption": "Color Doppler imagingA. The pulmonary artery originating from the morphological left ventricle (LV); B. The aorta (white arrow) originating from the morphological right ventricle (RV) (thin arrow)",
  "group": "Другие ВПС",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Chavhan AR, Sahu J, Mitra K, et al.",
   "title": "Prenatal Diagnosis of Isolated Congenitally Corrected Transposition of the Great Arteries.",
   "journal": "Cureus",
   "year": 2026,
   "figure": "Figure 2",
   "pmcid": "PMC12967494",
   "url": "https://doi.org/10.7759/cureus.103097",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc2778174-f1",
  "file": "img/pmc2778174-f1.jpg",
  "label": "Obstet Gynecol Int 2009, рис. 1",
  "caption": "Apical four-chamber view showing a defect of isolated complete atrioventricular septal defet. AVSD: atrioventricular septal defet; RV: right ventricle; LV: left ventricle.",
  "group": "Другие ВПС",
  "cards": [
   "chd:avsd",
   "view:4cv"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Yıldırım G, Gungorduk K, Yazıcıoğlu F, et al.",
   "title": "Prenatal diagnosis of complete atrioventricular septal defect: perinatal and neonatal outcomes.",
   "journal": "Obstet Gynecol Int",
   "year": 2009,
   "figure": "Figure 1",
   "pmcid": "PMC2778174",
   "url": "https://doi.org/10.1155/2009/958496",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc4827237-f1",
  "file": "img/pmc4827237-f1.jpg",
  "label": "Cardiovasc Ultrasound 2016, рис. 1",
  "caption": "Measurement of right ventricular end-diastolic volume in a normal fetus a a fetus with HLHS and visible left ventricular cavity b and a fetus with HLHS and invisible left ventricular cavity c. HLHS: Hypoplastic left heart syndrome",
  "group": "Другие ВПС",
  "cards": [
   "chd:hlhs"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Zhang J, Zhou Q, Zhao Y, et al.",
   "title": "Evaluation of right ventricular function in fetal hypoplastic left heart syndrome using spatio-temporal image correlation (STIC).",
   "journal": "Cardiovasc Ultrasound",
   "year": 2016,
   "figure": "Fig. 1",
   "pmcid": "PMC4827237",
   "url": "https://doi.org/10.1186/s12947-016-0056-5",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc4827237-f2",
  "file": "img/pmc4827237-f2.jpg",
  "label": "Cardiovasc Ultrasound 2016, рис. 2",
  "caption": "Measurement of right ventricular end-systolic volume in a normal fetus a a fetus with HLHS and visible left ventricular cavity b and a fetus with HLHS and invisible left ventricular cavity c. HLHS: Hypoplastic left heart syndrome",
  "group": "Другие ВПС",
  "cards": [
   "chd:hlhs"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Zhang J, Zhou Q, Zhao Y, et al.",
   "title": "Evaluation of right ventricular function in fetal hypoplastic left heart syndrome using spatio-temporal image correlation (STIC).",
   "journal": "Cardiovasc Ultrasound",
   "year": 2016,
   "figure": "Fig. 2",
   "pmcid": "PMC4827237",
   "url": "https://doi.org/10.1186/s12947-016-0056-5",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc4928259-f2",
  "file": "img/pmc4928259-f2.jpg",
  "label": "BMC Pregnancy Childbirth 2016, рис. 2",
  "caption": "Sonographic images of a 22-gestational-week fetus diagnosed with TAPVC. In the 4CV, a tubular-like structure was detected between the LA and DAO (a). Gradual rotation of the ultrasound beam; two tiny structures were visualized to drain into the tubular-like structure (b). This was suspected to be TAPVC by screening sonographers under Protocol B, for whom this characteristic sign had been made evident. 4CV, four chamber view; AAO, ascending aorta; DAO, descending aorta; L, left; R, right; LA, left atrium; LV, left ventricle; RA, right atrium; RV, right ventricle; S, spine. The areas indicated by the white arrows depict the tubular-like structure",
  "group": "Другие ВПС",
  "cards": [
   "chd:tapvr"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Zhang Y, Cai AL, Ren WD, et al.",
   "title": "Identification of fetal cardiac anatomy and hemodynamics: a novel enhanced screening protocol.",
   "journal": "BMC Pregnancy Childbirth",
   "year": 2016,
   "figure": "Fig. 2",
   "pmcid": "PMC4928259",
   "url": "https://doi.org/10.1186/s12884-016-0933-9",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc4928259-f4",
  "file": "img/pmc4928259-f4.jpg",
  "label": "BMC Pregnancy Childbirth 2016, рис. 4",
  "caption": "Sonographic images of a 22-gestational-week fetus diagnosed with TGA. The 4CV (a) shows four symmetric chambers with no obvious anomalies present. In the left (b) and right (c) outflow tract views, the connections of LV with MPA and RV with AAO are detected, respectively. Correct identification of the AAO and MPA was critical in making the diagnosis, which was accomplished by sonographers under Protocol B but failed under Protocol A. 4CV, four-chamber view; AAO, ascending aorta; DAO, descending aorta; LA, left atrium; LV, left ventricle; MPA, main pulmonary artery; RA, right atrium; RV, right ventricle; S, spine; TGA, transposition of the great arteries. The arrow indicates the bifurcation of the MPA",
  "group": "Другие ВПС",
  "cards": [
   "chd:tga"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Zhang Y, Cai AL, Ren WD, et al.",
   "title": "Identification of fetal cardiac anatomy and hemodynamics: a novel enhanced screening protocol.",
   "journal": "BMC Pregnancy Childbirth",
   "year": 2016,
   "figure": "Fig. 4",
   "pmcid": "PMC4928259",
   "url": "https://doi.org/10.1186/s12884-016-0933-9",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc4928259-f5",
  "file": "img/pmc4928259-f5.jpg",
  "label": "BMC Pregnancy Childbirth 2016, рис. 5",
  "caption": "Sonographic images of a 22-gestational-week fetus diagnosed with ccTGA. The 4CV (a) showed four symmetric chambers that were considered to be normal by sonographers under Protocol A. However, it was confirmed as atrioventricular discordance by carefully visualizing the position of the atrioventricular valves that insert into the septum. In addition, the left (b) and right (c) outflow tract views substantiate that MPA was connected to morphological LV, while AAO connected to morphological RV. Sequential segmental analysis allowed sonographers under Protocol B to detect this anomaly. 4CV, four-chamber view; AAO, ascending aorta; ccTGA, congenitally corrected transposition of the great arteries; DAO, descending aorta; LA, left atrium; LPA, left pulmonary artery; LV, left ventricle; MPA, main pulmonary artery; RA, right atrium; RPA, right pulmonary artery; RV, right ventricle; S, spine",
  "group": "Другие ВПС",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Zhang Y, Cai AL, Ren WD, et al.",
   "title": "Identification of fetal cardiac anatomy and hemodynamics: a novel enhanced screening protocol.",
   "journal": "BMC Pregnancy Childbirth",
   "year": 2016,
   "figure": "Fig. 5",
   "pmcid": "PMC4928259",
   "url": "https://doi.org/10.1186/s12884-016-0933-9",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc4928259-f6",
  "file": "img/pmc4928259-f6.jpg",
  "label": "BMC Pregnancy Childbirth 2016, рис. 6",
  "caption": "Sonographic images of a 24-gestational-week fetus diagnosed with pulmonary valve atresia. Thickened pulmonary valves (indicated by arrows) were visualized in the right outflow tract view (a) via 2D. However, this anomaly was neglected by the sonographers under Protocol A because the valvular movement was difficult to visualize at times. However, color Doppler resolved this problem by visualizing the retrograde flow in the MPA (b), indicating pulmonary valve atresia. At the same time, no blood flow was detected entering the MPA across the thickened PV. AAO, ascending aorta; MPA, main pulmonary artery; PV, pulmonary valve; RV, right ventricle; S, spine",
  "group": "Другие ВПС",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Zhang Y, Cai AL, Ren WD, et al.",
   "title": "Identification of fetal cardiac anatomy and hemodynamics: a novel enhanced screening protocol.",
   "journal": "BMC Pregnancy Childbirth",
   "year": 2016,
   "figure": "Fig. 6",
   "pmcid": "PMC4928259",
   "url": "https://doi.org/10.1186/s12884-016-0933-9",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc4928259-f7",
  "file": "img/pmc4928259-f7.jpg",
  "label": "BMC Pregnancy Childbirth 2016, рис. 7",
  "caption": "Sonographic images of a 24-gestational-week fetus diagnosed with tricuspid dysplasia. The 4CV was considered to be normal by sonographers under Protocol A because they did not find a thickened tricuspid valve (a). In fact, the RA was a little large in size according to careful observation. Also, the thickened tricuspid valves could be detected after careful scan (b). Color Doppler made it quite easy to detect tricuspid regurgitation, which would direct attention to valvular structural anomalies (c). DAO, descending aorta; LA, left atrium; LV, left ventricle; RA, right atrium; RV, right ventricle; S, spine; TR, tricuspid regurgitation; TV, tricuspid valve. The arrows indicate the thickened valves",
  "group": "Другие ВПС",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Zhang Y, Cai AL, Ren WD, et al.",
   "title": "Identification of fetal cardiac anatomy and hemodynamics: a novel enhanced screening protocol.",
   "journal": "BMC Pregnancy Childbirth",
   "year": 2016,
   "figure": "Fig. 7",
   "pmcid": "PMC4928259",
   "url": "https://doi.org/10.1186/s12884-016-0933-9",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc4928259-f8",
  "file": "img/pmc4928259-f8.jpg",
  "label": "BMC Pregnancy Childbirth 2016, рис. 8",
  "caption": "Sonographic images of a 24-gestational-week fetus in which VSD was falsely suspected. In the 4CV, a small echo drop-out was visualized at the perimembraneous septum, as indicated by the white arrows (a). This was at times easily considered to be a VSD, whereas it was actually an artifact. Color Doppler helped to resolve this problem. No flow signals were identified across the septum in either systolic (b) or diastolic (c) phases",
  "group": "Другие ВПС",
  "cards": [
   "chd:vsd",
   "view:4cv"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Zhang Y, Cai AL, Ren WD, et al.",
   "title": "Identification of fetal cardiac anatomy and hemodynamics: a novel enhanced screening protocol.",
   "journal": "BMC Pregnancy Childbirth",
   "year": 2016,
   "figure": "Fig. 8",
   "pmcid": "PMC4928259",
   "url": "https://doi.org/10.1186/s12884-016-0933-9",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc4928259-f9",
  "file": "img/pmc4928259-f9.jpg",
  "label": "BMC Pregnancy Childbirth 2016, рис. 9",
  "caption": "Sonographic images of a 21-gestational-week fetus in which PAVSD was falsely suspected. In the 4CV, a deficiency of the atrial septem primum was suspected by sonographers under Protocol A, as indicated by the white arrows. It was in actuality the echo of the coronary sinus which could be visualized when a non-standard 4CV was obtained with the section across the atrioventricular groove. These specific signs were mentioned in Protocol B",
  "group": "Другие ВПС",
  "cards": [
   "chd:avsd",
   "view:4cv"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Zhang Y, Cai AL, Ren WD, et al.",
   "title": "Identification of fetal cardiac anatomy and hemodynamics: a novel enhanced screening protocol.",
   "journal": "BMC Pregnancy Childbirth",
   "year": 2016,
   "figure": "Fig. 9",
   "pmcid": "PMC4928259",
   "url": "https://doi.org/10.1186/s12884-016-0933-9",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc5481875-f2",
  "file": "img/pmc5481875-f2.jpg",
  "label": "Cardiovasc Ultrasound 2017, рис. 2",
  "caption": "Multiplanar slicing of TGA in a fetus of 25 gestational weeks. Panels a, b, and c represent three orthogonal planes (A, transverse; B, sagittal; and C, coronal). The cardiac apex in the 4CV was oriented upwards and the reference point (indicated by the green arrow) was placed in the crux of the heart in Panel a (A). Move the reference point to the right ventricle in Panel a. By adjusting the position of the reference point in Panel a, a great artery connecting to the right ventricle could be visualized in Panel b (B). Moving the reference point to the valve (C) and then navigating along the artery (D) in Panel b, we could then confirm that aorta was originated from the right ventricle and the pulmonary artery (characterized by the short trunk with bifurcation) from the left in Panel a. The parallel relationship of the two great arteries was also demonstrated. In addition, a VSD in large size could also be identified. AO, aorta; LV, left ventricle; PA, pulmonary artery; RV, right ventricle; TGA, transposition of the great arteries; VSD, ventricular septal defect",
  "group": "Другие ВПС",
  "cards": [
   "chd:tga"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Wang Y, Fan M, Siddiqui FA, et al.",
   "title": "Prenatal screening of fetal ventriculoarterial connections: benefits of 4D technique in fetal heart imaging.",
   "journal": "Cardiovasc Ultrasound",
   "year": 2017,
   "figure": "Fig. 2",
   "pmcid": "PMC5481875",
   "url": "https://doi.org/10.1186/s12947-017-0108-5",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc5481875-f3",
  "file": "img/pmc5481875-f3.jpg",
  "label": "Cardiovasc Ultrasound 2017, рис. 3",
  "caption": "Multiplanar slicing of DORV in a fetus of 26 gestational weeks. Panels a, b, and c represent three orthogonal planes (A, transverse; B, sagittal; and C, coronal). The cardiac apex in the 4CV was oriented upwards and the reference point (indicated by the green arrow) was placed in the crux of the heart in Panel a (A). Move the reference point to the right ventricle in Panel a. By adjusting the position of the reference point in Panel a, a great artery connecting to the right ventricle could be visualized in Panel b (B). Moving the reference point to the valve (C) and then navigating along the artery (D) in Panel b, we could then confirm that aorta and the pulmonary artery (characterized by the short trunk with bifurcation) were both originated from the right ventricle and were coursing in parallel in Panel a. AO, aorta; DORV, double-outlet right ventricle; LV, left ventricle; PA, pulmonary artery; RV, right ventricle",
  "group": "Другие ВПС",
  "cards": [
   "chd:dorv"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Wang Y, Fan M, Siddiqui FA, et al.",
   "title": "Prenatal screening of fetal ventriculoarterial connections: benefits of 4D technique in fetal heart imaging.",
   "journal": "Cardiovasc Ultrasound",
   "year": 2017,
   "figure": "Fig. 3",
   "pmcid": "PMC5481875",
   "url": "https://doi.org/10.1186/s12947-017-0108-5",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc5481875-f4",
  "file": "img/pmc5481875-f4.jpg",
  "label": "Cardiovasc Ultrasound 2017, рис. 4",
  "caption": "Multiplanar slicing of TOF in a fetus of 24 gestational weeks. Panels a, b, and c represent three orthogonal planes (A, transverse; B, sagittal; and C, coronal). The cardiac apex in the 4CV was oriented upwards and the reference point (indicated by the green arrow) was placed in the crux of the heart in Panel a (A). Move the reference point to the position of the outflow tracts (at the basal part of the ventricles, near the crux of the heart) in Panel a. By adjusting the position of the reference point in Panel a, a great artery could be visualized in Panel b (B). Moving the reference point to the valve (C) and then navigating along the artery (D) in Panel b, we could then confirm that aorta was originated from both left and right ventricles in Panel a. A large-sized VSD could also be identified. Navigating the reference point further along aorta (E) in Panel b, we could visualize that the pulmonary artery (characterized by the short trunk with bifurcation) was originated from the right ventricle with a thickened valve in Panel a. AO, aorta; LV, left ventricle; PA, pulmonary artery; RV, right ventricle; TOF, tetralogy of Fallot; VSD, ventricular septal defect",
  "group": "Другие ВПС",
  "cards": [
   "chd:tof"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Wang Y, Fan M, Siddiqui FA, et al.",
   "title": "Prenatal screening of fetal ventriculoarterial connections: benefits of 4D technique in fetal heart imaging.",
   "journal": "Cardiovasc Ultrasound",
   "year": 2017,
   "figure": "Fig. 4",
   "pmcid": "PMC5481875",
   "url": "https://doi.org/10.1186/s12947-017-0108-5",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc5481875-f5",
  "file": "img/pmc5481875-f5.jpg",
  "label": "Cardiovasc Ultrasound 2017, рис. 5",
  "caption": "Multiplanar slicing of TCA in a fetus of 28 gestational weeks. Panels a, b, and c represent three orthogonal planes (A, transverse; B, sagittal; and C, coronal). The cardiac apex in the 4CV was oriented upwards and the reference point (indicated by the green arrow) was placed in the crux of the heart in Panel a (A). Move the reference point to the position of the outflow tracts (at the basal part of the ventricles, near the crux of the heart) in Panel a. By adjusting the position of the reference point in Panel a, a great artery could be visualized in Panel b. A VSD could also be identified (B). Moving the reference point to the valve (C) and then navigating along the artery (D) in Panel b, we could then confirm that only one great artery arising from both ventricles (mainly from the right ventricle) in Panel a. This great artery is aorta. The pulmonary artery was visualized arising from the root of aorta in Panel a. AO, aorta; LV, left ventricle; PA, pulmonary artery; RV, right ventricle; TCA, truncus arteriosus; VSD, ventricular septal defect",
  "group": "Другие ВПС",
  "cards": [
   "chd:cat"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Wang Y, Fan M, Siddiqui FA, et al.",
   "title": "Prenatal screening of fetal ventriculoarterial connections: benefits of 4D technique in fetal heart imaging.",
   "journal": "Cardiovasc Ultrasound",
   "year": 2017,
   "figure": "Fig. 5",
   "pmcid": "PMC5481875",
   "url": "https://doi.org/10.1186/s12947-017-0108-5",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc5481875-f6",
  "file": "img/pmc5481875-f6.jpg",
  "label": "Cardiovasc Ultrasound 2017, рис. 6",
  "caption": "Detection of great arteries alignment in TGA and normal fetuses using 4D volumes with color flow information. In a 24-gestational-week fetus with TGA (a), parallel great arteries were clearly identified by the 4D rendered image. The pulmonary artery was originated from the left ventricle while the right ventricle gave off the aorta. In a normal fetus (b) of similar gestational age, the 4D rendered image demonstrated that the two great arteries were orthogonal to each other originating from each ventricle. AO, aorta; LV, left ventricle; PA, pulmonary artery; RV, right ventricle; TGA, transposition of the great arteries",
  "group": "Другие ВПС",
  "cards": [
   "chd:tga"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Wang Y, Fan M, Siddiqui FA, et al.",
   "title": "Prenatal screening of fetal ventriculoarterial connections: benefits of 4D technique in fetal heart imaging.",
   "journal": "Cardiovasc Ultrasound",
   "year": 2017,
   "figure": "Fig. 6",
   "pmcid": "PMC5481875",
   "url": "https://doi.org/10.1186/s12947-017-0108-5",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc5481875-f7",
  "file": "img/pmc5481875-f7.jpg",
  "label": "Cardiovasc Ultrasound 2017, рис. 7",
  "caption": "Detection of TOF in a fetus of 24 gestational weeks using 4D volumes with color flow information. The 4D rendered image clearly showed that the large in sized aorta was connected to both ventricles (a). Another image showed the stenosis pulmonary artery was connected to the right ventricle (b). AO, aorta; LV, left ventricle; PA, pulmonary artery; RV, right ventricle; TOF, tetralogy of Fallot",
  "group": "Другие ВПС",
  "cards": [
   "chd:tof"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Wang Y, Fan M, Siddiqui FA, et al.",
   "title": "Prenatal screening of fetal ventriculoarterial connections: benefits of 4D technique in fetal heart imaging.",
   "journal": "Cardiovasc Ultrasound",
   "year": 2017,
   "figure": "Fig. 7",
   "pmcid": "PMC5481875",
   "url": "https://doi.org/10.1186/s12947-017-0108-5",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc5481875-f8",
  "file": "img/pmc5481875-f8.jpg",
  "label": "Cardiovasc Ultrasound 2017, рис. 8",
  "caption": "Detection of TCA in a fetus of 28 gestational weeks using 4D volumes with color flow information. The 4D rendered image clearly showed that a large in sized great artery(aorta) was originated from both ventricles. The main pulmonary artery was connected to the root of aorta. AO, aorta; LPA, left pulmonary artery; MPA, main pulmonary artery; RPA, right pulmonary artery; TCA, truncus arteriosus",
  "group": "Другие ВПС",
  "cards": [
   "chd:cat"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Wang Y, Fan M, Siddiqui FA, et al.",
   "title": "Prenatal screening of fetal ventriculoarterial connections: benefits of 4D technique in fetal heart imaging.",
   "journal": "Cardiovasc Ultrasound",
   "year": 2017,
   "figure": "Fig. 8",
   "pmcid": "PMC5481875",
   "url": "https://doi.org/10.1186/s12947-017-0108-5",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc5701355-f1",
  "file": "img/pmc5701355-f1.jpg",
  "label": "BMC Pregnancy Childbirth 2017, рис. 1",
  "caption": "US show a fetus at the gestational age of 21.1 weeks with levocardia. The heart is located in the normal levo position with a left-sided cardiac apex (shown on a). The stomach is located in the right side of the abdomen (shown in b)",
  "group": "Другие ВПС",
  "cards": [
   "view:situs"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Wang X, Shi Y, Zeng S, et al.",
   "title": "Comparing levocardia and dextrocardia in fetuses with heterotaxy syndrome: prenatal features, clinical significance and outcomes.",
   "journal": "BMC Pregnancy Childbirth",
   "year": 2017,
   "figure": "Fig. 1",
   "pmcid": "PMC5701355",
   "url": "https://doi.org/10.1186/s12884-017-1579-y",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc5701355-f2",
  "file": "img/pmc5701355-f2.jpg",
  "label": "BMC Pregnancy Childbirth 2017, рис. 2",
  "caption": "US shows a fetus at the gestational age of 22.7 weeks with dextrocardia. The heart is located in the right hemithorax with the heart axis directed to the right and caudad (shown on a). The stomach is located in the left side of the abdomen (shown in b)",
  "group": "Другие ВПС",
  "cards": [
   "view:situs"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Wang X, Shi Y, Zeng S, et al.",
   "title": "Comparing levocardia and dextrocardia in fetuses with heterotaxy syndrome: prenatal features, clinical significance and outcomes.",
   "journal": "BMC Pregnancy Childbirth",
   "year": 2017,
   "figure": "Fig. 2",
   "pmcid": "PMC5701355",
   "url": "https://doi.org/10.1186/s12884-017-1579-y",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc6824646-f1",
  "file": "img/pmc6824646-f1.jpg",
  "label": "Medicine (Baltimore) 2019, рис. 1",
  "caption": "The diagnostic classification of pulmonary atresia with intact ventricular septum. (A) Type I—pulmonary atresia (narrow), the presence of right ventricular inlet portion, trabecular portion and infundibulum portion, the absence of venticulo-coronary artery communication; (B) Type II—pulmonary atresia (narrow), the absence of right ventricular trabecular portion, the presence of right ventricular inlet portion and infundibulum portion but the cavity is small, the absence of venticulo-coronary artery communication; (C) Type III—pulmonary atresia (narrow), the absence of right ventricular trabecular portion and infundibulum, only a small inlet portion, venticulo-coronary artery communication (circle in the right ventricular myocardium indicates sinusoids ). A = left atrium, AO = aorta, LV = left ventricle, PA = pulmonary atresia, RA = right atrium, RV = right ventricle.",
  "group": "Другие ВПС",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Liu L, Wang H, Cui C, et al.",
   "title": "Prenatal echocardiographic classification and prognostic evaluation strategy in fetal pulmonary atresia with intact ventricular septum.",
   "journal": "Medicine (Baltimore)",
   "year": 2019,
   "figure": "Figure 1",
   "pmcid": "PMC6824646",
   "url": "https://doi.org/10.1097/md.0000000000017492",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc6824646-f3",
  "file": "img/pmc6824646-f3.jpg",
  "label": "Medicine (Baltimore) 2019, рис. 3",
  "caption": "The prenatal and postnatal echocardiography of type I pulmonary atresia with intact ventricular septum. (A) The prenatal echocardiography at 23 weeks’ gestation, four-chamber view shows right ventricle is well developed, no venticulo-coronary artery communication, intact ventricular septum. (B) The 3-vessel-trachea view shows pulmonary atresia (narrow). (C) The postnatal echocardiography of the same fetus, four-chamber view shows right ventricle is well developed, severe tricuspid regurgitation, no venticulo-coronary artery communication. (D) Parasternal short axis shows pulmonary atresia (arrow), patent ductus arteriosus. AO = aorta, DAo = descending aorta, LA = left atrium, LPA = left pulmonary artery, LV = left ventricle, PA = pulmonary atresia, PDA = patent ductus arteriosus, RA = right atrium, RPA = right pulmonary artery, RV = right ventricle, SVC = superior vena cava, VCAC = ventriculo-coronary artery communication.",
  "group": "Другие ВПС",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Liu L, Wang H, Cui C, et al.",
   "title": "Prenatal echocardiographic classification and prognostic evaluation strategy in fetal pulmonary atresia with intact ventricular septum.",
   "journal": "Medicine (Baltimore)",
   "year": 2019,
   "figure": "Figure 3",
   "pmcid": "PMC6824646",
   "url": "https://doi.org/10.1097/md.0000000000017492",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc6824646-f4",
  "file": "img/pmc6824646-f4.jpg",
  "label": "Medicine (Baltimore) 2019, рис. 4",
  "caption": "The prenatal and postnatal echocardiography of type II pulmonary atresia with intact ventricular septum. (A) The prenatal echocardiography at 22 weeks’ gestation, four-chamber view shows the absence of right ventricular trabecular portion, no venticulo-coronary artery communication, intact ventricular septum. (B) The 3-vessel-trachea view shows pulmonary atresia (narrow). (C) The postnatal echocardiography of the same fetus, four-chamber view shows the absence of right ventricular trabecular portion, no venticulo-coronary artery communication, no tricuspid regurgitation. (D) Parasternal short axis shows pulmonary atresia (arrow), patent ductus arteriosus. AO = aorta, DAo = descending aorta, LA = left atrium, LPA = left pulmonary artery, LV = left ventricle, PA = pulmonary atresia, PDA = patent ductus arteriosus, RA = right atrium, RPA = right pulmonary artery, RV = right ventricle, SVC = superior vena cava, VCAC = ventriculo-coronary artery communication.",
  "group": "Другие ВПС",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Liu L, Wang H, Cui C, et al.",
   "title": "Prenatal echocardiographic classification and prognostic evaluation strategy in fetal pulmonary atresia with intact ventricular septum.",
   "journal": "Medicine (Baltimore)",
   "year": 2019,
   "figure": "Figure 4",
   "pmcid": "PMC6824646",
   "url": "https://doi.org/10.1097/md.0000000000017492",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc6824646-f5",
  "file": "img/pmc6824646-f5.jpg",
  "label": "Medicine (Baltimore) 2019, рис. 5",
  "caption": "The prenatal and postnatal echocardiography of type III pulmonary atresia with intact ventricular septum. (A) The prenatal echocardiography at 25 weeks’ gestation, four-chamber view shows the absence of right ventricular trabecular portion, intact ventricular septum. (B) Color Doppler shows venticulo-coronary artery communication (narrow). (C) The postnatal echocardiography of the same fetus, four-chamber view shows the absence of right ventricular trabecular portion, venticulo-coronary artery communication (narrow). (D) Parasternal short axis shows pulmonary atresia (arrow), patent ductus arteriosus. DAo = descending aorta, LA = left atrium, LV = left ventricle, PA = pulmonary atresia, PDA = patent ductus arteriosus, RA = right atrium, RV = right ventricle, VCAC = ventriculo-coronary artery communication.",
  "group": "Другие ВПС",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Liu L, Wang H, Cui C, et al.",
   "title": "Prenatal echocardiographic classification and prognostic evaluation strategy in fetal pulmonary atresia with intact ventricular septum.",
   "journal": "Medicine (Baltimore)",
   "year": 2019,
   "figure": "Figure 5",
   "pmcid": "PMC6824646",
   "url": "https://doi.org/10.1097/md.0000000000017492",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc8087597-f1",
  "file": "img/pmc8087597-f1.jpg",
  "label": "Arch Gynecol Obstet 2021, рис. 1",
  "caption": "a Four-chamber view in a fetus with isolated ccTGA (24 + 2 weeks): levocardia, the aorta descendens (Ao) is located to the left, pulmonary veins drain into the left atrium (LA), connected to the left-sided anatomic right ventricle (RV), where the moderator band (asterisk) is found and the septal leaflet of the tricuspid valve (TV) inserts lower to the interventricular septum than the anterior leaflet of the mitral valve (MV); the right atrium (RA) is connected to the right-sided anatomic left ventricle (LV), that forms the apex of the heart. b Diastolic inflow in left (LV) and right (RV) ventricle. c From the right-sided left ventricle (LV) arises the pulmonary trunk (TP), the blood flow separates into the pulmonary arteries (PA) and the ductus arteriosus",
  "group": "Другие ВПС",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Krummholz A, Gottschalk I, Geipel A, et al.",
   "title": "Prenatal diagnosis, associated findings and postnatal outcome in fetuses with congenitally corrected transposition of the great arteries.",
   "journal": "Arch Gynecol Obstet",
   "year": 2021,
   "figure": "Fig. 1",
   "pmcid": "PMC8087597",
   "url": "https://doi.org/10.1007/s00404-020-05886-8",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc8303209-f3",
  "file": "img/pmc8303209-f3.jpg",
  "label": "Diagnostics (Basel) 2021, рис. 3",
  "caption": "LVOT angle in fetus with D-TGA at 24 gestational weeks.",
  "group": "Другие ВПС",
  "cards": [
   "chd:tga",
   "view:lvot"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Raucher Sternfeld A, Betzer T, Tamir A, et al.",
   "title": "Can Fetal Echocardiographic Measurements of the Left Ventricular Outflow Tract Angle Detect Fetuses with Conotruncal Cardiac Anomalies?",
   "journal": "Diagnostics (Basel)",
   "year": 2021,
   "figure": "Figure 3",
   "pmcid": "PMC8303209",
   "url": "https://doi.org/10.3390/diagnostics11071185",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc8553718-f2",
  "file": "img/pmc8553718-f2.jpg",
  "label": "Arch Gynecol Obstet 2021, рис. 2",
  "caption": "Common arterial trunk (TAC) overriding a large VSD (*)",
  "group": "Другие ВПС",
  "cards": [
   "chd:cat"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Abel JS, Berg C, Geipel A, et al.",
   "title": "Prenatal diagnosis, associated findings and postnatal outcome of fetuses with truncus arteriosus communis (TAC).",
   "journal": "Arch Gynecol Obstet",
   "year": 2021,
   "figure": "Fig. 2",
   "pmcid": "PMC8553718",
   "url": "https://doi.org/10.1007/s00404-021-06067-x",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc8553718-f3",
  "file": "img/pmc8553718-f3.jpg",
  "label": "Arch Gynecol Obstet 2021, рис. 3",
  "caption": "Large common arterial trunk valve (arrow). LV left ventricle, RV right ventricle, *VSD",
  "group": "Другие ВПС",
  "cards": [
   "chd:cat"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Abel JS, Berg C, Geipel A, et al.",
   "title": "Prenatal diagnosis, associated findings and postnatal outcome of fetuses with truncus arteriosus communis (TAC).",
   "journal": "Arch Gynecol Obstet",
   "year": 2021,
   "figure": "Fig. 3",
   "pmcid": "PMC8553718",
   "url": "https://doi.org/10.1007/s00404-021-06067-x",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc8553718-f4",
  "file": "img/pmc8553718-f4.jpg",
  "label": "Arch Gynecol Obstet 2021, рис. 4",
  "caption": "TAC type 1 with overriding common arterial trunk (TAC). The aorta (Ao) arises from the right side of the common trunk, a short main pulmonary artery (MPA) from the left side of the common trunk. The MPA then divides into the right (RPA) and left pulmonary artery (LPA). (*VSD; RV right ventricle, LV left ventricle)",
  "group": "Другие ВПС",
  "cards": [
   "chd:cat"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Abel JS, Berg C, Geipel A, et al.",
   "title": "Prenatal diagnosis, associated findings and postnatal outcome of fetuses with truncus arteriosus communis (TAC).",
   "journal": "Arch Gynecol Obstet",
   "year": 2021,
   "figure": "Fig. 4",
   "pmcid": "PMC8553718",
   "url": "https://doi.org/10.1007/s00404-021-06067-x",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc8553718-f5",
  "file": "img/pmc8553718-f5.jpg",
  "label": "Arch Gynecol Obstet 2021, рис. 5",
  "caption": "TAC type 2. Cross-section of the common arterial trunk (TAC) with a separate branching of the right (RPA) and left pulmonary artery (LPA). In this case the branching of both pulmonary arteries is close together",
  "group": "Другие ВПС",
  "cards": [
   "chd:cat"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Abel JS, Berg C, Geipel A, et al.",
   "title": "Prenatal diagnosis, associated findings and postnatal outcome of fetuses with truncus arteriosus communis (TAC).",
   "journal": "Arch Gynecol Obstet",
   "year": 2021,
   "figure": "Fig. 5",
   "pmcid": "PMC8553718",
   "url": "https://doi.org/10.1007/s00404-021-06067-x",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc8553718-f6",
  "file": "img/pmc8553718-f6.jpg",
  "label": "Arch Gynecol Obstet 2021, рис. 6",
  "caption": "TAC type A4. The aorta (Ao) and the main pulmonary artery (MPA) arise from the common arterial trunk (TAC). The interrupted aorta divides into the brachiocephalic and left common carotid arteries (interrupted aortic arch type B)",
  "group": "Другие ВПС",
  "cards": [
   "chd:cat"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Abel JS, Berg C, Geipel A, et al.",
   "title": "Prenatal diagnosis, associated findings and postnatal outcome of fetuses with truncus arteriosus communis (TAC).",
   "journal": "Arch Gynecol Obstet",
   "year": 2021,
   "figure": "Fig. 6",
   "pmcid": "PMC8553718",
   "url": "https://doi.org/10.1007/s00404-021-06067-x",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc8859889-f1",
  "file": "img/pmc8859889-f1.jpg",
  "label": "Cardiovasc Ultrasound 2022, рис. 1",
  "caption": "Measurements of the fetal cardiac parameters. In the right ventricular outflow tract view, pulmonary valve annulus is measured from hinge point to hinge point at the location of maximal expansion during peak systole (A, arrow). In the three-vessel view, the right pulmonary artery is measured at the proximal part of its bifurcation (B, arrow). In the left ventricular outflow tract view, the aortic valve annulus is measured from hinge point to hinge point at the location of maximal expansion during peak systole (C, arrow). In the ductal arch view, pulmonary valve peak systolic velocity is measured at the level of the pulmonary valve using pulsed Doppler (D). In the aortic arch view, the descending aorta is measured at the level of the diaphragm (E, arrow)",
  "group": "Другие ВПС",
  "cards": [
   "chd:tof",
   "view:rvot"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Park S, Won HS, Kim R, et al.",
   "title": "Fetal cardiac parameters for predicting postnatal operation type of fetuses with tetralogy of Fallot.",
   "journal": "Cardiovasc Ultrasound",
   "year": 2022,
   "figure": "Fig. 1",
   "pmcid": "PMC8859889",
   "url": "https://doi.org/10.1186/s12947-022-00274-5",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc9589048-f1",
  "file": "img/pmc9589048-f1.jpg",
  "label": "Front Pediatr 2022, рис. 1",
  "caption": "The diagram reproduces the three vessel and the tracheal view and shows the pulmonary artery (PA) leading into the arterial duct (D), the aortic arch (AO), and the superior vena cava (SVC). The lines show the measurement of, respectively, the isthmus (I), the duct, and the distal transverse aortic arch (TA) diameter.",
  "group": "Другие ВПС",
  "cards": [
   "chd:coa",
   "view:3vt"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Tuo G, Paladini D, Marasini L, et al.",
   "title": "Fetal aortic coarctation: A combination of third-trimester echocardiographic parameters to improve the prediction of postnatal outcome.",
   "journal": "Front Pediatr",
   "year": 2022,
   "figure": "Figure 1",
   "pmcid": "PMC9589048",
   "url": "https://doi.org/10.3389/fped.2022.866994",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "commons-agenesis-of-ductus-venosus-human-1400px",
  "file": "img/commons-agenesis-of-ductus-venosus-human-1400px.jpg",
  "label": "Wikimedia Commons: Agenesis of ductus venosus human.jpg",
  "caption": "Figure 3. Agenesis of ductus venosus (ADV) in a first trimester case with umbilical vein drainage into inferior vena cava (IVC) and increased nuchal translucency. (A): Transverse plane of the FT fetal abdomen, with high-definition directional power Doppler applied. An ”H”-shaped variant of the intrahepatic portal veins connection is identified; (B): high-definition directional power Doppler in the sagittal plane of the fetal abdomen (same case) showing ADV with umbilical vein drainage into the inferior vena cava; (C): mid-sagittal view of the fetal face with the measurement of the thickened NT. MPV main portal vein, St stomach, LPV left portal vein, UV umbilical vein, RPVa anterior branch of right portal vein, RPVp posterior branch of right portal vein, Ao aorta, IVC inferior vena cava, ADV ductus venosus agenesis, P palate, NB nasal bone, NT nuchal translucency.",
  "group": "Аномалии дуги аорты и вен",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "commons",
   "authors": "Nagy RD, Ruican D, Zorilă GL, et al.",
   "title": "Agenesis of ductus venosus human.jpg",
   "url": "https://commons.wikimedia.org/wiki/File:Agenesis_of_ductus_venosus_human.jpg",
   "license": "CC BY 4.0",
   "licenseUrl": "https://creativecommons.org/licenses/by/4.0/"
  }
 },
 {
  "id": "pmc4928259-f1",
  "file": "img/pmc4928259-f1.jpg",
  "label": "BMC Pregnancy Childbirth 2016, рис. 1",
  "caption": "Sonographic images of a 22-gestational-week fetus diagnosed with interrupted IVC and azygos continuation. In the 4CV, a venous-like structure was detected adjacent to the DAO (a). Gradual rotation of the ultrasound beam; this structure was visualized to drain into the RA (b), and suspected to be the azygos. The abnormal structures were missed by sonographer under Protocol A, while they were detected under Protocol B as this sonographer knew that this sign was an indication of interrupted IVC and azygos continuation. 4CV, four-chamber view; DAO, descending aorta; LA, left atrium; LV, left ventricle; RA, right atrium; RV, right ventricle; Z, azygos",
  "group": "Аномалии дуги аорты и вен",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Zhang Y, Cai AL, Ren WD, et al.",
   "title": "Identification of fetal cardiac anatomy and hemodynamics: a novel enhanced screening protocol.",
   "journal": "BMC Pregnancy Childbirth",
   "year": 2016,
   "figure": "Fig. 1",
   "pmcid": "PMC4928259",
   "url": "https://doi.org/10.1186/s12884-016-0933-9",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc4928259-f3",
  "file": "img/pmc4928259-f3.jpg",
  "label": "BMC Pregnancy Childbirth 2016, рис. 3",
  "caption": "Sonographic images of a 23-gestational-week fetus diagnosed with right aortic arch. In the 3VT, the confluence of the DA and aortic arch formed a “U”-like structure, surrounding the trachea and esophagus. This was a characteristic sign of right aortic arch. 3VT, three-vessel-trachea view; DA, ductus arteriosus; E, esophagus; MPA, main pulmonary artery; S, spine; SVC, superior vena cava; T, trachea",
  "group": "Аномалии дуги аорты и вен",
  "cards": [
   "view:3vt"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Zhang Y, Cai AL, Ren WD, et al.",
   "title": "Identification of fetal cardiac anatomy and hemodynamics: a novel enhanced screening protocol.",
   "journal": "BMC Pregnancy Childbirth",
   "year": 2016,
   "figure": "Fig. 3",
   "pmcid": "PMC4928259",
   "url": "https://doi.org/10.1186/s12884-016-0933-9",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc5809570-f1",
  "file": "img/pmc5809570-f1.jpg",
  "label": "Int J Cardiovasc Imaging 2018, рис. 1",
  "caption": "The fetal heart is imaged in a basic four-chamber view. The wall of the coronary sinus can be visualized",
  "group": "Аномалии дуги аорты и вен",
  "cards": [
   "view:4cv"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Ma M, Tan Y, Chen R, et al.",
   "title": "Comparison of coronary sinus diameter Z-scores in normal fetuses and fetuses with persistent left superior vena cava (PLSVC).",
   "journal": "Int J Cardiovasc Imaging",
   "year": 2018,
   "figure": "Fig. 1",
   "pmcid": "PMC5809570",
   "url": "https://doi.org/10.1007/s10554-017-1229-5",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc5809570-f2",
  "file": "img/pmc5809570-f2.jpg",
  "label": "Int J Cardiovasc Imaging 2018, рис. 2",
  "caption": "A standard fetal apical four-chamber view. Dilatation of the coronary sinus with PLSVC can be visualized",
  "group": "Аномалии дуги аорты и вен",
  "cards": [
   "view:4cv"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Ma M, Tan Y, Chen R, et al.",
   "title": "Comparison of coronary sinus diameter Z-scores in normal fetuses and fetuses with persistent left superior vena cava (PLSVC).",
   "journal": "Int J Cardiovasc Imaging",
   "year": 2018,
   "figure": "Fig. 2",
   "pmcid": "PMC5809570",
   "url": "https://doi.org/10.1007/s10554-017-1229-5",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc5809570-f3",
  "file": "img/pmc5809570-f3.jpg",
  "label": "Int J Cardiovasc Imaging 2018, рис. 3",
  "caption": "a M-mode tracing obtained from a normal coronary sinus. b M-mode tracing obtained from a dilated coronary sinus with PLSVC",
  "group": "Аномалии дуги аорты и вен",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Ma M, Tan Y, Chen R, et al.",
   "title": "Comparison of coronary sinus diameter Z-scores in normal fetuses and fetuses with persistent left superior vena cava (PLSVC).",
   "journal": "Int J Cardiovasc Imaging",
   "year": 2018,
   "figure": "Fig. 3",
   "pmcid": "PMC5809570",
   "url": "https://doi.org/10.1007/s10554-017-1229-5",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc6435603-f1",
  "file": "img/pmc6435603-f1.jpg",
  "label": "Arch Gynecol Obstet 2019, рис. 1",
  "caption": "a Right aortic arch at 21 weeks of gestation in gray scale mode. The transverse arch is on the right of the trachea with a left ductus arteriosus (DA). The aortic arch and DA form a U-shaped configuration with the trachea between the two vessels (U-sign). b Right aortic arch with color Doppler at 21 weeks of gestation",
  "group": "Аномалии дуги аорты и вен",
  "cards": [
   "view:3vt"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Yerlikaya G, Efetürk T, Springer S, et al.",
   "title": "Prenatal detection of right aortic arch.",
   "journal": "Arch Gynecol Obstet",
   "year": 2019,
   "figure": "Fig. 1",
   "pmcid": "PMC6435603",
   "url": "https://doi.org/10.1007/s00404-019-05056-5",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc7552480-f2",
  "file": "img/pmc7552480-f2.jpg",
  "label": "BMC Pregnancy Childbirth 2020, рис. 2",
  "caption": "Bifurcation of the ascending aorta and a complete vascular ring of the DAA on fetal echocardiography. a Left ventricular outflow tract view: The distal ascending aorta bifurcation is confirmed as the right arch and left arch. b Three-vessel tracheal view: A bifurcation of the ascending aorta into the right aortic arch and left aortic arch to form a complete O-shaped ring encircling the trachea, together with a number 9 configuration connecting with the left-sided ductus arteriosus. Both aortic arches demonstrate antegrade blood flow (AO or AAO: ascending aorta; R: right aortic arch; L: left aortic arch; PA: pulmonary artery; DA: ductus arteriosus; T: trachea)",
  "group": "Аномалии дуги аорты и вен",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Guo Q, Kong Y, Zeng S, et al.",
   "title": "Fetal double aortic arch: prenatal sonographic and postnatal computed tomography angiography features, associated abnormalities and clinical outcomes.",
   "journal": "BMC Pregnancy Childbirth",
   "year": 2020,
   "figure": "Fig. 2",
   "pmcid": "PMC7552480",
   "url": "https://doi.org/10.1186/s12884-020-03300-4",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc7552480-f3",
  "file": "img/pmc7552480-f3.jpg",
  "label": "BMC Pregnancy Childbirth 2020, рис. 3",
  "caption": "DAA with distal left aortic arch atresia on fetal echocardiography. a Nonstandard three-vessel tracheal view of gray-scale imaging: The vascular echo at the distal end of the left aortic arch is interrupted and replaced by a fibrous cord (arrowhead). b. Nonstandard three-vessel tracheal view of color Doppler imaging shows the interruption of color flow at the distal end of the left aortic arch(arrowhead) and an incomplete vascular ring(L-ARCH: left aortic arch; DAO: descending aorta; T: trachea)",
  "group": "Аномалии дуги аорты и вен",
  "cards": [
   "view:3vt"
  ],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Guo Q, Kong Y, Zeng S, et al.",
   "title": "Fetal double aortic arch: prenatal sonographic and postnatal computed tomography angiography features, associated abnormalities and clinical outcomes.",
   "journal": "BMC Pregnancy Childbirth",
   "year": 2020,
   "figure": "Fig. 3",
   "pmcid": "PMC7552480",
   "url": "https://doi.org/10.1186/s12884-020-03300-4",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc7552480-f4",
  "file": "img/pmc7552480-f4.jpg",
  "label": "BMC Pregnancy Childbirth 2020, рис. 4",
  "caption": "Branching pattern of DAA on fetal echocardiography. a Sagittal view of the right aortic arch: The dominant right arch gives rise to the RCCA and RSA. b Sagittal view of the left aortic arch: The small left aortic arch gives rise to the LCCA and LSA. c The coronal view of the aortic arch shows the symmetric appearance of the common carotid artery and subclavian artery originating from the ipsilateral aortic arch simultaneously(R-ARCH: right aortic arch; L-ARCH: left aortic arch; RCCA: right common carotid artery; RSA: right subclavian artery; LCCA: left common carotid artery; LSA: left subclavian artery)",
  "group": "Аномалии дуги аорты и вен",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Guo Q, Kong Y, Zeng S, et al.",
   "title": "Fetal double aortic arch: prenatal sonographic and postnatal computed tomography angiography features, associated abnormalities and clinical outcomes.",
   "journal": "BMC Pregnancy Childbirth",
   "year": 2020,
   "figure": "Fig. 4",
   "pmcid": "PMC7552480",
   "url": "https://doi.org/10.1186/s12884-020-03300-4",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc7552480-f5",
  "file": "img/pmc7552480-f5.jpg",
  "label": "BMC Pregnancy Childbirth 2020, рис. 5",
  "caption": "Branching pattern variant of DAA on fetal echocardiography. a Sagittal view of the left aortic arch: One branch can be viewed from the left aortic arch (H: heart, 1: left common carotid artery). Sagittal view of the right aortic arch: Three branches can be viewed from the right aortic arch (H: heart, 1: right common carotid artery, 2: right subclavian artery, 3: left subclavian artery, L-ARCH: left aortic arch; R-ARCH: right aortic arch; DAO: descending aorta)",
  "group": "Аномалии дуги аорты и вен",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Guo Q, Kong Y, Zeng S, et al.",
   "title": "Fetal double aortic arch: prenatal sonographic and postnatal computed tomography angiography features, associated abnormalities and clinical outcomes.",
   "journal": "BMC Pregnancy Childbirth",
   "year": 2020,
   "figure": "Fig. 5",
   "pmcid": "PMC7552480",
   "url": "https://doi.org/10.1186/s12884-020-03300-4",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc7552480-f6",
  "file": "img/pmc7552480-f6.jpg",
  "label": "BMC Pregnancy Childbirth 2020, рис. 6",
  "caption": "Three-dimensional color-rendered image with spatiotemporal image correlation of DAA: The left aortic arch and the dominant right aortic arch develop a complete vascular loop, join the left ductus arteriosus, and converge into the descending aorta together. Symmetrical initial parts of the two branches can probably be observed on each arch. (R-ARCH: right aortic arch; L-ARCH: left aortic arch; RCCA: right common carotid artery; RSA: right subclavian artery; LCCA: left common carotid artery; LSA: left subclavian artery; DA: ductus arteriosus; DAO: descending aorta)",
  "group": "Аномалии дуги аорты и вен",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Guo Q, Kong Y, Zeng S, et al.",
   "title": "Fetal double aortic arch: prenatal sonographic and postnatal computed tomography angiography features, associated abnormalities and clinical outcomes.",
   "journal": "BMC Pregnancy Childbirth",
   "year": 2020,
   "figure": "Fig. 6",
   "pmcid": "PMC7552480",
   "url": "https://doi.org/10.1186/s12884-020-03300-4",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "commons-embryofetal-heart-rates",
  "file": "img/commons-embryofetal-heart-rates.jpg",
  "label": "Wikimedia Commons: Embryofetal Heart Rates.jpg",
  "caption": "The heart rate throughout gestation. The first month of beating the embryonic heart rate accelerates from about the mothers heart rate to a peak rate in the 9th LMP week at approximately 175 B/M.",
  "group": "Нарушения ритма",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "commons",
   "authors": "Terry J. DuBose",
   "title": "Embryofetal Heart Rates.jpg",
   "url": "https://commons.wikimedia.org/wiki/File:Embryofetal_Heart_Rates.jpg",
   "license": "CC BY-SA 4.0",
   "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/"
  }
 },
 {
  "id": "commons-ultrasound-scan-nd-017",
  "file": "img/commons-ultrasound-scan-nd-017.jpg",
  "label": "Wikimedia Commons: Ultrasound Scan ND 017.jpg",
  "caption": "Ultrasound scan. Provided as-is. Fetal cardiac activity. Please feel free to categorise, add description, crop or rename.",
  "group": "Нарушения ритма",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "commons",
   "authors": "Nevit Dilmen",
   "title": "Ultrasound Scan ND 017.jpg",
   "url": "https://commons.wikimedia.org/wiki/File:Ultrasound_Scan_ND_017.jpg",
   "license": "CC BY-SA 3.0",
   "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
  }
 },
 {
  "id": "commons-ultrasound-scan-nd-062",
  "file": "img/commons-ultrasound-scan-nd-062.jpg",
  "label": "Wikimedia Commons: Ultrasound Scan ND 062.jpg",
  "caption": "Fetal heart beat 200 bpm. Ultrasound scan. Provided as-is. Please feel free to categorize, add description, crop or rename.",
  "group": "Нарушения ритма",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "commons",
   "authors": "Nevit Dilmen",
   "title": "Ultrasound Scan ND 062.jpg",
   "url": "https://commons.wikimedia.org/wiki/File:Ultrasound_Scan_ND_062.jpg",
   "license": "CC BY-SA 3.0",
   "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
  }
 },
 {
  "id": "commons-ultrasound-scan-nd-180",
  "file": "img/commons-ultrasound-scan-nd-180.jpg",
  "label": "Wikimedia Commons: Ultrasound Scan ND 180.jpg",
  "caption": "Ultrasound scan. Fetal cardiac activity",
  "group": "Нарушения ритма",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "commons",
   "authors": "Nevit Dilmen",
   "title": "Ultrasound Scan ND 180.jpg",
   "url": "https://commons.wikimedia.org/wiki/File:Ultrasound_Scan_ND_180.jpg",
   "license": "CC BY-SA 3.0",
   "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
  }
 },
 {
  "id": "pmc4219454-f1",
  "file": "img/pmc4219454-f1.jpg",
  "label": "BMC Pregnancy Childbirth 2013, рис. 1",
  "caption": "Ultrasonograms of two-dimensional foetal echocardiograpy. Atrial (A) and ventricular (V) contractions.",
  "group": "Нарушения ритма",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Di Mauro A, Caroli Casavola V, Favia Guarnieri G, et al.",
   "title": "Antenatal and postnatal combined therapy for autoantibody-related congenital atrioventricular block.",
   "journal": "BMC Pregnancy Childbirth",
   "year": 2013,
   "figure": "Figure 1",
   "pmcid": "PMC4219454",
   "url": "https://doi.org/10.1186/1471-2393-13-220",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc8934222-f2",
  "file": "img/pmc8934222-f2.jpg",
  "label": "Case Rep Obstet Gynecol 2022, рис. 2",
  "caption": "Transabdominal ultrasound of fetus prior to and after fetal intramuscular injection of digoxin. Fetal heart rate is 194 bpm after 6 days of treatment with oral digoxin (a). After the procedure, fetal heart rate is 152 bpm (b).",
  "group": "Нарушения ритма",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Munoz JL, Lewis AL, Song J, et al.",
   "title": "Fetal Intervention for Refractory Supraventricular Tachycardia Complicated by Hydrops Fetalis.",
   "journal": "Case Rep Obstet Gynecol",
   "year": 2022,
   "figure": "Figure 2",
   "pmcid": "PMC8934222",
   "url": "https://doi.org/10.1155/2022/5148250",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc9003959-f2",
  "file": "img/pmc9003959-f2.jpg",
  "label": "BMC Pregnancy Childbirth 2022, рис. 2",
  "caption": "Fetal M-mode ultrasound. Ventriculo-atrial dissociation in atypical junctional ectopic tachycardia; junctional ectopic tachycardia was diagnosed postnatally, and the findings were detected retrospectively. In the four-chamber view of the heart, which shows the left ventricle and right atrium, the wide arrow indicates atrial contraction, the narrow arrow indicates ventricular contraction, and the arrowhead indicates a premature ventricular contraction",
  "group": "Нарушения ритма",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Katsura D, Tsuji S, Tokoro S, et al.",
   "title": "Atypical fetal junctional ectopic tachycardia: a case report and literature review.",
   "journal": "BMC Pregnancy Childbirth",
   "year": 2022,
   "figure": "Fig. 2",
   "pmcid": "PMC9003959",
   "url": "https://doi.org/10.1186/s12884-022-04655-6",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc9319402-f1",
  "file": "img/pmc9319402-f1.jpg",
  "label": "Diagnostics (Basel) 2022, рис. 1",
  "caption": "(A) M-mode shows a ventricular rate of (v) 245 bpm and an atrial rate of (a) 490 bpm; (B) Doppler waveforms of the renal vein (a-rate: 245 bpm) and renal artery (v-rate: 505 bpm); (C): Atrial septal aneurysm (*): wide excursion of the foramen ovale flap; (D): Color flow mapping in the septal aneurysm shows turbulent reversed flow returning back to the right atrium (FFo: flap of foramen ovale; LA: left atrium; RA: right atrium).",
  "group": "Нарушения ритма",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Tongprasert F, Luewan S, Srisupundit K, et al.",
   "title": "Fetal Atrial Flutter Associated with Atrial Septal Aneurysm.",
   "journal": "Diagnostics (Basel)",
   "year": 2022,
   "figure": "Figure 1",
   "pmcid": "PMC9319402",
   "url": "https://doi.org/10.3390/diagnostics12071722",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc9319402-f2",
  "file": "img/pmc9319402-f2.jpg",
  "label": "Diagnostics (Basel) 2022, рис. 2",
  "caption": "(A) Umbilical artery waveforms show premature atrial contraction/bigeminy (a): (B) M-mode shows atrial flutter; atrial rate (a): ventricular rate (v) 2:1).",
  "group": "Нарушения ритма",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Tongprasert F, Luewan S, Srisupundit K, et al.",
   "title": "Fetal Atrial Flutter Associated with Atrial Septal Aneurysm.",
   "journal": "Diagnostics (Basel)",
   "year": 2022,
   "figure": "Figure 2",
   "pmcid": "PMC9319402",
   "url": "https://doi.org/10.3390/diagnostics12071722",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc9319402-f3",
  "file": "img/pmc9319402-f3.jpg",
  "label": "Diagnostics (Basel) 2022, рис. 3",
  "caption": "(A) M-mode shows supraventricular tachycardia; atrial rate (a): ventricular rate (v) (A): ascites; LA: left atrium; RA: right atrium); (B) cardiac Doppler waveforms at left inflow and outflow shows atrial flutter; atrial rate (a): ventricular rate (v) 2:1 (440:226).",
  "group": "Нарушения ритма",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Tongprasert F, Luewan S, Srisupundit K, et al.",
   "title": "Fetal Atrial Flutter Associated with Atrial Septal Aneurysm.",
   "journal": "Diagnostics (Basel)",
   "year": 2022,
   "figure": "Figure 3",
   "pmcid": "PMC9319402",
   "url": "https://doi.org/10.3390/diagnostics12071722",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc10059978-f1",
  "file": "img/pmc10059978-f1.jpg",
  "label": "Pediatr Rep 2023, рис. 1",
  "caption": "Echocardiographic four-chamber view at 25 + 1 GW showing a large rhabdomyoma covering nearly the entire right side of the cardiac structures. TM: tumor, IVS: interventricular septum; RA: right atrium; RV: right ventricle; LV: left ventricle (tumor circumference in green).",
  "group": "Опухоли, кардиомиопатии, сужение протока",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Will JC, Siedentopf N, Schmid O, et al.",
   "title": "Successful Prenatal Treatment of Cardiac Rhabdomyoma in a Fetus with Tuberous Sclerosis.",
   "journal": "Pediatr Rep",
   "year": 2023,
   "figure": "Figure 1",
   "pmcid": "PMC10059978",
   "url": "https://doi.org/10.3390/pediatric15010020",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc12010453-f1",
  "file": "img/pmc12010453-f1.jpg",
  "label": "Cureus 2025, рис. 1",
  "caption": "Fetal echocardiographic findings on the day of presentation in Case 1(A) Enlargement of the ductus arteriosus and pulmonary artery with reduced prograde flow; (B) Narrowing and tortuosity of the ductus arteriosus and acceleration of ductal blood flow velocity (white arrow); (C) Doppler of ductal blood flow velocity (systolic velocity of 3.5 m/second and diastolic velocity of 1.87 m/second) and ductus arteriosus pulsatility index of 0.65.PA, pulmonary artery; Ao, aorta; duct, ductus arteriosus.",
  "group": "Опухоли, кардиомиопатии, сужение протока",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Katsura D, Inatomi A, Tokoro S, et al.",
   "title": "Changes During Reopening in Premature Constriction or Closure of the Ductus Arteriosus: A Report of Two Cases.",
   "journal": "Cureus",
   "year": 2025,
   "figure": "Figure 1",
   "pmcid": "PMC12010453",
   "url": "https://doi.org/10.7759/cureus.80983",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc12010453-f2",
  "file": "img/pmc12010453-f2.jpg",
  "label": "Cureus 2025, рис. 2",
  "caption": "Fetal echocardiographic findings on the second day in Case 1(A) The prograde flow into the pulmonary artery; (B) Doppler of ductal blood flow velocity (systolic velocity of 2.9 m/second and diastolic velocity of 0.88 m/second) and ductus arteriosus pulsatility index of 1.12.PA, pulmonary artery; Ao, aorta",
  "group": "Опухоли, кардиомиопатии, сужение протока",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Katsura D, Inatomi A, Tokoro S, et al.",
   "title": "Changes During Reopening in Premature Constriction or Closure of the Ductus Arteriosus: A Report of Two Cases.",
   "journal": "Cureus",
   "year": 2025,
   "figure": "Figure 2",
   "pmcid": "PMC12010453",
   "url": "https://doi.org/10.7759/cureus.80983",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc12010453-f3",
  "file": "img/pmc12010453-f3.jpg",
  "label": "Cureus 2025, рис. 3",
  "caption": "Fetal echocardiographic findings in Case 1 showing ridge of the site of stenosis and tortuosity (white arrow)PA, pulmonary artery; aA, ascending aorta; dA, descending aorta; duct, ductus arteriosus.",
  "group": "Опухоли, кардиомиопатии, сужение протока",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Katsura D, Inatomi A, Tokoro S, et al.",
   "title": "Changes During Reopening in Premature Constriction or Closure of the Ductus Arteriosus: A Report of Two Cases.",
   "journal": "Cureus",
   "year": 2025,
   "figure": "Figure 3",
   "pmcid": "PMC12010453",
   "url": "https://doi.org/10.7759/cureus.80983",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc12010453-f5",
  "file": "img/pmc12010453-f5.jpg",
  "label": "Cureus 2025, рис. 5",
  "caption": "Fetal echocardiogram in Case 2 showing enlargement of the ductus arteriosus and pulmonary artery, closure of the ductus arteriosus (white arrow)aA, ascending aorta; dA, descending aorta; duct, ductus arteriosus.",
  "group": "Опухоли, кардиомиопатии, сужение протока",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Katsura D, Inatomi A, Tokoro S, et al.",
   "title": "Changes During Reopening in Premature Constriction or Closure of the Ductus Arteriosus: A Report of Two Cases.",
   "journal": "Cureus",
   "year": 2025,
   "figure": "Figure 5",
   "pmcid": "PMC12010453",
   "url": "https://doi.org/10.7759/cureus.80983",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc8189142-f1",
  "file": "img/pmc8189142-f1.jpg",
  "label": "Ann Med 2021, рис. 1",
  "caption": "(A) Four chamber view at 33 gestational weeks: hypertrophic and dilated right ventricle, with mild pericardial effusion. (B) Tricuspid valve regurgitation peak velocity (130 cm/s).",
  "group": "Опухоли, кардиомиопатии, сужение протока",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Battistoni G, Montironi R, Di Giuseppe J, et al.",
   "title": "Foetal ductus arteriosus constriction unrelated to non-steroidal anti-Inflammatory drugs: a case report and literature review.",
   "journal": "Ann Med",
   "year": 2021,
   "figure": "Figure 1",
   "pmcid": "PMC8189142",
   "url": "https://doi.org/10.1080/07853890.2021.1921253",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc8189142-f2",
  "file": "img/pmc8189142-f2.jpg",
  "label": "Ann Med 2021, рис. 2",
  "caption": "Two-dimensional echocardiography, showing ductus arteriosus constriction (arrow). (A) Right outflow tract. (B) Ductal arch view. (C) three-vessel view.",
  "group": "Опухоли, кардиомиопатии, сужение протока",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Battistoni G, Montironi R, Di Giuseppe J, et al.",
   "title": "Foetal ductus arteriosus constriction unrelated to non-steroidal anti-Inflammatory drugs: a case report and literature review.",
   "journal": "Ann Med",
   "year": 2021,
   "figure": "Figure 2",
   "pmcid": "PMC8189142",
   "url": "https://doi.org/10.1080/07853890.2021.1921253",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc8908010-f1",
  "file": "img/pmc8908010-f1.jpg",
  "label": "Front Genet 2022, рис. 1",
  "caption": "Clinical phenotypes and molecular findings of the fetus. (A–D): Echocardiography of the fetus at 25 weeks’ gestation. The phenotype includes biventricular noncompaction cardiomyopathy (A), pulmonary stenosis (B), sinus bradycardia (C) and second-degree 2:1 atrioventricular block (D). A. The area between the white arrows indicate numerous ventricular trabeculae (C). Sinus bradycardia was seen with ventricular rate of 113 bpm by umbilical artery blood flow spectrum (D). Mitral inflow and left ventricular outflow spectrum shows a 2:1 second-degree atrioventricular block (E): Pathological anatomy shows that the noncompaction myocardium below the level of the left ventricular papillary muscle is obvious. The white arrows indicate the noncompaction myocardium (F): Sanger sequencing shows that the mutation is heterozygous in the fetus. LA: left atrium; LV: left ventricle; RA: right atrium; RV: right ventricle.",
  "group": "Опухоли, кардиомиопатии, сужение протока",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Sun H, Liu X, Hao X, et al.",
   "title": "Case Report: Biventricular Noncompaction Cardiomyopathy With Pulmonary Stenosis and Bradycardia in a Fetus With KCNH2 Mutation.",
   "journal": "Front Genet",
   "year": 2022,
   "figure": "FIGURE 1",
   "pmcid": "PMC8908010",
   "url": "https://doi.org/10.3389/fgene.2022.821226",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc9682154-f1",
  "file": "img/pmc9682154-f1.jpg",
  "label": "Front Pediatr 2022, рис. 1",
  "caption": "Clinical characteristics of the fetus in this study. (A) Ultrasound showed that the fetal cardiothoracic area ratio was increased, approximately 0.45, and the left atrium and left ventricle sizes were increased substantially. (B) Ultrasound showed hypertrophy of fetal myocardium and free fluid in the pericardial cavity (white arrow). (C) Ultrasound showed a large amount of free fluid in the fetal abdominal cavity and thickened abdominal skin tissue (white arrow). (D) After induced labor, autopsy revealed the heart was considerably enlarged. (E) Pathological sections showed thickening and fibrosis of the endocardial tissue (red arrows). (F) The muscular trabeculae were thick, the sinus recess of the myocardium persisted, the deep depression was staggered, the formation of dense myocardium in the corresponding area was reduced and thin, and the ventricular wall muscle layer remained loose (red circle).",
  "group": "Опухоли, кардиомиопатии, сужение протока",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Zhao X, Li X, Sun W, et al.",
   "title": "Prenatal case report of Barth syndrome caused by novel TAFAZZIN mutation: Clinical characteristics of fetal dilated cardiomyopathy with ascites.",
   "journal": "Front Pediatr",
   "year": 2022,
   "figure": "Figure 1",
   "pmcid": "PMC9682154",
   "url": "https://doi.org/10.3389/fped.2022.1004485",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc13325693-f1",
  "file": "img/pmc13325693-f1.jpg",
  "label": "Ultrasound Obstet Gynecol 2026, рис. 1",
  "caption": "Assessment of ventricular shortening fraction (SF). (a) Optimized four‐chamber view with adjustment of two‐dimensional image depth and magnification so that the fetal heart occupies more than two‐thirds of the image sector. Plane of the M‐mode cursor passes through the right ventricular free wall, ventricular septum and left ventricular free wall perpendicular to their plane and just below the mitral valve annulus. (b) The four‐chamber M‐mode tracing acquired demonstrates multiple cardiac cycles. The end‐diastolic diameter (EDD) is measured as the largest diameter of the ventricle, shown here in the left ventricle, and the end‐systolic diameter (ESD) as the smallest diameter. SF (%) is calculated as ((EDD − ESD)/EDD) × 100. (c) From a four‐chamber view with the ventricular septum and free walls perpendicular to the ultrasound beam, the transducer is rotated 90°, and an M‐mode tracing through the ventricular short axis at the level of the ventricular papillary muscles can also be used to assess SF. Dashed line indicates M‐mode cursor.",
  "group": "Функция сердца",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Patel SR, Madan N, Eckersley L, et al.",
   "title": "How to assess ventricular function by fetal echocardiography: expert guidance from the Fetal Heart Society.",
   "journal": "Ultrasound Obstet Gynecol",
   "year": 2026,
   "figure": "Figure 1",
   "pmcid": "PMC13325693",
   "url": "https://doi.org/10.1002/uog.70276",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc13325693-f2",
  "file": "img/pmc13325693-f2.jpg",
  "label": "Ultrasound Obstet Gynecol 2026, рис. 2",
  "caption": "Assessment of tricuspid (TAPSE) and mitral (MAPSE) annular plane systolic excursion. (a) TAPSE and MAPSE are obtained from an apical four‐chamber view with the apex oriented toward the transducer, and the M‐mode cursor (dashed lines) placed from the ventricular apex to the lateral aspect of each valve. (b) Longitudinal annular motion is displayed by M‐mode, and TAPSE and MAPSE can be calculated as the distance that the annulus moves between systole and diastole (double‐headed arrow). (c) Example of spatiotemporal image correlation (STIC) (red arrow) used to assess TAPSE in a 26‐week fetus with hydrops. Despite suboptimal fetal position for M‐mode cursor alignment, STIC permits maneuvering of the image to optimize cursor placement.",
  "group": "Функция сердца",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Patel SR, Madan N, Eckersley L, et al.",
   "title": "How to assess ventricular function by fetal echocardiography: expert guidance from the Fetal Heart Society.",
   "journal": "Ultrasound Obstet Gynecol",
   "year": 2026,
   "figure": "Figure 2",
   "pmcid": "PMC13325693",
   "url": "https://doi.org/10.1002/uog.70276",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc13325693-f3",
  "file": "img/pmc13325693-f3.jpg",
  "label": "Ultrasound Obstet Gynecol 2026, рис. 3",
  "caption": "Assessment of ventricular ejection fraction (EF) and fractional area change (FAC). (a) EF is measured from a high frame rate (> 60 fps) apical four‐chamber view, avoiding ventricular foreshortening. Ventricular cavity measurement using Phillips Intelli Space Cardiovascular software (Phillips Healthcare, Andover, MA, USA) to calculate end‐diastolic volume (EDV) by tracing the ventricular endocardial border at end‐diastole (largest cavity, just before atrioventricular (AV) valve closure) is shown. (b) For measurement of end‐systolic volume (ESV), the frame with the smallest ventricular cavity, just before AV valve opening, is selected and the endocardial border traced from one side to the other of the AV valve annulus. EF is then calculated using the equation (EDV − ESV)/EDV. (c) Measurement of the right ventricular (RV) end‐diastolic area (EDA) using the image with the largest RV cavity is shown. (d) To obtain the RV end‐systolic area (ESA), RV is measured when the cavity is smallest. FAC (%) is then calculated as ((RV‐EDA − RV‐ESA)/RV‐EDA) × 100. For the 20‐week (w) fetus shown in (c,d), the FAC would be ((0.89−0.61)/0.89) × 100 = 31%. L, left; P, posterior.",
  "group": "Функция сердца",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Patel SR, Madan N, Eckersley L, et al.",
   "title": "How to assess ventricular function by fetal echocardiography: expert guidance from the Fetal Heart Society.",
   "journal": "Ultrasound Obstet Gynecol",
   "year": 2026,
   "figure": "Figure 3",
   "pmcid": "PMC13325693",
   "url": "https://doi.org/10.1002/uog.70276",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc13325693-f4",
  "file": "img/pmc13325693-f4.jpg",
  "label": "Ultrasound Obstet Gynecol 2026, рис. 4",
  "caption": "Assessment of diastolic function through pulsed‐wave Doppler interrogation. (a) Normal left (LV) and right (RV) ventricular Doppler inflow acquisition requires alignment of the Doppler sample volume parallel to flow (< 20°), at or just below the atrioventricular valve annulus, as demonstrated for the LV (left panel). Normal Doppler flow profile sampled through the mitral (left) and tricuspid (right) valves demonstrates the usual biphasic flow pattern with E‐ (early diastole) and A‐ (atrial contraction) waves and a duration of nearly half the cardiac cycle length. (b) Uniphasic ventricular inflow (ID, inflow duration) of very short duration (during atrial systole) relative to the cardiac cycle length (CCL) is shown in a fetus with dilated cardiomyopathy. (c) Normal inferior vena cava and hepatic venous Doppler profile demonstrates three phases: forward flow in systole (S), forward flow in early diastole (E) and short velocity A‐wave reversal during atrial contraction (A). (d) With increased ventricular and atrial filling pressures there is loss of flow in early diastole and progressive A‐wave reversal (velocity and duration). Eventually flow may become bidirectional. (e) The normal ductus venosus flow profile has the same three phases as seen for the systemic veins; however, during atrial systole there is a reduction in forward flow velocity and no flow reversal should be present. (f) With increasing central venous pressures due to poor function, there is eventual reversal of flow in the ductus venous during atrial systole. (g) Umbilical venous Doppler demonstrates abnormal pulsatility with reduction or cessation of flow in atrial systole. Normally, there is low velocity non‐phasic flow or undulating flow with fetal breathing.",
  "group": "Функция сердца",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Patel SR, Madan N, Eckersley L, et al.",
   "title": "How to assess ventricular function by fetal echocardiography: expert guidance from the Fetal Heart Society.",
   "journal": "Ultrasound Obstet Gynecol",
   "year": 2026,
   "figure": "Figure 4",
   "pmcid": "PMC13325693",
   "url": "https://doi.org/10.1002/uog.70276",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc13325693-f5",
  "file": "img/pmc13325693-f5.jpg",
  "label": "Ultrasound Obstet Gynecol 2026, рис. 5",
  "caption": "Calculation of fetal left and right ventricular outputs. Still‐frame 2D ultrasound images and Doppler spectra demonstrating the Doppler‐based method of calculating fetal ventricular stroke volumes and outputs. Aortic (top left) and pulmonary (bottom left) valve annuli are measured in systole in as close to an axial plane as possible. The cross sectional area (CSA, in cm) of the valve is then calculated using the equation π × (valve diameter/2)2. Pulsed‐wave Doppler interrogation through the aortic (top right) and pulmonary (bottom right) valves with the cursor aligned parallel to flow (and no angle correction) provides a spectral tracing for each valve, which are then planimetered to generate the velocity time integral (VTI) in cm. The ventricular stroke volume (SV) is calculated using CSA × VTI (in cm3 or mL) and ventricular output is calculated using SV × fetal heart rate. By combining the ventricular outputs (usually measured in units of mL/min and indexed by estimated fetal weight (mL/kg/min)), the combined cardiac output can be derived. Ao, aorta; LV, left ventricle; LVOT, left ventricular outflow tract; MV, mitral valve; PA, pulmonary artery; RVOT, right ventricular outflow tract.",
  "group": "Функция сердца",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Patel SR, Madan N, Eckersley L, et al.",
   "title": "How to assess ventricular function by fetal echocardiography: expert guidance from the Fetal Heart Society.",
   "journal": "Ultrasound Obstet Gynecol",
   "year": 2026,
   "figure": "Figure 5",
   "pmcid": "PMC13325693",
   "url": "https://doi.org/10.1002/uog.70276",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc13325693-f6",
  "file": "img/pmc13325693-f6.jpg",
  "label": "Ultrasound Obstet Gynecol 2026, рис. 6",
  "caption": "Assessment of myocardial performance index (MPI). (a) Left ventricular (LV) inflow‐outflow Doppler waveform with a sample gate placed within the LV in a location where both inflow (above baseline) and outflow (below baseline) signals are captured simultaneously, with measurement of ‘a’ (offset of one inflow to onset of next inflow) and ‘b’ (ejection time (ET)). Note the ‘valve clicks’, which can guide measurement. The MPI is calculated using the equation (a − b)/b. (b,c) Calculation of MPI for the right ventricle (RV) requires separate inflow and outflow Doppler signals. (b) From inflow tracings, ‘a’ can be measured from the offset of one inflow to the onset of the other. (c) From the outflow tracings, ‘b’ is measured as the ET. (d) The numerator in the MPI equation (a − b) equates to the sum of the isovolumetric relaxation time (IRT, from offset of outflow to onset of inflow) and isovolumetric contraction time (ICT, from offset of inflow to onset of outflow), as measured in this LV inflow‐outflow Doppler waveform. (e) MPI can also be assessed using tissue Doppler for both RV and LV. Similarly, valve clicks are helpful to guide measurement. Unlike with pulsed‐wave Doppler, a simultaneous inflow‐outflow tissue Doppler signal can be used to measure RV‐MPI. A major disadvantage is lack of availability of tissue Doppler imaging software/resources on many ultrasound systems.",
  "group": "Функция сердца",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Patel SR, Madan N, Eckersley L, et al.",
   "title": "How to assess ventricular function by fetal echocardiography: expert guidance from the Fetal Heart Society.",
   "journal": "Ultrasound Obstet Gynecol",
   "year": 2026,
   "figure": "Figure 6",
   "pmcid": "PMC13325693",
   "url": "https://doi.org/10.1002/uog.70276",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "pmc13325693-f7",
  "file": "img/pmc13325693-f7.jpg",
  "label": "Ultrasound Obstet Gynecol 2026, рис. 7",
  "caption": "Assessment of ventricular strain. (a) Fetal left ventricular (LV) apical four‐chamber strain is derived from speckle‐tracking echocardiography using GE EchoPAC/Voluson integrated strain package. The LV endocardial border is planimetered in an apical four‐chamber view, and the myocardial ‘speckles’ are then tracked throughout systole and diastole with generation of tracings and measurement of strain and strain rate. The graph shown is a strain curve, demonstrating smooth systolic deformation with normal peak systolic strain followed by diastolic relaxation. Importantly, assessment of strain requires high frame rates to generate accurate measures and may differ between different software. (b) Similarly, the right ventricular strain and strain rate can be assessed. ED Border, end‐diastolic endocardial border; ES Border, end‐systolic endocardial border.",
  "group": "Функция сердца",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "article",
   "authors": "Patel SR, Madan N, Eckersley L, et al.",
   "title": "How to assess ventricular function by fetal echocardiography: expert guidance from the Fetal Heart Society.",
   "journal": "Ultrasound Obstet Gynecol",
   "year": 2026,
   "figure": "Figure 7",
   "pmcid": "PMC13325693",
   "url": "https://doi.org/10.1002/uog.70276",
   "license": "CC BY",
   "licenseUrl": ""
  }
 },
 {
  "id": "commons-2916-fetal-circulatory-system-02",
  "file": "img/commons-2916-fetal-circulatory-system-02.jpg",
  "label": "Wikimedia Commons: 2916 Fetal Circulatory System-02.jpg",
  "caption": "The fetal circulatory system includes three shunts to divert blood from undeveloped and partially functioning organs, as well as blood supply to and from the placenta.",
  "group": "Схемы и модели",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "commons",
   "authors": "OpenStax College",
   "title": "2916 Fetal Circulatory System-02.jpg",
   "url": "https://commons.wikimedia.org/wiki/File:2916_Fetal_Circulatory_System-02.jpg",
   "license": "CC BY 3.0",
   "licenseUrl": "https://creativecommons.org/licenses/by/3.0/"
  }
 },
 {
  "id": "commons-ductus-arteriosusl",
  "file": "img/commons-ductus-arteriosusl.jpg",
  "label": "Wikimedia Commons: Ductus arteriosusl.jpg",
  "caption": "DA is a blood vessel in the unborn child, conducting blood from the pulmonary artery to the systemic artery, the aorta",
  "group": "Схемы и модели",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "commons",
   "authors": "Hjaland",
   "title": "Ductus arteriosusl.jpg",
   "url": "https://commons.wikimedia.org/wiki/File:Ductus_arteriosusl.jpg",
   "license": "CC0",
   "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/"
  }
 },
 {
  "id": "commons-fig1-hebee",
  "file": "img/commons-fig1-hebee.jpg",
  "label": "Wikimedia Commons: Fig1 HeBee.jpeg",
  "caption": "fetal heart model for prenatal diagnosis and fetal echocardiography",
  "group": "Схемы и модели",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "commons",
   "authors": "Bertrand Stos",
   "title": "Fig1 HeBee.jpeg",
   "url": "https://commons.wikimedia.org/wiki/File:Fig1_HeBee.jpeg",
   "license": "CC BY-SA 4.0",
   "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/"
  }
 },
 {
  "id": "commons-doppler-heartbeat-0218103423-1038270-7w-3d",
  "file": "img/commons-doppler-heartbeat-0218103423-1038270-7w-3d.gif",
  "label": "Wikimedia Commons: Doppler heartbeat 0218103423 1038270 7w 3d.gif",
  "caption": "Heart beat",
  "group": "Ранние сроки и общие снимки",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "commons",
   "authors": "Nevit Dilmen",
   "title": "Doppler heartbeat 0218103423 1038270 7w 3d.gif",
   "url": "https://commons.wikimedia.org/wiki/File:Doppler_heartbeat_0218103423_1038270_7w_3d.gif",
   "license": "CC BY-SA 3.0",
   "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
  }
 },
 {
  "id": "commons-fetal-anomaly-ultrasound-scan-in-navi-mumbai",
  "file": "img/commons-fetal-anomaly-ultrasound-scan-in-navi-mumbai.jpg",
  "label": "Wikimedia Commons: Fetal Anomaly Ultrasound Scan in Navi Mumbai.jpg",
  "caption": "A composite image displaying six distinct ultrasound views captured during a fetal anomaly scan (often referred to as a mid-pregnancy or TIFFA scan). The sonograms provide detailed visualization of fetal anatomical structures, clearly showing the hands with visible digits, the facial profile, and skeletal elements. This type of detailed prenatal imaging is a routine part of maternal-fetal medicine and is commonly conducted at diagnostic imaging centers and maternity hospitals across Navi Mumbai, including areas such as Vashi, Nerul, and Kharghar, Taloja, Kalamboli, Kamothe, Panvel, Seawoods, Ulwe, to monitor fetal development and screening for potential congenital conditions.",
  "group": "Ранние сроки и общие снимки",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "commons",
   "authors": "Goleisureintl",
   "title": "Fetal Anomaly Ultrasound Scan in Navi Mumbai.jpg",
   "url": "https://commons.wikimedia.org/wiki/File:Fetal_Anomaly_Ultrasound_Scan_in_Navi_Mumbai.jpg",
   "license": "CC BY 4.0",
   "licenseUrl": "https://creativecommons.org/licenses/by/4.0/"
  }
 },
 {
  "id": "commons-fetus-hartbeat",
  "file": "img/commons-fetus-hartbeat.jpg",
  "label": "Wikimedia Commons: Fetus hartbeat.jpg",
  "caption": "Ultrasound with heartbeat at 14 weeks. Baby was born on 2006-05-20.",
  "group": "Ранние сроки и общие снимки",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "commons",
   "authors": "Marcel Berteler",
   "title": "Fetus hartbeat.jpg",
   "url": "https://commons.wikimedia.org/wiki/File:Fetus_hartbeat.jpg",
   "license": "Public domain",
   "licenseUrl": ""
  }
 },
 {
  "id": "commons-pregnancy-ultrasound-110303135229-1358380",
  "file": "img/commons-pregnancy-ultrasound-110303135229-1358380.jpg",
  "label": "Wikimedia Commons: Pregnancy ultrasound 110303135229 1358380.jpg",
  "caption": "Ultrasound images of fetal heart",
  "group": "Ранние сроки и общие снимки",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "commons",
   "authors": "Nevit Dilmen",
   "title": "Pregnancy ultrasound 110303135229 1358380.jpg",
   "url": "https://commons.wikimedia.org/wiki/File:Pregnancy_ultrasound_110303135229_1358380.jpg",
   "license": "CC BY-SA 3.0",
   "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
  }
 },
 {
  "id": "commons-scan13semanas2",
  "file": "img/commons-scan13semanas2.png",
  "label": "Wikimedia Commons: Scan13semanas2.png",
  "caption": "Ecografía (scan) de un feto de 13 semanas. Realizada externamente, por encima de la tripa. En la parte izquierda se puede apreciar la cabeza y el cuerpo del feto, mientras que a la derecha se muestran los latidos del corazón. El feto mide 81 mm y pesa 88 gramos.",
  "group": "Ранние сроки и общие снимки",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "commons",
   "authors": "Guimi",
   "title": "Scan13semanas2.png",
   "url": "https://commons.wikimedia.org/wiki/File:Scan13semanas2.png",
   "license": "CC BY-SA 2.5",
   "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.5/"
  }
 },
 {
  "id": "commons-ultrasound-scan-nd-0105122250-1227390",
  "file": "img/commons-ultrasound-scan-nd-0105122250-1227390.png",
  "label": "Wikimedia Commons: Ultrasound Scan ND 0105122250 1227390.png",
  "caption": "Medical ultrasound image. Provided as-is. Please feel free to categorise, add description, crop.",
  "group": "Срез не определён (Nevit Dilmen)",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "commons",
   "authors": "Nevit Dilmen",
   "title": "Ultrasound Scan ND 0105122250 1227390.png",
   "url": "https://commons.wikimedia.org/wiki/File:Ultrasound_Scan_ND_0105122250_1227390.png",
   "license": "CC BY-SA 3.0",
   "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
  }
 },
 {
  "id": "commons-ultrasound-scan-nd-0105122250-1227570",
  "file": "img/commons-ultrasound-scan-nd-0105122250-1227570.png",
  "label": "Wikimedia Commons: Ultrasound Scan ND 0105122250 1227570.png",
  "caption": "Medical ultrasound image. Provided as-is. Please feel free to categorise, add description, crop.",
  "group": "Срез не определён (Nevit Dilmen)",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "commons",
   "authors": "Nevit Dilmen",
   "title": "Ultrasound Scan ND 0105122250 1227570.png",
   "url": "https://commons.wikimedia.org/wiki/File:Ultrasound_Scan_ND_0105122250_1227570.png",
   "license": "CC BY-SA 3.0",
   "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
  }
 },
 {
  "id": "commons-ultrasound-scan-nd-0110114646-1156270",
  "file": "img/commons-ultrasound-scan-nd-0110114646-1156270.png",
  "label": "Wikimedia Commons: Ultrasound Scan ND 0110114646 1156270.png",
  "caption": "Medical ultrasound image. Provided as-is. Please feel free to categorise, add description, crop.",
  "group": "Срез не определён (Nevit Dilmen)",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "commons",
   "authors": "Nevit Dilmen",
   "title": "Ultrasound Scan ND 0110114646 1156270.png",
   "url": "https://commons.wikimedia.org/wiki/File:Ultrasound_Scan_ND_0110114646_1156270.png",
   "license": "CC BY-SA 3.0",
   "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
  }
 },
 {
  "id": "commons-ultrasound-scan-nd-0117122151-1228560",
  "file": "img/commons-ultrasound-scan-nd-0117122151-1228560.png",
  "label": "Wikimedia Commons: Ultrasound Scan ND 0117122151 1228560.png",
  "caption": "Medical ultrasound image. Provided as-is. Please feel free to categorise, add description, crop.",
  "group": "Срез не определён (Nevit Dilmen)",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "commons",
   "authors": "Nevit Dilmen",
   "title": "Ultrasound Scan ND 0117122151 1228560.png",
   "url": "https://commons.wikimedia.org/wiki/File:Ultrasound_Scan_ND_0117122151_1228560.png",
   "license": "CC BY-SA 3.0",
   "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
  }
 },
 {
  "id": "commons-ultrasound-scan-nd-0121101156-1017510",
  "file": "img/commons-ultrasound-scan-nd-0121101156-1017510.gif",
  "label": "Wikimedia Commons: Ultrasound Scan ND 0121101156 1017510.gif",
  "caption": "Medical ultrasound image. Provided as-is. Please feel free to categorise, add description, crop.",
  "group": "Срез не определён (Nevit Dilmen)",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "commons",
   "authors": "Nevit Dilmen",
   "title": "Ultrasound Scan ND 0121101156 1017510.gif",
   "url": "https://commons.wikimedia.org/wiki/File:Ultrasound_Scan_ND_0121101156_1017510.gif",
   "license": "CC BY-SA 3.0",
   "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
  }
 },
 {
  "id": "commons-ultrasound-scan-nd-0121101156-1017514",
  "file": "img/commons-ultrasound-scan-nd-0121101156-1017514.png",
  "label": "Wikimedia Commons: Ultrasound Scan ND 0121101156 1017514.png",
  "caption": "Medical ultrasound image. Provided as-is. Please feel free to categorise, add description, crop.",
  "group": "Срез не определён (Nevit Dilmen)",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "commons",
   "authors": "Nevit Dilmen",
   "title": "Ultrasound Scan ND 0121101156 1017514.png",
   "url": "https://commons.wikimedia.org/wiki/File:Ultrasound_Scan_ND_0121101156_1017514.png",
   "license": "CC BY-SA 3.0",
   "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
  }
 },
 {
  "id": "commons-ultrasound-scan-nd-0121145201-1456230",
  "file": "img/commons-ultrasound-scan-nd-0121145201-1456230.png",
  "label": "Wikimedia Commons: Ultrasound Scan ND 0121145201 1456230.png",
  "caption": "Medical ultrasound image. Provided as-is. Please feel free to categorise, add description, crop.",
  "group": "Срез не определён (Nevit Dilmen)",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "commons",
   "authors": "Nevit Dilmen",
   "title": "Ultrasound Scan ND 0121145201 1456230.png",
   "url": "https://commons.wikimedia.org/wiki/File:Ultrasound_Scan_ND_0121145201_1456230.png",
   "license": "CC BY-SA 3.0",
   "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
  }
 },
 {
  "id": "commons-ultrasound-scan-nd-0125150351-1512250",
  "file": "img/commons-ultrasound-scan-nd-0125150351-1512250.png",
  "label": "Wikimedia Commons: Ultrasound Scan ND 0125150351 1512250.png",
  "caption": "Medical ultrasound image. Provided as-is. Please feel free to categorise, add description, crop.",
  "group": "Срез не определён (Nevit Dilmen)",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "commons",
   "authors": "Nevit Dilmen",
   "title": "Ultrasound Scan ND 0125150351 1512250.png",
   "url": "https://commons.wikimedia.org/wiki/File:Ultrasound_Scan_ND_0125150351_1512250.png",
   "license": "CC BY-SA 3.0",
   "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
  }
 },
 {
  "id": "commons-ultrasound-scan-nd-0126102338-1029270",
  "file": "img/commons-ultrasound-scan-nd-0126102338-1029270.png",
  "label": "Wikimedia Commons: Ultrasound Scan ND 0126102338 1029270.png",
  "caption": "Medical ultrasound image. Provided as-is. Please feel free to categorise, add description, crop.",
  "group": "Срез не определён (Nevit Dilmen)",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "commons",
   "authors": "Nevit Dilmen",
   "title": "Ultrasound Scan ND 0126102338 1029270.png",
   "url": "https://commons.wikimedia.org/wiki/File:Ultrasound_Scan_ND_0126102338_1029270.png",
   "license": "CC BY-SA 3.0",
   "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
  }
 },
 {
  "id": "commons-ultrasound-scan-nd-0126102338-1029500",
  "file": "img/commons-ultrasound-scan-nd-0126102338-1029500.png",
  "label": "Wikimedia Commons: Ultrasound Scan ND 0126102338 1029500.png",
  "caption": "Medical ultrasound image. Provided as-is. Please feel free to categorise, add description, crop.",
  "group": "Срез не определён (Nevit Dilmen)",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "commons",
   "authors": "Nevit Dilmen",
   "title": "Ultrasound Scan ND 0126102338 1029500.png",
   "url": "https://commons.wikimedia.org/wiki/File:Ultrasound_Scan_ND_0126102338_1029500.png",
   "license": "CC BY-SA 3.0",
   "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
  }
 },
 {
  "id": "commons-ultrasound-scan-nd-0126102338-1030150",
  "file": "img/commons-ultrasound-scan-nd-0126102338-1030150.png",
  "label": "Wikimedia Commons: Ultrasound Scan ND 0126102338 1030150.png",
  "caption": "Medical ultrasound image. Provided as-is. Please feel free to categorise, add description, crop.",
  "group": "Срез не определён (Nevit Dilmen)",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "commons",
   "authors": "Nevit Dilmen",
   "title": "Ultrasound Scan ND 0126102338 1030150.png",
   "url": "https://commons.wikimedia.org/wiki/File:Ultrasound_Scan_ND_0126102338_1030150.png",
   "license": "CC BY-SA 3.0",
   "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
  }
 },
 {
  "id": "commons-ultrasound-scan-nd-0128160735-1611300",
  "file": "img/commons-ultrasound-scan-nd-0128160735-1611300.png",
  "label": "Wikimedia Commons: Ultrasound Scan ND 0128160735 1611300.png",
  "caption": "Medical ultrasound image. Provided as-is. Please feel free to categorise, add description, crop.",
  "group": "Срез не определён (Nevit Dilmen)",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "commons",
   "authors": "Nevit Dilmen",
   "title": "Ultrasound Scan ND 0128160735 1611300.png",
   "url": "https://commons.wikimedia.org/wiki/File:Ultrasound_Scan_ND_0128160735_1611300.png",
   "license": "CC BY-SA 3.0",
   "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
  }
 },
 {
  "id": "commons-ultrasound-scan-nd-0128160735-1615520",
  "file": "img/commons-ultrasound-scan-nd-0128160735-1615520.png",
  "label": "Wikimedia Commons: Ultrasound Scan ND 0128160735 1615520.png",
  "caption": "Medical ultrasound image. Provided as-is. Please feel free to categorise, add description, crop.",
  "group": "Срез не определён (Nevit Dilmen)",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "commons",
   "authors": "Nevit Dilmen",
   "title": "Ultrasound Scan ND 0128160735 1615520.png",
   "url": "https://commons.wikimedia.org/wiki/File:Ultrasound_Scan_ND_0128160735_1615520.png",
   "license": "CC BY-SA 3.0",
   "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
  }
 },
 {
  "id": "commons-ultrasound-scan-nd-0128160735-1615590",
  "file": "img/commons-ultrasound-scan-nd-0128160735-1615590.png",
  "label": "Wikimedia Commons: Ultrasound Scan ND 0128160735 1615590.png",
  "caption": "Medical ultrasound image. Provided as-is. Please feel free to categorise, add description, crop.",
  "group": "Срез не определён (Nevit Dilmen)",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "commons",
   "authors": "Nevit Dilmen",
   "title": "Ultrasound Scan ND 0128160735 1615590.png",
   "url": "https://commons.wikimedia.org/wiki/File:Ultrasound_Scan_ND_0128160735_1615590.png",
   "license": "CC BY-SA 3.0",
   "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
  }
 },
 {
  "id": "commons-ultrasound-scan-nd-093",
  "file": "img/commons-ultrasound-scan-nd-093.jpg",
  "label": "Wikimedia Commons: Ultrasound Scan ND 093.jpg",
  "caption": "Ultrasound scan. Provided as-is. Please feel free to categorise, add description, crop or rename.",
  "group": "Срез не определён (Nevit Dilmen)",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "commons",
   "authors": "Nevit Dilmen",
   "title": "Ultrasound Scan ND 093.jpg",
   "url": "https://commons.wikimedia.org/wiki/File:Ultrasound_Scan_ND_093.jpg",
   "license": "CC BY-SA 3.0",
   "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
  }
 },
 {
  "id": "commons-ultrasound-scan-nd-253",
  "file": "img/commons-ultrasound-scan-nd-253.jpg",
  "label": "Wikimedia Commons: Ultrasound Scan ND 253.jpg",
  "caption": "Ultrasound scan. Provided as-is. Please feel free to categorise, add description, crop or rename.",
  "group": "Срез не определён (Nevit Dilmen)",
  "cards": [],
  "status": "draft",
  "source": {
   "kind": "commons",
   "authors": "Nevit Dilmen",
   "title": "Ultrasound Scan ND 253.jpg",
   "url": "https://commons.wikimedia.org/wiki/File:Ultrasound_Scan_ND_253.jpg",
   "license": "CC BY-SA 3.0",
   "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
  }
 }
];
