import { FaGithub } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer>
      <p>Készítette: Pásztor Márk</p>
      <p>A flashcardok és kérdések a saját jegyzeteimből készültek, amelyek hibásak lehetnek.</p>
      <a href="#">
        <FaGithub size={32}/>
      </a>
    </footer>
  )
}