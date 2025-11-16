import { FaArrowUpFromBracket, FaRankingStar, FaWandMagicSparkles } from "react-icons/fa6";
import type { MenuCardProps } from "../types/MenuCardProps";
import { FaCheckSquare, FaHome, FaIdCard, FaPlusCircle } from "react-icons/fa";

//Interfészt és a menüpontokat én írtam meg, a leírások szövegéhez AI-t használtam.
export const PROGRAMS: MenuCardProps[] = [
  {
    title: "Kezdőlap",
    icon: <FaHome size={24}/>,
    description: "Az oldal információi, programböngésző",
    href: "/",
  },
  {
    title: "Flashcard böngésző",
    icon: <FaIdCard size={24}/>,
    description: "Tanulj kétoldalas kártyákkal, lapozz, keverd, és jelöld meg, melyiket tudod.",
    href: "/flashcards",
  },
  {
    title: "Tesztkitöltés",
    icon: <FaCheckSquare size={24}/>,
    description: "Feleletválasztós kérdésekkel tesztelheted a tudásod témakörönként.",
    href: "/quiz",
  },
  {
    title: "Kártya hozzáadása",
    icon: <FaPlusCircle size={24}/>,
    description: "Új flashcard rögzítése űrlappal – minden mező validálva van.",
    href: "/add",
  },
  {
    title: "Batch import JSON-ből",
    icon: <FaArrowUpFromBracket size={24}/>,
    description: "Tölts fel egész kártyalistákat JSON formátumból egy lépésben.",
    href: "/import",
  },
  {
    title: "Definíciólista Importálása",
    icon: <FaWandMagicSparkles size={24}/>,
    description: "Illeszd be a saját definícióidat, és konvertáld őket standard JSON formára.",
    href: "/convert",
  },
  {
    title: "Eredmények",
    icon: <FaRankingStar size={24}/>,
    description: "Tekintsd át a korábbi tesztjeid pontszámait és statisztikáit.",
    href: "/results",
  },
]