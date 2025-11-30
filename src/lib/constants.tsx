import { FaArrowUpFromBracket, FaPencil, FaRankingStar } from "react-icons/fa6";
import type { MenuCardProps } from "../types/MenuCardProps";
import { FaCheckSquare, FaHome, FaIdCard, FaPlusCircle } from "react-icons/fa";

//Interfészt és a menüpontokat én írtam meg, a leírások szövegéhez AI-t használtam.
export const PROGRAMS: MenuCardProps[] = [
  {
    title: "Kezdőlap",
    icon: <FaHome size={24} />,
    description: "Az oldal információi, programböngésző",
    href: "/",
  },
  {
    title: "Flashcard böngésző",
    icon: <FaIdCard size={24} />,
    description: "Tanulj kétoldalas kártyákkal, lapozz, keverd, és jelöld meg, melyiket tudod.",
    href: "/flashcards",
  },
  {
    title: "Tesztkitöltés",
    icon: <FaCheckSquare size={24} />,
    description: "Feleletválasztós kérdésekkel tesztelheted a tudásod témakörönként.",
    href: "/quiz",
  },
  {
    title: "Kártya hozzáadása",
    icon: <FaPlusCircle size={24} />,
    description: "Új flashcard rögzítése űrlappal – minden mező validálva van.",
    href: "/new/card",
  },
  {
    title: "Import/export",
    icon: <FaArrowUpFromBracket size={24} />,
    description: "Tölts fel egész kártyalistákat JSON formátumból egy lépésben, vagy mentsd el a jelenlegi adataid.",
    href: "/import",
  },
  {
    title: "Kategória szerkesztő",
    icon: <FaPencil size={24} />,
    description: "Definiáld a kategóriákat, amely szerint tanulhatsz.",
    href: "/categories",
  },
  {
    title: "Eredmények",
    icon: <FaRankingStar size={24} />,
    description: "Tekintsd át a korábbi tesztjeid pontszámait és statisztikáit.",
    href: "/results",
  },
]

export const rawPromptJson = {
  "categories": [{
    "title": "string",
    "topics": [
      "string",
      "string",
      "..."
    ]
  }],
  "questions": [
    {
      "id": 123,
      "query": "string",
      "answer": "string",
      "topic": "string",
      "uniWeek": 1,
      "dateAdded": "isoDate",
      "important": true,
      "difficulty": 3,
      "labelColor": "#FFFFFF"
    }
  ],
  "attempts": [
    {
      "results": [{
        "id": 456,
        "questionId": 123,
        "isCorrect": true
      }
      ],
      "topics": [
        "string",
        "..."
      ],
      "savedAt": "isoDate"
    }
  ]

}
export const importPrompt = `
A következő üzenetben nyers jegyzeteket fogok küldeni (különféle témák, kérdések, válaszok, megjegyzések).
Kérlek, ezeket alakítsd át strikt módon a következő JSON-séma szerint, a mezőket automatikusan generálva vagy kiegészítve, ha szükséges:
Letölthető JSON fájlban, vagy csak nyers JSON szöveget adj, parse-olva.
{
  "categories": [{
    "title": "string",
    "topics": ["string", "..."]
  }],
  "questions": [{
    "id": number,
    "query": "string",
    "answer": "string",
    "topic": "string",
    "uniWeek": number,
    "dateAdded": "ISODateString",
    "important": boolean,
    "difficulty": "enum(EASY|MEDIUM|HARD)",
    "labelColor": "#FFFFFF"
  }],
  "attempts": [{
    "results": [{
      "id": number,
      "questionId": number,
      "isCorrect": boolean
    }],
    "topics": ["string", "..."],
    "savedAt": "ISODateString"
  }]
}

Instrukciók a feldolgozáshoz:
- Automatikusan kategorizáld a témákat (categories → topics mezők).
- Minden talált kérdés–válasz párból hozz létre egy objektumot a questions tömbben.
- Ha nincs uniWeek, NE használj null-t, próbálj következtetni, vagy defaultolj 1-re.ü.
- id mezők az epoch időből (getTime()) kinyert integer formáját követi, adj hozzá ilyesmit.
- dateAdded és savedAt legyen ISO dátum (pl. 2025-03-21T10:32:00Z).
- difficulty legyen kizárólag az enum egyik értéke: "EASY" | "MEDIUM" | "HARD".
- Ha nem tudsz valamely mezőre következtetni:
    important: false
    difficulty: "MEDIUM"
- labelColor generálható a téma alapján, vagy random. (default: "#FFFFFF").
- Ne hagyj ki semmilyen információt, minden tartalmat ments el a JSON-ba.
- A végén csak a valid JSON-t add vissza, magyarázat nélkül.

A következő üzenetben küldöm a nyers anyagot.
`