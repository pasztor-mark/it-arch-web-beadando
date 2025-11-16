import { useEffect, useState } from "react"
import DesktopNavbar from "./Navbar.desktop"
import MobileNavbar from "./Navbar.mobile"

export default function Navigation() {
  const breakpoint = 1024

  const [isWide, setIsWide] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth >= breakpoint : false
  )
  function checkWindowWidth(): boolean {
    if (typeof window === "undefined") return false
    return window.innerWidth >= breakpoint
  }
  useEffect(() => {
    function onResize() {
      setIsWide(checkWindowWidth())
    }

    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [breakpoint])

  return (

    isWide ? <DesktopNavbar/> : <MobileNavbar/>
  )
}