import { FaGithub } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer>
      <p>Készítette: Pásztor Márk</p>
      <p>A flashcardok és kérdések a saját, előadásokon írt jegyzeteimből készültek, amelyek hibásak lehetnek. Egyes definíciók tartalmát AI felhasználásával átdolgoztam.</p>
      <a href="https://github.com/pasztor-mark/it-arch-web-beadando">
        <FaGithub size={32}/>
      </a>
    </footer>
  )
}