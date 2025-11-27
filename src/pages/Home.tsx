import MenuCard from "../components/MenuCard";
import { PROGRAMS } from "../lib/constants";

export default function Home() {
  return (


    <main className='p-3 mt-14 lg:mt-4 min-h-screen'>
      <header className='flex flex-col gap-4 mb-6 text-center lg:text-justify'>
        <h1>Gazdaságinformatika Tanulókártyák</h1>
        <h2>Vállalatgazdaságtan és mikroökonómia definíciók flashcardokba rendezve (ha rá tudom venni magam, makro is) mert quizletre feltölteni jsonból fizetős </h2>
      </header>
      <h3 className='text-highlight'>Programok</h3>
      <hr className="my-3 text-highlight" />
      <section className="flex flex-wrap gap-8 justify-between">
        {
          PROGRAMS.map((p) => (
            <MenuCard program={p} />
          ))
        }
      </section>
      <hr className="my-6 text-highlight" />
      <section className="mx-auto lg:w-2/3">
        <article>
          <h3 className="text-highlight">Az oldalról</h3>
          <p className="text-justify text-lg">A programot azért hoztam létre, mert nem akartam kiadni havi Quizlet előfizetésre, csak hogy JSON formátumból tudjak importálni definíciókat, plusz jó gyakorlás webfejlesztésre.</p>
        </article>
      </section>
    </main>
  )

}