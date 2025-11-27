import { useEffect, useState } from "react"
import { Category } from "../types/Category"
import { FaPencil, FaX } from "react-icons/fa6"
import { FaPlusCircle, FaUndo } from "react-icons/fa"
import { getCustomCategories } from "../lib/functions"

export default function EditCategories() {

  const [categories, setCategories] = useState<Category[]>(getCustomCategories())
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  const [newCategoryName, setNewCategoryName] = useState<string>("")
  const [topicEditor, setTopicEditor] = useState<{ def: string, updated: string }[]>(categories.flatMap(c => c.topics.map((t) => ({ def: t, updated: t }))))
  const [addTopic, setAddTopic] = useState<string>("")
  const [addTopicToCategory, setAddTopicToCategory] = useState<string>("");
  const [newTopics, setNewTopics] = useState<string[]>([])
  const [error, setError] = useState<string>()
  const [appendError, setAppendError] = useState<string>()

  //ameddig el tudom magyarázni a kódot
  function appendToCategory() {
    //új kategória hozzáadása a topic editorhoz
    setTopicEditor((te) => [...te, { def: addTopicToCategory, updated: addTopicToCategory }]);

    //ugyanez a kategóriához, a megfelelő indexhez
    setCategories((cat) => {
      const idx = cat.findIndex((c) => c.title === selectedCategory?.title);
      const newCategories = [...cat];

      newCategories[idx] = new Category(
        cat[idx].title,
        [...cat[idx].topics, addTopicToCategory]
      );

     
      return newCategories;
    });

    //inputok és hibák tiszítása
    setAddTopicToCategory("");
    setAppendError("");
  }

  //figyeli a selectedCategory state változásait, ha nem null (tehát meglévő kategóriát választottunk ki) a selectedcategory dolgait átírja a topiceditorba
  useEffect(() => {
    if (selectedCategory) {
      setTopicEditor(selectedCategory.topics.map(t => ({ def: t, updated: t })))
    }
  }, [selectedCategory])

  return (
    <section>
      {/* 
        submit event: a kiválasztott kategóriának felülírja a szerkesztőben feltételesen módosított értékeit
      */}
      <title>
      Kategóriaszerkesztő
      </title>
      <form onSubmit={() => {
        const newCategories = categories.map((c) =>
          c.title === selectedCategory?.title
            ? new Category(c.title, topicEditor.map((ct) => ct.updated))
            : c
        );
         //ha hozzáadtunk új kategóriát
        if (newCategoryName !== "" && newTopics.length > 0) {
          newCategories.push(new Category(newCategoryName, newTopics))
        }
        //localstorage-be menthető stringként elmenti (kb ilyenkor jutott eszembe a json.stringify funkció de már túl sok időt öltem bele a saját serialize-olásba)
        const serialized = newCategories.map((c) => c.serializeToString()).join("")
        localStorage.setItem("categories", serialized)
      }} className="gap-2 m-auto flex flex-col p-4 xl:w-1/3 md:w-2/3 w-11/12">
        <span>

          <label htmlFor="categories">Kategória</label>
          <select name="categories" id="categories" onChange={(e) => {
            //a kategória választást elmenti state változóba
            const value = e.currentTarget.value
            if (value === "new") {
              setSelectedCategory(null);
              return;
            }
            const found = categories.find((c) => c.title === value);
            setSelectedCategory(found ? new Category(found.title, [...found.topics]) : null);
          }}>
            <option value="new">Új kategória</option>
            {
              //egy választási opció minden kategóriára
              categories.map((c) => <option key={c.title}>{c.title}</option>)
            }
          </select>
        </span>
        {
          //ha új kategóriát választ a felhasználó, itt adhat neki címet
          selectedCategory === null && (
            <span>
              <label htmlFor="newCategoryName">Új téma címkéje</label>
              <input placeholder="Matek II" type="text" name="newCategoryName" onChange={(e) => {
                setNewCategoryName(e.currentTarget.value)
              }} />
            </span>
          )
        }

        {
          selectedCategory !== null &&
          //ha meglévő kategóriát választott
          (
            <div className="flex-col flex gap-4 *:flex-1 my-4">
              {
                //témaszerkesztő mappelése, alapértékekkel
                topicEditor.map(({ def, }, index) => (
                  <span key={def + index} className="flex items-center gap-2 mx-3">
                    <FaPencil />
                    <input key={def + "i"} value={topicEditor[index].updated} type="text" onChange={(e) => {
                      //szerkesztőben a topic nevek frissítése
                      const text = e.currentTarget.value
                      setTopicEditor((prev) => {
                        //ez a next dolog többször előfordul a kódban, ez indexváltoztatás nélkül settel egy értéket
                        const next = prev.slice();
                        next[index] = { def: def, updated: text };
                        return next;
                      })
                    }} />
                    <button onClick={(e) => {
                      //preventdefault: nem frissít rá a formra gombnyomásra
                      e.preventDefault()
                      //topic editor visszaállítása alapértékre helyes indexen
                      setTopicEditor((prev) => {
                        const next = prev.slice();
                        next[index] = { def: def, updated: next[index].def };
                        return next;
                      })
                      //ugyanez a kategória stateben
                      setCategories((cat) => {
                        const selectedIdx = cat.findIndex(c => c.title === selectedCategory.title)
                        cat[selectedIdx].topics[index] = topicEditor[index].def
                        return cat
                      })
                    }} className="aspect-square bg-gray-400 p-1">
                      <FaUndo />
                    </button>
                    <button onClick={(e) => {
                      e.preventDefault()
                      //topic törlése szerkesztőből
                      setTopicEditor((prev) => {
                        return prev.filter((_, idx) => idx !== index)
                      })
                      //szintén kategóriából
                      setCategories((cat) => {
                        const selectedIdx = cat.findIndex(c => c.title === selectedCategory.title)
                        cat[selectedIdx].topics = cat[selectedIdx].topics.filter((_, idx) => idx !== index)
                        return cat
                      })
                    }} className="aspect-square bg-red-400 p-1">
                      <FaX />
                    </button>
                  </span>
                ))
              }
              <span className="flex flex-row items-center gap-2">
                <input className="w-full" placeholder="Új téma hozzáfűzése" type="text" value={addTopicToCategory} onChange={(e) => {
                  //hozzáadandó topic értékének beállítása változás eseményenként
                  setAddTopicToCategory(e.currentTarget.value)
                }} />
                <button onClick={(e) => {
                  e.preventDefault()
                  //validáció
                  if (addTopicToCategory === "") {
                    setAppendError("Nem lehet üres az új téma!")
                    return
                  }
                  if (selectedCategory.topics.includes(addTopicToCategory)) {
                    setAppendError("Ez a téma már szerepel a listában.")
                    return
                  }
                  appendToCategory()
                  //hozzáadás a kategóriához
                }} className="aspect-square rounded-lg bg-green-400 p-1">

                  <FaPlusCircle />
                </button>
              </span>
              <p className="text-red-400">
                {appendError}
              </p>

            </div>
          )

        }
        {
          //ha új kategória van kiválasztva és a kategórianév nem üres (ne jelenjen meg ha ki van választva kategória)
          selectedCategory === null && newCategoryName !== "" &&
          (
            <>
              <h3>Témák</h3>
              {
                newTopics.map((nt, index) => (
                  //hozzáadott témák mapelése inputokra
                  <span className="flex flex-row items-center gap-2 mx-3">
                    <input type="text" value={nt} onChange={(e) => {
                      const value = e.currentTarget.value;
                      setNewTopics((prev) => {
                        const next = prev.slice();
                        next[index] = value;
                        return next;
                      })
                    }} />
                    <button onClick={(e) => {
                      e.preventDefault()
                      //kiszedi az elemet az új topicok közül
                      setNewTopics(
                        (prev) => prev.filter((_, i) => i !== index)
                      )
                      setAddTopic("")
                    }} className="aspect-square bg-red-400 p-1">
                      <FaX />
                    </button>
                  </span>
                ))
              }
              <span className="flex flex-row items-center gap-2">
                <input className="w-full" type="text" value={addTopic} onChange={(e) => {
                  //új topic értéke
                  setAddTopic(e.currentTarget.value)
                }} />
                <button onClick={(e) => {
                  e.preventDefault()
                  //topic validáció
                  if (addTopic === "") {
                    setError("Nem lehet üres az új téma!")
                    return
                  }
                  if (newTopics.includes(addTopic)) {
                    setError("Ez a téma már szerepel a listában.")
                    return
                  }
                  //értékek visszaállítása újrahasználhatóságra
                  setNewTopics((pr) => [...pr, addTopic])
                  setAddTopic("")
                  setError("")
                }} className="aspect-square rounded-lg bg-green-400 p-1">
                  <FaPlusCircle />
                </button>
                <p className="text-red-400">
                  {error}
                </p>
              </span>
            </>
          )
        }
        <input type="submit" />
      </form>
    </section>
  )
}