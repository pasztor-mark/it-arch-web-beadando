import { useState } from "react"
import { FaBars } from "react-icons/fa6"
import { PROGRAMS } from "../../lib/constants"
import MobileNavIcon from "./icons/NavIcon.mobile"

export default function MobileNavbar() {
  const [isShown, setIsShown] = useState(false)
  return (
    <>
      <div className={`disabled-bg ${isShown ? "z-40 bg-black/10" : "-z-50"}`} onClick={(e) => {
        e.stopPropagation()
        setIsShown(false)
      }}/>
    <button onClick={() => {
      setIsShown((s) => !s)
    }} className={`fixed bg-neutral-900 z-50 rounded-xl p-2 top-12 right-6 transition-all duration-300 ease-out ${isShown ? "rotate-90" : ""}`}>
      <FaBars size={42}/>
    </button>

    <aside className={`nav-aside ${isShown ? "right-0" : "-right-full"}`}>
        <nav className="flex flex-col justify-between h-full">
          {
            PROGRAMS.map((p) => <MobileNavIcon props={p}/>)
          }
        </nav>
    </aside>
    </>
  )
}