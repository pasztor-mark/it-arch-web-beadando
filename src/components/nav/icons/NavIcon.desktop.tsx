import { NavLink } from "react-router";
import type { MenuCardProps } from "../../../types/MenuCardProps";

export default function DesktopNavIcon({ props }: { props: MenuCardProps }) {
  return (
      <NavLink to={props.href} className="m-auto flex  items-center flex-col xl:flex-row justify-center rounded-lg backdrop-blur-md bg-black/30 py-3 px-1 xl:gap-3">
          {props.icon}
      <p className="text-center text-xs xl:text-sm">{props.title}</p>
      </NavLink>
  )
}