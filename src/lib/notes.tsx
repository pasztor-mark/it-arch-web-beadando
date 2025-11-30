import { Category } from "../types/Category";
import type { Question } from "../types/Question";

//ezt is, a jegyzeteim alapján
export const CATEGORIES: Category[] = [
  new Category(
    "Mikroökonómia",
    [
      "GAZDASÁGI ALAPOK",
      "KERESLET-KÍNÁLAT",
      "RUGALMASSÁG",
      "TERMELÉS",
      "KÖLTSÉGEK",
      "PIACFORMÁK",
      "VERSENY",
      "ERŐFORRÁSOK"
    ]
  ), 
  new Category(

    "Vállalatgazdaságtan",
    [
      "GAZDASÁGI ALAPFOGALMAK",
      "PIACI MECHANIZMUSOK",
      "PIACFORMÁK ÉS VERSENY",
      "VÁLLALAT MŰKÖDÉSE",
      "TERMELÉS ÉS ERŐFORRÁSOK",
      "KÖLTSÉGEK ÉS GAZDÁLKODÁS",
      "STRATÉGIA ÉS VERSENYKÉPESSÉG"
    ]
  )
];


export const defaultVallgazdNotes: Question[] = [
  {
    "id": 1,
    "query": "Mi a gazdasági rendszer definíciója?",
    "answer": "A gazdasági rendszer a javak termelésének, elosztásának és fogyasztásának szervezett módja, amely a szűkös erőforrásokból való gazdálkodást és elosztást szervezi meg.",
    "topic": "GAZDASÁGI ALAPFOGALMAK",
    "uniWeek": 1,
    "dateAdded": new Date(2025, 11, 16),
    "important": true,
    "difficulty": 0,
    "labelColor": "#4CAF50"
  },
  {
    "id": 2,
    "query": "Mik a gazdasági rendszer fő szereplői?",
    "answer": "Háztartások (fogyasztás és munkaerő), vállalatok (termelés, befektetés), állam (szabályozás, adózás), pénzügyi intézmények (hitelezés), nonprofit szervezetek (közhasznú célok) és érintettek (stakeholders).",
    "topic": "GAZDASÁGI ALAPFOGALMAK",
    "uniWeek": 1,
    "dateAdded": new Date(2025, 11, 16),
    "important": true,
    "difficulty": 0,
    "labelColor": "#4CAF50"
  },
  {
    "id": 3,
    "query": "Mit jelent a piaci mechanizmus?",
    "answer": "A piaci mechanizmusban a kereslet és kínálat diktálja az árakat, az árak jelzik a bőséget vagy hiányt, és a piacok koordinálják az elosztást.",
    "topic": "PIACI MECHANIZMUSOK",
    "uniWeek": 1,
    "dateAdded": new Date(2025, 11, 16),
    "important": true,
    "difficulty": 0,
    "labelColor": "#2196F3"
  },
  {
    "id": 4,
    "query": "Mik a tökéletes verseny modelljének feltételei?",
    "answer": "Sok eladó és vevő (egyik sem befolyásolja a piacot), homogén termékek, tökéletes információ, szabad belépés és kilépés, nincs külső befolyás.",
    "topic": "PIACFORMÁK ÉS VERSENY",
    "uniWeek": 1,
    "dateAdded": new Date(2025, 11, 16),
    "important": true,
    "difficulty": 1,
    "labelColor": "#FF9800"
  },
  {
    "id": 5,
    "query": "Mi a különbség a makroökonómia és mikroökonómia között?",
    "answer": "A makroökonómia a gazdaság egészét vizsgálja (infláció, munkanélküliség), míg a mikroökonómia az egyes gazdasági szereplők döntéseit és piaci viselkedését elemzi.",
    "topic": "GAZDASÁGI ALAPFOGALMAK",
    "uniWeek": 1,
    "dateAdded": new Date(2025, 11, 16),
    "important": false,
    "difficulty": 0,
    "labelColor": "#4CAF50"
  },
  {
    "id": 6,
    "query": "Mik a vállalati érintettek (stakeholders) típusai?",
    "answer": "Belső érintettek: tulajdonosok (tőke, profit), menedzserek (döntések), munkavállalók (bér, munkahely). Külső érintettek: vevők, beszállítók, hatóságok, versenytársak.",
    "topic": "VÁLLALAT MŰKÖDÉSE",
    "uniWeek": 1,
    "dateAdded": new Date(2025, 11, 16),
    "important": true,
    "difficulty": 1,
    "labelColor": "#9C27B0"
  },
  {
    "id": 7,
    "query": "Mi az információs aszimmetria?",
    "answer": "Olyan helyzet, amikor egyik fél sem tökéletesen tájékoztatott a másik céljairól, ami a megbízó-ügynök problémához vezethet.",
    "topic": "VÁLLALAT MŰKÖDÉSE",
    "uniWeek": 1,
    "dateAdded": new Date(2025, 11, 16),
    "important": false,
    "difficulty": 1,
    "labelColor": "#9C27B0"
  },
  {
    "id": 8,
    "query": "Mit jelent a fekete doboz vállalatkép?",
    "answer": "A neoklasszikus elmélethez tartozik, a vállalatokat input-outputként kezeli, a belső működéseket nem elemzi, tulajdonos által működtetett, termelési függvénnyel leírható.",
    "topic": "VÁLLALAT MŰKÖDÉSE",
    "uniWeek": 1,
    "dateAdded": new Date(2025, 11, 16),
    "important": true,
    "difficulty": 2,
    "labelColor": "#9C27B0"
  },
  {
    "id": 9,
    "query": "Mi a vállalati cél hierarchia?",
    "answer": "Alapvető cél → Küldetés → Tartós célok → Irányítási célok → Operatív célok. Az egyéni és szervezeti célok kapcsolódnak egymáshoz.",
    "topic": "VÁLLALAT MŰKÖDÉSE",
    "uniWeek": 2,
    "dateAdded": new Date(2025, 11, 16),
    "important": true,
    "difficulty": 1,
    "labelColor": "#9C27B0"
  },
  {
    "id": 10,
    "query": "Mit jelent a CSR?",
    "answer": "Corporate Social Responsibility - vállalati társadalmi felelősség, amely a vállalat önkéntes elköteleződését jelenti a jólét fenntartható növekedése érdekében (pl. fair trade, közösségi projektek).",
    "topic": "VÁLLALAT MŰKÖDÉSE",
    "uniWeek": 2,
    "dateAdded": new Date(2025, 11, 16),
    "important": false,
    "difficulty": 0,
    "labelColor": "#9C27B0"
  },
  {
    "id": 11,
    "query": "Mik a különböző vállalati formák?",
    "answer": "Egyéni vállalkozó, KKT (Közkereseti Társaság), BT (Betzéteti Társaság), RT (Részvénytársaság), KFT (Korlátolt Felelősségű Társaság), mind különböző tulajdonosi szerkezettel és felelősséggel.",
    "topic": "VÁLLALAT MŰKÖDÉSE",
    "uniWeek": 2,
    "dateAdded": new Date(2025, 11, 16),
    "important": true,
    "difficulty": 1,
    "labelColor": "#9C27B0"
  },
  {
    "id": 12,
    "query": "Mi a kontingenciaelmélet?",
    "answer": "A vállalat nem önálló, mindig a társadalom-környezet része, a vállalati működést a környezeti feltételek befolyásolják.",
    "topic": "VÁLLALAT MŰKÖDÉSE",
    "uniWeek": 3,
    "dateAdded": new Date(2025, 11, 16),
    "important": true,
    "difficulty": 2,
    "labelColor": "#9C27B0"
  },
  {
    "id": 13,
    "query": "Hogyan definiáljuk a piacot?",
    "answer": "A piac eladók és vevők találkozása csere céljából, ahol a szerepek: eladó, vevő, versenytárs, partner.",
    "topic": "PIACI MECHANIZMUSOK",
    "uniWeek": 3,
    "dateAdded": new Date(2025, 11, 16),
    "important": true,
    "difficulty": 0,
    "labelColor": "#2196F3"
  },
  {
    "id": 14,
    "query": "Mik a verseny funkciói?",
    "answer": "Jóléti funkció (választási lehetőség), allokációs funkció (erőforrás-áramlás), hatékonysági funkció (jobb, olcsóbb termelésre ösztönöz).",
    "topic": "PIACFORMÁK ÉS VERSENY",
    "uniWeek": 3,
    "dateAdded": new Date(2025, 11, 16),
    "important": true,
    "difficulty": 1,
    "labelColor": "#FF9800"
  },
  {
    "id": 15,
    "query": "Mik a piacra lépés fő akadályai?",
    "answer": "Jogi szabályozás, méretgazdaságosság, termékdifferenciálás, tőkeigény, kereskedelmi csatornákhoz való hozzáférés, partnerváltási költségek.",
    "topic": "PIACFORMÁK ÉS VERSENY",
    "uniWeek": 3,
    "dateAdded": new Date(2025, 11, 16),
    "important": true,
    "difficulty": 1,
    "labelColor": "#FF9800"
  },
  {
    "id": 16,
    "query": "Mi a kooperáció és milyen formái vannak?",
    "answer": "Két vagy több cég együttműködése. Pozitív: horizontális (azonos szint), vertikális (ellátási lánc). Negatív: kartell, ármegállapodás, bojkott.",
    "topic": "PIACFORMÁK ÉS VERSENY",
    "uniWeek": 3,
    "dateAdded": new Date(2025, 11, 16),
    "important": false,
    "difficulty": 1,
    "labelColor": "#FF9800"
  },
  {
    "id": 17,
    "query": "Mit jelent a klaszter?",
    "answer": "Földrajzi koncentráció azonos vagy összekapcsolódó profilú, magas versenyképességű vállalatok/intézmények hálózata (pl. Szilícium-völgy), ahol verseny és együttműködés együtt van jelen.",
    "topic": "PIACFORMÁK ÉS VERSENY",
    "uniWeek": 3,
    "dateAdded": new Date(2025, 11, 16),
    "important": true,
    "difficulty": 1,
    "labelColor": "#FF9800"
  },
  {
    "id": 18,
    "query": "Mik az állam gazdasági funkciói?",
    "answer": "Hatékonyság (verseny feltételei), igazságosság (közművek, jövedelemelosztás), stabilitás (jog érvényesítése), infrastruktúra, szabályozás.",
    "topic": "GAZDASÁGI ALAPFOGALMAK",
    "uniWeek": 4,
    "dateAdded": new Date(2025, 11, 16),
    "important": true,
    "difficulty": 1,
    "labelColor": "#4CAF50"
  },
  {
    "id": 19,
    "query": "Mik az állami szerepmodellek?",
    "answer": "Liberális állam (piaci koordináció), jóléti állam (piaci + állami koordináció), totális állam (központi irányítás).",
    "topic": "GAZDASÁGI ALAPFOGALMAK",
    "uniWeek": 4,
    "dateAdded": new Date(2025, 11, 16),
    "important": true,
    "difficulty": 1,
    "labelColor": "#4CAF50"
  },
  {
    "id": 20,
    "query": "Mit jelent a globalizáció?",
    "answer": "Világszintű gazdasági integráció, határok leépülése, ahol a tőke, technológia és információ mozgatóerői, fő szereplők a multinacionális vállalatok és nemzetközi szervezetek (WTO, IMF).",
    "topic": "GAZDASÁGI ALAPFOGALMAK",
    "uniWeek": 4,
    "dateAdded": new Date(2025, 11, 16),
    "important": true,
    "difficulty": 1,
    "labelColor": "#4CAF50"
  },
  {
    "id": 21,
    "query": "Mi a stratégia definíciója?",
    "answer": "A vállalat hosszú távú céljainak és azok eléréséhez szükséges lépéseknek tudatos, jövőre irányuló rendszere, amely tartalmazza a célokat, kereteket, elérési módokat és változtatás szabályait.",
    "topic": "STRATÉGIA ÉS VERSENYKÉPESSÉG",
    "uniWeek": 5,
    "dateAdded": new Date(2025, 11, 16),
    "important": true,
    "difficulty": 1,
    "labelColor": "#F44336"
  },
  {
    "id": 22,
    "query": "Mik a stratégiai szintek?",
    "answer": "Vállalati stratégia (egész szervezet) → Üzletági/versenystratégia (iparág) → Funkcionális stratégia (területek: HR, pénzügy stb.).",
    "topic": "STRATÉGIA ÉS VERSENYKÉPESSÉG",
    "uniWeek": 5,
    "dateAdded": new Date(2025, 11, 16),
    "important": true,
    "difficulty": 1,
    "labelColor": "#F44336"
  },
  {
    "id": 23,
    "query": "Mi a Porter 5 erő modellje?",
    "answer": "Versenyhelyzet elemzése: versenytársak, új belépők, beszállítók, vevők, helyettesítő termékek. Célja az iparági vonzerő megértése.",
    "topic": "STRATÉGIA ÉS VERSENYKÉPESSÉG",
    "uniWeek": 5,
    "dateAdded": new Date(2025, 11, 16),
    "important": true,
    "difficulty": 2,
    "labelColor": "#F44336"
  },
  {
    "id": 24,
    "query": "Mit jelent a VRIO elemzés?",
    "answer": "Value (érték - hozzájárul-e az értékteremtéshez), Rarity (ritkaság - mennyire egyedi), Imitability (másolhatóság - nehéz/költséges másolni), Organization (szervezet - támogatja-e a szervezet).",
    "topic": "STRATÉGIA ÉS VERSENYKÉPESSÉG",
    "uniWeek": 5,
    "dateAdded": new Date(2025, 11, 16),
    "important": true,
    "difficulty": 2,
    "labelColor": "#F44336"
  },
  {
    "id": 25,
    "query": "Mik a fő versenystratégiák?",
    "answer": "Költségvezető (olcsó, hatékony működés), megkülönböztető (egyedi érték, minőség), fókuszáló (szűk célpiacra specializálódás).",
    "topic": "STRATÉGIA ÉS VERSENYKÉPESSÉG",
    "uniWeek": 5,
    "dateAdded": new Date(2025, 11, 16),
    "important": true,
    "difficulty": 1,
    "labelColor": "#F44336"
  },
  {
    "id": 26,
    "query": "Mi az értéklánc?",
    "answer": "A vállalati tevékenységek rendszere, amely értéket hoz létre, kombinálva az ellátási lánccal és üzleti modellel.",
    "topic": "STRATÉGIA ÉS VERSENYKÉPESSÉG",
    "uniWeek": 5,
    "dateAdded": new Date(2025, 11, 16),
    "important": true,
    "difficulty": 1,
    "labelColor": "#F44336"
  },
  {
    "id": 27,
    "query": "Mi a marketing definíciója?",
    "answer": "A vállalat fogyasztó-orientáltságát fejezi ki, tartalma a vállalat piaci kapcsolatait fejlesztő és megvalósító funkciók betöltése, központjában a fogyasztói értékteremtés áll.",
    "topic": "TERMELÉS ÉS ERŐFORRÁSOK",
    "uniWeek": 6,
    "dateAdded": new Date(2025, 11, 16),
    "important": true,
    "difficulty": 0,
    "labelColor": "#607D8B"
  },
  {
    "id": 28,
    "query": "Mik a vevőérték összetevői?",
    "answer": "Funkcionális hasznosság (teljesítményérték, szolgáltatásérték), társadalmi-kulturális hasznosság (imázsérték, esztétikai érték) és a vevő ráfordításai (ár, idő, használati költség).",
    "topic": "TERMELÉS ÉS ERŐFORRÁSOK",
    "uniWeek": 6,
    "dateAdded": new Date(2025, 11, 16),
    "important": true,
    "difficulty": 1,
    "labelColor": "#607D8B"
  },
  {
    "id": 29,
    "query": "Mi a piacszegmentálás?",
    "answer": "A piacnak a fogyasztók különböző tulajdonságú csoportjai szerinti felosztása (demográfiai, társadalmi, földrajzi, pszichográfiai szempontok alapján).",
    "topic": "TERMELÉS ÉS ERŐFORRÁSOK",
    "uniWeek": 6,
    "dateAdded": new Date(2025, 11, 16),
    "important": true,
    "difficulty": 1,
    "labelColor": "#607D8B"
  },
  {
    "id": 30,
    "query": "Mik a marketingmix 4P elemei?",
    "answer": "Product (termékpolitika), Price (árpolitika), Place (értékesítési utak politikája), Promotion (kommunikációs politika).",
    "topic": "TERMELÉS ÉS ERŐFORRÁSOK",
    "uniWeek": 6,
    "dateAdded": new Date(2025, 11, 16),
    "important": true,
    "difficulty": 0,
    "labelColor": "#607D8B"
  },
  {
    "id": 31,
    "query": "Mi a különbség a monopólium és oligopólium között?",
    "answer": "Monopólium: egyetlen eladó uralja a piacot. Oligopólium: néhány nagyvállalat uralja a piacot, egymás döntéseire reagálnak.",
    "topic": "PIACFORMÁK ÉS VERSENY",
    "uniWeek": 1,
    "dateAdded": new Date(2025, 11, 16),
    "important": true,
    "difficulty": 1,
    "labelColor": "#FF9800"
  },
  {
    "id": 32,
    "query": "Mit jelent a racionális közgazdaságtan?",
    "answer": "Robert Lucas elmélete, amely a monetarizmus és neoklasszikus gondolkodás elemeit ötvözi, feltételezve, hogy a gazdasági résztvevők racionális döntéseket hoznak.",
    "topic": "GAZDASÁGI ALAPFOGALMAK",
    "uniWeek": 1,
    "dateAdded": new Date(2025, 11, 16),
    "important": false,
    "difficulty": 2,
    "labelColor": "#4CAF50"
  }
]
