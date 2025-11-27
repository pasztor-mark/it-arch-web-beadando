import { useEffect, useState } from "react"
import { Question } from "../types/Question"
import { getCustomCategories, getQuestions, saveAttempt } from "../lib/functions"
import { Category } from "../types/Category";
import { QuestionResult } from "../types/QuestionResult";
import { Attempt } from "../types/Attempt";

type QuizQuestion = {
  query: string;
  choices: string[];
  correct: string
}
//Sok a közös logika a Flashcards.tsx oldallal, az itteni magyarázatok arra is érvényesek.
export default function QuizPage() {

  //alap kérdések (referenciának)
  const [defaultQuestionPool] = useState<Question[]>(getQuestions())
  //jelenleg előforduló kérdések
  const [currentQuestionPool, setCurrentQuestionPool] = useState<Question[]>(defaultQuestionPool)
  //alap kategóriák (referenciának)
  const [defaultCategoryPool] = useState<Category[]>(getCustomCategories())
  //jelenleg előforduló kategóriák
  const [categoryPool, setCategoryPool] = useState<Category[]>(defaultCategoryPool)
  
  //mostani próbálkozás
  const [attemptResults, setAttemptResults] = useState<QuestionResult[]>([])
  
  //min hét
  const [minWeekSlider, setMinWeekSlider] = useState<number>(currentQuestionPool.flatMap((q) => q.uniWeek).sort((a, b) => a - b)[0]);
  //max hét
  const [maxWeekSlider, setMaxWeekSlider] = useState<number>(currentQuestionPool.flatMap((q) => q.uniWeek).sort((a, b) => b - a)[0]);
  //megjelölt válasz
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null)
  
  //megjelölt válasz
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  
  //kiválasztott témákból összeállított kvíz
  const [quiz, setQuiz] = useState<QuizQuestion[]>([])

  useEffect(() => {
    //szűrők beállítása
    const newQuestionPool = defaultQuestionPool.filter((q) => (q.uniWeek >= minWeekSlider && q.uniWeek <= maxWeekSlider) && categoryPool.flatMap(c => c.topics).includes(q.topic))
    setCurrentQuestionPool(newQuestionPool)


    //kvíz resetelése
    setQuiz(createQuiz(newQuestionPool))
    setAttemptResults([])

    //minden alábbi state változását figyeli
  }, [categoryPool, minWeekSlider, maxWeekSlider])

  function getChoices(answers: string[]) {

    let choices = answers
    if (answers.length < 4) {
      choices = defaultQuestionPool.flatMap((q) => q.answer)
    }
    //kiválaszt 4 random indexet
    const count = Math.min(4, choices.length)
    const indices = new Set<number>()
    while (indices.size < count) {
      indices.add(Math.floor(Math.random() * choices.length))
    }
    //visszaadja az indexek értékeit
    return choices.filter((_, idx) => indices.has(idx))
  }
  function createQuiz(questionPool: Question[]) {
    let questions: QuizQuestion[] = [];
    questionPool.forEach((q) => {
      //minden elérhető kérdésre összeállít egy kvízt
      const allowedQuestions = questionPool.filter((cq) => categoryPool.flatMap((t) => t.topics).includes(cq.topic)).flatMap((q) => q.answer).filter((fq) => fq !== q.answer)
      questions.push({
        query: q.query,
        choices: getChoices(allowedQuestions),
        correct: q.answer
      })
    })
    return shuffle(questions)

  }
  //fel van használva egy másik oldalon is, forrás: Fisher-Yates shuffle
  function shuffle(element: any[]) {
    for (let i = element.length - 1; i > 0; i--) {
      const j: number = Math.floor(Math.random() * (i + 1));
      [element[i], element[j]] = [element[j], element[i]]
    }
    return element;
  }

  return (
    <main className="flex flex-col-reverse xl:flex-row relative">
      <title>
      Kvíz
      </title>
      <p className="absolute top-2 right-4">{attemptResults.length}/{currentQuestionPool.length}</p>
      <p className="text-green-500 absolute top-8 right-4">{attemptResults.filter((q) => q.isCorrect).length}/{currentQuestionPool.length}</p>
{/* a Flashcards.tsx oldalon megtalálható aside */}
      <aside className="xl:basis-2/10 overflow-y-scroll max-h-[82vh] flex flex-col gap-4 rounded-t-xl xl:rounded-r-xl p-2 bg-black/30">
        <h2>Beállítások</h2>
        <p className="text-xs text-center text-red-200">A beállítások változtatása újraindítja a próbálkozást!</p>
        <hr />
        <h4>Hét filter: {minWeekSlider} - {maxWeekSlider}</h4>
        <div className="flex flex-col gap-2 sliderContainer">
          <label htmlFor="maxHet">Max hét</label>

          <input type="range" min={1} max={maxWeekSlider} step={1} value={minWeekSlider} onChange={(e) => {
            setMinWeekSlider(Number(e.currentTarget.value))
          }} />
          <label htmlFor="minHet">Min. hét</label>

          <input type="range" min={minWeekSlider} max={12} step={1} value={maxWeekSlider} onChange={(e) => {
            setMaxWeekSlider(Number(e.currentTarget.value))
          }} />
        </div>
        <h4>Témakörök</h4>
        {
          defaultCategoryPool.map((c) =>
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
                  setCategoryPool((pool) => pool.map((cat) => cat.title === c.title ? new Category(cat.title, defaultCategoryPool.find((dc) => dc.title === cat.title)?.topics ?? []) : cat))
                }} className="bg-orange-300/30 p-1 rounded-sm">Tananyag visszahelyezése</button>
              </div>
              <hr />
            </>
          )
        }
      </aside>


      <section className="m-auto w-11/12 md:w-2/3 xl:1/3 relative">
        {
          quiz.length > 0 &&
          <article className="w-full m-auto p-3 text-center justify-center gap-2 *:rounded-xl  flex flex-col *:bg-neutral-900/30 ">
            <p className=" text-2xl font-bold py-6">{
              quiz[attemptResults.length].query
            }</p>
            {
              (() => {
                const idx = attemptResults.length;
                const q = quiz[idx];
                const all = [...q.choices, q.correct];

                //itt más a shuffle funkció, az előző minden inputon rerenderelt
                //forrás: https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
                function hash(string: string) {
                  let hash = 0;
                  for (const char of string) {
                    hash = (hash << 5) - hash + char.charCodeAt(0);
                    hash |= 0;
                  }
                  return hash;
                };
//int alapján random shuffle
                const fix = all.slice().sort((a, b) => hash(q.query + a) - hash(q.query + b));

                return fix.map((choice) => (
                  <span key={choice} className="">
                    <button
                      className={`font-light p-2 rounded-xl ${selectedAnswer === choice && "border-gray-400 border-2"} ${correctAnswer == choice && "border-2 border-green-400"}`}
                      onClick={() => setSelectedAnswer((prev) => (prev === choice ? null : choice))}
                    >
                      {choice}
                    </button>
                  </span>
                ));
              })()
            }
            <span>
              <button onClick={() => {
                const question = defaultQuestionPool.find((v) => v.query === quiz[attemptResults.length].query)

                //következő
                if (quiz.length === attemptResults.length + 1) {
                  saveAttempt(new Attempt([...attemptResults, new QuestionResult(new Date().getTime(), question?.id ?? 999, question?.answer === selectedAnswer)], categoryPool.flatMap((t) => t.topics), new Date()))
                  alert("Próbálkozás vége.")
                  setAttemptResults([])
                  return
                }
                if (correctAnswer !== null) {
                  setAttemptResults((ar) => [...ar, new QuestionResult(new Date().getTime(), question?.id ?? 0, question?.answer === selectedAnswer)])
                  setCorrectAnswer(null)
                }
                else {

                  //ellenőrzés
                  setCorrectAnswer(quiz[attemptResults.length].correct)
                  if (quiz[attemptResults.length].correct === selectedAnswer) {
                    setCorrectAnswer(selectedAnswer)
                  }
                }
              }} className="bg-green-400/30 p-4 text-xl rounded-xl w-full">
                {
                  correctAnswer !== null ?
                    "Következő" : "Ellenőrzés"

                }
              </button>
            </span>
          </article>
        }
      </section>
    </main>
  )
}