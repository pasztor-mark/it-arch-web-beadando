import { useState } from "react";
import { getDifficultyColor } from "../lib/functions";
import type { Question } from "../types/Question";
import { FaTriangleExclamation } from "react-icons/fa6";

export default function QuestionCard({ question }: { question?: Question }) {
  if (!question) {
    return <h6>Erre a szűrőre nincs tanulókártya.</h6>
  }
  const color = getDifficultyColor(question.difficulty)
  const [shownSide, setShownSide] = useState<string>(question.query)
  return (
    <div onClick={() => {
      if (question.query === shownSide) {
        setShownSide(question.answer)
      }
      else {
        setShownSide(question.query)
      }
    }} className={` w-11/12 xl:w-[60vw] xl:h-64 xl:min-h-auto min-h-72 text-justify p-8 text-black relative flex justify-center items-center border-t-8 bg-amber-50 shadow-[${color}] shadow-lg`}
    style={{
      borderColor: question.labelColor ?? "#1122EE"
    }}>
      {
        question.important && <span className="text-red-900 absolute top-2 left-4 flex gap-2 items-center">
          <FaTriangleExclamation size={24} />
          <p className="font-bold text-lg">FONTOS!</p>
        </span>
      }
      <div className="absolute top-2 right-4 flex flex-col text-right gap-2">
        <p className="italic font-light">{question.topic}</p>
        <p className="text-right">{question.uniWeek}. hét</p>
      </div>
      <h4>{shownSide}</h4>
    </div>
  )
}