### Kötelező tartalmi elemek és pontozás (35 pont)
#### Űrlap validálással (10 pont):

- Legalább egy oldalon kell lennie egy űrlapnak, amely minimum 7 különböző típusú beviteli mezőt tartalmaz.
  - Egy nagyobb form található a Kártya hozzáadása aloldalon (`NewFlashcardForm.tsx`): 2 text, number, dátum, select/option, checkbox, radio és szín inputtal.
  - Import/export oldalon (`ImportExportData.tsx`) fájlfeltöltés is található.
- Minden űrlap elemnél kötelező a label tag használata a felhasználóbarát kialakítás érdekében.
  - A form állandó elemeinél minden esetben található label, viszont a mappelt elemeknél - pl. a téma nevek szerkesztőjénél csak az input tartalma van megjelenítve. Ehelyett a felhasználó visszaállíthatja az undo gombbal az eredeti értékére.
- Az űrlap validálását (legalább 5 mezőre) natív JavaScript vagy egy választott keretrendszer segítségével kell megvalósítani. A kódnak egyedi, a tanultakon alapuló megoldásnak kell lennie.
  - A kérdések validációs logikája megtalálható a `QuestionValidation.ts` fájlban.
  - Egyéb, kevésbé részletes validáció (null/üres check) megtalálható egyéb formok submit event handlerében.
#### Saját interaktív program (8 pont):

- Az oldalon lennie kell egy összetettebb, saját, "kézzel írt" programnak, ami nem validálási célt szolgál. Ez lehet például egy interaktív fotóalbum, egy a weboldal témájához illeszkedő kalkulátor, egy egyszerű játék, vagy bármilyen kreatív, interaktív elem, amely megvalósítható natív JavaScripttel vagy egy keretrendszerrel is.
  - Ez szubjektív

- A programnak illeszkednie kell a weboldal témájához, és nem lehet "minimalista". A kódot külön fájlba kell szervezni.
  - Szintén

#### Reszponzivitás és GitHub (10 pont):

- A teljes oldalnak hibátlanul reszponzívnak kell lennie (5 pont).
  - Laptopon írtam, ~16:9 képarányban, mobil és tablet nézetben minden korrektnek tűnik nekem.
  - Legtöbb változtatás Tailwind szelektorokkal (`sm: md: lg:, xl:`, stb) készült, pl. flex irány átállítása, stb
  - A navigációt state-tel oldottam meg, ami figyeli az oldal szélességét (`Navigation.tsx`)

- A kész weboldalnak a megadott URL-en (pl. GitHub Pages) hibátlanul kell működnie (5 pont).
  - Az egész oldal úgy működik Pages-en, mint lokálisan.
  - A Workflow fájlt egy korábbi projektemből szedtem.

#### Egyéb követelmények (7 pont):

- Kód tisztasága és validálása (3 pont).
  - Kód tisztasága szubjektív, HTML validációt viszont nem tudtam futtatni, mivel egyoldalas applikáció, viszont törekedtem a szemantikus HTML használatára, sorrendekre, stb.

- Fájlok mappákba rendezése (1 pont).
```
  -/
    -public
      -logo.svg
    -src
      -(forráskód)
      -components
        - (oldalakon felhasznált elemek)
      -lib
        -(konstansok, osztályok, exportált függvények)
      -pages
        -(aloldalak forrásai)
      -types
        -(típusok, osztályok, interfészek)
      -...App.tsx, main.tsx, index.css

        

    -...readme, segédlet, cfg, stb.
```

- Helyes metaadatok (1 pont).
  - A React és a SPA felépítés miatt nincs minden aloldalon head tag, így nem konvencionális módon el lehet helyezni az aloldalon akárhol title taget.
  - [React dokumentáció](https://react.dev/reference/react-dom/components/title#special-rendering-behavior) szerint automatikusan a DOM head-jébe kerülnek a cím tagek, kivéve svg elemeknél.
- Favicon használata (1 pont).
  - ChatGPT által generált kártya alakú logo, a root `index.html`-ben

- Egyedi font használata (1 pont).
  - Felhasznált font: [Roboto](https://fonts.google.com/specimen/Roboto)