import type { MenuCardProps } from "../../../types/MenuCardProps";

export default function MobileNavIcon({ props }: { props: MenuCardProps }) {
  return (
    <span>
      <a href={props.href} className="relative aspect-square m-auto w-14 flex items-center justify-center rounded-lg backdrop-blur-md bg-black/30">
        <p className="scale-150">
          {props.icon}
        </p>
      </a>
      <p className="text-xs text-center">{props.title}</p>
    </span>
  )
}