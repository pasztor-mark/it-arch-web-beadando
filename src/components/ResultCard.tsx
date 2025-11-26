import { FaCheck, FaX } from "react-icons/fa6";
import type { Attempt } from "../types/Attempt";
import type { Question } from "../types/Question";

export default function ResultCard({ attempt, questions }: { attempt: Attempt, questions: Question[] }) {
  return (
    <div className="p-4 bg-neutral-900/30 rounded-xl flex flex-col">
      <h5>{attempt.savedAt.toISOString().replaceAll("-", ". ").split("T")[0] + " " + attempt.savedAt.toISOString().replaceAll("-", ". ").split("T")[1].slice(0, 5)}</h5>
      <ul className="flex flex-wrap items-center gap-2">
        <span className="text-lg flex gap-1">
          <p className="font-bold">{((attempt.results.filter((q) => q.isCorrect).length) * 100 / (questions.length)).toFixed(0)}% -</p>
          <p className="text-green-400 font-bold">
          {attempt.results.filter((q) => q.isCorrect).length}
          </p>
          <p>/</p>
          {questions.length}
        </span>
        {
          attempt.topics?.map((t, idx) => <li key={t + idx} className="text-xs font-light">{t}</li>)
        }
      </ul>
      {
        questions.map((q) => {
          const result = attempt.results.find((rq) => rq.questionId == q.id)
          return (

            <div key={q.id} className={`${result?.isCorrect ? "text-green-300" : "text-red-300"} bg-black/20 items-center justify-between p-2 rounded-xl my-2 flex`}>
              <span className="flex-col">

                <p className="text-lg">
                  {q.query}
                </p>
                <p>Helyes válasz: {" "}
                  {q.answer}
                </p>
              </span>
              <span>

                {
                  result?.isCorrect == true ? <FaCheck size={24} /> : <FaX size={24} />
                }
              </span>
            </div>
          )
        })
      }
    </div>
  )
}