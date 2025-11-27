import { useEffect, useState, type FormEvent } from "react"
import { Category } from "../types/Category"
import { CATEGORIES } from "../lib/constants"
import { Difficulty } from "../lib/enums"
import QuestionCard from "../components/QuestionCard"
import { Question } from "../types/Question"
import { getCustomCategories, saveQuestion } from "../lib/functions"
import { emptyQuestionValidation, QuestionValidation, validateQuestion } from "../types/QuestionValidation"
import ValidationMessage from "../components/ValidationMessage"

export default function NewFlashcardForm() {
  const [availableCategories, setAvailableCategories] = useState<Category[]>(getCustomCategories())

  const [query, setQuery] = useState<string>("")
  const [answer, setAnswer] = useState<string>("")
  const [uniWeek, setUniWeek] = useState<number>(1)
  const [dateAdded, setDateAdded] = useState<Date>(new Date())
  const [important, setImportant] = useState<boolean>(false)
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY)
  const [color, setColor] = useState<string>("#ffffff")
  const [selectedCategory, setSelectedCategory] = useState<Category>(availableCategories[0])
  const [selectedTopic, setSelectedTopic] = useState<string>(selectedCategory.topics[0] ?? "")
  const [currentTopics, setCurrentTopics] = useState<string[]>(selectedCategory.topics)
  const [changesMade, setChangesMade] = useState<number>(0)

  const [validation, setValidation] = useState<QuestionValidation>(emptyQuestionValidation)

  useEffect(() => {
    if (availableCategories == CATEGORIES) {
      const categories = getCustomCategories()
      setAvailableCategories([...CATEGORIES, ...categories])
    }
  }, [])
  function createQuestion(e: FormEvent) {
    e.preventDefault()
    const question = new Question(
      new Date().getTime(), query, answer, selectedTopic, uniWeek, dateAdded, important, difficulty, color
    )
    const validationResult = validateQuestion(
      query, answer, selectedTopic, uniWeek, dateAdded, important, difficulty, color
    )
    if (QuestionValidation.isValid(validationResult) === true) {
      setValidation(emptyQuestionValidation)
      saveQuestion(question)
      return
    }
    else {
      setValidation(validationResult)
    }
    
    resetForm();
    saveQuestion(question);
    
  }
  function resetForm() {
    setQuery("");
    setAnswer("");
    setSelectedCategory(availableCategories[0]);
    setSelectedTopic(availableCategories[0].topics[0]);
    setUniWeek(1);
    setDateAdded(new Date());
    setImportant(false);
    setColor("#ffffff");

    setChangesMade(0);
  }
  useEffect(() => {
    setChangesMade(changesMade + 1)
    
  }, [query, answer, uniWeek, dateAdded, important, difficulty, color, selectedCategory, selectedTopic, currentTopics, selectedCategory, selectedTopic, currentTopics])
  return (
    <main className="max-h-[90vh] overflow-scroll flex flex-col xl:flex-row p-4 items-center gap-4 justify-between">
<title>
      Új tanulókártya
      </title>
      <form action={""} onReset={() => {
        resetForm();
      }} onSubmit={(e) => createQuestion(e)} className="flex flex-col w-11/12 xl:w-1/3 gap-4 ">
        <h2>Új kérdés hozzáadása</h2>
        <span>
          <label htmlFor="query">Kérdés</label>
          <ValidationMessage validationResult={validation.query}/>
          <textarea value={query} onChange={(e) => {
            setQuery(e.currentTarget.value)
            setChangesMade(changesMade + 1)
          }} placeholder="A hiány az, amikor..." id="query" name="query" />
        </span>
        <span>
          <label htmlFor="answer">Válasz</label>
          <ValidationMessage validationResult={validation.answer}/>
          <textarea value={answer} onChange={(e) => {
            setAnswer(e.currentTarget.value)
          }} placeholder="...a keresett termékből nincs elég" name="answer" id="answer" />
        </span>
        <span>
          <label htmlFor="category">Kategória</label>
          <select value={selectedCategory.title} name="category" id="category" onChange={(e) => {
            const currentCategory = availableCategories.find((c) => c.title === e.currentTarget.value) ?? availableCategories[0]
            setSelectedCategory(currentCategory)
            setCurrentTopics(currentCategory.topics)
            setSelectedTopic(currentCategory.topics[0])
          }}>
            {
              availableCategories.map((c) => {
                return (
                  <option key={c.title} value={c.title}>{c.title}</option>
                )
              })
            }
          </select>
        </span>
        <span>
          <label htmlFor="topic">Téma</label>
            <ValidationMessage validationResult={validation.topic}/>
          <select key={selectedCategory.title + "-" + selectedTopic} value={selectedTopic} name="topic" id="topic" onChange={(e) => {
            setSelectedTopic(e.currentTarget.value)
            setChangesMade(changesMade + 1)
          }}>
            {
              currentTopics.map((t) => {
                return (
                  <option key={`${selectedCategory}-${t}`} value={t}>{t}</option>
                )
              })
            }
          </select>
        </span>
        <span>
          <label htmlFor="uniWeek">Oktatási hét</label>
            <ValidationMessage validationResult={validation.uniWeek}/>
          <input type="number" min={1} max={12} step={1} value={uniWeek} onChange={(e) => {
            setUniWeek(Number(e.currentTarget.value))
          }} name="uniWeek" id="uniWeek" />
        </span>
        <span>
          <label htmlFor="dateAdded">Hozzáadási dátum</label>
            <ValidationMessage validationResult={validation.dateAdded}/>
          <input type="date" value={dateAdded.toISOString().slice(0, 10)} onChange={(e) => {
            setDateAdded(new Date(e.currentTarget.value + "T00:00:00"))
          }} name="dateAdded" id="dateAdded" />
        </span>
        <span className="flex-row *:shadow-none">
          <label htmlFor="important">Fontos?</label>
            <ValidationMessage validationResult={validation.important}/>
          <input type="checkbox" checked={important} onChange={(e) => {
            setImportant(e.currentTarget.checked)
          }} name="important" id="important" />
        </span>
        <span>
          <label id="difficulty-label">Nehézség</label>
            <ValidationMessage validationResult={validation.difficulty}/>
          <div role="radiogroup" className="flex gap-4">
            <label htmlFor="difficulty-easy" className="flex items-center gap-2">
              <input
                type="radio"
                id="difficulty-easy"
                name="difficulty"
                value="easy"
                checked={difficulty === Difficulty.EASY}
                onChange={(e) => {
                  if (e.currentTarget.checked) setDifficulty(Difficulty.EASY)
                }}
              />
              <span>Könnyű</span>
            </label>
            <label htmlFor="difficulty-medium" className="flex items-center gap-2">
              <input
                type="radio"
                id="difficulty-medium"
                name="difficulty"
                value="medium"
                checked={difficulty === Difficulty.MEDIUM}
                onChange={(e) => {
                  if (e.currentTarget.checked) setDifficulty(Difficulty.MEDIUM)
                }}
              />
              <span>Közepes</span>
            </label>
            <label htmlFor="difficulty-hard" className="flex items-center gap-2">
              <input
                type="radio"
                id="difficulty-hard"
                name="difficulty"
                value="hard"
                checked={difficulty === Difficulty.HARD}
                onChange={(e) => {
                  if (e.currentTarget.checked) setDifficulty(Difficulty.HARD)
                }}
              />
              <span>Nehéz</span>
            </label>
          </div>
        </span>
        <span className="flex-row *:shadow-none">
            <ValidationMessage validationResult={validation.labelColor}/>
          <label htmlFor="color">Szín</label>

          <input type="color" value={color} onChange={(e) => {
            setColor(e.currentTarget.value)
          }} name="color" id="color" />
        </span>
        <div className="w-full flex gap-4 *:flex-1">
        <input type="submit" />
        <input type="reset" />
        </div>
      </form>
      <section className="w-full">
        <article className="flex items-center justify-center">
          <QuestionCard key={changesMade} question={new Question(-1, query, answer, selectedTopic, uniWeek, dateAdded, important, difficulty, color)} />
        </article>
      </section>
    </main>
  )
}