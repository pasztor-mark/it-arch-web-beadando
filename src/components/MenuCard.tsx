import type { MenuCardProps } from "../types/MenuCardProps";

export default function MenuCard({program}: {program: MenuCardProps}) {

  return (
    <div className="flex flex-col justify-betwee flex-1 n p-3 h-48 shadow-lg gap-2 shadow-black/42 rounded-xl backdrop-blur-2xl hover:shadow-orange-300/30 transition-all duration-400 basis-full md:basis-[30%]">
      <span className="flex justify-between">
        <h5 className="text-lg font-semibold">{program.title}</h5>
        
        {program.icon}
      </span>
      <p className="text-light">{program.description}</p>
      <a className=" bg-orange-300/40 p-1 rounded-lg text-center text-lg" href={program.href}>Tovább</a>
    </div>
  )
}