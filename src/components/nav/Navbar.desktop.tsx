import { PROGRAMS } from "../../lib/constants";
import DesktopNavIcon from "./icons/NavIcon.desktop";

export default function DesktopNavbar() {
  return (
    <header className="bg-black/30 p-3 flex items-center flex-row">
      <h1 className="">Gazdaságinformatika</h1>
      {
        PROGRAMS.map((p) => <DesktopNavIcon props={p}/>)
      }
    </header>
  )
}