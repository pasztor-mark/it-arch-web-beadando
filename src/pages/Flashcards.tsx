import { useEffect, useState } from "react"
import { CATEGORIES } from "../lib/constants"
import { Category } from "../types/Category"
import { getCustomCategories, getQuestions, saveAttempt } from "../lib/functions"
import { Question } from "../types/Question"
import QuestionCard from "../components/QuestionCard"
import { QuestionResult } from "../types/QuestionResult"
import { Attempt } from "../types/Attempt"

export default function FlashcardsPage() {
  //Mivel sok logika azonos a QuizPage.tsx logikájával, ezért az ott leírt magyarázatok itt is érvényesek.
  const [defaultCategories, setDefaultCategories] = useState(getCustomCategories())
  const [categoryPool, setCategoryPool] = useState<Category[]>(getCustomCategories())
  const [defaultquestionPool, setDefaultQuestionPool] = useState<Question[]>(getQuestions())
  const [questionPool, setQuestionPool] = useState<Question[]>(getQuestions())

  const [attemptResults, setAttemptResults] = useState<QuestionResult[]>([])
  const [minWeekSlider, setMinWeekSlider] = useState<number>(questionPool.flatMap((q) => q.uniWeek).sort((a, b) => a - b)[0]);
  const [maxWeekSlider, setMaxWeekSlider] = useState<number>(questionPool.flatMap((q) => q.uniWeek).sort((a, b) => b - a)[0]);

  useEffect(() => {
    if (defaultCategories == CATEGORIES) {
      let customCategories = getCustomCategories()
      let customQuestions = getQuestions();
      setCategoryPool((pool) => pool.concat(customCategories))
      setDefaultCategories((pool) => pool.concat(customCategories))
      setDefaultQuestionPool((pool) => pool.concat(customQuestions))
    }
  }, [defaultquestionPool])


  function shuffleCards(): void {
    setQuestionPool((qp) => {
      let questions = [...qp]
      for (let i = questions.length - 1; i > 0; i--) {
        const j: number = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]]
      }
      return questions;
    })
  }


  useEffect(() => {
    setQuestionPool(defaultquestionPool.filter(q => (q.uniWeek >= minWeekSlider && q.uniWeek <= maxWeekSlider) && defaultquestionPool.filter(q => categoryPool.flatMap((c) => c.topics).includes(q.topic))))
    resetAttempt()
  }, [minWeekSlider, maxWeekSlider])

  useEffect(() => {
    const allowedTopics: string[] = categoryPool.flatMap((c) => c.topics)
    setQuestionPool(defaultquestionPool.filter(q => allowedTopics.includes(q.topic) && (q.uniWeek >= minWeekSlider && q.uniWeek <= maxWeekSlider)))
    resetAttempt()
  }, [categoryPool])

  useEffect(() => {
    if (attemptResults.length === 0) return;
    if (attemptResults.length === questionPool.length) {
      alert("Próbálkozás vége.")
      saveAttempt(new Attempt(attemptResults, questionPool.flatMap((q) => q.topic)))
      resetAttempt()
    }

  }, [attemptResults])
  function resetAttempt(): void {
    shuffleCards()
    setAttemptResults([])
  }
  return (
    <main className="flex flex-col-reverse xl:flex-row">
      <title>
      Tanulókártyák
      </title>
      <aside className="xl:basis-2/10 overflow-y-scroll max-h-[82vh] flex flex-col gap-4 rounded-t-xl xl:rounded-r-xl p-2 bg-black/30">
        <h2>Beállítások</h2>
        <p className="text-xs text-center text-red-200">A beállítások változtatása újraindítja a próbálkozást!</p>
        <hr />
        <h4>Hét filter: {minWeekSlider} - {maxWeekSlider}</h4>
        <div className="flex flex-col gap-2 sliderContainer">
          <label htmlFor="maxHet">Max hét</label>
          <input name="maxHet" type="range" min={1} max={maxWeekSlider} step={1} value={minWeekSlider} onChange={(e) => {
            setMinWeekSlider(Number(e.currentTarget.value))
          }} />
          <label htmlFor="minHet">Min. hét</label>
          <input type="range" min={minWeekSlider} max={12} step={1} value={maxWeekSlider} onChange={(e) => {
            setMaxWeekSlider(Number(e.currentTarget.value))
          }} />
        </div>
        <h4>Témakörök</h4>
        {
          defaultCategories.map((c) =>
            <>
              <h6 className="text-center">{c.title}</h6>
              <div className="flex flex-wrap border p-1 gap-1 rounded-md">
                {
                  c.topics.map((t) => {
                    const isInPool = categoryPool
                      .find((p) => p.title === c.title)!
                      .topics.includes(t);
                    return (<button onClick={() => {
                      setCategoryPool((pool) =>
                        pool.map((cat) =>
                          cat.title === c.title
                            ? new Category(
                              cat.title,
                              isInPool
                                ? cat.topics.filter((topic) => topic !== t)
                                : [...cat.topics, t]
                            )
                            : cat
                        )
                      );
                    }} key={t} className={`text-xs rounded-sm transition-all duration-300 p-1 flex-1 ${isInPool ? "bg-orange-300/30" : "opacity-50"} `}>
                      {t}
                    </button>)
                  })
                }
              </div>
              <div className="flex *:flex-1 gap-2">

                <button onClick={() => {
                  setCategoryPool((pool) => pool.map((cat) => cat.title === c.title ? new Category(cat.title, []) : cat))
                }} className="bg-orange-300/30 p-1 rounded-sm">Tananyag kivétele</button>
                <button onClick={() => {
                  setCategoryPool((pool) => pool.map((cat) => cat.title === c.title ? new Category(cat.title, defaultCategories.find((dc) => dc.title === cat.title)?.topics ?? []) : cat))
                }} className="bg-orange-300/30 p-1 rounded-sm">Tananyag visszahelyezése</button>
              </div>
              <hr />
            </>
          )
        }
      </aside>
      <section className="relative min-h-[80vh] xl:min-h-auto w-full flex flex-col items-center justify-center">
        <QuestionCard key={questionPool[attemptResults.length]?.id ?? 0} question={questionPool[attemptResults.length]} />
        {
        questionPool.length > 0 &&
          <>
            <p className="absolute top-2 right-4">{attemptResults.length}/{questionPool.length}</p>
            <p className="text-green-500 absolute top-8 right-4">{attemptResults.filter((q) => q.isCorrect).length}/{questionPool.length}</p>
            <div className="flex flex-row w-11/12 xl:w-[60vw] gap-2 justify-between *:flex-1 *:p-4 *:text-xl mt-4 *:text-black *:font-semibold">
              <button
                onClick={() => {
                  setAttemptResults((ar) => [...ar, new QuestionResult(new Date().getUTCMilliseconds(), questionPool[attemptResults.length]?.id, false)])
                }}
                className="bg-red-300">Megjelölés helytelenként</button>
              <button onClick={() => {
                setAttemptResults((ar) => [...ar, new QuestionResult(new Date().getUTCMilliseconds(), questionPool[attemptResults.length]?.id, true)])
              }} className="bg-green-300">Megjelölés helyesként</button>
            </div>
          </>
        }
      </section>
    </main>
  )
}