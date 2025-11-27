import { useEffect, useState } from "react"
import { Attempt } from "../types/Attempt"
import ResultCard from "../components/ResultCard"
import { Question } from "../types/Question"
import { getQuestions } from "../lib/functions"

export default function ResultsPage() {

  const [results, setResults] = useState<Attempt[]>([])
  const [questions, setQuestions] = useState<Question[]>([])

  useEffect(() => {
    let serialized = localStorage.getItem("attempts")?.split("###") ?? []
    setQuestions(getQuestions())
    setResults(serialized.map((a) => Attempt.deserializeFromString(a)))
  }, [])
  return (
    <main className="p-2 min-h-[80vh]">
      <title>
      Eredmények
      </title>
      <h1 className="text-center mt-12 mb-12 lg:mt-0">Eredmények</h1>
      <section className="flex flex-col-reverse gap-4">
      {
        results.length === 0 && <h2 className="text-center">Még nincs megjeleníthető eredmény.</h2>
      }
      {
        results.map((r) => {
        const ids = r.results.flatMap((q) => q.questionId)
        const filteredQuestions = questions.filter((q) => ids.includes(q.id))
        return <ResultCard key={r.savedAt.getTime()} questions={filteredQuestions} attempt={r}/>})
      }
      </section>
    </main>
  )
}