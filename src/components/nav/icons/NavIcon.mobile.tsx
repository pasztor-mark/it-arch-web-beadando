import { NavLink } from "react-router";
import type { MenuCardProps } from "../../../types/MenuCardProps";

export default function MobileNavIcon({ props }: { props: MenuCardProps }) {
  return (
    <div>
      <NavLink to={props.href} className="relative aspect-square m-auto w-14 flex items-center justify-center rounded-lg backdrop-blur-md bg-black/30">
        <p className="scale-150">
          {props.icon}
        </p>
      </NavLink>
      <p className="text-xs text-center">{props.title}</p>
    </div>
  )
}